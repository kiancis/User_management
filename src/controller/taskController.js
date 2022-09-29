import { Router } from "express";
import { success, error } from "../utils/response";
import { verifyToken } from "../middleware/index";
import {
  create,
  deleted,
  getAll,
  getOne,
  update,
} from "../service/taskService";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  getAll()
    .then((data) => success(res, data, 200))
    .catch((data) => error(res, data, 400));
});
router.get("/:id", verifyToken, (req, res) => {
  getOne(req)
    .then((data) => success(res, data, 200))
    .catch((data) => error(res, data, 400));
});
router.post("/", verifyToken, (req, res) => {
  create(req)
    .then((data) => success(res, data, 200))
    .catch((data) => error(res, data, 400));
});
router.patch("/:id", verifyToken, (req, res) => {
  update(req)
    .then((data) => success(res, data, 200))
    .catch((data) => error(res, data, 400));
});
router.delete("/:id", verifyToken, (req, res) => {
  deleted(req)
    .then((data) => success(res, data, 200))
    .catch((data) => error(res, data, 400));
});

export default router;
