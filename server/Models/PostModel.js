const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: Array,
    image: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
