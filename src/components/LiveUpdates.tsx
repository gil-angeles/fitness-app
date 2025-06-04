import { useEffect, useRef, useState } from "react";

interface LiveUpdate {
  id: number;
  avatar: string;
  status: string;
  name: string;
  timestamp: string;
}

// Component to display live updates from a WebSocket connection, picking up random status updates and displaying them in
const LiveUpdates = () => {
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    ws.current = socket;

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const update: LiveUpdate = message;

        setUpdates((prev) => {
          const newList = [update, ...prev];
          return newList.slice(0, 7); // To avoid having too many updates listed just display the latest 7
        });
      } catch (err) {
        console.error("Invalid WebSocket message:", err);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleShare = () => {
    if (
      !newStatus.trim() ||
      !ws.current ||
      ws.current.readyState !== WebSocket.OPEN
    )
      return;

    const payload = {
      id: Date.now(),
      avatar: "/avatars/1.png",
      name: "You",
      status: newStatus,
      timestamp: new Date().toLocaleString("en-US"),
    };

    ws.current.send(JSON.stringify(payload));
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-md mt-6 bg-[#323232] rounded-lg p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Live Updates</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm px-3 py-1 bg-[#cc221a] rounded"
        >
          Share
        </button>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className="flex gap-3 items-start animate-fade-in"
          >
            <img
              src={update.avatar}
              alt={update.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm italic">"{update.status}"</p>
              <p className="text-xs text-neutral-400 mt-1">
                {update.name} • {update.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-medium mb-3">Share a status update</h3>
            <textarea
              rows={3}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 rounded bg-neutral-800 text-white mb-4"
              placeholder="What's on your mind?"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-neutral-600 hover:bg-neutral-500 px-4 py-1 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#cc221a] hover:bg-[#e63535] px-4 py-1 rounded"
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveUpdates;
