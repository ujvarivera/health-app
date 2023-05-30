import axios from 'axios';

import NavLink from "@/Components/NavLink";
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

export default function RecipeCard({ recipe:r, auth }) {
    const { data, setData, post, processing, errors, reset, delete:destroy } = useForm({
       
    });

    const [recipe, setRecipe] = useState(r);
    var likedByUser = recipe.likes.filter(like => like.user_id === auth?.user?.id).length > 0;

    const recipeLikeUrl = '/recipe/like';
    const recipeDislikeUrl = `/recipe/likes/${recipe.id}`;

    function likeRecipe(event) {
        event.preventDefault();
        // post(route('recipe.likes.store', recipe));
        // console.log(csrfToken);
        axios.post(recipeLikeUrl, {
            recipeId: recipe.id
          }, {
            headers: {
              'Content-Type': 'application/json',
              // 'X-CSRF-TOKEN': csrfToken
            }
          })
          .then(response => {
            // console.log(response.data);
            setRecipe(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }

    
    function dislikeRecipe(event) {
        event.preventDefault();
        // destroy(route('recipe.likes.destroy', recipe));
        axios.delete(recipeDislikeUrl)
          .then(response => {
            // console.log(response.data);
            setRecipe(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }
    

    return (
        <div className="my-10">
            <img src={'/storage/' + recipe.images[0].image} alt={recipe.name} className='w-80 h-40'/>
            <NavLink href={route('recipes.show', recipe)} className="inline-block float-left mt-10"><h1 className="text-center">{recipe.name}</h1></NavLink>

            <div className='inline-block float-right'>
                <form onSubmit={likedByUser ? dislikeRecipe : likeRecipe} className="inline-block">
                  <button>
                    {
                      likedByUser ? <FcLike size={70} /> : <FcLikePlaceholder size={70} />
                    }
                            
                  </button>
                  </form>
          
                <p className="inline-block">{ recipe.likes.length }</p>
            </div>

        </div>
    )
}