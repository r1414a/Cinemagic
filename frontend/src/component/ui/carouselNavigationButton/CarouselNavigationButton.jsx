import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function CarouselNavigationButton({ pref, nref }) {

  return (
    <>
      <button disabled={false} ref={pref} className="cursor-pointer text-white">
        <FaArrowAltCircleLeft className="text-3xl md:text-4xl text-dyellow" />
      </button>
      <button disabled={false} ref={nref} className="cursor-pointer text-white">
        <FaArrowAltCircleRight className="text-3xl md:text-4xl text-dyellow" />
      </button>
    </>
  );
}
