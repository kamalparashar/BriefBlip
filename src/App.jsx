import { useEffect } from "react"
import Header from "./components/Header/Header"
import { useDispatch, useSelector } from "react-redux"
import authService from "./nhost/auth.js"
import { Outlet } from "react-router-dom"
import {login, logout} from "./store/authSlice"
import axios from 'axios'
import conf from "./conf/conf.js"

const url = conf.backend_url
const interval = 898000

function App() {
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("error in UseEffect:", error);
      })
  }, []);

  useEffect(() => {
    const reloadWebsite = () => {
      axios.get(url)
        .then(response => {
          console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
          console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
    };

    // Call the function immediately
    reloadWebsite();

    // Set up interval
    const intervalId = setInterval(reloadWebsite, interval);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white ">
      <Header/>
      <main className="min-h-screen min-w-screen md:text-md lg:text-lg xl:text-xl 2xl:text-5xl">
          <Outlet />
      </main>
      
    </div>
  )
}

export default App
