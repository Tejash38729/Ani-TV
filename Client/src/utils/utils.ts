import axios from "axios"

export type globalcontextType = { 
	popularAnime: [], 
	animeWallpaper: [] 
}


export async function fetchAnimeInfo(id: string ){
	const res = await axios.get(`https://aniwatch-api-b9w3.onrender.com/anime/info?id=${id}`)
	const data = await res.data
	return data 
}


