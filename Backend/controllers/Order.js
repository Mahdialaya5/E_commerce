const connectiondb = require("../config/connectdb");

exports.newOrder = async (req, res) => {
  try {
    const [result1] =
      await connectiondb.query(`INSERT INTO orders (adress,phone,product_id,user_id)
         VALUES ("${req.body.address}","${req.body.phone}","${req.body.product_id}","${req.user[0].id}");
     `);
    return res.status(201).json({ msg: "Order send succes" });
    
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

exports.getordersByuser = async (req, res) => {
  try {
   
    const [result] = await connectiondb.query(`select orders.id AS order_id,
      adress,
      phone,
      Date,
      products.product_name,
      products.price
      From  orders
      JOIN products ON products.id=product_id
      WHERE orders.user_id=${req.user[0].id}`);

    return res.status(200).json( result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

exports.getordersByCompany = async (req, res) => {
  try {
   
    const [result] = await connectiondb.query(`select orders.id AS order_id,
      adress,
      phone,
      Date,
      user_id,
      users.user_name,
      products.product_name,
      products.price,
      products.company_id
      From  orders
      JOIN products ON products.id=product_id
      JOIN users ON users.id=user_id
      WHERE products.company_id=${req.user[0].id}`);
    return res.status(200).json({ orders: result });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

exports.getNumberOrders=async(req,res)=>{

  try {
    const [orders] = await connectiondb.query(
      `SELECT COUNT(*) AS number
       FROM orders`);
     return res.status(200).send({msg:orders[0].number});
  } catch (error) {
    return   res.status(500).send({ msg: error.message });
  }
}

exports.getSumOrders=async(req,res)=>{

  try {
    const [result] = await connectiondb.query(`SELECT 
    product_id,
    SUM(products.price) AS total_price
FROM 
    orders
JOIN 
    products ON products.id = orders.product_id`);
    return res.status(200).json({msg:result[0].total_price});

  } catch (error) {
    return   res.status(500).send({ msg: error.message });
  }
}

exports.getMostProductseller=async(req,res)=>{
  try {
    
    const [result] = await connectiondb.query(`SELECT 
   products.product_name,
     COUNT(*) AS total_order
FROM 
    orders
  JOIN products ON products.id = orders.product_id
GROUP BY 
    product_id
ORDER BY 
    total_order DESC
LIMIT 1;`);
      return res.status(200).json({msg:result});
  } catch (error) {
    return   res.status(500).send({ msg: error.message });
  }
}