import { Dispatch, SetStateAction, useState } from "react";
import { usePopper } from "react-popper";

type UsePopper = typeof usePopper;
type UsePopperArgs = Parameters<UsePopper>;
type ReferenceElement = UsePopperArgs[0];
type PopperElement = UsePopperArgs[1];
type Options = UsePopperArgs[2];

interface UsePopperWithRefs extends ReturnType<UsePopper> {
  setReferenceElement: Dispatch<SetStateAction<ReferenceElement>>;
  setPopperElement: Dispatch<SetStateAction<PopperElement>>;
}

export default function usePopperWithRefs(
  options?: Options,
): UsePopperWithRefs {
  const [referenceElement, setReferenceElement] = useState<ReferenceElement>();
  const [popperElement, setPopperElement] = useState<PopperElement>();
  const usePopperResult = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    ...options,
  });

  return {
    ...usePopperResult,
    setReferenceElement,
    setPopperElement,
  };
}
