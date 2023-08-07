import axios from 'axios';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function RecipeCommentForm({ recipe, setRecipe }) {

    const { data, setData, post, processing, errors: err, setError, reset, delete: destroy } = useForm({
        comment: '',
    });

    const storeCommentURL = '/recipe/comment';

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

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
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
    )
}
