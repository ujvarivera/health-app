import NavLink from "@/Components/NavLink";

export default function ExerciseCard({ exercise }) {
    return (
        <div className="exercise-card">
            <NavLink href={route('exercises.show', exercise)}>
                <div>
                    <img src={exercise.gif_url} alt={exercise.name} />
                    <h1 className="text-center">{exercise.name}</h1>
                </div>
            </NavLink>
        </div>
    )
}