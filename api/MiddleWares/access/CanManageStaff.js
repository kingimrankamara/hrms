const User = require("../../Modules/Users/staff");
module.exports = async function canRegisterStudent(req, res, next) {
  try {
    let user = await User.findById(req.user.uid);
    if (!user) {
      res.status(401).send("Acess denieed; You need to login");
    }
    if (user.role.include("Admin") || user.role.include("Principal") || user.role.include("HR")) {
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
