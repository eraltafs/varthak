import { Request, Response, NextFunction } from "express";

const authorize = (permittedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { x_userRole } = req.body;
    if (x_userRole.some((role: string) => permittedRoles.includes(role))) {
      next();
    } else {
      res.send("You are not authorized to do this");
    }
  };
};

export { authorize };
