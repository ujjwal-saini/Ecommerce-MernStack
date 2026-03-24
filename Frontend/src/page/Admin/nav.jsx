import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../middleware/authContext'
function Nav() {
  const {user} = useContext(AuthContext);
  return (
    <div className="d-flex w-full items-center justify-content-between px-3 py-2 border-b bg-white border">

      <h2 className="text-xl font-semibold">Welcome Admin</h2>

      <div className="d-flex items-center gap-6">

       <form className="d-flex me-1 align-item-center justify-content-center mt-1" style={{width:"41vh", height:"40px"}}>
          <input
            className="form-control"
            type="search"
            placeholder="Search..."
          />
        </form>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
          >
            <img
              src={`https://ecommerce-mernstack-backend.onrender.com${user.profile.profilePic}`}
              alt="profile"
              className="rounded-circle me-2"
              width="35"
              height="35"
            />
            Ujjwal
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Nav
