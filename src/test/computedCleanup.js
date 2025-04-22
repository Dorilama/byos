import { expect, vi } from "vitest";
import { sleep } from ".";

/**
 * @template {import("..").HKT} SignalHKT
 * @template {import("..").HKT} ComputedHKT
 * @param {import("..").SignalFunctions<SignalHKT, ComputedHKT>} fn
 */
export function testComputedCleanup(fn) {
  return new Promise(async (res, rej) => {
    try {
      const cb = vi.fn();
      cb.mockName("cb");
      const cb2 = vi.fn();
      cb2.mockName("cb2");
      const sig = fn.signal(0);

      const trigger = fn.signal(0);

      const stopEffect = fn.effect(() => {
        const comp = fn.computed(() => {
          cb();
          return fn.toValue(sig);
        }, [sig]);
        const comp2 = fn.computed(() => {
          cb2();
          const s = fn.toValue(sig);
          const c = fn.toValue(comp);
          return s + c;
        }, [sig, comp]);
        fn.setValue(sig, fn.toValue(trigger));
        fn.toValue(comp);
        fn.toValue(comp2);
        return () => {
          fn.computedCleanup(comp);
          fn.computedCleanup(comp2);
        };
      }, [trigger]);
      await sleep();

      expect(cb).toBeCalled();
      expect(cb2).toBeCalled();
      cb.mockClear();
      cb2.mockClear();
      fn.setValue(sig, 1);
      await sleep();

      expect(cb).toBeCalled();
      expect(cb2).toBeCalled();
      cb.mockClear();
      cb2.mockClear();
      fn.setValue(trigger, 2);
      await sleep();

      expect(cb).toBeCalled();
      expect(cb2).toBeCalled();
      stopEffect();
      cb.mockClear();
      cb2.mockClear();
      fn.setValue(trigger, 2);
      await sleep();

      expect(cb).not.toBeCalled();
      expect(cb2).not.toBeCalled();
      cb.mockClear();
      cb2.mockClear();
      fn.setValue(sig, 1);
      await sleep();

      expect(cb).not.toBeCalled();
      // todo!!! fix error with @webreflection/signal
      expect(cb2).not.toBeCalled();
      res("ok");
    } catch (error) {
      rej(error);
    }
  });
}
