const t = require("@babel/types");

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
 * It also adds a conditional `<title>` tag and `aria-labeledby` prop that only
 * show if a title is passed in the props. This is needed because the title
 * attribute on `<svg>` tags is invalid, but there may be times when an SVG
 * needs a descriptor for screen readers, scrapers, and/or mouse over.
 *
 * https://react-svgr.com/docs/custom-templates/
 *
 * TODO: Handle this in a custom SVGO or Babel plugin
 */
module.exports = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl },
) => {
  addAccessibleTitle(componentName, jsx);
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
 * Adds a conditional `<title>` tag and `aria-labeledby` prop that only show
 * if a title is passed in the props.
 *
 * @param {string} componentName Used to prefix the id of the `<title>` tag.
 * @param {JSXElement} ASTNode The node to add them to.
 */
function addAccessibleTitle(componentName, { openingElement, children }) {
  const nameSpacedId = `${componentName}__title`;
  if (openingElement) {
    // AST of `aria-labeledby={props.title ? "foo_title" : undefined}`
    openingElement.attributes.push(
      t.jSXAttribute(
        t.jsxIdentifier("aria-labelledby"),
        t.jsxExpressionContainer(
          t.conditionalExpression(
            t.memberExpression(t.identifier("props"), t.identifier("title")),
            t.stringLiteral(nameSpacedId),
            t.identifier("undefined"),
          ),
        ),
      ),
    );
  }

  // AST of {props.title && <title id="foo_title" lang="en">{props.title}</title>}
  children.unshift(
    t.jSXExpressionContainer(
      t.logicalExpression(
        "&&",
        t.memberExpression(t.identifier("props"), t.identifier("title")),
        t.jSXElement(
          t.jSXOpeningElement(t.jSXIdentifier("title"), [
            t.jSXAttribute(
              t.jSXIdentifier("id"),
              t.stringLiteral(nameSpacedId),
            ),
            t.jSXAttribute(t.jSXIdentifier("lang"), t.stringLiteral("en")),
          ]),
          t.jSXClosingElement(t.jSXIdentifier("title")),
          [
            t.jSXExpressionContainer(
              t.memberExpression(t.identifier("props"), t.identifier("title")),
            ),
          ],
        ),
      ),
    ),
  );
}

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
      let fnName = null;

      // has a url reference to an id
      // example: `fill="url(#foo)"`
      if (/^url\(#/.test(value.value)) {
        fnName = "getUrl";
      }

      // has an href attribute to an id
      // example: `href="#foo"`
      else if (name.name === "href" || name.name === "xlinkHref") {
        fnName = "getRef";
      }

      // has an id or aria-labelledby attribute
      else if (name.name === "id" || name.name === "aria-labelledby") {
        fnName = "getId";
      }

      if (fnName) {
        // AST of `{foo('baz')}`
        attribute.value = t.jSXExpressionContainer(
          t.callExpression(t.identifier(fnName), [
            t.stringLiteral(nameSpacedId),
          ]),
        );
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
