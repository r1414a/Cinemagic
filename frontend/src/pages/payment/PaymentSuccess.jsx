import { FaBackward } from "react-icons/fa";
import { NavLink } from "react-router";

export default function PaymentSuccess() {
  return (
    <section className="relative flex flex-col space-y-6 items-center justify-center w-full h-screen">
      <h1 className="text-white font-semibold text-5xl">
        Payment Successfull.
      </h1>
      <p className="text-white font-medium max-w-md text-center">
        Thanks for starting your cinema journey with us.
      </p>
      <NavLink to={"/"}>
        <button className="flex gap-2 items-center bg-dyellow py-3 px-6 font-medium rounded-md cursor-pointer">
          <FaBackward />
          back to home
        </button>
      </NavLink>
    </section>
  );
}
