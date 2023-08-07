import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import CreateRecipeForm from './Partials/CreateRecipeForm';
import BackButton from '@/Components/BackButton';

export default function Index(props) {

    return (
        <Layout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Recipes" />

            <Container>
                <BackButton href={ route('recipes.index') } /> 
                <CreateRecipeForm />
            </Container>
   
        </Layout>
    );
}
