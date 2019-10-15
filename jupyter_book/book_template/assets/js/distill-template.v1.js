(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (factory((global.dl = global.dl || {})));
}(this, (function(exports) {
    'use strict';

    var html = function(dom) {
        if (!dom.querySelector("html").getAttribute("lang")) {
            dom.querySelector("html").setAttribute("lang", "en");
        }

        var head = dom.querySelector("head");

        if (!dom.querySelector("meta[charset]")) {
            var meta = dom.createElement("meta");
            meta.setAttribute("charset", "utf-8");
            head.appendChild(meta);
        }
        if (!dom.querySelector("meta[name=viewport]")) {
            var meta$1 = dom.createElement("meta");
            meta$1.setAttribute("name", "viewport");
            meta$1.setAttribute("content", "width=device-width, initial-scale=1");
            head.appendChild(meta$1);
        }
    };

    var base = "html {\n  font: 400 16px/1.55em -apple-system, BlinkMacSystemFont, \"Roboto\", Helvetica, sans-serif;\n  /*background-color: hsl(223, 9%, 25%);*/\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n  /*background-color: hsl(223, 9%, 25%);*/\n}\n\na {\n  color: #004276;\n}\n\nfigure {\n  margin: 0;\n}\n\nh1 {\n  font-family: Cochin, Georgia, serif;\n}\n\n/*\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}*/\n";

    var layout = "/*\n  Column: 60px\n  Gutter: 24px\n\n  Body: 648px\n    - 8 columns\n    - 7 gutters\n  Middle: 816px\n  Page: 984px\n    - 12 columns\n    - 11 gutters\n*/\n\n.l-body,\n.l-body-outset,\n.l-page,\n.l-page-outset,\n.l-middle,\n.l-middle-outset,\ndt-article > div,\ndt-article > p,\ndt-article > h1,\ndt-article > h2,\ndt-article > h3,\ndt-article > h4,\ndt-article > figure,\ndt-article > table,\ndt-article > ol,\ndt-article > ul,\ndt-article > dt-byline,\ndt-article > dt-math,\ndt-article > dt-code,\ndt-article section > div,\ndt-article section > p,\ndt-article section > h1,\ndt-article section > h2,\ndt-article section > h3,\ndt-article section > h4,\ndt-article section > figure,\ndt-article section > table,\ndt-article section > ol,\ndt-article section > ul,\ndt-article section > dt-byline,\ndt-article section > dt-code {\n  width: auto;\n  margin-left: 24px;\n  margin-right: 24px;\n  box-sizing: border-box;\n}\n\n@media(min-width: 768px) {\n  .l-body,\n  .l-body-outset,\n  .l-page,\n  .l-page-outset,\n  .l-middle,\n  .l-middle-outset,\n  dt-article > div,\n  dt-article > p,\n  dt-article > h1,\n  dt-article > h2,\n  dt-article > h3,\n  dt-article > h4,\n  dt-article > figure,\n  dt-article > table,\n  dt-article > ol,\n  dt-article > ul,\n  dt-article > dt-byline,\n  dt-article > dt-math,\n  dt-article > dt-code,\n  dt-article section > div,\n  dt-article section > p,\n  dt-article section > h1,\n  dt-article section > h2,\n  dt-article section > h3,\n  dt-article section > h4,\n  dt-article section > figure,\n  dt-article section > table,\n  dt-article section > ol,\n  dt-article section > ul,\n  dt-article section > dt-byline,\n  dt-article section > dt-code {\n    margin-left: 72px;\n    margin-right: 72px;\n  }\n}\n\n@media(min-width: 1080px) {\n  .l-body,\n  dt-article > div,\n  dt-article > p,\n  dt-article > h2,\n  dt-article > h3,\n  dt-article > h4,\n  dt-article > figure,\n  dt-article > table,\n  dt-article > ol,\n  dt-article > ul,\n  dt-article > dt-byline,\n  dt-article > dt-math,\n  dt-article > dt-code,\n  dt-article section > div,\n  dt-article section > p,\n  dt-article section > h2,\n  dt-article section > h3,\n  dt-article section > h4,\n  dt-article section > figure,\n  dt-article section > table,\n  dt-article section > ol,\n  dt-article section > ul,\n  dt-article section > dt-byline,\n  dt-article section > dt-code {\n    margin-left: calc(50% - 984px / 2);\n    width: 648px;\n  }\n  .l-body-outset,\n  dt-article .l-body-outset {\n    margin-left: calc(50% - 984px / 2 - 96px/2);\n    width: calc(648px + 96px);\n  }\n  .l-middle,\n  dt-article .l-middle {\n    width: 816px;\n    margin-left: calc(50% - 984px / 2);\n    margin-right: auto;\n  }\n  .l-middle-outset,\n  dt-article .l-middle-outset {\n    width: calc(816px + 96px);\n    margin-left: calc(50% - 984px / 2 - 48px);\n    margin-right: auto;\n  }\n  dt-article > h1,\n  dt-article section > h1,\n  .l-page,\n  dt-article .l-page,\n  dt-article.centered .l-page {\n    width: 984px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n  .l-page-outset,\n  dt-article .l-page-outset,\n  dt-article.centered .l-page-outset {\n    width: 1080px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n  .l-screen,\n  dt-article .l-screen,\n  dt-article.centered .l-screen {\n    margin-left: auto;\n    margin-right: auto;\n    width: auto;\n  }\n  .l-screen-inset,\n  dt-article .l-screen-inset,\n  dt-article.centered .l-screen-inset {\n    margin-left: 24px;\n    margin-right: 24px;\n    width: auto;\n  }\n  .l-gutter,\n  dt-article .l-gutter {\n    clear: both;\n    float: right;\n    margin-top: 0;\n    margin-left: 24px;\n    margin-right: calc((100vw - 984px) / 2 + 168px);\n    width: calc((984px - 648px) / 2 - 24px);\n  }\n\n  /* Side */\n  .side.l-body,\n  dt-article .side.l-body {\n    clear: both;\n    float: right;\n    margin-top: 0;\n    margin-left: 48px;\n    margin-right: calc((100vw - 984px + 648px) / 2);\n    width: calc(648px / 2 - 24px - 84px);\n  }\n  .side.l-body-outset,\n  dt-article .side.l-body-outset {\n    clear: both;\n    float: right;\n    margin-top: 0;\n    margin-left: 48px;\n    margin-right: calc((100vw - 984px + 648px - 48px) / 2);\n    width: calc(648px / 2 - 48px + 24px);\n  }\n  .side.l-middle,\n  dt-article .side.l-middle {\n    clear: both;\n    float: right;\n    width: calc(456px - 84px);\n    margin-left: 48px;\n    margin-right: calc((100vw - 984px) / 2 + 168px);\n  }\n  .side.l-middle-outset,\n  dt-article .side.l-middle-outset {\n    clear: both;\n    float: right;\n    width: 456px;\n    margin-left: 48px;\n    margin-right: calc((100vw - 984px) / 2 + 168px);\n  }\n  .side.l-page,\n  dt-article .side.l-page {\n    clear: both;\n    float: right;\n    margin-left: 48px;\n    width: calc(624px - 84px);\n    margin-right: calc((100vw - 984px) / 2);\n  }\n  .side.l-page-outset,\n  dt-article .side.l-page-outset {\n    clear: both;\n    float: right;\n    width: 624px;\n    margin-right: calc((100vw - 984px) / 2);\n  }\n}\n\n/* Centered */\n\n@media(min-width: 1080px) {\n  .centered .l-body,\n  .centered.l-body,\n  dt-article.centered > div,\n  dt-article.centered > p,\n  dt-article.centered > h2,\n  dt-article.centered > h3,\n  dt-article.centered > h4,\n  dt-article.centered > figure,\n  dt-article.centered > table,\n  dt-article.centered > ol,\n  dt-article.centered > ul,\n  dt-article.centered > dt-byline,\n  dt-article.centered > dt-code,\n  dt-article.centered section > div,\n  dt-article.centered section > p,\n  dt-article.centered section > h2,\n  dt-article.centered section > h3,\n  dt-article.centered section > h4,\n  dt-article.centered section > figure,\n  dt-article.centered section > table,\n  dt-article.cebtered section > ol,\n  dt-article.centered section > ul,\n  dt-article.centered section > dt-byline,\n  dt-article.centered section > dt-code,\n  dt-article section.centered > div,\n  dt-article section.centered > p,\n  dt-article section.centered > h2,\n  dt-article section.centered > h3,\n  dt-article section.centered > h4,\n  dt-article section.centered > figure,\n  dt-article section.centered > table,\n  dt-article section.centered > ol,\n  dt-article section.centered > ul,\n  dt-article section.centered > dt-byline,\n  dt-article section.centered > dt-code {\n    margin-left: auto;\n    margin-right: auto;\n    width: 648px;\n  }\n  .centered .l-body-outset,\n  .centered.l-body-outset,\n  dt-article.centered .l-body-outset {\n    margin-left: auto;\n    margin-right: auto;\n    width: calc(648px + 96px);\n  }\n  dt-article.centered > h1,\n  dt-article.centered section > h1,\n  dt-article section.centered > h1,\n  .centered .l-middle,\n  .centered.l-middle,\n  dt-article.centered .l-middle {\n    width: 816px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .centered .l-middle-outset,\n  .centered.l-middle-outset,\n  dt-article.centered .l-middle-outset {\n    width: calc(816px + 96px);\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  /* page and screen are already centered */\n\n  /* Side */\n\n  .centered .side.l-body,\n  .centered dt-article .side.l-body {\n    clear: both;\n    float: right;\n    margin-top: 0;\n    margin-left: 48px;\n    margin-right: calc((100vw - 648px) / 2);\n    width: calc(4 * 60px + 3 * 24px);\n  }\n  .centered .side.l-body-outset,\n  .centered dt-article .side.l-body-outset {\n    clear: both;\n    float: right;\n    margin-top: 0;\n    margin-left: 48px;\n    margin-right: calc((100vw - 648px) / 2);\n    width: calc(4 * 60px + 3 * 24px);\n  }\n  .centered .side.l-middle,\n  .centered dt-article .side.l-middle {\n    clear: both;\n    float: right;\n    width: 396px;\n    margin-left: 48px;\n    margin-right: calc((100vw - 984px) / 2 + 168px / 2);\n  }\n  .centered .side.l-middle-outset,\n  .centered dt-article .side.l-middle-outset {\n    clear: both;\n    float: right;\n    width: 456px;\n    margin-left: 48px;\n    margin-right: calc((100vw - 984px) / 2 + 168px);\n  }\n  .centered .side.l-page,\n  .centered dt-article .side.l-page {\n    clear: both;\n    float: right;\n    width: 480px;\n    margin-right: calc((100vw - 984px) / 2);\n  }\n  .centered .side.l-page-outset,\n  .centered dt-article .side.l-page-outset {\n    clear: both;\n    float: right;\n    width: 480px;\n    margin-right: calc((100vw - 984px) / 2);\n  }\n  .centered .l-gutter,\n  .centered.l-gutter,\n  dt-article.centered .l-gutter {\n    clear: both;\n    float: right;\n    margin-top: 0;\n    margin-left: 24px;\n    margin-right: calc((100vw - 984px) / 2);\n    width: calc((984px - 648px) / 2 - 24px);\n  }\n\n}\n\n/* Rows and Columns */\n\n.row {\n  display: flex;\n}\n.column {\n  flex: 1;\n  box-sizing: border-box;\n  margin-right: 24px;\n  margin-left: 24px;\n}\n.row > .column:first-of-type {\n  margin-left: 0;\n}\n.row > .column:last-of-type {\n  margin-right: 0;\n}\n";

    var article = "dt-article {\n  display: block;\n  color: rgba(0, 0, 0, 0.8);\n  font: 17px/1.55em -apple-system, BlinkMacSystemFont, \"Roboto\", sans-serif;\n  padding-bottom: 72px;\n  background: white;\n}\n\n@media(min-width: 1024px) {\n  dt-article {\n    font-size: 20px;\n  }\n}\n\n/* H1 */\n\ndt-article h1 {\n  margin-top: 18px;\n  font-weight: 400;\n  font-size: 40px;\n  line-height: 1em;\n  font-family: HoeflerText-Regular, Cochin, Georgia, serif;\n}\n@media(min-width: 768px) {\n  dt-article h1 {\n    font-size: 46px;\n    margin-top: 48px;\n    margin-bottom: 12px;\n  }\n}\n\n@media(min-width: 1080px) {\n  .centered h1 {\n    text-align: center;\n  }\n\n  dt-article h1 {\n    font-size: 50px;\n    letter-spacing: -0.02em;\n  }\n\n  dt-article > h1:first-of-type,\n  dt-article section > h1:first-of-type {\n    margin-top: 80px;\n  }\n}\n\n\n@media(min-width: 1200px) {\n  dt-article h1 {\n    font-size: 56px;\n  }\n\n  dt-article > h1:first-of-type {\n    margin-top: 100px;\n  }\n}\n\n/* H2 */\n\ndt-article h2 {\n  font-family: HoeflerText-Regular, Cochin, Georgia, serif;\n  font-weight: 400;\n  font-size: 26px;\n  line-height: 1.25em;\n  margin-top: 36px;\n  margin-bottom: 24px;\n}\n\n@media(min-width: 1024px) {\n  dt-article h2 {\n    margin-top: 48px;\n    font-size: 30px;\n  }\n}\n\ndt-article h1 + h2 {\n  font-weight: 300;\n  font-size: 20px;\n  line-height: 1.4em;\n  margin-top: 8px;\n  font-style: normal;\n}\n\n\n@media(min-width: 1080px) {\n  .centered h1 + h2 {\n    text-align: center;\n  }\n  dt-article h1 + h2 {\n    margin-top: 12px;\n    font-size: 24px;\n  }\n}\n\n/* H3 */\n\ndt-article h3 {\n  font-family: HoeflerText-Regular, Georgia, serif;\n  font-weight: 400;\n  font-size: 20px;\n  line-height: 1.4em;\n  margin-top: 36px;\n  margin-bottom: 18px;\n  font-style: italic;\n}\n\ndt-article h1 + h3 {\n  margin-top: 48px;\n}\n\n@media(min-width: 1024px) {\n  dt-article h3 {\n    font-size: 26px;\n  }\n}\n\n/* H4 */\n\ndt-article h4 {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  line-height: 1.4em;\n}\n\ndt-article a {\n  color: inherit;\n}\n\ndt-article p,\ndt-article ul,\ndt-article ol {\n  margin-bottom: 24px;\n  font-family: Georgia, serif;\n}\n\ndt-article p b,\ndt-article ul b,\ndt-article ol b {\n  -webkit-font-smoothing: antialiased;\n}\n\ndt-article a {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  text-decoration: none;\n}\n\ndt-article a:hover {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.8);\n}\n\ndt-article .link {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\ndt-article ul,\ndt-article ol {\n  padding-left: 24px;\n}\n\ndt-article li {\n  margin-bottom: 24px;\n  margin-left: 0;\n  padding-left: 0;\n}\n\ndt-article pre {\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\n\ndt-article hr {\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\ndt-article section {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\n/* Tables */\n\ndt-article table {\n  border-collapse: collapse;\n}\n\ndt-article table th {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n\ndt-article table td {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\ndt-article table th,\ndt-article table td {\n  font-size: 15px;\n  padding: 2px 0;\n}\n\n/* Figure */\n\ndt-article figure {\n  position: relative;\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n\n@media(min-width: 1024px) {\n  dt-article figure {\n    margin-top: 48px;\n    margin-bottom: 48px;\n  }\n}\n\ndt-article figure img {\n  width: 100%;\n}\n\ndt-article figure svg text,\ndt-article figure svg tspan {\n}\n\ndt-article figure figcaption {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n@media(min-width: 1024px) {\n  dt-article figure figcaption {\n    font-size: 13px;\n  }\n}\n\ndt-article figure.external img {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);\n  padding: 18px;\n  box-sizing: border-box;\n}\n\ndt-article figure figcaption a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\ndt-article span.equation-mimic {\n  font-family: georgia;\n  font-size: 115%;\n  font-style: italic;\n}\n\ndt-article figure figcaption b {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 1.0);\n}\n\ndt-article > dt-code,\ndt-article section > dt-code  {\n  display: block;\n}\n\ndt-article .citation {\n  color: #668;\n  cursor: pointer;\n}\n\ndt-include {\n  width: auto;\n  display: block;\n}\n";

    var code = "/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode {\n  white-space: nowrap;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 2px;\n  padding: 4px 7px;\n  font-size: 15px;\n  color: rgba(0, 0, 0, 0.6);\n}\n\npre code {\n  display: block;\n  background: white;\n  border-left: 3px solid rgba(0, 0, 0, 0.05);\n  padding: 0 0 0 24px;\n}\n\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n  text-shadow: none;\n  }\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n  overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n.token.punctuation {\n  color: #999;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n.token.function {\n  color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n";

    var print = "\n@media print {\n  @page {\n    size: 8in 11in;\n  }\n  html {\n  }\n  p, code {\n    page-break-inside: avoid;\n  }\n  h2, h3 {\n    page-break-after: avoid;\n  }\n  dt-header {\n    visibility: hidden;\n  }\n  dt-footer {\n    display: none!important;\n  }\n}\n";

    var styles = function(dom) {
        var s = dom.createElement("style");
        s.textContent = base + layout + article + code + print;
        dom.querySelector("head").appendChild(s);
    };

    function isNothing(subject) {
        return (typeof subject === 'undefined') || (subject === null);
    }

    function isObject(subject) {
        return (typeof subject === 'object') && (subject !== null);
    }

    function toArray(sequence) {
        if (Array.isArray(sequence)) {
            return sequence;
        } else if (isNothing(sequence)) {
            return [];
        }

        return [sequence];
    }

    function extend(target, source) {
        var index, length, key, sourceKeys;

        if (source) {
            sourceKeys = Object.keys(source);

            for (index = 0,
            length = sourceKeys.length; index < length; index += 1) {
                key = sourceKeys[index];
                target[key] = source[key];
            }
        }

        return target;
    }

    function repeat(string, count) {
        var result = '', cycle;

        for (cycle = 0; cycle < count; cycle += 1) {
            result += string;
        }

        return result;
    }

    function isNegativeZero(number) {
        return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
    }

    var isNothing_1 = isNothing;
    var isObject_1 = isObject;
    var toArray_1 = toArray;
    var repeat_1 = repeat;
    var isNegativeZero_1 = isNegativeZero;
    var extend_1 = extend;

    var common$1 = {
        isNothing: isNothing_1,
        isObject: isObject_1,
        toArray: toArray_1,
        repeat: repeat_1,
        isNegativeZero: isNegativeZero_1,
        extend: extend_1
    };

    // YAML error class. http://stackoverflow.com/questions/8458984
    //
    function YAMLException$2(reason, mark) {
        // Super constructor
        Error.call(this);

        // Include stack trace in error object
        if (Error.captureStackTrace) {
            // Chrome and NodeJS
            Error.captureStackTrace(this, this.constructor);
        } else {
            // FF, IE 10+ and Safari 6+. Fallback for others
            this.stack = (new Error()).stack || '';
        }

        this.name = 'YAMLException';
        this.reason = reason;
        this.mark = mark;
        this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');
    }

    // Inherit from Error
    YAMLException$2.prototype = Object.create(Error.prototype);
    YAMLException$2.prototype.constructor = YAMLException$2;

    YAMLException$2.prototype.toString = function toString(compact) {
        var result = this.name + ': ';

        result += this.reason || '(unknown reason)';

        if (!compact && this.mark) {
            result += ' ' + this.mark.toString();
        }

        return result;
    }
    ;

    var exception = YAMLException$2;

    var common$3 = common$1;

    function Mark$1(name, buffer, position, line, column) {
        this.name = name;
        this.buffer = buffer;
        this.position = position;
        this.line = line;
        this.column = column;
    }

    Mark$1.prototype.getSnippet = function getSnippet(indent, maxLength) {
        var this$1 = this;

        var head, start, tail, end, snippet;

        if (!this.buffer) {
            return null;
        }

        indent = indent || 4;
        maxLength = maxLength || 75;

        head = '';
        start = this.position;

        while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
            start -= 1;
            if (this$1.position - start > (maxLength / 2 - 1)) {
                head = ' ... ';
                start += 5;
                break;
            }
        }

        tail = '';
        end = this.position;

        while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
            end += 1;
            if (end - this$1.position > (maxLength / 2 - 1)) {
                tail = ' ... ';
                end -= 5;
                break;
            }
        }

        snippet = this.buffer.slice(start, end);

        return common$3.repeat(' ', indent) + head + snippet + tail + '\n' + common$3.repeat(' ', indent + this.position - start + head.length) + '^';
    }
    ;

    Mark$1.prototype.toString = function toString(compact) {
        var snippet, where = '';

        if (this.name) {
            where += 'in "' + this.name + '" ';
        }

        where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

        if (!compact) {
            snippet = this.getSnippet();

            if (snippet) {
                where += ':\n' + snippet;
            }
        }

        return where;
    }
    ;

    var mark = Mark$1;

    var YAMLException$4 = exception;

    var TYPE_CONSTRUCTOR_OPTIONS = ['kind', 'resolve', 'construct', 'instanceOf', 'predicate', 'represent', 'defaultStyle', 'styleAliases'];

    var YAML_NODE_KINDS = ['scalar', 'sequence', 'mapping'];

    function compileStyleAliases(map) {
        var result = {};

        if (map !== null) {
            Object.keys(map).forEach(function(style) {
                map[style].forEach(function(alias) {
                    result[String(alias)] = style;
                });
            });
        }

        return result;
    }

    function Type$2(tag, options) {
        options = options || {};

        Object.keys(options).forEach(function(name) {
            if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
                throw new YAMLException$4('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
            }
        });

        // TODO: Add tag format check.
        this.tag = tag;
        this.kind = options['kind'] || null;
        this.resolve = options['resolve'] || function() {
            return true;
        }
        ;
        this.construct = options['construct'] || function(data) {
            return data;
        }
        ;
        this.instanceOf = options['instanceOf'] || null;
        this.predicate = options['predicate'] || null;
        this.represent = options['represent'] || null;
        this.defaultStyle = options['defaultStyle'] || null;
        this.styleAliases = compileStyleAliases(options['styleAliases'] || null);

        if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
            throw new YAMLException$4('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
        }
    }

    var type = Type$2;

    /*eslint-disable max-len*/

    var common$4 = common$1;
    var YAMLException$3 = exception;
    var Type$1 = type;

    function compileList(schema, name, result) {
        var exclude = [];

        schema.include.forEach(function(includedSchema) {
            result = compileList(includedSchema, name, result);
        });

        schema[name].forEach(function(currentType) {
            result.forEach(function(previousType, previousIndex) {
                if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
                    exclude.push(previousIndex);
                }
            });

            result.push(currentType);
        });

        return result.filter(function(type$$1, index) {
            return exclude.indexOf(index) === -1;
        });
    }

    function compileMap(/* lists... */
    ) {
        var arguments$1 = arguments;

        var result = {
            scalar: {},
            sequence: {},
            mapping: {},
            fallback: {}
        }, index, length;

        function collectType(type$$1) {
            result[type$$1.kind][type$$1.tag] = result['fallback'][type$$1.tag] = type$$1;
        }

        for (index = 0,
        length = arguments.length; index < length; index += 1) {
            arguments$1[index].forEach(collectType);
        }
        return result;
    }

    function Schema$2(definition) {
        this.include = definition.include || [];
        this.implicit = definition.implicit || [];
        this.explicit = definition.explicit || [];

        this.implicit.forEach(function(type$$1) {
            if (type$$1.loadKind && type$$1.loadKind !== 'scalar') {
                throw new YAMLException$3('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
            }
        });

        this.compiledImplicit = compileList(this, 'implicit', []);
        this.compiledExplicit = compileList(this, 'explicit', []);
        this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }

    Schema$2.DEFAULT = null;

    Schema$2.create = function createSchema() {
        var schemas, types;

        switch (arguments.length) {
        case 1:
            schemas = Schema$2.DEFAULT;
            types = arguments[0];
            break;

        case 2:
            schemas = arguments[0];
            types = arguments[1];
            break;

        default:
            throw new YAMLException$3('Wrong number of arguments for Schema.create function');
        }

        schemas = common$4.toArray(schemas);
        types = common$4.toArray(types);

        if (!schemas.every(function(schema) {
            return schema instanceof Schema$2;
        })) {
            throw new YAMLException$3('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
        }

        if (!types.every(function(type$$1) {
            return type$$1 instanceof Type$1;
        })) {
            throw new YAMLException$3('Specified list of YAML types (or a single Type object) contains a non-Type object.');
        }

        return new Schema$2({
            include: schemas,
            explicit: types
        });
    }
    ;

    var schema = Schema$2;

    var Type$3 = type;

    var str = new Type$3('tag:yaml.org,2002:str',{
        kind: 'scalar',
        construct: function(data) {
            return data !== null ? data : '';
        }
    });

    var Type$4 = type;

    var seq = new Type$4('tag:yaml.org,2002:seq',{
        kind: 'sequence',
        construct: function(data) {
            return data !== null ? data : [];
        }
    });

    var Type$5 = type;

    var map = new Type$5('tag:yaml.org,2002:map',{
        kind: 'mapping',
        construct: function(data) {
            return data !== null ? data : {};
        }
    });

    var Schema$5 = schema;

    var failsafe = new Schema$5({
        explicit: [str, seq, map]
    });

    var Type$6 = type;

    function resolveYamlNull(data) {
        if (data === null) {
            return true;
        }

        var max = data.length;

        return (max === 1 && data === '~') || (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
    }

    function constructYamlNull() {
        return null;
    }

    function isNull(object) {
        return object === null;
    }

    var _null = new Type$6('tag:yaml.org,2002:null',{
        kind: 'scalar',
        resolve: resolveYamlNull,
        construct: constructYamlNull,
        predicate: isNull,
        represent: {
            canonical: function() {
                return '~';
            },
            lowercase: function() {
                return 'null';
            },
            uppercase: function() {
                return 'NULL';
            },
            camelcase: function() {
                return 'Null';
            }
        },
        defaultStyle: 'lowercase'
    });

    var Type$7 = type;

    function resolveYamlBoolean(data) {
        if (data === null) {
            return false;
        }

        var max = data.length;

        return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) || (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
    }

    function constructYamlBoolean(data) {
        return data === 'true' || data === 'True' || data === 'TRUE';
    }

    function isBoolean(object) {
        return Object.prototype.toString.call(object) === '[object Boolean]';
    }

    var bool = new Type$7('tag:yaml.org,2002:bool',{
        kind: 'scalar',
        resolve: resolveYamlBoolean,
        construct: constructYamlBoolean,
        predicate: isBoolean,
        represent: {
            lowercase: function(object) {
                return object ? 'true' : 'false';
            },
            uppercase: function(object) {
                return object ? 'TRUE' : 'FALSE';
            },
            camelcase: function(object) {
                return object ? 'True' : 'False';
            }
        },
        defaultStyle: 'lowercase'
    });

    var common$5 = common$1;
    var Type$8 = type;

    function isHexCode(c) {
        return ((0x30 /* 0 */
        <= c) && (c <= 0x39 /* 9 */
        )) || ((0x41 /* A */
        <= c) && (c <= 0x46 /* F */
        )) || ((0x61 /* a */
        <= c) && (c <= 0x66 /* f */
        ));
    }

    function isOctCode(c) {
        return ((0x30 /* 0 */
        <= c) && (c <= 0x37 /* 7 */
        ));
    }

    function isDecCode(c) {
        return ((0x30 /* 0 */
        <= c) && (c <= 0x39 /* 9 */
        ));
    }

    function resolveYamlInteger(data) {
        if (data === null) {
            return false;
        }

        var max = data.length, index = 0, hasDigits = false, ch;

        if (!max) {
            return false;
        }

        ch = data[index];

        // sign
        if (ch === '-' || ch === '+') {
            ch = data[++index];
        }

        if (ch === '0') {
            // 0
            if (index + 1 === max) {
                return true;
            }
            ch = data[++index];

            // base 2, base 8, base 16

            if (ch === 'b') {
                // base 2
                index++;

                for (; index < max; index++) {
                    ch = data[index];
                    if (ch === '_') {
                        continue;
                    }
                    if (ch !== '0' && ch !== '1') {
                        return false;
                    }
                    hasDigits = true;
                }
                return hasDigits;
            }

            if (ch === 'x') {
                // base 16
                index++;

                for (; index < max; index++) {
                    ch = data[index];
                    if (ch === '_') {
                        continue;
                    }
                    if (!isHexCode(data.charCodeAt(index))) {
                        return false;
                    }
                    hasDigits = true;
                }
                return hasDigits;
            }

            // base 8
            for (; index < max; index++) {
                ch = data[index];
                if (ch === '_') {
                    continue;
                }
                if (!isOctCode(data.charCodeAt(index))) {
                    return false;
                }
                hasDigits = true;
            }
            return hasDigits;
        }

        // base 10 (except 0) or base 60

        for (; index < max; index++) {
            ch = data[index];
            if (ch === '_') {
                continue;
            }
            if (ch === ':') {
                break;
            }
            if (!isDecCode(data.charCodeAt(index))) {
                return false;
            }
            hasDigits = true;
        }

        if (!hasDigits) {
            return false;
        }

        // if !base60 - done;
        if (ch !== ':') {
            return true;
        }

        // base60 almost not used, no needs to optimize
        return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }

    function constructYamlInteger(data) {
        var value = data, sign = 1, ch, base, digits = [];

        if (value.indexOf('_') !== -1) {
            value = value.replace(/_/g, '');
        }

        ch = value[0];

        if (ch === '-' || ch === '+') {
            if (ch === '-') {
                sign = -1;
            }
            value = value.slice(1);
            ch = value[0];
        }

        if (value === '0') {
            return 0;
        }

        if (ch === '0') {
            if (value[1] === 'b') {
                return sign * parseInt(value.slice(2), 2);
            }
            if (value[1] === 'x') {
                return sign * parseInt(value, 16);
            }
            return sign * parseInt(value, 8);
        }

        if (value.indexOf(':') !== -1) {
            value.split(':').forEach(function(v) {
                digits.unshift(parseInt(v, 10));
            });

            value = 0;
            base = 1;

            digits.forEach(function(d) {
                value += (d * base);
                base *= 60;
            });

            return sign * value;

        }

        return sign * parseInt(value, 10);
    }

    function isInteger(object) {
        return (Object.prototype.toString.call(object)) === '[object Number]' && (object % 1 === 0 && !common$5.isNegativeZero(object));
    }

    var int_1 = new Type$8('tag:yaml.org,2002:int',{
        kind: 'scalar',
        resolve: resolveYamlInteger,
        construct: constructYamlInteger,
        predicate: isInteger,
        represent: {
            binary: function(object) {
                return '0b' + object.toString(2);
            },
            octal: function(object) {
                return '0' + object.toString(8);
            },
            decimal: function(object) {
                return object.toString(10);
            },
            hexadecimal: function(object) {
                return '0x' + object.toString(16).toUpperCase();
            }
        },
        defaultStyle: 'decimal',
        styleAliases: {
            binary: [2, 'bin'],
            octal: [8, 'oct'],
            decimal: [10, 'dec'],
            hexadecimal: [16, 'hex']
        }
    });

    var common$6 = common$1;
    var Type$9 = type;

    var YAML_FLOAT_PATTERN = new RegExp('^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?' + '|\\.[0-9_]+(?:[eE][-+][0-9]+)?' + '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' + '|[-+]?\\.(?:inf|Inf|INF)' + '|\\.(?:nan|NaN|NAN))$');

    function resolveYamlFloat(data) {
        if (data === null) {
            return false;
        }

        if (!YAML_FLOAT_PATTERN.test(data)) {
            return false;
        }

        return true;
    }

    function constructYamlFloat(data) {
        var value, sign, base, digits;

        value = data.replace(/_/g, '').toLowerCase();
        sign = value[0] === '-' ? -1 : 1;
        digits = [];

        if ('+-'.indexOf(value[0]) >= 0) {
            value = value.slice(1);
        }

        if (value === '.inf') {
            return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

        } else if (value === '.nan') {
            return NaN;

        } else if (value.indexOf(':') >= 0) {
            value.split(':').forEach(function(v) {
                digits.unshift(parseFloat(v, 10));
            });

            value = 0.0;
            base = 1;

            digits.forEach(function(d) {
                value += d * base;
                base *= 60;
            });

            return sign * value;

        }
        return sign * parseFloat(value, 10);
    }

    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

    function representYamlFloat(object, style) {
        var res;

        if (isNaN(object)) {
            switch (style) {
            case 'lowercase':
                return '.nan';
            case 'uppercase':
                return '.NAN';
            case 'camelcase':
                return '.NaN';
            }
        } else if (Number.POSITIVE_INFINITY === object) {
            switch (style) {
            case 'lowercase':
                return '.inf';
            case 'uppercase':
                return '.INF';
            case 'camelcase':
                return '.Inf';
            }
        } else if (Number.NEGATIVE_INFINITY === object) {
            switch (style) {
            case 'lowercase':
                return '-.inf';
            case 'uppercase':
                return '-.INF';
            case 'camelcase':
                return '-.Inf';
            }
        } else if (common$6.isNegativeZero(object)) {
            return '-0.0';
        }

        res = object.toString(10);

        // JS stringifier can build scientific format without dots: 5e-100,
        // while YAML requres dot: 5.e-100. Fix it with simple hack

        return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
    }

    function isFloat(object) {
        return (Object.prototype.toString.call(object) === '[object Number]') && (object % 1 !== 0 || common$6.isNegativeZero(object));
    }

    var float_1 = new Type$9('tag:yaml.org,2002:float',{
        kind: 'scalar',
        resolve: resolveYamlFloat,
        construct: constructYamlFloat,
        predicate: isFloat,
        represent: representYamlFloat,
        defaultStyle: 'lowercase'
    });

    var Schema$4 = schema;

    var json = new Schema$4({
        include: [failsafe],
        implicit: [_null, bool, int_1, float_1]
    });

    var Schema$3 = schema;

    var core = new Schema$3({
        include: [json]
    });

    var Type$10 = type;

    var YAML_DATE_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + // [1] year
    '-([0-9][0-9])' + // [2] month
    '-([0-9][0-9])$');
    // [3] day

    var YAML_TIMESTAMP_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + // [1] year
    '-([0-9][0-9]?)' + // [2] month
    '-([0-9][0-9]?)' + // [3] day
    '(?:[Tt]|[ \\t]+)' + // ...
    '([0-9][0-9]?)' + // [4] hour
    ':([0-9][0-9])' + // [5] minute
    ':([0-9][0-9])' + // [6] second
    '(?:\\.([0-9]*))?' + // [7] fraction
    '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
    '(?::([0-9][0-9]))?))?$');
    // [11] tz_minute

    function resolveYamlTimestamp(data) {
        if (data === null) {
            return false;
        }
        if (YAML_DATE_REGEXP.exec(data) !== null) {
            return true;
        }
        if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) {
            return true;
        }
        return false;
    }

    function constructYamlTimestamp(data) {
        var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;

        match = YAML_DATE_REGEXP.exec(data);
        if (match === null) {
            match = YAML_TIMESTAMP_REGEXP.exec(data);
        }

        if (match === null) {
            throw new Error('Date resolve error');
        }

        // match: [1] year [2] month [3] day

        year = +(match[1]);
        month = +(match[2]) - 1;
        // JS month starts with 0
        day = +(match[3]);

        if (!match[4]) {
            // no hour
            return new Date(Date.UTC(year, month, day));
        }

        // match: [4] hour [5] minute [6] second [7] fraction

        hour = +(match[4]);
        minute = +(match[5]);
        second = +(match[6]);

        if (match[7]) {
            fraction = match[7].slice(0, 3);
            while (fraction.length < 3) {
                // milli-seconds
                fraction += '0';
            }
            fraction = +fraction;
        }

        // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

        if (match[9]) {
            tz_hour = +(match[10]);
            tz_minute = +(match[11] || 0);
            delta = (tz_hour * 60 + tz_minute) * 60000;
            // delta in mili-seconds
            if (match[9] === '-') {
                delta = -delta;
            }
        }

        date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

        if (delta) {
            date.setTime(date.getTime() - delta);
        }

        return date;
    }

    function representYamlTimestamp(object /*, style*/
    ) {
        return object.toISOString();
    }

    var timestamp = new Type$10('tag:yaml.org,2002:timestamp',{
        kind: 'scalar',
        resolve: resolveYamlTimestamp,
        construct: constructYamlTimestamp,
        instanceOf: Date,
        represent: representYamlTimestamp
    });

    var Type$11 = type;

    function resolveYamlMerge(data) {
        return data === '<<' || data === null;
    }

    var merge = new Type$11('tag:yaml.org,2002:merge',{
        kind: 'scalar',
        resolve: resolveYamlMerge
    });

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire() {
        throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function createCommonjsModule(fn, module) {
        return module = {
            exports: {}
        },
        fn(module, module.exports),
        module.exports;
    }

    /*eslint-disable no-bitwise*/

    var NodeBuffer;

    try {
        // A trick for browserified version, to not include `Buffer` shim
        var _require = commonjsRequire;
        NodeBuffer = _require('buffer').Buffer;
    } catch (__) {}

    var Type$12 = type;

    // [ 64, 65, 66 ] -> [ padding, CR, LF ]
    var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';

    function resolveYamlBinary(data) {
        if (data === null) {
            return false;
        }

        var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

        // Convert one by one.
        for (idx = 0; idx < max; idx++) {
            code = map.indexOf(data.charAt(idx));

            // Skip CR/LF
            if (code > 64) {
                continue;
            }

            // Fail on illegal characters
            if (code < 0) {
                return false;
            }

            bitlen += 6;
        }

        // If there are any bits left, source was corrupted
        return (bitlen % 8) === 0;
    }

    function constructYamlBinary(data) {
        var idx, tailbits, input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
        max = input.length, map = BASE64_MAP, bits = 0, result = [];

        // Collect by 6*4 bits (3 bytes)

        for (idx = 0; idx < max; idx++) {
            if ((idx % 4 === 0) && idx) {
                result.push((bits >> 16) & 0xFF);
                result.push((bits >> 8) & 0xFF);
                result.push(bits & 0xFF);
            }

            bits = (bits << 6) | map.indexOf(input.charAt(idx));
        }

        // Dump tail

        tailbits = (max % 4) * 6;

        if (tailbits === 0) {
            result.push((bits >> 16) & 0xFF);
            result.push((bits >> 8) & 0xFF);
            result.push(bits & 0xFF);
        } else if (tailbits === 18) {
            result.push((bits >> 10) & 0xFF);
            result.push((bits >> 2) & 0xFF);
        } else if (tailbits === 12) {
            result.push((bits >> 4) & 0xFF);
        }

        // Wrap into Buffer for NodeJS and leave Array for browser
        if (NodeBuffer) {
            return new NodeBuffer(result);
        }

        return result;
    }

    function representYamlBinary(object /*, style*/
    ) {
        var result = '', bits = 0, idx, tail, max = object.length, map = BASE64_MAP;

        // Convert every three bytes to 4 ASCII characters.

        for (idx = 0; idx < max; idx++) {
            if ((idx % 3 === 0) && idx) {
                result += map[(bits >> 18) & 0x3F];
                result += map[(bits >> 12) & 0x3F];
                result += map[(bits >> 6) & 0x3F];
                result += map[bits & 0x3F];
            }

            bits = (bits << 8) + object[idx];
        }

        // Dump tail

        tail = max % 3;

        if (tail === 0) {
            result += map[(bits >> 18) & 0x3F];
            result += map[(bits >> 12) & 0x3F];
            result += map[(bits >> 6) & 0x3F];
            result += map[bits & 0x3F];
        } else if (tail === 2) {
            result += map[(bits >> 10) & 0x3F];
            result += map[(bits >> 4) & 0x3F];
            result += map[(bits << 2) & 0x3F];
            result += map[64];
        } else if (tail === 1) {
            result += map[(bits >> 2) & 0x3F];
            result += map[(bits << 4) & 0x3F];
            result += map[64];
            result += map[64];
        }

        return result;
    }

    function isBinary(object) {
        return NodeBuffer && NodeBuffer.isBuffer(object);
    }

    var binary = new Type$12('tag:yaml.org,2002:binary',{
        kind: 'scalar',
        resolve: resolveYamlBinary,
        construct: constructYamlBinary,
        predicate: isBinary,
        represent: representYamlBinary
    });

    var Type$13 = type;

    var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;

    function resolveYamlOmap(data) {
        if (data === null) {
            return true;
        }

        var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;

        for (index = 0,
        length = object.length; index < length; index += 1) {
            pair = object[index];
            pairHasKey = false;

            if (_toString.call(pair) !== '[object Object]') {
                return false;
            }

            for (pairKey in pair) {
                if (_hasOwnProperty$1.call(pair, pairKey)) {
                    if (!pairHasKey) {
                        pairHasKey = true;
                    } else {
                        return false;
                    }
                }
            }

            if (!pairHasKey) {
                return false;
            }

            if (objectKeys.indexOf(pairKey) === -1) {
                objectKeys.push(pairKey);
            } else {
                return false;
            }
        }

        return true;
    }

    function constructYamlOmap(data) {
        return data !== null ? data : [];
    }

    var omap = new Type$13('tag:yaml.org,2002:omap',{
        kind: 'sequence',
        resolve: resolveYamlOmap,
        construct: constructYamlOmap
    });

    var Type$14 = type;

    var _toString$1 = Object.prototype.toString;

    function resolveYamlPairs(data) {
        if (data === null) {
            return true;
        }

        var index, length, pair, keys, result, object = data;

        result = new Array(object.length);

        for (index = 0,
        length = object.length; index < length; index += 1) {
            pair = object[index];

            if (_toString$1.call(pair) !== '[object Object]') {
                return false;
            }

            keys = Object.keys(pair);

            if (keys.length !== 1) {
                return false;
            }

            result[index] = [keys[0], pair[keys[0]]];
        }

        return true;
    }

    function constructYamlPairs(data) {
        if (data === null) {
            return [];
        }

        var index, length, pair, keys, result, object = data;

        result = new Array(object.length);

        for (index = 0,
        length = object.length; index < length; index += 1) {
            pair = object[index];

            keys = Object.keys(pair);

            result[index] = [keys[0], pair[keys[0]]];
        }

        return result;
    }

    var pairs = new Type$14('tag:yaml.org,2002:pairs',{
        kind: 'sequence',
        resolve: resolveYamlPairs,
        construct: constructYamlPairs
    });

    var Type$15 = type;

    var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

    function resolveYamlSet(data) {
        if (data === null) {
            return true;
        }

        var key, object = data;

        for (key in object) {
            if (_hasOwnProperty$2.call(object, key)) {
                if (object[key] !== null) {
                    return false;
                }
            }
        }

        return true;
    }

    function constructYamlSet(data) {
        return data !== null ? data : {};
    }

    var set = new Type$15('tag:yaml.org,2002:set',{
        kind: 'mapping',
        resolve: resolveYamlSet,
        construct: constructYamlSet
    });

    var Schema$1 = schema;

    var default_safe = new Schema$1({
        include: [core],
        implicit: [timestamp, merge],
        explicit: [binary, omap, pairs, set]
    });

    var Type$16 = type;

    function resolveJavascriptUndefined() {
        return true;
    }

    function constructJavascriptUndefined() {
        /*eslint-disable no-undefined*/
        return undefined;
    }

    function representJavascriptUndefined() {
        return '';
    }

    function isUndefined(object) {
        return typeof object === 'undefined';
    }

    var _undefined = new Type$16('tag:yaml.org,2002:js/undefined',{
        kind: 'scalar',
        resolve: resolveJavascriptUndefined,
        construct: constructJavascriptUndefined,
        predicate: isUndefined,
        represent: representJavascriptUndefined
    });

    var Type$17 = type;

    function resolveJavascriptRegExp(data) {
        if (data === null) {
            return false;
        }
        if (data.length === 0) {
            return false;
        }

        var regexp = data
          , tail = /\/([gim]*)$/.exec(data)
          , modifiers = '';

        // if regexp starts with '/' it can have modifiers and must be properly closed
        // `/foo/gim` - modifiers tail can be maximum 3 chars
        if (regexp[0] === '/') {
            if (tail) {
                modifiers = tail[1];
            }

            if (modifiers.length > 3) {
                return false;
            }
            // if expression starts with /, is should be properly terminated
            if (regexp[regexp.length - modifiers.length - 1] !== '/') {
                return false;
            }
        }

        return true;
    }

    function constructJavascriptRegExp(data) {
        var regexp = data
          , tail = /\/([gim]*)$/.exec(data)
          , modifiers = '';

        // `/foo/gim` - tail can be maximum 4 chars
        if (regexp[0] === '/') {
            if (tail) {
                modifiers = tail[1];
            }
            regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
        }

        return new RegExp(regexp,modifiers);
    }

    function representJavascriptRegExp(object /*, style*/
    ) {
        var result = '/' + object.source + '/';

        if (object.global) {
            result += 'g';
        }
        if (object.multiline) {
            result += 'm';
        }
        if (object.ignoreCase) {
            result += 'i';
        }

        return result;
    }

    function isRegExp(object) {
        return Object.prototype.toString.call(object) === '[object RegExp]';
    }

    var regexp = new Type$17('tag:yaml.org,2002:js/regexp',{
        kind: 'scalar',
        resolve: resolveJavascriptRegExp,
        construct: constructJavascriptRegExp,
        predicate: isRegExp,
        represent: representJavascriptRegExp
    });

    var esprima;

    // Browserified version does not have esprima
    //
    // 1. For node.js just require module as deps
    // 2. For browser try to require mudule via external AMD system.
    //    If not found - try to fallback to window.esprima. If not
    //    found too - then fail to parse.
    //
    try {
        // workaround to exclude package from browserify list.
        var _require$1 = commonjsRequire;
        esprima = _require$1('esprima');
    } catch (_) {
        /*global window */
        if (typeof window !== 'undefined') {
            esprima = window.esprima;
        }
    }

    var Type$18 = type;

    function resolveJavascriptFunction(data) {
        if (data === null) {
            return false;
        }

        try {
            var source = '(' + data + ')'
              , ast = esprima.parse(source, {
                range: true
            });

            if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'FunctionExpression') {
                return false;
            }

            return true;
        } catch (err) {
            return false;
        }
    }

    function constructJavascriptFunction(data) {
        /*jslint evil:true*/

        var source = '(' + data + ')', ast = esprima.parse(source, {
            range: true
        }), params = [], body;

        if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'FunctionExpression') {
            throw new Error('Failed to resolve function');
        }

        ast.body[0].expression.params.forEach(function(param) {
            params.push(param.name);
        });

        body = ast.body[0].expression.body.range;

        // Esprima's ranges include the first '{' and the last '}' characters on
        // function expressions. So cut them out.
        /*eslint-disable no-new-func*/
        return new Function(params,source.slice(body[0] + 1, body[1] - 1));
    }

    function representJavascriptFunction(object /*, style*/
    ) {
        return object.toString();
    }

    function isFunction(object) {
        return Object.prototype.toString.call(object) === '[object Function]';
    }

    var _function = new Type$18('tag:yaml.org,2002:js/function',{
        kind: 'scalar',
        resolve: resolveJavascriptFunction,
        construct: constructJavascriptFunction,
        predicate: isFunction,
        represent: representJavascriptFunction
    });

    var Schema$6 = schema;

    var default_full = Schema$6.DEFAULT = new Schema$6({
        include: [default_safe],
        explicit: [_undefined, regexp, _function]
    });

    /*eslint-disable max-len,no-use-before-define*/

    var common = common$1;
    var YAMLException$1 = exception;
    var Mark = mark;
    var DEFAULT_SAFE_SCHEMA$1 = default_safe;
    var DEFAULT_FULL_SCHEMA$1 = default_full;

    var _hasOwnProperty = Object.prototype.hasOwnProperty;

    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;

    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;

    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;

    function is_EOL(c) {
        return (c === 0x0A /* LF */
        ) || (c === 0x0D /* CR */
        );
    }

    function is_WHITE_SPACE(c) {
        return (c === 0x09 /* Tab */
        ) || (c === 0x20 /* Space */
        );
    }

    function is_WS_OR_EOL(c) {
        return (c === 0x09 /* Tab */
        ) || (c === 0x20 /* Space */
        ) || (c === 0x0A /* LF */
        ) || (c === 0x0D /* CR */
        );
    }

    function is_FLOW_INDICATOR(c) {
        return c === 0x2C/* , */
        || c === 0x5B/* [ */
        || c === 0x5D/* ] */
        || c === 0x7B/* { */
        || c === 0x7D/* } */
        ;
    }

    function fromHexCode(c) {
        var lc;

        if ((0x30 /* 0 */
        <= c) && (c <= 0x39 /* 9 */
        )) {
            return c - 0x30;
        }

        /*eslint-disable no-bitwise*/
        lc = c | 0x20;

        if ((0x61 /* a */
        <= lc) && (lc <= 0x66 /* f */
        )) {
            return lc - 0x61 + 10;
        }

        return -1;
    }

    function escapedHexLen(c) {
        if (c === 0x78 /* x */
        ) {
            return 2;
        }
        if (c === 0x75 /* u */
        ) {
            return 4;
        }
        if (c === 0x55 /* U */
        ) {
            return 8;
        }
        return 0;
    }

    function fromDecimalCode(c) {
        if ((0x30 /* 0 */
        <= c) && (c <= 0x39 /* 9 */
        )) {
            return c - 0x30;
        }

        return -1;
    }

    function simpleEscapeSequence(c) {
        return (c === 0x30 /* 0 */
        ) ? '\x00' : (c === 0x61 /* a */
        ) ? '\x07' : (c === 0x62 /* b */
        ) ? '\x08' : (c === 0x74 /* t */
        ) ? '\x09' : (c === 0x09 /* Tab */
        ) ? '\x09' : (c === 0x6E /* n */
        ) ? '\x0A' : (c === 0x76 /* v */
        ) ? '\x0B' : (c === 0x66 /* f */
        ) ? '\x0C' : (c === 0x72 /* r */
        ) ? '\x0D' : (c === 0x65 /* e */
        ) ? '\x1B' : (c === 0x20 /* Space */
        ) ? ' ' : (c === 0x22/* " */
        ) ? '\x22' : (c === 0x2F/* / */
        ) ? '/' : (c === 0x5C/* \ */
        ) ? '\x5C' : (c === 0x4E /* N */
        ) ? '\x85' : (c === 0x5F /* _ */
        ) ? '\xA0' : (c === 0x4C /* L */
        ) ? '\u2028' : (c === 0x50 /* P */
        ) ? '\u2029' : '';
    }

    function charFromCodepoint(c) {
        if (c <= 0xFFFF) {
            return String.fromCharCode(c);
        }
        // Encode UTF-16 surrogate pair
        // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
        return String.fromCharCode(((c - 0x010000) >> 10) + 0xD800, ((c - 0x010000) & 0x03FF) + 0xDC00);
    }

    var simpleEscapeCheck = new Array(256);
    // integer, for fast access
    var simpleEscapeMap = new Array(256);
    for (var i = 0; i < 256; i++) {
        simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
        simpleEscapeMap[i] = simpleEscapeSequence(i);
    }

    function State(input, options) {
        this.input = input;

        this.filename = options['filename'] || null;
        this.schema = options['schema'] || DEFAULT_FULL_SCHEMA$1;
        this.onWarning = options['onWarning'] || null;
        this.legacy = options['legacy'] || false;
        this.json = options['json'] || false;
        this.listener = options['listener'] || null;

        this.implicitTypes = this.schema.compiledImplicit;
        this.typeMap = this.schema.compiledTypeMap;

        this.length = input.length;
        this.position = 0;
        this.line = 0;
        this.lineStart = 0;
        this.lineIndent = 0;

        this.documents = [];

        /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

    }

    function generateError(state, message) {
        return new YAMLException$1(message,new Mark(state.filename,state.input,state.position,state.line,(state.position - state.lineStart)));
    }

    function throwError(state, message) {
        throw generateError(state, message);
    }

    function throwWarning(state, message) {
        if (state.onWarning) {
            state.onWarning.call(null, generateError(state, message));
        }
    }

    var directiveHandlers = {

        YAML: function handleYamlDirective(state, name, args) {

            var match, major, minor;

            if (state.version !== null) {
                throwError(state, 'duplication of %YAML directive');
            }

            if (args.length !== 1) {
                throwError(state, 'YAML directive accepts exactly one argument');
            }

            match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

            if (match === null) {
                throwError(state, 'ill-formed argument of the YAML directive');
            }

            major = parseInt(match[1], 10);
            minor = parseInt(match[2], 10);

            if (major !== 1) {
                throwError(state, 'unacceptable YAML version of the document');
            }

            state.version = args[0];
            state.checkLineBreaks = (minor < 2);

            if (minor !== 1 && minor !== 2) {
                throwWarning(state, 'unsupported YAML version of the document');
            }
        },

        TAG: function handleTagDirective(state, name, args) {

            var handle, prefix;

            if (args.length !== 2) {
                throwError(state, 'TAG directive accepts exactly two arguments');
            }

            handle = args[0];
            prefix = args[1];

            if (!PATTERN_TAG_HANDLE.test(handle)) {
                throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
            }

            if (_hasOwnProperty.call(state.tagMap, handle)) {
                throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
            }

            if (!PATTERN_TAG_URI.test(prefix)) {
                throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
            }

            state.tagMap[handle] = prefix;
        }
    };

    function captureSegment(state, start, end, checkJson) {
        var _position, _length, _character, _result;

        if (start < end) {
            _result = state.input.slice(start, end);

            if (checkJson) {
                for (_position = 0,
                _length = _result.length; _position < _length; _position += 1) {
                    _character = _result.charCodeAt(_position);
                    if (!(_character === 0x09 || (0x20 <= _character && _character <= 0x10FFFF))) {
                        throwError(state, 'expected valid JSON character');
                    }
                }
            } else if (PATTERN_NON_PRINTABLE.test(_result)) {
                throwError(state, 'the stream contains non-printable characters');
            }

            state.result += _result;
        }
    }

    function mergeMappings(state, destination, source, overridableKeys) {
        var sourceKeys, key, index, quantity;

        if (!common.isObject(source)) {
            throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
        }

        sourceKeys = Object.keys(source);

        for (index = 0,
        quantity = sourceKeys.length; index < quantity; index += 1) {
            key = sourceKeys[index];

            if (!_hasOwnProperty.call(destination, key)) {
                destination[key] = source[key];
                overridableKeys[key] = true;
            }
        }
    }

    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode) {
        var index, quantity;

        keyNode = String(keyNode);

        if (_result === null) {
            _result = {};
        }

        if (keyTag === 'tag:yaml.org,2002:merge') {
            if (Array.isArray(valueNode)) {
                for (index = 0,
                quantity = valueNode.length; index < quantity; index += 1) {
                    mergeMappings(state, _result, valueNode[index], overridableKeys);
                }
            } else {
                mergeMappings(state, _result, valueNode, overridableKeys);
            }
        } else {
            if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
                throwError(state, 'duplicated mapping key');
            }
            _result[keyNode] = valueNode;
            delete overridableKeys[keyNode];
        }

        return _result;
    }

    function readLineBreak(state) {
        var ch;

        ch = state.input.charCodeAt(state.position);

        if (ch === 0x0A /* LF */
        ) {
            state.position++;
        } else if (ch === 0x0D /* CR */
        ) {
            state.position++;
            if (state.input.charCodeAt(state.position) === 0x0A /* LF */
            ) {
                state.position++;
            }
        } else {
            throwError(state, 'a line break is expected');
        }

        state.line += 1;
        state.lineStart = state.position;
    }

    function skipSeparationSpace(state, allowComments, checkIndent) {
        var lineBreaks = 0
          , ch = state.input.charCodeAt(state.position);

        while (ch !== 0) {
            while (is_WHITE_SPACE(ch)) {
                ch = state.input.charCodeAt(++state.position);
            }

            if (allowComments && ch === 0x23/* # */
            ) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                } while (ch !== 0x0A /* LF */
                && ch !== 0x0D /* CR */
                && ch !== 0);
            }

            if (is_EOL(ch)) {
                readLineBreak(state);

                ch = state.input.charCodeAt(state.position);
                lineBreaks++;
                state.lineIndent = 0;

                while (ch === 0x20 /* Space */
                ) {
                    state.lineIndent++;
                    ch = state.input.charCodeAt(++state.position);
                }
            } else {
                break;
            }
        }

        if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
            throwWarning(state, 'deficient indentation');
        }

        return lineBreaks;
    }

    function testDocumentSeparator(state) {
        var _position = state.position, ch;

        ch = state.input.charCodeAt(_position);

        // Condition state.position === state.lineStart is tested
        // in parent on each call, for efficiency. No needs to test here again.
        if ((ch === 0x2D/* - */
        || ch === 0x2E/* . */
        ) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {

            _position += 3;

            ch = state.input.charCodeAt(_position);

            if (ch === 0 || is_WS_OR_EOL(ch)) {
                return true;
            }
        }

        return false;
    }

    function writeFoldedLines(state, count) {
        if (count === 1) {
            state.result += ' ';
        } else if (count > 1) {
            state.result += common.repeat('\n', count - 1);
        }
    }

    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
        var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;

        ch = state.input.charCodeAt(state.position);

        if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 0x23/* # */
        || ch === 0x26/* & */
        || ch === 0x2A/* * */
        || ch === 0x21/* ! */
        || ch === 0x7C/* | */
        || ch === 0x3E/* > */
        || ch === 0x27/* ' */
        || ch === 0x22/* " */
        || ch === 0x25/* % */
        || ch === 0x40/* @ */
        || ch === 0x60/* ` */
        ) {
            return false;
        }

        if (ch === 0x3F/* ? */
        || ch === 0x2D/* - */
        ) {
            following = state.input.charCodeAt(state.position + 1);

            if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
                return false;
            }
        }

        state.kind = 'scalar';
        state.result = '';
        captureStart = captureEnd = state.position;
        hasPendingContent = false;

        while (ch !== 0) {
            if (ch === 0x3A/* : */
            ) {
                following = state.input.charCodeAt(state.position + 1);

                if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
                    break;
                }

            } else if (ch === 0x23/* # */
            ) {
                preceding = state.input.charCodeAt(state.position - 1);

                if (is_WS_OR_EOL(preceding)) {
                    break;
                }

            } else if ((state.position === state.lineStart && testDocumentSeparator(state)) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
                break;

            } else if (is_EOL(ch)) {
                _line = state.line;
                _lineStart = state.lineStart;
                _lineIndent = state.lineIndent;
                skipSeparationSpace(state, false, -1);

                if (state.lineIndent >= nodeIndent) {
                    hasPendingContent = true;
                    ch = state.input.charCodeAt(state.position);
                    continue;
                } else {
                    state.position = captureEnd;
                    state.line = _line;
                    state.lineStart = _lineStart;
                    state.lineIndent = _lineIndent;
                    break;
                }
            }

            if (hasPendingContent) {
                captureSegment(state, captureStart, captureEnd, false);
                writeFoldedLines(state, state.line - _line);
                captureStart = captureEnd = state.position;
                hasPendingContent = false;
            }

            if (!is_WHITE_SPACE(ch)) {
                captureEnd = state.position + 1;
            }

            ch = state.input.charCodeAt(++state.position);
        }

        captureSegment(state, captureStart, captureEnd, false);

        if (state.result) {
            return true;
        }

        state.kind = _kind;
        state.result = _result;
        return false;
    }

    function readSingleQuotedScalar(state, nodeIndent) {
        var ch, captureStart, captureEnd;

        ch = state.input.charCodeAt(state.position);

        if (ch !== 0x27/* ' */
        ) {
            return false;
        }

        state.kind = 'scalar';
        state.result = '';
        state.position++;
        captureStart = captureEnd = state.position;

        while ((ch = state.input.charCodeAt(state.position)) !== 0) {
            if (ch === 0x27/* ' */
            ) {
                captureSegment(state, captureStart, state.position, true);
                ch = state.input.charCodeAt(++state.position);

                if (ch === 0x27/* ' */
                ) {
                    captureStart = state.position;
                    state.position++;
                    captureEnd = state.position;
                } else {
                    return true;
                }

            } else if (is_EOL(ch)) {
                captureSegment(state, captureStart, captureEnd, true);
                writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
                captureStart = captureEnd = state.position;

            } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
                throwError(state, 'unexpected end of the document within a single quoted scalar');

            } else {
                state.position++;
                captureEnd = state.position;
            }
        }

        throwError(state, 'unexpected end of the stream within a single quoted scalar');
    }

    function readDoubleQuotedScalar(state, nodeIndent) {
        var captureStart, captureEnd, hexLength, hexResult, tmp, ch;

        ch = state.input.charCodeAt(state.position);

        if (ch !== 0x22/* " */
        ) {
            return false;
        }

        state.kind = 'scalar';
        state.result = '';
        state.position++;
        captureStart = captureEnd = state.position;

        while ((ch = state.input.charCodeAt(state.position)) !== 0) {
            if (ch === 0x22/* " */
            ) {
                captureSegment(state, captureStart, state.position, true);
                state.position++;
                return true;

            } else if (ch === 0x5C/* \ */
            ) {
                captureSegment(state, captureStart, state.position, true);
                ch = state.input.charCodeAt(++state.position);

                if (is_EOL(ch)) {
                    skipSeparationSpace(state, false, nodeIndent);

                    // TODO: rework to inline fn with no type cast?
                } else if (ch < 256 && simpleEscapeCheck[ch]) {
                    state.result += simpleEscapeMap[ch];
                    state.position++;

                } else if ((tmp = escapedHexLen(ch)) > 0) {
                    hexLength = tmp;
                    hexResult = 0;

                    for (; hexLength > 0; hexLength--) {
                        ch = state.input.charCodeAt(++state.position);

                        if ((tmp = fromHexCode(ch)) >= 0) {
                            hexResult = (hexResult << 4) + tmp;

                        } else {
                            throwError(state, 'expected hexadecimal character');
                        }
                    }

                    state.result += charFromCodepoint(hexResult);

                    state.position++;

                } else {
                    throwError(state, 'unknown escape sequence');
                }

                captureStart = captureEnd = state.position;

            } else if (is_EOL(ch)) {
                captureSegment(state, captureStart, captureEnd, true);
                writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
                captureStart = captureEnd = state.position;

            } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
                throwError(state, 'unexpected end of the document within a double quoted scalar');

            } else {
                state.position++;
                captureEnd = state.position;
            }
        }

        throwError(state, 'unexpected end of the stream within a double quoted scalar');
    }

    function readFlowCollection(state, nodeIndent) {
        var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;

        ch = state.input.charCodeAt(state.position);

        if (ch === 0x5B/* [ */
        ) {
            terminator = 0x5D;
            /* ] */
            isMapping = false;
            _result = [];
        } else if (ch === 0x7B/* { */
        ) {
            terminator = 0x7D;
            /* } */
            isMapping = true;
            _result = {};
        } else {
            return false;
        }

        if (state.anchor !== null) {
            state.anchorMap[state.anchor] = _result;
        }

        ch = state.input.charCodeAt(++state.position);

        while (ch !== 0) {
            skipSeparationSpace(state, true, nodeIndent);

            ch = state.input.charCodeAt(state.position);

            if (ch === terminator) {
                state.position++;
                state.tag = _tag;
                state.anchor = _anchor;
                state.kind = isMapping ? 'mapping' : 'sequence';
                state.result = _result;
                return true;
            } else if (!readNext) {
                throwError(state, 'missed comma between flow collection entries');
            }

            keyTag = keyNode = valueNode = null;
            isPair = isExplicitPair = false;

            if (ch === 0x3F/* ? */
            ) {
                following = state.input.charCodeAt(state.position + 1);

                if (is_WS_OR_EOL(following)) {
                    isPair = isExplicitPair = true;
                    state.position++;
                    skipSeparationSpace(state, true, nodeIndent);
                }
            }

            _line = state.line;
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            keyTag = state.tag;
            keyNode = state.result;
            skipSeparationSpace(state, true, nodeIndent);

            ch = state.input.charCodeAt(state.position);

            if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */
            ) {
                isPair = true;
                ch = state.input.charCodeAt(++state.position);
                skipSeparationSpace(state, true, nodeIndent);
                composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
                valueNode = state.result;
            }

            if (isMapping) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
            } else if (isPair) {
                _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
            } else {
                _result.push(keyNode);
            }

            skipSeparationSpace(state, true, nodeIndent);

            ch = state.input.charCodeAt(state.position);

            if (ch === 0x2C/* , */
            ) {
                readNext = true;
                ch = state.input.charCodeAt(++state.position);
            } else {
                readNext = false;
            }
        }

        throwError(state, 'unexpected end of the stream within a flow collection');
    }

    function readBlockScalar(state, nodeIndent) {
        var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;

        ch = state.input.charCodeAt(state.position);

        if (ch === 0x7C/* | */
        ) {
            folding = false;
        } else if (ch === 0x3E/* > */
        ) {
            folding = true;
        } else {
            return false;
        }

        state.kind = 'scalar';
        state.result = '';

        while (ch !== 0) {
            ch = state.input.charCodeAt(++state.position);

            if (ch === 0x2B/* + */
            || ch === 0x2D/* - */
            ) {
                if (CHOMPING_CLIP === chomping) {
                    chomping = (ch === 0x2B/* + */
                    ) ? CHOMPING_KEEP : CHOMPING_STRIP;
                } else {
                    throwError(state, 'repeat of a chomping mode identifier');
                }

            } else if ((tmp = fromDecimalCode(ch)) >= 0) {
                if (tmp === 0) {
                    throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
                } else if (!detectedIndent) {
                    textIndent = nodeIndent + tmp - 1;
                    detectedIndent = true;
                } else {
                    throwError(state, 'repeat of an indentation width identifier');
                }

            } else {
                break;
            }
        }

        if (is_WHITE_SPACE(ch)) {
            do {
                ch = state.input.charCodeAt(++state.position);
            } while (is_WHITE_SPACE(ch));
            if (ch === 0x23/* # */
            ) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                } while (!is_EOL(ch) && (ch !== 0));
            }
        }

        while (ch !== 0) {
            readLineBreak(state);
            state.lineIndent = 0;

            ch = state.input.charCodeAt(state.position);

            while ((!detectedIndent || state.lineIndent < textIndent) && (ch === 0x20 /* Space */
            )) {
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }

            if (!detectedIndent && state.lineIndent > textIndent) {
                textIndent = state.lineIndent;
            }

            if (is_EOL(ch)) {
                emptyLines++;
                continue;
            }

            // End of the scalar.
            if (state.lineIndent < textIndent) {

                // Perform the chomping.
                if (chomping === CHOMPING_KEEP) {
                    state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
                } else if (chomping === CHOMPING_CLIP) {
                    if (didReadContent) {
                        // i.e. only if the scalar is not empty.
                        state.result += '\n';
                    }
                }

                // Break this `while` cycle and go to the funciton's epilogue.
                break;
            }

            // Folded style: use fancy rules to handle line breaks.
            if (folding) {

                // Lines starting with white space characters (more-indented lines) are not folded.
                if (is_WHITE_SPACE(ch)) {
                    atMoreIndented = true;
                    // except for the first content line (cf. Example 8.1)
                    state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

                    // End of more-indented block.
                } else if (atMoreIndented) {
                    atMoreIndented = false;
                    state.result += common.repeat('\n', emptyLines + 1);

                    // Just one line break - perceive as the same line.
                } else if (emptyLines === 0) {
                    if (didReadContent) {
                        // i.e. only if we have already read some scalar content.
                        state.result += ' ';
                    }

                    // Several line breaks - perceive as different lines.
                } else {
                    state.result += common.repeat('\n', emptyLines);
                }

                // Literal style: just add exact number of line breaks between content lines.
            } else {
                // Keep all line breaks except the header line break.
                state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
            }

            didReadContent = true;
            detectedIndent = true;
            emptyLines = 0;
            captureStart = state.position;

            while (!is_EOL(ch) && (ch !== 0)) {
                ch = state.input.charCodeAt(++state.position);
            }

            captureSegment(state, captureStart, state.position, false);
        }

        return true;
    }

    function readBlockSequence(state, nodeIndent) {
        var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;

        if (state.anchor !== null) {
            state.anchorMap[state.anchor] = _result;
        }

        ch = state.input.charCodeAt(state.position);

        while (ch !== 0) {

            if (ch !== 0x2D/* - */
            ) {
                break;
            }

            following = state.input.charCodeAt(state.position + 1);

            if (!is_WS_OR_EOL(following)) {
                break;
            }

            detected = true;
            state.position++;

            if (skipSeparationSpace(state, true, -1)) {
                if (state.lineIndent <= nodeIndent) {
                    _result.push(null);
                    ch = state.input.charCodeAt(state.position);
                    continue;
                }
            }

            _line = state.line;
            composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
            _result.push(state.result);
            skipSeparationSpace(state, true, -1);

            ch = state.input.charCodeAt(state.position);

            if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
                throwError(state, 'bad indentation of a sequence entry');
            } else if (state.lineIndent < nodeIndent) {
                break;
            }
        }

        if (detected) {
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = 'sequence';
            state.result = _result;
            return true;
        }
        return false;
    }

    function readBlockMapping(state, nodeIndent, flowIndent) {
        var following, allowCompact, _line, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;

        if (state.anchor !== null) {
            state.anchorMap[state.anchor] = _result;
        }

        ch = state.input.charCodeAt(state.position);

        while (ch !== 0) {
            following = state.input.charCodeAt(state.position + 1);
            _line = state.line;
            // Save the current line.

            //
            // Explicit notation case. There are two separate blocks:
            // first for the key (denoted by "?") and second for the value (denoted by ":")
            //
            if ((ch === 0x3F/* ? */
            || ch === 0x3A/* : */
            ) && is_WS_OR_EOL(following)) {

                if (ch === 0x3F/* ? */
                ) {
                    if (atExplicitKey) {
                        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                        keyTag = keyNode = valueNode = null;
                    }

                    detected = true;
                    atExplicitKey = true;
                    allowCompact = true;

                } else if (atExplicitKey) {
                    // i.e. 0x3A/* : */ === character after the explicit key.
                    atExplicitKey = false;
                    allowCompact = true;

                } else {
                    throwError(state, 'incomplete explicit mapping pair; a key node is missed');
                }

                state.position += 1;
                ch = following;

                //
                // Implicit notation case. Flow-style node as the key first, then ":", and the value.
                //
            } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {

                if (state.line === _line) {
                    ch = state.input.charCodeAt(state.position);

                    while (is_WHITE_SPACE(ch)) {
                        ch = state.input.charCodeAt(++state.position);
                    }

                    if (ch === 0x3A/* : */
                    ) {
                        ch = state.input.charCodeAt(++state.position);

                        if (!is_WS_OR_EOL(ch)) {
                            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
                        }

                        if (atExplicitKey) {
                            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                            keyTag = keyNode = valueNode = null;
                        }

                        detected = true;
                        atExplicitKey = false;
                        allowCompact = false;
                        keyTag = state.tag;
                        keyNode = state.result;

                    } else if (detected) {
                        throwError(state, 'can not read an implicit mapping pair; a colon is missed');

                    } else {
                        state.tag = _tag;
                        state.anchor = _anchor;
                        return true;
                        // Keep the result of `composeNode`.
                    }

                } else if (detected) {
                    throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

                } else {
                    state.tag = _tag;
                    state.anchor = _anchor;
                    return true;
                    // Keep the result of `composeNode`.
                }

            } else {
                break;
                // Reading is done. Go to the epilogue.
            }

            //
            // Common reading code for both explicit and implicit notations.
            //
            if (state.line === _line || state.lineIndent > nodeIndent) {
                if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
                    if (atExplicitKey) {
                        keyNode = state.result;
                    } else {
                        valueNode = state.result;
                    }
                }

                if (!atExplicitKey) {
                    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
                    keyTag = keyNode = valueNode = null;
                }

                skipSeparationSpace(state, true, -1);
                ch = state.input.charCodeAt(state.position);
            }

            if (state.lineIndent > nodeIndent && (ch !== 0)) {
                throwError(state, 'bad indentation of a mapping entry');
            } else if (state.lineIndent < nodeIndent) {
                break;
            }
        }

        //
        // Epilogue.
        //

        // Special case: last mapping's node contains only the key in explicit notation.
        if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
        }

        // Expose the resulting mapping.
        if (detected) {
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = 'mapping';
            state.result = _result;
        }

        return detected;
    }

    function readTagProperty(state) {
        var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;

        ch = state.input.charCodeAt(state.position);

        if (ch !== 0x21/* ! */
        ) {
            return false;
        }

        if (state.tag !== null) {
            throwError(state, 'duplication of a tag property');
        }

        ch = state.input.charCodeAt(++state.position);

        if (ch === 0x3C/* < */
        ) {
            isVerbatim = true;
            ch = state.input.charCodeAt(++state.position);

        } else if (ch === 0x21/* ! */
        ) {
            isNamed = true;
            tagHandle = '!!';
            ch = state.input.charCodeAt(++state.position);

        } else {
            tagHandle = '!';
        }

        _position = state.position;

        if (isVerbatim) {
            do {
                ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && ch !== 0x3E/* > */
            );
            if (state.position < state.length) {
                tagName = state.input.slice(_position, state.position);
                ch = state.input.charCodeAt(++state.position);
            } else {
                throwError(state, 'unexpected end of the stream within a verbatim tag');
            }
        } else {
            while (ch !== 0 && !is_WS_OR_EOL(ch)) {

                if (ch === 0x21/* ! */
                ) {
                    if (!isNamed) {
                        tagHandle = state.input.slice(_position - 1, state.position + 1);

                        if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                            throwError(state, 'named tag handle cannot contain such characters');
                        }

                        isNamed = true;
                        _position = state.position + 1;
                    } else {
                        throwError(state, 'tag suffix cannot contain exclamation marks');
                    }
                }

                ch = state.input.charCodeAt(++state.position);
            }

            tagName = state.input.slice(_position, state.position);

            if (PATTERN_FLOW_INDICATORS.test(tagName)) {
                throwError(state, 'tag suffix cannot contain flow indicator characters');
            }
        }

        if (tagName && !PATTERN_TAG_URI.test(tagName)) {
            throwError(state, 'tag name cannot contain such characters: ' + tagName);
        }

        if (isVerbatim) {
            state.tag = tagName;

        } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
            state.tag = state.tagMap[tagHandle] + tagName;

        } else if (tagHandle === '!') {
            state.tag = '!' + tagName;

        } else if (tagHandle === '!!') {
            state.tag = 'tag:yaml.org,2002:' + tagName;

        } else {
            throwError(state, 'undeclared tag handle "' + tagHandle + '"');
        }

        return true;
    }

    function readAnchorProperty(state) {
        var _position, ch;

        ch = state.input.charCodeAt(state.position);

        if (ch !== 0x26/* & */
        ) {
            return false;
        }

        if (state.anchor !== null) {
            throwError(state, 'duplication of an anchor property');
        }

        ch = state.input.charCodeAt(++state.position);
        _position = state.position;

        while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
            ch = state.input.charCodeAt(++state.position);
        }

        if (state.position === _position) {
            throwError(state, 'name of an anchor node must contain at least one character');
        }

        state.anchor = state.input.slice(_position, state.position);
        return true;
    }

    function readAlias(state) {
        var _position, alias, ch;

        ch = state.input.charCodeAt(state.position);

        if (ch !== 0x2A/* * */
        ) {
            return false;
        }

        ch = state.input.charCodeAt(++state.position);
        _position = state.position;

        while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
            ch = state.input.charCodeAt(++state.position);
        }

        if (state.position === _position) {
            throwError(state, 'name of an alias node must contain at least one character');
        }

        alias = state.input.slice(_position, state.position);

        if (!state.anchorMap.hasOwnProperty(alias)) {
            throwError(state, 'unidentified alias "' + alias + '"');
        }

        state.result = state.anchorMap[alias];
        skipSeparationSpace(state, true, -1);
        return true;
    }

    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
        var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
        atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;

        if (state.listener !== null) {
            state.listener('open', state);
        }

        state.tag = null;
        state.anchor = null;
        state.kind = null;
        state.result = null;

        allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;

        if (allowToSeek) {
            if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;

                if (state.lineIndent > parentIndent) {
                    indentStatus = 1;
                } else if (state.lineIndent === parentIndent) {
                    indentStatus = 0;
                } else if (state.lineIndent < parentIndent) {
                    indentStatus = -1;
                }
            }
        }

        if (indentStatus === 1) {
            while (readTagProperty(state) || readAnchorProperty(state)) {
                if (skipSeparationSpace(state, true, -1)) {
                    atNewLine = true;
                    allowBlockCollections = allowBlockStyles;

                    if (state.lineIndent > parentIndent) {
                        indentStatus = 1;
                    } else if (state.lineIndent === parentIndent) {
                        indentStatus = 0;
                    } else if (state.lineIndent < parentIndent) {
                        indentStatus = -1;
                    }
                } else {
                    allowBlockCollections = false;
                }
            }
        }

        if (allowBlockCollections) {
            allowBlockCollections = atNewLine || allowCompact;
        }

        if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
            if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
                flowIndent = parentIndent;
            } else {
                flowIndent = parentIndent + 1;
            }

            blockIndent = state.position - state.lineStart;

            if (indentStatus === 1) {
                if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
                    hasContent = true;
                } else {
                    if ((allowBlockScalars && readBlockScalar(state, flowIndent)) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                        hasContent = true;

                    } else if (readAlias(state)) {
                        hasContent = true;

                        if (state.tag !== null || state.anchor !== null) {
                            throwError(state, 'alias node should not have any properties');
                        }

                    } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                        hasContent = true;

                        if (state.tag === null) {
                            state.tag = '?';
                        }
                    }

                    if (state.anchor !== null) {
                        state.anchorMap[state.anchor] = state.result;
                    }
                }
            } else if (indentStatus === 0) {
                // Special case: block sequences are allowed to have same indentation level as the parent.
                // http://www.yaml.org/spec/1.2/spec.html#id2799784
                hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
            }
        }

        if (state.tag !== null && state.tag !== '!') {
            if (state.tag === '?') {
                for (typeIndex = 0,
                typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
                    type = state.implicitTypes[typeIndex];

                    // Implicit resolving is not allowed for non-scalar types, and '?'
                    // non-specific tag is only assigned to plain scalars. So, it isn't
                    // needed to check for 'kind' conformity.

                    if (type.resolve(state.result)) {
                        // `state.result` updated in resolver if matched
                        state.result = type.construct(state.result);
                        state.tag = type.tag;
                        if (state.anchor !== null) {
                            state.anchorMap[state.anchor] = state.result;
                        }
                        break;
                    }
                }
            } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
                type = state.typeMap[state.kind || 'fallback'][state.tag];

                if (state.result !== null && type.kind !== state.kind) {
                    throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
                }

                if (!type.resolve(state.result)) {
                    // `state.result` updated in resolver if matched
                    throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
                } else {
                    state.result = type.construct(state.result);
                    if (state.anchor !== null) {
                        state.anchorMap[state.anchor] = state.result;
                    }
                }
            } else {
                throwError(state, 'unknown tag !<' + state.tag + '>');
            }
        }

        if (state.listener !== null) {
            state.listener('close', state);
        }
        return state.tag !== null || state.anchor !== null || hasContent;
    }

    function readDocument(state) {
        var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;

        state.version = null;
        state.checkLineBreaks = state.legacy;
        state.tagMap = {};
        state.anchorMap = {};

        while ((ch = state.input.charCodeAt(state.position)) !== 0) {
            skipSeparationSpace(state, true, -1);

            ch = state.input.charCodeAt(state.position);

            if (state.lineIndent > 0 || ch !== 0x25/* % */
            ) {
                break;
            }

            hasDirectives = true;
            ch = state.input.charCodeAt(++state.position);
            _position = state.position;

            while (ch !== 0 && !is_WS_OR_EOL(ch)) {
                ch = state.input.charCodeAt(++state.position);
            }

            directiveName = state.input.slice(_position, state.position);
            directiveArgs = [];

            if (directiveName.length < 1) {
                throwError(state, 'directive name must not be less than one character in length');
            }

            while (ch !== 0) {
                while (is_WHITE_SPACE(ch)) {
                    ch = state.input.charCodeAt(++state.position);
                }

                if (ch === 0x23/* # */
                ) {
                    do {
                        ch = state.input.charCodeAt(++state.position);
                    } while (ch !== 0 && !is_EOL(ch));break;
                }

                if (is_EOL(ch)) {
                    break;
                }

                _position = state.position;

                while (ch !== 0 && !is_WS_OR_EOL(ch)) {
                    ch = state.input.charCodeAt(++state.position);
                }

                directiveArgs.push(state.input.slice(_position, state.position));
            }

            if (ch !== 0) {
                readLineBreak(state);
            }

            if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
                directiveHandlers[directiveName](state, directiveName, directiveArgs);
            } else {
                throwWarning(state, 'unknown document directive "' + directiveName + '"');
            }
        }

        skipSeparationSpace(state, true, -1);

        if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D/* - */
        && state.input.charCodeAt(state.position + 1) === 0x2D/* - */
        && state.input.charCodeAt(state.position + 2) === 0x2D/* - */
        ) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);

        } else if (hasDirectives) {
            throwError(state, 'directives end mark is expected');
        }

        composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
        skipSeparationSpace(state, true, -1);

        if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
            throwWarning(state, 'non-ASCII line breaks are interpreted as content');
        }

        state.documents.push(state.result);

        if (state.position === state.lineStart && testDocumentSeparator(state)) {

            if (state.input.charCodeAt(state.position) === 0x2E/* . */
            ) {
                state.position += 3;
                skipSeparationSpace(state, true, -1);
            }
            return;
        }

        if (state.position < (state.length - 1)) {
            throwError(state, 'end of the stream or a document separator is expected');
        } else {
            return;
        }
    }

    function loadDocuments(input, options) {
        input = String(input);
        options = options || {};

        if (input.length !== 0) {

            // Add tailing `\n` if not exists
            if (input.charCodeAt(input.length - 1) !== 0x0A /* LF */
            && input.charCodeAt(input.length - 1) !== 0x0D /* CR */
            ) {
                input += '\n';
            }

            // Strip BOM
            if (input.charCodeAt(0) === 0xFEFF) {
                input = input.slice(1);
            }
        }

        var state = new State(input,options);

        // Use 0 as string terminator. That significantly simplifies bounds check.
        state.input += '\0';

        while (state.input.charCodeAt(state.position) === 0x20 /* Space */
        ) {
            state.lineIndent += 1;
            state.position += 1;
        }

        while (state.position < (state.length - 1)) {
            readDocument(state);
        }

        return state.documents;
    }

    function loadAll$1(input, iterator, options) {
        var documents = loadDocuments(input, options), index, length;

        for (index = 0,
        length = documents.length; index < length; index += 1) {
            iterator(documents[index]);
        }
    }

    function load$1(input, options) {
        var documents = loadDocuments(input, options);

        if (documents.length === 0) {
            /*eslint-disable no-undefined*/
            return undefined;
        } else if (documents.length === 1) {
            return documents[0];
        }
        throw new YAMLException$1('expected a single document in the stream, but found more');
    }

    function safeLoadAll$1(input, output, options) {
        loadAll$1(input, output, common.extend({
            schema: DEFAULT_SAFE_SCHEMA$1
        }, options));
    }

    function safeLoad$1(input, options) {
        return load$1(input, common.extend({
            schema: DEFAULT_SAFE_SCHEMA$1
        }, options));
    }

    var loadAll_1 = loadAll$1;
    var load_1 = load$1;
    var safeLoadAll_1 = safeLoadAll$1;
    var safeLoad_1 = safeLoad$1;

    var loader$1 = {
        loadAll: loadAll_1,
        load: load_1,
        safeLoadAll: safeLoadAll_1,
        safeLoad: safeLoad_1
    };

    /*eslint-disable no-use-before-define*/

    var common$7 = common$1;
    var YAMLException$5 = exception;
    var DEFAULT_FULL_SCHEMA$2 = default_full;
    var DEFAULT_SAFE_SCHEMA$2 = default_safe;

    var _toString$2 = Object.prototype.toString;
    var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;

    var CHAR_TAB = 0x09;
    /* Tab */
    var CHAR_LINE_FEED = 0x0A;
    /* LF */
    var CHAR_SPACE = 0x20;
    /* Space */
    var CHAR_EXCLAMATION = 0x21;
    /* ! */
    var CHAR_DOUBLE_QUOTE = 0x22;
    /* " */
    var CHAR_SHARP = 0x23;
    /* # */
    var CHAR_PERCENT = 0x25;
    /* % */
    var CHAR_AMPERSAND = 0x26;
    /* & */
    var CHAR_SINGLE_QUOTE = 0x27;
    /* ' */
    var CHAR_ASTERISK = 0x2A;
    /* * */
    var CHAR_COMMA = 0x2C;
    /* , */
    var CHAR_MINUS = 0x2D;
    /* - */
    var CHAR_COLON = 0x3A;
    /* : */
    var CHAR_GREATER_THAN = 0x3E;
    /* > */
    var CHAR_QUESTION = 0x3F;
    /* ? */
    var CHAR_COMMERCIAL_AT = 0x40;
    /* @ */
    var CHAR_LEFT_SQUARE_BRACKET = 0x5B;
    /* [ */
    var CHAR_RIGHT_SQUARE_BRACKET = 0x5D;
    /* ] */
    var CHAR_GRAVE_ACCENT = 0x60;
    /* ` */
    var CHAR_LEFT_CURLY_BRACKET = 0x7B;
    /* { */
    var CHAR_VERTICAL_LINE = 0x7C;
    /* | */
    var CHAR_RIGHT_CURLY_BRACKET = 0x7D;
    /* } */

    var ESCAPE_SEQUENCES = {};

    ESCAPE_SEQUENCES[0x00] = '\\0';
    ESCAPE_SEQUENCES[0x07] = '\\a';
    ESCAPE_SEQUENCES[0x08] = '\\b';
    ESCAPE_SEQUENCES[0x09] = '\\t';
    ESCAPE_SEQUENCES[0x0A] = '\\n';
    ESCAPE_SEQUENCES[0x0B] = '\\v';
    ESCAPE_SEQUENCES[0x0C] = '\\f';
    ESCAPE_SEQUENCES[0x0D] = '\\r';
    ESCAPE_SEQUENCES[0x1B] = '\\e';
    ESCAPE_SEQUENCES[0x22] = '\\"';
    ESCAPE_SEQUENCES[0x5C] = '\\\\';
    ESCAPE_SEQUENCES[0x85] = '\\N';
    ESCAPE_SEQUENCES[0xA0] = '\\_';
    ESCAPE_SEQUENCES[0x2028] = '\\L';
    ESCAPE_SEQUENCES[0x2029] = '\\P';

    var DEPRECATED_BOOLEANS_SYNTAX = ['y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON', 'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'];

    function compileStyleMap(schema, map) {
        var result, keys, index, length, tag, style, type;

        if (map === null) {
            return {};
        }

        result = {};
        keys = Object.keys(map);

        for (index = 0,
        length = keys.length; index < length; index += 1) {
            tag = keys[index];
            style = String(map[tag]);

            if (tag.slice(0, 2) === '!!') {
                tag = 'tag:yaml.org,2002:' + tag.slice(2);
            }
            type = schema.compiledTypeMap['fallback'][tag];

            if (type && _hasOwnProperty$3.call(type.styleAliases, style)) {
                style = type.styleAliases[style];
            }

            result[tag] = style;
        }

        return result;
    }

    function encodeHex(character) {
        var string, handle, length;

        string = character.toString(16).toUpperCase();

        if (character <= 0xFF) {
            handle = 'x';
            length = 2;
        } else if (character <= 0xFFFF) {
            handle = 'u';
            length = 4;
        } else if (character <= 0xFFFFFFFF) {
            handle = 'U';
            length = 8;
        } else {
            throw new YAMLException$5('code point within a string may not be greater than 0xFFFFFFFF');
        }

        return '\\' + handle + common$7.repeat('0', length - string.length) + string;
    }

    function State$1(options) {
        this.schema = options['schema'] || DEFAULT_FULL_SCHEMA$2;
        this.indent = Math.max(1, (options['indent'] || 2));
        this.skipInvalid = options['skipInvalid'] || false;
        this.flowLevel = (common$7.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
        this.styleMap = compileStyleMap(this.schema, options['styles'] || null);
        this.sortKeys = options['sortKeys'] || false;
        this.lineWidth = options['lineWidth'] || 80;
        this.noRefs = options['noRefs'] || false;
        this.noCompatMode = options['noCompatMode'] || false;

        this.implicitTypes = this.schema.compiledImplicit;
        this.explicitTypes = this.schema.compiledExplicit;

        this.tag = null;
        this.result = '';

        this.duplicates = [];
        this.usedDuplicates = null;
    }

    // Indents every line in a string. Empty lines (\n only) are not indented.
    function indentString(string, spaces) {
        var ind = common$7.repeat(' ', spaces), position = 0, next = -1, result = '', line, length = string.length;

        while (position < length) {
            next = string.indexOf('\n', position);
            if (next === -1) {
                line = string.slice(position);
                position = length;
            } else {
                line = string.slice(position, next + 1);
                position = next + 1;
            }

            if (line.length && line !== '\n') {
                result += ind;
            }

            result += line;
        }

        return result;
    }

    function generateNextLine(state, level) {
        return '\n' + common$7.repeat(' ', state.indent * level);
    }

    function testImplicitResolving(state, str) {
        var index, length, type;

        for (index = 0,
        length = state.implicitTypes.length; index < length; index += 1) {
            type = state.implicitTypes[index];

            if (type.resolve(str)) {
                return true;
            }
        }

        return false;
    }

    // [33] s-white ::= s-space | s-tab
    function isWhitespace(c) {
        return c === CHAR_SPACE || c === CHAR_TAB;
    }

    // Returns true if the character can be printed without escaping.
    // From YAML 1.2: "any allowed characters known to be non-printable
    // should also be escaped. [However,] This isn’t mandatory"
    // Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
    function isPrintable(c) {
        return (0x00020 <= c && c <= 0x00007E) || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029) || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */
        ) || (0x10000 <= c && c <= 0x10FFFF);
    }

    // Simplified test for values allowed after the first character in plain style.
    function isPlainSafe(c) {
        // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
        // where nb-char ::= c-printable - b-char - c-byte-order-mark.
        return isPrintable(c) && c !== 0xFEFF // - c-flow-indicator
        && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET// - ":" - "#"
        && c !== CHAR_COLON && c !== CHAR_SHARP;
    }

    // Simplified test for values allowed as the first character in plain style.
    function isPlainSafeFirst(c) {
        // Uses a subset of ns-char - c-indicator
        // where ns-char = nb-char - s-white.
        return isPrintable(c) && c !== 0xFEFF && !isWhitespace(c)// - s-white
        // - (c-indicator ::=
        // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
        && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET// | “#” | “&” | “*” | “!” | “|” | “>” | “'” | “"”
        && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE// | “%” | “@” | “`”)
        && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }

    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;

    // Determines which scalar styles are possible and returns the preferred style.
    // lineWidth = -1 => no limit.
    // Pre-conditions: str.length > 0.
    // Post-conditions:
    //    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
    //    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
    //    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
        var i;
        var char;
        var hasLineBreak = false;
        var hasFoldableLine = false;
        // only checked if shouldTrackWidth
        var shouldTrackWidth = lineWidth !== -1;
        var previousLineBreak = -1;
        // count the first line correctly
        var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));

        if (singleLineOnly) {
            // Case: no block styles.
            // Check for disallowed characters to rule out plain and single.
            for (i = 0; i < string.length; i++) {
                char = string.charCodeAt(i);
                if (!isPrintable(char)) {
                    return STYLE_DOUBLE;
                }
                plain = plain && isPlainSafe(char);
            }
        } else {
            // Case: block styles permitted.
            for (i = 0; i < string.length; i++) {
                char = string.charCodeAt(i);
                if (char === CHAR_LINE_FEED) {
                    hasLineBreak = true;
                    // Check if any line can be folded.
                    if (shouldTrackWidth) {
                        hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
                        (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' ');
                        previousLineBreak = i;
                    }
                } else if (!isPrintable(char)) {
                    return STYLE_DOUBLE;
                }
                plain = plain && isPlainSafe(char);
            }
            // in case the end is missing a \n
            hasFoldableLine = hasFoldableLine || (shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' '));
        }
        // Although every style can represent \n without escaping, prefer block styles
        // for multiline, since they're more readable and they don't add empty lines.
        // Also prefer folding a super-long line.
        if (!hasLineBreak && !hasFoldableLine) {
            // Strings interpretable as another type have to be quoted;
            // e.g. the string 'true' vs. the boolean true.
            return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
        }
        // Edge case: block indentation indicator can only have one digit.
        if (string[0] === ' ' && indentPerLevel > 9) {
            return STYLE_DOUBLE;
        }
        // At this point we know block styles are valid.
        // Prefer literal style unless we want to fold.
        return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }

    // Note: line breaking/folding is implemented for only the folded style.
    // NB. We drop the last trailing newline (if any) of a returned block scalar
    //  since the dumper adds its own newline. This always works:
    //    • No ending newline => unaffected; already using strip "-" chomping.
    //    • Ending newline    => removed then restored.
    //  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
    function writeScalar(state, string, level, iskey) {
        state.dump = (function() {
            if (string.length === 0) {
                return "''";
            }
            if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
                return "'" + string + "'";
            }

            var indent = state.indent * Math.max(1, level);
            // no 0-indent scalars
            // As indentation gets deeper, let the width decrease monotonically
            // to the lower bound min(state.lineWidth, 40).
            // Note that this implies
            //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
            //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
            // This behaves better than a constant minimum width which disallows narrower options,
            // or an indent threshold which causes the width to suddenly increase.
            var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

            // Without knowing if keys are implicit/explicit, assume implicit for safety.
            var singleLineOnly = iskey // No block styles in flow mode.
            || (state.flowLevel > -1 && level >= state.flowLevel);
            function testAmbiguity(string) {
                return testImplicitResolving(state, string);
            }

            switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
            case STYLE_PLAIN:
                return string;
            case STYLE_SINGLE:
                return "'" + string.replace(/'/g, "''") + "'";
            case STYLE_LITERAL:
                return '|' + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
            case STYLE_FOLDED:
                return '>' + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
            case STYLE_DOUBLE:
                return '"' + escapeString(string, lineWidth) + '"';
            default:
                throw new YAMLException$5('impossible error: invalid scalar style');
            }
        }());
    }

    // Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
    function blockHeader(string, indentPerLevel) {
        var indentIndicator = (string[0] === ' ') ? String(indentPerLevel) : '';

        // note the special case: the string '\n' counts as a "trailing" empty line.
        var clip = string[string.length - 1] === '\n';
        var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
        var chomp = keep ? '+' : (clip ? '' : '-');

        return indentIndicator + chomp + '\n';
    }

    // (See the note for writeScalar.)
    function dropEndingNewline(string) {
        return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
    }

    // Note: a long line without a suitable break point will exceed the width limit.
    // Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
    function foldString(string, width) {
        // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
        // unless they're before or after a more-indented line, or at the very
        // beginning or end, in which case $k$ maps to $k$.
        // Therefore, parse each chunk as newline(s) followed by a content line.
        var lineRe = /(\n+)([^\n]*)/g;

        // first line (possibly an empty line)
        var result = (function() {
            var nextLF = string.indexOf('\n');
            nextLF = nextLF !== -1 ? nextLF : string.length;
            lineRe.lastIndex = nextLF;
            return foldLine(string.slice(0, nextLF), width);
        }());
        // If we haven't reached the first content line yet, don't add an extra \n.
        var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
        var moreIndented;

        // rest of the lines
        var match;
        while ((match = lineRe.exec(string))) {
            var prefix = match[1]
              , line = match[2];
            moreIndented = (line[0] === ' ');
            result += prefix + (!prevMoreIndented && !moreIndented && line !== '' ? '\n' : '') + foldLine(line, width);
            prevMoreIndented = moreIndented;
        }

        return result;
    }

    // Greedy line breaking.
    // Picks the longest line under the limit each time,
    // otherwise settles for the shortest line over the limit.
    // NB. More-indented lines *cannot* be folded, as that would add an extra \n.
    function foldLine(line, width) {
        if (line === '' || line[0] === ' ') {
            return line;
        }

        // Since a more-indented line adds a \n, breaks can't be followed by a space.
        var breakRe = / [^ ]/g;
        // note: the match index will always be <= length-2.
        var match;
        // start is an inclusive index. end, curr, and next are exclusive.
        var start = 0, end, curr = 0, next = 0;
        var result = '';

        // Invariants: 0 <= start <= length-1.
        //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
        // Inside the loop:
        //   A match implies length >= 2, so curr and next are <= length-2.
        while ((match = breakRe.exec(line))) {
            next = match.index;
            // maintain invariant: curr - start <= width
            if (next - start > width) {
                end = (curr > start) ? curr : next;
                // derive end <= length-2
                result += '\n' + line.slice(start, end);
                // skip the space that was output as \n
                start = end + 1;
                // derive start <= length-1
            }
            curr = next;
        }

        // By the invariants, start <= length-1, so there is something left over.
        // It is either the whole string or a part starting from non-whitespace.
        result += '\n';
        // Insert a break if the remainder is too long and there is a break available.
        if (line.length - start > width && curr > start) {
            result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
        } else {
            result += line.slice(start);
        }

        return result.slice(1);
        // drop extra \n joiner
    }

    // Escapes a double-quoted string.
    function escapeString(string) {
        var result = '';
        var char;
        var escapeSeq;

        for (var i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            escapeSeq = ESCAPE_SEQUENCES[char];
            result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
        }

        return result;
    }

    function writeFlowSequence(state, level, object) {
        var _result = '', _tag = state.tag, index, length;

        for (index = 0,
        length = object.length; index < length; index += 1) {
            // Write only valid elements.
            if (writeNode(state, level, object[index], false, false)) {
                if (index !== 0) {
                    _result += ', ';
                }
                _result += state.dump;
            }
        }

        state.tag = _tag;
        state.dump = '[' + _result + ']';
    }

    function writeBlockSequence(state, level, object, compact) {
        var _result = '', _tag = state.tag, index, length;

        for (index = 0,
        length = object.length; index < length; index += 1) {
            // Write only valid elements.
            if (writeNode(state, level + 1, object[index], true, true)) {
                if (!compact || index !== 0) {
                    _result += generateNextLine(state, level);
                }
                _result += '- ' + state.dump;
            }
        }

        state.tag = _tag;
        state.dump = _result || '[]';
        // Empty sequence if no valid values.
    }

    function writeFlowMapping(state, level, object) {
        var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;

        for (index = 0,
        length = objectKeyList.length; index < length; index += 1) {
            pairBuffer = '';

            if (index !== 0) {
                pairBuffer += ', ';
            }

            objectKey = objectKeyList[index];
            objectValue = object[objectKey];

            if (!writeNode(state, level, objectKey, false, false)) {
                continue;
                // Skip this pair because of invalid key;
            }

            if (state.dump.length > 1024) {
                pairBuffer += '? ';
            }

            pairBuffer += state.dump + ': ';

            if (!writeNode(state, level, objectValue, false, false)) {
                continue;
                // Skip this pair because of invalid value.
            }

            pairBuffer += state.dump;

            // Both key and value are valid.
            _result += pairBuffer;
        }

        state.tag = _tag;
        state.dump = '{' + _result + '}';
    }

    function writeBlockMapping(state, level, object, compact) {
        var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;

        // Allow sorting keys so that the output file is deterministic
        if (state.sortKeys === true) {
            // Default sorting
            objectKeyList.sort();
        } else if (typeof state.sortKeys === 'function') {
            // Custom sort function
            objectKeyList.sort(state.sortKeys);
        } else if (state.sortKeys) {
            // Something is wrong
            throw new YAMLException$5('sortKeys must be a boolean or a function');
        }

        for (index = 0,
        length = objectKeyList.length; index < length; index += 1) {
            pairBuffer = '';

            if (!compact || index !== 0) {
                pairBuffer += generateNextLine(state, level);
            }

            objectKey = objectKeyList[index];
            objectValue = object[objectKey];

            if (!writeNode(state, level + 1, objectKey, true, true, true)) {
                continue;
                // Skip this pair because of invalid key.
            }

            explicitPair = (state.tag !== null && state.tag !== '?') || (state.dump && state.dump.length > 1024);

            if (explicitPair) {
                if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                    pairBuffer += '?';
                } else {
                    pairBuffer += '? ';
                }
            }

            pairBuffer += state.dump;

            if (explicitPair) {
                pairBuffer += generateNextLine(state, level);
            }

            if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
                continue;
                // Skip this pair because of invalid value.
            }

            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                pairBuffer += ':';
            } else {
                pairBuffer += ': ';
            }

            pairBuffer += state.dump;

            // Both key and value are valid.
            _result += pairBuffer;
        }

        state.tag = _tag;
        state.dump = _result || '{}';
        // Empty mapping if no valid pairs.
    }

    function detectType(state, object, explicit) {
        var _result, typeList, index, length, type, style;

        typeList = explicit ? state.explicitTypes : state.implicitTypes;

        for (index = 0,
        length = typeList.length; index < length; index += 1) {
            type = typeList[index];

            if ((type.instanceOf || type.predicate) && (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) && (!type.predicate || type.predicate(object))) {

                state.tag = explicit ? type.tag : '?';

                if (type.represent) {
                    style = state.styleMap[type.tag] || type.defaultStyle;

                    if (_toString$2.call(type.represent) === '[object Function]') {
                        _result = type.represent(object, style);
                    } else if (_hasOwnProperty$3.call(type.represent, style)) {
                        _result = type.represent[style](object, style);
                    } else {
                        throw new YAMLException$5('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
                    }

                    state.dump = _result;
                }

                return true;
            }
        }

        return false;
    }

    // Serializes `object` and writes it to global `result`.
    // Returns true on success, or false on invalid object.
    //
    function writeNode(state, level, object, block, compact, iskey) {
        state.tag = null;
        state.dump = object;

        if (!detectType(state, object, false)) {
            detectType(state, object, true);
        }

        var type = _toString$2.call(state.dump);

        if (block) {
            block = (state.flowLevel < 0 || state.flowLevel > level);
        }

        var objectOrArray = type === '[object Object]' || type === '[object Array]', duplicateIndex, duplicate;

        if (objectOrArray) {
            duplicateIndex = state.duplicates.indexOf(object);
            duplicate = duplicateIndex !== -1;
        }

        if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
            compact = false;
        }

        if (duplicate && state.usedDuplicates[duplicateIndex]) {
            state.dump = '*ref_' + duplicateIndex;
        } else {
            if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
                state.usedDuplicates[duplicateIndex] = true;
            }
            if (type === '[object Object]') {
                if (block && (Object.keys(state.dump).length !== 0)) {
                    writeBlockMapping(state, level, state.dump, compact);
                    if (duplicate) {
                        state.dump = '&ref_' + duplicateIndex + state.dump;
                    }
                } else {
                    writeFlowMapping(state, level, state.dump);
                    if (duplicate) {
                        state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                    }
                }
            } else if (type === '[object Array]') {
                if (block && (state.dump.length !== 0)) {
                    writeBlockSequence(state, level, state.dump, compact);
                    if (duplicate) {
                        state.dump = '&ref_' + duplicateIndex + state.dump;
                    }
                } else {
                    writeFlowSequence(state, level, state.dump);
                    if (duplicate) {
                        state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                    }
                }
            } else if (type === '[object String]') {
                if (state.tag !== '?') {
                    writeScalar(state, state.dump, level, iskey);
                }
            } else {
                if (state.skipInvalid) {
                    return false;
                }
                throw new YAMLException$5('unacceptable kind of an object to dump ' + type);
            }

            if (state.tag !== null && state.tag !== '?') {
                state.dump = '!<' + state.tag + '> ' + state.dump;
            }
        }

        return true;
    }

    function getDuplicateReferences(object, state) {
        var objects = [], duplicatesIndexes = [], index, length;

        inspectNode(object, objects, duplicatesIndexes);

        for (index = 0,
        length = duplicatesIndexes.length; index < length; index += 1) {
            state.duplicates.push(objects[duplicatesIndexes[index]]);
        }
        state.usedDuplicates = new Array(length);
    }

    function inspectNode(object, objects, duplicatesIndexes) {
        var objectKeyList, index, length;

        if (object !== null && typeof object === 'object') {
            index = objects.indexOf(object);
            if (index !== -1) {
                if (duplicatesIndexes.indexOf(index) === -1) {
                    duplicatesIndexes.push(index);
                }
            } else {
                objects.push(object);

                if (Array.isArray(object)) {
                    for (index = 0,
                    length = object.length; index < length; index += 1) {
                        inspectNode(object[index], objects, duplicatesIndexes);
                    }
                } else {
                    objectKeyList = Object.keys(object);

                    for (index = 0,
                    length = objectKeyList.length; index < length; index += 1) {
                        inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
                    }
                }
            }
        }
    }

    function dump$1(input, options) {
        options = options || {};

        var state = new State$1(options);

        if (!state.noRefs) {
            getDuplicateReferences(input, state);
        }

        if (writeNode(state, 0, input, true, true)) {
            return state.dump + '\n';
        }

        return '';
    }

    function safeDump$1(input, options) {
        return dump$1(input, common$7.extend({
            schema: DEFAULT_SAFE_SCHEMA$2
        }, options));
    }

    var dump_1 = dump$1;
    var safeDump_1 = safeDump$1;

    var dumper$1 = {
        dump: dump_1,
        safeDump: safeDump_1
    };

    var loader = loader$1;
    var dumper = dumper$1;

    function deprecated(name) {
        return function() {
            throw new Error('Function ' + name + ' is deprecated and cannot be used.');
        }
        ;
    }

    var Type = type;
    var Schema = schema;
    var FAILSAFE_SCHEMA = failsafe;
    var JSON_SCHEMA = json;
    var CORE_SCHEMA = core;
    var DEFAULT_SAFE_SCHEMA = default_safe;
    var DEFAULT_FULL_SCHEMA = default_full;
    var load = loader.load;
    var loadAll = loader.loadAll;
    var safeLoad = loader.safeLoad;
    var safeLoadAll = loader.safeLoadAll;
    var dump = dumper.dump;
    var safeDump = dumper.safeDump;
    var YAMLException = exception;

    // Deprecated schema names from JS-YAML 2.0.x
    var MINIMAL_SCHEMA = failsafe;
    var SAFE_SCHEMA = default_safe;
    var DEFAULT_SCHEMA = default_full;

    // Deprecated functions from JS-YAML 1.x.x
    var scan$1 = deprecated('scan');
    var parse$1 = deprecated('parse');
    var compose = deprecated('compose');
    var addConstructor = deprecated('addConstructor');

    var jsYaml = {
        Type: Type,
        Schema: Schema,
        FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
        JSON_SCHEMA: JSON_SCHEMA,
        CORE_SCHEMA: CORE_SCHEMA,
        DEFAULT_SAFE_SCHEMA: DEFAULT_SAFE_SCHEMA,
        DEFAULT_FULL_SCHEMA: DEFAULT_FULL_SCHEMA,
        load: load,
        loadAll: loadAll,
        safeLoad: safeLoad,
        safeLoadAll: safeLoadAll,
        dump: dump,
        safeDump: safeDump,
        YAMLException: YAMLException,
        MINIMAL_SCHEMA: MINIMAL_SCHEMA,
        SAFE_SCHEMA: SAFE_SCHEMA,
        DEFAULT_SCHEMA: DEFAULT_SCHEMA,
        scan: scan$1,
        parse: parse$1,
        compose: compose,
        addConstructor: addConstructor
    };

    var yaml = jsYaml;

    var index = yaml;

    var frontMatter = function(dom, data) {
        var localData = {};
        var el = dom.querySelector('script[type="text/front-matter"]');
        if (el) {
            var text = el.textContent;
            localData = index.safeLoad(text);
        }

        data.title = localData.title ? localData.title : "Untitled";
        data.description = localData.description ? localData.description : "No description.";

        data.authors = localData.authors ? localData.authors : [];

        data.authors = data.authors.map(function(author, i) {
            var a = {};
            var name = Object.keys(author)[0];
            if ((typeof author) === "string") {
                name = author;
            } else {
                a.personalURL = author[name];
            }
            var names = name.split(" ");
            a.name = name;
            a.firstName = names.slice(0, names.length - 1).join(" ");
            a.lastName = names[names.length - 1];
            if (localData.affiliations[i]) {
                var affiliation = Object.keys(localData.affiliations[i])[0];
                if ((typeof localData.affiliations[i]) === "string") {
                    affiliation = localData.affiliations[i];
                } else {
                    a.affiliationURL = localData.affiliations[i][affiliation];
                }
                a.affiliation = affiliation;
            }
            return a;
        });

    };

    var bibtexParse = createCommonjsModule(function(module, exports) {
        /* start bibtexParse 0.0.22 */

        //Original work by Henrik Muehe (c) 2010
        //
        //CommonJS port by Mikola Lysenko 2013
        //
        //Port to Browser lib by ORCID / RCPETERS
        //
        //Issues:
        //no comment handling within strings
        //no string concatenation
        //no variable values yet
        //Grammar implemented here:
        //bibtex -> (string | preamble | comment | entry)*;
        //string -> '@STRING' '{' key_equals_value '}';
        //preamble -> '@PREAMBLE' '{' value '}';
        //comment -> '@COMMENT' '{' value '}';
        //entry -> '@' key '{' key ',' key_value_list '}';
        //key_value_list -> key_equals_value (',' key_equals_value)*;
        //key_equals_value -> key '=' value;
        //value -> value_quotes | value_braces | key;
        //value_quotes -> '"' .*? '"'; // not quite
        //value_braces -> '{' .*? '"'; // not quite
        (function(exports) {

            function BibtexParser() {

                this.months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                this.notKey = [',', '{', '}', ' ', '='];
                this.pos = 0;
                this.input = "";
                this.entries = new Array();

                this.currentEntry = "";

                this.setInput = function(t) {
                    this.input = t;
                }
                ;

                this.getEntries = function() {
                    return this.entries;
                }
                ;

                this.isWhitespace = function(s) {
                    return (s == ' ' || s == '\r' || s == '\t' || s == '\n');
                }
                ;

                this.match = function(s, canCommentOut) {
                    if (canCommentOut == undefined || canCommentOut == null) {
                        canCommentOut = true;
                    }
                    this.skipWhitespace(canCommentOut);
                    if (this.input.substring(this.pos, this.pos + s.length) == s) {
                        this.pos += s.length;
                    } else {
                        throw "Token mismatch, expected " + s + ", found " + this.input.substring(this.pos);
                    }
                    this.skipWhitespace(canCommentOut);
                }
                ;

                this.tryMatch = function(s, canCommentOut) {
                    if (canCommentOut == undefined || canCommentOut == null) {
                        canCommentOut = true;
                    }
                    this.skipWhitespace(canCommentOut);
                    if (this.input.substring(this.pos, this.pos + s.length) == s) {
                        return true;
                    } else {
                        return false;
                    }
                    this.skipWhitespace(canCommentOut);
                }
                ;

                /* when search for a match all text can be ignored, not just white space */
                this.matchAt = function() {
                    var this$1 = this;

                    while (this.input.length > this.pos && this.input[this.pos] != '@') {
                        this$1.pos++;
                    }

                    if (this.input[this.pos] == '@') {
                        return true;
                    }
                    return false;
                }
                ;

                this.skipWhitespace = function(canCommentOut) {
                    var this$1 = this;

                    while (this.isWhitespace(this.input[this.pos])) {
                        this$1.pos++;
                    }
                    if (this.input[this.pos] == "%" && canCommentOut == true) {
                        while (this.input[this.pos] != "\n") {
                            this$1.pos++;
                        }
                        this.skipWhitespace(canCommentOut);
                    }
                }
                ;

                this.value_braces = function() {
                    var this$1 = this;

                    var bracecount = 0;
                    this.match("{", false);
                    var start = this.pos;
                    var escaped = false;
                    while (true) {
                        if (!escaped) {
                            if (this$1.input[this$1.pos] == '}') {
                                if (bracecount > 0) {
                                    bracecount--;
                                } else {
                                    var end = this$1.pos;
                                    this$1.match("}", false);
                                    return this$1.input.substring(start, end);
                                }
                            } else if (this$1.input[this$1.pos] == '{') {
                                bracecount++;
                            } else if (this$1.pos >= this$1.input.length - 1) {
                                throw "Unterminated value";
                            }
                        }
                        if (this$1.input[this$1.pos] == '\\' && escaped == false) {
                            escaped = true;
                        } else {
                            escaped = false;
                        }
                        this$1.pos++;
                    }
                }
                ;

                this.value_comment = function() {
                    var this$1 = this;

                    var str = '';
                    var brcktCnt = 0;
                    while (!(this.tryMatch("}", false) && brcktCnt == 0)) {
                        str = str + this$1.input[this$1.pos];
                        if (this$1.input[this$1.pos] == '{') {
                            brcktCnt++;
                        }
                        if (this$1.input[this$1.pos] == '}') {
                            brcktCnt--;
                        }
                        if (this$1.pos >= this$1.input.length - 1) {
                            throw "Unterminated value:" + this$1.input.substring(start);
                        }
                        this$1.pos++;
                    }
                    return str;
                }
                ;

                this.value_quotes = function() {
                    var this$1 = this;

                    this.match('"', false);
                    var start = this.pos;
                    var escaped = false;
                    while (true) {
                        if (!escaped) {
                            if (this$1.input[this$1.pos] == '"') {
                                var end = this$1.pos;
                                this$1.match('"', false);
                                return this$1.input.substring(start, end);
                            } else if (this$1.pos >= this$1.input.length - 1) {
                                throw "Unterminated value:" + this$1.input.substring(start);
                            }
                        }
                        if (this$1.input[this$1.pos] == '\\' && escaped == false) {
                            escaped = true;
                        } else {
                            escaped = false;
                        }
                        this$1.pos++;
                    }
                }
                ;

                this.single_value = function() {
                    var start = this.pos;
                    if (this.tryMatch("{")) {
                        return this.value_braces();
                    } else if (this.tryMatch('"')) {
                        return this.value_quotes();
                    } else {
                        var k = this.key();
                        if (k.match("^[0-9]+$")) {
                            return k;
                        } else if (this.months.indexOf(k.toLowerCase()) >= 0) {
                            return k.toLowerCase();
                        } else {
                            throw "Value expected:" + this.input.substring(start) + ' for key: ' + k;
                        }

                    }
                }
                ;

                this.value = function() {
                    var this$1 = this;

                    var values = [];
                    values.push(this.single_value());
                    while (this.tryMatch("#")) {
                        this$1.match("#");
                        values.push(this$1.single_value());
                    }
                    return values.join("");
                }
                ;

                this.key = function() {
                    var this$1 = this;

                    var start = this.pos;
                    while (true) {
                        if (this$1.pos >= this$1.input.length) {
                            throw "Runaway key";
                        }
                        // а-яА-Я is Cyrillic
                        //console.log(this.input[this.pos]);
                        if (this$1.notKey.indexOf(this$1.input[this$1.pos]) >= 0) {
                            return this$1.input.substring(start, this$1.pos);
                        } else {
                            this$1.pos++;

                        }
                    }
                }
                ;

                this.key_equals_value = function() {
                    var key = this.key();
                    if (this.tryMatch("=")) {
                        this.match("=");
                        var val = this.value();
                        return [key, val];
                    } else {
                        throw "... = value expected, equals sign missing:" + this.input.substring(this.pos);
                    }
                }
                ;

                this.key_value_list = function() {
                    var this$1 = this;

                    var kv = this.key_equals_value();
                    this.currentEntry['entryTags'] = {};
                    this.currentEntry['entryTags'][kv[0]] = kv[1];
                    while (this.tryMatch(",")) {
                        this$1.match(",");
                        // fixes problems with commas at the end of a list
                        if (this$1.tryMatch("}")) {
                            break;
                        }

                        kv = this$1.key_equals_value();
                        this$1.currentEntry['entryTags'][kv[0]] = kv[1];
                    }
                }
                ;

                this.entry_body = function(d) {
                    this.currentEntry = {};
                    this.currentEntry['citationKey'] = this.key();
                    this.currentEntry['entryType'] = d.substring(1);
                    this.match(",");
                    this.key_value_list();
                    this.entries.push(this.currentEntry);
                }
                ;

                this.directive = function() {
                    this.match("@");
                    return "@" + this.key();
                }
                ;

                this.preamble = function() {
                    this.currentEntry = {};
                    this.currentEntry['entryType'] = 'PREAMBLE';
                    this.currentEntry['entry'] = this.value_comment();
                    this.entries.push(this.currentEntry);
                }
                ;

                this.comment = function() {
                    this.currentEntry = {};
                    this.currentEntry['entryType'] = 'COMMENT';
                    this.currentEntry['entry'] = this.value_comment();
                    this.entries.push(this.currentEntry);
                }
                ;

                this.entry = function(d) {
                    this.entry_body(d);
                }
                ;

                this.bibtex = function() {
                    var this$1 = this;

                    while (this.matchAt()) {
                        var d = this$1.directive();
                        this$1.match("{");
                        if (d == "@STRING") {
                            this$1.string();
                        } else if (d == "@PREAMBLE") {
                            this$1.preamble();
                        } else if (d == "@COMMENT") {
                            this$1.comment();
                        } else {
                            this$1.entry(d);
                        }
                        this$1.match("}");
                    }
                }
                ;
            }

            exports.toJSON = function(bibtex) {
                var b = new BibtexParser();
                b.setInput(bibtex);
                b.bibtex();
                return b.entries;
            }
            ;

            /* added during hackathon don't hate on me */
            exports.toBibtex = function(json) {
                var out = '';
                for (var i in json) {
                    out += "@" + json[i].entryType;
                    out += '{';
                    if (json[i].citationKey) {
                        out += json[i].citationKey + ', ';
                    }
                    if (json[i].entry) {
                        out += json[i].entry;
                    }
                    if (json[i].entryTags) {
                        var tags = '';
                        for (var jdx in json[i].entryTags) {
                            if (tags.length != 0) {
                                tags += ', ';
                            }
                            tags += jdx + '= {' + json[i].entryTags[jdx] + '}';
                        }
                        out += tags;
                    }
                    out += '}\n\n';
                }
                return out;

            }
            ;

        }
        )(exports);

        /* end bibtexParse */
    });

    var bibliography = function(dom, data) {
        var el = dom.querySelector('script[type="text/bibliography"]');
        var bibliography = {};
        //TODO If we don't have a local element, make a request for the document.
        if (el) {
            var rawBib = el.textContent;
            var parsed = bibtexParse.toJSON(rawBib);
            if (parsed) {
                parsed.forEach(function(e) {
                    for (var k in e.entryTags) {
                        var val = e.entryTags[k];
                        val = val.replace(/[\t\n ]+/g, " ");
                        val = val.replace(/{\\["^`\.'acu~Hvs]( )?([a-zA-Z])}/g, function(full, x, char) {
                            return char;
                        });
                        val = val.replace(/{\\([a-zA-Z])}/g, function(full, char) {
                            return char;
                        });
                        e.entryTags[k.toLowerCase()] = val;
                    }
                    bibliography[e.citationKey] = e.entryTags;
                    bibliography[e.citationKey].type = e.entryType;
                });
            }
        }
        data.bibliography = bibliography;
    };

    var t0 = new Date;
    var t1 = new Date;

    function newInterval(floori, offseti, count, field) {

        function interval(date) {
            return floori(date = new Date(+date)),
            date;
        }

        interval.floor = interval;

        interval.ceil = function(date) {
            return floori(date = new Date(date - 1)),
            offseti(date, 1),
            floori(date),
            date;
        }
        ;

        interval.round = function(date) {
            var d0 = interval(date)
              , d1 = interval.ceil(date);
            return date - d0 < d1 - date ? d0 : d1;
        }
        ;

        interval.offset = function(date, step) {
            return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)),
            date;
        }
        ;

        interval.range = function(start, stop, step) {
            var range = [];
            start = interval.ceil(start);
            step = step == null ? 1 : Math.floor(step);
            if (!(start < stop) || !(step > 0)) {
                return range;
            }
            // also handles Invalid Date
            do {
                range.push(new Date(+start));
            } while (offseti(start, step),
            floori(start),
            start < stop)return range;
        }
        ;

        interval.filter = function(test) {
            return newInterval(function(date) {
                if (date >= date) {
                    while (floori(date),
                    !test(date)) {
                        date.setTime(date - 1);
                    }
                }
            }, function(date, step) {
                if (date >= date) {
                    while (--step >= 0) {
                        while (offseti(date, 1),
                        !test(date)) {}
                    }
                }
                // eslint-disable-line no-empty
            });
        }
        ;

        if (count) {
            interval.count = function(start, end) {
                t0.setTime(+start),
                t1.setTime(+end);
                floori(t0),
                floori(t1);
                return Math.floor(count(t0, t1));
            }
            ;

            interval.every = function(step) {
                step = Math.floor(step);
                return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
                    return field(d) % step === 0;
                }
                : function(d) {
                    return interval.count(0, d) % step === 0;
                }
                );
            }
            ;
        }

        return interval;
    }

    var millisecond = newInterval(function() {// noop
    }, function(date, step) {
        date.setTime(+date + step);
    }, function(start, end) {
        return end - start;
    });

    // An optimized implementation for this simple case.
    millisecond.every = function(k) {
        k = Math.floor(k);
        if (!isFinite(k) || !(k > 0)) {
            return null;
        }
        if (!(k > 1)) {
            return millisecond;
        }
        return newInterval(function(date) {
            date.setTime(Math.floor(date / k) * k);
        }, function(date, step) {
            date.setTime(+date + step * k);
        }, function(start, end) {
            return (end - start) / k;
        });
    }
    ;

    var durationSecond = 1e3;
    var durationMinute = 6e4;
    var durationHour = 36e5;
    var durationDay = 864e5;
    var durationWeek = 6048e5;

    var second = newInterval(function(date) {
        date.setTime(Math.floor(date / durationSecond) * durationSecond);
    }, function(date, step) {
        date.setTime(+date + step * durationSecond);
    }, function(start, end) {
        return (end - start) / durationSecond;
    }, function(date) {
        return date.getUTCSeconds();
    });

    var minute = newInterval(function(date) {
        date.setTime(Math.floor(date / durationMinute) * durationMinute);
    }, function(date, step) {
        date.setTime(+date + step * durationMinute);
    }, function(start, end) {
        return (end - start) / durationMinute;
    }, function(date) {
        return date.getMinutes();
    });

    var hour = newInterval(function(date) {
        var offset = date.getTimezoneOffset() * durationMinute % durationHour;
        if (offset < 0) {
            offset += durationHour;
        }
        date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
    }, function(date, step) {
        date.setTime(+date + step * durationHour);
    }, function(start, end) {
        return (end - start) / durationHour;
    }, function(date) {
        return date.getHours();
    });

    var day = newInterval(function(date) {
        date.setHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setDate(date.getDate() + step);
    }, function(start, end) {
        return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
    }, function(date) {
        return date.getDate() - 1;
    });

    function weekday(i) {
        return newInterval(function(date) {
            date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
            date.setHours(0, 0, 0, 0);
        }, function(date, step) {
            date.setDate(date.getDate() + step * 7);
        }, function(start, end) {
            return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
        });
    }

    var sunday = weekday(0);
    var monday = weekday(1);
    var tuesday = weekday(2);
    var wednesday = weekday(3);
    var thursday = weekday(4);
    var friday = weekday(5);
    var saturday = weekday(6);

    var month = newInterval(function(date) {
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setMonth(date.getMonth() + step);
    }, function(start, end) {
        return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
    }, function(date) {
        return date.getMonth();
    });

    var year = newInterval(function(date) {
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setFullYear(date.getFullYear() + step);
    }, function(start, end) {
        return end.getFullYear() - start.getFullYear();
    }, function(date) {
        return date.getFullYear();
    });

    // An optimized implementation for this simple case.
    year.every = function(k) {
        return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
            date.setFullYear(Math.floor(date.getFullYear() / k) * k);
            date.setMonth(0, 1);
            date.setHours(0, 0, 0, 0);
        }, function(date, step) {
            date.setFullYear(date.getFullYear() + step * k);
        });
    }
    ;

    var utcMinute = newInterval(function(date) {
        date.setUTCSeconds(0, 0);
    }, function(date, step) {
        date.setTime(+date + step * durationMinute);
    }, function(start, end) {
        return (end - start) / durationMinute;
    }, function(date) {
        return date.getUTCMinutes();
    });

    var utcHour = newInterval(function(date) {
        date.setUTCMinutes(0, 0, 0);
    }, function(date, step) {
        date.setTime(+date + step * durationHour);
    }, function(start, end) {
        return (end - start) / durationHour;
    }, function(date) {
        return date.getUTCHours();
    });

    var utcDay = newInterval(function(date) {
        date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setUTCDate(date.getUTCDate() + step);
    }, function(start, end) {
        return (end - start) / durationDay;
    }, function(date) {
        return date.getUTCDate() - 1;
    });

    function utcWeekday(i) {
        return newInterval(function(date) {
            date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
            date.setUTCHours(0, 0, 0, 0);
        }, function(date, step) {
            date.setUTCDate(date.getUTCDate() + step * 7);
        }, function(start, end) {
            return (end - start) / durationWeek;
        });
    }

    var utcSunday = utcWeekday(0);
    var utcMonday = utcWeekday(1);
    var utcTuesday = utcWeekday(2);
    var utcWednesday = utcWeekday(3);
    var utcThursday = utcWeekday(4);
    var utcFriday = utcWeekday(5);
    var utcSaturday = utcWeekday(6);

    var utcMonth = newInterval(function(date) {
        date.setUTCDate(1);
        date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setUTCMonth(date.getUTCMonth() + step);
    }, function(start, end) {
        return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
    }, function(date) {
        return date.getUTCMonth();
    });

    var utcYear = newInterval(function(date) {
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setUTCFullYear(date.getUTCFullYear() + step);
    }, function(start, end) {
        return end.getUTCFullYear() - start.getUTCFullYear();
    }, function(date) {
        return date.getUTCFullYear();
    });

    // An optimized implementation for this simple case.
    utcYear.every = function(k) {
        return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
            date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
            date.setUTCMonth(0, 1);
            date.setUTCHours(0, 0, 0, 0);
        }, function(date, step) {
            date.setUTCFullYear(date.getUTCFullYear() + step * k);
        });
    }
    ;

    function localDate(d) {
        if (0 <= d.y && d.y < 100) {
            var date = new Date(-1,d.m,d.d,d.H,d.M,d.S,d.L);
            date.setFullYear(d.y);
            return date;
        }
        return new Date(d.y,d.m,d.d,d.H,d.M,d.S,d.L);
    }

    function utcDate(d) {
        if (0 <= d.y && d.y < 100) {
            var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
            date.setUTCFullYear(d.y);
            return date;
        }
        return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
    }

    function newYear(y) {
        return {
            y: y,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
        };
    }

    function formatLocale(locale) {
        var locale_dateTime = locale.dateTime
          , locale_date = locale.date
          , locale_time = locale.time
          , locale_periods = locale.periods
          , locale_weekdays = locale.days
          , locale_shortWeekdays = locale.shortDays
          , locale_months = locale.months
          , locale_shortMonths = locale.shortMonths;

        var periodRe = formatRe(locale_periods)
          , periodLookup = formatLookup(locale_periods)
          , weekdayRe = formatRe(locale_weekdays)
          , weekdayLookup = formatLookup(locale_weekdays)
          , shortWeekdayRe = formatRe(locale_shortWeekdays)
          , shortWeekdayLookup = formatLookup(locale_shortWeekdays)
          , monthRe = formatRe(locale_months)
          , monthLookup = formatLookup(locale_months)
          , shortMonthRe = formatRe(locale_shortMonths)
          , shortMonthLookup = formatLookup(locale_shortMonths);

        var formats = {
            "a": formatShortWeekday,
            "A": formatWeekday,
            "b": formatShortMonth,
            "B": formatMonth,
            "c": null,
            "d": formatDayOfMonth,
            "e": formatDayOfMonth,
            "H": formatHour24,
            "I": formatHour12,
            "j": formatDayOfYear,
            "L": formatMilliseconds,
            "m": formatMonthNumber,
            "M": formatMinutes,
            "p": formatPeriod,
            "S": formatSeconds,
            "U": formatWeekNumberSunday,
            "w": formatWeekdayNumber,
            "W": formatWeekNumberMonday,
            "x": null,
            "X": null,
            "y": formatYear,
            "Y": formatFullYear,
            "Z": formatZone,
            "%": formatLiteralPercent
        };

        var utcFormats = {
            "a": formatUTCShortWeekday,
            "A": formatUTCWeekday,
            "b": formatUTCShortMonth,
            "B": formatUTCMonth,
            "c": null,
            "d": formatUTCDayOfMonth,
            "e": formatUTCDayOfMonth,
            "H": formatUTCHour24,
            "I": formatUTCHour12,
            "j": formatUTCDayOfYear,
            "L": formatUTCMilliseconds,
            "m": formatUTCMonthNumber,
            "M": formatUTCMinutes,
            "p": formatUTCPeriod,
            "S": formatUTCSeconds,
            "U": formatUTCWeekNumberSunday,
            "w": formatUTCWeekdayNumber,
            "W": formatUTCWeekNumberMonday,
            "x": null,
            "X": null,
            "y": formatUTCYear,
            "Y": formatUTCFullYear,
            "Z": formatUTCZone,
            "%": formatLiteralPercent
        };

        var parses = {
            "a": parseShortWeekday,
            "A": parseWeekday,
            "b": parseShortMonth,
            "B": parseMonth,
            "c": parseLocaleDateTime,
            "d": parseDayOfMonth,
            "e": parseDayOfMonth,
            "H": parseHour24,
            "I": parseHour24,
            "j": parseDayOfYear,
            "L": parseMilliseconds,
            "m": parseMonthNumber,
            "M": parseMinutes,
            "p": parsePeriod,
            "S": parseSeconds,
            "U": parseWeekNumberSunday,
            "w": parseWeekdayNumber,
            "W": parseWeekNumberMonday,
            "x": parseLocaleDate,
            "X": parseLocaleTime,
            "y": parseYear,
            "Y": parseFullYear,
            "Z": parseZone,
            "%": parseLiteralPercent
        };

        // These recursive directive definitions must be deferred.
        formats.x = newFormat(locale_date, formats);
        formats.X = newFormat(locale_time, formats);
        formats.c = newFormat(locale_dateTime, formats);
        utcFormats.x = newFormat(locale_date, utcFormats);
        utcFormats.X = newFormat(locale_time, utcFormats);
        utcFormats.c = newFormat(locale_dateTime, utcFormats);

        function newFormat(specifier, formats) {
            return function(date) {
                var string = [], i = -1, j = 0, n = specifier.length, c, pad, format;

                if (!(date instanceof Date)) {
                    date = new Date(+date);
                }

                while (++i < n) {
                    if (specifier.charCodeAt(i) === 37) {
                        string.push(specifier.slice(j, i));
                        if ((pad = pads[c = specifier.charAt(++i)]) != null) {
                            c = specifier.charAt(++i);
                        } else {
                            pad = c === "e" ? " " : "0";
                        }
                        if (format = formats[c]) {
                            c = format(date, pad);
                        }
                        string.push(c);
                        j = i + 1;
                    }
                }

                string.push(specifier.slice(j, i));
                return string.join("");
            }
            ;
        }

        function newParse(specifier, newDate) {
            return function(string) {
                var d = newYear(1900)
                  , i = parseSpecifier(d, specifier, string += "", 0);
                if (i != string.length) {
                    return null;
                }

                // The am-pm flag is 0 for AM, and 1 for PM.
                if ("p"in d) {
                    d.H = d.H % 12 + d.p * 12;
                }

                // Convert day-of-week and week-of-year to day-of-year.
                if ("W"in d || "U"in d) {
                    if (!("w"in d)) {
                        d.w = "W"in d ? 1 : 0;
                    }
                    var day$$1 = "Z"in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
                    d.m = 0;
                    d.d = "W"in d ? (d.w + 6) % 7 + d.W * 7 - (day$$1 + 5) % 7 : d.w + d.U * 7 - (day$$1 + 6) % 7;
                }

                // If a time zone is specified, all fields are interpreted as UTC and then
                // offset according to the specified time zone.
                if ("Z"in d) {
                    d.H += d.Z / 100 | 0;
                    d.M += d.Z % 100;
                    return utcDate(d);
                }

                // Otherwise, all fields are in local time.
                return newDate(d);
            }
            ;
        }

        function parseSpecifier(d, specifier, string, j) {
            var i = 0, n = specifier.length, m = string.length, c, parse;

            while (i < n) {
                if (j >= m) {
                    return -1;
                }
                c = specifier.charCodeAt(i++);
                if (c === 37) {
                    c = specifier.charAt(i++);
                    parse = parses[c in pads ? specifier.charAt(i++) : c];
                    if (!parse || ((j = parse(d, string, j)) < 0)) {
                        return -1;
                    }
                } else if (c != string.charCodeAt(j++)) {
                    return -1;
                }
            }

            return j;
        }

        function parsePeriod(d, string, i) {
            var n = periodRe.exec(string.slice(i));
            return n ? (d.p = periodLookup[n[0].toLowerCase()],
            i + n[0].length) : -1;
        }

        function parseShortWeekday(d, string, i) {
            var n = shortWeekdayRe.exec(string.slice(i));
            return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()],
            i + n[0].length) : -1;
        }

        function parseWeekday(d, string, i) {
            var n = weekdayRe.exec(string.slice(i));
            return n ? (d.w = weekdayLookup[n[0].toLowerCase()],
            i + n[0].length) : -1;
        }

        function parseShortMonth(d, string, i) {
            var n = shortMonthRe.exec(string.slice(i));
            return n ? (d.m = shortMonthLookup[n[0].toLowerCase()],
            i + n[0].length) : -1;
        }

        function parseMonth(d, string, i) {
            var n = monthRe.exec(string.slice(i));
            return n ? (d.m = monthLookup[n[0].toLowerCase()],
            i + n[0].length) : -1;
        }

        function parseLocaleDateTime(d, string, i) {
            return parseSpecifier(d, locale_dateTime, string, i);
        }

        function parseLocaleDate(d, string, i) {
            return parseSpecifier(d, locale_date, string, i);
        }

        function parseLocaleTime(d, string, i) {
            return parseSpecifier(d, locale_time, string, i);
        }

        function formatShortWeekday(d) {
            return locale_shortWeekdays[d.getDay()];
        }

        function formatWeekday(d) {
            return locale_weekdays[d.getDay()];
        }

        function formatShortMonth(d) {
            return locale_shortMonths[d.getMonth()];
        }

        function formatMonth(d) {
            return locale_months[d.getMonth()];
        }

        function formatPeriod(d) {
            return locale_periods[+(d.getHours() >= 12)];
        }

        function formatUTCShortWeekday(d) {
            return locale_shortWeekdays[d.getUTCDay()];
        }

        function formatUTCWeekday(d) {
            return locale_weekdays[d.getUTCDay()];
        }

        function formatUTCShortMonth(d) {
            return locale_shortMonths[d.getUTCMonth()];
        }

        function formatUTCMonth(d) {
            return locale_months[d.getUTCMonth()];
        }

        function formatUTCPeriod(d) {
            return locale_periods[+(d.getUTCHours() >= 12)];
        }

        return {
            format: function(specifier) {
                var f = newFormat(specifier += "", formats);
                f.toString = function() {
                    return specifier;
                }
                ;
                return f;
            },
            parse: function(specifier) {
                var p = newParse(specifier += "", localDate);
                p.toString = function() {
                    return specifier;
                }
                ;
                return p;
            },
            utcFormat: function(specifier) {
                var f = newFormat(specifier += "", utcFormats);
                f.toString = function() {
                    return specifier;
                }
                ;
                return f;
            },
            utcParse: function(specifier) {
                var p = newParse(specifier, utcDate);
                p.toString = function() {
                    return specifier;
                }
                ;
                return p;
            }
        };
    }

    var pads = {
        "-": "",
        "_": " ",
        "0": "0"
    };
    var numberRe = /^\s*\d+/;
    var percentRe = /^%/;
    var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

    function pad(value, fill, width) {
        var sign = value < 0 ? "-" : ""
          , string = (sign ? -value : value) + ""
          , length = string.length;
        return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
    }

    function requote(s) {
        return s.replace(requoteRe, "\\$&");
    }

    function formatRe(names) {
        return new RegExp("^(?:" + names.map(requote).join("|") + ")","i");
    }

    function formatLookup(names) {
        var map = {}
          , i = -1
          , n = names.length;
        while (++i < n) {
            map[names[i].toLowerCase()] = i;
        }
        return map;
    }

    function parseWeekdayNumber(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? (d.w = +n[0],
        i + n[0].length) : -1;
    }

    function parseWeekNumberSunday(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? (d.U = +n[0],
        i + n[0].length) : -1;
    }

    function parseWeekNumberMonday(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? (d.W = +n[0],
        i + n[0].length) : -1;
    }

    function parseFullYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 4));
        return n ? (d.y = +n[0],
        i + n[0].length) : -1;
    }

    function parseYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000),
        i + n[0].length) : -1;
    }

    function parseZone(d, string, i) {
        var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
        return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")),
        i + n[0].length) : -1;
    }

    function parseMonthNumber(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.m = n[0] - 1,
        i + n[0].length) : -1;
    }

    function parseDayOfMonth(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.d = +n[0],
        i + n[0].length) : -1;
    }

    function parseDayOfYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? (d.m = 0,
        d.d = +n[0],
        i + n[0].length) : -1;
    }

    function parseHour24(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.H = +n[0],
        i + n[0].length) : -1;
    }

    function parseMinutes(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.M = +n[0],
        i + n[0].length) : -1;
    }

    function parseSeconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? (d.S = +n[0],
        i + n[0].length) : -1;
    }

    function parseMilliseconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? (d.L = +n[0],
        i + n[0].length) : -1;
    }

    function parseLiteralPercent(d, string, i) {
        var n = percentRe.exec(string.slice(i, i + 1));
        return n ? i + n[0].length : -1;
    }

    function formatDayOfMonth(d, p) {
        return pad(d.getDate(), p, 2);
    }

    function formatHour24(d, p) {
        return pad(d.getHours(), p, 2);
    }

    function formatHour12(d, p) {
        return pad(d.getHours() % 12 || 12, p, 2);
    }

    function formatDayOfYear(d, p) {
        return pad(1 + day.count(year(d), d), p, 3);
    }

    function formatMilliseconds(d, p) {
        return pad(d.getMilliseconds(), p, 3);
    }

    function formatMonthNumber(d, p) {
        return pad(d.getMonth() + 1, p, 2);
    }

    function formatMinutes(d, p) {
        return pad(d.getMinutes(), p, 2);
    }

    function formatSeconds(d, p) {
        return pad(d.getSeconds(), p, 2);
    }

    function formatWeekNumberSunday(d, p) {
        return pad(sunday.count(year(d), d), p, 2);
    }

    function formatWeekdayNumber(d) {
        return d.getDay();
    }

    function formatWeekNumberMonday(d, p) {
        return pad(monday.count(year(d), d), p, 2);
    }

    function formatYear(d, p) {
        return pad(d.getFullYear() % 100, p, 2);
    }

    function formatFullYear(d, p) {
        return pad(d.getFullYear() % 10000, p, 4);
    }

    function formatZone(d) {
        var z = d.getTimezoneOffset();
        return (z > 0 ? "-" : (z *= -1,
        "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
    }

    function formatUTCDayOfMonth(d, p) {
        return pad(d.getUTCDate(), p, 2);
    }

    function formatUTCHour24(d, p) {
        return pad(d.getUTCHours(), p, 2);
    }

    function formatUTCHour12(d, p) {
        return pad(d.getUTCHours() % 12 || 12, p, 2);
    }

    function formatUTCDayOfYear(d, p) {
        return pad(1 + utcDay.count(utcYear(d), d), p, 3);
    }

    function formatUTCMilliseconds(d, p) {
        return pad(d.getUTCMilliseconds(), p, 3);
    }

    function formatUTCMonthNumber(d, p) {
        return pad(d.getUTCMonth() + 1, p, 2);
    }

    function formatUTCMinutes(d, p) {
        return pad(d.getUTCMinutes(), p, 2);
    }

    function formatUTCSeconds(d, p) {
        return pad(d.getUTCSeconds(), p, 2);
    }

    function formatUTCWeekNumberSunday(d, p) {
        return pad(utcSunday.count(utcYear(d), d), p, 2);
    }

    function formatUTCWeekdayNumber(d) {
        return d.getUTCDay();
    }

    function formatUTCWeekNumberMonday(d, p) {
        return pad(utcMonday.count(utcYear(d), d), p, 2);
    }

    function formatUTCYear(d, p) {
        return pad(d.getUTCFullYear() % 100, p, 2);
    }

    function formatUTCFullYear(d, p) {
        return pad(d.getUTCFullYear() % 10000, p, 4);
    }

    function formatUTCZone() {
        return "+0000";
    }

    function formatLiteralPercent() {
        return "%";
    }

    var locale$1;
    var timeFormat;
    var timeParse;
    var utcFormat;
    var utcParse;

    defaultLocale({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });

    function defaultLocale(definition) {
        locale$1 = formatLocale(definition);
        timeFormat = locale$1.format;
        timeParse = locale$1.parse;
        utcFormat = locale$1.utcFormat;
        utcParse = locale$1.utcParse;
        return locale$1;
    }

    var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

    function formatIsoNative(date) {
        return date.toISOString();
    }

    var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

    function parseIsoNative(string) {
        var date = new Date(string);
        return isNaN(date) ? null : date;
    }

    var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

    var expandData = function(dom, data) {

        //
        // Properties from source
        //

        //   title: 'Attention and Augmented Recurrent Neural Networks',
        //   description: 'A visual overview of neural attention, and the powerful extensions of neural networks being built on top of it.',
        //   url: 'http://distill.pub/2016/augmented-rnns',
        //   tags: [ 'rnn' ],
        //   doiSuffix: 1,
        //   doi: '10.23915/distill.00001',
        //   volume: 1,
        //   issue: 9,
        //   distillPath: '2016/augmented-rnns',
        //   githubPath: 'distillpub/post--augmented-rnns',
        //   githubCompareUpdatesUrl: 'https://github.com/distillpub/post--augmented-rnns/compare/1596e094d8943d2dc0ea445d92071129c6419c59...3bd9209e0c24d020f87cf6152dcecc6017cbc193',
        //   updatedDate: 2017-03-21T07:13:16.000Z,
        //   publishedDate: 2016-09-08T07:00:00.000Z,
        //   journal: {
        //     "title": "Distill",
        //     "full_title": "Distill",
        //     "abbrev_title": "Distill",
        //     "url": "http://distill.pub",
        //     "doi": "10.23915/distill",
        //     "publisherName": "Distill Working Group",
        //     "publisherEmail": "admin@distill.pub",
        //     "issn": "2476-0757",
        //     "editors": [...],
        //     "committee": [...]
        //   }

        //
        // Computed Properties
        //

        //   githubUrl: 'https://github.com/distillpub/post--augmented-rnns',
        //   previewURL: 'http://distill.pub/2016/augmented-rnns/thumbnail.jpg',
        //   publishedDateRFC: 'Thu, 08 Sep 2016 00:00:00 -0700',
        //   publishedYear: 2016,
        //   publishedMonth: 'Sept',
        //   publishedDay: 8,
        //   publishedMonthPadded: '09',
        //   publishedDayPadded: '08',
        //   updatedDateRFC: 'Tue, 21 Mar 2017 00:13:16 -0700',
        //   concatenatedAuthors: 'Olah & Carter',
        //   bibtexAuthors: 'Olah, Chris and Carter, Shan',
        //   slug: 'olah2016attention'
        //   authors: [
        //     {
        //       "personalURL": null,
        //       "name": "Chris Olah",
        //       "firstName": "Chris",
        //       "lastName": "Olah",
        //       "affiliationURL": null,
        //       "affiliation": "Google Brain"
        //     }
        //   ],
        //   bibliography: {
        //     "gregor2015draw": {
        //       "title": "DRAW: A recurrent neural network for image generation",
        //       "author": "Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan",
        //       "journal": "arXiv preprint arXiv:1502.04623",
        //       "year": "2015",
        //       "url": "https://arxiv.org/pdf/1502.04623.pdf",
        //       "type": "article"
        //     },
        //     ...
        //   },
        //   citations: [
        //     "gregor2015draw",
        //     "mercier2011humans",
        //     "dong2014image",
        //     "dumoulin2016guide",
        //     "mordvintsev2015inceptionism"
        //   ],

        // citations:
        var citations = [];
        var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
        citeTags.forEach(function(el) {
            var key = el.getAttribute("key");
            if (key) {
                var citationKeys = key.split(",");
                citationKeys.forEach(function(key) {
                    if (citations.indexOf(key) == -1) {
                        citations.push(key);
                        if (!(key in data.bibliography)) {
                            console.warn("No bibliography entry found for: " + key);
                        }
                    }
                });
            }
        });
        data.citations = citations;

        data.authors = data.authors || [];

        // paths
        if (!data.distillPath && !data.url) {
            data.url = "http://distill.pub/";
        } else if (!data.url) {
            data.url = "http://distill.pub/" + data.distillPath;
        }
        data.githubUrl = "https://github.com/" + data.githubPath;

        data.previewURL = data.previewURL ? data.previewURL : data.url + "/thumbnail.jpg";

        // Homepage
        //data.homepage = !post.noHomepage;
        data.journal = data.journal || {};

        // Dates
        if (data.publishedDate) {
            //} && data.journal) {
            data.volume = data.publishedDate.getFullYear() - 2015;
            data.issue = data.publishedDate.getMonth() + 1;
        }

        data.publishedDate = data.publishedDate ? data.publishedDate : new Date("Invalid");
        data.updatedDate = data.updatedDate ? data.updatedDate : new Date("Invalid");

        data.publishedDateRFC;
        var RFC = timeFormat("%a, %d %b %Y %H:%M:%S %Z");
        var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var zeroPad = function(n) {
            return n < 10 ? "0" + n : n;
        };
        data.publishedDateRFC = RFC(data.publishedDate);
        data.publishedYear = data.publishedDate.getFullYear();
        data.publishedMonth = months[data.publishedDate.getMonth()];
        data.publishedDay = data.publishedDate.getDate();
        data.publishedMonthPadded = zeroPad(data.publishedDate.getMonth() + 1);
        data.publishedDayPadded = zeroPad(data.publishedDate.getDate());
        data.updatedDateRFC = RFC(data.updatedDate);

        if (data.authors.length > 2) {
            data.concatenatedAuthors = data.authors[0].lastName + ", et al.";
        } else if (data.authors.length === 2) {
            data.concatenatedAuthors = data.authors[0].lastName + " & " + data.authors[1].lastName;
        } else if (data.authors.length === 1) {
            data.concatenatedAuthors = data.authors[0].lastName;
        }

        data.bibtexAuthors = data.authors.map(function(author) {
            return author.lastName + ", " + author.firstName;
        }).join(" and ");

        data.slug = data.authors.length ? data.authors[0].lastName.toLowerCase() + data.publishedYear + data.title.split(" ")[0].toLowerCase() : "Untitled";

    };

    var favicon = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA99JREFUeNrsG4t1ozDMzQSM4A2ODUonKBucN2hugtIJ6E1AboLcBiQTkJsANiAb9OCd/OpzMWBJBl5TvaeXPiiyJetry0J8wW3D3QpjRh3GjneXDq+fSQA9s2mH9x3KDhN4foJfCb8N/Jrv+2fnDn8vLRQOplWHVYdvHZYdZsBcZP1vBmh/n8DzEmhUQDPaOuP9pFuY+JwJHwHnCLQE2tnWBGEyXozY9xCUgHMhhjE2I4heVWtgIkZ83wL6Qgxj1obfWBxymPwe+b00BCCRNPbwfb60yleAkkBHGT5AEehIYz7eJrFDMF9CvH4wwhcGHiHMneFvLDQwlwvMLQq58trRcYBWfYn0A0OgHWQUSu25mE+BnoYKnnEJoeIWAifzOv7vLWd2ZKRfWAIme3tOiUaQ3UnLkb0xj1FxRIeEGKaGIHOs9nEgLaaA9i0JRYo1Ic67wJW86KSKE/ZAM8KuVMk8ITVhmxUxJ3Cl2xlm9Vtkeju1+mpCQNxaEGNCY8bs9X2YqwNoQeGjBWut/ma0QAWy/TqAsHx9wSya3I5IRxOfTC+leG+kA/4vSeEcGBtNUN6byhu3+keEZCQJUNh8MAO7HL6H8pQLnsW/Hd4T4lv93TPjfM7A46iEEqbB5EDOvwYNW6tGNZzT/o+CZ6sqZ6wUtR/wf7mi/VL8iNciT6rHih48Y55b4nKCHJCCzb4y0nwFmin3ZEMIoLfZF8F7nncFmvnWBaBj7CGAYA/WGJsUwHdYqVDwAmNsUgAx4CGgAA7GOOxADYOFWOaIKifuVYzmOpREqA21Mo7aPsgiY1PhOMAmxtR+AUbYH3Id2wc0SAFIQTsn9IUGWR8k9jx3vtXSiAacFxTAGakBk9UudkNECd6jLe+6HrshshvIuC6IlLMRy7er+JpcKma24SlE4cFZSZJDGVVrsNvitQhQrDhW0jfiOLfFd47C42eHT56D/BK0To+58Ahj+cAT8HT1UWlfLZCCd/uKawzU0Rh2EyIX/Icqth3niG8ybNroezwe6khdCNxRN+l4XGdOLVLlOOt2hTRJlr1ETIuMAltVTMz70mJrkdGAaZLSmnBEqmAE32JCMmuTlCnRgsBENtOUpHhvvsYIL0ibnBkaC6QvKcR7738GKp0AKnim7xgUSNv1bpS8QwhBt8r+EP47v/oyRK/S34yJ9nT+AN0Tkm4OdB9E4BsmXM3SnMlRFUrtp6IDpV2eKzdYvF3etm3KhQksbOLChGkSmcBdmcEwvqkrMy5BzL00NZeu3qPYJOOuCc+5NjcWKXQxFvTa3NoXJ4d8in7fiAUuTt781dkvuHX4K8AA2Usy7yNKLy0AAAAASUVORK5CYII=\n";

    /*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

    /**
 * Module variables.
 * @private
 */

    var matchHtmlRegExp = /["'&<>]/;

    /**
 * Module exports.
 * @public
 */

    var index$1 = escapeHtml;

    /**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

    function escapeHtml(string) {
        var str = '' + string;
        var match = matchHtmlRegExp.exec(str);

        if (!match) {
            return str;
        }

        var escape;
        var html = '';
        var index = 0;
        var lastIndex = 0;

        for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
            case 34:
                // "
                escape = '&quot;';
                break;
            case 38:
                // &
                escape = '&amp;';
                break;
            case 39:
                // '
                escape = '&#39;';
                break;
            case 60:
                // <
                escape = '&lt;';
                break;
            case 62:
                // >
                escape = '&gt;';
                break;
            default:
                continue;
            }

            if (lastIndex !== index) {
                html += str.substring(lastIndex, index);
            }

            lastIndex = index + 1;
            html += escape;
        }

        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }

    var meta = function(dom, data) {
        var head = dom.querySelector("head");
        var appendHead = function(html) {
            return appendHtml(head, html);
        };

        function meta(name, content, force) {
            if (content || force) {
                appendHead(("    <meta name=\"" + name + "\" content=\"" + (index$1(content)) + "\" >\n"));
            }
        }

        appendHead(("\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge,chrome=1\">\n    <link rel=\"icon\" type=\"image/png\" href=\"data:image/png;base64," + favicon + "\">\n    <link href=\"/rss.xml\" rel=\"alternate\" type=\"application/rss+xml\" title=\"Articles from Distill\">\n    <link rel=\"canonical\" href=\"" + (data.url) + "\">\n    <title>" + (data.title) + "</title>\n  "));

        appendHead(("\n    <!--  https://schema.org/Article -->\n    <meta property=\"article:published\" itemprop=\"datePublished\" content=\"" + (data.publishedYear) + "-" + (data.publishedMonthPadded) + "-" + (data.publishedDayPadded) + "\" />\n    <meta property=\"article:created\" itemprop=\"dateCreated\" content=\"" + (data.publishedDate) + "\" />\n    <meta property=\"article:modified\" itemprop=\"dateModified\" content=\"" + (data.updatedDate) + "\" />\n  "));
        data.authors.forEach(function(a) {
            appendHtml(head, ("\n      <meta property=\"article:author\" content=\"" + (a.firstName) + " " + (a.lastName) + "\" />"));
        });

        appendHead(("\n    <!--  https://developers.facebook.com/docs/sharing/webmasters#markup -->\n    <meta property=\"og:type\" content=\"article\"/>\n    <meta property=\"og:title\" content=\"" + (data.title) + "\"/>\n    <meta property=\"og:description\" content=\"" + (data.description) + "\">\n    <meta property=\"og:url\" content=\"" + (data.url) + "\"/>\n    <meta property=\"og:image\" content=\"" + (data.previewURL) + "\"/>\n    <meta property=\"og:locale\" content=\"en_US\" />\n    <meta property=\"og:site_name\" content=\"Distill\" />\n  "));

        appendHead(("\n    <!--  https://dev.twitter.com/cards/types/summary -->\n    <meta name=\"twitter:card\" content=\"summary_large_image\">\n    <meta name=\"twitter:title\" content=\"" + (data.title) + "\">\n    <meta name=\"twitter:description\" content=\"" + (data.description) + "\">\n    <meta name=\"twitter:url\" content=\"" + (data.url) + "\">\n    <meta name=\"twitter:image\" content=\"" + (data.previewURL) + "\">\n    <meta name=\"twitter:image:width\" content=\"560\">\n    <meta name=\"twitter:image:height\" content=\"295\">\n  "));

        // if this is a proprer article, generate Google Scholar meta data
        if (data.doiSuffix) {
            appendHead("\n      <!--  https://scholar.google.com/intl/en/scholar/inclusion.html#indexing -->\n");

            meta("citation_title", data.title);
            //meta("citation_fulltext_html_url", data.url);
            meta("citation_volume", data.volume);
            meta("citation_issue", data.issue);
            meta("citation_firstpage", data.doiSuffix ? ("e" + (data.doiSuffix)) : undefined);
            meta("citation_doi", data.doi);

            var journal = data.journal || {};
            meta("citation_journal_title", journal.full_title || journal.title);
            meta("citation_journal_abbrev", journal.abbrev_title);
            meta("citation_issn", journal.issn);
            meta("citation_publisher", journal.publisher);
            meta("citation_fulltext_world_readable", "", true);

            if (data.publishedDate) {
                var zeroPad = function(n) {
                    return n < 10 ? "0" + n : n;
                };
                meta("citation_online_date", ((data.publishedYear) + "/" + (data.publishedMonthPadded) + "/" + (data.publishedDayPadded)));
                // Should we do something different here?
                meta("citation_publication_date", ((data.publishedYear) + "/" + (data.publishedMonthPadded) + "/" + (data.publishedDayPadded)));
            }

            (data.authors || []).forEach(function(a) {
                meta("citation_author", ((a.lastName) + ", " + (a.firstName)));
                meta("citation_author_institution", a.affiliation);
            });

            if (data.citations) {
                data.citations.forEach(function(key) {
                    var d = data.bibliography[key];
                    if (!d) {
                        console.warn("No bibliography data fround for " + key);
                    } else {
                        meta("citation_reference", citation_meta_content(data.bibliography[key]));
                    }
                });
            }
        }
    };

    function appendHtml(el, html) {
        el.innerHTML += html;
    }

    function citation_meta_content(ref) {
        // Special test for arxiv
        var content = "citation_title=" + (ref.title) + ";";

        var name_strings = ref.author.split(" and ").forEach(function(name) {
            name = name.trim();
            if (name.indexOf(",") != -1) {
                var last = name.split(",")[0].trim();
                var firsts = name.split(",")[1].trim();
            } else {
                var last = name.split(" ").slice(-1)[0].trim();
                var firsts = name.split(" ").slice(0, -1).join(" ");
            }
            content += "citation_author=" + firsts + " " + last + ";";
        });

        if ("year"in ref) {
            content += "citation_publication_date=" + (ref.year) + ";";
        }

        var arxiv_id_search = /https?:\/\/arxiv\.org\/pdf\/([0-9]*\.[0-9]*)\.pdf/.exec(ref.url);
        arxiv_id_search = arxiv_id_search || /https?:\/\/arxiv\.org\/abs\/([0-9]*\.[0-9]*)/.exec(ref.url);
        arxiv_id_search = arxiv_id_search || /arXiv preprint arXiv:([0-9]*\.[0-9]*)/.exec(ref.journal);
        if (arxiv_id_search && arxiv_id_search[1]) {
            content += "citation_arxiv_id=" + (arxiv_id_search[1]) + ";";
            return content;
        }
        if ("journal"in ref) {
            content += "citation_journal_title=" + (ref.journal) + ";";
        }
        if ("volume"in ref) {
            content += "citation_volume=" + (ref.volume) + ";";
        }
        if ("issue"in ref || "number"in ref) {
            content += "citation_number=" + (ref.issue || ref.number) + ";";
        }
        /*content += `citation_first_page=${};`;
  content += `citation_publication_date=${};`;*/
        return content;
    }

    var html$1 = "\n<style>\n  dt-banner {\n    background: #FFF59D;\n    display: block;\n    text-align: center;\n    color: black;\n    height: 70px;\n    line-height: 70px;\n  }\n</style>\n<div>This article is a draft, awaiting review for publication in Distill</div>\n";

    var banner = function(dom, data) {
        var banner = dom.createElement("dt-banner");
        banner.innerHTML = html$1;
        var b = dom.querySelector("body");
        b.insertBefore(banner, b.firstChild);
        banner.addEventListener("click", function() {
            banner.style.display = "none";
        });
    };

    var mustache = createCommonjsModule(function(module, exports) {
        /*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

        /*global define: false Mustache: true*/

        (function defineMustache(global, factory) {
            if ('object' === 'object' && exports && typeof exports.nodeName !== 'string') {
                factory(exports);
                // CommonJS
            } else if (typeof undefined === 'function' && undefined.amd) {
                undefined(['exports'], factory);
                // AMD
            } else {
                global.Mustache = {};
                factory(global.Mustache);
                // script, wsh, asp
            }
        }(commonjsGlobal, function mustacheFactory(mustache) {

            var objectToString = Object.prototype.toString;
            var isArray = Array.isArray || function isArrayPolyfill(object) {
                return objectToString.call(object) === '[object Array]';
            }
            ;

            function isFunction(object) {
                return typeof object === 'function';
            }

            /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
            function typeStr(obj) {
                return isArray(obj) ? 'array' : typeof obj;
            }

            function escapeRegExp(string) {
                return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            }

            /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
            function hasProperty(obj, propName) {
                return obj != null && typeof obj === 'object' && (propName in obj);
            }

            // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
            // See https://github.com/janl/mustache.js/issues/189
            var regExpTest = RegExp.prototype.test;
            function testRegExp(re, string) {
                return regExpTest.call(re, string);
            }

            var nonSpaceRe = /\S/;
            function isWhitespace(string) {
                return !testRegExp(nonSpaceRe, string);
            }

            var entityMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
            };

            function escapeHtml(string) {
                return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
                    return entityMap[s];
                });
            }

            var whiteRe = /\s*/;
            var spaceRe = /\s+/;
            var equalsRe = /\s*=/;
            var curlyRe = /\s*\}/;
            var tagRe = /#|\^|\/|>|\{|&|=|!/;

            /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
            function parseTemplate(template, tags) {
                if (!template) {
                    return [];
                }

                var sections = [];
                // Stack to hold section tokens
                var tokens = [];
                // Buffer to hold the tokens
                var spaces = [];
                // Indices of whitespace tokens on the current line
                var hasTag = false;
                // Is there a {{tag}} on the current line?
                var nonSpace = false;
                // Is there a non-space char on the current line?

                // Strips all whitespace tokens array for the current line
                // if there was a {{#tag}} on it and otherwise only space.
                function stripSpace() {
                    if (hasTag && !nonSpace) {
                        while (spaces.length) {
                            delete tokens[spaces.pop()];
                        }
                    } else {
                        spaces = [];
                    }

                    hasTag = false;
                    nonSpace = false;
                }

                var openingTagRe, closingTagRe, closingCurlyRe;
                function compileTags(tagsToCompile) {
                    if (typeof tagsToCompile === 'string') {
                        tagsToCompile = tagsToCompile.split(spaceRe, 2);
                    }

                    if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) {
                        throw new Error('Invalid tags: ' + tagsToCompile);
                    }

                    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
                    closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
                    closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
                }

                compileTags(tags || mustache.tags);

                var scanner = new Scanner(template);

                var start, type, value, chr, token, openSection;
                while (!scanner.eos()) {
                    start = scanner.pos;

                    // Match any text between tags.
                    value = scanner.scanUntil(openingTagRe);

                    if (value) {
                        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                            chr = value.charAt(i);

                            if (isWhitespace(chr)) {
                                spaces.push(tokens.length);
                            } else {
                                nonSpace = true;
                            }

                            tokens.push(['text', chr, start, start + 1]);
                            start += 1;

                            // Check for whitespace on the current line.
                            if (chr === '\n') {
                                stripSpace();
                            }
                        }
                    }

                    // Match the opening tag.
                    if (!scanner.scan(openingTagRe)) {
                        break;
                    }

                    hasTag = true;

                    // Get the tag type.
                    type = scanner.scan(tagRe) || 'name';
                    scanner.scan(whiteRe);

                    // Get the tag value.
                    if (type === '=') {
                        value = scanner.scanUntil(equalsRe);
                        scanner.scan(equalsRe);
                        scanner.scanUntil(closingTagRe);
                    } else if (type === '{') {
                        value = scanner.scanUntil(closingCurlyRe);
                        scanner.scan(curlyRe);
                        scanner.scanUntil(closingTagRe);
                        type = '&';
                    } else {
                        value = scanner.scanUntil(closingTagRe);
                    }

                    // Match the closing tag.
                    if (!scanner.scan(closingTagRe)) {
                        throw new Error('Unclosed tag at ' + scanner.pos);
                    }

                    token = [type, value, start, scanner.pos];
                    tokens.push(token);

                    if (type === '#' || type === '^') {
                        sections.push(token);
                    } else if (type === '/') {
                        // Check section nesting.
                        openSection = sections.pop();

                        if (!openSection) {
                            throw new Error('Unopened section "' + value + '" at ' + start);
                        }

                        if (openSection[1] !== value) {
                            throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
                        }
                    } else if (type === 'name' || type === '{' || type === '&') {
                        nonSpace = true;
                    } else if (type === '=') {
                        // Set the tags for the next time around.
                        compileTags(value);
                    }
                }

                // Make sure there are no open sections when we're done.
                openSection = sections.pop();

                if (openSection) {
                    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
                }

                return nestTokens(squashTokens(tokens));
            }

            /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
            function squashTokens(tokens) {
                var squashedTokens = [];

                var token, lastToken;
                for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
                    token = tokens[i];

                    if (token) {
                        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                            lastToken[1] += token[1];
                            lastToken[3] = token[3];
                        } else {
                            squashedTokens.push(token);
                            lastToken = token;
                        }
                    }
                }

                return squashedTokens;
            }

            /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
            function nestTokens(tokens) {
                var nestedTokens = [];
                var collector = nestedTokens;
                var sections = [];

                var token, section;
                for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
                    token = tokens[i];

                    switch (token[0]) {
                    case '#':
                    case '^':
                        collector.push(token);
                        sections.push(token);
                        collector = token[4] = [];
                        break;
                    case '/':
                        section = sections.pop();
                        section[5] = token[2];
                        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                        break;
                    default:
                        collector.push(token);
                    }
                }

                return nestedTokens;
            }

            /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
            function Scanner(string) {
                this.string = string;
                this.tail = string;
                this.pos = 0;
            }

            /**
   * Returns `true` if the tail is empty (end of string).
   */
            Scanner.prototype.eos = function eos() {
                return this.tail === '';
            }
            ;

            /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
            Scanner.prototype.scan = function scan(re) {
                var match = this.tail.match(re);

                if (!match || match.index !== 0) {
                    return '';
                }

                var string = match[0];

                this.tail = this.tail.substring(string.length);
                this.pos += string.length;

                return string;
            }
            ;

            /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
            Scanner.prototype.scanUntil = function scanUntil(re) {
                var index = this.tail.search(re), match;

                switch (index) {
                case -1:
                    match = this.tail;
                    this.tail = '';
                    break;
                case 0:
                    match = '';
                    break;
                default:
                    match = this.tail.substring(0, index);
                    this.tail = this.tail.substring(index);
                }

                this.pos += match.length;

                return match;
            }
            ;

            /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
            function Context(view, parentContext) {
                this.view = view;
                this.cache = {
                    '.': this.view
                };
                this.parent = parentContext;
            }

            /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
            Context.prototype.push = function push(view) {
                return new Context(view,this);
            }
            ;

            /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
            Context.prototype.lookup = function lookup(name) {
                var cache = this.cache;

                var value;
                if (cache.hasOwnProperty(name)) {
                    value = cache[name];
                } else {
                    var context = this, names, index, lookupHit = false;

                    while (context) {
                        if (name.indexOf('.') > 0) {
                            value = context.view;
                            names = name.split('.');
                            index = 0;

                            /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
                            while (value != null && index < names.length) {
                                if (index === names.length - 1) {
                                    lookupHit = hasProperty(value, names[index]);
                                }

                                value = value[names[index++]];
                            }
                        } else {
                            value = context.view[name];
                            lookupHit = hasProperty(context.view, name);
                        }

                        if (lookupHit) {
                            break;
                        }

                        context = context.parent;
                    }

                    cache[name] = value;
                }

                if (isFunction(value)) {
                    value = value.call(this.view);
                }

                return value;
            }
            ;

            /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
            function Writer() {
                this.cache = {};
            }

            /**
   * Clears all cached templates in this writer.
   */
            Writer.prototype.clearCache = function clearCache() {
                this.cache = {};
            }
            ;

            /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
            Writer.prototype.parse = function parse(template, tags) {
                var cache = this.cache;
                var tokens = cache[template];

                if (tokens == null) {
                    tokens = cache[template] = parseTemplate(template, tags);
                }

                return tokens;
            }
            ;

            /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
            Writer.prototype.render = function render(template, view, partials) {
                var tokens = this.parse(template);
                var context = (view instanceof Context) ? view : new Context(view);
                return this.renderTokens(tokens, context, partials, template);
            }
            ;

            /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
            Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
                var this$1 = this;

                var buffer = '';

                var token, symbol, value;
                for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
                    value = undefined;
                    token = tokens[i];
                    symbol = token[0];

                    if (symbol === '#') {
                        value = this$1.renderSection(token, context, partials, originalTemplate);
                    } else if (symbol === '^') {
                        value = this$1.renderInverted(token, context, partials, originalTemplate);
                    } else if (symbol === '>') {
                        value = this$1.renderPartial(token, context, partials, originalTemplate);
                    } else if (symbol === '&') {
                        value = this$1.unescapedValue(token, context);
                    } else if (symbol === 'name') {
                        value = this$1.escapedValue(token, context);
                    } else if (symbol === 'text') {
                        value = this$1.rawValue(token);
                    }

                    if (value !== undefined) {
                        buffer += value;
                    }
                }

                return buffer;
            }
            ;

            Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
                var this$1 = this;

                var self = this;
                var buffer = '';
                var value = context.lookup(token[1]);

                // This function is used to render an arbitrary template
                // in the current context by higher-order sections.
                function subRender(template) {
                    return self.render(template, context, partials);
                }

                if (!value) {
                    return;
                }

                if (isArray(value)) {
                    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                        buffer += this$1.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
                    }
                } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
                    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
                } else if (isFunction(value)) {
                    if (typeof originalTemplate !== 'string') {
                        throw new Error('Cannot use higher-order sections without the original template');
                    }

                    // Extract the portion of the original template that the section contains.
                    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

                    if (value != null) {
                        buffer += value;
                    }
                } else {
                    buffer += this.renderTokens(token[4], context, partials, originalTemplate);
                }
                return buffer;
            }
            ;

            Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
                var value = context.lookup(token[1]);

                // Use JavaScript's definition of falsy. Include empty arrays.
                // See https://github.com/janl/mustache.js/issues/186
                if (!value || (isArray(value) && value.length === 0)) {
                    return this.renderTokens(token[4], context, partials, originalTemplate);
                }
            }
            ;

            Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
                if (!partials) {
                    return;
                }

                var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
                if (value != null) {
                    return this.renderTokens(this.parse(value), context, partials, value);
                }
            }
            ;

            Writer.prototype.unescapedValue = function unescapedValue(token, context) {
                var value = context.lookup(token[1]);
                if (value != null) {
                    return value;
                }
            }
            ;

            Writer.prototype.escapedValue = function escapedValue(token, context) {
                var value = context.lookup(token[1]);
                if (value != null) {
                    return mustache.escape(value);
                }
            }
            ;

            Writer.prototype.rawValue = function rawValue(token) {
                return token[1];
            }
            ;

            mustache.name = 'mustache.js';
            mustache.version = '2.3.0';
            mustache.tags = ['{{', '}}'];

            // All high-level mustache.* functions use this writer.
            var defaultWriter = new Writer();

            /**
   * Clears all cached templates in the default writer.
   */
            mustache.clearCache = function clearCache() {
                return defaultWriter.clearCache();
            }
            ;

            /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
            mustache.parse = function parse(template, tags) {
                return defaultWriter.parse(template, tags);
            }
            ;

            /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
            mustache.render = function render(template, view, partials) {
                if (typeof template !== 'string') {
                    throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
                }

                return defaultWriter.render(template, view, partials);
            }
            ;

            // This is here for backwards compatibility with 0.4.x.,
            /*eslint-disable */
            // eslint wants camel cased function name
            mustache.to_html = function to_html(template, view, partials, send) {
                /*eslint-enable*/

                var result = mustache.render(template, view, partials);

                if (isFunction(send)) {
                    send(result);
                } else {
                    return result;
                }
            }
            ;

            // Export the escaping function so that the user may override it.
            // See https://github.com/janl/mustache.js/issues/244
            mustache.escape = escapeHtml;

            // Export these mainly for testing, but also for advanced usage.
            mustache.Scanner = Scanner;
            mustache.Context = Context;
            mustache.Writer = Writer;

            return mustache;
        }));
    });

    var html$2 = "\n<style>\n  dt-byline {\n    font-size: 12px;\n    line-height: 18px;\n    display: block;\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    color: rgba(0, 0, 0, 0.5);\n    padding-top: 12px;\n    padding-bottom: 12px;\n  }\n  dt-article.centered dt-byline {\n    text-align: center;\n\n  }\n  dt-byline a,\n  dt-article dt-byline a {\n    text-decoration: none;\n    border-bottom: none;\n  }\n  dt-article dt-byline a:hover {\n    text-decoration: underline;\n    border-bottom: none;\n  }\n  dt-byline .authors {\n    text-align: left;\n  }\n  dt-byline .name {\n    display: inline;\n    text-transform: uppercase;\n  }\n  dt-byline .affiliation {\n    display: inline;\n  }\n  dt-byline .date {\n    display: block;\n    text-align: left;\n  }\n  dt-byline .year, dt-byline .month {\n    display: inline;\n  }\n  dt-byline .citation {\n    display: block;\n    text-align: left;\n  }\n  dt-byline .citation div {\n    display: inline;\n  }\n\n  @media(min-width: 768px) {\n    dt-byline {\n    }\n  }\n\n  @media(min-width: 1080px) {\n    dt-byline {\n      border-bottom: none;\n      margin-bottom: 70px;\n    }\n\n    dt-byline a:hover {\n      color: rgba(0, 0, 0, 0.9);\n    }\n\n    dt-byline .authors {\n      display: inline-block;\n    }\n\n    dt-byline .author {\n      display: inline-block;\n      margin-right: 12px;\n      /*padding-left: 20px;*/\n      /*border-left: 1px solid #ddd;*/\n    }\n\n    dt-byline .affiliation {\n      display: block;\n    }\n\n    dt-byline .author:last-child {\n      margin-right: 0;\n    }\n\n    dt-byline .name {\n      display: block;\n    }\n\n    dt-byline .date {\n      border-left: 1px solid rgba(0, 0, 0, 0.1);\n      padding-left: 15px;\n      margin-left: 15px;\n      display: inline-block;\n    }\n    dt-byline .year, dt-byline .month {\n      display: block;\n    }\n\n    dt-byline .citation {\n      border-left: 1px solid rgba(0, 0, 0, 0.15);\n      padding-left: 15px;\n      margin-left: 15px;\n      display: inline-block;\n    }\n    dt-byline .citation div {\n      display: block;\n    }\n  }\n</style>\n\n";

    var template = "\n<div class=\"byline\">\n  <div class=\"authors\">\n  {{#authors}}\n    <div class=\"author\">\n      {{#personalURL}}\n        <a class=\"name\" href=\"{{personalURL}}\">{{name}}</a>\n      {{/personalURL}}\n      {{^personalURL}}\n        <div class=\"name\">{{name}}</div>\n      {{/personalURL}}\n      {{#affiliation}}\n        {{#affiliationURL}}\n          <a class=\"affiliation\" href=\"{{affiliationURL}}\">{{affiliation}}</a>\n        {{/affiliationURL}}\n        {{^affiliationURL}}\n          <div class=\"affiliation\">{{affiliation}}</div>\n        {{/affiliationURL}}\n      {{/affiliation}}\n    </div>\n    {{/authors}}\n  </div>\n  {{#publishedYear}}\n  <div class=\"date\">\n    <div class=\"month\">{{publishedMonth}}. {{publishedDay}}</div>\n    <div class=\"year\">{{publishedYear}}</div>\n  </div>\n  {{/publishedYear}}\n  {{#publishedYear}}\n  <a class=\"citation\" href=\"#citation\">\n    <div>Citation:</div>\n    <div>{{concatenatedAuthors}}, {{publishedYear}}</div>\n  </a>\n  {{/publishedYear}}\n</div>\n";

    var byline = function(dom, data) {
        var el = dom.querySelector('dt-byline');
        if (el) {
            el.innerHTML = html$2 + mustache.render(template, data);
        }
    };

    var templateHTML = "\n<style>\n  dt-appendix {\n    display: block;\n    font-size: 14px;\n    line-height: 24px;\n    margin-bottom: 0;\n    border-top: 1px solid rgba(0,0,0,0.1);\n    color: rgba(0,0,0,0.5);\n    background: rgb(250, 250, 250);\n    padding-top: 36px;\n    padding-bottom: 60px;\n  }\n  dt-appendix h3 {\n    font-size: 16px;\n    font-weight: 500;\n    margin-top: 18px;\n    margin-bottom: 18px;\n    color: rgba(0,0,0,0.65);\n  }\n  dt-appendix .citation {\n    font-size: 11px;\n    line-height: 15px;\n    border-left: 1px solid rgba(0, 0, 0, 0.1);\n    padding-left: 18px;\n    border: 1px solid rgba(0,0,0,0.1);\n    background: rgba(0, 0, 0, 0.02);\n    padding: 10px 18px;\n    border-radius: 3px;\n    color: rgba(150, 150, 150, 1);\n    overflow: hidden;\n    margin-top: -12px;\n  }\n  dt-appendix .references {\n    font-size: 12px;\n    line-height: 20px;\n  }\n  dt-appendix a {\n    color: rgba(0, 0, 0, 0.6);\n  }\n  dt-appendix ol,\n  dt-appendix ul {\n    padding-left: 24px;\n  }\n</style>\n\n<div class=\"l-body\">\n</div>\n";

    var appendix = function(dom, data) {
        var el = dom.querySelector('dt-appendix');
        if (el) {
            var userHTML = el.innerHTML;
            el.innerHTML = templateHTML;
            var newHTML = "";

            // If we have some footnotes on the page, render a container for the footnote list.
            if (dom.querySelector("dt-fn")) {
                newHTML = newHTML + "<h3>Footnotes</h3><dt-fn-list></dt-fn-list>";
            }

            // If we have any citations on the page, render a container for the bibliography.
            if (dom.querySelector("dt-cite")) {
                newHTML = newHTML + "<h3>References</h3><dt-bibliography></dt-bibliography>";
            }

            var div = el.querySelector("div.l-body");
            div.innerHTML = userHTML + newHTML;
        }

    };

    var appendixDistill = function(dom, data) {
        var el = dom.querySelector('dt-appendix > div');
        if (el) {
            var newHTML = "";

            newHTML += "<h3>Updates and Corrections</h3>\n    <p><a href=\"" + (data.githubCompareUpdatesUrl) + "\">View all changes</a> to this article since it was first published. If you see a mistake or want to suggest a change, please <a class=\"github-issue\" href=\"" + (data.githubUrl) + "/issues/new\">create an issue on GitHub</a>.</p>";

            newHTML += "<h3 id=\"citation\">Citations and Reuse</h3>\n    <p>Diagrams and text are licensed under Creative Commons Attribution <a href=\"https://creativecommons.org/licenses/by/2.0/\">CC-BY 2.0</a>, unless noted otherwise, with the <a class=\"github\" href=\"" + (data.githubUrl) + "\">source available on GitHub</a>. The figures that have been reused from other sources don't fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>\n\n    <p>For attribution in academic contexts, please cite this work as</p>\n    <pre class=\"citation short\">" + (data.concatenatedAuthors) + ", \"" + (data.title) + "\", " + (data.journal.title) + ", " + (data.publishedYear) + ". http://doi.org/" + (data.doi) + "</pre>\n\n    <p>BibTeX citation</p>\n<pre class=\"citation long\">@article{" + (data.slug) + ",\n  author = {" + (data.bibtexAuthors) + "},\n  title = {" + (data.title) + "},\n  journal = {" + (data.journal.title) + "},\n  year = {" + (data.publishedYear) + "},\n  url = {" + (data.url) + "},\n  doi = {" + (data.doi) + "}\n}</pre>";

            var existingHTML = el.innerHTML;
            el.innerHTML = existingHTML + newHTML;
        }
    };

    var citation = function(dom, data) {
        var css = "\n    dt-cite {\n      color: hsla(206, 90%, 20%, 0.7);\n    }\n    dt-cite .citation-number {\n      cursor: default;\n      white-space: nowrap;\n      font-family: -apple-system, BlinkMacSystemFont, \"Roboto\", Helvetica, sans-serif;\n      font-size: 75%;\n      color: hsla(206, 90%, 20%, 0.7);\n      display: inline-block;\n      line-height: 1.1em;\n      text-align: center;\n      position: relative;\n      top: -2px;\n      margin: 0 2px;\n    }\n    figcaption dt-cite .citation-number {\n      font-size: 11px;\n      font-weight: normal;\n      top: -2px;\n      line-height: 1em;\n    }\n  ";

        var style = dom.createElement("style");
        style.textContent = css;
        dom.querySelector("body").appendChild(style);

        var citations = data.citations;
        /*if (data.citations) {
    citations = Object.keys(data.citations).map(c => data.citations[c]);
    citations.sort((a, b) => {
      return a.author.localeCompare(b.author);
    });
  }*/

        var appendCiteHoverDiv = (function() {
            function nodeFromString(str) {
                var div = dom.createElement("div");
                div.innerHTML = str;
                return div.firstChild;
            }
            var hover_boxes_container = nodeFromString("<div id=\"cite-hover-boxes-container\"></div>");
            dom.querySelector("body").appendChild(hover_boxes_container);
            var hover_n = 0;
            return function appendHoverDiv(content) {
                var id = "dt-cite-hover-box-" + hover_n;
                hover_n += 1;
                var str = "<div style=\"display:none;\" class=\"dt-hover-box\" id=\"" + id + "\" >" + content + "</div>";
                var div = nodeFromString(str);
                hover_boxes_container.appendChild(div);
                return id;
            }
        }
        )();

        var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
        citeTags.forEach(function(el, n) {
            var key = el.getAttribute("key");
            if (key) {
                var keys = key.split(",");
                var cite_string = inline_cite_short(keys);
                var cite_hover_str = "";
                keys.map(function(key, n) {
                    if (n > 0) {
                        cite_hover_str += "<br><br>";
                    }
                    cite_hover_str += hover_cite(data.bibliography[key]);
                });
                var ref_id = appendCiteHoverDiv(cite_hover_str);
                //cite_hover_str = cite_hover_str.replace(/"/g, "&#39;")
                var orig_string = el.innerHTML;
                if (orig_string != "") {
                    orig_string += " ";
                }
                el.innerHTML = "<span id=\"citation-" + n + "\" data-hover-ref=\"" + ref_id + "\">" + orig_string + "<span class=\"citation-number\">" + cite_string + "</span></span>";
            }
        });

        var bibEl = dom.querySelector("dt-bibliography");
        if (bibEl) {
            var ol = dom.createElement("ol");
            citations.forEach(function(key) {
                var el = dom.createElement("li");
                el.innerHTML = bibliography_cite(data.bibliography[key]);
                ol.appendChild(el);
            });
            bibEl.appendChild(ol);
        }

        function inline_cite_short(keys) {
            function cite_string(key) {
                if (key in data.bibliography) {
                    var n = data.citations.indexOf(key) + 1;
                    return "" + n;
                } else {
                    return "?";
                }
            }
            return "[" + keys.map(cite_string).join(", ") + "]";
        }

        function inline_cite_long(keys) {
            function cite_string(key) {
                if (key in data.bibliography) {
                    var ent = data.bibliography[key];
                    var names = ent.author.split(" and ");
                    names = names.map(function(name) {
                        return name.split(",")[0].trim();
                    });
                    var year = ent.year;
                    if (names.length == 1) {
                        return names[0] + ", " + year;
                    }
                    if (names.length == 2) {
                        return names[0] + " & " + names[1] + ", " + year;
                    }
                    if (names.length > 2) {
                        return names[0] + ", et al., " + year;
                    }
                } else {
                    return "?";
                }
            }
            return keys.map(cite_string).join(", ");
        }

        function author_string(ent, template, sep, finalSep) {
            var names = ent.author.split(" and ");
            var name_strings = names.map(function(name) {
                name = name.trim();
                if (name.indexOf(",") != -1) {
                    var last = name.split(",")[0].trim();
                    var firsts = name.split(",")[1];
                } else {
                    var last = name.split(" ").slice(-1)[0].trim();
                    var firsts = name.split(" ").slice(0, -1).join(" ");
                }
                var initials = "";
                if (firsts != undefined) {
                    initials = firsts.trim().split(" ").map(function(s) {
                        return s.trim()[0];
                    });
                    initials = initials.join(".") + ".";
                }
                return template.replace("${F}", firsts).replace("${L}", last).replace("${I}", initials);
            });
            if (names.length > 1) {
                var str = name_strings.slice(0, names.length - 1).join(sep);
                str += (finalSep || sep) + name_strings[names.length - 1];
                return str;
            } else {
                return name_strings[0];
            }
        }

        function venue_string(ent) {
            var cite = (ent.journal || ent.booktitle || "");
            if ("volume"in ent) {
                var issue = ent.issue || ent.number;
                issue = (issue != undefined) ? "(" + issue + ")" : "";
                cite += ", Vol " + ent.volume + issue;
            }
            if ("pages"in ent) {
                cite += ", pp. " + ent.pages;
            }
            if (cite != "") {
                cite += ". ";
            }
            if ("publisher"in ent) {
                cite += ent.publisher;
                if (cite[cite.length - 1] != ".") {
                    cite += ".";
                }
            }
            return cite;
        }

        function link_string(ent) {
            if ("url"in ent) {
                var url = ent.url;
                var arxiv_match = (/arxiv\.org\/abs\/([0-9\.]*)/).exec(url);
                if (arxiv_match != null) {
                    url = "http://arxiv.org/pdf/" + (arxiv_match[1]) + ".pdf";
                }

                if (url.slice(-4) == ".pdf") {
                    var label = "PDF";
                } else if (url.slice(-5) == ".html") {
                    var label = "HTML";
                }
                return (" &ensp;<a href=\"" + url + "\">[" + (label || "link") + "]</a>");
            }/* else if ("doi" in ent){
      return ` &ensp;<a href="https://doi.org/${ent.doi}" >[DOI]</a>`;
    }*/
            else {
                return "";
            }
        }
        function doi_string(ent, new_line) {
            if ("doi"in ent) {
                return ((new_line ? "<br>" : "") + " <a href=\"https://doi.org/" + (ent.doi) + "\" style=\"text-decoration:inherit;\">DOI: " + (ent.doi) + "</a>");
            } else {
                return "";
            }
        }

        function bibliography_cite(ent, fancy) {
            if (ent) {
                var cite = "<b>" + ent.title + "</b> ";
                cite += link_string(ent) + "<br>";
                cite += author_string(ent, "${L}, ${I}", ", ", " and ");
                if (ent.year || ent.date) {
                    cite += ", " + (ent.year || ent.date) + ". ";
                } else {
                    cite += ". ";
                }
                cite += venue_string(ent);
                cite += doi_string(ent);
                return cite
                /*var cite =  author_string(ent, "${L}, ${I}", ", ", " and ");
      if (ent.year || ent.date){
        cite += ", " + (ent.year || ent.date) + ". "
      } else {
        cite += ". "
      }
      cite += "<b>" + ent.title + "</b>. ";
      cite += venue_string(ent);
      cite += doi_string(ent);
      cite += link_string(ent);
      return cite*/
            } else {
                return "?";
            }
        }

        function hover_cite(ent) {
            if (ent) {
                var cite = "";
                cite += "<b>" + ent.title + "</b>";
                cite += link_string(ent);
                cite += "<br>";

                var a_str = author_string(ent, "${I} ${L}", ", ") + ".";
                var v_str = venue_string(ent).trim() + " " + ent.year + ". " + doi_string(ent, true);

                if ((a_str + v_str).length < Math.min(40, ent.title.length)) {
                    cite += a_str + " " + v_str;
                } else {
                    cite += a_str + "<br>" + v_str;
                }
                return cite;
            } else {
                return "?";
            }
        }

        //https://scholar.google.com/scholar?q=allintitle%3ADocument+author%3Aolah
        function get_GS_URL(ent) {
            if (ent) {
                var names = ent.author.split(" and ");
                names = names.map(function(name) {
                    return name.split(",")[0].trim();
                });
                var title = ent.title.split(" ");
                //.replace(/[,:]/, "")
                var url = "http://search.labs.crossref.org/dois?";
                //""https://scholar.google.com/scholar?"
                url += uris({
                    q: names.join(" ") + " " + title.join(" ")
                });
            }

        }
    };

    var footnote = function(dom, data) {

        var appendFootnoteHoverDiv = (function() {
            function nodeFromString(str) {
                var div = dom.createElement("div");
                div.innerHTML = str;
                return div.firstChild;
            }
            var hover_boxes_container = nodeFromString("<div id=\"footnote-hover-boxes-container\"></div>");
            dom.querySelector("body").appendChild(hover_boxes_container);
            var hover_n = 0;
            return function appendHoverDiv(content) {
                var id = "dt-fn-hover-box-" + hover_n;
                hover_n += 1;
                var str = "<div style=\"display:none;\" class=\"dt-hover-box\" id=\"" + id + "\" >" + content + "</div>";
                var div = nodeFromString(str);
                hover_boxes_container.appendChild(div);
                return id;
            }
        }
        )();

        var fnTags = [].slice.apply(dom.querySelectorAll("dt-fn"));
        var fnContent = [];
        fnTags.forEach(function(el, n) {
            var content = el.innerHTML;
            var ref_id = appendFootnoteHoverDiv(content);
            fnContent.push(content);
            n = (n + 1) + "";
            var key = "fn-" + n;
            var escaped_content = content.replace(/"/g, "&#39;");
            el.innerHTML = "<sup><span id=\"" + key + "\" data-hover-ref=\"" + ref_id + "\" style=\"cursor:pointer\">" + n + "</span></sup>";
        });

        var fnList = dom.querySelector("dt-fn-list");
        if (fnList) {
            var ol = dom.createElement("ol");
            fnContent.forEach(function(content) {
                var el = dom.createElement("li");
                el.innerHTML = content;
                ol.appendChild(el);
            });
            fnList.appendChild(ol);
        }

    };

    /**
 * This is the ParseError class, which is the main error thrown by KaTeX
 * functions when something has gone wrong. This is used to distinguish internal
 * errors from errors in the expression that the user provided.
 *
 * If possible, a caller should provide a Token or ParseNode with information
 * about where in the source string the problem occurred.
 *
 * @param {string} message  The error message
 * @param {(Token|ParseNode)=} token  An object providing position information
 */
    function ParseError$1(message, token) {
        var error = "KaTeX parse error: " + message;
        var start;
        var end;

        if (token && token.lexer && token.start <= token.end) {
            // If we have the input and a position, make the error a bit fancier

            // Get the input
            var input = token.lexer.input;

            // Prepend some information
            start = token.start;
            end = token.end;
            if (start === input.length) {
                error += " at end of input: ";
            } else {
                error += " at position " + (start + 1) + ": ";
            }

            // Underline token in question using combining underscores
            var underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332");

            // Extract some context from the input and add it to the error
            var left;
            if (start > 15) {
                left = "…" + input.slice(start - 15, start);
            } else {
                left = input.slice(0, start);
            }
            var right;
            if (end + 15 < input.length) {
                right = input.slice(end, end + 15) + "…";
            } else {
                right = input.slice(end);
            }
            error += left + underlined + right;
        }

        // Some hackery to make ParseError a prototype of Error
        // See http://stackoverflow.com/a/8460753
        var self = new Error(error);
        self.name = "ParseError";
        self.__proto__ = ParseError$1.prototype;

        self.position = start;
        return self;
    }

    // More hackery
    ParseError$1.prototype.__proto__ = Error.prototype;

    var ParseError_1 = ParseError$1;

    /**
 * This is a module for storing settings passed into KaTeX. It correctly handles
 * default settings.
 */

    /**
 * Helper function for getting a default value if the value is undefined
 */
    function get(option, defaultValue) {
        return option === undefined ? defaultValue : option;
    }

    /**
 * The main Settings object
 *
 * The current options stored are:
 *  - displayMode: Whether the expression should be typeset by default in
 *                 textstyle or displaystyle (default false)
 */
    function Settings$1(options) {
        // allow null options
        options = options || {};
        this.displayMode = get(options.displayMode, false);
        this.throwOnError = get(options.throwOnError, true);
        this.errorColor = get(options.errorColor, "#cc0000");
        this.macros = options.macros || {};
    }

    var Settings_1 = Settings$1;

    var hangulRegex = /[\uAC00-\uD7AF]/;

    // This regex combines
    // - Hiragana: [\u3040-\u309F]
    // - Katakana: [\u30A0-\u30FF]
    // - CJK ideograms: [\u4E00-\u9FAF]
    // - Hangul syllables: [\uAC00-\uD7AF]
    // Notably missing are halfwidth Katakana and Romanji glyphs.
    var cjkRegex$1 = /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]|[\uAC00-\uD7AF]/;

    var unicodeRegexes = {
        cjkRegex: cjkRegex$1,
        hangulRegex: hangulRegex
    };

    var fontMetricsData = {
        "AMS-Regular": {
            "65": [0, 0.68889, 0, 0],
            "66": [0, 0.68889, 0, 0],
            "67": [0, 0.68889, 0, 0],
            "68": [0, 0.68889, 0, 0],
            "69": [0, 0.68889, 0, 0],
            "70": [0, 0.68889, 0, 0],
            "71": [0, 0.68889, 0, 0],
            "72": [0, 0.68889, 0, 0],
            "73": [0, 0.68889, 0, 0],
            "74": [0.16667, 0.68889, 0, 0],
            "75": [0, 0.68889, 0, 0],
            "76": [0, 0.68889, 0, 0],
            "77": [0, 0.68889, 0, 0],
            "78": [0, 0.68889, 0, 0],
            "79": [0.16667, 0.68889, 0, 0],
            "80": [0, 0.68889, 0, 0],
            "81": [0.16667, 0.68889, 0, 0],
            "82": [0, 0.68889, 0, 0],
            "83": [0, 0.68889, 0, 0],
            "84": [0, 0.68889, 0, 0],
            "85": [0, 0.68889, 0, 0],
            "86": [0, 0.68889, 0, 0],
            "87": [0, 0.68889, 0, 0],
            "88": [0, 0.68889, 0, 0],
            "89": [0, 0.68889, 0, 0],
            "90": [0, 0.68889, 0, 0],
            "107": [0, 0.68889, 0, 0],
            "165": [0, 0.675, 0.025, 0],
            "174": [0.15559, 0.69224, 0, 0],
            "240": [0, 0.68889, 0, 0],
            "295": [0, 0.68889, 0, 0],
            "710": [0, 0.825, 0, 0],
            "732": [0, 0.9, 0, 0],
            "770": [0, 0.825, 0, 0],
            "771": [0, 0.9, 0, 0],
            "989": [0.08167, 0.58167, 0, 0],
            "1008": [0, 0.43056, 0.04028, 0],
            "8245": [0, 0.54986, 0, 0],
            "8463": [0, 0.68889, 0, 0],
            "8487": [0, 0.68889, 0, 0],
            "8498": [0, 0.68889, 0, 0],
            "8502": [0, 0.68889, 0, 0],
            "8503": [0, 0.68889, 0, 0],
            "8504": [0, 0.68889, 0, 0],
            "8513": [0, 0.68889, 0, 0],
            "8592": [-0.03598, 0.46402, 0, 0],
            "8594": [-0.03598, 0.46402, 0, 0],
            "8602": [-0.13313, 0.36687, 0, 0],
            "8603": [-0.13313, 0.36687, 0, 0],
            "8606": [0.01354, 0.52239, 0, 0],
            "8608": [0.01354, 0.52239, 0, 0],
            "8610": [0.01354, 0.52239, 0, 0],
            "8611": [0.01354, 0.52239, 0, 0],
            "8619": [0, 0.54986, 0, 0],
            "8620": [0, 0.54986, 0, 0],
            "8621": [-0.13313, 0.37788, 0, 0],
            "8622": [-0.13313, 0.36687, 0, 0],
            "8624": [0, 0.69224, 0, 0],
            "8625": [0, 0.69224, 0, 0],
            "8630": [0, 0.43056, 0, 0],
            "8631": [0, 0.43056, 0, 0],
            "8634": [0.08198, 0.58198, 0, 0],
            "8635": [0.08198, 0.58198, 0, 0],
            "8638": [0.19444, 0.69224, 0, 0],
            "8639": [0.19444, 0.69224, 0, 0],
            "8642": [0.19444, 0.69224, 0, 0],
            "8643": [0.19444, 0.69224, 0, 0],
            "8644": [0.1808, 0.675, 0, 0],
            "8646": [0.1808, 0.675, 0, 0],
            "8647": [0.1808, 0.675, 0, 0],
            "8648": [0.19444, 0.69224, 0, 0],
            "8649": [0.1808, 0.675, 0, 0],
            "8650": [0.19444, 0.69224, 0, 0],
            "8651": [0.01354, 0.52239, 0, 0],
            "8652": [0.01354, 0.52239, 0, 0],
            "8653": [-0.13313, 0.36687, 0, 0],
            "8654": [-0.13313, 0.36687, 0, 0],
            "8655": [-0.13313, 0.36687, 0, 0],
            "8666": [0.13667, 0.63667, 0, 0],
            "8667": [0.13667, 0.63667, 0, 0],
            "8669": [-0.13313, 0.37788, 0, 0],
            "8672": [-0.064, 0.437, 0, 0],
            "8674": [-0.064, 0.437, 0, 0],
            "8705": [0, 0.825, 0, 0],
            "8708": [0, 0.68889, 0, 0],
            "8709": [0.08167, 0.58167, 0, 0],
            "8717": [0, 0.43056, 0, 0],
            "8722": [-0.03598, 0.46402, 0, 0],
            "8724": [0.08198, 0.69224, 0, 0],
            "8726": [0.08167, 0.58167, 0, 0],
            "8733": [0, 0.69224, 0, 0],
            "8736": [0, 0.69224, 0, 0],
            "8737": [0, 0.69224, 0, 0],
            "8738": [0.03517, 0.52239, 0, 0],
            "8739": [0.08167, 0.58167, 0, 0],
            "8740": [0.25142, 0.74111, 0, 0],
            "8741": [0.08167, 0.58167, 0, 0],
            "8742": [0.25142, 0.74111, 0, 0],
            "8756": [0, 0.69224, 0, 0],
            "8757": [0, 0.69224, 0, 0],
            "8764": [-0.13313, 0.36687, 0, 0],
            "8765": [-0.13313, 0.37788, 0, 0],
            "8769": [-0.13313, 0.36687, 0, 0],
            "8770": [-0.03625, 0.46375, 0, 0],
            "8774": [0.30274, 0.79383, 0, 0],
            "8776": [-0.01688, 0.48312, 0, 0],
            "8778": [0.08167, 0.58167, 0, 0],
            "8782": [0.06062, 0.54986, 0, 0],
            "8783": [0.06062, 0.54986, 0, 0],
            "8785": [0.08198, 0.58198, 0, 0],
            "8786": [0.08198, 0.58198, 0, 0],
            "8787": [0.08198, 0.58198, 0, 0],
            "8790": [0, 0.69224, 0, 0],
            "8791": [0.22958, 0.72958, 0, 0],
            "8796": [0.08198, 0.91667, 0, 0],
            "8806": [0.25583, 0.75583, 0, 0],
            "8807": [0.25583, 0.75583, 0, 0],
            "8808": [0.25142, 0.75726, 0, 0],
            "8809": [0.25142, 0.75726, 0, 0],
            "8812": [0.25583, 0.75583, 0, 0],
            "8814": [0.20576, 0.70576, 0, 0],
            "8815": [0.20576, 0.70576, 0, 0],
            "8816": [0.30274, 0.79383, 0, 0],
            "8817": [0.30274, 0.79383, 0, 0],
            "8818": [0.22958, 0.72958, 0, 0],
            "8819": [0.22958, 0.72958, 0, 0],
            "8822": [0.1808, 0.675, 0, 0],
            "8823": [0.1808, 0.675, 0, 0],
            "8828": [0.13667, 0.63667, 0, 0],
            "8829": [0.13667, 0.63667, 0, 0],
            "8830": [0.22958, 0.72958, 0, 0],
            "8831": [0.22958, 0.72958, 0, 0],
            "8832": [0.20576, 0.70576, 0, 0],
            "8833": [0.20576, 0.70576, 0, 0],
            "8840": [0.30274, 0.79383, 0, 0],
            "8841": [0.30274, 0.79383, 0, 0],
            "8842": [0.13597, 0.63597, 0, 0],
            "8843": [0.13597, 0.63597, 0, 0],
            "8847": [0.03517, 0.54986, 0, 0],
            "8848": [0.03517, 0.54986, 0, 0],
            "8858": [0.08198, 0.58198, 0, 0],
            "8859": [0.08198, 0.58198, 0, 0],
            "8861": [0.08198, 0.58198, 0, 0],
            "8862": [0, 0.675, 0, 0],
            "8863": [0, 0.675, 0, 0],
            "8864": [0, 0.675, 0, 0],
            "8865": [0, 0.675, 0, 0],
            "8872": [0, 0.69224, 0, 0],
            "8873": [0, 0.69224, 0, 0],
            "8874": [0, 0.69224, 0, 0],
            "8876": [0, 0.68889, 0, 0],
            "8877": [0, 0.68889, 0, 0],
            "8878": [0, 0.68889, 0, 0],
            "8879": [0, 0.68889, 0, 0],
            "8882": [0.03517, 0.54986, 0, 0],
            "8883": [0.03517, 0.54986, 0, 0],
            "8884": [0.13667, 0.63667, 0, 0],
            "8885": [0.13667, 0.63667, 0, 0],
            "8888": [0, 0.54986, 0, 0],
            "8890": [0.19444, 0.43056, 0, 0],
            "8891": [0.19444, 0.69224, 0, 0],
            "8892": [0.19444, 0.69224, 0, 0],
            "8901": [0, 0.54986, 0, 0],
            "8903": [0.08167, 0.58167, 0, 0],
            "8905": [0.08167, 0.58167, 0, 0],
            "8906": [0.08167, 0.58167, 0, 0],
            "8907": [0, 0.69224, 0, 0],
            "8908": [0, 0.69224, 0, 0],
            "8909": [-0.03598, 0.46402, 0, 0],
            "8910": [0, 0.54986, 0, 0],
            "8911": [0, 0.54986, 0, 0],
            "8912": [0.03517, 0.54986, 0, 0],
            "8913": [0.03517, 0.54986, 0, 0],
            "8914": [0, 0.54986, 0, 0],
            "8915": [0, 0.54986, 0, 0],
            "8916": [0, 0.69224, 0, 0],
            "8918": [0.0391, 0.5391, 0, 0],
            "8919": [0.0391, 0.5391, 0, 0],
            "8920": [0.03517, 0.54986, 0, 0],
            "8921": [0.03517, 0.54986, 0, 0],
            "8922": [0.38569, 0.88569, 0, 0],
            "8923": [0.38569, 0.88569, 0, 0],
            "8926": [0.13667, 0.63667, 0, 0],
            "8927": [0.13667, 0.63667, 0, 0],
            "8928": [0.30274, 0.79383, 0, 0],
            "8929": [0.30274, 0.79383, 0, 0],
            "8934": [0.23222, 0.74111, 0, 0],
            "8935": [0.23222, 0.74111, 0, 0],
            "8936": [0.23222, 0.74111, 0, 0],
            "8937": [0.23222, 0.74111, 0, 0],
            "8938": [0.20576, 0.70576, 0, 0],
            "8939": [0.20576, 0.70576, 0, 0],
            "8940": [0.30274, 0.79383, 0, 0],
            "8941": [0.30274, 0.79383, 0, 0],
            "8994": [0.19444, 0.69224, 0, 0],
            "8995": [0.19444, 0.69224, 0, 0],
            "9416": [0.15559, 0.69224, 0, 0],
            "9484": [0, 0.69224, 0, 0],
            "9488": [0, 0.69224, 0, 0],
            "9492": [0, 0.37788, 0, 0],
            "9496": [0, 0.37788, 0, 0],
            "9585": [0.19444, 0.68889, 0, 0],
            "9586": [0.19444, 0.74111, 0, 0],
            "9632": [0, 0.675, 0, 0],
            "9633": [0, 0.675, 0, 0],
            "9650": [0, 0.54986, 0, 0],
            "9651": [0, 0.54986, 0, 0],
            "9654": [0.03517, 0.54986, 0, 0],
            "9660": [0, 0.54986, 0, 0],
            "9661": [0, 0.54986, 0, 0],
            "9664": [0.03517, 0.54986, 0, 0],
            "9674": [0.11111, 0.69224, 0, 0],
            "9733": [0.19444, 0.69224, 0, 0],
            "10003": [0, 0.69224, 0, 0],
            "10016": [0, 0.69224, 0, 0],
            "10731": [0.11111, 0.69224, 0, 0],
            "10846": [0.19444, 0.75583, 0, 0],
            "10877": [0.13667, 0.63667, 0, 0],
            "10878": [0.13667, 0.63667, 0, 0],
            "10885": [0.25583, 0.75583, 0, 0],
            "10886": [0.25583, 0.75583, 0, 0],
            "10887": [0.13597, 0.63597, 0, 0],
            "10888": [0.13597, 0.63597, 0, 0],
            "10889": [0.26167, 0.75726, 0, 0],
            "10890": [0.26167, 0.75726, 0, 0],
            "10891": [0.48256, 0.98256, 0, 0],
            "10892": [0.48256, 0.98256, 0, 0],
            "10901": [0.13667, 0.63667, 0, 0],
            "10902": [0.13667, 0.63667, 0, 0],
            "10933": [0.25142, 0.75726, 0, 0],
            "10934": [0.25142, 0.75726, 0, 0],
            "10935": [0.26167, 0.75726, 0, 0],
            "10936": [0.26167, 0.75726, 0, 0],
            "10937": [0.26167, 0.75726, 0, 0],
            "10938": [0.26167, 0.75726, 0, 0],
            "10949": [0.25583, 0.75583, 0, 0],
            "10950": [0.25583, 0.75583, 0, 0],
            "10955": [0.28481, 0.79383, 0, 0],
            "10956": [0.28481, 0.79383, 0, 0],
            "57350": [0.08167, 0.58167, 0, 0],
            "57351": [0.08167, 0.58167, 0, 0],
            "57352": [0.08167, 0.58167, 0, 0],
            "57353": [0, 0.43056, 0.04028, 0],
            "57356": [0.25142, 0.75726, 0, 0],
            "57357": [0.25142, 0.75726, 0, 0],
            "57358": [0.41951, 0.91951, 0, 0],
            "57359": [0.30274, 0.79383, 0, 0],
            "57360": [0.30274, 0.79383, 0, 0],
            "57361": [0.41951, 0.91951, 0, 0],
            "57366": [0.25142, 0.75726, 0, 0],
            "57367": [0.25142, 0.75726, 0, 0],
            "57368": [0.25142, 0.75726, 0, 0],
            "57369": [0.25142, 0.75726, 0, 0],
            "57370": [0.13597, 0.63597, 0, 0],
            "57371": [0.13597, 0.63597, 0, 0]
        },
        "Caligraphic-Regular": {
            "48": [0, 0.43056, 0, 0],
            "49": [0, 0.43056, 0, 0],
            "50": [0, 0.43056, 0, 0],
            "51": [0.19444, 0.43056, 0, 0],
            "52": [0.19444, 0.43056, 0, 0],
            "53": [0.19444, 0.43056, 0, 0],
            "54": [0, 0.64444, 0, 0],
            "55": [0.19444, 0.43056, 0, 0],
            "56": [0, 0.64444, 0, 0],
            "57": [0.19444, 0.43056, 0, 0],
            "65": [0, 0.68333, 0, 0.19445],
            "66": [0, 0.68333, 0.03041, 0.13889],
            "67": [0, 0.68333, 0.05834, 0.13889],
            "68": [0, 0.68333, 0.02778, 0.08334],
            "69": [0, 0.68333, 0.08944, 0.11111],
            "70": [0, 0.68333, 0.09931, 0.11111],
            "71": [0.09722, 0.68333, 0.0593, 0.11111],
            "72": [0, 0.68333, 0.00965, 0.11111],
            "73": [0, 0.68333, 0.07382, 0],
            "74": [0.09722, 0.68333, 0.18472, 0.16667],
            "75": [0, 0.68333, 0.01445, 0.05556],
            "76": [0, 0.68333, 0, 0.13889],
            "77": [0, 0.68333, 0, 0.13889],
            "78": [0, 0.68333, 0.14736, 0.08334],
            "79": [0, 0.68333, 0.02778, 0.11111],
            "80": [0, 0.68333, 0.08222, 0.08334],
            "81": [0.09722, 0.68333, 0, 0.11111],
            "82": [0, 0.68333, 0, 0.08334],
            "83": [0, 0.68333, 0.075, 0.13889],
            "84": [0, 0.68333, 0.25417, 0],
            "85": [0, 0.68333, 0.09931, 0.08334],
            "86": [0, 0.68333, 0.08222, 0],
            "87": [0, 0.68333, 0.08222, 0.08334],
            "88": [0, 0.68333, 0.14643, 0.13889],
            "89": [0.09722, 0.68333, 0.08222, 0.08334],
            "90": [0, 0.68333, 0.07944, 0.13889]
        },
        "Fraktur-Regular": {
            "33": [0, 0.69141, 0, 0],
            "34": [0, 0.69141, 0, 0],
            "38": [0, 0.69141, 0, 0],
            "39": [0, 0.69141, 0, 0],
            "40": [0.24982, 0.74947, 0, 0],
            "41": [0.24982, 0.74947, 0, 0],
            "42": [0, 0.62119, 0, 0],
            "43": [0.08319, 0.58283, 0, 0],
            "44": [0, 0.10803, 0, 0],
            "45": [0.08319, 0.58283, 0, 0],
            "46": [0, 0.10803, 0, 0],
            "47": [0.24982, 0.74947, 0, 0],
            "48": [0, 0.47534, 0, 0],
            "49": [0, 0.47534, 0, 0],
            "50": [0, 0.47534, 0, 0],
            "51": [0.18906, 0.47534, 0, 0],
            "52": [0.18906, 0.47534, 0, 0],
            "53": [0.18906, 0.47534, 0, 0],
            "54": [0, 0.69141, 0, 0],
            "55": [0.18906, 0.47534, 0, 0],
            "56": [0, 0.69141, 0, 0],
            "57": [0.18906, 0.47534, 0, 0],
            "58": [0, 0.47534, 0, 0],
            "59": [0.12604, 0.47534, 0, 0],
            "61": [-0.13099, 0.36866, 0, 0],
            "63": [0, 0.69141, 0, 0],
            "65": [0, 0.69141, 0, 0],
            "66": [0, 0.69141, 0, 0],
            "67": [0, 0.69141, 0, 0],
            "68": [0, 0.69141, 0, 0],
            "69": [0, 0.69141, 0, 0],
            "70": [0.12604, 0.69141, 0, 0],
            "71": [0, 0.69141, 0, 0],
            "72": [0.06302, 0.69141, 0, 0],
            "73": [0, 0.69141, 0, 0],
            "74": [0.12604, 0.69141, 0, 0],
            "75": [0, 0.69141, 0, 0],
            "76": [0, 0.69141, 0, 0],
            "77": [0, 0.69141, 0, 0],
            "78": [0, 0.69141, 0, 0],
            "79": [0, 0.69141, 0, 0],
            "80": [0.18906, 0.69141, 0, 0],
            "81": [0.03781, 0.69141, 0, 0],
            "82": [0, 0.69141, 0, 0],
            "83": [0, 0.69141, 0, 0],
            "84": [0, 0.69141, 0, 0],
            "85": [0, 0.69141, 0, 0],
            "86": [0, 0.69141, 0, 0],
            "87": [0, 0.69141, 0, 0],
            "88": [0, 0.69141, 0, 0],
            "89": [0.18906, 0.69141, 0, 0],
            "90": [0.12604, 0.69141, 0, 0],
            "91": [0.24982, 0.74947, 0, 0],
            "93": [0.24982, 0.74947, 0, 0],
            "94": [0, 0.69141, 0, 0],
            "97": [0, 0.47534, 0, 0],
            "98": [0, 0.69141, 0, 0],
            "99": [0, 0.47534, 0, 0],
            "100": [0, 0.62119, 0, 0],
            "101": [0, 0.47534, 0, 0],
            "102": [0.18906, 0.69141, 0, 0],
            "103": [0.18906, 0.47534, 0, 0],
            "104": [0.18906, 0.69141, 0, 0],
            "105": [0, 0.69141, 0, 0],
            "106": [0, 0.69141, 0, 0],
            "107": [0, 0.69141, 0, 0],
            "108": [0, 0.69141, 0, 0],
            "109": [0, 0.47534, 0, 0],
            "110": [0, 0.47534, 0, 0],
            "111": [0, 0.47534, 0, 0],
            "112": [0.18906, 0.52396, 0, 0],
            "113": [0.18906, 0.47534, 0, 0],
            "114": [0, 0.47534, 0, 0],
            "115": [0, 0.47534, 0, 0],
            "116": [0, 0.62119, 0, 0],
            "117": [0, 0.47534, 0, 0],
            "118": [0, 0.52396, 0, 0],
            "119": [0, 0.52396, 0, 0],
            "120": [0.18906, 0.47534, 0, 0],
            "121": [0.18906, 0.47534, 0, 0],
            "122": [0.18906, 0.47534, 0, 0],
            "8216": [0, 0.69141, 0, 0],
            "8217": [0, 0.69141, 0, 0],
            "58112": [0, 0.62119, 0, 0],
            "58113": [0, 0.62119, 0, 0],
            "58114": [0.18906, 0.69141, 0, 0],
            "58115": [0.18906, 0.69141, 0, 0],
            "58116": [0.18906, 0.47534, 0, 0],
            "58117": [0, 0.69141, 0, 0],
            "58118": [0, 0.62119, 0, 0],
            "58119": [0, 0.47534, 0, 0]
        },
        "Main-Bold": {
            "33": [0, 0.69444, 0, 0],
            "34": [0, 0.69444, 0, 0],
            "35": [0.19444, 0.69444, 0, 0],
            "36": [0.05556, 0.75, 0, 0],
            "37": [0.05556, 0.75, 0, 0],
            "38": [0, 0.69444, 0, 0],
            "39": [0, 0.69444, 0, 0],
            "40": [0.25, 0.75, 0, 0],
            "41": [0.25, 0.75, 0, 0],
            "42": [0, 0.75, 0, 0],
            "43": [0.13333, 0.63333, 0, 0],
            "44": [0.19444, 0.15556, 0, 0],
            "45": [0, 0.44444, 0, 0],
            "46": [0, 0.15556, 0, 0],
            "47": [0.25, 0.75, 0, 0],
            "48": [0, 0.64444, 0, 0],
            "49": [0, 0.64444, 0, 0],
            "50": [0, 0.64444, 0, 0],
            "51": [0, 0.64444, 0, 0],
            "52": [0, 0.64444, 0, 0],
            "53": [0, 0.64444, 0, 0],
            "54": [0, 0.64444, 0, 0],
            "55": [0, 0.64444, 0, 0],
            "56": [0, 0.64444, 0, 0],
            "57": [0, 0.64444, 0, 0],
            "58": [0, 0.44444, 0, 0],
            "59": [0.19444, 0.44444, 0, 0],
            "60": [0.08556, 0.58556, 0, 0],
            "61": [-0.10889, 0.39111, 0, 0],
            "62": [0.08556, 0.58556, 0, 0],
            "63": [0, 0.69444, 0, 0],
            "64": [0, 0.69444, 0, 0],
            "65": [0, 0.68611, 0, 0],
            "66": [0, 0.68611, 0, 0],
            "67": [0, 0.68611, 0, 0],
            "68": [0, 0.68611, 0, 0],
            "69": [0, 0.68611, 0, 0],
            "70": [0, 0.68611, 0, 0],
            "71": [0, 0.68611, 0, 0],
            "72": [0, 0.68611, 0, 0],
            "73": [0, 0.68611, 0, 0],
            "74": [0, 0.68611, 0, 0],
            "75": [0, 0.68611, 0, 0],
            "76": [0, 0.68611, 0, 0],
            "77": [0, 0.68611, 0, 0],
            "78": [0, 0.68611, 0, 0],
            "79": [0, 0.68611, 0, 0],
            "80": [0, 0.68611, 0, 0],
            "81": [0.19444, 0.68611, 0, 0],
            "82": [0, 0.68611, 0, 0],
            "83": [0, 0.68611, 0, 0],
            "84": [0, 0.68611, 0, 0],
            "85": [0, 0.68611, 0, 0],
            "86": [0, 0.68611, 0.01597, 0],
            "87": [0, 0.68611, 0.01597, 0],
            "88": [0, 0.68611, 0, 0],
            "89": [0, 0.68611, 0.02875, 0],
            "90": [0, 0.68611, 0, 0],
            "91": [0.25, 0.75, 0, 0],
            "92": [0.25, 0.75, 0, 0],
            "93": [0.25, 0.75, 0, 0],
            "94": [0, 0.69444, 0, 0],
            "95": [0.31, 0.13444, 0.03194, 0],
            "96": [0, 0.69444, 0, 0],
            "97": [0, 0.44444, 0, 0],
            "98": [0, 0.69444, 0, 0],
            "99": [0, 0.44444, 0, 0],
            "100": [0, 0.69444, 0, 0],
            "101": [0, 0.44444, 0, 0],
            "102": [0, 0.69444, 0.10903, 0],
            "103": [0.19444, 0.44444, 0.01597, 0],
            "104": [0, 0.69444, 0, 0],
            "105": [0, 0.69444, 0, 0],
            "106": [0.19444, 0.69444, 0, 0],
            "107": [0, 0.69444, 0, 0],
            "108": [0, 0.69444, 0, 0],
            "109": [0, 0.44444, 0, 0],
            "110": [0, 0.44444, 0, 0],
            "111": [0, 0.44444, 0, 0],
            "112": [0.19444, 0.44444, 0, 0],
            "113": [0.19444, 0.44444, 0, 0],
            "114": [0, 0.44444, 0, 0],
            "115": [0, 0.44444, 0, 0],
            "116": [0, 0.63492, 0, 0],
            "117": [0, 0.44444, 0, 0],
            "118": [0, 0.44444, 0.01597, 0],
            "119": [0, 0.44444, 0.01597, 0],
            "120": [0, 0.44444, 0, 0],
            "121": [0.19444, 0.44444, 0.01597, 0],
            "122": [0, 0.44444, 0, 0],
            "123": [0.25, 0.75, 0, 0],
            "124": [0.25, 0.75, 0, 0],
            "125": [0.25, 0.75, 0, 0],
            "126": [0.35, 0.34444, 0, 0],
            "168": [0, 0.69444, 0, 0],
            "172": [0, 0.44444, 0, 0],
            "175": [0, 0.59611, 0, 0],
            "176": [0, 0.69444, 0, 0],
            "177": [0.13333, 0.63333, 0, 0],
            "180": [0, 0.69444, 0, 0],
            "215": [0.13333, 0.63333, 0, 0],
            "247": [0.13333, 0.63333, 0, 0],
            "305": [0, 0.44444, 0, 0],
            "567": [0.19444, 0.44444, 0, 0],
            "710": [0, 0.69444, 0, 0],
            "711": [0, 0.63194, 0, 0],
            "713": [0, 0.59611, 0, 0],
            "714": [0, 0.69444, 0, 0],
            "715": [0, 0.69444, 0, 0],
            "728": [0, 0.69444, 0, 0],
            "729": [0, 0.69444, 0, 0],
            "730": [0, 0.69444, 0, 0],
            "732": [0, 0.69444, 0, 0],
            "768": [0, 0.69444, 0, 0],
            "769": [0, 0.69444, 0, 0],
            "770": [0, 0.69444, 0, 0],
            "771": [0, 0.69444, 0, 0],
            "772": [0, 0.59611, 0, 0],
            "774": [0, 0.69444, 0, 0],
            "775": [0, 0.69444, 0, 0],
            "776": [0, 0.69444, 0, 0],
            "778": [0, 0.69444, 0, 0],
            "779": [0, 0.69444, 0, 0],
            "780": [0, 0.63194, 0, 0],
            "824": [0.19444, 0.69444, 0, 0],
            "915": [0, 0.68611, 0, 0],
            "916": [0, 0.68611, 0, 0],
            "920": [0, 0.68611, 0, 0],
            "923": [0, 0.68611, 0, 0],
            "926": [0, 0.68611, 0, 0],
            "928": [0, 0.68611, 0, 0],
            "931": [0, 0.68611, 0, 0],
            "933": [0, 0.68611, 0, 0],
            "934": [0, 0.68611, 0, 0],
            "936": [0, 0.68611, 0, 0],
            "937": [0, 0.68611, 0, 0],
            "8211": [0, 0.44444, 0.03194, 0],
            "8212": [0, 0.44444, 0.03194, 0],
            "8216": [0, 0.69444, 0, 0],
            "8217": [0, 0.69444, 0, 0],
            "8220": [0, 0.69444, 0, 0],
            "8221": [0, 0.69444, 0, 0],
            "8224": [0.19444, 0.69444, 0, 0],
            "8225": [0.19444, 0.69444, 0, 0],
            "8242": [0, 0.55556, 0, 0],
            "8407": [0, 0.72444, 0.15486, 0],
            "8463": [0, 0.69444, 0, 0],
            "8465": [0, 0.69444, 0, 0],
            "8467": [0, 0.69444, 0, 0],
            "8472": [0.19444, 0.44444, 0, 0],
            "8476": [0, 0.69444, 0, 0],
            "8501": [0, 0.69444, 0, 0],
            "8592": [-0.10889, 0.39111, 0, 0],
            "8593": [0.19444, 0.69444, 0, 0],
            "8594": [-0.10889, 0.39111, 0, 0],
            "8595": [0.19444, 0.69444, 0, 0],
            "8596": [-0.10889, 0.39111, 0, 0],
            "8597": [0.25, 0.75, 0, 0],
            "8598": [0.19444, 0.69444, 0, 0],
            "8599": [0.19444, 0.69444, 0, 0],
            "8600": [0.19444, 0.69444, 0, 0],
            "8601": [0.19444, 0.69444, 0, 0],
            "8636": [-0.10889, 0.39111, 0, 0],
            "8637": [-0.10889, 0.39111, 0, 0],
            "8640": [-0.10889, 0.39111, 0, 0],
            "8641": [-0.10889, 0.39111, 0, 0],
            "8656": [-0.10889, 0.39111, 0, 0],
            "8657": [0.19444, 0.69444, 0, 0],
            "8658": [-0.10889, 0.39111, 0, 0],
            "8659": [0.19444, 0.69444, 0, 0],
            "8660": [-0.10889, 0.39111, 0, 0],
            "8661": [0.25, 0.75, 0, 0],
            "8704": [0, 0.69444, 0, 0],
            "8706": [0, 0.69444, 0.06389, 0],
            "8707": [0, 0.69444, 0, 0],
            "8709": [0.05556, 0.75, 0, 0],
            "8711": [0, 0.68611, 0, 0],
            "8712": [0.08556, 0.58556, 0, 0],
            "8715": [0.08556, 0.58556, 0, 0],
            "8722": [0.13333, 0.63333, 0, 0],
            "8723": [0.13333, 0.63333, 0, 0],
            "8725": [0.25, 0.75, 0, 0],
            "8726": [0.25, 0.75, 0, 0],
            "8727": [-0.02778, 0.47222, 0, 0],
            "8728": [-0.02639, 0.47361, 0, 0],
            "8729": [-0.02639, 0.47361, 0, 0],
            "8730": [0.18, 0.82, 0, 0],
            "8733": [0, 0.44444, 0, 0],
            "8734": [0, 0.44444, 0, 0],
            "8736": [0, 0.69224, 0, 0],
            "8739": [0.25, 0.75, 0, 0],
            "8741": [0.25, 0.75, 0, 0],
            "8743": [0, 0.55556, 0, 0],
            "8744": [0, 0.55556, 0, 0],
            "8745": [0, 0.55556, 0, 0],
            "8746": [0, 0.55556, 0, 0],
            "8747": [0.19444, 0.69444, 0.12778, 0],
            "8764": [-0.10889, 0.39111, 0, 0],
            "8768": [0.19444, 0.69444, 0, 0],
            "8771": [0.00222, 0.50222, 0, 0],
            "8776": [0.02444, 0.52444, 0, 0],
            "8781": [0.00222, 0.50222, 0, 0],
            "8801": [0.00222, 0.50222, 0, 0],
            "8804": [0.19667, 0.69667, 0, 0],
            "8805": [0.19667, 0.69667, 0, 0],
            "8810": [0.08556, 0.58556, 0, 0],
            "8811": [0.08556, 0.58556, 0, 0],
            "8826": [0.08556, 0.58556, 0, 0],
            "8827": [0.08556, 0.58556, 0, 0],
            "8834": [0.08556, 0.58556, 0, 0],
            "8835": [0.08556, 0.58556, 0, 0],
            "8838": [0.19667, 0.69667, 0, 0],
            "8839": [0.19667, 0.69667, 0, 0],
            "8846": [0, 0.55556, 0, 0],
            "8849": [0.19667, 0.69667, 0, 0],
            "8850": [0.19667, 0.69667, 0, 0],
            "8851": [0, 0.55556, 0, 0],
            "8852": [0, 0.55556, 0, 0],
            "8853": [0.13333, 0.63333, 0, 0],
            "8854": [0.13333, 0.63333, 0, 0],
            "8855": [0.13333, 0.63333, 0, 0],
            "8856": [0.13333, 0.63333, 0, 0],
            "8857": [0.13333, 0.63333, 0, 0],
            "8866": [0, 0.69444, 0, 0],
            "8867": [0, 0.69444, 0, 0],
            "8868": [0, 0.69444, 0, 0],
            "8869": [0, 0.69444, 0, 0],
            "8900": [-0.02639, 0.47361, 0, 0],
            "8901": [-0.02639, 0.47361, 0, 0],
            "8902": [-0.02778, 0.47222, 0, 0],
            "8968": [0.25, 0.75, 0, 0],
            "8969": [0.25, 0.75, 0, 0],
            "8970": [0.25, 0.75, 0, 0],
            "8971": [0.25, 0.75, 0, 0],
            "8994": [-0.13889, 0.36111, 0, 0],
            "8995": [-0.13889, 0.36111, 0, 0],
            "9651": [0.19444, 0.69444, 0, 0],
            "9657": [-0.02778, 0.47222, 0, 0],
            "9661": [0.19444, 0.69444, 0, 0],
            "9667": [-0.02778, 0.47222, 0, 0],
            "9711": [0.19444, 0.69444, 0, 0],
            "9824": [0.12963, 0.69444, 0, 0],
            "9825": [0.12963, 0.69444, 0, 0],
            "9826": [0.12963, 0.69444, 0, 0],
            "9827": [0.12963, 0.69444, 0, 0],
            "9837": [0, 0.75, 0, 0],
            "9838": [0.19444, 0.69444, 0, 0],
            "9839": [0.19444, 0.69444, 0, 0],
            "10216": [0.25, 0.75, 0, 0],
            "10217": [0.25, 0.75, 0, 0],
            "10815": [0, 0.68611, 0, 0],
            "10927": [0.19667, 0.69667, 0, 0],
            "10928": [0.19667, 0.69667, 0, 0]
        },
        "Main-Italic": {
            "33": [0, 0.69444, 0.12417, 0],
            "34": [0, 0.69444, 0.06961, 0],
            "35": [0.19444, 0.69444, 0.06616, 0],
            "37": [0.05556, 0.75, 0.13639, 0],
            "38": [0, 0.69444, 0.09694, 0],
            "39": [0, 0.69444, 0.12417, 0],
            "40": [0.25, 0.75, 0.16194, 0],
            "41": [0.25, 0.75, 0.03694, 0],
            "42": [0, 0.75, 0.14917, 0],
            "43": [0.05667, 0.56167, 0.03694, 0],
            "44": [0.19444, 0.10556, 0, 0],
            "45": [0, 0.43056, 0.02826, 0],
            "46": [0, 0.10556, 0, 0],
            "47": [0.25, 0.75, 0.16194, 0],
            "48": [0, 0.64444, 0.13556, 0],
            "49": [0, 0.64444, 0.13556, 0],
            "50": [0, 0.64444, 0.13556, 0],
            "51": [0, 0.64444, 0.13556, 0],
            "52": [0.19444, 0.64444, 0.13556, 0],
            "53": [0, 0.64444, 0.13556, 0],
            "54": [0, 0.64444, 0.13556, 0],
            "55": [0.19444, 0.64444, 0.13556, 0],
            "56": [0, 0.64444, 0.13556, 0],
            "57": [0, 0.64444, 0.13556, 0],
            "58": [0, 0.43056, 0.0582, 0],
            "59": [0.19444, 0.43056, 0.0582, 0],
            "61": [-0.13313, 0.36687, 0.06616, 0],
            "63": [0, 0.69444, 0.1225, 0],
            "64": [0, 0.69444, 0.09597, 0],
            "65": [0, 0.68333, 0, 0],
            "66": [0, 0.68333, 0.10257, 0],
            "67": [0, 0.68333, 0.14528, 0],
            "68": [0, 0.68333, 0.09403, 0],
            "69": [0, 0.68333, 0.12028, 0],
            "70": [0, 0.68333, 0.13305, 0],
            "71": [0, 0.68333, 0.08722, 0],
            "72": [0, 0.68333, 0.16389, 0],
            "73": [0, 0.68333, 0.15806, 0],
            "74": [0, 0.68333, 0.14028, 0],
            "75": [0, 0.68333, 0.14528, 0],
            "76": [0, 0.68333, 0, 0],
            "77": [0, 0.68333, 0.16389, 0],
            "78": [0, 0.68333, 0.16389, 0],
            "79": [0, 0.68333, 0.09403, 0],
            "80": [0, 0.68333, 0.10257, 0],
            "81": [0.19444, 0.68333, 0.09403, 0],
            "82": [0, 0.68333, 0.03868, 0],
            "83": [0, 0.68333, 0.11972, 0],
            "84": [0, 0.68333, 0.13305, 0],
            "85": [0, 0.68333, 0.16389, 0],
            "86": [0, 0.68333, 0.18361, 0],
            "87": [0, 0.68333, 0.18361, 0],
            "88": [0, 0.68333, 0.15806, 0],
            "89": [0, 0.68333, 0.19383, 0],
            "90": [0, 0.68333, 0.14528, 0],
            "91": [0.25, 0.75, 0.1875, 0],
            "93": [0.25, 0.75, 0.10528, 0],
            "94": [0, 0.69444, 0.06646, 0],
            "95": [0.31, 0.12056, 0.09208, 0],
            "97": [0, 0.43056, 0.07671, 0],
            "98": [0, 0.69444, 0.06312, 0],
            "99": [0, 0.43056, 0.05653, 0],
            "100": [0, 0.69444, 0.10333, 0],
            "101": [0, 0.43056, 0.07514, 0],
            "102": [0.19444, 0.69444, 0.21194, 0],
            "103": [0.19444, 0.43056, 0.08847, 0],
            "104": [0, 0.69444, 0.07671, 0],
            "105": [0, 0.65536, 0.1019, 0],
            "106": [0.19444, 0.65536, 0.14467, 0],
            "107": [0, 0.69444, 0.10764, 0],
            "108": [0, 0.69444, 0.10333, 0],
            "109": [0, 0.43056, 0.07671, 0],
            "110": [0, 0.43056, 0.07671, 0],
            "111": [0, 0.43056, 0.06312, 0],
            "112": [0.19444, 0.43056, 0.06312, 0],
            "113": [0.19444, 0.43056, 0.08847, 0],
            "114": [0, 0.43056, 0.10764, 0],
            "115": [0, 0.43056, 0.08208, 0],
            "116": [0, 0.61508, 0.09486, 0],
            "117": [0, 0.43056, 0.07671, 0],
            "118": [0, 0.43056, 0.10764, 0],
            "119": [0, 0.43056, 0.10764, 0],
            "120": [0, 0.43056, 0.12042, 0],
            "121": [0.19444, 0.43056, 0.08847, 0],
            "122": [0, 0.43056, 0.12292, 0],
            "126": [0.35, 0.31786, 0.11585, 0],
            "163": [0, 0.69444, 0, 0],
            "305": [0, 0.43056, 0, 0.02778],
            "567": [0.19444, 0.43056, 0, 0.08334],
            "768": [0, 0.69444, 0, 0],
            "769": [0, 0.69444, 0.09694, 0],
            "770": [0, 0.69444, 0.06646, 0],
            "771": [0, 0.66786, 0.11585, 0],
            "772": [0, 0.56167, 0.10333, 0],
            "774": [0, 0.69444, 0.10806, 0],
            "775": [0, 0.66786, 0.11752, 0],
            "776": [0, 0.66786, 0.10474, 0],
            "778": [0, 0.69444, 0, 0],
            "779": [0, 0.69444, 0.1225, 0],
            "780": [0, 0.62847, 0.08295, 0],
            "915": [0, 0.68333, 0.13305, 0],
            "916": [0, 0.68333, 0, 0],
            "920": [0, 0.68333, 0.09403, 0],
            "923": [0, 0.68333, 0, 0],
            "926": [0, 0.68333, 0.15294, 0],
            "928": [0, 0.68333, 0.16389, 0],
            "931": [0, 0.68333, 0.12028, 0],
            "933": [0, 0.68333, 0.11111, 0],
            "934": [0, 0.68333, 0.05986, 0],
            "936": [0, 0.68333, 0.11111, 0],
            "937": [0, 0.68333, 0.10257, 0],
            "8211": [0, 0.43056, 0.09208, 0],
            "8212": [0, 0.43056, 0.09208, 0],
            "8216": [0, 0.69444, 0.12417, 0],
            "8217": [0, 0.69444, 0.12417, 0],
            "8220": [0, 0.69444, 0.1685, 0],
            "8221": [0, 0.69444, 0.06961, 0],
            "8463": [0, 0.68889, 0, 0]
        },
        "Main-Regular": {
            "32": [0, 0, 0, 0],
            "33": [0, 0.69444, 0, 0],
            "34": [0, 0.69444, 0, 0],
            "35": [0.19444, 0.69444, 0, 0],
            "36": [0.05556, 0.75, 0, 0],
            "37": [0.05556, 0.75, 0, 0],
            "38": [0, 0.69444, 0, 0],
            "39": [0, 0.69444, 0, 0],
            "40": [0.25, 0.75, 0, 0],
            "41": [0.25, 0.75, 0, 0],
            "42": [0, 0.75, 0, 0],
            "43": [0.08333, 0.58333, 0, 0],
            "44": [0.19444, 0.10556, 0, 0],
            "45": [0, 0.43056, 0, 0],
            "46": [0, 0.10556, 0, 0],
            "47": [0.25, 0.75, 0, 0],
            "48": [0, 0.64444, 0, 0],
            "49": [0, 0.64444, 0, 0],
            "50": [0, 0.64444, 0, 0],
            "51": [0, 0.64444, 0, 0],
            "52": [0, 0.64444, 0, 0],
            "53": [0, 0.64444, 0, 0],
            "54": [0, 0.64444, 0, 0],
            "55": [0, 0.64444, 0, 0],
            "56": [0, 0.64444, 0, 0],
            "57": [0, 0.64444, 0, 0],
            "58": [0, 0.43056, 0, 0],
            "59": [0.19444, 0.43056, 0, 0],
            "60": [0.0391, 0.5391, 0, 0],
            "61": [-0.13313, 0.36687, 0, 0],
            "62": [0.0391, 0.5391, 0, 0],
            "63": [0, 0.69444, 0, 0],
            "64": [0, 0.69444, 0, 0],
            "65": [0, 0.68333, 0, 0],
            "66": [0, 0.68333, 0, 0],
            "67": [0, 0.68333, 0, 0],
            "68": [0, 0.68333, 0, 0],
            "69": [0, 0.68333, 0, 0],
            "70": [0, 0.68333, 0, 0],
            "71": [0, 0.68333, 0, 0],
            "72": [0, 0.68333, 0, 0],
            "73": [0, 0.68333, 0, 0],
            "74": [0, 0.68333, 0, 0],
            "75": [0, 0.68333, 0, 0],
            "76": [0, 0.68333, 0, 0],
            "77": [0, 0.68333, 0, 0],
            "78": [0, 0.68333, 0, 0],
            "79": [0, 0.68333, 0, 0],
            "80": [0, 0.68333, 0, 0],
            "81": [0.19444, 0.68333, 0, 0],
            "82": [0, 0.68333, 0, 0],
            "83": [0, 0.68333, 0, 0],
            "84": [0, 0.68333, 0, 0],
            "85": [0, 0.68333, 0, 0],
            "86": [0, 0.68333, 0.01389, 0],
            "87": [0, 0.68333, 0.01389, 0],
            "88": [0, 0.68333, 0, 0],
            "89": [0, 0.68333, 0.025, 0],
            "90": [0, 0.68333, 0, 0],
            "91": [0.25, 0.75, 0, 0],
            "92": [0.25, 0.75, 0, 0],
            "93": [0.25, 0.75, 0, 0],
            "94": [0, 0.69444, 0, 0],
            "95": [0.31, 0.12056, 0.02778, 0],
            "96": [0, 0.69444, 0, 0],
            "97": [0, 0.43056, 0, 0],
            "98": [0, 0.69444, 0, 0],
            "99": [0, 0.43056, 0, 0],
            "100": [0, 0.69444, 0, 0],
            "101": [0, 0.43056, 0, 0],
            "102": [0, 0.69444, 0.07778, 0],
            "103": [0.19444, 0.43056, 0.01389, 0],
            "104": [0, 0.69444, 0, 0],
            "105": [0, 0.66786, 0, 0],
            "106": [0.19444, 0.66786, 0, 0],
            "107": [0, 0.69444, 0, 0],
            "108": [0, 0.69444, 0, 0],
            "109": [0, 0.43056, 0, 0],
            "110": [0, 0.43056, 0, 0],
            "111": [0, 0.43056, 0, 0],
            "112": [0.19444, 0.43056, 0, 0],
            "113": [0.19444, 0.43056, 0, 0],
            "114": [0, 0.43056, 0, 0],
            "115": [0, 0.43056, 0, 0],
            "116": [0, 0.61508, 0, 0],
            "117": [0, 0.43056, 0, 0],
            "118": [0, 0.43056, 0.01389, 0],
            "119": [0, 0.43056, 0.01389, 0],
            "120": [0, 0.43056, 0, 0],
            "121": [0.19444, 0.43056, 0.01389, 0],
            "122": [0, 0.43056, 0, 0],
            "123": [0.25, 0.75, 0, 0],
            "124": [0.25, 0.75, 0, 0],
            "125": [0.25, 0.75, 0, 0],
            "126": [0.35, 0.31786, 0, 0],
            "160": [0, 0, 0, 0],
            "168": [0, 0.66786, 0, 0],
            "172": [0, 0.43056, 0, 0],
            "175": [0, 0.56778, 0, 0],
            "176": [0, 0.69444, 0, 0],
            "177": [0.08333, 0.58333, 0, 0],
            "180": [0, 0.69444, 0, 0],
            "215": [0.08333, 0.58333, 0, 0],
            "247": [0.08333, 0.58333, 0, 0],
            "305": [0, 0.43056, 0, 0],
            "567": [0.19444, 0.43056, 0, 0],
            "710": [0, 0.69444, 0, 0],
            "711": [0, 0.62847, 0, 0],
            "713": [0, 0.56778, 0, 0],
            "714": [0, 0.69444, 0, 0],
            "715": [0, 0.69444, 0, 0],
            "728": [0, 0.69444, 0, 0],
            "729": [0, 0.66786, 0, 0],
            "730": [0, 0.69444, 0, 0],
            "732": [0, 0.66786, 0, 0],
            "768": [0, 0.69444, 0, 0],
            "769": [0, 0.69444, 0, 0],
            "770": [0, 0.69444, 0, 0],
            "771": [0, 0.66786, 0, 0],
            "772": [0, 0.56778, 0, 0],
            "774": [0, 0.69444, 0, 0],
            "775": [0, 0.66786, 0, 0],
            "776": [0, 0.66786, 0, 0],
            "778": [0, 0.69444, 0, 0],
            "779": [0, 0.69444, 0, 0],
            "780": [0, 0.62847, 0, 0],
            "824": [0.19444, 0.69444, 0, 0],
            "915": [0, 0.68333, 0, 0],
            "916": [0, 0.68333, 0, 0],
            "920": [0, 0.68333, 0, 0],
            "923": [0, 0.68333, 0, 0],
            "926": [0, 0.68333, 0, 0],
            "928": [0, 0.68333, 0, 0],
            "931": [0, 0.68333, 0, 0],
            "933": [0, 0.68333, 0, 0],
            "934": [0, 0.68333, 0, 0],
            "936": [0, 0.68333, 0, 0],
            "937": [0, 0.68333, 0, 0],
            "8211": [0, 0.43056, 0.02778, 0],
            "8212": [0, 0.43056, 0.02778, 0],
            "8216": [0, 0.69444, 0, 0],
            "8217": [0, 0.69444, 0, 0],
            "8220": [0, 0.69444, 0, 0],
            "8221": [0, 0.69444, 0, 0],
            "8224": [0.19444, 0.69444, 0, 0],
            "8225": [0.19444, 0.69444, 0, 0],
            "8230": [0, 0.12, 0, 0],
            "8242": [0, 0.55556, 0, 0],
            "8407": [0, 0.71444, 0.15382, 0],
            "8463": [0, 0.68889, 0, 0],
            "8465": [0, 0.69444, 0, 0],
            "8467": [0, 0.69444, 0, 0.11111],
            "8472": [0.19444, 0.43056, 0, 0.11111],
            "8476": [0, 0.69444, 0, 0],
            "8501": [0, 0.69444, 0, 0],
            "8592": [-0.13313, 0.36687, 0, 0],
            "8593": [0.19444, 0.69444, 0, 0],
            "8594": [-0.13313, 0.36687, 0, 0],
            "8595": [0.19444, 0.69444, 0, 0],
            "8596": [-0.13313, 0.36687, 0, 0],
            "8597": [0.25, 0.75, 0, 0],
            "8598": [0.19444, 0.69444, 0, 0],
            "8599": [0.19444, 0.69444, 0, 0],
            "8600": [0.19444, 0.69444, 0, 0],
            "8601": [0.19444, 0.69444, 0, 0],
            "8614": [0.011, 0.511, 0, 0],
            "8617": [0.011, 0.511, 0, 0],
            "8618": [0.011, 0.511, 0, 0],
            "8636": [-0.13313, 0.36687, 0, 0],
            "8637": [-0.13313, 0.36687, 0, 0],
            "8640": [-0.13313, 0.36687, 0, 0],
            "8641": [-0.13313, 0.36687, 0, 0],
            "8652": [0.011, 0.671, 0, 0],
            "8656": [-0.13313, 0.36687, 0, 0],
            "8657": [0.19444, 0.69444, 0, 0],
            "8658": [-0.13313, 0.36687, 0, 0],
            "8659": [0.19444, 0.69444, 0, 0],
            "8660": [-0.13313, 0.36687, 0, 0],
            "8661": [0.25, 0.75, 0, 0],
            "8704": [0, 0.69444, 0, 0],
            "8706": [0, 0.69444, 0.05556, 0.08334],
            "8707": [0, 0.69444, 0, 0],
            "8709": [0.05556, 0.75, 0, 0],
            "8711": [0, 0.68333, 0, 0],
            "8712": [0.0391, 0.5391, 0, 0],
            "8715": [0.0391, 0.5391, 0, 0],
            "8722": [0.08333, 0.58333, 0, 0],
            "8723": [0.08333, 0.58333, 0, 0],
            "8725": [0.25, 0.75, 0, 0],
            "8726": [0.25, 0.75, 0, 0],
            "8727": [-0.03472, 0.46528, 0, 0],
            "8728": [-0.05555, 0.44445, 0, 0],
            "8729": [-0.05555, 0.44445, 0, 0],
            "8730": [0.2, 0.8, 0, 0],
            "8733": [0, 0.43056, 0, 0],
            "8734": [0, 0.43056, 0, 0],
            "8736": [0, 0.69224, 0, 0],
            "8739": [0.25, 0.75, 0, 0],
            "8741": [0.25, 0.75, 0, 0],
            "8743": [0, 0.55556, 0, 0],
            "8744": [0, 0.55556, 0, 0],
            "8745": [0, 0.55556, 0, 0],
            "8746": [0, 0.55556, 0, 0],
            "8747": [0.19444, 0.69444, 0.11111, 0],
            "8764": [-0.13313, 0.36687, 0, 0],
            "8768": [0.19444, 0.69444, 0, 0],
            "8771": [-0.03625, 0.46375, 0, 0],
            "8773": [-0.022, 0.589, 0, 0],
            "8776": [-0.01688, 0.48312, 0, 0],
            "8781": [-0.03625, 0.46375, 0, 0],
            "8784": [-0.133, 0.67, 0, 0],
            "8800": [0.215, 0.716, 0, 0],
            "8801": [-0.03625, 0.46375, 0, 0],
            "8804": [0.13597, 0.63597, 0, 0],
            "8805": [0.13597, 0.63597, 0, 0],
            "8810": [0.0391, 0.5391, 0, 0],
            "8811": [0.0391, 0.5391, 0, 0],
            "8826": [0.0391, 0.5391, 0, 0],
            "8827": [0.0391, 0.5391, 0, 0],
            "8834": [0.0391, 0.5391, 0, 0],
            "8835": [0.0391, 0.5391, 0, 0],
            "8838": [0.13597, 0.63597, 0, 0],
            "8839": [0.13597, 0.63597, 0, 0],
            "8846": [0, 0.55556, 0, 0],
            "8849": [0.13597, 0.63597, 0, 0],
            "8850": [0.13597, 0.63597, 0, 0],
            "8851": [0, 0.55556, 0, 0],
            "8852": [0, 0.55556, 0, 0],
            "8853": [0.08333, 0.58333, 0, 0],
            "8854": [0.08333, 0.58333, 0, 0],
            "8855": [0.08333, 0.58333, 0, 0],
            "8856": [0.08333, 0.58333, 0, 0],
            "8857": [0.08333, 0.58333, 0, 0],
            "8866": [0, 0.69444, 0, 0],
            "8867": [0, 0.69444, 0, 0],
            "8868": [0, 0.69444, 0, 0],
            "8869": [0, 0.69444, 0, 0],
            "8872": [0.249, 0.75, 0, 0],
            "8900": [-0.05555, 0.44445, 0, 0],
            "8901": [-0.05555, 0.44445, 0, 0],
            "8902": [-0.03472, 0.46528, 0, 0],
            "8904": [0.005, 0.505, 0, 0],
            "8942": [0.03, 0.9, 0, 0],
            "8943": [-0.19, 0.31, 0, 0],
            "8945": [-0.1, 0.82, 0, 0],
            "8968": [0.25, 0.75, 0, 0],
            "8969": [0.25, 0.75, 0, 0],
            "8970": [0.25, 0.75, 0, 0],
            "8971": [0.25, 0.75, 0, 0],
            "8994": [-0.14236, 0.35764, 0, 0],
            "8995": [-0.14236, 0.35764, 0, 0],
            "9136": [0.244, 0.744, 0, 0],
            "9137": [0.244, 0.744, 0, 0],
            "9651": [0.19444, 0.69444, 0, 0],
            "9657": [-0.03472, 0.46528, 0, 0],
            "9661": [0.19444, 0.69444, 0, 0],
            "9667": [-0.03472, 0.46528, 0, 0],
            "9711": [0.19444, 0.69444, 0, 0],
            "9824": [0.12963, 0.69444, 0, 0],
            "9825": [0.12963, 0.69444, 0, 0],
            "9826": [0.12963, 0.69444, 0, 0],
            "9827": [0.12963, 0.69444, 0, 0],
            "9837": [0, 0.75, 0, 0],
            "9838": [0.19444, 0.69444, 0, 0],
            "9839": [0.19444, 0.69444, 0, 0],
            "10216": [0.25, 0.75, 0, 0],
            "10217": [0.25, 0.75, 0, 0],
            "10222": [0.244, 0.744, 0, 0],
            "10223": [0.244, 0.744, 0, 0],
            "10229": [0.011, 0.511, 0, 0],
            "10230": [0.011, 0.511, 0, 0],
            "10231": [0.011, 0.511, 0, 0],
            "10232": [0.024, 0.525, 0, 0],
            "10233": [0.024, 0.525, 0, 0],
            "10234": [0.024, 0.525, 0, 0],
            "10236": [0.011, 0.511, 0, 0],
            "10815": [0, 0.68333, 0, 0],
            "10927": [0.13597, 0.63597, 0, 0],
            "10928": [0.13597, 0.63597, 0, 0]
        },
        "Math-BoldItalic": {
            "47": [0.19444, 0.69444, 0, 0],
            "65": [0, 0.68611, 0, 0],
            "66": [0, 0.68611, 0.04835, 0],
            "67": [0, 0.68611, 0.06979, 0],
            "68": [0, 0.68611, 0.03194, 0],
            "69": [0, 0.68611, 0.05451, 0],
            "70": [0, 0.68611, 0.15972, 0],
            "71": [0, 0.68611, 0, 0],
            "72": [0, 0.68611, 0.08229, 0],
            "73": [0, 0.68611, 0.07778, 0],
            "74": [0, 0.68611, 0.10069, 0],
            "75": [0, 0.68611, 0.06979, 0],
            "76": [0, 0.68611, 0, 0],
            "77": [0, 0.68611, 0.11424, 0],
            "78": [0, 0.68611, 0.11424, 0],
            "79": [0, 0.68611, 0.03194, 0],
            "80": [0, 0.68611, 0.15972, 0],
            "81": [0.19444, 0.68611, 0, 0],
            "82": [0, 0.68611, 0.00421, 0],
            "83": [0, 0.68611, 0.05382, 0],
            "84": [0, 0.68611, 0.15972, 0],
            "85": [0, 0.68611, 0.11424, 0],
            "86": [0, 0.68611, 0.25555, 0],
            "87": [0, 0.68611, 0.15972, 0],
            "88": [0, 0.68611, 0.07778, 0],
            "89": [0, 0.68611, 0.25555, 0],
            "90": [0, 0.68611, 0.06979, 0],
            "97": [0, 0.44444, 0, 0],
            "98": [0, 0.69444, 0, 0],
            "99": [0, 0.44444, 0, 0],
            "100": [0, 0.69444, 0, 0],
            "101": [0, 0.44444, 0, 0],
            "102": [0.19444, 0.69444, 0.11042, 0],
            "103": [0.19444, 0.44444, 0.03704, 0],
            "104": [0, 0.69444, 0, 0],
            "105": [0, 0.69326, 0, 0],
            "106": [0.19444, 0.69326, 0.0622, 0],
            "107": [0, 0.69444, 0.01852, 0],
            "108": [0, 0.69444, 0.0088, 0],
            "109": [0, 0.44444, 0, 0],
            "110": [0, 0.44444, 0, 0],
            "111": [0, 0.44444, 0, 0],
            "112": [0.19444, 0.44444, 0, 0],
            "113": [0.19444, 0.44444, 0.03704, 0],
            "114": [0, 0.44444, 0.03194, 0],
            "115": [0, 0.44444, 0, 0],
            "116": [0, 0.63492, 0, 0],
            "117": [0, 0.44444, 0, 0],
            "118": [0, 0.44444, 0.03704, 0],
            "119": [0, 0.44444, 0.02778, 0],
            "120": [0, 0.44444, 0, 0],
            "121": [0.19444, 0.44444, 0.03704, 0],
            "122": [0, 0.44444, 0.04213, 0],
            "915": [0, 0.68611, 0.15972, 0],
            "916": [0, 0.68611, 0, 0],
            "920": [0, 0.68611, 0.03194, 0],
            "923": [0, 0.68611, 0, 0],
            "926": [0, 0.68611, 0.07458, 0],
            "928": [0, 0.68611, 0.08229, 0],
            "931": [0, 0.68611, 0.05451, 0],
            "933": [0, 0.68611, 0.15972, 0],
            "934": [0, 0.68611, 0, 0],
            "936": [0, 0.68611, 0.11653, 0],
            "937": [0, 0.68611, 0.04835, 0],
            "945": [0, 0.44444, 0, 0],
            "946": [0.19444, 0.69444, 0.03403, 0],
            "947": [0.19444, 0.44444, 0.06389, 0],
            "948": [0, 0.69444, 0.03819, 0],
            "949": [0, 0.44444, 0, 0],
            "950": [0.19444, 0.69444, 0.06215, 0],
            "951": [0.19444, 0.44444, 0.03704, 0],
            "952": [0, 0.69444, 0.03194, 0],
            "953": [0, 0.44444, 0, 0],
            "954": [0, 0.44444, 0, 0],
            "955": [0, 0.69444, 0, 0],
            "956": [0.19444, 0.44444, 0, 0],
            "957": [0, 0.44444, 0.06898, 0],
            "958": [0.19444, 0.69444, 0.03021, 0],
            "959": [0, 0.44444, 0, 0],
            "960": [0, 0.44444, 0.03704, 0],
            "961": [0.19444, 0.44444, 0, 0],
            "962": [0.09722, 0.44444, 0.07917, 0],
            "963": [0, 0.44444, 0.03704, 0],
            "964": [0, 0.44444, 0.13472, 0],
            "965": [0, 0.44444, 0.03704, 0],
            "966": [0.19444, 0.44444, 0, 0],
            "967": [0.19444, 0.44444, 0, 0],
            "968": [0.19444, 0.69444, 0.03704, 0],
            "969": [0, 0.44444, 0.03704, 0],
            "977": [0, 0.69444, 0, 0],
            "981": [0.19444, 0.69444, 0, 0],
            "982": [0, 0.44444, 0.03194, 0],
            "1009": [0.19444, 0.44444, 0, 0],
            "1013": [0, 0.44444, 0, 0]
        },
        "Math-Italic": {
            "47": [0.19444, 0.69444, 0, 0],
            "65": [0, 0.68333, 0, 0.13889],
            "66": [0, 0.68333, 0.05017, 0.08334],
            "67": [0, 0.68333, 0.07153, 0.08334],
            "68": [0, 0.68333, 0.02778, 0.05556],
            "69": [0, 0.68333, 0.05764, 0.08334],
            "70": [0, 0.68333, 0.13889, 0.08334],
            "71": [0, 0.68333, 0, 0.08334],
            "72": [0, 0.68333, 0.08125, 0.05556],
            "73": [0, 0.68333, 0.07847, 0.11111],
            "74": [0, 0.68333, 0.09618, 0.16667],
            "75": [0, 0.68333, 0.07153, 0.05556],
            "76": [0, 0.68333, 0, 0.02778],
            "77": [0, 0.68333, 0.10903, 0.08334],
            "78": [0, 0.68333, 0.10903, 0.08334],
            "79": [0, 0.68333, 0.02778, 0.08334],
            "80": [0, 0.68333, 0.13889, 0.08334],
            "81": [0.19444, 0.68333, 0, 0.08334],
            "82": [0, 0.68333, 0.00773, 0.08334],
            "83": [0, 0.68333, 0.05764, 0.08334],
            "84": [0, 0.68333, 0.13889, 0.08334],
            "85": [0, 0.68333, 0.10903, 0.02778],
            "86": [0, 0.68333, 0.22222, 0],
            "87": [0, 0.68333, 0.13889, 0],
            "88": [0, 0.68333, 0.07847, 0.08334],
            "89": [0, 0.68333, 0.22222, 0],
            "90": [0, 0.68333, 0.07153, 0.08334],
            "97": [0, 0.43056, 0, 0],
            "98": [0, 0.69444, 0, 0],
            "99": [0, 0.43056, 0, 0.05556],
            "100": [0, 0.69444, 0, 0.16667],
            "101": [0, 0.43056, 0, 0.05556],
            "102": [0.19444, 0.69444, 0.10764, 0.16667],
            "103": [0.19444, 0.43056, 0.03588, 0.02778],
            "104": [0, 0.69444, 0, 0],
            "105": [0, 0.65952, 0, 0],
            "106": [0.19444, 0.65952, 0.05724, 0],
            "107": [0, 0.69444, 0.03148, 0],
            "108": [0, 0.69444, 0.01968, 0.08334],
            "109": [0, 0.43056, 0, 0],
            "110": [0, 0.43056, 0, 0],
            "111": [0, 0.43056, 0, 0.05556],
            "112": [0.19444, 0.43056, 0, 0.08334],
            "113": [0.19444, 0.43056, 0.03588, 0.08334],
            "114": [0, 0.43056, 0.02778, 0.05556],
            "115": [0, 0.43056, 0, 0.05556],
            "116": [0, 0.61508, 0, 0.08334],
            "117": [0, 0.43056, 0, 0.02778],
            "118": [0, 0.43056, 0.03588, 0.02778],
            "119": [0, 0.43056, 0.02691, 0.08334],
            "120": [0, 0.43056, 0, 0.02778],
            "121": [0.19444, 0.43056, 0.03588, 0.05556],
            "122": [0, 0.43056, 0.04398, 0.05556],
            "915": [0, 0.68333, 0.13889, 0.08334],
            "916": [0, 0.68333, 0, 0.16667],
            "920": [0, 0.68333, 0.02778, 0.08334],
            "923": [0, 0.68333, 0, 0.16667],
            "926": [0, 0.68333, 0.07569, 0.08334],
            "928": [0, 0.68333, 0.08125, 0.05556],
            "931": [0, 0.68333, 0.05764, 0.08334],
            "933": [0, 0.68333, 0.13889, 0.05556],
            "934": [0, 0.68333, 0, 0.08334],
            "936": [0, 0.68333, 0.11, 0.05556],
            "937": [0, 0.68333, 0.05017, 0.08334],
            "945": [0, 0.43056, 0.0037, 0.02778],
            "946": [0.19444, 0.69444, 0.05278, 0.08334],
            "947": [0.19444, 0.43056, 0.05556, 0],
            "948": [0, 0.69444, 0.03785, 0.05556],
            "949": [0, 0.43056, 0, 0.08334],
            "950": [0.19444, 0.69444, 0.07378, 0.08334],
            "951": [0.19444, 0.43056, 0.03588, 0.05556],
            "952": [0, 0.69444, 0.02778, 0.08334],
            "953": [0, 0.43056, 0, 0.05556],
            "954": [0, 0.43056, 0, 0],
            "955": [0, 0.69444, 0, 0],
            "956": [0.19444, 0.43056, 0, 0.02778],
            "957": [0, 0.43056, 0.06366, 0.02778],
            "958": [0.19444, 0.69444, 0.04601, 0.11111],
            "959": [0, 0.43056, 0, 0.05556],
            "960": [0, 0.43056, 0.03588, 0],
            "961": [0.19444, 0.43056, 0, 0.08334],
            "962": [0.09722, 0.43056, 0.07986, 0.08334],
            "963": [0, 0.43056, 0.03588, 0],
            "964": [0, 0.43056, 0.1132, 0.02778],
            "965": [0, 0.43056, 0.03588, 0.02778],
            "966": [0.19444, 0.43056, 0, 0.08334],
            "967": [0.19444, 0.43056, 0, 0.05556],
            "968": [0.19444, 0.69444, 0.03588, 0.11111],
            "969": [0, 0.43056, 0.03588, 0],
            "977": [0, 0.69444, 0, 0.08334],
            "981": [0.19444, 0.69444, 0, 0.08334],
            "982": [0, 0.43056, 0.02778, 0],
            "1009": [0.19444, 0.43056, 0, 0.08334],
            "1013": [0, 0.43056, 0, 0.05556]
        },
        "Math-Regular": {
            "65": [0, 0.68333, 0, 0.13889],
            "66": [0, 0.68333, 0.05017, 0.08334],
            "67": [0, 0.68333, 0.07153, 0.08334],
            "68": [0, 0.68333, 0.02778, 0.05556],
            "69": [0, 0.68333, 0.05764, 0.08334],
            "70": [0, 0.68333, 0.13889, 0.08334],
            "71": [0, 0.68333, 0, 0.08334],
            "72": [0, 0.68333, 0.08125, 0.05556],
            "73": [0, 0.68333, 0.07847, 0.11111],
            "74": [0, 0.68333, 0.09618, 0.16667],
            "75": [0, 0.68333, 0.07153, 0.05556],
            "76": [0, 0.68333, 0, 0.02778],
            "77": [0, 0.68333, 0.10903, 0.08334],
            "78": [0, 0.68333, 0.10903, 0.08334],
            "79": [0, 0.68333, 0.02778, 0.08334],
            "80": [0, 0.68333, 0.13889, 0.08334],
            "81": [0.19444, 0.68333, 0, 0.08334],
            "82": [0, 0.68333, 0.00773, 0.08334],
            "83": [0, 0.68333, 0.05764, 0.08334],
            "84": [0, 0.68333, 0.13889, 0.08334],
            "85": [0, 0.68333, 0.10903, 0.02778],
            "86": [0, 0.68333, 0.22222, 0],
            "87": [0, 0.68333, 0.13889, 0],
            "88": [0, 0.68333, 0.07847, 0.08334],
            "89": [0, 0.68333, 0.22222, 0],
            "90": [0, 0.68333, 0.07153, 0.08334],
            "97": [0, 0.43056, 0, 0],
            "98": [0, 0.69444, 0, 0],
            "99": [0, 0.43056, 0, 0.05556],
            "100": [0, 0.69444, 0, 0.16667],
            "101": [0, 0.43056, 0, 0.05556],
            "102": [0.19444, 0.69444, 0.10764, 0.16667],
            "103": [0.19444, 0.43056, 0.03588, 0.02778],
            "104": [0, 0.69444, 0, 0],
            "105": [0, 0.65952, 0, 0],
            "106": [0.19444, 0.65952, 0.05724, 0],
            "107": [0, 0.69444, 0.03148, 0],
            "108": [0, 0.69444, 0.01968, 0.08334],
            "109": [0, 0.43056, 0, 0],
            "110": [0, 0.43056, 0, 0],
            "111": [0, 0.43056, 0, 0.05556],
            "112": [0.19444, 0.43056, 0, 0.08334],
            "113": [0.19444, 0.43056, 0.03588, 0.08334],
            "114": [0, 0.43056, 0.02778, 0.05556],
            "115": [0, 0.43056, 0, 0.05556],
            "116": [0, 0.61508, 0, 0.08334],
            "117": [0, 0.43056, 0, 0.02778],
            "118": [0, 0.43056, 0.03588, 0.02778],
            "119": [0, 0.43056, 0.02691, 0.08334],
            "120": [0, 0.43056, 0, 0.02778],
            "121": [0.19444, 0.43056, 0.03588, 0.05556],
            "122": [0, 0.43056, 0.04398, 0.05556],
            "915": [0, 0.68333, 0.13889, 0.08334],
            "916": [0, 0.68333, 0, 0.16667],
            "920": [0, 0.68333, 0.02778, 0.08334],
            "923": [0, 0.68333, 0, 0.16667],
            "926": [0, 0.68333, 0.07569, 0.08334],
            "928": [0, 0.68333, 0.08125, 0.05556],
            "931": [0, 0.68333, 0.05764, 0.08334],
            "933": [0, 0.68333, 0.13889, 0.05556],
            "934": [0, 0.68333, 0, 0.08334],
            "936": [0, 0.68333, 0.11, 0.05556],
            "937": [0, 0.68333, 0.05017, 0.08334],
            "945": [0, 0.43056, 0.0037, 0.02778],
            "946": [0.19444, 0.69444, 0.05278, 0.08334],
            "947": [0.19444, 0.43056, 0.05556, 0],
            "948": [0, 0.69444, 0.03785, 0.05556],
            "949": [0, 0.43056, 0, 0.08334],
            "950": [0.19444, 0.69444, 0.07378, 0.08334],
            "951": [0.19444, 0.43056, 0.03588, 0.05556],
            "952": [0, 0.69444, 0.02778, 0.08334],
            "953": [0, 0.43056, 0, 0.05556],
            "954": [0, 0.43056, 0, 0],
            "955": [0, 0.69444, 0, 0],
            "956": [0.19444, 0.43056, 0, 0.02778],
            "957": [0, 0.43056, 0.06366, 0.02778],
            "958": [0.19444, 0.69444, 0.04601, 0.11111],
            "959": [0, 0.43056, 0, 0.05556],
            "960": [0, 0.43056, 0.03588, 0],
            "961": [0.19444, 0.43056, 0, 0.08334],
            "962": [0.09722, 0.43056, 0.07986, 0.08334],
            "963": [0, 0.43056, 0.03588, 0],
            "964": [0, 0.43056, 0.1132, 0.02778],
            "965": [0, 0.43056, 0.03588, 0.02778],
            "966": [0.19444, 0.43056, 0, 0.08334],
            "967": [0.19444, 0.43056, 0, 0.05556],
            "968": [0.19444, 0.69444, 0.03588, 0.11111],
            "969": [0, 0.43056, 0.03588, 0],
            "977": [0, 0.69444, 0, 0.08334],
            "981": [0.19444, 0.69444, 0, 0.08334],
            "982": [0, 0.43056, 0.02778, 0],
            "1009": [0.19444, 0.43056, 0, 0.08334],
            "1013": [0, 0.43056, 0, 0.05556]
        },
        "SansSerif-Regular": {
            "33": [0, 0.69444, 0, 0],
            "34": [0, 0.69444, 0, 0],
            "35": [0.19444, 0.69444, 0, 0],
            "36": [0.05556, 0.75, 0, 0],
            "37": [0.05556, 0.75, 0, 0],
            "38": [0, 0.69444, 0, 0],
            "39": [0, 0.69444, 0, 0],
            "40": [0.25, 0.75, 0, 0],
            "41": [0.25, 0.75, 0, 0],
            "42": [0, 0.75, 0, 0],
            "43": [0.08333, 0.58333, 0, 0],
            "44": [0.125, 0.08333, 0, 0],
            "45": [0, 0.44444, 0, 0],
            "46": [0, 0.08333, 0, 0],
            "47": [0.25, 0.75, 0, 0],
            "48": [0, 0.65556, 0, 0],
            "49": [0, 0.65556, 0, 0],
            "50": [0, 0.65556, 0, 0],
            "51": [0, 0.65556, 0, 0],
            "52": [0, 0.65556, 0, 0],
            "53": [0, 0.65556, 0, 0],
            "54": [0, 0.65556, 0, 0],
            "55": [0, 0.65556, 0, 0],
            "56": [0, 0.65556, 0, 0],
            "57": [0, 0.65556, 0, 0],
            "58": [0, 0.44444, 0, 0],
            "59": [0.125, 0.44444, 0, 0],
            "61": [-0.13, 0.37, 0, 0],
            "63": [0, 0.69444, 0, 0],
            "64": [0, 0.69444, 0, 0],
            "65": [0, 0.69444, 0, 0],
            "66": [0, 0.69444, 0, 0],
            "67": [0, 0.69444, 0, 0],
            "68": [0, 0.69444, 0, 0],
            "69": [0, 0.69444, 0, 0],
            "70": [0, 0.69444, 0, 0],
            "71": [0, 0.69444, 0, 0],
            "72": [0, 0.69444, 0, 0],
            "73": [0, 0.69444, 0, 0],
            "74": [0, 0.69444, 0, 0],
            "75": [0, 0.69444, 0, 0],
            "76": [0, 0.69444, 0, 0],
            "77": [0, 0.69444, 0, 0],
            "78": [0, 0.69444, 0, 0],
            "79": [0, 0.69444, 0, 0],
            "80": [0, 0.69444, 0, 0],
            "81": [0.125, 0.69444, 0, 0],
            "82": [0, 0.69444, 0, 0],
            "83": [0, 0.69444, 0, 0],
            "84": [0, 0.69444, 0, 0],
            "85": [0, 0.69444, 0, 0],
            "86": [0, 0.69444, 0.01389, 0],
            "87": [0, 0.69444, 0.01389, 0],
            "88": [0, 0.69444, 0, 0],
            "89": [0, 0.69444, 0.025, 0],
            "90": [0, 0.69444, 0, 0],
            "91": [0.25, 0.75, 0, 0],
            "93": [0.25, 0.75, 0, 0],
            "94": [0, 0.69444, 0, 0],
            "95": [0.35, 0.09444, 0.02778, 0],
            "97": [0, 0.44444, 0, 0],
            "98": [0, 0.69444, 0, 0],
            "99": [0, 0.44444, 0, 0],
            "100": [0, 0.69444, 0, 0],
            "101": [0, 0.44444, 0, 0],
            "102": [0, 0.69444, 0.06944, 0],
            "103": [0.19444, 0.44444, 0.01389, 0],
            "104": [0, 0.69444, 0, 0],
            "105": [0, 0.67937, 0, 0],
            "106": [0.19444, 0.67937, 0, 0],
            "107": [0, 0.69444, 0, 0],
            "108": [0, 0.69444, 0, 0],
            "109": [0, 0.44444, 0, 0],
            "110": [0, 0.44444, 0, 0],
            "111": [0, 0.44444, 0, 0],
            "112": [0.19444, 0.44444, 0, 0],
            "113": [0.19444, 0.44444, 0, 0],
            "114": [0, 0.44444, 0.01389, 0],
            "115": [0, 0.44444, 0, 0],
            "116": [0, 0.57143, 0, 0],
            "117": [0, 0.44444, 0, 0],
            "118": [0, 0.44444, 0.01389, 0],
            "119": [0, 0.44444, 0.01389, 0],
            "120": [0, 0.44444, 0, 0],
            "121": [0.19444, 0.44444, 0.01389, 0],
            "122": [0, 0.44444, 0, 0],
            "126": [0.35, 0.32659, 0, 0],
            "305": [0, 0.44444, 0, 0],
            "567": [0.19444, 0.44444, 0, 0],
            "768": [0, 0.69444, 0, 0],
            "769": [0, 0.69444, 0, 0],
            "770": [0, 0.69444, 0, 0],
            "771": [0, 0.67659, 0, 0],
            "772": [0, 0.60889, 0, 0],
            "774": [0, 0.69444, 0, 0],
            "775": [0, 0.67937, 0, 0],
            "776": [0, 0.67937, 0, 0],
            "778": [0, 0.69444, 0, 0],
            "779": [0, 0.69444, 0, 0],
            "780": [0, 0.63194, 0, 0],
            "915": [0, 0.69444, 0, 0],
            "916": [0, 0.69444, 0, 0],
            "920": [0, 0.69444, 0, 0],
            "923": [0, 0.69444, 0, 0],
            "926": [0, 0.69444, 0, 0],
            "928": [0, 0.69444, 0, 0],
            "931": [0, 0.69444, 0, 0],
            "933": [0, 0.69444, 0, 0],
            "934": [0, 0.69444, 0, 0],
            "936": [0, 0.69444, 0, 0],
            "937": [0, 0.69444, 0, 0],
            "8211": [0, 0.44444, 0.02778, 0],
            "8212": [0, 0.44444, 0.02778, 0],
            "8216": [0, 0.69444, 0, 0],
            "8217": [0, 0.69444, 0, 0],
            "8220": [0, 0.69444, 0, 0],
            "8221": [0, 0.69444, 0, 0]
        },
        "Script-Regular": {
            "65": [0, 0.7, 0.22925, 0],
            "66": [0, 0.7, 0.04087, 0],
            "67": [0, 0.7, 0.1689, 0],
            "68": [0, 0.7, 0.09371, 0],
            "69": [0, 0.7, 0.18583, 0],
            "70": [0, 0.7, 0.13634, 0],
            "71": [0, 0.7, 0.17322, 0],
            "72": [0, 0.7, 0.29694, 0],
            "73": [0, 0.7, 0.19189, 0],
            "74": [0.27778, 0.7, 0.19189, 0],
            "75": [0, 0.7, 0.31259, 0],
            "76": [0, 0.7, 0.19189, 0],
            "77": [0, 0.7, 0.15981, 0],
            "78": [0, 0.7, 0.3525, 0],
            "79": [0, 0.7, 0.08078, 0],
            "80": [0, 0.7, 0.08078, 0],
            "81": [0, 0.7, 0.03305, 0],
            "82": [0, 0.7, 0.06259, 0],
            "83": [0, 0.7, 0.19189, 0],
            "84": [0, 0.7, 0.29087, 0],
            "85": [0, 0.7, 0.25815, 0],
            "86": [0, 0.7, 0.27523, 0],
            "87": [0, 0.7, 0.27523, 0],
            "88": [0, 0.7, 0.26006, 0],
            "89": [0, 0.7, 0.2939, 0],
            "90": [0, 0.7, 0.24037, 0]
        },
        "Size1-Regular": {
            "40": [0.35001, 0.85, 0, 0],
            "41": [0.35001, 0.85, 0, 0],
            "47": [0.35001, 0.85, 0, 0],
            "91": [0.35001, 0.85, 0, 0],
            "92": [0.35001, 0.85, 0, 0],
            "93": [0.35001, 0.85, 0, 0],
            "123": [0.35001, 0.85, 0, 0],
            "125": [0.35001, 0.85, 0, 0],
            "710": [0, 0.72222, 0, 0],
            "732": [0, 0.72222, 0, 0],
            "770": [0, 0.72222, 0, 0],
            "771": [0, 0.72222, 0, 0],
            "8214": [-0.00099, 0.601, 0, 0],
            "8593": [1e-05, 0.6, 0, 0],
            "8595": [1e-05, 0.6, 0, 0],
            "8657": [1e-05, 0.6, 0, 0],
            "8659": [1e-05, 0.6, 0, 0],
            "8719": [0.25001, 0.75, 0, 0],
            "8720": [0.25001, 0.75, 0, 0],
            "8721": [0.25001, 0.75, 0, 0],
            "8730": [0.35001, 0.85, 0, 0],
            "8739": [-0.00599, 0.606, 0, 0],
            "8741": [-0.00599, 0.606, 0, 0],
            "8747": [0.30612, 0.805, 0.19445, 0],
            "8748": [0.306, 0.805, 0.19445, 0],
            "8749": [0.306, 0.805, 0.19445, 0],
            "8750": [0.30612, 0.805, 0.19445, 0],
            "8896": [0.25001, 0.75, 0, 0],
            "8897": [0.25001, 0.75, 0, 0],
            "8898": [0.25001, 0.75, 0, 0],
            "8899": [0.25001, 0.75, 0, 0],
            "8968": [0.35001, 0.85, 0, 0],
            "8969": [0.35001, 0.85, 0, 0],
            "8970": [0.35001, 0.85, 0, 0],
            "8971": [0.35001, 0.85, 0, 0],
            "9168": [-0.00099, 0.601, 0, 0],
            "10216": [0.35001, 0.85, 0, 0],
            "10217": [0.35001, 0.85, 0, 0],
            "10752": [0.25001, 0.75, 0, 0],
            "10753": [0.25001, 0.75, 0, 0],
            "10754": [0.25001, 0.75, 0, 0],
            "10756": [0.25001, 0.75, 0, 0],
            "10758": [0.25001, 0.75, 0, 0]
        },
        "Size2-Regular": {
            "40": [0.65002, 1.15, 0, 0],
            "41": [0.65002, 1.15, 0, 0],
            "47": [0.65002, 1.15, 0, 0],
            "91": [0.65002, 1.15, 0, 0],
            "92": [0.65002, 1.15, 0, 0],
            "93": [0.65002, 1.15, 0, 0],
            "123": [0.65002, 1.15, 0, 0],
            "125": [0.65002, 1.15, 0, 0],
            "710": [0, 0.75, 0, 0],
            "732": [0, 0.75, 0, 0],
            "770": [0, 0.75, 0, 0],
            "771": [0, 0.75, 0, 0],
            "8719": [0.55001, 1.05, 0, 0],
            "8720": [0.55001, 1.05, 0, 0],
            "8721": [0.55001, 1.05, 0, 0],
            "8730": [0.65002, 1.15, 0, 0],
            "8747": [0.86225, 1.36, 0.44445, 0],
            "8748": [0.862, 1.36, 0.44445, 0],
            "8749": [0.862, 1.36, 0.44445, 0],
            "8750": [0.86225, 1.36, 0.44445, 0],
            "8896": [0.55001, 1.05, 0, 0],
            "8897": [0.55001, 1.05, 0, 0],
            "8898": [0.55001, 1.05, 0, 0],
            "8899": [0.55001, 1.05, 0, 0],
            "8968": [0.65002, 1.15, 0, 0],
            "8969": [0.65002, 1.15, 0, 0],
            "8970": [0.65002, 1.15, 0, 0],
            "8971": [0.65002, 1.15, 0, 0],
            "10216": [0.65002, 1.15, 0, 0],
            "10217": [0.65002, 1.15, 0, 0],
            "10752": [0.55001, 1.05, 0, 0],
            "10753": [0.55001, 1.05, 0, 0],
            "10754": [0.55001, 1.05, 0, 0],
            "10756": [0.55001, 1.05, 0, 0],
            "10758": [0.55001, 1.05, 0, 0]
        },
        "Size3-Regular": {
            "40": [0.95003, 1.45, 0, 0],
            "41": [0.95003, 1.45, 0, 0],
            "47": [0.95003, 1.45, 0, 0],
            "91": [0.95003, 1.45, 0, 0],
            "92": [0.95003, 1.45, 0, 0],
            "93": [0.95003, 1.45, 0, 0],
            "123": [0.95003, 1.45, 0, 0],
            "125": [0.95003, 1.45, 0, 0],
            "710": [0, 0.75, 0, 0],
            "732": [0, 0.75, 0, 0],
            "770": [0, 0.75, 0, 0],
            "771": [0, 0.75, 0, 0],
            "8730": [0.95003, 1.45, 0, 0],
            "8968": [0.95003, 1.45, 0, 0],
            "8969": [0.95003, 1.45, 0, 0],
            "8970": [0.95003, 1.45, 0, 0],
            "8971": [0.95003, 1.45, 0, 0],
            "10216": [0.95003, 1.45, 0, 0],
            "10217": [0.95003, 1.45, 0, 0]
        },
        "Size4-Regular": {
            "40": [1.25003, 1.75, 0, 0],
            "41": [1.25003, 1.75, 0, 0],
            "47": [1.25003, 1.75, 0, 0],
            "91": [1.25003, 1.75, 0, 0],
            "92": [1.25003, 1.75, 0, 0],
            "93": [1.25003, 1.75, 0, 0],
            "123": [1.25003, 1.75, 0, 0],
            "125": [1.25003, 1.75, 0, 0],
            "710": [0, 0.825, 0, 0],
            "732": [0, 0.825, 0, 0],
            "770": [0, 0.825, 0, 0],
            "771": [0, 0.825, 0, 0],
            "8730": [1.25003, 1.75, 0, 0],
            "8968": [1.25003, 1.75, 0, 0],
            "8969": [1.25003, 1.75, 0, 0],
            "8970": [1.25003, 1.75, 0, 0],
            "8971": [1.25003, 1.75, 0, 0],
            "9115": [0.64502, 1.155, 0, 0],
            "9116": [1e-05, 0.6, 0, 0],
            "9117": [0.64502, 1.155, 0, 0],
            "9118": [0.64502, 1.155, 0, 0],
            "9119": [1e-05, 0.6, 0, 0],
            "9120": [0.64502, 1.155, 0, 0],
            "9121": [0.64502, 1.155, 0, 0],
            "9122": [-0.00099, 0.601, 0, 0],
            "9123": [0.64502, 1.155, 0, 0],
            "9124": [0.64502, 1.155, 0, 0],
            "9125": [-0.00099, 0.601, 0, 0],
            "9126": [0.64502, 1.155, 0, 0],
            "9127": [1e-05, 0.9, 0, 0],
            "9128": [0.65002, 1.15, 0, 0],
            "9129": [0.90001, 0, 0, 0],
            "9130": [0, 0.3, 0, 0],
            "9131": [1e-05, 0.9, 0, 0],
            "9132": [0.65002, 1.15, 0, 0],
            "9133": [0.90001, 0, 0, 0],
            "9143": [0.88502, 0.915, 0, 0],
            "10216": [1.25003, 1.75, 0, 0],
            "10217": [1.25003, 1.75, 0, 0],
            "57344": [-0.00499, 0.605, 0, 0],
            "57345": [-0.00499, 0.605, 0, 0],
            "57680": [0, 0.12, 0, 0],
            "57681": [0, 0.12, 0, 0],
            "57682": [0, 0.12, 0, 0],
            "57683": [0, 0.12, 0, 0]
        },
        "Typewriter-Regular": {
            "33": [0, 0.61111, 0, 0],
            "34": [0, 0.61111, 0, 0],
            "35": [0, 0.61111, 0, 0],
            "36": [0.08333, 0.69444, 0, 0],
            "37": [0.08333, 0.69444, 0, 0],
            "38": [0, 0.61111, 0, 0],
            "39": [0, 0.61111, 0, 0],
            "40": [0.08333, 0.69444, 0, 0],
            "41": [0.08333, 0.69444, 0, 0],
            "42": [0, 0.52083, 0, 0],
            "43": [-0.08056, 0.53055, 0, 0],
            "44": [0.13889, 0.125, 0, 0],
            "45": [-0.08056, 0.53055, 0, 0],
            "46": [0, 0.125, 0, 0],
            "47": [0.08333, 0.69444, 0, 0],
            "48": [0, 0.61111, 0, 0],
            "49": [0, 0.61111, 0, 0],
            "50": [0, 0.61111, 0, 0],
            "51": [0, 0.61111, 0, 0],
            "52": [0, 0.61111, 0, 0],
            "53": [0, 0.61111, 0, 0],
            "54": [0, 0.61111, 0, 0],
            "55": [0, 0.61111, 0, 0],
            "56": [0, 0.61111, 0, 0],
            "57": [0, 0.61111, 0, 0],
            "58": [0, 0.43056, 0, 0],
            "59": [0.13889, 0.43056, 0, 0],
            "60": [-0.05556, 0.55556, 0, 0],
            "61": [-0.19549, 0.41562, 0, 0],
            "62": [-0.05556, 0.55556, 0, 0],
            "63": [0, 0.61111, 0, 0],
            "64": [0, 0.61111, 0, 0],
            "65": [0, 0.61111, 0, 0],
            "66": [0, 0.61111, 0, 0],
            "67": [0, 0.61111, 0, 0],
            "68": [0, 0.61111, 0, 0],
            "69": [0, 0.61111, 0, 0],
            "70": [0, 0.61111, 0, 0],
            "71": [0, 0.61111, 0, 0],
            "72": [0, 0.61111, 0, 0],
            "73": [0, 0.61111, 0, 0],
            "74": [0, 0.61111, 0, 0],
            "75": [0, 0.61111, 0, 0],
            "76": [0, 0.61111, 0, 0],
            "77": [0, 0.61111, 0, 0],
            "78": [0, 0.61111, 0, 0],
            "79": [0, 0.61111, 0, 0],
            "80": [0, 0.61111, 0, 0],
            "81": [0.13889, 0.61111, 0, 0],
            "82": [0, 0.61111, 0, 0],
            "83": [0, 0.61111, 0, 0],
            "84": [0, 0.61111, 0, 0],
            "85": [0, 0.61111, 0, 0],
            "86": [0, 0.61111, 0, 0],
            "87": [0, 0.61111, 0, 0],
            "88": [0, 0.61111, 0, 0],
            "89": [0, 0.61111, 0, 0],
            "90": [0, 0.61111, 0, 0],
            "91": [0.08333, 0.69444, 0, 0],
            "92": [0.08333, 0.69444, 0, 0],
            "93": [0.08333, 0.69444, 0, 0],
            "94": [0, 0.61111, 0, 0],
            "95": [0.09514, 0, 0, 0],
            "96": [0, 0.61111, 0, 0],
            "97": [0, 0.43056, 0, 0],
            "98": [0, 0.61111, 0, 0],
            "99": [0, 0.43056, 0, 0],
            "100": [0, 0.61111, 0, 0],
            "101": [0, 0.43056, 0, 0],
            "102": [0, 0.61111, 0, 0],
            "103": [0.22222, 0.43056, 0, 0],
            "104": [0, 0.61111, 0, 0],
            "105": [0, 0.61111, 0, 0],
            "106": [0.22222, 0.61111, 0, 0],
            "107": [0, 0.61111, 0, 0],
            "108": [0, 0.61111, 0, 0],
            "109": [0, 0.43056, 0, 0],
            "110": [0, 0.43056, 0, 0],
            "111": [0, 0.43056, 0, 0],
            "112": [0.22222, 0.43056, 0, 0],
            "113": [0.22222, 0.43056, 0, 0],
            "114": [0, 0.43056, 0, 0],
            "115": [0, 0.43056, 0, 0],
            "116": [0, 0.55358, 0, 0],
            "117": [0, 0.43056, 0, 0],
            "118": [0, 0.43056, 0, 0],
            "119": [0, 0.43056, 0, 0],
            "120": [0, 0.43056, 0, 0],
            "121": [0.22222, 0.43056, 0, 0],
            "122": [0, 0.43056, 0, 0],
            "123": [0.08333, 0.69444, 0, 0],
            "124": [0.08333, 0.69444, 0, 0],
            "125": [0.08333, 0.69444, 0, 0],
            "126": [0, 0.61111, 0, 0],
            "127": [0, 0.61111, 0, 0],
            "305": [0, 0.43056, 0, 0],
            "567": [0.22222, 0.43056, 0, 0],
            "768": [0, 0.61111, 0, 0],
            "769": [0, 0.61111, 0, 0],
            "770": [0, 0.61111, 0, 0],
            "771": [0, 0.61111, 0, 0],
            "772": [0, 0.56555, 0, 0],
            "774": [0, 0.61111, 0, 0],
            "776": [0, 0.61111, 0, 0],
            "778": [0, 0.61111, 0, 0],
            "780": [0, 0.56597, 0, 0],
            "915": [0, 0.61111, 0, 0],
            "916": [0, 0.61111, 0, 0],
            "920": [0, 0.61111, 0, 0],
            "923": [0, 0.61111, 0, 0],
            "926": [0, 0.61111, 0, 0],
            "928": [0, 0.61111, 0, 0],
            "931": [0, 0.61111, 0, 0],
            "933": [0, 0.61111, 0, 0],
            "934": [0, 0.61111, 0, 0],
            "936": [0, 0.61111, 0, 0],
            "937": [0, 0.61111, 0, 0],
            "2018": [0, 0.61111, 0, 0],
            "2019": [0, 0.61111, 0, 0],
            "8242": [0, 0.61111, 0, 0]
        }
    };

    var cjkRegex = unicodeRegexes.cjkRegex;

    /**
 * This file contains metrics regarding fonts and individual symbols. The sigma
 * and xi variables, as well as the metricMap map contain data extracted from
 * TeX, TeX font metrics, and the TTF files. These data are then exposed via the
 * `metrics` variable and the getCharacterMetrics function.
 */

    // In TeX, there are actually three sets of dimensions, one for each of
    // textstyle, scriptstyle, and scriptscriptstyle.  These are provided in the
    // the arrays below, in that order.
    //
    // The font metrics are stored in fonts cmsy10, cmsy7, and cmsy5 respsectively.
    // This was determined by running the folllowing script:
    //
    //     latex -interaction=nonstopmode \
    //     '\documentclass{article}\usepackage{amsmath}\begin{document}' \
    //     '$a$ \expandafter\show\the\textfont2' \
    //     '\expandafter\show\the\scriptfont2' \
    //     '\expandafter\show\the\scriptscriptfont2' \
    //     '\stop'
    //
    // The metrics themselves were retreived using the following commands:
    //
    //     tftopl cmsy10
    //     tftopl cmsy7
    //     tftopl cmsy5
    //
    // The output of each of these commands is quite lengthy.  The only part we
    // care about is the FONTDIMEN section. Each value is measured in EMs.
    var sigmas$1 = {
        slant: [0.250, 0.250, 0.250],
        // sigma1
        space: [0.000, 0.000, 0.000],
        // sigma2
        stretch: [0.000, 0.000, 0.000],
        // sigma3
        shrink: [0.000, 0.000, 0.000],
        // sigma4
        xHeight: [0.431, 0.431, 0.431],
        // sigma5
        quad: [1.000, 1.171, 1.472],
        // sigma6
        extraSpace: [0.000, 0.000, 0.000],
        // sigma7
        num1: [0.677, 0.732, 0.925],
        // sigma8
        num2: [0.394, 0.384, 0.387],
        // sigma9
        num3: [0.444, 0.471, 0.504],
        // sigma10
        denom1: [0.686, 0.752, 1.025],
        // sigma11
        denom2: [0.345, 0.344, 0.532],
        // sigma12
        sup1: [0.413, 0.503, 0.504],
        // sigma13
        sup2: [0.363, 0.431, 0.404],
        // sigma14
        sup3: [0.289, 0.286, 0.294],
        // sigma15
        sub1: [0.150, 0.143, 0.200],
        // sigma16
        sub2: [0.247, 0.286, 0.400],
        // sigma17
        supDrop: [0.386, 0.353, 0.494],
        // sigma18
        subDrop: [0.050, 0.071, 0.100],
        // sigma19
        delim1: [2.390, 1.700, 1.980],
        // sigma20
        delim2: [1.010, 1.157, 1.420],
        // sigma21
        axisHeight: [0.250, 0.250, 0.250]// sigma22
    };

    var xi8 = 0.04;
    var xi9 = 0.111;
    var xi10 = 0.166;
    var xi11 = 0.2;
    var xi12 = 0.6;
    var xi13 = 0.1;

    // This value determines how large a pt is, for metrics which are defined in
    // terms of pts.
    // This value is also used in katex.less; if you change it make sure the values
    // match.
    var ptPerEm = 10.0;

    // The space between adjacent `|` columns in an array definition. From
    // `\showthe\doublerulesep` in LaTeX.
    var doubleRuleSep = 2.0 / ptPerEm;

    /**
 * This is just a mapping from common names to real metrics
 */
    var metrics$1 = {
        defaultRuleThickness: xi8,
        bigOpSpacing1: xi9,
        bigOpSpacing2: xi10,
        bigOpSpacing3: xi11,
        bigOpSpacing4: xi12,
        bigOpSpacing5: xi13,
        ptPerEm: ptPerEm,
        doubleRuleSep: doubleRuleSep
    };

    // This map contains a mapping from font name and character code to character
    // metrics, including height, depth, italic correction, and skew (kern from the
    // character to the corresponding \skewchar)
    // This map is generated via `make metrics`. It should not be changed manually.
    var metricMap = fontMetricsData;

    // These are very rough approximations.  We default to Times New Roman which
    // should have Latin-1 and Cyrillic characters, but may not depending on the
    // operating system.  The metrics do not account for extra height from the
    // accents.  In the case of Cyrillic characters which have both ascenders and
    // descenders we prefer approximations with ascenders, primarily to prevent
    // the fraction bar or root line from intersecting the glyph.
    // TODO(kevinb) allow union of multiple glyph metrics for better accuracy.
    var extraCharacterMap = {
        // Latin-1
        'À': 'A',
        'Á': 'A',
        'Â': 'A',
        'Ã': 'A',
        'Ä': 'A',
        'Å': 'A',
        'Æ': 'A',
        'Ç': 'C',
        'È': 'E',
        'É': 'E',
        'Ê': 'E',
        'Ë': 'E',
        'Ì': 'I',
        'Í': 'I',
        'Î': 'I',
        'Ï': 'I',
        'Ð': 'D',
        'Ñ': 'N',
        'Ò': 'O',
        'Ó': 'O',
        'Ô': 'O',
        'Õ': 'O',
        'Ö': 'O',
        'Ø': 'O',
        'Ù': 'U',
        'Ú': 'U',
        'Û': 'U',
        'Ü': 'U',
        'Ý': 'Y',
        'Þ': 'o',
        'ß': 'B',
        'à': 'a',
        'á': 'a',
        'â': 'a',
        'ã': 'a',
        'ä': 'a',
        'å': 'a',
        'æ': 'a',
        'ç': 'c',
        'è': 'e',
        'é': 'e',
        'ê': 'e',
        'ë': 'e',
        'ì': 'i',
        'í': 'i',
        'î': 'i',
        'ï': 'i',
        'ð': 'd',
        'ñ': 'n',
        'ò': 'o',
        'ó': 'o',
        'ô': 'o',
        'õ': 'o',
        'ö': 'o',
        'ø': 'o',
        'ù': 'u',
        'ú': 'u',
        'û': 'u',
        'ü': 'u',
        'ý': 'y',
        'þ': 'o',
        'ÿ': 'y',

        // Cyrillic
        'А': 'A',
        'Б': 'B',
        'В': 'B',
        'Г': 'F',
        'Д': 'A',
        'Е': 'E',
        'Ж': 'K',
        'З': '3',
        'И': 'N',
        'Й': 'N',
        'К': 'K',
        'Л': 'N',
        'М': 'M',
        'Н': 'H',
        'О': 'O',
        'П': 'N',
        'Р': 'P',
        'С': 'C',
        'Т': 'T',
        'У': 'y',
        'Ф': 'O',
        'Х': 'X',
        'Ц': 'U',
        'Ч': 'h',
        'Ш': 'W',
        'Щ': 'W',
        'Ъ': 'B',
        'Ы': 'X',
        'Ь': 'B',
        'Э': '3',
        'Ю': 'X',
        'Я': 'R',
        'а': 'a',
        'б': 'b',
        'в': 'a',
        'г': 'r',
        'д': 'y',
        'е': 'e',
        'ж': 'm',
        'з': 'e',
        'и': 'n',
        'й': 'n',
        'к': 'n',
        'л': 'n',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'n',
        'р': 'p',
        'с': 'c',
        'т': 'o',
        'у': 'y',
        'ф': 'b',
        'х': 'x',
        'ц': 'n',
        'ч': 'n',
        'ш': 'w',
        'щ': 'w',
        'ъ': 'a',
        'ы': 'm',
        'ь': 'a',
        'э': 'e',
        'ю': 'm',
        'я': 'r'
    };

    /**
 * This function is a convenience function for looking up information in the
 * metricMap table. It takes a character as a string, and a style.
 *
 * Note: the `width` property may be undefined if fontMetricsData.js wasn't
 * built using `Make extended_metrics`.
 */
    var getCharacterMetrics = function(character, style) {
        var ch = character.charCodeAt(0);
        if (character[0]in extraCharacterMap) {
            ch = extraCharacterMap[character[0]].charCodeAt(0);
        } else if (cjkRegex.test(character[0])) {
            ch = 'M'.charCodeAt(0);
        }
        var metrics = metricMap[style][ch];
        if (metrics) {
            return {
                depth: metrics[0],
                height: metrics[1],
                italic: metrics[2],
                skew: metrics[3],
                width: metrics[4]
            };
        }
    };

    var fontMetrics$1 = {
        metrics: metrics$1,
        sigmas: sigmas$1,
        getCharacterMetrics: getCharacterMetrics
    };

    /**
 * This file contains information and classes for the various kinds of styles
 * used in TeX. It provides a generic `Style` class, which holds information
 * about a specific style. It then provides instances of all the different kinds
 * of styles possible, and provides functions to move between them and get
 * information about them.
 */

    var sigmas = fontMetrics$1.sigmas;

    var metrics = [{}, {}, {}];
    var i$1;
    for (var key in sigmas) {
        if (sigmas.hasOwnProperty(key)) {
            for (i$1 = 0; i$1 < 3; i$1++) {
                metrics[i$1][key] = sigmas[key][i$1];
            }
        }
    }
    for (i$1 = 0; i$1 < 3; i$1++) {
        metrics[i$1].emPerEx = sigmas.xHeight[i$1] / sigmas.quad[i$1];
    }

    /**
 * The main style class. Contains a unique id for the style, a size (which is
 * the same for cramped and uncramped version of a style), a cramped flag, and a
 * size multiplier, which gives the size difference between a style and
 * textstyle.
 */
    function Style$2(id, size, multiplier, cramped) {
        this.id = id;
        this.size = size;
        this.cramped = cramped;
        this.sizeMultiplier = multiplier;
        this.metrics = metrics[size > 0 ? size - 1 : 0];
    }

    /**
 * Get the style of a superscript given a base in the current style.
 */
    Style$2.prototype.sup = function() {
        return styles$1[sup[this.id]];
    }
    ;

    /**
 * Get the style of a subscript given a base in the current style.
 */
    Style$2.prototype.sub = function() {
        return styles$1[sub[this.id]];
    }
    ;

    /**
 * Get the style of a fraction numerator given the fraction in the current
 * style.
 */
    Style$2.prototype.fracNum = function() {
        return styles$1[fracNum[this.id]];
    }
    ;

    /**
 * Get the style of a fraction denominator given the fraction in the current
 * style.
 */
    Style$2.prototype.fracDen = function() {
        return styles$1[fracDen[this.id]];
    }
    ;

    /**
 * Get the cramped version of a style (in particular, cramping a cramped style
 * doesn't change the style).
 */
    Style$2.prototype.cramp = function() {
        return styles$1[cramp[this.id]];
    }
    ;

    /**
 * HTML class name, like "displaystyle cramped"
 */
    Style$2.prototype.cls = function() {
        return sizeNames[this.size] + (this.cramped ? " cramped" : " uncramped");
    }
    ;

    /**
 * HTML Reset class name, like "reset-textstyle"
 */
    Style$2.prototype.reset = function() {
        return resetNames[this.size];
    }
    ;

    /**
 * Return if this style is tightly spaced (scriptstyle/scriptscriptstyle)
 */
    Style$2.prototype.isTight = function() {
        return this.size >= 2;
    }
    ;

    // IDs of the different styles
    var D = 0;
    var Dc = 1;
    var T = 2;
    var Tc = 3;
    var S = 4;
    var Sc = 5;
    var SS = 6;
    var SSc = 7;

    // String names for the different sizes
    var sizeNames = ["displaystyle textstyle", "textstyle", "scriptstyle", "scriptscriptstyle"];

    // Reset names for the different sizes
    var resetNames = ["reset-textstyle", "reset-textstyle", "reset-scriptstyle", "reset-scriptscriptstyle"];

    // Instances of the different styles
    var styles$1 = [new Style$2(D,0,1.0,false), new Style$2(Dc,0,1.0,true), new Style$2(T,1,1.0,false), new Style$2(Tc,1,1.0,true), new Style$2(S,2,0.7,false), new Style$2(Sc,2,0.7,true), new Style$2(SS,3,0.5,false), new Style$2(SSc,3,0.5,true)];

    // Lookup tables for switching from one style to another
    var sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
    var sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
    var fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
    var fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
    var cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];

    // We only export some of the styles. Also, we don't export the `Style` class so
    // no more styles can be generated.
    var Style_1 = {
        DISPLAY: styles$1[D],
        TEXT: styles$1[T],
        SCRIPT: styles$1[S],
        SCRIPTSCRIPT: styles$1[SS]
    };

    /**
 * This file contains a list of utility functions which are useful in other
 * files.
 */

    /**
 * Provide an `indexOf` function which works in IE8, but defers to native if
 * possible.
 */
    var nativeIndexOf = Array.prototype.indexOf;
    var indexOf = function(list, elem) {
        if (list == null) {
            return -1;
        }
        if (nativeIndexOf && list.indexOf === nativeIndexOf) {
            return list.indexOf(elem);
        }
        var i = 0;
        var l = list.length;
        for (; i < l; i++) {
            if (list[i] === elem) {
                return i;
            }
        }
        return -1;
    };

    /**
 * Return whether an element is contained in a list
 */
    var contains = function(list, elem) {
        return indexOf(list, elem) !== -1;
    };

    /**
 * Provide a default value if a setting is undefined
 */
    var deflt = function(setting, defaultIfUndefined) {
        return setting === undefined ? defaultIfUndefined : setting;
    };

    // hyphenate and escape adapted from Facebook's React under Apache 2 license

    var uppercase = /([A-Z])/g;
    var hyphenate = function(str) {
        return str.replace(uppercase, "-$1").toLowerCase();
    };

    var ESCAPE_LOOKUP = {
        "&": "&amp;",
        ">": "&gt;",
        "<": "&lt;",
        "\"": "&quot;",
        "'": "&#x27;"
    };

    var ESCAPE_REGEX = /[&><"']/g;

    function escaper(match) {
        return ESCAPE_LOOKUP[match];
    }

    /**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
    function escape$1(text) {
        return ("" + text).replace(ESCAPE_REGEX, escaper);
    }

    /**
 * A function to set the text content of a DOM element in all supported
 * browsers. Note that we don't define this if there is no document.
 */
    var setTextContent;
    if (typeof document !== "undefined") {
        var testNode = document.createElement("span");
        if ("textContent"in testNode) {
            setTextContent = function(node, text) {
                node.textContent = text;
            }
            ;
        } else {
            setTextContent = function(node, text) {
                node.innerText = text;
            }
            ;
        }
    }

    /**
 * A function to clear a node.
 */
    function clearNode(node) {
        setTextContent(node, "");
    }

    var utils$4 = {
        contains: contains,
        deflt: deflt,
        escape: escape$1,
        hyphenate: hyphenate,
        indexOf: indexOf,
        setTextContent: setTextContent,
        clearNode: clearNode
    };

    /**
 * These objects store the data about the DOM nodes we create, as well as some
 * extra data. They can then be transformed into real DOM nodes with the
 * `toNode` function or HTML markup using `toMarkup`. They are useful for both
 * storing extra properties on the nodes, as well as providing a way to easily
 * work with the DOM.
 *
 * Similar functions for working with MathML nodes exist in mathMLTree.js.
 */
    var unicodeRegexes$2 = unicodeRegexes;
    var utils$3 = utils$4;

    /**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove null or empty classes.
 */
    var createClass = function(classes) {
        classes = classes.slice();
        for (var i = classes.length - 1; i >= 0; i--) {
            if (!classes[i]) {
                classes.splice(i, 1);
            }
        }

        return classes.join(" ");
    };

    /**
 * This node represents a span node, with a className, a list of children, and
 * an inline style. It also contains information about its height, depth, and
 * maxFontSize.
 */
    function span(classes, children, options) {
        this.classes = classes || [];
        this.children = children || [];
        this.height = 0;
        this.depth = 0;
        this.maxFontSize = 0;
        this.style = {};
        this.attributes = {};
        if (options) {
            if (options.style.isTight()) {
                this.classes.push("mtight");
            }
            if (options.getColor()) {
                this.style.color = options.getColor();
            }
        }
    }

    /**
 * Sets an arbitrary attribute on the span. Warning: use this wisely. Not all
 * browsers support attributes the same, and having too many custom attributes
 * is probably bad.
 */
    span.prototype.setAttribute = function(attribute, value) {
        this.attributes[attribute] = value;
    }
    ;

    span.prototype.tryCombine = function(sibling) {
        return false;
    }
    ;

    /**
 * Convert the span into an HTML node
 */
    span.prototype.toNode = function() {
        var this$1 = this;

        var span = document.createElement("span");

        // Apply the class
        span.className = createClass(this.classes);

        // Apply inline styles
        for (var style in this.style) {
            if (Object.prototype.hasOwnProperty.call(this$1.style, style)) {
                span.style[style] = this$1.style[style];
            }
        }

        // Apply attributes
        for (var attr in this.attributes) {
            if (Object.prototype.hasOwnProperty.call(this$1.attributes, attr)) {
                span.setAttribute(attr, this$1.attributes[attr]);
            }
        }

        // Append the children, also as HTML nodes
        for (var i = 0; i < this.children.length; i++) {
            span.appendChild(this$1.children[i].toNode());
        }

        return span;
    }
    ;

    /**
 * Convert the span into an HTML markup string
 */
    span.prototype.toMarkup = function() {
        var this$1 = this;

        var markup = "<span";

        // Add the class
        if (this.classes.length) {
            markup += " class=\"";
            markup += utils$3.escape(createClass(this.classes));
            markup += "\"";
        }

        var styles = "";

        // Add the styles, after hyphenation
        for (var style in this.style) {
            if (this$1.style.hasOwnProperty(style)) {
                styles += utils$3.hyphenate(style) + ":" + this$1.style[style] + ";";
            }
        }

        if (styles) {
            markup += " style=\"" + utils$3.escape(styles) + "\"";
        }

        // Add the attributes
        for (var attr in this.attributes) {
            if (Object.prototype.hasOwnProperty.call(this$1.attributes, attr)) {
                markup += " " + attr + "=\"";
                markup += utils$3.escape(this$1.attributes[attr]);
                markup += "\"";
            }
        }

        markup += ">";

        // Add the markup of the children, also as markup
        for (var i = 0; i < this.children.length; i++) {
            markup += this$1.children[i].toMarkup();
        }

        markup += "</span>";

        return markup;
    }
    ;

    /**
 * This node represents a document fragment, which contains elements, but when
 * placed into the DOM doesn't have any representation itself. Thus, it only
 * contains children and doesn't have any HTML properties. It also keeps track
 * of a height, depth, and maxFontSize.
 */
    function documentFragment(children) {
        this.children = children || [];
        this.height = 0;
        this.depth = 0;
        this.maxFontSize = 0;
    }

    /**
 * Convert the fragment into a node
 */
    documentFragment.prototype.toNode = function() {
        var this$1 = this;

        // Create a fragment
        var frag = document.createDocumentFragment();

        // Append the children
        for (var i = 0; i < this.children.length; i++) {
            frag.appendChild(this$1.children[i].toNode());
        }

        return frag;
    }
    ;

    /**
 * Convert the fragment into HTML markup
 */
    documentFragment.prototype.toMarkup = function() {
        var this$1 = this;

        var markup = "";

        // Simply concatenate the markup for the children together
        for (var i = 0; i < this.children.length; i++) {
            markup += this$1.children[i].toMarkup();
        }

        return markup;
    }
    ;

    var iCombinations = {
        'î': '\u0131\u0302',
        'ï': '\u0131\u0308',
        'í': '\u0131\u0301',
        // 'ī': '\u0131\u0304', // enable when we add Extended Latin
        'ì': '\u0131\u0300'
    };

    /**
 * A symbol node contains information about a single symbol. It either renders
 * to a single text node, or a span with a single text node in it, depending on
 * whether it has CSS classes, styles, or needs italic correction.
 */
    function symbolNode(value, height, depth, italic, skew, classes, style) {
        this.value = value || "";
        this.height = height || 0;
        this.depth = depth || 0;
        this.italic = italic || 0;
        this.skew = skew || 0;
        this.classes = classes || [];
        this.style = style || {};
        this.maxFontSize = 0;

        // Mark CJK characters with specific classes so that we can specify which
        // fonts to use.  This allows us to render these characters with a serif
        // font in situations where the browser would either default to a sans serif
        // or render a placeholder character.
        if (unicodeRegexes$2.cjkRegex.test(value)) {
            // I couldn't find any fonts that contained Hangul as well as all of
            // the other characters we wanted to test there for it gets its own
            // CSS class.
            if (unicodeRegexes$2.hangulRegex.test(value)) {
                this.classes.push('hangul_fallback');
            } else {
                this.classes.push('cjk_fallback');
            }
        }

        if (/[îïíì]/.test(this.value)) {
            // add ī when we add Extended Latin
            this.value = iCombinations[this.value];
        }
    }

    symbolNode.prototype.tryCombine = function(sibling) {
        var this$1 = this;

        if (!sibling || !(sibling instanceof symbolNode) || this.italic > 0 || createClass(this.classes) !== createClass(sibling.classes) || this.skew !== sibling.skew || this.maxFontSize !== sibling.maxFontSize) {
            return false;
        }
        for (var style in this.style) {
            if (this$1.style.hasOwnProperty(style) && this$1.style[style] !== sibling.style[style]) {
                return false;
            }
        }
        for (style in sibling.style) {
            if (sibling.style.hasOwnProperty(style) && this$1.style[style] !== sibling.style[style]) {
                return false;
            }
        }
        this.value += sibling.value;
        this.height = Math.max(this.height, sibling.height);
        this.depth = Math.max(this.depth, sibling.depth);
        this.italic = sibling.italic;
        return true;
    }
    ;

    /**
 * Creates a text node or span from a symbol node. Note that a span is only
 * created if it is needed.
 */
    symbolNode.prototype.toNode = function() {
        var this$1 = this;

        var node = document.createTextNode(this.value);
        var span = null;

        if (this.italic > 0) {
            span = document.createElement("span");
            span.style.marginRight = this.italic + "em";
        }

        if (this.classes.length > 0) {
            span = span || document.createElement("span");
            span.className = createClass(this.classes);
        }

        for (var style in this.style) {
            if (this$1.style.hasOwnProperty(style)) {
                span = span || document.createElement("span");
                span.style[style] = this$1.style[style];
            }
        }

        if (span) {
            span.appendChild(node);
            return span;
        } else {
            return node;
        }
    }
    ;

    /**
 * Creates markup for a symbol node.
 */
    symbolNode.prototype.toMarkup = function() {
        var this$1 = this;

        // TODO(alpert): More duplication than I'd like from
        // span.prototype.toMarkup and symbolNode.prototype.toNode...
        var needsSpan = false;

        var markup = "<span";

        if (this.classes.length) {
            needsSpan = true;
            markup += " class=\"";
            markup += utils$3.escape(createClass(this.classes));
            markup += "\"";
        }

        var styles = "";

        if (this.italic > 0) {
            styles += "margin-right:" + this.italic + "em;";
        }
        for (var style in this.style) {
            if (this$1.style.hasOwnProperty(style)) {
                styles += utils$3.hyphenate(style) + ":" + this$1.style[style] + ";";
            }
        }

        if (styles) {
            needsSpan = true;
            markup += " style=\"" + utils$3.escape(styles) + "\"";
        }

        var escaped = utils$3.escape(this.value);
        if (needsSpan) {
            markup += ">";
            markup += escaped;
            markup += "</span>";
            return markup;
        } else {
            return escaped;
        }
    }
    ;

    var domTree$2 = {
        span: span,
        documentFragment: documentFragment,
        symbolNode: symbolNode
    };

    var symbols$1 = createCommonjsModule(function(module) {
        /**
 * This file holds a list of all no-argument functions and single-character
 * symbols (like 'a' or ';').
 *
 * For each of the symbols, there are three properties they can have:
 * - font (required): the font to be used for this symbol. Either "main" (the
     normal font), or "ams" (the ams fonts).
 * - group (required): the ParseNode group type the symbol should have (i.e.
     "textord", "mathord", etc).
     See https://github.com/Khan/KaTeX/wiki/Examining-TeX#group-types
 * - replace: the character that this symbol or function should be
 *   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
 *   character in the main font).
 *
 * The outermost map in the table indicates what mode the symbols should be
 * accepted in (e.g. "math" or "text").
 */

        module.exports = {
            math: {},
            text: {}
        };

        function defineSymbol(mode, font, group, replace, name) {
            module.exports[mode][name] = {
                font: font,
                group: group,
                replace: replace
            };
        }

        // Some abbreviations for commonly used strings.
        // This helps minify the code, and also spotting typos using jshint.

        // modes:
        var math = "math";
        var text = "text";

        // fonts:
        var main = "main";
        var ams = "ams";

        // groups:
        var accent = "accent";
        var bin = "bin";
        var close = "close";
        var inner = "inner";
        var mathord = "mathord";
        var op = "op";
        var open = "open";
        var punct = "punct";
        var rel = "rel";
        var spacing = "spacing";
        var textord = "textord";

        // Now comes the symbol table

        // Relation Symbols
        defineSymbol(math, main, rel, "\u2261", "\\equiv");
        defineSymbol(math, main, rel, "\u227a", "\\prec");
        defineSymbol(math, main, rel, "\u227b", "\\succ");
        defineSymbol(math, main, rel, "\u223c", "\\sim");
        defineSymbol(math, main, rel, "\u22a5", "\\perp");
        defineSymbol(math, main, rel, "\u2aaf", "\\preceq");
        defineSymbol(math, main, rel, "\u2ab0", "\\succeq");
        defineSymbol(math, main, rel, "\u2243", "\\simeq");
        defineSymbol(math, main, rel, "\u2223", "\\mid");
        defineSymbol(math, main, rel, "\u226a", "\\ll");
        defineSymbol(math, main, rel, "\u226b", "\\gg");
        defineSymbol(math, main, rel, "\u224d", "\\asymp");
        defineSymbol(math, main, rel, "\u2225", "\\parallel");
        defineSymbol(math, main, rel, "\u22c8", "\\bowtie");
        defineSymbol(math, main, rel, "\u2323", "\\smile");
        defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq");
        defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq");
        defineSymbol(math, main, rel, "\u2250", "\\doteq");
        defineSymbol(math, main, rel, "\u2322", "\\frown");
        defineSymbol(math, main, rel, "\u220b", "\\ni");
        defineSymbol(math, main, rel, "\u221d", "\\propto");
        defineSymbol(math, main, rel, "\u22a2", "\\vdash");
        defineSymbol(math, main, rel, "\u22a3", "\\dashv");
        defineSymbol(math, main, rel, "\u220b", "\\owns");

        // Punctuation
        defineSymbol(math, main, punct, "\u002e", "\\ldotp");
        defineSymbol(math, main, punct, "\u22c5", "\\cdotp");

        // Misc Symbols
        defineSymbol(math, main, textord, "\u0023", "\\#");
        defineSymbol(text, main, textord, "\u0023", "\\#");
        defineSymbol(math, main, textord, "\u0026", "\\&");
        defineSymbol(text, main, textord, "\u0026", "\\&");
        defineSymbol(math, main, textord, "\u2135", "\\aleph");
        defineSymbol(math, main, textord, "\u2200", "\\forall");
        defineSymbol(math, main, textord, "\u210f", "\\hbar");
        defineSymbol(math, main, textord, "\u2203", "\\exists");
        defineSymbol(math, main, textord, "\u2207", "\\nabla");
        defineSymbol(math, main, textord, "\u266d", "\\flat");
        defineSymbol(math, main, textord, "\u2113", "\\ell");
        defineSymbol(math, main, textord, "\u266e", "\\natural");
        defineSymbol(math, main, textord, "\u2663", "\\clubsuit");
        defineSymbol(math, main, textord, "\u2118", "\\wp");
        defineSymbol(math, main, textord, "\u266f", "\\sharp");
        defineSymbol(math, main, textord, "\u2662", "\\diamondsuit");
        defineSymbol(math, main, textord, "\u211c", "\\Re");
        defineSymbol(math, main, textord, "\u2661", "\\heartsuit");
        defineSymbol(math, main, textord, "\u2111", "\\Im");
        defineSymbol(math, main, textord, "\u2660", "\\spadesuit");

        // Math and Text
        defineSymbol(math, main, textord, "\u2020", "\\dag");
        defineSymbol(math, main, textord, "\u2021", "\\ddag");

        // Large Delimiters
        defineSymbol(math, main, close, "\u23b1", "\\rmoustache");
        defineSymbol(math, main, open, "\u23b0", "\\lmoustache");
        defineSymbol(math, main, close, "\u27ef", "\\rgroup");
        defineSymbol(math, main, open, "\u27ee", "\\lgroup");

        // Binary Operators
        defineSymbol(math, main, bin, "\u2213", "\\mp");
        defineSymbol(math, main, bin, "\u2296", "\\ominus");
        defineSymbol(math, main, bin, "\u228e", "\\uplus");
        defineSymbol(math, main, bin, "\u2293", "\\sqcap");
        defineSymbol(math, main, bin, "\u2217", "\\ast");
        defineSymbol(math, main, bin, "\u2294", "\\sqcup");
        defineSymbol(math, main, bin, "\u25ef", "\\bigcirc");
        defineSymbol(math, main, bin, "\u2219", "\\bullet");
        defineSymbol(math, main, bin, "\u2021", "\\ddagger");
        defineSymbol(math, main, bin, "\u2240", "\\wr");
        defineSymbol(math, main, bin, "\u2a3f", "\\amalg");

        // Arrow Symbols
        defineSymbol(math, main, rel, "\u27f5", "\\longleftarrow");
        defineSymbol(math, main, rel, "\u21d0", "\\Leftarrow");
        defineSymbol(math, main, rel, "\u27f8", "\\Longleftarrow");
        defineSymbol(math, main, rel, "\u27f6", "\\longrightarrow");
        defineSymbol(math, main, rel, "\u21d2", "\\Rightarrow");
        defineSymbol(math, main, rel, "\u27f9", "\\Longrightarrow");
        defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow");
        defineSymbol(math, main, rel, "\u27f7", "\\longleftrightarrow");
        defineSymbol(math, main, rel, "\u21d4", "\\Leftrightarrow");
        defineSymbol(math, main, rel, "\u27fa", "\\Longleftrightarrow");
        defineSymbol(math, main, rel, "\u21a6", "\\mapsto");
        defineSymbol(math, main, rel, "\u27fc", "\\longmapsto");
        defineSymbol(math, main, rel, "\u2197", "\\nearrow");
        defineSymbol(math, main, rel, "\u21a9", "\\hookleftarrow");
        defineSymbol(math, main, rel, "\u21aa", "\\hookrightarrow");
        defineSymbol(math, main, rel, "\u2198", "\\searrow");
        defineSymbol(math, main, rel, "\u21bc", "\\leftharpoonup");
        defineSymbol(math, main, rel, "\u21c0", "\\rightharpoonup");
        defineSymbol(math, main, rel, "\u2199", "\\swarrow");
        defineSymbol(math, main, rel, "\u21bd", "\\leftharpoondown");
        defineSymbol(math, main, rel, "\u21c1", "\\rightharpoondown");
        defineSymbol(math, main, rel, "\u2196", "\\nwarrow");
        defineSymbol(math, main, rel, "\u21cc", "\\rightleftharpoons");

        // AMS Negated Binary Relations
        defineSymbol(math, ams, rel, "\u226e", "\\nless");
        defineSymbol(math, ams, rel, "\ue010", "\\nleqslant");
        defineSymbol(math, ams, rel, "\ue011", "\\nleqq");
        defineSymbol(math, ams, rel, "\u2a87", "\\lneq");
        defineSymbol(math, ams, rel, "\u2268", "\\lneqq");
        defineSymbol(math, ams, rel, "\ue00c", "\\lvertneqq");
        defineSymbol(math, ams, rel, "\u22e6", "\\lnsim");
        defineSymbol(math, ams, rel, "\u2a89", "\\lnapprox");
        defineSymbol(math, ams, rel, "\u2280", "\\nprec");
        defineSymbol(math, ams, rel, "\u22e0", "\\npreceq");
        defineSymbol(math, ams, rel, "\u22e8", "\\precnsim");
        defineSymbol(math, ams, rel, "\u2ab9", "\\precnapprox");
        defineSymbol(math, ams, rel, "\u2241", "\\nsim");
        defineSymbol(math, ams, rel, "\ue006", "\\nshortmid");
        defineSymbol(math, ams, rel, "\u2224", "\\nmid");
        defineSymbol(math, ams, rel, "\u22ac", "\\nvdash");
        defineSymbol(math, ams, rel, "\u22ad", "\\nvDash");
        defineSymbol(math, ams, rel, "\u22ea", "\\ntriangleleft");
        defineSymbol(math, ams, rel, "\u22ec", "\\ntrianglelefteq");
        defineSymbol(math, ams, rel, "\u228a", "\\subsetneq");
        defineSymbol(math, ams, rel, "\ue01a", "\\varsubsetneq");
        defineSymbol(math, ams, rel, "\u2acb", "\\subsetneqq");
        defineSymbol(math, ams, rel, "\ue017", "\\varsubsetneqq");
        defineSymbol(math, ams, rel, "\u226f", "\\ngtr");
        defineSymbol(math, ams, rel, "\ue00f", "\\ngeqslant");
        defineSymbol(math, ams, rel, "\ue00e", "\\ngeqq");
        defineSymbol(math, ams, rel, "\u2a88", "\\gneq");
        defineSymbol(math, ams, rel, "\u2269", "\\gneqq");
        defineSymbol(math, ams, rel, "\ue00d", "\\gvertneqq");
        defineSymbol(math, ams, rel, "\u22e7", "\\gnsim");
        defineSymbol(math, ams, rel, "\u2a8a", "\\gnapprox");
        defineSymbol(math, ams, rel, "\u2281", "\\nsucc");
        defineSymbol(math, ams, rel, "\u22e1", "\\nsucceq");
        defineSymbol(math, ams, rel, "\u22e9", "\\succnsim");
        defineSymbol(math, ams, rel, "\u2aba", "\\succnapprox");
        defineSymbol(math, ams, rel, "\u2246", "\\ncong");
        defineSymbol(math, ams, rel, "\ue007", "\\nshortparallel");
        defineSymbol(math, ams, rel, "\u2226", "\\nparallel");
        defineSymbol(math, ams, rel, "\u22af", "\\nVDash");
        defineSymbol(math, ams, rel, "\u22eb", "\\ntriangleright");
        defineSymbol(math, ams, rel, "\u22ed", "\\ntrianglerighteq");
        defineSymbol(math, ams, rel, "\ue018", "\\nsupseteqq");
        defineSymbol(math, ams, rel, "\u228b", "\\supsetneq");
        defineSymbol(math, ams, rel, "\ue01b", "\\varsupsetneq");
        defineSymbol(math, ams, rel, "\u2acc", "\\supsetneqq");
        defineSymbol(math, ams, rel, "\ue019", "\\varsupsetneqq");
        defineSymbol(math, ams, rel, "\u22ae", "\\nVdash");
        defineSymbol(math, ams, rel, "\u2ab5", "\\precneqq");
        defineSymbol(math, ams, rel, "\u2ab6", "\\succneqq");
        defineSymbol(math, ams, rel, "\ue016", "\\nsubseteqq");
        defineSymbol(math, ams, bin, "\u22b4", "\\unlhd");
        defineSymbol(math, ams, bin, "\u22b5", "\\unrhd");

        // AMS Negated Arrows
        defineSymbol(math, ams, rel, "\u219a", "\\nleftarrow");
        defineSymbol(math, ams, rel, "\u219b", "\\nrightarrow");
        defineSymbol(math, ams, rel, "\u21cd", "\\nLeftarrow");
        defineSymbol(math, ams, rel, "\u21cf", "\\nRightarrow");
        defineSymbol(math, ams, rel, "\u21ae", "\\nleftrightarrow");
        defineSymbol(math, ams, rel, "\u21ce", "\\nLeftrightarrow");

        // AMS Misc
        defineSymbol(math, ams, rel, "\u25b3", "\\vartriangle");
        defineSymbol(math, ams, textord, "\u210f", "\\hslash");
        defineSymbol(math, ams, textord, "\u25bd", "\\triangledown");
        defineSymbol(math, ams, textord, "\u25ca", "\\lozenge");
        defineSymbol(math, ams, textord, "\u24c8", "\\circledS");
        defineSymbol(math, ams, textord, "\u00ae", "\\circledR");
        defineSymbol(math, ams, textord, "\u2221", "\\measuredangle");
        defineSymbol(math, ams, textord, "\u2204", "\\nexists");
        defineSymbol(math, ams, textord, "\u2127", "\\mho");
        defineSymbol(math, ams, textord, "\u2132", "\\Finv");
        defineSymbol(math, ams, textord, "\u2141", "\\Game");
        defineSymbol(math, ams, textord, "\u006b", "\\Bbbk");
        defineSymbol(math, ams, textord, "\u2035", "\\backprime");
        defineSymbol(math, ams, textord, "\u25b2", "\\blacktriangle");
        defineSymbol(math, ams, textord, "\u25bc", "\\blacktriangledown");
        defineSymbol(math, ams, textord, "\u25a0", "\\blacksquare");
        defineSymbol(math, ams, textord, "\u29eb", "\\blacklozenge");
        defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
        defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle");
        defineSymbol(math, ams, textord, "\u2201", "\\complement");
        defineSymbol(math, ams, textord, "\u00f0", "\\eth");
        defineSymbol(math, ams, textord, "\u2571", "\\diagup");
        defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
        defineSymbol(math, ams, textord, "\u25a1", "\\square");
        defineSymbol(math, ams, textord, "\u25a1", "\\Box");
        defineSymbol(math, ams, textord, "\u25ca", "\\Diamond");
        defineSymbol(math, ams, textord, "\u00a5", "\\yen");
        defineSymbol(math, ams, textord, "\u2713", "\\checkmark");

        // AMS Hebrew
        defineSymbol(math, ams, textord, "\u2136", "\\beth");
        defineSymbol(math, ams, textord, "\u2138", "\\daleth");
        defineSymbol(math, ams, textord, "\u2137", "\\gimel");

        // AMS Greek
        defineSymbol(math, ams, textord, "\u03dd", "\\digamma");
        defineSymbol(math, ams, textord, "\u03f0", "\\varkappa");

        // AMS Delimiters
        defineSymbol(math, ams, open, "\u250c", "\\ulcorner");
        defineSymbol(math, ams, close, "\u2510", "\\urcorner");
        defineSymbol(math, ams, open, "\u2514", "\\llcorner");
        defineSymbol(math, ams, close, "\u2518", "\\lrcorner");

        // AMS Binary Relations
        defineSymbol(math, ams, rel, "\u2266", "\\leqq");
        defineSymbol(math, ams, rel, "\u2a7d", "\\leqslant");
        defineSymbol(math, ams, rel, "\u2a95", "\\eqslantless");
        defineSymbol(math, ams, rel, "\u2272", "\\lesssim");
        defineSymbol(math, ams, rel, "\u2a85", "\\lessapprox");
        defineSymbol(math, ams, rel, "\u224a", "\\approxeq");
        defineSymbol(math, ams, bin, "\u22d6", "\\lessdot");
        defineSymbol(math, ams, rel, "\u22d8", "\\lll");
        defineSymbol(math, ams, rel, "\u2276", "\\lessgtr");
        defineSymbol(math, ams, rel, "\u22da", "\\lesseqgtr");
        defineSymbol(math, ams, rel, "\u2a8b", "\\lesseqqgtr");
        defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
        defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq");
        defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq");
        defineSymbol(math, ams, rel, "\u223d", "\\backsim");
        defineSymbol(math, ams, rel, "\u22cd", "\\backsimeq");
        defineSymbol(math, ams, rel, "\u2ac5", "\\subseteqq");
        defineSymbol(math, ams, rel, "\u22d0", "\\Subset");
        defineSymbol(math, ams, rel, "\u228f", "\\sqsubset");
        defineSymbol(math, ams, rel, "\u227c", "\\preccurlyeq");
        defineSymbol(math, ams, rel, "\u22de", "\\curlyeqprec");
        defineSymbol(math, ams, rel, "\u227e", "\\precsim");
        defineSymbol(math, ams, rel, "\u2ab7", "\\precapprox");
        defineSymbol(math, ams, rel, "\u22b2", "\\vartriangleleft");
        defineSymbol(math, ams, rel, "\u22b4", "\\trianglelefteq");
        defineSymbol(math, ams, rel, "\u22a8", "\\vDash");
        defineSymbol(math, ams, rel, "\u22aa", "\\Vvdash");
        defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
        defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
        defineSymbol(math, ams, rel, "\u224f", "\\bumpeq");
        defineSymbol(math, ams, rel, "\u224e", "\\Bumpeq");
        defineSymbol(math, ams, rel, "\u2267", "\\geqq");
        defineSymbol(math, ams, rel, "\u2a7e", "\\geqslant");
        defineSymbol(math, ams, rel, "\u2a96", "\\eqslantgtr");
        defineSymbol(math, ams, rel, "\u2273", "\\gtrsim");
        defineSymbol(math, ams, rel, "\u2a86", "\\gtrapprox");
        defineSymbol(math, ams, bin, "\u22d7", "\\gtrdot");
        defineSymbol(math, ams, rel, "\u22d9", "\\ggg");
        defineSymbol(math, ams, rel, "\u2277", "\\gtrless");
        defineSymbol(math, ams, rel, "\u22db", "\\gtreqless");
        defineSymbol(math, ams, rel, "\u2a8c", "\\gtreqqless");
        defineSymbol(math, ams, rel, "\u2256", "\\eqcirc");
        defineSymbol(math, ams, rel, "\u2257", "\\circeq");
        defineSymbol(math, ams, rel, "\u225c", "\\triangleq");
        defineSymbol(math, ams, rel, "\u223c", "\\thicksim");
        defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
        defineSymbol(math, ams, rel, "\u2ac6", "\\supseteqq");
        defineSymbol(math, ams, rel, "\u22d1", "\\Supset");
        defineSymbol(math, ams, rel, "\u2290", "\\sqsupset");
        defineSymbol(math, ams, rel, "\u227d", "\\succcurlyeq");
        defineSymbol(math, ams, rel, "\u22df", "\\curlyeqsucc");
        defineSymbol(math, ams, rel, "\u227f", "\\succsim");
        defineSymbol(math, ams, rel, "\u2ab8", "\\succapprox");
        defineSymbol(math, ams, rel, "\u22b3", "\\vartriangleright");
        defineSymbol(math, ams, rel, "\u22b5", "\\trianglerighteq");
        defineSymbol(math, ams, rel, "\u22a9", "\\Vdash");
        defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
        defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
        defineSymbol(math, ams, rel, "\u226c", "\\between");
        defineSymbol(math, ams, rel, "\u22d4", "\\pitchfork");
        defineSymbol(math, ams, rel, "\u221d", "\\varpropto");
        defineSymbol(math, ams, rel, "\u25c0", "\\blacktriangleleft");
        defineSymbol(math, ams, rel, "\u2234", "\\therefore");
        defineSymbol(math, ams, rel, "\u220d", "\\backepsilon");
        defineSymbol(math, ams, rel, "\u25b6", "\\blacktriangleright");
        defineSymbol(math, ams, rel, "\u2235", "\\because");
        defineSymbol(math, ams, rel, "\u22d8", "\\llless");
        defineSymbol(math, ams, rel, "\u22d9", "\\gggtr");
        defineSymbol(math, ams, bin, "\u22b2", "\\lhd");
        defineSymbol(math, ams, bin, "\u22b3", "\\rhd");
        defineSymbol(math, ams, rel, "\u2242", "\\eqsim");
        defineSymbol(math, main, rel, "\u22c8", "\\Join");
        defineSymbol(math, ams, rel, "\u2251", "\\Doteq");

        // AMS Binary Operators
        defineSymbol(math, ams, bin, "\u2214", "\\dotplus");
        defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
        defineSymbol(math, ams, bin, "\u22d2", "\\Cap");
        defineSymbol(math, ams, bin, "\u22d3", "\\Cup");
        defineSymbol(math, ams, bin, "\u2a5e", "\\doublebarwedge");
        defineSymbol(math, ams, bin, "\u229f", "\\boxminus");
        defineSymbol(math, ams, bin, "\u229e", "\\boxplus");
        defineSymbol(math, ams, bin, "\u22c7", "\\divideontimes");
        defineSymbol(math, ams, bin, "\u22c9", "\\ltimes");
        defineSymbol(math, ams, bin, "\u22ca", "\\rtimes");
        defineSymbol(math, ams, bin, "\u22cb", "\\leftthreetimes");
        defineSymbol(math, ams, bin, "\u22cc", "\\rightthreetimes");
        defineSymbol(math, ams, bin, "\u22cf", "\\curlywedge");
        defineSymbol(math, ams, bin, "\u22ce", "\\curlyvee");
        defineSymbol(math, ams, bin, "\u229d", "\\circleddash");
        defineSymbol(math, ams, bin, "\u229b", "\\circledast");
        defineSymbol(math, ams, bin, "\u22c5", "\\centerdot");
        defineSymbol(math, ams, bin, "\u22ba", "\\intercal");
        defineSymbol(math, ams, bin, "\u22d2", "\\doublecap");
        defineSymbol(math, ams, bin, "\u22d3", "\\doublecup");
        defineSymbol(math, ams, bin, "\u22a0", "\\boxtimes");

        // AMS Arrows
        defineSymbol(math, ams, rel, "\u21e2", "\\dashrightarrow");
        defineSymbol(math, ams, rel, "\u21e0", "\\dashleftarrow");
        defineSymbol(math, ams, rel, "\u21c7", "\\leftleftarrows");
        defineSymbol(math, ams, rel, "\u21c6", "\\leftrightarrows");
        defineSymbol(math, ams, rel, "\u21da", "\\Lleftarrow");
        defineSymbol(math, ams, rel, "\u219e", "\\twoheadleftarrow");
        defineSymbol(math, ams, rel, "\u21a2", "\\leftarrowtail");
        defineSymbol(math, ams, rel, "\u21ab", "\\looparrowleft");
        defineSymbol(math, ams, rel, "\u21cb", "\\leftrightharpoons");
        defineSymbol(math, ams, rel, "\u21b6", "\\curvearrowleft");
        defineSymbol(math, ams, rel, "\u21ba", "\\circlearrowleft");
        defineSymbol(math, ams, rel, "\u21b0", "\\Lsh");
        defineSymbol(math, ams, rel, "\u21c8", "\\upuparrows");
        defineSymbol(math, ams, rel, "\u21bf", "\\upharpoonleft");
        defineSymbol(math, ams, rel, "\u21c3", "\\downharpoonleft");
        defineSymbol(math, ams, rel, "\u22b8", "\\multimap");
        defineSymbol(math, ams, rel, "\u21ad", "\\leftrightsquigarrow");
        defineSymbol(math, ams, rel, "\u21c9", "\\rightrightarrows");
        defineSymbol(math, ams, rel, "\u21c4", "\\rightleftarrows");
        defineSymbol(math, ams, rel, "\u21a0", "\\twoheadrightarrow");
        defineSymbol(math, ams, rel, "\u21a3", "\\rightarrowtail");
        defineSymbol(math, ams, rel, "\u21ac", "\\looparrowright");
        defineSymbol(math, ams, rel, "\u21b7", "\\curvearrowright");
        defineSymbol(math, ams, rel, "\u21bb", "\\circlearrowright");
        defineSymbol(math, ams, rel, "\u21b1", "\\Rsh");
        defineSymbol(math, ams, rel, "\u21ca", "\\downdownarrows");
        defineSymbol(math, ams, rel, "\u21be", "\\upharpoonright");
        defineSymbol(math, ams, rel, "\u21c2", "\\downharpoonright");
        defineSymbol(math, ams, rel, "\u21dd", "\\rightsquigarrow");
        defineSymbol(math, ams, rel, "\u21dd", "\\leadsto");
        defineSymbol(math, ams, rel, "\u21db", "\\Rrightarrow");
        defineSymbol(math, ams, rel, "\u21be", "\\restriction");

        defineSymbol(math, main, textord, "\u2018", "`");
        defineSymbol(math, main, textord, "$", "\\$");
        defineSymbol(text, main, textord, "$", "\\$");
        defineSymbol(math, main, textord, "%", "\\%");
        defineSymbol(text, main, textord, "%", "\\%");
        defineSymbol(math, main, textord, "_", "\\_");
        defineSymbol(text, main, textord, "_", "\\_");
        defineSymbol(math, main, textord, "\u2220", "\\angle");
        defineSymbol(math, main, textord, "\u221e", "\\infty");
        defineSymbol(math, main, textord, "\u2032", "\\prime");
        defineSymbol(math, main, textord, "\u25b3", "\\triangle");
        defineSymbol(math, main, textord, "\u0393", "\\Gamma");
        defineSymbol(math, main, textord, "\u0394", "\\Delta");
        defineSymbol(math, main, textord, "\u0398", "\\Theta");
        defineSymbol(math, main, textord, "\u039b", "\\Lambda");
        defineSymbol(math, main, textord, "\u039e", "\\Xi");
        defineSymbol(math, main, textord, "\u03a0", "\\Pi");
        defineSymbol(math, main, textord, "\u03a3", "\\Sigma");
        defineSymbol(math, main, textord, "\u03a5", "\\Upsilon");
        defineSymbol(math, main, textord, "\u03a6", "\\Phi");
        defineSymbol(math, main, textord, "\u03a8", "\\Psi");
        defineSymbol(math, main, textord, "\u03a9", "\\Omega");
        defineSymbol(math, main, textord, "\u00ac", "\\neg");
        defineSymbol(math, main, textord, "\u00ac", "\\lnot");
        defineSymbol(math, main, textord, "\u22a4", "\\top");
        defineSymbol(math, main, textord, "\u22a5", "\\bot");
        defineSymbol(math, main, textord, "\u2205", "\\emptyset");
        defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
        defineSymbol(math, main, mathord, "\u03b1", "\\alpha");
        defineSymbol(math, main, mathord, "\u03b2", "\\beta");
        defineSymbol(math, main, mathord, "\u03b3", "\\gamma");
        defineSymbol(math, main, mathord, "\u03b4", "\\delta");
        defineSymbol(math, main, mathord, "\u03f5", "\\epsilon");
        defineSymbol(math, main, mathord, "\u03b6", "\\zeta");
        defineSymbol(math, main, mathord, "\u03b7", "\\eta");
        defineSymbol(math, main, mathord, "\u03b8", "\\theta");
        defineSymbol(math, main, mathord, "\u03b9", "\\iota");
        defineSymbol(math, main, mathord, "\u03ba", "\\kappa");
        defineSymbol(math, main, mathord, "\u03bb", "\\lambda");
        defineSymbol(math, main, mathord, "\u03bc", "\\mu");
        defineSymbol(math, main, mathord, "\u03bd", "\\nu");
        defineSymbol(math, main, mathord, "\u03be", "\\xi");
        defineSymbol(math, main, mathord, "o", "\\omicron");
        defineSymbol(math, main, mathord, "\u03c0", "\\pi");
        defineSymbol(math, main, mathord, "\u03c1", "\\rho");
        defineSymbol(math, main, mathord, "\u03c3", "\\sigma");
        defineSymbol(math, main, mathord, "\u03c4", "\\tau");
        defineSymbol(math, main, mathord, "\u03c5", "\\upsilon");
        defineSymbol(math, main, mathord, "\u03d5", "\\phi");
        defineSymbol(math, main, mathord, "\u03c7", "\\chi");
        defineSymbol(math, main, mathord, "\u03c8", "\\psi");
        defineSymbol(math, main, mathord, "\u03c9", "\\omega");
        defineSymbol(math, main, mathord, "\u03b5", "\\varepsilon");
        defineSymbol(math, main, mathord, "\u03d1", "\\vartheta");
        defineSymbol(math, main, mathord, "\u03d6", "\\varpi");
        defineSymbol(math, main, mathord, "\u03f1", "\\varrho");
        defineSymbol(math, main, mathord, "\u03c2", "\\varsigma");
        defineSymbol(math, main, mathord, "\u03c6", "\\varphi");
        defineSymbol(math, main, bin, "\u2217", "*");
        defineSymbol(math, main, bin, "+", "+");
        defineSymbol(math, main, bin, "\u2212", "-");
        defineSymbol(math, main, bin, "\u22c5", "\\cdot");
        defineSymbol(math, main, bin, "\u2218", "\\circ");
        defineSymbol(math, main, bin, "\u00f7", "\\div");
        defineSymbol(math, main, bin, "\u00b1", "\\pm");
        defineSymbol(math, main, bin, "\u00d7", "\\times");
        defineSymbol(math, main, bin, "\u2229", "\\cap");
        defineSymbol(math, main, bin, "\u222a", "\\cup");
        defineSymbol(math, main, bin, "\u2216", "\\setminus");
        defineSymbol(math, main, bin, "\u2227", "\\land");
        defineSymbol(math, main, bin, "\u2228", "\\lor");
        defineSymbol(math, main, bin, "\u2227", "\\wedge");
        defineSymbol(math, main, bin, "\u2228", "\\vee");
        defineSymbol(math, main, textord, "\u221a", "\\surd");
        defineSymbol(math, main, open, "(", "(");
        defineSymbol(math, main, open, "[", "[");
        defineSymbol(math, main, open, "\u27e8", "\\langle");
        defineSymbol(math, main, open, "\u2223", "\\lvert");
        defineSymbol(math, main, open, "\u2225", "\\lVert");
        defineSymbol(math, main, close, ")", ")");
        defineSymbol(math, main, close, "]", "]");
        defineSymbol(math, main, close, "?", "?");
        defineSymbol(math, main, close, "!", "!");
        defineSymbol(math, main, close, "\u27e9", "\\rangle");
        defineSymbol(math, main, close, "\u2223", "\\rvert");
        defineSymbol(math, main, close, "\u2225", "\\rVert");
        defineSymbol(math, main, rel, "=", "=");
        defineSymbol(math, main, rel, "<", "<");
        defineSymbol(math, main, rel, ">", ">");
        defineSymbol(math, main, rel, ":", ":");
        defineSymbol(math, main, rel, "\u2248", "\\approx");
        defineSymbol(math, main, rel, "\u2245", "\\cong");
        defineSymbol(math, main, rel, "\u2265", "\\ge");
        defineSymbol(math, main, rel, "\u2265", "\\geq");
        defineSymbol(math, main, rel, "\u2190", "\\gets");
        defineSymbol(math, main, rel, ">", "\\gt");
        defineSymbol(math, main, rel, "\u2208", "\\in");
        defineSymbol(math, main, rel, "\u2209", "\\notin");
        defineSymbol(math, main, rel, "\u2282", "\\subset");
        defineSymbol(math, main, rel, "\u2283", "\\supset");
        defineSymbol(math, main, rel, "\u2286", "\\subseteq");
        defineSymbol(math, main, rel, "\u2287", "\\supseteq");
        defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq");
        defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq");
        defineSymbol(math, main, rel, "\u22a8", "\\models");
        defineSymbol(math, main, rel, "\u2190", "\\leftarrow");
        defineSymbol(math, main, rel, "\u2264", "\\le");
        defineSymbol(math, main, rel, "\u2264", "\\leq");
        defineSymbol(math, main, rel, "<", "\\lt");
        defineSymbol(math, main, rel, "\u2260", "\\ne");
        defineSymbol(math, main, rel, "\u2260", "\\neq");
        defineSymbol(math, main, rel, "\u2192", "\\rightarrow");
        defineSymbol(math, main, rel, "\u2192", "\\to");
        defineSymbol(math, ams, rel, "\u2271", "\\ngeq");
        defineSymbol(math, ams, rel, "\u2270", "\\nleq");
        defineSymbol(math, main, spacing, null, "\\!");
        defineSymbol(math, main, spacing, "\u00a0", "\\ ");
        defineSymbol(math, main, spacing, "\u00a0", "~");
        defineSymbol(math, main, spacing, null, "\\,");
        defineSymbol(math, main, spacing, null, "\\:");
        defineSymbol(math, main, spacing, null, "\\;");
        defineSymbol(math, main, spacing, null, "\\enspace");
        defineSymbol(math, main, spacing, null, "\\qquad");
        defineSymbol(math, main, spacing, null, "\\quad");
        defineSymbol(math, main, spacing, "\u00a0", "\\space");
        defineSymbol(math, main, punct, ",", ",");
        defineSymbol(math, main, punct, ";", ";");
        defineSymbol(math, main, punct, ":", "\\colon");
        defineSymbol(math, ams, bin, "\u22bc", "\\barwedge");
        defineSymbol(math, ams, bin, "\u22bb", "\\veebar");
        defineSymbol(math, main, bin, "\u2299", "\\odot");
        defineSymbol(math, main, bin, "\u2295", "\\oplus");
        defineSymbol(math, main, bin, "\u2297", "\\otimes");
        defineSymbol(math, main, textord, "\u2202", "\\partial");
        defineSymbol(math, main, bin, "\u2298", "\\oslash");
        defineSymbol(math, ams, bin, "\u229a", "\\circledcirc");
        defineSymbol(math, ams, bin, "\u22a1", "\\boxdot");
        defineSymbol(math, main, bin, "\u25b3", "\\bigtriangleup");
        defineSymbol(math, main, bin, "\u25bd", "\\bigtriangledown");
        defineSymbol(math, main, bin, "\u2020", "\\dagger");
        defineSymbol(math, main, bin, "\u22c4", "\\diamond");
        defineSymbol(math, main, bin, "\u22c6", "\\star");
        defineSymbol(math, main, bin, "\u25c3", "\\triangleleft");
        defineSymbol(math, main, bin, "\u25b9", "\\triangleright");
        defineSymbol(math, main, open, "{", "\\{");
        defineSymbol(text, main, textord, "{", "\\{");
        defineSymbol(math, main, close, "}", "\\}");
        defineSymbol(text, main, textord, "}", "\\}");
        defineSymbol(math, main, open, "{", "\\lbrace");
        defineSymbol(math, main, close, "}", "\\rbrace");
        defineSymbol(math, main, open, "[", "\\lbrack");
        defineSymbol(math, main, close, "]", "\\rbrack");
        defineSymbol(math, main, open, "\u230a", "\\lfloor");
        defineSymbol(math, main, close, "\u230b", "\\rfloor");
        defineSymbol(math, main, open, "\u2308", "\\lceil");
        defineSymbol(math, main, close, "\u2309", "\\rceil");
        defineSymbol(math, main, textord, "\\", "\\backslash");
        defineSymbol(math, main, textord, "\u2223", "|");
        defineSymbol(math, main, textord, "\u2223", "\\vert");
        defineSymbol(math, main, textord, "\u2225", "\\|");
        defineSymbol(math, main, textord, "\u2225", "\\Vert");
        defineSymbol(math, main, rel, "\u2191", "\\uparrow");
        defineSymbol(math, main, rel, "\u21d1", "\\Uparrow");
        defineSymbol(math, main, rel, "\u2193", "\\downarrow");
        defineSymbol(math, main, rel, "\u21d3", "\\Downarrow");
        defineSymbol(math, main, rel, "\u2195", "\\updownarrow");
        defineSymbol(math, main, rel, "\u21d5", "\\Updownarrow");
        defineSymbol(math, math, op, "\u2210", "\\coprod");
        defineSymbol(math, math, op, "\u22c1", "\\bigvee");
        defineSymbol(math, math, op, "\u22c0", "\\bigwedge");
        defineSymbol(math, math, op, "\u2a04", "\\biguplus");
        defineSymbol(math, math, op, "\u22c2", "\\bigcap");
        defineSymbol(math, math, op, "\u22c3", "\\bigcup");
        defineSymbol(math, math, op, "\u222b", "\\int");
        defineSymbol(math, math, op, "\u222b", "\\intop");
        defineSymbol(math, math, op, "\u222c", "\\iint");
        defineSymbol(math, math, op, "\u222d", "\\iiint");
        defineSymbol(math, math, op, "\u220f", "\\prod");
        defineSymbol(math, math, op, "\u2211", "\\sum");
        defineSymbol(math, math, op, "\u2a02", "\\bigotimes");
        defineSymbol(math, math, op, "\u2a01", "\\bigoplus");
        defineSymbol(math, math, op, "\u2a00", "\\bigodot");
        defineSymbol(math, math, op, "\u222e", "\\oint");
        defineSymbol(math, math, op, "\u2a06", "\\bigsqcup");
        defineSymbol(math, math, op, "\u222b", "\\smallint");
        defineSymbol(text, main, inner, "\u2026", "\\textellipsis");
        defineSymbol(math, main, inner, "\u2026", "\\mathellipsis");
        defineSymbol(text, main, inner, "\u2026", "\\ldots");
        defineSymbol(math, main, inner, "\u2026", "\\ldots");
        defineSymbol(math, main, inner, "\u22ef", "\\cdots");
        defineSymbol(math, main, inner, "\u22f1", "\\ddots");
        defineSymbol(math, main, textord, "\u22ee", "\\vdots");
        defineSymbol(math, main, accent, "\u00b4", "\\acute");
        defineSymbol(math, main, accent, "\u0060", "\\grave");
        defineSymbol(math, main, accent, "\u00a8", "\\ddot");
        defineSymbol(math, main, accent, "\u007e", "\\tilde");
        defineSymbol(math, main, accent, "\u00af", "\\bar");
        defineSymbol(math, main, accent, "\u02d8", "\\breve");
        defineSymbol(math, main, accent, "\u02c7", "\\check");
        defineSymbol(math, main, accent, "\u005e", "\\hat");
        defineSymbol(math, main, accent, "\u20d7", "\\vec");
        defineSymbol(math, main, accent, "\u02d9", "\\dot");
        defineSymbol(math, main, mathord, "\u0131", "\\imath");
        defineSymbol(math, main, mathord, "\u0237", "\\jmath");

        defineSymbol(text, main, textord, "\u2013", "--");
        defineSymbol(text, main, textord, "\u2014", "---");
        defineSymbol(text, main, textord, "\u2018", "`");
        defineSymbol(text, main, textord, "\u2019", "'");
        defineSymbol(text, main, textord, "\u201c", "``");
        defineSymbol(text, main, textord, "\u201d", "''");
        defineSymbol(math, main, textord, "\u00b0", "\\degree");
        defineSymbol(text, main, textord, "\u00b0", "\\degree");
        defineSymbol(math, main, mathord, "\u00a3", "\\pounds");
        defineSymbol(math, ams, textord, "\u2720", "\\maltese");
        defineSymbol(text, ams, textord, "\u2720", "\\maltese");

        defineSymbol(text, main, spacing, "\u00a0", "\\ ");
        defineSymbol(text, main, spacing, "\u00a0", " ");
        defineSymbol(text, main, spacing, "\u00a0", "~");

        // There are lots of symbols which are the same, so we add them in afterwards.
        var i;
        var ch;

        // All of these are textords in math mode
        var mathTextSymbols = "0123456789/@.\"";
        for (i = 0; i < mathTextSymbols.length; i++) {
            ch = mathTextSymbols.charAt(i);
            defineSymbol(math, main, textord, ch, ch);
        }

        // All of these are textords in text mode
        var textSymbols = "0123456789!@*()-=+[]\";:?/.,";
        for (i = 0; i < textSymbols.length; i++) {
            ch = textSymbols.charAt(i);
            defineSymbol(text, main, textord, ch, ch);
        }

        // All of these are textords in text mode, and mathords in math mode
        var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (i = 0; i < letters.length; i++) {
            ch = letters.charAt(i);
            defineSymbol(math, main, mathord, ch, ch);
            defineSymbol(text, main, textord, ch, ch);
        }

        // Latin-1 letters
        for (i = 0x00C0; i <= 0x00D6; i++) {
            ch = String.fromCharCode(i);
            defineSymbol(text, main, textord, ch, ch);
        }

        for (i = 0x00D8; i <= 0x00F6; i++) {
            ch = String.fromCharCode(i);
            defineSymbol(text, main, textord, ch, ch);
        }

        for (i = 0x00F8; i <= 0x00FF; i++) {
            ch = String.fromCharCode(i);
            defineSymbol(text, main, textord, ch, ch);
        }

        // Cyrillic
        for (i = 0x0410; i <= 0x044F; i++) {
            ch = String.fromCharCode(i);
            defineSymbol(text, main, textord, ch, ch);
        }

        // Unicode versions of existing characters
        defineSymbol(text, main, textord, "\u2013", "–");
        defineSymbol(text, main, textord, "\u2014", "—");
        defineSymbol(text, main, textord, "\u2018", "‘");
        defineSymbol(text, main, textord, "\u2019", "’");
        defineSymbol(text, main, textord, "\u201c", "“");
        defineSymbol(text, main, textord, "\u201d", "”");
    });

    /* eslint no-console:0 */
    /**
 * This module contains general functions that can be used for building
 * different kinds of domTree nodes in a consistent manner.
 */

    var domTree$1 = domTree$2;
    var fontMetrics$3 = fontMetrics$1;
    var symbols = symbols$1;
    var utils$2 = utils$4;

    var greekCapitals = ["\\Gamma", "\\Delta", "\\Theta", "\\Lambda", "\\Xi", "\\Pi", "\\Sigma", "\\Upsilon", "\\Phi", "\\Psi", "\\Omega"];

    // The following have to be loaded from Main-Italic font, using class mainit
    var mainitLetters = ["\u0131", // dotless i, \imath
    "\u0237", // dotless j, \jmath
    "\u00a3"// \pounds
    ];

    /**
 * Makes a symbolNode after translation via the list of symbols in symbols.js.
 * Correctly pulls out metrics for the character, and optionally takes a list of
 * classes to be attached to the node.
 *
 * TODO: make argument order closer to makeSpan
 * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
 * should if present come first in `classes`.
 */
    var makeSymbol = function(value, fontFamily, mode, options, classes) {
        // Replace the value with its replaced value from symbol.js
        if (symbols[mode][value] && symbols[mode][value].replace) {
            value = symbols[mode][value].replace;
        }

        var metrics = fontMetrics$3.getCharacterMetrics(value, fontFamily);

        var symbolNode;
        if (metrics) {
            var italic = metrics.italic;
            if (mode === "text") {
                italic = 0;
            }
            symbolNode = new domTree$1.symbolNode(value,metrics.height,metrics.depth,italic,metrics.skew,classes);
        } else {
            // TODO(emily): Figure out a good way to only print this in development
            typeof console !== "undefined" && console.warn("No character metrics for '" + value + "' in style '" + fontFamily + "'");
            symbolNode = new domTree$1.symbolNode(value,0,0,0,0,classes);
        }

        if (options) {
            if (options.style.isTight()) {
                symbolNode.classes.push("mtight");
            }
            if (options.getColor()) {
                symbolNode.style.color = options.getColor();
            }
        }

        return symbolNode;
    };

    /**
 * Makes a symbol in Main-Regular or AMS-Regular.
 * Used for rel, bin, open, close, inner, and punct.
 */
    var mathsym = function(value, mode, options, classes) {
        // Decide what font to render the symbol in by its entry in the symbols
        // table.
        // Have a special case for when the value = \ because the \ is used as a
        // textord in unsupported command errors but cannot be parsed as a regular
        // text ordinal and is therefore not present as a symbol in the symbols
        // table for text
        if (value === "\\" || symbols[mode][value].font === "main") {
            return makeSymbol(value, "Main-Regular", mode, options, classes);
        } else {
            return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
        }
    };

    /**
 * Makes a symbol in the default font for mathords and textords.
 */
    var mathDefault = function(value, mode, options, classes, type) {
        if (type === "mathord") {
            return mathit(value, mode, options, classes);
        } else if (type === "textord") {
            return makeSymbol(value, "Main-Regular", mode, options, classes.concat(["mathrm"]));
        } else {
            throw new Error("unexpected type: " + type + " in mathDefault");
        }
    };

    /**
 * Makes a symbol in the italic math font.
 */
    var mathit = function(value, mode, options, classes) {
        if (/[0-9]/.test(value.charAt(0)) || // glyphs for \imath and \jmath do not exist in Math-Italic so we
        // need to use Main-Italic instead
        utils$2.contains(mainitLetters, value) || utils$2.contains(greekCapitals, value)) {
            return makeSymbol(value, "Main-Italic", mode, options, classes.concat(["mainit"]));
        } else {
            return makeSymbol(value, "Math-Italic", mode, options, classes.concat(["mathit"]));
        }
    };

    /**
 * Makes either a mathord or textord in the correct font and color.
 */
    var makeOrd = function(group, options, type) {
        var mode = group.mode;
        var value = group.value;
        if (symbols[mode][value] && symbols[mode][value].replace) {
            value = symbols[mode][value].replace;
        }

        var classes = ["mord"];

        var font = options.font;
        if (font) {
            if (font === "mathit" || utils$2.contains(mainitLetters, value)) {
                return mathit(value, mode, options, classes);
            } else {
                var fontName = fontMap[font].fontName;
                if (fontMetrics$3.getCharacterMetrics(value, fontName)) {
                    return makeSymbol(value, fontName, mode, options, classes.concat([font]));
                } else {
                    return mathDefault(value, mode, options, classes, type);
                }
            }
        } else {
            return mathDefault(value, mode, options, classes, type);
        }
    };

    /**
 * Calculate the height, depth, and maxFontSize of an element based on its
 * children.
 */
    var sizeElementFromChildren = function(elem) {
        var height = 0;
        var depth = 0;
        var maxFontSize = 0;

        if (elem.children) {
            for (var i = 0; i < elem.children.length; i++) {
                if (elem.children[i].height > height) {
                    height = elem.children[i].height;
                }
                if (elem.children[i].depth > depth) {
                    depth = elem.children[i].depth;
                }
                if (elem.children[i].maxFontSize > maxFontSize) {
                    maxFontSize = elem.children[i].maxFontSize;
                }
            }
        }

        elem.height = height;
        elem.depth = depth;
        elem.maxFontSize = maxFontSize;
    };

    /**
 * Makes a span with the given list of classes, list of children, and options.
 *
 * TODO: Ensure that `options` is always provided (currently some call sites
 * don't pass it).
 * TODO: add a separate argument for math class (e.g. `mop`, `mbin`), which
 * should if present come first in `classes`.
 */
    var makeSpan$2 = function(classes, children, options) {
        var span = new domTree$1.span(classes,children,options);

        sizeElementFromChildren(span);

        return span;
    };

    /**
 * Prepends the given children to the given span, updating height, depth, and
 * maxFontSize.
 */
    var prependChildren = function(span, children) {
        span.children = children.concat(span.children);

        sizeElementFromChildren(span);
    };

    /**
 * Makes a document fragment with the given list of children.
 */
    var makeFragment = function(children) {
        var fragment = new domTree$1.documentFragment(children);

        sizeElementFromChildren(fragment);

        return fragment;
    };

    /**
 * Makes an element placed in each of the vlist elements to ensure that each
 * element has the same max font size. To do this, we create a zero-width space
 * with the correct font size.
 */
    var makeFontSizer = function(options, fontSize) {
        var fontSizeInner = makeSpan$2([], [new domTree$1.symbolNode("\u200b")]);
        fontSizeInner.style.fontSize = (fontSize / options.style.sizeMultiplier) + "em";

        var fontSizer = makeSpan$2(["fontsize-ensurer", "reset-" + options.size, "size5"], [fontSizeInner]);

        return fontSizer;
    };

    /**
 * Makes a vertical list by stacking elements and kerns on top of each other.
 * Allows for many different ways of specifying the positioning method.
 *
 * Arguments:
 *  - children: A list of child or kern nodes to be stacked on top of each other
 *              (i.e. the first element will be at the bottom, and the last at
 *              the top). Element nodes are specified as
 *                {type: "elem", elem: node}
 *              while kern nodes are specified as
 *                {type: "kern", size: size}
 *  - positionType: The method by which the vlist should be positioned. Valid
 *                  values are:
 *                   - "individualShift": The children list only contains elem
 *                                        nodes, and each node contains an extra
 *                                        "shift" value of how much it should be
 *                                        shifted (note that shifting is always
 *                                        moving downwards). positionData is
 *                                        ignored.
 *                   - "top": The positionData specifies the topmost point of
 *                            the vlist (note this is expected to be a height,
 *                            so positive values move up)
 *                   - "bottom": The positionData specifies the bottommost point
 *                               of the vlist (note this is expected to be a
 *                               depth, so positive values move down
 *                   - "shift": The vlist will be positioned such that its
 *                              baseline is positionData away from the baseline
 *                              of the first child. Positive values move
 *                              downwards.
 *                   - "firstBaseline": The vlist will be positioned such that
 *                                      its baseline is aligned with the
 *                                      baseline of the first child.
 *                                      positionData is ignored. (this is
 *                                      equivalent to "shift" with
 *                                      positionData=0)
 *  - positionData: Data used in different ways depending on positionType
 *  - options: An Options object
 *
 */
    var makeVList = function(children, positionType, positionData, options) {
        var depth;
        var currPos;
        var i;
        if (positionType === "individualShift") {
            var oldChildren = children;
            children = [oldChildren[0]];

            // Add in kerns to the list of children to get each element to be
            // shifted to the correct specified shift
            depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
            currPos = depth;
            for (i = 1; i < oldChildren.length; i++) {
                var diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
                var size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);

                currPos = currPos + diff;

                children.push({
                    type: "kern",
                    size: size
                });
                children.push(oldChildren[i]);
            }
        } else if (positionType === "top") {
            // We always start at the bottom, so calculate the bottom by adding up
            // all the sizes
            var bottom = positionData;
            for (i = 0; i < children.length; i++) {
                if (children[i].type === "kern") {
                    bottom -= children[i].size;
                } else {
                    bottom -= children[i].elem.height + children[i].elem.depth;
                }
            }
            depth = bottom;
        } else if (positionType === "bottom") {
            depth = -positionData;
        } else if (positionType === "shift") {
            depth = -children[0].elem.depth - positionData;
        } else if (positionType === "firstBaseline") {
            depth = -children[0].elem.depth;
        } else {
            depth = 0;
        }

        // Make the fontSizer
        var maxFontSize = 0;
        for (i = 0; i < children.length; i++) {
            if (children[i].type === "elem") {
                maxFontSize = Math.max(maxFontSize, children[i].elem.maxFontSize);
            }
        }
        var fontSizer = makeFontSizer(options, maxFontSize);

        // Create a new list of actual children at the correct offsets
        var realChildren = [];
        currPos = depth;
        for (i = 0; i < children.length; i++) {
            if (children[i].type === "kern") {
                currPos += children[i].size;
            } else {
                var child = children[i].elem;

                var shift = -child.depth - currPos;
                currPos += child.height + child.depth;

                var childWrap = makeSpan$2([], [fontSizer, child]);
                childWrap.height -= shift;
                childWrap.depth += shift;
                childWrap.style.top = shift + "em";

                realChildren.push(childWrap);
            }
        }

        // Add in an element at the end with no offset to fix the calculation of
        // baselines in some browsers (namely IE, sometimes safari)
        var baselineFix = makeSpan$2(["baseline-fix"], [fontSizer, new domTree$1.symbolNode("\u200b")]);
        realChildren.push(baselineFix);

        var vlist = makeSpan$2(["vlist"], realChildren);
        // Fix the final height and depth, in case there were kerns at the ends
        // since the makeSpan calculation won't take that in to account.
        vlist.height = Math.max(currPos, vlist.height);
        vlist.depth = Math.max(-depth, vlist.depth);
        return vlist;
    };

    // A table of size -> font size for the different sizing functions
    var sizingMultiplier = {
        size1: 0.5,
        size2: 0.7,
        size3: 0.8,
        size4: 0.9,
        size5: 1.0,
        size6: 1.2,
        size7: 1.44,
        size8: 1.73,
        size9: 2.07,
        size10: 2.49
    };

    // A map of spacing functions to their attributes, like size and corresponding
    // CSS class
    var spacingFunctions = {
        "\\qquad": {
            size: "2em",
            className: "qquad"
        },
        "\\quad": {
            size: "1em",
            className: "quad"
        },
        "\\enspace": {
            size: "0.5em",
            className: "enspace"
        },
        "\\;": {
            size: "0.277778em",
            className: "thickspace"
        },
        "\\:": {
            size: "0.22222em",
            className: "mediumspace"
        },
        "\\,": {
            size: "0.16667em",
            className: "thinspace"
        },
        "\\!": {
            size: "-0.16667em",
            className: "negativethinspace"
        }
    };

    /**
 * Maps TeX font commands to objects containing:
 * - variant: string used for "mathvariant" attribute in buildMathML.js
 * - fontName: the "style" parameter to fontMetrics.getCharacterMetrics
 */
    // A map between tex font commands an MathML mathvariant attribute values
    var fontMap = {
        // styles
        "mathbf": {
            variant: "bold",
            fontName: "Main-Bold"
        },
        "mathrm": {
            variant: "normal",
            fontName: "Main-Regular"
        },
        "textit": {
            variant: "italic",
            fontName: "Main-Italic"
        },

        // "mathit" is missing because it requires the use of two fonts: Main-Italic
        // and Math-Italic.  This is handled by a special case in makeOrd which ends
        // up calling mathit.

        // families
        "mathbb": {
            variant: "double-struck",
            fontName: "AMS-Regular"
        },
        "mathcal": {
            variant: "script",
            fontName: "Caligraphic-Regular"
        },
        "mathfrak": {
            variant: "fraktur",
            fontName: "Fraktur-Regular"
        },
        "mathscr": {
            variant: "script",
            fontName: "Script-Regular"
        },
        "mathsf": {
            variant: "sans-serif",
            fontName: "SansSerif-Regular"
        },
        "mathtt": {
            variant: "monospace",
            fontName: "Typewriter-Regular"
        }
    };

    var buildCommon$2 = {
        fontMap: fontMap,
        makeSymbol: makeSymbol,
        mathsym: mathsym,
        makeSpan: makeSpan$2,
        makeFragment: makeFragment,
        makeVList: makeVList,
        makeOrd: makeOrd,
        prependChildren: prependChildren,
        sizingMultiplier: sizingMultiplier,
        spacingFunctions: spacingFunctions
    };

    /**
 * This file deals with creating delimiters of various sizes. The TeXbook
 * discusses these routines on page 441-442, in the "Another subroutine sets box
 * x to a specified variable delimiter" paragraph.
 *
 * There are three main routines here. `makeSmallDelim` makes a delimiter in the
 * normal font, but in either text, script, or scriptscript style.
 * `makeLargeDelim` makes a delimiter in textstyle, but in one of the Size1,
 * Size2, Size3, or Size4 fonts. `makeStackedDelim` makes a delimiter out of
 * smaller pieces that are stacked on top of one another.
 *
 * The functions take a parameter `center`, which determines if the delimiter
 * should be centered around the axis.
 *
 * Then, there are three exposed functions. `sizedDelim` makes a delimiter in
 * one of the given sizes. This is used for things like `\bigl`.
 * `customSizedDelim` makes a delimiter with a given total height+depth. It is
 * called in places like `\sqrt`. `leftRightDelim` makes an appropriate
 * delimiter which surrounds an expression of a given height an depth. It is
 * used in `\left` and `\right`.
 */

    var ParseError$3 = ParseError_1;
    var Style$4 = Style_1;

    var buildCommon$4 = buildCommon$2;
    var fontMetrics$4 = fontMetrics$1;
    var symbols$3 = symbols$1;
    var utils$6 = utils$4;

    var makeSpan$3 = buildCommon$4.makeSpan;

    /**
 * Get the metrics for a given symbol and font, after transformation (i.e.
 * after following replacement from symbols.js)
 */
    var getMetrics = function(symbol, font) {
        if (symbols$3.math[symbol] && symbols$3.math[symbol].replace) {
            return fontMetrics$4.getCharacterMetrics(symbols$3.math[symbol].replace, font);
        } else {
            return fontMetrics$4.getCharacterMetrics(symbol, font);
        }
    };

    /**
 * Builds a symbol in the given font size (note size is an integer)
 */
    var mathrmSize = function(value, size, mode, options) {
        return buildCommon$4.makeSymbol(value, "Size" + size + "-Regular", mode, options);
    };

    /**
 * Puts a delimiter span in a given style, and adds appropriate height, depth,
 * and maxFontSizes.
 */
    var styleWrap = function(delim, toStyle, options, classes) {
        classes = classes || [];
        var span = makeSpan$3(classes.concat(["style-wrap", options.style.reset(), toStyle.cls()]), [delim], options);

        var multiplier = toStyle.sizeMultiplier / options.style.sizeMultiplier;

        span.height *= multiplier;
        span.depth *= multiplier;
        span.maxFontSize = toStyle.sizeMultiplier;

        return span;
    };

    /**
 * Makes a small delimiter. This is a delimiter that comes in the Main-Regular
 * font, but is restyled to either be in textstyle, scriptstyle, or
 * scriptscriptstyle.
 */
    var makeSmallDelim = function(delim, style, center, options, mode, classes) {
        var text = buildCommon$4.makeSymbol(delim, "Main-Regular", mode, options);

        var span = styleWrap(text, style, options, classes);

        if (center) {
            var shift = (1 - options.style.sizeMultiplier / style.sizeMultiplier) * options.style.metrics.axisHeight;

            span.style.top = shift + "em";
            span.height -= shift;
            span.depth += shift;
        }

        return span;
    };

    /**
 * Makes a large delimiter. This is a delimiter that comes in the Size1, Size2,
 * Size3, or Size4 fonts. It is always rendered in textstyle.
 */
    var makeLargeDelim = function(delim, size, center, options, mode, classes) {
        var inner = mathrmSize(delim, size, mode, options);

        var span = styleWrap(makeSpan$3(["delimsizing", "size" + size], [inner], options), Style$4.TEXT, options, classes);

        if (center) {
            var shift = (1 - options.style.sizeMultiplier) * options.style.metrics.axisHeight;

            span.style.top = shift + "em";
            span.height -= shift;
            span.depth += shift;
        }

        return span;
    };

    /**
 * Make an inner span with the given offset and in the given font. This is used
 * in `makeStackedDelim` to make the stacking pieces for the delimiter.
 */
    var makeInner = function(symbol, font, mode) {
        var sizeClass;
        // Apply the correct CSS class to choose the right font.
        if (font === "Size1-Regular") {
            sizeClass = "delim-size1";
        } else if (font === "Size4-Regular") {
            sizeClass = "delim-size4";
        }

        var inner = makeSpan$3(["delimsizinginner", sizeClass], [makeSpan$3([], [buildCommon$4.makeSymbol(symbol, font, mode)])]);

        // Since this will be passed into `makeVList` in the end, wrap the element
        // in the appropriate tag that VList uses.
        return {
            type: "elem",
            elem: inner
        };
    };

    /**
 * Make a stacked delimiter out of a given delimiter, with the total height at
 * least `heightTotal`. This routine is mentioned on page 442 of the TeXbook.
 */
    var makeStackedDelim = function(delim, heightTotal, center, options, mode, classes) {
        // There are four parts, the top, an optional middle, a repeated part, and a
        // bottom.
        var top;
        var middle;
        var repeat;
        var bottom;
        top = repeat = bottom = delim;
        middle = null;
        // Also keep track of what font the delimiters are in
        var font = "Size1-Regular";

        // We set the parts and font based on the symbol. Note that we use
        // '\u23d0' instead of '|' and '\u2016' instead of '\\|' for the
        // repeats of the arrows
        if (delim === "\\uparrow") {
            repeat = bottom = "\u23d0";
        } else if (delim === "\\Uparrow") {
            repeat = bottom = "\u2016";
        } else if (delim === "\\downarrow") {
            top = repeat = "\u23d0";
        } else if (delim === "\\Downarrow") {
            top = repeat = "\u2016";
        } else if (delim === "\\updownarrow") {
            top = "\\uparrow";
            repeat = "\u23d0";
            bottom = "\\downarrow";
        } else if (delim === "\\Updownarrow") {
            top = "\\Uparrow";
            repeat = "\u2016";
            bottom = "\\Downarrow";
        } else if (delim === "[" || delim === "\\lbrack") {
            top = "\u23a1";
            repeat = "\u23a2";
            bottom = "\u23a3";
            font = "Size4-Regular";
        } else if (delim === "]" || delim === "\\rbrack") {
            top = "\u23a4";
            repeat = "\u23a5";
            bottom = "\u23a6";
            font = "Size4-Regular";
        } else if (delim === "\\lfloor") {
            repeat = top = "\u23a2";
            bottom = "\u23a3";
            font = "Size4-Regular";
        } else if (delim === "\\lceil") {
            top = "\u23a1";
            repeat = bottom = "\u23a2";
            font = "Size4-Regular";
        } else if (delim === "\\rfloor") {
            repeat = top = "\u23a5";
            bottom = "\u23a6";
            font = "Size4-Regular";
        } else if (delim === "\\rceil") {
            top = "\u23a4";
            repeat = bottom = "\u23a5";
            font = "Size4-Regular";
        } else if (delim === "(") {
            top = "\u239b";
            repeat = "\u239c";
            bottom = "\u239d";
            font = "Size4-Regular";
        } else if (delim === ")") {
            top = "\u239e";
            repeat = "\u239f";
            bottom = "\u23a0";
            font = "Size4-Regular";
        } else if (delim === "\\{" || delim === "\\lbrace") {
            top = "\u23a7";
            middle = "\u23a8";
            bottom = "\u23a9";
            repeat = "\u23aa";
            font = "Size4-Regular";
        } else if (delim === "\\}" || delim === "\\rbrace") {
            top = "\u23ab";
            middle = "\u23ac";
            bottom = "\u23ad";
            repeat = "\u23aa";
            font = "Size4-Regular";
        } else if (delim === "\\lgroup") {
            top = "\u23a7";
            bottom = "\u23a9";
            repeat = "\u23aa";
            font = "Size4-Regular";
        } else if (delim === "\\rgroup") {
            top = "\u23ab";
            bottom = "\u23ad";
            repeat = "\u23aa";
            font = "Size4-Regular";
        } else if (delim === "\\lmoustache") {
            top = "\u23a7";
            bottom = "\u23ad";
            repeat = "\u23aa";
            font = "Size4-Regular";
        } else if (delim === "\\rmoustache") {
            top = "\u23ab";
            bottom = "\u23a9";
            repeat = "\u23aa";
            font = "Size4-Regular";
        } else if (delim === "\\surd") {
            top = "\ue001";
            bottom = "\u23b7";
            repeat = "\ue000";
            font = "Size4-Regular";
        }

        // Get the metrics of the four sections
        var topMetrics = getMetrics(top, font);
        var topHeightTotal = topMetrics.height + topMetrics.depth;
        var repeatMetrics = getMetrics(repeat, font);
        var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
        var bottomMetrics = getMetrics(bottom, font);
        var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
        var middleHeightTotal = 0;
        var middleFactor = 1;
        if (middle !== null) {
            var middleMetrics = getMetrics(middle, font);
            middleHeightTotal = middleMetrics.height + middleMetrics.depth;
            middleFactor = 2;
            // repeat symmetrically above and below middle
        }

        // Calcuate the minimal height that the delimiter can have.
        // It is at least the size of the top, bottom, and optional middle combined.
        var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;

        // Compute the number of copies of the repeat symbol we will need
        var repeatCount = Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal));

        // Compute the total height of the delimiter including all the symbols
        var realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal;

        // The center of the delimiter is placed at the center of the axis. Note
        // that in this context, "center" means that the delimiter should be
        // centered around the axis in the current style, while normally it is
        // centered around the axis in textstyle.
        var axisHeight = options.style.metrics.axisHeight;
        if (center) {
            axisHeight *= options.style.sizeMultiplier;
        }
        // Calculate the depth
        var depth = realHeightTotal / 2 - axisHeight;

        // Now, we start building the pieces that will go into the vlist

        // Keep a list of the inner pieces
        var inners = [];

        // Add the bottom symbol
        inners.push(makeInner(bottom, font, mode));

        var i;
        if (middle === null) {
            // Add that many symbols
            for (i = 0; i < repeatCount; i++) {
                inners.push(makeInner(repeat, font, mode));
            }
        } else {
            // When there is a middle bit, we need the middle part and two repeated
            // sections
            for (i = 0; i < repeatCount; i++) {
                inners.push(makeInner(repeat, font, mode));
            }
            inners.push(makeInner(middle, font, mode));
            for (i = 0; i < repeatCount; i++) {
                inners.push(makeInner(repeat, font, mode));
            }
        }

        // Add the top symbol
        inners.push(makeInner(top, font, mode));

        // Finally, build the vlist
        var inner = buildCommon$4.makeVList(inners, "bottom", depth, options);

        return styleWrap(makeSpan$3(["delimsizing", "mult"], [inner], options), Style$4.TEXT, options, classes);
    };

    // There are three kinds of delimiters, delimiters that stack when they become
    // too large
    var stackLargeDelimiters = ["(", ")", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\\lceil", "\\rceil", "\\surd"];

    // delimiters that always stack
    var stackAlwaysDelimiters = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache"];

    // and delimiters that never stack
    var stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];

    // Metrics of the different sizes. Found by looking at TeX's output of
    // $\bigl| // \Bigl| \biggl| \Biggl| \showlists$
    // Used to create stacked delimiters of appropriate sizes in makeSizedDelim.
    var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3.0];

    /**
 * Used to create a delimiter of a specific size, where `size` is 1, 2, 3, or 4.
 */
    var makeSizedDelim = function(delim, size, options, mode, classes) {
        // < and > turn into \langle and \rangle in delimiters
        if (delim === "<" || delim === "\\lt") {
            delim = "\\langle";
        } else if (delim === ">" || delim === "\\gt") {
            delim = "\\rangle";
        }

        // Sized delimiters are never centered.
        if (utils$6.contains(stackLargeDelimiters, delim) || utils$6.contains(stackNeverDelimiters, delim)) {
            return makeLargeDelim(delim, size, false, options, mode, classes);
        } else if (utils$6.contains(stackAlwaysDelimiters, delim)) {
            return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
        } else {
            throw new ParseError$3("Illegal delimiter: '" + delim + "'");
        }
    };

    /**
 * There are three different sequences of delimiter sizes that the delimiters
 * follow depending on the kind of delimiter. This is used when creating custom
 * sized delimiters to decide whether to create a small, large, or stacked
 * delimiter.
 *
 * In real TeX, these sequences aren't explicitly defined, but are instead
 * defined inside the font metrics. Since there are only three sequences that
 * are possible for the delimiters that TeX defines, it is easier to just encode
 * them explicitly here.
 */

    // Delimiters that never stack try small delimiters and large delimiters only
    var stackNeverDelimiterSequence = [{
        type: "small",
        style: Style$4.SCRIPTSCRIPT
    }, {
        type: "small",
        style: Style$4.SCRIPT
    }, {
        type: "small",
        style: Style$4.TEXT
    }, {
        type: "large",
        size: 1
    }, {
        type: "large",
        size: 2
    }, {
        type: "large",
        size: 3
    }, {
        type: "large",
        size: 4
    }];

    // Delimiters that always stack try the small delimiters first, then stack
    var stackAlwaysDelimiterSequence = [{
        type: "small",
        style: Style$4.SCRIPTSCRIPT
    }, {
        type: "small",
        style: Style$4.SCRIPT
    }, {
        type: "small",
        style: Style$4.TEXT
    }, {
        type: "stack"
    }];

    // Delimiters that stack when large try the small and then large delimiters, and
    // stack afterwards
    var stackLargeDelimiterSequence = [{
        type: "small",
        style: Style$4.SCRIPTSCRIPT
    }, {
        type: "small",
        style: Style$4.SCRIPT
    }, {
        type: "small",
        style: Style$4.TEXT
    }, {
        type: "large",
        size: 1
    }, {
        type: "large",
        size: 2
    }, {
        type: "large",
        size: 3
    }, {
        type: "large",
        size: 4
    }, {
        type: "stack"
    }];

    /**
 * Get the font used in a delimiter based on what kind of delimiter it is.
 */
    var delimTypeToFont = function(type) {
        if (type.type === "small") {
            return "Main-Regular";
        } else if (type.type === "large") {
            return "Size" + type.size + "-Regular";
        } else if (type.type === "stack") {
            return "Size4-Regular";
        }
    };

    /**
 * Traverse a sequence of types of delimiters to decide what kind of delimiter
 * should be used to create a delimiter of the given height+depth.
 */
    var traverseSequence = function(delim, height, sequence, options) {
        // Here, we choose the index we should start at in the sequences. In smaller
        // sizes (which correspond to larger numbers in style.size) we start earlier
        // in the sequence. Thus, scriptscript starts at index 3-3=0, script starts
        // at index 3-2=1, text starts at 3-1=2, and display starts at min(2,3-0)=2
        var start = Math.min(2, 3 - options.style.size);
        for (var i = start; i < sequence.length; i++) {
            if (sequence[i].type === "stack") {
                // This is always the last delimiter, so we just break the loop now.
                break;
            }

            var metrics = getMetrics(delim, delimTypeToFont(sequence[i]));
            var heightDepth = metrics.height + metrics.depth;

            // Small delimiters are scaled down versions of the same font, so we
            // account for the style change size.

            if (sequence[i].type === "small") {
                heightDepth *= sequence[i].style.sizeMultiplier;
            }

            // Check if the delimiter at this size works for the given height.
            if (heightDepth > height) {
                return sequence[i];
            }
        }

        // If we reached the end of the sequence, return the last sequence element.
        return sequence[sequence.length - 1];
    };

    /**
 * Make a delimiter of a given height+depth, with optional centering. Here, we
 * traverse the sequences, and create a delimiter that the sequence tells us to.
 */
    var makeCustomSizedDelim = function(delim, height, center, options, mode, classes) {
        if (delim === "<" || delim === "\\lt") {
            delim = "\\langle";
        } else if (delim === ">" || delim === "\\gt") {
            delim = "\\rangle";
        }

        // Decide what sequence to use
        var sequence;
        if (utils$6.contains(stackNeverDelimiters, delim)) {
            sequence = stackNeverDelimiterSequence;
        } else if (utils$6.contains(stackLargeDelimiters, delim)) {
            sequence = stackLargeDelimiterSequence;
        } else {
            sequence = stackAlwaysDelimiterSequence;
        }

        // Look through the sequence
        var delimType = traverseSequence(delim, height, sequence, options);

        // Depending on the sequence element we decided on, call the appropriate
        // function.
        if (delimType.type === "small") {
            return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
        } else if (delimType.type === "large") {
            return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
        } else if (delimType.type === "stack") {
            return makeStackedDelim(delim, height, center, options, mode, classes);
        }
    };

    /**
 * Make a delimiter for use with `\left` and `\right`, given a height and depth
 * of an expression that the delimiters surround.
 */
    var makeLeftRightDelim = function(delim, height, depth, options, mode, classes) {
        // We always center \left/\right delimiters, so the axis is always shifted
        var axisHeight = options.style.metrics.axisHeight * options.style.sizeMultiplier;

        // Taken from TeX source, tex.web, function make_left_right
        var delimiterFactor = 901;
        var delimiterExtend = 5.0 / fontMetrics$4.metrics.ptPerEm;

        var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);

        var totalHeight = Math.max(// In real TeX, calculations are done using integral values which are
        // 65536 per pt, or 655360 per em. So, the division here truncates in
        // TeX but doesn't here, producing different results. If we wanted to
        // exactly match TeX's calculation, we could do
        //   Math.floor(655360 * maxDistFromAxis / 500) *
        //    delimiterFactor / 655360
        // (To see the difference, compare
        //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
        // in TeX and KaTeX)
        maxDistFromAxis / 500 * delimiterFactor, 2 * maxDistFromAxis - delimiterExtend);

        // Finally, we defer to `makeCustomSizedDelim` with our calculated total
        // height
        return makeCustomSizedDelim(delim, totalHeight, true, options, mode, classes);
    };

    var delimiter$1 = {
        sizedDelim: makeSizedDelim,
        customSizedDelim: makeCustomSizedDelim,
        leftRightDelim: makeLeftRightDelim
    };

    /* eslint no-console:0 */
    /**
 * This file does the main work of building a domTree structure from a parse
 * tree. The entry point is the `buildHTML` function, which takes a parse tree.
 * Then, the buildExpression, buildGroup, and various groupTypes functions are
 * called, to produce a final HTML tree.
 */

    var ParseError$2 = ParseError_1;
    var Style$1 = Style_1;

    var buildCommon$1 = buildCommon$2;
    var delimiter = delimiter$1;
    var domTree = domTree$2;
    var fontMetrics = fontMetrics$1;
    var utils$1 = utils$4;

    var makeSpan$1 = buildCommon$1.makeSpan;

    var isSpace = function(node) {
        return node instanceof domTree.span && node.classes[0] === "mspace";
    };

    // Binary atoms (first class `mbin`) change into ordinary atoms (`mord`)
    // depending on their surroundings. See TeXbook pg. 442-446, Rules 5 and 6,
    // and the text before Rule 19.

    var isBin = function(node) {
        return node && node.classes[0] === "mbin";
    };

    var isBinLeftCanceller = function(node, isRealGroup) {
        // TODO: This code assumes that a node's math class is the first element
        // of its `classes` array. A later cleanup should ensure this, for
        // instance by changing the signature of `makeSpan`.
        if (node) {
            return utils$1.contains(["mbin", "mopen", "mrel", "mop", "mpunct"], node.classes[0]);
        } else {
            return isRealGroup;
        }
    };

    var isBinRightCanceller = function(node, isRealGroup) {
        if (node) {
            return utils$1.contains(["mrel", "mclose", "mpunct"], node.classes[0]);
        } else {
            return isRealGroup;
        }
    };

    /**
 * Take a list of nodes, build them in order, and return a list of the built
 * nodes. documentFragments are flattened into their contents, so the
 * returned list contains no fragments. `isRealGroup` is true if `expression`
 * is a real group (no atoms will be added on either side), as opposed to
 * a partial group (e.g. one created by \color).
 */
    var buildExpression = function(expression, options, isRealGroup) {
        // Parse expressions into `groups`.
        var groups = [];
        for (var i = 0; i < expression.length; i++) {
            var group = expression[i];
            var output = buildGroup(group, options);
            if (output instanceof domTree.documentFragment) {
                Array.prototype.push.apply(groups, output.children);
            } else {
                groups.push(output);
            }
        }
        // At this point `groups` consists entirely of `symbolNode`s and `span`s.

        // Explicit spaces (e.g., \;, \,) should be ignored with respect to atom
        // spacing (e.g., "add thick space between mord and mrel"). Since CSS
        // adjacency rules implement atom spacing, spaces should be invisible to
        // CSS. So we splice them out of `groups` and into the atoms themselves.
        var spaces = null;
        for (i = 0; i < groups.length; i++) {
            if (isSpace(groups[i])) {
                spaces = spaces || [];
                spaces.push(groups[i]);
                groups.splice(i, 1);
                i--;
            } else if (spaces) {
                if (groups[i]instanceof domTree.symbolNode) {
                    groups[i] = makeSpan$1([].concat(groups[i].classes), [groups[i]]);
                }
                buildCommon$1.prependChildren(groups[i], spaces);
                spaces = null;
            }
        }
        if (spaces) {
            Array.prototype.push.apply(groups, spaces);
        }

        // Binary operators change to ordinary symbols in some contexts.
        for (i = 0; i < groups.length; i++) {
            if (isBin(groups[i]) && (isBinLeftCanceller(groups[i - 1], isRealGroup) || isBinRightCanceller(groups[i + 1], isRealGroup))) {
                groups[i].classes[0] = "mord";
            }
        }

        return groups;
    };

    // Return math atom class (mclass) of a domTree.
    var getTypeOfDomTree = function(node) {
        if (node instanceof domTree.documentFragment) {
            if (node.children.length) {
                return getTypeOfDomTree(node.children[node.children.length - 1]);
            }
        } else {
            if (utils$1.contains(["mord", "mop", "mbin", "mrel", "mopen", "mclose", "mpunct", "minner"], node.classes[0])) {
                return node.classes[0];
            }
        }
        return null;
    };

    /**
 * Sometimes, groups perform special rules when they have superscripts or
 * subscripts attached to them. This function lets the `supsub` group know that
 * its inner element should handle the superscripts and subscripts instead of
 * handling them itself.
 */
    var shouldHandleSupSub = function(group, options) {
        if (!group) {
            return false;
        } else if (group.type === "op") {
            // Operators handle supsubs differently when they have limits
            // (e.g. `\displaystyle\sum_2^3`)
            return group.value.limits && (options.style.size === Style$1.DISPLAY.size || group.value.alwaysHandleSupSub);
        } else if (group.type === "accent") {
            return isCharacterBox(group.value.base);
        } else {
            return null;
        }
    };

    /**
 * Sometimes we want to pull out the innermost element of a group. In most
 * cases, this will just be the group itself, but when ordgroups and colors have
 * a single element, we want to pull that out.
 */
    var getBaseElem = function(group) {
        if (!group) {
            return false;
        } else if (group.type === "ordgroup") {
            if (group.value.length === 1) {
                return getBaseElem(group.value[0]);
            } else {
                return group;
            }
        } else if (group.type === "color") {
            if (group.value.value.length === 1) {
                return getBaseElem(group.value.value[0]);
            } else {
                return group;
            }
        } else if (group.type === "font") {
            return getBaseElem(group.value.body);
        } else {
            return group;
        }
    };

    /**
 * TeXbook algorithms often reference "character boxes", which are simply groups
 * with a single character in them. To decide if something is a character box,
 * we find its innermost group, and see if it is a single character.
 */
    var isCharacterBox = function(group) {
        var baseElem = getBaseElem(group);

        // These are all they types of groups which hold single characters
        return baseElem.type === "mathord" || baseElem.type === "textord" || baseElem.type === "bin" || baseElem.type === "rel" || baseElem.type === "inner" || baseElem.type === "open" || baseElem.type === "close" || baseElem.type === "punct";
    };

    var makeNullDelimiter = function(options, classes) {
        return makeSpan$1(classes.concat(["sizing", "reset-" + options.size, "size5", options.style.reset(), Style$1.TEXT.cls(), "nulldelimiter"]));
    };

    /**
 * This is a map of group types to the function used to handle that type.
 * Simpler types come at the beginning, while complicated types come afterwards.
 */
    var groupTypes = {};

    groupTypes.mathord = function(group, options) {
        return buildCommon$1.makeOrd(group, options, "mathord");
    }
    ;

    groupTypes.textord = function(group, options) {
        return buildCommon$1.makeOrd(group, options, "textord");
    }
    ;

    groupTypes.bin = function(group, options) {
        return buildCommon$1.mathsym(group.value, group.mode, options, ["mbin"]);
    }
    ;

    groupTypes.rel = function(group, options) {
        return buildCommon$1.mathsym(group.value, group.mode, options, ["mrel"]);
    }
    ;

    groupTypes.open = function(group, options) {
        return buildCommon$1.mathsym(group.value, group.mode, options, ["mopen"]);
    }
    ;

    groupTypes.close = function(group, options) {
        return buildCommon$1.mathsym(group.value, group.mode, options, ["mclose"]);
    }
    ;

    groupTypes.inner = function(group, options) {
        return buildCommon$1.mathsym(group.value, group.mode, options, ["minner"]);
    }
    ;

    groupTypes.punct = function(group, options) {
        return buildCommon$1.mathsym(group.value, group.mode, options, ["mpunct"]);
    }
    ;

    groupTypes.ordgroup = function(group, options) {
        return makeSpan$1(["mord", options.style.cls()], buildExpression(group.value, options.reset(), true), options);
    }
    ;

    groupTypes.text = function(group, options) {
        var newOptions = options.withFont(group.value.style);
        var inner = buildExpression(group.value.body, newOptions, true);
        for (var i = 0; i < inner.length - 1; i++) {
            if (inner[i].tryCombine(inner[i + 1])) {
                inner.splice(i + 1, 1);
                i--;
            }
        }
        return makeSpan$1(["mord", "text", newOptions.style.cls()], inner, newOptions);
    }
    ;

    groupTypes.color = function(group, options) {
        var elements = buildExpression(group.value.value, options.withColor(group.value.color), false);

        // \color isn't supposed to affect the type of the elements it contains.
        // To accomplish this, we wrap the results in a fragment, so the inner
        // elements will be able to directly interact with their neighbors. For
        // example, `\color{red}{2 +} 3` has the same spacing as `2 + 3`
        return new buildCommon$1.makeFragment(elements);
    }
    ;

    groupTypes.supsub = function(group, options) {
        // Superscript and subscripts are handled in the TeXbook on page
        // 445-446, rules 18(a-f).

        // Here is where we defer to the inner group if it should handle
        // superscripts and subscripts itself.
        if (shouldHandleSupSub(group.value.base, options)) {
            return groupTypes[group.value.base.type](group, options);
        }

        var base = buildGroup(group.value.base, options.reset());
        var supmid;
        var submid;
        var sup;
        var sub;

        var style = options.style;
        var newOptions;

        if (group.value.sup) {
            newOptions = options.withStyle(style.sup());
            sup = buildGroup(group.value.sup, newOptions);
            supmid = makeSpan$1([style.reset(), style.sup().cls()], [sup], newOptions);
        }

        if (group.value.sub) {
            newOptions = options.withStyle(style.sub());
            sub = buildGroup(group.value.sub, newOptions);
            submid = makeSpan$1([style.reset(), style.sub().cls()], [sub], newOptions);
        }

        // Rule 18a
        var supShift;
        var subShift;
        if (isCharacterBox(group.value.base)) {
            supShift = 0;
            subShift = 0;
        } else {
            supShift = base.height - style.metrics.supDrop;
            subShift = base.depth + style.metrics.subDrop;
        }

        // Rule 18c
        var minSupShift;
        if (style === Style$1.DISPLAY) {
            minSupShift = style.metrics.sup1;
        } else if (style.cramped) {
            minSupShift = style.metrics.sup3;
        } else {
            minSupShift = style.metrics.sup2;
        }

        // scriptspace is a font-size-independent size, so scale it
        // appropriately
        var multiplier = Style$1.TEXT.sizeMultiplier * style.sizeMultiplier;
        var scriptspace = (0.5 / fontMetrics.metrics.ptPerEm) / multiplier + "em";

        var supsub;
        if (!group.value.sup) {
            // Rule 18b
            subShift = Math.max(subShift, style.metrics.sub1, sub.height - 0.8 * style.metrics.xHeight);

            supsub = buildCommon$1.makeVList([{
                type: "elem",
                elem: submid
            }], "shift", subShift, options);

            supsub.children[0].style.marginRight = scriptspace;

            // Subscripts shouldn't be shifted by the base's italic correction.
            // Account for that by shifting the subscript back the appropriate
            // amount. Note we only do this when the base is a single symbol.
            if (base instanceof domTree.symbolNode) {
                supsub.children[0].style.marginLeft = -base.italic + "em";
            }
        } else if (!group.value.sub) {
            // Rule 18c, d
            supShift = Math.max(supShift, minSupShift, sup.depth + 0.25 * style.metrics.xHeight);

            supsub = buildCommon$1.makeVList([{
                type: "elem",
                elem: supmid
            }], "shift", -supShift, options);

            supsub.children[0].style.marginRight = scriptspace;
        } else {
            supShift = Math.max(supShift, minSupShift, sup.depth + 0.25 * style.metrics.xHeight);
            subShift = Math.max(subShift, style.metrics.sub2);

            var ruleWidth = fontMetrics.metrics.defaultRuleThickness;

            // Rule 18e
            if ((supShift - sup.depth) - (sub.height - subShift) < 4 * ruleWidth) {
                subShift = 4 * ruleWidth - (supShift - sup.depth) + sub.height;
                var psi = 0.8 * style.metrics.xHeight - (supShift - sup.depth);
                if (psi > 0) {
                    supShift += psi;
                    subShift -= psi;
                }
            }

            supsub = buildCommon$1.makeVList([{
                type: "elem",
                elem: submid,
                shift: subShift
            }, {
                type: "elem",
                elem: supmid,
                shift: -supShift
            }], "individualShift", null, options);

            // See comment above about subscripts not being shifted
            if (base instanceof domTree.symbolNode) {
                supsub.children[0].style.marginLeft = -base.italic + "em";
            }

            supsub.children[0].style.marginRight = scriptspace;
            supsub.children[1].style.marginRight = scriptspace;
        }

        // We ensure to wrap the supsub vlist in a span.msupsub to reset text-align
        var mclass = getTypeOfDomTree(base) || "mord";
        return makeSpan$1([mclass], [base, makeSpan$1(["msupsub"], [supsub])], options);
    }
    ;

    groupTypes.genfrac = function(group, options) {
        // Fractions are handled in the TeXbook on pages 444-445, rules 15(a-e).
        // Figure out what style this fraction should be in based on the
        // function used
        var style = options.style;
        if (group.value.size === "display") {
            style = Style$1.DISPLAY;
        } else if (group.value.size === "text") {
            style = Style$1.TEXT;
        }

        var nstyle = style.fracNum();
        var dstyle = style.fracDen();
        var newOptions;

        newOptions = options.withStyle(nstyle);
        var numer = buildGroup(group.value.numer, newOptions);
        var numerreset = makeSpan$1([style.reset(), nstyle.cls()], [numer], newOptions);

        newOptions = options.withStyle(dstyle);
        var denom = buildGroup(group.value.denom, newOptions);
        var denomreset = makeSpan$1([style.reset(), dstyle.cls()], [denom], newOptions);

        var ruleWidth;
        if (group.value.hasBarLine) {
            ruleWidth = fontMetrics.metrics.defaultRuleThickness / options.style.sizeMultiplier;
        } else {
            ruleWidth = 0;
        }

        // Rule 15b
        var numShift;
        var clearance;
        var denomShift;
        if (style.size === Style$1.DISPLAY.size) {
            numShift = style.metrics.num1;
            if (ruleWidth > 0) {
                clearance = 3 * ruleWidth;
            } else {
                clearance = 7 * fontMetrics.metrics.defaultRuleThickness;
            }
            denomShift = style.metrics.denom1;
        } else {
            if (ruleWidth > 0) {
                numShift = style.metrics.num2;
                clearance = ruleWidth;
            } else {
                numShift = style.metrics.num3;
                clearance = 3 * fontMetrics.metrics.defaultRuleThickness;
            }
            denomShift = style.metrics.denom2;
        }

        var frac;
        if (ruleWidth === 0) {
            // Rule 15c
            var candidateClearance = (numShift - numer.depth) - (denom.height - denomShift);
            if (candidateClearance < clearance) {
                numShift += 0.5 * (clearance - candidateClearance);
                denomShift += 0.5 * (clearance - candidateClearance);
            }

            frac = buildCommon$1.makeVList([{
                type: "elem",
                elem: denomreset,
                shift: denomShift
            }, {
                type: "elem",
                elem: numerreset,
                shift: -numShift
            }], "individualShift", null, options);
        } else {
            // Rule 15d
            var axisHeight = style.metrics.axisHeight;

            if ((numShift - numer.depth) - (axisHeight + 0.5 * ruleWidth) < clearance) {
                numShift += clearance - ((numShift - numer.depth) - (axisHeight + 0.5 * ruleWidth));
            }

            if ((axisHeight - 0.5 * ruleWidth) - (denom.height - denomShift) < clearance) {
                denomShift += clearance - ((axisHeight - 0.5 * ruleWidth) - (denom.height - denomShift));
            }

            var mid = makeSpan$1([options.style.reset(), Style$1.TEXT.cls(), "frac-line"]);
            // Manually set the height of the line because its height is
            // created in CSS
            mid.height = ruleWidth;

            var midShift = -(axisHeight - 0.5 * ruleWidth);

            frac = buildCommon$1.makeVList([{
                type: "elem",
                elem: denomreset,
                shift: denomShift
            }, {
                type: "elem",
                elem: mid,
                shift: midShift
            }, {
                type: "elem",
                elem: numerreset,
                shift: -numShift
            }], "individualShift", null, options);
        }

        // Since we manually change the style sometimes (with \dfrac or \tfrac),
        // account for the possible size change here.
        frac.height *= style.sizeMultiplier / options.style.sizeMultiplier;
        frac.depth *= style.sizeMultiplier / options.style.sizeMultiplier;

        // Rule 15e
        var delimSize;
        if (style.size === Style$1.DISPLAY.size) {
            delimSize = style.metrics.delim1;
        } else {
            delimSize = style.metrics.delim2;
        }

        var leftDelim;
        var rightDelim;
        if (group.value.leftDelim == null) {
            leftDelim = makeNullDelimiter(options, ["mopen"]);
        } else {
            leftDelim = delimiter.customSizedDelim(group.value.leftDelim, delimSize, true, options.withStyle(style), group.mode, ["mopen"]);
        }
        if (group.value.rightDelim == null) {
            rightDelim = makeNullDelimiter(options, ["mclose"]);
        } else {
            rightDelim = delimiter.customSizedDelim(group.value.rightDelim, delimSize, true, options.withStyle(style), group.mode, ["mclose"]);
        }

        return makeSpan$1(["mord", options.style.reset(), style.cls()], [leftDelim, makeSpan$1(["mfrac"], [frac]), rightDelim], options);
    }
    ;

    var calculateSize = function(sizeValue, style) {
        var x = sizeValue.number;
        if (sizeValue.unit === "ex") {
            x *= style.metrics.emPerEx;
        } else if (sizeValue.unit === "mu") {
            x /= 18;
        }
        return x;
    };

    groupTypes.array = function(group, options) {
        var r;
        var c;
        var nr = group.value.body.length;
        var nc = 0;
        var body = new Array(nr);

        var style = options.style;

        // Horizontal spacing
        var pt = 1 / fontMetrics.metrics.ptPerEm;
        var arraycolsep = 5 * pt;
        // \arraycolsep in article.cls

        // Vertical spacing
        var baselineskip = 12 * pt;
        // see size10.clo
        // Default \arraystretch from lttab.dtx
        // TODO(gagern): may get redefined once we have user-defined macros
        var arraystretch = utils$1.deflt(group.value.arraystretch, 1);
        var arrayskip = arraystretch * baselineskip;
        var arstrutHeight = 0.7 * arrayskip;
        // \strutbox in ltfsstrc.dtx and
        var arstrutDepth = 0.3 * arrayskip;
        // \@arstrutbox in lttab.dtx

        var totalHeight = 0;
        for (r = 0; r < group.value.body.length; ++r) {
            var inrow = group.value.body[r];
            var height = arstrutHeight;
            // \@array adds an \@arstrut
            var depth = arstrutDepth;
            // to each tow (via the template)

            if (nc < inrow.length) {
                nc = inrow.length;
            }

            var outrow = new Array(inrow.length);
            for (c = 0; c < inrow.length; ++c) {
                var elt = buildGroup(inrow[c], options);
                if (depth < elt.depth) {
                    depth = elt.depth;
                }
                if (height < elt.height) {
                    height = elt.height;
                }
                outrow[c] = elt;
            }

            var gap = 0;
            if (group.value.rowGaps[r]) {
                gap = calculateSize(group.value.rowGaps[r].value, style);
                if (gap > 0) {
                    // \@argarraycr
                    gap += arstrutDepth;
                    if (depth < gap) {
                        depth = gap;
                        // \@xargarraycr
                    }
                    gap = 0;
                }
            }

            outrow.height = height;
            outrow.depth = depth;
            totalHeight += height;
            outrow.pos = totalHeight;
            totalHeight += depth + gap;
            // \@yargarraycr
            body[r] = outrow;
        }

        var offset = totalHeight / 2 + style.metrics.axisHeight;
        var colDescriptions = group.value.cols || [];
        var cols = [];
        var colSep;
        var colDescrNum;
        for (c = 0,
        colDescrNum = 0; // Continue while either there are more columns or more column
        // descriptions, so trailing separators don't get lost.
        c < nc || colDescrNum < colDescriptions.length; ++c,
        ++colDescrNum) {

            var colDescr = colDescriptions[colDescrNum] || {};

            var firstSeparator = true;
            while (colDescr.type === "separator") {
                // If there is more than one separator in a row, add a space
                // between them.
                if (!firstSeparator) {
                    colSep = makeSpan$1(["arraycolsep"], []);
                    colSep.style.width = fontMetrics.metrics.doubleRuleSep + "em";
                    cols.push(colSep);
                }

                if (colDescr.separator === "|") {
                    var separator = makeSpan$1(["vertical-separator"], []);
                    separator.style.height = totalHeight + "em";
                    separator.style.verticalAlign = -(totalHeight - offset) + "em";

                    cols.push(separator);
                } else {
                    throw new ParseError$2("Invalid separator type: " + colDescr.separator);
                }

                colDescrNum++;
                colDescr = colDescriptions[colDescrNum] || {};
                firstSeparator = false;
            }

            if (c >= nc) {
                continue;
            }

            var sepwidth;
            if (c > 0 || group.value.hskipBeforeAndAfter) {
                sepwidth = utils$1.deflt(colDescr.pregap, arraycolsep);
                if (sepwidth !== 0) {
                    colSep = makeSpan$1(["arraycolsep"], []);
                    colSep.style.width = sepwidth + "em";
                    cols.push(colSep);
                }
            }

            var col = [];
            for (r = 0; r < nr; ++r) {
                var row = body[r];
                var elem = row[c];
                if (!elem) {
                    continue;
                }
                var shift = row.pos - offset;
                elem.depth = row.depth;
                elem.height = row.height;
                col.push({
                    type: "elem",
                    elem: elem,
                    shift: shift
                });
            }

            col = buildCommon$1.makeVList(col, "individualShift", null, options);
            col = makeSpan$1(["col-align-" + (colDescr.align || "c")], [col]);
            cols.push(col);

            if (c < nc - 1 || group.value.hskipBeforeAndAfter) {
                sepwidth = utils$1.deflt(colDescr.postgap, arraycolsep);
                if (sepwidth !== 0) {
                    colSep = makeSpan$1(["arraycolsep"], []);
                    colSep.style.width = sepwidth + "em";
                    cols.push(colSep);
                }
            }
        }
        body = makeSpan$1(["mtable"], cols);
        return makeSpan$1(["mord"], [body], options);
    }
    ;

    groupTypes.spacing = function(group, options) {
        if (group.value === "\\ " || group.value === "\\space" || group.value === " " || group.value === "~") {
            // Spaces are generated by adding an actual space. Each of these
            // things has an entry in the symbols table, so these will be turned
            // into appropriate outputs.
            if (group.mode === "text") {
                return buildCommon$1.makeOrd(group, options, "textord");
            } else {
                return makeSpan$1(["mspace"], [buildCommon$1.mathsym(group.value, group.mode, options)], options);
            }
        } else {
            // Other kinds of spaces are of arbitrary width. We use CSS to
            // generate these.
            return makeSpan$1(["mspace", buildCommon$1.spacingFunctions[group.value].className], [], options);
        }
    }
    ;

    groupTypes.llap = function(group, options) {
        var inner = makeSpan$1(["inner"], [buildGroup(group.value.body, options.reset())]);
        var fix = makeSpan$1(["fix"], []);
        return makeSpan$1(["mord", "llap", options.style.cls()], [inner, fix], options);
    }
    ;

    groupTypes.rlap = function(group, options) {
        var inner = makeSpan$1(["inner"], [buildGroup(group.value.body, options.reset())]);
        var fix = makeSpan$1(["fix"], []);
        return makeSpan$1(["mord", "rlap", options.style.cls()], [inner, fix], options);
    }
    ;

    groupTypes.op = function(group, options) {
        // Operators are handled in the TeXbook pg. 443-444, rule 13(a).
        var supGroup;
        var subGroup;
        var hasLimits = false;
        if (group.type === "supsub") {
            // If we have limits, supsub will pass us its group to handle. Pull
            // out the superscript and subscript and set the group to the op in
            // its base.
            supGroup = group.value.sup;
            subGroup = group.value.sub;
            group = group.value.base;
            hasLimits = true;
        }

        var style = options.style;

        // Most operators have a large successor symbol, but these don't.
        var noSuccessor = ["\\smallint"];

        var large = false;
        if (style.size === Style$1.DISPLAY.size && group.value.symbol && !utils$1.contains(noSuccessor, group.value.body)) {

            // Most symbol operators get larger in displaystyle (rule 13)
            large = true;
        }

        var base;
        var baseShift = 0;
        var slant = 0;
        if (group.value.symbol) {
            // If this is a symbol, create the symbol.
            var fontName = large ? "Size2-Regular" : "Size1-Regular";
            base = buildCommon$1.makeSymbol(group.value.body, fontName, "math", options, ["mop", "op-symbol", large ? "large-op" : "small-op"]);

            // Shift the symbol so its center lies on the axis (rule 13). It
            // appears that our fonts have the centers of the symbols already
            // almost on the axis, so these numbers are very small. Note we
            // don't actually apply this here, but instead it is used either in
            // the vlist creation or separately when there are no limits.
            baseShift = (base.height - base.depth) / 2 - style.metrics.axisHeight * style.sizeMultiplier;

            // The slant of the symbol is just its italic correction.
            slant = base.italic;
        } else if (group.value.value) {
            // If this is a list, compose that list.
            var inner = buildExpression(group.value.value, options, true);

            base = makeSpan$1(["mop"], inner, options);
        } else {
            // Otherwise, this is a text operator. Build the text from the
            // operator's name.
            // TODO(emily): Add a space in the middle of some of these
            // operators, like \limsup
            var output = [];
            for (var i = 1; i < group.value.body.length; i++) {
                output.push(buildCommon$1.mathsym(group.value.body[i], group.mode));
            }
            base = makeSpan$1(["mop"], output, options);
        }

        if (hasLimits) {
            // IE 8 clips \int if it is in a display: inline-block. We wrap it
            // in a new span so it is an inline, and works.
            base = makeSpan$1([], [base]);

            var supmid;
            var supKern;
            var submid;
            var subKern;
            var newOptions;
            // We manually have to handle the superscripts and subscripts. This,
            // aside from the kern calculations, is copied from supsub.
            if (supGroup) {
                newOptions = options.withStyle(style.sup());
                var sup = buildGroup(supGroup, newOptions);
                supmid = makeSpan$1([style.reset(), style.sup().cls()], [sup], newOptions);

                supKern = Math.max(fontMetrics.metrics.bigOpSpacing1, fontMetrics.metrics.bigOpSpacing3 - sup.depth);
            }

            if (subGroup) {
                newOptions = options.withStyle(style.sub());
                var sub = buildGroup(subGroup, newOptions);
                submid = makeSpan$1([style.reset(), style.sub().cls()], [sub], newOptions);

                subKern = Math.max(fontMetrics.metrics.bigOpSpacing2, fontMetrics.metrics.bigOpSpacing4 - sub.height);
            }

            // Build the final group as a vlist of the possible subscript, base,
            // and possible superscript.
            var finalGroup;
            var top;
            var bottom;
            if (!supGroup) {
                top = base.height - baseShift;

                finalGroup = buildCommon$1.makeVList([{
                    type: "kern",
                    size: fontMetrics.metrics.bigOpSpacing5
                }, {
                    type: "elem",
                    elem: submid
                }, {
                    type: "kern",
                    size: subKern
                }, {
                    type: "elem",
                    elem: base
                }], "top", top, options);

                // Here, we shift the limits by the slant of the symbol. Note
                // that we are supposed to shift the limits by 1/2 of the slant,
                // but since we are centering the limits adding a full slant of
                // margin will shift by 1/2 that.
                finalGroup.children[0].style.marginLeft = -slant + "em";
            } else if (!subGroup) {
                bottom = base.depth + baseShift;

                finalGroup = buildCommon$1.makeVList([{
                    type: "elem",
                    elem: base
                }, {
                    type: "kern",
                    size: supKern
                }, {
                    type: "elem",
                    elem: supmid
                }, {
                    type: "kern",
                    size: fontMetrics.metrics.bigOpSpacing5
                }], "bottom", bottom, options);

                // See comment above about slants
                finalGroup.children[1].style.marginLeft = slant + "em";
            } else if (!supGroup && !subGroup) {
                // This case probably shouldn't occur (this would mean the
                // supsub was sending us a group with no superscript or
                // subscript) but be safe.
                return base;
            } else {
                bottom = fontMetrics.metrics.bigOpSpacing5 + submid.height + submid.depth + subKern + base.depth + baseShift;

                finalGroup = buildCommon$1.makeVList([{
                    type: "kern",
                    size: fontMetrics.metrics.bigOpSpacing5
                }, {
                    type: "elem",
                    elem: submid
                }, {
                    type: "kern",
                    size: subKern
                }, {
                    type: "elem",
                    elem: base
                }, {
                    type: "kern",
                    size: supKern
                }, {
                    type: "elem",
                    elem: supmid
                }, {
                    type: "kern",
                    size: fontMetrics.metrics.bigOpSpacing5
                }], "bottom", bottom, options);

                // See comment above about slants
                finalGroup.children[0].style.marginLeft = -slant + "em";
                finalGroup.children[2].style.marginLeft = slant + "em";
            }

            return makeSpan$1(["mop", "op-limits"], [finalGroup], options);
        } else {
            if (group.value.symbol) {
                base.style.top = baseShift + "em";
            }

            return base;
        }
    }
    ;

    groupTypes.mod = function(group, options) {
        var inner = [];

        if (group.value.modType === "bmod") {
            // “\nonscript\mskip-\medmuskip\mkern5mu”
            if (!options.style.isTight()) {
                inner.push(makeSpan$1(["mspace", "negativemediumspace"], [], options));
            }
            inner.push(makeSpan$1(["mspace", "thickspace"], [], options));
        } else if (options.style.size === Style$1.DISPLAY.size) {
            inner.push(makeSpan$1(["mspace", "quad"], [], options));
        } else if (group.value.modType === "mod") {
            inner.push(makeSpan$1(["mspace", "twelvemuspace"], [], options));
        } else {
            inner.push(makeSpan$1(["mspace", "eightmuspace"], [], options));
        }

        if (group.value.modType === "pod" || group.value.modType === "pmod") {
            inner.push(buildCommon$1.mathsym("(", group.mode));
        }

        if (group.value.modType !== "pod") {
            var modInner = [buildCommon$1.mathsym("m", group.mode), buildCommon$1.mathsym("o", group.mode), buildCommon$1.mathsym("d", group.mode)];
            if (group.value.modType === "bmod") {
                inner.push(makeSpan$1(["mbin"], modInner, options));
                // “\mkern5mu\nonscript\mskip-\medmuskip”
                inner.push(makeSpan$1(["mspace", "thickspace"], [], options));
                if (!options.style.isTight()) {
                    inner.push(makeSpan$1(["mspace", "negativemediumspace"], [], options));
                }
            } else {
                Array.prototype.push.apply(inner, modInner);
                inner.push(makeSpan$1(["mspace", "sixmuspace"], [], options));
            }
        }

        if (group.value.value) {
            Array.prototype.push.apply(inner, buildExpression(group.value.value, options, false));
        }

        if (group.value.modType === "pod" || group.value.modType === "pmod") {
            inner.push(buildCommon$1.mathsym(")", group.mode));
        }

        return buildCommon$1.makeFragment(inner);
    }
    ;

    groupTypes.katex = function(group, options) {
        // The KaTeX logo. The offsets for the K and a were chosen to look
        // good, but the offsets for the T, E, and X were taken from the
        // definition of \TeX in TeX (see TeXbook pg. 356)
        var k = makeSpan$1(["k"], [buildCommon$1.mathsym("K", group.mode)], options);
        var a = makeSpan$1(["a"], [buildCommon$1.mathsym("A", group.mode)], options);

        a.height = (a.height + 0.2) * 0.75;
        a.depth = (a.height - 0.2) * 0.75;

        var t = makeSpan$1(["t"], [buildCommon$1.mathsym("T", group.mode)], options);
        var e = makeSpan$1(["e"], [buildCommon$1.mathsym("E", group.mode)], options);

        e.height = (e.height - 0.2155);
        e.depth = (e.depth + 0.2155);

        var x = makeSpan$1(["x"], [buildCommon$1.mathsym("X", group.mode)], options);

        return makeSpan$1(["mord", "katex-logo"], [k, a, t, e, x], options);
    }
    ;

    groupTypes.overline = function(group, options) {
        // Overlines are handled in the TeXbook pg 443, Rule 9.
        var style = options.style;

        // Build the inner group in the cramped style.
        var innerGroup = buildGroup(group.value.body, options.withStyle(style.cramp()));

        var ruleWidth = fontMetrics.metrics.defaultRuleThickness / style.sizeMultiplier;

        // Create the line above the body
        var line = makeSpan$1([style.reset(), Style$1.TEXT.cls(), "overline-line"]);
        line.height = ruleWidth;
        line.maxFontSize = 1.0;

        // Generate the vlist, with the appropriate kerns
        var vlist = buildCommon$1.makeVList([{
            type: "elem",
            elem: innerGroup
        }, {
            type: "kern",
            size: 3 * ruleWidth
        }, {
            type: "elem",
            elem: line
        }, {
            type: "kern",
            size: ruleWidth
        }], "firstBaseline", null, options);

        return makeSpan$1(["mord", "overline"], [vlist], options);
    }
    ;

    groupTypes.underline = function(group, options) {
        // Underlines are handled in the TeXbook pg 443, Rule 10.
        var style = options.style;

        // Build the inner group.
        var innerGroup = buildGroup(group.value.body, options);

        var ruleWidth = fontMetrics.metrics.defaultRuleThickness / style.sizeMultiplier;

        // Create the line above the body
        var line = makeSpan$1([style.reset(), Style$1.TEXT.cls(), "underline-line"]);
        line.height = ruleWidth;
        line.maxFontSize = 1.0;

        // Generate the vlist, with the appropriate kerns
        var vlist = buildCommon$1.makeVList([{
            type: "kern",
            size: ruleWidth
        }, {
            type: "elem",
            elem: line
        }, {
            type: "kern",
            size: 3 * ruleWidth
        }, {
            type: "elem",
            elem: innerGroup
        }], "top", innerGroup.height, options);

        return makeSpan$1(["mord", "underline"], [vlist], options);
    }
    ;

    groupTypes.sqrt = function(group, options) {
        // Square roots are handled in the TeXbook pg. 443, Rule 11.
        var style = options.style;

        // First, we do the same steps as in overline to build the inner group
        // and line
        var inner = buildGroup(group.value.body, options.withStyle(style.cramp()));

        var ruleWidth = fontMetrics.metrics.defaultRuleThickness / style.sizeMultiplier;

        var line = makeSpan$1([style.reset(), Style$1.TEXT.cls(), "sqrt-line"], [], options);
        line.height = ruleWidth;
        line.maxFontSize = 1.0;

        var phi = ruleWidth;
        if (style.id < Style$1.TEXT.id) {
            phi = style.metrics.xHeight;
        }

        // Calculate the clearance between the body and line
        var lineClearance = ruleWidth + phi / 4;

        var innerHeight = (inner.height + inner.depth) * style.sizeMultiplier;
        var minDelimiterHeight = innerHeight + lineClearance + ruleWidth;

        // Create a \surd delimiter of the required minimum size
        var delim = makeSpan$1(["sqrt-sign"], [delimiter.customSizedDelim("\\surd", minDelimiterHeight, false, options, group.mode)], options);

        var delimDepth = (delim.height + delim.depth) - ruleWidth;

        // Adjust the clearance based on the delimiter size
        if (delimDepth > inner.height + inner.depth + lineClearance) {
            lineClearance = (lineClearance + delimDepth - inner.height - inner.depth) / 2;
        }

        // Shift the delimiter so that its top lines up with the top of the line
        var delimShift = -(inner.height + lineClearance + ruleWidth) + delim.height;
        delim.style.top = delimShift + "em";
        delim.height -= delimShift;
        delim.depth += delimShift;

        // We add a special case here, because even when `inner` is empty, we
        // still get a line. So, we use a simple heuristic to decide if we
        // should omit the body entirely. (note this doesn't work for something
        // like `\sqrt{\rlap{x}}`, but if someone is doing that they deserve for
        // it not to work.
        var body;
        if (inner.height === 0 && inner.depth === 0) {
            body = makeSpan$1();
        } else {
            body = buildCommon$1.makeVList([{
                type: "elem",
                elem: inner
            }, {
                type: "kern",
                size: lineClearance
            }, {
                type: "elem",
                elem: line
            }, {
                type: "kern",
                size: ruleWidth
            }], "firstBaseline", null, options);
        }

        if (!group.value.index) {
            return makeSpan$1(["mord", "sqrt"], [delim, body], options);
        } else {
            // Handle the optional root index

            // The index is always in scriptscript style
            var newOptions = options.withStyle(Style$1.SCRIPTSCRIPT);
            var root = buildGroup(group.value.index, newOptions);
            var rootWrap = makeSpan$1([style.reset(), Style$1.SCRIPTSCRIPT.cls()], [root], newOptions);

            // Figure out the height and depth of the inner part
            var innerRootHeight = Math.max(delim.height, body.height);
            var innerRootDepth = Math.max(delim.depth, body.depth);

            // The amount the index is shifted by. This is taken from the TeX
            // source, in the definition of `\r@@t`.
            var toShift = 0.6 * (innerRootHeight - innerRootDepth);

            // Build a VList with the superscript shifted up correctly
            var rootVList = buildCommon$1.makeVList([{
                type: "elem",
                elem: rootWrap
            }], "shift", -toShift, options);
            // Add a class surrounding it so we can add on the appropriate
            // kerning
            var rootVListWrap = makeSpan$1(["root"], [rootVList]);

            return makeSpan$1(["mord", "sqrt"], [rootVListWrap, delim, body], options);
        }
    }
    ;

    groupTypes.sizing = function(group, options) {
        // Handle sizing operators like \Huge. Real TeX doesn't actually allow
        // these functions inside of math expressions, so we do some special
        // handling.
        var inner = buildExpression(group.value.value, options.withSize(group.value.size), false);

        // Compute the correct maxFontSize.
        var style = options.style;
        var fontSize = buildCommon$1.sizingMultiplier[group.value.size];
        fontSize = fontSize * style.sizeMultiplier;

        // Add size-resetting classes to the inner list and set maxFontSize
        // manually. Handle nested size changes.
        for (var i = 0; i < inner.length; i++) {
            var pos = utils$1.indexOf(inner[i].classes, "sizing");
            if (pos < 0) {
                inner[i].classes.push("sizing", "reset-" + options.size, group.value.size, style.cls());
                inner[i].maxFontSize = fontSize;
            } else if (inner[i].classes[pos + 1] === "reset-" + group.value.size) {
                // This is a nested size change: e.g., inner[i] is the "b" in
                // `\Huge a \small b`. Override the old size (the `reset-` class)
                // but not the new size.
                inner[i].classes[pos + 1] = "reset-" + options.size;
            }
        }

        return buildCommon$1.makeFragment(inner);
    }
    ;

    groupTypes.styling = function(group, options) {
        // Style changes are handled in the TeXbook on pg. 442, Rule 3.

        // Figure out what style we're changing to.
        var styleMap = {
            "display": Style$1.DISPLAY,
            "text": Style$1.TEXT,
            "script": Style$1.SCRIPT,
            "scriptscript": Style$1.SCRIPTSCRIPT
        };

        var newStyle = styleMap[group.value.style];
        var newOptions = options.withStyle(newStyle);

        // Build the inner expression in the new style.
        var inner = buildExpression(group.value.value, newOptions, false);

        // Add style-resetting classes to the inner list. Handle nested changes.
        for (var i = 0; i < inner.length; i++) {
            var pos = utils$1.indexOf(inner[i].classes, newStyle.reset());
            if (pos < 0) {
                inner[i].classes.push(options.style.reset(), newStyle.cls());
            } else {
                // This is a nested style change, as `\textstyle a\scriptstyle b`.
                // Only override the old style (the reset class).
                inner[i].classes[pos] = options.style.reset();
            }
        }

        return new buildCommon$1.makeFragment(inner);
    }
    ;

    groupTypes.font = function(group, options) {
        var font = group.value.font;
        return buildGroup(group.value.body, options.withFont(font));
    }
    ;

    groupTypes.delimsizing = function(group, options) {
        var delim = group.value.value;

        if (delim === ".") {
            // Empty delimiters still count as elements, even though they don't
            // show anything.
            return makeSpan$1([group.value.mclass]);
        }

        // Use delimiter.sizedDelim to generate the delimiter.
        return delimiter.sizedDelim(delim, group.value.size, options, group.mode, [group.value.mclass]);
    }
    ;

    groupTypes.leftright = function(group, options) {
        // Build the inner expression
        var inner = buildExpression(group.value.body, options.reset(), true);

        var innerHeight = 0;
        var innerDepth = 0;
        var hadMiddle = false;

        // Calculate its height and depth
        for (var i = 0; i < inner.length; i++) {
            if (inner[i].isMiddle) {
                hadMiddle = true;
            } else {
                innerHeight = Math.max(inner[i].height, innerHeight);
                innerDepth = Math.max(inner[i].depth, innerDepth);
            }
        }

        var style = options.style;

        // The size of delimiters is the same, regardless of what style we are
        // in. Thus, to correctly calculate the size of delimiter we need around
        // a group, we scale down the inner size based on the size.
        innerHeight *= style.sizeMultiplier;
        innerDepth *= style.sizeMultiplier;

        var leftDelim;
        if (group.value.left === ".") {
            // Empty delimiters in \left and \right make null delimiter spaces.
            leftDelim = makeNullDelimiter(options, ["mopen"]);
        } else {
            // Otherwise, use leftRightDelim to generate the correct sized
            // delimiter.
            leftDelim = delimiter.leftRightDelim(group.value.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
        }
        // Add it to the beginning of the expression
        inner.unshift(leftDelim);

        // Handle middle delimiters
        if (hadMiddle) {
            for (i = 1; i < inner.length; i++) {
                if (inner[i].isMiddle) {
                    // Apply the options that were active when \middle was called
                    inner[i] = delimiter.leftRightDelim(inner[i].isMiddle.value, innerHeight, innerDepth, inner[i].isMiddle.options, group.mode, []);
                }
            }
        }

        var rightDelim;
        // Same for the right delimiter
        if (group.value.right === ".") {
            rightDelim = makeNullDelimiter(options, ["mclose"]);
        } else {
            rightDelim = delimiter.leftRightDelim(group.value.right, innerHeight, innerDepth, options, group.mode, ["mclose"]);
        }
        // Add it to the end of the expression.
        inner.push(rightDelim);

        return makeSpan$1(["minner", style.cls()], inner, options);
    }
    ;

    groupTypes.middle = function(group, options) {
        var middleDelim;
        if (group.value.value === ".") {
            middleDelim = makeNullDelimiter(options, []);
        } else {
            middleDelim = delimiter.sizedDelim(group.value.value, 1, options, group.mode, []);
            middleDelim.isMiddle = {
                value: group.value.value,
                options: options
            };
        }
        return middleDelim;
    }
    ;

    groupTypes.rule = function(group, options) {
        // Make an empty span for the rule
        var rule = makeSpan$1(["mord", "rule"], [], options);
        var style = options.style;

        // Calculate the shift, width, and height of the rule, and account for units
        var shift = 0;
        if (group.value.shift) {
            shift = calculateSize(group.value.shift, style);
        }

        var width = calculateSize(group.value.width, style);
        var height = calculateSize(group.value.height, style);

        // The sizes of rules are absolute, so make it larger if we are in a
        // smaller style.
        shift /= style.sizeMultiplier;
        width /= style.sizeMultiplier;
        height /= style.sizeMultiplier;

        // Style the rule to the right size
        rule.style.borderRightWidth = width + "em";
        rule.style.borderTopWidth = height + "em";
        rule.style.bottom = shift + "em";

        // Record the height and width
        rule.width = width;
        rule.height = height + shift;
        rule.depth = -shift;

        return rule;
    }
    ;

    groupTypes.kern = function(group, options) {
        // Make an empty span for the rule
        var rule = makeSpan$1(["mord", "rule"], [], options);
        var style = options.style;

        var dimension = 0;
        if (group.value.dimension) {
            dimension = calculateSize(group.value.dimension, style);
        }

        dimension /= style.sizeMultiplier;

        rule.style.marginLeft = dimension + "em";

        return rule;
    }
    ;

    groupTypes.accent = function(group, options) {
        // Accents are handled in the TeXbook pg. 443, rule 12.
        var base = group.value.base;
        var style = options.style;

        var supsubGroup;
        if (group.type === "supsub") {
            // If our base is a character box, and we have superscripts and
            // subscripts, the supsub will defer to us. In particular, we want
            // to attach the superscripts and subscripts to the inner body (so
            // that the position of the superscripts and subscripts won't be
            // affected by the height of the accent). We accomplish this by
            // sticking the base of the accent into the base of the supsub, and
            // rendering that, while keeping track of where the accent is.

            // The supsub group is the group that was passed in
            var supsub = group;
            // The real accent group is the base of the supsub group
            group = supsub.value.base;
            // The character box is the base of the accent group
            base = group.value.base;
            // Stick the character box into the base of the supsub group
            supsub.value.base = base;

            // Rerender the supsub group with its new base, and store that
            // result.
            supsubGroup = buildGroup(supsub, options.reset());
        }

        // Build the base group
        var body = buildGroup(base, options.withStyle(style.cramp()));

        // Calculate the skew of the accent. This is based on the line "If the
        // nucleus is not a single character, let s = 0; otherwise set s to the
        // kern amount for the nucleus followed by the \skewchar of its font."
        // Note that our skew metrics are just the kern between each character
        // and the skewchar.
        var skew;
        if (isCharacterBox(base)) {
            // If the base is a character box, then we want the skew of the
            // innermost character. To do that, we find the innermost character:
            var baseChar = getBaseElem(base);
            // Then, we render its group to get the symbol inside it
            var baseGroup = buildGroup(baseChar, options.withStyle(style.cramp()));
            // Finally, we pull the skew off of the symbol.
            skew = baseGroup.skew;
            // Note that we now throw away baseGroup, because the layers we
            // removed with getBaseElem might contain things like \color which
            // we can't get rid of.
            // TODO(emily): Find a better way to get the skew
        } else {
            skew = 0;
        }

        // calculate the amount of space between the body and the accent
        var clearance = Math.min(body.height, style.metrics.xHeight);

        // Build the accent
        var accent = buildCommon$1.makeSymbol(group.value.accent, "Main-Regular", "math", options);
        // Remove the italic correction of the accent, because it only serves to
        // shift the accent over to a place we don't want.
        accent.italic = 0;

        // The \vec character that the fonts use is a combining character, and
        // thus shows up much too far to the left. To account for this, we add a
        // specific class which shifts the accent over to where we want it.
        // TODO(emily): Fix this in a better way, like by changing the font
        var vecClass = group.value.accent === "\\vec" ? "accent-vec" : null;

        var accentBody = makeSpan$1(["accent-body", vecClass], [makeSpan$1([], [accent])]);

        accentBody = buildCommon$1.makeVList([{
            type: "elem",
            elem: body
        }, {
            type: "kern",
            size: -clearance
        }, {
            type: "elem",
            elem: accentBody
        }], "firstBaseline", null, options);

        // Shift the accent over by the skew. Note we shift by twice the skew
        // because we are centering the accent, so by adding 2*skew to the left,
        // we shift it to the right by 1*skew.
        accentBody.children[1].style.marginLeft = 2 * skew + "em";

        var accentWrap = makeSpan$1(["mord", "accent"], [accentBody], options);

        if (supsubGroup) {
            // Here, we replace the "base" child of the supsub with our newly
            // generated accent.
            supsubGroup.children[0] = accentWrap;

            // Since we don't rerun the height calculation after replacing the
            // accent, we manually recalculate height.
            supsubGroup.height = Math.max(accentWrap.height, supsubGroup.height);

            // Accents should always be ords, even when their innards are not.
            supsubGroup.classes[0] = "mord";

            return supsubGroup;
        } else {
            return accentWrap;
        }
    }
    ;

    groupTypes.phantom = function(group, options) {
        var elements = buildExpression(group.value.value, options.withPhantom(), false);

        // \phantom isn't supposed to affect the elements it contains.
        // See "color" for more details.
        return new buildCommon$1.makeFragment(elements);
    }
    ;

    groupTypes.mclass = function(group, options) {
        var elements = buildExpression(group.value.value, options, true);

        return makeSpan$1([group.value.mclass], elements, options);
    }
    ;

    /**
 * buildGroup is the function that takes a group and calls the correct groupType
 * function for it. It also handles the interaction of size and style changes
 * between parents and children.
 */
    var buildGroup = function(group, options) {
        if (!group) {
            return makeSpan$1();
        }

        if (groupTypes[group.type]) {
            // Call the groupTypes function
            var groupNode = groupTypes[group.type](group, options);
            var multiplier;

            // If the style changed between the parent and the current group,
            // account for the size difference
            if (options.style !== options.parentStyle) {
                multiplier = options.style.sizeMultiplier / options.parentStyle.sizeMultiplier;

                groupNode.height *= multiplier;
                groupNode.depth *= multiplier;
            }

            // If the size changed between the parent and the current group, account
            // for that size difference.
            if (options.size !== options.parentSize) {
                multiplier = buildCommon$1.sizingMultiplier[options.size] / buildCommon$1.sizingMultiplier[options.parentSize];

                groupNode.height *= multiplier;
                groupNode.depth *= multiplier;
            }

            return groupNode;
        } else {
            throw new ParseError$2("Got group of unknown type: '" + group.type + "'");
        }
    };

    /**
 * Take an entire parse tree, and build it into an appropriate set of HTML
 * nodes.
 */
    var buildHTML$1 = function(tree, options) {
        // buildExpression is destructive, so we need to make a clone
        // of the incoming tree so that it isn't accidentally changed
        tree = JSON.parse(JSON.stringify(tree));

        // Build the expression contained in the tree
        var expression = buildExpression(tree, options, true);
        var body = makeSpan$1(["base", options.style.cls()], expression, options);

        // Add struts, which ensure that the top of the HTML element falls at the
        // height of the expression, and the bottom of the HTML element falls at the
        // depth of the expression.
        var topStrut = makeSpan$1(["strut"]);
        var bottomStrut = makeSpan$1(["strut", "bottom"]);

        topStrut.style.height = body.height + "em";
        bottomStrut.style.height = (body.height + body.depth) + "em";
        // We'd like to use `vertical-align: top` but in IE 9 this lowers the
        // baseline of the box to the bottom of this strut (instead staying in the
        // normal place) so we use an absolute value for vertical-align instead
        bottomStrut.style.verticalAlign = -body.depth + "em";

        // Wrap the struts and body together
        var htmlNode = makeSpan$1(["katex-html"], [topStrut, bottomStrut, body]);

        htmlNode.setAttribute("aria-hidden", "true");

        return htmlNode;
    };

    var buildHTML_1 = buildHTML$1;

    /**
 * These objects store data about MathML nodes. This is the MathML equivalent
 * of the types in domTree.js. Since MathML handles its own rendering, and
 * since we're mainly using MathML to improve accessibility, we don't manage
 * any of the styling state that the plain DOM nodes do.
 *
 * The `toNode` and `toMarkup` functions work simlarly to how they do in
 * domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
 */

    var utils$8 = utils$4;

    /**
 * This node represents a general purpose MathML node of any type. The
 * constructor requires the type of node to create (for example, `"mo"` or
 * `"mspace"`, corresponding to `<mo>` and `<mspace>` tags).
 */
    function MathNode(type, children) {
        this.type = type;
        this.attributes = {};
        this.children = children || [];
    }

    /**
 * Sets an attribute on a MathML node. MathML depends on attributes to convey a
 * semantic content, so this is used heavily.
 */
    MathNode.prototype.setAttribute = function(name, value) {
        this.attributes[name] = value;
    }
    ;

    /**
 * Converts the math node into a MathML-namespaced DOM element.
 */
    MathNode.prototype.toNode = function() {
        var this$1 = this;

        var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);

        for (var attr in this.attributes) {
            if (Object.prototype.hasOwnProperty.call(this$1.attributes, attr)) {
                node.setAttribute(attr, this$1.attributes[attr]);
            }
        }

        for (var i = 0; i < this.children.length; i++) {
            node.appendChild(this$1.children[i].toNode());
        }

        return node;
    }
    ;

    /**
 * Converts the math node into an HTML markup string.
 */
    MathNode.prototype.toMarkup = function() {
        var this$1 = this;

        var markup = "<" + this.type;

        // Add the attributes
        for (var attr in this.attributes) {
            if (Object.prototype.hasOwnProperty.call(this$1.attributes, attr)) {
                markup += " " + attr + "=\"";
                markup += utils$8.escape(this$1.attributes[attr]);
                markup += "\"";
            }
        }

        markup += ">";

        for (var i = 0; i < this.children.length; i++) {
            markup += this$1.children[i].toMarkup();
        }

        markup += "</" + this.type + ">";

        return markup;
    }
    ;

    /**
 * This node represents a piece of text.
 */
    function TextNode(text) {
        this.text = text;
    }

    /**
 * Converts the text node into a DOM text node.
 */
    TextNode.prototype.toNode = function() {
        return document.createTextNode(this.text);
    }
    ;

    /**
 * Converts the text node into HTML markup (which is just the text itself).
 */
    TextNode.prototype.toMarkup = function() {
        return utils$8.escape(this.text);
    }
    ;

    var mathMLTree$1 = {
        MathNode: MathNode,
        TextNode: TextNode
    };

    /**
 * This file converts a parse tree into a cooresponding MathML tree. The main
 * entry point is the `buildMathML` function, which takes a parse tree from the
 * parser.
 */

    var buildCommon$5 = buildCommon$2;
    var fontMetrics$5 = fontMetrics$1;
    var mathMLTree = mathMLTree$1;
    var ParseError$4 = ParseError_1;
    var symbols$4 = symbols$1;
    var utils$7 = utils$4;

    var makeSpan$4 = buildCommon$5.makeSpan;
    var fontMap$1 = buildCommon$5.fontMap;

    /**
 * Takes a symbol and converts it into a MathML text node after performing
 * optional replacement from symbols.js.
 */
    var makeText = function(text, mode) {
        if (symbols$4[mode][text] && symbols$4[mode][text].replace) {
            text = symbols$4[mode][text].replace;
        }

        return new mathMLTree.TextNode(text);
    };

    /**
 * Returns the math variant as a string or null if none is required.
 */
    var getVariant = function(group, options) {
        var font = options.font;
        if (!font) {
            return null;
        }

        var mode = group.mode;
        if (font === "mathit") {
            return "italic";
        }

        var value = group.value;
        if (utils$7.contains(["\\imath", "\\jmath"], value)) {
            return null;
        }

        if (symbols$4[mode][value] && symbols$4[mode][value].replace) {
            value = symbols$4[mode][value].replace;
        }

        var fontName = fontMap$1[font].fontName;
        if (fontMetrics$5.getCharacterMetrics(value, fontName)) {
            return fontMap$1[options.font].variant;
        }

        return null;
    };

    /**
 * Functions for handling the different types of groups found in the parse
 * tree. Each function should take a parse group and return a MathML node.
 */
    var groupTypes$1 = {};

    groupTypes$1.mathord = function(group, options) {
        var node = new mathMLTree.MathNode("mi",[makeText(group.value, group.mode)]);

        var variant = getVariant(group, options);
        if (variant) {
            node.setAttribute("mathvariant", variant);
        }
        return node;
    }
    ;

    groupTypes$1.textord = function(group, options) {
        var text = makeText(group.value, group.mode);

        var variant = getVariant(group, options) || "normal";

        var node;
        if (/[0-9]/.test(group.value)) {
            // TODO(kevinb) merge adjacent <mn> nodes
            // do it as a post processing step
            node = new mathMLTree.MathNode("mn",[text]);
            if (options.font) {
                node.setAttribute("mathvariant", variant);
            }
        } else {
            node = new mathMLTree.MathNode("mi",[text]);
            node.setAttribute("mathvariant", variant);
        }

        return node;
    }
    ;

    groupTypes$1.bin = function(group) {
        var node = new mathMLTree.MathNode("mo",[makeText(group.value, group.mode)]);

        return node;
    }
    ;

    groupTypes$1.rel = function(group) {
        var node = new mathMLTree.MathNode("mo",[makeText(group.value, group.mode)]);

        return node;
    }
    ;

    groupTypes$1.open = function(group) {
        var node = new mathMLTree.MathNode("mo",[makeText(group.value, group.mode)]);

        return node;
    }
    ;

    groupTypes$1.close = function(group) {
        var node = new mathMLTree.MathNode("mo",[makeText(group.value, group.mode)]);

        return node;
    }
    ;

    groupTypes$1.inner = function(group) {
        var node = new mathMLTree.MathNode("mo",[makeText(group.value, group.mode)]);

        return node;
    }
    ;

    groupTypes$1.punct = function(group) {
        var node = new mathMLTree.MathNode("mo",[makeText(group.value, group.mode)]);

        node.setAttribute("separator", "true");

        return node;
    }
    ;

    groupTypes$1.ordgroup = function(group, options) {
        var inner = buildExpression$1(group.value, options);

        var node = new mathMLTree.MathNode("mrow",inner);

        return node;
    }
    ;

    groupTypes$1.text = function(group, options) {
        var inner = buildExpression$1(group.value.body, options);

        var node = new mathMLTree.MathNode("mtext",inner);

        return node;
    }
    ;

    groupTypes$1.color = function(group, options) {
        var inner = buildExpression$1(group.value.value, options);

        var node = new mathMLTree.MathNode("mstyle",inner);

        node.setAttribute("mathcolor", group.value.color);

        return node;
    }
    ;

    groupTypes$1.supsub = function(group, options) {
        var children = [buildGroup$1(group.value.base, options)];

        if (group.value.sub) {
            children.push(buildGroup$1(group.value.sub, options));
        }

        if (group.value.sup) {
            children.push(buildGroup$1(group.value.sup, options));
        }

        var nodeType;
        if (!group.value.sub) {
            nodeType = "msup";
        } else if (!group.value.sup) {
            nodeType = "msub";
        } else {
            nodeType = "msubsup";
        }

        var node = new mathMLTree.MathNode(nodeType,children);

        return node;
    }
    ;

    groupTypes$1.genfrac = function(group, options) {
        var node = new mathMLTree.MathNode("mfrac",[buildGroup$1(group.value.numer, options), buildGroup$1(group.value.denom, options)]);

        if (!group.value.hasBarLine) {
            node.setAttribute("linethickness", "0px");
        }

        if (group.value.leftDelim != null || group.value.rightDelim != null) {
            var withDelims = [];

            if (group.value.leftDelim != null) {
                var leftOp = new mathMLTree.MathNode("mo",[new mathMLTree.TextNode(group.value.leftDelim)]);

                leftOp.setAttribute("fence", "true");

                withDelims.push(leftOp);
            }

            withDelims.push(node);

            if (group.value.rightDelim != null) {
                var rightOp = new mathMLTree.MathNode("mo",[new mathMLTree.TextNode(group.value.rightDelim)]);

                rightOp.setAttribute("fence", "true");

                withDelims.push(rightOp);
            }

            var outerNode = new mathMLTree.MathNode("mrow",withDelims);

            return outerNode;
        }

        return node;
    }
    ;

    groupTypes$1.array = function(group, options) {
        return new mathMLTree.MathNode("mtable",group.value.body.map(function(row) {
            return new mathMLTree.MathNode("mtr",row.map(function(cell) {
                return new mathMLTree.MathNode("mtd",[buildGroup$1(cell, options)]);
            }));
        }));
    }
    ;

    groupTypes$1.sqrt = function(group, options) {
        var node;
        if (group.value.index) {
            node = new mathMLTree.MathNode("mroot",[buildGroup$1(group.value.body, options), buildGroup$1(group.value.index, options)]);
        } else {
            node = new mathMLTree.MathNode("msqrt",[buildGroup$1(group.value.body, options)]);
        }

        return node;
    }
    ;

    groupTypes$1.leftright = function(group, options) {
        var inner = buildExpression$1(group.value.body, options);

        if (group.value.left !== ".") {
            var leftNode = new mathMLTree.MathNode("mo",[makeText(group.value.left, group.mode)]);

            leftNode.setAttribute("fence", "true");

            inner.unshift(leftNode);
        }

        if (group.value.right !== ".") {
            var rightNode = new mathMLTree.MathNode("mo",[makeText(group.value.right, group.mode)]);

            rightNode.setAttribute("fence", "true");

            inner.push(rightNode);
        }

        var outerNode = new mathMLTree.MathNode("mrow",inner);

        return outerNode;
    }
    ;

    groupTypes$1.middle = function(group, options) {
        var middleNode = new mathMLTree.MathNode("mo",[makeText(group.value.middle, group.mode)]);
        middleNode.setAttribute("fence", "true");
        return middleNode;
    }
    ;

    groupTypes$1.accent = function(group, options) {
        var accentNode = new mathMLTree.MathNode("mo",[makeText(group.value.accent, group.mode)]);

        var node = new mathMLTree.MathNode("mover",[buildGroup$1(group.value.base, options), accentNode]);

        node.setAttribute("accent", "true");

        return node;
    }
    ;

    groupTypes$1.spacing = function(group) {
        var node;

        if (group.value === "\\ " || group.value === "\\space" || group.value === " " || group.value === "~") {
            node = new mathMLTree.MathNode("mtext",[new mathMLTree.TextNode("\u00a0")]);
        } else {
            node = new mathMLTree.MathNode("mspace");

            node.setAttribute("width", buildCommon$5.spacingFunctions[group.value].size);
        }

        return node;
    }
    ;

    groupTypes$1.op = function(group, options) {
        var node;

        // TODO(emily): handle big operators using the `largeop` attribute

        if (group.value.symbol) {
            // This is a symbol. Just add the symbol.
            node = new mathMLTree.MathNode("mo",[makeText(group.value.body, group.mode)]);
        } else if (group.value.value) {
            // This is an operator with children. Add them.
            node = new mathMLTree.MathNode("mo",buildExpression$1(group.value.value, options));
        } else {
            // This is a text operator. Add all of the characters from the
            // operator's name.
            // TODO(emily): Add a space in the middle of some of these
            // operators, like \limsup.
            node = new mathMLTree.MathNode("mi",[new mathMLTree.TextNode(group.value.body.slice(1))]);
        }

        return node;
    }
    ;

    groupTypes$1.mod = function(group, options) {
        var inner = [];

        if (group.value.modType === "pod" || group.value.modType === "pmod") {
            inner.push(new mathMLTree.MathNode("mo",[makeText("(", group.mode)]));
        }
        if (group.value.modType !== "pod") {
            inner.push(new mathMLTree.MathNode("mo",[makeText("mod", group.mode)]));
        }
        if (group.value.value) {
            var space = new mathMLTree.MathNode("mspace");
            space.setAttribute("width", "0.333333em");
            inner.push(space);
            inner = inner.concat(buildExpression$1(group.value.value, options));
        }
        if (group.value.modType === "pod" || group.value.modType === "pmod") {
            inner.push(new mathMLTree.MathNode("mo",[makeText(")", group.mode)]));
        }

        return new mathMLTree.MathNode("mo",inner);
    }
    ;

    groupTypes$1.katex = function(group) {
        var node = new mathMLTree.MathNode("mtext",[new mathMLTree.TextNode("KaTeX")]);

        return node;
    }
    ;

    groupTypes$1.font = function(group, options) {
        var font = group.value.font;
        return buildGroup$1(group.value.body, options.withFont(font));
    }
    ;

    groupTypes$1.delimsizing = function(group) {
        var children = [];

        if (group.value.value !== ".") {
            children.push(makeText(group.value.value, group.mode));
        }

        var node = new mathMLTree.MathNode("mo",children);

        if (group.value.mclass === "mopen" || group.value.mclass === "mclose") {
            // Only some of the delimsizing functions act as fences, and they
            // return "mopen" or "mclose" mclass.
            node.setAttribute("fence", "true");
        } else {
            // Explicitly disable fencing if it's not a fence, to override the
            // defaults.
            node.setAttribute("fence", "false");
        }

        return node;
    }
    ;

    groupTypes$1.styling = function(group, options) {
        var inner = buildExpression$1(group.value.value, options);

        var node = new mathMLTree.MathNode("mstyle",inner);

        var styleAttributes = {
            "display": ["0", "true"],
            "text": ["0", "false"],
            "script": ["1", "false"],
            "scriptscript": ["2", "false"]
        };

        var attr = styleAttributes[group.value.style];

        node.setAttribute("scriptlevel", attr[0]);
        node.setAttribute("displaystyle", attr[1]);

        return node;
    }
    ;

    groupTypes$1.sizing = function(group, options) {
        var inner = buildExpression$1(group.value.value, options);

        var node = new mathMLTree.MathNode("mstyle",inner);

        // TODO(emily): This doesn't produce the correct size for nested size
        // changes, because we don't keep state of what style we're currently
        // in, so we can't reset the size to normal before changing it.  Now
        // that we're passing an options parameter we should be able to fix
        // this.
        node.setAttribute("mathsize", buildCommon$5.sizingMultiplier[group.value.size] + "em");

        return node;
    }
    ;

    groupTypes$1.overline = function(group, options) {
        var operator = new mathMLTree.MathNode("mo",[new mathMLTree.TextNode("\u203e")]);
        operator.setAttribute("stretchy", "true");

        var node = new mathMLTree.MathNode("mover",[buildGroup$1(group.value.body, options), operator]);
        node.setAttribute("accent", "true");

        return node;
    }
    ;

    groupTypes$1.underline = function(group, options) {
        var operator = new mathMLTree.MathNode("mo",[new mathMLTree.TextNode("\u203e")]);
        operator.setAttribute("stretchy", "true");

        var node = new mathMLTree.MathNode("munder",[buildGroup$1(group.value.body, options), operator]);
        node.setAttribute("accentunder", "true");

        return node;
    }
    ;

    groupTypes$1.rule = function(group) {
        // TODO(emily): Figure out if there's an actual way to draw black boxes
        // in MathML.
        var node = new mathMLTree.MathNode("mrow");

        return node;
    }
    ;

    groupTypes$1.kern = function(group) {
        // TODO(kevin): Figure out if there's a way to add space in MathML
        var node = new mathMLTree.MathNode("mrow");

        return node;
    }
    ;

    groupTypes$1.llap = function(group, options) {
        var node = new mathMLTree.MathNode("mpadded",[buildGroup$1(group.value.body, options)]);

        node.setAttribute("lspace", "-1width");
        node.setAttribute("width", "0px");

        return node;
    }
    ;

    groupTypes$1.rlap = function(group, options) {
        var node = new mathMLTree.MathNode("mpadded",[buildGroup$1(group.value.body, options)]);

        node.setAttribute("width", "0px");

        return node;
    }
    ;

    groupTypes$1.phantom = function(group, options) {
        var inner = buildExpression$1(group.value.value, options);
        return new mathMLTree.MathNode("mphantom",inner);
    }
    ;

    groupTypes$1.mclass = function(group, options) {
        var inner = buildExpression$1(group.value.value, options);
        return new mathMLTree.MathNode("mstyle",inner);
    }
    ;

    /**
 * Takes a list of nodes, builds them, and returns a list of the generated
 * MathML nodes. A little simpler than the HTML version because we don't do any
 * previous-node handling.
 */
    var buildExpression$1 = function(expression, options) {
        var groups = [];
        for (var i = 0; i < expression.length; i++) {
            var group = expression[i];
            groups.push(buildGroup$1(group, options));
        }
        return groups;
    };

    /**
 * Takes a group from the parser and calls the appropriate groupTypes function
 * on it to produce a MathML node.
 */
    var buildGroup$1 = function(group, options) {
        if (!group) {
            return new mathMLTree.MathNode("mrow");
        }

        if (groupTypes$1[group.type]) {
            // Call the groupTypes function
            return groupTypes$1[group.type](group, options);
        } else {
            throw new ParseError$4("Got group of unknown type: '" + group.type + "'");
        }
    };

    /**
 * Takes a full parse tree and settings and builds a MathML representation of
 * it. In particular, we put the elements from building the parse tree into a
 * <semantics> tag so we can also include that TeX source as an annotation.
 *
 * Note that we actually return a domTree element with a `<math>` inside it so
 * we can do appropriate styling.
 */
    var buildMathML$1 = function(tree, texExpression, options) {
        var expression = buildExpression$1(tree, options);

        // Wrap up the expression in an mrow so it is presented in the semantics
        // tag correctly.
        var wrapper = new mathMLTree.MathNode("mrow",expression);

        // Build a TeX annotation of the source
        var annotation = new mathMLTree.MathNode("annotation",[new mathMLTree.TextNode(texExpression)]);

        annotation.setAttribute("encoding", "application/x-tex");

        var semantics = new mathMLTree.MathNode("semantics",[wrapper, annotation]);

        var math = new mathMLTree.MathNode("math",[semantics]);

        // You can't style <math> nodes, so we wrap the node in a span.
        return makeSpan$4(["katex-mathml"], [math]);
    };

    var buildMathML_1 = buildMathML$1;

    /**
 * This file contains information about the options that the Parser carries
 * around with it while parsing. Data is held in an `Options` object, and when
 * recursing, a new `Options` object can be created with the `.with*` and
 * `.reset` functions.
 */

    /**
 * This is the main options class. It contains the style, size, color, and font
 * of the current parse level. It also contains the style and size of the parent
 * parse level, so size changes can be handled efficiently.
 *
 * Each of the `.with*` and `.reset` functions passes its current style and size
 * as the parentStyle and parentSize of the new options class, so parent
 * handling is taken care of automatically.
 */
    function Options$1(data) {
        this.style = data.style;
        this.color = data.color;
        this.size = data.size;
        this.phantom = data.phantom;
        this.font = data.font;

        if (data.parentStyle === undefined) {
            this.parentStyle = data.style;
        } else {
            this.parentStyle = data.parentStyle;
        }

        if (data.parentSize === undefined) {
            this.parentSize = data.size;
        } else {
            this.parentSize = data.parentSize;
        }
    }

    /**
 * Returns a new options object with the same properties as "this".  Properties
 * from "extension" will be copied to the new options object.
 */
    Options$1.prototype.extend = function(extension) {
        var data = {
            style: this.style,
            size: this.size,
            color: this.color,
            parentStyle: this.style,
            parentSize: this.size,
            phantom: this.phantom,
            font: this.font
        };

        for (var key in extension) {
            if (extension.hasOwnProperty(key)) {
                data[key] = extension[key];
            }
        }

        return new Options$1(data);
    }
    ;

    /**
 * Create a new options object with the given style.
 */
    Options$1.prototype.withStyle = function(style) {
        return this.extend({
            style: style
        });
    }
    ;

    /**
 * Create a new options object with the given size.
 */
    Options$1.prototype.withSize = function(size) {
        return this.extend({
            size: size
        });
    }
    ;

    /**
 * Create a new options object with the given color.
 */
    Options$1.prototype.withColor = function(color) {
        return this.extend({
            color: color
        });
    }
    ;

    /**
 * Create a new options object with "phantom" set to true.
 */
    Options$1.prototype.withPhantom = function() {
        return this.extend({
            phantom: true
        });
    }
    ;

    /**
 * Create a new options objects with the give font.
 */
    Options$1.prototype.withFont = function(font) {
        return this.extend({
            font: font || this.font
        });
    }
    ;

    /**
 * Create a new options object with the same style, size, and color. This is
 * used so that parent style and size changes are handled correctly.
 */
    Options$1.prototype.reset = function() {
        return this.extend({});
    }
    ;

    /**
 * A map of color names to CSS colors.
 * TODO(emily): Remove this when we have real macros
 */
    var colorMap = {
        "katex-blue": "#6495ed",
        "katex-orange": "#ffa500",
        "katex-pink": "#ff00af",
        "katex-red": "#df0030",
        "katex-green": "#28ae7b",
        "katex-gray": "gray",
        "katex-purple": "#9d38bd",
        "katex-blueA": "#ccfaff",
        "katex-blueB": "#80f6ff",
        "katex-blueC": "#63d9ea",
        "katex-blueD": "#11accd",
        "katex-blueE": "#0c7f99",
        "katex-tealA": "#94fff5",
        "katex-tealB": "#26edd5",
        "katex-tealC": "#01d1c1",
        "katex-tealD": "#01a995",
        "katex-tealE": "#208170",
        "katex-greenA": "#b6ffb0",
        "katex-greenB": "#8af281",
        "katex-greenC": "#74cf70",
        "katex-greenD": "#1fab54",
        "katex-greenE": "#0d923f",
        "katex-goldA": "#ffd0a9",
        "katex-goldB": "#ffbb71",
        "katex-goldC": "#ff9c39",
        "katex-goldD": "#e07d10",
        "katex-goldE": "#a75a05",
        "katex-redA": "#fca9a9",
        "katex-redB": "#ff8482",
        "katex-redC": "#f9685d",
        "katex-redD": "#e84d39",
        "katex-redE": "#bc2612",
        "katex-maroonA": "#ffbde0",
        "katex-maroonB": "#ff92c6",
        "katex-maroonC": "#ed5fa6",
        "katex-maroonD": "#ca337c",
        "katex-maroonE": "#9e034e",
        "katex-purpleA": "#ddd7ff",
        "katex-purpleB": "#c6b9fc",
        "katex-purpleC": "#aa87ff",
        "katex-purpleD": "#7854ab",
        "katex-purpleE": "#543b78",
        "katex-mintA": "#f5f9e8",
        "katex-mintB": "#edf2df",
        "katex-mintC": "#e0e5cc",
        "katex-grayA": "#f6f7f7",
        "katex-grayB": "#f0f1f2",
        "katex-grayC": "#e3e5e6",
        "katex-grayD": "#d6d8da",
        "katex-grayE": "#babec2",
        "katex-grayF": "#888d93",
        "katex-grayG": "#626569",
        "katex-grayH": "#3b3e40",
        "katex-grayI": "#21242c",
        "katex-kaBlue": "#314453",
        "katex-kaGreen": "#71B307"
    };

    /**
 * Gets the CSS color of the current options object, accounting for the
 * `colorMap`.
 */
    Options$1.prototype.getColor = function() {
        if (this.phantom) {
            return "transparent";
        } else {
            return colorMap[this.color] || this.color;
        }
    }
    ;

    var Options_1 = Options$1;

    var buildHTML = buildHTML_1;
    var buildMathML = buildMathML_1;
    var buildCommon = buildCommon$2;
    var Options = Options_1;
    var Settings$2 = Settings_1;
    var Style = Style_1;

    var makeSpan = buildCommon.makeSpan;

    var buildTree$1 = function(tree, expression, settings) {
        settings = settings || new Settings$2({});

        var startStyle = Style.TEXT;
        if (settings.displayMode) {
            startStyle = Style.DISPLAY;
        }

        // Setup the default options
        var options = new Options({
            style: startStyle,
            size: "size5"
        });

        // `buildHTML` sometimes messes with the parse tree (like turning bins ->
        // ords), so we build the MathML version first.
        var mathMLNode = buildMathML(tree, expression, options);
        var htmlNode = buildHTML(tree, options);

        var katexNode = makeSpan(["katex"], [mathMLNode, htmlNode]);

        if (settings.displayMode) {
            return makeSpan(["katex-display"], [katexNode]);
        } else {
            return katexNode;
        }
    };

    var buildTree_1 = buildTree$1;

    /**
 * The resulting parse tree nodes of the parse tree.
 *
 * It is possible to provide position information, so that a ParseNode can
 * fulfil a role similar to a Token in error reporting.
 * For details on the corresponding properties see Token constructor.
 * Providing such information can lead to better error reporting.
 *
 * @param {string}  type       type of node, like e.g. "ordgroup"
 * @param {?object} value      type-specific representation of the node
 * @param {string}  mode       parse mode in action for this node,
 *                             "math" or "text"
 * @param {Token=} firstToken  first token of the input for this node,
 *                             will omit position information if unset
 * @param {Token=} lastToken   last token of the input for this node,
 *                             will default to firstToken if unset
 */
    function ParseNode$1(type, value, mode, firstToken, lastToken) {
        this.type = type;
        this.value = value;
        this.mode = mode;
        if (firstToken && (!lastToken || lastToken.lexer === firstToken.lexer)) {
            this.lexer = firstToken.lexer;
            this.start = firstToken.start;
            this.end = (lastToken || firstToken).end;
        }
    }

    var parseData$1 = {
        ParseNode: ParseNode$1
    };

    var functions$1 = createCommonjsModule(function(module) {
        var utils = utils$4;
        var ParseError = ParseError_1;
        var parseData = parseData$1;
        var ParseNode = parseData.ParseNode;

        /* This file contains a list of functions that we parse, identified by
 * the calls to defineFunction.
 *
 * The first argument to defineFunction is a single name or a list of names.
 * All functions named in such a list will share a single implementation.
 *
 * Each declared function can have associated properties, which
 * include the following:
 *
 *  - numArgs: The number of arguments the function takes.
 *             If this is the only property, it can be passed as a number
 *             instead of an element of a properties object.
 *  - argTypes: (optional) An array corresponding to each argument of the
 *              function, giving the type of argument that should be parsed. Its
 *              length should be equal to `numArgs + numOptionalArgs`. Valid
 *              types:
 *               - "size": A size-like thing, such as "1em" or "5ex"
 *               - "color": An html color, like "#abc" or "blue"
 *               - "original": The same type as the environment that the
 *                             function being parsed is in (e.g. used for the
 *                             bodies of functions like \color where the first
 *                             argument is special and the second argument is
 *                             parsed normally)
 *              Other possible types (probably shouldn't be used)
 *               - "text": Text-like (e.g. \text)
 *               - "math": Normal math
 *              If undefined, this will be treated as an appropriate length
 *              array of "original" strings
 *  - greediness: (optional) The greediness of the function to use ungrouped
 *                arguments.
 *
 *                E.g. if you have an expression
 *                  \sqrt \frac 1 2
 *                since \frac has greediness=2 vs \sqrt's greediness=1, \frac
 *                will use the two arguments '1' and '2' as its two arguments,
 *                then that whole function will be used as the argument to
 *                \sqrt. On the other hand, the expressions
 *                  \frac \frac 1 2 3
 *                and
 *                  \frac \sqrt 1 2
 *                will fail because \frac and \frac have equal greediness
 *                and \sqrt has a lower greediness than \frac respectively. To
 *                make these parse, we would have to change them to:
 *                  \frac {\frac 1 2} 3
 *                and
 *                  \frac {\sqrt 1} 2
 *
 *                The default value is `1`
 *  - allowedInText: (optional) Whether or not the function is allowed inside
 *                   text mode (default false)
 *  - numOptionalArgs: (optional) The number of optional arguments the function
 *                     should parse. If the optional arguments aren't found,
 *                     `null` will be passed to the handler in their place.
 *                     (default 0)
 *  - infix: (optional) Must be true if the function is an infix operator.
 *
 * The last argument is that implementation, the handler for the function(s).
 * It is called to handle these functions and their arguments.
 * It receives two arguments:
 *  - context contains information and references provided by the parser
 *  - args is an array of arguments obtained from TeX input
 * The context contains the following properties:
 *  - funcName: the text (i.e. name) of the function, including \
 *  - parser: the parser object
 *  - lexer: the lexer object
 *  - positions: the positions in the overall string of the function
 *               and the arguments.
 * The latter three should only be used to produce error messages.
 *
 * The function should return an object with the following keys:
 *  - type: The type of element that this is. This is then used in
 *          buildHTML/buildMathML to determine which function
 *          should be called to build this node into a DOM node
 * Any other data can be added to the object, which will be passed
 * in to the function in buildHTML/buildMathML as `group.value`.
 */

        function defineFunction(names, props, handler) {
            if (typeof names === "string") {
                names = [names];
            }
            if (typeof props === "number") {
                props = {
                    numArgs: props
                };
            }
            // Set default values of functions
            var data = {
                numArgs: props.numArgs,
                argTypes: props.argTypes,
                greediness: (props.greediness === undefined) ? 1 : props.greediness,
                allowedInText: !!props.allowedInText,
                numOptionalArgs: props.numOptionalArgs || 0,
                infix: !!props.infix,
                handler: handler
            };
            for (var i = 0; i < names.length; ++i) {
                module.exports[names[i]] = data;
            }
        }

        // Since the corresponding buildHTML/buildMathML function expects a
        // list of elements, we normalize for different kinds of arguments
        var ordargument = function(arg) {
            if (arg.type === "ordgroup") {
                return arg.value;
            } else {
                return [arg];
            }
        };

        // A normal square root
        defineFunction("\\sqrt", {
            numArgs: 1,
            numOptionalArgs: 1
        }, function(context, args) {
            var index = args[0];
            var body = args[1];
            return {
                type: "sqrt",
                body: body,
                index: index
            };
        });

        // Non-mathy text, possibly in a font
        var textFunctionStyles = {
            "\\text": undefined,
            "\\textrm": "mathrm",
            "\\textsf": "mathsf",
            "\\texttt": "mathtt",
            "\\textnormal": "mathrm",
            "\\textbf": "mathbf",
            "\\textit": "textit"
        };

        defineFunction(["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textit"], {
            numArgs: 1,
            argTypes: ["text"],
            greediness: 2,
            allowedInText: true
        }, function(context, args) {
            var body = args[0];
            return {
                type: "text",
                body: ordargument(body),
                style: textFunctionStyles[context.funcName]
            };
        });

        // A two-argument custom color
        defineFunction("\\color", {
            numArgs: 2,
            allowedInText: true,
            greediness: 3,
            argTypes: ["color", "original"]
        }, function(context, args) {
            var color = args[0];
            var body = args[1];
            return {
                type: "color",
                color: color.value,
                value: ordargument(body)
            };
        });

        // An overline
        defineFunction("\\overline", {
            numArgs: 1
        }, function(context, args) {
            var body = args[0];
            return {
                type: "overline",
                body: body
            };
        });

        // An underline
        defineFunction("\\underline", {
            numArgs: 1
        }, function(context, args) {
            var body = args[0];
            return {
                type: "underline",
                body: body
            };
        });

        // A box of the width and height
        defineFunction("\\rule", {
            numArgs: 2,
            numOptionalArgs: 1,
            argTypes: ["size", "size", "size"]
        }, function(context, args) {
            var shift = args[0];
            var width = args[1];
            var height = args[2];
            return {
                type: "rule",
                shift: shift && shift.value,
                width: width.value,
                height: height.value
            };
        });

        // TODO: In TeX, \mkern only accepts mu-units, and \kern does not accept
        // mu-units. In current KaTeX we relax this; both commands accept any unit.
        defineFunction(["\\kern", "\\mkern"], {
            numArgs: 1,
            argTypes: ["size"]
        }, function(context, args) {
            return {
                type: "kern",
                dimension: args[0].value
            };
        });

        // A KaTeX logo
        defineFunction("\\KaTeX", {
            numArgs: 0
        }, function(context) {
            return {
                type: "katex"
            };
        });

        defineFunction("\\phantom", {
            numArgs: 1
        }, function(context, args) {
            var body = args[0];
            return {
                type: "phantom",
                value: ordargument(body)
            };
        });

        // Math class commands except \mathop
        defineFunction(["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"], {
            numArgs: 1
        }, function(context, args) {
            var body = args[0];
            return {
                type: "mclass",
                mclass: "m" + context.funcName.substr(5),
                value: ordargument(body)
            };
        });

        // Build a relation by placing one symbol on top of another
        defineFunction("\\stackrel", {
            numArgs: 2
        }, function(context, args) {
            var top = args[0];
            var bottom = args[1];

            var bottomop = new ParseNode("op",{
                type: "op",
                limits: true,
                alwaysHandleSupSub: true,
                symbol: false,
                value: ordargument(bottom)
            },bottom.mode);

            var supsub = new ParseNode("supsub",{
                base: bottomop,
                sup: top,
                sub: null
            },top.mode);

            return {
                type: "mclass",
                mclass: "mrel",
                value: [supsub]
            };
        });

        // \mod-type functions
        defineFunction("\\bmod", {
            numArgs: 0
        }, function(context, args) {
            return {
                type: "mod",
                modType: "bmod",
                value: null
            };
        });

        defineFunction(["\\pod", "\\pmod", "\\mod"], {
            numArgs: 1
        }, function(context, args) {
            var body = args[0];
            return {
                type: "mod",
                modType: context.funcName.substr(1),
                value: ordargument(body)
            };
        });

        // Extra data needed for the delimiter handler down below
        var delimiterSizes = {
            "\\bigl": {
                mclass: "mopen",
                size: 1
            },
            "\\Bigl": {
                mclass: "mopen",
                size: 2
            },
            "\\biggl": {
                mclass: "mopen",
                size: 3
            },
            "\\Biggl": {
                mclass: "mopen",
                size: 4
            },
            "\\bigr": {
                mclass: "mclose",
                size: 1
            },
            "\\Bigr": {
                mclass: "mclose",
                size: 2
            },
            "\\biggr": {
                mclass: "mclose",
                size: 3
            },
            "\\Biggr": {
                mclass: "mclose",
                size: 4
            },
            "\\bigm": {
                mclass: "mrel",
                size: 1
            },
            "\\Bigm": {
                mclass: "mrel",
                size: 2
            },
            "\\biggm": {
                mclass: "mrel",
                size: 3
            },
            "\\Biggm": {
                mclass: "mrel",
                size: 4
            },
            "\\big": {
                mclass: "mord",
                size: 1
            },
            "\\Big": {
                mclass: "mord",
                size: 2
            },
            "\\bigg": {
                mclass: "mord",
                size: 3
            },
            "\\Bigg": {
                mclass: "mord",
                size: 4
            }
        };

        var delimiters = ["(", ")", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\\lceil", "\\rceil", "<", ">", "\\langle", "\\rangle", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];

        var fontAliases = {
            "\\Bbb": "\\mathbb",
            "\\bold": "\\mathbf",
            "\\frak": "\\mathfrak"
        };

        // Single-argument color functions
        defineFunction(["\\blue", "\\orange", "\\pink", "\\red", "\\green", "\\gray", "\\purple", "\\blueA", "\\blueB", "\\blueC", "\\blueD", "\\blueE", "\\tealA", "\\tealB", "\\tealC", "\\tealD", "\\tealE", "\\greenA", "\\greenB", "\\greenC", "\\greenD", "\\greenE", "\\goldA", "\\goldB", "\\goldC", "\\goldD", "\\goldE", "\\redA", "\\redB", "\\redC", "\\redD", "\\redE", "\\maroonA", "\\maroonB", "\\maroonC", "\\maroonD", "\\maroonE", "\\purpleA", "\\purpleB", "\\purpleC", "\\purpleD", "\\purpleE", "\\mintA", "\\mintB", "\\mintC", "\\grayA", "\\grayB", "\\grayC", "\\grayD", "\\grayE", "\\grayF", "\\grayG", "\\grayH", "\\grayI", "\\kaBlue", "\\kaGreen"], {
            numArgs: 1,
            allowedInText: true,
            greediness: 3
        }, function(context, args) {
            var body = args[0];
            return {
                type: "color",
                color: "katex-" + context.funcName.slice(1),
                value: ordargument(body)
            };
        });

        // There are 2 flags for operators; whether they produce limits in
        // displaystyle, and whether they are symbols and should grow in
        // displaystyle. These four groups cover the four possible choices.

        // No limits, not symbols
        defineFunction(["\\arcsin", "\\arccos", "\\arctan", "\\arg", "\\cos", "\\cosh", "\\cot", "\\coth", "\\csc", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\tan", "\\tanh"], {
            numArgs: 0
        }, function(context) {
            return {
                type: "op",
                limits: false,
                symbol: false,
                body: context.funcName
            };
        });

        // Limits, not symbols
        defineFunction(["\\det", "\\gcd", "\\inf", "\\lim", "\\liminf", "\\limsup", "\\max", "\\min", "\\Pr", "\\sup"], {
            numArgs: 0
        }, function(context) {
            return {
                type: "op",
                limits: true,
                symbol: false,
                body: context.funcName
            };
        });

        // No limits, symbols
        defineFunction(["\\int", "\\iint", "\\iiint", "\\oint"], {
            numArgs: 0
        }, function(context) {
            return {
                type: "op",
                limits: false,
                symbol: true,
                body: context.funcName
            };
        });

        // Limits, symbols
        defineFunction(["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint"], {
            numArgs: 0
        }, function(context) {
            return {
                type: "op",
                limits: true,
                symbol: true,
                body: context.funcName
            };
        });

        // \mathop class command
        defineFunction("\\mathop", {
            numArgs: 1
        }, function(context, args) {
            var body = args[0];
            return {
                type: "op",
                limits: false,
                symbol: false,
                value: ordargument(body)
            };
        });

        // Fractions
        defineFunction(["\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac"// can’t be entered directly
        ], {
            numArgs: 2,
            greediness: 2
        }, function(context, args) {
            var numer = args[0];
            var denom = args[1];
            var hasBarLine;
            var leftDelim = null;
            var rightDelim = null;
            var size = "auto";

            switch (context.funcName) {
            case "\\dfrac":
            case "\\frac":
            case "\\tfrac":
                hasBarLine = true;
                break;
            case "\\\\atopfrac":
                hasBarLine = false;
                break;
            case "\\dbinom":
            case "\\binom":
            case "\\tbinom":
                hasBarLine = false;
                leftDelim = "(";
                rightDelim = ")";
                break;
            default:
                throw new Error("Unrecognized genfrac command");
            }

            switch (context.funcName) {
            case "\\dfrac":
            case "\\dbinom":
                size = "display";
                break;
            case "\\tfrac":
            case "\\tbinom":
                size = "text";
                break;
            }

            return {
                type: "genfrac",
                numer: numer,
                denom: denom,
                hasBarLine: hasBarLine,
                leftDelim: leftDelim,
                rightDelim: rightDelim,
                size: size
            };
        });

        // Left and right overlap functions
        defineFunction(["\\llap", "\\rlap"], {
            numArgs: 1,
            allowedInText: true
        }, function(context, args) {
            var body = args[0];
            return {
                type: context.funcName.slice(1),
                body: body
            };
        });

        // Delimiter functions
        var checkDelimiter = function(delim, context) {
            if (utils.contains(delimiters, delim.value)) {
                return delim;
            } else {
                throw new ParseError("Invalid delimiter: '" + delim.value + "' after '" + context.funcName + "'",delim);
            }
        };

        defineFunction(["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"], {
            numArgs: 1
        }, function(context, args) {
            var delim = checkDelimiter(args[0], context);

            return {
                type: "delimsizing",
                size: delimiterSizes[context.funcName].size,
                mclass: delimiterSizes[context.funcName].mclass,
                value: delim.value
            };
        });

        defineFunction(["\\left", "\\right"], {
            numArgs: 1
        }, function(context, args) {
            var delim = checkDelimiter(args[0], context);

            // \left and \right are caught somewhere in Parser.js, which is
            // why this data doesn't match what is in buildHTML.
            return {
                type: "leftright",
                value: delim.value
            };
        });

        defineFunction("\\middle", {
            numArgs: 1
        }, function(context, args) {
            var delim = checkDelimiter(args[0], context);
            if (!context.parser.leftrightDepth) {
                throw new ParseError("\\middle without preceding \\left",delim);
            }

            return {
                type: "middle",
                value: delim.value
            };
        });

        // Sizing functions (handled in Parser.js explicitly, hence no handler)
        defineFunction(["\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], 0, null);

        // Style changing functions (handled in Parser.js explicitly, hence no
        // handler)
        defineFunction(["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], 0, null);

        defineFunction([// styles
        "\\mathrm", "\\mathit", "\\mathbf",
        // families
        "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt",
        // aliases
        "\\Bbb", "\\bold", "\\frak"], {
            numArgs: 1,
            greediness: 2
        }, function(context, args) {
            var body = args[0];
            var func = context.funcName;
            if (func in fontAliases) {
                func = fontAliases[func];
            }
            return {
                type: "font",
                font: func.slice(1),
                body: body
            };
        });

        // Accents
        defineFunction(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot"], {
            numArgs: 1
        }, function(context, args) {
            var base = args[0];
            return {
                type: "accent",
                accent: context.funcName,
                base: base
            };
        });

        // Infix generalized fractions
        defineFunction(["\\over", "\\choose", "\\atop"], {
            numArgs: 0,
            infix: true
        }, function(context) {
            var replaceWith;
            switch (context.funcName) {
            case "\\over":
                replaceWith = "\\frac";
                break;
            case "\\choose":
                replaceWith = "\\binom";
                break;
            case "\\atop":
                replaceWith = "\\\\atopfrac";
                break;
            default:
                throw new Error("Unrecognized infix genfrac command");
            }
            return {
                type: "infix",
                replaceWith: replaceWith,
                token: context.token
            };
        });

        // Row breaks for aligned data
        defineFunction(["\\\\", "\\cr"], {
            numArgs: 0,
            numOptionalArgs: 1,
            argTypes: ["size"]
        }, function(context, args) {
            var size = args[0];
            return {
                type: "cr",
                size: size
            };
        });

        // Environment delimiters
        defineFunction(["\\begin", "\\end"], {
            numArgs: 1,
            argTypes: ["text"]
        }, function(context, args) {
            var nameGroup = args[0];
            if (nameGroup.type !== "ordgroup") {
                throw new ParseError("Invalid environment name",nameGroup);
            }
            var name = "";
            for (var i = 0; i < nameGroup.value.length; ++i) {
                name += nameGroup.value[i].value;
            }
            return {
                type: "environment",
                name: name,
                nameGroup: nameGroup
            };
        });
    });

    var environments$1 = createCommonjsModule(function(module) {
        /* eslint no-constant-condition:0 */
        var parseData = parseData$1;
        var ParseError = ParseError_1;
        var Style = Style_1;

        var ParseNode = parseData.ParseNode;

        /**
 * Parse the body of the environment, with rows delimited by \\ and
 * columns delimited by &, and create a nested list in row-major order
 * with one group per cell.
 */
        function parseArray(parser, result) {
            var row = [];
            var body = [row];
            var rowGaps = [];
            while (true) {
                var cell = parser.parseExpression(false, null);
                row.push(new ParseNode("ordgroup",cell,parser.mode));
                var next = parser.nextToken.text;
                if (next === "&") {
                    parser.consume();
                } else if (next === "\\end") {
                    break;
                } else if (next === "\\\\" || next === "\\cr") {
                    var cr = parser.parseFunction();
                    rowGaps.push(cr.value.size);
                    row = [];
                    body.push(row);
                } else {
                    throw new ParseError("Expected & or \\\\ or \\end",parser.nextToken);
                }
            }
            result.body = body;
            result.rowGaps = rowGaps;
            return new ParseNode(result.type,result,parser.mode);
        }

        /*
 * An environment definition is very similar to a function definition:
 * it is declared with a name or a list of names, a set of properties
 * and a handler containing the actual implementation.
 *
 * The properties include:
 *  - numArgs: The number of arguments after the \begin{name} function.
 *  - argTypes: (optional) Just like for a function
 *  - allowedInText: (optional) Whether or not the environment is allowed inside
 *                   text mode (default false) (not enforced yet)
 *  - numOptionalArgs: (optional) Just like for a function
 * A bare number instead of that object indicates the numArgs value.
 *
 * The handler function will receive two arguments
 *  - context: information and references provided by the parser
 *  - args: an array of arguments passed to \begin{name}
 * The context contains the following properties:
 *  - envName: the name of the environment, one of the listed names.
 *  - parser: the parser object
 *  - lexer: the lexer object
 *  - positions: the positions associated with these arguments from args.
 * The handler must return a ParseResult.
 */

        function defineEnvironment(names, props, handler) {
            if (typeof names === "string") {
                names = [names];
            }
            if (typeof props === "number") {
                props = {
                    numArgs: props
                };
            }
            // Set default values of environments
            var data = {
                numArgs: props.numArgs || 0,
                argTypes: props.argTypes,
                greediness: 1,
                allowedInText: !!props.allowedInText,
                numOptionalArgs: props.numOptionalArgs || 0,
                handler: handler
            };
            for (var i = 0; i < names.length; ++i) {
                module.exports[names[i]] = data;
            }
        }

        // Arrays are part of LaTeX, defined in lttab.dtx so its documentation
        // is part of the source2e.pdf file of LaTeX2e source documentation.
        defineEnvironment("array", {
            numArgs: 1
        }, function(context, args) {
            var colalign = args[0];
            colalign = colalign.value.map ? colalign.value : [colalign];
            var cols = colalign.map(function(node) {
                var ca = node.value;
                if ("lcr".indexOf(ca) !== -1) {
                    return {
                        type: "align",
                        align: ca
                    };
                } else if (ca === "|") {
                    return {
                        type: "separator",
                        separator: "|"
                    };
                }
                throw new ParseError("Unknown column alignment: " + node.value,node);
            });
            var res = {
                type: "array",
                cols: cols,
                hskipBeforeAndAfter: true // \@preamble in lttab.dtx
            };
            res = parseArray(context.parser, res);
            return res;
        });

        // The matrix environments of amsmath builds on the array environment
        // of LaTeX, which is discussed above.
        defineEnvironment(["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"], {}, function(context) {
            var delimiters = {
                "matrix": null,
                "pmatrix": ["(", ")"],
                "bmatrix": ["[", "]"],
                "Bmatrix": ["\\{", "\\}"],
                "vmatrix": ["|", "|"],
                "Vmatrix": ["\\Vert", "\\Vert"]
            }[context.envName];
            var res = {
                type: "array",
                hskipBeforeAndAfter: false // \hskip -\arraycolsep in amsmath
            };
            res = parseArray(context.parser, res);
            if (delimiters) {
                res = new ParseNode("leftright",{
                    body: [res],
                    left: delimiters[0],
                    right: delimiters[1]
                },context.mode);
            }
            return res;
        });

        // A cases environment (in amsmath.sty) is almost equivalent to
        // \def\arraystretch{1.2}%
        // \left\{\begin{array}{@{}l@{\quad}l@{}} … \end{array}\right.
        defineEnvironment("cases", {}, function(context) {
            var res = {
                type: "array",
                arraystretch: 1.2,
                cols: [{
                    type: "align",
                    align: "l",
                    pregap: 0,
                    // TODO(kevinb) get the current style.
                    // For now we use the metrics for TEXT style which is what we were
                    // doing before.  Before attempting to get the current style we
                    // should look at TeX's behavior especially for \over and matrices.
                    postgap: Style.TEXT.metrics.quad
                }, {
                    type: "align",
                    align: "l",
                    pregap: 0,
                    postgap: 0
                }]
            };
            res = parseArray(context.parser, res);
            res = new ParseNode("leftright",{
                body: [res],
                left: "\\{",
                right: "."
            },context.mode);
            return res;
        });

        // An aligned environment is like the align* environment
        // except it operates within math mode.
        // Note that we assume \nomallineskiplimit to be zero,
        // so that \strut@ is the same as \strut.
        defineEnvironment("aligned", {}, function(context) {
            var res = {
                type: "array",
                cols: []
            };
            res = parseArray(context.parser, res);
            var emptyGroup = new ParseNode("ordgroup",[],context.mode);
            var numCols = 0;
            res.value.body.forEach(function(row) {
                var i;
                for (i = 1; i < row.length; i += 2) {
                    row[i].value.unshift(emptyGroup);
                }
                if (numCols < row.length) {
                    numCols = row.length;
                }
            });
            for (var i = 0; i < numCols; ++i) {
                var align = "r";
                var pregap = 0;
                if (i % 2 === 1) {
                    align = "l";
                } else if (i > 0) {
                    pregap = 2;
                    // one \qquad between columns
                }
                res.value.cols[i] = {
                    type: "align",
                    align: align,
                    pregap: pregap,
                    postgap: 0
                };
            }
            return res;
        });
    });

    /** @flow */

    function getRelocatable(re) {
        // In the future, this could use a WeakMap instead of an expando.
        if (!re.__matchAtRelocatable) {
            // Disjunctions are the lowest-precedence operator, so we can make any
            // pattern match the empty string by appending `|()` to it:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-patterns
            var source = re.source + "|()";

            // We always make the new regex global.
            var flags = "g" + (re.ignoreCase ? "i" : "") + (re.multiline ? "m" : "") + (re.unicode ? "u" : "");

            re.__matchAtRelocatable = new RegExp(source,flags);
        }
        return re.__matchAtRelocatable;
    }

    function matchAt$1(re, str, pos) {
        if (re.global || re.sticky) {
            throw new Error("matchAt(...): Only non-global regexes are supported");
        }
        var reloc = getRelocatable(re);
        reloc.lastIndex = pos;
        var match = reloc.exec(str);
        // Last capturing group is our sentinel that indicates whether the regex
        // matched at the given location.
        if (match[match.length - 1] == null) {
            // Original regex matched.
            match.length = match.length - 1;
            return match;
        } else {
            return null;
        }
    }

    var matchAt_1 = matchAt$1;

    /**
 * The Lexer class handles tokenizing the input in various ways. Since our
 * parser expects us to be able to backtrack, the lexer allows lexing from any
 * given starting point.
 *
 * Its main exposed function is the `lex` function, which takes a position to
 * lex from and a type of token to lex. It defers to the appropriate `_innerLex`
 * function.
 *
 * The various `_innerLex` functions perform the actual lexing of different
 * kinds.
 */

    var matchAt = matchAt_1;

    var ParseError$6 = ParseError_1;

    // The main lexer class
    function Lexer$1(input) {
        this.input = input;
        this.pos = 0;
    }

    /**
 * The resulting token returned from `lex`.
 *
 * It consists of the token text plus some position information.
 * The position information is essentially a range in an input string,
 * but instead of referencing the bare input string, we refer to the lexer.
 * That way it is possible to attach extra metadata to the input string,
 * like for example a file name or similar.
 *
 * The position information (all three parameters) is optional,
 * so it is OK to construct synthetic tokens if appropriate.
 * Not providing available position information may lead to
 * degraded error reporting, though.
 *
 * @param {string}  text   the text of this token
 * @param {number=} start  the start offset, zero-based inclusive
 * @param {number=} end    the end offset, zero-based exclusive
 * @param {Lexer=}  lexer  the lexer which in turn holds the input string
 */
    function Token(text, start, end, lexer) {
        this.text = text;
        this.start = start;
        this.end = end;
        this.lexer = lexer;
    }

    /**
 * Given a pair of tokens (this and endToken), compute a “Token” encompassing
 * the whole input range enclosed by these two.
 *
 * @param {Token}  endToken  last token of the range, inclusive
 * @param {string} text      the text of the newly constructed token
 */
    Token.prototype.range = function(endToken, text) {
        if (endToken.lexer !== this.lexer) {
            return new Token(text);
            // sorry, no position information available
        }
        return new Token(text,this.start,endToken.end,this.lexer);
    }
    ;

    /* The following tokenRegex
 * - matches typical whitespace (but not NBSP etc.) using its first group
 * - does not match any control character \x00-\x1f except whitespace
 * - does not match a bare backslash
 * - matches any ASCII character except those just mentioned
 * - does not match the BMP private use area \uE000-\uF8FF
 * - does not match bare surrogate code units
 * - matches any BMP character except for those just described
 * - matches any valid Unicode surrogate pair
 * - matches a backslash followed by one or more letters
 * - matches a backslash followed by any BMP character, including newline
 * Just because the Lexer matches something doesn't mean it's valid input:
 * If there is no matching function or symbol definition, the Parser will
 * still reject the input.
 */
    var tokenRegex = new RegExp("([ \r\n\t]+)|" + // whitespace
    "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + // single codepoint
    "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
    "|\\\\(?:[a-zA-Z]+|[^\uD800-\uDFFF])" + // function name
    ")");

    /**
 * This function lexes a single token.
 */
    Lexer$1.prototype.lex = function() {
        var input = this.input;
        var pos = this.pos;
        if (pos === input.length) {
            return new Token("EOF",pos,pos,this);
        }
        var match = matchAt(tokenRegex, input, pos);
        if (match === null) {
            throw new ParseError$6("Unexpected character: '" + input[pos] + "'",new Token(input[pos],pos,pos + 1,this));
        }
        var text = match[2] || " ";
        var start = this.pos;
        this.pos += match[0].length;
        var end = this.pos;
        return new Token(text,start,end,this);
    }
    ;

    var Lexer_1 = Lexer$1;

    /**
 * This file contains the “gullet” where macros are expanded
 * until only non-macro tokens remain.
 */

    var Lexer = Lexer_1;

    function MacroExpander$1(input, macros) {
        this.lexer = new Lexer(input);
        this.macros = macros;
        this.stack = [];
        // contains tokens in REVERSE order
        this.discardedWhiteSpace = [];
    }

    /**
 * Recursively expand first token, then return first non-expandable token.
 */
    MacroExpander$1.prototype.nextToken = function() {
        var this$1 = this;

        for (; ; ) {
            if (this$1.stack.length === 0) {
                this$1.stack.push(this$1.lexer.lex());
            }
            var topToken = this$1.stack.pop();
            var name = topToken.text;
            if (!(name.charAt(0) === "\\" && this$1.macros.hasOwnProperty(name))) {
                return topToken;
            }
            var expansion = this$1.macros[name];
            if (typeof expansion === "string") {
                var bodyLexer = new Lexer(expansion);
                expansion = [];
                var tok = bodyLexer.lex();
                while (tok.text !== "EOF") {
                    expansion.push(tok);
                    tok = bodyLexer.lex();
                }
                expansion.reverse();
                // to fit in with stack using push and pop
                this$1.macros[name] = expansion;
            }
            this$1.stack = this$1.stack.concat(expansion);
        }
    }
    ;

    MacroExpander$1.prototype.get = function(ignoreSpace) {
        var this$1 = this;

        this.discardedWhiteSpace = [];
        var token = this.nextToken();
        if (ignoreSpace) {
            while (token.text === " ") {
                this$1.discardedWhiteSpace.push(token);
                token = this$1.nextToken();
            }
        }
        return token;
    }
    ;

    /**
 * Undo the effect of the preceding call to the get method.
 * A call to this method MUST be immediately preceded and immediately followed
 * by a call to get.  Only used during mode switching, i.e. after one token
 * was got in the old mode but should get got again in a new mode
 * with possibly different whitespace handling.
 */
    MacroExpander$1.prototype.unget = function(token) {
        var this$1 = this;

        this.stack.push(token);
        while (this.discardedWhiteSpace.length !== 0) {
            this$1.stack.push(this$1.discardedWhiteSpace.pop());
        }
    }
    ;

    var MacroExpander_1 = MacroExpander$1;

    /* eslint no-constant-condition:0 */
    var functions = functions$1;
    var environments = environments$1;
    var MacroExpander = MacroExpander_1;
    var symbols$5 = symbols$1;
    var utils$9 = utils$4;
    var cjkRegex$2 = unicodeRegexes.cjkRegex;

    var parseData = parseData$1;
    var ParseError$5 = ParseError_1;

    /**
 * This file contains the parser used to parse out a TeX expression from the
 * input. Since TeX isn't context-free, standard parsers don't work particularly
 * well.
 *
 * The strategy of this parser is as such:
 *
 * The main functions (the `.parse...` ones) take a position in the current
 * parse string to parse tokens from. The lexer (found in Lexer.js, stored at
 * this.lexer) also supports pulling out tokens at arbitrary places. When
 * individual tokens are needed at a position, the lexer is called to pull out a
 * token, which is then used.
 *
 * The parser has a property called "mode" indicating the mode that
 * the parser is currently in. Currently it has to be one of "math" or
 * "text", which denotes whether the current environment is a math-y
 * one or a text-y one (e.g. inside \text). Currently, this serves to
 * limit the functions which can be used in text mode.
 *
 * The main functions then return an object which contains the useful data that
 * was parsed at its given point, and a new position at the end of the parsed
 * data. The main functions can call each other and continue the parsing by
 * using the returned position as a new starting point.
 *
 * There are also extra `.handle...` functions, which pull out some reused
 * functionality into self-contained functions.
 *
 * The earlier functions return ParseNodes.
 * The later functions (which are called deeper in the parse) sometimes return
 * ParseFuncOrArgument, which contain a ParseNode as well as some data about
 * whether the parsed object is a function which is missing some arguments, or a
 * standalone object which can be used as an argument to another function.
 */

    /**
 * Main Parser class
 */
    function Parser$1(input, settings) {
        // Create a new macro expander (gullet) and (indirectly via that) also a
        // new lexer (mouth) for this parser (stomach, in the language of TeX)
        this.gullet = new MacroExpander(input,settings.macros);
        // Store the settings for use in parsing
        this.settings = settings;
        // Count leftright depth (for \middle errors)
        this.leftrightDepth = 0;
    }

    var ParseNode = parseData.ParseNode;

    /**
 * An initial function (without its arguments), or an argument to a function.
 * The `result` argument should be a ParseNode.
 */
    function ParseFuncOrArgument(result, isFunction, token) {
        this.result = result;
        // Is this a function (i.e. is it something defined in functions.js)?
        this.isFunction = isFunction;
        this.token = token;
    }

    /**
 * Checks a result to make sure it has the right type, and throws an
 * appropriate error otherwise.
 *
 * @param {boolean=} consume whether to consume the expected token,
 *                           defaults to true
 */
    Parser$1.prototype.expect = function(text, consume) {
        if (this.nextToken.text !== text) {
            throw new ParseError$5("Expected '" + text + "', got '" + this.nextToken.text + "'",this.nextToken);
        }
        if (consume !== false) {
            this.consume();
        }
    }
    ;

    /**
 * Considers the current look ahead token as consumed,
 * and fetches the one after that as the new look ahead.
 */
    Parser$1.prototype.consume = function() {
        this.nextToken = this.gullet.get(this.mode === "math");
    }
    ;

    Parser$1.prototype.switchMode = function(newMode) {
        this.gullet.unget(this.nextToken);
        this.mode = newMode;
        this.consume();
    }
    ;

    /**
 * Main parsing function, which parses an entire input.
 *
 * @return {?Array.<ParseNode>}
 */
    Parser$1.prototype.parse = function() {
        // Try to parse the input
        this.mode = "math";
        this.consume();
        var parse = this.parseInput();
        return parse;
    }
    ;

    /**
 * Parses an entire input tree.
 */
    Parser$1.prototype.parseInput = function() {
        // Parse an expression
        var expression = this.parseExpression(false);
        // If we succeeded, make sure there's an EOF at the end
        this.expect("EOF", false);
        return expression;
    }
    ;

    var endOfExpression = ["}", "\\end", "\\right", "&", "\\\\", "\\cr"];

    /**
 * Parses an "expression", which is a list of atoms.
 *
 * @param {boolean} breakOnInfix  Should the parsing stop when we hit infix
 *                  nodes? This happens when functions have higher precendence
 *                  than infix nodes in implicit parses.
 *
 * @param {?string} breakOnTokenText  The text of the token that the expression
 *                  should end with, or `null` if something else should end the
 *                  expression.
 *
 * @return {ParseNode}
 */
    Parser$1.prototype.parseExpression = function(breakOnInfix, breakOnTokenText) {
        var this$1 = this;

        var body = [];
        // Keep adding atoms to the body until we can't parse any more atoms (either
        // we reached the end, a }, or a \right)
        while (true) {
            var lex = this$1.nextToken;
            if (endOfExpression.indexOf(lex.text) !== -1) {
                break;
            }
            if (breakOnTokenText && lex.text === breakOnTokenText) {
                break;
            }
            if (breakOnInfix && functions[lex.text] && functions[lex.text].infix) {
                break;
            }
            var atom = this$1.parseAtom();
            if (!atom) {
                if (!this$1.settings.throwOnError && lex.text[0] === "\\") {
                    var errorNode = this$1.handleUnsupportedCmd();
                    body.push(errorNode);
                    continue;
                }

                break;
            }
            body.push(atom);
        }
        return this.handleInfixNodes(body);
    }
    ;

    /**
 * Rewrites infix operators such as \over with corresponding commands such
 * as \frac.
 *
 * There can only be one infix operator per group.  If there's more than one
 * then the expression is ambiguous.  This can be resolved by adding {}.
 *
 * @returns {Array}
 */
    Parser$1.prototype.handleInfixNodes = function(body) {
        var overIndex = -1;
        var funcName;

        for (var i = 0; i < body.length; i++) {
            var node = body[i];
            if (node.type === "infix") {
                if (overIndex !== -1) {
                    throw new ParseError$5("only one infix operator per group",node.value.token);
                }
                overIndex = i;
                funcName = node.value.replaceWith;
            }
        }

        if (overIndex !== -1) {
            var numerNode;
            var denomNode;

            var numerBody = body.slice(0, overIndex);
            var denomBody = body.slice(overIndex + 1);

            if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
                numerNode = numerBody[0];
            } else {
                numerNode = new ParseNode("ordgroup",numerBody,this.mode);
            }

            if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
                denomNode = denomBody[0];
            } else {
                denomNode = new ParseNode("ordgroup",denomBody,this.mode);
            }

            var value = this.callFunction(funcName, [numerNode, denomNode], null);
            return [new ParseNode(value.type,value,this.mode)];
        } else {
            return body;
        }
    }
    ;

    // The greediness of a superscript or subscript
    var SUPSUB_GREEDINESS = 1;

    /**
 * Handle a subscript or superscript with nice errors.
 */
    Parser$1.prototype.handleSupSubscript = function(name) {
        var symbolToken = this.nextToken;
        var symbol = symbolToken.text;
        this.consume();
        var group = this.parseGroup();

        if (!group) {
            if (!this.settings.throwOnError && this.nextToken.text[0] === "\\") {
                return this.handleUnsupportedCmd();
            } else {
                throw new ParseError$5("Expected group after '" + symbol + "'",symbolToken);
            }
        } else if (group.isFunction) {
            // ^ and _ have a greediness, so handle interactions with functions'
            // greediness
            var funcGreediness = functions[group.result].greediness;
            if (funcGreediness > SUPSUB_GREEDINESS) {
                return this.parseFunction(group);
            } else {
                throw new ParseError$5("Got function '" + group.result + "' with no arguments " + "as " + name,symbolToken);
            }
        } else {
            return group.result;
        }
    }
    ;

    /**
 * Converts the textual input of an unsupported command into a text node
 * contained within a color node whose color is determined by errorColor
 */
    Parser$1.prototype.handleUnsupportedCmd = function() {
        var text = this.nextToken.text;
        var textordArray = [];

        for (var i = 0; i < text.length; i++) {
            textordArray.push(new ParseNode("textord",text[i],"text"));
        }

        var textNode = new ParseNode("text",{
            body: textordArray,
            type: "text"
        },this.mode);

        var colorNode = new ParseNode("color",{
            color: this.settings.errorColor,
            value: [textNode],
            type: "color"
        },this.mode);

        this.consume();
        return colorNode;
    }
    ;

    /**
 * Parses a group with optional super/subscripts.
 *
 * @return {?ParseNode}
 */
    Parser$1.prototype.parseAtom = function() {
        var this$1 = this;

        // The body of an atom is an implicit group, so that things like
        // \left(x\right)^2 work correctly.
        var base = this.parseImplicitGroup();

        // In text mode, we don't have superscripts or subscripts
        if (this.mode === "text") {
            return base;
        }

        // Note that base may be empty (i.e. null) at this point.

        var superscript;
        var subscript;
        while (true) {
            // Lex the first token
            var lex = this$1.nextToken;

            if (lex.text === "\\limits" || lex.text === "\\nolimits") {
                // We got a limit control
                if (!base || base.type !== "op") {
                    throw new ParseError$5("Limit controls must follow a math operator",lex);
                } else {
                    var limits = lex.text === "\\limits";
                    base.value.limits = limits;
                    base.value.alwaysHandleSupSub = true;
                }
                this$1.consume();
            } else if (lex.text === "^") {
                // We got a superscript start
                if (superscript) {
                    throw new ParseError$5("Double superscript",lex);
                }
                superscript = this$1.handleSupSubscript("superscript");
            } else if (lex.text === "_") {
                // We got a subscript start
                if (subscript) {
                    throw new ParseError$5("Double subscript",lex);
                }
                subscript = this$1.handleSupSubscript("subscript");
            } else if (lex.text === "'") {
                // We got a prime
                var prime = new ParseNode("textord","\\prime",this$1.mode);

                // Many primes can be grouped together, so we handle this here
                var primes = [prime];
                this$1.consume();
                // Keep lexing tokens until we get something that's not a prime
                while (this.nextToken.text === "'") {
                    // For each one, add another prime to the list
                    primes.push(prime);
                    this$1.consume();
                }
                // Put them into an ordgroup as the superscript
                superscript = new ParseNode("ordgroup",primes,this$1.mode);
            } else {
                // If it wasn't ^, _, or ', stop parsing super/subscripts
                break;
            }
        }

        if (superscript || subscript) {
            // If we got either a superscript or subscript, create a supsub
            return new ParseNode("supsub",{
                base: base,
                sup: superscript,
                sub: subscript
            },this.mode);
        } else {
            // Otherwise return the original body
            return base;
        }
    }
    ;

    // A list of the size-changing functions, for use in parseImplicitGroup
    var sizeFuncs = ["\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];

    // A list of the style-changing functions, for use in parseImplicitGroup
    var styleFuncs = ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"];

    /**
 * Parses an implicit group, which is a group that starts at the end of a
 * specified, and ends right before a higher explicit group ends, or at EOL. It
 * is used for functions that appear to affect the current style, like \Large or
 * \textrm, where instead of keeping a style we just pretend that there is an
 * implicit grouping after it until the end of the group. E.g.
 *   small text {\Large large text} small text again
 * It is also used for \left and \right to get the correct grouping.
 *
 * @return {?ParseNode}
 */
    Parser$1.prototype.parseImplicitGroup = function() {
        var start = this.parseSymbol();

        if (start == null) {
            // If we didn't get anything we handle, fall back to parseFunction
            return this.parseFunction();
        }

        var func = start.result;
        var body;

        if (func === "\\left") {
            // If we see a left:
            // Parse the entire left function (including the delimiter)
            var left = this.parseFunction(start);
            // Parse out the implicit body
            ++this.leftrightDepth;
            body = this.parseExpression(false);
            --this.leftrightDepth;
            // Check the next token
            this.expect("\\right", false);
            var right = this.parseFunction();
            return new ParseNode("leftright",{
                body: body,
                left: left.value.value,
                right: right.value.value
            },this.mode);
        } else if (func === "\\begin") {
            // begin...end is similar to left...right
            var begin = this.parseFunction(start);
            var envName = begin.value.name;
            if (!environments.hasOwnProperty(envName)) {
                throw new ParseError$5("No such environment: " + envName,begin.value.nameGroup);
            }
            // Build the environment object. Arguments and other information will
            // be made available to the begin and end methods using properties.
            var env = environments[envName];
            var args = this.parseArguments("\\begin{" + envName + "}", env);
            var context = {
                mode: this.mode,
                envName: envName,
                parser: this,
                positions: args.pop()
            };
            var result = env.handler(context, args);
            this.expect("\\end", false);
            var endNameToken = this.nextToken;
            var end = this.parseFunction();
            if (end.value.name !== envName) {
                throw new ParseError$5("Mismatch: \\begin{" + envName + "} matched " + "by \\end{" + end.value.name + "}",endNameToken);
            }
            result.position = end.position;
            return result;
        } else if (utils$9.contains(sizeFuncs, func)) {
            // If we see a sizing function, parse out the implict body
            body = this.parseExpression(false);
            return new ParseNode("sizing",{
                // Figure out what size to use based on the list of functions above
                size: "size" + (utils$9.indexOf(sizeFuncs, func) + 1),
                value: body
            },this.mode);
        } else if (utils$9.contains(styleFuncs, func)) {
            // If we see a styling function, parse out the implict body
            body = this.parseExpression(true);
            return new ParseNode("styling",{
                // Figure out what style to use by pulling out the style from
                // the function name
                style: func.slice(1, func.length - 5),
                value: body
            },this.mode);
        } else {
            // Defer to parseFunction if it's not a function we handle
            return this.parseFunction(start);
        }
    }
    ;

    /**
 * Parses an entire function, including its base and all of its arguments.
 * The base might either have been parsed already, in which case
 * it is provided as an argument, or it's the next group in the input.
 *
 * @param {ParseFuncOrArgument=} baseGroup optional as described above
 * @return {?ParseNode}
 */
    Parser$1.prototype.parseFunction = function(baseGroup) {
        if (!baseGroup) {
            baseGroup = this.parseGroup();
        }

        if (baseGroup) {
            if (baseGroup.isFunction) {
                var func = baseGroup.result;
                var funcData = functions[func];
                if (this.mode === "text" && !funcData.allowedInText) {
                    throw new ParseError$5("Can't use function '" + func + "' in text mode",baseGroup.token);
                }

                var args = this.parseArguments(func, funcData);
                var token = baseGroup.token;
                var result = this.callFunction(func, args, args.pop(), token);
                return new ParseNode(result.type,result,this.mode);
            } else {
                return baseGroup.result;
            }
        } else {
            return null;
        }
    }
    ;

    /**
 * Call a function handler with a suitable context and arguments.
 */
    Parser$1.prototype.callFunction = function(name, args, positions, token) {
        var context = {
            funcName: name,
            parser: this,
            positions: positions,
            token: token
        };
        return functions[name].handler(context, args);
    }
    ;

    /**
 * Parses the arguments of a function or environment
 *
 * @param {string} func  "\name" or "\begin{name}"
 * @param {{numArgs:number,numOptionalArgs:number|undefined}} funcData
 * @return the array of arguments, with the list of positions as last element
 */
    Parser$1.prototype.parseArguments = function(func, funcData) {
        var this$1 = this;

        var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
        if (totalArgs === 0) {
            return [[this.pos]];
        }

        var baseGreediness = funcData.greediness;
        var positions = [this.pos];
        var args = [];

        for (var i = 0; i < totalArgs; i++) {
            var nextToken = this$1.nextToken;
            var argType = funcData.argTypes && funcData.argTypes[i];
            var arg;
            if (i < funcData.numOptionalArgs) {
                if (argType) {
                    arg = this$1.parseGroupOfType(argType, true);
                } else {
                    arg = this$1.parseGroup(true);
                }
                if (!arg) {
                    args.push(null);
                    positions.push(this$1.pos);
                    continue;
                }
            } else {
                if (argType) {
                    arg = this$1.parseGroupOfType(argType);
                } else {
                    arg = this$1.parseGroup();
                }
                if (!arg) {
                    if (!this$1.settings.throwOnError && this$1.nextToken.text[0] === "\\") {
                        arg = new ParseFuncOrArgument(this$1.handleUnsupportedCmd(this$1.nextToken.text),false);
                    } else {
                        throw new ParseError$5("Expected group after '" + func + "'",nextToken);
                    }
                }
            }
            var argNode;
            if (arg.isFunction) {
                var argGreediness = functions[arg.result].greediness;
                if (argGreediness > baseGreediness) {
                    argNode = this$1.parseFunction(arg);
                } else {
                    throw new ParseError$5("Got function '" + arg.result + "' as " + "argument to '" + func + "'",nextToken);
                }
            } else {
                argNode = arg.result;
            }
            args.push(argNode);
            positions.push(this$1.pos);
        }

        args.push(positions);

        return args;
    }
    ;

    /**
 * Parses a group when the mode is changing.
 *
 * @return {?ParseFuncOrArgument}
 */
    Parser$1.prototype.parseGroupOfType = function(innerMode, optional) {
        var this$1 = this;

        var outerMode = this.mode;
        // Handle `original` argTypes
        if (innerMode === "original") {
            innerMode = outerMode;
        }

        if (innerMode === "color") {
            return this.parseColorGroup(optional);
        }
        if (innerMode === "size") {
            return this.parseSizeGroup(optional);
        }

        this.switchMode(innerMode);
        if (innerMode === "text") {
            // text mode is special because it should ignore the whitespace before
            // it
            while (this.nextToken.text === " ") {
                this$1.consume();
            }
        }
        // By the time we get here, innerMode is one of "text" or "math".
        // We switch the mode of the parser, recurse, then restore the old mode.
        var res = this.parseGroup(optional);
        this.switchMode(outerMode);
        return res;
    }
    ;

    /**
 * Parses a group, essentially returning the string formed by the
 * brace-enclosed tokens plus some position information.
 *
 * @param {string} modeName  Used to describe the mode in error messages
 * @param {boolean=} optional  Whether the group is optional or required
 */
    Parser$1.prototype.parseStringGroup = function(modeName, optional) {
        var this$1 = this;

        if (optional && this.nextToken.text !== "[") {
            return null;
        }
        var outerMode = this.mode;
        this.mode = "text";
        this.expect(optional ? "[" : "{");
        var str = "";
        var firstToken = this.nextToken;
        var lastToken = firstToken;
        while (this.nextToken.text !== (optional ? "]" : "}")) {
            if (this$1.nextToken.text === "EOF") {
                throw new ParseError$5("Unexpected end of input in " + modeName,firstToken.range(this$1.nextToken, str));
            }
            lastToken = this$1.nextToken;
            str += lastToken.text;
            this$1.consume();
        }
        this.mode = outerMode;
        this.expect(optional ? "]" : "}");
        return firstToken.range(lastToken, str);
    }
    ;

    /**
 * Parses a regex-delimited group: the largest sequence of tokens
 * whose concatenated strings match `regex`. Returns the string
 * formed by the tokens plus some position information.
 *
 * @param {RegExp} regex
 * @param {string} modeName  Used to describe the mode in error messages
 */
    Parser$1.prototype.parseRegexGroup = function(regex, modeName) {
        var this$1 = this;

        var outerMode = this.mode;
        this.mode = "text";
        var firstToken = this.nextToken;
        var lastToken = firstToken;
        var str = "";
        while (this.nextToken.text !== "EOF" && regex.test(str + this.nextToken.text)) {
            lastToken = this$1.nextToken;
            str += lastToken.text;
            this$1.consume();
        }
        if (str === "") {
            throw new ParseError$5("Invalid " + modeName + ": '" + firstToken.text + "'",firstToken);
        }
        this.mode = outerMode;
        return firstToken.range(lastToken, str);
    }
    ;

    /**
 * Parses a color description.
 */
    Parser$1.prototype.parseColorGroup = function(optional) {
        var res = this.parseStringGroup("color", optional);
        if (!res) {
            return null;
        }
        var match = (/^(#[a-z0-9]+|[a-z]+)$/i).exec(res.text);
        if (!match) {
            throw new ParseError$5("Invalid color: '" + res.text + "'",res);
        }
        return new ParseFuncOrArgument(new ParseNode("color",match[0],this.mode),false);
    }
    ;

    /**
 * Parses a size specification, consisting of magnitude and unit.
 */
    Parser$1.prototype.parseSizeGroup = function(optional) {
        var res;
        if (!optional && this.nextToken.text !== "{") {
            res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2}$/, "size");
        } else {
            res = this.parseStringGroup("size", optional);
        }
        if (!res) {
            return null;
        }
        var match = (/([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/).exec(res.text);
        if (!match) {
            throw new ParseError$5("Invalid size: '" + res.text + "'",res);
        }
        var data = {
            number: +(match[1] + match[2]),
            // sign + magnitude, cast to number
            unit: match[3]
        };
        if (data.unit !== "em" && data.unit !== "ex" && data.unit !== "mu") {
            throw new ParseError$5("Invalid unit: '" + data.unit + "'",res);
        }
        return new ParseFuncOrArgument(new ParseNode("color",data,this.mode),false);
    }
    ;

    /**
 * If the argument is false or absent, this parses an ordinary group,
 * which is either a single nucleus (like "x") or an expression
 * in braces (like "{x+y}").
 * If the argument is true, it parses either a bracket-delimited expression
 * (like "[x+y]") or returns null to indicate the absence of a
 * bracket-enclosed group.
 *
 * @param {boolean=} optional  Whether the group is optional or required
 * @return {?ParseFuncOrArgument}
 */
    Parser$1.prototype.parseGroup = function(optional) {
        var firstToken = this.nextToken;
        // Try to parse an open brace
        if (this.nextToken.text === (optional ? "[" : "{")) {
            // If we get a brace, parse an expression
            this.consume();
            var expression = this.parseExpression(false, optional ? "]" : null);
            var lastToken = this.nextToken;
            // Make sure we get a close brace
            this.expect(optional ? "]" : "}");
            if (this.mode === "text") {
                this.formLigatures(expression);
            }
            return new ParseFuncOrArgument(new ParseNode("ordgroup",expression,this.mode,firstToken,lastToken),false);
        } else {
            // Otherwise, just return a nucleus, or nothing for an optional group
            return optional ? null : this.parseSymbol();
        }
    }
    ;

    /**
 * Form ligature-like combinations of characters for text mode.
 * This includes inputs like "--", "---", "``" and "''".
 * The result will simply replace multiple textord nodes with a single
 * character in each value by a single textord node having multiple
 * characters in its value.  The representation is still ASCII source.
 *
 * @param {Array.<ParseNode>} group  the nodes of this group,
 *                                   list will be moified in place
 */
    Parser$1.prototype.formLigatures = function(group) {
        var i;
        var n = group.length - 1;
        for (i = 0; i < n; ++i) {
            var a = group[i];
            var v = a.value;
            if (v === "-" && group[i + 1].value === "-") {
                if (i + 1 < n && group[i + 2].value === "-") {
                    group.splice(i, 3, new ParseNode("textord","---","text",a,group[i + 2]));
                    n -= 2;
                } else {
                    group.splice(i, 2, new ParseNode("textord","--","text",a,group[i + 1]));
                    n -= 1;
                }
            }
            if ((v === "'" || v === "`") && group[i + 1].value === v) {
                group.splice(i, 2, new ParseNode("textord",v + v,"text",a,group[i + 1]));
                n -= 1;
            }
        }
    }
    ;

    /**
 * Parse a single symbol out of the string. Here, we handle both the functions
 * we have defined, as well as the single character symbols
 *
 * @return {?ParseFuncOrArgument}
 */
    Parser$1.prototype.parseSymbol = function() {
        var nucleus = this.nextToken;

        if (functions[nucleus.text]) {
            this.consume();
            // If there exists a function with this name, we return the function and
            // say that it is a function.
            return new ParseFuncOrArgument(nucleus.text,true,nucleus);
        } else if (symbols$5[this.mode][nucleus.text]) {
            this.consume();
            // Otherwise if this is a no-argument function, find the type it
            // corresponds to in the symbols map
            return new ParseFuncOrArgument(new ParseNode(symbols$5[this.mode][nucleus.text].group,nucleus.text,this.mode,nucleus),false,nucleus);
        } else if (this.mode === "text" && cjkRegex$2.test(nucleus.text)) {
            this.consume();
            return new ParseFuncOrArgument(new ParseNode("textord",nucleus.text,this.mode,nucleus),false,nucleus);
        } else {
            return null;
        }
    }
    ;

    Parser$1.prototype.ParseNode = ParseNode;

    var Parser_1 = Parser$1;

    /**
 * Provides a single function for parsing an expression using a Parser
 * TODO(emily): Remove this
 */

    var Parser = Parser_1;

    /**
 * Parses an expression using a Parser, then returns the parsed result.
 */
    var parseTree$1 = function(toParse, settings) {
        if (!(typeof toParse === 'string' || toParse instanceof String)) {
            throw new TypeError('KaTeX can only parse string typed expression');
        }
        var parser = new Parser(toParse,settings);

        return parser.parse();
    };

    var parseTree_1 = parseTree$1;

    /* eslint no-console:0 */
    /**
 * This is the main entry point for KaTeX. Here, we expose functions for
 * rendering expressions either to DOM nodes or to markup strings.
 *
 * We also expose the ParseError class to check if errors thrown from KaTeX are
 * errors in the expression, or errors in javascript handling.
 */

    var ParseError = ParseError_1;
    var Settings = Settings_1;

    var buildTree = buildTree_1;
    var parseTree = parseTree_1;
    var utils = utils$4;

    /**
 * Parse and build an expression, and place that expression in the DOM node
 * given.
 */
    var render$2 = function(expression, baseNode, options) {
        utils.clearNode(baseNode);

        var settings = new Settings(options);

        var tree = parseTree(expression, settings);
        var node = buildTree(tree, expression, settings).toNode();

        baseNode.appendChild(node);
    };

    // KaTeX's styles don't work properly in quirks mode. Print out an error, and
    // disable rendering.
    if (typeof document !== "undefined") {
        if (document.compatMode !== "CSS1Compat") {
            typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your " + "website has a suitable doctype.");

            render$2 = function() {
                throw new ParseError("KaTeX doesn't work in quirks mode.");
            }
            ;
        }
    }

    /**
 * Parse and build an expression, and return the markup for that.
 */
    var renderToString = function(expression, options) {
        var settings = new Settings(options);

        var tree = parseTree(expression, settings);
        return buildTree(tree, expression, settings).toMarkup();
    };

    /**
 * Parse an expression and return the parse tree.
 */
    var generateParseTree = function(expression, options) {
        var settings = new Settings(options);
        return parseTree(expression, settings);
    };

    var katex = {
        render: render$2,
        renderToString: renderToString,
        /**
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
        __parse: generateParseTree,
        ParseError: ParseError
    };

    var html$3 = "\n<style>\ndt-math[block] {\n  display: block;\n}\n</style>\n";

    var DTMath = function(dom, data) {
        var equationElements = [].slice.call(dom.querySelectorAll("dt-math"));
        equationElements.forEach(function(el) {
            var content = el.textContent;
            var displayMode = el.hasAttribute("block") ? true : false;
            el.innerHTML = html$3 + katex.renderToString(content, {
                displayMode: displayMode
            });
        });
    };

    var marked = createCommonjsModule(function(module, exports) {
        /**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

        (function() {

            /**
 * Block-Level Grammar
 */

            var block = {
                newline: /^\n+/,
                code: /^( {4}[^\n]+\n*)+/,
                fences: noop,
                hr: /^( *[-*_]){3,} *(?:\n+|$)/,
                heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
                nptable: noop,
                lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
                blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
                list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
                html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
                def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
                table: noop,
                paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
                text: /^[^\n]+/
            };

            block.bullet = /(?:[*+-]|\d+\.)/;
            block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
            block.item = replace(block.item, 'gm')(/bull/g, block.bullet)();

            block.list = replace(block.list)(/bull/g, block.bullet)('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')('def', '\\n+(?=' + block.def.source + ')')();

            block.blockquote = replace(block.blockquote)('def', block.def)();

            block._tag = '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code' + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo' + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

            block.html = replace(block.html)('comment', /<!--[\s\S]*?-->/)('closed', /<(tag)[\s\S]+?<\/\1>/)('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, block._tag)();

            block.paragraph = replace(block.paragraph)('hr', block.hr)('heading', block.heading)('lheading', block.lheading)('blockquote', block.blockquote)('tag', '<' + block._tag)('def', block.def)();

            /**
 * Normal Block Grammar
 */

            block.normal = merge({}, block);

            /**
 * GFM Block Grammar
 */

            block.gfm = merge({}, block.normal, {
                fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
                paragraph: /^/,
                heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
            });

            block.gfm.paragraph = replace(block.paragraph)('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|' + block.list.source.replace('\\1', '\\3') + '|')();

            /**
 * GFM + Tables Block Grammar
 */

            block.tables = merge({}, block.gfm, {
                nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
                table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
            });

            /**
 * Block Lexer
 */

            function Lexer(options) {
                this.tokens = [];
                this.tokens.links = {};
                this.options = options || marked.defaults;
                this.rules = block.normal;

                if (this.options.gfm) {
                    if (this.options.tables) {
                        this.rules = block.tables;
                    } else {
                        this.rules = block.gfm;
                    }
                }
            }

            /**
 * Expose Block Rules
 */

            Lexer.rules = block;

            /**
 * Static Lex Method
 */

            Lexer.lex = function(src, options) {
                var lexer = new Lexer(options);
                return lexer.lex(src);
            }
            ;

            /**
 * Preprocessing
 */

            Lexer.prototype.lex = function(src) {
                src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u00a0/g, ' ').replace(/\u2424/g, '\n');

                return this.token(src, true);
            }
            ;

            /**
 * Lexing
 */

            Lexer.prototype.token = function(src, top, bq) {
                var this$1 = this;

                var src = src.replace(/^ +$/gm, ''), next, loose, cap, bull, b, item, space, i, l;

                while (src) {
                    // newline
                    if (cap = this$1.rules.newline.exec(src)) {
                        src = src.substring(cap[0].length);
                        if (cap[0].length > 1) {
                            this$1.tokens.push({
                                type: 'space'
                            });
                        }
                    }

                    // code
                    if (cap = this$1.rules.code.exec(src)) {
                        src = src.substring(cap[0].length);
                        cap = cap[0].replace(/^ {4}/gm, '');
                        this$1.tokens.push({
                            type: 'code',
                            text: !this$1.options.pedantic ? cap.replace(/\n+$/, '') : cap
                        });
                        continue;
                    }

                    // fences (gfm)
                    if (cap = this$1.rules.fences.exec(src)) {
                        src = src.substring(cap[0].length);
                        this$1.tokens.push({
                            type: 'code',
                            lang: cap[2],
                            text: cap[3] || ''
                        });
                        continue;
                    }

                    // heading
                    if (cap = this$1.rules.heading.exec(src)) {
                        src = src.substring(cap[0].length);
                        this$1.tokens.push({
                            type: 'heading',
                            depth: cap[1].length,
                            text: cap[2]
                        });
                        continue;
                    }

                    // table no leading pipe (gfm)
                    if (top && (cap = this$1.rules.nptable.exec(src))) {
                        src = src.substring(cap[0].length);

                        item = {
                            type: 'table',
                            header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
                            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                            cells: cap[3].replace(/\n$/, '').split('\n')
                        };

                        for (i = 0; i < item.align.length; i++) {
                            if (/^ *-+: *$/.test(item.align[i])) {
                                item.align[i] = 'right';
                            } else if (/^ *:-+: *$/.test(item.align[i])) {
                                item.align[i] = 'center';
                            } else if (/^ *:-+ *$/.test(item.align[i])) {
                                item.align[i] = 'left';
                            } else {
                                item.align[i] = null;
                            }
                        }

                        for (i = 0; i < item.cells.length; i++) {
                            item.cells[i] = item.cells[i].split(/ *\| */);
                        }

                        this$1.tokens.push(item);

                        continue;
                    }

                    // lheading
                    if (cap = this$1.rules.lheading.exec(src)) {
                        src = src.substring(cap[0].length);
                        this$1.tokens.push({
                            type: 'heading',
                            depth: cap[2] === '=' ? 1 : 2,
                            text: cap[1]
                        });
                        continue;
                    }

                    // hr
                    if (cap = this$1.rules.hr.exec(src)) {
                        src = src.substring(cap[0].length);
                        this$1.tokens.push({
                            type: 'hr'
                        });
                        continue;
                    }

                    // blockquote
                    if (cap = this$1.rules.blockquote.exec(src)) {
                        src = src.substring(cap[0].length);

                        this$1.tokens.push({
                            type: 'blockquote_start'
                        });

                        cap = cap[0].replace(/^ *> ?/gm, '');

                        // Pass `top` to keep the current
                        // "toplevel" state. This is exactly
                        // how markdown.pl works.
                        this$1.token(cap, top, true);

                        this$1.tokens.push({
                            type: 'blockquote_end'
                        });

                        continue;
                    }

                    // list
                    if (cap = this$1.rules.list.exec(src)) {
                        src = src.substring(cap[0].length);
                        bull = cap[2];

                        this$1.tokens.push({
                            type: 'list_start',
                            ordered: bull.length > 1
                        });

                        // Get each top-level item.
                        cap = cap[0].match(this$1.rules.item);

                        next = false;
                        l = cap.length;
                        i = 0;

                        for (; i < l; i++) {
                            item = cap[i];

                            // Remove the list item's bullet
                            // so it is seen as the next token.
                            space = item.length;
                            item = item.replace(/^ *([*+-]|\d+\.) +/, '');

                            // Outdent whatever the
                            // list item contains. Hacky.
                            if (~item.indexOf('\n ')) {
                                space -= item.length;
                                item = !this$1.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}','gm'), '') : item.replace(/^ {1,4}/gm, '');
                            }

                            // Determine whether the next list item belongs here.
                            // Backpedal if it does not belong in this list.
                            if (this$1.options.smartLists && i !== l - 1) {
                                b = block.bullet.exec(cap[i + 1])[0];
                                if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                                    src = cap.slice(i + 1).join('\n') + src;
                                    i = l - 1;
                                }
                            }

                            // Determine whether item is loose or not.
                            // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
                            // for discount behavior.
                            loose = next || /\n\n(?!\s*$)/.test(item);
                            if (i !== l - 1) {
                                next = item.charAt(item.length - 1) === '\n';
                                if (!loose) {
                                    loose = next;
                                }
                            }

                            this$1.tokens.push({
                                type: loose ? 'loose_item_start' : 'list_item_start'
                            });

                            // Recurse.
                            this$1.token(item, false, bq);

                            this$1.tokens.push({
                                type: 'list_item_end'
                            });
                        }

                        this$1.tokens.push({
                            type: 'list_end'
                        });

                        continue;
                    }

                    // html
                    if (cap = this$1.rules.html.exec(src)) {
                        src = src.substring(cap[0].length);
                        this$1.tokens.push({
                            type: this$1.options.sanitize ? 'paragraph' : 'html',
                            pre: !this$1.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
                            text: cap[0]
                        });
                        continue;
                    }

                    // def
                    if ((!bq && top) && (cap = this$1.rules.def.exec(src))) {
                        src = src.substring(cap[0].length);
                        this$1.tokens.links[cap[1].toLowerCase()] = {
                            href: cap[2],
                            title: cap[3]
                        };
                        continue;
                    }

                    // table (gfm)
                    if (top && (cap = this$1.rules.table.exec(src))) {
                        src = src.substring(cap[0].length);

                        item = {
                            type: 'table',
                            header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
                            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                            cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
                        };

                        for (i = 0; i < item.align.length; i++) {
                            if (/^ *-+: *$/.test(item.align[i])) {
                                item.align[i] = 'right';
                            } else if (/^ *:-+: *$/.test(item.align[i])) {
                                item.align[i] = 'center';
                            } else if (/^ *:-+ *$/.test(item.align[i])) {
                                item.align[i] = 'left';
                            } else {
                                item.align[i] = null;
                            }
                        }

                        for (i = 0; i < item.cells.length; i++) {
                            item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, '').split(/ *\| */);
                        }

                        this$1.tokens.push(item);

                        continue;
                    }

                    // top-level paragraph
                    if (top && (cap = this$1.rules.paragraph.exec(src))) {
                        src = src.substring(cap[0].length);
                        this$1.tokens.push({
                            type: 'paragraph',
                            text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
                        });
                        continue;
                    }

                    // text
                    if (cap = this$1.rules.text.exec(src)) {
                        // Top-level should never reach here.
                        src = src.substring(cap[0].length);
                        this$1.tokens.push({
                            type: 'text',
                            text: cap[0]
                        });
                        continue;
                    }

                    if (src) {
                        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
                    }
                }

                return this.tokens;
            }
            ;

            /**
 * Inline-Level Grammar
 */

            var inline = {
                escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
                autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
                url: noop,
                tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
                link: /^!?\[(inside)\]\(href\)/,
                reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
                nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
                strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
                em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
                code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
                br: /^ {2,}\n(?!\s*$)/,
                del: noop,
                text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
            };

            inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
            inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

            inline.link = replace(inline.link)('inside', inline._inside)('href', inline._href)();

            inline.reflink = replace(inline.reflink)('inside', inline._inside)();

            /**
 * Normal Inline Grammar
 */

            inline.normal = merge({}, inline);

            /**
 * Pedantic Inline Grammar
 */

            inline.pedantic = merge({}, inline.normal, {
                strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
            });

            /**
 * GFM Inline Grammar
 */

            inline.gfm = merge({}, inline.normal, {
                escape: replace(inline.escape)('])', '~|])')(),
                url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
                del: /^~~(?=\S)([\s\S]*?\S)~~/,
                text: replace(inline.text)(']|', '~]|')('|', '|https?://|')()
            });

            /**
 * GFM + Line Breaks Inline Grammar
 */

            inline.breaks = merge({}, inline.gfm, {
                br: replace(inline.br)('{2,}', '*')(),
                text: replace(inline.gfm.text)('{2,}', '*')()
            });

            /**
 * Inline Lexer & Compiler
 */

            function InlineLexer(links, options) {
                this.options = options || marked.defaults;
                this.links = links;
                this.rules = inline.normal;
                this.renderer = this.options.renderer || new Renderer;
                this.renderer.options = this.options;

                if (!this.links) {
                    throw new Error('Tokens array requires a `links` property.');
                }

                if (this.options.gfm) {
                    if (this.options.breaks) {
                        this.rules = inline.breaks;
                    } else {
                        this.rules = inline.gfm;
                    }
                } else if (this.options.pedantic) {
                    this.rules = inline.pedantic;
                }
            }

            /**
 * Expose Inline Rules
 */

            InlineLexer.rules = inline;

            /**
 * Static Lexing/Compiling Method
 */

            InlineLexer.output = function(src, links, options) {
                var inline = new InlineLexer(links,options);
                return inline.output(src);
            }
            ;

            /**
 * Lexing/Compiling
 */

            InlineLexer.prototype.output = function(src) {
                var this$1 = this;

                var out = '', link, text, href, cap;

                while (src) {
                    // escape
                    if (cap = this$1.rules.escape.exec(src)) {
                        src = src.substring(cap[0].length);
                        out += cap[1];
                        continue;
                    }

                    // autolink
                    if (cap = this$1.rules.autolink.exec(src)) {
                        src = src.substring(cap[0].length);
                        if (cap[2] === '@') {
                            text = cap[1].charAt(6) === ':' ? this$1.mangle(cap[1].substring(7)) : this$1.mangle(cap[1]);
                            href = this$1.mangle('mailto:') + text;
                        } else {
                            text = escape(cap[1]);
                            href = text;
                        }
                        out += this$1.renderer.link(href, null, text);
                        continue;
                    }

                    // url (gfm)
                    if (!this$1.inLink && (cap = this$1.rules.url.exec(src))) {
                        src = src.substring(cap[0].length);
                        text = escape(cap[1]);
                        href = text;
                        out += this$1.renderer.link(href, null, text);
                        continue;
                    }

                    // tag
                    if (cap = this$1.rules.tag.exec(src)) {
                        if (!this$1.inLink && /^<a /i.test(cap[0])) {
                            this$1.inLink = true;
                        } else if (this$1.inLink && /^<\/a>/i.test(cap[0])) {
                            this$1.inLink = false;
                        }
                        src = src.substring(cap[0].length);
                        out += this$1.options.sanitize ? this$1.options.sanitizer ? this$1.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
                        continue;
                    }

                    // link
                    if (cap = this$1.rules.link.exec(src)) {
                        src = src.substring(cap[0].length);
                        this$1.inLink = true;
                        out += this$1.outputLink(cap, {
                            href: cap[2],
                            title: cap[3]
                        });
                        this$1.inLink = false;
                        continue;
                    }

                    // reflink, nolink
                    if ((cap = this$1.rules.reflink.exec(src)) || (cap = this$1.rules.nolink.exec(src))) {
                        src = src.substring(cap[0].length);
                        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
                        link = this$1.links[link.toLowerCase()];
                        if (!link || !link.href) {
                            out += cap[0].charAt(0);
                            src = cap[0].substring(1) + src;
                            continue;
                        }
                        this$1.inLink = true;
                        out += this$1.outputLink(cap, link);
                        this$1.inLink = false;
                        continue;
                    }

                    // strong
                    if (cap = this$1.rules.strong.exec(src)) {
                        src = src.substring(cap[0].length);
                        out += this$1.renderer.strong(this$1.output(cap[2] || cap[1]));
                        continue;
                    }

                    // em
                    if (cap = this$1.rules.em.exec(src)) {
                        src = src.substring(cap[0].length);
                        out += this$1.renderer.em(this$1.output(cap[2] || cap[1]));
                        continue;
                    }

                    // code
                    if (cap = this$1.rules.code.exec(src)) {
                        src = src.substring(cap[0].length);
                        out += this$1.renderer.codespan(escape(cap[2], true));
                        continue;
                    }

                    // br
                    if (cap = this$1.rules.br.exec(src)) {
                        src = src.substring(cap[0].length);
                        out += this$1.renderer.br();
                        continue;
                    }

                    // del (gfm)
                    if (cap = this$1.rules.del.exec(src)) {
                        src = src.substring(cap[0].length);
                        out += this$1.renderer.del(this$1.output(cap[1]));
                        continue;
                    }

                    // text
                    if (cap = this$1.rules.text.exec(src)) {
                        src = src.substring(cap[0].length);
                        out += this$1.renderer.text(escape(this$1.smartypants(cap[0])));
                        continue;
                    }

                    if (src) {
                        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
                    }
                }

                return out;
            }
            ;

            /**
 * Compile Link
 */

            InlineLexer.prototype.outputLink = function(cap, link) {
                var href = escape(link.href)
                  , title = link.title ? escape(link.title) : null;

                return cap[0].charAt(0) !== '!' ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
            }
            ;

            /**
 * Smartypants Transformations
 */

            InlineLexer.prototype.smartypants = function(text) {
                if (!this.options.smartypants) {
                    return text;
                }
                return text // em-dashes
                .replace(/---/g, '\u2014')// en-dashes
                .replace(/--/g, '\u2013')// opening singles
                .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')// closing singles & apostrophes
                .replace(/'/g, '\u2019')// opening doubles
                .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')// closing doubles
                .replace(/"/g, '\u201d')// ellipses
                .replace(/\.{3}/g, '\u2026');
            }
            ;

            /**
 * Mangle Links
 */

            InlineLexer.prototype.mangle = function(text) {
                if (!this.options.mangle) {
                    return text;
                }
                var out = '', l = text.length, i = 0, ch;

                for (; i < l; i++) {
                    ch = text.charCodeAt(i);
                    if (Math.random() > 0.5) {
                        ch = 'x' + ch.toString(16);
                    }
                    out += '&#' + ch + ';';
                }

                return out;
            }
            ;

            /**
 * Renderer
 */

            function Renderer(options) {
                this.options = options || {};
            }

            Renderer.prototype.code = function(code, lang, escaped) {
                if (this.options.highlight) {
                    var out = this.options.highlight(code, lang);
                    if (out != null && out !== code) {
                        escaped = true;
                        code = out;
                    }
                }

                if (!lang) {
                    return '<pre><code>' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
                }

                return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
            }
            ;

            Renderer.prototype.blockquote = function(quote) {
                return '<blockquote>\n' + quote + '</blockquote>\n';
            }
            ;

            Renderer.prototype.html = function(html) {
                return html;
            }
            ;

            Renderer.prototype.heading = function(text, level, raw) {
                return '<h' + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-') + '">' + text + '</h' + level + '>\n';
            }
            ;

            Renderer.prototype.hr = function() {
                return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
            }
            ;

            Renderer.prototype.list = function(body, ordered) {
                var type = ordered ? 'ol' : 'ul';
                return '<' + type + '>\n' + body + '</' + type + '>\n';
            }
            ;

            Renderer.prototype.listitem = function(text) {
                return '<li>' + text + '</li>\n';
            }
            ;

            Renderer.prototype.paragraph = function(text) {
                return '<p>' + text + '</p>\n';
            }
            ;

            Renderer.prototype.table = function(header, body) {
                return '<table>\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table>\n';
            }
            ;

            Renderer.prototype.tablerow = function(content) {
                return '<tr>\n' + content + '</tr>\n';
            }
            ;

            Renderer.prototype.tablecell = function(content, flags) {
                var type = flags.header ? 'th' : 'td';
                var tag = flags.align ? '<' + type + ' style="text-align:' + flags.align + '">' : '<' + type + '>';
                return tag + content + '</' + type + '>\n';
            }
            ;

            // span level renderer
            Renderer.prototype.strong = function(text) {
                return '<strong>' + text + '</strong>';
            }
            ;

            Renderer.prototype.em = function(text) {
                return '<em>' + text + '</em>';
            }
            ;

            Renderer.prototype.codespan = function(text) {
                return '<code>' + text + '</code>';
            }
            ;

            Renderer.prototype.br = function() {
                return this.options.xhtml ? '<br/>' : '<br>';
            }
            ;

            Renderer.prototype.del = function(text) {
                return '<del>' + text + '</del>';
            }
            ;

            Renderer.prototype.link = function(href, title, text) {
                if (this.options.sanitize) {
                    try {
                        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, '').toLowerCase();
                    } catch (e) {
                        return '';
                    }
                    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
                        return '';
                    }
                }
                var out = '<a href="' + href + '"';
                if (title) {
                    out += ' title="' + title + '"';
                }
                out += '>' + text + '</a>';
                return out;
            }
            ;

            Renderer.prototype.image = function(href, title, text) {
                var out = '<img src="' + href + '" alt="' + text + '"';
                if (title) {
                    out += ' title="' + title + '"';
                }
                out += this.options.xhtml ? '/>' : '>';
                return out;
            }
            ;

            Renderer.prototype.text = function(text) {
                return text;
            }
            ;

            /**
 * Parsing & Compiling
 */

            function Parser(options) {
                this.tokens = [];
                this.token = null;
                this.options = options || marked.defaults;
                this.options.renderer = this.options.renderer || new Renderer;
                this.renderer = this.options.renderer;
                this.renderer.options = this.options;
            }

            /**
 * Static Parse Method
 */

            Parser.parse = function(src, options, renderer) {
                var parser = new Parser(options,renderer);
                return parser.parse(src);
            }
            ;

            /**
 * Parse Loop
 */

            Parser.prototype.parse = function(src) {
                var this$1 = this;

                this.inline = new InlineLexer(src.links,this.options,this.renderer);
                this.tokens = src.reverse();

                var out = '';
                while (this.next()) {
                    out += this$1.tok();
                }

                return out;
            }
            ;

            /**
 * Next Token
 */

            Parser.prototype.next = function() {
                return this.token = this.tokens.pop();
            }
            ;

            /**
 * Preview Next Token
 */

            Parser.prototype.peek = function() {
                return this.tokens[this.tokens.length - 1] || 0;
            }
            ;

            /**
 * Parse Text Tokens
 */

            Parser.prototype.parseText = function() {
                var this$1 = this;

                var body = this.token.text;

                while (this.peek().type === 'text') {
                    body += '\n' + this$1.next().text;
                }

                return this.inline.output(body);
            }
            ;

            /**
 * Parse Current Token
 */

            Parser.prototype.tok = function() {
                var this$1 = this;

                switch (this.token.type) {
                case 'space':
                    {
                        return '';
                    }
                case 'hr':
                    {
                        return this.renderer.hr();
                    }
                case 'heading':
                    {
                        return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
                    }
                case 'code':
                    {
                        return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                    }
                case 'table':
                    {
                        var header = '', body = '', i, row, cell, flags, j;

                        // header
                        cell = '';
                        for (i = 0; i < this.token.header.length; i++) {
                            flags = {
                                header: true,
                                align: this$1.token.align[i]
                            };
                            cell += this$1.renderer.tablecell(this$1.inline.output(this$1.token.header[i]), {
                                header: true,
                                align: this$1.token.align[i]
                            });
                        }
                        header += this.renderer.tablerow(cell);

                        for (i = 0; i < this.token.cells.length; i++) {
                            row = this$1.token.cells[i];

                            cell = '';
                            for (j = 0; j < row.length; j++) {
                                cell += this$1.renderer.tablecell(this$1.inline.output(row[j]), {
                                    header: false,
                                    align: this$1.token.align[j]
                                });
                            }

                            body += this$1.renderer.tablerow(cell);
                        }
                        return this.renderer.table(header, body);
                    }
                case 'blockquote_start':
                    {
                        var body = '';

                        while (this.next().type !== 'blockquote_end') {
                            body += this$1.tok();
                        }

                        return this.renderer.blockquote(body);
                    }
                case 'list_start':
                    {
                        var body = ''
                          , ordered = this.token.ordered;

                        while (this.next().type !== 'list_end') {
                            body += this$1.tok();
                        }

                        return this.renderer.list(body, ordered);
                    }
                case 'list_item_start':
                    {
                        var body = '';

                        while (this.next().type !== 'list_item_end') {
                            body += this$1.token.type === 'text' ? this$1.parseText() : this$1.tok();
                        }

                        return this.renderer.listitem(body);
                    }
                case 'loose_item_start':
                    {
                        var body = '';

                        while (this.next().type !== 'list_item_end') {
                            body += this$1.tok();
                        }

                        return this.renderer.listitem(body);
                    }
                case 'html':
                    {
                        var html = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
                        return this.renderer.html(html);
                    }
                case 'paragraph':
                    {
                        return this.renderer.paragraph(this.inline.output(this.token.text));
                    }
                case 'text':
                    {
                        return this.renderer.paragraph(this.parseText());
                    }
                }
            }
            ;

            /**
 * Helpers
 */

            function escape(html, encode) {
                return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            }

            function unescape(html) {
                // explicitly match decimal, hex, and named HTML entities 
                return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
                    n = n.toLowerCase();
                    if (n === 'colon') {
                        return ':';
                    }
                    if (n.charAt(0) === '#') {
                        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
                    }
                    return '';
                });
            }

            function replace(regex, opt) {
                regex = regex.source;
                opt = opt || '';
                return function self(name, val) {
                    if (!name) {
                        return new RegExp(regex,opt);
                    }
                    val = val.source || val;
                    val = val.replace(/(^|[^\[])\^/g, '$1');
                    regex = regex.replace(name, val);
                    return self;
                }
                ;
            }

            function noop() {}
            noop.exec = noop;

            function merge(obj) {
                var arguments$1 = arguments;

                var i = 1, target, key;

                for (; i < arguments.length; i++) {
                    target = arguments$1[i];
                    for (key in target) {
                        if (Object.prototype.hasOwnProperty.call(target, key)) {
                            obj[key] = target[key];
                        }
                    }
                }

                return obj;
            }

            /**
 * Marked
 */

            function marked(src, opt, callback) {
                if (callback || typeof opt === 'function') {
                    if (!callback) {
                        callback = opt;
                        opt = null;
                    }

                    opt = merge({}, marked.defaults, opt || {});

                    var highlight = opt.highlight, tokens, pending, i = 0;

                    try {
                        tokens = Lexer.lex(src, opt);
                    } catch (e) {
                        return callback(e);
                    }

                    pending = tokens.length;

                    var done = function(err) {
                        if (err) {
                            opt.highlight = highlight;
                            return callback(err);
                        }

                        var out;

                        try {
                            out = Parser.parse(tokens, opt);
                        } catch (e) {
                            err = e;
                        }

                        opt.highlight = highlight;

                        return err ? callback(err) : callback(null, out);
                    };

                    if (!highlight || highlight.length < 3) {
                        return done();
                    }

                    delete opt.highlight;

                    if (!pending) {
                        return done();
                    }

                    for (; i < tokens.length; i++) {
                        (function(token) {
                            if (token.type !== 'code') {
                                return --pending || done();
                            }
                            return highlight(token.text, token.lang, function(err, code) {
                                if (err) {
                                    return done(err);
                                }
                                if (code == null || code === token.text) {
                                    return --pending || done();
                                }
                                token.text = code;
                                token.escaped = true;
                                --pending || done();
                            });
                        }
                        )(tokens[i]);
                    }

                    return;
                }
                try {
                    if (opt) {
                        opt = merge({}, marked.defaults, opt);
                    }
                    return Parser.parse(Lexer.lex(src, opt), opt);
                } catch (e) {
                    e.message += '\nPlease report this to https://github.com/chjj/marked.';
                    if ((opt || marked.defaults).silent) {
                        return '<p>An error occured:</p><pre>' + escape(e.message + '', true) + '</pre>';
                    }
                    throw e;
                }
            }

            /**
 * Options
 */

            marked.options = marked.setOptions = function(opt) {
                merge(marked.defaults, opt);
                return marked;
            }
            ;

            marked.defaults = {
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                sanitizer: null,
                mangle: true,
                smartLists: false,
                silent: false,
                highlight: null,
                langPrefix: 'lang-',
                smartypants: false,
                headerPrefix: '',
                renderer: new Renderer,
                xhtml: false
            };

            /**
 * Expose
 */

            marked.Parser = Parser;
            marked.parser = Parser.parse;

            marked.Renderer = Renderer;

            marked.Lexer = Lexer;
            marked.lexer = Lexer.lex;

            marked.InlineLexer = InlineLexer;
            marked.inlineLexer = InlineLexer.output;

            marked.parse = marked;

            if ('object' !== 'undefined' && 'object' === 'object') {
                module.exports = marked;
            } else if (typeof undefined === 'function' && undefined.amd) {
                undefined(function() {
                    return marked;
                });
            } else {
                this.marked = marked;
            }

        }
        ).call(function() {
            return this || (typeof window !== 'undefined' ? window : commonjsGlobal);
        }());
    });

    marked.setOptions({
        gfm: true,
        smartypants: true
    });

    var markdown = function(dom, data) {
        var markdownElements = [].slice.call(dom.querySelectorAll('[markdown]'));
        markdownElements.forEach(function(el) {
            var content = el.innerHTML;
            // Set default indents
            content = content.replace(/\n/, "");
            var tabs = content.match(/\s*/);
            content = content.replace(new RegExp("\n" + tabs,"g"), "\n");
            content = content.trim();

            el.innerHTML = marked(content);
        });
    };

    var prism = createCommonjsModule(function(module) {
        /* **********************************************
     Begin prism-core.js
********************************************** */

        var _self = (typeof window !== 'undefined') ? window // if in browser
        : ((typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self // if in worker
        : {}// if in node js
        );

        /**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

        var Prism = (function() {

            // Private helper vars
            var lang = /\blang(?:uage)?-(\w+)\b/i;
            var uniqueId = 0;

            var _ = _self.Prism = {
                util: {
                    encode: function(tokens) {
                        if (tokens instanceof Token) {
                            return new Token(tokens.type,_.util.encode(tokens.content),tokens.alias);
                        } else if (_.util.type(tokens) === 'Array') {
                            return tokens.map(_.util.encode);
                        } else {
                            return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                        }
                    },

                    type: function(o) {
                        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
                    },

                    objId: function(obj) {
                        if (!obj['__id']) {
                            Object.defineProperty(obj, '__id', {
                                value: ++uniqueId
                            });
                        }
                        return obj['__id'];
                    },

                    // Deep clone a language definition (e.g. to extend it)
                    clone: function(o) {
                        var type = _.util.type(o);

                        switch (type) {
                        case 'Object':
                            var clone = {};

                            for (var key in o) {
                                if (o.hasOwnProperty(key)) {
                                    clone[key] = _.util.clone(o[key]);
                                }
                            }

                            return clone;

                        case 'Array':
                            // Check for existence for IE8
                            return o.map && o.map(function(v) {
                                return _.util.clone(v);
                            });
                        }

                        return o;
                    }
                },

                languages: {
                    extend: function(id, redef) {
                        var lang = _.util.clone(_.languages[id]);

                        for (var key in redef) {
                            lang[key] = redef[key];
                        }

                        return lang;
                    },

                    /**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
                    insertBefore: function(inside, before, insert, root) {
                        root = root || _.languages;
                        var grammar = root[inside];

                        if (arguments.length == 2) {
                            insert = arguments[1];

                            for (var newToken in insert) {
                                if (insert.hasOwnProperty(newToken)) {
                                    grammar[newToken] = insert[newToken];
                                }
                            }

                            return grammar;
                        }

                        var ret = {};

                        for (var token in grammar) {

                            if (grammar.hasOwnProperty(token)) {

                                if (token == before) {

                                    for (var newToken in insert) {

                                        if (insert.hasOwnProperty(newToken)) {
                                            ret[newToken] = insert[newToken];
                                        }
                                    }
                                }

                                ret[token] = grammar[token];
                            }
                        }

                        // Update references in other language definitions
                        _.languages.DFS(_.languages, function(key, value) {
                            if (value === root[inside] && key != inside) {
                                this[key] = ret;
                            }
                        });

                        return root[inside] = ret;
                    },

                    // Traverse a language definition with Depth First Search
                    DFS: function(o, callback, type, visited) {
                        visited = visited || {};
                        for (var i in o) {
                            if (o.hasOwnProperty(i)) {
                                callback.call(o, i, o[i], type || i);

                                if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
                                    visited[_.util.objId(o[i])] = true;
                                    _.languages.DFS(o[i], callback, null, visited);
                                } else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
                                    visited[_.util.objId(o[i])] = true;
                                    _.languages.DFS(o[i], callback, i, visited);
                                }
                            }
                        }
                    }
                },
                plugins: {},

                highlightAll: function(async, callback) {
                    var env = {
                        callback: callback,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };

                    _.hooks.run("before-highlightall", env);

                    var elements = env.elements || document.querySelectorAll(env.selector);

                    for (var i = 0, element; element = elements[i++]; ) {
                        _.highlightElement(element, async === true, env.callback);
                    }
                },

                highlightElement: function(element, async, callback) {
                    // Find language
                    var language, grammar, parent = element;

                    while (parent && !lang.test(parent.className)) {
                        parent = parent.parentNode;
                    }

                    if (parent) {
                        language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
                        grammar = _.languages[language];
                    }

                    // Set language on the element, if not present
                    element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

                    // Set language on the parent, for styling
                    parent = element.parentNode;

                    if (/pre/i.test(parent.nodeName)) {
                        parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                    }

                    var code = element.textContent;

                    var env = {
                        element: element,
                        language: language,
                        grammar: grammar,
                        code: code
                    };

                    _.hooks.run('before-sanity-check', env);

                    if (!env.code || !env.grammar) {
                        if (env.code) {
                            env.element.textContent = env.code;
                        }
                        _.hooks.run('complete', env);
                        return;
                    }

                    _.hooks.run('before-highlight', env);

                    if (async && _self.Worker) {
                        var worker = new Worker(_.filename);

                        worker.onmessage = function(evt) {
                            env.highlightedCode = evt.data;

                            _.hooks.run('before-insert', env);

                            env.element.innerHTML = env.highlightedCode;

                            callback && callback.call(env.element);
                            _.hooks.run('after-highlight', env);
                            _.hooks.run('complete', env);
                        }
                        ;

                        worker.postMessage(JSON.stringify({
                            language: env.language,
                            code: env.code,
                            immediateClose: true
                        }));
                    } else {
                        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

                        _.hooks.run('before-insert', env);

                        env.element.innerHTML = env.highlightedCode;

                        callback && callback.call(element);

                        _.hooks.run('after-highlight', env);
                        _.hooks.run('complete', env);
                    }
                },

                highlight: function(text, grammar, language) {
                    var tokens = _.tokenize(text, grammar);
                    return Token.stringify(_.util.encode(tokens), language);
                },

                tokenize: function(text, grammar, language) {
                    var Token = _.Token;

                    var strarr = [text];

                    var rest = grammar.rest;

                    if (rest) {
                        for (var token in rest) {
                            grammar[token] = rest[token];
                        }

                        delete grammar.rest;
                    }

                    tokenloop: for (var token in grammar) {
                        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                            continue;
                        }

                        var patterns = grammar[token];
                        patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

                        for (var j = 0; j < patterns.length; ++j) {
                            var pattern = patterns[j]
                              , inside = pattern.inside
                              , lookbehind = !!pattern.lookbehind
                              , greedy = !!pattern.greedy
                              , lookbehindLength = 0
                              , alias = pattern.alias;

                            if (greedy && !pattern.pattern.global) {
                                // Without the global flag, lastIndex won't work
                                var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
                                pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
                            }

                            pattern = pattern.pattern || pattern;

                            // Don’t cache length as it changes during the loop
                            for (var i = 0, pos = 0; i < strarr.length; pos += strarr[i].length,
                            ++i) {

                                var str = strarr[i];

                                if (strarr.length > text.length) {
                                    // Something went terribly wrong, ABORT, ABORT!
                                    break tokenloop;
                                }

                                if (str instanceof Token) {
                                    continue;
                                }

                                pattern.lastIndex = 0;

                                var match = pattern.exec(str)
                                  , delNum = 1;

                                // Greedy patterns can override/remove up to two previously matched tokens
                                if (!match && greedy && i != strarr.length - 1) {
                                    pattern.lastIndex = pos;
                                    match = pattern.exec(text);
                                    if (!match) {
                                        break;
                                    }

                                    var from = match.index + (lookbehind ? match[1].length : 0)
                                      , to = match.index + match[0].length
                                      , k = i
                                      , p = pos;

                                    for (var len = strarr.length; k < len && p < to; ++k) {
                                        p += strarr[k].length;
                                        // Move the index i to the element in strarr that is closest to from
                                        if (from >= p) {
                                            ++i;
                                            pos = p;
                                        }
                                    }

                                    /*
						 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
						 */
                                    if (strarr[i]instanceof Token || strarr[k - 1].greedy) {
                                        continue;
                                    }

                                    // Number of tokens to delete and replace with the new match
                                    delNum = k - i;
                                    str = text.slice(pos, p);
                                    match.index -= pos;
                                }

                                if (!match) {
                                    continue;
                                }

                                if (lookbehind) {
                                    lookbehindLength = match[1].length;
                                }

                                var from = match.index + lookbehindLength
                                  , match = match[0].slice(lookbehindLength)
                                  , to = from + match.length
                                  , before = str.slice(0, from)
                                  , after = str.slice(to);

                                var args = [i, delNum];

                                if (before) {
                                    args.push(before);
                                }

                                var wrapped = new Token(token,inside ? _.tokenize(match, inside) : match,alias,match,greedy);

                                args.push(wrapped);

                                if (after) {
                                    args.push(after);
                                }

                                Array.prototype.splice.apply(strarr, args);
                            }
                        }
                    }

                    return strarr;
                },

                hooks: {
                    all: {},

                    add: function(name, callback) {
                        var hooks = _.hooks.all;

                        hooks[name] = hooks[name] || [];

                        hooks[name].push(callback);
                    },

                    run: function(name, env) {
                        var callbacks = _.hooks.all[name];

                        if (!callbacks || !callbacks.length) {
                            return;
                        }

                        for (var i = 0, callback; callback = callbacks[i++]; ) {
                            callback(env);
                        }
                    }
                }
            };

            var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
                this.type = type;
                this.content = content;
                this.alias = alias;
                // Copy of the full string this token was created from
                this.length = (matchedStr || "").length | 0;
                this.greedy = !!greedy;
            }
            ;

            Token.stringify = function(o, language, parent) {
                if (typeof o == 'string') {
                    return o;
                }

                if (_.util.type(o) === 'Array') {
                    return o.map(function(element) {
                        return Token.stringify(element, language, o);
                    }).join('');
                }

                var env = {
                    type: o.type,
                    content: Token.stringify(o.content, language, parent),
                    tag: 'span',
                    classes: ['token', o.type],
                    attributes: {},
                    language: language,
                    parent: parent
                };

                if (env.type == 'comment') {
                    env.attributes['spellcheck'] = 'true';
                }

                if (o.alias) {
                    var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
                    Array.prototype.push.apply(env.classes, aliases);
                }

                _.hooks.run('wrap', env);

                var attributes = Object.keys(env.attributes).map(function(name) {
                    return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
                }).join(' ');

                return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

            }
            ;

            if (!_self.document) {
                if (!_self.addEventListener) {
                    // in Node.js
                    return _self.Prism;
                }
                // In worker
                _self.addEventListener('message', function(evt) {
                    var message = JSON.parse(evt.data)
                      , lang = message.language
                      , code = message.code
                      , immediateClose = message.immediateClose;

                    _self.postMessage(_.highlight(code, _.languages[lang], lang));
                    if (immediateClose) {
                        _self.close();
                    }
                }, false);

                return _self.Prism;
            }

            //Get current script and highlight
            var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

            if (script) {
                _.filename = script.src;

                if (document.addEventListener && !script.hasAttribute('data-manual')) {
                    if (document.readyState !== "loading") {
                        if (window.requestAnimationFrame) {
                            window.requestAnimationFrame(_.highlightAll);
                        } else {
                            window.setTimeout(_.highlightAll, 16);
                        }
                    } else {
                        document.addEventListener('DOMContentLoaded', _.highlightAll);
                    }
                }
            }

            return _self.Prism;

        }
        )();

        if ('object' !== 'undefined' && module.exports) {
            module.exports = Prism;
        }

        // hack for components to work correctly in node.js
        if (typeof commonjsGlobal !== 'undefined') {
            commonjsGlobal.Prism = Prism;
        }

        /* **********************************************
     Begin prism-markup.js
********************************************** */

        Prism.languages.markup = {
            'comment': /<!--[\w\W]*?-->/,
            'prolog': /<\?[\w\W]+?\?>/,
            'doctype': /<!DOCTYPE[\w\W]+?>/i,
            'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
            'tag': {
                pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
                inside: {
                    'tag': {
                        pattern: /^<\/?[^\s>\/]+/i,
                        inside: {
                            'punctuation': /^<\/?/,
                            'namespace': /^[^\s>\/:]+:/
                        }
                    },
                    'attr-value': {
                        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                        inside: {
                            'punctuation': /[=>"']/
                        }
                    },
                    'punctuation': /\/?>/,
                    'attr-name': {
                        pattern: /[^\s>\/]+/,
                        inside: {
                            'namespace': /^[^\s>\/:]+:/
                        }
                    }

                }
            },
            'entity': /&#?[\da-z]{1,8};/i
        };

        // Plugin to make entity title show the real entity, idea by Roman Komarov
        Prism.hooks.add('wrap', function(env) {

            if (env.type === 'entity') {
                env.attributes['title'] = env.content.replace(/&amp;/, '&');
            }
        });

        Prism.languages.xml = Prism.languages.markup;
        Prism.languages.html = Prism.languages.markup;
        Prism.languages.mathml = Prism.languages.markup;
        Prism.languages.svg = Prism.languages.markup;

        /* **********************************************
     Begin prism-css.js
********************************************** */

        Prism.languages.css = {
            'comment': /\/\*[\w\W]*?\*\//,
            'atrule': {
                pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
                inside: {
                    'rule': /@[\w-]+/// See rest below
                }
            },
            'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
            'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
            'string': {
                pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
                greedy: true
            },
            'property': /(\b|\B)[\w-]+(?=\s*:)/i,
            'important': /\B!important\b/i,
            'function': /[-a-z0-9]+(?=\()/i,
            'punctuation': /[(){};:]/
        };

        Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

        if (Prism.languages.markup) {
            Prism.languages.insertBefore('markup', 'tag', {
                'style': {
                    pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
                    lookbehind: true,
                    inside: Prism.languages.css,
                    alias: 'language-css'
                }
            });

            Prism.languages.insertBefore('inside', 'attr-value', {
                'style-attr': {
                    pattern: /\s*style=("|').*?\1/i,
                    inside: {
                        'attr-name': {
                            pattern: /^\s*style/i,
                            inside: Prism.languages.markup.tag.inside
                        },
                        'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                        'attr-value': {
                            pattern: /.+/i,
                            inside: Prism.languages.css
                        }
                    },
                    alias: 'language-css'
                }
            }, Prism.languages.markup.tag);
        }

        /* **********************************************
     Begin prism-clike.js
********************************************** */

        Prism.languages.clike = {
            'comment': [{
                pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
                lookbehind: true
            }, {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: true
            }],
            'string': {
                pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: true
            },
            'class-name': {
                pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
                lookbehind: true,
                inside: {
                    punctuation: /(\.|\\)/
                }
            },
            'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
            'boolean': /\b(true|false)\b/,
            'function': /[a-z0-9_]+(?=\()/i,
            'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
            'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
            'punctuation': /[{}[\];(),.:]/
        };

        /* **********************************************
     Begin prism-javascript.js
********************************************** */

        Prism.languages.javascript = Prism.languages.extend('clike', {
            'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
            'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
            // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
            'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
            'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
        });

        Prism.languages.insertBefore('javascript', 'keyword', {
            'regex': {
                pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
                lookbehind: true,
                greedy: true
            }
        });

        Prism.languages.insertBefore('javascript', 'string', {
            'template-string': {
                pattern: /`(?:\\\\|\\?[^\\])*?`/,
                greedy: true,
                inside: {
                    'interpolation': {
                        pattern: /\$\{[^}]+\}/,
                        inside: {
                            'interpolation-punctuation': {
                                pattern: /^\$\{|\}$/,
                                alias: 'punctuation'
                            },
                            rest: Prism.languages.javascript
                        }
                    },
                    'string': /[\s\S]+/
                }
            }
        });

        if (Prism.languages.markup) {
            Prism.languages.insertBefore('markup', 'tag', {
                'script': {
                    pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
                    lookbehind: true,
                    inside: Prism.languages.javascript,
                    alias: 'language-javascript'
                }
            });
        }

        Prism.languages.js = Prism.languages.javascript;

        /* **********************************************
     Begin prism-file-highlight.js
********************************************** */

        (function() {
            if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
                return;
            }

            self.Prism.fileHighlight = function() {

                var Extensions = {
                    'js': 'javascript',
                    'py': 'python',
                    'rb': 'ruby',
                    'ps1': 'powershell',
                    'psm1': 'powershell',
                    'sh': 'bash',
                    'bat': 'batch',
                    'h': 'c',
                    'tex': 'latex'
                };

                if (Array.prototype.forEach) {
                    // Check to prevent error in IE8
                    Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function(pre) {
                        var src = pre.getAttribute('data-src');

                        var language, parent = pre;
                        var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
                        while (parent && !lang.test(parent.className)) {
                            parent = parent.parentNode;
                        }

                        if (parent) {
                            language = (pre.className.match(lang) || [, ''])[1];
                        }

                        if (!language) {
                            var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
                            language = Extensions[extension] || extension;
                        }

                        var code = document.createElement('code');
                        code.className = 'language-' + language;

                        pre.textContent = '';

                        code.textContent = 'Loading…';

                        pre.appendChild(code);

                        var xhr = new XMLHttpRequest();

                        xhr.open('GET', src, true);

                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4) {

                                if (xhr.status < 400 && xhr.responseText) {
                                    code.textContent = xhr.responseText;

                                    Prism.highlightElement(code);
                                } else if (xhr.status >= 400) {
                                    code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
                                } else {
                                    code.textContent = '✖ Error: File does not exist or is empty';
                                }
                            }
                        }
                        ;

                        xhr.send(null);
                    });
                }

            }
            ;

            document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

        }
        )();
    });

    Prism.languages.python = {
        'triple-quoted-string': {
            pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
            alias: 'string'
        },
        'comment': {
            pattern: /(^|[^\\])#.*/,
            lookbehind: true
        },
        'string': {
            pattern: /("|')(?:\\\\|\\?[^\\\r\n])*?\1/,
            greedy: true
        },
        'function': {
            pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
            lookbehind: true
        },
        'class-name': {
            pattern: /(\bclass\s+)[a-z0-9_]+/i,
            lookbehind: true
        },
        'keyword': /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
        'boolean': /\b(?:True|False)\b/,
        'number': /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
        'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
        'punctuation': /[{}[\];(),.:]/
    };

    Prism.languages.clike = {
        'comment': [{
            pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
            lookbehind: true
        }, {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true
        }],
        'string': {
            pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: true
        },
        'class-name': {
            pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
            lookbehind: true,
            inside: {
                punctuation: /(\.|\\)/
            }
        },
        'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        'boolean': /\b(true|false)\b/,
        'function': /[a-z0-9_]+(?=\()/i,
        'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
        'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
        'punctuation': /[{}[\];(),.:]/
    };

    Prism.languages.lua = {
        'comment': /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
        // \z may be used to skip the following space
        'string': {
            pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
            greedy: true
        },
        'number': /\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
        'keyword': /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
        'function': /(?!\d)\w+(?=\s*(?:[({]))/,
        'operator': [/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/, {
            // Match ".." but don't break "..."
            pattern: /(^|[^.])\.\.(?!\.)/,
            lookbehind: true
        }],
        'punctuation': /[\[\](){},;]|\.+|:+/
    };

    (function(Prism) {
        var insideString = {
            variable: [// Arithmetic Environment
            {
                pattern: /\$?\(\([\w\W]+?\)\)/,
                inside: {
                    // If there is a $ sign at the beginning highlight $(( and )) as variable
                    variable: [{
                        pattern: /(^\$\(\([\w\W]+)\)\)/,
                        lookbehind: true
                    }, /^\$\(\(/],
                    number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
                    // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
                    operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                    // If there is no $ sign at the beginning highlight (( and )) as punctuation
                    punctuation: /\(\(?|\)\)?|,|;/
                }
            }, // Command Substitution
            {
                pattern: /\$\([^)]+\)|`[^`]+`/,
                inside: {
                    variable: /^\$\(|^`|\)$|`$/
                }
            }, /\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i],
        };

        Prism.languages.bash = {
            'shebang': {
                pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
                alias: 'important'
            },
            'comment': {
                pattern: /(^|[^"{\\])#.*/,
                lookbehind: true
            },
            'string': [//Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
            {
                pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
                lookbehind: true,
                greedy: true,
                inside: insideString
            }, {
                pattern: /(["'])(?:\\\\|\\?[^\\])*?\1/g,
                greedy: true,
                inside: insideString
            }],
            'variable': insideString.variable,
            // Originally based on http://ss64.com/bash/
            'function': {
                pattern: /(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
                lookbehind: true
            },
            'keyword': {
                pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
                lookbehind: true
            },
            'boolean': {
                pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,
                lookbehind: true
            },
            'operator': /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
            'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
        };

        var inside = insideString.variable[1].inside;
        inside['function'] = Prism.languages.bash['function'];
        inside.keyword = Prism.languages.bash.keyword;
        inside.boolean = Prism.languages.bash.boolean;
        inside.operator = Prism.languages.bash.operator;
        inside.punctuation = Prism.languages.bash.punctuation;
    }
    )(Prism);

    Prism.languages.go = Prism.languages.extend('clike', {
        'keyword': /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
        'builtin': /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/,
        'boolean': /\b(_|iota|nil|true|false)\b/,
        'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
        'number': /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,
        'string': /("|'|`)(\\?.|\r|\n)*?\1/
    });
    delete Prism.languages.go['class-name'];

    Prism.languages.markdown = Prism.languages.extend('markup', {});
    Prism.languages.insertBefore('markdown', 'prolog', {
        'blockquote': {
            // > ...
            pattern: /^>(?:[\t ]*>)*/m,
            alias: 'punctuation'
        },
        'code': [{
            // Prefixed by 4 spaces or 1 tab
            pattern: /^(?: {4}|\t).+/m,
            alias: 'keyword'
        }, {
            // `code`
            // ``code``
            pattern: /``.+?``|`[^`\n]+`/,
            alias: 'keyword'
        }],
        'title': [{
            // title 1
            // =======

            // title 2
            // -------
            pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
            alias: 'important',
            inside: {
                punctuation: /==+$|--+$/
            }
        }, {
            // # title 1
            // ###### title 6
            pattern: /(^\s*)#+.+/m,
            lookbehind: true,
            alias: 'important',
            inside: {
                punctuation: /^#+|#+$/
            }
        }],
        'hr': {
            // ***
            // ---
            // * * *
            // -----------
            pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: true,
            alias: 'punctuation'
        },
        'list': {
            // * item
            // + item
            // - item
            // 1. item
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: true,
            alias: 'punctuation'
        },
        'url-reference': {
            // [id]: http://example.com "Optional title"
            // [id]: http://example.com 'Optional title'
            // [id]: http://example.com (Optional title)
            // [id]: <http://example.com> "Optional title"
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
                'variable': {
                    pattern: /^(!?\[)[^\]]+/,
                    lookbehind: true
                },
                'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                'punctuation': /^[\[\]!:]|[<>]/
            },
            alias: 'url'
        },
        'bold': {
            // **strong**
            // __strong__

            // Allow only one line break
            pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: true,
            inside: {
                'punctuation': /^\*\*|^__|\*\*$|__$/
            }
        },
        'italic': {
            // *em*
            // _em_

            // Allow only one line break
            pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: true,
            inside: {
                'punctuation': /^[*_]|[*_]$/
            }
        },
        'url': {
            // [example](http://example.com "Optional title")
            // [example] [id]
            pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
            inside: {
                'variable': {
                    pattern: /(!?\[)[^\]]+(?=\]$)/,
                    lookbehind: true
                },
                'string': {
                    pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
                }
            }
        }
    });

    Prism.languages.markdown['bold'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
    Prism.languages.markdown['italic'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
    Prism.languages.markdown['bold'].inside['italic'] = Prism.util.clone(Prism.languages.markdown['italic']);
    Prism.languages.markdown['italic'].inside['bold'] = Prism.util.clone(Prism.languages.markdown['bold']);

    Prism.languages.julia = {
        'comment': {
            pattern: /(^|[^\\])#.*/,
            lookbehind: true
        },
        'string': /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/,
        'keyword': /\b(abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|let|local|macro|module|print|println|quote|return|try|type|typealias|using|while)\b/,
        'boolean': /\b(true|false)\b/,
        'number': /\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?\b/i,
        'operator': /\+=?|-=?|\*=?|\/[\/=]?|\\=?|\^=?|%=?|÷=?|!=?=?|&=?|\|[=>]?|\$=?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/,
        'punctuation': /[{}[\];(),.:]/
    };

    var code$1 = function(dom, data) {
        var codeElements = [].slice.call(dom.querySelectorAll("dt-code"));
        codeElements.forEach(function(el) {
            var content = el.textContent;
            el.innerHTML = "";
            var language = el.getAttribute("language");
            var c = dom.createElement("code");
            if (el.getAttribute("block") === "") {
                // Let's normalize the tab indents
                content = content.replace(/\n/, "");
                var tabs = content.match(/\s*/);
                content = content.replace(new RegExp("\n" + tabs,"g"), "\n");
                content = content.trim();
                var p = dom.createElement("pre");
                p.appendChild(c);
                el.appendChild(p);
            } else {
                el.appendChild(c);
            }
            var highlighted = content;
            if (prism.languages[language]) {
                c.setAttribute("class", "language-" + language);
                highlighted = prism.highlight(content, prism.languages[language]);
            }
            c.innerHTML = highlighted;
        });
    };

    var typeset = function(dom, data) {

        var textNodes = dom.createTreeWalker(dom.body, dom.defaultView.NodeFilter.SHOW_TEXT);
        while (textNodes.nextNode()) {
            var n = textNodes.currentNode
              , text = n.nodeValue;
            if (text && acceptNode(n)) {
                text = quotes(text);
                text = punctuation(text);
                n.nodeValue = text;
            }
        }
    };

    function acceptNode(node) {
        var parent = node.parentElement;
        var isMath = (parent && parent.getAttribute && parent.getAttribute("class")) ? parent.getAttribute("class").includes("katex") || parent.getAttribute("class").includes("MathJax") : false;
        return parent && parent.nodeName !== "SCRIPT" && parent.nodeName !== "STYLE" && parent.nodeName !== "CODE" && parent.nodeName !== "PRE" && parent.nodeName !== "SPAN" && parent.nodeName !== "DT-HEADER" && parent.nodeName !== "DT-BYLINE" && parent.nodeName !== "DT-MATH" && parent.nodeName !== "DT-CODE" && parent.nodeName !== "DT-BIBLIOGRAPHY" && parent.nodeName !== "DT-FOOTER" && parent.nodeType !== 8 && //comment nodes
        !isMath;
    }

    /*!
 * typeset - Typesetting for the web
 * @version v0.1.6
 * @link https://github.com/davidmerfield/Typeset.js
 * @author David Merfield
 */
    // which has a CC0 license
    // http://creativecommons.org/publicdomain/zero/1.0/

    function punctuation(text) {

        // Dashes
        text = text.replace(/--/g, '\u2014');
        text = text.replace(/ \u2014 /g, "\u2009\u2014\u2009");
        //this has thin spaces

        // The following are temporary commented out because incompatibility
        // with katex

        // Elipses
        // text = text.replace(/\.\.\./g,'…');

        // Nbsp for punc with spaces
        // var NBSP = "\u00a0";
        // var NBSP_PUNCTUATION_START = /([«¿¡]) /g;
        // var NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g;

        // text = text.replace(NBSP_PUNCTUATION_START, '$1' + NBSP);
        // text = text.replace(NBSP_PUNCTUATION_END, NBSP + '$1');

        return text;
    }

    function quotes(text) {

        text = text.replace(/(\W|^)"([^\s\!\?:;\.,‽»])/g, '$1\u201c$2')// beginning "
        .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')// ending "
        .replace(/([^0-9])"/g, '$1\u201d')// remaining " at end of word
        .replace(/(\W|^)'(\S)/g, '$1\u2018$2')// beginning '
        .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')// conjunction's possession
        .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')// ending '
        .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')// abbrev. years like '93
        .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019')// backwards apostrophe
        .replace(/'''/g, '\u2034')// triple prime
        .replace(/("|'')/g, '\u2033')// double prime
        .replace(/'/g, '\u2032');

        // Allow escaped quotes
        text = text.replace(/\\“/, '\"');
        text = text.replace(/\\”/, '\"');
        text = text.replace(/\\’/, '\'');
        text = text.replace(/\\‘/, '\'');

        return text;
    }

    var code$2 = "\n\nfunction nodeFromString(str) {\n  var div = document.createElement(\"div\");\n  div.innerHTML = str;\n  return div.firstChild;\n}\n\nfunction make_hover_css(pos) {\n  var pretty = window.innerWidth > 600;\n  var padding = pretty? 18 : 12;\n  var outer_padding = pretty ? 18 : 0;\n  var bbox = document.querySelector(\"body\").getBoundingClientRect();\n  var left = pos[0] - bbox.left, top = pos[1] - bbox.top;\n  var width = Math.min(window.innerWidth-2*outer_padding, 648);\n  left = Math.min(left, window.innerWidth-width-outer_padding);\n  width = width - 2*padding;\n  return (`position: absolute;\n     background-color: #FFF;\n     opacity: 0.95;\n     max-width: ${width}px;\n     top: ${top}px;\n     left: ${left}px;\n     border: 1px solid rgba(0, 0, 0, 0.25);\n     padding: ${padding}px;\n     border-radius: ${pretty? 3 : 0}px;\n     box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);\n     z-index: ${1e6};`);\n}\n\n\nfunction DtHoverBox(div_id) {\n  this.div = document.querySelector(\"#\"+div_id);\n  this.visible = false;\n  this.bindDivEvents();\n  DtHoverBox.box_map[div_id] = this;\n}\n\nDtHoverBox.box_map = {};\n\nDtHoverBox.get_box = function get_box(div_id) {\n  if (div_id in DtHoverBox.box_map) {\n    return DtHoverBox.box_map[div_id];\n  } else {\n    return new DtHoverBox(div_id);\n  }\n}\n\nDtHoverBox.prototype.show = function show(pos){\n  this.visible = true;\n  this.div.setAttribute(\"style\", make_hover_css(pos) );\n  for (var box_id in DtHoverBox.box_map) {\n    var box = DtHoverBox.box_map[box_id];\n    if (box != this) box.hide();\n  }\n}\n\nDtHoverBox.prototype.showAtNode = function showAtNode(node){\n    var bbox = node.getBoundingClientRect();\n    this.show([bbox.right, bbox.bottom]);\n}\n\nDtHoverBox.prototype.hide = function hide(){\n  this.visible = false;\n  if (this.div) this.div.setAttribute(\"style\", \"display:none\");\n  if (this.timeout) clearTimeout(this.timeout);\n}\n\nDtHoverBox.prototype.stopTimeout = function stopTimeout() {\n  if (this.timeout) clearTimeout(this.timeout);\n}\n\nDtHoverBox.prototype.extendTimeout = function extendTimeout(T) {\n  //console.log(\"extend\", T)\n  var this_ = this;\n  this.stopTimeout();\n  this.timeout = setTimeout(function(){this_.hide();}.bind(this), T);\n}\n\n// Bind events to a link to open this box\nDtHoverBox.prototype.bind = function bind(node) {\n  if (typeof node == \"string\"){\n    node = document.querySelector(node);\n  }\n\n  node.addEventListener(\"mouseover\", function(){\n    if (!this.visible) this.showAtNode(node);\n    this.stopTimeout();\n  }.bind(this));\n\n  node.addEventListener(\"mouseout\", function(){this.extendTimeout(250);}.bind(this));\n\n  node.addEventListener(\"touchstart\", function(e) {\n    if (this.visible) {\n      this.hide();\n    } else {\n      this.showAtNode(node);\n    }\n    // Don't trigger body touchstart event when touching link\n    e.stopPropagation();\n  }.bind(this));\n}\n\nDtHoverBox.prototype.bindDivEvents = function bindDivEvents(){\n  // For mice, same behavior as hovering on links\n  this.div.addEventListener(\"mouseover\", function(){\n    if (!this.visible) this.showAtNode(node);\n    this.stopTimeout();\n  }.bind(this));\n  this.div.addEventListener(\"mouseout\", function(){this.extendTimeout(250);}.bind(this));\n\n  // Don't trigger body touchstart event when touching within box\n  this.div.addEventListener(\"touchstart\", function(e){e.stopPropagation();});\n  // Close box when touching outside box\n  document.body.addEventListener(\"touchstart\", function(){this.hide();}.bind(this));\n}\n\nvar hover_es = document.querySelectorAll(\"span[data-hover-ref]\");\nhover_es = [].slice.apply(hover_es);\nhover_es.forEach(function(e,n){\n  var ref_id = e.getAttribute(\"data-hover-ref\");\n  DtHoverBox.get_box(ref_id).bind(e);\n})\n";

    var hoverBox = function(dom) {
        var s = dom.createElement("script");
        s.textContent = code$2;
        dom.querySelector("body").appendChild(s);
    };

    //import xml from "xml";

    var generateCrossref = function(data) {

        var date = data.publishedDate;

        var batch_timestamp = Math.floor(Date.now() / 1000);
        var batch_id = data.authors.length ? data.authors[0].lastName.toLowerCase().slice(0, 20) : "Anonymous";
        batch_id += "_" + date.getFullYear();
        batch_id += "_" + data.title.split(" ")[0].toLowerCase().slice(0, 20) + "_" + batch_timestamp;
        // generate XML
        var crf_data = {
            doi_batch: [
            {
                _attr: {
                    version: "4.3.7",
                    xmlns: "http://www.crossref.org/schema/4.3.7",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "xsi:schemaLocation": "http://www.crossref.org/schema/4.3.7 http://www.crossref.org/schemas/crossref4.3.7.xsd",
                }
            },
            {
                head: [{
                    doi_batch_id: batch_id
                }, {
                    timestamp: batch_timestamp
                }, {
                    depositor: [{
                        depositor_name: data.journal.publisherName
                    }, {
                        email_address: data.journal.publisherEmail
                    }]
                }, {
                    registrant: data.journal.publisherName
                }]
            },
            {
                body: [{
                    journal: [
                    {
                        journal_metadata: [{
                            full_title: data.journal.full_title || data.journal.title
                        }, {
                            abbrev_title: data.journal.abbrev_title || data.journal.title || data.journal.full_title
                        }, {
                            issn: data.journal.issn
                        }, {
                            doi_data: [{
                                doi: data.journal.doi
                            }, {
                                resource: data.journal.url
                            }]
                        }]
                    },
                    {
                        journal_issue: [{
                            publication_date: [{
                                month: date.getMonth() + 1
                            }, {
                                year: date.getFullYear()
                            }]
                        }, {
                            journal_volume: [{
                                volume: data.volume
                            }]
                        }, {
                            issue: data.issue
                        }]
                    },
                    {
                        journal_article: [{
                            titles: [{
                                title: data.title
                            }]
                        }, {
                            contributors: data.authors.map(function(author, ind) {
                                return ({
                                    person_name: [{
                                        _attr: {
                                            contributor_role: "author",
                                            sequence: (ind == 0) ? "first" : "additional"
                                        }
                                    }, {
                                        given_name: author.firstName
                                    }, {
                                        surname: author.lastName
                                    }, {
                                        affiliation: author.affiliation
                                    }// TODO: ORCID?
                                    ]
                                });
                            })
                        }, {
                            publication_date: [{
                                month: date.getMonth() + 1
                            }, {
                                day: date.getDate()
                            }, {
                                year: date.getFullYear()
                            }]
                        }, {
                            publisher_item: [{
                                item_number: data.doi
                            }]
                        }, {
                            doi_data: [{
                                doi: data.doi
                            }, //{timestamp: ""},
                            {
                                resource: data.url
                            }]
                        }, {
                            citation_list: data.citations.map(function(key) {
                                return citation_xml(key, data.bibliography[key]);
                            })
                        }
                        ]
                    }]
                }]
            }]
        };

        return xml(crf_data);
    };

    function citation_xml(key, ent) {
        if (ent == undefined) {
            return {};
        }
        var info = [];
        info.push({
            _attr: {
                key: key
            }
        });
        if ("title"in ent) {
            info.push({
                article_title: ent.title
            });
        }
        if ("author"in ent) {
            info.push({
                author: ent.author.split(" and ")[0].split(",")[0].trim()
            });
        }
        if ("journal"in ent) {
            info.push({
                journal_title: ent.journal
            });
        }
        if ("booktitle"in ent) {
            info.push({
                volume_title: ent.booktitle
            });
        }
        if ("volume"in ent) {
            info.push({
                volume: ent.volume
            });
        }
        if ("issue"in ent) {
            info.push({
                issue: ent.issue
            });
        }
        if ("doi"in ent) {
            info.push({
                doi: ent.doi
            });
        }
        return {
            citation: info
        }
    }

    function xml(obj) {
        //console.log(typeof(obj), obj)
        if (typeof obj === 'string') {
            return obj;
        }
        if (typeof obj === 'number') {
            return "" + obj;
        }
        var keys = Object.keys(obj);
        if (keys.length != 1) {
            console.error("can't interpret ", obj, "as xml");
        }
        var name = keys[0];
        var full_content = obj[name];
        var attr = {};
        if (Array.isArray(full_content)) {
            var content = [];
            for (var i in full_content) {
                var obj = full_content[i];
                var obj_name = Object.keys(obj)[0];
                if ("_attr" == obj_name) {
                    attr = obj["_attr"];
                } else {
                    //console.log(Object.keys(obj)[0])
                    content.push(obj);
                }
            }
        } else {
            content = full_content;
        }
        if (content == undefined) {
            content = "undefined";
        }

        var attr_string = "";
        for (var k in attr) {
            attr_string += " " + k + "=\"" + (attr[k]) + "\"";
        }

        //console.log(typeof content, Array.isArray(content), content instanceof String, content)
        if (Array.isArray(content)) {
            content = content.map(xml);
            content = content.join("\n").split("\n");
            content = content.map(function(s) {
                return "  " + s;
            }).join("\n");
            var result = "<" + name + attr_string + ">\n" + content + "\n</" + name + ">";
        } else {
            content = xml(content);
            var result = "<" + name + attr_string + ">" + content + "</" + name + ">";
        }
        return result;
    }

    var logo = "<svg viewBox=\"-607 419 64 64\">\n  <path d=\"M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z\"/>\n</svg>\n";

    var html$4 = "\n<style>\ndt-header {\n  display: block;\n  position: relative;\n  height: 60px;\n  background-color: hsl(200, 60%, 15%);\n  width: 100%;\n  box-sizing: border-box;\n  z-index: 2;\n  color: rgba(0, 0, 0, 0.8);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);\n}\ndt-header .content {\n  height: 70px;\n}\ndt-header a {\n  font-size: 16px;\n  height: 60px;\n  line-height: 60px;\n  text-decoration: none;\n  color: rgba(255, 255, 255, 0.8);\n  padding: 22px 0;\n}\ndt-header a:hover {\n  color: rgba(255, 255, 255, 1);\n}\ndt-header svg {\n  width: 24px;\n  position: relative;\n  top: 4px;\n  margin-right: 2px;\n}\n@media(min-width: 1080px) {\n  dt-header {\n    height: 70px;\n  }\n  dt-header a {\n    height: 70px;\n    line-height: 70px;\n    padding: 28px 0;\n  }\n  dt-header .logo {\n  }\n}\ndt-header svg path {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.8);\n  stroke-width: 3px;\n}\ndt-header .logo {\n  font-size: 17px;\n  font-weight: 200;\n}\ndt-header .nav {\n  float: right;\n  font-weight: 300;\n}\ndt-header .nav a {\n  font-size: 12px;\n  margin-left: 24px;\n  text-transform: uppercase;\n}\n</style>\n\n<div class=\"content l-page\">\n  <a href=\"/\" class=\"logo\">\n    " + logo + "\n    Distill\n  </a>\n  <div class=\"nav\">\n    <a href=\"/about/\">About</a>\n    <a href=\"/prize/\">Prize</a>\n    <a href=\"/journal/\">Submit</a>\n  </div>\n</div>\n";

    var header = function(dom, data) {
        var el = dom.querySelector("dt-header");
        if (el) {
            el.innerHTML = html$4;
        } else {
            var header = dom.createElement("dt-header");
            header.innerHTML = html$4;
            var b = dom.querySelector("body");
            b.insertBefore(header, b.firstChild);
        }
    };

    var html$5 = "\n<style>\ndt-footer {\n  display: block;\n  color: rgba(255, 255, 255, 0.4);\n  font-weight: 300;\n  padding: 40px 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  background-color: hsl(200, 60%, 15%);\n  text-align: center;\n}\ndt-footer .logo svg {\n  width: 24px;\n  position: relative;\n  top: 4px;\n  margin-right: 2px;\n}\ndt-footer .logo svg path {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.8);\n  stroke-width: 3px;\n}\ndt-footer .logo {\n  font-size: 17px;\n  font-weight: 200;\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  margin-right: 6px;\n}\ndt-footer .nav {\n  margin-top: 12px;\n}\ndt-footer .nav a {\n  color: rgba(255, 255, 255, 0.8);\n  margin-right: 6px;\n}\n</style>\n\n<div class=\"l-page\">\n  <div class=\"description\">\n  <a href=\"/\" class=\"logo\">\n    " + logo + "\n    Distill\n  </a>\n  is dedicated to clear explanations of machine learning\n  </div>\n  <div class=\"nav\">\n    <a href=\"http://distill.pub/about/\">About</a>\n    <a href=\"http://distill.pub/journal/\">Submit</a>\n    <a href=\"http://distill.pub/prize/\">Prize</a>\n    <a href=\"http://distill.pub/archive/\">Archive</a>\n    <a href=\"http://distill.pub/rss.xml\">RSS</a>\n    <a href=\"https://github.com/distillpub\">GitHub</a>\n    <a href=\"https://twitter.com/distillpub\">Twitter</a>\n    &nbsp;&nbsp;&nbsp;&nbsp; ISSN 2476-0757\n  </div>\n</div>\n";

    var footer = function(dom, data) {
        var el = dom.querySelector("dt-footer");
        if (el) {
            el.innerHTML = html$5;
        } else {
            var footer = dom.createElement("dt-footer");
            footer.innerHTML = html$5;
            var b = dom.querySelector("body");
            b.appendChild(footer);
        }
    };

    function renderImmediately(dom) {
        html(dom);
        styles(dom);
    }

    function renderOnLoad(dom, data) {
        frontMatter(dom, data);
        bibliography(dom, data);
        expandData(dom, data);
        meta(dom, data);
        byline(dom, data);
        appendix(dom, data);
        markdown(dom, data);
        DTMath(dom, data);
        code$1(dom, data);
        citation(dom, data);
        footnote(dom, data);
        typeset(dom, data);
        hoverBox(dom, data);
    }

    // If we are in a browser, render automatically...
    var browser = new Function("try { return this === window; }catch(e){ return false; }");
    if (browser) {
        try {
            var data = {};
            renderImmediately(window.document);
            window.document.addEventListener("DOMContentLoaded", function(event) {
                renderOnLoad(window.document, data);
                // Add a banner if we're not on localhost.
                if (window.location.hostname !== "localhost" && window.location.origin !== "file://") {
                    banner(window.document, data);
                }
                generateCrossref(data);
                // console.log(data);
            });
        } catch (error) {
            console.error("Window not defined");
        }
    }

    // If we are in node...
    function render$1(dom, data) {
        renderImmediately(dom);
        renderOnLoad(dom, data);
        // Remove script tag so it doesn't run again in the client
        var s = dom.querySelector('script[src*="distill.pub/template"]');
        if (s) {
            s.parentElement.removeChild(s);
        }
    }

    // Distill specific rendering
    function distillify(dom, data) {
        header(dom, data);
        appendixDistill(dom, data);
        footer(dom, data);
    }

    exports.render = render$1;
    exports.distillify = distillify;
    exports.generateCrossref = generateCrossref;

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

}
)));
//# sourceMappingURL=template.v1.js.map
