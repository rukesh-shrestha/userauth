import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../model/User.js";
import sendVerificationEmail from "../utils/mail/sendVerificationEmail.js";

export const UserRegistrationHandlier = async (req, res) => {
  try {
    const { email, firstname, lastname, password, confirmpassword } = req.body;

    if (!email || !firstname || !lastname || !password || !confirmpassword) {
      res.status(400);
      throw new Error("missing field.");
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
