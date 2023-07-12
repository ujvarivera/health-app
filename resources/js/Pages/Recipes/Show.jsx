import axios from 'axios';
import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { MdDeleteForever } from 'react-icons/md';
import ButtonLink from '@/Components/ButtonLink';
import { BiArrowBack } from 'react-icons/bi';

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
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ButtonLink href={route('recipes.index')} className='mb-10 text-sm md:text-lg'>
                                <BiArrowBack />
                                <span className='ml-1'>Back</span>
                            </ButtonLink>
                            <h1 className='text-3xl text-purple-600 font-semibold mb-10 text-center'>{recipe.name}</h1>
                            <Carousel autoPlay={true} infiniteLoop={true}>
                            { recipe.images && recipe.images.map((image, index) => {
                                return (
                                    <img src={'/storage/' + image.image} 
                                        alt={recipe.name} 
                                        key={recipe.id} 
                                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}                                    />
                                )
                            }) }
                            </Carousel>

                            <div className='my-6'>
                                <div className='border-b-2 border-purple-600 rounded p-4 mb-10 md:mb-20'>
                                    <p className='mb-6'>
                                        <div className='font-semibold mr-2 text-2xl text-purple-600'>Description</div>
                                        <div className='text-lg'>{recipe.description}</div>
                                    </p>
                                    <p className='my-6'>
                                        <div className='font-semibold mr-2 text-2xl text-purple-600'>Difficulty</div>
                                        <div className='text-lg'>{recipe.difficulty}</div>
                                    </p>
                                    <p className='my-6'>
                                        <div className='font-semibold mr-2 text-2xl text-purple-600'>Time (min)</div>
                                        <div className='text-lg'>{recipe.time_in_min}</div>
                                    </p>
                                    <p className='my-6'>
                                        <div className='font-semibold mr-2 text-2xl text-purple-600'>Quantity</div>
                                        <div className='text-lg'>For {recipe.quantity} person(s)</div>
                                    </p>
                                    <p className='mt-6 font-semibold text-2xl text-purple-600'>Ingredients</p>
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
                                            <PrimaryButton className="ml-4 mb-10" disabled={processing}>
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
                                                        { auth?.user?.id === comment.user.id && 
                                                            <p className='text-red-500 font-bold inline-block pl-2'>ME</p>
                                                        }
                                                        <p className='pl-4'>{ comment.comment }</p>
                                                        <p>{/* comment.created_at */}</p>
                                                    </div>
                                                    { auth?.user?.id === comment.user.id && 
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
                                </>
                                :
                                <p className='text-red-400 text-lg'>
                                    <span className='font-medium'>You need to be logged in to see the comments.</span>
                                    <NavLink href={route('login')} className='ml-4 text-red-400'>Go to the log in page. &rarr;</NavLink>
                                </p>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
