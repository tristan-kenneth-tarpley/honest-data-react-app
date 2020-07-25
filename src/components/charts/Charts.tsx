import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import Styles from "../../styles/Styles";

type value = string | number;
type chartRecord = {
  [key: string]: value;
};
interface chart {
  uid: string;
  data: Array<chartRecord>;
  numLines?: number;
}

interface pieChart extends chart {
  dataKey: any;
}

const COLORS = [
  Styles.purple,
  Styles.blue,
  Styles.green,
  Styles.pink,
  Styles.peach,
  Styles.red,
  Styles.deepBlue,
  Styles.yellow,
  Styles.orange,
  Styles.fontColor,
];

const DataFormater = (number: number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number > 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
};

const ResponsiveContainerParent = (props: any) => {
  return (
    <div
      style={{
        width: "100%",
        height: Styles.chartHeight,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <ResponsiveContainer width={"99%"} height={Styles.chartHeight}>
          {props.children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const filterData = (data: Array<chartRecord>) =>
  Object.keys(data[0]).filter((x) => x !== "name");
export const LINE_CHART: React.FC<chart> = (props) => {
  const lengths: Array<number> = props.data.map(
    (x: any) => Object.keys(x).length
  );
  const max = Math.max.apply(Math, lengths);
  return (
    <ResponsiveContainerParent>
      <LineChart
        width={400}
        height={250}
        data={props.data}
        margin={{ top: 5, right: 20, left: 0, bottom: 40 }}
      >
        <XAxis
          axisLine={false}
          interval="preserveEnd"
          tickLine={false}
          angle={-45}
          textAnchor="end"
          dataKey="date"
        />
        <YAxis
          tickFormatter={DataFormater}
          axisLine={false}
          tickLine={false}
          type="number"
        />
        <Tooltip
          formatter={(value: any) =>
            new Intl.NumberFormat("en").format(value.toString())
          }
        />
        <Legend wrapperStyle={{ top: -10, left: 25 }} />
        {Object.keys(props.data.filter((x) => Object.keys(x).length >= max)[0])
          .filter((x) => x !== "date")
          .map((key, index) => {
            // const line = props.data.map(record => record[key])
            const color = COLORS[index % COLORS.length];
            return (
              <Line
                type="monotone"
                dot={false}
                key={index}
                strokeWidth={3}
                dataKey={key}
                stroke={color}
                yAxisId={0}
              />
            );
          })}
      </LineChart>
    </ResponsiveContainerParent>
  );
};

export const PIE_CHART: React.FC<pieChart> = (props) => {
  let [activeMetric, changeMetric] = useState(props.dataKey);
  const lengths: Array<number> = props.data.map(
    (x: any) => Object.keys(x).length
  );
  const max = Math.max.apply(Math, lengths);
  const filtered = props.data.filter((x) => Object.keys(x).length >= max)[0];
  const filteredKeys = Object.keys(filtered).filter((x) => x !== "date");
  return (
    <React.Fragment>
      <div className="metrics__selector">
        Viewing:
        {Object.keys(filtered).length > 0 &&
          filteredKeys.map((filter: string, index: number) => {
            const isActive = activeMetric === filter ? true : false;
            return (
              <span
                key={index}
                onClick={() => changeMetric(filter)}
                className={isActive ? "active" : ""}
              >
                {filter}
              </span>
            );
          })}
      </div>
      <ResponsiveContainerParent>
        <PieChart width={Styles.chartWidth} height={Styles.chartHeight}>
          <Tooltip
            formatter={(value: any) =>
              new Intl.NumberFormat("en").format(value.toString())
            }
          />
          <Legend wrapperStyle={{ top: -10, left: 25 }} />
          <Pie
            data={props.data}
            dataKey={activeMetric}
            innerRadius={30}
            outerRadius={75}
            fill="#8884d8"
            paddingAngle={2}
          >
            {filteredKeys.map((key, index) => {
              const color = COLORS[index % COLORS.length];
              return <Cell key={key} fill={color} />;
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainerParent>
    </React.Fragment>
  );
};

export const BAR_CHART: React.FC<chart> = (props) => {
  const lengths: Array<number> = props.data.map(
    (x: any) => Object.keys(x).length
  );
  const max = Math.max.apply(Math, lengths);

  // const filtered = filterData(props.data)
  return (
    <ResponsiveContainerParent>
      <BarChart
        width={Styles.chartWidth}
        height={Styles.chartHeight}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 20,
        }}
      >
        <XAxis
          axisLine={false}
          interval="preserveEnd"
          tickLine={false}
          angle={-45}
          textAnchor="end"
          dataKey="date"
        />
        <YAxis
          tickFormatter={DataFormater}
          axisLine={false}
          tickLine={false}
          type="number"
        />
        <Tooltip
          formatter={(value: any) =>
            new Intl.NumberFormat("en").format(value.toString())
          }
        />
        <Legend wrapperStyle={{ top: -15, left: 25 }} />
        {Object.keys(props.data.filter((x) => Object.keys(x).length >= max)[0])
          .filter((x) => x !== "date")
          .map((key, index) => {
            const color = COLORS[index % COLORS.length];
            return (
              <Bar key={index} dataKey={key} fill={color} />
              // <Line type="monotone"
              //     dot={false}
              //     strokeWidth={3}
              //     dataKey={key}
              //     stroke={color}
              //     yAxisId={0} />
            );
          })}
        {/* {
                    filtered.map((row, index)=>{
                        const color = COLORS[index % COLORS.length]
                        return (
                            <Bar dataKey={filtered[index]} fill={color} />
                        )
                    })
                } */}
      </BarChart>
    </ResponsiveContainerParent>
  );
};

export const STACKED_BAR_CHART: React.FC<chart> = (props) => {
  const filtered = filterData(props.data);
  return (
    <ResponsiveContainerParent>
      <BarChart
        width={Styles.chartWidth}
        height={Styles.chartHeight}
        data={props.data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis axisLine={false} tickLine={false} dataKey="name" />
        <YAxis axisLine={false} tickLine={false} />
        <Legend />
        <Tooltip />
        {filtered.map((row, index) => {
          const color = COLORS[index % COLORS.length];
          return <Bar stackId="a" dataKey={filtered[index]} fill={color} />;
        })}
      </BarChart>
    </ResponsiveContainerParent>
  );
};
