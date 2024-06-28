export interface IPost {
  _id: string;
  content: string;
  uname?: string;
  createdAt: Date;
  updatedBy?: string;
}
