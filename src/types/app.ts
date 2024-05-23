export interface IFormDataKey {
    [key: string]: any;
}

export interface IFormInput {
    datePrepared: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    purchasePrice: string;
    zipCode: number;
    city: string;
    county: string;
}

export interface IListing {
    property_url: string;
    mls: string;
    mls_id: string;
    status: string;
    text: string;
    style: string;
    full_street_line: string;
    street: string;
    unit: string;
    city: string;
    state: string;
    zip_code: string;
    beds: string;
    full_baths: string;
    half_baths: string;
    sqft: string;
    year_built: string;
    days_on_mls: string;
    list_price: number;
    list_date: string;
    sold_price: number;
    last_sold_date: string;
    assessed_value: string;
    estimated_value: string;
    lot_sqft: string;
    price_per_sqft: string;
    latitude: string;
    longitude: string;
    neighborhoods: string;
    county: string;
    fips_code: string;
    stories: string;
    hoa_fee: string;
    parking_garage: string;
    agent: string;
    agent_email: string;
    agent_phones: string;
    broker: string;
    broker_phone: string;
    broker_website: string;
    nearby_schools: string;
    primary_photo: string;
    alt_photos: string;
}
