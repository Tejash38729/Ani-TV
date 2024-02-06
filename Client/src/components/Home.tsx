import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useGlobalcontext } from "../contexts/GlobalProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
/**
 * Todo
 * Create a Redis backend that recieves the api data my client should check if the data exists and the  render it if not send the data to the enpoint
 *
 *
 *
 */

//######################################################################################################################

// Types;
type elementData = {
  attributes: {
    coverImage: {
      original: string;
    };
  };
};

const h1Styles = {
  color: "white",
  fontSize: "16px",
};
export type AnimeImageApiType = {
  mal_id: string;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  episodes: number;
};

//################################################################################################################

//Home React Func
const Home = () => {
  //Render LOGIC
  const { animeWallpaper } = useGlobalcontext() as any;
  const { popularAnime } = useGlobalcontext() as any;

  useEffect(() => {
    setData(animeWallpaper);
    setImage(popularAnime);

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
  const [image, setImage] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  //###############################################################################################################################################################
  //Return

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
          {data.length !== 0 && loaded === true
            ? data.map((e: elementData, i) => {
                return (
                  <img
                    key={i}
                    src={`${e.attributes.coverImage.original}`}
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
          {image
            ? image.map((e: AnimeImageApiType, i) => {
                return (
                  <Grid item xs={5} sm={6} md={4} lg={2} xl={2} key={i}>
                    <Link to={`/${e.mal_id}/${e.title}`}>
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
