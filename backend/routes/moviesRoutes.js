import express from 'express';
import {getReservationForShowtime,makeMovieReservation,getShowtimeforAllDates} from '../controller/movieControllers/movieControllers.js'
const router = express.Router();


router.post('/showtime/reservations', getReservationForShowtime);
router.post('/bookMovie', makeMovieReservation);
router.post('/getShowtimeforAllDates', getShowtimeforAllDates);


export default router;
