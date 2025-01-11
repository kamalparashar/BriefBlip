import { useEffect } from "react"
import Header from "./components/Header/Header"
import { useDispatch, useSelector } from "react-redux"
import authService from "./nhost/auth.js"
import { Outlet } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-black text-white ">
      <Header/>
      <main className="min-h-screen md:text-md lg:text-lg xl:text-xl 2xl:text-5xl">
          <Outlet />
      </main>
      
    </div>
  )
}

export default App
