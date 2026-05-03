import type { Topic, Status } from "../hooks/useTopics";

type Props = {
  topics: Topic[];
  deleteTopic: (id: number) => void;
  updateStatus: (id: number, status: Status) => void;
  setEditingTopic: (topic: Topic) => void;
};

const TopicList = ({
  topics,
  deleteTopic,
  updateStatus,
  setEditingTopic,
}: Props) => {

  if (topics.length === 0) {
    return <p className="text-gray-500 text-center">No topics found 🚀</p>;
  }

  return (
    <div className="w-full max-w-md space-y-4">
      {topics.map((topic) => (
        <div key={topic.id} className="bg-white p-4 rounded shadow">

          <h3 className="font-bold">{topic.title}</h3>
          <p>Category: {topic.category}</p>
          <p>Difficulty: {topic.difficulty}</p>

          <div className="flex gap-2 mt-2">

            {/* ✅ FIXED */}
            <select
              value={topic.status}
              onChange={(e) =>
                updateStatus(topic.id, e.target.value as Status)
              }
              className="border p-1 rounded"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <button
              onClick={() => deleteTopic(topic.id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => setEditingTopic(topic)}
              className="bg-blue-500 text-white px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("askAI", {
                    detail: topic.title,
                  })
                )
              }
              className="bg-purple-500 text-white px-2 rounded cursor-pointer hover:bg-purple-600 transition">
              Ask AI
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicList;