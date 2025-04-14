import { expect, test } from "vitest";
import { signalFunctions as Usignal } from "../src/usignal";
import { signalFunctions as AlienSignals } from "../src/alien-signals";
import { signalFunctions as PreactSignals } from "../src/@preact-signals-core";
import { signalFunctions as WebreflectionSignal } from "../src/@webreflection-signal";
import { signalFunctions as VueReactivitySignal } from "../src/@vue-reactivity";

/**
 * @template {import("../src").HKT} SignalHKT
 * @param {import("../src").SignalFunctions<SignalHKT>} fn
 * @param {import("../src").MaybeSignal<SignalHKT,number>} [initialValue]
 * @param {import("../src").MaybeSignal<SignalHKT,string>} [fillString]
 * @returns {{count:import("../src").Kind<SignalHKT,number>, add:(n?:number)=>void, padded:import("../src").Kind<SignalHKT,string> }}
 */
function useCounter(fn, initialValue, fillString) {
  //@ts-expect-error
  fn.computed(() => {});
  //@ts-expect-error
  fn.effect(() => {});

  const count = fn.signal(fn.toValue(initialValue) || 0);
  const [padded] = fn.computed(() => {
    const value = fn.toValue(count).toString();
    const fill = fn.toValue(fillString) ?? "0";
    return value.padStart(3, fill);
  }, [count, fillString]);
  const add = (n = 1) => {
    fn.setValue(count, fn.toValue(count) + n);
  };
  fn.effect(() => {
    fn.setValue(count, fn.toValue(initialValue) || 0);
  }, [initialValue]);

  return {
    count,
    add,
    padded,
  };
}

/**
 * @template {import("../src").HKT} SignalHKT
 * @param {import("../src").SignalFunctions<SignalHKT>} fn
 */
function testUseCounter(fn) {
  return async () => {
    const counter1 = useCounter(fn);
    const counter2 = useCounter(fn, 10, "-");
    const initialValue = fn.signal(20);
    const fillString = fn.signal("*");
    const counter3 = useCounter(fn, initialValue, fillString);
    expect(fn.toValue(counter1.count)).toBe(0);
    expect(fn.toValue(counter2.count)).toBe(10);
    expect(fn.toValue(counter3.count)).toBe(20);
    expect(fn.toValue(counter1.padded)).toBe("000");
    expect(fn.toValue(counter2.padded)).toBe("-10");
    expect(fn.toValue(counter3.padded)).toBe("*20");
    counter1.add();
    counter2.add();
    counter3.add();
    expect(fn.toValue(counter1.count)).toBe(1);
    expect(fn.toValue(counter2.count)).toBe(11);
    expect(fn.toValue(counter3.count)).toBe(21);
    expect(fn.toValue(counter1.padded)).toBe("001");
    expect(fn.toValue(counter2.padded)).toBe("-11");
    expect(fn.toValue(counter3.padded)).toBe("*21");
    fn.setValue(initialValue, 1);
    expect(fn.toValue(counter3.count)).toBe(1);
    expect(fn.toValue(counter3.padded)).toBe("**1");
    fn.setValue(fillString, "#");
    expect(fn.toValue(counter3.padded)).toBe("##1");
  };
}

test("usignal useCounter", testUseCounter(Usignal));
test("alien-signals useCounter", testUseCounter(AlienSignals));
test("@preact/signals-core useCounter", testUseCounter(PreactSignals));
test("@webreflection/signal useCounter", testUseCounter(WebreflectionSignal));
test("@vue/reactivity useCounter", testUseCounter(VueReactivitySignal));
