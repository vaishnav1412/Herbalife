import React from 'react'
import { Navigate } from 'react-router-dom'

const Adminpublic = (props) => {
    if(localStorage.getItem("admin_token")){
        return <Navigate to ="/dashboard"/>
      }else{
        return props.children
      }
}

export default Adminpublic
