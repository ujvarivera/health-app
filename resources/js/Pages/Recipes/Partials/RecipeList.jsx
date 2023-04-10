import RecipeCard from './RecipeCard'

export default function RecipeList({ recipes, auth }) {
    return (
        <div className="md:columns-3">
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