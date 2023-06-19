import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, errors, nutrition, dailyValues }) {

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

                            <div className='text-center mb-6'>
                                <h1 className='text-3xl font-bold text-blue-500'>{nutrition.name}</h1>
                            </div>

                            <div className='text-center rounded overflow-hidden shadow-lg'>
                                <h2 className='text-3xl font-bold'>Nutrition Facts</h2>
                                <p>Serving Size: 100 grams (100 g)</p>
                                <p className='text-2xl font-bold'>{nutrition.cal} cal</p>
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
