import { ICategory } from "../interface";
import { Category } from "../model";
import { MESSAGES, CODES } from "../constants";
import { ApiError, ApiResponse, uploadOnCloudinary } from "../utils";

export class CategoryService {
  async addCategory(details: ICategory) {
    const existing = await Category.findOne({
      sub_category: details.sub_category,
    });

    if (existing) {
      throw new ApiError(
        CODES.CLIENT_ERROR.CONFLICT_ERROR,
        MESSAGES.ERROR_MSG.ALREADY_EXIST("Category")
      );
    }

    const newCategory = await Category.create(details);

    return new ApiResponse(
      CODES.SUCCESS.CREATED,
      MESSAGES.SUCCESS_MSG.CREATE("Category"),
      newCategory
    );
  }

  async getCategories() {
    const categories: ICategory[] | null = await Category.find();
    if (!categories) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Categories")
      );
    }

    if (categories.length == 0) {
      throw new ApiError(
        CODES.SUCCESS.NO_CONTENT,
        MESSAGES.ERROR_MSG.NO_CONTENT("Category")
      );
    }

    return new ApiResponse(CODES.SUCCESS.OK, "", categories);
  }
}
