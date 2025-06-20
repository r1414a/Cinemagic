import express from 'express';
import {getReservationForShowtime,makeMovieReservation,getShowtimeforAllDates,getTopFiveNowPlaying} from '../controller/movieControllers/movieControllers.js'
const router = express.Router();


router.post('/showtime/reservations', getReservationForShowtime);
router.post('/bookMovie', makeMovieReservation);
router.post('/getShowtimeforAllDates', getShowtimeforAllDates);
router.get('/get-top-five-now-playing',getTopFiveNowPlaying);


export default router;
