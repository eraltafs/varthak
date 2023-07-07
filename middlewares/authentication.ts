import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.SECKEY, async (err, decoded: any) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ msg: "Please log in again", err: err.message });
      }

      try {
        const user = await UserModel.findById(decoded.user_id);
        if (!user) {
          return res.status(401).send({ msg: "User not found" });
        }
        req.body.user = user;
        req.body.x_userRole = user.roles;
        next();
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });
  } else {
    res.send("Please log in");
  }
};

export { authentication };
