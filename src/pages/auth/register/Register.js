import Navbar from "../../../components/navbar/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import './Register.scss'
import { useState } from "react";
import { toast } from "react-toastify";
import { handleRegister } from '../../../services/apiUserServices'
import validateEmail from "../../../utils/validEmail";
import { useNavigate } from "react-router-dom";
const Register = () => {
  let history = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const defaultValidInput = {
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  }

  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);
  const handleValidRegister = () => {
    setObjectCheckInput(defaultValidInput)
    if (!email) {
      toast.error("Email is required");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
      return false
    }
    let regx = validateEmail(email)
    if (!regx) {
      toast.error("Invalid email address");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setObjectCheckInput({ ...defaultValidInput, isValidPassword: false })
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      setObjectCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
      return false
    }
    return true
  }
  const handleRegisterUser = async () => {
    try {
      let check = handleValidRegister()
      if (check === true) {
        let response = await handleRegister(email, password)
        if (response.data && +response.data.EC === 0) {
          history('/login')
          toast.success(response.data.EM)
        } else {
          toast.error(response.data.EM)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
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
              <input className={objectCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email" placeholder="Email Address" />
            </div>
            <div className="input-field form-control mt-3">
              <FontAwesomeIcon className="icon" icon={faUnlock} />
              <input className={objectCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password" placeholder="Password" />
            </div>
            <div className="input-field form-control mt-3">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input className={objectCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password" placeholder="Re-enter password" />
            </div>
          </div>
          <button type="button" className="btn btn-outline-primary mt-3" onClick={() => handleRegisterUser()}>Register</button>
        </div>
      </div>
    </>
  )
}

export default Register