from flask import Flask
from flask_cors import CORS
from spotify_app.auth.routes import bp as auth_bp
from spotify_app.api.spotify import bp as api_bp
from spotify_app.ui.views import bp as ui_bp

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    CORS(app)
    app.secret_key = 'secret_key'
    app.config['SESSION_COOKIE_NAME'] = 'Spotify Cookie' 

    app.register_blueprint(auth_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(ui_bp)

    return app
