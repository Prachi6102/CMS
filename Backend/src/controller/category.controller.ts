import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../service";

const service = new CategoryService();

const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = req.user.id;
    const details = req.body;

    details.createdBy = user_id;
    details.updatedBy = user_id;

    const newCategory = await service.addCategory(details);
    res.status(newCategory.statusCode).json(newCategory);
  } catch (error: any) {
    next(error);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.params.category;
    const categories = await service.getCategories(category);
    res.status(categories.statusCode).json(categories);
  } catch (error: any) {
    next(error);
  }
};

export { addCategory, getCategories };
