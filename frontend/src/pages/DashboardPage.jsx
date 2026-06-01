import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getDashboardData } from "../services/dashboardService";

function DashboardPage() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const data = await getDashboardData();

      setDashboard(data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch dashboard data");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {dashboard && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-orange-300 text-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold">
                Total Tasks
              </h2>

              <p className="text-4xl font-bold mt-4">
                {dashboard.totalTasks}
              </p>
            </div>

            <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold">
                Completed Tasks
              </h2>

              <p className="text-4xl font-bold mt-4">
                {dashboard.completedTasks}
              </p>
            </div>

            <div className="bg-yellow-400 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold">
                Pending Tasks
              </h2>

              <p className="text-4xl font-bold mt-4">
                {dashboard.pendingTasks}
              </p>
            </div>

            <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold">
                Overdue Tasks
              </h2>

              <p className="text-4xl font-bold mt-4">
                {dashboard.overdueTasks}
              </p>
            </div>

          </div>
        )}

      </div>
    </>
  );
}

export default DashboardPage;