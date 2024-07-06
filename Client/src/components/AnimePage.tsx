import { Container } from "@mui/material";
import "../App.css";
import { useGlobalcontext } from "../contexts/GlobalProvider";
import { useEffect, useState } from "react";
import scrapeWebsite from "../scrappers/Scapper";
import { useParams } from "react-router-dom";
import { Frown } from "lucide-react";
import { fetchAnimeInfo } from "../utils/utils";
import React from "react";

//TODO Search Functionality
//Episode Functionality
//https://embtaku.pro/download?id=MjE5Njg5&title=One+Piece+Episode+1092
//embtaku.pro/streaming.php?id=MjE5OTU4&title=One+Piece%3A+Dai+Tannou+Kikaku%21+%22Shi+no+Gekai%22+Trafalgar+Law+Episode+1&typesub=SUB
//https://anitaku.pe/spy-x-family-dub-episode-3

export default function AnimePage(): JSX.Element {
  const [url, setUrl] = useState<string>("");
  const { mal_id } = useParams();
  const epNum = localStorage.getItem(`Episode${mal_id}`);
  const EpisodeNum = epNum !== null ? parseInt(epNum) : 1;
  const [episode, setEpisode] = useState<number>(EpisodeNum);
  const [currentAnime, setCurrentAnime] = useState();
  const { title } = useParams();
  const { popularAnime } = useGlobalcontext();
  const { anime_id } = useParams();
  const [animeInfo, setAnimeInfo] = useState();

  useEffect(() => {
    fetchAnimeInfo(anime_id).then((animeInfo) => setAnimeInfo(animeInfo));
    console.log("Anime info", animeInfo?.anime);
    return () => {};
  }, [anime_id, animeInfo]);

  useEffect(() => {
    const curr = popularAnime.filter((anime) => {
      return anime.mal_id == mal_id;
    });
    if (curr) {
      setCurrentAnime(curr[0]);
    }
  }, [popularAnime, mal_id]);

  function convertNametoStandard(name: string | undefined): Promise<string> {
    return new Promise((res, rej) => {
      if (name !== undefined) {
        res(name.split(" ").join("-"));
        return res;
      } else {
        rej("Could not Process string");
      }
    });
  }

  const baseUrl = "https://anitaku.pe";

  useEffect(() => {
    convertNametoStandard(title).then((title) => {
      scrapeWebsite(
        `${baseUrl}/${title.replace(" ", "-")}-episode-${episode}`
        // "https://hianime.to/watch/one-piece-100?ep=2142"
      ).then((i) => {
        setUrl(i);
      });
    });

    location.pathname.replace("%", "-");
  }, [title, episode]);

  // URL-Structure:  https://anitaku.pe/spy-x-family-dub-episode-3
  useEffect(() => {
    // Save the last watched episode to localStorage whenever it changes
    localStorage.setItem(`Episode${mal_id}`, episode.toString());
  }, [episode]);

  useEffect(() => {
    // Retrieve the last watched episode from localStorage
    const lastWatchedEpisode = localStorage.getItem(`Episode${mal_id}`);
    if (lastWatchedEpisode) {
      setEpisode(parseInt(lastWatchedEpisode));
    }
  }, []);
  return (
    <Container>
      <section className="AnimePage_main_section">
        <br />
        <br />
        <br />
        <h1 className="text-white">
          Currently Watching:{" "}
          <strong className="text-red-700">
            {animeInfo?.anime?.info?.name}
          </strong>{" "}
        </h1>
        <br />

        <br />
        {url !== undefined ? (
          <iframe
            allowFullScreen={true}
            loading="eager"
            name="animePlayer"
            autoFocus={true}
            src={`${url}`}
            frameBorder="0"
            id="videoPlayer"
          ></iframe>
        ) : (
          <div>
            {" "}
            <Frown />
            <h1 className="text-red-700">Not Found :( ...</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
      </section>
      <section className="AnimePage_main_section">
        <h1>About</h1>
        <img src={animeInfo?.anime?.info?.poster} alt="AnimeInfoImage" />
        <br />
        <p className="text-white">{animeInfo?.anime?.info?.description}</p>
        <br />
        <h1 className="AnimePage_main_section_h1">
          There are {animeInfo && animeInfo?.anime?.info?.stats?.episodes?.sub}{" "}
          episodes
        </h1>
        <h2>Currently on Episode {episode}...</h2>
        {currentAnime && (
          <ul className="AnimePage_main_section_ul">
            {[...Array(animeInfo?.anime?.info?.stats?.episodes?.sub)].map(
              (_, episodeNumber) => (
                <li
                  className="AnimePage_main_section_li"
                  key={episodeNumber + 1}
                >
                  <button
                    className="EpisodeButton"
                    onClick={() => {
                      const cur = episodeNumber + 1;
                      setEpisode(cur);
                      window.location.reload();
                    }}
                  >
                    Episode {episodeNumber + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </section>
    </Container>
  );
}
