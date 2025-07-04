import express from 'express';
import {automateAndDeleteShowtimes} from "../controller/cronController/cronController.js"

const router = express.Router();

router.get('/automate-delete-showtime', automateAndDeleteShowtimes);

export default router;