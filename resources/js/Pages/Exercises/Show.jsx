import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, errors, exercise }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Exercise: {exercise.name}</h2>}
        >
            <Head title="Exercises" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <NavLink href={route('exercises.index')}>Back</NavLink>
                            <h1>{exercise.name}</h1>
                            <img src={exercise.gif_url} alt={exercise.name} />
                            <p>Target: {exercise.target}</p>
                            <p>Body Part: {exercise.body_part}</p>
                            <p>Equipment: {exercise.equipment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
