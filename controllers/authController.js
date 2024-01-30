import Users from "../models/User.js";
import { generateTokenForUser } from "../utils/auth.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendOTP.js";

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
    await sendEmail();
    res.json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
