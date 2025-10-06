//TODO Import Libraries
import _ from "lodash";
//TODO Import Function
import { comparePassword, generatePassword } from "../../helpers/bcrypt.js";
import {
  changeBizNumber,
  changeIsBusinessStatus,
  createNewUserForDb,
  deleteUser,
  getAllAttemptUsers,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserInfo,
} from "./usersDataService.js";
import { validateUser } from "../../validation/userValidationService.js";
import { generateToken } from "../../auth/providers/jwtProvider.js";
import { validateUpdateUser } from "../../validation/updateUserValidationService.js";
import { generateBizNumber } from "../../helpers/generateBizNumber.js";
import { validateLogin } from "../../validation/loginValidationService.js";

//todo---------create new user-----------
const createNewUserService = async (user) => {
  try {
    let hashPassword = generatePassword(user.password);
    //!--------validate user before creation
    const { error } = validateUser(user);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    const newUser = await createNewUserForDb({
      ...user,
      password: hashPassword,
    });
    const DTOUser = _.pick(newUser, ["_id", "email", "name"]);
    return DTOUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------LOGIN-----------
const loginService = async (email, password) => {
  try {
    //!--------validate user email & password before login
    const { error } = validateLogin({ email: email, password: password });
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    const user = await getUserByEmail(email);
    if (comparePassword(password, user?.password)) {
      return generateToken(user);
    } else {
      throw new Error("Incorrect Password!!!!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------get all users-----------
const getAllUsersService = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------get all Attempt users-----------
const getAllAttemptUsersService = async () => {
  try {
    const users = await getAllAttemptUsers();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo---------get user by id-----------
const getUserByIdService = async (id) => {
  try {
    const user = await getUserById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo-----------Change IsBusiness Status----------
const changeIsBusinessStatusService = async (id, user) => {
  try {
    await changeIsBusinessStatus(id, { isBusiness: !user.isBusiness });
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo-----------Change IsBusiness Status----------
const changeBizNumberService = async (id) => {
  try {
    const newBizNumber = await generateBizNumber();
    await changeBizNumber(id, { bizNumber: newBizNumber });
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo-----------update user info----------
const updateUserInfoService = async (id, newUser) => {
  try {
    //!--------validate user before updated
    const { error } = validateUpdateUser(newUser);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    const user = await updateUserInfo(id, newUser);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo-----------delete user----------
const deleteUserService = async (id) => {
  try {
    const user = await getUserById(id);
    await deleteUser(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
//TODO Export
export {
  createNewUserService,
  loginService,
  getAllUsersService,
  getUserByIdService,
  deleteUserService,
  updateUserInfoService,
  changeIsBusinessStatusService,
  changeBizNumberService,
  getAllAttemptUsersService,
};
