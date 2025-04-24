// @vitest-environment happy-dom
import { test, describe, beforeAll } from "vitest";
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
import "zone.js";
import { TestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

describe("@angular/core", () => {
  beforeAll(async () => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });
  test("simpleSignal", async () => {
    await new Promise((res, rej) => {
      TestBed.runInInjectionContext(() => {
        try {
          simpleSignal(signalFunctions);
          res("ok");
        } catch (error) {
          rej(error);
        }
      });
    });
  });
  test("simpleComputed", async () => {
    await new Promise((res, rej) => {
      TestBed.runInInjectionContext(() => {
        try {
          simpleComputed(signalFunctions);
          res("ok");
        } catch (error) {
          rej(error);
        }
      });
    });
  });
  test("simpleEffect", async () => {
    await new Promise((res, rej) => {
      TestBed.runInInjectionContext(() => {
        simpleEffect(signalFunctions).then(res).catch(rej);
      });
    });
  });
  test("simpleMaybeSignal", async () => {
    await new Promise((res, rej) => {
      TestBed.runInInjectionContext(() => {
        try {
          simpleMaybeSignal(signalFunctions);
          res("ok");
        } catch (error) {
          rej(error);
        }
      });
    });
  });
  test("useCounter", async () => {
    await new Promise((res, rej) => {
      TestBed.runInInjectionContext(() => {
        testUseCounter(signalFunctions).then(res).catch(rej);
      });
    });
  });
  test("testEffectCleanup", async () => {
    await new Promise((res, rej) => {
      TestBed.runInInjectionContext(() => {
        testEffectCleanup(signalFunctions).then(res).catch(rej);
      });
    });
  });
  test("testComputedCleanup", async () => {
    await new Promise((res, rej) => {
      TestBed.runInInjectionContext(() => {
        testComputedCleanup(signalFunctions).then(res).catch(rej);
      });
    });
  });
});
