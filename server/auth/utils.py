import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import session
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URL = os.getenv("REDIRECT_URL")
TOKEN_INFO = "token-info"

def create_spotify_oauth():
    scope = (
        "playlist-modify-public playlist-modify-private "
        "playlist-read-collaborative playlist-read-private user-read-private"
    )
    return SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URL,
        scope=scope,
        cache_handler=None,
        show_dialog=True
    )

def get_token():
    token_info = session.get(TOKEN_INFO)
    if not token_info:
        return None

    spotify_oauth = create_spotify_oauth()
    if spotify_oauth.is_token_expired(token_info):
        token_info = spotify_oauth.refresh_access_token(token_info["refresh_token"])
        session[TOKEN_INFO] = token_info
    return token_info

def get_spotify_client():
    token_info = get_token()
    if not token_info:
        return None
    return spotipy.Spotify(auth=token_info["access_token"])
