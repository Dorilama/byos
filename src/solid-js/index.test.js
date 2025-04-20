import { test, describe } from "vitest";
import { simpleSignal, simpleComputed, simpleEffect } from "../test";
import { signalFunctions } from ".";
import { testEffect } from "@solidjs/testing-library";

describe(`solid-js`, () => {
  test(`simpleSignal`, () => {
    simpleSignal(signalFunctions);
  });
  test(`simpleComputed`, async () => {
    await testEffect((done) => {
      simpleComputed(signalFunctions);
      done();
    });
  });
  test(`simpleEffect`, async () => {
    await testEffect((done) => {
      simpleEffect(signalFunctions);
      done();
    });
  });
});
