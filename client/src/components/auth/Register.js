import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const register = (e) => {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      axios.post("http://localhost:5000/auth/", registerData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Register new account</h1>
      <form onSubmit={register}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setPasswordVerify(e.target.value)}
        />
        <br></br>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
