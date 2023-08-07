export default function BmiInfoTable({ bmiRanges }) {
    return (
        <table class="table-auto mt-8 border-separate border-spacing-y-4 border-spacing-10 text-lg">
            <thead>
                <tr className='text-left'>
                    <th>BMI</th>
                    <th>Weight Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    bmiRanges && bmiRanges.map((range) => {
                        return (
                            <tr key={range.id}>
                                <td>{range.lower} - {range.upper}</td>
                                <td className={range.classes}>{range.status}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}