import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { b64utoutf8, KJUR } from "jsrsasign";
import { OAuth2Client } from "google-auth-library";
import User from '../../models/userModel.js';
import jwt from 'jsonwebtoken'

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

function getAuthenticatedClient() {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    "postmessage"
  );
  return oAuth2Client;
}

async function createJWTToken(user){
  const token = jwt.sign(
      {email: user.email, role: user.role},
      process.env.JWS_SIGN_SECRET,
      { expiresIn : "7d" }
    ) 
    return token; 
}


//send opt for authentication
export const sendOTPForAuthentication = async (req, res) => {
  try {
    const { email } = req.body;
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    // console.log(email);

    const iat = Math.floor(Date.now() / 1000); // Current time in seconds
    const exp = iat + 60 * 5; // vaid for 5minutes
    // console.log(exp);

    const oHeader = { alg: "HS256", typ: "JWT" };
    const oPayload = {
      nbf: iat,
      iat: iat,
      exp: exp,
      otp: OTP,
      userEmail: email,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    const sJWT = KJUR.jws.JWS.sign(
      "HS256",
      sHeader,
      sPayload,
      process.env.JWS_SIGN_SECRET
    );
    // console.log(sJWT);

    const mailOptions = {
      from: `"Cinemagic 🎬" <${process.env.MY_EMAIL}>`,
      to: email,
      subject: "OTP For Authentication",
      text: `Your One-Time Password is: ${OTP}`,
      html: `<p style="font-size:18px">Your OTP is: <strong>${OTP}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully", token: sJWT });
  } catch (err) {
    console.log("Error while sending otp for verification.", err);
    res.status(500).json({ message: "Failed to send otp for verification." });
  }
};

//verify otp for authentication
export const verifyOTPForAuthentication = async (req, res) => {
  try {
    const { token, otp, userEmail } = req.body;
    const userOTP = otp.join("");
    // console.log(otp);

    const isValid = KJUR.jws.JWS.verifyJWT(token, process.env.JWS_SIGN_SECRET, {
      alg: ["HS256"],
    });

    if (!isValid) {
      // console.log("invalid");
      return res
        .status(401)
        .json({ message: "Token expired login/signup again." });
    }

    const payloadObj = KJUR.jws.JWS.readSafeJSONString(
      b64utoutf8(token.split(".")[1])
    );
    // console.log(payloadObj);

    if (payloadObj.otp !== userOTP) {
      return res.status(401).json({ message: "Incorrect OTP." });
    }


     const user = await User.findOne({email : userEmail});

    if(!user){
      const userDetails = {
        email: userEmail,
        username: userEmail,
        profilePic: '',
      }

      const newUser = new User(userDetails);
      await newUser.save();
    }


    const existingOrNewUser = user || await User.findOne({email: userEmail});

    const JWTToken = await createJWTToken(existingOrNewUser);

    res.cookie("authentication_token", JWTToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: "OTP verification successfull.",
      user: existingOrNewUser,
      authstatus: true });
  } catch (err) {
    console.log("Error while sending otp for verification.", err);
    res.status(500).json({ message: "Failed to send otp for verification." });
  }
};

//getting access_token, refresh_token from authorization code and getting user info using token
export const authenticateGoogleUser = async (req, res) => {
  try {
    const oAuth2Client = getAuthenticatedClient();
    const code = req.body.authorization_code;
    // console.log(code);
    const { tokens } = await oAuth2Client.getToken(code);
    // console.log(tokens);

    const url = "https://www.googleapis.com/oauth2/v3/userinfo";
    const options = {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);

    const user = await User.findOne({email : result.email});

    if(!user){
      const userDetails = {
        email: result.email,
        username: result.name || result.given_name,
        profilePic: result.picture,
      }

      const newUser = new User(userDetails);
      await newUser.save();
    }

    const existingOrNewUser = user || await User.findOne({email: result.email});

    const JWTToken = await createJWTToken(existingOrNewUser);

    res.cookie("authentication_token", JWTToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.status(200).json({
      message: "User authenticated successfully",
      user: existingOrNewUser,
      authstatus: true
    })
  } catch (err) {
    console.log("Error while authentication and getting from google", err);
    res.status(500).json({ message: "Failed to Login/Signup user." });
  }
};

export const checkIfUserHasAccount = async (req,res) => {
  try{

    const token = req.cookies?.authentication_token;
    // console.log(token)

    if(!token){
      return res.status(401).json({ message: "Not Authenticated",authstatus: false });
    }

    const decode = jwt.verify(token, process.env.JWS_SIGN_SECRET);

    const user = await User.findOne({email : decode.email});

     if (!user) {
      return res.status(401).json({ message: "User not found",authstatus: false });
    }

    res.status(200).json({ user, authstatus: true });

  }catch (err) {
    console.log("Error while authenticating user.", err);
    res.status(500).json({ message: "Failed to authenticate user." });
  }
}


export const logoutUser = async(req,res) => {
  try{
    res.clearCookie("authentication_token");
    res.status(200).json({message: 'user logged out successfully.'})
  }catch (err) {
    console.log("Error while loging out user.", err);
    res.status(500).json({ message: "Failed to logout user." });
  }
}