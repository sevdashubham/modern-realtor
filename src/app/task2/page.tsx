'use client'

import useDebounce from "@/hooks/useDebounce";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {PropertyCard} from "@/modules/task2/components/PropertyCard";
import {IListing} from "@/types/app";
import {ModernLoader} from "@/modules/task2/components/Loader";

export default function SecondTask() {
    const [propertyList, setPropertyList] = useState<Array<IListing>>([]);
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(searchInput, 300);
    const searchInputRef = useRef(searchInput);
    searchInputRef.current = searchInput;

    const fetchData = async (query: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/read-csv?term=${query}`);
            if (!response.ok) {
                new Error('Network response was not ok');
            }
            const result: IListing[] = await response.json();
            setPropertyList(result);
            setIsLoading(false);
        } catch (error) {
            setPropertyList([]);
            setIsLoading(false);
        }
    };

    const searchListings = () => {
        if (searchInputRef.current === '') {
            return setPropertyList([]);
        }
        fetchData(searchInputRef.current);
    }

    useEffect(() => {
        fetchData('');
    }, [])

    useEffect(() => {
        searchListings();
    }, [debouncedSearchTerm]);

    const renderProperties = () => {
        if (isLoading) {
            return <ModernLoader/>
        }
        if (searchInputRef.current !== '' && propertyList.length === 0) {
            return <h5 className="text-red-500">No properties found</h5>
        }
        return <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
            {propertyList.map((property: IListing) => <PropertyCard key={property.mls_id} listing={property}/>)}
        </div>
    }

    return (
        <div className="flex min-h-screen p-12 max-md:p-0">
            <div className="max-xl:hidden max-w-sm bg-white rounded-l-lg shadow">
                <img className="rounded-l-lg"
                     src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt=""/>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">Competitive market
                        analysis!</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Find similar homes sold nearby
                        based on a given address.</p>
                </div>
            </div>
            <div
                className="rounded-r-md max-xl:rounded-md w-full overflow-hidden shadow p-8 bg-white max-md:p-0 max-md:pt-8 ">
                <div className="space-y-12 px-8">
                    <form className="max-w-md mx-auto">
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input value={searchInput}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                                   type="search" id="default-search"
                                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="Search address..." required/>
                        </div>
                    </form>
                </div>
                {renderProperties()}
            </div>
        </div>
    );
}
