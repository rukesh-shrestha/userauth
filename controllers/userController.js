import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../model/User.js";
import UserSecurity from "../model/UserSecurity.js";
import sendVerificationEmail from "../utils/mail/sendVerificationEmail.js";
import generateAccessToken from "../utils/accessToken/accessToken.js";
import sendResetPasswordMail from "../utils/mail/resetPassword.js";

function generatePassword() {
  const randomPassword = Math.random().toString(36).slice(2) + `!`;
  return randomPassword.charAt(0).toUpperCase() + randomPassword;
}
let randomPass;
export const userRegistrationHandler = async (req, res) => {
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

export const userLoginHandler = async (req, res) => {
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
      status: res.statusCode === 401 ? `fail` : `error`,
      data: {
        message: error.message,
      },
    });
  }
};

export const securityQuestionHandler = async (req, res) => {
  try {
    const { dob, pin, email } = req.body;

    if (!dob || !pin || !email) {
      res.status(400);
      throw new Error("Missing Required Field.");
    }

    const userData = await User.findOne({ email });
    if (!userData) {
      res.status(401);
      throw new Error("User Not Found.");
    }
    const user = userData.id;
    const securityUser = await UserSecurity.findOne({ user });

    if (!securityUser) {
      await UserSecurity.create({
        dob,
        pin,
        user,
      });
      res.status(200).json({
        status: "success",
        data: {
          message: "Security Question Set.",
        },
      });
    } else {
      res.status(400);
      throw new Error("Question Already Set");
    }
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(400);
    }
    res.json({
      status: res.statusCode === 401 ? `fail` : `error`,
      data: {
        error: error.message,
      },
    });
  }
};

export const userForgetPasswordHandler = async (req, res) => {
  try {
    randomPass = generatePassword();
    const { dob, pin, email } = req.body;

    if (!dob || !pin || !email) {
      res.status(400);
      throw new Error("Missing Security Answers.");
    }
    const userData = await User.findOne({ email });

    if (!userData) {
      res.status(401);
      throw new Error("User Not Found.");
    }
    const user = userData.id;
    const securityUser = await UserSecurity.findOne({ user });

    if (
      !validator.equals(dob, securityUser.dob.toISOString().split("T")[0]) ||
      !validator.equals(pin, securityUser.pin)
    ) {
      res.status(401);
      throw new Error(
        "Cannot Reset Password. Security Question Validation Error."
      );
    } else {
      userData.resettoken = crypto.randomBytes(64).toString("hex");

      const newUserData = await userData.save();
      sendResetPasswordMail(newUserData, randomPass);
      res.status(200).json({
        status: "success",
        data: {
          mail: "Reset Password Link Send",
        },
      });
    }
  } catch (error) {
    res.json({
      status: res.statusCode === 401 ? `fail` : `error`,
      data: {
        error: error.message,
      },
    });
  }
};

export const verifyPasswordHandler = async (req, res) => {
  try {
    const resettoken = req.query.resettoken;

    if (!resettoken) {
      res.status(404);
      throw new Error("token not found");
    }
    const user = await User.findOne({ resettoken });

    if (user) {
      user.resettoken = null;
      const hashedPassword = await bcrypt.hash(randomPass, 10);

      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        status: "success",
        data: {
          message: "Password Reset. Go back to Login.",
        },
      });
    } else {
      res.status(498);
      throw new Error("Token validation Failed");
    }
  } catch (error) {
    res.json({
      status: "error",
      data: {
        error: error.message,
      },
    });
  }
};

export const changePasswordHandler = async (req, res) => {
  try {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    const email = req.user.email;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("User Not Found.");
    }

    if (!(await bcrypt.compare(oldpassword, user.password))) {
      res.status(401);
      throw new Error("Old Password Mismatch - Validation Error ");
    }

    if (!validator.equals(newpassword, confirmpassword)) {
      res.status(400);
      throw new Error("New password do not match.");
    }

    if (!validator.isStrongPassword(newpassword)) {
      res.status(400);
      throw new Error(
        "password must have min_length: 8; min_lowercase: 1; min_uppercase: 1; min_number: 1 ; min_symboles: 1 ;"
      );
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    const updateUser = await User.updateOne(
      {
        email,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    if (!updateUser) {
      res.status(401);
    }

    res.status(200).json({
      status: "success",
      data: {
        message: "Updated",
      },
    });
  } catch (error) {
    res.json({
      status: res.statusCode === 401 ? `fail` : `error`,
      data: {
        error: error.message,
      },
    });
  }
};
