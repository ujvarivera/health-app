import { useForm } from '@inertiajs/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import PrimaryButton from '@/Components/PrimaryButton';
import { BsCheck } from 'react-icons/bs';

export default function GoalsDataTable({ selectedGoals, ...props }) {

    const { delete: destroy, put } = useForm({
    });

    const markAsCompleted = (goal) => {
        put(route('goals.update', goal));
    }

    const onSubmit = (e, goal) => {
        e.preventDefault();
        markAsCompleted(goal);
    };
    
    const completedAtBodyTemplate = (rowData) => {
        if (rowData.completed_at === null) {
            return <form onSubmit={(event) => onSubmit(event, rowData)}><PrimaryButton><BsCheck size={20} />Mark as completed</PrimaryButton></form>
        } else {
            return <div className='text-green-600 font-bold'>{rowData.completed_at}</div>;
        }
    };

    return (
        <DataTable {...props} value={selectedGoals} sortField="created_at" sortOrder={-1} removableSort showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" sortable header="Goal Name"></Column>
            <Column field="measurement_type_name.name" sortable header="Measurement Name"></Column>
            <Column field="value" sortable header="Value"></Column>
            <Column field="measurement_type_name.unit" sortable header="Unit"></Column>
            <Column field="created_at" sortable header="Created At"></Column>
            <Column field="completed_at" sortable header="Completed At" body={completedAtBodyTemplate}></Column>
        </DataTable>
    )
}