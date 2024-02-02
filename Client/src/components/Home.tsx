import { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useGlobalcontext } from "../contexts/GlobalProvider";

//######################################################################################################################

// Types;
type elementData = {
  attributes: {
    coverImage: {
      original: string;
    };
  };
};

//################################################################################################################

//Home React Func
const Home = () => {
  //Render LOGIC
  const { animeWallpaper } = useGlobalcontext() as any;
  useEffect(() => {
    setData(animeWallpaper);
  }, [animeWallpaper]);

  if (animeWallpaper) {
    console.log(animeWallpaper);
  }

  console.log(animeWallpaper);

  //Set Quote Render Quote and ask user if they know the character that made this quote
  const [image, setImage] = useState([]);
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState();
  // const { animeWallpaper } = useGlobalcontext();
  // setImage(animeWallpaper);
  //###############################################################################################################################################################
  //Return

  return (
    <div>
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
        {data.length !== 0
          ? data.map((e: elementData, i) => {
              return (
                <img
                  key={i}
                  src={`${e.attributes.coverImage.original}`}
                  width={3360}
                  height={800}
                  alt=""
                />
              );
            })
          : null}
      </Carousel>
      <Grid
        container
        // id="Container"
        spacing={2}
        direction="row"
        justifyContent="flex-start"
      >
        <Grid item xs={6}>
          {" "}
          {image
            ? image.map((e, i) => {
                return (
                  <img
                    className="AnimeImages"
                    key={i}
                    src={`${e}`}
                    alt="Anime"
                  />
                );
              })
            : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
