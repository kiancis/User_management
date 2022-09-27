import { Router } from "express";
import { success, error } from "../utils/response";
import { getAll, getOne } from "../service/taskService";

const router = Router();

router.get("/", (req, res) => {
  getAll()
    .then((data) => success(res, data, 200))
    .catch(data=>error(res,data,400));
});
router.get("/", (req, res) => {
  getOne()
    .then((data) => success(res, data, 200))
    .catch(data=>error(res,data,400));
});
router.post("/", (req, res) => {
  getAll()
    .then((data) => success(res, data, 200))
    .catch(data=>error(res,data,400));
});
router.patch("/", (req, res) => {
  getAll()
    .then((data) => success(res, data, 200))
    .catch(data=>error(res,data,400));
});
router.delete("/", (req, res) => {
  getAll()
    .then((data) => success(res, data, 200))
    .catch(data=>error(res,data,400));
});

export default router;
