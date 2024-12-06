const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectiondb = require("../config/connectdb");

//register
exports.register = async (req, res) => {
  try {
    const { email, password, role, username } = req.body;

    if (role === "admin") {
      return res.status(401).json({ msg: "access denied" });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "password should be 6 caracteres" });
    }
    const existUser = await connectiondb.query(
      `select * from users where email="${email}"`
    );

    if (existUser[0][0]) {
      return res.status(400).send({ msg: "email exist, please login" });
    }
    var url = "";
    if (req.file) {

       url = `${req.protocol}://${req.get("host")}/uploads/user/${req.file.filename}`
     
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] =
      await connectiondb.query(`INSERT INTO users (email,password_user,user_name,role,photo)
                  VALUES('${email}',"${hashedPassword}","${username}","${role}","${url}")`);

    return res.status(201).json({ msg: "register was success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
//login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await connectiondb.query(
      `select * from users where email="${email}"`
    );

    if (!existUser[0][0]) {
      return res.status(400).send({ msg: "Bad credential !!" });
    }

    const existpassword = existUser[0][0].password_user;
    const isMatched = await bcrypt.compare(password, existpassword);

    if (!isMatched) {
      return res.status(400).send({ msg: "Bad credential !!" });
    }
    existUser[0][0].password_user = undefined;
    const exist_id = existUser[0][0].id;
    const payload = { id: exist_id };
    const token = jwt.sign(payload, process.env.secretKey);
    res.cookie("token", token);
    return res.status(200).send({ msg: "Login success" });
  } catch (error) {
   return res.status(500).send(error)
  }
};
// get current user ==>private
exports.verify = (req, res) => {
  try {
    res.send(req.user[0]);
  } catch (error) {
   return res.status(500).send(error)
  }
};

//edit
exports.edit = async (req, res) => {
  const { username } = req.body;
  try {
    if (req.body.username) {
      var [updateusername] = await connectiondb.query(
        `UPDATE users SET user_name='${username}' WHERE id='${req.user[0].id}'`
      );
    }
       if (req.body.password) {
      const { confirmPassword,password } = req.body;
     
      if (password.length < 6) {
        return res.status(400).send({ msg: "Bad password" });
      }
      if ( password !== confirmPassword) {
        
        return res.status(400).send({ msg: "Password is not matched" });
      }

      const existUser = await connectiondb.query(
        `select * from users where id="${req.user[0].id}"`
      );

      const isMatched = await bcrypt.compare(
        password,
        existUser[0][0].password_user
      );

      if (isMatched) {
        return res.status(400).send({ msg: "password aleardy exist" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        var [updatepassword] = await connectiondb.query(
          `UPDATE users SET password_user='${hashedPassword}' WHERE id='${req.user[0].id}'`
        );
      }
    }
    
    if ( !updatepassword && !updateusername || updatepassword?.affectedRows < 1 && updateusername?.affectedRows < 1) {

      return res.status(400).send({ msg: "Nothing update" });
    }
    return res.status(202).send({ msg: "Update success" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.editPhoto=async(req,res)=>{

try {   
      
  const  url = `${req.protocol}://${req.get("host")}/uploads/user/${req.file.filename}`

  var [updatephoto] = await connectiondb.query(
    `UPDATE users SET photo='${url}' WHERE id='${req.user[0].id}'`
  );
  return res.status(202).send({ msg: "Update success" });
  
} catch (error) {
     return res.status(400).send(error.message);
}  
}

//userlist=>private for admin
exports.getUser = async (req, res) => {
  try {
    const userlist = await connectiondb.query(
      `select id,photo,email,user_name from users  WHERE users.role="user" order by user_name  `
    );
   return res.status(200).send(userlist[0]);
  } catch (error) {
   
    res.status(400).send({ msg: error.message });
  }
};
exports.getCompanyForAdmin= async (req, res) => {
  try {
    const companylist = await connectiondb.query(
      `select id,photo,email,user_name from users WHERE users.role="company" order by user_name `
    );
   return res.status(200).send(companylist[0]);
  } catch (error) {

   return  res.status(400).send({ msg: error.message });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const companylist = await connectiondb.query(
      `select id,photo,user_name from users WHERE users.role="company" order by user_name `
    );
   return res.status(200).send(companylist[0]);
  } catch (error) {

   return  res.status(400).send({ msg: error.message });
  }
};
