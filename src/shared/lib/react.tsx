import {
  Context,
  createContext,
  useContext,
  startTransition,
  useEffect,
  useState,
  ReactNode,
  Children,
  isValidElement,
  createElement,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context);
  if (value === null) throw new Error("Strict context not passed");
  return value as T;
}

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}

export function useAppearanceDelay(
  show?: boolean,
  options = {} as {
    defaultValue?: boolean;
    appearenceDelay?: number;
    minDisplay?: number;
  },
) {
  const {
    minDisplay = 500,
    defaultValue = false,
    appearenceDelay = 500,
  } = options;

  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearenceDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplay);
      return () => clearTimeout(timer);
    }
  }, [appearenceDelay, show, minDisplay]);

  return delayedShow;
}

export function ComposeChildren({ children }: { children: ReactNode }) {
  const array = Children.toArray(children);
  const last = array.pop();
  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last,
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback<Fn extends (...args: any[]) => unknown>(
  fn: Fn,
) {
  const ref = useRef<Fn>(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useMemo(
    () =>
      ((...args: unknown[]) => {
        const { current } = ref;
        return current(...args);
      }) as Fn,
    [],
  );
}
