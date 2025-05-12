import "./galleryItem.css";
import { Link } from "react-router";
import { Download, Ellipsis } from "lucide-react";
import Image from "../image/Image";


const GalleryItem = ({ item }) => {

  const optimizedHeight = (372 * item.height) / item.width

  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* <img src={item.media} alt="" /> */}

      <Image path={item.media} alt="" w={372} h={optimizedHeight} />
      
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <Download/>
        </button>
        <button>
          <Ellipsis/>
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;