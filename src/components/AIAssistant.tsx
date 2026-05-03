import { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", text: input };
    const aiPlaceholder: Message = { role: "ai", text: "Thinking..." };

    setMessages((prev) => [...prev, userMessage, aiPlaceholder]);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });
      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: data?.reply?.trim() || "⚠️ Empty response",
        };
        return updated;
      });

    } catch (err) {
      console.error(err);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: "⚠️ Failed to respond. Try again.",
        };
        return updated;
      });

    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // 🔥 Topic click → autofill
  useEffect(() => {
    const handler = (e: any) => {
      setInput(`Explain ${e.detail} with interview questions`);
    };

    window.addEventListener("askAI", handler);
    return () => window.removeEventListener("askAI", handler);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow w-full flex flex-col h-[400px]">

      <h2 className="font-bold mb-2">🤖 AI Assistant</h2>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto border p-3 mb-3 rounded bg-gray-50 space-y-2">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-2 rounded text-sm
              ${
                msg.role === "user"
                  ? "ml-auto bg-orange-500 text-white"
                  : "mr-auto bg-gray-100 border text-gray-800"
              }
            `}
          >
            {msg.text}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        className="border p-2 w-full rounded"
        placeholder="Ask interview questions..."
        disabled={loading}
      />

      {/* BUTTON */}
      <button
        onClick={sendMessage}
        disabled={loading}
        className={`px-4 py-2 mt-2 w-full text-white rounded transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
          }`}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default AIAssistant;