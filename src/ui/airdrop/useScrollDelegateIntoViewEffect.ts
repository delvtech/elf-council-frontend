import {
  useRef,
  useEffect,
  createRef,
  RefObject,
  MutableRefObject,
} from "react";
import { Delegate } from "src/elf-council-delegates/delegates";

export function useScrollDelegateIntoViewEffect(
  delegates: Delegate[],
  selectedDelegateIndex: number | undefined,
): MutableRefObject<RefObject<HTMLLIElement>[]> {
  const scrollRefs = useRef<RefObject<HTMLLIElement>[]>([]);

  scrollRefs.current = delegates.map((_, i) => {
    return scrollRefs.current[i] ?? createRef();
  });

  useEffect(() => {
    if (!!selectedDelegateIndex && selectedDelegateIndex !== -1) {
      scrollRefs.current[selectedDelegateIndex].current?.scrollIntoView();
    }
  }, [selectedDelegateIndex]);

  return scrollRefs;
}
