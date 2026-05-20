import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
   <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        
        <h1 className="text-lg font-bold text-center break-words">
          {name ? `Welcome, ${name}` : "Diet Suggestion App"}
        </h1>

        <nav className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="text-gray-600">Login</Link>
          <Link to="/register" className="text-gray-600">Register</Link>
          <Link to="/diet" className="text-gray-600">Diet</Link>
          <Link to="/profile">Profile</Link>


          {token && (
            <button
              onClick={handleLogout}
             className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          )}
        </nav>

      </div>
    </header>
  );
}