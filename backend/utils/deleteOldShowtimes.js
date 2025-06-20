import Showtime from "../models/showtimeModel.js";
import Reservation from "../models/reservationModel.js";

const deleteOldShowtimes = async () => {
  try {
    const now = new Date();

    const fiveDaysAgo = moment().subtract(5, "days").toDate();

    const deletedOld = await Showtime.deleteMany({
      startTime: { $lt: fiveDaysAgo },
    });
    console.log(
      `🗑️ Deleted ${deletedOld.deletedCount} showtimes older than 5 days`
    );

    const recentShowtimes = await Showtime.find({
      startTime: { $gte: fiveDaysAgo, $lt: now },
    });

    for (const showtime of recentShowtimes) {
      const hasReservation = await Reservation.exists({
        showtime: showtime._id,
      });

      if (!hasReservation) {
        await Showtime.deleteOne({ _id: showtime._id });
        deletedNoReservationCount++;
      }
    }

    console.log(
      `🧹 Cleaned up ${deletedNoReservationCount} showtimes (younger than 5 days) with no reservations`
    );
  } catch (err) {
    console.error("❌ Error while cleaning up showtimes:", err);
  }

  console.log(
    "✅ Cleaned up old showtimes with no reservations. & with reservation"
  );
};

export default deleteOldShowtimes;
