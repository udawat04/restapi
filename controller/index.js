const categoryController = require('./categoryController');
const productController = require("./productController");
const adminController = require("./adminController");
const registerController=require("./auth/registerController")
const loginController =require("./auth/loginController")


module.exports = {categoryController,productController,adminController,registerController,loginController};