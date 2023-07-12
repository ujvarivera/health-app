import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 
import ChartLineComponent from '@/Components/ChartLineComponent';
import { useState, useEffect } from 'react';
import ButtonLink from '@/Components/ButtonLink';

export default function Index({auth, errors, userMeasurements, measurementTypes}) {

    const footer = `In total there are ${userMeasurements ? userMeasurements.length : 0} measurements.`;

    const [labelName,setLabelName] = useState('Weight');
    const [labels, setLabels] = useState(userMeasurements?.filter(item => item.measurement_type_id === 1).map(mes => mes.created_at))
    const [chartData, setChartData] = useState(userMeasurements?.filter(item => item.measurement_type_id === 1).map(mes => mes.value));
    // console.log(userMeasurements[0].measurement_type_name);

    const [measurementTypeId, setMeasurementTypeId] = useState(1);

    useEffect(() => {
        setLabelName(measurementTypes?.filter(item => item.id == measurementTypeId).map(mes => mes.name));
        setChartData(userMeasurements?.filter(item => item.measurement_type_id == measurementTypeId).map(mes => mes.value))
        setLabels(userMeasurements?.filter(item => item.measurement_type_id == measurementTypeId).map(mes => mes.created_at))
    }, [measurementTypeId]);

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Measurements" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                        <div className='mb-4'>
                            <ButtonLink href={route('measurements.create')}>
                                + Add New Measurement
                            </ButtonLink>
                        </div>

                        <span className='mr-4'>Filter:</span>
                        <select 
                            name="measurementType" 
                            id="measurementType"
                            value={measurementTypeId}
                            onChange={(e) => setMeasurementTypeId(e.target.value)}
                            className="inline-block w-full md:w-1/4 px-4 py-2 mt-2 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                        >
                            { measurementTypes && measurementTypes.map((measurement, index) => {
                                return (
                                    <>
                                        <option 
                                            key={measurement.id}
                                            value={measurement.id}
                                            className='pl-6'
                                        >
                                            {measurement.name}
                                        </option>
                                    </>
                                )
                                }) 
                            }
                        </select>

                        <ChartLineComponent labelName={labelName} labels={labels} data={chartData} title='Measurements'/>

                        <h2 className='text-2xl mb-6 mt-20 ml-1 text-purple-600 font-bold'>All measurements</h2>
                        <DataTable value={userMeasurements} footer={footer} sortField="created_at" sortOrder={-1} 
                            removableSort showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                            tableStyle={{ minWidth: '50rem' }}>
                            <Column field="measurement_type_name.name" sortable header="Measurement Type Name"></Column>
                            <Column field="value" sortable header="Value"></Column>
                            <Column field="measurement_type_name.unit" sortable header="Unit"></Column>
                            <Column field="created_at" sortable header="Date"></Column>
                        </DataTable>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
