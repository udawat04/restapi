const {body}=require("express-validator")

const categoryValidator = [
    body("title", "Title does not empty").not().isEmpty(),
    body("description","Description does not empty").not().isEmpty()
];

const loginValidator = [
  body("email", "email does not empty").not().isEmpty(),
  body("password", "password does not empty").not().isEmpty(),
];

module.exports={categoryValidator,loginValidator}