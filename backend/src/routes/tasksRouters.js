import express from "express";
import {getAllTasks, createTasks, updateTasks, removeTasks} from "../controllers/tasksControllers.js"
const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTasks);

router.put("/:id", updateTasks );

router.delete("/:id", removeTasks )

export default router;

