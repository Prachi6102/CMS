import { NextFunction, Request, Response } from "express";
import { PostService } from "../service";
import { ObjectId } from "mongodb";

const service = new PostService();

const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = new ObjectId(req.user.id);
    const content = req.body;
    content.createdBy = user_id;
    const newPost = await service.addPost(content);
    res.status(newPost.statusCode).json(newPost);
  } catch (error: any) {
    next(error);
  }
};

const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await service.getAllPosts();
    res.status(posts.statusCode).json(posts);
  } catch (error: any) {
    next(error);
  }
};

export { addPost, getAllPost };
