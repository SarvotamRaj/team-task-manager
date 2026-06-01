const Task = require("../models/Task");

const getDashboardData = async (req, res) => {
  try {

    // total tasks
    const totalTasks = await Task.countDocuments();

    // completed tasks
    const completedTasks = await Task.countDocuments({
      status: "completed",
    });

    // pending tasks
    const pendingTasks = await Task.countDocuments({
      status: "pending",
    });

    // overdue tasks
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};