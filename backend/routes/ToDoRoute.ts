import { Router } from "express";
import {
  getTodo,
  saveTodo,
  updateTodo,
  deleteTodo,
} from "../controller/TodoController";

const router = Router();

router.get("/", getTodo);
router.post("/save", saveTodo);
router.post("/update", updateTodo);
router.post("/delete", deleteTodo);

export default router;
       