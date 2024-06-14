import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import LoadingSpinner from "./LoadingSpinner";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signUpSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateName = (name: string) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
  };

  const validateForm = () => {
    if (!name || !email || !password || !passwordConfirm) {
      setError("All fields are required.");
      return false;
    }
    if (!validateName(name)) {
      setError("Name can only contain letters and spaces.");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  async function SignUpSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Start loading

    try {
      const signUpResult = await axios.post(
        "http://localhost:5000/api/v1/users/signup",
        {
          name,
          email,
          password,
          passwordConfirm,
        }
      );
      setSignupSuccess(true);
      localStorage.setItem("authToken", signUpResult.data.token);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div>
      <Navbar theme="light" />
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <div className="flex items-center justify-center mt-12 min-h-screen bg-gray-100">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={SignUpSubmitHandler} className="space-y-6">
              <h2 className="text-2xl font-bold text-center">SIGNUP</h2>
              <div>
                <input
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <input
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <input
                  name="password"
                  placeholder="Create password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <input
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Signup
                </button>
              </div>
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </form>

            {signUpSuccess && (
              <p className="mt-4 text-green-500 text-center">
                Congratulations! You have successfully created an account.
              </p>
            )}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
