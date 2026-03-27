import React, { useState, useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AuthContext } from "../../middleware/authContext";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

// fix marker icon
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
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // get address
  const getAddressFromLatLng = async (lat, lng) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await res.json();

      setCity(
        data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          ""
      );

      setAddress(data.display_name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // marker
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        getAddressFromLatLng(e.latlng.lat, e.latlng.lng);
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
        <Popup>Drag or Click to change location</Popup>
      </Marker>
    );
  }

  // current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setPosition([lat, lng]);
      getAddressFromLatLng(lat, lng);
    });
  };

  useEffect(() => {
    getAddressFromLatLng(position[0], position[1]);
  }, []);

  // save
  const saveLocation = () => {
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        address: {
          city,
          street: address,
          lat: position[0],
          lng: position[1],
        },
      },
    };

    setUser(updatedUser);

    alert("Location Saved Successfully");
    navigate("/");
  };

  return (
    <div className="container-fluid mt-3 px-2 px-md-4">

      {/* Top Address Card */}
      <div className="card shadow-sm p-3 mb-3">

        <h5 className="mb-2">📍 Delivery Location</h5>

        {loading ? (
          <p className="text-primary">Fetching address...</p>
        ) : (
          <>
            <h6 className="text-danger fw-bold">{city}</h6>
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