import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { updateTabValue } from "./array.ts";

describe("useTimer", () => {
  it("test updateTabValue with number", () => {
    const updatedTab = updateTabValue([1, 2, 5, 6, 7], 2, 6);
    expect(updatedTab).toStrictEqual([1, 2, 6, 6, 7]);
  });

  it("test updateTabValue with object", () => {
    const tab = [
      { name: "toto", id: 6 },
      { name: "tata", id: 12 },
      { name: "titi", id: 45 },
    ];
    const idx = tab.findIndex((a) => a.id === 45);
    const updatedTab = updateTabValue(tab, idx, { name: "tutu", id: 45 });
    expect(updatedTab).toStrictEqual([
      { name: "toto", id: 6 },
      { name: "tata", id: 12 },
      { name: "tutu", id: 45 },
    ]);
  });

  it("test updateTabValue delete element", () => {
    const tab = [
      { name: "toto", id: 6 },
      { name: "tata", id: 12 },
      { name: "titi", id: 45 },
    ];
    const idx = tab.findIndex((a) => a.id === 45);
    const updatedTab = updateTabValue(tab, idx);
    expect(updatedTab).toStrictEqual([
      { name: "toto", id: 6 },
      { name: "tata", id: 12 },
    ]);
  });

  it("test updateTabValue delete first element", () => {
    const tab = [
      { name: "toto", id: 6 },
      { name: "tata", id: 12 },
      { name: "titi", id: 45 },
    ];
    const idx = tab.findIndex((a) => a.id === 6);
    const updatedTab = updateTabValue(tab, idx);
    expect(updatedTab).toStrictEqual([
      { name: "tata", id: 12 },
      { name: "titi", id: 45 },
    ]);
  });
});
