import { IChartListing } from "../types";

export const sortChartKeys = (charts: {
  [key: string]: IChartListing;
}): Array<string> =>
  Object.keys(charts).sort(
    (a, b) => charts[a].orderOnPage - charts[b].orderOnPage
  );
