//TODO Libraries
import express from "express";
//TODO Pages
import cardsRouter from "./cardsRoute.js";
import usersRouter from "./userRoute.js";

//create router
const router = express.Router();
//endpoints
router.use("/cards", cardsRouter);
router.use("/users", usersRouter);

router.use((req, res) => {
  res.status(404).send("Page Not Found");
});

//TODO Export
export default router;
