const Task = require("../models/Task");


// CREATE TASK
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      assignedTo,
      project,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      project,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title")
      .populate("createdBy", "name");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
};