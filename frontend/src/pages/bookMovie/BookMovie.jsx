import { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router";
import { fetchMovieDetailCrewAndCast } from "../../redux/features/movieSlice/movie";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/Loading";
// import moment from "moment";
import FiveStars from "../../component/ui/starsReview/FiveStars";
import { FaCalendarAlt } from "react-icons/fa";
import MovieDuration from "../../component/ui/movieDuration/MovieDuration";
import { dummyTheaters } from "../../data/dummyTheaters";
import { FaArrowRight } from "react-icons/fa";
import allapis from "../../util/allapis";
import moment from "moment-timezone";

export default function BookMovie() {
  const params = useParams();
  const movieId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showtimecache = useRef({});
  const { details, isLoading } = useSelector((state) => state.movie);
  const {
    selectedCity,
    setSelectedCity,
    selectedDate,
    selectedTheater,
    selectedTime,
    setSelectedDate,
    setSelectedTheater,
    setSelectedTime,
    setShowtimeID,
    showtimeID,
  } = useOutletContext();
  const [dateDay, setDateDay] = useState([]);
  const [timeslots, setTimeslots] = useState(null);

  const getTodayShowTime = async (date) => {
    console.log(date);
    if (date === selectedDate && timeslots != null) return;

    if (showtimecache.current[date]) {
      setSelectedDate(date);
      setTimeslots(showtimecache.current[date]);
      return;
    }

    setSelectedDate(date);

    const result = await allapis(
      "/api/movies/getShowtimeforAllDates",
      "POST",
      false,
      { date: date, movieID: details[0].id },
      "Error while getting showtimes for all dates.",
      (result) => {
        const sorted = result.showtime_arr.sort();
        showtimecache.current[date] = sorted;
        setTimeslots(sorted);
      }
    );
    console.log(result);
  };

  useEffect(() => {
    if (details.length) {
      getTodayShowTime(selectedDate);
    }
  }, [details]);

  useEffect(() => {
    dispatch(fetchMovieDetailCrewAndCast(movieId));

    function getDateAndDay() {
      const date_and_day_arr = [];

      for (let i = 0; i < 5; i++) {
        const date = moment().add(i, "days");

        date_and_day_arr.push({
          date: date.format("YYYY-MM-DD"),
          dateUnix: date.unix(),
        });
      }

      setDateDay(date_and_day_arr);
    }

    getDateAndDay();
  }, [dispatch]);

  if (details.length === 0 || isLoading) {
    return <Loading />;
  }

  const isTimeSlotPast = (timeslot) => {
  const now = moment().tz("Asia/Kolkata");
  const timeslotTime = moment.unix(timeslot).tz("Asia/Kolkata");
  const selectedDay = moment.unix(selectedDate).tz("Asia/Kolkata");

  // Only compare time if the selected date is today
  if (selectedDay.isSame(now, "day")) {
    return timeslotTime.isBefore(now);
  }

  return false;
};

  const handleProceedToSeatLayout = () => {
    navigate(
      `/movie/book/${
        details[0].id
      }/seatLayout?showtimeID=${showtimeID}&theater=${JSON.stringify(
        selectedTheater
      )}&city=${selectedCity}&time=${selectedTime}&date=${selectedDate}`
    );
  };

  console.log(
    "selectedCity",
    selectedCity,
    "selecteTheater",
    selectedTheater,
    "selectedTime",
    selectedTime,
    "selectedDate",
    selectedDate,
    "timeslots arr",
    timeslots
  );

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_TMDB_BASEURL}/original${
            details[0].backdrop_path
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute w-full z-10 h-full bg-radial-[at_50%_50%] from-transparent to-black to-0% opacity-[0.8] "></div>

        <div className="relative w-full h-full flex items-center justify-center z-30">
          <div className="relative w-full max-w-6xl px-6 lg:px-10 py-32 rounded-md flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-[40%] flex flex-col items-center justify-center space-y-3">
              <h1 className="text-4xl xl:text-5xl text-center font-semibold text-white">
                {details[0].original_title}
              </h1>
              <div>
                <img
                  src={`${import.meta.env.VITE_TMDB_BASEURL}/w185${
                    details[0].poster_path
                  }`}
                  className="rounded-md"
                  alt={"movie poster"}
                />
              </div>
              <div className="flex gap-2 items-center">
                <FiveStars rating={details[0].vote_average.toFixed(2)} />
              </div>
              <div className="flex gap-2">
                <MovieDuration duration={details[0].runtime} />
                <p className="flex items-center gap-2 text-white ">
                  <FaCalendarAlt className="text-dyellow" />
                  {details[0].release_date.slice(0, 4)}
                </p>
              </div>
              <div className="flex items-center">
                <div>
                  <p className="text-white">
                    {details[0].genres.map((item) => item.name).join(",")}
                  </p>
                </div>
              </div>
            </div>
            <div className=" space-y-8 md:space-y-6 w-full md:w-[60%]">
              {/* Date */}
              <div className="space-y-2">
                <p className="text-white font-semibold">Select Date:</p>
                <div className=" grid text-white grid-cols-5 gap-2 md:gap-3">
                  {dateDay.map((item) => (
                    <button
                      onClick={() => getTodayShowTime(item.dateUnix)} //date in unix
                      key={item.date}
                      className={`cursor-pointer ${
                        moment.unix(selectedDate).format("YYYY-MM-DD") ===
                        moment.unix(item.dateUnix).format("YYYY-MM-DD")
                          ? "bg-dyellow text-black"
                          : null
                      } flex flex-col gap-1 border-2 border-dyellow py-2 hover:bg-dyellow hover:text-black transition-all duration-300 ease-in-out rounded-md text-sm`}
                    >
                      <span>{moment(item.date).format("DD")}</span>
                      <span>{moment(item.date).format("ddd")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeslot */}
              <div className="space-y-2">
                <p className="text-white font-semibold">Select Showtime:</p>
                <div className="grid text-white grid-cols-3 gap-2 md:gap-3">
                  {timeslots &&
                    timeslots.map((obj) => (
                      <button
                        disabled={isTimeSlotPast(obj.showtimes)}
                        key={obj.showtimes}
                        onClick={() => {
                          setSelectedTime(obj.showtimes);
                          setShowtimeID(obj.showtimeID);
                        }}
                        className={`border-2 border-dyellow py-2 rounded-md cursor-pointer hover:bg-dyellow hover:text-black transition-all duration-300 ease-in-out text-sm disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed ${
                          selectedTime === obj.showtimes
                            ? "bg-dyellow text-black"
                            : null
                        }`}
                      >
                        {moment.unix(obj.showtimes).tz("Asia/kolkata").format("HH:mm")}
                      </button>
                    ))}
                </div>
              </div>

              {/* City */}
              <div className=" w-full flex gap-4 md:gap-6">
                <div className="custom-select w-[40%] md:w-[25%]">
                  <label
                    htmlFor="city"
                    className="block mb-2 font-semibold text-white"
                  >
                    Select City:
                  </label>
                  <select
                    onChange={(e) => setSelectedCity(e.target.value)}
                    id="city"
                    value={selectedCity}
                    className="relative focus:ring-0 bg-transparent border-2 border-dyellow rounded-md block w-full text-white text-sm  p-2.5"
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    {["Mumbai", "Pune", "Bengaluru", "Hyderabad", "Delhi"].map(
                      (city) => (
                        <option
                          key={city}
                          className=" bg-blue text-white"
                          // selected={city === "Pune"}
                          value={city}
                        >
                          {city}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Theater*/}
                <div className="custom-select w-[60%] md:w-[75%]">
                  <label
                    htmlFor="theater"
                    className="block mb-2 font-semibold text-white"
                  >
                    Select Theater:
                  </label>
                  <select
                    onChange={(e) =>
                      setSelectedTheater(JSON.parse(e.target.value))
                    }
                    value={
                      selectedTheater ? JSON.stringify(selectedTheater) : ""
                    }
                    id="theater"
                    className="relative focus:ring-0 bg-transparent border-2 border-dyellow rounded-md block w-full text-white text-sm  p-2.5"
                  >
                    <option value="" disabled>
                      Select Theater
                    </option>

                    {selectedCity
                      ? dummyTheaters[selectedCity].map((theater) => (
                          <option
                            key={theater.name}
                            className=" bg-blue text-white"
                            value={JSON.stringify(theater)}
                          >
                            Name: {theater.name}, Location: {theater.location}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>

              <button
                disabled={
                  selectedCity == "" ||
                  selectedTheater == null ||
                  selectedTime == ""
                }
                onClick={handleProceedToSeatLayout}
                className="flex gap-2 items-center bg-dyellow py-3 px-8 text-sm rounded-md font-medium cursor-pointer disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
