import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Show({ auth, errors, recipe }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recipe: {recipe.name}</h2>}
        >
            <Head title="Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <NavLink href={route('recipes.index')}>Back</NavLink>
                            <Carousel autoPlay={true} infiniteLoop={true}>
                            { recipe.images && recipe.images.map((image, index) => {
                                return (
                                    <img src={'/storage/' + image.image} 
                                        alt={recipe.name} 
                                        key={recipe.id} 
                                        /* className='object-contain h-48 w-96' */
                                        /* className='object-scale-down h-60 w-96' */
                                    />
                                )
                            }) }
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
