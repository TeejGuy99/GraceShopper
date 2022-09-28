import React from 'react'
import { AdminUsersTable} from "../components"
import { getAllUsers } from '../api'
import { AdminNav } from "../components";


const AdminUsers = (props) => {

  return (
    <>
    <div className="dashboard-container">
        <AdminNav />
    </div>
    < AdminUsersTable/>
    </>
  )
}

export default AdminUsers;