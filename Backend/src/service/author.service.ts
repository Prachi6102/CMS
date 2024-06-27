import { Author } from "../model";
import { IAuthor } from "../interface";
import { MESSAGES, CODES } from "../constants";
import { ApiError, ApiResponse, uploadOnCloudinary } from "../utils";

export class AuthorService {
  async addAuthor(authorData: IAuthor) {
    const existing: IAuthor | null = await Author.findOne({
      full_name: authorData.full_name,
    });

    if (existing) {
      throw new ApiError(
        CODES.CLIENT_ERROR.CONFLICT_ERROR,
        MESSAGES.ERROR_MSG.ALREADY_EXIST("Author")
      );
    }

    //to upload on cloudinary
    // const profile_pic = await uploadOnCloudinary(authorData.profile_pic);
    // authorData.profile_pic = profile_pic?.url as string;

    const newAuthor = await Author.create(authorData);

    return new ApiResponse(
      CODES.SUCCESS.CREATED,
      MESSAGES.SUCCESS_MSG.CREATE("Author"),
      newAuthor
    );
  }

  async getALlAuthors() {
    const authors: IAuthor[] | null = await Author.find();
    if (!authors) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Authors")
      );
    }

    if (authors.length == 0) {
      throw new ApiError(
        CODES.SUCCESS.NO_CONTENT,
        MESSAGES.ERROR_MSG.NO_CONTENT("Author")
      );
    }

    return new ApiResponse(CODES.SUCCESS.OK, "", authors);
  }

  async updateAuthor(id: string, authorData: IAuthor) {
    const updatedAuthor: IAuthor | null = await Author.findByIdAndUpdate(
      id,
      authorData,
      { new: true }
    );

    if (!updatedAuthor) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Author")
      );
    }

    return new ApiResponse(
      CODES.SUCCESS.OK,
      MESSAGES.SUCCESS_MSG.UPDATE("Author"),
      updatedAuthor
    );
  }

  async getAuthorById(id: string) {
    const author: IAuthor | null = await Author.findById(id);
    if (!author) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Author")
      );
    }

    return new ApiResponse(CODES.SUCCESS.OK, "", author);
  }

  async deleteAuthor(id: string) {
    const deletedAuthor: IAuthor | null = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      throw new ApiError(
        CODES.CLIENT_ERROR.NOT_FOUND,
        MESSAGES.ERROR_MSG.NOT_FOUND("Author")
      );
    }

    return new ApiResponse(
      CODES.SUCCESS.OK,
      MESSAGES.SUCCESS_MSG.DELETE("Author"),
      deletedAuthor
    );
  }
}
