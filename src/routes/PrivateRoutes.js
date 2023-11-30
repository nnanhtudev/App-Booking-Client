import { Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Transaction from "../components/transaction/Transaction";
import HotelBooking from "../components/hotel-booking/hotel-booking";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (user && user.isAuthenticated === true) {
    if (location.pathname === "/transaction") {
      return <Transaction />;
    } else {
      return <HotelBooking />;
    }
  } else {
    toast.error("Please Login");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
