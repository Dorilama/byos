import { proxy, ref } from "valtio/vanilla";
import { computed, effect } from "valtio-reactive";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t, opt) => {
    if (!opt?.deep && typeof t === "object" && t) {
      return proxy({ value: ref(t), __s: true });
    }
    return proxy({ value: t, __s: true });
  },
  computed: (fn) => computed({ value: fn, __s: () => true }),
  computedCleanup: noop,
  toValue: (t) => (t && typeof t === "object" && "__s" in t ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    let teardown = noop;
    return effect(
      () => {
        teardown();
        teardown = fn() || noop;
      },
      () => {
        teardown();
      }
    );
  },
};
