import express from 'express';
import {automateAndDeleteShowtimes} from cronController

const router = express.Router();

router.post('/automate-delete-showtime', automateAndDeleteShowtimes);

export default router;