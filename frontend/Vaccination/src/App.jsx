import { BrowserRouter , Routes , Route,Link } from "react-router-dom";

import React from "react";
import Login from "./Component/layouts/Login";
import Signup from "./Component/layouts/Signup";
import Forgotpassword from "./Component/layouts/Forgotpassword"

import AdminDashboard from "./View/AdminPanel/AdminDashboard";

import DeletUser from "./Component/layouts/DeletUser"
import UserDashboard from "./Component/layouts/UserDashboard";
import OTP from "./Component/layouts/OTP";
import AddAdmin from "./Component/layouts/AddAdmin";
import WelcomePage from "./Component/Welcome";
import Profile from "./Component/layouts/ViewProfile";
import ProfileUpdate from "./Component/layouts/Updateprofile";





function App() {
    return (<> 
       <BrowserRouter>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/delet-user" element={<DeletUser />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/adddAdmin" element={<AddAdmin />} />
            <Route path="/" element={<WelcomePage />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/updateprofile" element={<ProfileUpdate/>}/>
          </Routes>
        </BrowserRouter>
        
        
    </>)
}

export default App;