import MainHeading from "../ui/mainheading/MainHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink } from "react-router";
import CarouselNavigationButton from "../ui/carouselNavigationButton/CarouselNavigationButton";

export default function TypeMovies({ type, data }) {
  const trendingPrevRef = useRef(null);
  const trendingNextRef = useRef(null);
  const similarPrevRef = useRef(null);
  const similarNextRef = useRef(null);
  const upcomingPrevRef = useRef(null);
  const upcomingNextRef = useRef(null);

  return (
    <section
      className={`bg-blue min-h-[90vh] lg:my-20 flex justify-center items-center`}
    >
      <div className="w-full px-4 md:px-8 xl:px-4 2xl:px-0 lg:max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <MainHeading
            text={
              type === "trending"
                ? "Trending"
                : type === "similarmovies"
                ? "Similar Movies"
                : "Coming Soon"
            }
          />
          <div className="space-x-2 md:space-x-4">
            <CarouselNavigationButton
              pref={
                type === "trending"
                  ? trendingPrevRef
                  : type === "similarmovies"
                  ? similarPrevRef
                  : upcomingPrevRef
              }
              nref={
                type === "trending"
                  ? trendingNextRef
                  : type === "similarmovies"
                  ? similarNextRef
                  : upcomingNextRef
              }
            />
          </div>
        </div>

        <div>
          <Swiper
            modules={[Navigation]}
            // slidesPerView={6}
            // spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl =
                type === "trending"
                  ? trendingPrevRef.current
                  : type === "similarmovies"
                  ? similarPrevRef.current
                  : upcomingPrevRef.current;
              swiper.params.navigation.nextEl =
                type === "trending"
                  ? trendingNextRef.current
                  : type === "similarmovies"
                  ? similarNextRef.current
                  : upcomingNextRef.current;
            }}
            navigation={{
              prevEl:
                type === "trending"
                  ? trendingPrevRef.current
                  : type === "similarmovies"
                  ? similarPrevRef.current
                  : upcomingPrevRef.current,
              nextEl:
                type === "trending"
                  ? trendingNextRef.current
                  : type === "similarmovies"
                  ? similarNextRef.current
                  : upcomingNextRef.current,
            }}
            className="mySwiper"
          >
            {data &&
              data.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <NavLink to={`/movie/${movie.id}`} state={{ type: type }}>
                    <img
                      className="w-full"
                      src={`${import.meta.env.VITE_TMDB_BASEURL}/w342${
                        movie.poster_path
                      }`}
                      alt="movie poster"
                      loading="lazy"
                    />
                  </NavLink>
                  <h1 className="my-2 text-white text-md md:text-lg font-semibold">
                    {movie.original_title}
                  </h1>
                  <div className="flex text-white justify-between">
                    <div className="flex text-sm md:text-lg gap-1 items-center">
                      <FaStar className="text-dyellow" />
                      {movie.vote_average.toFixed(1)}/10
                    </div>
                    <div className="text-sm md:text-lg">{movie.vote_count} Votes</div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
