'use client'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useState} from "react";

interface IFormInput {
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    zipcode: string;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
});

export default function FirstTask() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<IFormInput>({resolver: yupResolver(schema)});

    function woosalSubmit(data) {
        // handle submitting the form
        console.log(data);
    }

    return (
        <div className="flex min-h-screen p-12">
            <div
                className="max-xl:hidden max-w-sm bg-white rounded-l-lg  shadow">
                    <img className="rounded-l-lg" src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">Let's put together a home offer!</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Please fill the form fields to then download the form.</p>
                </div>
            </div>

            <form className="rounded-r-md max-xl:rounded-md w-full overflow-hidden shadow p-8 bg-white"
                  onSubmit={handleSubmit(woosalSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">Submit Offer</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Let's put together a home offer!</p>
                        <div className="pt-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Offer Date</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">The offer date is the date when you submit
                                your offer to purchase the
                                property. It is an important date as it marks the beginning of the
                                negotiation process with the seller.</p>
                            <p className="mt-1 text-sm leading-6 text-gray-600">When setting your offer date, consider the
                                following:
                                Make sure you have enough time to complete your due diligence, such as
                                reviewing property disclosures, obtaining financing (if applicable), and
                                conducting inspections.
                                Be aware of any deadlines set by the seller for submitting offers, as some
                                sellers may have a specific timeline for accepting offers.
                                Consider the current market conditions and competition for the property. In
                                a competitive market, it may be advantageous to submit your offer as soon as
                                possible to increase your chances of acceptance.
                                Your real estate agent can provide guidance on setting an appropriate offer
                                date based on your specific situation and the current market conditions.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <div className="relative max-w-sm mt-2">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <input type="date"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                               placeholder="Select date"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use your name in your supporting identity documents</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">First
                                    name</label>
                                <div className="mt-2">
                                    <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">Last
                                    name</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" id="last-name" autoComplete="family-name"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Property Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">The seller's address is the address of the
                            property you are interested in purchasing. It is important to provide the correct and
                            complete address to ensure that your offer is associated with the right property.
                        </p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            When making an offer, the seller's address helps identify the specific property you are
                            targeting. It also allows the seller to confirm that your offer is indeed for their property
                            and not a different one.
                            Make sure to enter the full address, including the street number, street name, unit or
                            apartment number (if applicable), city, state, and zip code. Double-check the address for
                            accuracy to avoid any confusion or delays in the offer process.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="country"
                                       className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                <div className="mt-2">
                                    <select id="country" name="country" autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option>United States</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address"
                                       className="block text-sm font-medium leading-6 text-gray-900">Street
                                    address</label>
                                <div className="mt-2">
                                    <input type="text" name="street-address" id="street-address"
                                           autoComplete="street-address"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city"
                                       className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                <div className="mt-2">
                                    <input type="text" name="city" id="city" autoComplete="address-level2"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region"
                                       className="block text-sm font-medium leading-6 text-gray-900">State /
                                    Province</label>
                                <div className="mt-2">
                                    <input type="text" name="region" id="region" autoComplete="address-level1"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code"
                                       className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal
                                    code</label>
                                <div className="mt-2">
                                    <input type="text" name="postal-code" id="postal-code"
                                           autoComplete="postal-code"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Purchase Price</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">The purchase price is the amount you are
                            offering to pay for the property. It is one of the most important factors in your home
                            offer, as it directly impacts the seller's decision to accept or reject your offer.</p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">When determining your purchase price,
                            consider the following:
                            The current market value of the property
                            Recent sales prices of comparable homes in the area
                            The condition of the property and any necessary repairs or upgrades
                            Your budget and financing options
                            It's essential to strike a balance between making a competitive offer and staying within
                            your budget. A higher purchase price may increase the likelihood of your offer being
                            accepted, but it's crucial to ensure that you can comfortably afford the monthly mortgage
                            payments and other associated costs of homeownership.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">Purchase
                                    Price</label>
                                <div className="mt-2">
                                    <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
