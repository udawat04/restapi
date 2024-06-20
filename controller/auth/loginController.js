const Reg = require("../../models/registerModel");
const bcrypt = require("bcrypt");

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
    } catch (error) {
      res.status(500).json({ error: "Server Error.", serverError: error });
    }
    console.log(user);
    res.status(200).json({user:user});
  },
};

module.exports = loginController;
