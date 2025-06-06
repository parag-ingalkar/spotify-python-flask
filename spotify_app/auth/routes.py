from flask import Blueprint, redirect, request, session, render_template, url_for
from .utils import create_spotify_oauth, get_spotify_client, TOKEN_INFO

bp = Blueprint("auth", __name__)

@bp.route("/login")
def login_to_spotify():
    auth_url = create_spotify_oauth().get_authorize_url()
    return redirect(auth_url)

@bp.route("/callback")
def callback_page():
    code = request.args.get("code")
    if not code:
        return "Authorization failed.", 400
    token_info = create_spotify_oauth().get_access_token(code)
    session[TOKEN_INFO] = token_info
    # return redirect(url_for("ui.home"))
    return redirect("http://127.0.0.1:5173/dashboard")

@bp.route("/logout")
def logout():
    session.clear()
    # return redirect(url_for("ui.home"))
    return redirect("http://127.0.0.1:5173/")

@bp.route("/check-auth")
def check_auth():
    token_info = session.get(TOKEN_INFO, None)
    return {"authenticated": bool(token_info)}

@bp.route("/hello")
def hello():
    token_info = session.get(TOKEN_INFO, None)
    return {"message": token_info}
