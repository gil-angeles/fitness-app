import { useEffect, useRef, useState } from "react";
import { friends } from "../data/friends";
import { challenges } from "../data/challenges"; // make sure path is correct
import { Clock3 } from "lucide-react";
import { CHALLENGED_FRIENDS_STORAGE_KEY } from "../constants/constants";

// This component displays a list of friends, allows the user to challenge them
// and automatically sends a live notification via WebSocket. It stores data into
// localStorage to be picked up by the ChallengesJoined component.
const FriendList = () => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    return () => {
      ws.current?.close();
    };
  }, []);

  const [challenging, setChallenging] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  return (
    <div className="bg-[#323232] rounded-lg p-4 w-full max-w-sm text-white">
      <h2 className="text-lg font-semibold mb-4">Friends</h2>
      <ul className="space-y-3">
        {friends.map((friend, index) => (
          <li key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm">{friend.name}</span>
            </div>
            <button
              className="text-[10px] bg-[#cc221a] hover:bg-[#e63535] px-2 py-[2px] rounded"
              onClick={() => setChallenging(friend.name)}
            >
              Challenge
            </button>
          </li>
        ))}
      </ul>

      {challenging && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] text-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg mb-4">Challenging {challenging}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {challenges.map((challenge) => {
                const isSelected = selectedTitle === challenge.title;
                return (
                  <div
                    key={challenge.title}
                    onClick={() => setSelectedTitle(challenge.title)}
                    className={`cursor-pointer border rounded-lg p-3 transition ${
                      isSelected
                        ? "border-[#cc221a] bg-[#3a3a3a]"
                        : "border-neutral-600"
                    } hover:border-[#cc221a]`}
                  >
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-28 object-cover rounded mb-2"
                    />
                    <h4 className="text-sm font-semibold">{challenge.title}</h4>
                    <p className="text-xs text-neutral-300">
                      {challenge.description}
                    </p>
                    <p className="flex items-center text-xs text-neutral-400 mt-1">
                      <Clock3 size={16} className="mr-1" />
                      {challenge.dailyGoals.length} days
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setChallenging(null);
                  setSelectedTitle(null);
                }}
                className="bg-neutral-600 hover:bg-neutral-500 px-4 py-1 rounded"
              >
                Cancel
              </button>
              {selectedTitle && (
                <button
                  className="bg-[#cc221a] hover:bg-[#e63535] px-4 py-1 rounded"
                  onClick={() => {
                    const selectedChallenge = challenges.find(
                      (c) => c.title === selectedTitle
                    );
                    if (!selectedChallenge) return;

                    const initializedProgress =
                      selectedChallenge.dailyGoals.reduce(
                        (acc, goal) => {
                          acc[goal.day] = 0;
                          return acc;
                        },
                        {} as Record<number, number>
                      );

                    const initializedFriendProgress =
                      selectedChallenge.dailyGoals.reduce(
                        (acc, goal) => {
                          acc[goal.day] = 0;
                          return acc;
                        },
                        {} as Record<number, number>
                      );

                    const newEntry = {
                      title: selectedChallenge.title,
                      goalType: selectedChallenge.goalType,
                      joinedAt: new Date().toISOString(),
                      progress: initializedProgress,
                      friend: challenging!,
                      friendProgress: initializedFriendProgress,
                    };

                    const existing = localStorage.getItem(
                      CHALLENGED_FRIENDS_STORAGE_KEY
                    );
                    const parsed: (typeof newEntry)[] = existing
                      ? JSON.parse(existing)
                      : [];

                    parsed.push(newEntry);

                    localStorage.setItem(
                      CHALLENGED_FRIENDS_STORAGE_KEY,
                      JSON.stringify(parsed)
                    );

                    if (
                      ws.current &&
                      ws.current.readyState === WebSocket.OPEN
                    ) {
                      ws.current.send(
                        JSON.stringify({
                          id: Date.now(),
                          avatar: "/avatars/1.png",
                          name: "You",
                          status: `I just challenged ${challenging} in ${selectedTitle}`,
                          timestamp: new Date().toLocaleString("en-US"),
                        })
                      );
                    }

                    setChallenging(null);
                    setSelectedTitle(null);
                  }}
                >
                  Challenge
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendList;
