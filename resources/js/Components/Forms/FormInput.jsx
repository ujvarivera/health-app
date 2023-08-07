import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function FormInput({ 
    inputName, inputValue, inputType="text", labelName=inputName, handleOnChange, error , ...props
}) {
    return (
        <div className="my-4">
            <InputLabel htmlFor={inputName} value={labelName} />

            <TextInput
                { ...props }
                id={inputName}
                type={inputType}
                name={inputName}
                value={inputValue}
                className="mt-1 block w-full"
                onChange={handleOnChange}
            />

            <InputError message={error} className="mt-2" />
        </div>
    )
}
