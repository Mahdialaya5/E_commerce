const router = require("express").Router();
const isAuth = require("../middlewares/auth");
const productControler = require("../controllers/Product");
const isCompany=require("../middlewares/isCompany")
const upload=require('../utils/multer');
const isAdmin = require("../middlewares/isAdmin");

router.get("/getproducts",productControler.getProducts);
router.get("/oneproduct/:id",productControler.getOneProduct)
router.get("/:id",productControler.getProductsByCompany)
router.get("/numberproducts/:id",isAuth(),productControler.getNumberProductByCompany)
router.post("/add",isAuth(),isCompany,upload("products").single("file"),productControler.addProduct);
router.put("/:id",isAuth(),isCompany,upload("products").single("file"),isAuth(),isCompany,productControler.updateProduct);
router.delete("/:id",isAuth(),isCompany,productControler.deleteProduct)
router.get("/admin/numberproducts",isAuth(),isAdmin,productControler.getNumberProducts)
module.exports = router;