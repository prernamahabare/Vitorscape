const express = require('express');
const User = require('../mongo_modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middlewares/fatchuser')

const JWT_secreate = "hii@howareyou$$$$"

//ROUTE1 : login User using: POST "/api/auth/login".
router.post('/login', [
  body('ecode', 'Enter a valid ecode').exists(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ecode, password } = req.body;
  try {
    const user = await User.findOne({ ecode });
    if (!user) {
      return res.status(400).json({ error: "Ecode `${ecode}` not found" });
    }

    const compassword = await bcrypt.compare(password, user.password)
    if (!compassword) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const Auth_token = jwt.sign(data, JWT_secreate);
    success = true;
    res.json({ success, Auth_token })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router