/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t, opt) => {
    if (opt?.deep) {
      let s = $state(t);
      return {
        get value() {
          return s;
        },
        set value(t) {
          s = t;
        },
        __s: true,
      };
    }
    let s = $state.raw(t);
    return {
      get value() {
        return s;
      },
      set value(t) {
        s = t;
      },
      __s: true,
    };
  },
  computed: (fn) => {
    let s = $derived.by(fn);
    return {
      get value() {
        return s;
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
