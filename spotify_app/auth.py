from flask import Blueprint, url_for, redirect, request, session
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path


env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path,override=True)


CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URL = os.getenv("REDIRECT_URL")
TOKEN_INFO = "token-info"

bp = Blueprint("auth", __name__)


@bp.route("/")
def index():
    return f'<a href={url_for("auth.login_to_spotify")}>Login with Spotify</a>'


@bp.route("/login")
def login_to_spotify():
    auth_url = create_spotify_oauth().get_authorize_url()
    return redirect(auth_url)


@bp.route("/callback")
def callback_page():
    spOAuth = create_spotify_oauth()
    session.clear()
    code = request.args.get("code")
    cached_token = spOAuth.get_cached_token()
    token_info = spOAuth.get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(url_for("auth.home"))


def create_spotify_oauth():
    scope = "playlist-modify-public playlist-modify-private playlist-read-collaborative"

    return SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URL,
        scope=scope,
    )

def get_token():
    token_info = session.get(TOKEN_INFO, None)

    print(token_info)
    if not token_info:
        return None

    elif datetime.now().timestamp() > token_info["expires_at"]:
        print("token expired. Refreshing now...")
        spotify_oauth = create_spotify_oauth()
        token_info = spotify_oauth.refresh_access_token(token_info["refresh_token"])
    return token_info




@bp.route("/home")
def home():
    token_info = get_token()
    sp = spotipy.Spotify(auth=token_info["access_token"])
    session["user_id"] = sp.current_user()["id"]
    return f"""
    <a href={url_for("spotify.all_playlists")}>Playlist</a>
    <br>
    <a href={url_for("auth.logout")}>Logout</a>
    <br>
    {session.get('user')}"""


@bp.route("/logout")
def logout():
    session.clear()
    print("session cleared")
    return redirect(url_for("auth.index"))
