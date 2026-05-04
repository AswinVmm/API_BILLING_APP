"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Chart({ data }: any) {
    return (
        <LineChart width={400} height={200} data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="requests" />
        </LineChart>
    );
}