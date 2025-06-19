import express from 'express'
import {getUserReservations} from '../controller/userControllers/userControllers.js'

const router = express.Router();


router.post('/getUserReservations', getUserReservations);

export default router;