import { useState } from "react";
import { createUserInMongoDB } from "../services/userService";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const { mutateAsync: createUser } = useMutation({
    mutationFn: createUserInMongoDB,
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!displayName.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: displayName
      });

      await createUser({
        uid: user.uid,
        email: user.email || "",
        displayName,
      });

      setSuccess("Account created successfully. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError(err.message || "Failed to register.");
      }
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
          placeholder="Password (min 8 characteres)"
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
          className="input"
        />
        <button type="submit" className="primary-button">Create account</button>

      </form>
     
       {error && <p className="error-text">{error}</p>}
       {success && <p className="success-text">{success}</p>}


      <div className="choose-login">— or —</div>

      <p>Already have an account?</p>
      
      <button className="secondary-button"><a href="/login" className="login-link">Log in</a></button> 

    </div>
  );
};

export default Register;
