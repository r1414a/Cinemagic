import moment from "moment";
import Showtime from "../../models/showtimeModel.js";
import Reservation from "../../models/reservationModel.js";
import User from "../../models/userModel.js";

console.log("moviecontroller", moment.utc(Number(1750170600) * 1000).toDate());

// async function get(){
//     const tom= moment().add(1,'day');
//     const show = await Showtime.find({movieId: 552524 , startTime: {$lt: tom}});
//     console.log("get",show);
// }

//  get();

const getReservationForShowtime = async (req, res) => {
  try {
    const { showtimeID } = req.body;
    console.log("starttime", showtimeID);
    // const movieStartTime = moment.utc(Number(starttime) * 1000).toDate();
    // console.log(movieStartTime);

    const record = await Showtime.findById({ _id: showtimeID });
    // const record = await Showtime.findOneBy({
    //   startTime: movieStartTime,
    //   movieId: id,
    // });
    console.log(record);

    res
      .status(200)
      .json({ message: "reservation for showtime fetched", data: record });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error getting reservations for showtime form db." });
  }
};

const makeMovieReservation = async (req, res) => {
  try {
    const { seat, theater, city, email, showtimeID, price } = req.body;
    // console.log(movieID, seat, theater, city, showtime);
    // const movieStartTime = moment.utc(Number(showtime) * 1000).toDate();
    const totalamout = seat.length * price;

    const user = await User.findOne({ email: email });

    const availableShowtime = await Showtime.findById({ _id: showtimeID });
    // const availableShowtime = await Showtime.findOne({
    //   movieId: movieID,
    //   startTime: movieStartTime,
    // });
    const available = availableShowtime.availableSeats;

    // Check seat availability
    const isAvailable = seat.every((seat) => available.includes(seat));
    if (!isAvailable) {
      return res.status(400).json({ message: "Some seats are already booked" });
    }

    availableShowtime.availableSeats = available.filter(
      (s) => !seat.includes(s)
    );
    availableShowtime.reservedSeats.push(...seat);
    await availableShowtime.save();

    await Reservation.create({
      user: user._id,
      showtime: availableShowtime._id,
      seats: seat,
      paymentAmount: totalamout,
      theater: theater,
      city: city,
      status: "active",
    });

    res.status(200).json({ message: "Booking successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while making reservation." });
  }
};

const getShowtimeforAllDates = async (req, res) => {
  try {
    const { date, movieID } = req.body;
    console.log(date, movieID);
    let showtime_arr = [];
    const inputDate = moment(date * 1000);

    const startOfDay = inputDate.startOf("day").toDate();
    const endOfDay = inputDate.endOf("day").toDate();

    const show = await Showtime.find({
      movieId: movieID,
      startTime: { $gte: startOfDay, $lte: endOfDay },
    });

    for (const showtimeobj of show) {
      showtime_arr.push({
        showtimes: moment(showtimeobj.startTime).unix(),
        showtimeID: showtimeobj._id,
      });
    }

    showtime_arr.sort((a, b) => a.showtimes - b.showtimes);

    console.log("showtime array for that particular date: ", showtime_arr);
    res.status(200).json({ showtime_arr });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while making reservation." });
  }
};

const getTopFiveNowPlaying = async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_APIKEY}`;
    let topFive,
      arr_of_movie_id = [],
      newmovieID = [],
      createdShowtime = [];

    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      topFive = result.results.slice(0, 5);
    }

    for (const movie of topFive) {
      arr_of_movie_id.push(movie.id);
    }

    const existingMovieIDArr = await Showtime.distinct("movieID");

    for (const a of arr_of_movie_id) {
      console.log(a);
      if (!existingMovieIDArr.includes(a)) {
        newmovieID.push(a);
      }
    }

    if (newmovieID.length > 0) {
      for (const movie of newmovieID) {
        const times = [
          "09:30 AM",
          "12:00 PM",
          "14:30 PM",
          "17:15 PM",
          "20:00 PM",
        ];

        for (let i = 0; i < 5; i++) {
          let showtime_arr = [];
          const num = Math.floor(Math.random() * 5) + 1;
          console.log(num);

          if (num >= 2) {
            showtime_arr = times.slice(0, num);
          } else {
            showtime_arr = times.slice(num, num + 1);
          }

          //16,17,18,19,20
          //3, 4, 2, 4, 3

          //showtime_arr = ["09:30 AM","12:00 PM","14:30 PM"]

          const day = moment().add(i, "day").format("YYYY-MM-DD");

          for (let t of showtime_arr) {
            const start = moment(`${day} ${t}`, "YYYY-MM-DD hh:mm A").toDate();
            const { aseat, rseat } = getAvailableAndReservedSeats();

            createdShowtime.push({
              movieID: movie.id,
              movieTitle: movie.original_title,
              startTime: start,
              availableSeats: aseat,
              reservedSeats: rseat,
            });
          }
        }
      }
    }

    await Showtime.insertMany(createdShowtime);

    if (createdShowtime.length > 0) {
      res.status(200).json({
        message: "now playing fetched and showtimes added for new movie",
        data: topFive,
      });
    } else {
      res.status(200).json({
        message: "now playing fetched.",
        data: topFive,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error while getting top five now playing." });
  }
};

export {
  getReservationForShowtime,
  makeMovieReservation,
  getShowtimeforAllDates,
  getTopFiveNowPlaying,
};
