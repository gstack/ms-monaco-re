define("vs/languages/markdown/markdown.contribution", ["require", "exports", "vs/platform/platform",
  "vs/editor/modes/modesExtensions"
], function(e, t, n, i) {
  var o = n.Registry.as(i.Extensions.EditorModes);
  o.registerMode(["text/x-web-markdown"], new n.DeferredDescriptor("vs/languages/markdown/markdown", "MarkdownMode"));
});