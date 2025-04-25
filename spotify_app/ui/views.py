from flask import Blueprint, render_template
from spotify_app.auth.utils import get_token

bp = Blueprint("ui", __name__)

@bp.route("/")
def home():
    return render_template("home.html")

@bp.route("/playlists/<playlist_id>")
def playlist_view(playlist_id):
    token_info = get_token()
    if not token_info:
        return render_template("home.html")
    return render_template("playlist_details.html", playlist_id=playlist_id)
