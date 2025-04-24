/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => {
    const s = $state({ current: t });
    return {
      get value() {
        return s.current;
      },
      set value(t) {
        s.current = t;
      },
      __s: true,
    };
  },
  computed: (fn) => {
    const s = $state({ current: fn });
    return {
      get value() {
        return s.current;
      },
      __s: true,
    };
  },
  computedCleanup: noop,
  toValue: (t) =>
    t && typeof t === "object" && "__s" in t
      ? isFunction(t.value)
        ? t.value()
        : t.value
      : t,
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) =>
    $effect.root(() => {
      $effect(fn);
    }),
};
