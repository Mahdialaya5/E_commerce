const router = require("express").Router();
const isAuth = require("../middlewares/auth");
const orderControler = require("../controllers/Order");
const isCompany = require("../middlewares/isCompany");

router.post("/",isAuth(),orderControler.newOrder);
router.get("/user",isAuth(),orderControler.getordersByuser);
router.get("/company",isAuth(),isCompany,orderControler.getordersByCompany);

module.exports = router;