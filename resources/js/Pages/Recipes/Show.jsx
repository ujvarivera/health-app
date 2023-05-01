import axios from 'axios';
import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { MdDeleteForever } from 'react-icons/md';

export default function Show({ auth, errors, recipe:r }) {

    const { data, setData, post, processing, errors:err, setError, reset, delete:destroy } = useForm({
        comment: '',
    });

    const [recipe, setRecipe] = useState(r);

    const storeCommentURL = '/recipe/comment';
    // const deleteCommentURL = `/recipes/comments/${comment}`

    const submitComment = (event) => {
        event.preventDefault();
        setError('comment', '');
        // post(route('recipe.comment.store', recipe));
        axios.post(storeCommentURL, {
            recipeId: recipe.id,
            comment: data.comment
          }, {
            headers: {
              'Content-Type': 'application/json',
              // 'X-CSRF-TOKEN': csrfToken
            }
          })
          .then(response => {
            setRecipe(response.data);
          })
          .catch(error => {
            setError('comment', error.response.data.message);
          });

        setData('comment', '');
    };

    const deleteComment = (comment) => {
        // destroy(route('recipe.comment.destroy', comment.id));
        setError('comment', '');
        axios.delete(`/recipes/comments/${comment.id}`)
          .then(response => {
            setRecipe(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }

    const onSubmit = (e, comment) => {
        e.preventDefault();
        deleteComment(comment);
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
                                <p className='my-2'>description: {recipe.description}</p>
                                <p className='my-2'>difficulty: {recipe.difficulty}</p>
                                <p className='my-2'>time in min: {recipe.time_in_min}</p>
                                <p className='my-2'>quantity: for {recipe.quantity} person</p>
                                <p className='my-2'>ingredients:</p>
                                <ul>
                                    { recipe.ingredients && recipe.ingredients.map((ingredient, index) => {
                                        return (
                                            <li key={ingredient.id} className='pl-6'>{ingredient.ingredient}</li>
                                        )
                                    }) }
                                </ul>
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

                                    <InputError message={err.comment} className="mt-2" />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                    Send
                                    </PrimaryButton>
                                </div>
                            </form>
                            <div id="comments">
                                { recipe.comments && recipe.comments.map((comment, index) => {
                                    return (
                                        <div className='my-2' key={comment.id}>
                                            <div className='inline-block'>
                                                <p className='inline-block font-bold'>{ comment.user.username }</p>
                                                { auth.user.id === comment.user.id && 
                                                    <p className='text-red-500 font-bold inline-block pl-2'>ME</p>
                                                }
                                                <p className='pl-4'>{ comment.comment }</p>
                                                <p>{/* comment.created_at */}</p>
                                            </div>
                                            { auth.user.id === comment.user.id && 
                                                <form onSubmit={(e) => onSubmit(e, comment)} className="inline-block float-right">
                                                    <button type="submit">
                                                        <MdDeleteForever size={30} color='red'/>
                                                    </button>
                                                </form>
                                            }
                                        </div>
                                    )
                                }) }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
