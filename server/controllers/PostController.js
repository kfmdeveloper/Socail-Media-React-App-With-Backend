const { default: mongoose } = require("mongoose");
const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");

//Create Post
const CreatePost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(200).json({
      message: "Post created Successfully",
      success: true,
      newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Post creating problems",
      success: false,
    });
  }
};
//get Post

const GetPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "No such Post",
        success: false,
      });
    }
    res.status(200).json({
      message: "Post found!",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Getting post problems",
      success: false,
    });
  }
};

//Update Post

const UpdatePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const Foundpost = await Post.findById(id);
    if (!Foundpost) {
      return res.status(404).json({
        message: "Post Not found",
        success: false,
      });
    }
    if (Foundpost.userId === userId) {
      const NewPost = await Foundpost.updateOne({ $set: req.body });
      res.status(200).json({
        message: "Post Updated Successfully",
        success: true,
        NewPost,
      });
    } else {
      res.status(403).json({
        message: "Action Forbidden! You cannot Edit just your own posts",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Updating Post problems",
      success: false,
    });
  }
};

//Delete Post

const DeletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const Foundpost = await Post.findById(id);
    if (!Foundpost) {
      return res.status(404).json({
        message: "Post Not found",
        success: false,
      });
    }
    if (Foundpost.userId === userId) {
      const newPost = await Post.deleteOne(Foundpost);
      return res.status(200).json({
        message: "Post Deleted Successfully",
        success: true,
        newPost,
      });
    } else {
      return res.status(500).json({
        message: " Action Forbidden! you can delete only your own posts",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " Delete Post problems",
      success: false,
    });
  }
};

//like And Dislike Post

const likeDislike = async (req, res) => {
  const PostId = req.params.id;
  const loggedUserId = req.body.id;

  try {
    const post = await Post.findById(PostId);
    if (post.userId === loggedUserId) {
      return res.status(403).json({
        message: "You cannot like your own post! ",
        success: false,
      });
    }
    const loggedUser = await User.findById(loggedUserId);
    if (!post) {
      return res.status(403).json({
        message: "You have not any posts yet!",
        success: false,
      });
    }
    if (!post.likes.includes(loggedUserId)) {
      await post.updateOne({ $push: { likes: loggedUserId } });
      return res.status(200).json({
        message: ` you just like the post!`,
        success: true,
      });
    } else {
      await post.updateOne({ $pull: { likes: loggedUserId } });
      return res.status(200).json({
        message: "You just unlike the post!",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Post LikeDisLike problem Internal Server!",
      success: false,
    });
  }
};

//Get Followers Posts

const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await Post.find({ userId: userId });
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching timeline posts",
      success: false,
    });
  }
};

//Exporting Modules

module.exports = {
  CreatePost,
  GetPost,
  UpdatePost,
  DeletePost,
  likeDislike,
  getTimelinePosts,
};
