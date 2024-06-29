import { Request, Response, NextFunction } from "express";
import { BookService } from "../service";

const service = new BookService();

const addBook = async (
  req: Request,
  res: Response,
  Next: NextFunction
): Promise<void> => {
  try {
    const bookData = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageLocalPath = files?.cover_img?.[0]?.path;
    const bookPDFLocalPath = files?.book_pdf?.[0]?.path;

    bookData.cover_img = coverImageLocalPath;
    bookData.book_pdf = bookPDFLocalPath;

    const newBook = await service.addBook(bookData);
    res.status(newBook.statusCode).json(newBook);
  } catch (error) {
    Next(error);
  }
};

const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const books = await service.getAllBooks();
    res.status(books.statusCode).json(books);
  } catch (error: any) {
    next(error);
  }
};

export { addBook  , getAllBooks};
