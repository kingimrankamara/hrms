const jwt = require("jsonwebtoken");
module.exports = function authToken(req, res, next) {
  let token = req.headers["authtoken"];
  if (!token) res.status(401).json({ error: "acess denied" });

  try {
    const tokenVerified = jwt.verify(token, "procdesssenvTECRET");
    req.user = tokenVerified;
    
    next();
  } catch (err) {
    res
      .status(400)
      .json({ error: err, message: "Invalid token, access denied" });
  }
};
