import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import BackButton from '@/Components/BackButton';
import Heading from '@/Components/Heading';
import Container from '@/Components/Container';
import FinishExerciseForm from './Partials/FinishExerciseForm';

export default function Show({ auth, errors, exercise }) {

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Exercises" />

            <Container>
                <BackButton href={route('exercises.index')} />
                <Heading>{exercise.name}</Heading>

                <div class="md:grid md:grid-cols-2 md:gap-2 m-auto">
                    <img src={exercise.gif_url} alt={exercise.name} className='mx-auto' />
                    <div className='mb-10'>
                        <p className='text-lg'><span className='text-purple-600 font-bold'>Target:</span> {exercise.target}</p>
                        <p className='text-lg'><span className='text-purple-600 font-bold'>Body Part:</span> {exercise.body_part}</p>
                        <p className='text-lg'><span className='text-purple-600 font-bold'>Equipment:</span> {exercise.equipment}</p>
                    </div>
                </div>

                {auth?.user &&
                    <FinishExerciseForm exercise={exercise}/>
                }
            </Container>
        </Layout>
    );
}
