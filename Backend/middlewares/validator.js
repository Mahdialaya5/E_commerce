const { check, validationResult } = require("express-validator")


const registerCheck = () => [
    check("email", "This field should be a valid email").isEmail(),
    check("password", "Password should have at least 6 characters").isLength({ min: 6 }),
    check("username", "Username should not empty").notEmpty()
]

const loginCheck = () => [
    check("email", "This field should be a valid email").isEmail(),
    check("password", "Password should have at least 6 characters").isLength({ min: 6 })
]

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

module.exports={registerCheck,loginCheck,validator}