import { Link, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome(props) {
    return (
        <Layout>
            <Head title="Welcome" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Welcome to the Health App!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
