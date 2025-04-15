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
  computed: (fn, deps) => {
    const s = signal(fn());
    const update = () => {
      s.value = fn();
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
      cleanup.forEach((cb) => {
        cb();
      });
      cleanup.length = 0;
    };
    return [s, stop];
  },
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn, deps) => {
    let cleanupRun = noop;
    const update = () => {
      cleanupRun();
      cleanupRun = fn() || noop;
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
      cleanupRun();
      cleanup.forEach((cb) => {
        cb();
      });
      cleanup.length = 0;
    };
    return stop;
  },
};
