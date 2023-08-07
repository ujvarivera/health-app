import NavLink from '@/Components/NavLink';

export default function AuthenticateText({ children }) {
    return (
        <p className='text-red-400 text-lg'>
            <span className='font-medium'>{ children }</span>
            <NavLink href={ route('login') } className='ml-4 text-red-400 hover:text-red-700'>
                Go to the log in page. &rarr;
            </NavLink>
        </p>
    )
}