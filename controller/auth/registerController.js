const Reg = require("../../models/registerModel");
const bcrypt=require("bcrypt")

const registerController ={
 async register(req,res,next){
     let cat;
    try {
      const { fullname,email,mobile,password } = req.body;
      const hashPassword = await bcrypt.hash(password,10)
    console.log(email)
      const emailExist = await Reg.findOne({email:email});
      if(emailExist){
        return res.status(409).json("email already password.")
      }
     
      cat = await Reg.create({
      fullname,
      email,
      mobile,
      password:hashPassword
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error.", serverError: error });
    }
    res.status(201).json(cat);
 }
}
module.exports=registerController




























