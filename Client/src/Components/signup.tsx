import "../styles/signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [signUpSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  async function SignUpSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const signUpResult = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });
      setSignupSuccess(true);
      // After successful login/signup
      localStorage.setItem("authToken", signUpResult.data.token);

      console.log(signUpResult);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      if (error.response.data) setError(error.response.data.message);
    }
  }

  return (
    <div className="signUp">
      <div className="signUpForm">
        <form onSubmit={SignUpSubmitHandler} className="form">
          <h2>SIGNUP</h2>
          <div>
            <input
              name="name"
              placeholder="enter your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              name="email"
              placeholder="enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              placeholder="confirm your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="signupbtn">
              Signup
            </button>
          </div>
          <p>
            already have an account ? <Link to="/login">login</Link>
          </p>
        </form>

        {signUpSuccess && (
          <p className="signUpResponse">
            Congratulations ! you have successfully created account
          </p>
        )}
        {error && <p className="signupError">{error}</p>}

        {/* <p className="signUpResponse"></p> */}
      </div>
    </div>
  );
};
export default SignUp;
