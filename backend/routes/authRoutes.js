import express from 'express';
import {sendOTPForAuthentication,verifyOTPForAuthentication,authenticateGoogleUser,checkIfUserHasAccount} from "../controller/authControllers/authControllers.js";


const router = express.Router();


router.post('/send-otp', sendOTPForAuthentication);
router.post('/verify-otp', verifyOTPForAuthentication);
router.post('/google', authenticateGoogleUser);
router.get('/checkUserAuth', checkIfUserHasAccount)

export default router;