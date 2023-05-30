import NavLink from '@/Components/NavLink';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, errors, exercise }) {
    const { data, setData, post, processing, errors:err, reset, delete:destroy } = useForm({
        exerciseId: exercise.id,
        durationInMin: '',
        note: '',
        calBurned: '',
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const addMyExercise = (event) => {
        event.preventDefault();
        post(route('my-exercises.store'));
    }

    return (
        <Layout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Exercise: {exercise.name}</h2>}
        >
            <Head title="Exercises" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <NavLink href={route('exercises.index')}>Back</NavLink>
                            <h1 className='text-2xl font-bold text-center my-4'>{exercise.name}</h1>
                            <div className='md:columns-2'>
                                <img src={exercise.gif_url} alt={exercise.name} />
                                <div>
                                    <p>Target: {exercise.target}</p>
                                    <p>Body Part: {exercise.body_part}</p>
                                    <p>Equipment: {exercise.equipment}</p>

                                    {auth?.user &&
                                    <form onSubmit={addMyExercise} className='mt-4'>
                                        <div className='mt-4'>
                                            <InputLabel htmlFor="durationInMin" value="Duration In Minutes*" />

                                            <TextInput
                                                id="durationInMin"
                                                type="number"
                                                step="1"
                                                min="1"
                                                name="durationInMin"
                                                value={data.durationInMin}
                                                placeholder="Type in the minutes..."
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={handleOnChange}
                                            />

                                            <InputError message={errors.durationInMin} className="mt-2" />

                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="note" value="Note" />

                                            <TextInput
                                                id="note"
                                                type="text"
                                                name="note"
                                                value={data.note}
                                                placeholder="Type in your notes... (optional)"
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={handleOnChange}
                                            />

                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="calBurned" value="Calory Burned" />

                                            <TextInput
                                                id="calBurned"
                                                type="number"
                                                step="0.1"
                                                name="calBurned"
                                                min="1"
                                                value={data.calBurned}
                                                placeholder="Type in your burned calories... (optional)"
                                                className="mt-1 block w-full"
                                                isFocused={true}
                                                onChange={handleOnChange}
                                            />

                                        </div>

                                        <div className="flex items-center justify-end mt-4">
                                            <PrimaryButton className="ml-4" disabled={processing}>
                                                I made it
                                            </PrimaryButton>
                                        </div>

                                    </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
