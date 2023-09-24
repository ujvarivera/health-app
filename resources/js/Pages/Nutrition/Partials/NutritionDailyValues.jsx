export default function NutritionDailyValues({ dailyValues, nutrition, data }) {
    return (
        <div className="mx-auto overflow-x-auto">
            <table className="table-fixed mx-auto mt-8 border-separate border-spacing-2 border border-purple-600">
                <thead>
                    <tr className='font-bold text-purple-600'>
                        <th></th>
                        <th></th>
                        <th>% Daily Value</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyValues.map((dv, index) => {
                        const nutrientValue = nutrition[dv.code] * data.quantity;
                        return (
                            <tr key={index}>
                                <td className='px-4 text-left text-lg font-bold text-purple-600'>{dv.name}</td>
                                <td className='px-4 text-right text-lg'>{nutrientValue.toFixed(2)} {dv.unit}</td>
                                <td className='px-4 text-right text-lg'>{Math.round((nutrientValue / dv.dv) * 100)}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}