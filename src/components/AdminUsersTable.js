import React, { useState } from "react";
import { useEffect } from "react";
import { getAllUsers, makeUserAdmin, removeUserAdmin } from '../api'


const AdminUsersTable = () => {
  const [users, setUsers] = useState([])
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
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
              <div>
                <div className="users" key={user.id} style={{display: 'flex', width: '80vw', justifyContent: 'space-between', margin: '10px'}}>
                  <p style={{width: '10vw', textAlign: 'center'}}>{user.email==='admin@seed.com' ? 'USER ID' : user.id}</p>
                  <p style={{width: '10vw', textAlign: 'center'}}>{user.email==='admin@seed.com' ? "EMAIL" : user.email}</p>
                  <p style={{width: '20vw', textAlign: 'center'}}>
                    {user.email==='admin@seed.com' ? 
                      "ADMIN STATUS" : 
                        (user.isAdmin ? 
                          <button onClick={async (event) => {
                            event.preventDefault();
                            await removeUserAdmin(user.id)
                            handleRoutines();
                          }}>REMOVE ADMIN</button> : 
                            <button onClick={async (event) => {
                              event.preventDefault();
                              await makeUserAdmin(user.id)
                              handleRoutines();
                            }}>ADD ADMIN</button>
                        )
                    }
                  </p>
                </div>
                <hr style={{borderTop: '1px solid black'}}></hr>
              </div>
            );
          })
        }
        </div>
    </>
  );
}

export default AdminUsersTable;
