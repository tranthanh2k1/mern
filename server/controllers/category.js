const Category = require("../models/category.js");
const _ = require("lodash");

exports.categoryId = (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "không tìm thấy danh mục nào",
      });
    }

    req.category = category;
    next();
  });
};

exports.create = async (req, res) => {
  const { name, parent_id } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  try {
    const nameUnique = await Category.findOne({ name: name });
    if (nameUnique) {
      return res.status(400).json({
        success: false,
        message: "Tên danh mục không được trùng nhau",
      });
    }

    const newCategory = new Category({
      name,
      parent_id: parent_id ? parent_id : null,
    });

    await newCategory.save((err, category) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Thêm danh mục không thành công",
        });
      }

      res.status(200).json({
        success: true,
        message: "Thêm danh mục thành công",
        category,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.list = async (req, res) => {
  const parent = req.query.parent;

  if (parent) {
    try {
      const listCatetegory = await Category.find({ parent_id: parent });

      if (!listCatetegory) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy danh mục nào",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy danh mục thành công",
        listCatetegory,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  } else {
    try {
      const listCategory = await Category.find({ parent_id: null });

      if (!listCategory) {
        return res.status(400).json({
          success: false,
          message: "Danh mục không tồn tại",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy danh mục thành công",
        listCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  }
};

/*
 * Module này sẽ trả về danh sách danh mục con
 */
exports.listChild = async (req, res) => {
  const listChild = await Category.find({
    parent_id: { $ne: null },
  });

  if (!listChild) {
    return res.status(400).json({
      success: false,
      message: "Không tìm thấy danh mục nào",
    });
  }

  res.status(200).json(listChild);
};

exports.read = (req, res) => {
  const category = req.category;

  res.status(200).json({
    success: true,
    message: "Lấy danh mục thành công",
    category,
  });
};

exports.update = async (req, res) => {
  const cateOld = req.category;

  const { name, parent_id } = req.body;

  let updatedCate = {
    name,
    parent_id: parent_id === "null" ? null : parent_id,
  };

  updatedCate = _.assignIn(cateOld, updatedCate);

  await updatedCate.save((err, category) => {
    if (err) {
      console.log("error", err);
      return res.status(400).json({
        success: false,
        message: "Update danh mục không thành công",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update danh mục thành công",
      category,
    });
  });

  // if (!name) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Bạn cần nhập đầy đủ thông tin",
  //   });
  // }

  // let updatedCategory = {
  //   name,
  //   parent_id: parent_id || null,
  // };

  // const categoryUpdateCondition = { _id: req.params.id };

  // updatedCategory = await Category.findOneAndUpdate(
  //   categoryUpdateCondition,
  //   updatedCategory,
  //   { new: true }
  // );

  // if (!updatedCategory) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Update danh mục không thành công",
  //   });
  // }

  // res.status(200).json({
  //   success: true,
  //   message: "Update danh mục thành công",
  //   updatedCategory,
  // });
};

exports.remove = async (req, res) => {
  const category = req.category;

  await category.remove((err, categoryRemove) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Remove category fail",
      });
    }

    res.status(200).json({
      success: true,
      message: "Remove category success",
      categoryRemove,
    });
  });
};

exports.listAll = async (req, res) => {
  const listCate = await Category.find().populate("parent_id", "_id name");

  res.status(200).json(listCate);
};
