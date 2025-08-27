import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useTimer from "./useTimer";

const mockCallback = vi.fn(() => console.log("callback"));

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("init Timer", () => {
    const { result } = renderHook(() => useTimer({ duration: 5 }));
    expect(result.current.timer).toBe(5);
  });

  it("playTimer and callback", () => {
    const { result } = renderHook(() =>
      useTimer({ duration: 5, callback: mockCallback })
    );
    expect(result.current.timer).toBe(5);
    result.current.playTimer();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.timer).toBe(0);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("cancel timer", () => {
    const { result } = renderHook(() => useTimer({ duration: 5 }));
    expect(result.current.timer).toBe(5);
    result.current.playTimer();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.timer).toBe(2);
    act(() => {
      result.current.cancelTimer();
    });
    expect(result.current.timer).toBe(5);
  });

  it("update timer", () => {
    const { result } = renderHook(() => useTimer({ duration: 5 }));
    expect(result.current.timer).toBe(5);
    act(() => {
      result.current.updateTimer(10);
    });
    expect(result.current.timer).toBe(10);
  });
});
