import Todo from "../models/todo.js";
import { Types } from "mongoose";

export const getTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const order = req.query.order === "desc" ? -1 : 1;

  try {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Todo.find().sort({ isComplete: order }).skip(skip).limit(limit),
      Todo.countDocuments(),
    ]);
    data.length !== 0
      ? res.json({ code: 200, data })
      : res.json({
          code: 404,
          message: "Data Not Found, Try to post somthing first.",
        });
  } catch (error) {
    res.json({ code: 505, message: error.message });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Types.ObjectId.isValid(id))
      return res.json({ code: 404, message: "No post with that id." });
    const data = await Todo.findById(id);
    res.json({ code: 200, data });
  } catch (error) {
    res.json({ code: 505, message: error.message });
  }
};

export const insertTodo = async (req, res) => {
  console.log("req.body", req.body);
  if (req.body.length > 0) {
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
      const todoName = req.body[i]?.todoName;
      const isComplete = req.body[i]?.isComplete;
      let description = req.body[i]?.description;
      let responsible = req.body[i]?.responsible;
      let category = req.body[i]?.category;
      try {
        if (!todoName)
          return res.json({
            code: 400,
            message: "Make sure you input the todoName object!",
          });

        if (responsible === undefined) responsible = "Sem responsável";
        if (category === undefined) category = "Sem categoria";
        if (description === undefined) description = "Sem descrição";

        const newTodo = await new Todo({
          todoName,
          isComplete,
          description,
          responsible,
          category,
        });
        await newTodo.save();
        data.push(newTodo);
      } catch (error) {
        res.json({ code: 505, message: error.message });
      }
    }
    res.json({ code: 200, data });
  } else {
    const todoName = req.body?.todoName;
    let isComplete = req.body?.isComplete;
    let description = req.body?.description;
    let responsible = req.body?.responsible;
    let category = req.body?.category;

    try {
      if (!todoName)
        return res.json({
          code: 400,
          message: "Make sure you input the todoName object!",
        });

      if (isComplete === undefined) isComplete = false;
      if (responsible === undefined) responsible = "Sem responsável";
      if (category === undefined) category = "Sem categoria";
      if (description === undefined) description = "Sem descrição";

      const newTodo = await new Todo({
        todoName,
        isComplete,
        description,
        responsible,
        category,
      });
      await newTodo.save();
      res.json({ code: 200, data: newTodo });
    } catch (error) {
      res.json({ code: 505, message: error.message });
    }
  }
};

export const updateTodo = async (req, res) => {
  const todoName = req.body?.todoName;
  const isComplete = req.body?.isComplete;
  const id = req.params?.id;
  const description = req.body?.description;
  const responsible = req.body?.responsible;
  const category = req.body?.category;

  try {
    if (isComplete == undefined || typeof isComplete !== "boolean")
      return res.json({
        code: 400,
        message:
          "Make sure you input the isComplpete object and give boolean value!",
      });
    if (!Types.ObjectId.isValid(id))
      return res.json({ code: 404, message: "No post with that id." });
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      {
        todoName,
        isComplete,
        updatedAt: new Date().toISOString(),
        id,
        description,
        responsible,
        category,
      },
      { new: true }
    );
    res.json({ code: 200, data: updateTodo });
  } catch (error) {
    res.json({ code: 505, message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const id = req.params?.id;

  try {
    if (!Types.ObjectId.isValid(id))
      return res.json({ code: 404, message: "No post with that id." });
    await Todo.findByIdAndRemove(id);
    res.json({ code: 200, message: "Sucessfully deleted todo!" });
  } catch (error) {
    res.json({ code: 505, message: error.message });
  }
};

export const getTodoByDate = async (req, res) => {
  const date1 = req.params?.date1;
  const date2 = req.params?.date2;
  const newDate2 = new Date(date2);

  try {
    if (!date1 || !date2)
      return res.json({
        code: 400,
        message: "Make sure you input the two dates.",
      });
    const data = await Todo.find({
      createdAt: {
        $gte: new Date(date1),
        $lte: new Date(newDate2.setDate(newDate2.getDate() + 1)),
      },
    });
    data.length === 0
      ? res.json({
          code: 404,
          message: `Todos Not Found at ${date1} - ${date2}`,
        })
      : res.json({ code: 200, data });
  } catch (error) {
    res.json({ code: 505, message: error.message });
  }
};
