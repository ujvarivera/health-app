import { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 

import { BsCheck } from 'react-icons/bs';
import ButtonLink from '@/Components/ButtonLink';

export default function Index({auth, errors, userGoals}) {

    const { data, setData, post, processing, errors:err, reset, delete:destroy, put } = useForm({
    });
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

    const markAsCompleted = (goal) => {
        put(route('goals.update', goal));
    }

    const onSubmit = (e, goal) => {
        e.preventDefault();
        markAsCompleted(goal);
      };

    const completedAtBodyTemplate = (rowData) => {
        if (rowData.completed_at === null) {
            return <form onSubmit={(event) => onSubmit(event, rowData)}><PrimaryButton><BsCheck size={20}/>Mark as completed</PrimaryButton></form>
        } else {
            return <div className='text-green-600 font-bold'>{rowData.completed_at}</div>;
        }
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="My Goals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                        <ButtonLink href={route('goals.create')}>
                            + Add New Goal
                        </ButtonLink>

                        <img src="/goals.jpg" alt="logo" className="md:w-2/4 m-auto my-10"/>

                        <div className='mt-2 mb-8 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-2'>
                            <PrimaryButton type="text" onClick={() => setSelectedGoals(userGoals)} className="w-48 my-1 sm:w-auto sm:my-0">All</PrimaryButton>
                            <PrimaryButton type="text" onClick={showCompleted} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Completed</PrimaryButton>
                            <PrimaryButton type="text" onClick={showNotCompleted} className="w-48 mx-2 my-1 sm:w-auto sm:my-0">Not Completed</PrimaryButton>
                        </div>

                        <DataTable value={selectedGoals} sortField="created_at" sortOrder={-1} removableSort showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="name" sortable header="Goal Name"></Column>
                            <Column field="measurement_type_name.name" sortable header="Measurement Name"></Column>
                            <Column field="value" sortable header="Value"></Column>
                            <Column field="measurement_type_name.unit" sortable header="Unit"></Column>
                            <Column field="created_at" sortable header="Created At"></Column>
                            <Column field="completed_at" sortable header="Completed At" body={completedAtBodyTemplate}></Column>
                        </DataTable>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
