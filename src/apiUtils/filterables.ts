import { decamelize } from "../helpers";
import { IFilterable } from "../types";

export const getFilterables = (recordKeys: any): Array<IFilterable> => {
  let filterables: Array<IFilterable> = [];

  for (let i of recordKeys) {
    const disallowedKeys = ["internal", "flag"];
    if (i !== "uid" && !disallowedKeys.includes(i) && i !== "date") {
      filterables = [
        ...filterables,
        {
          value: i,
          label: decamelize(i),
        },
      ];
    }
  }

  return filterables;
};
