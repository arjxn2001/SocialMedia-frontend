import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CiHeart } from 'react-icons/ci';
import { FaHeart, FaShare } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import apiRequest from '../../utils/apiRequest';

const interact = async (id, type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });
  return res.data;
};

const PostInteraction = ({ postId }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['interactionCheck', postId],
    queryFn: () =>
      apiRequest.get(`/pins/interaction-check/${postId}`).then(res => res.data),
    staleTime: 1000 * 60 * 5, // cache 5 mins
  });

  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: () => {
      
      queryClient.invalidateQueries(['interactionCheck', postId]);
    },
    onError: (err) => {
      console.error('Interaction failed:', err);
    },
  });

  if (isLoading) return null;
  if (error) return <div>Error loading interactions</div>;

  // Handle like toggle click
  const handleLikeClick = () => {
    // if liked, sending 'like' again toggles it off in your backend
    mutation.mutate({ id: postId, type: 'like' });
  };

  // Handle save toggle click
  const handleSaveClick = () => {
    mutation.mutate({ id: postId, type: 'save' });
  };

  return (
    <div className="postInteraction flex items-center justify-between">
      <div className="interactionIcons flex items-center gap-2 cursor-pointer">
        {data.isLiked ? (
          <FaHeart
            size={24}
            color="#e50829"
            onClick={handleLikeClick}
            className={mutation.isLoading ? 'opacity-50 pointer-events-none' : ''}
            title="Unlike"
          />
        ) : (
          <CiHeart
            size={26}
            onClick={handleLikeClick}
            className={mutation.isLoading ? 'opacity-50 pointer-events-none' : ''}
            title="Like"
          />
        )}
        <span>{data.likeCount}</span>
        <FaShare />
        <IoIosMore />
      </div>
      <button
        disabled={mutation.isLoading}
        className="bg-red-700 text-white px-4 py-2 rounded-2xl text-sm font-bold cursor-pointer disabled:opacity-50"
        onClick={handleSaveClick}
      >
        {data.isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default PostInteraction;
