import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ExerciseList from './Partials/ExerciseList';
import SecondaryButton from '@/Components/SecondaryButton';


export default function Index({ auth, errors, exercises }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisePerPage, setExercisePerPage] = useState(6);
    // const [slicedExercisesList, setSlicedExercisesList] = useState([]);

    const totalExercises = exercises.length;
    const lastExerciseIndex = currentPage * exercisePerPage;
    const firstExerciseIndex = lastExerciseIndex - exercisePerPage;
    // setSlicedExercisesList(exercises.slice(firstExerciseIndex, lastExerciseIndex));
    const currentExercises = exercises.slice(firstExerciseIndex, lastExerciseIndex);

    function decreaseCurrentPage() {
        currentPage === 1 ? 
            setCurrentPage(Math.ceil(totalExercises / exercisePerPage)) : 
            setCurrentPage(currentPage - 1);
        // console.log(currentPage);
    }

    function increaseCurrentPage() {
        currentPage === Math.ceil(totalExercises / exercisePerPage) ? 
            setCurrentPage(1) : 
            setCurrentPage(currentPage + 1);
        // console.log(currentPage);
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mt-2 mb-8 inline-block">
                                <SecondaryButton type="text" onClick={goToFirstPage}>First Page</SecondaryButton>
                                <SecondaryButton type="text" onClick={decreaseCurrentPage}>Prev</SecondaryButton>
                                <SecondaryButton type="text" onClick={increaseCurrentPage}>Next</SecondaryButton>
                                <SecondaryButton type="text" onClick={goToLastPage}>Last Page</SecondaryButton>
                            </div>
                            <p className="inline-block ml-2">Page {currentPage}.</p>
                            <ExerciseList currentExercises={currentExercises}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
