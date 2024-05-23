import {IListing} from "@/types/app";

export enum ChartTypes {
    Price = 'price',
    Square = 'square',
    Sold = 'sold',
}

export const CHART_TABS = [{label: 'Time vs. home price', value: 'price'}, {label: 'Time vs. $/sqft of sold homes', value: 'square'}, {label: 'Number of homes sold per day', value: 'sold'}]

export const DEFAULT_CHART_OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top' as const,
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};

export const getGraphData = (response: Array<IListing>) => {
    const labelsBar = response.map((result: IListing) => result.list_date);
    // @ts-ignore
    return { labels: [...new Set(labelsBar)],
        datasets: [
            {
                label: 'Property sold',
                data: response.map((result: any) => {
                    return response.reduce((acc, cur) => cur.list_date === result.list_date ? ++acc : acc, 0);
                }),
                backgroundColor: '#cfd8dc',
            }
        ],
    }
}

export const getGraphOptions = (response: Array<IListing>) => {
    return {
        ...DEFAULT_CHART_OPTIONS,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                ticks: {
                    callback: (value: any) => {
                        return `$ ${value}`
                    }
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.raw || '';
                        return `$ ${`${label}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
                    }
                }
            }
        },
    }
}
