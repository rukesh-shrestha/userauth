import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../model/User.js";
import sendVerificationEmail from "../utils/mail/sendVerificationEmail.js";
import generateAccessToken from "../utils/accessToken/accessToken.js";

export const userRegistrationHandlier = async (req, res) => {
  try {
    const { email, firstname, lastname, password, confirmpassword } = req.body;

    if (!email || !firstname || !lastname || !password || !confirmpassword) {
      res.status(400);
      throw new Error("Missing Required Field.");
    }
    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("invalid email found.");
    }
    if (!validator.equals(password, confirmpassword)) {
      res.status(400);
      throw new Error("password field not equall");
    }

    if (!validator.isStrongPassword(password)) {
      res.status(400);
      throw new Error(
        "password must have min_length: 8; min_lowercase: 1; min_uppercase: 1; min_number: 1 ; min_symboles: 1 ;"
      );
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      res.status(401);
      throw new Error("User Already Exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newuser = await User.create({
        email,
        firstname,
        lastname,
        role: "staff",
        emailtoken: crypto.randomBytes(64).toString("hex"),
        password: hashedPassword,
      });
      sendVerificationEmail(newuser);
      res.status(200).json({
        status: "success",
        data: {
          message: {
            mail: "verification email send. check your inbox spam folder.",
          },
        },
      });
    }
  } catch (error) {
    res.json({
      status: error.message === "User Already Exist" ? `fail` : `error`,
      data: {
        message: error.message,
      },
    });
  }
};

export const userLoginHandlier = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Missing Required Field.");
    }
    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("Invalid Email Found.");
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error("User Not Found.");
    } else {
      res.status(200).json({
        status: "success",
        data: {
          token: generateAccessToken(user),
        },
      });
    }
  } catch (error) {
    res.json({
      status: error.message === "User Not Found." ? `fail` : `error`,
      data: {
        message: error.message,
      },
    });
  }
};
