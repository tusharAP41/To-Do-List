import todoModel from "../models/todoModel";
import { Request, Response } from "express";

export const getTodo = async (req: Request, res: Response) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
    console.log("This is Working");
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const saveTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const newTodo = await todoModel.create({ title, description, status });
    console.log("Added Successfully");
    console.log(newTodo);
    res.send(newTodo);
  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { _id, title,description,status } = req.body;
    todoModel.findByIdAndUpdate(_id, {title,description,status }).then(() => {
      res.set(201).send("Updated Successfully");
    });
  } catch {
    (error: any) => {
      console.log(error);
    };
  }
};
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    todoModel.findByIdAndDelete(_id).then(() => {
      res.set(201).send("Deleted Successfully");
    });
  } catch {
    (error: any) => {
      console.log(error);
    };
  }
};
