const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (req, res, next) {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ err: true, msg: 'Not authorized' });
  }
  try {
    //it is going to give the following (user:{id: user.id,name: name, email: email})
    const publicKey = fs.readFileSync('../public.key', 'utf8');
    const verify = jwt.verify(token, publicKey);
    req.user = verify;
    next();
  } catch (err) {
    console.error('authError', err);
    res.status(401).json({ err: true, msg: 'Please login again' });
  }
};
