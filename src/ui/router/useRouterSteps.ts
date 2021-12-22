import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "src/ui/router/useParams";

export default function useRouterSteps(
  initialCompleted: number = 0,
  paramName: string = 'step'
) {
  const [completedSteps, setCompletedSteps] = useState(initialCompleted);
  const { pathname, push: navigate, replace: redirect } = useRouter();

  const { [paramName]: paramStep } = useParams();
  const currentStep = useMemo(() => {
    return parseInt(paramStep as string) || 0;
  }, [paramStep]);

  const getStepPath = useCallback((step: number) => {
    return `${pathname}?${paramName}=${step}`;
  }, [pathname]);

  const canViewStep = useCallback((step: number) => {
    return step <= completedSteps + 1;
  }, [completedSteps]);

  const completeStep = useCallback((step: number) => {
    if (step > completedSteps) {
      setCompletedSteps(step);
    }
  }, [completedSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      navigate(getStepPath(currentStep - 1));
    } else {
      // TODO: error notification?
    }
  }, [currentStep]);

  const goToNextStep = useCallback(() => {
    if (canViewStep(currentStep + 1)) {
      navigate(getStepPath(currentStep + 1));
    } else {
      // TODO: error notification?
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && canViewStep(step)) {
      navigate(getStepPath(step));
    } else {
      // TODO: error notification?
    }
  }, []);

  useEffect(() => {
    if (!canViewStep(currentStep)) {
      redirect(
        getStepPath(completedSteps + 1),
        undefined,
        { shallow: true }
      )
    }
  }, [currentStep, getStepPath]);

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