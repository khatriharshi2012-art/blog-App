import { useState } from "react";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      const user = data?.data?.user;
      const accessToken = data?.data?.accessToken;

      console.log(data);

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      if (!user || !accessToken) {
        alert("Invalid login response from server");
        return;
      }

      // save token
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-div">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don&apos;t have an account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
