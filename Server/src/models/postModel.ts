import mongoose, { Document, Model, Schema } from "mongoose";
import User from "./userModel";

export interface IPost extends Document {
  title: string;
  author: string;
  rating?: number;
  averageRating: number;
  ratingQuantity: number;
  textContent: string;
  imagePath?: string;
  videoContent?: string;
  category: string;
  postedAt: Date;
  user: mongoose.Types.ObjectId;
}

interface IPostModel extends Model<IPost> {
  calcPostNumber(userId: mongoose.Types.ObjectId): Promise<void>;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    title: {
      type: String,
      required: [true, "A post must have a title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "A post must have an author"],
      trim: true,
    },
    averageRating: {
      type: Number,
      default: 4,
      min: [1, "An average rating must be above 1"],
      max: [5, "An average rating must be below 5"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    textContent: {
      type: String,
      required: [true, "A post must have text content"],
      trim: true,
    },
    imagePath: {
      type: String,
      trim: true,
    },
    videoContent: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "You must provide a post category"],
      enum: {
        values: [
          "AI",
          "Software Development",
          "Cloud Computing",
          "Data Science",
          "Blockchain",
          "Internet of Things (IoT)",
          "DevOps",
          "Quantum Computing",
          "Cybersecurity",
        ],
        message:
          "Post category should be either: AI, Software Development, Cloud Computing, Data Science, Blockchain, Internet of Things (IoT), DevOps, Quantum Computing, or Cybersecurity",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "You should provide the user who posted this"],
    },
    postedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ category: 1 });
PostSchema.index({ author: 1, postedAt: -1 });

PostSchema.statics.calcPostNumber = async function (
  userId: mongoose.Types.ObjectId
): Promise<void> {
  const stats = await this.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: "$user",
        nPost: { $sum: 1 },
      },
    },
  ]);

  await User.findByIdAndUpdate(userId, {
    numberOfPost: stats[0] ? stats[0].nPost : 0,
  });
};

PostSchema.post<IPost>("save", function (this: IPost) {
  (this.constructor as IPostModel).calcPostNumber(this.user);
});

PostSchema.post<IPost>(/^findOneAnd/, async function (doc) {
  if (doc) {
    await (doc.constructor as IPostModel).calcPostNumber(doc.user);
  }
});

const Post = mongoose.model<IPost, IPostModel>("Post", PostSchema);
export default Post;
