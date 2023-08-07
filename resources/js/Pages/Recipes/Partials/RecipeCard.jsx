
import NavLink from "@/Components/NavLink";
import { useState } from 'react';
import RecipeLikeForm from "./RecipeLikeForm";
import AuthenticateModal from "@/Components/AuthenticateModal";

export default function RecipeCard({ recipe: r, auth }) {

  const [recipe, setRecipe] = useState(r);
  const [error, setError] = useState('');
  const [showUnauthenticatedMessage, setShowUnauthenticatedMessage] = useState(false);
  var likedByUser = recipe.likes.filter(like => like.user_id === auth?.user?.id).length > 0;

  if (error?.response?.status === 401) {
    setShowUnauthenticatedMessage(true)
    setError('');
  }

  return (
    <div className="my-10">

      <AuthenticateModal
        showUnauthenticatedMessage={showUnauthenticatedMessage}
        setShowUnauthenticatedMessage={setShowUnauthenticatedMessage}
      />
      {recipe.images.length > 0 ?
        <img src={'/storage/' + recipe.images[0]?.image} alt={recipe.name} className='w-80 h-40' /> :
        <img src='/meal_not_found.jpg' alt="Image Not Found" className='w-80 h-40' />
      }
      <div className="flex items-center">
        <NavLink href={route('recipes.show', recipe)} className="flex items-center text-center text-purple-600 font-semibold">
          {recipe.name}
        </NavLink>

        <div className="ml-auto flex items-center">
          <RecipeLikeForm 
            recipe={recipe} 
            setRecipe={setRecipe} 
            likedByUser={likedByUser}
            setError={setError}
          />
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