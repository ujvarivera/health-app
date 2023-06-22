import { Link } from '@inertiajs/react';

export default function ButtonLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2 bg-purple-800 border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-purple-700 transition ease-in-out duration-150  ' +
                className
            }
        >
            {children}
        </Link>
    );
}
