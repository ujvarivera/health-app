import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Container from '@/Components/Container';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import NutritionList from './Partials/NutritionList';

export default function Index({ auth, errors, nutritionList }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [nutritionsPerPage, setNutritionsPerPage] = useState(10);
    const [currentNutritions, setCurrentNutritions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [totalNutritions, setTotalNutritions] = useState(nutritionList.length);

    useEffect(() => {
        var currentNutritions = nutritionList.filter((nutrition) =>
            nutrition.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setTotalNutritions(currentNutritions.length);

        // Calculate the new total number of pages after filtering
        const totalPages = Math.ceil(currentNutritions.length / nutritionsPerPage);

        // Check if the current page is beyond the total number of pages
        if (currentPage > totalPages) {
            setCurrentPage(1); // Reset to the first page
        }

        const lastNutritionsIndex = currentPage * nutritionsPerPage;
        const firstNutritionIndex = lastNutritionsIndex - nutritionsPerPage;

        currentNutritions = currentNutritions.slice(firstNutritionIndex, lastNutritionsIndex);
        setCurrentNutritions(currentNutritions);

    }, [inputValue, currentPage, nutritionsPerPage, nutritionList]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    function decreaseCurrentPage() {
        currentPage === 1 ?
            setCurrentPage(Math.ceil(totalNutritions / nutritionsPerPage)) :
            setCurrentPage(currentPage - 1);
    }

    function increaseCurrentPage() {
        currentPage === Math.ceil(totalNutritions / nutritionsPerPage) ?
            setCurrentPage(1) :
            setCurrentPage(currentPage + 1);
    }

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToLastPage() {
        setCurrentPage(Math.ceil(totalNutritions / nutritionsPerPage));
    }

    return (
        <Layout
            auth={auth}
            errors={errors}
        >
            <Head title="Nutrition" />

            <Container>

                <TextInput
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Search for nutrition...'
                    className="w-full"
                />

                <div className="mt-2 mb-8 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-2">
                    <PrimaryButton type="text" className="w-48 my-1 sm:w-auto sm:my-0" onClick={goToFirstPage}>
                        First Page
                    </PrimaryButton>
                    <PrimaryButton type="text" className="w-48 mx-2 my-1 sm:w-auto sm:my-0" onClick={decreaseCurrentPage}>
                        Prev
                    </PrimaryButton>
                    <PrimaryButton type="text" className="w-48 mx-2 my-1 sm:w-auto sm:my-0" onClick={increaseCurrentPage}>
                        Next
                    </PrimaryButton>
                    <PrimaryButton type="text" className="w-48 mx-2 my-1 sm:w-auto sm:my-0" onClick={goToLastPage}>
                        Last Page
                    </PrimaryButton>
                    <p className="font-medium text-lg text-purple-600">Page {currentPage}.</p>
                </div>

               <NutritionList currentNutritions={currentNutritions}/>
            </Container>
        </Layout>
    );
}
