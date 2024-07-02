import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

export const GlobalContext = createContext<object>({});

type GlobalProviderProps = {
  children: JSX.Element;
};

// Actions
const LOADING = "LOADING";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
// const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
// const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_ANIME_WALLPAPER = "GET_ANIME_WALLPAPER";
// const ANIMELIST_URL = "https://api.myanimelist.net/v2";
// const ANILIST_TOKEN = " 987e37ef681348e269dce31937b347f7";
// X-MAL-CLIENT-ID: 987e37ef681348e269dce31937b347f7

//URLS

// const ANILIST_URL = "https://graphql.anilist.co";
const BASE_URL = "https://kitsu.io/api/edge";
const JIKAN_URL = "https://api.jikan.moe/v4";
// const QUOTES_URL = "https://animechan.xyz/api/quotes/anime?title=one%20piece";
// const ANIAPI = "https://api.aniapi.com/v1";

//Provider

export default function GlobalProvider({
  children,
}: GlobalProviderProps): JSX.Element {
  //Initial State

  const initialState = {
    popularAnime: [],
    animeWallpaper: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: [],
    searchResult: [],
    loading: false,
  };

  const reducer = (state: object, action: ActionType) => {
    switch (action.type) {
      case LOADING:
        return { ...state, loading: true };
      case GET_POPULAR_ANIME:
        return { ...state, popularAnime: action.payload, loading: false };
      case GET_ANIME_WALLPAPER:
        return {
          ...state,
          animeWallpaper: action.wallpaperPayload,
          loading: false,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //Action Type
  type ActionType = {
    type: string;
    payload?: object;
    wallpaperPayload?: object;
  };
  useEffect(() => {
    getAnimeWallpaper();
    getPopularAnime();
  }, []);

  // useEffect(() => {
  //   const apiUrl = " https://api.myanimelist.net/v2/anime/suggestions?limit=4";

  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${ANILIST_TOKEN}`,
  //   };

  //   axios
  //     .get(apiUrl, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       // Handle successful response
  //       console.log("Response:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  async function getAnimeWallpaper() {
    dispatch({ type: LOADING });

    const response = await axios.get(`${BASE_URL}/anime`, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      params: {
        "filter[categories]": "adventure",
        "page[limit]": 10,
      },
    });

    const data = await response.data;

    dispatch({
      ...state,
      type: GET_ANIME_WALLPAPER,
      wallpaperPayload: data.data,
    });
  }

  async function getPopularAnime() {
    dispatch({ type: LOADING });
    const response = await fetch(`${JIKAN_URL}/top/anime?filter=bypopularity`);
    const data = await response.json();

    dispatch({ ...state, type: GET_POPULAR_ANIME, payload: data.data });
  }

  useEffect(() => {
    const content = localStorage.getItem("POPULAR_ANIME");
    const WallpaperContent = localStorage.getItem("ANIME_WALLPAPER");

    if (content || WallpaperContent) {
      if (content) {
        dispatch({ type: GET_POPULAR_ANIME, payload: JSON.parse(content) });
      } else {
        getPopularAnime();
      }
      if (WallpaperContent) {
        dispatch({
          type: GET_ANIME_WALLPAPER,
          wallpaperPayload: JSON.parse(WallpaperContent),
        });
      } else {
        getAnimeWallpaper();
      }
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGlobalcontext() {
  return useContext(GlobalContext);
}
