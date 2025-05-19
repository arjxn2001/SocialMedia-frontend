import './postPage.css'
import Image from '../../components/image/Image'
import PostInteraction from '../../components/posrInteractions/PostInteraction'
import { Link, useParams } from 'react-router-dom'
import Comments from '../../components/comments/Comments'
import { MoveLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'


const PostPage = () => {

  const {id}= useParams()

  const{ isPending,error,data}= useQuery({
    queryKey:["pin",id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res)=>res.data)
  })

  if(isPending) return "Loading...";

  if(error) return "An error has occured: " + error.message;

  if(!data) return "Pin not found!";

  return (
    <div className='postPage'>
      <Link to="/"><MoveLeft className='cursor-pointer'/></Link>

      <div className="postContainer ">
        <div className="postImg">
          <Image path={data.media} alt="" w={736} />
        </div>
        <div className='postDetails'>
          
          <PostInteraction postId={id}/>
          <Link to={`/profile/${data.user.userName}`} className="postUser">
            <Image src={data.user.img || "/general/noAvatar.png"} />
            <span className='text-md font-bold '>{data.user.displayName}</span>
          </Link>
          <Comments id={data._id}/>
        </div>
      </div>
      
    </div>
  )
}

export default PostPage
