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
