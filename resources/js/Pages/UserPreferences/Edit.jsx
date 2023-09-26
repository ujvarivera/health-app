import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import BackButton from '@/Components/BackButton';
import Container from '@/Components/Container';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/Button';
import NavLink from '@/Components/NavLink';
import { MdDeleteForever } from 'react-icons/md';
import { useState } from 'react';

export default function Edit({ auth, errors: err, preferences, exerciseProperties, bodyParts, equipments, targets }) {

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        preferenceProp: exerciseProperties[0],
        preferenceValue: bodyParts[0],
    });
    const [preferenceValues, setPreferenceValues] = useState(bodyParts);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const addPreference = (event) => {
        event.preventDefault();
        post(route('recommendation.store'));
    }

    //TODO: has some bugs
    function changePreferenceValues(prop) {
        setData('preferenceProp', prop);
        if (prop == exerciseProperties[0]) {
            setPreferenceValues(bodyParts)
        } else if (prop == exerciseProperties[1]) {
            setPreferenceValues(equipments)
        } else if (prop == exerciseProperties[2]) {
            setPreferenceValues(targets)
        }
    } 

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Preferences" />

            <Container>
                <BackButton href={route('exercises.index')} />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2 pb-2">
                    <table className="w-full text-left text-gray-500 dark:text-gray-400">
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Value</th>
                                {
                                    /*
                                    <th>Actions</th>
                                    */
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                preferences.map((pref) => {
                                    return (
                                        <tr key={pref.id}>
                                            <td>{pref.prop}</td>
                                            <td>{pref.value}</td>
                                            {
                                                /*
                                                <td>
                                                <form onSubmit={}>
                                                    <button type="submit">
                                                        <MdDeleteForever size={30} color='red' />
                                                    </button>
                                                </form>
                                                </td>
                                                */
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>


                <form onSubmit={addPreference} className='mt-10'>
                    <div className='mt-4'>
                        <InputLabel htmlFor="preferenceProp" value="Property*" />

                        <select
                            name="preferenceProp"
                            id="preferenceProp"
                            value={data.preferenceProp}
                            onChange={(e) => changePreferenceValues(e.target.value)}
                            className="inline-block w-full md:w-1/4 px-4 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                        >
                            {exerciseProperties && exerciseProperties.map((prop, index) => {
                                return (
                                    <>
                                        <option
                                            key={prop}
                                            value={prop}
                                            className='pl-6'
                                        >
                                            {prop}
                                        </option>
                                    </>
                                )
                            })
                            }
                        </select>

                        <InputError message={errors.preferenceProp} className="mt-2" />

                    </div>

                    <div className='mt-4'>
                        <InputLabel htmlFor="preferenceValue" value="Value*" />

                        <select
                            name="preferenceValue"
                            id="preferenceValue"
                            value={data.preferenceValue}
                            onChange={handleOnChange}
                            className="inline-block w-full md:w-1/4 px-4 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                        >
                            {preferenceValues && preferenceValues.map((prefValue, index) => {
                                return (
                                    <>
                                        <option
                                            key={prefValue}
                                            value={prefValue}
                                            className='pl-6'
                                        >
                                            {prefValue}
                                        </option>
                                    </>
                                )
                            })
                            }
                        </select>

                        <InputError message={errors.preferenceValue} className="mt-2" />

                    </div>

                    <div className="flex items-center mt-4">
                        <PrimaryButton disabled={processing}>
                            Add
                        </PrimaryButton>
                    </div>
                </form>
            </Container>
        </Layout>
    );
}
