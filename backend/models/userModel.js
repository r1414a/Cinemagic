import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    favoritesMovies: {
        type: [Number],
        default: []
    },
    reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
},{
    timestamps: true
})


const User = mongoose.model('User',userSchema);


export default User;