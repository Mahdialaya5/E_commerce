const connectiondb = require("../config/connectdb");

//get products
exports.getProducts = async (req, res) => {
  try {
    const products =
      await connectiondb.query(`SELECT products.*, users.user_name
              FROM products
             JOIN users ON users.id = products.company_id;`);
   return res.status(200).send(products[0]);
  } catch (error) {
    
    res.status(400).send({ msg: error.message });
  }
};

exports.getOneProduct=async(req,res)=>{
  try {
    const products = await connectiondb.query(`SELECT products.*, users.user_name
              FROM products
             JOIN users ON users.id = products.company_id
             WHERE products.id=${req.params.id} `);

   return res.status(200).send(products[0][0]);
  } catch (error) {
    console.log(error);
   return  res.status(400).send({ msg: error.message });
  }
}


exports.getProductsByCompany = async (req, res) => {
  try {
    
    const products =
      await connectiondb.query(`SELECT products.*, users.user_name
                      FROM products
                     JOIN users ON users.id = products.company_id
                     WHERE products.company_id=${req.params.id} `);
   return res.send(products[0]);
  } catch (error) {
  
  return   res.status(400).send({ msg: error.message });
  }
};

exports.getNumberProductByCompany=async(req,res)=>{
  try {

       const [products] = await connectiondb.query(
      `SELECT COUNT(*) AS number
       FROM products
       WHERE products.company_id = ${req.params.id}`, 
    
    );

   return res.status(200).send({msg:products[0].number});
  } catch (error) {
   
  return   res.status(400).send({ msg: error.message });
  }
}

//add product
exports.addProduct = async (req, res) => {
  try {
    const { id } = req.user[0];
    const { name, price,description } = req.body;
    const datenow = new Date();
    const day = datenow.getDate();
    const month = datenow.getMonth() + 1;
    const year = datenow.getFullYear();
    const date = `${day}-${month}-${year}`;

    const url = `${req.protocol}://${req.get("host")}/uploads/products/${
      req.file.filename
    }`;
    const [result] =
      await connectiondb.query(`INSERT INTO products (product_name,description,add_At,price,photo,company_id)
                                VALUES("${name}","${description}","${date}",${price},"${url}",${id})`);
 
    return res.status(201).json({ msg: "Add successfully" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};
//updateProduct
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.user[0];
    const exist_user = await connectiondb.query(
      `SELECT company_id FROM products WHERE id='${req.params.id}'`
    );
    if (id == exist_user[0][0].company_id) {
      if (req.body.price) {
        const result = await connectiondb.query(
          `UPDATE products SET price='${req.body.price}' WHERE id='${req.params.id}'`
        );
      }
      if (req.body.name) {
        const result = await connectiondb.query(
          `UPDATE products SET product_name='${req.body.name}' WHERE id='${req.params.id}'`
        );
      }
      if (req.body.description) {
        const result = await connectiondb.query(
          `UPDATE products SET description='${req.body.description}' WHERE id='${req.params.id}'`
        );
      }
      if (req.file) {
        const url = `${req.protocol}://${req.get("host")}/uploads/products/${req.file.filename}`;
        const result = await connectiondb.query(
          `UPDATE products SET photo='${url}' WHERE id='${req.params.id}'`
        );
      }

      return res.status(202).send({ msg: "product update" });
    } else {
      return res.status(401).send({ msg: "access denied" });
    }
  } catch (error) {

    return res.status(400).send({ msg: error.message });
  }
};

//deleteProduct
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.user[0];
    const exist_user = await connectiondb.query(
      `SELECT company_id FROM products WHERE id='${req.params.id}'`
    );
    if (id == exist_user[0][0].company_id) {
      const result = await connectiondb.query(
        `DELETE from products  WHERE id='${req.params.id}'`
      );
      return res.status(202).send({ mqg: "delete succes" });
    } else {
      return res.status(401).send({ msg: "access denied" });
    }
  } catch (error) {

    return res.status(400).send({ msg: error.message });
  }
};

exports.getNumberProducts=async(req,res)=>{
  try {

       const [products] = await connectiondb.query(
      `SELECT COUNT(*) AS number
       FROM products`);
     return res.status(200).send({msg:products[0].number});
  } catch (error) {
   
  return   res.status(400).send({ msg: error.message });
  }
}