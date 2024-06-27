import jwt, { JwtPayload } from "jsonwebtoken";
import { TOKEN } from "../config/app.config";

export class TokenUtil {
  async generateAccessToken(
    id: string,
    username: string,
    role: string
  ): Promise<string> {
    const payLoad: JwtPayload = {
      id: id,
      username: username,
      role: role,
    };
    const token = jwt.sign(payLoad, TOKEN.ACCESS_SECRET, {
      expiresIn: TOKEN.ACCESS_EXPIRY,
    });

    return token;
  }

  // async verifyAccessToken(token: string) {
  //   const decoded: JwtPayload = jwt.verify(
  //     token,
  //     TOKEN.ACCESS_SECRET
  //   ) as JwtPayload;
  //   return decoded.payLoad;
  // }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return jwt.verify(token, TOKEN.ACCESS_SECRET) as JwtPayload;
    } catch (error) {
      console.error("Token verification error:", error);
      throw error;
    }
  }
}
