import { Link } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="logo" to='/' >
          <span >Booking Website</span>
        </Link>
        <div className="navItems">
          <Link to='/register'>
            <button className="navButton">Register</button>
          </Link>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
