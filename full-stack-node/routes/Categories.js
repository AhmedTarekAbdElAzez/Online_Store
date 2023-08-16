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
    upload.single("category_image"),
    body("category_name")
      .isString()
      .withMessage("please enter a valid category name")
      .isLength({ min: 3 })
      .withMessage("category name should be at least 3 characters"),

    body("category_description")
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
  
        const category = {
            category_name: req.body.category_name,
            category_description: req.body.category_description,
            category_image: req.file.filename,
        };
  
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into category set ? ", category);
        res.status(200).json({
          msg: "category created successfully !",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
);

router.put(
  "/update/:id", 
  admin,
  upload.single("category_image"),
  body("category_name")
    .isString()
    .withMessage("please enter a valid category name")
    .isLength({ min: 3 })
    .withMessage("category name should be at least 3 characters"),

  body("category_description")
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

      const category = await query("select * from category where category_id = ?", [
        req.params.id,
      ]);
    
      if (!category[0]) {
        return res.status(404).json({ msg: "category not found !" });
      }

      const categoryObj = {
        category_name: req.body.category_name,
        category_description: req.body.category_description,
      };

      if (req.file) {
        categoryObj.category_image = req.file.filename;
        fs.unlinkSync("./upload/" + category[0].category_image); 
      }

      await query("update category set ? where category_id = ?", [categoryObj, category[0].category_id]);

      return res.status(200).json({
        msg: "category updated successfully",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.delete(
  "/delete/:category_id", 
  admin,
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const category = await query("select * from category where category_id = ?", [
        req.params.category_id,
      ]);
      if (!category[0]) {
        res.status(404).json({ msg: "category not found !" });
      }
      fs.unlinkSync("./upload/" + category[0].category_image); // delete old image
      await query("delete from category where category_id = ?", [category[0].category_id]);
      res.status(200).json({
        msg: "category delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/get", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);

  const categories = await query(`select * from category `);
  categories.map((category) => {
    category.category_image = "http://" + req.hostname + ":8000/" + category.category_image;
  });
  res.status(200).json(categories);
});


router.get("/:id", async (req, res) => {

  const query = util.promisify(conn.query).bind(conn);
  const category = await query("select * from category where category_id = ?", [
    req.params.id,
  ]);

  if (!category[0]) {
    return res.status(404).json({ ms: "category not found !" });
  }
  category[0].image_url = "http://" + req.hostname + ":4000/" + category[0].category_image;
  
  // category[0].reviews = await query(
  //   "select * from category where category_id = ?",
  //   category[0].id
  // );
  return res.status(200).json(category[0]);
});

module.exports = router;
