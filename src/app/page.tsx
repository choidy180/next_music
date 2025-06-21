"use client";

import TestComp from "@/components/test";
import { useState } from "react";
import styled from "styled-components";

const LoginBox = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 20px;

    button {
        padding: 10px 20px;
        border-radius: 40px;
        background-color: #141414;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
    }
`

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
}

interface SpotifyTracksResponse {
  items: SpotifyTrack[];
}

export default function Home() {
    const [token, setToken] = useState<string | null>(null);
    const music = ['아이유','BTS','뉴진스','아이브','아일릿'];
    const fetchSpotifyData = async () => {
        const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
        const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;

        const getSpotifyToken = async () => {
            const params = new URLSearchParams({
                grant_type: "client_credentials",
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET
            });

            // fetch
            const res = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                // 쿼리스트링 형식으로 요청 보냄
                body: params.toString()
            });

            const { access_token: token } = await res.json();
            return token;
        }

        const token = await getSpotifyToken();
        setToken(token);
    };

    async function fetchWebApi<T>(endpoint:string, method: 'GET' | 'POST', body?: any) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method,
            body: body ? JSON.stringify(body): undefined,
        });

        if (!res.ok) {
            throw new Error(`Spotify API error: ${res.status}`);
        }

        return await console.log(res.json() as T);
    }

    async function getTopTracks(): Promise<SpotifyTrack[]>{
        // Spotify Top Tracks API
        const data:any = await fetchWebApi<SpotifyTracksResponse>(
            'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
        );
        return data.items;
    }
    return (
        <LoginBox>
            <button onClick={fetchSpotifyData}>Login with Spotify</button>
            <h1>Token</h1>
            <h1 onClick={getTopTracks}>FETCH</h1>
        </LoginBox>
    );
}
