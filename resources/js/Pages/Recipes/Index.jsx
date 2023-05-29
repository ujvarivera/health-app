import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import RecipeList from './Partials/RecipeList';
import FlashMessage from '@/Components/FlashMessage';

export default function Index({auth, errors, flash, recipes}) {
    /*
    const [currentPage, setCurrentPage] = useState(1);
    const [recipePerPage, setRecipePerPage] = useState(6);
    var totalRecipes = recipes.length;
    const lastRecipeIndex = currentPage * recipePerPage;
    const firstRecipeIndex = lastRecipeIndex - recipePerPage;
    const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);
    */

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
                                <NavLink href={route('recipes.create')}>Recipe Upload</NavLink>
                            </div>

                            <RecipeList recipes={recipes} auth={auth}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
