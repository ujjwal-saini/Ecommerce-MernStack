import React, { useContext } from "react";
import { AuthContext } from "../../../middleware/authContext";
import { useNavigate } from "react-router-dom";

function AddressSection() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="card p-3 mb-3 shadow">

      <h5>📍 Delivery Address</h5>
      <hr />

      {user?.profile?.address?.city ? (
        <>
          <h6>{user.name}</h6>
          <p>{user.profile.address.city}</p>
          <p>{user.profile.address.street}</p>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate("/location")}
          >
            Change Address
          </button>
        </>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/location")}
        >
          Add Address
        </button>
      )}

    </div>
  );
}

export default AddressSection;