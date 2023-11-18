import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  // ... rest of the component
  const jwtCookie = document.cookie.split("; ").find((cookie) => cookie.startsWith("jwt"));
  const isLoggedIn = jwtCookie ? true : false;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Thực hiện các bước logout, có thể làm xóa cookie, reset context, vv.
    // Ví dụ: clear cookie và chuyển hướng đến trang login
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.error("Logged out");
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="logo" to="/">
          <span>Booking Website</span>
        </Link>
        <div className="navItems">
          {isLoggedIn === true ? (
            <>
              {/* <span>{onEmail ? onEmail : "User"}</span> */}
              <Link to="/transactions">
                <button className="navButton">Transactions</button>
              </Link>
              <button className="navButton" onClick={handleLogout}>
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
