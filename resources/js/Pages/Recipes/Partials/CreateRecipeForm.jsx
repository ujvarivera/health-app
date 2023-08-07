import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import FormInput from '@/Components/Forms/FormInput';

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
            <FormInput 
                inputName="recipeName" 
                inputValue={data.recipeName} 
                labelName="Recipe Name*" 
                handleOnChange={handleOnChange} 
                error={errors.recipeName}
                title="Recipe Name is required"
                isFocused
            />
            
            <FormInput 
                inputName="description" 
                inputValue={data.description} 
                labelName="Description*" 
                handleOnChange={handleOnChange} 
                error={errors.description}
                title="Description is required"
            />
            
            <FormInput 
                inputName="ingredients" 
                inputValue={data.ingredients} 
                labelName="Ingredients*" 
                handleOnChange={handleOnChange}
                error={errors.ingredients}
                placeholder="3/4 cup flour, 1/2 teaspoon salt"
                title="Ingredients are required"
            />


            <div className="md:grid md:grid-cols-3 md:gap-3 m-auto">
                <FormInput 
                    inputName="time" 
                    inputValue={data.time} 
                    inputType="number"
                    labelName="Time*" 
                    handleOnChange={handleOnChange}
                    error={errors.time}
                    title="Time is required"
                />

                <FormInput 
                    inputName="difficulty" 
                    inputValue={data.difficulty} 
                    inputType="number"
                    labelName="Difficulty*"
                    handleOnChange={handleOnChange}
                    error={errors.difficulty}
                    min="1"
                    step="1"
                    max="5"
                    title="Difficulty is required"
                />

                <FormInput 
                    inputName="quantity" 
                    inputValue={data.quantity} 
                    inputType="number"
                    labelName="Quantity*"
                    handleOnChange={handleOnChange}
                    error={errors.quantity}
                    min="1"
                    step="1"
                    max="20"
                    title="Quantity is required"
                />
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
