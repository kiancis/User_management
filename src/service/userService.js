import Model from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const config = process.env;

export function getAll() {
  return new Promise(async (resolve, reject) => {
    const users = await Model.getAll();
    if (users.length > 0) {
      return resolve(users);
    } else {
      return reject("no user found");
    }
  });
}

export function getOne(req) {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const userFound = await Model.getOne(id);
    if (!userFound[0]) {
      reject("user not found");
    } else {
      resolve(userFound);
    }
  });
}

export function create(req) {
  return new Promise(async (resolve, reject) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return reject("Dates is required");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await Model.create(userName, encryptedPassword);

    const token = jwt.sign({ userId: user.id, userName }, config.TOKEN_KEY);
    user.token = token;
    console.log(user.token);

    if (user) {
      resolve(`user ${userName} created`);
    } else {
      reject("error while creating user");
    }
  });
}

export function update(req) {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const { body } = req;
    if (!body.userName || !body.password) {
      reject("Data is required");
    }
    if (!id) {
      reject("Id is required");
    }

    const userFound = await Model.getOne(id);

    if (!userFound[0]) {
      reject("User not found");
    }

    const user = { ...userFound[0] };
    const encryptedPassword = await bcrypt.hash(body.password, 10);

    if (body.userName) user.userName = body.userName;
    if (body.password) user.password = encryptedPassword;

    const userUpdate = await Model.update(user, id);
    if (userUpdate) {
      resolve("Updated user");
    } else {
      reject("Error updating user");
    }
  });
}

export function deleted(req) {
  return new Promise(async (resolve, reject) => {
    const { params } = req;

    if (!params.id) {
      reject("id is required");
    }

    const userFound = await Model.getOne(params.id);
    if (!userFound[0]) {
      reject("user not found");
    }

    const userDelete = Model.deleted(params.id);

    if (userDelete) {
      resolve("user Deleted");
    } else {
      reject("Error deleting user");
    }
  });
}

export function login(req) {
  return new Promise(async (resolve, reject) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
      reject("Datos required");
    }

    const userFound = await Model.login(userName);
    const user = { ...userFound[0] };
    if (!user) {
      reject("user not found");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user.id, userName }, config.TOKEN_KEY);
      user.token = token;
      resolve(user);
    } else {
      reject("unverified user");
    }
  });
}
