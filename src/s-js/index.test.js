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
import S from "s-js";

describe.only("s-js", () => {
  test("simpleSignal", () => {
    simpleSignal(signalFunctions);
  });
  test("simpleComputed", async () => {
    await new Promise((res, rej) => {
      S.root((dispose) => {
        try {
          simpleComputed(signalFunctions);
          res("ok");
        } catch (error) {
          rej(error);
        } finally {
          dispose();
        }
      });
    });
  });
  test("simpleEffect", async () => {
    await new Promise((res, rej) => {
      S.root((dispose) => {
        simpleEffect(signalFunctions)
          .then(res)
          .catch(rej)
          .finally(() => {
            dispose();
          });
      });
    });
  });
  test("simpleMaybeSignal", async () => {
    await new Promise((res, rej) => {
      S.root((dispose) => {
        try {
          simpleMaybeSignal(signalFunctions);
          res("ok");
        } catch (error) {
          rej(error);
        } finally {
          dispose();
        }
      });
    });
  });
  test("useCounter", async () => {
    await new Promise((res, rej) => {
      S.root((dispose) => {
        testUseCounter(signalFunctions)
          .then(res)
          .catch(rej)
          .finally(() => {
            dispose();
          });
      });
    });
  });
  test("testEffectCleanup", async () => {
    await new Promise((res, rej) => {
      S.root((dispose) => {
        testEffectCleanup(signalFunctions)
          .then(res)
          .catch(rej)
          .finally(() => {
            dispose();
          });
      });
    });
  });
  test("testComputedCleanup", async () => {
    await new Promise((res, rej) => {
      S.root((dispose) => {
        testComputedCleanup(signalFunctions)
          .then(res)
          .catch(rej)
          .finally(() => {
            dispose();
          });
      });
    });
  });
});
