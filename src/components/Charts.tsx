import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

import type { Topic } from "../hooks/useTopics";

type Props = {
  topics: Topic[];
};

const Charts = ({ topics }: Props) => {

  if (topics.length === 0) {
    return (
      <div className="bg-white/80 p-6 rounded-2xl shadow text-center text-gray-500">
        No data yet 📭 — start adding topics
      </div>
    );
  }

  const statusData = [
    {
      name: "Not Started",
      value: topics.filter((t) => t.status === "Not Started").length,
      fill: "#f87171",
    },
    {
      name: "In Progress",
      value: topics.filter((t) => t.status === "In Progress").length,
      fill: "#facc15",
    },
    {
      name: "Done",
      value: topics.filter((t) => t.status === "Done").length,
      fill: "#4ade80",
    },
  ];

  const difficultyData = [
    {
      name: "Easy",
      value: topics.filter((t) => t.difficulty === "Easy").length,
    },
    {
      name: "Medium",
      value: topics.filter((t) => t.difficulty === "Medium").length,
    },
    {
      name: "Hard",
      value: topics.filter((t) => t.difficulty === "Hard").length,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

      {/* PIE */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md">
        <h2 className="font-bold text-lg mb-3 text-center">
          📊 Status Distribution
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={90}>
              {statusData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md">
        <h2 className="font-bold text-lg mb-3 text-center">
          📊 Difficulty Breakdown
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={difficultyData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#FF8001"
              minPointSize={10}
              background={{ fill: "#f3f4f6" }}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Charts;