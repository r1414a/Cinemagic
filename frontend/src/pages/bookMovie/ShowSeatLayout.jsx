import { RiArmchairFill } from "react-icons/ri";
import { FaBackward } from "react-icons/fa";
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams
} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovieDetailCrewAndCast } from "../../redux/features/movieSlice/movie";
import Loading from "../loading/Loading";
import moment from "moment";
import { TbArmchair2Off } from "react-icons/tb";
import allapis from "../../util/allapis";


export default function ShowSeatLayout() {
   const params = useParams();
  const movieId = params.id;
  const [searchParams] = useSearchParams();
  const showtimekiID = searchParams.get("showtimeID")
  const theaterstr = searchParams.get("theater");
  const theater = JSON.parse(theaterstr);
  const city = searchParams.get("city")
  const time = searchParams.get("time")
  const date = searchParams.get("date")
  const dispatch = useDispatch();
  const [seat, setSeat] = useState([]);
  const { details, isLoading } = useSelector((state) => state.movie);
  const [seatsForTime, setSeatsForTime] = useState(null);

  console.log(showtimekiID,theater,time,city,date);

  useEffect(() => {
    console.log("fetchShowTimesFromDB")
    const fetchShowTimesFromDB = async () => {
      const result = await allapis(
        "/api/movies/showtime/reservations",
        "POST",
        false,
        // { starttime: selectedTime, id: details[0].id },
        { showtimeID: showtimekiID },
        "Error getting reservations for showtime form db.",
        (result) => {
          setSeatsForTime(result.data);
        }
      );
      console.log(result);
    };

    if (details.length != 0) {
      fetchShowTimesFromDB();
    }
  }, [details]);

  useEffect(() => {
    console.log("dispatch")
    dispatch(fetchMovieDetailCrewAndCast(movieId));
  }, [dispatch]);

  if (details.length === 0 || isLoading || seatsForTime == null) {
    return <Loading />;
  }

  const handleSeatSelection = (e) => {
    console.log(e.currentTarget.dataset.seatlocation);
    const seat = e.currentTarget.dataset.seatlocation;

    setSeat((prev) =>
      prev.includes(seat) || seatsForTime.reservedSeats.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  console.log(details, seat);

  return (
    <>
      <section
        className="relative min-h-screen"
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

        <div className="relative w-full h-full flex items-center justify-center  z-30">
          <div className=" w-full max-w-6xl px-6 lg:px-10 pt-38 pb-32 rounded-md flex gap-14 md:gap-0 flex-col md:flex-row">
            <div className=" relative w-full md:w-[65%] lg:w-[70%] space-y-12">
              <NavLink to={`/movie/book/${details[0].id}`}>
                <button className="absolute -top-14 text-white font-semibold flex items-center gap-3 cursor-pointer hover:text-dyellow">
                  <FaBackward />
                  back
                </button>
              </NavLink>
              <div>
                <ul className="flex justify-center gap-4 md:gap-8">
                  <li className="flex gap-2 items-center text-white">
                    <RiArmchairFill className="text-cream" />
                    Available
                  </li>
                  <li className="flex gap-2 items-center text-white">
                    <RiArmchairFill className="text-gray" />
                    Sold
                  </li>
                  <li className="flex gap-2 items-center text-white">
                    <RiArmchairFill className="text-dyellow" />
                    Selected
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="space-y-2">
                  {["X", "A", "B", "C", "D", "E", "F", "G", "H"].map(
                    (rowcode, rowIndex) => (
                      <div key={rowcode} className="flex gap-2">
                        {[...Array(13)].map((_, colIndex) => (
                          <div
                            key={colIndex}
                            className={`${
                              colIndex === 4 || colIndex === 8
                                ? "me-6 md:me-10 lg:me-18"
                                : colIndex === 0
                                ? "me-3 md:me-6"
                                : null
                            } text-xs md:text-sm text-center`}
                          >
                            {colIndex === 0 ? (
                              <p className="text-xs md:text-sm text-white">{rowcode}</p>
                            ) : rowIndex > 0 ? (
                              <div
                                onClick={handleSeatSelection}
                                data-seatlocation={`${rowcode}-${colIndex}`}
                                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                              >
                                <RiArmchairFill
                                  className={`w-full h-full text-xl text-cream ${
                                    seat.includes(`${rowcode}-${colIndex}`)
                                      ? "text-dyellow"
                                      : seatsForTime.reservedSeats.includes(
                                          `${rowcode}-${colIndex}`
                                        )
                                      ? "text-gray"
                                      : "text-cream hover:text-dyellow"
                                  } `}
                                />
                              </div>
                            ) : (
                              <div className="w-4 h-4 md:w-5 md:h-5">
                                <p className="text-white">{colIndex}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // width="550"
                  // height="50"
                  className="mx-auto w-[330px] lg:w-[550px] h-[40px] lg:h-[50px] rotate-180"
                  viewBox="0 0 704 60"
                  fill="none"
                >
                  <path
                    d="M2 57.3338C2 57.3338 80.3312 3.00071 352 3C623.669 2.99929 702 57.3338 702 57.3338"
                    stroke="white"
                    strokeWidth="4"
                  />
                </svg>
                <p className="mt-4 text-center text-white text-sm">
                  All eyes this way please.
                </p>
              </div>
            </div>
            <div
              id="showSeatLayoutTicket"
              className={`w-md  mx-auto md:w-[35%] lg:w-[30%] bg-dyellow rounded-md`}
            >
              <div className="p-3 border-b-3 border-dashed">
                <h1 className="text-xl text-center">TICKETS</h1>
              </div>

              <div className="space-y-4 py-4">
                <div className="px-6 space-y-2">
                  <h1 className="text-sm font-medium">
                    {details[0].original_title} -{" "}
                    <span className="text-xs">
                      {moment(details[0].release_date).format("DD MMM YY")}
                    </span>
                  </h1>
                  <p className="text-sm">
                    {theater.chain} | {theater.name} |{" "}
                    {theater.location} | {city}
                  </p>
                  <p className="text-sm">
                    {moment
                      .unix(time)
                      .format("dddd, MMMM Do YYYY, hh:mm A")}
                  </p>
                </div>
              </div>
              <div className={`${seat.length === 0 ? "p-6" : "px-0"}`}>
                {seat.length === 0 ? (
                  <div className="flex flex-col justify-center items-center min-h-48 rounded-md bg-blue text-white  gap-3 px-6 py-4">
                    <TbArmchair2Off className="text-3xl" />
                    <p className="text-md">No seat selected.</p>
                  </div>
                ) : (
                  <>
                    <div className="px-6 h-16 space-y-1">
                      <p className="text-sm font-semibold">Seat Info:</p>
                      <div className="space-x-1">
                        {seat.length > 5 ? (
                          <div className="flex items-center gap-2">
                            {[...Array(5)].map((item, index) => (
                              <div
                                key={item}
                                className="p-1 rounded-md inline-block text-white bg-gray"
                              >
                                <p className="text-xs">{seat[index]}</p>
                              </div>
                            ))}
                            <p className="text-xs">& {seat.length - 5} more</p>
                          </div>
                        ) : (
                          seat.map((item) => (
                            <div
                              key={item}
                              className="p-1 rounded-md inline-block text-white bg-gray"
                            >
                              <p className="text-xs">{item}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="px-6 space-y-2">
                      <p className="text-sm font-semibold">Payment Details:</p>
                      {
                        //5 din nahi hua
                        moment().subtract(5, "days").unix() <
                        moment(details[0].release_date).unix() ? (
                          <ShowSeatInfoAndPayment
                            seat={seat}
                            price={500}
                            showtimeID={showtimekiID}
                            theater={theater}
                            city={city}
                          />
                        ) : (
                          <ShowSeatInfoAndPayment
                            seat={seat}
                            price={250}
                            showtimeID={showtimekiID}
                            theater={theater}
                            city={city}
                          />
                        )
                      }
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ShowSeatInfoAndPayment({
  seat,
  price,
  theater,
  city,
  showtimekiID
}) {
  const { userProfile } = useSelector((state) => state.user);
  console.log(userProfile);
  const navigate = useNavigate();

  const handleBooking = async () => {
    const result = await allapis(
      "/api/movies/bookMovie",
      "POST",
      false,
      { showtimekiID, seat, theater, city, email: userProfile.email,price },
      "Error while making a reservation.",
      (result) => {
        navigate("/movie/book/success");
      }
    );
    console.log(result);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-sm">
          {seat.length} X {price}
        </p>
        <p>₹{seat.length * price}</p>
      </div>
      <div className="my-6 h-1 w-full border-b-2 border-dashed"></div>

      <div className="px-6 text-center">
        <button
          onClick={handleBooking}
          className="cursor-pointer w-full text-sm bg-blue text-white py-3 px-6 rounded-md"
        >
          Grand Total: Rs {seat.length * price}
        </button>
      </div>
    </>
  );
}
