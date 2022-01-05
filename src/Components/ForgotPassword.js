import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/Authcontext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      setMessage("");
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                placeholder="Email"
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-100"
            >
              Reset Password
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account?{" "}
        <Link to="/signup" className="text-decoration-none">
          Sign Up
        </Link>
      </div>
    </>
  );
}