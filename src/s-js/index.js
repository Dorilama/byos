import S from "s-js";
/**
 * @type {import(".").IsFunction}
 */
const isFunction = (val) => typeof val === "function";
import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t) => S.value(t),
  computed: (fn) => S(fn),
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
});
