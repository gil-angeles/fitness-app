import { useEffect, useState } from "react";
import { challenges } from "../data/challenges";
import ChallengeCard from "./ChallengeCard";
import { JOINED_CHALLENGES_STORAGE_KEY } from "../constants/constants";

type DayProgress = {
  userProgress: string;
  completed: boolean;
};

type JoinedChallenge = {
  joinedAt: string;
  progress: Record<number, DayProgress>;
};

// Lists all available challenges from challenges.ts, allows to join one and
// tracks which ones the user has joined/completed from localStorage.
const ChallengesAvailable = () => {
  const [joined, setJoined] = useState<Record<string, JoinedChallenge>>({});

  useEffect(() => {
    const stored = localStorage.getItem(JOINED_CHALLENGES_STORAGE_KEY);
    if (stored) {
      setJoined(JSON.parse(stored));
    }
  }, []);

  const handleJoinChallenge = (challengeTitle: string) => {
    const newEntry = {
      joinedAt: new Date().toISOString(),
      progress: {} as Record<number, DayProgress>,
    };
    const updated = { ...joined, [challengeTitle]: newEntry };
    setJoined(updated);
    localStorage.setItem(
      JOINED_CHALLENGES_STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  return (
    <div className="space-y-6">
      {challenges.map((challenge, index) => (
        <div
          key={challenge.title}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <ChallengeCard
            title={challenge.title}
            description={challenge.description}
            imageUrl={challenge.image}
            joined={Boolean(joined[challenge.title])}
            onJoin={() => handleJoinChallenge(challenge.title)}
            duration={challenge.dailyGoals.length}
          />
        </div>
      ))}
    </div>
  );
};

export default ChallengesAvailable;
