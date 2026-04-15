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

  const [phone, setPhone] = useState("");

  // get location
  const getCurrentLocation = () => {

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {

          setLoading(true);

          const res = await axios(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
console.log(res.json);
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
            lat,
            lng,
          });
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    if (user?.profile?.address) {
      setAddressData(user.profile.address);
    } else {
      getCurrentLocation();
    }
    if (user?.profile?.phone) {
      setPhone(user.profile.phone);
    }
  }, [user]);

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = () => {

    if (!phone) {
      alert("Phone number is required");
      return;
    }

    if (phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        phone: phone,
        address: addressData,
      },
    };

    setUser(updatedUser);
    setEdit(false);

    alert("Address & Phone Saved Successfully");
  };

  return (
    <div className="card p-3 mb-3 shadow">

      <div className="d-flex justify-content-between align-items-center">

        <h5>📍 Delivery Address</h5>

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
      <hr />
      <h6>{user?.name}</h6>
      {loading ? (
        <p className="text-primary">
          Fetching current location...
        </p>
      ) : edit ? (
        <>
          {/* Phone */}
          <input
            type="tel"
            className="form-control mb-2"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-2"
            name="city"
            placeholder="City"
            value={addressData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control mb-2"
            name="state"
            placeholder="State"
            value={addressData.state}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control mb-2"
            name="postalCode"
            placeholder="Postal Code"
            value={addressData.postalCode}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-2"
            name="fullAddress"
            placeholder="Full Address"
            value={addressData.fullAddress}
            onChange={handleChange}
          />

        </>
      ) : (
        <>

          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>City:</strong>{addressData.city}</p>
          <p><strong>State:</strong>{addressData.state}</p>
          <p><strong>PostalCode:</strong>{addressData.postalCode}</p>
          <p><strong>Address:</strong>{addressData.fullAddress}</p>

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