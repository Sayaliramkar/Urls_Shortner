import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    clicks: {
        type: Number,
        require: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, );

const shortUrl = mongoose.model("shorturl", shortUrlSchema);

export default shortUrl;
