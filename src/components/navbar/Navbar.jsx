import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(UserContext);
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
              <Link to="/transaction">
                <button className="navButton">Transactions</button>
              </Link>
              <button className="navButton">Logout</button>
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
