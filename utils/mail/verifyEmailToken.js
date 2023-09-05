import User from "../../model/User.js";

const verifyEmail = async (req, res) => {
  try {
    const emailtoken = req.query.emailtoken;
    if (!emailtoken) {
      res.status(404);
      throw new Error("token not found");
    }
    const user = await User.findOne({ emailtoken });
    if (user) {
      user.emailtoken = null;
      user.isverified = true;
      user.status = "activate";
      await user.save();
      res.status(200).json({
        status: "success",
        data: {
          message: "Account Verification Completed. Go back to Login.",
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
export default verifyEmail;
