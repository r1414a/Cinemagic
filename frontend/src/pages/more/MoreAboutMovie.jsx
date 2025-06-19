import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  fetchMovieDetailCrewAndCast,
  fetchMovieVideoAndSimilarAndReviews,
  resetMovieState,
} from "../../redux/features/movieSlice/movie";
import Loading from "../loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import fallbackProfileImage from "../../assets/fallbackProfileImage.png";
import CarouselNavigationButton from "../../component/ui/carouselNavigationButton/CarouselNavigationButton";
import TypeMovies from "../../component/typemovies/TypeMovies";
import FiveStars from "../../component/ui/starsReview/FiveStars";
import MovieDuration from "../../component/ui/movieDuration/MovieDuration";
import BookTicketButton from "../../component/ui/buttons/bookTicket/BookTicketButton";
import MainHeading from "../../component/ui/mainheading/MainHeading";
import moment from "moment";
import { useLocation } from "react-router";

export default function MoreAboutMovie() {
  const {state} = useLocation();
  console.log(location)
  const prevStarringRef = useRef();
  const nextStarringRef = useRef();
  const prevReviewRef = useRef();
  const nextReviewRef = useRef();
  const dispatch = useDispatch();
  const [notShowBookButton, setNotShowBookButton] = useState(false);
  const { details, credits, video, similarMovies, isLoading, movieReview } =
    useSelector((state) => state.movie);
  const params = useParams();
  const movieId = params.id;
  let trailer_video;

  console.log(details,video);

  useEffect(() => {
    dispatch(fetchMovieDetailCrewAndCast(movieId));
    dispatch(fetchMovieVideoAndSimilarAndReviews(movieId));

    return () => {
      dispatch(resetMovieState());
    };
  }, [dispatch, movieId]);

  useEffect(() => {
    if (details.length > 0) {
      const futureDate = moment().clone().add(15, "days").format("YYYY-MM-DD");
      const twoMonthsBefore = moment()
        .clone()
        .subtract(2, "months")
        .format("YYYY-MM-DD");
      const upcomingMovie =  moment(details[0]?.release_date).isAfter(futureDate);
      const oldMovie = moment(details[0].release_date).isBefore(twoMonthsBefore)

      setNotShowBookButton(upcomingMovie || oldMovie);
    }
  }, [details]);

  if (video) {
    trailer_video = video.results.filter(
      (video) => video.name === "Official Trailer" || video.type === "Trailer"
    );
  }

  if (details.length === 0 || !video || isLoading) {
    return <Loading />;
  }

  console.log(trailer_video)
  return (
    <>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_TMDB_BASEURL}/original${
            details[0].backdrop_path
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="absolute w-full z-10 h-full bg-radial-[at_50%_80%] md:bg-radial-[at_50%_50%] from-transparent to-black to-70% opacity-[0.9] lg:opacity-[0.7]"></div>
        <div className="w-full z-20">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="max-w-xl text-white text-4xl md:text-6xl font-semibold">
              {details[0].original_title}
            </h1>
            <p className="max-w-xl my-4 md:my-8 text-sm md:text-lg text-white">{details[0].overview}</p>
            {(notShowBookButton || state.type === "trending" || state.type === "comingsoon") ? null : <BookTicketButton id={details[0].id} />}
          </div>
        </div>

        <div className="absolute w-full max-w-7xl px-4 z-30 -bottom-35 left-1/2 -translate-x-1/2">
          <div className="flex justify-end items-center mb-4 gap-4">
            <p className="text-white font-semibold">Starring:</p>
            <CarouselNavigationButton
              pref={prevStarringRef}
              nref={nextStarringRef}
            />
          </div>
          <Swiper
            // slidesPerView={7}
            // spaceBetween={10}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 10,
              },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevStarringRef.current;
              swiper.params.navigation.nextEl = nextStarringRef.current;
            }}
            navigation={{
              prevEl: prevStarringRef.current,
              nextEl: nextStarringRef.current,
            }}
            modules={[Navigation]}
            className="mySwiper w-full max-w-7xl mx-auto"
          >
            {credits[0].cast.map((actors) => (
              <SwiperSlide className="">
                <div className="relative w-full h-60">
                  <img
                    className="w-full rounded-sm h-full object-cover"
                    src={
                      actors.profile_path
                        ? `${import.meta.env.VITE_TMDB_BASEURL}/original${
                            actors.profile_path
                          }`
                        : fallbackProfileImage
                    }
                    alt={actors.name || "Actor"}
                  />
                  <div className="bg-blue/80 backdrop-blur-md w-full py-2 absolute bottom-0 ">
                    <h3 className="  text-center text-sm text-dyellow ">
                      {actors.name}
                    </h3>
                    <p className="text-center text-xs md:text-sm text-white">
                      {" "}
                      as{" "}
                      <span className="text-dyellow">{actors.character}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="bg-blue h-64 md:h-72"></div>

      <div className="bg-blue w-full mb-14">
        <div className=" min-h-[90vh] max-w-7xl mx-auto ">
          <div className="max-w-4xl mx-auto px-8">
            <iframe
              width="100%"
              className="h-[500px] aspect-video"
              src={`https://www.youtube.com/embed/${trailer_video[0]?.key}`}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 px-4 justify-center mt-10">
            <div className="flex items-center">
              <span className="text-dyellow me-2">Rating:</span>
              <FiveStars rating={details[0].vote_average.toFixed(2)} />
            </div>

            <div>
              <p className="text-white flex items-center">
                <span className="text-dyellow me-2">Released:</span>
                {details[0].release_date.slice(0, 4)}
              </p>
            </div>

            <div className="flex">
              <span className="text-dyellow me-2">Duration:</span>
              <MovieDuration duration={details[0].runtime} />
            </div>

            <div>
              <p className="text-white">
                <span className="text-dyellow me-2">Gener(s):</span>
                {details[0].genres.map((item) => item.name).join(",")}
              </p>
            </div>

            <div>
              {credits[0].crew.map((crew) =>
                crew.job === "Director" ? (
                  <p key={crew.id} className=" text-white">
                    <span className="text-dyellow font-semibold me-2">
                      Director:
                    </span>
                    {crew.name}
                  </p>
                ) : null
              )}
            </div>

            <div>
              <p className="text-white">
                <span className="text-dyellow me-2">Language:</span>
                {details[0].original_language}
              </p>
            </div>
            <div>
              <p className="text-white">
                <span className="text-dyellow me-2">Country:</span>
                {details[0].origin_country.join(",")}
              </p>
            </div>
          </div>

          {(notShowBookButton || state.type === "trending" || state.type === "comingsoon") ? null : (
            <div className="mt-10 text-center">
              <BookTicketButton id={details[0].id} />
            </div>
          )}
        </div>
      </div>

      <TypeMovies type={"similarmovies"} data={similarMovies} />

      <section className="bg-blue w-full pt-10 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <MainHeading text={"Reviews"} />
            <div className="space-x-4">
              <CarouselNavigationButton
                pref={prevReviewRef}
                nref={nextReviewRef}
              />
            </div>
          </div>

          {movieReview.length === 0 ? (
            <p className="text-white text-lg text-center">No reviews</p>
          ) : (
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              autoHeight={true}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevReviewRef.current;
                swiper.params.navigation.nextEl = nextReviewRef.current;
              }}
              navigation={{
                prevEl: prevReviewRef.current,
                nextEl: nextReviewRef.current,
              }}
              modules={[EffectFade, Navigation]}
              className="mySwiper"
            >
              {movieReview.map((review) => (
                <SwiperSlide>
                  <div className="bg-blue space-y-4 h-fit">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-dyellow text-2xl">
                          {review.author_details.name ||
                            review.author_details.username}
                        </h2>
                      </div>
                      <div className="flex gap-2">
                        <FiveStars rating={review.author_details.rating} />
                      </div>
                    </div>
                    <div>
                      <p className="text-white ">{review.content}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </>
  );
}
