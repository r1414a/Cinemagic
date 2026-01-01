import Showtime from "../../models/showtimeModel.js";
import Reservation from "../../models/reservationModel.js";

const getUserReservations = async (req, res) => { 
  try {
    const { userID } = req.body;

    const reservations = await Reservation.find({ user: userID })
      .populate("showtime")
      .sort({ createdAt: -1 }); 

    if (!reservations || reservations.length === 0) {
      return res
        .status(200)
        .json({ message: "No reservations found", isThereReservations: false });
    }

    res.status(200).json({
      isThereReservations: true,
      reservations,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error while fetching user's all reservations." });
  }
};

export { getUserReservations };
