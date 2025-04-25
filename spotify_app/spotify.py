from flask import (
    Blueprint,
    g,
    url_for,
    redirect,
    request,
    session,
    jsonify,
    render_template,
)
import spotipy
import json
from datetime import datetime
from .auth import get_token

bp = Blueprint("spotify", __name__)

@bp.route("/playlists")
def all_playlists():
    token_info = get_token()
    if not token_info:
        return redirect(url_for("auth.login_to_spotify"))
    return render_template("home.html")


@bp.route("/api/playlists")
def api_all_playlists():
    token_info = get_token()
    if not token_info:
        return redirect(url_for("auth.login_to_spotify"))

    sp = spotipy.Spotify(auth=token_info["access_token"])

    playlists = sp.current_user_playlists(limit=50)["items"]
    return jsonify(playlists)

@bp.route("/playlists/<playlist_id>")
def playlist(playlist_id):
    token_info = get_token()
    if not token_info:
        return redirect(url_for("auth.login_to_spotify"))
    return render_template("playlist_details.html")

@bp.route("/api/playlists/<playlist_id>")
def api_playlist(playlist_id):
    session["playlist_id"] = playlist_id
    token_info = get_token()
    if not token_info:
        return redirect(url_for("auth.login_to_spotify"))

    sp = spotipy.Spotify(auth=token_info["access_token"])
    playlist = sp.playlist(playlist_id=playlist_id)

    return jsonify(playlist)

@bp.route("/api/playlists/<playlist_id>/get_collaborators")
def get_collaborators(playlist_id):
    collaborators = set()  # Use a set to store unique collaborator IDs
    
    token_info = get_token()
    if not token_info:
        return []

    sp = spotipy.Spotify(auth=token_info["access_token"])
    
    # Fetch the tracks from the playlist
    results = sp.playlist_tracks(playlist_id)
    
    while results:
        for item in results['items']:
            # Extract user ID from the 'added_by' field
            user_id = item['added_by']['id']
            collaborators.add(user_id)
        
        if results['next']:
            results = sp.next(results)
        else:
            break
    
    # Fetch user details for each collaborator
    collaborator_details = []
    for user_id in collaborators:
        user = sp.user(user_id)
        collaborator_details.append({
            'id': user['id'],
            'name': user['display_name'],
            'profile_url': user['external_urls']['spotify']
        })
    return jsonify(collaborator_details)


@bp.route("/api/playlists/<playlist_id>/tracks/remove_by_collaborator", methods=["POST"])
def remove_songs_added_by(collaborator_id):
    token_info = get_token()
    if not token_info:
        return jsonify({"error": "Not authenticated"}), 401

    sp = spotipy.Spotify(auth=token_info["access_token"])

    data = request.get_json()
    collaborator_id = data.get("collaborator_id")
    playlist_id = data.get("playlist_id")

    if not collaborator_id or not playlist_id:
        return jsonify({"error": "Missing parameters"}), 400
    
    songs_to_remove = []
    tracks = sp.playlist_tracks(playlist_id)
    
    while tracks:
        for track in tracks["items"]:
            if track["added_by"]["id"] == collaborator_id:
                songs_to_remove.append(track["track"]["id"])
        tracks = sp.next(tracks)

    chunk_size = 100
    num_chunks = len(songs_to_remove) // chunk_size + (
        1 if len(songs_to_remove) % chunk_size != 0 else 0
    )
    for i in range(num_chunks):
        start_idx = i * chunk_size
        end_idx = min((i + 1) * chunk_size, len(songs_to_remove))
        current_chunk = songs_to_remove[start_idx:end_idx]
        # sp.user_playlist_remove_all_occurrences_of_tracks(
        #     user, playlist_id, current_chunk, snapshot_id=None
        # )
    return jsonify({"status": "success", "removed_count": len(songs_to_remove)})
