/**
 * @type {import(".").usePeek}
 */
export function usePeek(signalFunctions, signal) {
  let untracked = signalFunctions.toValue(signal);
  const stop = signalFunctions.effect(() => {
    untracked = signalFunctions.toValue(signal);
  }, [signal]);
  const peek = () => untracked;
  return [peek, stop];
}
