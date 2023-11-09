import React from 'react'
import {Routes,Route} from 'react-router-dom';
import ProtectedRoute from './protect/protectedRoute';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import AddAddress from './pages/AddAddress';
import Editaddress from './pages/EditAddress';
import EditProfile from './pages/EditProfile';
import PrimiumUsers from './pages/PrimiumUsers';
import WeightGains from './pages/WeightGains';
import Weightloses from './pages/Weightloses';
import Shop from './pages/shop';
import Foods from './pages/Foods';
import Notification from './pages/Notification';
import Workouts from './pages/Workouts';
import Bmi from './pages/Bmi';
import Detailviews from './pages/Detailviews';
import Carts from './pages/Carts';
import Checkouts from './pages/Checkouts';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AddChekoutAddresss from './pages/AddChekoutAddress';
import EditCheckoutAddresss from './pages/EditCheckoutAddress';

import AdminProfileUserSide from './pages/AdminProfileUserSide';
import OrderHistory from './pages/OrderHistory'
import VideoCall from './pages/VideoCall';
import Connect from './pages/Connect';
import VideoCallRoomInput from './pages/VideoCallRoomInput';
import SuscribeHistory from './pages/SuscribeHistory';

const UserProtected = () => {
    
  return (
   <Routes>

          <Route path ='/home' element ={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path ='/bmi' element={<ProtectedRoute><Bmi/></ProtectedRoute>}/>
          <Route path ='/userprofile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
          <Route path ='/addaddress' element={<ProtectedRoute><AddAddress/></ProtectedRoute>}/>
          <Route path ='/editaddress' element={<ProtectedRoute><Editaddress/></ProtectedRoute>}/>
          <Route path ='/editprofile' element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
          <Route path ='/premiumuser' element={<ProtectedRoute><PrimiumUsers/></ProtectedRoute>}/>
          <Route path ='/shop' element={<ProtectedRoute><Shop/></ProtectedRoute>}/>
          <Route path ='/foods' element ={<ProtectedRoute><Foods/></ProtectedRoute>}/>
          <Route path ='/weightgain' element ={<ProtectedRoute><WeightGains/></ProtectedRoute>}/>
          <Route path ='/weightlose' element ={<ProtectedRoute><Weightloses/></ProtectedRoute>}/>
          <Route path='/notification' element ={<ProtectedRoute><Notification/></ProtectedRoute>}/>
           <Route path='/workouts' element ={<ProtectedRoute><Workouts/></ProtectedRoute>}/>
           <Route path='/detailview' element ={<ProtectedRoute><Detailviews/></ProtectedRoute>}/>
           <Route path='/cart'element ={<ProtectedRoute><Carts/></ProtectedRoute>}/>
           <Route path='/checkout'element ={<ProtectedRoute><Checkouts/></ProtectedRoute>}/>
           <Route path='/sucess' element ={<ProtectedRoute><OrderSuccessPage/></ProtectedRoute>}/>
           <Route path='/addcheckoutaddress' element ={<ProtectedRoute><AddChekoutAddresss/></ProtectedRoute>}/>
           <Route path='/checkouteditaddress' element ={<ProtectedRoute><EditCheckoutAddresss/></ProtectedRoute>}/>
           <Route path='/appoinment' element ={<ProtectedRoute><AdminProfileUserSide/></ProtectedRoute>}/>
           <Route path='/orderhistory' element ={<ProtectedRoute><OrderHistory/></ProtectedRoute>}/>
           <Route path='/subscriptionhistory' element ={<ProtectedRoute><SuscribeHistory/></ProtectedRoute>}/>
           <Route path='/connect' element ={<ProtectedRoute><Connect/></ProtectedRoute>}/>
           <Route path='/videocallroom' element ={<ProtectedRoute><VideoCallRoomInput/></ProtectedRoute>}/>
           <Route path='/videocall/:roomId' element={<ProtectedRoute><VideoCall/></ProtectedRoute>} />

          
   </Routes>
  )
}

export default UserProtected
