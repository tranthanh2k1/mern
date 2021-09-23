const Product = require("../models/product.js");
const formidable = require("formidable");
const _ = require("lodash");

exports.productId = (req, res, next, id) => {
  Product.findById(id, (err, product) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    req.product = product;
    next();
  });
};

exports.create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true; // lấy đuôi
  form.multiples = true; // upload nhiều ảnh
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không thể upload ảnh",
      });
    }

    const { name, price_default, image_default, category_id } = fields;

    if (!name || !price_default || !image_default || !category_id) {
      return res.status(400).json({
        success: false,
        message: "Bạn cần nhập đầy đủ thông tin",
      });
    }

    let newProduct = new Product({
      ...fields,
      image_default: files.image_default.name,
    });

    if (files.image_default) {
      if (files.image_default.size > 100000) {
        return res.status(400).json({
          success: false,
          message: "Kích thước của ảnh không quá 1mb",
        });
      }

      newProduct.image_default.contentType = files.image_default.type;
    }

    newProduct.save((err, product) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Thêm sản phẩm thất bại",
        });
      }

      res.status(200).json({
        success: true,
        message: "Thêm sản phẩm thành công",
        product,
      });
    });
  });
};

exports.list = async (req, res) => {
  const listProduct = await Product.find();

  if (!listProduct) {
    return res.status(400).json({
      success: false,
      message: "Không tìm thấy sản phẩm nào",
    });
  }

  res.status(200).json({
    success: true,
    message: "Lấy danh sách sản phẩm thành công",
    listProduct,
  });
};

exports.detail = (req, res) => {
  const product = req.product;

  if (!product) {
    res.status(400).json({
      success: false,
      message: "Không tìm thấy sản phẩm",
    });
  }

  res.status(200).json({
    success: true,
    message: "Lấy sản phẩm thành công",
    product,
  });
};

exports.update = async (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không thể upload ảnh",
      });
    }

    const newProduct = {
      ...fields,
      image_default: files.image_default.name,
    };

    if (files.image_default) {
      if (files.image_default.size > 100000) {
        return res.status(400).json({
          success: false,
          message: "Kích thước của ảnh không quá 1mb",
        });
      }

      newProduct.image_default.contentType = files.image_default.type;
    }

    const product = req.product;

    const updateProduct = _.assignIn(product, newProduct);

    updateProduct.save((err, product) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Update sản phẩm không thành công",
        });
      }

      res.status(200).json({
        success: true,
        message: "Update sản phẩm thành công",
        product,
      });
    });
  });
};

exports.remove = async (req, res) => {
  const product = req.product;

  await product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Xóa sản phẩm không thành công",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
      product,
    });
  });
};
