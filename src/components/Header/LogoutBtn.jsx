import React from 'react'
import authService from '../../nhost/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
      authService.logout()
      .then(() => dispatch(logout()))
      .then(()=> navigate("/"))
  }
  return (
    <button onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn