import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

type Data = {
    [key: string]: string;
};

function getParamFromURL(
    key: string,
    url: string | undefined
): string | null {
    if (!url) return "";
    const search = new URL(url).search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(key);
}

const PAGE_SIZE = 52;

async function requestHandler(_request: Request) {
    if (_request.method !== 'GET') {
        return Response.json({ message: "Only GET method is allowed" });
    }
    const csvFilePath = path.join(process.cwd(), 'public/file', 'HomeHarvest_20240515_232354.csv');
    const results: Data[] = [];

    try {
        const query = getParamFromURL('term', _request.url);
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (data) => {
                    results.push(data);
                })
                .on('end', () => resolve())
                .on('error', (err) => reject(err));
        });
        if (query) {
            const searchTerm = query.toLowerCase().trim();
            const filteredResults = results.filter((result: any) => {
                if (result.full_street_line) {
                    const streetLine = result.full_street_line.toLowerCase();
                    if (streetLine.includes(searchTerm)) {
                        return result
                    }
                }
            })
            return Response.json(filteredResults, {status: 200});
        }
        return Response.json(results.slice(0, PAGE_SIZE), {status: 200});
    } catch (error: any) {
        return Response.json({ message: 'Error reading CSV file', error: error.message }, { status: 500 });
    }

}

export { requestHandler as GET };
