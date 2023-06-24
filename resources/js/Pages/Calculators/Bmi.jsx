import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import {useEffect} from 'react';


export default function Index({auth, errors, bmiRanges}) {

    const { data, setData, post, processing, errors:err, reset, delete:destroy, put } = useForm({
        weight: '',
        height: ''
    });

    const [bmi, setBmi] = useState('');
    const [bmiClasses, setBmiClasses] = useState('');
    const [bmiError, setBmiError] = useState('');

    
    useEffect(() => {
        bmiRanges && bmiRanges.map((range) => {
            if(bmi >= range.lower && bmi <= range.upper) {
                setBmiClasses(range.classes + ' ' + 'text-3xl font-bold');
            }
        })
    }, [bmi]);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const calculateBMI = () => {
        if((data.weight !== "" && data.weight >= 40) && (data.height !== "" && data.height >= 120 && data.height <= 240)) {   
            var calculated = data.weight / (data.height / 100)**2;
            setBmi(calculated);
            setBmiError("");
        } else {
            setBmi("");
            setBmiError("Invalid values given.");
        }
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="BMI Calculator" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/*<p className='text-yellow-500 text-blue-500 text-green-500 text-orange-400 text-orange-500 text-red-500'></p>*/}
                            <p>BMI = Weight (kg) / Height<sup>2</sup> (m<sup>2</sup>)</p>
                            <div className='mt-4'>
                                <InputLabel htmlFor="weight" value="Weight in KG*" />

                                <TextInput
                                    id="weight"
                                    type="number"
                                    step="0.1"
                                    min="40"
                                    max="300"
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
                                    min="120"
                                    max="240"
                                    step="1"
                                    name="height"
                                    value={data.height}
                                    placeholder="Type in your height (cm)"
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

                            <div>
                                {
                                    bmi !== "" &&
                                    <span className={bmiClasses}>Your BMI: {bmi.toFixed(2)}</span>
                                }
                            </div>
                            <div>
                                {
                                    bmiError !== "" &&
                                    <span className='text-red-500 text-lg'>{bmiError}</span>
                                }
                            </div>

                            <table class="table-auto mt-8 border-separate border-spacing-y-4 border-spacing-10 text-lg">
                                <thead>
                                    <tr className='text-left'>
                                        <th>BMI</th>
                                        <th>Weight Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bmiRanges && bmiRanges.map((range) => {
                                            return (
                                                <tr key={range.id}>
                                                    <td>{range.lower} - {range.upper}</td>
                                                    <td className={range.classes}>{range.status}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                  
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
