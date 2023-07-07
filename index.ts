import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connection } from "./config/db";
import { authentication } from "./middlewares/authentication";
import { UserModel } from "./models/user.model";
import { booksRouter } from "./routes/books.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) =>{
  res.send("API Base URL");
});

app.post("/signup", async (req, res) => {
  const { email, password, roles } = req.body;
  const user = await UserModel.findOne({ email });
  if (user?.email) {
    res.send("User already exists");
  } else {
    try {
      bcrypt.hash(password, 4, async (err, hash) => {
        if (hash) {
          const user = new UserModel({ email, password: hash, roles });
          await user.save();
          res.send("User added");
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user)
  if (user?.email) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { user_id: user._id, role: user.roles },
          process.env.KEY,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: true });
        res.send({ msg: "Logged in", token });
      } else {
        res.send("Invalid login credentials");
      }
    });
  } else {
    res.send("Invalid login credentials");
  }
});

app.use("/books", booksRouter);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connection to MongoDB established");
  } catch (err) {
    console.log("Failed to connect to MongoDB");
  }
  console.log("Listening on port 8000");
});
