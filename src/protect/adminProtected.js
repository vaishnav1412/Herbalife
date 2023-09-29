import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminProtected = (props) => {
    if(localStorage.getItem("admin_token")){
        return props.children
      }else{
        return <Navigate to ="/admin"/>
      }
}

export default AdminProtected
