import ExerciseCard from "./ExerciseCard"

export default function ExerciseList({ currentExercises }) {
    return (
        <div className="md:columns-3">
            { currentExercises.map((exercise, index) => {
                return (
                    <ExerciseCard
                        key={index}
                        exercise={exercise}
                    />
                )
            }) }
        </div>
    )
}