import LoginAttempt from "../models/LoginAttempt.js";
import { getCardById } from "../services/cards/cardsDataService.js";
import {
  changeBizNumberService,
  changeIsBusinessStatusService,
  createNewUserService,
  deleteUserService,
  getAllAttemptUsersService,
  getAllUsersService,
  getUserByIdService,
  loginService,
  updateUserInfoService,
} from "../services/users/service.js";
import { getUserById } from "../services/users/usersDataService.js";

/**-------------------------------------------------
 * @desc  Test Users Route
 * @route  /users/test
 * @method  GET
 * @access public
 ---------------------------------------------------*/
const testServer = async (req, res) => {
  res.status(200).send("Server is Working successfully....");
};
const dummyUsers = [
  {
    name: {
      first: "majdi",
      middle: "",
      last: "hoseen",
    },
    phone: "0512345567",
    email: "majdi@gmail.com",
    password: "Majdi@316",
    image: {
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Arad",
      street: "Shoham",
      houseNumber: 5,
      zip: 8920435,
    },
    isBusiness: true,
    isAdmin: true,
  },
  {
    name: {
      first: "majdi2",
      middle: "",
      last: "hoseen2",
    },
    phone: "0512345567",
    email: "majdi2@gmail.com",
    password: "Majdi2@316",
    image: {
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Arad",
      street: "Shoham",
      houseNumber: 5,
      zip: 8920435,
    },
    isBusiness: true,
  },
  {
    name: {
      first: "majdi3",
      middle: "",
      last: "hoseen3",
    },
    phone: "0512345567",
    email: "majdi3@gmail.com",
    password: "Majdi@316",
    image: {
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Arad",
      street: "Shoham",
      houseNumber: 5,
      zip: 8920435,
    },
    isBusiness: false,
  },
];
//todo---------create new user-----------
/**-------------------------------------------------
 * @desc  Create DummyData Users
 * @route  /dummyData
 * @method  POST
 * @access public
 ---------------------------------------------------*/
const createDummyUser = async (req, res) => {
  try {
    
    await createNewUserService(dummyUsers[0]);
    await createNewUserService(dummyUsers[1]);
    await createNewUserService(dummyUsers[2]);
    res.status(201).send("create 3 dummy user successfully!!!!");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//todo---------create new user-----------
/**-------------------------------------------------
 * @desc  Create New User
 * @route  /users
 * @method  POST
 * @access public
 ---------------------------------------------------*/
const createNewUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await createNewUserService(newUser);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//todo---------LOGIN-----------
/**-------------------------------------------------
 * @desc  Login User
 * @route  /users/login
 * @method  POST
 * @access public
 ---------------------------------------------------*/
const login = async (req, res) => {
  const { email, password } = req.body;
  const attempt = await LoginAttempt.findOne({ email });
  //! check if the user finished block time or not
  if (attempt && attempt.blockedUntil && attempt.blockedUntil > new Date()) {
    const minutesLeft = Math.ceil((attempt.blockedUntil - Date.now()) / 60000);
    return res
      .status(403)
      .send(`Too many failed attempts. Try again in ${minutesLeft} minute(s).`);
  }
  try {
    const token = await loginService(email, password);
    //! reset number of tries
    await LoginAttempt.findOneAndDelete({ email });
    res.status(200).send(token);
  } catch (error) {
    //! initial attempt
    if (!attempt) {
      await LoginAttempt.create({ email, count: 1 });
    } else {
      //! increment attempt count by one and change the last attempt
      attempt.count += 1;
      attempt.lastAttemptAt = new Date();
      //! if the user have more than 3 attempt then block it
      if (attempt.count >= 3) {
        attempt.blockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
      }
      //! save the data in mongoose
      await attempt.save();
    }
    res.status(401).send(error.message);
  }
};
//todo---------Get All Attempt Users-----------
/**-------------------------------------------------
 * @desc  Get All Attempt Users
 * @route  /users/attempt-users
 * @method  Get
 * @access private (Admins Only)
 ---------------------------------------------------*/
const getAllAttemptUsersController = async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin) {
      return res.status(403).send("Only Admins  can show Attempt Users info");
    }
    const result = await getAllAttemptUsersService();
    if (result.length === 0) {
      return res.status(404).send("Attempt Users Not Founds");
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
//todo---------Get All Users-----------
/**-------------------------------------------------
 * @desc  Get All Users
 * @route  /users
 * @method  Get
 * @access private (Admins Only)
 ---------------------------------------------------*/
const getAllUsersController = async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin) {
      return res.status(403).send("Only Admins  can show all users info");
    }
    const result = await getAllUsersService();
    if (result.length === 0) {
      return res.status(404).send("Users Not Founds");
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
//todo---------Get User by id-----------
/**-------------------------------------------------
 * @desc  Get User By Id
 * @route  /users/:id
 * @method  Get
 * @access private (Admins and registered user)
 ---------------------------------------------------*/
const getUserByIdController = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = req.user;
    //!---admin and registered user can show user information
    if (!user?.isAdmin && userId !== user?._id) {
      return res
        .status(403)
        .send("Only Admin or registered user can look at user information");
    }
    const result = await getUserByIdService(userId);
    if (!result) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).send(result);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
//todo---------Change IsBusiness Status-----------
/**-------------------------------------------------
 * @desc  Change IsBusiness Status
 * @route  /users/:id
 * @method  PATCH
 * @access private (Registered user)
 ---------------------------------------------------*/
const changeIsBusinessStatusController = async (req, res) => {
  const { id: userId } = req.params;
  const registeredUser = req.user;
  let user;
  let updatedUser;
  try {
    user = await getUserById(userId);
    //! only registered user can modify his information
    if (registeredUser._id !== userId) {
      return res
        .status(403)
        .send("Only registered user can modify his information");
    }
    await changeIsBusinessStatusService(userId, user);
    updatedUser = await getUserById(userId);
    res.status(200).send(updatedUser);
  } catch (error) {
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    if (!updatedUser) {
      return res.status(404).send("User Not Found");
    }
    return res.status(400).send(error.message);
  }
};
//todo---------Update bizNumber-----------
/**-------------------------------------------------
 * @desc  Update BizNumber
 * @route  /users/change-bizNumber/:id
 * @method  PATCH
 * @access private (Only Admin)
 ---------------------------------------------------*/
const changeBizNumberController = async (req, res) => {
  const { id: cardId } = req.params;
  const registeredUser = req.user;
  let card;
  let updatedCard;
  try {
    card = await getCardById(cardId);
    //! Only Admin can modify bizNumber
    if (!registeredUser.isAdmin) {
      return res.status(403).send("Only Admin can modify bizNumber");
    }
    await changeBizNumberService(cardId);
    updatedCard = await getCardById(cardId);
    res.status(200).send(updatedCard);
  } catch (error) {
    if (!card) {
      return res.status(404).send("Card Not Found");
    }
    if (!updatedCard) {
      return res.status(404).send("Card Not Found");
    }
    return res.status(400).send(error.message);
  }
};
//todo---------Update User Info-----------
/**-------------------------------------------------
 * @desc  Update User Info
 * @route  /users/:id
 * @method  PUT
 * @access private (Registered user)
 ---------------------------------------------------*/
const updateUserInfoController = async (req, res) => {
  const { id: userId } = req.params;
  const newUser = req.body;
  const registeredUser = req.user;
  let user;
  try {
    user = await getUserById(userId);
    //! only registered user can modify his information
    if (registeredUser._id !== userId) {
      return res
        .status(403)
        .send("Only registered user can modify his information");
    }
    const UpdatedUser = await updateUserInfoService(userId, newUser);
    return res.status(201).send(UpdatedUser);
  } catch (error) {
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    return res.status(400).send(error.message);
  }
};
//todo---------delete user-----------
/**-------------------------------------------------
 * @desc  Delete User
 * @route  /users/:id
 * @method  DELETE
 * @access private (Admins and registered user)
 ---------------------------------------------------*/
const deleteUserController = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const registeredUser = req.user;
    const userWhoDeleted = await getUserByIdService(userId);
    if (!userWhoDeleted) {
      return res.status(404).send("User Not Found");
    }
    //!---admin and registered user can delete his account
    if (!registeredUser.isAdmin && userId !== registeredUser._id) {
      return res
        .status(403)
        .send("Only Admin or same user that create this card can delete it");
    }
    const result = await deleteUserService(userId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
export {
  testServer,
  createNewUser,
  login,
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
  updateUserInfoController,
  changeIsBusinessStatusController,
  changeBizNumberController,
  getAllAttemptUsersController,
  createDummyUser,
};
