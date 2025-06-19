import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import automateShowtimeRoute from "./routes/automateShowtimeRoute.js";
import moment from 'moment';
import cron from "node-cron"
import Showtime from './models/showtimeModel.js';
import Reservation from './models/reservationModel.js';
import userRoutes from './routes/userRoutes.js';
import moviesRoutes from "./routes/moviesRoutes.js";

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
app.use('/api/automateShowtime', automateShowtimeRoute);
app.use('/api/user', userRoutes)

console.log(moment().add(4, "days").format("YYYY-MM-DD"),moment().add(4, "days").unix());
app.get('/',(req,res) => {
    res.send('server started');
})



//runs everyday at midnight
// cron.schedule('0 0 * * *', async() => {
//     try{

//         const today = new Date();

//         await Showtime.deleteMany({ startTime: { $lt: today } });
//         // const fiveDaysAgo = moment().subtract(5, 'days').toDate();

//         // const old = await Showtime.find({startTime: {$lt: today}});

//         // for(const showtime of old){
//         //     const hasReservation = await Reservation.exists({showtime: showtime._id});

//         //     if(!hasReservation){
//         //         await Showtime.deleteOne({_id: showtime._id});
//         //     }
//         // }

//         console.log("✅ Cleaned up old showtimes with no reservations. & with reservation");

//     }catch(err){
//         console.error("Error while removing old showtime in cron job", err);
//     }
// })




app.listen(PORT, (req,res) => {
    console.log(`server started listening on PORT: ${PORT}`);
})