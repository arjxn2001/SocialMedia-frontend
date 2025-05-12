import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";


const followUser = async (userName) => {
    const res = await apiRequest.post(`/users/follow/${userName}`);
    return res.data;
}

const FollowButton = ({isFollowing, userName}) => {

        const queryClient = useQueryClient()
    
        const mutation = useMutation({
            mutationFn: followUser,      
            onSuccess: ()=> {
                queryClient.invalidateQueries({queryKey:["profile",userName]})    
            }
          })
    

  return <button onClick={()=>mutation.mutate(userName)} disabled={mutation.isPending}  className='bg-red-600 text-white font-semibold px-4 py-2 rounded-2xl hover:bg-red-700 disabled:last:cursor-not-allowed disabled:opacity-5'>{isFollowing ? "Unfollow" : "Follow"}</button>
}

export default FollowButton
