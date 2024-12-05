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
    const [result] = await connectiondb.query(
      `
            SELECT 
                order_details.*, 
                users.user_name, 
                users.id,
                products.company_id
            FROM 
                order_details
            JOIN 
                users ON users.id = order_details.user_id
            JOIN 
                products ON products.product_name = order_details.product
            WHERE 
                products.company_id = ?
        `,
      [req.user[0].id]
    );

    var orders_address = [];
    const promises = result.map(async (el) => {
      const [result2] = await connectiondb.query(
        `   SELECT  orders.id AS order_id, adress,phone,
            users.user_name,
            users.id
            FROM orders
            JOIN users ON users.id=orders.user_id
            WHERE orders.user_id = ?
          `,
        [el.user_id]
      );
      return result2;
    });

    const allOrders = await Promise.all(promises);

    orders_address.push(...allOrders);

    return res.status(200).json({ address: orders_address, orders: result });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
