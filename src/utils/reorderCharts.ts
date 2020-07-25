import { chartListing } from "../types";

export default (
  draggedChartId: string,
  charts: { [key: string]: chartListing },
  desiredOrder: number,
  previousOrder: number
) => {
  /*
  desired order > previous order (moving down the list)
    ? every item less than desired order => -1
    : (moving up the list) every item greater or equal to desired order => +1
  */
  const chartsLength = Object.keys(charts).length;
  const chartsCopy = { ...charts };
  chartsCopy[draggedChartId].orderOnPage = desiredOrder;
  Object.keys(chartsCopy).forEach((chart: string) => {
    if (chart === draggedChartId) return;
    if (
      desiredOrder === 0 &&
      chartsCopy[chart].orderOnPage + 1 < chartsLength
    ) {
      chartsCopy[chart].orderOnPage = chartsCopy[chart].orderOnPage + 1;
      return;
    }
    if (
      desiredOrder === chartsLength &&
      chartsCopy[chart].orderOnPage - 1 >= 0
    ) {
      chartsCopy[chart].orderOnPage = chartsCopy[chart].orderOnPage - 1;
      return;
    }
    if (
      desiredOrder > previousOrder &&
      desiredOrder === chartsCopy[chart].orderOnPage
    ) {
      chartsCopy[chart].orderOnPage = chartsCopy[chart].orderOnPage - 1;
      return;
    }
    if (
      desiredOrder < previousOrder &&
      desiredOrder === chartsCopy[chart].orderOnPage
    ) {
      chartsCopy[chart].orderOnPage = chartsCopy[chart].orderOnPage + 1;
      return;
    }
  });

  return chartsCopy;
};
