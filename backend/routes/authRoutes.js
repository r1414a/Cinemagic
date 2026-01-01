import express from 'express';
import {sendOTPForAuthentication,verifyOTPForAuthentication,authenticateGoogleUser,checkIfUserHasAccount,logoutUser} from "../controller/authControllers/authControllers.js";


const router = express.Router();


router.post('/send-otp', sendOTPForAuthentication);
router.post('/verify-otp', verifyOTPForAuthentication);
router.post('/google', authenticateGoogleUser);
router.get('/checkUserAuth', checkIfUserHasAccount)
router.get('/logout', logoutUser);

export default router;