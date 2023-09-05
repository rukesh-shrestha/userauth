import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const connect = await mongoose.connect(
      process.env.CONNECTION_DATABASE_STRING
    );
    console.log(
      `Database Connected: ${connect.connection.host} ${connect.connection.name} `
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      data: {
        message: error.message,
      },
    });
  }
};

export default connectDB;
