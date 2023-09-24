import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Container from '@/Components/Container';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export default function Index({ auth, errors, consumptions, dates }) {

    const footer = `In total there are ${consumptions ? consumptions.length : 0} consumptions.`;

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Diary" />

            <Container>
                <h2 className='text-2xl mb-6 mt-20 ml-1 text-purple-600 font-bold'>All consumptions</h2>
                <DataTable value={consumptions} footer={footer} sortField="created_at" sortOrder={-1}
                    removableSort showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nutrition.name" sortable header="Name"></Column>
                    <Column field="nutrition.category" sortable header="Category"></Column>
                    <Column field="nutrition.cal" sortable header="Cal"></Column>
                    <Column field="quantity" sortable header="Quantity"></Column>
                    <Column field="created_at" sortable header="Date"></Column>
                </DataTable>
       
            </Container>
        </Layout>
    );
}
