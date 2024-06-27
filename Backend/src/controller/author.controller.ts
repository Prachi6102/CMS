import { Request, Response, NextFunction } from "express";
import { AuthorService } from "../service";

const service = new AuthorService();

const addAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = req.user.id;
    const authorData = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const profilePicLocalPath = files?.profile_pic?.[0]?.path;

    authorData.profile_pic = profilePicLocalPath;
    authorData.createdBy = user_id;
    authorData.updatedBy = user_id;

    const newAuthor = await service.addAuthor(authorData);

    res.status(newAuthor.statusCode).json(newAuthor);
  } catch (error: any) {
    next(error);
  }
};

const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authors = await service.getALlAuthors();
    res.status(authors.statusCode).json(authors);
  } catch (error: any) {
    next(error);
  }
};

const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    const authorData = req.body;
    authorData.updatedBy = user_id;

    if (authorData.profile_pic) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const profilePicLocalPath = files?.profile_pic?.[0]?.path;

      authorData.profile_pic = profilePicLocalPath;
    }

    const updatedAuthor = await service.updateAuthor(id, authorData);
    res.status(updatedAuthor.statusCode).json(updatedAuthor);
  } catch (error: any) {
    next(error);
  }
};

const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const author = await service.getAuthorById(id);
    res.status(author.statusCode).json(author);
  } catch (error: any) {
    next(error);
  }
};

const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const author = await service.deleteAuthor(id);
    res.status(author.statusCode).json(author);
  } catch (error: any) {
    next(error);
  }
};

export { addAuthor, getAllAuthors, updateAuthor, getAuthorById, deleteAuthor };
