import { IMetric } from "../types";
import { DayRange } from "react-modern-calendar-datepicker";

interface IAPIOptions {}
export default class APIClient {
  url: string;
  options: IAPIOptions;
  constructor() {
    let url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      url = "http://127.0.0.1:5000";
    } else {
      url = "https://api.honestdata.world";
    }
    this.url = url;

    this.options = {};
  }

  mergeOptions(options?: IAPIOptions) {
    return { ...this.options, ...options };
  }

  async get(endpoint: string, options?: IAPIOptions) {
    const res = await fetch(this.url + endpoint, this.mergeOptions(options));
    const json = await res.json();
    return json;
  }

  async query(
    src: string,
    endpoint: string | undefined,
    singleOrMulti: string
  ) {
    let searchType;
    switch (singleOrMulti) {
      case "single":
        searchType = "src";
        break;
      case "multi":
        searchType = "joint";
        break;
      default:
        throw new Error();
    }

    let url = `${this.url}/${searchType}/${src}`;
    if (endpoint) url += `/${endpoint}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
}

interface __filterData {
  data: Array<any>;
  metrics: Array<IMetric>;
  shrink: boolean;
  from: DayRange["from"];
  to: DayRange["to"];
}
interface safeDate {
  date: number;
  month: number;
  year: number;
}
