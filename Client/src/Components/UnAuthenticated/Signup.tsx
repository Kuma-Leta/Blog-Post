import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { MdEmail, MdLock, MdPerson } from "react-icons/md"; // Import icons
import { BsFillImageFill } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner";
import SuccessMessage from "../Profile/UserProfile/SuccessMessage";
import ErrorMessage from "../Profile/UserProfile/ErrorMessage";
import SocialMediaIcons from "./SocialMediaIcons";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [photo, setPhoto] = useState<File | null>(null); // State for profile picture
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
    setError(null);
    setSignupSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordConfirm", passwordConfirm);
      if (photo) {
        formData.append("photo", photo); // Add profile picture to form data
      }
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setError(null);
        setSignupSuccess(true);
        setTimeout(() => navigate("/login"), 2000); // Navigate to login after showing success message
      }
    } catch (error: any) {
      setSignupSuccess(false);
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
    <div className="relative flex items-center justify-center w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <LoadingSpinner loading={loading} />
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={SignUpSubmitHandler} className="space-y-2">
          {error && !signUpSuccess && (
            <ErrorMessage message={error} onClose={() => setError(null)} />
          )}
          {signUpSuccess && !error && (
            <SuccessMessage
              message={"Sign up successful!"}
              onClose={() => setSignupSuccess(false)}
            />
          )}
          <h2 className="text-2xl font-bold text-center">SIGN UP</h2>
          <div className="relative">
            <MdPerson
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={24}
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full p-2 pl-10 border border-gray-300 rounded-full"
            />
          </div>
          <div className="relative">
            <MdEmail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={24}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-2 pl-10 border border-gray-300 rounded-full"
            />
          </div>
          <div className="relative">
            <MdLock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={24}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 pl-10 border border-gray-300 rounded-full"
            />
          </div>
          <div className="relative">
            <MdLock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={24}
            />
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm password"
              className="w-full p-2 pl-10 border border-gray-300 rounded-full"
            />
          </div>
          <div className="relative">
            <BsFillImageFill
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={24}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full shadow-md transition duration-300"
            >
              Sign Up
            </button>
          </div>
          <hr className="my-4" />
          <div className="text-center">or SIGNUP VIA SOCIAL NETWORK</div>
          <SocialMediaIcons /> {/* Use SocialMediaIcons */}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
