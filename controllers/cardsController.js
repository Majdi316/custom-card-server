import Card from "../models/Card.js";
import { createNewCardForDb } from "../services/cards/cardsDataService.js";
import {
  createNewCardService,
  deleteCardService,
  getAllCardsService,
  getCardByIdService,
  getMyCardsService,
  updateCardService,
} from "../services/cards/services.js";

/**-------------------------------------------------
 * @desc  Test Cards Route
 * @route  /cards/test
 * @method  GET
 * @access public
 ---------------------------------------------------*/
const testServer = async (req, res) => {
  res.status(200).send("Server is Working successfully....");
};
const dummyCards = [
  {
    title: "card 1",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    phone: "012-3211234",
    email: "qwe@gmail.com",
    web: "www.bing.com",
    image: {
      url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
      alt: "image of something",
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Arad",
      street: "Shoham",
      houseNumber: 5,
      zip: 8920435,
    },
    bizNumber: 1000000,
    user_id: 1,
  },
  {
    title: "card 2",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    phone: "012-3211234",
    email: "qwe@gmail.com",
    web: "www.bing.com",
    image: {
      url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
      alt: "image of something",
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Arad",
      street: "Shoham",
      houseNumber: 5,
      zip: 8920435,
    },
    bizNumber: 1000001,
    user_id: 1,
  },
  {
    title: "card 3",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    phone: "012-3211234",
    email: "qwe@gmail.com",
    web: "www.bing.com",
    image: {
      url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
      alt: "image of something",
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Arad",
      street: "Shoham",
      houseNumber: 5,
      zip: 8920435,
    },
    bizNumber: 1000002,
    user_id: 1,
  },
];
//todo---------create Dummy Cards-----------
/**-------------------------------------------------
 * @desc  create Dummy Cards
 * @route  /dummyCard
 * @method  POST
 * @access public 
 ---------------------------------------------------*/
const createDummyCards = async (req, res) => {
  try {
    await createNewCardForDb(dummyCards[0]);
    await createNewCardForDb(dummyCards[1]);
    await createNewCardForDb(dummyCards[2]);
    res.status(201).send("create 3 dummy Cards Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//todo---------create new card-----------
/**-------------------------------------------------
 * @desc  Create New Card
 * @route  /cards
 * @method  POST
 * @access private (Business Users Only)
 ---------------------------------------------------*/
const createNewCard = async (req, res) => {
  try {
    const newCard = req.body;
    const user = req.user;
    //!---only business user can create new card
    if (!user.isBusiness) {
      return res.status(403).send("Only Business user can create new card");
    }
    const result = await createNewCardService(user, newCard);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//todo---------Get All Cards-----------
/**-------------------------------------------------
 * @desc  Get All Cards
 * @route  /cards
 * @method  GET
 * @access public
 ---------------------------------------------------*/
const getAllCardsController = async (req, res) => {
  try {
    const result = await getAllCardsService();
    if (result.length === 0) {
      return res.status(404).send("Not Found Any Card");
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
//todo---------Get card by id-----------
/**-------------------------------------------------
 * @desc  Get Card By Id
 * @route  /cards/:id
 * @method  GET
 * @access public (all users)
 ---------------------------------------------------*/
const getCardByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCardByIdService(id);
    if (!result) {
      return res.status(404).send("Card Not Found");
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
//todo---------edit card info-----------
/**-------------------------------------------------
 * @desc  Update Card Info
 * @route  /cards/:id
 * @method  PUT
 * @access private (same user that create the card)
 ---------------------------------------------------*/
const updateCardController = async (req, res) => {
  let card;
  try {
    const newCard = req.body;
    const { id } = req.params;
    //!---Only user that created this card can modified it
    const user = req.user;
    card = await getCardByIdService(id);
    if (user._id !== card.user_id) {
      return res
        .status(403)
        .send("Only user that create this card can modified it");
    }
    const updatedCard = await updateCardService(id, newCard);
    return res.status(201).send(updatedCard);
  } catch (error) {
    if (!card) {
      return res.status(404).send("Card Not Found");
    }
    return res.status(400).send(error.message);
  }
};
//todo---------Delete Card-----------
/**-------------------------------------------------
 * @desc  Delete Card
 * @route  /cards/:id
 * @method  DELETE
 * @access private (admin or user that created this card)
 ---------------------------------------------------*/
const deleteCardController = async (req, res) => {
  let card;
  try {
    const { id: cardId } = req.params;
    const user = req.user;
    //! get user id that create this card
    card = await getCardByIdService(cardId);
    //!---admin and user that created this card can delete it
    if (!user.isAdmin && card?.user_id !== user?._id) {
      return res
        .status(403)
        .send("Only Admin or same user that create this card can delete it");
    }
    const result = await deleteCardService(cardId);
    return res.status(200).send(result);
  } catch (error) {
    if (!card) {
      return res.status(404).send("Card Not Found");
    }
    return res.status(400).send(error.message);
  }
};
//todo---------Toggle Like-----------
/**-------------------------------------------------
 * @desc  Toggle Like
 * @route  /cards/:id
 * @method  PATCH
 * @access private (Only Registered Users)
 ---------------------------------------------------*/
const toggleLike = async (req, res) => {
  let card;
  try {
    const { id: cardId } = req.params;
    const loggedInUser = req.user._id;
    //! get the card
    card = await getCardByIdService(cardId);

    //! check if user likes this card or not
    const isCardAlreadyLiked = card.likes.find(
      (user) => user.toString() === loggedInUser
    );
    if (isCardAlreadyLiked) {
      card = await Card.findByIdAndUpdate(
        cardId,
        {
          $pull: {
            //to remove element from the array in mongoose
            likes: loggedInUser,
          },
        },
        { new: true }
      );
    } else {
      card = await Card.findByIdAndUpdate(
        cardId,
        {
          $push: {
            //to add element to the array in mongoose
            likes: loggedInUser,
          },
        },
        { new: true }
      );
    }
    res.status(200).json(card);
  } catch (error) {
    if (!card) {
      return res.status(404).send("Card Not Found");
    }
    return res.status(400).send(error.message);
  }
};
//todo---------get my cards-----------
/**-------------------------------------------------
 * @desc  Get My Cards
 * @route  /cards/my-cards
 * @method  GET
 * @access private (Only Registered Users)
 ---------------------------------------------------*/
const getMyCardsController = async (req, res) => {
  try {
    //! get registration user id
    const user_id = req.user._id;
    const cards = await getMyCardsService(user_id);
    if (cards.length === 0) {
      return res.status(404).send("Not Found Any Cards");
    }
    return res.status(200).send(cards);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
export {
  testServer,
  createNewCard,
  getAllCardsController,
  getCardByIdController,
  updateCardController,
  deleteCardController,
  toggleLike,
  getMyCardsController,
  createDummyCards,
};
