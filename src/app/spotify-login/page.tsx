'use client';

export default function SpotifyLoginPage() {
    const handleSpotifyLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
        const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;
        const scopes = ['user-read-email', 'user-read-private', 'playlist-read-private'].join(' ');

        const authURL = `https://accounts.spotify.com/authorize?` +
        new URLSearchParams({
            client_id: clientId,
            response_type: 'code',
            redirect_uri: redirectUri,
            scope: 'user-read-email user-read-private playlist-read-private',
        })

        window.location.href = authURL;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={handleSpotifyLogin} className="p-4 bg-green-500 text-white rounded">
                Spotify 로그인
            </button>
        </div>
    );
}
