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
    const newBook = await service.addBook(bookData);
    res.status(newBook.statusCode).json(newBook);
  } catch (error) {
    Next(error);
  }
};

export { addBook };
