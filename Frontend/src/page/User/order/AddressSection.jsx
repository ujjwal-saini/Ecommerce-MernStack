import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../middleware/authContext";
import { useNavigate } from "react-router-dom";

function AddressSection() {

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addressData, setAddressData] = useState({
    city: "",
    state: "",
    postalCode: "",
    fullAddress: "",
    lat: "",
    lng: "",
  });

  // get current location
  const getCurrentLocation = () => {

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {

          setLoading(true);

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await res.json();

          setAddressData({
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "",
            state: data.address.state || "",
            postalCode: data.address.postcode || "",
            fullAddress: data.display_name || "",
            lat: lat,
            lng: lng,
          });

        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    );
  };

  // 🔥 Main Fix
  useEffect(() => {

    if (user?.profile?.address) {
      setAddressData(user.profile.address);
    } else {
      getCurrentLocation();
    }

  }, [user]);

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = () => {

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        address: addressData,
      },
    };

    setUser(updatedUser);
    setEdit(false);

    alert("Address Saved Successfully");
  };

  return (
    <div className="card p-3 mb-3 shadow">

      <div className="d-flex justify-content-between align-items-center">

        <h5>📍 Delivery Address</h5>

        <div>
          {!edit ? (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={saveAddress}
            >
              Save
            </button>
          )}
        </div>

      </div>

      <hr />

      <h6>{user?.name}</h6>

      {loading ? (
        <p className="text-primary">
          Fetching current location...
        </p>
      ) : edit ? (
        <>
          <input
            type="text"
            className="form-control mb-2"
            name="city"
            value={addressData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control mb-2"
            name="state"
            value={addressData.state}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control mb-2"
            name="postalCode"
            value={addressData.postalCode}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-2"
            name="fullAddress"
            value={addressData.fullAddress}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <p>{addressData.city}</p>
          <p>{addressData.state}</p>
          <p>{addressData.postalCode}</p>
          <p>{addressData.fullAddress}</p>
        </>
      )}

      <button
        className="btn btn-outline-primary btn-sm mt-2"
        onClick={() => navigate("/location")}
      >
        Change Address
      </button>

    </div>
  );
}

export default AddressSection;