import { signal, Signal } from "./signal";

/**
 *
 * @template T
 * @param {T | Signal<T>} t
 * @returns
 */
const isSignal = (t) => t instanceof Signal;
const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal,
  shallow: signal,
  computed: (fn, deps) => {
    const s = signal(fn());
    const update = () => {
      s.set(fn());
    };
    /**
     * @type {(()=>void)[]}
     */
    const cleanup = [];
    deps?.forEach((d) => {
      if (isSignal(d)) {
        cleanup.push(d.subscribe(update));
      }
    });
    const stop = () => {
      cleanup.forEach((cb, i) => {
        cb();
      });
      cleanup.length = 0;
    };
    s.subscribe(noop, { destroy: stop });
    return s;
  },
  computedCleanup: (t) => t.destroy(),
  toValue: (t) => (isSignal(t) ? t.get() : t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn, deps) => {
    let teardown = noop;
    const update = () => {
      teardown();
      teardown = fn() || noop;
    };
    /**
     * @type {(()=>void)[]}
     */
    const cleanup = [];
    deps?.forEach((d) => {
      if (isSignal(d)) {
        cleanup.push(d.subscribe(update));
      }
    });
    const stop = () => {
      teardown();
      cleanup.forEach((cb) => {
        cb();
      });
      cleanup.length = 0;
    };
    return stop;
  },
};
