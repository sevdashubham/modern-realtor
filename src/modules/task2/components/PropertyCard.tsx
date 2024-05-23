import {IListing} from "@/types/app";
import Link from "next/link";

type PropertyCardProps = {
    listing: IListing
}

export const PropertyCard = ({listing}: PropertyCardProps) => {
    const price = listing.sold_price ? listing.sold_price : listing.list_price;
    return (<Link href={listing.property_url} rel="noopener noreferrer" target="_blank" className="h-max-[350px]">
            <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow h-full">
                <img className="rounded-t-lg h-64 object-cover w-full overflow-hidden" src={listing.primary_photo} alt=""/>
                <div className="p-5 h-full">
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{listing.status}</p>
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">{`$${new Intl.NumberFormat('en-US').format(price || 0)}`}</h5>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{`${listing.full_street_line}`}</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{`${listing.city}`}</p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{`Price per sqft: ${listing.price_per_sqft}`}</p>
                    {listing.style &&
                        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 capitalize">{`${listing.style.toLowerCase().replaceAll('_', ' ')}`}</p>}
                    <div className="flex mb-2 text-ellipsis">
                        <p className="mb-1 font-normal text-gray-700 line-clamp-4">{`${listing.text}`}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
