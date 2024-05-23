import {IFormDataKey, IFormInput} from "@/types/app";
import { PDFDocument } from 'pdf-lib';
// @ts-ignore
import { saveAs } from 'file-saver';

['Date Prepared', 'E Buyer and Seller are referred to herein as the Parties Brokers are not Parties to this Agreement', 'Listing Agent', 'Selling Agent', 'the Seller exclusively or_2', 'Initials', 'undefined_3', 'Page', 'Date_2', 'This addendum to the Purchase Agreement dated', 'located at', 'Page_2', 'Date_3', 'days of Buyer receipt of any inspection reports required by the municipality', 'days of Buyer receipt of a sale approval letter from the municipality in which', 'Page_3', 'Date_4', 'Date_5', 'Sellers Printed Name', 'Date_6', 'Sellers Printed Name_2', 'Date_7', 'Buyers Printed Name', 'Date_8', 'Buyers Printed Name_2', 'A THIS IS AN OFFER FROM', 'county', 'city', 'zip code', 'parcel number', 'property to be acquired', 'purchase price', 'purchase price 2', 'dollars', 'other person besides agent', 'buyer deposit made payable to', 'other deposit type', 'agreed upon number of days held uncashed', 'initial deposit amount', 'increased deposit acceptance date', 'agreed upon number of days after acceptance', 'other type of buyer deposit with agent', 'increased deposit number of days', 'first loan amount', 'increased deposit amount', 'second load amount', 'other type of first loan financing', 'all cash offer number of days', 'shall pay points not to exceed', 'first loan fixed rate', 'second loan fixed rate', 'second loan adjustable rate', 'first loan adjustable rate', 'fha/va number of days', 'other type of second loan financing', 'additional financing terms 1', 'BALANCE OF DOWN PAYMENT OR PURCHASE PRICE in the amount of', 'PURCHASE PRICE TOTAL', 'shall pay points not to exceed %', 'additional financial terms 2', 'days cancel agreement after acceptance', 'days written verification', 'loan application number of days after acceptance', 'loan contigency 21 days or', 'other terms page 2 - 2', 'other terms page 2 - 3', 'other terms page 2 - 4', 'addendum number', 'other terms page 2', 'hazard disclosure report other payments', 'hazard disclosure report other payments 2', 'hazard disclosure report prepared by', 'report 2 prepared by', 'report 2', 'report 3', 'report 3 prepared by', 'buyer initials 1', 'buyer initials 2', 'seller initials 1', 'seller initials 2', 'property address page 2', 'date page 2', 'escrow holder shall be', 'parties shall within number of days', 'buyer/seller shall pay escrow fee', "buyer/seller shall pay for owner's title", 'title policy shall be issued by', 'county transfer fee', 'private transfer fee', 'city transfer tax or fee', 'other costs 8', 'other costs 9', 'HOA transfer fee', 'home warranty issued by', 'home warrant not exceed $', 'including other coverages', 'all refrigerators except', 'all washer and dryers except', 'all stoves except', 'excluded from sale 1']

export const FieldPDFMap = {
    datePrepared: 'Date Prepared',
    lastName: 'A THIS IS AN OFFER FROM',
    streetAddress: 'property to be acquired',
    purchasePrice: 'BALANCE OF DOWN PAYMENT OR PURCHASE PRICE in the amount of',
    zipCode: 'zip code',
    city: 'city',
    county: 'county'
}

export function isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0;
}

export const fillPdf = async (formData: IFormInput) => {

    // Load an existing PDF
    const url = '/file/California-Residential-Purchase-Agreement-Realtor-Version.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the form containing all fields
    const form = pdfDoc.getForm();

    const fieldsArray = form.getFields();
    const textFieldNames = fieldsArray
        .filter(field => field.constructor.name === 'PDFTextField')
        .map(field => field.getName());
    // Fill the form fields

    Object.keys(FieldPDFMap).forEach((key: string) => {
        const mappedFieldPDF = FieldPDFMap as IFormDataKey;
        const dateField = form.getTextField(mappedFieldPDF[key]);
        const mappedFormData = formData as IFormDataKey;
        if (key === 'lastName') {
            dateField.setText(`${mappedFormData['firstName']} ${mappedFormData[key]} `);
        } else {
            dateField.setText(mappedFormData[key]);
        }

    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'filled_form.pdf');
};
