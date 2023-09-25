import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Container from '@/Components/Container';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import NavLink from '@/Components/NavLink';
import { useState } from 'react';

export default function MyExercises({ auth, errors, myExercises, dates, today }) {
    const [currentExercises, setCurrentExercises] = useState(myExercises.filter(exercise => exercise.created_at == dates[0]));
    const [selectedDate, setSelectedDate] = useState(dates[0])

    let calBurned = 0;
    let totalLength = 0;

    currentExercises.map((exercise) => {
        calBurned += Number(exercise.cal_burned);
        totalLength += Number(exercise.duration_in_min);
    })

    function onSelectDate(date) {
        setSelectedDate(date)
        setCurrentExercises(() => (myExercises.filter(exercise => exercise.created_at == date)))
        currentExercises.map((exercise) => {
          calBurned += Number(exercise.cal_burned);
        });
    }

    // const footer = `Calory Burned: ${calBurned}, Minutes: ${totalLength}`;

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Diary" />

            <Container>
                <h2 className='text-2xl text-purple-600 font-bold'>My Workout Log</h2>
                {
                    Date(today) !== Date(dates[0]) &&
                    <>
                        <p className='text-lg font-bold ml-1 my-4'>You haven't done any exercise today.</p>
                        <NavLink href={route('exercises.index')} className='pb-2 mb-4 font-semibold hover:text-purple-600'>
                            <p className="text-left">Go check the exercises &rarr;</p>
                        </NavLink>
                    </>
                }

                <select
                    name="selectedDate"
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => onSelectDate(e.target.value)}
                    className="inline-block w-full md:w-1/4 px-4 mt-8 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                >
                    {dates && dates.map((date, index) => {
                        return (
                            <>
                                <option
                                    key={date}
                                    value={date}
                                    className='pl-6'
                                >
                                    {date}
                                </option>
                            </>
                        )
                    })
                    }
                </select>

                <div className='text-2xl my-10'>
                    <h2 className='mb-2 text-purple-600 font-bold'>Summary</h2>
                    <p>Total Calory Burned: {calBurned}</p>
                    <p>Total Minutes: {totalLength}</p>
                </div>

                <DataTable value={currentExercises} sortField="created_at" sortOrder={-1}
                    removableSort showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}>
                    <Column field="exercise.name" sortable header="Name"></Column>
                    <Column field="cal_burned" sortable header="Calory Burned"></Column>
                    <Column field="duration_in_min" sortable header="Length (Minutes)"></Column>
                    <Column field="created_at" sortable header="Date"></Column>
                </DataTable>
            </Container>
        </Layout>
    );
}
