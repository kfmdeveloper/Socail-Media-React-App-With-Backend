const express = require("express");
const PostContainer = require("../controllers/PostController");
const PostRouter = express.Router();

PostRouter.post("/", PostContainer.CreatePost);
PostRouter.get("/:id", PostContainer.GetPost);
PostRouter.put("/:id", PostContainer.UpdatePost);
PostRouter.delete("/:id", PostContainer.DeletePost);
PostRouter.put("/:id/likes", PostContainer.likeDislike);
PostRouter.get("/timeline/:id", PostContainer.getTimelinePosts);
module.exports = PostRouter;
