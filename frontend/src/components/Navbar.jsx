import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ better than clear()
    setUser(null);
    navigate("/", { replace: true }); // ✅ go to home & prevent back
  };

  return (
    <div className="navbar">
      <div className="navbar-div">
        <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Blog
        </h1>

        <div>
          {user ? (
            <>
              {user.role === "admin" && (
                <button onClick={() => navigate("/admin")}>
                  Admin
                </button>
              )}

              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login", { replace: true })}>
                Login
              </button>
              <button onClick={() => navigate("/register", { replace: true })}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {user?.name && (
        <div className="span-div">
          <span>Welcome {user.name}!</span>
        </div>
      )}
    </div>
  );
}

export default Navbar;
