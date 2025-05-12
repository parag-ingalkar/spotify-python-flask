const BASE_URL = 'http://localhost:5000';

export const getUserInfo = async () => {
    const res = await fetch(`${BASE_URL}/api/me`);
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
};

export const getPlaylists = async () => {
    const res = await fetch(`${BASE_URL}/api/playlists`);
    if (!res.ok) throw new Error('Failed to load playlists');
    return res.json();
};

export const getPlaylistDetails = async (playlistId) => {
    const res = await fetch(`${BASE_URL}/api/playlist/${playlistId}`);
    if (!res.ok) throw new Error('Playlist not found');
    return res.json();
};

//   export const removeTrack = async (playlistId, trackId, collaboratorId) => {
//     const res = await fetch(`${BASE_URL}/api/playlist/${playlistId}/remove_track`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ track_id: trackId, collaborator_id: collaboratorId }),
//     });
//     if (!res.ok) throw new Error('Failed to remove track');
//     return res.json();
//   };
