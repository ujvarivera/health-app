import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function NutritionIntakeForm({ nutrition, data, setData, processing, setSuccessMessage, setShowMessage, setShowUnauthenticatedMessage }) {


    const myCaloriesUrl = '/calories';

    function storeNutrition(e) {
        e.preventDefault();
        axios.post(myCaloriesUrl, {
            quantity: data.quantity,
            nutrition_id: data.nutrition_id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setSuccessMessage(response.data.message);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            })
            .catch(error => {
                setShowUnauthenticatedMessage(true);
            });

        setData('quantity', 1);
    }

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <form onSubmit={storeNutrition}>
            <div className="mt-4 inline-block">
                <TextInput
                    id="quantity"
                    type="number"
                    min="1"
                    step="0.5"
                    max="10"
                    name="quantity"
                    value={data.quantity}
                    placeholder="1"
                    className="mt-1 inline-block"
                    isFocused={true}
                    onChange={handleOnChange}
                />

            </div>
            <div className="mt-4 inline-block">
                <PrimaryButton className="ml-4" disabled={processing}>
                    Add
                </PrimaryButton>
            </div>
        </form>
    )
}