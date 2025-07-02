from flask import Blueprint, redirect, request, session
from .utils import create_spotify_oauth, TOKEN_INFO
import os
from dotenv import load_dotenv
from pathlib import Path

bp = Blueprint("auth", __name__)


env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

BASE_URL = os.getenv("BASE_URL")


@bp.route("/login")
def login_to_spotify():
    auth_url = create_spotify_oauth().get_authorize_url()
    print("Login Headers: ", request.headers)
    return redirect(auth_url)


@bp.route("/callback")
def callback_page():
    code = request.args.get("code")
    print("Callback Base URL: ", BASE_URL)
    if not code:
        return "Authorization failed.", 400
    token_info = create_spotify_oauth().get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(f"{BASE_URL}/dashboard")


@bp.route("/logout")
def logout():
    session.clear()
    return redirect(f"{BASE_URL}/")


@bp.route("/check-auth")
def check_auth():
    token_info = session.get(TOKEN_INFO, None)
    return {"authenticated": bool(token_info)}
