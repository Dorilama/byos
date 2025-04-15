import { expect, test, vi } from "vitest";
import { signalFunctions as Usignal } from "../src/usignal";
import { signalFunctions as AlienSignals } from "../src/alien-signals";
import { signalFunctions as PreactSignals } from "../src/@preact-signals-core";
import { signalFunctions as WebreflectionSignal } from "../src/@webreflection-signal";
import { signalFunctions as VueReactivitySignal } from "../src/@vue-reactivity";
import { signalFunctions as VueSignal } from "../src/vue";
import { signalFunctions as ToddleSignal } from "../src/toddle";

/**
 * @template {import("../src").HKT} SignalHKT
 * @template {import("../src").HKT} ComputedHKT
 * @param {import("../src").SignalFunctions<SignalHKT, ComputedHKT>} fn
 */
function testComputedCleanup(fn) {
  return async () => {
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

    expect(cb).toBeCalled();
    expect(cb2).toBeCalled();
    cb.mockClear();
    cb2.mockClear();
    fn.setValue(sig, 1);
    expect(cb).toBeCalled();
    expect(cb2).toBeCalled();
    cb.mockClear();
    cb2.mockClear();
    fn.setValue(trigger, 2);
    expect(cb).toBeCalled();
    expect(cb2).toBeCalled();
    stopEffect();
    cb.mockClear();
    cb2.mockClear();
    fn.setValue(trigger, 2);
    expect(cb).not.toBeCalled();
    expect(cb2).not.toBeCalled();
    cb.mockClear();
    cb2.mockClear();
    fn.setValue(sig, 1);
    expect(cb).not.toBeCalled();
    // todo!!! fix error with @webreflection/signal
    expect(cb2).not.toBeCalled();
  };
}

test("usignal computedCleanup", testComputedCleanup(Usignal));
test("alien-signals computedCleanup", testComputedCleanup(AlienSignals));
test(
  "@preact/signals-core computedCleanup",
  testComputedCleanup(PreactSignals)
);
test(
  "@webreflection/signal computedCleanup",
  testComputedCleanup(WebreflectionSignal)
);
test(
  "@vue/reactivity computedCleanup",
  testComputedCleanup(VueReactivitySignal)
);
test("vue computedCleanup", testComputedCleanup(VueSignal));
test("toddle computedCleanup", testComputedCleanup(ToddleSignal));
