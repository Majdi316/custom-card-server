//TODO Libraries
//TODO Models
import { ObjectId } from "bson";
import User from "../../models/User.js";
import Card from "../../models/Card.js";
import LoginAttempt from "../../models/LoginAttempt.js";

//todo---------create new user-----------
const createNewUserForDb = async (user) => {
  try {
    const userForDb = new User(user);
    await userForDb.save();
    return userForDb;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      throw new Error("Email already exists");
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }
    if (
      error.name === "MongoNetworkError" ||
      error.message.includes("ECONNREFUSED")
    ) {
      throw new Error("Database connection error");
    }
    throw new Error("MongoDb - Error in creating new user");
  }
};
//todo-----------get all users----------
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("MongoDb - Error in get all users");
  }
};
//todo-----------get all attempt users----------
const getAllAttemptUsers = async () => {
  try {
    const users = await LoginAttempt.find();
    return users;
  } catch (error) {
    throw new Error("MongoDb - Error in get all Attempt users");
  }
};
//todo-----------get user by email----------
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo-----------get user by id----------
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("User Not Founds");
  }
};
//todo-----------update user info----------
const updateUserInfo = async (id, newUser) => {
  try {
    const userAfterUpdate = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    return userAfterUpdate;
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }
    if (
      error.name === "MongoNetworkError" ||
      error.message.includes("ECONNREFUSED")
    ) {
      throw new Error("Database connection error");
    }
    throw new Error("MongoDb - Error in update user info");
  }
};
//todo-----------Change IsBusiness Status----------
const changeIsBusinessStatus = async (id, isBusiness) => {
  try {
    await User.updateOne({ _id: new ObjectId(id) }, { $set: isBusiness });
  } catch (error) {
    throw new Error("MongoDb - Error in update isBusiness Status");
  }
};
//todo-----------Change BizNumber----------
const changeBizNumber = async (id, newBizNumber) => {
  try {
    await Card.updateOne({ _id: new ObjectId(id) }, { $set: newBizNumber });
  } catch (error) {
    throw new Error("MongoDb - Error in update newBizNumber");
  }
};
//todo-----------delete user----------
const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return id;
  } catch (error) {
    throw new Error("User Not Found");
  }
};
export {
  createNewUserForDb,
  getUserByEmail,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserInfo,
  changeIsBusinessStatus,
  changeBizNumber,
  getAllAttemptUsers,
};
