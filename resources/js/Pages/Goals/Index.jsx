import { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import ButtonLink from '@/Components/ButtonLink';
import Container from '@/Components/Container';
import GoalsDataTable from './Partials/GoalsDataTable';

export default function Index({ auth, errors, userGoals }) {

    const [selectedGoals, setSelectedGoals] = useState(userGoals);

    useEffect(() => {
        setSelectedGoals(userGoals);
    }, [userGoals]);

    const showCompleted = () => {
        setSelectedGoals(userGoals.filter(goal => goal.completed_at !== null))
    }

    const showNotCompleted = () => {
        setSelectedGoals(userGoals.filter(goal => goal.completed_at === null))
    }

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="My Goals" />

            <Container>

                <ButtonLink href={route('goals.create')}>
                    + Add New Goal
                </ButtonLink>

                <img src="/goals.jpg" alt="logo" className="md:w-2/4 m-auto my-10" />

                <div className='mt-2 mb-8 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-2'>
                    <PrimaryButton type="text" onClick={() => setSelectedGoals(userGoals)} className="w-48 my-1 sm:w-auto sm:my-0">All</PrimaryButton>
                    <PrimaryButton type="text" onClick={showCompleted} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Completed</PrimaryButton>
                    <PrimaryButton type="text" onClick={showNotCompleted} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Not Completed</PrimaryButton>
                </div>

                <GoalsDataTable selectedGoals={selectedGoals}/>

            </Container>
        </Layout>
    );
}
