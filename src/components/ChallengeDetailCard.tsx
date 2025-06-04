import { Clock3, Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { GoalType } from "../data/challenges";
import type { JoinedChallenge } from "./ChallengesJoined";
import Pagination from "./Pagination";
import {
  ITEMS_PER_PAGE,
  JOINED_CHALLENGES_STORAGE_KEY,
  MEDAL_IMAGE,
} from "../constants/constants";

interface DailyGoal {
  day: number;
  description: string;
}

interface ChallengeDetailCardProps {
  title: string;
  imageUrl: string;
  duration: number;
  dailyGoals: DailyGoal[];
  goalType: GoalType;
  challengeKey: string;
  description: string;
  finalObjective: number;
}

//Card for displaying details of a challenge, including progress tracking when individual.
const ChallengeDetailCard = ({
  title,
  imageUrl,
  duration,
  dailyGoals,
  goalType,
  challengeKey,
  description,
  finalObjective,
}: ChallengeDetailCardProps) => {
  const [page, setPage] = useState(0);
  const [numericData, setNumericData] = useState<Record<number, number>>({});
  const [checkboxData, setCheckboxData] = useState<Record<number, boolean>>({});
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [animating, setAnimating] = useState(false);

  const start = page * ITEMS_PER_PAGE;
  const visibleGoals = dailyGoals.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(dailyGoals.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const stored = localStorage.getItem(JOINED_CHALLENGES_STORAGE_KEY);
    if (stored) {
      const parsed: Record<string, JoinedChallenge> = JSON.parse(stored);
      const challengeProgress = parsed[challengeKey]?.progress || {};
      const numeric: Record<number, number> = {};
      const checkbox: Record<number, boolean> = {};

      for (const [dayStr, value] of Object.entries(challengeProgress)) {
        const day = Number(dayStr);
        if (goalType === "objective") {
          checkbox[day] = Boolean(value.userProgress);
        } else {
          numeric[day] = Number(value.userProgress);
        }
      }

      setNumericData(numeric);
      setCheckboxData(checkbox);
    }
  }, [challengeKey, goalType]);

  const handleInputChange = (day: number, value: number | boolean) => {
    const stored = localStorage.getItem(JOINED_CHALLENGES_STORAGE_KEY);
    const fullData = stored ? JSON.parse(stored) : {};
    const challenge = fullData[challengeKey] || {
      joinedAt: new Date().toISOString(),
      progress: {},
    };

    if (goalType === "objective") {
      const checked = Boolean(value);
      setCheckboxData((prev) => ({ ...prev, [day]: checked }));
      challenge.progress[day] = {
        userProgress: checked,
        completed: checked,
      };
    } else {
      const num = Number(value);
      setNumericData((prev) => ({ ...prev, [day]: num }));
      challenge.progress[day] = {
        userProgress: num,
        completed: !!num,
      };
    }

    fullData[challengeKey] = challenge;
    localStorage.setItem(
      JOINED_CHALLENGES_STORAGE_KEY,
      JSON.stringify(fullData)
    );
  };

  //To track progress, we calculate it based on the goal type.
  const progress = (() => {
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

  return (
    <div className="relative bg-[#323232] text-white rounded-lg p-4 w-full max-w-sm">
      {progress >= 100 && (
        <img src={MEDAL_IMAGE} alt="Completed" className="medal-jump" />
      )}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-left">{title}</h2>

      <div className="flex items-center gap-2 mt-2 text-left">
        <Clock3 size={18} fill="#ffffff" color="#323232" />
        <span>{duration} days</span>
      </div>

      <div className="flex items-center gap-2 mt-2 text-left">
        <Star size={18} fill="#ffffff" />
        <span>Progress: {progress}%</span>
        <div className="flex-1 h-2 bg-neutral-700 rounded overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 text-left">
        <span>{description}</span>
      </div>
      <div
        key={page}
        className={`w-full pt-6 ${
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
        <div className="grid gap-4 justify-center">
          {visibleGoals.map((goal) => (
            <div
              key={goal.day}
              className="grid grid-cols-[3rem_1fr] gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-sm shrink-0">
                Day {goal.day}
              </div>
              <div className="flex-1">
                {goalType === "objective" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checkboxData[goal.day] || false}
                      onChange={(e) =>
                        handleInputChange(goal.day, e.target.checked)
                      }
                      className="w-4 h-4 accent-green-500"
                    />
                    <span>{goal.description}</span>
                  </div>
                ) : (
                  <div>
                    <span className="block mb-1 flex">{goal.description}</span>

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
                  </div>
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

export default ChallengeDetailCard;
