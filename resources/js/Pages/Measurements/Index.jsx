import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

export default function Index({auth, errors, userMeasurements}) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My measurements</h2>}
        >
            <Head title="Measurements" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                        <NavLink href={route('measurements.create')}>
                            Add New Measurement
                        </NavLink>

                        <NavLink href={route('goals.create')}>
                            Add New Goal
                        </NavLink>

                        { userMeasurements.measurements && userMeasurements.measurements.map((measurement, index) => {
                            return (
                                <div key={measurement.id} className='mt-4'>
                                    <p>{measurement.measurement_type_name.name} {measurement.value} {measurement.measurement_type_name.unit} {measurement.created_at}</p>
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
