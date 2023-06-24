import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ButtonLink from '@/Components/ButtonLink';
import { BiArrowBack } from 'react-icons/bi';
// import { useRef } from 'react';
import { useState, useEffect } from 'react';

export default function Create({auth, errors, measurementTypes}) {

    const { data, setData, post, processing, errors:err, reset, delete:destroy } = useForm({
        measurementValue: '',
        measurementType: 1,
    });

    const [measurementUnit, setMeasurementUnit] = useState('kg');

    // const selectRef = useRef();

    useEffect(() => {
        var mes = measurementTypes.filter(type => type.id == data.measurementType);
        setMeasurementUnit(mes[0].unit);
    }, [data.measurementType]);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const addMeasurement = (event) => {
        event.preventDefault();
        post(route('measurements.store'));
    }

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Measurements" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <ButtonLink href={route('measurements.index')} className='mb-10'>
                                <BiArrowBack />
                                <span className='ml-1'>Back</span>
                            </ButtonLink>

                            <img src="/measurement.png" alt="Measurement Types" className="m-auto" />

                            <form onSubmit={addMeasurement} className='mt-4'>
                                <div className='md:grid md:grid-cols-2 md:gap-2 m-auto'>

                                    <div className='mt-2'>
                                        <InputLabel htmlFor="measurementType" value="Measurement Type*" />
                                    
                                        <select 
                                            name="measurementType" 
                                            id="measurementType"
                                            value={data.measurementType}
                                            onChange={(e) => setData('measurementType', e.target.value)}
                                            // ref={selectRef}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
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

                                    <div className='mt-2'>
                                        <InputLabel htmlFor="measurementValue" value="Measurement Value*" />

                                        <TextInput
                                            id="measurementValue"
                                            type="number"
                                            step="0.1"
                                            name="measurementValue"
                                            value={data.measurementValue}
                                            placeholder={"Type your value in " + measurementUnit}
                                            className="block w-full"
                                            title="Measurement value is required"
                                            isFocused={true}
                                            onChange={handleOnChange}
                                        />
                                        <InputError message={errors.measurementValue} className="mt-2" />

                                    </div>
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
        </Layout>
    );
}
