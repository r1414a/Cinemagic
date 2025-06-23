import { useState, useRef, useMemo, useEffect } from "react";
import authImage from "../../assets/authImage.jpeg";
import ticketlogo from "../../assets/ticketlogo.png";
import GoogleAuth from "./GoogleAuth";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { FaBackward } from "react-icons/fa";
import LoadingButton from "../../component/ui/buttons/loadingButton/LoadingButton";
import ShowToast from "../../component/ui/toasts/ShowToast";
import allapis from "../../util/allapis";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const userEmail = searchParams.get("email");
  const token = searchParams.get("token");
  const [otp, setOtp] = useState([]);
  const navigate = useNavigate();
  const otp_digit_1 = useRef();
  const otp_digit_2 = useRef();
  const otp_digit_3 = useRef();
  const otp_digit_4 = useRef();
  const otp_digit_5 = useRef();
  const otp_digit_6 = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const otp_ref_arr = [
    otp_digit_1,
    otp_digit_2,
    otp_digit_3,
    otp_digit_4,
    otp_digit_5,
    otp_digit_6,
  ];

  // useEffect(() => {
  //   if (successToast || errorToast) {
  //     const toast_timer = setTimeout(() => {
  //       setSuccessToast(false);
  //       setErrorToast(false);
  //     }, 2000);

  //     return () => clearTimeout(toast_timer);
  //   }
  // }, [successToast, errorToast]);

  const handleEmailAuthSendOTP = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const result = await allapis(
      "/api/auth/send-otp",
      "POST",
      false,
      email ? { email } : { userEmail },
      "Error while sending otp for verification.",
      (result) => {
        setIsLoading(false);
        setSuccessToast(true);
        setSuccessMessage("OTP sent successfully.");
        navigate(`/authentication/verify?token=${result.token}&email=${email}`);
      }
    );
    console.log(result);
  };

  const handleEmailAuthVerifyOTP = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const result = await allapis(
      "/api/auth/verify-otp",
      "POST",
      false,
      { token, otp, userEmail },
      "Error while verifying otp.",
      (result) => {
        setSuccessToast(true);
        setSuccessMessage("OTP verification successfull.");
        navigate("/");
      },
      (result) => {
        setErrorToast(true);
        setErrorMessage(result.message);
      },
      () => {
        setIsLoading(false);
      }
    );
    console.log(result);
  };

  const handleSetOtpChange = (e, index) => {
    console.log("handle", e);
    const key = e.target.value.replace(/[^0-9]/g, "");
    if (key === "") {
      console.log("not a digit");
    } else {
      if (index != 5) {
        otp_ref_arr[index + 1].current.focus();
      }
      setOtp((prev) => {
        const copy = [...prev];
        copy[index] = key;
        return copy;
      });
    }
  };

  console.log(otp);

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div
        className="relative w-full md:w-1/2 h-[35%] md:h-full rounded-b-full md:rounded-e-full md:rounded-bl-none"
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <NavLink to={"/"} className={"absolute -bottom-5 left-5 md:bottom-[100%] md:left-[100%] md:right-0 md:top-5"}>
          <button className="flex gap-2  items-center text-white hover:text-dyellow cursor-pointer">
            <FaBackward />
            Home
          </button>
        </NavLink>
        {/* <img src={authImage} alt="auth page background image" /> */}
      </div>
      <div className="w-full flex flex-col justify-center items-center md:w-1/2 h-[65%] md:h-full bg-blue px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-40">
        {/* <div className="flex flex-col justify-center items-center"> */}
          {location.pathname === "/authentication" ? (
            <>
            <div className="mb-8 md:mb-16 flex gap-2 justify-center items-center">
          <img src={ticketlogo} alt="website logo" className="w-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            Cinemagic
          </h1>
        </div>
              <form onSubmit={handleEmailAuthSendOTP} className="my-4 w-full">
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 h-12"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full bg-dyellow h-12 font-semibold rounded-md cursor-pointer"
                >
                  <LoadingButton isLoading={isLoading} text={"Continue"} />
                </button>
              </form>

              <div className="my-2 w-full flex items-center gap-2">
                <div className="h-0.5 w-1/2 bg-white"></div>
                <p className="text-white font-semibold text-sm">OR</p>
                <div className="h-0.5 w-1/2 bg-white"></div>
              </div>

              <div className="w-full mt-4">
                <GoogleAuth />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-white text-center text-xl md:text-3xl font-bold">
                OTP Verification
              </h1>
              <p className="text-center text-white my-3 md:my-4">
                Enter OTP code sent on{" "}
                <span className="font-semibold">{userEmail}</span>
              </p>
              <div className="my-2">
                <form
                  onSubmit={handleEmailAuthVerifyOTP}
                  className=" space-y-5"
                >
                  <div className="flex gap-2">
                    {[...Array(6)].map((_, index) => (
                      <input
                        ref={otp_ref_arr[index]}
                        key={index}
                        name={index}
                        type="text"
                        id="otp-input"
                        onChange={(e) => handleSetOtpChange(e, index)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md text-center block w-full py-3.5 focus:ring-2 focus:ring-dyellow"
                        required
                        maxLength={1}
                        size={1}
                        max={1}
                        autoFocus={index === 0}
                        pattern="[0-9]{1}"
                        inputMode="numeric"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        onKeyDown={(e) => {
                          console.log(index);
                          if (e.key === "Backspace" && index >= 0) {
                            if (index < 5) {
                              if (e.target.value === "" && index === 0) {
                                return;
                              } else if (e.target.value === "" && index > 0) {
                                otp_ref_arr[index - 1].current.focus();
                              }
                              setOtp((prev) => {
                                const copy = [...prev];
                                copy[index] = "";
                                return copy;
                              });
                            } else {
                              e.target.value = "";
                              otp_ref_arr[index - 1].current.focus();
                              setOtp((prev) => {
                                const copy = [...prev];
                                copy[index] = "";
                                copy[index - 1] = "";
                                return copy;
                              });
                            }
                          }
                        }}
                      />
                    ))}
                  </div>
                  <div className="w-full">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-dyellow font-medium rounded-md cursor-pointer h-12 w-full"
                    >
                      <LoadingButton
                        isLoading={isLoading}
                        text={"Verify & Proceed"}
                      />
                    </button>
                  </div>
                </form>
              </div>
              <div className="my-4 space-y-2 text-center">
                <p className="text-white">Didn't receive OTP code ?</p>
                <button
                  onClick={handleEmailAuthSendOTP}
                  className="text-dyellow text-center cursor-pointer font-medium"
                >
                  Resend Code
                </button>
              </div>
            </>
          )}
        {/* </div> */}
      </div>

      {successToast && (
        <ShowToast
          closeToastFunction={setSuccessToast}
          type="success"
          message="OTP sent successfully."
        />
      )}

      {errorToast && (
        <ShowToast
          closeToastFunction={setErrorToast}
          type="error"
          message={errorMessage}
        />
      )}
    </section>
  );
}
