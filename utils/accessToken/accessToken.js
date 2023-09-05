import jwt from "jsonwebtoken";

const generateAccessToken = (userAvailable) => {
  const accesstoken = jwt.sign(
    {
      user: {
        id: userAvailable.id,
        email: userAvailable.email,
        firstname: userAvailable.firstName,
        lastname: userAvailable.lastName,
        role: userAvailable.role,
        status: userAvailable.status,
        isverified: userAvailable.isverified,
      },
    },
    process.env.SESSION_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  return accesstoken;
};

export default generateAccessToken;
