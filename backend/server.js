import express from "express";
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDatabase from "./db/Database.js";
import userRouter from "./routes/userRouter.js";
import shopRouter from "./routes/shopRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import cloudinary from "cloudinary";
import eventRouter from "./routes/eventRouter.js";
import couponRouter from "./routes/couponRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import messageRouter from "./routes/messageRouter.js";
import conversationRouter from "./routes/conversationRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({limit: "50mb"}));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

dotenv.config({ path: "config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDatabase();

app.use("/api/user", userRouter);
app.use("/", express.static("uploads"));
app.use("/api/shop", shopRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/event", eventRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/message", messageRouter)
app.use("/api/conversation", conversationRouter)

app.get("/", (req, res) => {
  res.send("App is Working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.bgMagenta.white);
});
