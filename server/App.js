const express = require("express");
const app = express();
const router = require("./routes/AuthRoute");
const Router = require("./routes/UserRoutes");
const PostRouter = require("./routes/PostRoute");

require("./databases/connection").Connection();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Port
port = 3000 || process.env.PORT;
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

//midlewares

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes Usage

app.use("/api/v1/auth", router);
app.use("/api/v1/user", Router);
app.use("/api/v1/post", PostRouter);
app.listen(port, () => {
  console.log("Server is listening at the port 3000");
});
