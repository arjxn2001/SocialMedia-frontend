import { useState } from "react";
import "./userButton.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";
import Image from "../image/Image";

const UserButton = () => {
  
  const [open , setOpen] = useState(false);

  const navigate = useNavigate()

  //temp
  // const currentUser = true;

   const {currentUser , removeCurrentUser} = useAuthStore()

   console.log(currentUser);

  const handleLogout = async () =>{
    
    try{
      await apiRequest.post("/users/auth/logout",{})
      removeCurrentUser();
      navigate('/auth')
    }catch(err){
      console.log(err);
      
    }
  }

  return currentUser ? (
    <div className="userButton">
       {currentUser.img ? (
    <Image path={currentUser.img} />
  ) : (
    <FaUserCircle className="w-8 h-8" />
  )}
      <div onClick={() => setOpen((prev) => !prev)}>
        <ChevronDown className="cursor-pointer"/>
      </div>
      {open && (
        <div className="userOptions">
          <Link to={`/profile/${currentUser.userName || 'defaultUser'}`} className="userOption">
            Profile
          </Link>
          <div className="userOption">Setting</div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login / Sign Up
    </Link>
  );
};

export default UserButton;