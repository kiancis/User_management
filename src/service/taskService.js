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
  return new Promise(async (resolve, reject) => {
    const { params } = req;

    const task = await Model.getOne(params.id);

    if (!task[0]) {
      reject("Not task found");
    } else {
      resolve(task);
    }
  });
}

export function create(req) {
  return new Promise(async (resolve, reject) => {
    const { title, description } = req.body;

    if (!title || !description) {
      return reject("Dates is required");
    }

    const task = await Model.create(title, description);

    if (!task) {
      return reject("error creating task");
    } else {
      return resolve(task);
    }
  });
}

export function update(req) {
  return new Promise(async (resolve, reject) => {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!id) {
      return reject("id is required");
    }
    if (!title || !description) {
      return reject("data is required");
    }

    const taskFound = await Model.getOne(id);
    if (!taskFound[0]) {
      return reject("task not found");
    }

    const task = { ...taskFound[0] };

    if (title) task.title = title;
    if (description) task.description = description;

    const taskUpdate = await Model.update(task, id);
    if (!taskUpdate) {
      reject("error creating task");
    } else {
      resolve(taskUpdate);
    }
  });
}

export function deleted(req) {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;

    if (!id) return reject("id is required");

    const taskFound = await Model.getOne(id);

    if (!taskFound[0]) return reject("task not found");

    const taskDeleted = await Model.deleted(id);
    
    if (!taskDeleted) {
      reject("Error deleting task");
    } else {
      resolve(taskDeleted)
    }
  });
}
