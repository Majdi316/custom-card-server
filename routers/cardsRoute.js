//TODO Libraries
import express from "express";

//TODO Functions
import {
  createDummyCards,
  createNewCard,
  deleteCardController,
  getAllCardsController,
  getCardByIdController,
  getMyCardsController,
  testServer,
  toggleLike,
  updateCardController,
} from "../controllers/cardsController.js";
import { auth } from "../auth/services/authService.js";

// Create the router
const cardsRouter = express.Router();
// Routes
//todo --------------------- GET ----------------------------
cardsRouter.get("/test", testServer);
cardsRouter.get("/", getAllCardsController);
cardsRouter.get("/my-cards", auth, getMyCardsController);
cardsRouter.get("/:id", getCardByIdController);
//todo --------------------- POST ----------------------------
cardsRouter.post("/", auth, createNewCard);
cardsRouter.post("/dummyCard", createDummyCards);
//todo --------------------- PUT ----------------------------
cardsRouter.put("/:id", auth, updateCardController);
//todo --------------------- DELETE ----------------------------
cardsRouter.delete("/:id", auth, deleteCardController);
//todo --------------------- Patch ----------------------------
cardsRouter.patch("/:id", auth, toggleLike);

export default cardsRouter;
