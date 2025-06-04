import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import ChallengeDetailCard from "../components/ChallengeDetailCard";
import type { GoalType } from "../data/challenges";

vi.stubGlobal("localStorage", {
  getItem: () => null,
  setItem: vi.fn(),
});

const props = {
  title: "1-Day Challenge",
  imageUrl: "/test.jpg",
  duration: 1,
  dailyGoals: [{ day: 1, description: "Run 5km" }],
  goalType: "numeric" as GoalType,
  challengeKey: "1-Day Challenge",
  description: "Running test challenge",
  finalObjective: 100,
};

describe("ChallengeDetailCard (numeric, 1 day)", () => {
  it("starts at 0% and reaches 100% when goal is met", () => {
    render(<ChallengeDetailCard {...props} />);

    // Check initial progress is 0%
    expect(screen.getByText(/Progress: 0%/)).toBeInTheDocument();

    // Find the input we enter the expected objective
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "100" } });

    // Now it should show 100%
    expect(screen.getByText(/Progress: 100%/)).toBeInTheDocument();
  });
});
