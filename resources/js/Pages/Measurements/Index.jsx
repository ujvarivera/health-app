import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

import ChartLineComponent from '@/Components/ChartLineComponent';
import { useState, useEffect } from 'react';
import ButtonLink from '@/Components/ButtonLink';
import Container from '@/Components/Container';
import MeasurementsDataTable from './Partials/MeasurementsDataTable';

export default function Index({ auth, errors, userMeasurements, measurementTypes }) {

    const [labelName, setLabelName] = useState('Weight');
    const [labels, setLabels] = useState(userMeasurements?.filter(item => item.measurement_type_id === 1).map(mes => mes.created_at))
    const [chartData, setChartData] = useState(userMeasurements?.filter(item => item.measurement_type_id === 1).map(mes => mes.value));

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

            <Container>

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
                    {measurementTypes && measurementTypes.map((measurement, index) => {
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

                <ChartLineComponent labelName={labelName} labels={labels} data={chartData} title='Measurements' />

                <MeasurementsDataTable userMeasurements={userMeasurements}/>

            </Container>
        </Layout>
    );
}
