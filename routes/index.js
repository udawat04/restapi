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
const productImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/product/image");
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
const upload2 = multer({ storage:productImages });

const {
  registerController,
  loginController,
  categoryController,
} = require("../controller");
const { productController } = require("../controller");
const { adminController } = require("../controller");
const { loginValidator } = require("../services");
const auth = require("../middleware/auth");
// const {registerController}=require('../controller')

// router.get("/category", categoryController.index);
router.delete("/category/:id", categoryController.delete);
router.get("/category/:id",  categoryController.fetch);
  router.get("/category" ,categoryController.view);
  router.post("/category/search1" ,categoryController.search);
// router.post("/category", upload.single("thumbnail"), categoryController.store);
router.post(
  "/category",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "thumbnail1", maxCount: 2 },
  ]),
  categoryController.store
);
router.post("/category/search",categoryController.filterquery);





// router.post("/product/add", productController.store);
router.get("/product/populate", productController.index);
router.get("/product/category/:categoryId", productController.findbycategory);

// router.delete("/product", productController.delete);
// router.put("/product/:id",auth, productController.update);
// router.get("/product/:id",  productController.fetch);
router.get("/product/call" ,productController.storing);
router.post("/product/add", upload2.single("image"), productController.store);









router.post("/admin", adminController.store);
router.get("/admin", adminController.take);

router.post("/register", registerController.register);
router.post("/login", loginController.login);
// router.get("/login",auth, loginController.login);
module.exports = router;
