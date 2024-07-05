import { Container } from "@mui/material";
import "../App.css";
import { useGlobalcontext } from "../contexts/GlobalProvider";
import { useEffect, useState } from "react";
import scrapeWebsite from "../scrappers/Scapper";
import { useParams } from "react-router-dom";
import { Frown } from "lucide-react";

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
  console.log(popularAnime);
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
        `${baseUrl}/${title.replace(" ", "-")}-episode-${1}`
        // "https://aniwatchtv.to/watch/one-piece-movie-1-3096?ep=58122"
        // "https://ryuk.to/watch/oshi-no-ko-2nd-season-episode-1"
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
        {/* <h1>Anime Page</h1>
        <h1></h1> */}
        <h1>Currently Watching: {currentAnime?.title} </h1>
        <br />
        <br />
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
            <h1>Not Found....</h1>
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
            <br />
            <br />
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
      </section>
      <section className="AnimePage_main_section">
        <h1 className="AnimePage_main_section_h1">
          There are {currentAnime && currentAnime.episodes} episodes
        </h1>
        <h2>Currently on Episode {episode}...</h2>
        {currentAnime && (
          <ul className="AnimePage_main_section_ul">
            {[...Array(currentAnime.episodes).keys()].map((episodeNumber) => (
              <li className="AnimePage_main_section_li" key={episodeNumber + 1}>
                <button
                  className="EpisodeButton"
                  onClick={() => {
                    let cur = episodeNumber + 1;
                    setEpisode(cur);
                    window.location.reload();
                  }}
                >
                  Episode {episodeNumber + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
