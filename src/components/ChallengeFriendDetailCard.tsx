import { Check, Clock3, X } from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import type { GoalType } from "../data/challenges";
import {
  CHALLENGED_FRIENDS_STORAGE_KEY,
  ITEMS_PER_PAGE,
  MEDAL_IMAGE,
} from "../constants/constants";

interface DailyGoal {
  day: number;
  description: string;
}

interface ChallengeFriendDetailCardProps {
  title: string;
  imageUrl: string;
  duration: number;
  dailyGoals: DailyGoal[];
  goalType: GoalType;
  challengeKey: string;
  description: string;
  finalObjective: number;
  friendName: string;
}

//Card for displaying details of a challenge with a friend, displaying progress tracking for both users.
const ChallengeFriendDetailCard = ({
  title,
  imageUrl,
  duration,
  dailyGoals,
  goalType,
  description,
  finalObjective,
  friendName,
}: ChallengeFriendDetailCardProps) => {
  const [page, setPage] = useState(0);
  const [numericData, setNumericData] = useState<Record<number, number>>({});
  const [checkboxData, setCheckboxData] = useState<Record<number, boolean>>({});
  const [friendData, setFriendData] = useState<Record<number, number>>({});

  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [animating, setAnimating] = useState(false);

  const start = page * ITEMS_PER_PAGE;
  const visibleGoals = dailyGoals.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(dailyGoals.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const stored = localStorage.getItem(CHALLENGED_FRIENDS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const match = parsed.find(
        (item: any) => item.title === title && item.friend === friendName
      );

      if (match) {
        const progress = match.progress || {};
        const friendProgress = match.friendProgress || {};
        const numeric: Record<number, number> = {};
        const checkbox: Record<number, boolean> = {};

        for (const dayStr of Object.keys(progress)) {
          const day = Number(dayStr);
          const value = progress[day];

          if (goalType === "objective") {
            checkbox[day] = Boolean(value);
          } else {
            numeric[day] = Number(value);
          }
        }

        setCheckboxData(checkbox);
        setNumericData(numeric);
        setFriendData(friendProgress);
      }
    }
  }, [title, friendName, goalType]);

  const handleInputChange = (day: number, value: number | boolean) => {
    const stored = localStorage.getItem(CHALLENGED_FRIENDS_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    const updated = parsed.map((item: any) => {
      if (item.title === title && item.friend === friendName) {
        const newProgress = { ...item.progress };

        if (goalType === "objective") {
          const checked = Boolean(value);
          newProgress[day] = checked;
          setCheckboxData((prev) => ({ ...prev, [day]: checked }));
        } else {
          const num = Number(value);
          newProgress[day] = num;
          setNumericData((prev) => ({ ...prev, [day]: num }));
        }

        return { ...item, progress: newProgress };
      }
      return item;
    });

    localStorage.setItem(
      CHALLENGED_FRIENDS_STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  const userProgress = (() => {
    if (goalType === "objective") {
      const completedCount = Object.values(checkboxData).filter(Boolean).length;
      return Math.min(Math.round((completedCount / duration) * 100), 100);
    } else {
      const currentTotal = Object.values(numericData).reduce(
        (a, b) => a + b,
        0
      );
      return Math.min(Math.round((currentTotal / finalObjective) * 100), 100);
    }
  })();

  const friendProgress = (() => {
    const currentTotal = Object.values(friendData).reduce((a, b) => a + b, 0);
    return Math.min(Math.round((currentTotal / finalObjective) * 100), 100);
  })();

  return (
    <div className="relative bg-[#323232] text-white rounded-lg p-4 w-full max-w-3xl">
      {userProgress >= 100 && (
        <img src={MEDAL_IMAGE} alt="Completed" className="medal-jump" />
      )}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-left">
        Challenging {friendName}
      </h2>

      <h2 className="text-xl font-semibold text-left">{title}</h2>

      <div className="flex items-center gap-2 mt-2 text-left">
        <Clock3 size={18} fill="#ffffff" color="#323232" />
        <span>{duration} days</span>
      </div>

      <div className="mt-2 text-left">
        <div className="text-sm mb-1">Your progress: {userProgress}%</div>
        <div className="flex-1 h-2 bg-neutral-700 rounded overflow-hidden mb-2">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${userProgress}%` }}
          />
        </div>

        <div className="text-sm mb-1">
          {friendName} progress: {friendProgress}%
        </div>
        <div className="flex-1 h-2 bg-neutral-700 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${friendProgress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 text-left">
        <span>{description}</span>
      </div>

      <div className="mt-4 space-y-3 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-1 text-sm text-neutral-400">
          <div className="w-12" />
          <div className="flex-1 text-center w-20">You</div>
          <div className="w-16 text-center">{friendName}</div>
        </div>

        <div
          key={page}
          className={`${
            direction === "next"
              ? "animate-slide-in-from-right"
              : direction === "prev"
                ? "animate-slide-in-from-left"
                : ""
          }`}
          onAnimationEnd={() => {
            setAnimating(false);
            setDirection(null);
          }}
        >
          {visibleGoals.map((goal) => (
            <div key={goal.day} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-sm shrink-0">
                Day {goal.day}
              </div>
              <div className="flex-1">
                <span className="text-left block mb-1">{goal.description}</span>
                {goalType === "objective" ? (
                  <input
                    type="checkbox"
                    checked={checkboxData[goal.day] || false}
                    onChange={(e) =>
                      handleInputChange(goal.day, e.target.checked)
                    }
                  />
                ) : (
                  <input
                    type="number"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    value={numericData[goal.day] ?? ""}
                    onChange={(e) =>
                      handleInputChange(goal.day, Number(e.target.value))
                    }
                    className="px-2 py-1 rounded border border-white w-20"
                  />
                )}
              </div>
              <div className="w-16 flex items-center justify-center text-lg text-neutral-400 pt-4">
                {goalType === "objective" ? (
                  friendData[goal.day] ? (
                    <Check size={18} />
                  ) : (
                    <X size={18} />
                  )
                ) : (
                  friendData[goal.day] || 0
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={(newPage) => {
            if (animating || newPage === page) return;
            setDirection(newPage > page ? "next" : "prev");
            setAnimating(true);
            setPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default ChallengeFriendDetailCard;
