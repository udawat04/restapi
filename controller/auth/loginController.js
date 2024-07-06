const Reg = require("../../models/registerModel");
const bcrypt = require("bcrypt");
const { JwtService, JwtServices } = require("../../services");

const loginController = {
  async login(req, res) {
    let user;
    try {
      const { email, password } = req.body;

      user = await Reg.findOne({ email });

      if (!user) {
        console.log("Invalid email");

        return res.status(401).json({ error: "Invalid email" });
      }
      console.log(user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Invalid Password");

        return res.status(401).json({ error: "Invalid Password" });
      }
      // console.log(isPasswordValid)

      const accessToken = JwtServices.sign(
        {
          _id: user._id,
        },
        "30m"
      );

      const refreshToken = JwtServices.sign(
        {
          _id: user._id,
        },
        "1y",
        REFERSH_SECRET
      );

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server Error.", serverError: error });
    }
  },
};

module.exports = loginController;
