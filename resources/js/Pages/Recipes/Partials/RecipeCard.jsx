import NavLink from "@/Components/NavLink";
import { useForm } from '@inertiajs/react';

import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

export default function RecipeCard({ recipe, auth }) {
    const { data, setData, post, processing, errors, reset, delete:destroy } = useForm({
       
    });

    var likedByUser = recipe.likes.filter(like => like.user_id === auth.user.id).length > 0;

    function likeRecipe(event) {
        event.preventDefault();
        post(route('recipe.likes.store', recipe));
    }

    
    function dislikeRecipe(event) {
        event.preventDefault();
        destroy(route('recipe.likes.destroy', recipe));
    }
    

    return (
        <div className="recipe-card">
            <img src={'/storage/' + recipe.images[0].image} alt={recipe.name} />
            <NavLink href={route('recipes.show', recipe)} className="block"><h1 className="text-center">{recipe.name}</h1></NavLink>

            <>
                {
                likedByUser ?
                <>
                    <form onSubmit={dislikeRecipe} className="inline-block justify-end">
                        <button>
                            <FcLike size={70} />
                        </button>
                    </form>
                </>
                :
                <>
                    <form onSubmit={likeRecipe} className="inline-block justify-end">
                        <button>
                            <FcLikePlaceholder size={70} />
                        </button>
                    </form>
                    </>
                }
                <p className="inline-block">{ recipe.likes.length }</p>
            </>

        </div>
    )
}