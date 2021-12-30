import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useParams } from "src/ui/router/useParams";

interface UseRouterStepsOptions {
  paramName?: string;
  initialCompleted?: number;
}

export default function useRouterSteps(options?: UseRouterStepsOptions): {
  canViewStep: (step: number) => boolean;
  completedSteps: number;
  completeStep: (step: number) => void;
  currentStep: number;
  getStepPath: (step: number) => string;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  setCompletedSteps: Dispatch<SetStateAction<number>>;
} {
  // the options object can be passed as the first argument to accept the
  // default paramName
  const { paramName = "step", initialCompleted = 0 } = options || {};
  const [completedSteps, setCompletedSteps] = useState(initialCompleted);
  const { pathname, push, replace } = useRouter();

  const { [paramName]: paramStep } = useParams();
  const currentStep = useMemo(() => {
    return parseInt(paramStep as string) || 1;
  }, [paramStep]);

  const getStepPath = useCallback(
    (step: number) => {
      return `${pathname}?${paramName}=${step}`;
    },
    [pathname, paramName],
  );

  const navigateToStep = useCallback(
    (step: number): void => {
      push(getStepPath(step));
    },
    [push, getStepPath],
  );

  const canViewStep = useCallback(
    (step: number) => {
      return step <= completedSteps + 1;
    },
    [completedSteps],
  );

  const completeStep = useCallback(
    (step: number) => {
      if (step > completedSteps) {
        setCompletedSteps(step);
      }
    },
    [completedSteps],
  );

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      navigateToStep(currentStep - 1);
    } else {
      // TODO: error notification?
    }
  }, [currentStep, navigateToStep]);

  const goToNextStep = useCallback(() => {
    if (canViewStep(currentStep + 1)) {
      navigateToStep(currentStep + 1);
    } else {
      // TODO: error notification?
    }
  }, [currentStep, canViewStep, navigateToStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && canViewStep(step)) {
        navigateToStep(step);
      } else {
        // TODO: error notification?
      }
    },
    [canViewStep, navigateToStep],
  );

  useEffect(() => {
    if (!canViewStep(currentStep)) {
      replace(getStepPath(completedSteps + 1), undefined, { shallow: true });
    }
  }, [canViewStep, currentStep, replace, getStepPath, completedSteps]);

  return {
    canViewStep,
    completedSteps,
    completeStep,
    currentStep,
    getStepPath,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    setCompletedSteps,
  };
}
