const Color = require("../models/color.js");

exports.colorId = (req, res, next, id) => {
  Color.findById(id, (err, color) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy color",
      });
    }

    req.color = color;
    next();
  });
};

exports.create = async (req, res) => {
  const arrayColor = req.body;
  console.log("arrayColor", arrayColor);

  for (i = 0; i < arrayColor.length; i++) {
    arrayColor[i].save();
  }

  // description: phần của product
  // const newColor = Color({
  //   color,
  //   product_id,
  // });

  // try {
  //   await newColor.save((err, color) => {
  //     if (err) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Không thêm đc color",
  //       });
  //     }

  //     res.status(200).json({
  //       success: true,
  //       message: "Thêm color thành công",
  //       color,
  //     });
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     success: false,
  //     message: "Lỗi server",
  //   });
  // }
};

exports.list = async (req, res) => {
  const listColor = await Color.find();

  if (!listColor) {
    return res.status(400).json({
      success: false,
      message: "Color không tồn tại",
    });
  }

  res.status(200).json({
    success: true,
    message: "Lấy danh sách color thành công",
    listColor,
  });
};

exports.remove = (req, res) => {
  const color = req.color;

  color.remove((err, removeColor) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không xóa đc color",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa color thành công",
      removeColor,
    });
  });
};
