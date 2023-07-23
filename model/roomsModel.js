import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    adults: {
        type: Number,
        require: true
    },
    childrents: {
        type: Number,
        required: true
    },
    bed: {
        type: String,
        required: true
    },
    images: [{
        url: {
            type: String,
            required: true
        }
    }],
    Cancellation: {
        type: String,
        required: true,
    },
    checkIn: [{
        type: Date,
        default: [],
    }],
    checkOut: [{
        type: Date,
        default: [],
    }],
    booste: {
        type: Number,
        default: 1
    },
    amenities: {
        type: Array,
        require: true,
    },
    is_Available: {
        type: Boolean,
        default: true
    },
    is_block: {
        type: Boolean,
        default: false
    },
    adminApproval: {
        type: String,
        default: "Pending",
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotels',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
})
const Rooms = mongoose.model("Rooms", roomSchema)

export default Rooms