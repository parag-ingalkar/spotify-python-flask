from flask import Blueprint, url_for, redirect, request, session, jsonify, render_template
import spotipy
from .auth import get_token, get_spotify_client

bp = Blueprint("spotify", __name__)


@bp.route("/api/playlists")
def api_all_playlists():
    token_info = get_token()
    if not token_info:
        return jsonify({"error": "Unauthorized"}), 401

    sp = get_spotify_client()

    playlists = sp.current_user_playlists(limit=50)["items"]
    return jsonify(playlists)

@bp.route("/playlists/<playlist_id>")
def playlist(playlist_id):
    token_info = get_token()
    if not token_info:
        return render_template("home.html")
    return render_template("playlist_details.html", playlist_id=playlist_id)

@bp.route("/api/playlists/<playlist_id>")
def api_playlist(playlist_id):
    token_info = get_token()
    if not token_info:
        return jsonify({"error": "Unauthorized"}), 401

    sp = get_spotify_client()
    playlist = sp.playlist(playlist_id)

    return jsonify(playlist)

@bp.route("/api/playlists/<playlist_id>/get_collaborators")
def get_collaborators(playlist_id):
    collaborators = set()  # Use a set to store unique collaborator IDs
    
    token_info = get_token()
    if not token_info:
        return jsonify({"error": "Unauthorized"}), 401

    sp = get_spotify_client()
    
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
        collaborator_details.append(user)
    return jsonify(collaborator_details)


@bp.route("/api/playlists/<playlist_id>/tracks/remove_by_collaborator", methods=["POST"])
def remove_songs_added_by(playlist_id):
    token_info = get_token()
    if not token_info:
        return jsonify({"error": "Not authenticated"}), 401

    sp = get_spotify_client()

    data = request.get_json()
    collaborator_id = data.get("collaborator_id")

    if not collaborator_id:
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
        sp.playlist_remove_all_occurrences_of_items(playlist_id, current_chunk)
    return jsonify({"status": "success", "removed_count": len(songs_to_remove)})
