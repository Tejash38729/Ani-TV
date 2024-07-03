import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useGlobalcontext } from "../contexts/GlobalProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

// Types
const h1Styles = {
  color: "white",
  fontSize: "16px",
};

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { animeWallpaper } = useGlobalcontext() as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { popularAnime } = useGlobalcontext() as any;

  console.log(popularAnime);
  useEffect(() => {
    setbackgroundImageState(animeWallpaper);
    setPopularAnimeState(popularAnime);
    console.log("final state", popularAnime);
    setLoaded(true);
  }, [animeWallpaper, popularAnime]);

  useEffect(() => {
    const time = setTimeout(() => {
      localStorage.setItem("POPULAR_ANIME", JSON.stringify(popularAnime));
      localStorage.setItem("ANIME_WALLPAPER", JSON.stringify(animeWallpaper));
    }, 1000);

    return () => clearTimeout(time);
  }, [popularAnime, animeWallpaper]);

  //Set Quote Render Quote and ask user if they know the character that made this quote
  const [backgroundImageState, setbackgroundImageState] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [popularAnimeState, setPopularAnimeState] = useState([]);
  return (
    <div>
      {loaded ? (
        <Carousel
          className="Carousel"
          swipe={true}
          stopAutoPlayOnHover={false}
          autoPlay={true}
          indicators={false}
          animation="fade"
          cycleNavigation={true}
          duration={300}
        >
          {backgroundImageState.length !== 0 && loaded === true
            ? backgroundImageState.map((backgroundImage, i) => {
                return (
                  <img
                    key={i}
                    src={`${backgroundImage.poster}`}
                    width={3360}
                    height={800}
                  />
                );
              })
            : null}
        </Carousel>
      ) : (
        <CircularProgress className="loader" color="secondary" />
      )}
      <section className="Container ">
        <h1>Popular Anime</h1>
        <Grid
          container
          spacing={2}
          direction="row"
          marginTop={5}
          justifyContent="center"
        >
          {" "}
          {popularAnimeState
            ? popularAnimeState.map((e, i) => {
                return (
                  <Grid item xs={5} sm={6} md={4} lg={2} xl={2} key={i}>
                    <Link to={`/${e.mal_id}/${encodeURIComponent(e.title)}`}>
                      <img
                        className="AnimeImages"
                        key={e.mal_id}
                        src={`${e.images.jpg.image_url}`}
                        alt={`Item ${i}`}
                      />
                    </Link>
                    <h1 style={h1Styles}>{e.title}</h1>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </section>
    </div>
  );
};

export default Home;
