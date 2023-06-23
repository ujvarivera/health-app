import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import NavLink from "@/Components/NavLink";
import TextInput from '@/Components/TextInput';

export default function Index({ auth, errors, nutritionList }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [nutritionsPerPage, setNutritionsPerPage] = useState(10);
    const [currentNutritions, setCurrentNutritions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [totalNutritions, setTotalNutritions] = useState(nutritionList.length);

    // const lastNutritionsIndex = currentPage * nutritionsPerPage;
    // const firstNutritionIndex = lastNutritionsIndex - nutritionsPerPage;

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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

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

                            { currentNutritions.map((nutrition, index) => {
                                return (
                                    <div className='block' key={nutrition.id}>
                                        <NavLink href={route('nutrition.show', nutrition)} className='pb-2 mb-4 font-semibold'>
                                            <h1 className="text-left">{nutrition.name}</h1>
                                        </NavLink>
                                    </div>
                                )
                            }) }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
