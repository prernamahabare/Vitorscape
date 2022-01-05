import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { database } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signup } = useAuth();
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
      await signup(emailRef.current.value, passwordRef.current.value);
      const user = {
        FirstName: firstName,
        LastName: lastName,
        Email: emailRef.current.value,
        Role: role,
      };
      await database.ref("users").push(user);
      if (role === "user") {
        history.push("/");
      } else {
        history.push("/admin");
      }
    } catch (e) {
      setError("Failed to create an account");
      console.log(e);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="fname"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First Name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lname" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lname"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
                required
              />
            </div>
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
                aria-describedby="passwordHelp"
                required
              />
              <div id="passwordHelp" className="form-text">
                Password must contain atleast 6 characters
              </div>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-decoration-none">
          Log In
        </Link>
      </div>
    </>
  );
}