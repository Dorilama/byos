import { test, describe } from "vitest";
import {
  simpleSignal,
  simpleComputed,
  simpleEffect,
  simpleMaybeSignal,
  simpleShallow,
} from "../test";
import { testUseCounter } from "../test/counter";
import { testEffectCleanup } from "../test/effectCleanup";
import { testComputedCleanup } from "../test/computedCleanup";
import { signalFunctions } from ".";
import { configure } from "mobx";

configure({ enforceActions: "never" });

describe("mobx", () => {
  test("simpleSignal", () => {
    simpleSignal(signalFunctions);
  });
  test("simpleComputed", () => {
    simpleComputed(signalFunctions);
  });
  test("simpleEffect", async () => {
    await simpleEffect(signalFunctions);
  });
  // todo!! fix this
  test.skip("simpleShallow", () => {
    simpleShallow(signalFunctions, (s, n) => {
      const t = s.get();
      if (t) {
        t.a = n;
      }
    });
  });
  test("simpleMaybeSignal", () => {
    simpleMaybeSignal(signalFunctions);
  });
  test("useCounter", async () => {
    await testUseCounter(signalFunctions);
  });
  test("testEffectCleanup", async () => {
    await testEffectCleanup(signalFunctions);
  });
  test("testComputedCleanup", async () => {
    await testComputedCleanup(signalFunctions);
  });
});
