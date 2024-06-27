import { CODES, MESSAGES } from "../constants";
import { IPost } from "../interface";
import { Post } from "../model";
import { ApiResponse, ApiError } from "../utils";

export class PostService {
  async addPost(content: IPost) {
    const newPost = await Post.create(content);
    return new ApiResponse(
      CODES.SUCCESS.CREATED,
      MESSAGES.SUCCESS_MSG.CREATE("Post"),
      newPost
    );
  }

  async getAllPosts() {
    const posts: IPost[] | null = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $addFields: {
          uname: "$result.user_name",
        },
      },
      {
        $project: {
          uname: 1,
          content: 1,
          createdAt: 1,
        },
      },
    ]);
    console.log(posts);
    if (!posts) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Posts")
      );
    }

    if (posts.length == 0) {
      throw new ApiError(
        CODES.SUCCESS.NO_CONTENT,
        MESSAGES.ERROR_MSG.NO_CONTENT("Post")
      );
    }

    return new ApiResponse(CODES.SUCCESS.OK, "", posts);
  }
}
