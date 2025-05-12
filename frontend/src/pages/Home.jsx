import { useEffect, useState } from 'react';
import { getUserInfo, getPlaylists } from '../api/spotify';
import PlaylistCard from '../components/PlaylistCard';

function Home() {
    const [user, setUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const userData = await getUserInfo();
                setUser(userData);

                const userPlaylists = await getPlaylists();
                setPlaylists(userPlaylists);
            } catch (err) {
                console.error(err);
                setError('User not logged in');
            }
        };

        checkLogin();
    }, []);

    if (error) {
        return (
            <div className="p-8">
                <h2 className="text-2xl mb-4">Welcome to the Spotify Web App</h2>
                <a href="http://localhost:5000/login">
                    <button className="bg-green-500 text-white px-6 py-2 rounded">
                        Login with Spotify
                    </button>
                </a>
            </div>
        );
    }

    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Spotify Web App</h1>
                <div>
                    <span className="mr-4">Welcome, {user?.display_name}</span>
                    <a href="http://localhost:5000/logout">
                        <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                    </a>
                </div>
            </header>

            <main>
                {playlists.length > 0 ? (
                    playlists.map((p) => <PlaylistCard key={p.id} playlist={p} />)
                ) : (
                    <p>Loading playlists...</p>
                )}
            </main>
        </div>
    );
}

export default Home;
