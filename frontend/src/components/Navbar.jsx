import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <h2>Team Task Manager</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Link
          to="/dashboard"
          style={{ color: "white" }}
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          style={{ color: "white" }}
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          style={{ color: "white" }}
        >
          Tasks
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;