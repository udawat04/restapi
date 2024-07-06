const Reg = require("../models/registerModel");

const { JwtServices } = require("../services");

const auth = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    console.log("token", authHeader);

    if (!authHeader) {
      return res.json({ status: 401, message: "Unauthorized request" });
    }
    const token = authHeader.split(" ")[1];
    const { _id } = JwtServices.verify(token);

    const user = Reg.find({ _id });

    if (user) {
      next();
    } else {
      return res.json({ status: 401, message: "invalid token" });
    }
  } catch (error) {
    if (error?.name) {
      return res.json({
        status: 500,
        message: error?.name,
      });
    } else {
      return res.json({
        status: 500,
        message: "internal server error",
        error: error,
      });
    }
  }
};
module.exports = auth;
