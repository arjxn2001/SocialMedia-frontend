

import { useNavigate } from "react-router";
import UserButton from "../userButton/UserButton";
import "./navbar.css";
import { Search } from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventPDefault();

    navigate(`/search?search=${e.target[0].value}`)
    
  }
  
  return (
    <div className="topBar">
      {/* SEARCH */}
      <form onSubmit={handleSubmit} className="search">
        <Search/>
        <input type="text" placeholder="Search" />
      </form>
      {/* USER */}
      <UserButton />
    </div>
  );
};

export default Navbar;