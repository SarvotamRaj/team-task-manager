import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getProjects,
  createProject,
} from "../services/projectService";

function ProjectsPage() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

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

      await createProject({
        ...formData,
        members: [],
      });

      alert("Project Created");

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {

      console.log(error);

      alert("Failed to create project");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-blue-400 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Projects
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Create Project
            </button>

          </form>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-2">
                {project.title}
              </h2>

              <p className="text-gray-600">
                {project.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default ProjectsPage;