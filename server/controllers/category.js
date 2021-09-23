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

exports.read = (req, res) => {
  const category = req.category;

  res.status(200).json({
    success: true,
    message: "Lấy danh mục thành công",
    category,
  });
};

exports.update = async (req, res) => {
  const category = req.category;
  const { name, parent_id } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  const newCategory = {
    name: name ? name : category.name,
    parent_id: parent_id ? parent_id : null,
  };

  let newCate = _.assignIn(category, newCategory);

  await newCate.save((err, updateCategory) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Update danh mục không thành công",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update danh mục thành công",
      updateCategory,
    });
  });
};

exports.remove = async (req, res) => {
  const category = req.category;

  const dltcate = await Category.find();

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
