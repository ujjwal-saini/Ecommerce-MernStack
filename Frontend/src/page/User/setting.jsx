import React, { useContext, useState } from "react";
import { AuthContext } from "../../middleware/authContext";

function Setting() {
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [theme, setTheme] = useState("light");

  return (
    <div className="container mt-5 mb-5">

      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Account Settings</h2>
        <p className="text-muted">
          Manage your account preferences and security
        </p>
      </div>

      {/* Profile Settings */}
      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">Profile Settings</div>
        <div className="card-body">

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={user?.name}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user?.email}
                disabled
              />
            </div>
          </div>

        </div>
      </div>

      {/* Security Settings */}
      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">Security</div>
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Change Password</h6>
              <p className="text-muted mb-0">
                Update your account password
              </p>
            </div>
            <button className="btn btn-outline-danger">
              Change Password
            </button>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Two-Factor Authentication</h6>
              <p className="text-muted mb-0">
                Add extra security to your account
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Notification Settings */}
      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">Notifications</div>
        <div className="card-body">

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <label className="form-check-label">
              Email notifications for orders & offers
            </label>
          </div>

        </div>
      </div>

      {/* Appearance */}
      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">Appearance</div>
        <div className="card-body">

          <label className="form-label">Theme</label>
          <select
            className="form-select w-25"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

        </div>
      </div>

      {/* Danger Zone */}
      <div className="card shadow-sm border-danger">
        <div className="card-header bg-danger text-white fw-bold">
          Danger Zone
        </div>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1">Delete Account</h6>
            <p className="text-muted mb-0">
              This action cannot be undone
            </p>
          </div>
          <button className="btn btn-danger">
            Delete Account
          </button>
        </div>
      </div>

    </div>
  );
}

export default Setting;