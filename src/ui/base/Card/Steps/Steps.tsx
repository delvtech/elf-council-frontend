/**
 * From Tailwind UI:
 * https://tailwindui.com/components/application-ui/navigation/steps#component-50293d1ae9598e635ea76dcfdd517f93
 */
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { ReactElement, ReactNode } from "react";
import { assertNever } from "src/base/assertNever";
import tw, {
  display,
  alignItems,
  flexShrink,
  position,
  height,
  width,
  justifyContent,
  textColor,
  margin,
  fontSize,
  fontWeight,
  borderRadius,
  backgroundColor,
  space,
} from "src/elf-tailwindcss-classnames";
import classnames from "classnames";

const steps = [
  { name: "Create account", href: "#", status: "complete" },
  { name: "Profile information", href: "#", status: "current" },
  { name: "Theme", href: "#", status: "upcoming" },
  { name: "Preview", href: "#", status: "upcoming" },
];

export type StepStatus = "complete" | "current" | "upcoming";

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
    <a onClick={step?.onClick} className="group">
      <span className={tw(display("flex"), alignItems("items-start"))}>
        <span
          className={tw(
            flexShrink("shrink-0"),
            position("relative"),
            height("h-5"),
            width("w-5"),
            display("flex"),
            alignItems("items-center"),
            justifyContent("justify-center"),
          )}
        >
          <CheckCircleIcon
            className={tw(
              height("h-full"),
              width("w-full"),
              textColor(
                "text-principalRoyalBlue",
                "group-hover:text-indigo-800",
              ),
            )}
            aria-hidden="true"
          />
        </span>
        <span
          className={tw(
            margin("ml-3"),
            fontSize("text-sm"),
            fontWeight("font-medium"),
            textColor("text-gray-500", "group-hover:text-gray-900"),
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
      className={tw(display("flex"), alignItems("items-start"))}
      aria-current="step"
    >
      <span
        className={tw(
          flexShrink("shrink-0"),
          height("h-5"),
          width("w-5"),
          position("relative"),
          display("flex"),
          alignItems("items-center"),
          justifyContent("justify-center"),
        )}
        aria-hidden="true"
      >
        <span
          className={tw(
            position("absolute"),
            height("h-4"),
            width("w-4"),
            borderRadius("rounded-full"),
            backgroundColor("bg-indigo-200"),
          )}
        />
        <span
          className={tw(
            position("relative"),
            display("block"),
            width("w-2"),
            height("h-2"),
            backgroundColor("bg-principalRoyalBlue"),
            borderRadius("rounded-full"),
          )}
        />
      </span>
      <span
        className={tw(
          margin("ml-3"),
          fontSize("text-sm"),
          fontWeight("font-medium"),
          textColor("text-principalRoyalBlue"),
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
    <a onClick={step?.onClick} className="group">
      <div className={tw(display("flex"), alignItems("items-start"))}>
        <div
          className={tw(
            flexShrink("shrink-0"),
            height("h-5"),
            width("w-5"),
            position("relative"),
            display("flex"),
            alignItems("items-center"),
            justifyContent("justify-center"),
          )}
          aria-hidden="true"
        >
          <div
            className={tw(
              height("h-2"),
              width("w-2"),
              backgroundColor("bg-gray-300", "group-hover:bg-gray-400"),
              borderRadius("rounded-full"),
            )}
          />
        </div>
        <p
          className={tw(
            margin("ml-3"),
            fontSize("text-sm"),
            fontWeight("font-medium"),
            textColor("text-gray-500", "group-hover:text-gray-900"),
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
    <nav
      className={tw(display("flex"), justifyContent("justify-center"))}
      aria-label="Progress"
    >
      <ol role="list" className={space("space-y-6")}>
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
