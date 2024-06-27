import { Request, Response, NextFunction } from "express";
import { UserService } from "../service";

const service = new UserService();

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body;
    const newUser = await service.register(userData);
    res.status(newUser.statusCode).json(newUser);
  } catch (error: any) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loginData = req.body;
    const loggedInUser = await service.login(loginData);
    res.status(loggedInUser.statusCode).json(loggedInUser);
  } catch (error: any) {
    next(error);
  }
};

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.user.id;
    const currentUser = await service.getCurrentUser(id);
    res.status(currentUser.statusCode).json(currentUser);
  } catch (error: any) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.getAllUsers();
    res.status(users.statusCode).json(users);
  } catch (error: any) {
    next(error);
  }
};

export { register, login, getCurrentUser, getAllUsers };
