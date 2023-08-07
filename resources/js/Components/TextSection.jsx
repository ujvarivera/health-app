export default function TextSection({ title, value }) {

    return (
        <div className='my-6'>
            <h2 className='font-semibold mr-2 text-2xl text-purple-600'>{ title } </h2>
            <p className='text-lg'>{ value }</p>
        </div>
    )
}
