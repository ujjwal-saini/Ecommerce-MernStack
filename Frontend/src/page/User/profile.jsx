import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";
import { toast } from "react-toastify";

function Profile() {

  const { user, fetchMe, theme, API } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.profile?.phone || "",
        dateOfBirth: user.profile?.dateOfBirth?.slice(0, 10) || "",
        country: user.profile?.address?.country || "",
        city: user.profile?.address?.city || "",
        state: user.profile?.address?.state || "",
        postalCode: user.profile?.address?.postalCode || "",
        fullAddress: user.profile?.address?.fullAddress || "",
      });

      setPreview(user.profile?.profilePic);
    }
  }, [user]);

  if (!user || !formData) return <Loader />;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const toastId = toast.loading("Updating profile...");

    try {
      const fd = new FormData();

      Object.keys(formData).forEach((key) =>
        fd.append(key, formData[key])
      );

      if (profilePic) {
        fd.append("profilePic", profilePic);
      }

      await axios.put(`${API}/updateprofile`, fd, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchMe();

      toast.update(toastId, {
        render: "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      setEditMode(false);

    } catch (err) {
      toast.dismiss(toastId);

      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Server not responding");
      }

      console.error(err);
    }
  };

  const cardClass = `card shadow-lg border-0 p-4 ${theme === "dark" ? "bg-dark text-white" : ""
    }`;

  const inputClass = `form-control form-control-lg ${theme === "dark" ? "bg-secondary text-white border-0" : ""
    }`;

  const mutedText = theme === "dark" ? "text-secondary" : "text-muted";

  return (
    <div className={`container mt-3 mb-5 ${theme === "dark" ? "text-white" : ""}`}>

      {/* EDIT MODE */}
      {editMode && (
        <div className={cardClass}>

          {/* 🔹 TOP SECTION */}
          <div className="row align-items-center mb-4 flex-column flex-md-row text-center text-md-start">

            {/* IMAGE */}
            <div className="col-12 col-md-3 text-center mb-3 mb-md-0">

              <img
                src={preview}
                alt="profile"
                className="rounded-circle border mb-3 img-fluid"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover"
                }}
              />

              <input
                type="file"
                className={`form-control ${theme === "dark"
                  ? "bg-secondary text-white border-0"
                  : ""
                  }`}
                onChange={handleImageChange}
              />
            </div>

            <div className="col-12 col-md-9">
              <h2 className="fw-bold">{user.name}</h2>
              <p className={mutedText}>{user.email}</p>
              <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-5 mb-3">
                <button
                  className={`btn ${theme === "dark"
                    ? "btn-outline-light"
                    : "btn-secondary"
                    }`}
                  onClick={() => setEditMode(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <hr />

          {/* 🔹 FORM */}
          <div className="row g-3 fs-6 fs-md-5 mt-2">

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Phone</label>
              <input
                className={inputClass}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Date of Birth</label>
              <input
                type="date"
                className={inputClass}
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Country</label>
              <input
                className={inputClass}
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">City</label>
              <input
                className={inputClass}
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">State</label>
              <input
                className={inputClass}
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Postal Code</label>
              <input
                className={inputClass}
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Full Address</label>
              <textarea
                rows="4"
                className={inputClass}
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>
      )}

      {/* VIEW MODE (unchanged) */}
      {!editMode && (
        <div className={cardClass}>

          {/* 🔹 TOP SECTION */}
          <div className="row align-items-center mb-4 flex-column flex-md-row text-center text-md-start">

            {/* IMAGE */}
            <div className="col-12 col-md-3 d-flex justify-content-center mb-3 mb-md-0">
              <img
                src={user.profile?.profilePic}
                alt="profile"
                className="rounded-circle img-fluid border"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="col-12 col-md-9 position-relative">

              {/* ✅ RESPONSIVE BUTTON */}
              <button
                className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-primary"
                  } position-static position-md-absolute mt-2 mt-md-0 mb-3`}
                style={{ top: "0", right: "0", height: "30px", fontSize: "14px" }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>

              <h2 className="fw-bold mb-1">{user.name}</h2>

              <p className={mutedText}>{user.email}</p>

              <span className="badge bg-secondary px-3 py-2">
                {user.role}
              </span>
            </div>
          </div>

          <hr />

          {/* 🔹 DETAILS */}
          <div className="row g-3 mt-2 fs-6 fs-md-5">

            <div className="col-12 col-md-6">
              <strong>Phone:</strong>
              <div className={mutedText}>
                {user.profile?.phone}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Date of Birth:</strong>
              <div className={mutedText}>
                {user.profile?.dateOfBirth}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Country:</strong>
              <div className={mutedText}>
                {user.profile?.address?.country}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>City:</strong>
              <div className={mutedText}>
                {user.profile?.address?.city}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>State:</strong>
              <div className={mutedText}>
                {user.profile?.address?.state}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Postal Code:</strong>
              <div className={mutedText}>
                {user.profile?.address?.postalCode}
              </div>
            </div>

            <div className="col-12">
              <strong>Full Address:</strong>
              <div className={mutedText}>
                {user.profile?.address?.fullAddress}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;