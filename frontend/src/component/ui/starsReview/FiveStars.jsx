import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function FiveStars({rating}) {
  return (
    <>
      {[2, 4, 6, 8, 10].map((rate) =>
        rating > rate ? (
          <FaStar key={rate} className="text-dyellow" />
        ) : rate - rating <= 1 ? (
          <FaRegStarHalfStroke key={rate} className="text-dyellow" />
        ) : (
          <FaRegStar key={rate} className="text-dyellow" />
        )
      )}
    </>
  );
}
