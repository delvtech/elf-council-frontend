/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactElement, ReactNode } from "react";
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
        // Using z-50 so that the dialog appears above the Sidebar, which is currently set to z-10
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={onClose ? onClose : () => {}}
      >
        <div className="flex sm:block items-end justify-center min-h-screen pt-4 px-4 pb-20 sm:p-0 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
            <div className="relative inline-block align-bottom sm:align-middle bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 text-left overflow-hidden shadow-xl transform-gpu transition-all sm:my-8 sm:max-w-lg sm:w-full">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
