import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CiHeart } from 'react-icons/ci'
import { FaHeart, FaShare } from 'react-icons/fa'
import { IoIosMore } from 'react-icons/io'
import apiRequest from '../../utils/apiRequest'


const interact = async (id,type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });

  return res.data;
}

const PostInteraction = ({postId}) => {

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn:({id,type}) => interact(id,type),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["interactionCheck ", postId]})
    }
  })

  const {isPending,error,data} = useQuery({
    queryKey:["interactionCheck ", postId],
    queryFn:()=>
      apiRequest
      .get(`/pins/interaction-check/${postId}`)
      .then((res) => res.data)
    
  })

  if(isPending || error) return;

  console.log(data)

  return (
    <div className='postInteraction  flex items-center justify-between'>
      <div className="interactionIcons flex  items-center gap-2 cursor-pointer">
         {
          data.isLiked ? (
            <FaHeart
              size={24}
              color="#e50829"
              onClick={() => mutation.mutate({ id: postId, type: "like" })}
            />
          ) : (
            <CiHeart
              size={26}
              onClick={() => mutation.mutate({ id: postId, type: "like" })}
            />
          )
        }
         {data.likeCount}
        <FaShare/>
        <IoIosMore/>
      </div>
      <button disabled={mutation.isPending}
       className='bg-red-700 text-white px-4 py-2 rounded-2xl text-sm font-bold cursor-pointer'
       onClick={()=>mutation.mutate({id:postId, type:"save"})}>
        {data.isSaved ? "Saved" : "Save"}</button>
    </div>
  )
}

export default PostInteraction
