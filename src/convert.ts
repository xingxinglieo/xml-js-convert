import { Element, Options, xml2js, js2xml } from "xml-js";
import { traverse, Plugin } from "./traverse";

function deepCopy<T>(obj: T) {
  if (typeof obj == "object") {
    let result = obj.constructor == Array ? [] : {};
    Object.keys(obj).forEach((item) => (result[item] = deepCopy(obj[item])));
    return result as T;
  } else return obj;
}

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

  const copy = deepCopy(element);
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
