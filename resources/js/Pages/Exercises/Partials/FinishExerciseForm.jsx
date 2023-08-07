import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function FinishExerciseForm({ exercise }) {

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
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
    )
}