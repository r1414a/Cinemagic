import getAutomateShowTime from "../../utils/automateShowtimes.js";
import deleteOldShowtimes from "../../utils/deleteOldShowtimes.js";

export const automateAndDeleteShowtimes = async (req, res) => {
  try {
    console.log("🌙 Cron job triggered by cron-job.org");
    await getAutomateShowTime();
    await deleteOldShowtimes();
    res.status(200).json({ message: "Showtime updated" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "automateAndDeleteShowtimes Cron job failed" });
  }
};
