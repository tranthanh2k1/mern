const Order = require("../models/order.js");
const CartProduct = require("../models/cart-product.js");
const nodemailer = require("nodemailer");
const moment = require("moment");

exports.saveOrder = async (req, res) => {
  const {
    username,
    email,
    address,
    phone,
    paymentMethod,
    cartProduct,
    intoMoney,
    paymentStatus,
    user_id,
  } = req.body;

  function makeid() {
    var text = "ES";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const newOrder = new Order({
    code_bill: makeid(),
    username,
    email,
    address,
    phone,
    paymentMethod,
    intoMoney,
    status: "PROCESSING",
    paymentStatus: paymentStatus || "unpaid",
    user_id,
  });

  const saveOrder = await newOrder.save();

  cartProduct.map((item) => {
    const newCartProduct = new CartProduct({
      product_name: item.name,
      product_price: item.price,
      product_image: item.image,
      product_quantity: item.qty,
      order_id: saveOrder._id,
    });

    newCartProduct.save();
  });

  // send email
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const convertNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Thông tin đơn hàng của ${username}</h4>
                <span style="color: black">
                  Bạn hiện đang mua 
                  ${cartProduct
                    .map((item) => {
                      return `
                      ${item.qty} cái ${item.name}
                    `;
                    })
                    .join(", ")}
                </span>
                <p style="color: black">Mã đơn hàng: ${saveOrder.code_bill}</p>
                <p style="color: black">Địa chỉ nhận hàng: ${address}</p>
                <p style="color: black">Thời gian đặt hàng: ${moment().format(
                  "LLLL"
                )}</p>
                <p style="color: black">Phương thức thanh toán: ${paymentMethod}</p>
                <h3>Thành tiền: ${convertNumber(intoMoney)}đ</h3>
            </div>
        </div>
    `;

  let mainOptions = {
    from: "ESHOP",
    to: email,
    subject: "Thông tin đơn hàng",
    html: content,
  };
  transporter.sendMail(mainOptions);

  res.status(200).json({
    success: true,
    message: "Bạn đã đặt hàng thành công",
  });
};

exports.listAllOrder = (req, res) => {
  let page = req.query.page;

  const page_size = 5;

  if (page) {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }

    const qtySkip = (page - 1) * page_size;

    Order.find({})
      .sort({ _id: -1 })
      .skip(qtySkip)
      .limit(page_size)
      .exec((err, listOrder) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Không tìm thấy đơn hàng nào",
          });
        }

        Order.countDocuments({}).then((total) => {
          const totalPage = Math.ceil(total / page_size);

          res.status(200).json({
            success: true,
            message: "Lấy chi tiết đơn hàng thành công",
            totalPage,
            listOrder,
          });
        });
      });
  } else {
    Order.find()
      .sort({ _id: -1 })
      .exec((err, listOrder) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Không tìm thấy đơn hàng nào",
          });
        }

        res.status(200).json({
          success: true,
          message: "Lấy chi tiết đơn hàng thành công",
          listOrder,
        });
      });
  }
};

exports.orderDetail = async (req, res) => {
  const orderId = req.params.orderId;

  const infoOrder = await Order.findOne({ _id: orderId });

  CartProduct.find({ order_id: orderId }).exec((err, detailOrder) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy đơn hàng nào",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy chi tiết đơn hàng thành công",
      detailOrder,
      infoOrder,
    });
  });
};

exports.updateStatusOrderAdmin = async (req, res) => {
  const orderId = req.params.orderId;

  const { status } = req.body;

  let updatedStatusOrder;

  const getStatusDB = await Order.findOne({ _id: orderId });

  switch (status) {
    case "PROCESSING":
      return res.status(401).json({
        success: false,
        message: "Không thể update status này",
      });
    case "DELIVERING":
      if (getStatusDB.status === "PROCESSING") {
        updatedStatusOrder = {
          status,
          updated_delivering: Date.now(),
        };

        updatedStatusOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          updatedStatusOrder,
          { new: true }
        );

        if (!updatedStatusOrder) {
          return res.status(401).json({
            success: false,
            message: "Update status đơn hàng không thành công",
          });
        }

        res.status(200).json({
          success: true,
          message: "Update status đơn hàng thành công",
          updatedStatusOrder,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Không thể update status này",
        });
      }
    case "RECEIVED":
      if (getStatusDB.status === "DELIVERING") {
        updatedStatusOrder = {
          status,
          updated_received: Date.now(),
        };

        updatedStatusOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          updatedStatusOrder,
          { new: true }
        );

        if (!updatedStatusOrder) {
          return res.status(401).json({
            success: false,
            message: "Update status đơn hàng không thành công",
          });
        }

        res.status(200).json({
          success: true,
          message: "Update status đơn hàng thành công",
          updatedStatusOrder,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Không thể update status này",
        });
      }
    case "CANCELLED":
      if (
        getStatusDB.status === "PROCESSING" ||
        getStatusDB.status === "DELIVERING" ||
        getStatusDB.status === "DELIVERING"
      ) {
        updatedStatusOrder = {
          status,
          updated_cancelled: Date.now(),
        };

        updatedStatusOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          updatedStatusOrder,
          { new: true }
        );

        if (!updatedStatusOrder) {
          return res.status(401).json({
            success: false,
            message: "Update status đơn hàng không thành công",
          });
        }

        res.status(200).json({
          success: true,
          message: "Update status đơn hàng thành công",
          updatedStatusOrder,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Không thể update status này",
        });
      }
    default:
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy status nào khớp với đơn hàng",
      });
  }
};

exports.listAllOrderStatus = (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(401).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  if (
    status === "PROCESSING" ||
    status === "DELIVERING" ||
    status === "RECEIVED" ||
    status === "CANCELLED"
  ) {
    Order.find({ status })
      .sort({ _id: -1 })
      .exec((err, listOrderStatus) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Không tìm thấy đơn hàng nào",
          });
        }

        res.status(200).json({
          success: true,
          message: "Lấy danh sách đơn hàng theo trạng thái thành công",
          listOrderStatus,
        });
      });
  } else {
    return res.status(401).json({
      success: false,
      message: "Không tìm thấy trạng thái nào trùng với đơn hàng",
    });
  }
};

exports.searchOrderAdmin = async (req, res) => {
  const search = req.query.code;

  if (search) {
    const orderSearch = await Order.findOne({ code_bill: search });

    if (!orderSearch) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy đơn hàng nào",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tìm kiếm đơn hàng thành công",
      orderSearch,
    });
  } else {
    Order.find({}).exec((err, listOrder) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Không tìm thấy đơn hàng nào",
        });
      }

      res.status(200).json({
        success: true,
        message: "Tìm kiếm đơn hàng thành công",
        listOrder,
      });
    });
  }
};

exports.filterByDate = (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }

  Order.find({
    createdAt: {
      $gte: new Date(new Date(date).setHours(00, 00, 00)),
      $lt: new Date(new Date(date).setHours(23, 59, 59)),
    },
  })
    .then((data) => {
      res.status(200).json({
        success: false,
        message: "Lấy đơn hàng thành công",
        order: data,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.status(401).json({
        success: false,
        message: "Lấy đơn hàng thất bại",
      });
    });
};
