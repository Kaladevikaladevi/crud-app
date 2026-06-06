import Task from "../models/Task.js";

// CREATE
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

// READ ALL
export const getTasks = async (req, res) => {
  const { search } = req.query;

  let query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const tasks = await Task.find(query);
  res.json(tasks);
};

// UPDATE
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

// DELETE
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};