import ButtonLink from '@/Components/ButtonLink';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { BiArrowBack } from 'react-icons/bi';

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
        >
            <Head title="Exercises" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ButtonLink href={route('exercises.index')} className='mb-10 text-sm md:text-lg'>
                                <BiArrowBack />
                                <span className='ml-1'>Back</span>
                            </ButtonLink>
                            <h1 className='text-2xl font-bold text-center mb-10 text-purple-600'>{exercise.name}</h1>
                                
                            <div class="md:grid md:grid-cols-2 md:gap-2 m-auto">
                                <img src={exercise.gif_url} alt={exercise.name} className='mx-auto'/>
                                <div className='mb-10'>  
                                    <p className='text-lg'><span className='text-purple-600 font-bold'>Target:</span> {exercise.target}</p>
                                    <p className='text-lg'><span className='text-purple-600 font-bold'>Body Part:</span> {exercise.body_part}</p>
                                    <p className='text-lg'><span className='text-purple-600 font-bold'>Equipment:</span> {exercise.equipment}</p>
                                </div>
                            </div>

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
                                        <InputLabel htmlFor="note" value="Note (Optional)" />

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
                                        <InputLabel htmlFor="calBurned" value="Calory Burned (Optional)" />

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
        </Layout>
    );
}
