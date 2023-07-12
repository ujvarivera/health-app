import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ExerciseList from './Partials/ExerciseList';
import PrimaryButton from '@/Components/PrimaryButton';
import NavLink from '@/Components/NavLink';

export default function Index({ auth, errors, exercises, recommendedExercises }) {
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
                            <div>
                                <h2 className='text-2xl mb-6 ml-1 text-purple-600 font-bold'>Recommended Exercises</h2>
                                <div className='mb-8'>
                                {
                                    recommendedExercises.map((exercise, index) => {
                                        return (
                                            <div className=''>
                                                <NavLink href={route('exercises.show', exercise)}
                                                        className="pb-2 hover:text-purple-600 hover:font-bold">
                                                    {exercise.name}
                                                    <span className='pl-2'> &gt;</span>
                                                </NavLink>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            <div className="mt-2 mb-8 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-2">
                                <PrimaryButton type="text" onClick={goToFirstPage} className="w-48 my-1 sm:w-auto sm:my-0">First Page</PrimaryButton>
                                <PrimaryButton type="text" onClick={decreaseCurrentPage} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Prev</PrimaryButton>
                                <PrimaryButton type="text" onClick={increaseCurrentPage} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Next</PrimaryButton>
                                <PrimaryButton type="text" onClick={goToLastPage} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Last Page</PrimaryButton>
                                <p className="font-medium text-lg text-purple-600">Page {currentPage}.</p>
                            </div>
                            <ExerciseList currentExercises={currentExercises}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
