export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-m text-gray-700 tracking-wider` + className}>
            {value ? value : children}
        </label>
    );
}
