import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../data/challenges", () => ({
  challenges: [
    {
      title: "Running",
      description: "Test Challenge",
      image: "/friend.png",
      dailyGoals: Array(3).fill({ description: "Goal" }),
      goalType: "objective",
      finalObjective: 7,
    },
  ],
}));

vi.stubGlobal("localStorage", {
  getItem: (key: string) => {
    if (key === "challengedFriends") {
      return JSON.stringify([
        {
          title: "Running",
          joinedAt: "2024-01-01T00:00:00.000Z",
          goalType: "objective",
          progress: {},
          friend: "Bruce",
          friendProgress: {},
        },
      ]);
    }
    return null;
  },
  setItem: vi.fn(),
});

import ChallengesJoined from "../components/ChallengesJoined";

describe("ChallengesJoined (challenged friends only)", () => {
  it("renders ChallengeFriendDetailCard with title, description, and duration", () => {
    render(<ChallengesJoined />);
    expect(screen.getByText("Running")).toBeInTheDocument();
    expect(screen.getByText("Test Challenge")).toBeInTheDocument();
    expect(screen.getByText("3 days")).toBeInTheDocument();
    expect(screen.getByText("Challenging Bruce")).toBeInTheDocument();
  });
});
