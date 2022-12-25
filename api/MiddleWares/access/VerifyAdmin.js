const User = require("../../Modules/Users/staff");
module.exports = async function isadmin(req, res, next) {
  try {
    let user = await User.findById(req.user.uid);
    if (!user) {
      res.status(401).send("Acess denieed; User Not Found");
    }
    if (user.role.include("Admin")) {
      next();
    } else {
      res
        .status(403)
        .send("Not authorised");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
