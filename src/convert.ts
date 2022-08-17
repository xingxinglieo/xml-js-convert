import { Element, Options } from "xml-js";
import { cloneDeep } from "lodash";
import { traverse, Plugin } from "./traverse";

const { xml2js, js2xml } = require("xml-js");

export const convert = <Info = any>(
  xml: string,
  options: {
    plugins?: Plugin<Info>[];
    info?: Info;
    xml2jsOptions?: Options.XML2JS;
    js2xmlOptions?: Options.JS2XML;
  } = {}
) => {
  const { plugins = [], info = null, xml2jsOptions, js2xmlOptions } = options;
  const element = xml2js(
    plugins.reduce((x, plugin) => plugin.replaceBefore?.(x, info) ?? xml, xml),
    xml2jsOptions
  ) as Element;

  const copy = cloneDeep(element);
  const root = copy;

  traverse({
    element: root,
    elements: [root],
    path: [],
    info,
    root,
    plugins,
    source: xml,
    origin: element
  });

  return plugins.reduce(
    (xml, plugin) => plugin.replaceAfter?.(xml, info) ?? xml,
    js2xml(root, js2xmlOptions) as string
  );
};
