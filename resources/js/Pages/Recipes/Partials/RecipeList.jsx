import RecipeCard from './RecipeCard'

export default function RecipeList({ recipes, auth }) {
    return (
        <div className="md:grid md:grid-cols-4 md:gap-4">
            { recipes && recipes.map((recipe, index) => {
                return (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        auth={auth}
                    />
                )
            }) }
        </div>
    )
}