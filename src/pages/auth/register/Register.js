import Navbar from "../../../components/navbar/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import './Register.scss'

const Register = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="container">
          <div className="title">
            <h2>Register</h2>
          </div>
          <div className="register-body">
            <div className="input-field form-control mt-3">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input className="form-control" type="text" placeholder="Email or username" />
            </div>
            <div className="input-field form-control mt-3">
              <FontAwesomeIcon className="icon" icon={faUnlock} />
              <input className="form-control" type="password" placeholder="Password" />
            </div>
            <div className="input-field form-control mt-3">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input className="form-control" type="password" placeholder="Re-enter password" />
            </div>
          </div>
          <button type="button" class="btn btn-outline-primary mt-3">Register</button>
        </div>
      </div>
    </>
  )
}

export default Register