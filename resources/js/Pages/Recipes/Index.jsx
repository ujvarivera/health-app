import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import RecipeList from './Partials/RecipeList';
import FlashMessage from '@/Components/FlashMessage';
import Checkbox from '@/Components/Checkbox';
import ButtonLink from '@/Components/ButtonLink';
import Container from '@/Components/Container';

export default function Index({ auth, errors, flash, recipes }) {

    const [isMine, setIsMine] = useState(false)
    const myRecipes = recipes?.filter(recipe => recipe.user_id == auth?.user?.id)

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Recipes" />

            <Container>

                {
                    flash.success &&
                    <FlashMessage message={flash.success} />
                }

                {
                    auth.user &&
                    <ButtonLink href={route('recipes.create')} className="mt-2 mb-8 inline-block">
                        + New Recipe
                    </ButtonLink>
                }

                {
                    auth?.user &&
                    <div className="flex items-center">
                        <span className='inline-block mr-2'>Filter:</span>
                        <label className="flex items-center inline-block">
                            <Checkbox name="My Recipes" value={isMine} onChange={() => setIsMine(!isMine)} />
                            <span className="ml-2 text-sm text-gray-600 cursor-pointer">My Recipes</span>
                        </label>
                    </div>
                }

                {
                    isMine ?
                        <RecipeList recipes={myRecipes} auth={auth} /> :

                        (recipes.length !== 0 ?
                            <RecipeList recipes={recipes} auth={auth} /> :
                            <p className='text-2xl text-purple-600 font-bold mt-10'>There are no recipes yet.</p>)
                }
            </Container>
        </Layout>
    );
}
