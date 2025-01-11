import './index.css'
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { NhostProvider } from "@nhost/react"
import nhost from "./nhost/nhost.js"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/store.js"
import {Login, Signup, Landing, Summary} from "./components/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: (
            <Landing/>
        )
      },
      {
        path: '/login',
        element: (
            <Login/>
        )
      },
      {
        path: '/signup',
        element: (
            <Signup/>
        )
      },
      {
        path: '/summary',
        element: (
            <Summary/>
        )
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <NhostProvider nhost={nhost}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </NhostProvider>
  
)
