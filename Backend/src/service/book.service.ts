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
    const books: IBook[] | null = await Book.find();
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
