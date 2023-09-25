import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Container from '@/Components/Container';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Index({ auth, errors, consumptions, dates }) {
    const [currentConsumptions, setCurrentConsumptions] = useState(
        consumptions.filter(consumption => consumption.created_at == dates[0])
    );
    const [selectedDate, setSelectedDate] = useState(dates[0])
    const [expandedRows, setExpandedRows] = useState(null);

    let totalCal = 0;
 
    currentConsumptions.map((c) => {
        totalCal += Number((c.nutrition.cal * c.quantity).toFixed(2));
    })
  

    function onSelectDate(date) {
        setSelectedDate(date)
        setCurrentConsumptions(() => (consumptions.filter(c => c.created_at == date)))
        
        currentConsumptions.map((c) => {
            totalCal += Number((c.nutrition.cal * c.quantity).toFixed(2));
        })
        
    }

    const allCalBodyTemplate = (consumption) => {
        return Number(consumption.nutrition.cal * consumption.quantity).toFixed(2)
    };


    const allowExpansion = (rowData) => {
        // return rowData.nutrition.length > 0;
        return true
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5 className='font-bold'>Details for {data.nutrition.name} (100 g):</h5>
                <div className='ml-4'>
                    <div>Category: {data.nutrition.category}</div>
                    <div>Cal: {data.nutrition.cal} cal</div>
                    <div>Fat: {data.nutrition.fat_g} g</div>
                    <div>Saturated Fat: {data.nutrition.saturated_fat_g} g</div>
                    <div>Protein: {data.nutrition.protein_g} g</div>
                    <div>Carbohydrate: {data.nutrition.carbohydrate_g} g</div>
                    <div>Sugars: {data.nutrition.sugars_g} g</div>
                    <div>Fiber: {data.nutrition.fiber_g} g</div>
                    <div>Cholesterol: {data.nutrition.cholesterol_mg} mg</div>
                    <div>Calcium: {data.nutrition.calcium_mg} mg</div>
                </div>
            </div>
        );
    };

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Diary" />

            <Container>
                <h2 className='text-2xl ml-1 text-purple-600 font-bold'>All consumptions</h2>

                <select
                    name="selectedDate"
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => onSelectDate(e.target.value)}
                    className="inline-block w-full md:w-1/4 px-4 mt-8 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                >
                    {dates && dates.map((date, index) => {
                        return (
                            <>
                                <option
                                    key={date}
                                    value={date}
                                    className='pl-6'
                                >
                                    {date}
                                </option>
                            </>
                        )
                    })
                    }
                </select>

                <div className='text-xl my-10'>
                    <h2 className='mb-2 text-purple-600 font-bold'>Summary</h2>
                    <p>Total Calory Intake: {totalCal}</p>
                </div>

                <DataTable value={currentConsumptions} sortField="created_at" sortOrder={-1}
                    removableSort showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate} expandedRows={expandedRows} dataKey="id">
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="nutrition.name" sortable header="Name"></Column>
                    <Column field="nutrition.category" sortable header="Category"></Column>
                    <Column field="nutrition.cal" sortable header="Cal"></Column>
                    <Column field="quantity" sortable header="Quantity"></Column>
                    <Column body={allCalBodyTemplate} header="Total Cal"></Column>
                    <Column field="created_at" sortable header="Date"></Column>
                </DataTable>
       
            </Container>
        </Layout>
    );
}
