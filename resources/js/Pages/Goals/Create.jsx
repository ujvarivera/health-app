import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({auth, errors, measurementTypes}) {

    const { data, setData, post, processing, errors:err, reset, delete:destroy } = useForm({
        goalName: '',
        goalValue: '',
        measurementTypeId: 1,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const addGoal = (event) => {
        event.preventDefault();
        post(route('goals.store'));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Goal</h2>}
        >
            <Head title="Goals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <NavLink href={route('goals.index')}>
                                Back To My Goals
                            </NavLink>

                            <div className='mt-4'>
                                    <InputLabel htmlFor="goalName" value="Goal Name*" />

                                    <TextInput
                                        id="goalName"
                                        type="text"
                                        name="goalName"
                                        value={data.goalName}
                                        placeholder="Type in the name of your goal..."
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.goalName} className="mt-2" />

                                </div>

                            <form onSubmit={addGoal} className='mt-4'>
                                <div>
                                    <InputLabel htmlFor="measurementType" value="Measurement Type*" />
                                
                                    <select 
                                        name="measurementTypeId" 
                                        id="measurementType"
                                        value={data.measurementType}
                                        onChange={(e) => setData('measurementTypeId', e.target.value)}
                                    >
                                    { measurementTypes && measurementTypes.map((measurement, index) => {
                                        return (
                                            <>
                                                <option 
                                                    key={measurement.id}
                                                    value={measurement.id}
                                                    className='pl-6'
                                                >
                                                    {measurement.name}
                                                </option>
                                            </>
                                        )
                                        }) 
                                    }
                                    </select>
                                </div>

                                <div className='mt-4'>
                                    <InputLabel htmlFor="goalValue" value="Goal Value*" />

                                    <TextInput
                                        id="goalValue"
                                        type="number"
                                        step="0.1"
                                        name="goalValue"
                                        value={data.goalValue}
                                        placeholder="Type in your goal value..."
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.goalValue} className="mt-2" />

                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Add
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
