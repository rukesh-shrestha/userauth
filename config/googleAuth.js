import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import googleVerificationEmail from "../utils/mail/googleVerificationEmail.js";
import "dotenv/config";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const googleAuth = async (passport) => {
  await passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
        callbackURL: "/api/users/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const firstname = profile.name.givenName;
          const lastname = profile.name.familyName;
          const password =
            firstname.charAt(0).toUpperCase() +
            `@` +
            parseInt(firstname.charAt(0).toUpperCase(), 36) +
            lastname;

          const isUser = await User.findOne({ email });

          if (isUser) {
            done("User Already Exist", null);
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
              email,
              firstname,
              lastname,
              role: "staff",
              emailtoken: crypto.randomBytes(64).toString("hex"),
              password: hashedPassword,
            });
            googleVerificationEmail(newUser, password);
            return done(null, isUser, { message: "Account Created" });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  passport.serializeUser(async function (user, done) {
    try {
      done(null, user.id);
    } catch (error) {
      console.error(error);
      done(error, null);
      process.exit(1);
    }
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
      process.exit(1);
    }
  });
};

export default googleAuth;
