import Users from "../models/User.js";
import { generateTokenForUser } from "../utils/auth.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendOTP.js";
import OTP from "../models/OTP.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      res.status(404).json({ err: true, msg: "Email Already exists" });
      return;
    }

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
    });

    const generatedToken = generateTokenForUser(user);

    res.cookie("tookie", generatedToken);

    res
      .status(201)
      .json({ err: false, msg: "Registration successfull", data: user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ err: true, msg: "Email Id has not been registered" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({ err: true, msg: "Invalid Password" });
    }

    const generatedToken = generateTokenForUser(user);

    res.cookie("token", generatedToken);

    return res.status(201).json({
      err: false,
      msg: "Login successfull",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({
        err: true,
        msg: "EmailId is not registered yet",
      });
    }
    await sendEmail(email);

    return res.status(201).json({ err: false, msg: "OTP Send successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { otp, email } = req.body;

  try {
    const otpModel = await OTP.findOne({ otp });

    if (!otpModel && email !== otpModel?.email) {
      return res.status(401).json({ err: true, msg: "Invalid OTP" });
    }

    await OTP.deleteOne({ otp });

    return res
      .status(201)
      .json({ err: false, msg: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
