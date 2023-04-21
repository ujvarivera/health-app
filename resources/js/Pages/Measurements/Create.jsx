import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({auth, errors, measurementTypes}) {

    const { data, setData, post, processing, errors:err, reset, delete:destroy } = useForm({
        measurementValue: '',
        measurementType: '',
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const addMeasurement = (event) => {
        event.preventDefault();
        post(route('measurements.store'));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add measurements</h2>}
        >
            <Head title="Measurements" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <NavLink href={route('measurements.index')}>
                                Back To My Measurements
                            </NavLink>

                            <form onSubmit={addMeasurement} className='mt-4'>
                                <div>
                                    <InputLabel htmlFor="measurementType" value="Measurement Type" />
                                
                                    <select 
                                        name="measurementType" 
                                        id="measurementType"
                                        value={data.measurementType}
                                        onChange={(e) => setData('measurementType', e.target.value)}
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
                                    <InputLabel htmlFor="measurementValue" value="Measurement Value" />

                                    <TextInput
                                        id="measurementValue"
                                        type="number"
                                        step="0.1"
                                        name="measurementValue"
                                        value={data.measurementValue}
                                        placeholder="Type in your measurement value..."
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.measurementValue} className="mt-2" />

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
