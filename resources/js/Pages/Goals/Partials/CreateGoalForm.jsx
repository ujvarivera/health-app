import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function CreateGoalForm({ measurementTypes }) {
    const { data, setData, post, processing, errors, reset, delete:destroy } = useForm({
        goalName: '',
        goalValue: '',
        measurementTypeId: 1,
    });

    const [measurementUnit, setMeasurementUnit] = useState('kg');

    useEffect(() => {
        var mes = measurementTypes.filter(type => type.id == data.measurementTypeId);
        setMeasurementUnit(mes[0].unit);
    }, [data.measurementTypeId]);


    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const addGoal = (event) => {
        event.preventDefault();
        post(route('goals.store'));
    }

    return (
        <form onSubmit={addGoal} className='mt-4'>
            <div className='mt-4'>
                <InputLabel htmlFor="goalName" value="Goal Name (Optional)" />

                <TextInput
                    id="goalName"
                    type="text"
                    name="goalName"
                    value={data.goalName}
                    placeholder="Type in the name of your goal..."
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleOnChange}
                />

                <InputError message={errors.goalName} className="mt-2" />

            </div>

            <div>
                <InputLabel htmlFor="measurementType" value="Measurement Type*" />

                <select
                    name="measurementTypeId"
                    id="measurementType"
                    value={data.measurementTypeId}
                    onChange={(e) => setData('measurementTypeId', e.target.value)}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
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
            </div>

            <div className='mt-4'>
                <InputLabel htmlFor="goalValue" value={"Goal Value (" + measurementUnit + ")*"} />

                <TextInput
                    id="goalValue"
                    type="number"
                    step="0.1"
                    name="goalValue"
                    value={data.goalValue}
                    placeholder={" Type in your goal value..."}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleOnChange}
                />

                <InputError message={errors.goalValue} className="mt-2" />

            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4" disabled={processing}>
                    Add
                </PrimaryButton>
            </div>
        </form>
    )
}