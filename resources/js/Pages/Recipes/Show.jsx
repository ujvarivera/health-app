import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import AuthenticateText from '@/Components/AuthenticateText';
import BackButton from '@/Components/BackButton';
import Container from '@/Components/Container';
import Heading from '@/Components/Heading';
import TextSection from '@/Components/TextSection';
import TextSectionContainer from '@/Components/TextSectionContainer';
import IngredientsList from './Partials/IngredientsList';
import RecipeCarousel from './Partials/RecipeCarousel';
import RecipeComments from './Partials/RecipeComments';
import RecipeCommentForm from './Partials/RecipeCommentForm';

export default function Show({ auth, errors, recipe: r }) {

    const [recipe, setRecipe] = useState(r);

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Recipes" />

            <Container>
                <BackButton href={route('recipes.index')} />

                <Heading>{ recipe.name }</Heading>

                <RecipeCarousel recipe={recipe} />

                <TextSectionContainer>
                    <TextSection title="Description" value={recipe.description} />
                    <TextSection title="Difficulty" value={recipe.difficulty} />
                    <TextSection title="Time (in min)" value={recipe.time_in_min} />
                    <TextSection title="Quantity" value={recipe.quantity} />
                    <IngredientsList ingredients={recipe.ingredients} />
                </TextSectionContainer>

                {
                    auth?.user ?
                        <>
                            <RecipeCommentForm recipe={recipe} setRecipe={setRecipe} />
                            <RecipeComments auth={auth} recipe={recipe} setRecipe={setRecipe} />
                        </>
                        :
                        <AuthenticateText>
                            You need to be logged in to see the comments.
                        </AuthenticateText>
                }

            </Container>
        </Layout>
    );
}
