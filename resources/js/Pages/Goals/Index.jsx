import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({auth, errors, userGoals}) {

    const { data, setData, post, processing, errors:err, reset, delete:destroy, put } = useForm({
    });

    const markAsCompleted = (goal) => {
        put(route('goals.update', goal));
    }

    const onSubmit = (e, goal) => {
        e.preventDefault();
        markAsCompleted(goal);
      };

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Goals</h2>}
        >
            <Head title="My Goals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                        <NavLink href={route('goals.create')}>
                            Add New Goal
                        </NavLink>

                        { userGoals && userGoals.map((goal) => {
                            return (
                                <div key={goal.id} className='mt-4'>
                                    <p>Goal value: {goal.value}</p>
                                    <p>Name of the goal: {goal.name}</p>
                                    <p>Measurement name: {goal.measurement_type_name.name}</p>
                                    <p>Unit: {goal.measurement_type_name.unit}</p>
                                    {
                                        goal.completed_at ?
                                        <p className='text-green-600'>Completed at {goal.completed_at}</p> :
                                        <form onSubmit={(event) => onSubmit(event, goal)}>
                                            <PrimaryButton>Mark as completed</PrimaryButton>
                                        </form>
                                    }
                                </div>      
                            )
                            }) 
                        }

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
