import { Link, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Hero from '@/Components/Hero';

export default function Welcome(props) {
    return (
        <Layout
        auth={props.auth}
        errors={props.errors}
        >
            <Head title="Homepage" />
            <>
                <Hero auth={props.auth}/>
            </>

        </Layout>
    );
}
