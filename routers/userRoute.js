//TODO Libraries
import express from "express";

//TODO Functions
import {
  changeBizNumberController,
  changeIsBusinessStatusController,
  createDummyUser,
  createNewUser,
  deleteUserController,
  getAllAttemptUsersController,
  getAllUsersController,
  getUserByIdController,
  login,
  testServer,
  updateUserInfoController,
} from "../controllers/usersController.js";
import { auth } from "../auth/services/authService.js";

// Create the router
const usersRouter = express.Router();

// Routes
//todo --------------------- GET ----------------------------
usersRouter.get("/test", testServer);
usersRouter.get("/", auth, getAllUsersController);
usersRouter.get("/attempt-users", auth, getAllAttemptUsersController);
usersRouter.get("/:id", auth, getUserByIdController);
//todo --------------------- POST ----------------------------
usersRouter.post("/", createNewUser);
usersRouter.post("/login", login);
usersRouter.post("/dummyData", createDummyUser);
//todo --------------------- PUT ----------------------------
usersRouter.put("/:id", auth, updateUserInfoController);
//todo --------------------- PATCH ----------------------------
usersRouter.patch("/change-bizNumber/:id", auth, changeBizNumberController);
usersRouter.patch("/:id", auth, changeIsBusinessStatusController);
//todo --------------------- DELETE ----------------------------
usersRouter.delete("/:id", auth, deleteUserController);
//TODO Exports
export default usersRouter;
