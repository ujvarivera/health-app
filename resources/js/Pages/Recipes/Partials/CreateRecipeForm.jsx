import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CreateRecipeForm(props) {

    const { data, setData, post, processing, errors, reset } = useForm({
        recipeName: '',
        ingredients: '',
        description: '',
        time: '30',
        difficulty: '1',
        quantity: '1',
        images: [],
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? 
            event.target.checked : 
            event.target.value);
    };

    function handlePicInput(event){
        setData(event.target.name, event.target.files);
    }

    const uploadRecipe = (event) => {
        event.preventDefault();
        post(route('recipes.store'));
    };

    return (
        <form onSubmit={uploadRecipe} encType="multipart/form-data">
            <div>
                <InputLabel htmlFor="recipeName" value="Recipe Name*" />

                <TextInput
                    id="recipeName"
                    type="text"
                    name="recipeName"
                    value={data.recipeName}
                    title="Recipe name is required"
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleOnChange}
                />

                <InputError message={errors.recipeName} className="mt-2" />
            </div>

            <div class="mt-4">
                <InputLabel htmlFor="ingredients" value="Ingredients*" />

                <TextInput
                    id="ingredients"
                    type="text"
                    name="ingredients"
                    value={data.ingredients}
                    placeholder="3/4 cup flour, 1/2 teaspoon salt"
                    title="Ingredients are required"
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleOnChange}
                />

                <InputError message={errors.recipeName} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="description" value="Description*" />

                <TextInput
                    id="description"
                    type="text"
                    name="description"
                    value={data.description}
                    title="Description is required"
                    className="mt-1 block w-full"
                    autoComplete="current-description"
                    onChange={handleOnChange}
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

            <div class="md:grid md:grid-cols-3 md:gap-3 m-auto">
            <div className="mt-4">
                <InputLabel htmlFor="time" value="Time (in Minutes)*" />

                <TextInput
                    id="time"
                    type="number"
                    name="time"
                    value={data.time}
                    title="Time is required"
                    className="mt-1 inline-block w-full"
                    autoComplete="current-time"
                    onChange={handleOnChange}
                />

                <InputError message={errors.time} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="difficulty" value="Difficulty*" />

                <TextInput
                    id="difficulty"
                    type="number"
                    min="1"
                    step="1"
                    max="5"
                    name="difficulty"
                    value={data.difficulty}
                    title="Difficulty is required"
                    className="mt-1 inline-block w-full"
                    autoComplete="current-difficulty"
                    onChange={handleOnChange}
                />

                <InputError message={errors.difficulty} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="quantity" value="Quantity*" />

                <TextInput
                    id="quantity"
                    type="number"
                    name="quantity"
                    min="1"
                    step="1"
                    max="20"
                    value={data.quantity}
                    title="Quantity is required"
                    className="mt-1 inline-block w-full"
                    autoComplete="current-quantity"
                    onChange={handleOnChange}
                />

                <InputError message={errors.quantity} className="mt-2" />
            </div>
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="images" value="Image(s)*" />
                <TextInput
                    id="images"
                    name="images"
                    type="file"
                    onChange={handlePicInput}
                    // value={data.images}
                    accept="image/png, image/jpg, image/jpeg"
                    multiple
                />
                <InputError message={errors.images} className="mt-2" />
            </div>


            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4" disabled={processing}>
                Upload
                </PrimaryButton>
            </div>
        </form>
    )
}
