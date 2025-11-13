import { test, describe, expect } from "vitest";
import { createUsePeek, createSignalFunctions, noop } from "./index";

describe("check exports", () => {
  test("createUsePeek", () => {
    expect(createUsePeek).toBeDefined();
  });
  test("createSignalFunctions", () => {
    expect(createSignalFunctions).toBeDefined();
  });
  test("noop", () => {
    expect(noop).toBeDefined();
  });
});
