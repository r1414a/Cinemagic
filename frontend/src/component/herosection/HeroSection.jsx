import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

import { ShowCrewCast } from "./ShowCrewCast";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetailCrewAndCast } from "../../redux/features/movieSlice/movie";
import { NavLink } from "react-router";
import Loading from "../../pages/loading/Loading";
import { resetMovieState } from "../../redux/features/movieSlice/movie";
import FiveStars from "../ui/starsReview/FiveStars";
import MovieDuration from "../ui/movieDuration/MovieDuration";
import BookTicketButton from "../ui/buttons/bookTicket/BookTicketButton";
import allapis from "../../util/allapis";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_APIKEY;

export default function HeroSection() {
  const dispatch = useDispatch();

  const [topFiveMovies, setTopFiveMovies] = useState(null);

  const { details, credits, isLoading } = useSelector((state) => state.movie);

  useEffect(() => {
    if (topFiveMovies) {
      const getShowTime = async () => {
        const result = await allapis(
          "/api/automateShowtime",
          "POST",
          { topFiveMovies: topFiveMovies },
          "Error while storing showtime"
        );
        console.log(result);
      };
      getShowTime();
    }
  }, [topFiveMovies]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`;

        const response = await fetch(now_playing_url);
        const result = await response.json();
        if (response.ok) {
          const topFive = result.results.slice(0, 5);
          setTopFiveMovies(topFive);
          topFive.forEach((movie) => {
            dispatch(fetchMovieDetailCrewAndCast(movie.id));
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopMovies();

    return () => {
      dispatch(resetMovieState());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  // console.log(details,credits)

  return (
    <section className=" h-screen">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-full"
      >
        {details &&
          details.map((movie) => (
            <SwiperSlide
              className={``}
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_TMDB_BASEURL
                }/original${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                display: "flex",
                // alignItems: "end",
              }}
            >
              <div className="absolute w-full z-10 h-full bg-radial-[at_50%_80%] md:bg-radial-[at_50%_50%] from-transparent to-black to-70% opacity-[0.9] lg:opacity-[0.7] "></div>
              <div className=" z-30 w-full h-full">
                <div className="w-full h-full max-w-7xl mx-auto px-8 md:px-8 xl:px-4  pb-24 md:pb-26 lg:pb-20 xl:pb-24 2xl:pb-20 flex flex-col md:flex-row gap-10 md:gap-4 lg:gap-0 justify-end md:justify-between md:items-end">
                  <div className="md:w-[60%] space-y-3 lg:space-y-4">
                    <h1 className="max-w-xl text-white text-4xl md:text-5xl lg:text-6xl font-semibold">
                      {movie.original_title}
                    </h1>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      <div>
                        <p className="text-md text-white">
                          {movie.genres.map((item) => item.name).join(",")}
                        </p>
                      </div>
                      <div>
                        <p className="text-white flex gap-2 items-center">
                          <FaCalendarAlt className="text-dyellow" />
                          {movie.release_date.slice(0, 4)}
                        </p>
                      </div>
                      <div>
                        <MovieDuration duration={movie.runtime} />
                      </div>
                    </div>
                    <div className="flex gap-2 text-white">
                      <div className="flex items-center">
                        <FiveStars rating={movie.vote_average.toFixed(2)} />
                      </div>
                      <div>{movie.vote_count} Votes</div>
                    </div>
                    <div className="space-x-4 mt-8">
                      <BookTicketButton id={movie.id} />
                      <NavLink
                        to={`/movie/${movie.id}`}
                        className="py-3 px-10 rounded-sm font-semibold border-2 border-dyellow text-dyellow"
                      >
                        More
                      </NavLink>
                    </div>
                  </div>
                  <div className="md:w-[40%] flex flex-col space-y-1 md:space-y-3">
                    <ShowCrewCast movieData={movie} creditData={credits} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
