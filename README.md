# xml-js-convert

``` ts
import { covert } from 'xml-js-convert'
```

``` ts
import { Options } from "xml-js";
export declare const convert: <Info = any>(xml: string, options: {
    plugins?: Plugin<Info>[];
    info?: Info; // info is passed by you to record something.
    xml2jsOptions?: Options.XML2JS;
    js2xmlOptions?: Options.JS2XML;
}) => string;

export declare type Plugin<T = any> = {
    replaceBefore?: (xml: string, info: T) => string; // handle source code before traverse
    replaceAfter?: (xml: string, info: T) => string; // handle generate code after js2xml
    after?: TraverseFunction; // called before traverse children
    before?: TraverseFunction; // called after traverse children
};


export declare type Props<T = any> = {
    element: Element; // now traversing element 
    elements: Element[]; // the arr element in
    root: Element; // traverse root, it's traversing it
    origin: Element; // origin root, only store it for any message
    info: T; // 
    source: string; // source code
    path: string[]; // now traversing key
    plugins: Plugin<T>[]; // handle plugins
};
export declare type TraverseFunction = (args: Props & {
    stop: () => void; // stop calling others plugins,and stop traversing its children
    findAncestor: (level: number) => Element; // find its Ancestor, such findAncestor(1) get its parent
}) => void;
```

