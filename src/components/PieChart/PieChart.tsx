import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const PieChartComponent = () => {
  const [selected] = useState<number | undefined>(0);

  const lineWidth = 60;
  return (
    <div className="bg-white shadow-md rounded-lg p-10 h-96 flex">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#E38627] rounded-sm"></div>
          <p className="text-xs font-medium">Pending</p>
          <p className="text-xs font-medium">12</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#C13C37] rounded-sm"></div>
          <p className="text-xs font-medium">Progress</p>
          <p className="text-xs font-medium">12</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#6A2135] rounded-sm"></div>
          <p className="text-xs font-medium">Done</p>
          <p className="text-xs font-medium">12</p>
        </div>
      </div>
      <PieChart
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
        style={{
          fontFamily:
            '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
          fontSize: "8px",
        }}
        radius={44}
        lineWidth={60}
        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
        segmentsShift={(index) => (index === selected ? 6 : 1)}
        animate
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: "#fff",
          opacity: 0.75,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default PieChartComponent;
