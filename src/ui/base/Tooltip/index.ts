/*
Basic Usage Example:
````````````````````````````````````````````````````````````````````````````````
import Tooltip from "src/ui/base/Tooltip";

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis rutrum 
  nisi, quis ornare dui. Praesent mauris elit, luctus sit amet nunc sit amet, 
  rhoncus consectetur erat.

  <Tooltip>
    <Tooltip.Trigger className="border-b border-dashed">
      I have a tooltip!
    </Tooltip.Trigger>
    <Tooltip.Popup>I'm a toolip!</Tooltip.Popup>
  </Tooltip>

  Proin vel nunc nec neque luctus ultricies. 
  Praesent venenatis fringilla lorem, quis scelerisque dolor sagittis sed. Donec 
  rutrum mauris magna, quis congue augue porta eget. Curabitur ornare leo vitae 
  cursus porttitor.
</p>
````````````````````````````````````````````````````````````````````````````````

<Tooltip.Popup> is positioned relative to <Tooltip>.

<Tooltip> and <Tooltip.Trigger> are polymorphic components which accept an 
optional "as" prop that can be passed a:
  - tag name as a string (e.g. as="div") (default: "span")
  - component (e.g. as={Card})

They then accept any props that the tag/component in the "as" prop accepts.

Example:
````````````````````````````````````````````````````````````````````````````````
<Tooltip as={div}>
  ...
  <Tooltip.Trigger as={Button} variant={ButtonVariant.GRADIENT}>
    ...
  </Tooltip.Trigger>
  ...
</Tooltip>
````````````````````````````````````````````````````````````````````````````````

More on polymorphism: https://design-system.pluralsight.com/patterns/polymorphic

If <Tooltip.Trigger> is made a block element (e.g. div), then it's important
that <Tooltip> also be a block element to prevent misrendering in some browsers.

*/

export { default } from "./TooltipContainer";
export { default as TooltipPopup } from "./TooltipPopup";
export { default as TooltipTrigger } from "./TooltipTrigger";
export { default as useTooltip } from "./useTooltip";
export { default as TooltipProvider } from "./TooltipProvider";
