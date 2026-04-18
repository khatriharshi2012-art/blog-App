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
    localStorage.removeItem("user");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div className="navbar">
      <div className="navbar-div">
        <h1 onClick={() => navigate("/", { replace: true })}>
          Blog
        </h1>

        <div>
          {user ? (
            <>
              {user.role === "admin" && (
                <button onClick={() => navigate("/admin", { replace: true })}>
                  Admin
                </button>
              )}

              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/", { replace: true });
                  } else {
                    navigate("/login", { replace: true });
                  }
                }}
              >
                Login
              </button>

              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/", { replace: true });
                  } else {
                    navigate("/register", { replace: true });
                  }
                }}
              >
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