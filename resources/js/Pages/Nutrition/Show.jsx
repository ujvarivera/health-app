import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, errors, nutrition }) {

    return (
        <AuthenticatedLayout
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
                            
                            <div className='text-center mb-6'>
                                <h1 className='text-3xl font-bold text-blue-500'>{nutrition.name}</h1>
                                <p>Serving Size: 100 g</p>
                            </div>

                            <div className='text-center rounded overflow-hidden shadow-lg'>
                                <h2 className='text-3xl font-bold'>Nutrition Facts</h2>
                                <p>Serving Size: 100 grams (100 g)</p>
                                <p className='text-2xl font-bold'>Calories {nutrition.cal}</p>
                                <p className='font-bold pl-40'>% Daily Value</p>
                                <div>
                                    <span className='px-4'>Total Fat </span>
                                    <span className='px-4'>{nutrition.fat_g} g</span>
                                    <span className='px-4'>{Math.round((nutrition.fat_g / 78) * 100)} %</span>
                                </div>
                                <div>
                                    <span className='px-4'>Saturated Fat </span>
                                    <span className='px-4'>{nutrition.saturated_fat_g} g</span>
                                    <span className='px-4'>{Math.round((nutrition.saturated_fat_g / 20) * 100)} %</span>
                                </div>
                                <div>
                                    <span className='px-4'>Cholesterol </span>
                                    <span className='px-4'>{nutrition.cholesterol_mg} mg</span>
                                    <span className='px-4'>{Math.round((nutrition.cholesterol_mg / 300) * 100)} %</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
