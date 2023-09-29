import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import AdminProtected from './protect/adminProtected';
import Adminpublic from './protect/adminpublic';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import UserProtected from './UserProtected';
import UserPublic from './UserPublic';
import Login from './pages/Login';
import PublicRoutes from './protect/publicRoutes';
import { ColorRing } from  'react-loader-spinner'
import { useSelector } from 'react-redux';
function App() {
  const { loading } = useSelector((state)=>state.alerts)
  return (
    <div className="App ">
     <BrowserRouter>

     {loading && (
      <div className='flex justify-center align-middle h-full w-full bg-black opacity-70 fixed top-0 left-0 z-9999 '>
     <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
     </div>
     )}
     
     <Toaster
  position="top-center"
  reverseOrder={false}
/>
     <Routes>
          <Route exact path ='/'element={<PublicRoutes><Login/></PublicRoutes>}/>
          <Route path="/user*" element={<UserProtected />}/>
          <Route path='/public*' element={<UserPublic/>}/>
          <Route path ='/admin' element={<Adminpublic><AdminLogin/></Adminpublic>}/>
          <Route path ='/dashboard*' element={<AdminProtected><Dashboard/></AdminProtected>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
