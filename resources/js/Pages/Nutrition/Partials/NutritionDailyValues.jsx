export default function NutritionDailyValues({ dailyValues, nutrition, data }) {
    return (
        <div className="mx-auto overflow-x-auto">
            <table className="mx-auto mt-8 border-separate border-spacing-2 border border-purple-600">
                <tr className='font-bold text-purple-600'>
                    <td></td>
                    <td></td>
                    <td>% Daily Value</td>
                </tr>
                {dailyValues.map((dv, index) => {
                    const nutrientValue = nutrition[dv.code] * data.quantity;
                    return (
                        <tr>
                            <td className='px-4 text-left text-lg font-bold text-purple-600'>{dv.name}</td>
                            <td className='px-4 text-right text-lg'>{nutrientValue.toFixed(2)} {dv.unit}</td>
                            <td className='px-4 text-right text-lg'>{Math.round((nutrientValue / dv.dv) * 100)}%</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}