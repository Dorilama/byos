import { expect, vi } from "vitest";
import { sleep } from ".";

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
export function testUsePeek(fn) {
  return new Promise(async (res, rej) => {
    try {
      const dep = fn.signal(0);
      const dep2 = fn.signal(1);
      const [peek, stopPeek] = fn.usePeek(dep);
      const cb = vi.fn();
      const stop = fn.effect(() => {
        peek();
        fn.toValue(dep2);
        return cb;
      }, [dep2]);
      await sleep();

      expect(cb).not.toBeCalled();
      fn.setValue(dep, 1);
      await sleep();

      expect(cb).not.toBeCalled();
      fn.setValue(dep2, 10);
      await sleep();

      expect(cb).toBeCalledTimes(1);
      stopPeek();
      stop();
      res("ok");
    } catch (error) {
      rej(error);
    }
  });
}
