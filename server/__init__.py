from flask import Flask
from flask_cors import CORS
from server.auth.routes import bp as auth_bp
from server.api.spotify import bp as api_bp
from server.ui.views import bp as ui_bp

from dotenv import load_dotenv
import os

load_dotenv()  # reads from .env in root folder

env = os.getenv("FLASK_ENV", "production")



def create_app():
    app = Flask(__name__, instance_relative_config=True)

    CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5173","https://manage-spotify-playlists-app.vercel.app","http://127.0.0.1:4173"],methods=["GET", "POST", "DELETE", "OPTIONS"])
    app.secret_key = 'secret_key'
    app.config['SESSION_COOKIE_NAME'] = 'Spotify Cookie' 
    
    app.config["ENV"] = env
    if app.config["ENV"] == "production":
        app.config.update(
            SESSION_COOKIE_SAMESITE='None',
            SESSION_COOKIE_SECURE=True,
        )
    else:
        # For local dev only
        app.config.update(
            SESSION_COOKIE_SAMESITE='Lax',
            SESSION_COOKIE_SECURE=False,
        )


    app.register_blueprint(auth_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(ui_bp)

    return app
