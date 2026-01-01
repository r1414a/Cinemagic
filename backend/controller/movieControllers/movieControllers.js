import moment from "moment-timezone";
import Showtime from "../../models/showtimeModel.js";
import Reservation from "../../models/reservationModel.js";
import User from "../../models/userModel.js";

console.log("moviecontroller", moment.utc(Number(1750170600) * 1000).toDate());

function getAvailableAndReservedSeats() {
  let rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let all_seats_arr = [
    "A-1",
    "A-2",
    "A-3",
    "A-4",
    "A-5",
    "A-6",
    "A-7",
    "A-8",
    "A-9",
    "A-10",
    "A-11",
    "A-12",
    "B-1",
    "B-2",
    "B-3",
    "B-4",
    "B-5",
    "B-6",
    "B-7",
    "B-8",
    "B-9",
    "B-10",
    "B-11",
    "B-12",
    "C-1",
    "C-2",
    "C-3",
    "C-4",
    "C-5",
    "C-6",
    "C-7",
    "C-8",
    "C-9",
    "C-10",
    "C-11",
    "C-12",
    "D-1",
    "D-2",
    "D-3",
    "D-4",
    "D-5",
    "D-6",
    "D-7",
    "D-8",
    "D-9",
    "D-10",
    "D-11",
    "D-12",
    "E-1",
    "E-2",
    "E-3",
    "E-4",
    "E-5",
    "E-6",
    "E-7",
    "E-8",
    "E-9",
    "E-10",
    "E-11",
    "E-12",
    "F-1",
    "F-2",
    "F-3",
    "F-4",
    "F-5",
    "F-6",
    "F-7",
    "F-8",
    "F-9",
    "F-10",
    "F-11",
    "F-12",
    "G-1",
    "G-2",
    "G-3",
    "G-4",
    "G-5",
    "G-6",
    "G-7",
    "G-8",
    "G-9",
    "G-10",
    "G-11",
    "G-12",
    "H-1",
    "H-2",
    "H-3",
    "H-4",
    "H-5",
    "H-6",
    "H-7",
    "H-8",
    "H-9",
    "H-10",
    "H-11",
    "H-12",
  ];

  let totalAvailable = Math.floor(Math.random() * 96) + 1;
  console.log(totalAvailable);
  let available_seat_arr = [];

  while (available_seat_arr.length < totalAvailable) {
    //random rows
    let randrow = Math.floor(Math.random() * 8);
    //random cols
    let randcol = Math.floor(Math.random() * 12);

    if (!available_seat_arr.includes(rows[randrow] + "-" + cols[randcol])) {
      available_seat_arr.push(rows[randrow] + "-" + cols[randcol]);
    }
  }

  const reserved_seat_arr = all_seats_arr.filter(
    (seat) => !available_seat_arr.includes(seat)
  );

  return { aseat: available_seat_arr.sort(), rseat: reserved_seat_arr };
}


const getReservationForShowtime = async (req, res) => {
  try {
    const { showtimeID } = req.body;
    console.log("starttime", showtimeID);
    // const movieStartTime = moment.utc(Number(starttime) * 1000).toDate();
    // console.log(movieStartTime);

    const record = await Showtime.findById(showtimeID);
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
    const totalamount = seat.length * price;

    const user = await User.findOne({ email: email });

    const availableShowtime = await Showtime.findById(showtimeID);
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
      paymentAmount: totalamount,
      theater: theater,
      city: city,
      status: "coming",
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
    const inputDate = moment.tz(date * 1000, "Asia/Kolkata");

    const startOfDay = inputDate.startOf("day").toDate();
    const endOfDay = inputDate.endOf("day").toDate();

    const show = await Showtime.find({
      movieID: movieID,
      startTime: { $gte: startOfDay, $lte: endOfDay },
    });

    for (const showtimeobj of show) {
      showtime_arr.push({
        showtimes: showtimeobj.startTime,
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
      arr_of_movie_id.push(movie);
    }

    const existingMovieIDArr = await Showtime.distinct("movieID");
    
    console.log("moviecontroller",arr_of_movie_id,existingMovieIDArr)
    for (const movie of arr_of_movie_id) {
     
      if (!existingMovieIDArr.includes(movie.id)) {
        newmovieID.push(movie);
      }
    }
//21,22,23,24,25
    if (newmovieID.length > 0) {
      for (const movie of newmovieID) {
        // const times = [
        //   "09:30 AM",
        //   "12:00 PM",
        //   "14:30 PM",
        //   "17:15 PM",
        //   "20:00 PM",
        // ];

        const times = [
          "04:00 AM",
          "06:30 AM",
          "09:00 AM",
          "11:45 AM",
          "02:30 PM",
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


const fetchSome = async(req,res) => {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_APIKEY}&language=en-US&page=1`)

    const data = await res.json();

 res.status(200).json({
        message: "fetchsome sucess",
        data: data,
      });
  }catch(err){
    console.log(err);
    res
      .status(500)
      .json({ message: "fetchsome failed" });
  
  }
}

export {
  fetchSome,
  getReservationForShowtime,
  makeMovieReservation,
  getShowtimeforAllDates,
  getTopFiveNowPlaying,
};
