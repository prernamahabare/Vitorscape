import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/Authcontext";
import { database } from "../firebase";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [userList, setUserList] = useState([]);
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

  useEffect(() => {
    const users = database.ref("users");

    users.on("value", (snapshot) => {
      const info = snapshot.val();

      const userlist = [];
      for (let id in info) {
        userlist.push(info[id]);
      }

      setUserList(userlist);
    });
  }, []);

  const deleteUser = (user) => {
    setUserList(
      userList.filter((e) => {
        return e !== user;
      })
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Admin Profile</h2>
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

      <div className="my-4">
        <div className="my-2" style={{textAlign: "right"}}>
          <Link to="/signup" type="button" className="btn btn-primary">
            Add User&nbsp;&nbsp;
            <i className="fas fa-user-plus" />
          </Link>
        </div>

        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userList
              ? userList.map((user) =>
                  user.Email === currentUser.email || user.Role === "admin" ? (
                    ""
                  ) : (
                    <tr>
                      <td>{user.FirstName}</td>
                      <td>{user.LastName}</td>
                      <td>{user.Email}</td>
                      <td>
                        <i
                          className="fas fa-trash-alt"
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            deleteUser(user);
                          }}
                        />
                      </td>
                    </tr>
                  )
                )
              : ""}
          </tbody>
        </table>
      </div>

      <div className="w-100 text-center mt-2">
        <button className="btn btn-primary" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </>
  );
}
