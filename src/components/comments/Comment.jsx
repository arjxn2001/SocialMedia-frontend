import { FaUserCircle } from "react-icons/fa"
import Image from "../image/Image"
import {format} from "timeago.js"


const Comment = ({comment}) => {
  return (
    <div className="comment" >
    {comment.user?.img ? (
      <Image path={comment.user.img } alt="user" className="w-8 h-8 rounded-full" />
    ) : (
      <FaUserCircle className="w-7 h-7 text-gray-500" />
    )}

    <div className="commentContent">
      <span className='commentUsername '>{comment.user.displayName}</span>
      <p className='commentText'>{comment.description}</p>
      <span className='commentTime'>{format(comment.createdAt)}</span>
    </div>
    </div>
  )
}

export default Comment
