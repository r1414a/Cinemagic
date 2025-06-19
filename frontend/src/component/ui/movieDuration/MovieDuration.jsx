import { FaRegClock } from "react-icons/fa6";

export default function MovieDuration({duration}) {
  return (
    <>
      <p className="text-white flex gap-2 items-center">
        <FaRegClock className="text-dyellow" />
        {Math.floor(duration / 60)}h{" "}
        {(duration / 60 - Math.floor(duration / 60)).toFixed(1) * 60}
        min
      </p>
    </>
  );
}
