import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LiveUpdates from "../components/LiveUpdates";
import { describe, it, expect, vi } from "vitest";

global.WebSocket = class {
  onopen = () => {};
  onmessage: ((event: MessageEvent) => void) | null = null;
  onclose = () => {};
  send = vi.fn();
  close = vi.fn();
  readyState = 1;

  constructor() {
    setTimeout(() => {
      this.onmessage?.({
        data: JSON.stringify({
          id: 1,
          avatar: "/avatars/1.png",
          name: "Test User",
          status: "Testing!",
          timestamp: "01/01/2025, 10:00 AM",
        }),
      } as MessageEvent);
    }, 10);
  }
} as any;

describe("LiveUpdates component", () => {
  it("renders the title and Share button", () => {
    render(<LiveUpdates />);
    expect(screen.getByText("Live Updates")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("displays incoming WebSocket messages", async () => {
    render(<LiveUpdates />);
    await waitFor(() => {
      expect(screen.getByText('"Testing!"')).toBeInTheDocument();
      expect(screen.getByText(/Test User/)).toBeInTheDocument();
    });
  });
});
