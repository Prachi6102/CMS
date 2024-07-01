import { CODES, MESSAGES } from "../constants";
import { IBook } from "../interface";
import { Book } from "../model";
import { ApiError, ApiResponse } from "../utils";

export class BookService {
  async addBook(bookData: IBook) {
    const existing = await Book.findOne({ isbn: bookData.isbn });
    if (existing) {
      throw new ApiError(
        CODES.CLIENT_ERROR.CONFLICT_ERROR,
        MESSAGES.ERROR_MSG.ALREADY_EXIST("Book")
      );
    }
    const newBook = await Book.create(bookData);
    return new ApiResponse(
      CODES.SUCCESS.CREATED,
      MESSAGES.SUCCESS_MSG.CREATE("Book"),
      newBook
    );
  }

  async getAllBooks() {
    const books: IBook[] | null = await Book.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author_obj",
        },
      },
      {
        $unwind: {
          path: "$author_obj",
        },
      },
      {
        $addFields: {
          author_name: "$author_obj.full_name",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "sub_category",
          foreignField: "_id",
          as: "category_obj",
        },
      },
      {
        $unwind: {
          path: "$category_obj",
        },
      },
      {
        $addFields: {
          sub_category_name: "$category_obj.sub_category",
        },
      },
      {
        $project: {
          category_obj: 0,
          sub_category: 0,
          author: 0,
          author_obj: 0,
        },
      },
    ]);
    if (!books) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Books")
      );
    }

    if (books.length == 0) {
      throw new ApiError(
        CODES.SUCCESS.NO_CONTENT,
        MESSAGES.ERROR_MSG.NO_CONTENT("Book")
      );
    }

    return new ApiResponse(CODES.SUCCESS.OK, "", books);
  }
}
