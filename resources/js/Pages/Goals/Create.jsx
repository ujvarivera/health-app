import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import BackButton from '@/Components/BackButton';
import Container from '@/Components/Container';
import CreateGoalForm from './Partials/CreateGoalForm';

export default function Index({ auth, errors, measurementTypes }) {

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Goals" />

            <Container>
                <BackButton href={route('goals.index')} />
                <CreateGoalForm measurementTypes={ measurementTypes }/>
            </Container>
        </Layout>
    );
}
