import { CircularProgress, Container } from "@mui/material";
import "../App.css";
// import { useGlobalcontext } from "../contexts/GlobalProvider";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import scrapeWebsite from "../scrappers/Scapper";
import { useParams } from "react-router-dom";

//https://embtaku.pro/download?id=MjE5Njg5&title=One+Piece+Episode+1092
// "//embtaku.pro/streaming.php?id=MjE5OTU4&title=One+Piece%3A+Dai+Tannou+Kikaku%21+%22Shi+no+Gekai%22+Trafalgar+Law+Episode+1&typesub=SUB"

//https://anitaku.to/spy-x-family-dub-episode-3
export default function AnimePage(): JSX.Element {
  const [url, setUrl] = useState<String>("");
  // const { popularAnime } = useGlobalcontext();
  // const { mal_id } = useParams();

  const { title } = useParams();

  function conevertNametoStandard(name: string | undefined): Promise<string> {
    return new Promise((res, _) => {
      if (name !== undefined) {
        res(name.split(" ").join("-"));
        return res;
      }
    });
  }

  const baseUrl = "https://anitaku.to";

  useEffect(() => {
    console.log(conevertNametoStandard(title));
    conevertNametoStandard(title).then((title) => {
      scrapeWebsite(`${baseUrl}/${title}-episode-1`).then((i) => setUrl(i));
    });
  }, [title]);
  // https://anitaku.to/spy-x-family-dub-episode-3

  return (
    <Container>
      <section className="AnimePage_main_section">
        {/* <h1>Anime Page</h1>
        <h1></h1> */}
        <br />
        <br />
        <br />
        <br />
        {url !== "" ? (
          <iframe
            allowFullScreen={true}
            loading="lazy"
            name="animePlayer"
            src={`${url}`}
            frameBorder="0"
            id="videoPlayer"
          ></iframe>
        ) : (
          <CircularProgress className="loader" color="secondary" />
        )}
      </section>
    </Container>
  );
}
