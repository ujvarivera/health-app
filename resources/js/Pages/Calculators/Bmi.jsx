import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';


export default function Index({auth, errors, userGoals}) {

    const { data, setData, post, processing, errors:err, reset, delete:destroy, put } = useForm({
        weight: '',
        height: ''
    });

    const [bmi, setBmi] = useState('');

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const calculateBMI = () => {
        if( data.weight !== "" && data.height !== "") {   
            var calculated = data.weight / (data.height / 100)**2;
            setBmi(calculated);
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">BMI Calculator</h2>}
        >
            <Head title="BMI Calculator" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <p>BMI = Weight [kg] / Height ^ 2 [m^2]</p>
                            <div className='mt-4'>
                                <InputLabel htmlFor="weight" value="Weight in KG*" />

                                <TextInput
                                    id="weight"
                                    type="number"
                                    step="0.1"
                                    name="weight"
                                    value={data.weight}
                                    placeholder="Type in your weight (kg)"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                />

                                <InputError message={errors.measurementValue} className="mt-2" />

                            </div>

                            <div className='mt-4'>
                                <InputLabel htmlFor="height" value="Height in CM*" />

                                <TextInput
                                    id="height"
                                    type="number"
                                    step="1"
                                    name="height"
                                    value={data.height}
                                    placeholder="Type in your height (cn)"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                />

                                <InputError message={errors.height} className="mt-2" />

                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton onClick={calculateBMI} className="ml-4" disabled={processing}>
                                    Calculate
                                </PrimaryButton>
                            </div>

                            <div className='text-3xl font-bold'>
                                Your BMI: {bmi!=="" && bmi.toFixed(2)}
                            </div>

                            <table class="table-auto mt-8 border-separate border-spacing-y-4 border-spacing-10">
                                <thead>
                                    <tr className='px-6'>
                                        <th>BMI</th>
                                        <th>Weight Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> &lt; 18.5</td>
                                        <td className='text-blue-500'>Underweight</td>
                                    </tr>
                                    <tr>
                                        <td> 18.5 - 24.9</td>
                                        <td className='text-green-500'>Normal weight</td>
                                    </tr>
                                    <tr>
                                        <td> 25 - 29.9 </td>
                                        <td className='text-yellow-500'>Overweight</td>
                                    </tr>
                                    <tr>
                                        <td> 30 - 34.9 </td>
                                        <td className='text-orange-400'>Obesity Class I.</td>
                                    </tr>
                                    <tr>
                                        <td> 35 - 39.9 </td>
                                        <td className='text-orange-500'>Obesity Class II.</td>
                                    </tr>
                                    <tr>
                                        <td> &gt; 40 </td>
                                        <td className='text-red-500'>Obesity Class III.</td>
                                    </tr>
                            
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
