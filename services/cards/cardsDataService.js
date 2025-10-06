//TODO Models
import Card from "../../models/Card.js";

//todo---------create new card-----------
const createNewCardForDb = async (card) => {
  try {
    const cardForDb = new Card(card);
    await cardForDb.save();
    return cardForDb;
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
    throw new Error("MongoDb - Error in creating new card");
  }
};
//todo---------get all Cards -----------
const getAllCards = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (error) {
    throw new Error("MongoDb - Error in search cards");
  }
};
//todo---------get card by id -----------
const getCardById = async (id) => {
  try {
    const card = await Card.findById(id);
    return card;
  } catch (error) {
    throw new Error("MongoDb - Error in get card by id");
  }
};
//todo---------get card by biz number-----------
const getCardByBizNumber = async (bizNumber) => {
  try {
    const card = await Card.findOne({ bizNumber });
    return card;
  } catch (error) {
    throw new Error("MongoDb - Error in find card with bizNumber");
  }
};
//todo---------update card-----------
const updateCard = async (id, newCard) => {
  try {
    const cardAfterUpdate = await Card.findByIdAndUpdate(id, newCard, {
      new: true,
    });
    return cardAfterUpdate;
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
    throw new Error("MongoDb - Error in update card");
  }
};
//todo-----------delete card-----------
const deleteCard = async (id) => {
  try {
    await Card.findByIdAndDelete(id);
    return id;
  } catch (error) { 
    throw new Error("Card Not Founds");
  } 
};
//todo---------get my card-----------
const getMyCards = async (user_id) => {
  try {
    const cards = await Card.find({ user_id });
    return cards;
  } catch (error) {
    throw new Error("MongoDb - Error get my cards");
  }
};
export {
  createNewCardForDb,
  getCardByBizNumber,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
  getMyCards,
};
