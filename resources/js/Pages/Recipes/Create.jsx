import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Index(props) {

    const { data, setData, post, processing, errors, reset } = useForm({
        recipeName: '',
        description: '',
        time: '30',
        difficulty: '1',
        quantity: '1',
        images: [],
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    function handlePicInput(event){
        /*
        let images = event.target.files
        let fd = new FormData()
        fd.append("images", images);
        */
        setData(event.target.name, event.target.files);
    }

    const uploadRecipe = (event) => {
        event.preventDefault();
        post(route('recipes.store'));
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recipes</h2>}
        >
            <Head title="Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
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

                                <div className="mt-4">
                                    <InputLabel htmlFor="time" value="Time*" />

                                    <TextInput
                                        id="time"
                                        type="number"
                                        name="time"
                                        value={data.time}
                                        title="Time is required"
                                        className="mt-1 inline-block"
                                        autoComplete="current-time"
                                        onChange={handleOnChange}
                                    />
                                    <p className='inline-block'>Minutes</p>

                                    <InputError message={errors.time} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="difficulty" value="Difficulty*" />

                                    <TextInput
                                        id="difficulty"
                                        type="number"
                                        min="1"
                                        max="5"
                                        name="difficulty"
                                        value={data.difficulty}
                                        title="Difficulty is required"
                                        className="mt-1 inline-block"
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
                                        value={data.quantity}
                                        title="Quantity is required"
                                        className="mt-1 inline-block"
                                        autoComplete="current-quantity"
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>

                                <div className="mt-4">
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

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
