import { Project, SourceFile } from "ts-morph";
import * as ts from "typescript";

const filePath = process.argv.slice(2)[0];

if (!filePath) {
  console.error("no file specified");
}

const project = new Project();
project.addSourceFilesAtPaths(filePath);
const sourceFile = project.getSourceFileOrThrow(filePath);
const convertTw = (sourceFile: SourceFile) => {
  /**
   * converts:
   *   tw(prop1('a', 'b'), prop2('c', d'))
   * to:
   *   'a b c d'
   */
  const newSourceFile = sourceFile.transform((traversal) => {
    const node = traversal.visitChildren(); // Here travseral visits children in postorder

    // total hack here.  some classNames nodes don't have text. make sure it does otherwise calling
    // getText() totally borks.   i'm sure there's a more elegant way to do this
    let hasText = true;
    if (ts.isCallExpression(node)) {
      try {
        console.log("node", node?.getText());
      } catch (error) {
        // console.log("node", node);
        hasText = false;
      }
    }

    if (
      ts.isCallExpression(node) &&
      hasText &&
      node.getText().startsWith("tw")
    ) {
      let twClasses: string[] = [];
      node.forEachChild((child) => {
        if (ts.isCallExpression(child)) {
          const args = child.arguments
            .map((a) => {
              if (ts.isStringLiteral(a)) {
                return a.text;
              }
              return undefined;
            })
            .filter((arg): arg is string => !!arg);

          twClasses = [...twClasses, ...args];
        }
      });

      return ts.factory.createStringLiteral(twClasses.join(" "));
    }

    return node;
  });

  /**
   * converts:
   *   className={'flex flex-col'}
   * to:
   *   className='flex flex-col'
   */
  return (
    newSourceFile
      .transform((traversal) => {
        const node = traversal.visitChildren(); // Here travseral visits children in postorder

        if (
          ts.isJsxExpression(node) &&
          !!node &&
          !!node.parent &&
          ts.isJsxAttribute(node.parent) &&
          node?.parent?.name?.escapedText === "className"
        ) {
          if (
            node.getChildCount() === 3 &&
            node
              .getChildren()
              .every((child) =>
                [
                  ts.SyntaxKind.OpenBraceToken,
                  ts.SyntaxKind.StringLiteral,
                  ts.SyntaxKind.CloseBraceToken,
                ].includes(child.kind),
              )
          ) {
            return node
              .getChildren()
              .filter((child) => ts.isStringLiteral(child))[0];
          }
        }
        return node;
      })
      // remove unused imports
      .fixUnusedIdentifiers()
  );
};

convertTw(sourceFile).saveSync();
