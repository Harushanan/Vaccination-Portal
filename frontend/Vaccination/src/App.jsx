import { BrowserRouter , Routes , Route,Link } from "react-router-dom";



import React from "react";



import Forgotpassword from "./Component/layouts/Forgotpassword"
import CheckUser from "./Component/layouts/CheckUser"

//------- Admin Panel ----------//
import AdminLogin from "./View/AdminPanel/AdminLogin";
import AdminDashboard from "./View/AdminPanel/AdminDashboard";
import AddVaccin from "./View/AdminPanel/AddVaccin";
import ViewVaccine from "./View/AdminPanel/ViewVaccine"
import AdminFaq from './View/AdminPanel/AdminFaq'
import DeletUser from "./View/AdminPanel/DeletUser"
import StaffDahboard from "./View/AdminPanel/StaffDahboard"
import DeleteStaff from "./View/AdminPanel/DeleteStaff";
import AddCenter from "./View/AdminPanel/AddCenter";
import ViewCenter from "./View/AdminPanel/ViewCenter";
import Updatecenter from "./View/AdminPanel/Updatecenter";




//----------Patient side ------------//
import Faq from './View/PatientSide/Faq'
import Login from "./View/PatientSide/Login";
import Signup from "./View/PatientSide/Signup";
import UserDashboard from "./View/PatientSide/UserDashboard";
import BookingVaccine from "./View/PatientSide/BookingVaccine";
import SelectBooking from "./View/PatientSide/SelectBooking"


//----------Nurse side ------------//

import NurseLogin from "./View/NursePanel/NurseLogin";
import NurseSignup from "./View/NursePanel/NurseSingup"
import NurseDashboard from "./View/NursePanel/NurseDashboard"
import ViewSchedul from "./View/NursePanel/viewSchedul";
import ViewBooking from "./View/NursePanel/ViewBooking";
import ApprovedBooking from "./View/NursePanel/ApprovedBooking";
import RejectedBooking from "./View/NursePanel/RejectedBooking";
import WelcomePage from "./Component/Welcome";
import Profile from "./Component/layouts/ViewProfile";
import ProfileUpdate from "./Component/layouts/Updateprofile";
import RouteGuard from "./auth-view/RouteGuard";


import UnauthPage from "./auth-view/UnauthPage";
import NotFound from "./auth-view/NotFound";


function App() {
    return (<> 
       <BrowserRouter>
        <RouteGuard />
         <Routes>

          {/* Patient Routes */}
            <Route path="/patient/login" element={<Login />} />
            <Route path="/patient/sign-up" element={<Signup />} />
            <Route path="/patient/userDashboard" element={<UserDashboard />} />
            <Route path="/patient/BookingVaccine" element={<BookingVaccine />} />
            <Route path="/patient/BookingVaccine/:id" element={<SelectBooking />} />
            <Route path="/patient/faq" element={<Faq />} />


             {/* Nurse Routes */}
            <Route path="/nurse/login" element={<NurseLogin />} />
            <Route path="/nurse/sign-up" element={<NurseSignup />} />
            <Route path="/nurse/nurseDashboard" element={<NurseDashboard />} />
             <Route path="/nurse/viewSchedul" element={<ViewSchedul/>} />
             <Route path="/nurse/ViewBooking" element={<ViewBooking/>} />
             <Route path="/nurse/ApprovedBooking" element={<ApprovedBooking/>} />
             <Route path="/nurse/RejectedBooking" element={<RejectedBooking/>} />
            

            {/*Admin Routes*/}
             <Route path="/admin/login" element={<AdminLogin/>} />
             <Route path="/admin/adminDashboard" element={<AdminDashboard/>} />
              <Route path="/admin/delete-user" element={<DeletUser />} />
              <Route path="/admin/StaffDahboard" element={<StaffDahboard/>}/>
            <Route path="/admin/DeleteStaff" element={<DeleteStaff/>}/>
            <Route path="/admin/AddVaccin" element={<AddVaccin/>}/>
            <Route path="/admin/ViewVaccin" element={<ViewVaccine/>}/>
            <Route path="/admin/AdminFaq" element={<AdminFaq/>}/>
            <Route path="/admin/AddCenter" element={<AddCenter/>}/>
            <Route path="/admin/ViewCenter" element={<ViewCenter/>}/>
             <Route path="/admin/ViewCenter/:id" element={<Updatecenter />} />






            <Route path="/forgot-password" element={<Forgotpassword />} />
           
           
          
        
            <Route path="/" element={<WelcomePage />} />
            <Route path="/CheckUser" element={<CheckUser />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/updateprofile" element={<ProfileUpdate/>}/>


            {/*------------Admin--------------------*/}

            
            
          
           


          
            
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnauthPage />} />  
           
             
          </Routes>
        </BrowserRouter>
        
        
    </>)                   
}

export default App;