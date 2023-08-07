import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import Container from '@/Components/Container';
import BackButton from '@/Components/BackButton';
import RecipeCommentForm from './Partials/RecipeCommentForm';
import RecipeCarousel from './Partials/RecipeCarousel';
import RecipeComments from './Partials/RecipeComments';

export default function Show({ auth, errors, recipe:r }) {

    const [recipe, setRecipe] = useState(r);


    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Recipes" />

            <Container>
                <BackButton href={route('recipes.index')} />
                <h1 className='text-3xl text-purple-600 font-semibold mb-10 text-center'>{recipe.name}</h1>

                <RecipeCarousel recipe={ recipe }/>

                <div className='my-6'>
                    <div className='border-b-2 border-purple-600 rounded p-4 mb-10 md:mb-20'>
                        <div className='mb-6'>
                            <div className='font-semibold mr-2 text-2xl text-purple-600'>Description</div>
                            <p className='text-lg'>{recipe.description}</p>
                        </div>
                        <div className='my-6'>
                            <div className='font-semibold mr-2 text-2xl text-purple-600'>Difficulty</div>
                            <div className='text-lg'>{recipe.difficulty}</div>
                        </div>
                        <div className='my-6'>
                            <div className='font-semibold mr-2 text-2xl text-purple-600'>Time (min)</div>
                            <div className='text-lg'>{recipe.time_in_min}</div>
                        </div>
                        <div className='my-6'>
                            <div className='font-semibold mr-2 text-2xl text-purple-600'>Quantity</div>
                            <div className='text-lg'>For {recipe.quantity} person(s)</div>
                        </div>
                        <div className='mt-6 font-semibold text-2xl text-purple-600'>Ingredients</div>
                        {recipe.ingredients &&
                            recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <div key={ingredient.id} className='text-lg'>
                                        {ingredient.ingredient}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                {
                    auth?.user ?
                        <>
                            <RecipeCommentForm recipe={ recipe } setRecipe={ setRecipe } />

                            <RecipeComments auth={ auth } recipe={ recipe } setRecipe={ setRecipe }/>
                        </>
                        :
                        <p className='text-red-400 text-lg'>
                            <span className='font-medium'>You need to be logged in to see the comments.</span>
                            <NavLink href={route('login')} className='ml-4 text-red-400'>Go to the log in page. &rarr;</NavLink>
                        </p>
                }

            </Container>
        </Layout>
    );
}
