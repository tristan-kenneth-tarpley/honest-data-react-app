import { chartListing } from "../types";

export const sortChartKeys = (charts: {
    [key: string]: chartListing;
}): Array<string> => {
    return Object.keys(charts).sort(
        (a, b) => charts[a].orderOnPage - charts[b].orderOnPage
    );
};
