import React from 'react'
import { AdminUsersTable} from "../components"
import { getAllUsers } from '../api'
import { AdminNav } from "../components";


const AdminUsers = (props) => {

  return (
    <div className='admin-users-container'>
    <div className="dashboard-container">
        <AdminNav />
    </div>
    < AdminUsersTable/>
    </div>
  )
}

export default AdminUsers;