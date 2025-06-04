import { Bookmark, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { JOINED_CHALLENGES_STORAGE_KEY } from "../constants/constants";
import type { GoalType } from "../data/challenges";

interface ChallengeCardProps {
  imageUrl: string;
  title: string;
  description: string;
  joined: boolean;
  onJoin: () => void;
  duration: number;
  finalObjective?: number;
  goalType?: GoalType;
}

const ChallengeCard = ({
  imageUrl,
  title,
  description,
  joined,
  onJoin,
  duration = 0,
  finalObjective = 0,
  goalType = "objective",
}: ChallengeCardProps) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(JOINED_CHALLENGES_STORAGE_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const challenge = parsed[title];
    if (!challenge) return;

    const progress = challenge.progress || {};
    if (goalType === "objective") {
      const completedCount = Object.values(progress).filter(
        (entry: any) => entry.completed
      ).length;
      setCompleted(completedCount >= duration);
    } else {
      const total = Object.values(progress).reduce(
        (sum: number, entry: any) => {
          return sum + Number(entry.userProgress || 0);
        },
        0
      );
      setCompleted(total >= finalObjective);
    }
  }, [title, duration, goalType, finalObjective]);
  return (
    <div className="bg-[#323232] text-white rounded-lg p-4 flex gap-4 w-full max-w-xl">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-24 h-24 rounded-full object-cover shrink-0"
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="w-8 h-8 rounded-full bg-[#CC221A] flex items-center justify-center ml-2 shrink-0">
            <Bookmark
              size={18}
              color="#ffffff"
              fill={joined ? "#ffffff" : "none"}
              strokeWidth={2}
            />
          </div>
        </div>
        <p className="text-sm mt-1 text-gray-300">{description}</p>
        <p className="text-sm mt-1 text-gray-300 flex items-center gap-1">
          <Clock3 size={14} className="text-white" />
          {duration} days
        </p>
        <button
          className="mt-6 px-4 py-2 rounded-md w-fit hover:opacity-90 disabled:cursor-not-allowed"
          disabled={joined}
          onClick={onJoin}
        >
          {completed ? "Completed" : joined ? "In progress" : "Join"}
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
