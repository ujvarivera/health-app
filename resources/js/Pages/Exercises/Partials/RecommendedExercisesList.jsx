import NavLink from '@/Components/NavLink';

export default function RecommendedExercisesList({ recommendedExercises }) {
    return (
        <div className='mb-8'>
            <h2 className='text-2xl mb-6 ml-1 text-purple-600 font-bold'>Recommended Exercises</h2>

            {recommendedExercises.map((exercise, index) => {
                return (
                    <div className=''>
                        <NavLink href={route('exercises.show', exercise)}
                            className="pb-2 hover:text-purple-600 hover:font-bold">
                            {exercise.name}
                            <span className='pl-2'> &gt;</span>
                        </NavLink>
                    </div>
                )
            })
            }
        </div>
    )
}