import mongoose from 'mongoose';

// const commentSchema = new mongoose.Schema(
//   {
//     content: {
//       type: String,
//       required: true,
//     },
//     postId: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: String,
//       required: true,
//     },
//     likes: {
//       type: Array,
//       default: [],
//     },
//     numberOfLikes: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // assuming 'Post' is your Post model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // assuming 'User' is your User model
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

