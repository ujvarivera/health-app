import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ExerciseList from './Partials/ExerciseList';
import PrimaryButton from '@/Components/PrimaryButton';
import Container from '@/Components/Container';
import RecommendedExercisesList from './Partials/RecommendedExercisesList';

export default function Index({ auth, errors, exercises, recommendedExercises }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisePerPage, setExercisePerPage] = useState(6);

    const totalExercises = exercises.length;
    const lastExerciseIndex = currentPage * exercisePerPage;
    const firstExerciseIndex = lastExerciseIndex - exercisePerPage;
    const currentExercises = exercises.slice(firstExerciseIndex, lastExerciseIndex);

    function decreaseCurrentPage() {
        currentPage === 1 ?
            setCurrentPage(Math.ceil(totalExercises / exercisePerPage)) :
            setCurrentPage(currentPage - 1);
    }

    function increaseCurrentPage() {
        currentPage === Math.ceil(totalExercises / exercisePerPage) ?
            setCurrentPage(1) :
            setCurrentPage(currentPage + 1);
    }

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToLastPage() {
        setCurrentPage(Math.ceil(totalExercises / exercisePerPage));
    }


    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Exercises" />

            <Container>
                <RecommendedExercisesList recommendedExercises={recommendedExercises}/>

                <div className="mt-2 mb-8 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-2">
                    <PrimaryButton type="text" onClick={goToFirstPage} className="w-48 my-1 sm:w-auto sm:my-0">First Page</PrimaryButton>
                    <PrimaryButton type="text" onClick={decreaseCurrentPage} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Prev</PrimaryButton>
                    <PrimaryButton type="text" onClick={increaseCurrentPage} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Next</PrimaryButton>
                    <PrimaryButton type="text" onClick={goToLastPage} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Last Page</PrimaryButton>
                    <p className="font-medium text-lg text-purple-600">Page {currentPage}.</p>
                </div>

                <ExerciseList currentExercises={currentExercises} />

            </Container>
        </Layout>
    );
}
