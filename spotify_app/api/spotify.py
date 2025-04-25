from flask import Blueprint, request, jsonify
from spotify_app.auth.utils import get_token, get_spotify_client

bp = Blueprint("api", __name__, url_prefix="/api")

@bp.route("/me")
def api_me():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        return jsonify(sp.current_user())
    except Exception:
        return jsonify({"error": "Failed to fetch user info"}), 500


@bp.route("/playlists")
def api_all_playlists():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify(sp.current_user_playlists(limit=50)["items"])

@bp.route("/playlists/<playlist_id>")
def api_playlist(playlist_id):
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify(sp.playlist(playlist_id))

@bp.route("/playlists/<playlist_id>/get_collaborators")
def get_collaborators(playlist_id):
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401

    collaborators = set()
    results = sp.playlist_tracks(playlist_id)
    while results:
        for item in results['items']:
            collaborators.add(item['added_by']['id'])
        results = sp.next(results) if results['next'] else None

    return jsonify([sp.user(uid) for uid in collaborators])

@bp.route("/playlists/<playlist_id>/tracks/remove_by_collaborator", methods=["POST"])
def remove_songs_added_by(playlist_id):
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401

    collaborator_id = request.get_json().get("collaborator_id")
    if not collaborator_id:
        return jsonify({"error": "Missing collaborator_id"}), 400

    songs_to_remove = []
    results = sp.playlist_tracks(playlist_id)
    while results:
        for track in results["items"]:
            if track["added_by"]["id"] == collaborator_id:
                songs_to_remove.append(track["track"]["id"])
        results = sp.next(results) if results["next"] else None

    for i in range(0, len(songs_to_remove), 100):
        sp.playlist_remove_all_occurrences_of_items(playlist_id, songs_to_remove[i:i + 100])

    return jsonify({"status": "success", "removed_count": len(songs_to_remove)})
