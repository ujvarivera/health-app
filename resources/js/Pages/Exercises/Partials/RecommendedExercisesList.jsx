import NavLink from '@/Components/NavLink';

export default function RecommendedExercisesList({ recommendedExercises, auth }) {
    return (
        <div className='mb-8'>
            <div className='flex flex-row mb-6'>
                <h2 className='text-2xl ml-1 text-purple-600 font-bold'>Recommended Exercises</h2>

                {
                    auth.user &&
                        <NavLink href={route('recommendation.edit')}
                            className="hover:text-purple-600 hover:font-bold ml-2">
                            Edit Recommendations
                            <span className='pl-2'> &gt;</span>
                        </NavLink>
                }
            </div>

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