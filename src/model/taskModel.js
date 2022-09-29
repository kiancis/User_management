import db from "../db";

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM task", (err, result) => {
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
    db.query("SELECT * FROM task WHERE id=?", [id], (err, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const create = ( title, descrition ) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO task (title,description) VALUES (?,?)",
      [title, descrition],
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

const update = ({ title, description },id) => {
  return new Promise((resolve, reject) => { 
    db.query("UPDATE task SET title = ?, description = ? WHERE id = ?", [title, description,id], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    });
   })
}

const deleted = (id) => {
  return new Promise((resolve, reject) => { 
    db.query("DELETE FROM task WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
   })
}

export default {
  getAll,
  getOne,
  create,
  update,
  deleted
};
