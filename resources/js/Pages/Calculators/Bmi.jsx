import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Container from '@/Components/Container';
import BmiCalculator from './Partials/BmiCalculator';
import BmiInfoTable from './Partials/BmiInfoTable';

export default function Index({ auth, errors, bmiRanges }) {

    const [bmi, setBmi] = useState(''); // auth user's BMI
    const [bmiError, setBmiError] = useState(''); // error if wrong data given
    const [bmiClasses, setBmiClasses] = useState('');

    useEffect(() => {
        bmiRanges && bmiRanges.map((range) => {
            if (bmi >= range.lower && bmi <= range.upper) {
                setBmiClasses(range.classes + ' ' + 'text-3xl font-bold');
            }
        })
    }, [bmi]);

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="BMI Calculator" />

            <Container>
                <BmiCalculator bmi={bmi} setBmi={setBmi} bmiError={bmiError} setBmiError={setBmiError} bmiClasses={bmiClasses}/>
                <BmiInfoTable bmiRanges={bmiRanges} />
            </Container>
        </Layout>
    );
}
