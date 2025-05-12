import { MoreHorizontal, Share } from 'lucide-react'
import { useState } from 'react'
import Gallery from '../../components/gallery/Gallery'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import apiRequest from '../../utils/apiRequest'
import Boards from '../../components/boards/Boards'
import FollowButton from './FollowButton'


const ProfilePage = () => {

  

  const [type , setType] = useState("saved");

  const {userName} = useParams();
  console.log("User name from URL:", userName);
  // if (!userName) return "No username specified in URL!";

  const{ isPending, error, data}= useQuery({
    queryKey:["profile",userName],
    queryFn: () => apiRequest.get(`/users/${userName}`).then((res)=>res.data),
  })

  if(isPending) return "Loading...";

  if(error) return "An error has occured: " + error.message;

  if(!data) return "User not found!";

  console.log(data);
  

  return (
    <div className='profilePage flex flex-col items-center gap-3'>
      <img src={data.img || '/general/noAvatar.png'} alt="" className='w-32 h-32 rounded-full object-cover'/>
      <h1 className='text-2xl font-bold'>{data.displayName}</h1>
      <span className='font-semibold text-gray-500'>@{data.userName}</span>
      <div className="font-bold">{data.followerCount} followers . {data.followingCount} following</div>
      <div className="profileInteractions flex gap-8">
        <Share/>
        <div className='profileButtons flex items-center gap-4 '>
          <button className='bg-gray-300 font-semibold px-4 py-2 rounded-2xl hover:bg-gray-400 '>Message</button>
          <FollowButton isFollowing={data.isFollowing} userName={data.userName}/>
        </div>
        <MoreHorizontal/>
      </div>
      <div className='profileOptions flex gap-10 mt-8 font-bold'>
        <span
        onClick={()=>setType("created")}
        className={`cursor-pointer pb-2 hover:text-gray-600  ${type === "created" ? "border-b-2 border-black": ""}`}>Created</span>
        <span
        onClick={()=>setType("saved")}
        className={`cursor-pointer pb-2 hover:text-gray-600  ${type === "saved" ? "border-b-3" : ""}`}>Saved</span>
      </div>
      {type==="created" ? <Gallery  userId={data._id} />: <Boards userId={data._id}/>}
    </div>
  )
}

export default ProfilePage
