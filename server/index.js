const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routers/auth.js");
const categoryRoutes = require("./routers/category.js");
const productRutes = require("./routers/product.js");
const colorRoutes = require("./routers/color.js");
const sizeRoutes = require("./routers/size.js");
const imgProductRoutes = require("./routers/imgProduct.js");

dotenv.config();
const app = express();

// Connection to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("err", err);
    process.exit(1);
  });

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

// Routes Middlewares
app.use("/API", authRoutes);
app.use("/API", categoryRoutes);
app.use("/API", productRutes);
app.use("/API", colorRoutes);
app.use("/API", sizeRoutes);
app.use("/API", imgProductRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
