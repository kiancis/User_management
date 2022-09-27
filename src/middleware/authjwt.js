import Model from "../model/userModel.js";
import jwt from "jsonwebtoken";
const config = process.env;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).json({ message: "not token provider" });

    const decode = jwt.verify(token, config.TOKEN_KEY);

    req.userId = decode.user_id;

    const user = await Model.getOne(req.userId, { password: 0 });
      if(!user) return res.status(404).json("user not verified")

    next();
  } catch (error) {
    console.log(error);
   return  res.status(500).json({message: "unauthorized"});
  }
};
