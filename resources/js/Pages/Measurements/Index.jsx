import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 

export default function Index({auth, errors, userMeasurements}) {

    const footer = `In total there are ${userMeasurements ? userMeasurements.length : 0} measurements.`;

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

                        <DataTable value={userMeasurements} footer={footer} sortField="created_at" sortOrder={-1} removableSort  /*sortMode="multiple"*/ showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="measurement_type_name.name" sortable header="Measurement Type Name"></Column>
                            <Column field="value" sortable header="Value"></Column>
                            <Column field="measurement_type_name.unit" sortable header="Unit"></Column>
                            <Column field="created_at" sortable header="Date"></Column>
                        </DataTable>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
