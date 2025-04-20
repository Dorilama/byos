import { test, describe } from "vitest";
import { simpleSignal, simpleComputed, simpleEffect } from "../test";
import { signalFunctions } from ".";

describe(`@preact/signals-core`, () => {
  test(`simpleSignal`, () => {
    simpleSignal(signalFunctions);
  });
  test(`simpleComputed`, () => {
    simpleComputed(signalFunctions);
  });
  test(`simpleEffect`, () => {
    simpleEffect(signalFunctions);
  });
});
