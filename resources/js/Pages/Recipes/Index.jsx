import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import RecipeList from './Partials/RecipeList';
import FlashMessage from '@/Components/FlashMessage';
import Checkbox from '@/Components/Checkbox';
import ButtonLink from '@/Components/ButtonLink';

export default function Index({auth, errors, flash, recipes}) {
    /*
    const [currentPage, setCurrentPage] = useState(1);
    const [recipePerPage, setRecipePerPage] = useState(6);
    var totalRecipes = recipes.length;
    const lastRecipeIndex = currentPage * recipePerPage;
    const firstRecipeIndex = lastRecipeIndex - recipePerPage;
    const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);
    */
    const [isMine, setIsMine] = useState(false)
    const myRecipes= recipes?.filter(recipe => recipe.user_id == auth?.user?.id)

    return (
        <Layout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recipes</h2>}
        >
            <Head title="Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {
                                flash.success && 
                                <FlashMessage message={flash.success}/>
                            }

                            <div className="mt-2 mb-8 inline-block">
                                {
                                    auth.user &&
                                    <ButtonLink href={route('recipes.create')} className='text-sm md:text-lg'>Recipe Upload</ButtonLink>
                                }
                            </div>

                            {
                                auth?.user &&
                                <div className="flex items-center">
                                    <span className='inline-block mr-2'>Filter:</span>
                                    <label className="flex items-center inline-block">
                                        <Checkbox name="My Recipes" value={isMine} onChange={() => setIsMine(!isMine)}/>
                                        <span className="ml-2 text-sm text-gray-600 cursor-pointer">My Recipes</span>
                                    </label>
                                </div>
                            }

                            {
                                isMine ? 
                                <RecipeList recipes={myRecipes} auth={auth}/> :

                                (recipes.length !== 0 ?
                                <RecipeList recipes={recipes} auth={auth}/> :
                                <p>There are no recipes yet.</p>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
