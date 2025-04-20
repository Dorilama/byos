import { test, describe } from "vitest";
import { simpleSignal, simpleComputed, simpleEffect } from "../test";
import { signalFunctions } from ".";
import { testUseCounter } from "../test/counter";
import { testEffectCleanup } from "../test/effectCleanup";
import { testComputedCleanup } from "../test/computedCleanup";
import { testEffect } from "@solidjs/testing-library";

describe.only(`solid-js`, () => {
  test(`simpleSignal`, () => {
    simpleSignal(signalFunctions);
  });
  test(`simpleComputed`, () => {
    simpleComputed(signalFunctions);
  });
  test(`simpleEffect`, () => {
    simpleEffect(signalFunctions);
  });
  test(`useCounter`, () => {
    testUseCounter(signalFunctions);
  });
  test(`testEffectCleanup`, () => {
    testEffectCleanup(signalFunctions);
  });
  test(`testComputedCleanup`, () => {
    testComputedCleanup(signalFunctions);
  });
});
