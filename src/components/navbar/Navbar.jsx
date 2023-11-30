import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { handleLogoutUser } from "../../services/apiUserServices";

const Navbar = () => {
  const { user, logoutContext } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    let data = await handleLogoutUser();
    logoutContext();
    localStorage.removeItem("jwt");
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="logo" to="/">
          <span>Booking Website</span>
        </Link>
        <div className="navItems">
          {user && user.isAuthenticated === true ? (
            <>
              <span>{user.account.email}</span>
              {user.account.isAdmin === true && (
                <a href="http://localhost:4002/login">
                  <button className="navButton">Admin</button>
                </a>
              )}
              <Link to="/transaction">
                <button className="navButton">Transactions</button>
              </Link>
              <button className="navButton" onClick={() => handleLogout()}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
