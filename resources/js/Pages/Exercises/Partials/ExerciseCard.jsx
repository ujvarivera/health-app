import NavLink from "@/Components/NavLink";

export default function ExerciseCard({ exercise }) {
    return (
        <div className="exercise-card">
            <NavLink href={route('exercises.show', exercise)} className="pb-2 hover:text-purple-600 hover:font-bold">
                <div>
                    <img src={exercise.gif_url} alt={exercise.name} />
                    <h1 className="text-center text-lg">{exercise.name}</h1>
                </div>
            </NavLink>
        </div>
    )
}