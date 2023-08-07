import NavLink from "@/Components/NavLink";

export default function NutritionList({ currentNutritions }) {
    return (
        <>
            {currentNutritions.map((nutrition, index) => {
                return (
                    <div className='block' key={nutrition.id}>
                        <NavLink href={route('nutrition.show', nutrition)} className='pb-2 mb-4 font-semibold hover:text-purple-600'>
                            <h1 className="text-left">{nutrition.name}</h1>
                        </NavLink>
                    </div>
                )
            })}</>
    )
}