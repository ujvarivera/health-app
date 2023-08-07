export default function IngredientsList({ ingredients }) {
    return (
        <>
            <h2 className='mt-6 font-semibold text-2xl text-purple-600'>Ingredients</h2>
            {ingredients ?
                ingredients.map((ingredient) => {
                    return (
                        <p key={ingredient.id} className='text-lg'>
                            {ingredient.ingredient}
                        </p>
                    );
                })
                :
                <p className='text-lg'>No ingredients</p>
            }
        </>
    )
}