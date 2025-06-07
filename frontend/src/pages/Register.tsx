import { useState } from "react";
import { createUserInMongoDB } from "../services/userService";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: createUser } = useMutation({
    mutationFn: createUserInMongoDB,
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.email) {
        throw new Error("Email is missing.");
      }

      await updateProfile(user, {
        displayName: displayName
      });

      await createUser({
        uid: user.uid,
        email: user.email,
        displayName: displayName
      });

      alert("You are registered.");
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-box">
      <h2 className="login-text">Register</h2>

      <form onSubmit={handleRegister} className="form-box">
        <input
          type="text"
          placeholder="Your name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          className="input"
        />
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
