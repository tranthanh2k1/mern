const Product = require("../models/product.js");
const _ = require("lodash");
const { isBuffer } = require("lodash");

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

/*
 * Module này là thêm sản phẩm và trả về sản phẩm vừa thêm
 */
exports.create = async (req, res) => {
  const {
    name,
    price_default,
    price_sale,
    description,
    image,
    quantity,
    status,
    color,
    size,
    category_id,
  } = req.body;

  if (!name || !price_default || !image || !color || !size || !category_id) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  const nameUnique = await Product.findOne({ name });

  if (nameUnique) {
    return res.status(400).json({
      success: false,
      message: "Tên sản phẩm đã tồn tại",
    });
  }

  const newProduct = new Product({
    name,
    price_default,
    price_sale,
    description,
    image,
    quantity,
    status,
    color,
    size,
    category_id,
  });

  await newProduct.save((err, product) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không thêm được sản phẩm",
      });
    }

    res.status(200).json({
      success: true,
      message: "Thêm sản phẩm thành công",
      product,
    });
  });
};

/*
 * Module này là update sản phẩm
 */
exports.update = async (req, res) => {
  const productOld = req.product;

  const {
    name,
    price_default,
    price_sale,
    description,
    image,
    quantity,
    status,
    color,
    size,
    category_id,
  } = req.body;

  if (!name || !price_default || !image || !color || !size || !category_id) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  let newProduct = {
    name,
    price_default,
    price_sale,
    description,
    image,
    quantity,
    status,
    color,
    size,
    category_id,
  };

  newProduct = _.assignIn(productOld, newProduct);

  await newProduct.save((err, updateProduct) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Update sản phẩm không thành công",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update sản phẩm thành công",
      updateProduct,
    });
  });
};

/*
 * Module này sẽ trả về danh sách sản phẩm
 */
exports.list = async (req, res) => {
  const listProduct = await Product.find().populate(
    "category_id",
    "_id name parent_id"
  );

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

/*
 * Module này sẽ trả về chi tiết sản phẩm
 */
exports.detail = async (req, res) => {
  const product = await req.product.populate(
    "category_id",
    "_id name parent_id"
  );

  res.status(200).json(product);
};

/*
 * Module này sẽ thực hiện xóa sản phẩm
 */
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

/*
 * Module này sẽ trả về 1 mảng image theo id
 */
exports.getProductImage = (req, res) => {
  const { image } = req.product;

  res.status(200).json(image);
};

/*
 * Module này sẽ trả về 1 mảng color theo id
 */
exports.getProductColor = (req, res) => {
  const { color } = req.product;

  res.status(200).json(color);
};

/*
 * Module này sẽ trả về 1 mảng size theo id
 */
exports.getProductSize = (req, res) => {
  const { size } = req.product;

  res.status(200).json(size);
};

/*
 * Module này sẽ trả về danh sách sản phẩm khuyến mãi
 */
exports.getProductSale = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 4;

  Product.find({ price_sale: { $gt: 0 } })
    .populate("category_id", "_id name")
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy sản phẩm nào",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy danh sách sản phẩm khuyến mãi thành công",
        product,
      });
    });
};

/*
 * Module này sẽ trả về danh sách sản phẩm theo danh mục con
 */
exports.getProductCateChild = async (req, res) => {
  const { cateId } = req.params;

  Product.find({ category_id: cateId }, (err, product) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy sản phẩm nào",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy danh mục sản phẩm thành công",
      product,
    });
  });
};

/*
 * Module này sẽ trả về sản phẩm liên quan có cùng danh mục
 */
exports.listRelated = (req, res) => {
  Product.find({
    _id: { $ne: req.product },
    category_id: req.product.category_id._id,
  })
    .limit(4)
    .populate("category_id", "_id name")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          succes: false,
          message: "Không tìm thấy sản phẩm nào",
        });
      }

      res.status(200).json(product);
    });
};
