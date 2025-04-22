import { test, describe, beforeAll, afterAll } from "vitest";
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
import { parseHTML } from "linkedom";

describe("@angular/core", () => {
  beforeAll(async () => {
    const { document, window } = parseHTML(
      "<html><head><script></script></head><body></body></html>"
    );
    global.document = document;
    global.window = window;

    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });
  afterAll(() => {
    // @ts-ignore
    delete global.document;
    // @ts-ignore
    delete global.window;
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
