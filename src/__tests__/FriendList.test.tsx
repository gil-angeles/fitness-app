import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../data/friends", () => ({
  friends: [
    { name: "Peter Parker", avatar: "/avatars/1.png" },
    { name: "Bruce Wayne", avatar: "/avatars/2.png" },
  ],
}));

vi.mock("../data/challenges", () => ({
  challenges: [],
}));

vi.stubGlobal("localStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
});

global.WebSocket = class {
  onopen = () => {};
  onmessage = () => {};
  onclose = () => {};
  send = vi.fn();
  close = vi.fn();
  readyState = 1;
} as any;

import FriendList from "../components/FriendList";

describe("FriendList component", () => {
  it("displays friend names and challenge buttons", () => {
    render(<FriendList />);

    expect(screen.getByText("Peter Parker")).toBeInTheDocument();
    expect(screen.getByText("Bruce Wayne")).toBeInTheDocument();

    const challengeButtons = screen.getAllByText("Challenge");
    expect(challengeButtons.length).toBe(2);
  });
});
