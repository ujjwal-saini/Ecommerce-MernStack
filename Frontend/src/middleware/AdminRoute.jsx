import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import Loader from "../components/loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading)
     return <h3> <Loader/> </h3>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AdminRoute;