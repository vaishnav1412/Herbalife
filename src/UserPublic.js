import React from 'react'
import {Routes,Route} from 'react-router-dom';
import PublicRoutes from './protect/publicRoutes';
import Registration from './pages/Register';

import Otp from './pages/otp';
import OtpReset from './pages/ForgotOtp'
import ResetPassword from './pages/ResetPassword';
import Email from './pages/Email';

const UserPublic = () => {
  return (
    <Routes>
          <Route path ='/register'element={<PublicRoutes><Registration/></PublicRoutes>}/> 
        
          <Route path ='/otp' element ={<PublicRoutes><Otp/></PublicRoutes>}/>
          <Route path ='/forgototp' element={<PublicRoutes><OtpReset/></PublicRoutes>}/>
          <Route path ='/resetpassword'element ={<PublicRoutes><ResetPassword/></PublicRoutes>}/>
          <Route path ='/email' element ={<PublicRoutes><Email/></PublicRoutes>}/>
    </Routes>
  )
}

export default UserPublic
