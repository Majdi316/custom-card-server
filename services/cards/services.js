//TODO Import Function
import { generateBizNumber } from "../../helpers/generateBizNumber.js";
import { validateCard } from "../../validation/cardValidationService.js";
import { validateUpdateCard } from "../../validation/updateCardValidationService.js";
import {
  createNewCardForDb,
  deleteCard,
  getAllCards,
  getCardById,
  getMyCards,
  updateCard,
} from "./cardsDataService.js";

//todo---------create new card-----------
const createNewCardService = async (user, card) => {
  try {
    //!--------get user id:
    card.user_id = user._id;
    //!--------generate bizNumber For Card
    card.bizNumber = await generateBizNumber();
    //!--------validate card before creation
    const { error } = validateCard(card);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    const newCard = await createNewCardForDb(card);
    return newCard;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------get all cards-----------
const getAllCardsService = async () => {
  try {
    const cards = await getAllCards();
    return cards;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------get card by id-----------
const getCardByIdService = async (id) => {
  try {
    const card = await getCardById(id);
    return card;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------update card-----------
const updateCardService = async (id, newCard) => {
  try {
    //!--------validate card before updated
    const { error } = validateUpdateCard(newCard);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    const card = await updateCard(id, newCard);
    return card;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo-----------delete card-----------
const deleteCardService = async (id) => {
  try {
    //get the card before delete it
    const card = await getCardById(id);
    await deleteCard(id); 
    return card;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------get my card-----------
const getMyCardsService = async (user_id) => {
  try {
    const cards = await getMyCards(user_id);
    return cards;
  } catch (error) {
    throw new Error(error.message);
  }
};
export {
  createNewCardService,
  getAllCardsService,
  getCardByIdService,
  updateCardService,
  deleteCardService,
  getMyCardsService,
};
