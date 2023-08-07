import ButtonLink from '@/Components/ButtonLink';
import { BiArrowBack } from 'react-icons/bi';

export default function BackButton({ ...props }) {
    
    return (
        <ButtonLink 
            {...props} 
            className='mb-10 text-sm md:text-lg'>
                <BiArrowBack />
                <span className='ml-1'>Back</span>
        </ButtonLink>
    )
}