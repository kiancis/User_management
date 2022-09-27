import { Router } from "express";
import { success, error } from "../utils/response";
import { verifyToken } from "../middleware/index";
import {
  getAll,
  create,
  getOne,
  update,
  deleted,
  login,
} from "../service/userService";

const router = Router();

router.get("/", (req, res) => {
  getAll()
    .then((data) => success(res, data, 200))
    .catch((err) => error(res, err, 404));
});
router.get("/:id", (req, res) => {

  getOne(req)
    .then((data) => success(res, data, 200))
    .catch((err) => error(res, err, 404));
});
router.post("/", (req, res) => {
  create(req)
    .then((data) => success(res, data, 201))
    .catch((err) => error(res, err, 404));
});
router.patch("/:id",verifyToken,(req, res) => {
  update(req)
    .then((data) => success(res, data, 200))
    .catch((err) => error(res, err, 404));
});
router.delete("/:id", (req, res) => {
  deleted(req)
    .then((data) => success(res, data, 200))
    .catch((err) => error(res, err, 404));
});
router.post("/login", (req, res) => {
  login(req)
    .then((data) => success(res, data, 200))
    .catch((err) => error(res, err, 404));
});

export default router;
