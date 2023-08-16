const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util");
const fs = require("fs"); 

router.post(
  "/create",
  admin,
  upload.single("product_image"),
  body("product_name")
    .isString()
    .withMessage("please enter a valid product name")
    .isLength({ min: 3 })
    .withMessage("product name should be at least 3 characters"),
  body("product_price")
    .isLength({ min: 3 })
    .withMessage("product price should be at least 3 numerics"),
  body("product_description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),
    
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "Image is Required",
            },
          ],
        });
      }

      const product = {
          product_name: req.body.product_name,
          product_price: req.body.product_price,
          product_description: req.body.product_description,
          product_image: req.file.filename,
      };

      const query = util.promisify(conn.query).bind(conn);
      await query("insert into product set ? ", product);
      res.status(200).json({
        msg: "product created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put(
"/update/:id", 
admin,
upload.single("product_image"),
body("product_name")
  .isString()
  .withMessage("please enter a valid product name")
  .isLength({ min: 3 })
  .withMessage("product name should be at least 3 characters"),

  body("product_price")
  .isLength({ min: 3 })
  .withMessage("product price should be at least 3 numeric"),

body("product_description")
  .isString()
  .withMessage("please enter a valid description ")
  .isLength({ min: 20 })
  .withMessage("description name should be at lease 20 characters"),
async (req, res) => {
  try {       

    const query = util.promisify(conn.query).bind(conn);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await query("select * from product where product_id = ?", [
      req.params.id,
    ]);
  
    if (!product[0]) {
      return res.status(404).json({ msg: "product not found !" });
    }

    const productObj = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_description: req.body.product_description,
    };

    if (req.file) {
      productObj.product_image = req.file.filename;
      fs.unlinkSync("./upload/" + product[0].product_image); 
    }

    await query("update product set ? where product_id = ?", [productObj, product[0].product_id]);

    return res.status(200).json({
      msg: "product updated successfully",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
}
);

router.delete(
"/delete/:id", 
admin,
async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const product = await query("select * from product where product_id = ?", [
      req.params.id,
    ]);
    if (!product[0]) {
      res.status(404).json({ msg: "product not found !" });
    }

    //fs.unlinkSync("./upload/" + product[0].product.product_image);
    await query("delete from product where product_id = ?", [product[0].product_id]);
    res.status(200).json({
      msg: "product delete successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.get("/get", async (req, res) => {
const query = util.promisify(conn.query).bind(conn);

const products = await query(`select * from product`);
products.map((product) => {
  product.product_image = "http://" + req.hostname + ":8000/" + product.product_image;
});
res.status(200).json(products);
});


router.get("/:id", async (req, res) => {

const query = util.promisify(conn.query).bind(conn);
const product = await query("select * from product where product_id = ?", [
  req.params.id,
]);

if (!product[0]) {
  return res.status(404).json({ ms: "product not found !" });
}
product[0].image_url = "http://" + req.hostname + ":4000/" + product[0].product_image;

// product[0].reviews = await query(
//   "select * from product where product_id = ?",
//   product[0].id
// );
return res.status(200).json(product[0]);
});

module.exports = router;
