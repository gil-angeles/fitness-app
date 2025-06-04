import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../data/topPerformers", () => ({
  topPerformersData: [
    {
      challengeKey: "running",
      title: "Run 30k",
      performers: [
        { name: "Tom", progress: 100, avatar: "/avatars/3.png" },
        { name: "Jerry", progress: 95, avatar: "/avatars/1.png" },
        { name: "Scooby", progress: 90, avatar: "/avatars/5.png" },
        { name: "Shaggy", progress: 85, avatar: "/avatars/2.png" },
        { name: "Velma", progress: 80, avatar: "/avatars/4.png" },
      ],
    },
  ],
}));

import Leaderboards from "../components/Leaderboards";

describe("Leaderboards", () => {
  it("displays all performers and their progress", () => {
    render(<Leaderboards />);

    expect(screen.getByText("Run 30k")).toBeInTheDocument();

    const performers = [
      { name: "Tom", progress: "100%" },
      { name: "Jerry", progress: "95%" },
      { name: "Scooby", progress: "90%" },
      { name: "Shaggy", progress: "85%" },
      { name: "Velma", progress: "80%" },
    ];

    for (const { name, progress } of performers) {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(progress)).toBeInTheDocument();
    }
  });
});
