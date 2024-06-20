const express = require("express");
const router = express.Router();
const multer = require("multer");

const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/category/thumbnail/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const {
  categoryController,
  registerController,
  loginController,
} = require("../controller");
const { productController } = require("../controller");
const { adminController } = require("../controller");
const { loginValidator } = require("../services");
// const {registerController}=require('../controller')

router.get("/category", categoryController.index);
router.delete("/category/:id", categoryController.delete);
//   router.post("/category" ,categoryController.store);
router.post("/category", upload.single("thumbnail"), categoryController.store);

router.post("/product", productController.store);
router.get("/product", productController.index);
router.delete("/product", productController.delete);
router.put("/product/:id", productController.update);
// router.get("/product/:id" ,productController.fetch);
// router.get("/product" ,productController.fetch1);

router.post("/admin", adminController.store);
router.get("/admin", adminController.take);

router.post("/register", registerController.register);
router.post("/login", loginController.login);
module.exports = router;
