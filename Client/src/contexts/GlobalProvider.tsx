import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

export const GlobalContext = createContext<object>({});

type GlobalProviderProps = {
  children: JSX.Element;
};

// Actions
const LOADING = "LOADING";
const GET_ANIME_DATA = "GET_ANIME_DATA";
// const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
// const GET_AIRING_ANIME = "GET_AIRING_ANIME";
// const ANIMELIST_URL = "https://api.myanimelist.net/v2";
// const ANILIST_TOKEN = " 987e37ef681348e269dce31937b347f7";
// X-MAL-CLIENT-ID: 987e37ef681348e269dce31937b347f7

//URLS
//https://github.com/codex0555/Aniwatch-Api
//https://github.com/ghoshRitesh12/aniwatch-api
//https://www.miruro.tv/
//https://github.com/ghoshRitesh12/aniwatch-api
// const ANILIST_URL = "https://graphql.anilist.co";
// const BASE_URL = "https://kitsu.io/api/edge";
// const JIKAN_URL = "https://api.jikan.moe/v4";
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
      case GET_ANIME_DATA:
        return {
          ...state,
          popularAnime: action.payload.trendingAnimes,
          animeWallpaper: action.payload.spotlightAnimes,
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
  };

  async function getAnimeData() {
    dispatch({ type: LOADING });
    const response = await axios.get(
      "https://aniwatch-api-b9w3.onrender.com/anime/home"
    );
    const data = await response.data;
    console.log(data);
    dispatch({ ...state, type: GET_ANIME_DATA, payload: data });
  }
  useEffect(() => {
    const AnimeData = localStorage.getItem("ANIME_Data");
    if (AnimeData) {
      dispatch({
        ...state,
        type: GET_ANIME_DATA,
        payload: JSON.parse(AnimeData),
      });
    } else {
      getAnimeData();
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
