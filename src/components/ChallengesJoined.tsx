import { useEffect, useState } from "react";
import { challenges, type GoalType } from "../data/challenges";
import ChallengeDetailCard from "./ChallengeDetailCard";
import ChallengeFriendDetailCard from "./ChallengeFriendDetailCard";
import {
  CHALLENGED_FRIENDS_STORAGE_KEY,
  JOINED_CHALLENGES_STORAGE_KEY,
} from "../constants/constants";

type DayProgress = {
  userProgress: string;
  completed: boolean;
};

export type JoinedChallenge = {
  joinedAt: string;
  progress: Record<number, DayProgress>;
};

type StoredChallengedFriend = {
  title: string;
  joinedAt: string;
  goalType: GoalType;
  progress: Record<number, number>;
  friend: string;
  friendProgress: Record<number, number>;
};

//This is for challenges page, displays all challenges the user has joined or that has challenged friends,
//allows to see details about them and update progress.
const ChallengesJoined = () => {
  const [joined, setJoined] = useState<Record<string, JoinedChallenge>>({});
  const [challengedFriends, setChallengedFriends] = useState<
    StoredChallengedFriend[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem(JOINED_CHALLENGES_STORAGE_KEY);
    if (stored) {
      setJoined(JSON.parse(stored));
    }

    const challengedRaw = localStorage.getItem(CHALLENGED_FRIENDS_STORAGE_KEY);
    if (challengedRaw) {
      setChallengedFriends(JSON.parse(challengedRaw));
    }
  }, []);

  const joinedTitles = Object.keys(joined);
  const joinedData = challenges.filter((c) => joinedTitles.includes(c.title));

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {joinedData.map((challenge) => {
        const totalDays = challenge.dailyGoals.length;
        return (
          <ChallengeDetailCard
            key={`${challenge.title}-${joined[challenge.title]?.joinedAt}`}
            title={challenge.title}
            imageUrl={challenge.image}
            duration={totalDays}
            dailyGoals={challenge.dailyGoals}
            goalType={challenge.goalType}
            challengeKey={challenge.title}
            description={challenge.description}
            finalObjective={challenge.finalObjective}
          />
        );
      })}
      {challengedFriends.map((item, index) => {
        const fullChallenge = challenges.find((c) => c.title === item.title);
        if (!fullChallenge) return null;

        return (
          <ChallengeFriendDetailCard
            key={`friend-${item.friend}-${item.title}-${item.joinedAt}`}
            title={item.title}
            imageUrl={fullChallenge.image}
            duration={fullChallenge.dailyGoals.length}
            dailyGoals={fullChallenge.dailyGoals}
            goalType={item.goalType}
            challengeKey={item.title}
            description={fullChallenge.description}
            finalObjective={fullChallenge.finalObjective}
            friendName={item.friend}
          />
        );
      })}
    </div>
  );
};

export default ChallengesJoined;
