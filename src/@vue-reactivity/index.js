import { ref, shallowRef, computed, effect, toValue } from "@vue/reactivity";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  /**
   * @template T
   * @param {T} t
   * @param {{deep?: boolean}} [opt]
   * @returns
   */
  signal: (t, opt) => {
    if (opt?.deep) {
      return /** @type {import("vue").Ref<T>} */ (ref(t));
    }
    return shallowRef(t);
  },
  computed: (fn) => computed(fn),
  toValue: (t) => toValue(t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    let teardown = noop;
    const runner = effect(() => {
      teardown();
      teardown = fn() || noop;
    });
    return () => {
      teardown();
      runner.effect.stop();
    };
  },
});
