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

  const getStapPath = useCallback((step: number) => {
    return `${pathname}?${paramName}=${step}`;
  }, [pathname]);

  const canViewStep = useCallback((step: number) => {
    return step <= completedSteps + 1;
  }, [completedSteps]);

  const completeStep = useCallback((step: number) => {
    setCompletedSteps(Math.max(step, completedSteps));
  }, [completedSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      navigate(getStapPath(currentStep - 1));
    } else {
      // TODO: error notification?
    }
  }, [currentStep]);

  const goToNextStep = useCallback(() => {
    if (canViewStep(currentStep + 1)) {
      navigate(getStapPath(currentStep + 1));
    } else {
      // TODO: error notification?
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && canViewStep(step)) {
      navigate(getStapPath(step));
    } else {
      // TODO: error notification?
    }
  }, []);

  useEffect(() => {
    if (!canViewStep(currentStep)) {
      redirect(
        getStapPath(completedSteps + 1),
        undefined,
        { shallow: true }
      )
    }
  }, [currentStep, getStapPath]);

  return {
    canViewStep,
    completedSteps,
    completeStep,
    currentStep,
    getStapPath,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  };
}