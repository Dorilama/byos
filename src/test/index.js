import { expect, vi } from "vitest";

/**
 *
 * @param {number} [milliseconds]
 * @returns
 */
const sleep = (milliseconds = 1) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * @template {import("..").HKT} SignalHKT
 * @template {import("..").HKT} ComputedHKT
 * @param {import("..").SignalFunctions<SignalHKT,ComputedHKT>} fn
 */
export const simpleSignal = (fn) => {
  const s = fn.signal(0);
  expect(fn.toValue(s)).toBe(0);
  fn.setValue(s, 1);
  expect(fn.toValue(s)).toBe(1);
};

/**
 * @template {import("..").HKT} SignalHKT
 * @template {import("..").HKT} ComputedHKT
 * @param {import("..").SignalFunctions<SignalHKT,ComputedHKT>} fn
 */
export const simpleComputed = (fn) => {
  const s = fn.signal(0);
  const s2 = fn.computed(() => fn.toValue(s) + 1, [s]);
  expect(fn.toValue(s2)).toBe(1);
  fn.setValue(s, 1);
  expect(fn.toValue(s2)).toBe(2);
};

/**
 * @template {import("..").HKT} SignalHKT
 * @template {import("..").HKT} ComputedHKT
 * @param {import("..").SignalFunctions<SignalHKT,ComputedHKT>} fn
 */
export const simpleEffect = (fn) => {
  const s = fn.signal(0);
  const cb = vi.fn();
  cb.mockName("simpleEffectCallback");
  const cb2 = vi.fn();
  cb2.mockName("simpleEffectTeardown");
  const stop = fn.effect(() => {
    fn.toValue(s);
    cb();
    return cb2;
  }, [s]);
  expect(cb).toBeCalled();
  expect(cb2).not.toBeCalled();
  cb.mockClear();
  cb2.mockClear();
  fn.setValue(s, 0);
  expect(cb).not.toBeCalled();
  expect(cb2).not.toBeCalled();
  fn.setValue(s, 1);
  expect(cb).toBeCalled();
  expect(cb2).toBeCalled();
  cb.mockClear();
  cb2.mockClear();
  stop();
  expect(cb).not.toBeCalled();
  expect(cb2).toBeCalled();
  cb.mockClear();
  cb2.mockClear();
  fn.setValue(s, 2);
  expect(cb).not.toBeCalled();
  expect(cb2).not.toBeCalled();
};

/**
 * @template {import("..").HKT} SignalHKT
 * @template {import("..").HKT} ComputedHKT
 * @param {import("..").SignalFunctions<SignalHKT,ComputedHKT>} fn
 */
export const simpleMaybeSignal = (fn) => {
  const s = fn.signal(0);
  const c = fn.computed(() => fn.toValue(s) + 1, [s]);
  const v = 2;
  expect(fn.toValue(s)).toBe(0);
  expect(fn.toValue(c)).toBe(1);
  expect(fn.toValue(v)).toBe(2);
};
