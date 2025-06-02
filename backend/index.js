const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://buildtask4.vercel.app",
  })
);
app.use(express.json());

const authRoutes = require("./routes/authRouter");
app.use("/api", authRoutes);
const usersRouter = require("./routes/users");
app.use("/api", usersRouter);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
