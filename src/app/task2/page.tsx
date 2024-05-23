'use client'

import useDebounce from "@/hooks/useDebounce";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {PropertyCard} from "@/modules/task2/components/PropertyCard";
import {IListing} from "@/types/app";

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
        searchListings();
    }, [debouncedSearchTerm]);

    const renderProperties = () => {
        if (isLoading) {
            return <div role="status" className="w-full h-full flex justify-center items-center">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        }
        if (searchInputRef.current !== '' && propertyList.length === 0) {
            return <h5 className="text-red-500">No properties found</h5>
        }
        return <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
            {propertyList.map((property: any) => <PropertyCard listing={property}/>)}
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
                <div className="space-y-12">
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
