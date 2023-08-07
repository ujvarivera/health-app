export default function TextSectionContainer({ children }) {
    return (
        <div className='my-6'>
            <div className='border-b-2 border-purple-600 rounded p-4 mb-10 md:mb-20'>
                { children }
            </div>
        </div>
    )
}