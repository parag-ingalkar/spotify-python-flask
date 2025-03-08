from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.secret_key = 'secret_key'
    app.config['SESSION_COOKIE_NAME'] = 'Spotify Cookie'    

    from . import auth
    app.register_blueprint(auth.bp)

    from . import spotify
    app.register_blueprint(spotify.bp)
    
    return app