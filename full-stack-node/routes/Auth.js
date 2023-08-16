const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.post(
  "/login",
  
  async (req, res) => {
    
      body("user_email").isEmail().withMessage("please enter a valid email!")

      body("user_password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character")

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      

      try {
        const query = util.promisify(conn.query).bind(conn);
        const user = await query("select * from users where user_email = ?", [
          req.body.user_email,
        ]);


        if (user.length == 0) {
          return res.status(404).json({
            errors: [
              {
                msg: "email or password not found !",
              },
            ],
          });
        }

        const match = await bcrypt.compare(req.body.user_password, user[0].user_password);

        if (match) {

          const token = crypto.randomBytes(16).toString("hex")


          conn.query('UPDATE users SET token = ? WHERE user_id = ?', [token, user[0].user_id], (error, result) => {
            if (error) throw error;
        
            // Send response to client to clear token
            return res.status(200).json({ msg: "Login success"  , token: token });
          });

        } else {
          return res.status(400).json({ error: "wrong password" });
        }
        
      } catch(e) {
        return res.status(500).json({ err: e });
      }

})

router.post("/register",body("user_email").isEmail().withMessage("please enter a valid email!"),
    body("user_password").isLength({min: 6 ,max: 12}).withMessage("please enter a valid password between 6 to 12"),
    body("user_name").isString().withMessage("please enter a valid name!"),
    async (req,res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
        } 
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const checkEmailExists = await query(
            "select * from users where user_email = ?",
            [req.body.user_email]
        );
        if (checkEmailExists.length > 0) {
            res.status(400).json({
            errors: [
                {
                msg: "email already exists !",
                },
            ],
            });
        }

        const userData = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: await bcrypt.hash(req.body.user_password, 10),
            token: crypto.randomBytes(16).toString("hex"),
          };
      
        await query("insert into users set ? ", userData);
        //delete userData.user_password;
        res.status(200).json(userData);

        res.json("Success");
    }
        catch (err) {
            res.status(500).json(err)
        }
})

router.post('/logout', async (req, res) => {
  const oldToken = req.headers.token;
  // return res.status(200).json(oldToken);
  const query = util.promisify(conn.query).bind(conn);

  const user = await query("select * from users where token = ?", [
    oldToken,
  ]);

  if (user[0] == null){
    return res.status(401).json({ message: "unauthorized" });
  }

  // Update token in the database
  conn.query('UPDATE users SET token = ? WHERE user_id = ?', [null, user[0].user_id], (error, result) => {
    if (error) throw error;

    // Send response to client to clear token
    return res.status(200).json({ message: "Logged Out" });
  });
});

module.exports = router
    
