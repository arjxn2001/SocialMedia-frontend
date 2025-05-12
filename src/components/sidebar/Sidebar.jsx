
import {Link} from "react-router";
import "./sidebar.css";
import { Bell,  Home, MessageCircle, PlusCircle, Settings } from "lucide-react";
import { FaGem } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="leftBar">
      <div className="menuIcons ">
        <Link to="/" className="menuIco ">
          <FaGem  className="text-red-800 text-4xl"/>
        </Link>
        <Link to="/" className="menuIcon">
          <Home/>
        </Link>
        <Link to="/create" className="menuIcon">
          <PlusCircle/>
        </Link>
        <Link to="/" className="menuIcon">
          <Bell/>
        </Link>
        <Link to="/" className="menuIcon">
          <MessageCircle/>
        </Link>
      </div>
      <Link to="/" className="menuIcon">
        <Settings/>
      </Link>
    </div>
  );
};

export default Sidebar;