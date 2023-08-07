import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';

export default function RecipeComments({ auth, recipe, setRecipe }) {

    const deleteComment = (comment) => {
        // destroy(route('recipe.comment.destroy', comment.id));
        axios.delete(`/recipes/comments/${comment.id}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const onSubmit = (e, comment) => {
        e.preventDefault();
        deleteComment(comment);
    };

    return (
        <div id="comments">
            {recipe.comments && recipe.comments.map((comment, index) => {
                return (
                    <div className='my-2' key={comment.id}>
                        <div className='inline-block'>
                            <p className='inline-block font-bold'>{comment.user.username}</p>
                            {auth?.user?.id === comment.user.id &&
                                <p className='text-red-500 font-bold inline-block pl-2'>ME</p>
                            }
                            <p className='pl-4'>{comment.comment}</p>
                            <p>{/* comment.created_at */}</p>
                        </div>
                        {auth?.user?.id === comment.user.id &&
                            <form onSubmit={(e) => onSubmit(e, comment)} className="inline-block float-right">
                                <button type="submit">
                                    <MdDeleteForever size={30} color='red' />
                                </button>
                            </form>
                        }
                    </div>
                )
            })}
        </div>
    )
}
