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
from datetime import datetime
from .auth import get_token

bp = Blueprint("spotify", __name__)


@bp.route("/playlists")
def all_playlists():
    token_info = get_token()
    if not token_info:
        return redirect(url_for("auth.login_to_spotify"))

    sp = spotipy.Spotify(auth=token_info["access_token"])

    playlists = sp.current_user_playlists(limit=50)["items"]
    return render_template("home.html", playlists=playlists)


@bp.route("/playlist/<playlist_id>")
def playlist(playlist_id):
    session["playlist_id"] = playlist_id
    print(session["playlist_id"])
    songs, collaborators = get_playlist_details(playlist_id)
    return render_template("playlist.html", songs=songs, collaborators=collaborators)


def get_playlist_details(playlist_id):
    token_info = get_token()
    if not token_info:
        return redirect(url_for("auth.login_to_spotify"))

    sp = spotipy.Spotify(auth=token_info["access_token"])
    collaborators = []
    songs = []
    playlist = sp.playlist(playlist_id)
    tracks = playlist["tracks"]
    while tracks:
        for track in tracks["items"]:
            if track["added_by"] not in collaborators:
                collaborators.append(track["added_by"])
            songs.append(track)
        tracks = sp.next(tracks)

    for collaborator in collaborators:
        name = sp.user(collaborator["id"])["display_name"]
        collaborator["name"] = name

    return songs, collaborators


@bp.route("/playlist/remove_tracks_by/<collaborator_id>")
def remove_songs_added_by(collaborator_id):
    token_info = get_token()
    if not token_info:
        return redirect(url_for("auth.login_to_spotify"))

    sp = spotipy.Spotify(auth=token_info["access_token"])
    user = session["user_id"]
    playlist_id = session["playlist_id"]
    songs_to_remove = []
    playlist = sp.playlist(playlist_id)
    tracks = playlist["tracks"]
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
        sp.user_playlist_remove_all_occurrences_of_tracks(
            user, playlist_id, current_chunk, snapshot_id=None
        )
    return redirect(url_for("spotify.playlist", playlist_id=playlist["id"]))
