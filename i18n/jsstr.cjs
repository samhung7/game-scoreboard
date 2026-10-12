// prints JSON list of string/template literals in a JS file, templates with {0},{1} placeholders
const ts = require(process.argv[2]); const fs = require("fs");
const src = ts.createSourceFile("f.js", fs.readFileSync(process.argv[3], "utf8"), ts.ScriptTarget.Latest, true);
const out = [];
(function walk(n) {
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) out.push(n.text);
  else if (ts.isTemplateExpression(n)) out.push(n.head.text + n.templateSpans.map((s, i) => `{${i}}` + s.literal.text).join(""));
  ts.forEachChild(n, walk);
})(src);
console.log(JSON.stringify(out));
