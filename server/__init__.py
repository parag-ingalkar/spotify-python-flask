from flask import Flask
from flask_cors import CORS
from server.auth.routes import bp as auth_bp
from server.api.spotify import bp as api_bp
from server.ui.views import bp as ui_bp

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5173","http://127.0.0.1:4173"],methods=["GET", "POST", "DELETE", "OPTIONS"])
    app.secret_key = 'secret_key'
    app.config['SESSION_COOKIE_NAME'] = 'Spotify Cookie' 
    app.config.update(
    SECRET_KEY='your_secret_here'
)

    app.register_blueprint(auth_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(ui_bp)

    return app
