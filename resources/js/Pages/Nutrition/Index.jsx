import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import NavLink from "@/Components/NavLink";


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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nutritions</h2>}
        >
            <Head title="Nutritions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Search for nutrition...'/>

                            <div className="mt-2 mb-8 inline-block">
                                <SecondaryButton type="text" onClick={goToFirstPage}>First Page</SecondaryButton>
                                <SecondaryButton type="text" onClick={decreaseCurrentPage}>Prev</SecondaryButton>
                                <SecondaryButton type="text" onClick={increaseCurrentPage}>Next</SecondaryButton>
                                <SecondaryButton type="text" onClick={goToLastPage}>Last Page</SecondaryButton>
                            </div>
                            <p className="inline-block ml-2">Page {currentPage}.</p>
                            { currentNutritions.map((nutrition, index) => {
                                return (
                                    <div className='block' key={nutrition.id}>
                                        <NavLink href={route('nutrition.show', nutrition)}>
                                            <h1 className="text-center">{nutrition.name}</h1>
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
