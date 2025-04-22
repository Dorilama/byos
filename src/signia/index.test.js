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
import { signalFunctions } from ".";

describe("signia", () => {
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
  // can't run because signia cannot change atoms during reaction cycle
  // test("useCounter", async () => {
  //   await testUseCounter(signalFunctions);
  // });
  test("testEffectCleanup", async () => {
    await testEffectCleanup(signalFunctions);
  });
  // can't run because signia cannot change atoms during reaction cycle
  // test("testComputedCleanup", async () => {
  //   await testComputedCleanup(signalFunctions);
  // });
});
