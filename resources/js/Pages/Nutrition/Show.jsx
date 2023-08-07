import axios from 'axios';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SuccessMessage from '@/Components/SuccessMessage';
import BackButton from '@/Components/BackButton';
import Container from '@/Components/Container';
import AuthenticateModal from '@/Components/AuthenticateModal';
import NutritionIntakeForm from './Partials/NutritionIntakeForm';
import Heading from '@/Components/Heading';
import NutritionDailyValues from './Partials/NutritionDailyValues';

export default function Show({ auth, errors, nutrition, dailyValues }) {

    const [successMessage, setSuccessMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showUnauthenticatedMessage, setShowUnauthenticatedMessage] = useState(false);
    
    const { data, setData, processing, errors:err, setError, reset, delete: destroy } = useForm({
        quantity: 1,
        nutrition_id: nutrition.id
    });

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Nutrition" />

            <Container>

                <BackButton href={route('nutrition.index')} />
                <AuthenticateModal showUnauthenticatedMessage={showUnauthenticatedMessage} setShowUnauthenticatedMessage={setShowUnauthenticatedMessage}/>

                {
                    showMessage &&
                    <SuccessMessage message={successMessage} />
                }

                <div className="text-center mb-6">
                    <Heading>{nutrition.name}</Heading>
                    <div className="mx-auto md:w-80 mt-2">
                        <h2 className="text-2xl font-bold text-purple-600 bg-gray-400 bg-opacity-30">
                            {nutrition.category}
                        </h2>
                    </div>
                </div>

                <div className='text-center rounded overflow-hidden'>
                    <h2 className='text-3xl font-bold'>Nutrition Facts</h2>
                    <p className='text-lg'>Serving Size: {(100 * data.quantity).toFixed(2)} grams ({(100 * data.quantity).toFixed(2)} g)</p>
                    <p className='text-2xl font-bold text-purple-600'>{(nutrition.cal * data.quantity).toFixed(2)} cal</p>

                    <NutritionIntakeForm 
                        nutrition={nutrition} setSuccessMessage={setSuccessMessage} setShowMessage={setShowMessage} 
                        data={data} setData={setData} processing={processing} 
                        setShowUnauthenticatedMessage={setShowUnauthenticatedMessage}/>

                    <NutritionDailyValues dailyValues={dailyValues} nutrition={nutrition} data={data}/>
                </div>

            </Container>
        </Layout>
    );
}
