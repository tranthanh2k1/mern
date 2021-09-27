const User = require("../models/user.js");

exports.userId = (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy user",
      });
    }

    req.user = user;
    next();
  });
};
