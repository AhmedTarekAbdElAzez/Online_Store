const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util");
const fs = require("fs"); 

//update user
router.put(
  "/update/:id", 
  admin,
  body("user_name")
    .isString()
    .withMessage("please enter a valid user name")
    .isLength({ min: 5 })
    .withMessage("user name should be at least 5 characters"),

  body("user_email")
    .isEmail()
    .withMessage("please enter a valid email "),
  async (req, res) => {
    try {       


      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const token = req.headers.token

      const user = await query("select * from users where token = ?", [
        token,
      ]);
    

      if (!user[0]) {
        return res.status(404).json({ msg: "user not found !" });
      }

      const userObj = {
        user_email: req.body.user_email,
        user_name: req.body.user_name,
      };


      await query("update users set ? where user_id = ?", [userObj, user[0].user_id]);

      return res.status(200).json({
        msg: "user updated successfully",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

// 

router.delete(
  "/delete/:user_id", 
  admin,
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from users where user_id = ?", [
        req.params.user_id,
      ]);
      if (!user[0]) {
        res.status(404).json({ msg: "users not found !" });
      }

      await query("delete from users where user_id = ?", [user[0].user_id]);
      res.status(200).json({
        msg: "user delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/get", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const users = await query(`select * from users`);
  // users.map((product) => {
  //   users.user_id = "http://" + req.hostname + ":8000/" + users.user_id;
  // });
  res.status(200).json(users);
});


module.exports = router;
