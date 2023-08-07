export default function SuccessMessage({ message }) {
    return (
        <div class="bg-green-100 rounded-md p-3 fixed bottom-3 right-3">
            <div class="text-green-700">
                <div class="font-bold text-xl">{message}</div>
            </div>
        </div>
    );
}