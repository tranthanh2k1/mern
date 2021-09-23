const Size = require("../models/size.js");

exports.sizeId = (req, res, next, id) => {
  Size.findById(id, (err, size) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy size",
      });
    }

    req.size = size;
    next();
  });
};

exports.create = async (req, res) => {
  const { size, color_id } = req.body;

  const newSize = new Size({
    size,
    color_id,
  });

  await newSize.save((err, size) => {
    if (err) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Không thêm đc size",
        })
      );
    }

    res.status(200).json({
      success: true,
      mesage: "Thêm size thành công",
      size,
    });
  });
};

exports.list = async (req, res) => {
  const listSize = await Size.find();

  if (!listSize) {
    return res.status(400).json({
      success: false,
      message: "Lấy danh sách size thất bại",
    });
  }

  res.status(200).json({
    success: true,
    message: "Lấy danh sách size thành công",
    listSize,
  });
};

exports.remove = (req, res) => {
  const size = req.size;

  size.remove((err, removeSize) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Xóa size thất bại",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa size thành công",
      removeSize,
    });
  });
};
