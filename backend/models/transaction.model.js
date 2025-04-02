import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USer', //referencing from User model
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        required: true,
    },
    category: {
        type: String,
        enum: ["saving", "expense", "investment"],
        required: true,
    },
    amount:{
        type: Number,
        required: true,

    },
    location:{
        type: String,
        default: "Unknown",
    },
    date:{
        type: Date,
        required: true,
    }
}, { timeStamps: true});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;