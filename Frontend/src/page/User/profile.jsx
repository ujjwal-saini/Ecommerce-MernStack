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
        dateOfBirth:
          user.profile?.dateOfBirth?.slice(0, 10) || "",
        country:
          user.profile?.address?.country || "",
        city:
          user.profile?.address?.city || "",
        state:
          user.profile?.address?.state || "",
        postalCode:
          user.profile?.address?.postalCode || "",
        fullAddress:
          user.profile?.address?.fullAddress || "",
      });
      setPreview(user.profile?.profilePic);
    }

  }, [user]);

  if (!user || !formData) {
    return (
      <div className="text-center mt-5">
        <Loader />
      </div>
    );
  }

  // INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // IMAGE CHANGE

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      setPreview(
        URL.createObjectURL(file)
      );

    }
  };

  // SAVE PROFILE

  const handleSave = async () => {

    const toastId = toast.loading(
      "Updating profile..."
    );

    try {

      const fd = new FormData();

      Object.keys(formData).forEach((key) => {

        fd.append(
          key,
          formData[key]
        );

      });

      if (profilePic) {

        fd.append(
          "profilePic",
          profilePic
        );

      }

      await axios.put(
        `${API}/updateprofile`,
        fd,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await fetchMe();

      toast.update(toastId, {
        render:
          "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      setEditMode(false);

    } catch (err) {

      toast.dismiss(toastId);

      if (err.response) {

        toast.error(
          err.response.data.message
        );

      } else {

        toast.error(
          "Server not responding"
        );

      }

      console.error(err);

    }
  };

  // THEME CLASSES

  const containerClass = `
    container-fluid
    py-3
    py-md-4
    px-2
    px-md-4
    min-vh-100
    overflow-hidden
    ${theme === "dark"
      ? "bg-black text-light"
      : "bg-light text-dark"
    }
  `;

  const cardClass = `
    card
    border-0
    shadow-lg
    rounded-4
    p-3
    p-md-4
    ${theme === "dark"
      ? "bg-dark text-light"
      : "bg-white text-dark"
    }
  `;

  const inputClass = `
    form-control
    ${theme === "dark"
      ? "bg-black text-light border-secondary"
      : ""
    }
  `;

  const mutedText =
    theme === "dark"
      ? "text-light"
      : "text-muted";

  return (

    <div className={containerClass}>

      {/* =========================
          EDIT MODE
      ========================= */}

      {editMode && (

        <div className={cardClass}>

          {/* TOP */}

          <div className="row align-items-center mb-4">

            {/* IMAGE */}

            <div className="col-12 col-md-3 text-center mb-4 mb-md-0">

              <img
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="rounded-circle border img-fluid"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                }}
              />

              <input
                type="file"
                className={`form-control mt-3 ${theme === "dark"
                  ? "bg-black text-light border-secondary"
                  : ""
                  }`}
                onChange={handleImageChange}
              />

            </div>

            {/* RIGHT */}

            <div className="col-12 col-md-9 text-center text-md-start">

              <h2 className="fw-bold mb-1">
                {user.name}
              </h2>

              <p className={mutedText}>
                {user.email}
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-end gap-2 mt-4">

                <button
                  className={`btn ${theme === "dark"
                    ? "btn-outline-light"
                    : "btn-secondary"
                    }`}
                  onClick={() =>
                    setEditMode(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

          <hr
            className={
              theme === "dark"
                ? "border-secondary"
                : ""
            }
          />

          {/* FORM */}

          <div className="row g-3 mt-2">

            <div className="col-12 col-md-6">

              <label className="form-label fw-semibold">
                Phone
              </label>

              <input
                className={inputClass}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <div className="col-12 col-md-6">

              <label className="form-label fw-semibold">
                Date of Birth
              </label>

              <input
                type="date"
                className={inputClass}
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />

            </div>

            <div className="col-12 col-md-6">

              <label className="form-label fw-semibold">
                Country
              </label>

              <input
                className={inputClass}
                name="country"
                value={formData.country}
                onChange={handleChange}
              />

            </div>

            <div className="col-12 col-md-6">

              <label className="form-label fw-semibold">
                City
              </label>

              <input
                className={inputClass}
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

            </div>

            <div className="col-12 col-md-6">

              <label className="form-label fw-semibold">
                State
              </label>

              <input
                className={inputClass}
                name="state"
                value={formData.state}
                onChange={handleChange}
              />

            </div>

            <div className="col-12 col-md-6">

              <label className="form-label fw-semibold">
                Postal Code
              </label>

              <input
                className={inputClass}
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />

            </div>

            <div className="col-12">

              <label className="form-label fw-semibold">
                Full Address
              </label>

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

      {/* =========================
          VIEW MODE
      ========================= */}

      {!editMode && (

        <div className={cardClass}>

          {/* TOP */}

          <div className="row align-items-center mb-4">

            {/* IMAGE */}

            <div className="col-12 col-md-3 text-center mb-4 mb-md-0">

              <img
                src={
                  user.profile?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="rounded-circle border img-fluid"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                }}
              />

            </div>

            {/* RIGHT */}

            <div className="col-12 col-md-9 text-center text-md-start position-relative">

              <div className="d-flex justify-content-center justify-content-md-end mb-3">

                <button
                  className={`btn btn-sm ${theme === "dark"
                    ? "btn-outline-light"
                    : "btn-primary"
                    }`}
                  onClick={() =>
                    setEditMode(true)
                  }
                >
                  Edit Profile
                </button>

              </div>

              <h2 className="fw-bold mb-1">
                {user.name}
              </h2>

              <p className={mutedText}>
                {user.email}
              </p>

              <span className="badge bg-secondary px-3 py-2 mt-1">
                {user.role}
              </span>

            </div>

          </div>

          <hr
            className={
              theme === "dark"
                ? "border-secondary"
                : ""
            }
          />

          {/* DETAILS */}

          <div className="row g-4 mt-2">

            <div className="col-12 col-md-6">

              <strong>
                Phone:
              </strong>

              <div className={mutedText}>
                {user.profile?.phone || "N/A"}
              </div>

            </div>

            <div className="col-12 col-md-6">

              <strong>
                Date of Birth:
              </strong>

              <div className={mutedText}>
                {user.profile?.dateOfBirth || "N/A"}
              </div>

            </div>

            <div className="col-12 col-md-6">

              <strong>
                Country:
              </strong>

              <div className={mutedText}>
                {user.profile?.address?.country || "N/A"}
              </div>

            </div>

            <div className="col-12 col-md-6">

              <strong>
                City:
              </strong>

              <div className={mutedText}>
                {user.profile?.address?.city || "N/A"}
              </div>

            </div>

            <div className="col-12 col-md-6">

              <strong>
                State:
              </strong>

              <div className={mutedText}>
                {user.profile?.address?.state || "N/A"}
              </div>

            </div>

            <div className="col-12 col-md-6">

              <strong>
                Postal Code:
              </strong>

              <div className={mutedText}>
                {user.profile?.address?.postalCode || "N/A"}
              </div>

            </div>

            <div className="col-12">

              <strong>
                Full Address:
              </strong>

              <div className={mutedText}>
                {user.profile?.address?.fullAddress || "N/A"}
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Profile;