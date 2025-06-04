import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../data/challenges", () => ({
  challenges: [
    {
      title: "Test Challenge",
      description: "This is a joined challenge.",
      image: "/joined.png",
      dailyGoals: Array(5).fill({ description: "Goal" }),
      goalType: "objective",
      finalObjective: 10,
    },
  ],
}));

vi.stubGlobal("localStorage", {
  getItem: (key: string) => {
    if (key === "joinedChallenges") {
      return JSON.stringify({
        "Test Challenge": {
          joinedAt: "2024-01-01T00:00:00.000Z",
          progress: {},
        },
      });
    }
    return null;
  },
  setItem: vi.fn(),
});

import ChallengesJoined from "../components/ChallengesJoined";

describe("ChallengesJoined (individual challenges only)", () => {
  it("renders ChallengeDetailCard with title, description, and duration", () => {
    render(<ChallengesJoined />);
    expect(screen.getByText("Test Challenge")).toBeInTheDocument();
    expect(screen.getByText("This is a joined challenge.")).toBeInTheDocument();
    expect(screen.getByText("5 days")).toBeInTheDocument();
  });
});
