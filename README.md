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
   CLIENT_ID = your_spotify_client_id
   CLIENT_SECRET = your_spotify_client_secret
   REDIRECT_URL = your-redirect-url
   BASE_URL = "http://127.0.0.1:5173"
   ```

5. Install React dependencies:

   ```bash
   cd frontend/
   npm install
   ```

## Project Structure

```
spotify-python-flask
├──frontend                                     # React Frontend
│   ├──public
│   │   ├──playlist.png                         # Default Playlist Image
│   │   └──user.png                             # Default User Image
│   ├──src
│   │   ├──components
│   │   │   ├──hooks
│   │   │   │   └──useFetch.js                  # Custom hook to fetch data
│   │   │   ├──Collaborators.jsx
│   │   │   ├──CollaboratorsRowSkeleton.jsx
│   │   │   ├──Dashboard.jsx
│   │   │   ├──Home.jsx
│   │   │   ├──NavBar.jsx
│   │   │   ├──PlaylistCard.jsx
│   │   │   ├──PlaylistCardSkeleton.jsx
│   │   │   ├──PlaylistDetails.jsx
│   │   │   ├──Playlists.jsx
│   │   │   ├──Songs.jsx
│   │   │   └──SongsRowSkeleton.jsx
│   │   ├──App.jsx                              # Main App Component with Routes
│   │   ├──index.css                            # Tailwindcss imports
│   │   └──main.jsx                             # Render App Component at div.root
│   ├──eslint.config.js
│   ├──index.html                               # App entry-point
│   ├──vite.config.js                           # Vite Config
├──server                                       # Python Flask Backend Package
│   ├──api
│   │   ├──__init__.py
│   │   └──spotify.py                           # Spotify data API endpoints
│   ├──auth
│   │   ├──__init__.py
│   │   ├──routes.py                            # Authentication API endpoints
│   │   └──utils.py                             # Utility functions for Authentication
│   ├──templates                                # Basic HTML templates
│   │   ├──home.html
│   │   └──playlist_details.html
│   ├──ui
│   │   └──views.py                             # Routes to render templates
│   ├──__init__.py                              # Define and configure Flask App
│   └──run.py                                   # Run Flask Backend
└──requirements.txt
```

## Running the Application

1. Run the Flask development server:

   ```bash
   python -m server.run
   ```

2. Access the backend application at `http://127.0.0.1:5000/`

3. Run React Development Application

   ```bash
   npm run dev
   ```

4. Access the frontend application at `http://127.0.0.1:5173/`

## Usage

1. Visit the homepage and click "Get Started"
2. Authorize the application to access your Spotify account
3. Browse your playlists and select one to view details
4. View tracks and collaborators
5. Remove specific tracks from a playlist
6. Remove tracks added by specific collaborators

## License

[MIT License](LICENSE)

## Acknowledgements

- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [Spotipy](https://spotipy.readthedocs.io/)
- [Flask](https://flask.palletsprojects.com/)
- [Vite](https://vite.dev/guide/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
