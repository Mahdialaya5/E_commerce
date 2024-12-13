const router = require("express").Router();
const isAuth = require("../middlewares/auth");
const orderControler = require("../controllers/Order");
const isCompany = require("../middlewares/isCompany");
const isAdmin = require("../middlewares/isAdmin");

router.post("/",isAuth(),orderControler.newOrder);
router.get("/user",isAuth(),orderControler.getordersByuser);
router.get("/company",isAuth(),isCompany,orderControler.getordersByCompany);
router.get("/admin/numberorders",isAuth(),isAdmin,orderControler.getNumberOrders);
router.get("/admin/sumorders",isAuth(),isAdmin,orderControler.getSumOrders);
router.get("/admin/mostproductseller",isAuth(),isAdmin,orderControler.getMostProductseller)

module.exports = router;