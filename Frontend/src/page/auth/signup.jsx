import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLoginButton } from "react-social-login-buttons";
import { AuthContext } from "../../middleware/authContext";
import { toast } from "react-toastify";

function Signup() {

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: ""
  });
  const [btnActive, setBtnactive] = useState(false);

  const { API } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formdata.name);
    data.append("email", formdata.email);
    data.append("password", formdata.password);
    data.append("profilePic", formdata.profilePic);
    const toastId = toast.loading("Registering user...");
    setBtnactive(true); 
    try {
      const res = await axios.post(
        `${API}/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.update(toastId, {
          render: "Signup Successful , Please login...",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (err) {

      toast.dismiss(toastId);
     setBtnactive(false);
      if (err.response) {

        const status = err.response.status;

        if (status === 409) {
          toast.error("User already registered");


        }
        else if (status === 402) {

          toast.error("Please fill email and password");
        }
        else if (status === 401) {
          toast.error("Invalid email or password");
        }
        else {
          toast.error(err.response.data.message);
        }

      } else {
        toast.error("Server not responding");
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      }}
    >
      <div
        className="card shadow-lg p-4 border-0 rounded-4"
        style={{ width: "420px" }}>


        <h3 className="text-center mb-4 fw-bold">
          Create Your Account
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              onChange={(e) =>
                setFormdata({ ...formdata, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormdata({ ...formdata, email: e.target.value })
              }
            />
          </div>


          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create password"
              onChange={(e) =>
                setFormdata({ ...formdata, password: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) =>
                setFormdata({
                  ...formdata,
                  profilePic: e.target.files[0],
                })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold mb-3"
            disabled={btnActive}
          >
            {btnActive ? "Registering..." : "Sign Up"}
          </button>

          <div className="w-100">
            <GoogleLoginButton text="Log in with Google" />
          </div>

          <hr />

          <p className="text-center">
            Already have an account?
            <Link
              to="/login"
              className="text-decoration-none fw-bold ms-2"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signup;