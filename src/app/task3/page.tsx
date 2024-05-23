'use client'
import {useEffect, useState} from "react";
import {IListing} from "@/types/app";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {CHART_TABS, DEFAULT_CHART_OPTIONS, getGraphData} from "@/modules/task3/helper";
import {ModernLoader} from "@/modules/task2/components/Loader";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ThirdTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [graphData, setGraphData] = useState<any>(null);
    const [optionsData, setOptionsData] = useState(DEFAULT_CHART_OPTIONS);
    const [selectedTab, setSelectedTab] = useState('sold')

    const fetchData = async (query: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/read-csv?term=${query}`);
            if (!response.ok) {
                new Error('Network response was not ok');
            }
            const result: IListing[] = await response.json();
            const graphPlotData = getGraphData(result)
            setGraphData(graphPlotData);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData('');
    }, [])

    const renderChart = () => {
        if (isLoading) {
            return <ModernLoader/>
        }
        if (graphData) {
            return <div className="p-12">
                <Bar options={optionsData} data={graphData}/>
            </div>
        }
    }

    const renderTabs = () => {
        return CHART_TABS.map((tab: any) => <li className="me-2" key={tab.value} onClick={() => setSelectedTab(tab.value)}>
               <span className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${selectedTab === tab.value && 'text-blue-600 border-b-2 border-blue-600'}`}>{tab.label}</span>
        </li>)
    }

    return (
        <div className="flex min-h-screen p-12 max-md:p-0">
            <div className="max-xl:hidden max-w-sm bg-white rounded-l-lg shadow">
                <img className="rounded-l-lg"
                     src="https://images.unsplash.com/photo-1560440021-33f9b867899d?q=80&w=2759&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt=""/>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">Property Price Trend
                        Visualizer</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Find graphs for similar homes sold
                        nearby
                        based on a given address.</p>
                </div>
            </div>
            <div
                className="rounded-r-md max-xl:rounded-md w-full overflow-hidden shadow p-8 bg-white max-md:p-0 max-md:pt-8 ">
                <div className="space-y-12 px-8">
                    <div className="max-w-xl mx-auto">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    Radius
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Days
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                        </button>
                    </div>
                </div>
                <div
                    className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        {renderTabs()}
                    </ul>
                </div>
                {renderChart()}
            </div>
        </div>
    );
}
