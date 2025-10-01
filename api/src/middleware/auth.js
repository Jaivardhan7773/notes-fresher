const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
   
    const token = req.cookies?.token || (req.header('Authorization')?.replace('Bearer ', ''));

    if (!token) return res.status(401).json({ error: 'UNAUTHENTICATED' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload contains sub, name, email, picture (if signed accordingly)
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'UNAUTHENTICATED' });
  }
};
