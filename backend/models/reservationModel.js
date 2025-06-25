import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    showtime: {
       type: mongoose.Schema.Types.ObjectId, 
        ref: 'Showtime',
        required: true
    },
    seats: {
        type: [String]
    },
    paymentStatus: {
        type: String, 
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    theater: {
        type: Object,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["coming","past","cancelled"] //active upcoming // completed already watched past
    }
},{
    timestamps: true
})

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;