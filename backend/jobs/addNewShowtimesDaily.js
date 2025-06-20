import dotenv from 'dotenv'
import mongoose from 'mongoose'
import getAutomateShowTime from '../utils/automateShowtimes';

dotenv.config();



async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  await getAutomateShowTime(); // your custom logic here
  await mongoose.disconnect();
  console.log("Emails sent.");
}

main().catch(err => {
  console.error("Cron job failed:", err);
  process.exit(1);
});