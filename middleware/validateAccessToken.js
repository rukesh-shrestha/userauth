import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SESSION_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not Authorized -  Invalid Token");
        }
        if (!decoded.user.status === "activate" || !decoded.user.isverified) {
          res.status(401);
          throw new Error("User Not Verified.");
        }
        req.user = decoded.user;
        next();
      });
    } else {
      res.status(400);
      throw new Error("Missing  Authorized Token");
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

export default validateToken;
