import axios from 'axios';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

export default function RecipeLikeForm({ recipe, setRecipe, likedByUser, setError }) {

    const LIKE_URL = '/recipe/like';
    const DISLIKE_URL = `/recipe/likes/${recipe.id}`;
    const ICON_SIZE = 40;

    function likeRecipe(event) {
        event.preventDefault();

        axios.post(LIKE_URL, {
            recipeId: recipe.id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }

    function dislikeRecipe(event) {
        event.preventDefault();
        axios.delete(DISLIKE_URL)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form onSubmit={likedByUser ? dislikeRecipe : likeRecipe} className="inline-block">
            <button>
                {likedByUser ? <FcLike size={ICON_SIZE} /> : <FcLikePlaceholder size={ICON_SIZE} />}
            </button>
        </form>
    )
}