import db from "../db";

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user", (err, result) => {
      if (result) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const create = (userName, pass) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO user (username,password) VALUES (?,?)",
      [userName, pass],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const update = ({ userName, password }, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE user SET username = ?, password = ? WHERE id = ?",
      [userName, password, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleted = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const login = (userName) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user WHERE username = ?",
      [userName],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleted,
  login,
};
