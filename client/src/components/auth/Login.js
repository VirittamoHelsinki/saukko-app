import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      axios.post("http://localhost:5000/auth/login", loginData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login new account</h1>

      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
