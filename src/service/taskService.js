import e from "express";
import Model from "../model/taskModel";

export function getAll() {
  return new Promise(async (resolve, reject) => {
    const task = await Model.getAll();

    if (task.length > 0) {
      resolve(task);
    } else {
      reject("not tasks founds");
    }
  });
}

export function getOne(req) {
  return new Promise(async(resolve, reject) => {
      const { query } = req;
      
      const task = await Model.getOne(query.id);

      if (!task) {
          reject("Not task found")
      } else {
          resolve(task)
      }
  });
}
