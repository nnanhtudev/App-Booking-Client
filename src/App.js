import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import { BallTriangle } from "react-loader-spinner";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import "./App.scss";
import AppRoutes from "./routes/AppRouter";
function App() {
  const { user, loading } = useContext(UserContext);
  // console.log(loading);
  return (
    <BrowserRouter>
      <Navbar />
      {user.isLoading ? (
        <>
          <div className="loading-container">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#003580"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
            <div>Loading ...</div>
          </div>
        </>
      ) : (
        <AppRoutes />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
