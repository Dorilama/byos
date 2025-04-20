import { expect, vi } from "vitest";

/**
 * @template {import("..").HKT} SignalHKT
 * @template {import("..").HKT} ComputedHKT
 * @param {import("..").SignalFunctions<SignalHKT,ComputedHKT>} fn
 * @param {()=>void} cb
 * @param {import("..").MaybeSignal<SignalHKT,ComputedHKT,any>} dep
 * @returns {()=>void}
 */
function useSimpleEffect(fn, cb, dep) {
  const stop = fn.effect(() => {
    const d = fn.toValue(dep);
    return cb;
  }, [dep]);

  return stop;
}

/**
 * @template {import("..").HKT} SignalHKT
 * @template {import("..").HKT} ComputedHKT
 * @param {import("..").SignalFunctions<SignalHKT,ComputedHKT>} fn
 */
export function testEffectCleanup(fn) {
  const dep = fn.signal(0);
  const dep2 = fn.computed(() => fn.toValue(dep), [dep]);
  const cb = vi.fn();
  const stop = useSimpleEffect(fn, cb, dep2);
  expect(cb).not.toBeCalled();
  fn.setValue(dep, 1);
  expect(cb).toBeCalledTimes(1);
  fn.setValue(dep, 1);
  expect(cb).toBeCalledTimes(1);
  fn.setValue(dep, 2);
  fn.setValue(dep, 3);
  expect(cb).toBeCalledTimes(3);
  stop();
  expect(cb).toBeCalledTimes(4);
  fn.setValue(dep, 4);
  expect(cb).toBeCalledTimes(4);
}
