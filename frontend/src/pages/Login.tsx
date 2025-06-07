import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useUser();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user) {
        setError("Login failed: No user returned.");
        return;
      }

      login(result.user);
      alert(`Welcome ${result.user.displayName || "User"}!`);      
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      if (!result.user) {
        setError("Google login failed.");
        return;
      }

      login(result.user);
      console.log("Google login successful", result.user);
      navigate("/");
    } catch (err: any) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-box">
        <h2 className="login-text">Log in</h2>

        <form onSubmit={handleEmailLogin} className="form-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="primary-button">
            Login with your Email
          </button>
        </form>

        <div className="choose-login">— o —</div>

        <button onClick={handleGoogleLogin} className="primary-button">
          Login with your Google account
        </button>

        <div className="choose-login">— or —</div>

        <p>Don't have an account?</p>

        <button className="secondary-button">
          <a href="/register" className="register-link">Register</a>
        </button>

        {error && <p className="error-text">{error}</p>}
      </div>
    </>
  );
};

export default Login;
