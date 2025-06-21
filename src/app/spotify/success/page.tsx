'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Track {
    name: string;
    artists: string;
    image: string;
}

export default function SpotifySuccessPage() {
    const searchParams = useSearchParams();
    const accessToken = searchParams.get('access_token');

    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!accessToken) {
            setError('Access Token이 없습니다.');
            setLoading(false);
            return;
        }

        const fetchTopTracks = async () => {
            try {
                const res = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?limit=20', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('Failed to fetch tracks', res.status, errorText);
                    setError(`트랙을 가져오지 못했습니다. 상태 코드: ${res.status}`);
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                const topTracks = data.items.map((item: any) => ({
                    name: item.track.name,
                    artists: item.track.artists.map((artist: any) => artist.name).join(', '),
                    image: item.track.album.images[0]?.url,
                }));

                setTracks(topTracks);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tracks:', err);
                setError('트랙을 가져오는 도중 에러가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchTopTracks();
    }, [accessToken]);

    if (loading) {
        return <div className="p-4">로딩 중...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Spotify Top Tracks</h1>
            {tracks.map((track, index) => (
                <div key={index} className="flex items-center mb-4">
                    <img src={track.image} alt={track.name} className="w-16 h-16 mr-4" />
                    <div>
                        <p className="font-semibold">{track.name}</p>
                        <p className="text-gray-600">{track.artists}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
