/**
 * From Tailwind UI:
 * https://tailwindui.com/components/application-ui/navigation/steps#component-50293d1ae9598e635ea76dcfdd517f93
 */
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { ReactElement, ReactNode } from "react";
import { assertNever } from "src/base/assertNever";
import tw from "src/elf-tailwindcss-classnames";

const steps = [
  { name: "Create account", href: "#", status: "complete" },
  { name: "Profile information", href: "#", status: "current" },
  { name: "Theme", href: "#", status: "upcoming" },
  { name: "Preview", href: "#", status: "upcoming" },
];

type StepStatus = "complete" | "current" | "upcoming";

export interface Step {
  name: ReactNode;
  onClick?: () => void;
  status: StepStatus;
}
interface StepsProps {
  steps: Step[];
}

interface StepCompleteProps {
  step: Step;
}

function StepComplete({ step }: StepCompleteProps) {
  return (
    <a onClick={step?.onClick} className={tw("group")}>
      <span className={tw("flex", "items-start")}>
        <span
          className={tw(
            "shrink-0",
            "relative",
            "h-5",
            "w-5",
            "flex",
            "items-center",
            "justify-center"
          )}
        >
          <CheckCircleIcon
            className={tw(
              "h-full",
              "w-full",
              "text-principalRoyalBlue",
              "group-hover:text-indigo-800"
            )}
            aria-hidden="true"
          />
        </span>
        <span
          className={tw(
            "ml-3",
            "text-sm",
            "font-medium",
            "text-gray-500",
            "group-hover:text-gray-900"
          )}
        >
          {step.name}
        </span>
      </span>
    </a>
  );
}

interface StepCurrentProps {
  step: Step;
}

function StepCurrent({ step }: StepCurrentProps) {
  return (
    <a
      onClick={step?.onClick}
      className={tw("flex", "items-start")}
      aria-current="step"
    >
      <span
        className={tw(
          "shrink-0",
          "h-5",
          "w-5",
          "relative",
          "flex",
          "items-center",
          "justify-center"
        )}
        aria-hidden="true"
      >
        <span
          className={tw(
            "absolute",
            "h-4",
            "w-4",
            "rounded-full",
            "bg-indigo-200"
          )}
        />
        <span
          className={tw(
            "relative",
            "block",
            "w-2",
            "h-2",
            "bg-principalRoyalBlue",
            "rounded-full"
          )}
        />
      </span>
      <span
        className={tw(
          "ml-3",
          "text-sm",
          "font-medium",
          "text-principalRoyalBlue"
        )}
      >
        {step.name}
      </span>
    </a>
  );
}

interface StepUpcomingProps {
  step: Step;
}

function StepUpcoming({ step }: StepUpcomingProps) {
  return (
    <a onClick={step?.onClick} className={tw("group")}>
      <div className={tw("flex", "items-start")}>
        <div
          className={tw(
            "shrink-0",
            "h-5",
            "w-5",
            "relative",
            "flex",
            "items-center",
            "justify-center"
          )}
          aria-hidden="true"
        >
          <div
            className={tw(
              "h-2",
              "w-2",
              "bg-gray-300",
              "rounded-full",
              "group-hover:bg-gray-400"
            )}
          />
        </div>
        <p
          className={tw(
            "ml-3",
            "text-sm",
            "font-medium",
            "text-gray-500",
            "group-hover:text-gray-900"
          )}
        >
          {step.name}
        </p>
      </div>
    </a>
  );
}

export default function Steps({ steps }: StepsProps): ReactElement {
  return (
    <nav className={tw("flex", "justify-center")} aria-label="Progress">
      <ol role="list" className={tw("space-y-6")}>
        {steps.map((step, i) => {
          switch (step.status) {
            case "complete":
              return (
                <li key={i}>
                  <StepComplete step={step} />
                </li>
              );
            case "current":
              return (
                <li key={i}>
                  <StepCurrent step={step} />
                </li>
              );
            case "upcoming":
              return (
                <li key={i}>
                  <StepUpcoming step={step} />
                </li>
              );

            default:
              assertNever(step.status);
              return null;
          }
        })}
      </ol>
    </nav>
  );
}
