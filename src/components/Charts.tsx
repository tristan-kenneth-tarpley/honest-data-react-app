import React, {useState} from 'react'
import { ResponsiveContainer, LineChart, PieChart, Pie, BarChart, Bar, Sector, Line,
    XAxis, YAxis, Cell, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList } from 'recharts';
import Styles from '../styles/Styles'


type value = string | number
type chartRecord = {
    [key: string]: value
}
interface chart {
    data: Array<chartRecord>
    numLines?: number
}

const dotStyle = (color: string) => {
    return {
        fill: color,
        strokeWidth: 1
    }
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
const filterData = (data: Array<chartRecord>) => Object.keys(data[0]).filter(x => x !== "name")

export const LINE_CHART: React.FC<chart> = (props) => {
    const filtered = filterData(props.data)
    return (
        <React.Fragment>
            <ResponsiveContainer width={'99%'} height={Styles.chartHeight}>
                <LineChart
                    width={400}
                    height={250}
                    data={props.data}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <XAxis axisLine={false} tickLine={false} dataKey="name" />
                    <YAxis axisLine={false} tickLine={false} type="number" />
                    <Tooltip />
                    <Legend />
                    {
                        filtered.map((row, index)=>{
                            const color = COLORS[index % COLORS.length]
                            return (
                                <Line type="monotone"
                                    dot={dotStyle(color)}
                                    strokeWidth={3}
                                    dataKey={filtered[index]}
                                    stroke={color}
                                    yAxisId={0} />
                            )
                        })
                    }
                </LineChart>
            </ResponsiveContainer>   
        </React.Fragment>
    )
}

export const PIE_CHART: React.FC<chart> = (props) => {
    const filtered = filterData(props.data)
    let [activeMetric, changeMetric] = useState(filtered[0])

    return (
        <React.Fragment>
            <div className="metrics__selector">
                Viewing:
                {
                    filtered.length > 1 && (  
                        
                        filtered.map(filter=>{
                            const isActive = activeMetric === filter ? true : false
                            return (
                                <span
                                    onClick={()=>changeMetric(filter)}
                                    className={isActive ? 'active' : ""}
                                    >
                                    {filter}
                                </span>
                            )
                        })
                    ) 
                }
            </div>
            <ResponsiveContainer width={'99%'} height={Styles.chartHeight}>
                <PieChart width={Styles.chartWidth} height={Styles.chartHeight} >
                    <Tooltip />
                    <Legend />
                    <Pie
                        data={props.data} 
                        dataKey={activeMetric}
                        innerRadius={30}
                        outerRadius={75} 
                        fill="#8884d8"
                        paddingAngle={2}
                        >
                        {
                        props.data.map((entry: any, index: number) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export const BAR_CHART: React.FC<chart> = (props) => {
    const filtered = filterData(props.data)
    return (
        <React.Fragment>
            <ResponsiveContainer width={'99%'} height={Styles.chartHeight}>
                <BarChart
                    width={Styles.chartWidth}
                    height={Styles.chartHeight}
                    data={props.data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <XAxis axisLine={false} tickLine={false} dataKey="name" />
                    <YAxis axisLine={false} tickLine={false} />
                    <Legend />
                    <Tooltip />
                    {
                        filtered.map((row, index)=>{
                            const color = COLORS[index % COLORS.length]
                            return (
                                <Bar dataKey={filtered[index]} fill={color} />
                            )
                        })
                    }
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export const STACKED_BAR_CHART: React.FC<chart> = (props) => {
    const filtered = filterData(props.data)
    return (
        <React.Fragment>
            <ResponsiveContainer width={'99%'} height={Styles.chartHeight}>
                <BarChart
                    width={Styles.chartWidth}
                    height={Styles.chartHeight}
                    data={props.data}
                    margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <XAxis axisLine={false} tickLine={false} dataKey="name" />
                    <YAxis axisLine={false} tickLine={false} />
                    <Legend />
                    <Tooltip />
                    {
                        filtered.map((row, index)=>{
                            const color = COLORS[index % COLORS.length]
                            return (
                                <Bar stackId="a" dataKey={filtered[index]} fill={color} />
                            )
                        })
                    }
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}