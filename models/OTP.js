import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the OTP schema
const otpSchema = new Schema({
  otp: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

// Create the OTP model
const OTP = model("OTP", otpSchema);

export default OTP;
