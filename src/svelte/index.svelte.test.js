// @vitest-environment happy-dom
import { test, describe } from "vitest";
import {
  simpleSignal,
  simpleComputed,
  simpleEffect,
  simpleMaybeSignal,
} from "../test";
import { testUseCounter } from "../test/counter";
import { testEffectCleanup } from "../test/effectCleanup";
import { testComputedCleanup } from "../test/computedCleanup";
import { signalFunctions } from "./index.svelte";

describe.only("svelte", () => {
  test("simpleSignal", () => {
    simpleSignal(signalFunctions);
  });
  test("simpleComputed", () => {
    simpleComputed(signalFunctions);
  });
  test("simpleEffect", async () => {
    await simpleEffect(signalFunctions);
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
