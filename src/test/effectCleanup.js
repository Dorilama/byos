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
export function testEffectCleanup(fn) {
  return new Promise(async (res, rej) => {
    try {
      const dep = fn.signal(0);
      const dep2 = fn.computed(() => fn.toValue(dep), [dep]);
      const cb = vi.fn();
      const stop = useSimpleEffect(fn, cb, dep2);
      await sleep();

      expect(cb).not.toBeCalled();
      fn.setValue(dep, 1);
      await sleep();

      expect(cb).toBeCalledTimes(1);
      fn.setValue(dep, 1);
      await sleep();

      expect(cb).toBeCalledTimes(1);
      fn.setValue(dep, 2);
      await sleep();

      fn.setValue(dep, 3);
      await sleep();

      expect(cb).toBeCalledTimes(3);
      stop();
      await sleep();

      expect(cb).toBeCalledTimes(4);
      fn.setValue(dep, 4);
      await sleep();

      expect(cb).toBeCalledTimes(4);
      res("ok");
    } catch (error) {
      rej(error);
    }
  });
}
