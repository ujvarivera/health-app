import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SuccessMessage from '@/Components/SuccessMessage';

export default function Show({ auth, errors, nutrition, dailyValues }) {

    const { data, setData, post, processing, errors:err, setError, reset, delete:destroy } = useForm({
        quantity: 1,
        nutrition_id: nutrition.id
    });
    const myCaloriesUrl = '/calories';
    const [successMessage, setSuccessMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    function storeNutrition(e) {
        e.preventDefault();
        axios.post(myCaloriesUrl, {
            quantity: data.quantity,
            nutrition_id: data.nutrition_id
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then(response => {
            setSuccessMessage(response.data.message);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
          })
          .catch(error => {
            setError('quantity', error.response.data.message);
          });

        setData('quantity', 1);
    }
    
    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{nutrition.name}</h2>}
        >
            <Head title="Exercises" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <NavLink href={route('nutrition.index')}>Back</NavLink>

                            {
                                showMessage &&
                                <SuccessMessage message={ successMessage } />
                            }

                            <div className='text-center mb-6'>
                                <h1 className='text-3xl font-bold text-blue-500'>{nutrition.name}</h1>
                            </div>

                            <div className='text-center rounded overflow-hidden shadow-lg'>
                                <h2 className='text-3xl font-bold'>Nutrition Facts</h2>
                                <p>Serving Size: 100 grams (100 g)</p>
                                <p className='text-2xl font-bold'>{nutrition.cal} cal</p>

                                <form onSubmit={storeNutrition}>
                                        <div className="mt-4 inline-block">
                                            <TextInput
                                                id="quantity"
                                                type="number"
                                                step="0.1"
                                                name="quantity"
                                                value={data.quantity}
                                                placeholder="1"
                                                className="mt-1 inline-block"
                                                isFocused={true}
                                                onChange={handleOnChange}
                                            />

                                            <InputError message={err.quantity} className="mt-2" />
                                        </div>
                                        <div className="mt-4 inline-block">
                                            <PrimaryButton className="ml-4" disabled={processing}>
                                            I ate it
                                            </PrimaryButton>
                                        </div>
                                </form>

                                <table class="mx-auto mt-8 border-separate border-spacing-2 border border-slate-400">
                                    <tr className='font-bold pl-40'>
                                        <td></td>
                                        <td></td>
                                        <td>% Daily Value</td>
                                    </tr>
                                    { dailyValues.map((dv, index) => {
                                        const nutrientValue = nutrition[dv.code];
                                        return (
                                            <tr>
                                                <td className='px-4 text-left'>{dv.name}</td>
                                                <td className='px-4 text-right'>{nutrientValue} {dv.unit}</td>
                                                <td className='px-4 text-right'>{Math.round((nutrientValue / dv.dv) * 100)}%</td>
                                            </tr>
                                        )
                                    }) }
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
