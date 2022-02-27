import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useParams } from "src/ui/router/useParams";

export enum StepStatus {
  COMPLETE,
  CURRENT,
  PENDING,
}

interface UseRouterStepsOptions<Step> {
  paramName?: string;
  steps?: Step[];
  initialCompleted?: number;
}

// Step numbers are 1-indexed. They do not start at 0.
export default function useRouterSteps<Step = number>(
  options?: UseRouterStepsOptions<Step>,
): {
  canViewStep: (step: number | Step) => boolean;
  completedSteps: number;
  completeStep: (step: number | Step) => void;
  currentStep: Step;
  getStepNumber: (step: number | Step) => number;
  getStepPath: (step: number | Step) => string;
  getStepStatus: (step: number | Step) => StepStatus;
  goToNextStep: (completeCurrent?: boolean) => void;
  goToPreviousStep: () => void;
  goToStep: (step: number | Step, completePrereqs?: boolean) => void;
  setCompletedSteps: Dispatch<SetStateAction<number>>;
} {
  // using useRef to ensure these value never trigger rerenders when changed
  const {
    paramName = "step",
    initialCompleted = 0,
    steps,
  } = useRef<UseRouterStepsOptions<Step>>(options || {}).current;

  const { pathname, push, replace } = useRouter();
  const { [paramName]: paramStep } = useParams();

  const [completedSteps, setCompletedSteps] = useState(initialCompleted);

  const currentStep = useMemo(() => {
    if (steps) {
      return (paramStep as unknown as Step) || steps[0];
    }
    return (paramStep ? parseInt(paramStep) : 1) as unknown as Step;
  }, [paramStep, steps]);

  const getStepNumber = useCallback(
    (step: number | Step) => {
      let stepNumber = 0;
      if (typeof step === "number") {
        stepNumber = Math.round(step);
      } else if (steps) {
        stepNumber = steps.indexOf(step) + 1;
      }
      return stepNumber;
    },
    [steps],
  );

  const getStepPath = useCallback(
    (step: number | Step) => {
      const pathStart = `${pathname}?${paramName}=`;
      if (steps) {
        return `${pathStart}${
          typeof step === "number" ? steps[step - 1] : step
        }`;
      }
      return `${pathname}?${paramName}=${step}`;
    },
    [pathname, paramName, steps],
  );

  const getStepStatus = useCallback(
    (step: number | Step) => {
      if (getStepNumber(step) < getStepNumber(currentStep)) {
        return StepStatus.COMPLETE;
      }
      if (getStepNumber(step) > getStepNumber(currentStep)) {
        return StepStatus.PENDING;
      }
      return StepStatus.CURRENT;
    },
    [getStepNumber, currentStep],
  );

  // returns false if the step is one of the following:
  //   - 0 or less
  //   - greater than the step after the last completed one
  //   - isn't a number or in steps
  const canViewStep = useCallback(
    (step: number | Step) => {
      const stepNumber = getStepNumber(step);
      return stepNumber > 0 && stepNumber <= completedSteps + 1;
    },
    [getStepNumber, completedSteps],
  );

  const completeStep = useCallback(
    (step: number | Step) => {
      setCompletedSteps((completedSteps) =>
        Math.max(completedSteps, getStepNumber(step)),
      );
    },
    [getStepNumber],
  );

  const goToStep = useCallback(
    (step: number | Step, completePrereqs?: boolean) => {
      if (completePrereqs) {
        completeStep(getStepNumber(step) - 1);
        push(getStepPath(step));
      } else if (canViewStep(step)) {
        push(getStepPath(step));
      } else {
        // TODO: error notification?
      }
    },
    [canViewStep, push, getStepPath, completeStep, getStepNumber],
  );

  const goToPreviousStep = useCallback(() => {
    goToStep(getStepNumber(currentStep) - 1);
  }, [goToStep, getStepNumber, currentStep]);

  const goToNextStep = useCallback(
    (completeCurrent?: boolean) => {
      goToStep(getStepNumber(currentStep) + 1, completeCurrent);
    },
    [goToStep, getStepNumber, currentStep],
  );

  useEffect(() => {
    if (!canViewStep(currentStep)) {
      replace(getStepPath(completedSteps + 1), undefined, { shallow: true });
    }
  }, [
    paramStep,
    canViewStep,
    currentStep,
    replace,
    getStepPath,
    completedSteps,
  ]);

  return {
    canViewStep,
    completedSteps,
    completeStep,
    currentStep,
    getStepNumber,
    getStepPath,
    getStepStatus,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    setCompletedSteps,
  };
}
