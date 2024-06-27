import { Request, Response, NextFunction } from "express";
import { userToken } from "../interface";
import { CODES, MESSAGES } from "../constants";
import { ApiError, TokenUtil } from "../utils";
import { JwtPayload } from "jsonwebtoken";

const tokenObj = new TokenUtil();

declare module "express-serve-static-core" {
  interface Request {
    user: userToken;
  }
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        CODES.CLIENT_ERROR.UNAUTHORIZED,
        MESSAGES.ERROR_MSG.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = await tokenObj.verifyAccessToken(token);

    req.user = decoded as userToken;
    next();
  } catch (error: any) {
    console.error("Token verification error:", error);
    next(
      new ApiError(
        CODES.CLIENT_ERROR.FORBIDDEN,
        MESSAGES.ERROR_MSG.INVALID_TOKEN,
        error
      )
    );
  }
};

const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user: userToken | undefined = req.user as userToken;
    if (!user || !user.role || !roles.includes(user.role)) {
      throw new ApiError(
        CODES.CLIENT_ERROR.FORBIDDEN,
        MESSAGES.ERROR_MSG.NO_ACCESS
      );
    }
    next();
  };
};

export { authUser, authorize };
