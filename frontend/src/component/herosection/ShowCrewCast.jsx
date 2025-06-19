import { useState, useEffect } from "react";

export function ShowCrewCast({ movieData, creditData }) {
  const [specificCreditData, setSpecificCreditData] = useState(null);
  useEffect(() => {
    const specific_movie_credit = creditData.find(
      (credit) => credit.id === movieData.id
    );

    setSpecificCreditData(specific_movie_credit);
  }, []);

  return (
    <>
      <p className="text-lg lg:text-xl text-white">
        <span className="text-dyellow font-semibold me-2">Director:</span>
        {specificCreditData &&
          specificCreditData.crew.map((crew) =>
            crew.job === "Director" ? crew.name + "," : null
          )}
      </p>

      <p className="text-md lg:text-lg text-white">
        <span className="text-dyellow font-semibold me-2">Stars:</span>
        {specificCreditData &&
          specificCreditData.cast
            .slice(0, 4)
            .map((cast) => cast.name)
            .join(",")}
      </p>
      {/* <p className="text-white">{movieData.overview}</p> */}
    </>
  );
}
