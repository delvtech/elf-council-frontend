/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactElement, ReactNode } from "react";

import tw, {
  position,
  zIndex,
  inset,
  overflow,
  display,
  alignItems,
  justifyContent,
  minHeight,
  padding,
  textAlign,
  backgroundColor,
  backgroundOpacity,
  transitionProperty,
  verticalAlign,
  height,
  borderRadius,
  boxShadow,
  hardwareAcceleration,
  margin,
  maxWidth,
  width,
} from "src/elf-tailwindcss-classnames";
import { Dialog, Transition } from "@headlessui/react";

interface SimpleDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}
export default function SimpleDialog(props: SimpleDialogProps): ReactElement {
  const { isOpen, onClose, children } = props;
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        // Using z-50 so that the dialog appears above the Sidebar, which is currently set to z-30
        className={tw(
          position("fixed"),
          zIndex("z-50"),
          inset("inset-0"),
          overflow("overflow-y-auto"),
        )}
        onClose={onClose ? onClose : () => {}}
      >
        <div
          className={tw(
            display("flex", "sm:block"),
            alignItems("items-end"),
            justifyContent("justify-center"),
            minHeight("min-h-screen"),
            padding("pt-4", "px-4", "pb-20", "sm:p-0"),
            textAlign("text-center"),
          )}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={tw(
                position("fixed"),
                inset("inset-0"),
                backgroundColor("bg-gray-500"),
                backgroundOpacity("bg-opacity-75"),
                transitionProperty("transition-opacity"),
              )}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className={tw(
              display("hidden", "sm:inline-block"),
              verticalAlign("sm:align-middle"),
              height("sm:h-screen"),
            )}
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={tw(
                position("relative"),
                display("inline-block"),
                verticalAlign("align-bottom", "sm:align-middle"),
                backgroundColor("bg-white"),
                borderRadius("rounded-lg"),
                padding("px-4", "pt-5", "pb-4", "sm:p-6"),
                textAlign("text-left"),
                overflow("overflow-hidden"),
                boxShadow("shadow-xl"),
                hardwareAcceleration("transform-gpu"),
                transitionProperty("transition-all"),
                margin("sm:my-8"),
                maxWidth("sm:max-w-lg"),
                width("sm:w-full"),
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
