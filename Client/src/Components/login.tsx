import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/login.css";
import { IoLogoGoogle } from "react-icons/io";
import axios from "axios";
import "../styles/login.css";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(false);
  const navigate = useNavigate();

  async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("the password didn't match each other");
        return;
      }

      const userCredential = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );
      console.log(userCredential);
      if (userCredential) {
        setResult("congratulations ! successfully Logged in");
        // After successful login/signup
        localStorage.setItem("authToken", userCredential.data.token);

        setTimeout(() => navigate("/profile/previousPosts"), 2000);
      }
    } catch (error: any) {
      // console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="loginForm">
        <form onSubmit={formSubmitHandler} className="form">
          <h2>LOGIN</h2>
          <div>
            <input
              placeholder="enter email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="enter password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div>
            <input
              placeholder="confirm your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" className="loginbtn">
              login
            </button>
          </div>
          {!result && (
            <p>
              don't have an account ? <Link to="/signup">signup</Link>
            </p>
          )}
          {result && <p>{result}</p>}
          {error && <p className="signInError">{error}</p>}
          <hr />
          <span>or</span>
          <div className="sign-in-with-google">
            <button>
              <IoLogoGoogle size={28} className="google-logo" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
