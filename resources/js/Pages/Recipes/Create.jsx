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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <BackButton href={ route('recipes.index') } /> 
                            <CreateRecipeForm />

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
