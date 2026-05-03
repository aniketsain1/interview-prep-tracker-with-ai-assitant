import { useState } from "react";
import TopicForm from "../components/TopicForm";
import TopicList from "../components/TopicList";
import useTopics from "../hooks/useTopics";
import type { Topic } from "../hooks/useTopics";
import Charts from "../components/Charts";
import AIAssistant from "../components/AIAssistant";

const Dashboard = () => {
  const { topics, addTopic, deleteTopic, updateStatus, updateTopic, clearAll } =
    useTopics();

  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  // ✅ Derived State
  const weakTopics = topics.filter((t) => t.status !== "Done");
  const strongTopics = topics.filter((t) => t.status === "Done");

  const progress =
    topics.length === 0
      ? 0
      : Math.round((strongTopics.length / topics.length) * 100);

  const filteredTopics = topics.filter((t) => {
    return (
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter
        ? t.category.toLowerCase() === categoryFilter.toLowerCase()
        : true) &&
      (difficultyFilter ? t.difficulty === difficultyFilter : true)
    );
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-center tracking-tight text-gray-800">
          Interview Prep Tracker 🚀
        </h1>

        <button onClick={clearAll} className="bg-black text-white px-4 py-2 rounded">
          Clear All
        </button>

        {/* PROGRESS + INSIGHTS */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* PROGRESS */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-lg mb-3">📊 Progress</h2>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-4 transition-all duration-500 ${
                  progress < 40
                    ? "bg-red-500"
                    : progress < 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 mt-2 text-center">
              {progress}% completed
            </p>
          </div>

          {/* INSIGHTS */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-lg mb-3">🧠 Insights</h2>

            <p className="text-sm text-gray-700 font-medium">
              Strong Topics: {strongTopics.length}
            </p>

            <p className="text-sm text-gray-700 font-medium">
              Weak Topics: {weakTopics.length}
            </p>

            {weakTopics.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-red-500">Focus on:</p>

                <ul className="text-sm mt-2 space-y-1">
                  {weakTopics.slice(0, 3).map((t) => (
                    <li
                      key={t.id}
                      className="bg-red-100 text-red-600 px-2 py-1 rounded"
                    >
                      {t.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 🔥 CHARTS FULL WIDTH */}
        <div className="w-full">
          <Charts topics={topics} />
        </div>

        <div className="mt-6">
          <AIAssistant />
        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* FORM */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <TopicForm
              addTopic={addTopic}
              editingTopic={editingTopic}
              updateTopic={updateTopic}
              clearEditing={() => setEditingTopic(null)}
            />
          </div>

          {/* FILTERS */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md flex flex-col gap-4 justify-center">
            <h2 className="font-semibold text-lg">🔍 Filters</h2>

            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              placeholder="Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        {/* LIST */}
        <div className="flex justify-center">
          <TopicList
            topics={filteredTopics}
            deleteTopic={deleteTopic}
            updateStatus={updateStatus}
            setEditingTopic={setEditingTopic}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
