import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/Authcontext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Profile</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <strong>Email: </strong>
            {currentUser.email}
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100">
            Update Profile
          </Link>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        <div
          className="text-decoration-none"
          onClick={handleLogout}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Log Out
        </div>
      </div>
    </>
  );
}