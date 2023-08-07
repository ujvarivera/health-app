import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export default function MeasurementsDataTable({ userMeasurements, ...props }) {

    const footer = `In total there are ${userMeasurements ? userMeasurements.length : 0} measurements.`;

    return (
        <>
            <h2 className='text-2xl mb-6 mt-20 ml-1 text-purple-600 font-bold'>All measurements</h2>
            <DataTable {...props} value={userMeasurements} footer={footer} sortField="created_at" sortOrder={-1}
                removableSort showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="measurement_type_name.name" sortable header="Measurement Type Name"></Column>
                <Column field="value" sortable header="Value"></Column>
                <Column field="measurement_type_name.unit" sortable header="Unit"></Column>
                <Column field="created_at" sortable header="Date"></Column>
            </DataTable>
        </>
    )
}