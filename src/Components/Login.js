import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/Authcontext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [role, setRole] = useState("");

  const handleRole = (e) => {
    const { value } = e.target;
    setRole(value);
  };


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      if (role === "user") {
        history.push("/");
      } else {
        history.push("/admin");
      }
    } catch {
      setError("Failed to Sign In");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Log In</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">What's your role?</label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="user"
                  value="user"
                  onChange={handleRole}
                  required
                />
                <label className="form-check-label" htmlFor="user">
                  User
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="admin"
                  value="admin"
                  onChange={handleRole}
                  required
                />
                <label className="form-check-label" htmlFor="admin">
                  Admin
                </label>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-100"
            >
              Log In
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
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