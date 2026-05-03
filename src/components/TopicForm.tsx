import { useState, useEffect } from "react";
import type { Topic, Difficulty } from "../hooks/useTopics";

type Props = {
  addTopic: (topic: Omit<Topic, "id">) => void;
  editingTopic: Topic | null;
  updateTopic: (topic: Topic) => void;
  clearEditing: () => void;
};

const TopicForm = ({
  addTopic,
  editingTopic,
  updateTopic,
  clearEditing,
}: Props) => {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");

  useEffect(() => {
    if (editingTopic) {
      setTitle(editingTopic.title);
      setCategory(editingTopic.category);
      setDifficulty(editingTopic.difficulty);
    }
  }, [editingTopic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingTopic) {
      updateTopic({
        ...editingTopic,
        title,
        category,
        difficulty,
      });
      clearEditing();
    } else {
      addTopic({
        title,
        category,
        difficulty,
        status: "Not Started",
      });
    }

    setTitle("");
    setCategory("");
    setDifficulty("Easy");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <h2 className="text-lg font-bold">
        {editingTopic ? "✏️ Edit Topic" : "➕ Add Topic"}
      </h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Topic"
        className="border px-3 py-2 rounded"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="border px-3 py-2 rounded"
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        className="border px-3 py-2 rounded"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button className="bg-orange-500 text-white py-2 rounded">
        {editingTopic ? "Update" : "Add"}
      </button>

      {editingTopic && (
        <button onClick={clearEditing} type="button">
          Cancel
        </button>
      )}

    </form>
  );
};

export default TopicForm;