# Spotify Python Flask Application

A Flask-based web application that integrates with the Spotify API, allowing users to view and manage their playlists, including the ability to remove tracks added by specific collaborators.

## Features

- Spotify OAuth authentication
- View all user playlists
- View playlist details including tracks and collaborators
- Remove tracks added by specific collaborators

## Prerequisites

- Python 3.7+
- Spotify Developer Account
- Spotify API Client ID and Client Secret

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/parag-ingalkar/spotify-python-flask.git
   cd spotify-python-flask
   ```

2. Create a virtual environment and activate it:

   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root with your Spotify API credentials:
   ```
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   ```

## Project Structure

```
project-root/
├── spotify_app/
│   ├── __init__.py         # App initialization
│   ├── auth.py             # Authentication routes and functions
│   ├── spotify.py          # Spotify API integration and functions
│   └── templates/          # HTML Templates
|       ├── home.html       # Home template
|       └── playlists.html  # Playlists template
├── .env                    # Environment variables (in .gitignore)
├── run.py                  # Application entry point
├── requirements.txt
└── README.md
```

## Running the Application

1. Set Flask environment variables:

   ```bash
   # Windows
   set FLASK_APP=.
   set FLASK_ENV=development

   # macOS/Linux
   export FLASK_APP=.
   export FLASK_ENV=development
   ```

2. Run the Flask development server:

   ```bash
   flask run
   ```

3. Access the application at `http://127.0.0.1:5000/`

## Usage

1. Visit the homepage and click "Login with Spotify"
2. Authorize the application to access your Spotify account
3. Browse your playlists and select one to view details
4. View tracks and collaborators
5. Remove tracks added by specific collaborators using the provided links

## Troubleshooting

If you encounter package compatibility issues, try installing these specific versions:

```bash
pip install flask==3.1.0 werkzeug==3.1.3 spotipy python-dotenv
```

## License

[MIT License](LICENSE)

## Acknowledgements

- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Spotipy](https://spotipy.readthedocs.io/)
- [Flask](https://flask.palletsprojects.com/)
