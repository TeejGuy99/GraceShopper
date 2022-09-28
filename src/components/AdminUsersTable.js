import React, { useState } from "react";
import { useEffect } from "react";
import { getAllUsers, makeUserAdmin, removeUserAdmin } from "../api";
import "../style/AdminUsers.scss";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const handleRoutines = () => {
    getAllUsers().then((result) => {
      setUsers(result);
    });
  };

  useEffect(() => {
    handleRoutines();
  }, []);

  return (
    <>
      <div className="user-table-container">
        {users
          .sort(function (a, b) {
            var keyA = a.id,
              keyB = b.id;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          })
          .map((user) => {
            return (
              <div className="user-wrapper" key={user.id}>
                <div className="users">
                  <p>{user.email === "admin@seed.com" ? "USER ID" : user.id}</p>
                  <p>
                    {user.email === "admin@seed.com" ? "EMAIL" : user.email}
                  </p>
                  <p>
                    {user.email === "admin@seed.com" ? (
                      "ADMIN STATUS"
                    ) : user.isAdmin ? (
                      <button
                        className="remove-admin"
                        onClick={async (event) => {
                          event.preventDefault();
                          await removeUserAdmin(user.id);
                          handleRoutines();
                        }}
                      >
                        <FaUserMinus />
                      </button>
                    ) : (
                      <button
                        onClick={async (event) => {
                          event.preventDefault();
                          await makeUserAdmin(user.id);
                          handleRoutines();
                        }}
                      >
                        <FaUserPlus />
                      </button>
                    )}
                  </p>
                </div>
                <hr></hr>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AdminUsersTable;
