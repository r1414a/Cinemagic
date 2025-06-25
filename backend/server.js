import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import moment from 'moment';
import Showtime from './models/showtimeModel.js';
// import cron from 'node-cron'
// import Reservation from './models/reservationModel.js';
import userRoutes from './routes/userRoutes.js';
import moviesRoutes from "./routes/moviesRoutes.js";
// import getAutomateShowTime from './utils/automateShowtimes.js';
// import deleteOldShowtimes from './utils/deleteOldShowtimes.js';
import cronRoutes from './routes/cronRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 8001;
const app = express();
connectDB();

app.use(cors({
    origin: process.env.CLIENT_DEV_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}))


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/auth', authRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cron', cronRoutes);


app.get('/',(req,res) => {
    res.send('server started');
})


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


app.get('/getshow', async(req,res) => {
    try{
        let topFive;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_APIKEY}`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      topFive = result.results.slice(0, 5);
    }
    let createdShowtime = [];

    for (const movie of topFive) {
      const existInShowtime = await Showtime.findOne({ movieId: movie.id });

      if (!existInShowtime) {
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
    if (createdShowtime.length > 0) {
      await Showtime.insertMany(createdShowtime);
      res.status(200).json({ message: "Showtimes created." });
    } else {
      res.status(200).json({ message: "No new showtimes added (all already exist)." });
    }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "error while fetching now playing"});
    }
})


// Schedule to run every day at 1:00 AM

// /*/2 * * * *"   0 1 * * *
// cron.schedule("0 1 * * *", async () => {
//   console.log("🌙 Nightly Showtime Creation Cron Running...");
//   try {
//     await getAutomateShowTime();
//     await deleteOldShowtimes();
//   } catch (err) {
//     console.error("❌ Cron job failed:", err);
//   }
// });


app.listen(PORT, (req,res) => {
    console.log(`server started listening on PORT: ${PORT}`);
})