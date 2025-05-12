function PlaylistCard({ playlist }) {
    return (
        <div className="border border-gray-300 rounded p-4 mb-4">
            <strong>{playlist.name}</strong> ({playlist.tracks.total} tracks)
            <br />
            <a
                className="text-blue-500 underline"
                href={`/playlist/${playlist.id}`}
            >
                View Playlist
            </a>
        </div>
    );
}

export default PlaylistCard;
