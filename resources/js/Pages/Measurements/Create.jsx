import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import BackButton from '@/Components/BackButton';
import Container from '@/Components/Container';
import CreateMeasurementsForm from './Partials/CreateMeasurementsForm';

export default function Create({ auth, errors, measurementTypes }) {

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Measurements" />

            <Container>
                <BackButton href={route('measurements.index')} />
                <img src="/measurement.png" alt="Measurement Types" className="m-auto" />
                <CreateMeasurementsForm measurementTypes={measurementTypes}/>
            </Container>
        </Layout>
    );
}
