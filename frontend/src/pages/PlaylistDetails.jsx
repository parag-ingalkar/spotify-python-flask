import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlaylistDetails, removeTrack } from '../api/spotify';

function PlaylistDetails() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);

    const fetchPlaylist = async () => {
        try {
            const data = await getPlaylistDetails(id);
            setPlaylist(data);
        } catch (err) {
            setError('Could not load playlist.');
        }
    };

    useEffect(() => {
        fetchPlaylist();
    }, [id]);

    const handleRemove = async (trackId, collaboratorId) => {
        try {
            await removeTrack(id, trackId, collaboratorId);
            fetchPlaylist(); // refresh data
        } catch (err) {
            console.error('Failed to remove track:', err);
        }
    };

    if (error) return <p className="p-4 text-red-500">{error}</p>;
    if (!playlist) return <p className="p-4">Loading playlist...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl mb-4">{playlist.name}</h2>
            <ul className="space-y-4">
                {playlist.tracks.map((track) => (
                    <li key={track.id} className="border p-4 rounded">
                        <div className="flex justify-between items-center">
                            <div>
                                <p><strong>{track.name}</strong> by {track.artist}</p>
                                <p className="text-sm text-gray-600">
                                    Added by: {track.added_by_name || 'Unknown'}
                                </p>
                            </div>
                            {track.added_by_type === 'collaborator' && (
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleRemove(track.id, track.added_by_id)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlaylistDetails;
