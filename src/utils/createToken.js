import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {success, error} from "./response"

dotenv.config({ path: ".env" });

export default(req, res)=>{
  const obj = {
		valid: true,
		message: "Token is valid",
	};
  try {
    const token =  Jwt.sign(obj, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
    });
    return success(res,user,200,token)
  } catch {
    return error(res,"Cannot create token", 401)
  }
}
