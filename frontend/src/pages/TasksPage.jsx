import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../services/taskService";

function TasksPage() {

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const data = await getTasks();

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createTask({
        ...formData,
      });

      alert("Task Created");

      setFormData({
        title: "",
        description: "",
        dueDate: "",
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Failed to create task");
    }
  };

  const handleStatusChange = async (
    taskId,
    status
  ) => {

    try {

      await updateTaskStatus(
        taskId,
        status
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-blue-300 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Tasks
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Create Task
            </button>

          </form>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-2">
                {task.title}
              </h2>

              <p className="text-gray-600 mb-3">
                {task.description}
              </p>

              <p className="mb-2">
                <span className="font-semibold">
                  Status:
                </span>

                {" "}
                {task.status}
              </p>

              <p className="mb-4">
                <span className="font-semibold">
                  Due:
                </span>

                {" "}
                {new Date(task.dueDate)
                  .toLocaleDateString()}
              </p>

              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    task._id,
                    e.target.value
                  )
                }
                className="border p-2 rounded-lg w-full"
              >
                <option value="pending">
                  Pending
                </option>

                <option value="completed">
                  Completed
                </option>

              </select>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default TasksPage;