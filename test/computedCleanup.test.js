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
    const dep = fn.signal(0);
    const cb = vi.fn();
    const dep2 = fn.computed(() => {
      cb();
      return fn.toValue(dep);
    }, [dep]);
    expect(fn.toValue(dep2)).toBe(0);
    // expect(cb).toBeCalledTimes(2);
    fn.setValue(dep, 1);
    expect(fn.toValue(dep2)).toBe(1);
    // expect(cb).toBeCalledTimes(3);
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
