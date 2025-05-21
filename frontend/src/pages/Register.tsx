import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("You are registered.");
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <div className="login-box">
      <Navbar />
      <h2 className="login-text">Register</h2>

      <form onSubmit={handleRegister} className="form-box">
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
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="primary-button">Create account</button>

      </form>

      <div className="choose-login">— or —</div>

      <p>Already have an account?</p>
      
      <button className="secondary-button"><a href="/login" className="login-link">Log in</a></button> 

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Register;
