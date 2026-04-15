import React, { useState, useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AuthContext } from "../../middleware/authContext";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import axios from "axios";

// Fix leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function Location() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [position, setPosition] = useState([28.6139, 77.2090]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Reverse geocode
  const getAddressFromLatLng = async (lat, lng) => {
    try {

      setLoading(true);

      const res = await axios(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await res.json();

      setCity(
        data.address.city ||
        data.address.town ||
        data.address.village ||
        ""
      );

      setState(data.address.state || "");
      setPostalCode(data.address.postcode || "");
      setAddress(data.display_name || "");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Change map view
  function ChangeMapView({ position }) {
    const map = useMap();
    map.setView(position, 13);
    return null;
  }

  // Marker
  function LocationMarker() {

    useMapEvents({
      click(e) {

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        setPosition([lat, lng]);
        getAddressFromLatLng(lat, lng);
      },
    });

    return (
      <Marker
        draggable
        position={position}
        eventHandlers={{
          dragend: (e) => {

            const lat = e.target.getLatLng().lat;
            const lng = e.target.getLatLng().lng;

            setPosition([lat, lng]);
            getAddressFromLatLng(lat, lng);
          },
        }}
      >
        <Popup>
          Drag or Click to change location
        </Popup>
      </Marker>
    );
  }

  // Get current location
  const getCurrentLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);
        getAddressFromLatLng(lat, lng);
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  // 🔥 Main useEffect (Important)
  useEffect(() => {

    if (user?.profile?.address?.lat) {

      setPosition([
        user.profile.address.lat,
        user.profile.address.lng
      ]);

      setCity(user.profile.address.city);
      setState(user.profile.address.state);
      setPostalCode(user.profile.address.postalCode);
      setAddress(user.profile.address.fullAddress);

    } else {
      getCurrentLocation();
    }

  }, []);

  // Save location
  const saveLocation = () => {

    const updatedAddress = {
      city: city,
      state: state,
      postalCode: postalCode,
      fullAddress: address,
      lat: position[0],
      lng: position[1],
    };

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        address: updatedAddress,
      },
    };

    setUser(updatedUser);
    localStorage.setItem(
      "userAddress",
      JSON.stringify(updatedAddress)
    );
    alert("Location Saved Successfully");
    navigate(-1);
  };

  return (
    <div className="container-fluid mt-3 px-2 px-md-4">

      {/* Address Card */}
      <div className="card shadow-sm p-3 mb-3">

        <h5 className="mb-2">📍 Delivery Location</h5>

        {loading ? (
          <p className="text-primary">
            Fetching address...
          </p>
        ) : (
          <>
            <h6 className="text-danger fw-bold">
              {city}
            </h6>
            <p className="mb-1">
              {state}
            </p>
            <p className="mb-1">
              {postalCode}
            </p>
            <p className="mb-0 text-muted">
              {address}
            </p>
          </>
        )}

        <div className="mt-3 d-flex flex-wrap gap-2">

          <button
            className="btn btn-primary btn-sm"
            onClick={getCurrentLocation}
          >
            Use Current Location
          </button>

          <button
            className="btn btn-success btn-sm"
            onClick={saveLocation}
          >
            Save Location
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

        </div>
      </div>

      {/* Map */}
      <div className="card shadow-sm">

        <MapContainer
          center={position}
          zoom={13}
          style={{
            height: "60vh",
            width: "100%",
          }}
        >

          <ChangeMapView position={position} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker />

        </MapContainer>

      </div>
    </div>
  );
}

export default Location;