import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace></Navigate>;
  }

  return children;
}

export default ProtectedRoute;
