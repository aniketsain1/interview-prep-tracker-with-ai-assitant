import { useEffect, useState } from "react";

/* ================= TYPES ================= */

export type Status = "Not Started" | "In Progress" | "Done";
export type Difficulty = "Easy" | "Medium" | "Hard";

export type Topic = {
  id: number;
  title: string;
  category: string;
  difficulty: Difficulty;
  status: Status;
};

/* ================= HOOK ================= */

export default function useTopics() {

  // ✅ Lazy initialization (FIXED)
  const [topics, setTopics] = useState<Topic[]>(() => {
    try {
      const stored = localStorage.getItem("topics");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ✅ Persist data
  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  /* ================= ACTIONS ================= */

  const addTopic = (topic: Omit<Topic, "id">) => {
    const newTopic: Topic = {
      ...topic,
      id: Date.now(),
    };

    setTopics((prev) => [...prev, newTopic]);
  };

  const deleteTopic = (id: number) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
  };

  const updateStatus = (id: number, status: Status) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const updateTopic = (updatedTopic: Topic) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === updatedTopic.id ? updatedTopic : t
      )
    );
  };

  const clearAll = () => setTopics([]);

  return {
    topics,
    addTopic,
    deleteTopic,
    updateStatus,
    updateTopic,
    clearAll,
  };
}