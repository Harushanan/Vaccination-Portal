import { BrowserRouter , Routes , Route,Link } from "react-router-dom";

import React from "react";
import Login from "./Component/layouts/Login";
import Signup from "./Component/layouts/Signup";
import Forgotpassword from "./Component/layouts/Forgotpassword"

//------- Admin Panel ----------//
import AdminDashboard from "./View/AdminPanel/AdminDashboard";
import AddVaccin from "./View/AdminPanel/AddVaccin";
import ViewVaccine from "./View/AdminPanel/ViewVaccine"
import AdminFaq from './View/AdminPanel/AdminFaq'
import DeletUser from "./View/AdminPanel/DeletUser"




//----------Patient side ------------//
import Faq from './View/PatientSide/Faq'
import UserDashboard from "./View/PatientSide/UserDashboard";


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
            <Route path="/delete-user" element={<DeletUser />} />
          
        
            <Route path="/" element={<WelcomePage />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/updateprofile" element={<ProfileUpdate/>}/>

            <Route path="/AddVaccin" element={<AddVaccin/>}/>
            <Route path="/ViewVaccin" element={<ViewVaccine/>}/>
            <Route path="/AdminFaq" element={<AdminFaq/>}/>


          
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </BrowserRouter>
        
        
    </>)
}

export default App;