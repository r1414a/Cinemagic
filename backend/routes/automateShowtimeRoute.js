import express from 'express';
import {getAutomateShowTime} from  "../controller/automateShowtimeController/automateShowtimeController.js"

const router = express.Router();

router.post('/',getAutomateShowTime)

export default router;
