import Carousel from "react-material-ui-carousel";
import { useGlobalcontext } from "../contexts/GlobalProvider";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { globalcontextType } from "../utils/utils";

export default function HomePage() {
  const [Anime, setAnime] = useState([]);
  const [loaded, setLoaded] = useState<boolean>();
  const [Animedata, setAnimeData] = useState([]);
  const { animeWallpaper, popularAnime } =
    useGlobalcontext() as globalcontextType;

  useEffect(() => {
    const time = setTimeout(() => {
      localStorage.setItem("POPULAR_ANIME", JSON.stringify(Animedata));
      localStorage.setItem("ANIME_WALLPAPER", JSON.stringify(Anime));
    }, 1000);

    return () => clearTimeout(time);
  }, [Anime, Animedata]);

  useEffect(() => {
    setAnime(animeWallpaper);
    setAnimeData(popularAnime);
    setLoaded(true);
  }, [animeWallpaper, popularAnime]);

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <main className="p-4">
          <section className="relative mb-8">
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
                {Anime.length !== 0 && loaded === true
                  ? Anime.map((Anime, i) => {
                      return (
                        <div key={i} className="relative text-white bg-center ">
                          <img
                            src={`${Anime.poster}`}
                            width={3360}
                            height={800}
                            alt={`Carousel Slide ${i + 1}`}
                          />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h1 className="text-4xl font-bold">{Anime.name}</h1>
                            <div className="flex items-center space-x-2 mt-2">
                              <span>{Anime.otherInfo[0]}</span>
                              <span>{Anime.otherInfo[1]}</span>
                              <span>⭐</span>
                              <span>4.9</span>
                              <span>24mins</span>
                            </div>
                            <p className="mt-2 max-w-lg">
                              "My wish as champion is for you to descend the
                              tower and save the world."
                            </p>
                            <button className="mt-4 p-2 bg-primary text-primary-foreground rounded-md bg-red-800">
                              WATCH NOW
                            </button>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </Carousel>
            ) : (
              <h1>Not Found....</h1>
            )}
          </section>
          {/* <section className="mb-8">
            <h2 className="text-2xl text-white font-bold mb-4">
              CONTINUE WATCHING
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="relative">
                <img
                  src="https://placehold.co/200x300"
                  alt="Delicious in Dungeon"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 text-white">
                  Delicious in Dungeon - Harpy Cimera
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://placehold.co/200x300"
                  alt="WIND BREAKER"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 text-white">
                  WIND BREAKER
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://placehold.co/200x300"
                  alt="ONE PIECE"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 text-white">
                  ONE PIECE
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://placehold.co/200x300"
                  alt="KONOSUBA"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 text-white">
                  KONOSUBA
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://placehold.co/200x300"
                  alt="Frieren"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 text-white">
                  Frieren
                </div>
              </div>
            </div>
          </section> */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">TRENDING</h2>
            <Grid
              container
              spacing={2}
              direction="row"
              marginTop={5}
              justifyContent="center"
            >
              {Anime
                ? Anime.map((anime, i) => {
                    return (
                      <Grid item xs={5} sm={6} md={4} lg={2} xl={2} key={i}>
                        <Link
                          to={`/${anime.id}/${encodeURIComponent(anime.name)}`}
                        >
                          <img
                            className="AnimeImages"
                            key={anime.id}
                            src={`${anime.poster}`}
                            alt={`Item ${i}`}
                          />
                        </Link>
                        <h1>{anime.name}</h1>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </section>
          // Trending
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">TOP AIRING</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typeof Animedata !== "undefined"
                ? Animedata.map((anime, i) => {
                    return (
                      <Link
                        to={`/${anime.id}/${encodeURIComponent(anime.name)}`}
                      >
                        <div key={i} className="relative">
                          <img
                            src={anime.poster}
                            key={i}
                            alt="Top Airing 1"
                            className="w-full h-full object-cover rounded-lg AnimeImages"
                          />
                          <div className="absolute bottom-2 left-2 text-white">
                            Top Airing {i + 1}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : null}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
