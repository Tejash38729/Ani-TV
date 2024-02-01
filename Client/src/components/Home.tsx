import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";

/**
 * https://kitsu.io/api/edge/
 * https://animechan.xyz/api/random
 * https://api.aniapi.com
 * https://graphql.anilist.co'
 *
 *
 */

//Urls

const ANILIST_URL = "https://graphql.anilist.co";
const BASE_URL = "https://kitsu.io/api/edge";
const JIKAN_URL = "https://api.jikan.moe/v4";
const QUOTES_URL = "https://animechan.xyz/api/quotes/anime?title=one%20piece";
const ANIAPI = "https://api.aniapi.com/v1";

const query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

const variables = {
  id: 15125,
};

//######################################################################################################################

//Types
type elementData = {
  attributes: {
    coverImage: {
      large: string;
    };
  };
};

//################################################################################################################

//Home React Func
const Home = () => {
  //Render LOGIC

  //Set Quote Render Quote and ask user if they know the character that made this quote
  const [image, setImage] = useState([]);
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState();

  //image_url
  // large_image_url
  //small_image_url

  async function getJikanData() {
    // const anime_id = 1;
    const response = await fetch(`https://api.jikan.moe/v4/top/anime`);
    // const response = await fetch("https://api.aniapi.com/1");
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      setImage(data.data.map((e) => e.images.jpg.large_image_url));
    }
  }

  async function getQuotedata() {
    const response = await fetch(QUOTES_URL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  }

  // async function getAnimeData() {
  //   const response = await fetch(ANILIST_URL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: query,
  //       variables: variables,
  //     }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //   } else {
  //     console.log("Error In Request");
  //   }
  // }

  async function fetchAnime() {
    try {
      // Make a GET request to fetch anime data
      const response = await axios.get(`${BASE_URL}/anime`, {
        params: {
          "filter[categories]": "adventure",
          "page[limit]": 10,
        },
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      });

      console.log(response.data.data);
      // setData(response.data.data);
      setData(response.data.data.map((e) => e.attributes.coverImage.large));
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  }

  useEffect(() => {
    // getAnimeData();
    // getQuotedata();
    getJikanData();
    fetchAnime();
  }, []);

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
        {data
          ? data.map((e, i) => {
              return <img key={i} src={`${e}`} alt="" />;
            })
          : null}
      </Carousel>
      <Grid
        container
        id="Container"
        spacing={2}
        direction="row"
        justifyContent="flex-start"
      >
        <Grid item xs={6} spacing={3}>
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
