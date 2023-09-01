export const registerHandlier = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "done",
    },
  });
};
