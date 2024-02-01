import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Container } from "@mui/material";

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
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState();

  async function getJikanData() {
    // const anime_id = 1;
    const response = await fetch(`https://api.jikan.moe/v4/top/anime`);
    if (response.ok) {
      const data = await response.json();
      console.log(data.data[0].images);

      setData(data.data.map((e) => e.images.jpg.image_url));
    }
  }

  async function getQuotedata() {
    const response = await fetch(QUOTES_URL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  }

  async function getAnimeData() {
    const response = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Error In Request");
    }
  }

  // async function fetchAnime() {
  //   try {
  //     // Make a GET request to fetch anime data
  //     const response = await axios.get(`${BASE_URL}/anime`, {
  //       params: {
  //         "filter[categories]": "adventure",
  //         "page[limit]": 10,
  //       },
  //       headers: {
  //         Accept: "application/vnd.api+json",
  //         "Content-Type": "application/vnd.api+json",
  //       },
  //     });

  //     console.log(response.data.data);
  //     setData(response.data.data);
  //     setImage(response.data.data[0].attributes.coverImage.large);
  //   } catch (error) {
  //     console.error("Error fetching anime:", error);
  //   }
  // }

  useEffect(() => {
    // getAnimeData();
    getQuotedata();
    getJikanData();
    // fetchAnime();
  }, []);

  //###############################################################################################################################################################
  //Return

  return (
    <div>
      <Container></Container>
      <Grid direction="row" justifyContent="flex-start" alignItems="flex-start">
        <Grid item xs={6} md={8}>
          {data
            ? data.map((e, i) => {
                return <img key={i} src={`${e}`} alt="" />;
              })
            : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
