import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import ChallengesAvailable from "../components/ChallengesAvailable";

vi.mock("../data/challenges", () => ({
  challenges: [
    {
      title: "Test Challenge",
      description: "A simple test challenge.",
      image: "/test-image.png",
      dailyGoals: new Array(7).fill({ description: "Goal" }),
    },
  ],
}));

vi.stubGlobal("localStorage", {
  getItem: () => null,
  setItem: vi.fn(),
});

describe("ChallengesAvailable", () => {
  it("renders challenge title, description, and duration", () => {
    render(<ChallengesAvailable />);

    expect(screen.getByText("Test Challenge")).toBeInTheDocument();
    expect(screen.getByText("A simple test challenge.")).toBeInTheDocument();
    expect(screen.getByText("7 days")).toBeInTheDocument(); // Duration
  });
});
