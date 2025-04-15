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
 * @param {import("../src").SignalFunctions<SignalHKT,ComputedHKT>} fn
 * @param {()=>void} cb
 * @param {import("../src").MaybeSignal<SignalHKT,ComputedHKT,any>} dep
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
 * @template {import("../src").HKT} SignalHKT
 * @template {import("../src").HKT} ComputedHKT
 * @param {import("../src").SignalFunctions<SignalHKT,ComputedHKT>} fn
 */
function testUseSimpleEffect(fn) {
  return async () => {
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
  };
}

test("usignal useSimpleEffect", testUseSimpleEffect(Usignal));
test("alien-signals useSimpleEffect", testUseSimpleEffect(AlienSignals));
test(
  "@preact/signals-core useSimpleEffect",
  testUseSimpleEffect(PreactSignals)
);
test(
  "@webreflection/signal useSimpleEffect",
  testUseSimpleEffect(WebreflectionSignal)
);
test(
  "@vue/reactivity useSimpleEffect",
  testUseSimpleEffect(VueReactivitySignal)
);
test("vue useSimpleEffect", testUseSimpleEffect(VueSignal));
test("toddle useSimpleEffect", testUseSimpleEffect(ToddleSignal));
