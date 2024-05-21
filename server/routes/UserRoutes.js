const express = require("express");
const isAuthenticated = require("../Utils/Auth");
const UserContainer = require("../controllers/UserController");

const Router = express.Router();

Router.get("/:id", isAuthenticated, UserContainer.getUser);
Router.put("/:id", isAuthenticated, UserContainer.updateUser);
Router.delete("/:id", isAuthenticated, UserContainer.DeleteUser);
Router.put("/:id/follow", isAuthenticated, UserContainer.followUser);
Router.get("/otherusers/:id", isAuthenticated, UserContainer.otherUsers);
module.exports = Router;
