import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h3>Loading...</h3>;

  if (user && user.role==="admin") {
    return <Navigate to="/admindashboard" />;
  }

  return children;
};

export default ProtectedRoute;