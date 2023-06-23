import axios from 'axios';

import NavLink from "@/Components/NavLink";
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import Modal from '@/Components/Modal';

export default function RecipeCard({ recipe:r, auth }) {
    const { data, setData, post, processing, errors, reset, delete:destroy } = useForm({
       
    });

    const [recipe, setRecipe] = useState(r);
    const [error, setError] = useState('');
    const [showUnauthenticatedMessage, setShowUnauthenticatedMessage] = useState(false);

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
            setError(error);
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

    if (error?.response?.status === 401) {
      // alert('Please log in to continue');
      setShowUnauthenticatedMessage(true)
      setError('');
    }

    return (
        <div className="my-10">
            <Modal show={showUnauthenticatedMessage} onClose={() => setShowUnauthenticatedMessage(false)}>
                    <div className='m-4'>
                    <h2 className="text-2xl font-medium text-red-500">
                        Unauthenticated.
                    </h2>

                    <p className="mt-1 text-lg text-gray-600">
                       You need to be logged in to like the recipes. 
                       <NavLink href={route('login')} className='ml-4'>Go to the log in page. &rarr;</NavLink>
                    </p>
                    </div>
            </Modal>

            <img src={'/storage/' + recipe.images[0]?.image} alt={recipe.name} className='w-80 h-40'/>
            
            <div className="flex items-center">
              <NavLink href={route('recipes.show', recipe)} className="flex items-center">
                <h1 className="text-center text-purple-600 font-semibold">{recipe.name}</h1>
              </NavLink>

              <div className="ml-auto flex items-center">
                <form onSubmit={likedByUser ? dislikeRecipe : likeRecipe} className="inline-block">
                  <button className="focus:outline-none">
                    {likedByUser ? <FcLike size={40} /> : <FcLikePlaceholder size={40} />}
                  </button>
                </form>

                <p className="inline-block ml-2">{recipe.likes.length}</p>
              </div>
            </div>


            {/*
              auth?.user &&
              <p className={auth?.user?.username == recipe.user.username ? 'text-green-600' : ''}>By: {recipe.user.username}</p>
            */}
        </div>
    )
}