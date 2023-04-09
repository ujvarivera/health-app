import NavLink from "@/Components/NavLink";

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <img src={'/storage/' + recipe.images[0].image} alt={recipe.name} />
            <NavLink href={route('recipes.show', recipe)}><h1 className="text-center">{recipe.name}</h1></NavLink>
        </div>
    )
}