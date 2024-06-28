import { NextFunction, Request, Response } from "express";
import { PostService } from "../service";

const service = new PostService();

const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = req.user.id;
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

const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const post = await service.getPostById(id);
    res.status(post.statusCode).json(post);
  } catch (error: any) {
    next(error);
  }
};

const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = req.user.id;
    const post_id = req.params.id;
    const content = req.body;
    content.updatedBy = user_id;
    const post = await service.updatePost(post_id, content);
    res.status(post.statusCode).json(post);
  } catch (error: any) {
    next(error);
  }
};

const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post_id = req.params.id;
    const post = await service.deletePost(post_id);
    res.status(post.statusCode).json(post);
  } catch (error: any) {
    next(error);
  }
};

export { addPost, getAllPost, getPostById, updatePost , deletePost };
