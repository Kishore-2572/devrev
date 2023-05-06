const jwt = require('jsonwebtoken');
const e = require('express');

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) res.status(401).send({ message: 'Invalid Token' });
      else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'You are not Authenticated' });
  }
};

const generateUserToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: '30d' }
  );
};

const generateAdminToken = (admin) => {
  return jwt.sign(
    {
      _id: admin._id,
      email: admin.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: '30d' }
  );
};

module.exports = { isAuth, generateUserToken, generateAdminToken };
