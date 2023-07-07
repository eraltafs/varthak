import { Request, Response, NextFunction } from "express";



const authorize = (permittedRoles: string[]) => (req, res, next) => {
  const { x_userRole } = req.body;
  if (x_userRole.some((role) => permittedRoles.includes(role))) {
    next();
  } else {
    res.send("You are not authorized to do this");
  }
};

export { authorize };
