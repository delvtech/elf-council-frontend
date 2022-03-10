/**
 * This template is used in the @svgr/webpack loader options to ensure a unique
 * id for every SVG, even when the same SVG is used multiple times on a single
 * page. This is needed for 2 reasons:
 *   1. 2 different SVGs exported from a design tool with the same id, on a
 *      `<pattern>` tag for example, will collide when used inline, and both
 *      SVGs will use the `<pattern>` in the first SVG.
 *   2. If the first instance of an SVG in the DOM is hidden from either
 *      `display: none` or a `display: none` parent, tags in any other instance
 *      of that same SVG with references to other tags by id (e.g.,
 *      `fill="url(#elfi-icon-gradient)"`) will reference the hidden SVG tags
 *      which won't show.
 *
 * https://react-svgr.com/docs/custom-templates/
 *
 * TODO: Handle this in a custom SVGO or Babel plugin
 */
module.exports = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl },
) => {
  convertSVGIds(componentName, jsx);
  return tpl`
${imports};
import { useMemo } from "react";

${interfaces};

const counter = (() => {
  let counts = {};
  return (name) => {
    counts[name] = ++counts[name] || 1;
    return counts[name];
  };
})();

const ${componentName} = (${props}) => {
  const key = useMemo(() => counter(${componentName}), []);
  const getId = (baseId) => \`\${baseId}__\${key}\`;
  const getRef = (baseId) => \`#\${getId(baseId)}\`;
  const getUrl = (baseId) => \`url(\${getRef(baseId)})\`;
  return ${jsx};
};

${exports};
`;
};

/**
 * Modifies all id attributes and attributes that reference ids in an SVG AST
 * node to call a function with a new prefixed id.
 *
 * @param {string} componentName Used to prefix the id.
 * @param {JSXElement} ASTNode The node to modify.
 */
function convertSVGIds(componentName, { openingElement, children }) {
  if (openingElement?.attributes?.length) {
    for (const attribute of openingElement.attributes) {
      const { name, value } = attribute;
      // skip if the attribute has no value to change or if the value is a
      // base64 string
      if (!value.value || /^data:/.test(value.value)) {
        continue;
      }

      // remove `#` before ids and `url()` around it to just get the id
      // example: both `url(#foo)` and `#foo` would become `foo`
      const baseId = value.value.replace(/(^(url\()?#|\)$)/g, "");
      const nameSpacedId = `${componentName}__${baseId}`;

      // has a url reference to an id
      // example: `fill="url(#foo)"`
      if (/^url\(#/.test(value.value)) {
        attribute.value = getExpressionASTNode("getUrl", nameSpacedId);
      }

      // has an href attribute to an id
      // example: `href="#foo"`
      else if (name.name === "href" || name.name === "xlinkHref") {
        attribute.value = getExpressionASTNode("getRef", nameSpacedId);
      }

      // has an id attribute
      else if (name.name === "id") {
        attribute.value = getExpressionASTNode("getId", nameSpacedId);
      }
    }
  }

  // run recursively for each child
  if (children?.length) {
    for (const child of children) {
      convertSVGIds(componentName, child);
    }
  }
}

/**
 * Returns a JSXExpressionContainer AST node that calls a function with a single
 * string argument.
 *
 * https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-asts
 *
 * @param {string} fnName The name of the function to call.
 * @param {string} argValue The value of the argument to pass to the function.
 */
function getExpressionASTNode(fnName, argValue) {
  return {
    type: "JSXExpressionContainer",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: fnName,
      },
      arguments: [
        {
          type: "StringLiteral",
          value: argValue,
        },
      ],
    },
  };
}
