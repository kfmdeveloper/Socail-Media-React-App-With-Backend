const express = require("express");
const mongoose = require("mongoose");

const Connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/NewSocialApp");
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Connection,
};
