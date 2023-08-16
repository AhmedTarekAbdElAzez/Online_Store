const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util");
const fs = require("fs"); 

router.post("/create",
    async (req,res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
             } 

        const token = req.headers.token

        const query = util.promisify(conn.query).bind(conn);

        const user = await query("select * from users where token = ?", [
          token,
        ]);


        if (user == null){
          return res.status(200).json({"message" : "User not found"});
        }

        const product = await query("select * from product where product_id = ?", [
          req.body.product_id,
        ]);
        

        if (product == null){
          return res.status(200).json({"message" : "Product not found"});
        }


        const userData = {
            user_id: user[0].user_id,
            product_id: req.body.product_id,
            price: product[0].product_price
          };

        await query("insert into user_order set ? ", userData);
        return res.status(200).json(userData);

    }
        catch (err) {
            return res.status(500).json({err:err})
        }
})

router.put("/update/:id",
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const token = req.headers.token;

            const query = util.promisify(conn.query).bind(conn);

            const user = await query("SELECT * FROM users WHERE token = ?", [
                token,
            ]);

            if (user == null) {
                return res.status(404).json({ message: "User not found" });
            }
            
            const order = await query("SELECT * FROM user_order WHERE order_id = ?", [
                order_id,
            ]);

            if (order == null) {
                return res.status(404).json({ message: "Order not found" });
            }

            const product = await query("SELECT * FROM product WHERE product_id = ?", [
                req.body.product_id,
            ]);

            if (product == null) {
                return res.status(404).json({ message: "Product not found" });
            }

            const userData = {
                user_id: user[0].user_id,
                product_id: req.body.product_id,
                price: product[0].product_price
            };

            await query("UPDATE user_order SET ? WHERE order_id = ?", [userData, id]);

            return res.status(200).json(userData);
        }
        catch (err) {
            return res.status(500).json({ err: err });
        }
    });


router.delete("/delete/:order_id",
async (req, res) => {
    try {
        const token = req.headers.token;

        const query = util.promisify(conn.query).bind(conn);

        const user = await query("SELECT * FROM users WHERE token = ?", [
            token,
        ]);

        if (user == null) {
            return res.status(404).json({ message: "User not found" });
        }

        const order = await query("SELECT * FROM user_order WHERE order_id = ?", [
            order_id,
        ]);

        if (order == null) {
            return res.status(404).json({ message: "Order not found" });
        }

        await query("DELETE FROM user_order WHERE order_id = ?", [order_id]);

        return res.status(200).json({ message: "Order deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ err: err });
    }
});

router.get("/getAll", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const orders = await query(`select * from user_order`);
  return res.status(200).json(orders);
});

router.get("/getForUser", async (req, res) => {

  const token = req.headers.token

  const query = util.promisify(conn.query).bind(conn);

  const user = await query("select * from users where token = ?", [
    token,
  ]);

  if (user == null){
    return res.status(200).json({"message" : "User not found"});
  }

  const orders = await query(`select * from user_order where user_id = ?` , user[0].user_id);
  return res.status(200).json(orders);
});

module.exports = router;
