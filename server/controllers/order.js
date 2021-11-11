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
    user_id,
  } = req.body;

  const newOrder = new Order({
    username,
    email,
    address,
    phone,
    status: "WAIT FOR CONFIRMATION",
    paymentMethod,
    intoMoney,
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
