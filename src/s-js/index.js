import S from "s-js";
/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => S.value(t),
  computed: (fn) => S(fn),
  computedCleanup: noop,
  toValue: (t) => (isFunction(t) ? t() : t),
  setValue: (s, t) => {
    s(t);
  },
  effect: (fn) => {
    let stop = noop;
    S.root((dispose) => {
      stop = dispose;
      S(() => {
        S.cleanup(fn() || noop);
      });
    });
    return () => {
      stop();
    };
  },
};
