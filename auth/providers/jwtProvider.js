//TODO Libraries
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import jwt from "jsonwebtoken";
const secret = "majdi316";

//TODO Functions
const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    },
    secret
  );
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, secret);
    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

//TODO Export
export { generateToken, verifyToken };
