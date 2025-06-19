import { useGoogleLogin } from "@react-oauth/google";
import { setUserProfile } from "../../redux/features/userSlice/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import allapis from "../../util/allapis";

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async ({ code }) => {
    const result = await allapis(
      "/api/auth/google",
      "POST",
      { authorization_code: code },
      "Error in google authentication.",
      (result) => {
        dispatch(setUserProfile(result.user));
        navigate("/");
      }
    );
    console.log(result);
  };

  const googleButtonClick = useGoogleLogin({
    onSuccess: handleGoogleAuth,
    onError: handleGoogleAuth,
    flow: "auth-code",
  });

  return (
    <>
      <button
        className="h-12 cursor-pointer bg-dyellow text-black font-semibold rounded-md w-full"
        onClick={() => googleButtonClick()}
      >
        Sign in with Google 🚀
      </button>
    </>
  );
}
