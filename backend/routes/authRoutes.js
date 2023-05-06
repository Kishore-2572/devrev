const Usermodel = require('../models/Usermodel');
const Adminmodel = require('../models/Adminmodel');
const md5 = require('md5');
const { generateUserToken, generateAdminToken } = require('../util');

const authRouter = require('express').Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;
    const hashedPassword = md5(password);
    const user = await Usermodel.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    if (user) {
      res.status(404).send({ message: 'Already a user' });
    } else {
      const newUser = new Usermodel({
        name: name,
        email: email,
        mobile: mobile,
        password: hashedPassword,
      });
      const validUser = await newUser.save();
      res.status(200).send(validUser);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = md5(password);
    const user = await Usermodel.findOne({ email: email });
    if (user) {
      if (hashedPassword == user['password']) {
        const { password, ...userDetails } = user._doc;
        res.status(200).send({
          _id: userDetails['_id'],
          name: userDetails['name'],
          email: userDetails['email'],
          mobile: userDetails['mobile'],
          token: generateUserToken(userDetails),
        });
      } else {
        res.status(404).send({ message: 'Wrong password' });
      }
    } else {
      res.status(404).send({ message: 'Not a user' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

authRouter.post('/adminlogin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = md5(password);
    const admin = await Adminmodel.findOne({ email: email });
    if (admin) {
      if (hashedPassword == admin['password']) {
        const { password, ...adminDetails } = admin._doc;
        res.status(200).send({
          token: generateAdminToken(adminDetails),
        });
      } else {
        res.status(404).send({ message: 'Wrong password' });
      }
    } else {
      res.status(404).send({ message: 'Invalid credentials' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = authRouter;
