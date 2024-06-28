import { IUser, ILoginUser } from "../interface";
import { ApiError, ApiResponse, HashUtil, TokenUtil } from "../utils";
import { User } from "../model";
import { MESSAGES, CODES } from "../constants";

const hash = new HashUtil();
const tokenUtil = new TokenUtil();

export class UserService {
  async register(userData: IUser) {
    //check for the avaibility of username
    const existingUser = await User.findOne({ user_name: userData.user_name });
    if (existingUser) {
      throw new ApiError(
        CODES.CLIENT_ERROR.CONFLICT_ERROR,
        MESSAGES.ERROR_MSG.NAME_TAKEN(userData.user_name)
      );
    }

    //hash the password
    const hashedPassword = await hash.hashPassword(userData.password);
    userData.password = hashedPassword;

    //add user
    const newUser = await User.create(userData);

    return new ApiResponse(
      CODES.SUCCESS.CREATED,
      MESSAGES.SUCCESS_MSG.REGISTER,
      newUser
    );
  }

  async login(loginData: ILoginUser) {
    const user: IUser | null = await User.findOne({
      user_name: loginData.user_name,
    });
    if (!user) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("User")
      );
    }

    const passwordMatch = await hash.verifyPassword(
      loginData.password,
      user.password
    );
    if (!passwordMatch) {
      throw new ApiError(
        CODES.CLIENT_ERROR.UNAUTHORIZED,
        MESSAGES.ERROR_MSG.INVALID_PASSWORD
      );
    }

    let token;
    tokenUtil
      .generateAccessToken(user.id, user.user_name, user.role)
      .then((tkn) => {
        token = tkn;
      })
      .catch((error) => {
        throw new ApiError(
          CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
          MESSAGES.ERROR_MSG.GEN_TOKEN,
          error
        );
      });

    const loggedInUser = await User.findById(user.id).select("-password");

    return new ApiResponse(CODES.SUCCESS.OK, MESSAGES.SUCCESS_MSG.LOGIN, {
      loggedInUser,
      token,
    });
  }

  async getCurrentUser(id: string) {
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("User")
      );
    }
    return new ApiResponse(CODES.SUCCESS.OK, "", user);
  }

  async getAllUsers() {
    const users: IUser[] | null = await User.find();
    if (!users) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Users")
      );
    }

    if (users.length == 0) {
      throw new ApiError(
        CODES.SUCCESS.NO_CONTENT,
        MESSAGES.ERROR_MSG.NO_CONTENT("User")
      );
    }

    return new ApiResponse(CODES.SUCCESS.OK, "", users);
  }
}
