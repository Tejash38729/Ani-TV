import { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useGlobalcontext } from "../contexts/GlobalProvider";
import CircularProgress from "@mui/material/CircularProgress";

//######################################################################################################################

// Types;
type elementData = {
  attributes: {
    coverImage: {
      original: string;
    };
  };
};

type elementImage = {
  images: {
    jpg: {
      image_url: string;
    };
  };
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
    console.log(popularAnime);
  }, [animeWallpaper, popularAnime]);

  //Set Quote Render Quote and ask user if they know the character that made this quote
  const [image, setImage] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState();

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
      <section className="Container">
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
            ? image.map((e, i) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                    <img
                      className="AnimeImages"
                      key={e.mal_id}
                      src={`${e.images.jpg.image_url as elementImage}`}
                      alt={`Item ${i}`}
                    />
                    <h1>{e.title}</h1>
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
