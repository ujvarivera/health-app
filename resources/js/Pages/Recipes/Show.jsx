import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, errors, recipe }) {

    const { data, setData, post, processing, err, reset } = useForm({
        comment: '',
    });

    const submitComment = (event) => {
        event.preventDefault();
        post(route('recipe.comment.store', recipe));
        setData('comment', '');
    };

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

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

                            <div className='my-6'>
                                <p>description: {recipe.description}</p>
                                <p>difficulty: {recipe.difficulty}</p>
                                <p>time in min: {recipe.time_in_min}</p>
                                <p>quantity: for {recipe.quantity} person</p>
                            </div>

                            <form onSubmit={submitComment}>
                                <div>
                                    <InputLabel htmlFor="comment" value="Comment" />

                                    <TextInput
                                        id="comment"
                                        type="text"
                                        name="comment"
                                        value={data.comment}
                                        placeholder="Type in your comment..."
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                    Send
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div id="comments">

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
