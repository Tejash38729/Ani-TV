import {
  ContextType,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

export const GlobalContext = createContext<Object>({});

type GlobalProviderProps = {
  children: ReactNode;
};

//Actions

const LOADING = "LOADING";
// const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
// const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
// const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_ANIME_WALLPAPER = "GET_ANIME_WALLPAPER";

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

  //Action Type
  type ActionType = {
    type: string;
    payload?: any; // Optional payload
    wallpaperPayload?: any; // Optional wallpaperPayload
  };

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

  const reducer = (state: any, action: ActionType) => {
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
  useEffect(() => {
    getAnimeWallpaper();
    getPopularAnime();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

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

export function useGlobalcontext() {
  return useContext(GlobalContext);
}
