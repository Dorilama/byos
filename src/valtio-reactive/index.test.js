import { test, describe } from "vitest";
import {
  simpleSignal,
  simpleComputed,
  simpleEffect,
  simpleMaybeSignal,
  simpleShallow,
  simpleDeep,
} from "../test";
import { testUseCounter } from "../test/counter";
import { testEffectCleanup } from "../test/effectCleanup";
import { testComputedCleanup } from "../test/computedCleanup";
import { testUsePeek } from "../test/peek";
import { signalFunctions } from ".";

describe("valtio-reactive", () => {
  test("simpleSignal", () => {
    simpleSignal(signalFunctions);
  });
  test("simpleComputed", () => {
    simpleComputed(signalFunctions);
  });
  test("simpleEffect", async () => {
    await simpleEffect(signalFunctions);
  });
  test("simpleShallow", () => {
    simpleShallow(signalFunctions, (s, n) => {
      s.value.a = n;
    });
  });
  // todo!!! fix this
  test.skip("simpleDeep", () => {
    simpleDeep(signalFunctions, (s, n) => {
      s.value.a = n;
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
  // todo! check unwatching computed
  test.skip("testComputedCleanup", async () => {
    await testComputedCleanup(signalFunctions);
  });
  test("testUsePeek", async () => {
    await testUsePeek(signalFunctions);
  });
});
