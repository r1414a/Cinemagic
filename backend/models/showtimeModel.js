import mongoose from "mongoose";

const ShowtimeSchema = new mongoose.Schema({
    movieID: {
        type: Number,
        required: true
    },
    movieTitle: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    availableSeats : {
        type: [String]
    },
    reservedSeats : {
        type: [String]
    }
},{
    timestamps: true
})


const Showtime = mongoose.model("Showtime", ShowtimeSchema);

export default Showtime;