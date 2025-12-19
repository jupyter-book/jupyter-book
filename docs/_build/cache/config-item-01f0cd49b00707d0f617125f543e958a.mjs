var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module) {
    "use strict";
    module.exports = balanced;
    function balanced(a, b, str2) {
      if (a instanceof RegExp) a = maybeMatch(a, str2);
      if (b instanceof RegExp) b = maybeMatch(b, str2);
      var r = range(a, b, str2);
      return r && {
        start: r[0],
        end: r[1],
        pre: str2.slice(0, r[0]),
        body: str2.slice(r[0] + a.length, r[1]),
        post: str2.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str2) {
      var m = str2.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str2) {
      var begs, beg, left, right, result;
      var ai = str2.indexOf(a);
      var bi = str2.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str2.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str2.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str2.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports, module) {
    var balanced = require_balanced_match();
    module.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str2) {
      return parseInt(str2, 10) == str2 ? parseInt(str2, 10) : str2.charCodeAt(0);
    }
    function escapeBraces(str2) {
      return str2.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str2) {
      return str2.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str2) {
      if (!str2)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str2);
      if (!m)
        return str2.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str2) {
      if (!str2)
        return [];
      if (str2.substr(0, 2) === "{}") {
        str2 = "\\{\\}" + str2.substr(2);
      }
      return expand2(escapeBraces(str2), true).map(unescapeBraces);
    }
    function embrace(str2) {
      return "{" + str2 + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand2(str2, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str2);
      if (!m) return [str2];
      var pre = m.pre;
      var post = m.post.length ? expand2(m.post, false) : [""];
      if (/\$$/.test(m.pre)) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + "{" + m.body + "}" + post[k];
          expansions.push(expansion);
        }
      } else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
          if (m.post.match(/,.*\}/)) {
            str2 = m.pre + "{" + m.body + escClose + m.post;
            return expand2(str2);
          }
          return [str2];
        }
        var n;
        if (isSequence) {
          n = m.body.split(/\.\./);
        } else {
          n = parseCommaParts(m.body);
          if (n.length === 1) {
            n = expand2(n[0], false).map(embrace);
            if (n.length === 1) {
              return post.map(function(p) {
                return m.pre + n[0] + p;
              });
            }
          }
        }
        var N;
        if (isSequence) {
          var x = numeric(n[0]);
          var y = numeric(n[1]);
          var width = Math.max(n[0].length, n[1].length);
          var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
          var test2 = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test2 = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test2(i, y); i += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i);
              if (c === "\\")
                c = "";
            } else {
              c = String(i);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join("0");
                  if (i < 0)
                    c = "-" + z + c.slice(1);
                  else
                    c = z + c;
                }
              }
            }
            N.push(c);
          }
        } else {
          N = [];
          for (var j = 0; j < n.length; j++) {
            N.push.apply(N, expand2(n[j], false));
          }
        }
        for (var j = 0; j < N.length; j++) {
          for (var k = 0; k < post.length; k++) {
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
      }
      return expansions;
    }
  }
});

// node_modules/boolbase/index.js
var require_boolbase = __commonJS({
  "node_modules/boolbase/index.js"(exports, module) {
    module.exports = {
      trueFunc: function trueFunc() {
        return true;
      },
      falseFunc: function falseFunc() {
        return false;
      }
    };
  }
});

// node_modules/css-selector-parser/lib/utils.js
var require_utils = __commonJS({
  "node_modules/css-selector-parser/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isIdentStart(c) {
      return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "-" || c === "_";
    }
    exports.isIdentStart = isIdentStart;
    function isIdent(c) {
      return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "-" || c === "_";
    }
    exports.isIdent = isIdent;
    function isHex(c) {
      return c >= "a" && c <= "f" || c >= "A" && c <= "F" || c >= "0" && c <= "9";
    }
    exports.isHex = isHex;
    function escapeIdentifier(s) {
      var len = s.length;
      var result = "";
      var i = 0;
      while (i < len) {
        var chr = s.charAt(i);
        if (exports.identSpecialChars[chr]) {
          result += "\\" + chr;
        } else {
          if (!(chr === "_" || chr === "-" || chr >= "A" && chr <= "Z" || chr >= "a" && chr <= "z" || i !== 0 && chr >= "0" && chr <= "9")) {
            var charCode = chr.charCodeAt(0);
            if ((charCode & 63488) === 55296) {
              var extraCharCode = s.charCodeAt(i++);
              if ((charCode & 64512) !== 55296 || (extraCharCode & 64512) !== 56320) {
                throw Error("UCS-2(decode): illegal sequence");
              }
              charCode = ((charCode & 1023) << 10) + (extraCharCode & 1023) + 65536;
            }
            result += "\\" + charCode.toString(16) + " ";
          } else {
            result += chr;
          }
        }
        i++;
      }
      return result;
    }
    exports.escapeIdentifier = escapeIdentifier;
    function escapeStr(s) {
      var len = s.length;
      var result = "";
      var i = 0;
      var replacement;
      while (i < len) {
        var chr = s.charAt(i);
        if (chr === '"') {
          chr = '\\"';
        } else if (chr === "\\") {
          chr = "\\\\";
        } else if ((replacement = exports.strReplacementsRev[chr]) !== void 0) {
          chr = replacement;
        }
        result += chr;
        i++;
      }
      return '"' + result + '"';
    }
    exports.escapeStr = escapeStr;
    exports.identSpecialChars = {
      "!": true,
      '"': true,
      "#": true,
      "$": true,
      "%": true,
      "&": true,
      "'": true,
      "(": true,
      ")": true,
      "*": true,
      "+": true,
      ",": true,
      ".": true,
      "/": true,
      ";": true,
      "<": true,
      "=": true,
      ">": true,
      "?": true,
      "@": true,
      "[": true,
      "\\": true,
      "]": true,
      "^": true,
      "`": true,
      "{": true,
      "|": true,
      "}": true,
      "~": true
    };
    exports.strReplacementsRev = {
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\f": "\\f",
      "\v": "\\v"
    };
    exports.singleQuoteEscapeChars = {
      n: "\n",
      r: "\r",
      t: "	",
      f: "\f",
      "\\": "\\",
      "'": "'"
    };
    exports.doubleQuotesEscapeChars = {
      n: "\n",
      r: "\r",
      t: "	",
      f: "\f",
      "\\": "\\",
      '"': '"'
    };
  }
});

// node_modules/css-selector-parser/lib/parser-context.js
var require_parser_context = __commonJS({
  "node_modules/css-selector-parser/lib/parser-context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function parseCssSelector(str2, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
      var l = str2.length;
      var chr = "";
      function getStr(quote, escapeTable) {
        var result = "";
        pos++;
        chr = str2.charAt(pos);
        while (pos < l) {
          if (chr === quote) {
            pos++;
            return result;
          } else if (chr === "\\") {
            pos++;
            chr = str2.charAt(pos);
            var esc = void 0;
            if (chr === quote) {
              result += quote;
            } else if ((esc = escapeTable[chr]) !== void 0) {
              result += esc;
            } else if (utils_1.isHex(chr)) {
              var hex = chr;
              pos++;
              chr = str2.charAt(pos);
              while (utils_1.isHex(chr)) {
                hex += chr;
                pos++;
                chr = str2.charAt(pos);
              }
              if (chr === " ") {
                pos++;
                chr = str2.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            result += chr;
          }
          pos++;
          chr = str2.charAt(pos);
        }
        return result;
      }
      function getIdent() {
        var result = "";
        chr = str2.charAt(pos);
        while (pos < l) {
          if (utils_1.isIdent(chr)) {
            result += chr;
          } else if (chr === "\\") {
            pos++;
            if (pos >= l) {
              throw Error("Expected symbol but end of file reached.");
            }
            chr = str2.charAt(pos);
            if (utils_1.identSpecialChars[chr]) {
              result += chr;
            } else if (utils_1.isHex(chr)) {
              var hex = chr;
              pos++;
              chr = str2.charAt(pos);
              while (utils_1.isHex(chr)) {
                hex += chr;
                pos++;
                chr = str2.charAt(pos);
              }
              if (chr === " ") {
                pos++;
                chr = str2.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            return result;
          }
          pos++;
          chr = str2.charAt(pos);
        }
        return result;
      }
      function skipWhitespace() {
        chr = str2.charAt(pos);
        var result = false;
        while (chr === " " || chr === "	" || chr === "\n" || chr === "\r" || chr === "\f") {
          result = true;
          pos++;
          chr = str2.charAt(pos);
        }
        return result;
      }
      function parse3() {
        var res = parseSelector();
        if (pos < l) {
          throw Error('Rule expected but "' + str2.charAt(pos) + '" found.');
        }
        return res;
      }
      function parseSelector() {
        var selector = parseSingleSelector();
        if (!selector) {
          return null;
        }
        var res = selector;
        chr = str2.charAt(pos);
        while (chr === ",") {
          pos++;
          skipWhitespace();
          if (res.type !== "selectors") {
            res = {
              type: "selectors",
              selectors: [selector]
            };
          }
          selector = parseSingleSelector();
          if (!selector) {
            throw Error('Rule expected after ",".');
          }
          res.selectors.push(selector);
        }
        return res;
      }
      function parseSingleSelector() {
        skipWhitespace();
        var selector = {
          type: "ruleSet"
        };
        var rule = parseRule();
        if (!rule) {
          return null;
        }
        var currentRule = selector;
        while (rule) {
          rule.type = "rule";
          currentRule.rule = rule;
          currentRule = rule;
          skipWhitespace();
          chr = str2.charAt(pos);
          if (pos >= l || chr === "," || chr === ")") {
            break;
          }
          if (ruleNestingOperators[chr]) {
            var op = chr;
            pos++;
            skipWhitespace();
            rule = parseRule();
            if (!rule) {
              throw Error('Rule expected after "' + op + '".');
            }
            rule.nestingOperator = op;
          } else {
            rule = parseRule();
            if (rule) {
              rule.nestingOperator = null;
            }
          }
        }
        return selector;
      }
      function parseRule() {
        var rule = null;
        while (pos < l) {
          chr = str2.charAt(pos);
          if (chr === "*") {
            pos++;
            (rule = rule || {}).tagName = "*";
          } else if (utils_1.isIdentStart(chr) || chr === "\\") {
            (rule = rule || {}).tagName = getIdent();
          } else if (chr === ".") {
            pos++;
            rule = rule || {};
            (rule.classNames = rule.classNames || []).push(getIdent());
          } else if (chr === "#") {
            pos++;
            (rule = rule || {}).id = getIdent();
          } else if (chr === "[") {
            pos++;
            skipWhitespace();
            var attr = {
              name: getIdent()
            };
            skipWhitespace();
            if (chr === "]") {
              pos++;
            } else {
              var operator = "";
              if (attrEqualityMods[chr]) {
                operator = chr;
                pos++;
                chr = str2.charAt(pos);
              }
              if (pos >= l) {
                throw Error('Expected "=" but end of file reached.');
              }
              if (chr !== "=") {
                throw Error('Expected "=" but "' + chr + '" found.');
              }
              attr.operator = operator + "=";
              pos++;
              skipWhitespace();
              var attrValue = "";
              attr.valueType = "string";
              if (chr === '"') {
                attrValue = getStr('"', utils_1.doubleQuotesEscapeChars);
              } else if (chr === "'") {
                attrValue = getStr("'", utils_1.singleQuoteEscapeChars);
              } else if (substitutesEnabled && chr === "$") {
                pos++;
                attrValue = getIdent();
                attr.valueType = "substitute";
              } else {
                while (pos < l) {
                  if (chr === "]") {
                    break;
                  }
                  attrValue += chr;
                  pos++;
                  chr = str2.charAt(pos);
                }
                attrValue = attrValue.trim();
              }
              skipWhitespace();
              if (pos >= l) {
                throw Error('Expected "]" but end of file reached.');
              }
              if (chr !== "]") {
                throw Error('Expected "]" but "' + chr + '" found.');
              }
              pos++;
              attr.value = attrValue;
            }
            rule = rule || {};
            (rule.attrs = rule.attrs || []).push(attr);
          } else if (chr === ":") {
            pos++;
            var pseudoName = getIdent();
            var pseudo2 = {
              name: pseudoName
            };
            if (chr === "(") {
              pos++;
              var value = "";
              skipWhitespace();
              if (pseudos[pseudoName] === "selector") {
                pseudo2.valueType = "selector";
                value = parseSelector();
              } else {
                pseudo2.valueType = pseudos[pseudoName] || "string";
                if (chr === '"') {
                  value = getStr('"', utils_1.doubleQuotesEscapeChars);
                } else if (chr === "'") {
                  value = getStr("'", utils_1.singleQuoteEscapeChars);
                } else if (substitutesEnabled && chr === "$") {
                  pos++;
                  value = getIdent();
                  pseudo2.valueType = "substitute";
                } else {
                  while (pos < l) {
                    if (chr === ")") {
                      break;
                    }
                    value += chr;
                    pos++;
                    chr = str2.charAt(pos);
                  }
                  value = value.trim();
                }
                skipWhitespace();
              }
              if (pos >= l) {
                throw Error('Expected ")" but end of file reached.');
              }
              if (chr !== ")") {
                throw Error('Expected ")" but "' + chr + '" found.');
              }
              pos++;
              pseudo2.value = value;
            }
            rule = rule || {};
            (rule.pseudos = rule.pseudos || []).push(pseudo2);
          } else {
            break;
          }
        }
        return rule;
      }
      return parse3();
    }
    exports.parseCssSelector = parseCssSelector;
  }
});

// node_modules/css-selector-parser/lib/render.js
var require_render = __commonJS({
  "node_modules/css-selector-parser/lib/render.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function renderEntity(entity) {
      var res = "";
      switch (entity.type) {
        case "ruleSet":
          var currentEntity = entity.rule;
          var parts = [];
          while (currentEntity) {
            if (currentEntity.nestingOperator) {
              parts.push(currentEntity.nestingOperator);
            }
            parts.push(renderEntity(currentEntity));
            currentEntity = currentEntity.rule;
          }
          res = parts.join(" ");
          break;
        case "selectors":
          res = entity.selectors.map(renderEntity).join(", ");
          break;
        case "rule":
          if (entity.tagName) {
            if (entity.tagName === "*") {
              res = "*";
            } else {
              res = utils_1.escapeIdentifier(entity.tagName);
            }
          }
          if (entity.id) {
            res += "#" + utils_1.escapeIdentifier(entity.id);
          }
          if (entity.classNames) {
            res += entity.classNames.map(function(cn) {
              return "." + utils_1.escapeIdentifier(cn);
            }).join("");
          }
          if (entity.attrs) {
            res += entity.attrs.map(function(attr) {
              if ("operator" in attr) {
                if (attr.valueType === "substitute") {
                  return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + "$" + attr.value + "]";
                } else {
                  return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + utils_1.escapeStr(attr.value) + "]";
                }
              } else {
                return "[" + utils_1.escapeIdentifier(attr.name) + "]";
              }
            }).join("");
          }
          if (entity.pseudos) {
            res += entity.pseudos.map(function(pseudo2) {
              if (pseudo2.valueType) {
                if (pseudo2.valueType === "selector") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + renderEntity(pseudo2.value) + ")";
                } else if (pseudo2.valueType === "substitute") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "($" + pseudo2.value + ")";
                } else if (pseudo2.valueType === "numeric") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + pseudo2.value + ")";
                } else {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + utils_1.escapeIdentifier(pseudo2.value) + ")";
                }
              } else {
                return ":" + utils_1.escapeIdentifier(pseudo2.name);
              }
            }).join("");
          }
          break;
        default:
          throw Error('Unknown entity type: "' + entity.type + '".');
      }
      return res;
    }
    exports.renderEntity = renderEntity;
  }
});

// node_modules/css-selector-parser/lib/index.js
var require_lib = __commonJS({
  "node_modules/css-selector-parser/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parser_context_1 = require_parser_context();
    var render_1 = require_render();
    var CssSelectorParser2 = (
      /** @class */
      function() {
        function CssSelectorParser3() {
          this.pseudos = {};
          this.attrEqualityMods = {};
          this.ruleNestingOperators = {};
          this.substitutesEnabled = false;
        }
        CssSelectorParser3.prototype.registerSelectorPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_1 = pseudos; _a < pseudos_1.length; _a++) {
            var pseudo2 = pseudos_1[_a];
            this.pseudos[pseudo2] = "selector";
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterSelectorPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_2 = pseudos; _a < pseudos_2.length; _a++) {
            var pseudo2 = pseudos_2[_a];
            delete this.pseudos[pseudo2];
          }
          return this;
        };
        CssSelectorParser3.prototype.registerNumericPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_3 = pseudos; _a < pseudos_3.length; _a++) {
            var pseudo2 = pseudos_3[_a];
            this.pseudos[pseudo2] = "numeric";
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterNumericPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_4 = pseudos; _a < pseudos_4.length; _a++) {
            var pseudo2 = pseudos_4[_a];
            delete this.pseudos[pseudo2];
          }
          return this;
        };
        CssSelectorParser3.prototype.registerNestingOperators = function() {
          var operators = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
          }
          for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
            var operator = operators_1[_a];
            this.ruleNestingOperators[operator] = true;
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterNestingOperators = function() {
          var operators = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
          }
          for (var _a = 0, operators_2 = operators; _a < operators_2.length; _a++) {
            var operator = operators_2[_a];
            delete this.ruleNestingOperators[operator];
          }
          return this;
        };
        CssSelectorParser3.prototype.registerAttrEqualityMods = function() {
          var mods = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
          }
          for (var _a = 0, mods_1 = mods; _a < mods_1.length; _a++) {
            var mod = mods_1[_a];
            this.attrEqualityMods[mod] = true;
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterAttrEqualityMods = function() {
          var mods = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
          }
          for (var _a = 0, mods_2 = mods; _a < mods_2.length; _a++) {
            var mod = mods_2[_a];
            delete this.attrEqualityMods[mod];
          }
          return this;
        };
        CssSelectorParser3.prototype.enableSubstitutes = function() {
          this.substitutesEnabled = true;
          return this;
        };
        CssSelectorParser3.prototype.disableSubstitutes = function() {
          this.substitutesEnabled = false;
          return this;
        };
        CssSelectorParser3.prototype.parse = function(str2) {
          return parser_context_1.parseCssSelector(str2, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
        };
        CssSelectorParser3.prototype.render = function(path2) {
          return render_1.renderEntity(path2).trim();
        };
        return CssSelectorParser3;
      }()
    );
    exports.CssSelectorParser = CssSelectorParser2;
  }
});

// node_modules/spdx-license-ids/index.json
var require_spdx_license_ids = __commonJS({
  "node_modules/spdx-license-ids/index.json"(exports, module) {
    module.exports = [
      "0BSD",
      "3D-Slicer-1.0",
      "AAL",
      "ADSL",
      "AFL-1.1",
      "AFL-1.2",
      "AFL-2.0",
      "AFL-2.1",
      "AFL-3.0",
      "AGPL-1.0-only",
      "AGPL-1.0-or-later",
      "AGPL-3.0-only",
      "AGPL-3.0-or-later",
      "AMD-newlib",
      "AMDPLPA",
      "AML",
      "AML-glslang",
      "AMPAS",
      "ANTLR-PD",
      "ANTLR-PD-fallback",
      "APAFML",
      "APL-1.0",
      "APSL-1.0",
      "APSL-1.1",
      "APSL-1.2",
      "APSL-2.0",
      "ASWF-Digital-Assets-1.0",
      "ASWF-Digital-Assets-1.1",
      "Abstyles",
      "AdaCore-doc",
      "Adobe-2006",
      "Adobe-Display-PostScript",
      "Adobe-Glyph",
      "Adobe-Utopia",
      "Afmparse",
      "Aladdin",
      "Apache-1.0",
      "Apache-1.1",
      "Apache-2.0",
      "App-s2p",
      "Arphic-1999",
      "Artistic-1.0",
      "Artistic-1.0-Perl",
      "Artistic-1.0-cl8",
      "Artistic-2.0",
      "BSD-1-Clause",
      "BSD-2-Clause",
      "BSD-2-Clause-Darwin",
      "BSD-2-Clause-Patent",
      "BSD-2-Clause-Views",
      "BSD-2-Clause-first-lines",
      "BSD-3-Clause",
      "BSD-3-Clause-Attribution",
      "BSD-3-Clause-Clear",
      "BSD-3-Clause-HP",
      "BSD-3-Clause-LBNL",
      "BSD-3-Clause-Modification",
      "BSD-3-Clause-No-Military-License",
      "BSD-3-Clause-No-Nuclear-License",
      "BSD-3-Clause-No-Nuclear-License-2014",
      "BSD-3-Clause-No-Nuclear-Warranty",
      "BSD-3-Clause-Open-MPI",
      "BSD-3-Clause-Sun",
      "BSD-3-Clause-acpica",
      "BSD-3-Clause-flex",
      "BSD-4-Clause",
      "BSD-4-Clause-Shortened",
      "BSD-4-Clause-UC",
      "BSD-4.3RENO",
      "BSD-4.3TAHOE",
      "BSD-Advertising-Acknowledgement",
      "BSD-Attribution-HPND-disclaimer",
      "BSD-Inferno-Nettverk",
      "BSD-Protection",
      "BSD-Source-Code",
      "BSD-Source-beginning-file",
      "BSD-Systemics",
      "BSD-Systemics-W3Works",
      "BSL-1.0",
      "BUSL-1.1",
      "Baekmuk",
      "Bahyph",
      "Barr",
      "Beerware",
      "BitTorrent-1.0",
      "BitTorrent-1.1",
      "Bitstream-Charter",
      "Bitstream-Vera",
      "BlueOak-1.0.0",
      "Boehm-GC",
      "Boehm-GC-without-fee",
      "Borceux",
      "Brian-Gladman-2-Clause",
      "Brian-Gladman-3-Clause",
      "C-UDA-1.0",
      "CAL-1.0",
      "CAL-1.0-Combined-Work-Exception",
      "CATOSL-1.1",
      "CC-BY-1.0",
      "CC-BY-2.0",
      "CC-BY-2.5",
      "CC-BY-2.5-AU",
      "CC-BY-3.0",
      "CC-BY-3.0-AT",
      "CC-BY-3.0-AU",
      "CC-BY-3.0-DE",
      "CC-BY-3.0-IGO",
      "CC-BY-3.0-NL",
      "CC-BY-3.0-US",
      "CC-BY-4.0",
      "CC-BY-NC-1.0",
      "CC-BY-NC-2.0",
      "CC-BY-NC-2.5",
      "CC-BY-NC-3.0",
      "CC-BY-NC-3.0-DE",
      "CC-BY-NC-4.0",
      "CC-BY-NC-ND-1.0",
      "CC-BY-NC-ND-2.0",
      "CC-BY-NC-ND-2.5",
      "CC-BY-NC-ND-3.0",
      "CC-BY-NC-ND-3.0-DE",
      "CC-BY-NC-ND-3.0-IGO",
      "CC-BY-NC-ND-4.0",
      "CC-BY-NC-SA-1.0",
      "CC-BY-NC-SA-2.0",
      "CC-BY-NC-SA-2.0-DE",
      "CC-BY-NC-SA-2.0-FR",
      "CC-BY-NC-SA-2.0-UK",
      "CC-BY-NC-SA-2.5",
      "CC-BY-NC-SA-3.0",
      "CC-BY-NC-SA-3.0-DE",
      "CC-BY-NC-SA-3.0-IGO",
      "CC-BY-NC-SA-4.0",
      "CC-BY-ND-1.0",
      "CC-BY-ND-2.0",
      "CC-BY-ND-2.5",
      "CC-BY-ND-3.0",
      "CC-BY-ND-3.0-DE",
      "CC-BY-ND-4.0",
      "CC-BY-SA-1.0",
      "CC-BY-SA-2.0",
      "CC-BY-SA-2.0-UK",
      "CC-BY-SA-2.1-JP",
      "CC-BY-SA-2.5",
      "CC-BY-SA-3.0",
      "CC-BY-SA-3.0-AT",
      "CC-BY-SA-3.0-DE",
      "CC-BY-SA-3.0-IGO",
      "CC-BY-SA-4.0",
      "CC-PDDC",
      "CC-PDM-1.0",
      "CC-SA-1.0",
      "CC0-1.0",
      "CDDL-1.0",
      "CDDL-1.1",
      "CDL-1.0",
      "CDLA-Permissive-1.0",
      "CDLA-Permissive-2.0",
      "CDLA-Sharing-1.0",
      "CECILL-1.0",
      "CECILL-1.1",
      "CECILL-2.0",
      "CECILL-2.1",
      "CECILL-B",
      "CECILL-C",
      "CERN-OHL-1.1",
      "CERN-OHL-1.2",
      "CERN-OHL-P-2.0",
      "CERN-OHL-S-2.0",
      "CERN-OHL-W-2.0",
      "CFITSIO",
      "CMU-Mach",
      "CMU-Mach-nodoc",
      "CNRI-Jython",
      "CNRI-Python",
      "CNRI-Python-GPL-Compatible",
      "COIL-1.0",
      "CPAL-1.0",
      "CPL-1.0",
      "CPOL-1.02",
      "CUA-OPL-1.0",
      "Caldera",
      "Caldera-no-preamble",
      "Catharon",
      "ClArtistic",
      "Clips",
      "Community-Spec-1.0",
      "Condor-1.1",
      "Cornell-Lossless-JPEG",
      "Cronyx",
      "Crossword",
      "CrystalStacker",
      "Cube",
      "D-FSL-1.0",
      "DEC-3-Clause",
      "DL-DE-BY-2.0",
      "DL-DE-ZERO-2.0",
      "DOC",
      "DRL-1.0",
      "DRL-1.1",
      "DSDP",
      "DocBook-Schema",
      "DocBook-Stylesheet",
      "DocBook-XML",
      "Dotseqn",
      "ECL-1.0",
      "ECL-2.0",
      "EFL-1.0",
      "EFL-2.0",
      "EPICS",
      "EPL-1.0",
      "EPL-2.0",
      "EUDatagrid",
      "EUPL-1.0",
      "EUPL-1.1",
      "EUPL-1.2",
      "Elastic-2.0",
      "Entessa",
      "ErlPL-1.1",
      "Eurosym",
      "FBM",
      "FDK-AAC",
      "FSFAP",
      "FSFAP-no-warranty-disclaimer",
      "FSFUL",
      "FSFULLR",
      "FSFULLRWD",
      "FTL",
      "Fair",
      "Ferguson-Twofish",
      "Frameworx-1.0",
      "FreeBSD-DOC",
      "FreeImage",
      "Furuseth",
      "GCR-docs",
      "GD",
      "GFDL-1.1-invariants-only",
      "GFDL-1.1-invariants-or-later",
      "GFDL-1.1-no-invariants-only",
      "GFDL-1.1-no-invariants-or-later",
      "GFDL-1.1-only",
      "GFDL-1.1-or-later",
      "GFDL-1.2-invariants-only",
      "GFDL-1.2-invariants-or-later",
      "GFDL-1.2-no-invariants-only",
      "GFDL-1.2-no-invariants-or-later",
      "GFDL-1.2-only",
      "GFDL-1.2-or-later",
      "GFDL-1.3-invariants-only",
      "GFDL-1.3-invariants-or-later",
      "GFDL-1.3-no-invariants-only",
      "GFDL-1.3-no-invariants-or-later",
      "GFDL-1.3-only",
      "GFDL-1.3-or-later",
      "GL2PS",
      "GLWTPL",
      "GPL-1.0-only",
      "GPL-1.0-or-later",
      "GPL-2.0-only",
      "GPL-2.0-or-later",
      "GPL-3.0-only",
      "GPL-3.0-or-later",
      "Giftware",
      "Glide",
      "Glulxe",
      "Graphics-Gems",
      "Gutmann",
      "HIDAPI",
      "HP-1986",
      "HP-1989",
      "HPND",
      "HPND-DEC",
      "HPND-Fenneberg-Livingston",
      "HPND-INRIA-IMAG",
      "HPND-Intel",
      "HPND-Kevlin-Henney",
      "HPND-MIT-disclaimer",
      "HPND-Markus-Kuhn",
      "HPND-Netrek",
      "HPND-Pbmplus",
      "HPND-UC",
      "HPND-UC-export-US",
      "HPND-doc",
      "HPND-doc-sell",
      "HPND-export-US",
      "HPND-export-US-acknowledgement",
      "HPND-export-US-modify",
      "HPND-export2-US",
      "HPND-merchantability-variant",
      "HPND-sell-MIT-disclaimer-xserver",
      "HPND-sell-regexpr",
      "HPND-sell-variant",
      "HPND-sell-variant-MIT-disclaimer",
      "HPND-sell-variant-MIT-disclaimer-rev",
      "HTMLTIDY",
      "HaskellReport",
      "Hippocratic-2.1",
      "IBM-pibs",
      "ICU",
      "IEC-Code-Components-EULA",
      "IJG",
      "IJG-short",
      "IPA",
      "IPL-1.0",
      "ISC",
      "ISC-Veillard",
      "ImageMagick",
      "Imlib2",
      "Info-ZIP",
      "Inner-Net-2.0",
      "InnoSetup",
      "Intel",
      "Intel-ACPI",
      "Interbase-1.0",
      "JPL-image",
      "JPNIC",
      "JSON",
      "Jam",
      "JasPer-2.0",
      "Kastrup",
      "Kazlib",
      "Knuth-CTAN",
      "LAL-1.2",
      "LAL-1.3",
      "LGPL-2.0-only",
      "LGPL-2.0-or-later",
      "LGPL-2.1-only",
      "LGPL-2.1-or-later",
      "LGPL-3.0-only",
      "LGPL-3.0-or-later",
      "LGPLLR",
      "LOOP",
      "LPD-document",
      "LPL-1.0",
      "LPL-1.02",
      "LPPL-1.0",
      "LPPL-1.1",
      "LPPL-1.2",
      "LPPL-1.3a",
      "LPPL-1.3c",
      "LZMA-SDK-9.11-to-9.20",
      "LZMA-SDK-9.22",
      "Latex2e",
      "Latex2e-translated-notice",
      "Leptonica",
      "LiLiQ-P-1.1",
      "LiLiQ-R-1.1",
      "LiLiQ-Rplus-1.1",
      "Libpng",
      "Linux-OpenIB",
      "Linux-man-pages-1-para",
      "Linux-man-pages-copyleft",
      "Linux-man-pages-copyleft-2-para",
      "Linux-man-pages-copyleft-var",
      "Lucida-Bitmap-Fonts",
      "MIPS",
      "MIT",
      "MIT-0",
      "MIT-CMU",
      "MIT-Click",
      "MIT-Festival",
      "MIT-Khronos-old",
      "MIT-Modern-Variant",
      "MIT-Wu",
      "MIT-advertising",
      "MIT-enna",
      "MIT-feh",
      "MIT-open-group",
      "MIT-testregex",
      "MITNFA",
      "MMIXware",
      "MPEG-SSG",
      "MPL-1.0",
      "MPL-1.1",
      "MPL-2.0",
      "MPL-2.0-no-copyleft-exception",
      "MS-LPL",
      "MS-PL",
      "MS-RL",
      "MTLL",
      "Mackerras-3-Clause",
      "Mackerras-3-Clause-acknowledgment",
      "MakeIndex",
      "Martin-Birgmeier",
      "McPhee-slideshow",
      "Minpack",
      "MirOS",
      "Motosoto",
      "MulanPSL-1.0",
      "MulanPSL-2.0",
      "Multics",
      "Mup",
      "NAIST-2003",
      "NASA-1.3",
      "NBPL-1.0",
      "NCBI-PD",
      "NCGL-UK-2.0",
      "NCL",
      "NCSA",
      "NGPL",
      "NICTA-1.0",
      "NIST-PD",
      "NIST-PD-fallback",
      "NIST-Software",
      "NLOD-1.0",
      "NLOD-2.0",
      "NLPL",
      "NOSL",
      "NPL-1.0",
      "NPL-1.1",
      "NPOSL-3.0",
      "NRL",
      "NTP",
      "NTP-0",
      "Naumen",
      "NetCDF",
      "Newsletr",
      "Nokia",
      "Noweb",
      "O-UDA-1.0",
      "OAR",
      "OCCT-PL",
      "OCLC-2.0",
      "ODC-By-1.0",
      "ODbL-1.0",
      "OFFIS",
      "OFL-1.0",
      "OFL-1.0-RFN",
      "OFL-1.0-no-RFN",
      "OFL-1.1",
      "OFL-1.1-RFN",
      "OFL-1.1-no-RFN",
      "OGC-1.0",
      "OGDL-Taiwan-1.0",
      "OGL-Canada-2.0",
      "OGL-UK-1.0",
      "OGL-UK-2.0",
      "OGL-UK-3.0",
      "OGTSL",
      "OLDAP-1.1",
      "OLDAP-1.2",
      "OLDAP-1.3",
      "OLDAP-1.4",
      "OLDAP-2.0",
      "OLDAP-2.0.1",
      "OLDAP-2.1",
      "OLDAP-2.2",
      "OLDAP-2.2.1",
      "OLDAP-2.2.2",
      "OLDAP-2.3",
      "OLDAP-2.4",
      "OLDAP-2.5",
      "OLDAP-2.6",
      "OLDAP-2.7",
      "OLDAP-2.8",
      "OLFL-1.3",
      "OML",
      "OPL-1.0",
      "OPL-UK-3.0",
      "OPUBL-1.0",
      "OSET-PL-2.1",
      "OSL-1.0",
      "OSL-1.1",
      "OSL-2.0",
      "OSL-2.1",
      "OSL-3.0",
      "OpenPBS-2.3",
      "OpenSSL",
      "OpenSSL-standalone",
      "OpenVision",
      "PADL",
      "PDDL-1.0",
      "PHP-3.0",
      "PHP-3.01",
      "PPL",
      "PSF-2.0",
      "Parity-6.0.0",
      "Parity-7.0.0",
      "Pixar",
      "Plexus",
      "PolyForm-Noncommercial-1.0.0",
      "PolyForm-Small-Business-1.0.0",
      "PostgreSQL",
      "Python-2.0",
      "Python-2.0.1",
      "QPL-1.0",
      "QPL-1.0-INRIA-2004",
      "Qhull",
      "RHeCos-1.1",
      "RPL-1.1",
      "RPL-1.5",
      "RPSL-1.0",
      "RSA-MD",
      "RSCPL",
      "Rdisc",
      "Ruby",
      "Ruby-pty",
      "SAX-PD",
      "SAX-PD-2.0",
      "SCEA",
      "SGI-B-1.0",
      "SGI-B-1.1",
      "SGI-B-2.0",
      "SGI-OpenGL",
      "SGP4",
      "SHL-0.5",
      "SHL-0.51",
      "SISSL",
      "SISSL-1.2",
      "SL",
      "SMAIL-GPL",
      "SMLNJ",
      "SMPPL",
      "SNIA",
      "SPL-1.0",
      "SSH-OpenSSH",
      "SSH-short",
      "SSLeay-standalone",
      "SSPL-1.0",
      "SWL",
      "Saxpath",
      "SchemeReport",
      "Sendmail",
      "Sendmail-8.23",
      "Sendmail-Open-Source-1.1",
      "SimPL-2.0",
      "Sleepycat",
      "Soundex",
      "Spencer-86",
      "Spencer-94",
      "Spencer-99",
      "SugarCRM-1.1.3",
      "Sun-PPP",
      "Sun-PPP-2000",
      "SunPro",
      "Symlinks",
      "TAPR-OHL-1.0",
      "TCL",
      "TCP-wrappers",
      "TGPPL-1.0",
      "TMate",
      "TORQUE-1.1",
      "TOSL",
      "TPDL",
      "TPL-1.0",
      "TTWL",
      "TTYP0",
      "TU-Berlin-1.0",
      "TU-Berlin-2.0",
      "TermReadKey",
      "ThirdEye",
      "TrustedQSL",
      "UCAR",
      "UCL-1.0",
      "UMich-Merit",
      "UPL-1.0",
      "URT-RLE",
      "Ubuntu-font-1.0",
      "Unicode-3.0",
      "Unicode-DFS-2015",
      "Unicode-DFS-2016",
      "Unicode-TOU",
      "UnixCrypt",
      "Unlicense",
      "VOSTROM",
      "VSL-1.0",
      "Vim",
      "W3C",
      "W3C-19980720",
      "W3C-20150513",
      "WTFPL",
      "Watcom-1.0",
      "Widget-Workshop",
      "Wsuipa",
      "X11",
      "X11-distribute-modifications-variant",
      "X11-swapped",
      "XFree86-1.1",
      "XSkat",
      "Xdebug-1.03",
      "Xerox",
      "Xfig",
      "Xnet",
      "YPL-1.0",
      "YPL-1.1",
      "ZPL-1.1",
      "ZPL-2.0",
      "ZPL-2.1",
      "Zed",
      "Zeeff",
      "Zend-2.0",
      "Zimbra-1.3",
      "Zimbra-1.4",
      "Zlib",
      "any-OSI",
      "any-OSI-perl-modules",
      "bcrypt-Solar-Designer",
      "blessing",
      "bzip2-1.0.6",
      "check-cvs",
      "checkmk",
      "copyleft-next-0.3.0",
      "copyleft-next-0.3.1",
      "curl",
      "cve-tou",
      "diffmark",
      "dtoa",
      "dvipdfm",
      "eGenix",
      "etalab-2.0",
      "fwlw",
      "gSOAP-1.3b",
      "generic-xts",
      "gnuplot",
      "gtkbook",
      "hdparm",
      "iMatix",
      "libpng-2.0",
      "libselinux-1.0",
      "libtiff",
      "libutil-David-Nugent",
      "lsof",
      "magaz",
      "mailprio",
      "metamail",
      "mpi-permissive",
      "mpich2",
      "mplus",
      "pkgconf",
      "pnmstitch",
      "psfrag",
      "psutils",
      "python-ldap",
      "radvd",
      "snprintf",
      "softSurfer",
      "ssh-keyscan",
      "swrule",
      "threeparttable",
      "ulem",
      "w3m",
      "wwl",
      "xinetd",
      "xkeyboard-config-Zinoviev",
      "xlock",
      "xpp",
      "xzoom",
      "zlib-acknowledgement"
    ];
  }
});

// node_modules/spdx-license-ids/deprecated.json
var require_deprecated = __commonJS({
  "node_modules/spdx-license-ids/deprecated.json"(exports, module) {
    module.exports = [
      "AGPL-1.0",
      "AGPL-3.0",
      "BSD-2-Clause-FreeBSD",
      "BSD-2-Clause-NetBSD",
      "GFDL-1.1",
      "GFDL-1.2",
      "GFDL-1.3",
      "GPL-1.0",
      "GPL-2.0",
      "GPL-2.0-with-GCC-exception",
      "GPL-2.0-with-autoconf-exception",
      "GPL-2.0-with-bison-exception",
      "GPL-2.0-with-classpath-exception",
      "GPL-2.0-with-font-exception",
      "GPL-3.0",
      "GPL-3.0-with-GCC-exception",
      "GPL-3.0-with-autoconf-exception",
      "LGPL-2.0",
      "LGPL-2.1",
      "LGPL-3.0",
      "Net-SNMP",
      "Nunit",
      "StandardML-NJ",
      "bzip2-1.0.5",
      "eCos-2.0",
      "wxWindows"
    ];
  }
});

// node_modules/spdx-exceptions/index.json
var require_spdx_exceptions = __commonJS({
  "node_modules/spdx-exceptions/index.json"(exports, module) {
    module.exports = [
      "389-exception",
      "Asterisk-exception",
      "Autoconf-exception-2.0",
      "Autoconf-exception-3.0",
      "Autoconf-exception-generic",
      "Autoconf-exception-generic-3.0",
      "Autoconf-exception-macro",
      "Bison-exception-1.24",
      "Bison-exception-2.2",
      "Bootloader-exception",
      "Classpath-exception-2.0",
      "CLISP-exception-2.0",
      "cryptsetup-OpenSSL-exception",
      "DigiRule-FOSS-exception",
      "eCos-exception-2.0",
      "Fawkes-Runtime-exception",
      "FLTK-exception",
      "fmt-exception",
      "Font-exception-2.0",
      "freertos-exception-2.0",
      "GCC-exception-2.0",
      "GCC-exception-2.0-note",
      "GCC-exception-3.1",
      "Gmsh-exception",
      "GNAT-exception",
      "GNOME-examples-exception",
      "GNU-compiler-exception",
      "gnu-javamail-exception",
      "GPL-3.0-interface-exception",
      "GPL-3.0-linking-exception",
      "GPL-3.0-linking-source-exception",
      "GPL-CC-1.0",
      "GStreamer-exception-2005",
      "GStreamer-exception-2008",
      "i2p-gpl-java-exception",
      "KiCad-libraries-exception",
      "LGPL-3.0-linking-exception",
      "libpri-OpenH323-exception",
      "Libtool-exception",
      "Linux-syscall-note",
      "LLGPL",
      "LLVM-exception",
      "LZMA-exception",
      "mif-exception",
      "OCaml-LGPL-linking-exception",
      "OCCT-exception-1.0",
      "OpenJDK-assembly-exception-1.0",
      "openvpn-openssl-exception",
      "PS-or-PDF-font-exception-20170817",
      "QPL-1.0-INRIA-2004-exception",
      "Qt-GPL-exception-1.0",
      "Qt-LGPL-exception-1.1",
      "Qwt-exception-1.0",
      "SANE-exception",
      "SHL-2.0",
      "SHL-2.1",
      "stunnel-exception",
      "SWI-exception",
      "Swift-exception",
      "Texinfo-exception",
      "u-boot-exception-2.0",
      "UBDL-exception",
      "Universal-FOSS-exception-1.0",
      "vsftpd-openssl-exception",
      "WxWindows-exception-3.1",
      "x11vnc-openssl-exception"
    ];
  }
});

// node_modules/spdx-expression-parse/scan.js
var require_scan = __commonJS({
  "node_modules/spdx-expression-parse/scan.js"(exports, module) {
    "use strict";
    var licenses2 = [].concat(require_spdx_license_ids()).concat(require_deprecated());
    var exceptions = require_spdx_exceptions();
    module.exports = function(source) {
      var index = 0;
      function hasMore() {
        return index < source.length;
      }
      function read(value) {
        if (value instanceof RegExp) {
          var chars = source.slice(index);
          var match2 = chars.match(value);
          if (match2) {
            index += match2[0].length;
            return match2[0];
          }
        } else {
          if (source.indexOf(value, index) === index) {
            index += value.length;
            return value;
          }
        }
      }
      function skipWhitespace() {
        read(/[ ]*/);
      }
      function operator() {
        var string;
        var possibilities = ["WITH", "AND", "OR", "(", ")", ":", "+"];
        for (var i = 0; i < possibilities.length; i++) {
          string = read(possibilities[i]);
          if (string) {
            break;
          }
        }
        if (string === "+" && index > 1 && source[index - 2] === " ") {
          throw new Error("Space before `+`");
        }
        return string && {
          type: "OPERATOR",
          string
        };
      }
      function idstring() {
        return read(/[A-Za-z0-9-.]+/);
      }
      function expectIdstring() {
        var string = idstring();
        if (!string) {
          throw new Error("Expected idstring at offset " + index);
        }
        return string;
      }
      function documentRef() {
        if (read("DocumentRef-")) {
          var string = expectIdstring();
          return { type: "DOCUMENTREF", string };
        }
      }
      function licenseRef() {
        if (read("LicenseRef-")) {
          var string = expectIdstring();
          return { type: "LICENSEREF", string };
        }
      }
      function identifier() {
        var begin = index;
        var string = idstring();
        if (licenses2.indexOf(string) !== -1) {
          return {
            type: "LICENSE",
            string
          };
        } else if (exceptions.indexOf(string) !== -1) {
          return {
            type: "EXCEPTION",
            string
          };
        }
        index = begin;
      }
      function parseToken() {
        return operator() || documentRef() || licenseRef() || identifier();
      }
      var tokens = [];
      while (hasMore()) {
        skipWhitespace();
        if (!hasMore()) {
          break;
        }
        var token = parseToken();
        if (!token) {
          throw new Error("Unexpected `" + source[index] + "` at offset " + index);
        }
        tokens.push(token);
      }
      return tokens;
    };
  }
});

// node_modules/spdx-expression-parse/parse.js
var require_parse = __commonJS({
  "node_modules/spdx-expression-parse/parse.js"(exports, module) {
    "use strict";
    module.exports = function(tokens) {
      var index = 0;
      function hasMore() {
        return index < tokens.length;
      }
      function token() {
        return hasMore() ? tokens[index] : null;
      }
      function next() {
        if (!hasMore()) {
          throw new Error();
        }
        index++;
      }
      function parseOperator(operator) {
        var t = token();
        if (t && t.type === "OPERATOR" && operator === t.string) {
          next();
          return t.string;
        }
      }
      function parseWith() {
        if (parseOperator("WITH")) {
          var t = token();
          if (t && t.type === "EXCEPTION") {
            next();
            return t.string;
          }
          throw new Error("Expected exception after `WITH`");
        }
      }
      function parseLicenseRef() {
        var begin = index;
        var string = "";
        var t = token();
        if (t.type === "DOCUMENTREF") {
          next();
          string += "DocumentRef-" + t.string + ":";
          if (!parseOperator(":")) {
            throw new Error("Expected `:` after `DocumentRef-...`");
          }
        }
        t = token();
        if (t.type === "LICENSEREF") {
          next();
          string += "LicenseRef-" + t.string;
          return { license: string };
        }
        index = begin;
      }
      function parseLicense() {
        var t = token();
        if (t && t.type === "LICENSE") {
          next();
          var node2 = { license: t.string };
          if (parseOperator("+")) {
            node2.plus = true;
          }
          var exception2 = parseWith();
          if (exception2) {
            node2.exception = exception2;
          }
          return node2;
        }
      }
      function parseParenthesizedExpression() {
        var left = parseOperator("(");
        if (!left) {
          return;
        }
        var expr = parseExpression();
        if (!parseOperator(")")) {
          throw new Error("Expected `)`");
        }
        return expr;
      }
      function parseAtom() {
        return parseParenthesizedExpression() || parseLicenseRef() || parseLicense();
      }
      function makeBinaryOpParser(operator, nextParser) {
        return function parseBinaryOp() {
          var left = nextParser();
          if (!left) {
            return;
          }
          if (!parseOperator(operator)) {
            return left;
          }
          var right = parseBinaryOp();
          if (!right) {
            throw new Error("Expected expression");
          }
          return {
            left,
            conjunction: operator.toLowerCase(),
            right
          };
        };
      }
      var parseAnd = makeBinaryOpParser("AND", parseAtom);
      var parseExpression = makeBinaryOpParser("OR", parseAnd);
      var node = parseExpression();
      if (!node || hasMore()) {
        throw new Error("Syntax error");
      }
      return node;
    };
  }
});

// node_modules/spdx-expression-parse/index.js
var require_spdx_expression_parse = __commonJS({
  "node_modules/spdx-expression-parse/index.js"(exports, module) {
    "use strict";
    var scan = require_scan();
    var parse3 = require_parse();
    module.exports = function(source) {
      return parse3(scan(source));
    };
  }
});

// node_modules/spdx-correct/index.js
var require_spdx_correct = __commonJS({
  "node_modules/spdx-correct/index.js"(exports, module) {
    var parse3 = require_spdx_expression_parse();
    var spdxLicenseIds = require_spdx_license_ids();
    function valid(string) {
      try {
        parse3(string);
        return true;
      } catch (error) {
        return false;
      }
    }
    function sortTranspositions(a, b) {
      var length = b[0].length - a[0].length;
      if (length !== 0) return length;
      return a[0].toUpperCase().localeCompare(b[0].toUpperCase());
    }
    var transpositions = [
      ["APGL", "AGPL"],
      ["Gpl", "GPL"],
      ["GLP", "GPL"],
      ["APL", "Apache"],
      ["ISD", "ISC"],
      ["GLP", "GPL"],
      ["IST", "ISC"],
      ["Claude", "Clause"],
      [" or later", "+"],
      [" International", ""],
      ["GNU", "GPL"],
      ["GUN", "GPL"],
      ["+", ""],
      ["GNU GPL", "GPL"],
      ["GNU LGPL", "LGPL"],
      ["GNU/GPL", "GPL"],
      ["GNU GLP", "GPL"],
      ["GNU LESSER GENERAL PUBLIC LICENSE", "LGPL"],
      ["GNU Lesser General Public License", "LGPL"],
      ["GNU LESSER GENERAL PUBLIC LICENSE", "LGPL-2.1"],
      ["GNU Lesser General Public License", "LGPL-2.1"],
      ["LESSER GENERAL PUBLIC LICENSE", "LGPL"],
      ["Lesser General Public License", "LGPL"],
      ["LESSER GENERAL PUBLIC LICENSE", "LGPL-2.1"],
      ["Lesser General Public License", "LGPL-2.1"],
      ["GNU General Public License", "GPL"],
      ["Gnu public license", "GPL"],
      ["GNU Public License", "GPL"],
      ["GNU GENERAL PUBLIC LICENSE", "GPL"],
      ["MTI", "MIT"],
      ["Mozilla Public License", "MPL"],
      ["Universal Permissive License", "UPL"],
      ["WTH", "WTF"],
      ["WTFGPL", "WTFPL"],
      ["-License", ""]
    ].sort(sortTranspositions);
    var TRANSPOSED = 0;
    var CORRECT = 1;
    var transforms = [
      // e.g. 'mit'
      function(argument) {
        return argument.toUpperCase();
      },
      // e.g. 'MIT '
      function(argument) {
        return argument.trim();
      },
      // e.g. 'M.I.T.'
      function(argument) {
        return argument.replace(/\./g, "");
      },
      // e.g. 'Apache- 2.0'
      function(argument) {
        return argument.replace(/\s+/g, "");
      },
      // e.g. 'CC BY 4.0''
      function(argument) {
        return argument.replace(/\s+/g, "-");
      },
      // e.g. 'LGPLv2.1'
      function(argument) {
        return argument.replace("v", "-");
      },
      // e.g. 'Apache 2.0'
      function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1");
      },
      // e.g. 'GPL 2'
      function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1.0");
      },
      // e.g. 'Apache Version 2.0'
      function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2");
      },
      // e.g. 'Apache Version 2'
      function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2.0");
      },
      // e.g. 'ZLIB'
      function(argument) {
        return argument[0].toUpperCase() + argument.slice(1);
      },
      // e.g. 'MPL/2.0'
      function(argument) {
        return argument.replace("/", "-");
      },
      // e.g. 'Apache 2'
      function(argument) {
        return argument.replace(/\s*V\s*(\d)/, "-$1").replace(/(\d)$/, "$1.0");
      },
      // e.g. 'GPL-2.0', 'GPL-3.0'
      function(argument) {
        if (argument.indexOf("3.0") !== -1) {
          return argument + "-or-later";
        } else {
          return argument + "-only";
        }
      },
      // e.g. 'GPL-2.0-'
      function(argument) {
        return argument + "only";
      },
      // e.g. 'GPL2'
      function(argument) {
        return argument.replace(/(\d)$/, "-$1.0");
      },
      // e.g. 'BSD 3'
      function(argument) {
        return argument.replace(/(-| )?(\d)$/, "-$2-Clause");
      },
      // e.g. 'BSD clause 3'
      function(argument) {
        return argument.replace(/(-| )clause(-| )(\d)/, "-$3-Clause");
      },
      // e.g. 'New BSD license'
      function(argument) {
        return argument.replace(/\b(Modified|New|Revised)(-| )?BSD((-| )License)?/i, "BSD-3-Clause");
      },
      // e.g. 'Simplified BSD license'
      function(argument) {
        return argument.replace(/\bSimplified(-| )?BSD((-| )License)?/i, "BSD-2-Clause");
      },
      // e.g. 'Free BSD license'
      function(argument) {
        return argument.replace(/\b(Free|Net)(-| )?BSD((-| )License)?/i, "BSD-2-Clause-$1BSD");
      },
      // e.g. 'Clear BSD license'
      function(argument) {
        return argument.replace(/\bClear(-| )?BSD((-| )License)?/i, "BSD-3-Clause-Clear");
      },
      // e.g. 'Old BSD License'
      function(argument) {
        return argument.replace(/\b(Old|Original)(-| )?BSD((-| )License)?/i, "BSD-4-Clause");
      },
      // e.g. 'BY-NC-4.0'
      function(argument) {
        return "CC-" + argument;
      },
      // e.g. 'BY-NC'
      function(argument) {
        return "CC-" + argument + "-4.0";
      },
      // e.g. 'Attribution-NonCommercial'
      function(argument) {
        return argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "");
      },
      // e.g. 'Attribution-NonCommercial'
      function(argument) {
        return "CC-" + argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "") + "-4.0";
      }
    ];
    var licensesWithVersions = spdxLicenseIds.map(function(id) {
      var match2 = /^(.*)-\d+\.\d+$/.exec(id);
      return match2 ? [match2[0], match2[1]] : [id, null];
    }).reduce(function(objectMap, item) {
      var key = item[1];
      objectMap[key] = objectMap[key] || [];
      objectMap[key].push(item[0]);
      return objectMap;
    }, {});
    var licensesWithOneVersion = Object.keys(licensesWithVersions).map(function makeEntries(key) {
      return [key, licensesWithVersions[key]];
    }).filter(function identifySoleVersions(item) {
      return (
        // Licenses has just one valid version suffix.
        item[1].length === 1 && item[0] !== null && // APL will be considered Apache, rather than APL-1.0
        item[0] !== "APL"
      );
    }).map(function createLastResorts(item) {
      return [item[0], item[1][0]];
    });
    licensesWithVersions = void 0;
    var lastResorts = [
      ["UNLI", "Unlicense"],
      ["WTF", "WTFPL"],
      ["2 CLAUSE", "BSD-2-Clause"],
      ["2-CLAUSE", "BSD-2-Clause"],
      ["3 CLAUSE", "BSD-3-Clause"],
      ["3-CLAUSE", "BSD-3-Clause"],
      ["AFFERO", "AGPL-3.0-or-later"],
      ["AGPL", "AGPL-3.0-or-later"],
      ["APACHE", "Apache-2.0"],
      ["ARTISTIC", "Artistic-2.0"],
      ["Affero", "AGPL-3.0-or-later"],
      ["BEER", "Beerware"],
      ["BOOST", "BSL-1.0"],
      ["BSD", "BSD-2-Clause"],
      ["CDDL", "CDDL-1.1"],
      ["ECLIPSE", "EPL-1.0"],
      ["FUCK", "WTFPL"],
      ["GNU", "GPL-3.0-or-later"],
      ["LGPL", "LGPL-3.0-or-later"],
      ["GPLV1", "GPL-1.0-only"],
      ["GPL-1", "GPL-1.0-only"],
      ["GPLV2", "GPL-2.0-only"],
      ["GPL-2", "GPL-2.0-only"],
      ["GPL", "GPL-3.0-or-later"],
      ["MIT +NO-FALSE-ATTRIBS", "MITNFA"],
      ["MIT", "MIT"],
      ["MPL", "MPL-2.0"],
      ["X11", "X11"],
      ["ZLIB", "Zlib"]
    ].concat(licensesWithOneVersion).sort(sortTranspositions);
    var SUBSTRING = 0;
    var IDENTIFIER = 1;
    var validTransformation = function(identifier) {
      for (var i = 0; i < transforms.length; i++) {
        var transformed = transforms[i](identifier).trim();
        if (transformed !== identifier && valid(transformed)) {
          return transformed;
        }
      }
      return null;
    };
    var validLastResort = function(identifier) {
      var upperCased = identifier.toUpperCase();
      for (var i = 0; i < lastResorts.length; i++) {
        var lastResort = lastResorts[i];
        if (upperCased.indexOf(lastResort[SUBSTRING]) > -1) {
          return lastResort[IDENTIFIER];
        }
      }
      return null;
    };
    var anyCorrection = function(identifier, check) {
      for (var i = 0; i < transpositions.length; i++) {
        var transposition = transpositions[i];
        var transposed = transposition[TRANSPOSED];
        if (identifier.indexOf(transposed) > -1) {
          var corrected = identifier.replace(
            transposed,
            transposition[CORRECT]
          );
          var checked = check(corrected);
          if (checked !== null) {
            return checked;
          }
        }
      }
      return null;
    };
    module.exports = function(identifier, options) {
      options = options || {};
      var upgrade = options.upgrade === void 0 ? true : !!options.upgrade;
      function postprocess(value) {
        return upgrade ? upgradeGPLs(value) : value;
      }
      var validArugment = typeof identifier === "string" && identifier.trim().length !== 0;
      if (!validArugment) {
        throw Error("Invalid argument. Expected non-empty string.");
      }
      identifier = identifier.trim();
      if (valid(identifier)) {
        return postprocess(identifier);
      }
      var noPlus = identifier.replace(/\+$/, "").trim();
      if (valid(noPlus)) {
        return postprocess(noPlus);
      }
      var transformed = validTransformation(identifier);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = anyCorrection(identifier, function(argument) {
        if (valid(argument)) {
          return argument;
        }
        return validTransformation(argument);
      });
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = validLastResort(identifier);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = anyCorrection(identifier, validLastResort);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      return null;
    };
    function upgradeGPLs(value) {
      if ([
        "GPL-1.0",
        "LGPL-1.0",
        "AGPL-1.0",
        "GPL-2.0",
        "LGPL-2.0",
        "AGPL-2.0",
        "LGPL-2.1"
      ].indexOf(value) !== -1) {
        return value + "-only";
      } else if ([
        "GPL-1.0+",
        "GPL-2.0+",
        "GPL-3.0+",
        "LGPL-2.0+",
        "LGPL-2.1+",
        "LGPL-3.0+",
        "AGPL-1.0+",
        "AGPL-3.0+"
      ].indexOf(value) !== -1) {
        return value.replace(/\+$/, "-or-later");
      } else if (["GPL-3.0", "LGPL-3.0", "AGPL-3.0"].indexOf(value) !== -1) {
        return value + "-or-later";
      } else {
        return value;
      }
    }
  }
});

// node_modules/minimatch/dist/esm/index.js
var import_brace_expansion = __toESM(require_brace_expansion(), 1);

// node_modules/minimatch/dist/esm/assert-valid-pattern.js
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = (pattern) => {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};

// node_modules/minimatch/dist/esm/brace-expressions.js
var posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rangesToString = (ranges) => ranges.join("");
var parseClass = (glob2, position) => {
  const pos = position;
  if (glob2.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i < glob2.length) {
    const c = glob2.charAt(i);
    if ((c === "!" || c === "^") && i === pos + 1) {
      negate = true;
      i++;
      continue;
    }
    if (c === "]" && sawStart && !escaping) {
      endPos = i + 1;
      break;
    }
    sawStart = true;
    if (c === "\\") {
      if (!escaping) {
        escaping = true;
        i++;
        continue;
      }
    }
    if (c === "[" && !escaping) {
      for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
        if (glob2.startsWith(cls, i)) {
          if (rangeStart) {
            return ["$.", false, glob2.length - pos, true];
          }
          i += cls.length;
          if (neg)
            negs.push(unip);
          else
            ranges.push(unip);
          uflag = uflag || u;
          continue WHILE;
        }
      }
    }
    escaping = false;
    if (rangeStart) {
      if (c > rangeStart) {
        ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
      } else if (c === rangeStart) {
        ranges.push(braceEscape(c));
      }
      rangeStart = "";
      i++;
      continue;
    }
    if (glob2.startsWith("-]", i + 1)) {
      ranges.push(braceEscape(c + "-"));
      i += 2;
      continue;
    }
    if (glob2.startsWith("-", i + 1)) {
      rangeStart = c;
      i += 2;
      continue;
    }
    ranges.push(braceEscape(c));
    i++;
  }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob2.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};

// node_modules/minimatch/dist/esm/unescape.js
var unescape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};

// node_modules/minimatch/dist/esm/ast.js
var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var isExtglobType = (c) => types.has(c);
var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
var startNoDot = "(?!\\.)";
var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
var justDots = /* @__PURE__ */ new Set(["..", "."]);
var reSpecials = new Set("().*{}+?[]^$\\!");
var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var qmark = "[^/]";
var star = qmark + "*?";
var starNoEmpty = qmark + "+?";
var AST = class _AST {
  type;
  #root;
  #hasMagic;
  #uflag = false;
  #parts = [];
  #parent;
  #parentIndex;
  #negs;
  #filledNegs = false;
  #options;
  #toString;
  // set to true if it's an extglob with no children
  // (which really means one child of '')
  #emptyExt = false;
  constructor(type2, parent2, options = {}) {
    this.type = type2;
    if (type2)
      this.#hasMagic = true;
    this.#parent = parent2;
    this.#root = this.#parent ? this.#parent.#root : this;
    this.#options = this.#root === this ? options : this.#root.#options;
    this.#negs = this.#root === this ? [] : this.#root.#negs;
    if (type2 === "!" && !this.#root.#filledNegs)
      this.#negs.push(this);
    this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
  }
  get hasMagic() {
    if (this.#hasMagic !== void 0)
      return this.#hasMagic;
    for (const p of this.#parts) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return this.#hasMagic = true;
    }
    return this.#hasMagic;
  }
  // reconstructs the pattern
  toString() {
    if (this.#toString !== void 0)
      return this.#toString;
    if (!this.type) {
      return this.#toString = this.#parts.map((p) => String(p)).join("");
    } else {
      return this.#toString = this.type + "(" + this.#parts.map((p) => String(p)).join("|") + ")";
    }
  }
  #fillNegs() {
    if (this !== this.#root)
      throw new Error("should only call on root");
    if (this.#filledNegs)
      return this;
    this.toString();
    this.#filledNegs = true;
    let n;
    while (n = this.#negs.pop()) {
      if (n.type !== "!")
        continue;
      let p = n;
      let pp = p.#parent;
      while (pp) {
        for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
          for (const part of n.#parts) {
            if (typeof part === "string") {
              throw new Error("string part in extglob AST??");
            }
            part.copyIn(pp.#parts[i]);
          }
        }
        p = pp;
        pp = p.#parent;
      }
    }
    return this;
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _AST && p.#parent === this)) {
        throw new Error("invalid part: " + p);
      }
      this.#parts.push(p);
    }
  }
  toJSON() {
    const ret = this.type === null ? this.#parts.slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...this.#parts.map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === this.#root || this.#root.#filledNegs && this.#parent?.type === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    if (this.#root === this)
      return true;
    if (!this.#parent?.isStart())
      return false;
    if (this.#parentIndex === 0)
      return true;
    const p = this.#parent;
    for (let i = 0; i < this.#parentIndex; i++) {
      const pp = p.#parts[i];
      if (!(pp instanceof _AST && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    if (this.#root === this)
      return true;
    if (this.#parent?.type === "!")
      return true;
    if (!this.#parent?.isEnd())
      return false;
    if (!this.type)
      return this.#parent?.isEnd();
    const pl = this.#parent ? this.#parent.#parts.length : 0;
    return this.#parentIndex === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent2) {
    const c = new _AST(this.type, parent2);
    for (const p of this.#parts) {
      c.copyIn(p);
    }
    return c;
  }
  static #parseAST(str2, ast, pos, opt) {
    let escaping = false;
    let inBrace = false;
    let braceStart = -1;
    let braceNeg = false;
    if (ast.type === null) {
      let i2 = pos;
      let acc2 = "";
      while (i2 < str2.length) {
        const c = str2.charAt(i2++);
        if (escaping || c === "\\") {
          escaping = !escaping;
          acc2 += c;
          continue;
        }
        if (inBrace) {
          if (i2 === braceStart + 1) {
            if (c === "^" || c === "!") {
              braceNeg = true;
            }
          } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
            inBrace = false;
          }
          acc2 += c;
          continue;
        } else if (c === "[") {
          inBrace = true;
          braceStart = i2;
          braceNeg = false;
          acc2 += c;
          continue;
        }
        if (!opt.noext && isExtglobType(c) && str2.charAt(i2) === "(") {
          ast.push(acc2);
          acc2 = "";
          const ext2 = new _AST(c, ast);
          i2 = _AST.#parseAST(str2, ext2, i2, opt);
          ast.push(ext2);
          continue;
        }
        acc2 += c;
      }
      ast.push(acc2);
      return i2;
    }
    let i = pos + 1;
    let part = new _AST(null, ast);
    const parts = [];
    let acc = "";
    while (i < str2.length) {
      const c = str2.charAt(i++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc += c;
        continue;
      }
      if (inBrace) {
        if (i === braceStart + 1) {
          if (c === "^" || c === "!") {
            braceNeg = true;
          }
        } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i;
        braceNeg = false;
        acc += c;
        continue;
      }
      if (isExtglobType(c) && str2.charAt(i) === "(") {
        part.push(acc);
        acc = "";
        const ext2 = new _AST(c, part);
        part.push(ext2);
        i = _AST.#parseAST(str2, ext2, i, opt);
        continue;
      }
      if (c === "|") {
        part.push(acc);
        acc = "";
        parts.push(part);
        part = new _AST(null, ast);
        continue;
      }
      if (c === ")") {
        if (acc === "" && ast.#parts.length === 0) {
          ast.#emptyExt = true;
        }
        part.push(acc);
        acc = "";
        ast.push(...parts, part);
        return i;
      }
      acc += c;
    }
    ast.type = null;
    ast.#hasMagic = void 0;
    ast.#parts = [str2.substring(pos - 1)];
    return i;
  }
  static fromGlob(pattern, options = {}) {
    const ast = new _AST(null, void 0, options);
    _AST.#parseAST(pattern, ast, 0, options);
    return ast;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== this.#root)
      return this.#root.toMMPattern();
    const glob2 = this.toString();
    const [re, body, hasMagic2, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic2 || this.#hasMagic || this.#options.nocase && !this.#options.nocaseMagicOnly && glob2.toUpperCase() !== glob2.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (this.#options.nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob2
    });
  }
  get options() {
    return this.#options;
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    const dot = allowDot ?? !!this.#options.dot;
    if (this.#root === this)
      this.#fillNegs();
    if (!this.type) {
      const noEmpty = this.isStart() && this.isEnd();
      const src = this.#parts.map((p) => {
        const [re, _, hasMagic2, uflag] = typeof p === "string" ? _AST.#parseGlob(p, this.#hasMagic, noEmpty) : p.toRegExpSource(allowDot);
        this.#hasMagic = this.#hasMagic || hasMagic2;
        this.#uflag = this.#uflag || uflag;
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof this.#parts[0] === "string") {
          const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && this.#root.#filledNegs && this.#parent?.type === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        unescape(src),
        this.#hasMagic = !!this.#hasMagic,
        this.#uflag
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = this.#partsToRegExp(dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      this.#parts = [s];
      this.type = null;
      this.#hasMagic = void 0;
      return [s, unescape(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : this.#partsToRegExp(true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && this.#emptyExt) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      unescape(body),
      this.#hasMagic = !!this.#hasMagic,
      this.#uflag
    ];
  }
  #partsToRegExp(dot) {
    return this.#parts.map((p) => {
      if (typeof p === "string") {
        throw new Error("string type in extglob ast??");
      }
      const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
      this.#uflag = this.#uflag || uflag;
      return re;
    }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
  }
  static #parseGlob(glob2, hasMagic2, noEmpty = false) {
    let escaping = false;
    let re = "";
    let uflag = false;
    for (let i = 0; i < glob2.length; i++) {
      const c = glob2.charAt(i);
      if (escaping) {
        escaping = false;
        re += (reSpecials.has(c) ? "\\" : "") + c;
        continue;
      }
      if (c === "\\") {
        if (i === glob2.length - 1) {
          re += "\\\\";
        } else {
          escaping = true;
        }
        continue;
      }
      if (c === "[") {
        const [src, needUflag, consumed, magic] = parseClass(glob2, i);
        if (consumed) {
          re += src;
          uflag = uflag || needUflag;
          i += consumed - 1;
          hasMagic2 = hasMagic2 || magic;
          continue;
        }
      }
      if (c === "*") {
        if (noEmpty && glob2 === "*")
          re += starNoEmpty;
        else
          re += star;
        hasMagic2 = true;
        continue;
      }
      if (c === "?") {
        re += qmark;
        hasMagic2 = true;
        continue;
      }
      re += regExpEscape(c);
    }
    return [re, unescape(glob2), !!hasMagic2, uflag];
  }
};

// node_modules/minimatch/dist/esm/escape.js
var escape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

// node_modules/minimatch/dist/esm/index.js
var minimatch = (p, pattern, options = {}) => {
  assertValidPattern(pattern);
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options).match(p);
};
var starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
var starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
var starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
var starDotExtTestNocase = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
};
var starDotExtTestNocaseDot = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => f.toLowerCase().endsWith(ext2);
};
var starDotStarRE = /^\*+\.\*+$/;
var starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
var starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
var dotStarRE = /^\.\*+$/;
var dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
var starRE = /^\*+$/;
var starTest = (f) => f.length !== 0 && !f.startsWith(".");
var starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
var qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
var qmarksTestNocase = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTest = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTestNoExt = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && !f.startsWith(".");
};
var qmarksTestNoExtDot = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && f !== "." && f !== "..";
};
var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var path = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
minimatch.sep = sep;
var GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
var qmark2 = "[^/]";
var star2 = qmark2 + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
minimatch.filter = filter;
var ext = (a, b = {}) => Object.assign({}, a, b);
var defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
  return Object.assign(m, {
    Minimatch: class Minimatch extends orig.Minimatch {
      constructor(pattern, options = {}) {
        super(pattern, ext(def, options));
      }
      static defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      }
    },
    AST: class AST extends orig.AST {
      /* c8 ignore start */
      constructor(type2, parent2, options = {}) {
        super(type2, parent2, ext(def, options));
      }
      /* c8 ignore stop */
      static fromGlob(pattern, options = {}) {
        return orig.AST.fromGlob(pattern, ext(def, options));
      }
    },
    unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
    escape: (s, options = {}) => orig.escape(s, ext(def, options)),
    filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
    defaults: (options) => orig.defaults(ext(def, options)),
    makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
    braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
    match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
    sep: orig.sep,
    GLOBSTAR
  });
};
minimatch.defaults = defaults;
var braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return (0, import_brace_expansion.default)(pattern);
};
minimatch.braceExpand = braceExpand;
var makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
var match = (list, pattern, options = {}) => {
  const mm = new Minimatch(pattern, options);
  list = list.filter((f) => mm.match(f));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
minimatch.match = match;
var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
var regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var Minimatch = class {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(pattern, options = {}) {
    assertValidPattern(pattern);
    options = options || {};
    this.options = options;
    this.pattern = pattern;
    this.platform = options.platform || defaultPlatform;
    this.isWindows = this.platform === "win32";
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
    this.regexp = null;
    this.negate = false;
    this.nonegate = !!options.nonegate;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.nocase = !!this.options.nocase;
    this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
    this.globSet = [];
    this.globParts = [];
    this.set = [];
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return true;
    }
    for (const pattern of this.set) {
      for (const part of pattern) {
        if (typeof part !== "string")
          return true;
      }
    }
    return false;
  }
  debug(..._) {
  }
  make() {
    const pattern = this.pattern;
    const options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    this.globSet = [...new Set(this.braceExpand())];
    if (options.debug) {
      this.debug = (...args) => console.error(...args);
    }
    this.debug(this.pattern, this.globSet);
    const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(rawGlobParts);
    this.debug(this.pattern, this.globParts);
    let set2 = this.globParts.map((s, _, __) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
        const isDrive = /^[a-z]:/i.test(s[0]);
        if (isUNC) {
          return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
        } else if (isDrive) {
          return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
        }
      }
      return s.map((ss) => this.parse(ss));
    });
    this.debug(this.pattern, set2);
    this.set = set2.filter((s) => s.indexOf(false) === -1);
    if (this.isWindows) {
      for (let i = 0; i < this.set.length; i++) {
        const p = this.set[i];
        if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
          p[2] = "?";
        }
      }
    }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(globParts) {
    if (this.options.noglobstar) {
      for (let i = 0; i < globParts.length; i++) {
        for (let j = 0; j < globParts[i].length; j++) {
          if (globParts[i][j] === "**") {
            globParts[i][j] = "*";
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      globParts = this.firstPhasePreProcess(globParts);
      globParts = this.secondPhasePreProcess(globParts);
    } else if (optimizationLevel >= 1) {
      globParts = this.levelOneOptimize(globParts);
    } else {
      globParts = this.adjascentGlobstarOptimize(globParts);
    }
    return globParts;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(globParts) {
    return globParts.map((parts) => {
      let gs = -1;
      while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
        let i = gs;
        while (parts[i + 1] === "**") {
          i++;
        }
        if (i !== gs) {
          parts.splice(gs, i - gs);
        }
      }
      return parts;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(globParts) {
    return globParts.map((parts) => {
      parts = parts.reduce((set2, part) => {
        const prev = set2[set2.length - 1];
        if (part === "**" && prev === "**") {
          return set2;
        }
        if (part === "..") {
          if (prev && prev !== ".." && prev !== "." && prev !== "**") {
            set2.pop();
            return set2;
          }
        }
        set2.push(part);
        return set2;
      }, []);
      return parts.length === 0 ? [""] : parts;
    });
  }
  levelTwoFileOptimize(parts) {
    if (!Array.isArray(parts)) {
      parts = this.slashSplit(parts);
    }
    let didSomething = false;
    do {
      didSomething = false;
      if (!this.preserveMultipleSlashes) {
        for (let i = 1; i < parts.length - 1; i++) {
          const p = parts[i];
          if (i === 1 && p === "" && parts[0] === "")
            continue;
          if (p === "." || p === "") {
            didSomething = true;
            parts.splice(i, 1);
            i--;
          }
        }
        if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
          didSomething = true;
          parts.pop();
        }
      }
      let dd = 0;
      while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
        const p = parts[dd - 1];
        if (p && p !== "." && p !== ".." && p !== "**") {
          didSomething = true;
          parts.splice(dd - 1, 2);
          dd -= 2;
        }
      }
    } while (didSomething);
    return parts.length === 0 ? [""] : parts;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(globParts) {
    let didSomething = false;
    do {
      didSomething = false;
      for (let parts of globParts) {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let gss = gs;
          while (parts[gss + 1] === "**") {
            gss++;
          }
          if (gss > gs) {
            parts.splice(gs + 1, gss - gs);
          }
          let next = parts[gs + 1];
          const p = parts[gs + 2];
          const p2 = parts[gs + 3];
          if (next !== "..")
            continue;
          if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
            continue;
          }
          didSomething = true;
          parts.splice(gs, 1);
          const other = parts.slice(0);
          other[gs] = "**";
          globParts.push(other);
          gs--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            const needDot = dd === 1 && parts[dd + 1] === "**";
            const splin = needDot ? ["."] : [];
            parts.splice(dd - 1, 2, ...splin);
            if (parts.length === 0)
              parts.push("");
            dd -= 2;
          }
        }
      }
    } while (didSomething);
    return globParts;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(globParts) {
    for (let i = 0; i < globParts.length - 1; i++) {
      for (let j = i + 1; j < globParts.length; j++) {
        const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
        if (matched) {
          globParts[i] = [];
          globParts[j] = matched;
          break;
        }
      }
    }
    return globParts.filter((gs) => gs.length);
  }
  partsMatch(a, b, emptyGSMatch = false) {
    let ai = 0;
    let bi = 0;
    let result = [];
    let which = "";
    while (ai < a.length && bi < b.length) {
      if (a[ai] === b[bi]) {
        result.push(which === "b" ? b[bi] : a[ai]);
        ai++;
        bi++;
      } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
        result.push(a[ai]);
        ai++;
      } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
        result.push(b[bi]);
        bi++;
      } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result.push(a[ai]);
        ai++;
        bi++;
      } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result.push(b[bi]);
        ai++;
        bi++;
      } else {
        return false;
      }
    }
    return a.length === b.length && result;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file, pattern, partial = false) {
    const options = this.options;
    if (this.isWindows) {
      const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
      const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
      const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
      const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
      const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
      const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
      if (typeof fdi === "number" && typeof pdi === "number") {
        const [fd, pd] = [file[fdi], pattern[pdi]];
        if (fd.toLowerCase() === pd.toLowerCase()) {
          pattern[pdi] = fd;
          if (pdi > fdi) {
            pattern = pattern.slice(pdi);
          } else if (fdi > pdi) {
            file = file.slice(fdi);
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      file = this.levelTwoFileOptimize(file);
    }
    this.debug("matchOne", this, { file, pattern });
    this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false) {
        return false;
      }
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
          if (fr === fl) {
            return true;
          }
        }
        return false;
      }
      let hit;
      if (typeof p === "string") {
        hit = f === p;
        this.debug("string match", p, f, hit);
      } else {
        hit = p.test(f);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      return fi === fl - 1 && file[fi] === "";
    } else {
      throw new Error("wtf?");
    }
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern) {
    assertValidPattern(pattern);
    const options = this.options;
    if (pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    let m;
    let fastTest = null;
    if (m = pattern.match(starRE)) {
      fastTest = options.dot ? starTestDot : starTest;
    } else if (m = pattern.match(starDotExtRE)) {
      fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
    } else if (m = pattern.match(qmarksRE)) {
      fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
    } else if (m = pattern.match(starDotStarRE)) {
      fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
    } else if (m = pattern.match(dotStarRE)) {
      fastTest = dotStarTest;
    }
    const re = AST.fromGlob(pattern, this.options).toMMPattern();
    if (fastTest && typeof re === "object") {
      Reflect.defineProperty(re, "test", { value: fastTest });
    }
    return re;
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set2 = this.set;
    if (!set2.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options = this.options;
    const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
    const flags = new Set(options.nocase ? ["i"] : []);
    let re = set2.map((pattern) => {
      const pp = pattern.map((p) => {
        if (p instanceof RegExp) {
          for (const f of p.flags.split(""))
            flags.add(f);
        }
        return typeof p === "string" ? regExpEscape2(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
      });
      pp.forEach((p, i) => {
        const next = pp[i + 1];
        const prev = pp[i - 1];
        if (p !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i] = twoStar;
          }
        } else if (next === void 0) {
          pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i + 1] = GLOBSTAR;
        }
      });
      return pp.filter((p) => p !== GLOBSTAR).join("/");
    }).join("|");
    const [open, close] = set2.length > 1 ? ["(?:", ")"] : ["", ""];
    re = "^" + open + re + close + "$";
    if (this.negate)
      re = "^(?!" + re + ").+$";
    try {
      this.regexp = new RegExp(re, [...flags].join(""));
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(p) {
    if (this.preserveMultipleSlashes) {
      return p.split("/");
    } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
      return ["", ...p.split(/\/+/)];
    } else {
      return p.split(/\/+/);
    }
  }
  match(f, partial = this.partial) {
    this.debug("match", f, this.pattern);
    if (this.comment) {
      return false;
    }
    if (this.empty) {
      return f === "";
    }
    if (f === "/" && partial) {
      return true;
    }
    const options = this.options;
    if (this.isWindows) {
      f = f.split("\\").join("/");
    }
    const ff = this.slashSplit(f);
    this.debug(this.pattern, "split", ff);
    const set2 = this.set;
    this.debug(this.pattern, "set", set2);
    let filename = ff[ff.length - 1];
    if (!filename) {
      for (let i = ff.length - 2; !filename && i >= 0; i--) {
        filename = ff[i];
      }
    }
    for (let i = 0; i < set2.length; i++) {
      const pattern = set2[i];
      let file = ff;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) {
          return true;
        }
        return !this.negate;
      }
    }
    if (options.flipNegate) {
      return false;
    }
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

// node_modules/glob/dist/esm/glob.js
import { fileURLToPath as fileURLToPath2 } from "node:url";

// node_modules/lru-cache/dist/esm/index.js
var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
var warned = /* @__PURE__ */ new Set();
var PROCESS = typeof process === "object" && !!process ? process : {};
var emitWarning = (msg, type2, code, fn) => {
  typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type2, code, fn) : console.error(`[${code}] ${type2}: ${msg}`);
};
var AC = globalThis.AbortController;
var AS = globalThis.AbortSignal;
if (typeof AC === "undefined") {
  AS = class AbortSignal {
    onabort;
    _onabort = [];
    reason;
    aborted = false;
    addEventListener(_, fn) {
      this._onabort.push(fn);
    }
  };
  AC = class AbortController {
    constructor() {
      warnACPolyfill();
    }
    signal = new AS();
    abort(reason) {
      if (this.signal.aborted)
        return;
      this.signal.reason = reason;
      this.signal.aborted = true;
      for (const fn of this.signal._onabort) {
        fn(reason);
      }
      this.signal.onabort?.(reason);
    }
  };
  let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
  const warnACPolyfill = () => {
    if (!printACPolyfillWarning)
      return;
    printACPolyfillWarning = false;
    emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
  };
}
var shouldWarn = (code) => !warned.has(code);
var TYPE = Symbol("type");
var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
var ZeroArray = class extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
};
var Stack = class _Stack {
  heap;
  length;
  // private constructor
  static #constructing = false;
  static create(max) {
    const HeapCls = getUintArray(max);
    if (!HeapCls)
      return [];
    _Stack.#constructing = true;
    const s = new _Stack(max, HeapCls);
    _Stack.#constructing = false;
    return s;
  }
  constructor(max, HeapCls) {
    if (!_Stack.#constructing) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new HeapCls(max);
    this.length = 0;
  }
  push(n) {
    this.heap[this.length++] = n;
  }
  pop() {
    return this.heap[--this.length];
  }
};
var LRUCache = class _LRUCache {
  // options that cannot be changed without disaster
  #max;
  #maxSize;
  #dispose;
  #onInsert;
  #disposeAfter;
  #fetchMethod;
  #memoMethod;
  /**
   * {@link LRUCache.OptionsBase.ttl}
   */
  ttl;
  /**
   * {@link LRUCache.OptionsBase.ttlResolution}
   */
  ttlResolution;
  /**
   * {@link LRUCache.OptionsBase.ttlAutopurge}
   */
  ttlAutopurge;
  /**
   * {@link LRUCache.OptionsBase.updateAgeOnGet}
   */
  updateAgeOnGet;
  /**
   * {@link LRUCache.OptionsBase.updateAgeOnHas}
   */
  updateAgeOnHas;
  /**
   * {@link LRUCache.OptionsBase.allowStale}
   */
  allowStale;
  /**
   * {@link LRUCache.OptionsBase.noDisposeOnSet}
   */
  noDisposeOnSet;
  /**
   * {@link LRUCache.OptionsBase.noUpdateTTL}
   */
  noUpdateTTL;
  /**
   * {@link LRUCache.OptionsBase.maxEntrySize}
   */
  maxEntrySize;
  /**
   * {@link LRUCache.OptionsBase.sizeCalculation}
   */
  sizeCalculation;
  /**
   * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
   */
  noDeleteOnFetchRejection;
  /**
   * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
   */
  noDeleteOnStaleGet;
  /**
   * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
   */
  allowStaleOnFetchAbort;
  /**
   * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
   */
  allowStaleOnFetchRejection;
  /**
   * {@link LRUCache.OptionsBase.ignoreFetchAbort}
   */
  ignoreFetchAbort;
  // computed properties
  #size;
  #calculatedSize;
  #keyMap;
  #keyList;
  #valList;
  #next;
  #prev;
  #head;
  #tail;
  #free;
  #disposed;
  #sizes;
  #starts;
  #ttls;
  #hasDispose;
  #hasFetchMethod;
  #hasDisposeAfter;
  #hasOnInsert;
  /**
   * Do not call this method unless you need to inspect the
   * inner workings of the cache.  If anything returned by this
   * object is modified in any way, strange breakage may occur.
   *
   * These fields are private for a reason!
   *
   * @internal
   */
  static unsafeExposeInternals(c) {
    return {
      // properties
      starts: c.#starts,
      ttls: c.#ttls,
      sizes: c.#sizes,
      keyMap: c.#keyMap,
      keyList: c.#keyList,
      valList: c.#valList,
      next: c.#next,
      prev: c.#prev,
      get head() {
        return c.#head;
      },
      get tail() {
        return c.#tail;
      },
      free: c.#free,
      // methods
      isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
      backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
      moveToTail: (index) => c.#moveToTail(index),
      indexes: (options) => c.#indexes(options),
      rindexes: (options) => c.#rindexes(options),
      isStale: (index) => c.#isStale(index)
    };
  }
  // Protected read-only members
  /**
   * {@link LRUCache.OptionsBase.max} (read-only)
   */
  get max() {
    return this.#max;
  }
  /**
   * {@link LRUCache.OptionsBase.maxSize} (read-only)
   */
  get maxSize() {
    return this.#maxSize;
  }
  /**
   * The total computed size of items in the cache (read-only)
   */
  get calculatedSize() {
    return this.#calculatedSize;
  }
  /**
   * The number of items stored in the cache (read-only)
   */
  get size() {
    return this.#size;
  }
  /**
   * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
   */
  get fetchMethod() {
    return this.#fetchMethod;
  }
  get memoMethod() {
    return this.#memoMethod;
  }
  /**
   * {@link LRUCache.OptionsBase.dispose} (read-only)
   */
  get dispose() {
    return this.#dispose;
  }
  /**
   * {@link LRUCache.OptionsBase.onInsert} (read-only)
   */
  get onInsert() {
    return this.#onInsert;
  }
  /**
   * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
   */
  get disposeAfter() {
    return this.#disposeAfter;
  }
  constructor(options) {
    const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, onInsert, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    this.#max = max;
    this.#maxSize = maxSize;
    this.maxEntrySize = maxEntrySize || this.#maxSize;
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!this.#maxSize && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (memoMethod !== void 0 && typeof memoMethod !== "function") {
      throw new TypeError("memoMethod must be a function if defined");
    }
    this.#memoMethod = memoMethod;
    if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    this.#fetchMethod = fetchMethod;
    this.#hasFetchMethod = !!fetchMethod;
    this.#keyMap = /* @__PURE__ */ new Map();
    this.#keyList = new Array(max).fill(void 0);
    this.#valList = new Array(max).fill(void 0);
    this.#next = new UintArray(max);
    this.#prev = new UintArray(max);
    this.#head = 0;
    this.#tail = 0;
    this.#free = Stack.create(max);
    this.#size = 0;
    this.#calculatedSize = 0;
    if (typeof dispose === "function") {
      this.#dispose = dispose;
    }
    if (typeof onInsert === "function") {
      this.#onInsert = onInsert;
    }
    if (typeof disposeAfter === "function") {
      this.#disposeAfter = disposeAfter;
      this.#disposed = [];
    } else {
      this.#disposeAfter = void 0;
      this.#disposed = void 0;
    }
    this.#hasDispose = !!this.#dispose;
    this.#hasOnInsert = !!this.#onInsert;
    this.#hasDisposeAfter = !!this.#disposeAfter;
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (this.#maxSize !== 0) {
        if (!isPosInt(this.#maxSize)) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      this.#initializeSizeTracking();
    }
    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      this.#initializeTTLTracking();
    }
    if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
      }
    }
  }
  /**
   * Return the number of ms left in the item's TTL. If item is not in cache,
   * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
   */
  getRemainingTTL(key) {
    return this.#keyMap.has(key) ? Infinity : 0;
  }
  #initializeTTLTracking() {
    const ttls = new ZeroArray(this.#max);
    const starts = new ZeroArray(this.#max);
    this.#ttls = ttls;
    this.#starts = starts;
    this.#setItemTTL = (index, ttl, start = perf.now()) => {
      starts[index] = ttl !== 0 ? start : 0;
      ttls[index] = ttl;
      if (ttl !== 0 && this.ttlAutopurge) {
        const t = setTimeout(() => {
          if (this.#isStale(index)) {
            this.#delete(this.#keyList[index], "expire");
          }
        }, ttl + 1);
        if (t.unref) {
          t.unref();
        }
      }
    };
    this.#updateItemAge = (index) => {
      starts[index] = ttls[index] !== 0 ? perf.now() : 0;
    };
    this.#statusTTL = (status, index) => {
      if (ttls[index]) {
        const ttl = ttls[index];
        const start = starts[index];
        if (!ttl || !start)
          return;
        status.ttl = ttl;
        status.start = start;
        status.now = cachedNow || getNow();
        const age = status.now - start;
        status.remainingTTL = ttl - age;
      }
    };
    let cachedNow = 0;
    const getNow = () => {
      const n = perf.now();
      if (this.ttlResolution > 0) {
        cachedNow = n;
        const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
        if (t.unref) {
          t.unref();
        }
      }
      return n;
    };
    this.getRemainingTTL = (key) => {
      const index = this.#keyMap.get(key);
      if (index === void 0) {
        return 0;
      }
      const ttl = ttls[index];
      const start = starts[index];
      if (!ttl || !start) {
        return Infinity;
      }
      const age = (cachedNow || getNow()) - start;
      return ttl - age;
    };
    this.#isStale = (index) => {
      const s = starts[index];
      const t = ttls[index];
      return !!t && !!s && (cachedNow || getNow()) - s > t;
    };
  }
  // conditionally set private methods related to TTL
  #updateItemAge = () => {
  };
  #statusTTL = () => {
  };
  #setItemTTL = () => {
  };
  /* c8 ignore stop */
  #isStale = () => false;
  #initializeSizeTracking() {
    const sizes = new ZeroArray(this.#max);
    this.#calculatedSize = 0;
    this.#sizes = sizes;
    this.#removeItemSize = (index) => {
      this.#calculatedSize -= sizes[index];
      sizes[index] = 0;
    };
    this.#requireSize = (k, v, size, sizeCalculation) => {
      if (this.#isBackgroundFetch(v)) {
        return 0;
      }
      if (!isPosInt(size)) {
        if (sizeCalculation) {
          if (typeof sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation must be a function");
          }
          size = sizeCalculation(v, k);
          if (!isPosInt(size)) {
            throw new TypeError("sizeCalculation return invalid (expect positive integer)");
          }
        } else {
          throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
        }
      }
      return size;
    };
    this.#addItemSize = (index, size, status) => {
      sizes[index] = size;
      if (this.#maxSize) {
        const maxSize = this.#maxSize - sizes[index];
        while (this.#calculatedSize > maxSize) {
          this.#evict(true);
        }
      }
      this.#calculatedSize += sizes[index];
      if (status) {
        status.entrySize = size;
        status.totalCalculatedSize = this.#calculatedSize;
      }
    };
  }
  #removeItemSize = (_i) => {
  };
  #addItemSize = (_i, _s, _st) => {
  };
  #requireSize = (_k, _v, size, sizeCalculation) => {
    if (size || sizeCalculation) {
      throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    }
    return 0;
  };
  *#indexes({ allowStale = this.allowStale } = {}) {
    if (this.#size) {
      for (let i = this.#tail; true; ) {
        if (!this.#isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.#isStale(i)) {
          yield i;
        }
        if (i === this.#head) {
          break;
        } else {
          i = this.#prev[i];
        }
      }
    }
  }
  *#rindexes({ allowStale = this.allowStale } = {}) {
    if (this.#size) {
      for (let i = this.#head; true; ) {
        if (!this.#isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.#isStale(i)) {
          yield i;
        }
        if (i === this.#tail) {
          break;
        } else {
          i = this.#next[i];
        }
      }
    }
  }
  #isValidIndex(index) {
    return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
  }
  /**
   * Return a generator yielding `[key, value]` pairs,
   * in order from most recently used to least recently used.
   */
  *entries() {
    for (const i of this.#indexes()) {
      if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield [this.#keyList[i], this.#valList[i]];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.entries}
   *
   * Return a generator yielding `[key, value]` pairs,
   * in order from least recently used to most recently used.
   */
  *rentries() {
    for (const i of this.#rindexes()) {
      if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield [this.#keyList[i], this.#valList[i]];
      }
    }
  }
  /**
   * Return a generator yielding the keys in the cache,
   * in order from most recently used to least recently used.
   */
  *keys() {
    for (const i of this.#indexes()) {
      const k = this.#keyList[i];
      if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield k;
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.keys}
   *
   * Return a generator yielding the keys in the cache,
   * in order from least recently used to most recently used.
   */
  *rkeys() {
    for (const i of this.#rindexes()) {
      const k = this.#keyList[i];
      if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield k;
      }
    }
  }
  /**
   * Return a generator yielding the values in the cache,
   * in order from most recently used to least recently used.
   */
  *values() {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield this.#valList[i];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.values}
   *
   * Return a generator yielding the values in the cache,
   * in order from least recently used to most recently used.
   */
  *rvalues() {
    for (const i of this.#rindexes()) {
      const v = this.#valList[i];
      if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield this.#valList[i];
      }
    }
  }
  /**
   * Iterating over the cache itself yields the same results as
   * {@link LRUCache.entries}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * A String value that is used in the creation of the default string
   * description of an object. Called by the built-in method
   * `Object.prototype.toString`.
   */
  [Symbol.toStringTag] = "LRUCache";
  /**
   * Find a value for which the supplied fn method returns a truthy value,
   * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
   */
  find(fn, getOptions = {}) {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, this.#keyList[i], this)) {
        return this.get(this.#keyList[i], getOptions);
      }
    }
  }
  /**
   * Call the supplied function on each item in the cache, in order from most
   * recently used to least recently used.
   *
   * `fn` is called as `fn(value, key, cache)`.
   *
   * If `thisp` is provided, function will be called in the `this`-context of
   * the provided object, or the cache if no `thisp` object is provided.
   *
   * Does not update age or recenty of use, or iterate over stale values.
   */
  forEach(fn, thisp = this) {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, this.#keyList[i], this);
    }
  }
  /**
   * The same as {@link LRUCache.forEach} but items are iterated over in
   * reverse order.  (ie, less recently used items are iterated over first.)
   */
  rforEach(fn, thisp = this) {
    for (const i of this.#rindexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, this.#keyList[i], this);
    }
  }
  /**
   * Delete any stale entries. Returns true if anything was removed,
   * false otherwise.
   */
  purgeStale() {
    let deleted = false;
    for (const i of this.#rindexes({ allowStale: true })) {
      if (this.#isStale(i)) {
        this.#delete(this.#keyList[i], "expire");
        deleted = true;
      }
    }
    return deleted;
  }
  /**
   * Get the extended info about a given entry, to get its value, size, and
   * TTL info simultaneously. Returns `undefined` if the key is not present.
   *
   * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
   * serialization, the `start` value is always the current timestamp, and the
   * `ttl` is a calculated remaining time to live (negative if expired).
   *
   * Always returns stale values, if their info is found in the cache, so be
   * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
   * if relevant.
   */
  info(key) {
    const i = this.#keyMap.get(key);
    if (i === void 0)
      return void 0;
    const v = this.#valList[i];
    const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
    if (value === void 0)
      return void 0;
    const entry = { value };
    if (this.#ttls && this.#starts) {
      const ttl = this.#ttls[i];
      const start = this.#starts[i];
      if (ttl && start) {
        const remain = ttl - (perf.now() - start);
        entry.ttl = remain;
        entry.start = Date.now();
      }
    }
    if (this.#sizes) {
      entry.size = this.#sizes[i];
    }
    return entry;
  }
  /**
   * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
   * passed to {@link LRUCache#load}.
   *
   * The `start` fields are calculated relative to a portable `Date.now()`
   * timestamp, even if `performance.now()` is available.
   *
   * Stale entries are always included in the `dump`, even if
   * {@link LRUCache.OptionsBase.allowStale} is false.
   *
   * Note: this returns an actual array, not a generator, so it can be more
   * easily passed around.
   */
  dump() {
    const arr = [];
    for (const i of this.#indexes({ allowStale: true })) {
      const key = this.#keyList[i];
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0 || key === void 0)
        continue;
      const entry = { value };
      if (this.#ttls && this.#starts) {
        entry.ttl = this.#ttls[i];
        const age = perf.now() - this.#starts[i];
        entry.start = Math.floor(Date.now() - age);
      }
      if (this.#sizes) {
        entry.size = this.#sizes[i];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  /**
   * Reset the cache and load in the items in entries in the order listed.
   *
   * The shape of the resulting cache may be different if the same options are
   * not used in both caches.
   *
   * The `start` fields are assumed to be calculated relative to a portable
   * `Date.now()` timestamp, even if `performance.now()` is available.
   */
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  /**
   * Add a value to the cache.
   *
   * Note: if `undefined` is specified as a value, this is an alias for
   * {@link LRUCache#delete}
   *
   * Fields on the {@link LRUCache.SetOptions} options param will override
   * their corresponding values in the constructor options for the scope
   * of this single `set()` operation.
   *
   * If `start` is provided, then that will set the effective start
   * time for the TTL calculation. Note that this must be a previous
   * value of `performance.now()` if supported, or a previous value of
   * `Date.now()` if not.
   *
   * Options object may also include `size`, which will prevent
   * calling the `sizeCalculation` function and just use the specified
   * number if it is a positive integer, and `noDisposeOnSet` which
   * will prevent calling a `dispose` function in the case of
   * overwrites.
   *
   * If the `size` (or return value of `sizeCalculation`) for a given
   * entry is greater than `maxEntrySize`, then the item will not be
   * added to the cache.
   *
   * Will update the recency of the entry.
   *
   * If the value is `undefined`, then this is an alias for
   * `cache.delete(key)`. `undefined` is never stored in the cache.
   */
  set(k, v, setOptions = {}) {
    if (v === void 0) {
      this.delete(k);
      return this;
    }
    const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;
    const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.#delete(k, "set");
      return this;
    }
    let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
    if (index === void 0) {
      index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
      this.#keyList[index] = k;
      this.#valList[index] = v;
      this.#keyMap.set(k, index);
      this.#next[this.#tail] = index;
      this.#prev[index] = this.#tail;
      this.#tail = index;
      this.#size++;
      this.#addItemSize(index, size, status);
      if (status)
        status.set = "add";
      noUpdateTTL = false;
      if (this.#hasOnInsert) {
        this.#onInsert?.(v, k, "add");
      }
    } else {
      this.#moveToTail(index);
      const oldVal = this.#valList[index];
      if (v !== oldVal) {
        if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
          const { __staleWhileFetching: s } = oldVal;
          if (s !== void 0 && !noDisposeOnSet) {
            if (this.#hasDispose) {
              this.#dispose?.(s, k, "set");
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([s, k, "set"]);
            }
          }
        } else if (!noDisposeOnSet) {
          if (this.#hasDispose) {
            this.#dispose?.(oldVal, k, "set");
          }
          if (this.#hasDisposeAfter) {
            this.#disposed?.push([oldVal, k, "set"]);
          }
        }
        this.#removeItemSize(index);
        this.#addItemSize(index, size, status);
        this.#valList[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
      if (this.#hasOnInsert) {
        this.onInsert?.(v, k, v === oldVal ? "update" : "replace");
      }
    }
    if (ttl !== 0 && !this.#ttls) {
      this.#initializeTTLTracking();
    }
    if (this.#ttls) {
      if (!noUpdateTTL) {
        this.#setItemTTL(index, ttl, start);
      }
      if (status)
        this.#statusTTL(status, index);
    }
    if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
      const dt = this.#disposed;
      let task;
      while (task = dt?.shift()) {
        this.#disposeAfter?.(...task);
      }
    }
    return this;
  }
  /**
   * Evict the least recently used item, returning its value or
   * `undefined` if cache is empty.
   */
  pop() {
    try {
      while (this.#size) {
        const val = this.#valList[this.#head];
        this.#evict(true);
        if (this.#isBackgroundFetch(val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== void 0) {
          return val;
        }
      }
    } finally {
      if (this.#hasDisposeAfter && this.#disposed) {
        const dt = this.#disposed;
        let task;
        while (task = dt?.shift()) {
          this.#disposeAfter?.(...task);
        }
      }
    }
  }
  #evict(free) {
    const head = this.#head;
    const k = this.#keyList[head];
    const v = this.#valList[head];
    if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
      v.__abortController.abort(new Error("evicted"));
    } else if (this.#hasDispose || this.#hasDisposeAfter) {
      if (this.#hasDispose) {
        this.#dispose?.(v, k, "evict");
      }
      if (this.#hasDisposeAfter) {
        this.#disposed?.push([v, k, "evict"]);
      }
    }
    this.#removeItemSize(head);
    if (free) {
      this.#keyList[head] = void 0;
      this.#valList[head] = void 0;
      this.#free.push(head);
    }
    if (this.#size === 1) {
      this.#head = this.#tail = 0;
      this.#free.length = 0;
    } else {
      this.#head = this.#next[head];
    }
    this.#keyMap.delete(k);
    this.#size--;
    return head;
  }
  /**
   * Check if a key is in the cache, without updating the recency of use.
   * Will return false if the item is stale, even though it is technically
   * in the cache.
   *
   * Check if a key is in the cache, without updating the recency of
   * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
   * to `true` in either the options or the constructor.
   *
   * Will return `false` if the item is stale, even though it is technically in
   * the cache. The difference can be determined (if it matters) by using a
   * `status` argument, and inspecting the `has` field.
   *
   * Will not update item age unless
   * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
   */
  has(k, hasOptions = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = this.#keyMap.get(k);
    if (index !== void 0) {
      const v = this.#valList[index];
      if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0) {
        return false;
      }
      if (!this.#isStale(index)) {
        if (updateAgeOnHas) {
          this.#updateItemAge(index);
        }
        if (status) {
          status.has = "hit";
          this.#statusTTL(status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        this.#statusTTL(status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  /**
   * Like {@link LRUCache#get} but doesn't update recency or delete stale
   * items.
   *
   * Returns `undefined` if the item is stale, unless
   * {@link LRUCache.OptionsBase.allowStale} is set.
   */
  peek(k, peekOptions = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = this.#keyMap.get(k);
    if (index === void 0 || !allowStale && this.#isStale(index)) {
      return;
    }
    const v = this.#valList[index];
    return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
  }
  #backgroundFetch(k, index, options, context) {
    const v = index === void 0 ? void 0 : this.#valList[index];
    if (this.#isBackgroundFetch(v)) {
      return v;
    }
    const ac = new AC();
    const { signal } = options;
    signal?.addEventListener("abort", () => ac.abort(signal.reason), {
      signal: ac.signal
    });
    const fetchOpts = {
      signal: ac.signal,
      options,
      context
    };
    const cb = (v2, updateCache = false) => {
      const { aborted } = ac.signal;
      const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
      if (options.status) {
        if (aborted && !updateCache) {
          options.status.fetchAborted = true;
          options.status.fetchError = ac.signal.reason;
          if (ignoreAbort)
            options.status.fetchAbortIgnored = true;
        } else {
          options.status.fetchResolved = true;
        }
      }
      if (aborted && !ignoreAbort && !updateCache) {
        return fetchFail(ac.signal.reason);
      }
      const bf2 = p;
      if (this.#valList[index] === p) {
        if (v2 === void 0) {
          if (bf2.__staleWhileFetching) {
            this.#valList[index] = bf2.__staleWhileFetching;
          } else {
            this.#delete(k, "fetch");
          }
        } else {
          if (options.status)
            options.status.fetchUpdated = true;
          this.set(k, v2, fetchOpts.options);
        }
      }
      return v2;
    };
    const eb = (er) => {
      if (options.status) {
        options.status.fetchRejected = true;
        options.status.fetchError = er;
      }
      return fetchFail(er);
    };
    const fetchFail = (er) => {
      const { aborted } = ac.signal;
      const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
      const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
      const noDelete = allowStale || options.noDeleteOnFetchRejection;
      const bf2 = p;
      if (this.#valList[index] === p) {
        const del = !noDelete || bf2.__staleWhileFetching === void 0;
        if (del) {
          this.#delete(k, "fetch");
        } else if (!allowStaleAborted) {
          this.#valList[index] = bf2.__staleWhileFetching;
        }
      }
      if (allowStale) {
        if (options.status && bf2.__staleWhileFetching !== void 0) {
          options.status.returnedStale = true;
        }
        return bf2.__staleWhileFetching;
      } else if (bf2.__returned === bf2) {
        throw er;
      }
    };
    const pcall = (res, rej) => {
      const fmp = this.#fetchMethod?.(k, v, fetchOpts);
      if (fmp && fmp instanceof Promise) {
        fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
      }
      ac.signal.addEventListener("abort", () => {
        if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
          res(void 0);
          if (options.allowStaleOnFetchAbort) {
            res = (v2) => cb(v2, true);
          }
        }
      });
    };
    if (options.status)
      options.status.fetchDispatched = true;
    const p = new Promise(pcall).then(cb, eb);
    const bf = Object.assign(p, {
      __abortController: ac,
      __staleWhileFetching: v,
      __returned: void 0
    });
    if (index === void 0) {
      this.set(k, bf, { ...fetchOpts.options, status: void 0 });
      index = this.#keyMap.get(k);
    } else {
      this.#valList[index] = bf;
    }
    return bf;
  }
  #isBackgroundFetch(p) {
    if (!this.#hasFetchMethod)
      return false;
    const b = p;
    return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
  }
  async fetch(k, fetchOptions = {}) {
    const {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal
    } = fetchOptions;
    if (!this.#hasFetchMethod) {
      if (status)
        status.fetch = "get";
      return this.get(k, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = this.#keyMap.get(k);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p = this.#backgroundFetch(k, index, options, context);
      return p.__returned = p;
    } else {
      const v = this.#valList[index];
      if (this.#isBackgroundFetch(v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = this.#isStale(index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        this.#moveToTail(index);
        if (updateAgeOnGet) {
          this.#updateItemAge(index);
        }
        if (status)
          this.#statusTTL(status, index);
        return v;
      }
      const p = this.#backgroundFetch(k, index, options, context);
      const hasStale = p.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  async forceFetch(k, fetchOptions = {}) {
    const v = await this.fetch(k, fetchOptions);
    if (v === void 0)
      throw new Error("fetch() returned undefined");
    return v;
  }
  memo(k, memoOptions = {}) {
    const memoMethod = this.#memoMethod;
    if (!memoMethod) {
      throw new Error("no memoMethod provided to constructor");
    }
    const { context, forceRefresh, ...options } = memoOptions;
    const v = this.get(k, options);
    if (!forceRefresh && v !== void 0)
      return v;
    const vv = memoMethod(k, v, {
      options,
      context
    });
    this.set(k, vv, options);
    return vv;
  }
  /**
   * Return a value from the cache. Will update the recency of the cache
   * entry found.
   *
   * If the key is not found, get() will return `undefined`.
   */
  get(k, getOptions = {}) {
    const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
    const index = this.#keyMap.get(k);
    if (index !== void 0) {
      const value = this.#valList[index];
      const fetching = this.#isBackgroundFetch(value);
      if (status)
        this.#statusTTL(status, index);
      if (this.#isStale(index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.#delete(k, "expire");
          }
          if (status && allowStale)
            status.returnedStale = true;
          return allowStale ? value : void 0;
        } else {
          if (status && allowStale && value.__staleWhileFetching !== void 0) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        this.#moveToTail(index);
        if (updateAgeOnGet) {
          this.#updateItemAge(index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  #connect(p, n) {
    this.#prev[n] = p;
    this.#next[p] = n;
  }
  #moveToTail(index) {
    if (index !== this.#tail) {
      if (index === this.#head) {
        this.#head = this.#next[index];
      } else {
        this.#connect(this.#prev[index], this.#next[index]);
      }
      this.#connect(this.#tail, index);
      this.#tail = index;
    }
  }
  /**
   * Deletes a key out of the cache.
   *
   * Returns true if the key was deleted, false otherwise.
   */
  delete(k) {
    return this.#delete(k, "delete");
  }
  #delete(k, reason) {
    let deleted = false;
    if (this.#size !== 0) {
      const index = this.#keyMap.get(k);
      if (index !== void 0) {
        deleted = true;
        if (this.#size === 1) {
          this.#clear(reason);
        } else {
          this.#removeItemSize(index);
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error("deleted"));
          } else if (this.#hasDispose || this.#hasDisposeAfter) {
            if (this.#hasDispose) {
              this.#dispose?.(v, k, reason);
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([v, k, reason]);
            }
          }
          this.#keyMap.delete(k);
          this.#keyList[index] = void 0;
          this.#valList[index] = void 0;
          if (index === this.#tail) {
            this.#tail = this.#prev[index];
          } else if (index === this.#head) {
            this.#head = this.#next[index];
          } else {
            const pi = this.#prev[index];
            this.#next[pi] = this.#next[index];
            const ni = this.#next[index];
            this.#prev[ni] = this.#prev[index];
          }
          this.#size--;
          this.#free.push(index);
        }
      }
    }
    if (this.#hasDisposeAfter && this.#disposed?.length) {
      const dt = this.#disposed;
      let task;
      while (task = dt?.shift()) {
        this.#disposeAfter?.(...task);
      }
    }
    return deleted;
  }
  /**
   * Clear the cache entirely, throwing away all values.
   */
  clear() {
    return this.#clear("delete");
  }
  #clear(reason) {
    for (const index of this.#rindexes({ allowStale: true })) {
      const v = this.#valList[index];
      if (this.#isBackgroundFetch(v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k = this.#keyList[index];
        if (this.#hasDispose) {
          this.#dispose?.(v, k, reason);
        }
        if (this.#hasDisposeAfter) {
          this.#disposed?.push([v, k, reason]);
        }
      }
    }
    this.#keyMap.clear();
    this.#valList.fill(void 0);
    this.#keyList.fill(void 0);
    if (this.#ttls && this.#starts) {
      this.#ttls.fill(0);
      this.#starts.fill(0);
    }
    if (this.#sizes) {
      this.#sizes.fill(0);
    }
    this.#head = 0;
    this.#tail = 0;
    this.#free.length = 0;
    this.#calculatedSize = 0;
    this.#size = 0;
    if (this.#hasDisposeAfter && this.#disposed) {
      const dt = this.#disposed;
      let task;
      while (task = dt?.shift()) {
        this.#disposeAfter?.(...task);
      }
    }
  }
};

// node_modules/path-scurry/dist/esm/index.js
import { posix, win32 } from "node:path";
import { fileURLToPath } from "node:url";
import { lstatSync, readdir as readdirCB, readdirSync, readlinkSync, realpathSync as rps } from "fs";
import * as actualFS from "node:fs";
import { lstat, readdir, readlink, realpath } from "node:fs/promises";

// node_modules/minipass/dist/esm/index.js
import { EventEmitter } from "node:events";
import Stream from "node:stream";
import { StringDecoder } from "node:string_decoder";
var proc = typeof process === "object" && process ? process : {
  stdout: null,
  stderr: null
};
var isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof Stream || isReadable(s) || isWritable(s));
var isReadable = (s) => !!s && typeof s === "object" && s instanceof EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
s.pipe !== Stream.Writable.prototype.pipe;
var isWritable = (s) => !!s && typeof s === "object" && s instanceof EventEmitter && typeof s.write === "function" && typeof s.end === "function";
var EOF = Symbol("EOF");
var MAYBE_EMIT_END = Symbol("maybeEmitEnd");
var EMITTED_END = Symbol("emittedEnd");
var EMITTING_END = Symbol("emittingEnd");
var EMITTED_ERROR = Symbol("emittedError");
var CLOSED = Symbol("closed");
var READ = Symbol("read");
var FLUSH = Symbol("flush");
var FLUSHCHUNK = Symbol("flushChunk");
var ENCODING = Symbol("encoding");
var DECODER = Symbol("decoder");
var FLOWING = Symbol("flowing");
var PAUSED = Symbol("paused");
var RESUME = Symbol("resume");
var BUFFER = Symbol("buffer");
var PIPES = Symbol("pipes");
var BUFFERLENGTH = Symbol("bufferLength");
var BUFFERPUSH = Symbol("bufferPush");
var BUFFERSHIFT = Symbol("bufferShift");
var OBJECTMODE = Symbol("objectMode");
var DESTROYED = Symbol("destroyed");
var ERROR = Symbol("error");
var EMITDATA = Symbol("emitData");
var EMITEND = Symbol("emitEnd");
var EMITEND2 = Symbol("emitEnd2");
var ASYNC = Symbol("async");
var ABORT = Symbol("abort");
var ABORTED = Symbol("aborted");
var SIGNAL = Symbol("signal");
var DATALISTENERS = Symbol("dataListeners");
var DISCARDED = Symbol("discarded");
var defer = (fn) => Promise.resolve().then(fn);
var nodefer = (fn) => fn();
var isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
var isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
var isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
var Pipe = class {
  src;
  dest;
  opts;
  ondrain;
  constructor(src, dest, opts) {
    this.src = src;
    this.dest = dest;
    this.opts = opts;
    this.ondrain = () => src[RESUME]();
    this.dest.on("drain", this.ondrain);
  }
  unpipe() {
    this.dest.removeListener("drain", this.ondrain);
  }
  // only here for the prototype
  /* c8 ignore start */
  proxyErrors(_er) {
  }
  /* c8 ignore stop */
  end() {
    this.unpipe();
    if (this.opts.end)
      this.dest.end();
  }
};
var PipeProxyErrors = class extends Pipe {
  unpipe() {
    this.src.removeListener("error", this.proxyErrors);
    super.unpipe();
  }
  constructor(src, dest, opts) {
    super(src, dest, opts);
    this.proxyErrors = (er) => dest.emit("error", er);
    src.on("error", this.proxyErrors);
  }
};
var isObjectModeOptions = (o) => !!o.objectMode;
var isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== "buffer";
var Minipass = class extends EventEmitter {
  [FLOWING] = false;
  [PAUSED] = false;
  [PIPES] = [];
  [BUFFER] = [];
  [OBJECTMODE];
  [ENCODING];
  [ASYNC];
  [DECODER];
  [EOF] = false;
  [EMITTED_END] = false;
  [EMITTING_END] = false;
  [CLOSED] = false;
  [EMITTED_ERROR] = null;
  [BUFFERLENGTH] = 0;
  [DESTROYED] = false;
  [SIGNAL];
  [ABORTED] = false;
  [DATALISTENERS] = 0;
  [DISCARDED] = false;
  /**
   * true if the stream can be written
   */
  writable = true;
  /**
   * true if the stream can be read
   */
  readable = true;
  /**
   * If `RType` is Buffer, then options do not need to be provided.
   * Otherwise, an options object must be provided to specify either
   * {@link Minipass.SharedOptions.objectMode} or
   * {@link Minipass.SharedOptions.encoding}, as appropriate.
   */
  constructor(...args) {
    const options = args[0] || {};
    super();
    if (options.objectMode && typeof options.encoding === "string") {
      throw new TypeError("Encoding and objectMode may not be used together");
    }
    if (isObjectModeOptions(options)) {
      this[OBJECTMODE] = true;
      this[ENCODING] = null;
    } else if (isEncodingOptions(options)) {
      this[ENCODING] = options.encoding;
      this[OBJECTMODE] = false;
    } else {
      this[OBJECTMODE] = false;
      this[ENCODING] = null;
    }
    this[ASYNC] = !!options.async;
    this[DECODER] = this[ENCODING] ? new StringDecoder(this[ENCODING]) : null;
    if (options && options.debugExposeBuffer === true) {
      Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
    }
    if (options && options.debugExposePipes === true) {
      Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
    }
    const { signal } = options;
    if (signal) {
      this[SIGNAL] = signal;
      if (signal.aborted) {
        this[ABORT]();
      } else {
        signal.addEventListener("abort", () => this[ABORT]());
      }
    }
  }
  /**
   * The amount of data stored in the buffer waiting to be read.
   *
   * For Buffer strings, this will be the total byte length.
   * For string encoding streams, this will be the string character length,
   * according to JavaScript's `string.length` logic.
   * For objectMode streams, this is a count of the items waiting to be
   * emitted.
   */
  get bufferLength() {
    return this[BUFFERLENGTH];
  }
  /**
   * The `BufferEncoding` currently in use, or `null`
   */
  get encoding() {
    return this[ENCODING];
  }
  /**
   * @deprecated - This is a read only property
   */
  set encoding(_enc) {
    throw new Error("Encoding must be set at instantiation time");
  }
  /**
   * @deprecated - Encoding may only be set at instantiation time
   */
  setEncoding(_enc) {
    throw new Error("Encoding must be set at instantiation time");
  }
  /**
   * True if this is an objectMode stream
   */
  get objectMode() {
    return this[OBJECTMODE];
  }
  /**
   * @deprecated - This is a read-only property
   */
  set objectMode(_om) {
    throw new Error("objectMode must be set at instantiation time");
  }
  /**
   * true if this is an async stream
   */
  get ["async"]() {
    return this[ASYNC];
  }
  /**
   * Set to true to make this stream async.
   *
   * Once set, it cannot be unset, as this would potentially cause incorrect
   * behavior.  Ie, a sync stream can be made async, but an async stream
   * cannot be safely made sync.
   */
  set ["async"](a) {
    this[ASYNC] = this[ASYNC] || !!a;
  }
  // drop everything and get out of the flow completely
  [ABORT]() {
    this[ABORTED] = true;
    this.emit("abort", this[SIGNAL]?.reason);
    this.destroy(this[SIGNAL]?.reason);
  }
  /**
   * True if the stream has been aborted.
   */
  get aborted() {
    return this[ABORTED];
  }
  /**
   * No-op setter. Stream aborted status is set via the AbortSignal provided
   * in the constructor options.
   */
  set aborted(_) {
  }
  write(chunk, encoding, cb) {
    if (this[ABORTED])
      return false;
    if (this[EOF])
      throw new Error("write after end");
    if (this[DESTROYED]) {
      this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
      return true;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = "utf8";
    }
    if (!encoding)
      encoding = "utf8";
    const fn = this[ASYNC] ? defer : nodefer;
    if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView(chunk)) {
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      } else if (isArrayBufferLike(chunk)) {
        chunk = Buffer.from(chunk);
      } else if (typeof chunk !== "string") {
        throw new Error("Non-contiguous data written to non-objectMode stream");
      }
    }
    if (this[OBJECTMODE]) {
      if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);
      if (this[FLOWING])
        this.emit("data", chunk);
      else
        this[BUFFERPUSH](chunk);
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    if (!chunk.length) {
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    if (typeof chunk === "string" && // unless it is a string already ready for us to use
    !(encoding === this[ENCODING] && !this[DECODER]?.lastNeed)) {
      chunk = Buffer.from(chunk, encoding);
    }
    if (Buffer.isBuffer(chunk) && this[ENCODING]) {
      chunk = this[DECODER].write(chunk);
    }
    if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
      this[FLUSH](true);
    if (this[FLOWING])
      this.emit("data", chunk);
    else
      this[BUFFERPUSH](chunk);
    if (this[BUFFERLENGTH] !== 0)
      this.emit("readable");
    if (cb)
      fn(cb);
    return this[FLOWING];
  }
  /**
   * Low-level explicit read method.
   *
   * In objectMode, the argument is ignored, and one item is returned if
   * available.
   *
   * `n` is the number of bytes (or in the case of encoding streams,
   * characters) to consume. If `n` is not provided, then the entire buffer
   * is returned, or `null` is returned if no data is available.
   *
   * If `n` is greater that the amount of data in the internal buffer,
   * then `null` is returned.
   */
  read(n) {
    if (this[DESTROYED])
      return null;
    this[DISCARDED] = false;
    if (this[BUFFERLENGTH] === 0 || n === 0 || n && n > this[BUFFERLENGTH]) {
      this[MAYBE_EMIT_END]();
      return null;
    }
    if (this[OBJECTMODE])
      n = null;
    if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
      this[BUFFER] = [
        this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
      ];
    }
    const ret = this[READ](n || null, this[BUFFER][0]);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [READ](n, chunk) {
    if (this[OBJECTMODE])
      this[BUFFERSHIFT]();
    else {
      const c = chunk;
      if (n === c.length || n === null)
        this[BUFFERSHIFT]();
      else if (typeof c === "string") {
        this[BUFFER][0] = c.slice(n);
        chunk = c.slice(0, n);
        this[BUFFERLENGTH] -= n;
      } else {
        this[BUFFER][0] = c.subarray(n);
        chunk = c.subarray(0, n);
        this[BUFFERLENGTH] -= n;
      }
    }
    this.emit("data", chunk);
    if (!this[BUFFER].length && !this[EOF])
      this.emit("drain");
    return chunk;
  }
  end(chunk, encoding, cb) {
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = void 0;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = "utf8";
    }
    if (chunk !== void 0)
      this.write(chunk, encoding);
    if (cb)
      this.once("end", cb);
    this[EOF] = true;
    this.writable = false;
    if (this[FLOWING] || !this[PAUSED])
      this[MAYBE_EMIT_END]();
    return this;
  }
  // don't let the internal resume be overwritten
  [RESUME]() {
    if (this[DESTROYED])
      return;
    if (!this[DATALISTENERS] && !this[PIPES].length) {
      this[DISCARDED] = true;
    }
    this[PAUSED] = false;
    this[FLOWING] = true;
    this.emit("resume");
    if (this[BUFFER].length)
      this[FLUSH]();
    else if (this[EOF])
      this[MAYBE_EMIT_END]();
    else
      this.emit("drain");
  }
  /**
   * Resume the stream if it is currently in a paused state
   *
   * If called when there are no pipe destinations or `data` event listeners,
   * this will place the stream in a "discarded" state, where all data will
   * be thrown away. The discarded state is removed if a pipe destination or
   * data handler is added, if pause() is called, or if any synchronous or
   * asynchronous iteration is started.
   */
  resume() {
    return this[RESUME]();
  }
  /**
   * Pause the stream
   */
  pause() {
    this[FLOWING] = false;
    this[PAUSED] = true;
    this[DISCARDED] = false;
  }
  /**
   * true if the stream has been forcibly destroyed
   */
  get destroyed() {
    return this[DESTROYED];
  }
  /**
   * true if the stream is currently in a flowing state, meaning that
   * any writes will be immediately emitted.
   */
  get flowing() {
    return this[FLOWING];
  }
  /**
   * true if the stream is currently in a paused state
   */
  get paused() {
    return this[PAUSED];
  }
  [BUFFERPUSH](chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1;
    else
      this[BUFFERLENGTH] += chunk.length;
    this[BUFFER].push(chunk);
  }
  [BUFFERSHIFT]() {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] -= 1;
    else
      this[BUFFERLENGTH] -= this[BUFFER][0].length;
    return this[BUFFER].shift();
  }
  [FLUSH](noDrain = false) {
    do {
    } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
    if (!noDrain && !this[BUFFER].length && !this[EOF])
      this.emit("drain");
  }
  [FLUSHCHUNK](chunk) {
    this.emit("data", chunk);
    return this[FLOWING];
  }
  /**
   * Pipe all data emitted by this stream into the destination provided.
   *
   * Triggers the flow of data.
   */
  pipe(dest, opts) {
    if (this[DESTROYED])
      return dest;
    this[DISCARDED] = false;
    const ended = this[EMITTED_END];
    opts = opts || {};
    if (dest === proc.stdout || dest === proc.stderr)
      opts.end = false;
    else
      opts.end = opts.end !== false;
    opts.proxyErrors = !!opts.proxyErrors;
    if (ended) {
      if (opts.end)
        dest.end();
    } else {
      this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
      if (this[ASYNC])
        defer(() => this[RESUME]());
      else
        this[RESUME]();
    }
    return dest;
  }
  /**
   * Fully unhook a piped destination stream.
   *
   * If the destination stream was the only consumer of this stream (ie,
   * there are no other piped destinations or `'data'` event listeners)
   * then the flow of data will stop until there is another consumer or
   * {@link Minipass#resume} is explicitly called.
   */
  unpipe(dest) {
    const p = this[PIPES].find((p2) => p2.dest === dest);
    if (p) {
      if (this[PIPES].length === 1) {
        if (this[FLOWING] && this[DATALISTENERS] === 0) {
          this[FLOWING] = false;
        }
        this[PIPES] = [];
      } else
        this[PIPES].splice(this[PIPES].indexOf(p), 1);
      p.unpipe();
    }
  }
  /**
   * Alias for {@link Minipass#on}
   */
  addListener(ev, handler) {
    return this.on(ev, handler);
  }
  /**
   * Mostly identical to `EventEmitter.on`, with the following
   * behavior differences to prevent data loss and unnecessary hangs:
   *
   * - Adding a 'data' event handler will trigger the flow of data
   *
   * - Adding a 'readable' event handler when there is data waiting to be read
   *   will cause 'readable' to be emitted immediately.
   *
   * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
   *   already passed will cause the event to be emitted immediately and all
   *   handlers removed.
   *
   * - Adding an 'error' event handler after an error has been emitted will
   *   cause the event to be re-emitted immediately with the error previously
   *   raised.
   */
  on(ev, handler) {
    const ret = super.on(ev, handler);
    if (ev === "data") {
      this[DISCARDED] = false;
      this[DATALISTENERS]++;
      if (!this[PIPES].length && !this[FLOWING]) {
        this[RESUME]();
      }
    } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
      super.emit("readable");
    } else if (isEndish(ev) && this[EMITTED_END]) {
      super.emit(ev);
      this.removeAllListeners(ev);
    } else if (ev === "error" && this[EMITTED_ERROR]) {
      const h = handler;
      if (this[ASYNC])
        defer(() => h.call(this, this[EMITTED_ERROR]));
      else
        h.call(this, this[EMITTED_ERROR]);
    }
    return ret;
  }
  /**
   * Alias for {@link Minipass#off}
   */
  removeListener(ev, handler) {
    return this.off(ev, handler);
  }
  /**
   * Mostly identical to `EventEmitter.off`
   *
   * If a 'data' event handler is removed, and it was the last consumer
   * (ie, there are no pipe destinations or other 'data' event listeners),
   * then the flow of data will stop until there is another consumer or
   * {@link Minipass#resume} is explicitly called.
   */
  off(ev, handler) {
    const ret = super.off(ev, handler);
    if (ev === "data") {
      this[DATALISTENERS] = this.listeners("data").length;
      if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
        this[FLOWING] = false;
      }
    }
    return ret;
  }
  /**
   * Mostly identical to `EventEmitter.removeAllListeners`
   *
   * If all 'data' event handlers are removed, and they were the last consumer
   * (ie, there are no pipe destinations), then the flow of data will stop
   * until there is another consumer or {@link Minipass#resume} is explicitly
   * called.
   */
  removeAllListeners(ev) {
    const ret = super.removeAllListeners(ev);
    if (ev === "data" || ev === void 0) {
      this[DATALISTENERS] = 0;
      if (!this[DISCARDED] && !this[PIPES].length) {
        this[FLOWING] = false;
      }
    }
    return ret;
  }
  /**
   * true if the 'end' event has been emitted
   */
  get emittedEnd() {
    return this[EMITTED_END];
  }
  [MAYBE_EMIT_END]() {
    if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
      this[EMITTING_END] = true;
      this.emit("end");
      this.emit("prefinish");
      this.emit("finish");
      if (this[CLOSED])
        this.emit("close");
      this[EMITTING_END] = false;
    }
  }
  /**
   * Mostly identical to `EventEmitter.emit`, with the following
   * behavior differences to prevent data loss and unnecessary hangs:
   *
   * If the stream has been destroyed, and the event is something other
   * than 'close' or 'error', then `false` is returned and no handlers
   * are called.
   *
   * If the event is 'end', and has already been emitted, then the event
   * is ignored. If the stream is in a paused or non-flowing state, then
   * the event will be deferred until data flow resumes. If the stream is
   * async, then handlers will be called on the next tick rather than
   * immediately.
   *
   * If the event is 'close', and 'end' has not yet been emitted, then
   * the event will be deferred until after 'end' is emitted.
   *
   * If the event is 'error', and an AbortSignal was provided for the stream,
   * and there are no listeners, then the event is ignored, matching the
   * behavior of node core streams in the presense of an AbortSignal.
   *
   * If the event is 'finish' or 'prefinish', then all listeners will be
   * removed after emitting the event, to prevent double-firing.
   */
  emit(ev, ...args) {
    const data = args[0];
    if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
      return false;
    } else if (ev === "data") {
      return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
    } else if (ev === "end") {
      return this[EMITEND]();
    } else if (ev === "close") {
      this[CLOSED] = true;
      if (!this[EMITTED_END] && !this[DESTROYED])
        return false;
      const ret2 = super.emit("close");
      this.removeAllListeners("close");
      return ret2;
    } else if (ev === "error") {
      this[EMITTED_ERROR] = data;
      super.emit(ERROR, data);
      const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
      this[MAYBE_EMIT_END]();
      return ret2;
    } else if (ev === "resume") {
      const ret2 = super.emit("resume");
      this[MAYBE_EMIT_END]();
      return ret2;
    } else if (ev === "finish" || ev === "prefinish") {
      const ret2 = super.emit(ev);
      this.removeAllListeners(ev);
      return ret2;
    }
    const ret = super.emit(ev, ...args);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [EMITDATA](data) {
    for (const p of this[PIPES]) {
      if (p.dest.write(data) === false)
        this.pause();
    }
    const ret = this[DISCARDED] ? false : super.emit("data", data);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [EMITEND]() {
    if (this[EMITTED_END])
      return false;
    this[EMITTED_END] = true;
    this.readable = false;
    return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
  }
  [EMITEND2]() {
    if (this[DECODER]) {
      const data = this[DECODER].end();
      if (data) {
        for (const p of this[PIPES]) {
          p.dest.write(data);
        }
        if (!this[DISCARDED])
          super.emit("data", data);
      }
    }
    for (const p of this[PIPES]) {
      p.end();
    }
    const ret = super.emit("end");
    this.removeAllListeners("end");
    return ret;
  }
  /**
   * Return a Promise that resolves to an array of all emitted data once
   * the stream ends.
   */
  async collect() {
    const buf = Object.assign([], {
      dataLength: 0
    });
    if (!this[OBJECTMODE])
      buf.dataLength = 0;
    const p = this.promise();
    this.on("data", (c) => {
      buf.push(c);
      if (!this[OBJECTMODE])
        buf.dataLength += c.length;
    });
    await p;
    return buf;
  }
  /**
   * Return a Promise that resolves to the concatenation of all emitted data
   * once the stream ends.
   *
   * Not allowed on objectMode streams.
   */
  async concat() {
    if (this[OBJECTMODE]) {
      throw new Error("cannot concat in objectMode");
    }
    const buf = await this.collect();
    return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
  }
  /**
   * Return a void Promise that resolves once the stream ends.
   */
  async promise() {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED, () => reject(new Error("stream destroyed")));
      this.on("error", (er) => reject(er));
      this.on("end", () => resolve());
    });
  }
  /**
   * Asynchronous `for await of` iteration.
   *
   * This will continue emitting all chunks until the stream terminates.
   */
  [Symbol.asyncIterator]() {
    this[DISCARDED] = false;
    let stopped = false;
    const stop = async () => {
      this.pause();
      stopped = true;
      return { value: void 0, done: true };
    };
    const next = () => {
      if (stopped)
        return stop();
      const res = this.read();
      if (res !== null)
        return Promise.resolve({ done: false, value: res });
      if (this[EOF])
        return stop();
      let resolve;
      let reject;
      const onerr = (er) => {
        this.off("data", ondata);
        this.off("end", onend);
        this.off(DESTROYED, ondestroy);
        stop();
        reject(er);
      };
      const ondata = (value) => {
        this.off("error", onerr);
        this.off("end", onend);
        this.off(DESTROYED, ondestroy);
        this.pause();
        resolve({ value, done: !!this[EOF] });
      };
      const onend = () => {
        this.off("error", onerr);
        this.off("data", ondata);
        this.off(DESTROYED, ondestroy);
        stop();
        resolve({ done: true, value: void 0 });
      };
      const ondestroy = () => onerr(new Error("stream destroyed"));
      return new Promise((res2, rej) => {
        reject = rej;
        resolve = res2;
        this.once(DESTROYED, ondestroy);
        this.once("error", onerr);
        this.once("end", onend);
        this.once("data", ondata);
      });
    };
    return {
      next,
      throw: stop,
      return: stop,
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  /**
   * Synchronous `for of` iteration.
   *
   * The iteration will terminate when the internal buffer runs out, even
   * if the stream has not yet terminated.
   */
  [Symbol.iterator]() {
    this[DISCARDED] = false;
    let stopped = false;
    const stop = () => {
      this.pause();
      this.off(ERROR, stop);
      this.off(DESTROYED, stop);
      this.off("end", stop);
      stopped = true;
      return { done: true, value: void 0 };
    };
    const next = () => {
      if (stopped)
        return stop();
      const value = this.read();
      return value === null ? stop() : { done: false, value };
    };
    this.once("end", stop);
    this.once(ERROR, stop);
    this.once(DESTROYED, stop);
    return {
      next,
      throw: stop,
      return: stop,
      [Symbol.iterator]() {
        return this;
      }
    };
  }
  /**
   * Destroy a stream, preventing it from being used for any further purpose.
   *
   * If the stream has a `close()` method, then it will be called on
   * destruction.
   *
   * After destruction, any attempt to write data, read data, or emit most
   * events will be ignored.
   *
   * If an error argument is provided, then it will be emitted in an
   * 'error' event.
   */
  destroy(er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit("error", er);
      else
        this.emit(DESTROYED);
      return this;
    }
    this[DESTROYED] = true;
    this[DISCARDED] = true;
    this[BUFFER].length = 0;
    this[BUFFERLENGTH] = 0;
    const wc = this;
    if (typeof wc.close === "function" && !this[CLOSED])
      wc.close();
    if (er)
      this.emit("error", er);
    else
      this.emit(DESTROYED);
    return this;
  }
  /**
   * Alias for {@link isStream}
   *
   * Former export location, maintained for backwards compatibility.
   *
   * @deprecated
   */
  static get isStream() {
    return isStream;
  }
};

// node_modules/path-scurry/dist/esm/index.js
var realpathSync = rps.native;
var defaultFS = {
  lstatSync,
  readdir: readdirCB,
  readdirSync,
  readlinkSync,
  realpathSync,
  promises: {
    lstat,
    readdir,
    readlink,
    realpath
  }
};
var fsFromOption = (fsOption) => !fsOption || fsOption === defaultFS || fsOption === actualFS ? defaultFS : {
  ...defaultFS,
  ...fsOption,
  promises: {
    ...defaultFS.promises,
    ...fsOption.promises || {}
  }
};
var uncDriveRegexp = /^\\\\\?\\([a-z]:)\\?$/i;
var uncToDrive = (rootPath) => rootPath.replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
var eitherSep = /[\\\/]/;
var UNKNOWN = 0;
var IFIFO = 1;
var IFCHR = 2;
var IFDIR = 4;
var IFBLK = 6;
var IFREG = 8;
var IFLNK = 10;
var IFSOCK = 12;
var IFMT = 15;
var IFMT_UNKNOWN = ~IFMT;
var READDIR_CALLED = 16;
var LSTAT_CALLED = 32;
var ENOTDIR = 64;
var ENOENT = 128;
var ENOREADLINK = 256;
var ENOREALPATH = 512;
var ENOCHILD = ENOTDIR | ENOENT | ENOREALPATH;
var TYPEMASK = 1023;
var entToType = (s) => s.isFile() ? IFREG : s.isDirectory() ? IFDIR : s.isSymbolicLink() ? IFLNK : s.isCharacterDevice() ? IFCHR : s.isBlockDevice() ? IFBLK : s.isSocket() ? IFSOCK : s.isFIFO() ? IFIFO : UNKNOWN;
var normalizeCache = /* @__PURE__ */ new Map();
var normalize = (s) => {
  const c = normalizeCache.get(s);
  if (c)
    return c;
  const n = s.normalize("NFKD");
  normalizeCache.set(s, n);
  return n;
};
var normalizeNocaseCache = /* @__PURE__ */ new Map();
var normalizeNocase = (s) => {
  const c = normalizeNocaseCache.get(s);
  if (c)
    return c;
  const n = normalize(s.toLowerCase());
  normalizeNocaseCache.set(s, n);
  return n;
};
var ResolveCache = class extends LRUCache {
  constructor() {
    super({ max: 256 });
  }
};
var ChildrenCache = class extends LRUCache {
  constructor(maxSize = 16 * 1024) {
    super({
      maxSize,
      // parent + children
      sizeCalculation: (a) => a.length + 1
    });
  }
};
var setAsCwd = Symbol("PathScurry setAsCwd");
var PathBase = class {
  /**
   * the basename of this path
   *
   * **Important**: *always* test the path name against any test string
   * usingthe {@link isNamed} method, and not by directly comparing this
   * string. Otherwise, unicode path strings that the system sees as identical
   * will not be properly treated as the same path, leading to incorrect
   * behavior and possible security issues.
   */
  name;
  /**
   * the Path entry corresponding to the path root.
   *
   * @internal
   */
  root;
  /**
   * All roots found within the current PathScurry family
   *
   * @internal
   */
  roots;
  /**
   * a reference to the parent path, or undefined in the case of root entries
   *
   * @internal
   */
  parent;
  /**
   * boolean indicating whether paths are compared case-insensitively
   * @internal
   */
  nocase;
  /**
   * boolean indicating that this path is the current working directory
   * of the PathScurry collection that contains it.
   */
  isCWD = false;
  // potential default fs override
  #fs;
  // Stats fields
  #dev;
  get dev() {
    return this.#dev;
  }
  #mode;
  get mode() {
    return this.#mode;
  }
  #nlink;
  get nlink() {
    return this.#nlink;
  }
  #uid;
  get uid() {
    return this.#uid;
  }
  #gid;
  get gid() {
    return this.#gid;
  }
  #rdev;
  get rdev() {
    return this.#rdev;
  }
  #blksize;
  get blksize() {
    return this.#blksize;
  }
  #ino;
  get ino() {
    return this.#ino;
  }
  #size;
  get size() {
    return this.#size;
  }
  #blocks;
  get blocks() {
    return this.#blocks;
  }
  #atimeMs;
  get atimeMs() {
    return this.#atimeMs;
  }
  #mtimeMs;
  get mtimeMs() {
    return this.#mtimeMs;
  }
  #ctimeMs;
  get ctimeMs() {
    return this.#ctimeMs;
  }
  #birthtimeMs;
  get birthtimeMs() {
    return this.#birthtimeMs;
  }
  #atime;
  get atime() {
    return this.#atime;
  }
  #mtime;
  get mtime() {
    return this.#mtime;
  }
  #ctime;
  get ctime() {
    return this.#ctime;
  }
  #birthtime;
  get birthtime() {
    return this.#birthtime;
  }
  #matchName;
  #depth;
  #fullpath;
  #fullpathPosix;
  #relative;
  #relativePosix;
  #type;
  #children;
  #linkTarget;
  #realpath;
  /**
   * This property is for compatibility with the Dirent class as of
   * Node v20, where Dirent['parentPath'] refers to the path of the
   * directory that was passed to readdir. For root entries, it's the path
   * to the entry itself.
   */
  get parentPath() {
    return (this.parent || this).fullpath();
  }
  /**
   * Deprecated alias for Dirent['parentPath'] Somewhat counterintuitively,
   * this property refers to the *parent* path, not the path object itself.
   *
   * @deprecated
   */
  get path() {
    return this.parentPath;
  }
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name2, type2 = UNKNOWN, root2, roots, nocase, children, opts) {
    this.name = name2;
    this.#matchName = nocase ? normalizeNocase(name2) : normalize(name2);
    this.#type = type2 & TYPEMASK;
    this.nocase = nocase;
    this.roots = roots;
    this.root = root2 || this;
    this.#children = children;
    this.#fullpath = opts.fullpath;
    this.#relative = opts.relative;
    this.#relativePosix = opts.relativePosix;
    this.parent = opts.parent;
    if (this.parent) {
      this.#fs = this.parent.#fs;
    } else {
      this.#fs = fsFromOption(opts.fs);
    }
  }
  /**
   * Returns the depth of the Path object from its root.
   *
   * For example, a path at `/foo/bar` would have a depth of 2.
   */
  depth() {
    if (this.#depth !== void 0)
      return this.#depth;
    if (!this.parent)
      return this.#depth = 0;
    return this.#depth = this.parent.depth() + 1;
  }
  /**
   * @internal
   */
  childrenCache() {
    return this.#children;
  }
  /**
   * Get the Path object referenced by the string path, resolved from this Path
   */
  resolve(path2) {
    if (!path2) {
      return this;
    }
    const rootPath = this.getRootString(path2);
    const dir = path2.substring(rootPath.length);
    const dirParts = dir.split(this.splitSep);
    const result = rootPath ? this.getRoot(rootPath).#resolveParts(dirParts) : this.#resolveParts(dirParts);
    return result;
  }
  #resolveParts(dirParts) {
    let p = this;
    for (const part of dirParts) {
      p = p.child(part);
    }
    return p;
  }
  /**
   * Returns the cached children Path objects, if still available.  If they
   * have fallen out of the cache, then returns an empty array, and resets the
   * READDIR_CALLED bit, so that future calls to readdir() will require an fs
   * lookup.
   *
   * @internal
   */
  children() {
    const cached = this.#children.get(this);
    if (cached) {
      return cached;
    }
    const children = Object.assign([], { provisional: 0 });
    this.#children.set(this, children);
    this.#type &= ~READDIR_CALLED;
    return children;
  }
  /**
   * Resolves a path portion and returns or creates the child Path.
   *
   * Returns `this` if pathPart is `''` or `'.'`, or `parent` if pathPart is
   * `'..'`.
   *
   * This should not be called directly.  If `pathPart` contains any path
   * separators, it will lead to unsafe undefined behavior.
   *
   * Use `Path.resolve()` instead.
   *
   * @internal
   */
  child(pathPart, opts) {
    if (pathPart === "" || pathPart === ".") {
      return this;
    }
    if (pathPart === "..") {
      return this.parent || this;
    }
    const children = this.children();
    const name2 = this.nocase ? normalizeNocase(pathPart) : normalize(pathPart);
    for (const p of children) {
      if (p.#matchName === name2) {
        return p;
      }
    }
    const s = this.parent ? this.sep : "";
    const fullpath = this.#fullpath ? this.#fullpath + s + pathPart : void 0;
    const pchild = this.newChild(pathPart, UNKNOWN, {
      ...opts,
      parent: this,
      fullpath
    });
    if (!this.canReaddir()) {
      pchild.#type |= ENOENT;
    }
    children.push(pchild);
    return pchild;
  }
  /**
   * The relative path from the cwd. If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpath()
   */
  relative() {
    if (this.isCWD)
      return "";
    if (this.#relative !== void 0) {
      return this.#relative;
    }
    const name2 = this.name;
    const p = this.parent;
    if (!p) {
      return this.#relative = this.name;
    }
    const pv = p.relative();
    return pv + (!pv || !p.parent ? "" : this.sep) + name2;
  }
  /**
   * The relative path from the cwd, using / as the path separator.
   * If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpathPosix()
   * On posix systems, this is identical to relative().
   */
  relativePosix() {
    if (this.sep === "/")
      return this.relative();
    if (this.isCWD)
      return "";
    if (this.#relativePosix !== void 0)
      return this.#relativePosix;
    const name2 = this.name;
    const p = this.parent;
    if (!p) {
      return this.#relativePosix = this.fullpathPosix();
    }
    const pv = p.relativePosix();
    return pv + (!pv || !p.parent ? "" : "/") + name2;
  }
  /**
   * The fully resolved path string for this Path entry
   */
  fullpath() {
    if (this.#fullpath !== void 0) {
      return this.#fullpath;
    }
    const name2 = this.name;
    const p = this.parent;
    if (!p) {
      return this.#fullpath = this.name;
    }
    const pv = p.fullpath();
    const fp = pv + (!p.parent ? "" : this.sep) + name2;
    return this.#fullpath = fp;
  }
  /**
   * On platforms other than windows, this is identical to fullpath.
   *
   * On windows, this is overridden to return the forward-slash form of the
   * full UNC path.
   */
  fullpathPosix() {
    if (this.#fullpathPosix !== void 0)
      return this.#fullpathPosix;
    if (this.sep === "/")
      return this.#fullpathPosix = this.fullpath();
    if (!this.parent) {
      const p2 = this.fullpath().replace(/\\/g, "/");
      if (/^[a-z]:\//i.test(p2)) {
        return this.#fullpathPosix = `//?/${p2}`;
      } else {
        return this.#fullpathPosix = p2;
      }
    }
    const p = this.parent;
    const pfpp = p.fullpathPosix();
    const fpp = pfpp + (!pfpp || !p.parent ? "" : "/") + this.name;
    return this.#fullpathPosix = fpp;
  }
  /**
   * Is the Path of an unknown type?
   *
   * Note that we might know *something* about it if there has been a previous
   * filesystem operation, for example that it does not exist, or is not a
   * link, or whether it has child entries.
   */
  isUnknown() {
    return (this.#type & IFMT) === UNKNOWN;
  }
  isType(type2) {
    return this[`is${type2}`]();
  }
  getType() {
    return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : (
      /* c8 ignore start */
      this.isSocket() ? "Socket" : "Unknown"
    );
  }
  /**
   * Is the Path a regular file?
   */
  isFile() {
    return (this.#type & IFMT) === IFREG;
  }
  /**
   * Is the Path a directory?
   */
  isDirectory() {
    return (this.#type & IFMT) === IFDIR;
  }
  /**
   * Is the path a character device?
   */
  isCharacterDevice() {
    return (this.#type & IFMT) === IFCHR;
  }
  /**
   * Is the path a block device?
   */
  isBlockDevice() {
    return (this.#type & IFMT) === IFBLK;
  }
  /**
   * Is the path a FIFO pipe?
   */
  isFIFO() {
    return (this.#type & IFMT) === IFIFO;
  }
  /**
   * Is the path a socket?
   */
  isSocket() {
    return (this.#type & IFMT) === IFSOCK;
  }
  /**
   * Is the path a symbolic link?
   */
  isSymbolicLink() {
    return (this.#type & IFLNK) === IFLNK;
  }
  /**
   * Return the entry if it has been subject of a successful lstat, or
   * undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* simply
   * mean that we haven't called lstat on it.
   */
  lstatCached() {
    return this.#type & LSTAT_CALLED ? this : void 0;
  }
  /**
   * Return the cached link target if the entry has been the subject of a
   * successful readlink, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readlink() has been called at some point.
   */
  readlinkCached() {
    return this.#linkTarget;
  }
  /**
   * Returns the cached realpath target if the entry has been the subject
   * of a successful realpath, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * realpath() has been called at some point.
   */
  realpathCached() {
    return this.#realpath;
  }
  /**
   * Returns the cached child Path entries array if the entry has been the
   * subject of a successful readdir(), or [] otherwise.
   *
   * Does not read the filesystem, so an empty array *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readdir() has been called recently enough to still be valid.
   */
  readdirCached() {
    const children = this.children();
    return children.slice(0, children.provisional);
  }
  /**
   * Return true if it's worth trying to readlink.  Ie, we don't (yet) have
   * any indication that readlink will definitely fail.
   *
   * Returns false if the path is known to not be a symlink, if a previous
   * readlink failed, or if the entry does not exist.
   */
  canReadlink() {
    if (this.#linkTarget)
      return true;
    if (!this.parent)
      return false;
    const ifmt = this.#type & IFMT;
    return !(ifmt !== UNKNOWN && ifmt !== IFLNK || this.#type & ENOREADLINK || this.#type & ENOENT);
  }
  /**
   * Return true if readdir has previously been successfully called on this
   * path, indicating that cachedReaddir() is likely valid.
   */
  calledReaddir() {
    return !!(this.#type & READDIR_CALLED);
  }
  /**
   * Returns true if the path is known to not exist. That is, a previous lstat
   * or readdir failed to verify its existence when that would have been
   * expected, or a parent entry was marked either enoent or enotdir.
   */
  isENOENT() {
    return !!(this.#type & ENOENT);
  }
  /**
   * Return true if the path is a match for the given path name.  This handles
   * case sensitivity and unicode normalization.
   *
   * Note: even on case-sensitive systems, it is **not** safe to test the
   * equality of the `.name` property to determine whether a given pathname
   * matches, due to unicode normalization mismatches.
   *
   * Always use this method instead of testing the `path.name` property
   * directly.
   */
  isNamed(n) {
    return !this.nocase ? this.#matchName === normalize(n) : this.#matchName === normalizeNocase(n);
  }
  /**
   * Return the Path object corresponding to the target of a symbolic link.
   *
   * If the Path is not a symbolic link, or if the readlink call fails for any
   * reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   */
  async readlink() {
    const target = this.#linkTarget;
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read = await this.#fs.promises.readlink(this.fullpath());
      const linkTarget = (await this.parent.realpath())?.resolve(read);
      if (linkTarget) {
        return this.#linkTarget = linkTarget;
      }
    } catch (er) {
      this.#readlinkFail(er.code);
      return void 0;
    }
  }
  /**
   * Synchronous {@link PathBase.readlink}
   */
  readlinkSync() {
    const target = this.#linkTarget;
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read = this.#fs.readlinkSync(this.fullpath());
      const linkTarget = this.parent.realpathSync()?.resolve(read);
      if (linkTarget) {
        return this.#linkTarget = linkTarget;
      }
    } catch (er) {
      this.#readlinkFail(er.code);
      return void 0;
    }
  }
  #readdirSuccess(children) {
    this.#type |= READDIR_CALLED;
    for (let p = children.provisional; p < children.length; p++) {
      const c = children[p];
      if (c)
        c.#markENOENT();
    }
  }
  #markENOENT() {
    if (this.#type & ENOENT)
      return;
    this.#type = (this.#type | ENOENT) & IFMT_UNKNOWN;
    this.#markChildrenENOENT();
  }
  #markChildrenENOENT() {
    const children = this.children();
    children.provisional = 0;
    for (const p of children) {
      p.#markENOENT();
    }
  }
  #markENOREALPATH() {
    this.#type |= ENOREALPATH;
    this.#markENOTDIR();
  }
  // save the information when we know the entry is not a dir
  #markENOTDIR() {
    if (this.#type & ENOTDIR)
      return;
    let t = this.#type;
    if ((t & IFMT) === IFDIR)
      t &= IFMT_UNKNOWN;
    this.#type = t | ENOTDIR;
    this.#markChildrenENOENT();
  }
  #readdirFail(code = "") {
    if (code === "ENOTDIR" || code === "EPERM") {
      this.#markENOTDIR();
    } else if (code === "ENOENT") {
      this.#markENOENT();
    } else {
      this.children().provisional = 0;
    }
  }
  #lstatFail(code = "") {
    if (code === "ENOTDIR") {
      const p = this.parent;
      p.#markENOTDIR();
    } else if (code === "ENOENT") {
      this.#markENOENT();
    }
  }
  #readlinkFail(code = "") {
    let ter = this.#type;
    ter |= ENOREADLINK;
    if (code === "ENOENT")
      ter |= ENOENT;
    if (code === "EINVAL" || code === "UNKNOWN") {
      ter &= IFMT_UNKNOWN;
    }
    this.#type = ter;
    if (code === "ENOTDIR" && this.parent) {
      this.parent.#markENOTDIR();
    }
  }
  #readdirAddChild(e, c) {
    return this.#readdirMaybePromoteChild(e, c) || this.#readdirAddNewChild(e, c);
  }
  #readdirAddNewChild(e, c) {
    const type2 = entToType(e);
    const child = this.newChild(e.name, type2, { parent: this });
    const ifmt = child.#type & IFMT;
    if (ifmt !== IFDIR && ifmt !== IFLNK && ifmt !== UNKNOWN) {
      child.#type |= ENOTDIR;
    }
    c.unshift(child);
    c.provisional++;
    return child;
  }
  #readdirMaybePromoteChild(e, c) {
    for (let p = c.provisional; p < c.length; p++) {
      const pchild = c[p];
      const name2 = this.nocase ? normalizeNocase(e.name) : normalize(e.name);
      if (name2 !== pchild.#matchName) {
        continue;
      }
      return this.#readdirPromoteChild(e, pchild, p, c);
    }
  }
  #readdirPromoteChild(e, p, index, c) {
    const v = p.name;
    p.#type = p.#type & IFMT_UNKNOWN | entToType(e);
    if (v !== e.name)
      p.name = e.name;
    if (index !== c.provisional) {
      if (index === c.length - 1)
        c.pop();
      else
        c.splice(index, 1);
      c.unshift(p);
    }
    c.provisional++;
    return p;
  }
  /**
   * Call lstat() on this Path, and update all known information that can be
   * determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat() {
    if ((this.#type & ENOENT) === 0) {
      try {
        this.#applyStat(await this.#fs.promises.lstat(this.fullpath()));
        return this;
      } catch (er) {
        this.#lstatFail(er.code);
      }
    }
  }
  /**
   * synchronous {@link PathBase.lstat}
   */
  lstatSync() {
    if ((this.#type & ENOENT) === 0) {
      try {
        this.#applyStat(this.#fs.lstatSync(this.fullpath()));
        return this;
      } catch (er) {
        this.#lstatFail(er.code);
      }
    }
  }
  #applyStat(st) {
    const { atime, atimeMs, birthtime, birthtimeMs, blksize, blocks, ctime, ctimeMs, dev, gid, ino, mode, mtime, mtimeMs, nlink, rdev, size, uid } = st;
    this.#atime = atime;
    this.#atimeMs = atimeMs;
    this.#birthtime = birthtime;
    this.#birthtimeMs = birthtimeMs;
    this.#blksize = blksize;
    this.#blocks = blocks;
    this.#ctime = ctime;
    this.#ctimeMs = ctimeMs;
    this.#dev = dev;
    this.#gid = gid;
    this.#ino = ino;
    this.#mode = mode;
    this.#mtime = mtime;
    this.#mtimeMs = mtimeMs;
    this.#nlink = nlink;
    this.#rdev = rdev;
    this.#size = size;
    this.#uid = uid;
    const ifmt = entToType(st);
    this.#type = this.#type & IFMT_UNKNOWN | ifmt | LSTAT_CALLED;
    if (ifmt !== UNKNOWN && ifmt !== IFDIR && ifmt !== IFLNK) {
      this.#type |= ENOTDIR;
    }
  }
  #onReaddirCB = [];
  #readdirCBInFlight = false;
  #callOnReaddirCB(children) {
    this.#readdirCBInFlight = false;
    const cbs = this.#onReaddirCB.slice();
    this.#onReaddirCB.length = 0;
    cbs.forEach((cb) => cb(null, children));
  }
  /**
   * Standard node-style callback interface to get list of directory entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   *
   * @param cb The callback called with (er, entries).  Note that the `er`
   * param is somewhat extraneous, as all readdir() errors are handled and
   * simply result in an empty set of entries being returned.
   * @param allowZalgo Boolean indicating that immediately known results should
   * *not* be deferred with `queueMicrotask`. Defaults to `false`. Release
   * zalgo at your peril, the dark pony lord is devious and unforgiving.
   */
  readdirCB(cb, allowZalgo = false) {
    if (!this.canReaddir()) {
      if (allowZalgo)
        cb(null, []);
      else
        queueMicrotask(() => cb(null, []));
      return;
    }
    const children = this.children();
    if (this.calledReaddir()) {
      const c = children.slice(0, children.provisional);
      if (allowZalgo)
        cb(null, c);
      else
        queueMicrotask(() => cb(null, c));
      return;
    }
    this.#onReaddirCB.push(cb);
    if (this.#readdirCBInFlight) {
      return;
    }
    this.#readdirCBInFlight = true;
    const fullpath = this.fullpath();
    this.#fs.readdir(fullpath, { withFileTypes: true }, (er, entries) => {
      if (er) {
        this.#readdirFail(er.code);
        children.provisional = 0;
      } else {
        for (const e of entries) {
          this.#readdirAddChild(e, children);
        }
        this.#readdirSuccess(children);
      }
      this.#callOnReaddirCB(children.slice(0, children.provisional));
      return;
    });
  }
  #asyncReaddirInFlight;
  /**
   * Return an array of known child entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async readdir() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    if (this.#asyncReaddirInFlight) {
      await this.#asyncReaddirInFlight;
    } else {
      let resolve = () => {
      };
      this.#asyncReaddirInFlight = new Promise((res) => resolve = res);
      try {
        for (const e of await this.#fs.promises.readdir(fullpath, {
          withFileTypes: true
        })) {
          this.#readdirAddChild(e, children);
        }
        this.#readdirSuccess(children);
      } catch (er) {
        this.#readdirFail(er.code);
        children.provisional = 0;
      }
      this.#asyncReaddirInFlight = void 0;
      resolve();
    }
    return children.slice(0, children.provisional);
  }
  /**
   * synchronous {@link PathBase.readdir}
   */
  readdirSync() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    try {
      for (const e of this.#fs.readdirSync(fullpath, {
        withFileTypes: true
      })) {
        this.#readdirAddChild(e, children);
      }
      this.#readdirSuccess(children);
    } catch (er) {
      this.#readdirFail(er.code);
      children.provisional = 0;
    }
    return children.slice(0, children.provisional);
  }
  canReaddir() {
    if (this.#type & ENOCHILD)
      return false;
    const ifmt = IFMT & this.#type;
    if (!(ifmt === UNKNOWN || ifmt === IFDIR || ifmt === IFLNK)) {
      return false;
    }
    return true;
  }
  shouldWalk(dirs, walkFilter) {
    return (this.#type & IFDIR) === IFDIR && !(this.#type & ENOCHILD) && !dirs.has(this) && (!walkFilter || walkFilter(this));
  }
  /**
   * Return the Path object corresponding to path as resolved
   * by realpath(3).
   *
   * If the realpath call fails for any reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   * On success, returns a Path object.
   */
  async realpath() {
    if (this.#realpath)
      return this.#realpath;
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
      return void 0;
    try {
      const rp = await this.#fs.promises.realpath(this.fullpath());
      return this.#realpath = this.resolve(rp);
    } catch (_) {
      this.#markENOREALPATH();
    }
  }
  /**
   * Synchronous {@link realpath}
   */
  realpathSync() {
    if (this.#realpath)
      return this.#realpath;
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
      return void 0;
    try {
      const rp = this.#fs.realpathSync(this.fullpath());
      return this.#realpath = this.resolve(rp);
    } catch (_) {
      this.#markENOREALPATH();
    }
  }
  /**
   * Internal method to mark this Path object as the scurry cwd,
   * called by {@link PathScurry#chdir}
   *
   * @internal
   */
  [setAsCwd](oldCwd) {
    if (oldCwd === this)
      return;
    oldCwd.isCWD = false;
    this.isCWD = true;
    const changed = /* @__PURE__ */ new Set([]);
    let rp = [];
    let p = this;
    while (p && p.parent) {
      changed.add(p);
      p.#relative = rp.join(this.sep);
      p.#relativePosix = rp.join("/");
      p = p.parent;
      rp.push("..");
    }
    p = oldCwd;
    while (p && p.parent && !changed.has(p)) {
      p.#relative = void 0;
      p.#relativePosix = void 0;
      p = p.parent;
    }
  }
};
var PathWin32 = class _PathWin32 extends PathBase {
  /**
   * Separator for generating path strings.
   */
  sep = "\\";
  /**
   * Separator for parsing path strings.
   */
  splitSep = eitherSep;
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name2, type2 = UNKNOWN, root2, roots, nocase, children, opts) {
    super(name2, type2, root2, roots, nocase, children, opts);
  }
  /**
   * @internal
   */
  newChild(name2, type2 = UNKNOWN, opts = {}) {
    return new _PathWin32(name2, type2, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return win32.parse(path2).root;
  }
  /**
   * @internal
   */
  getRoot(rootPath) {
    rootPath = uncToDrive(rootPath.toUpperCase());
    if (rootPath === this.root.name) {
      return this.root;
    }
    for (const [compare, root2] of Object.entries(this.roots)) {
      if (this.sameRoot(rootPath, compare)) {
        return this.roots[rootPath] = root2;
      }
    }
    return this.roots[rootPath] = new PathScurryWin32(rootPath, this).root;
  }
  /**
   * @internal
   */
  sameRoot(rootPath, compare = this.root.name) {
    rootPath = rootPath.toUpperCase().replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
    return rootPath === compare;
  }
};
var PathPosix = class _PathPosix extends PathBase {
  /**
   * separator for parsing path strings
   */
  splitSep = "/";
  /**
   * separator for generating path strings
   */
  sep = "/";
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name2, type2 = UNKNOWN, root2, roots, nocase, children, opts) {
    super(name2, type2, root2, roots, nocase, children, opts);
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return path2.startsWith("/") ? "/" : "";
  }
  /**
   * @internal
   */
  getRoot(_rootPath) {
    return this.root;
  }
  /**
   * @internal
   */
  newChild(name2, type2 = UNKNOWN, opts = {}) {
    return new _PathPosix(name2, type2, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
};
var PathScurryBase = class {
  /**
   * The root Path entry for the current working directory of this Scurry
   */
  root;
  /**
   * The string path for the root of this Scurry's current working directory
   */
  rootPath;
  /**
   * A collection of all roots encountered, referenced by rootPath
   */
  roots;
  /**
   * The Path entry corresponding to this PathScurry's current working directory.
   */
  cwd;
  #resolveCache;
  #resolvePosixCache;
  #children;
  /**
   * Perform path comparisons case-insensitively.
   *
   * Defaults true on Darwin and Windows systems, false elsewhere.
   */
  nocase;
  #fs;
  /**
   * This class should not be instantiated directly.
   *
   * Use PathScurryWin32, PathScurryDarwin, PathScurryPosix, or PathScurry
   *
   * @internal
   */
  constructor(cwd = process.cwd(), pathImpl, sep2, { nocase, childrenCacheSize = 16 * 1024, fs = defaultFS } = {}) {
    this.#fs = fsFromOption(fs);
    if (cwd instanceof URL || cwd.startsWith("file://")) {
      cwd = fileURLToPath(cwd);
    }
    const cwdPath = pathImpl.resolve(cwd);
    this.roots = /* @__PURE__ */ Object.create(null);
    this.rootPath = this.parseRootPath(cwdPath);
    this.#resolveCache = new ResolveCache();
    this.#resolvePosixCache = new ResolveCache();
    this.#children = new ChildrenCache(childrenCacheSize);
    const split = cwdPath.substring(this.rootPath.length).split(sep2);
    if (split.length === 1 && !split[0]) {
      split.pop();
    }
    if (nocase === void 0) {
      throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    }
    this.nocase = nocase;
    this.root = this.newRoot(this.#fs);
    this.roots[this.rootPath] = this.root;
    let prev = this.root;
    let len = split.length - 1;
    const joinSep = pathImpl.sep;
    let abs = this.rootPath;
    let sawFirst = false;
    for (const part of split) {
      const l = len--;
      prev = prev.child(part, {
        relative: new Array(l).fill("..").join(joinSep),
        relativePosix: new Array(l).fill("..").join("/"),
        fullpath: abs += (sawFirst ? "" : joinSep) + part
      });
      sawFirst = true;
    }
    this.cwd = prev;
  }
  /**
   * Get the depth of a provided path, string, or the cwd
   */
  depth(path2 = this.cwd) {
    if (typeof path2 === "string") {
      path2 = this.cwd.resolve(path2);
    }
    return path2.depth();
  }
  /**
   * Return the cache of child entries.  Exposed so subclasses can create
   * child Path objects in a platform-specific way.
   *
   * @internal
   */
  childrenCache() {
    return this.#children;
  }
  /**
   * Resolve one or more path strings to a resolved string
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolve(...paths) {
    let r = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r = r ? `${p}/${r}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = this.#resolveCache.get(r);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r).fullpath();
    this.#resolveCache.set(r, result);
    return result;
  }
  /**
   * Resolve one or more path strings to a resolved string, returning
   * the posix path.  Identical to .resolve() on posix systems, but on
   * windows will return a forward-slash separated UNC path.
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolvePosix(...paths) {
    let r = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r = r ? `${p}/${r}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = this.#resolvePosixCache.get(r);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r).fullpathPosix();
    this.#resolvePosixCache.set(r, result);
    return result;
  }
  /**
   * find the relative path from the cwd to the supplied path string or entry
   */
  relative(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relative();
  }
  /**
   * find the relative path from the cwd to the supplied path string or
   * entry, using / as the path delimiter, even on Windows.
   */
  relativePosix(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relativePosix();
  }
  /**
   * Return the basename for the provided string or Path object
   */
  basename(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.name;
  }
  /**
   * Return the dirname for the provided string or Path object
   */
  dirname(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return (entry.parent || entry).fullpath();
  }
  async readdir(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else {
      const p = await entry.readdir();
      return withFileTypes ? p : p.map((e) => e.name);
    }
  }
  readdirSync(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else if (withFileTypes) {
      return entry.readdirSync();
    } else {
      return entry.readdirSync().map((e) => e.name);
    }
  }
  /**
   * Call lstat() on the string or Path object, and update all known
   * information that can be determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstat();
  }
  /**
   * synchronous {@link PathScurryBase.lstat}
   */
  lstatSync(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstatSync();
  }
  async readlink(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = await entry.readlink();
    return withFileTypes ? e : e?.fullpath();
  }
  readlinkSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = entry.readlinkSync();
    return withFileTypes ? e : e?.fullpath();
  }
  async realpath(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = await entry.realpath();
    return withFileTypes ? e : e?.fullpath();
  }
  realpathSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = entry.realpathSync();
    return withFileTypes ? e : e?.fullpath();
  }
  async walk(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = [];
    if (!filter2 || filter2(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const walk2 = (dir, cb) => {
      dirs.add(dir);
      dir.readdirCB((er, entries) => {
        if (er) {
          return cb(er);
        }
        let len = entries.length;
        if (!len)
          return cb();
        const next = () => {
          if (--len === 0) {
            cb();
          }
        };
        for (const e of entries) {
          if (!filter2 || filter2(e)) {
            results.push(withFileTypes ? e : e.fullpath());
          }
          if (follow && e.isSymbolicLink()) {
            e.realpath().then((r) => r?.isUnknown() ? r.lstat() : r).then((r) => r?.shouldWalk(dirs, walkFilter) ? walk2(r, next) : next());
          } else {
            if (e.shouldWalk(dirs, walkFilter)) {
              walk2(e, next);
            } else {
              next();
            }
          }
        }
      }, true);
    };
    const start = entry;
    return new Promise((res, rej) => {
      walk2(start, (er) => {
        if (er)
          return rej(er);
        res(results);
      });
    });
  }
  walkSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = [];
    if (!filter2 || filter2(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir of dirs) {
      const entries = dir.readdirSync();
      for (const e of entries) {
        if (!filter2 || filter2(e)) {
          results.push(withFileTypes ? e : e.fullpath());
        }
        let r = e;
        if (e.isSymbolicLink()) {
          if (!(follow && (r = e.realpathSync())))
            continue;
          if (r.isUnknown())
            r.lstatSync();
        }
        if (r.shouldWalk(dirs, walkFilter)) {
          dirs.add(r);
        }
      }
    }
    return results;
  }
  /**
   * Support for `for await`
   *
   * Alias for {@link PathScurryBase.iterate}
   *
   * Note: As of Node 19, this is very slow, compared to other methods of
   * walking.  Consider using {@link PathScurryBase.stream} if memory overhead
   * and backpressure are concerns, or {@link PathScurryBase.walk} if not.
   */
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
  iterate(entry = this.cwd, options = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      options = entry;
      entry = this.cwd;
    }
    return this.stream(entry, options)[Symbol.asyncIterator]();
  }
  /**
   * Iterating over a PathScurry performs a synchronous walk.
   *
   * Alias for {@link PathScurryBase.iterateSync}
   */
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  *iterateSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    if (!filter2 || filter2(entry)) {
      yield withFileTypes ? entry : entry.fullpath();
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir of dirs) {
      const entries = dir.readdirSync();
      for (const e of entries) {
        if (!filter2 || filter2(e)) {
          yield withFileTypes ? e : e.fullpath();
        }
        let r = e;
        if (e.isSymbolicLink()) {
          if (!(follow && (r = e.realpathSync())))
            continue;
          if (r.isUnknown())
            r.lstatSync();
        }
        if (r.shouldWalk(dirs, walkFilter)) {
          dirs.add(r);
        }
      }
    }
  }
  stream(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = new Minipass({ objectMode: true });
    if (!filter2 || filter2(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir = queue.shift();
        if (!dir) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir);
        const onReaddir = (er, entries, didRealpaths = false) => {
          if (er)
            return results.emit("error", er);
          if (follow && !didRealpaths) {
            const promises = [];
            for (const e of entries) {
              if (e.isSymbolicLink()) {
                promises.push(e.realpath().then((r) => r?.isUnknown() ? r.lstat() : r));
              }
            }
            if (promises.length) {
              Promise.all(promises).then(() => onReaddir(null, entries, true));
              return;
            }
          }
          for (const e of entries) {
            if (e && (!filter2 || filter2(e))) {
              if (!results.write(withFileTypes ? e : e.fullpath())) {
                paused = true;
              }
            }
          }
          processing--;
          for (const e of entries) {
            const r = e.realpathCached() || e;
            if (r.shouldWalk(dirs, walkFilter)) {
              queue.push(r);
            }
          }
          if (paused && !results.flowing) {
            results.once("drain", process2);
          } else if (!sync2) {
            process2();
          }
        };
        let sync2 = true;
        dir.readdirCB(onReaddir, true);
        sync2 = false;
      }
    };
    process2();
    return results;
  }
  streamSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
    const results = new Minipass({ objectMode: true });
    const dirs = /* @__PURE__ */ new Set();
    if (!filter2 || filter2(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir = queue.shift();
        if (!dir) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir);
        const entries = dir.readdirSync();
        for (const e of entries) {
          if (!filter2 || filter2(e)) {
            if (!results.write(withFileTypes ? e : e.fullpath())) {
              paused = true;
            }
          }
        }
        processing--;
        for (const e of entries) {
          let r = e;
          if (e.isSymbolicLink()) {
            if (!(follow && (r = e.realpathSync())))
              continue;
            if (r.isUnknown())
              r.lstatSync();
          }
          if (r.shouldWalk(dirs, walkFilter)) {
            queue.push(r);
          }
        }
      }
      if (paused && !results.flowing)
        results.once("drain", process2);
    };
    process2();
    return results;
  }
  chdir(path2 = this.cwd) {
    const oldCwd = this.cwd;
    this.cwd = typeof path2 === "string" ? this.cwd.resolve(path2) : path2;
    this.cwd[setAsCwd](oldCwd);
  }
};
var PathScurryWin32 = class extends PathScurryBase {
  /**
   * separator for generating path strings
   */
  sep = "\\";
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, win32, "\\", { ...opts, nocase });
    this.nocase = nocase;
    for (let p = this.cwd; p; p = p.parent) {
      p.nocase = this.nocase;
    }
  }
  /**
   * @internal
   */
  parseRootPath(dir) {
    return win32.parse(dir).root.toUpperCase();
  }
  /**
   * @internal
   */
  newRoot(fs) {
    return new PathWin32(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/") || p.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(p);
  }
};
var PathScurryPosix = class extends PathScurryBase {
  /**
   * separator for generating path strings
   */
  sep = "/";
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = false } = opts;
    super(cwd, posix, "/", { ...opts, nocase });
    this.nocase = nocase;
  }
  /**
   * @internal
   */
  parseRootPath(_dir) {
    return "/";
  }
  /**
   * @internal
   */
  newRoot(fs) {
    return new PathPosix(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/");
  }
};
var PathScurryDarwin = class extends PathScurryPosix {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, { ...opts, nocase });
  }
};
var Path = process.platform === "win32" ? PathWin32 : PathPosix;
var PathScurry = process.platform === "win32" ? PathScurryWin32 : process.platform === "darwin" ? PathScurryDarwin : PathScurryPosix;

// node_modules/glob/dist/esm/pattern.js
var isPatternList = (pl) => pl.length >= 1;
var isGlobList = (gl) => gl.length >= 1;
var Pattern = class _Pattern {
  #patternList;
  #globList;
  #index;
  length;
  #platform;
  #rest;
  #globString;
  #isDrive;
  #isUNC;
  #isAbsolute;
  #followGlobstar = true;
  constructor(patternList, globList, index, platform) {
    if (!isPatternList(patternList)) {
      throw new TypeError("empty pattern list");
    }
    if (!isGlobList(globList)) {
      throw new TypeError("empty glob list");
    }
    if (globList.length !== patternList.length) {
      throw new TypeError("mismatched pattern list and glob list lengths");
    }
    this.length = patternList.length;
    if (index < 0 || index >= this.length) {
      throw new TypeError("index out of range");
    }
    this.#patternList = patternList;
    this.#globList = globList;
    this.#index = index;
    this.#platform = platform;
    if (this.#index === 0) {
      if (this.isUNC()) {
        const [p0, p1, p2, p3, ...prest] = this.#patternList;
        const [g0, g1, g2, g3, ...grest] = this.#globList;
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = [p0, p1, p2, p3, ""].join("/");
        const g = [g0, g1, g2, g3, ""].join("/");
        this.#patternList = [p, ...prest];
        this.#globList = [g, ...grest];
        this.length = this.#patternList.length;
      } else if (this.isDrive() || this.isAbsolute()) {
        const [p1, ...prest] = this.#patternList;
        const [g1, ...grest] = this.#globList;
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = p1 + "/";
        const g = g1 + "/";
        this.#patternList = [p, ...prest];
        this.#globList = [g, ...grest];
        this.length = this.#patternList.length;
      }
    }
  }
  /**
   * The first entry in the parsed list of patterns
   */
  pattern() {
    return this.#patternList[this.#index];
  }
  /**
   * true of if pattern() returns a string
   */
  isString() {
    return typeof this.#patternList[this.#index] === "string";
  }
  /**
   * true of if pattern() returns GLOBSTAR
   */
  isGlobstar() {
    return this.#patternList[this.#index] === GLOBSTAR;
  }
  /**
   * true if pattern() returns a regexp
   */
  isRegExp() {
    return this.#patternList[this.#index] instanceof RegExp;
  }
  /**
   * The /-joined set of glob parts that make up this pattern
   */
  globString() {
    return this.#globString = this.#globString || (this.#index === 0 ? this.isAbsolute() ? this.#globList[0] + this.#globList.slice(1).join("/") : this.#globList.join("/") : this.#globList.slice(this.#index).join("/"));
  }
  /**
   * true if there are more pattern parts after this one
   */
  hasMore() {
    return this.length > this.#index + 1;
  }
  /**
   * The rest of the pattern after this part, or null if this is the end
   */
  rest() {
    if (this.#rest !== void 0)
      return this.#rest;
    if (!this.hasMore())
      return this.#rest = null;
    this.#rest = new _Pattern(this.#patternList, this.#globList, this.#index + 1, this.#platform);
    this.#rest.#isAbsolute = this.#isAbsolute;
    this.#rest.#isUNC = this.#isUNC;
    this.#rest.#isDrive = this.#isDrive;
    return this.#rest;
  }
  /**
   * true if the pattern represents a //unc/path/ on windows
   */
  isUNC() {
    const pl = this.#patternList;
    return this.#isUNC !== void 0 ? this.#isUNC : this.#isUNC = this.#platform === "win32" && this.#index === 0 && pl[0] === "" && pl[1] === "" && typeof pl[2] === "string" && !!pl[2] && typeof pl[3] === "string" && !!pl[3];
  }
  // pattern like C:/...
  // split = ['C:', ...]
  // XXX: would be nice to handle patterns like `c:*` to test the cwd
  // in c: for *, but I don't know of a way to even figure out what that
  // cwd is without actually chdir'ing into it?
  /**
   * True if the pattern starts with a drive letter on Windows
   */
  isDrive() {
    const pl = this.#patternList;
    return this.#isDrive !== void 0 ? this.#isDrive : this.#isDrive = this.#platform === "win32" && this.#index === 0 && this.length > 1 && typeof pl[0] === "string" && /^[a-z]:$/i.test(pl[0]);
  }
  // pattern = '/' or '/...' or '/x/...'
  // split = ['', ''] or ['', ...] or ['', 'x', ...]
  // Drive and UNC both considered absolute on windows
  /**
   * True if the pattern is rooted on an absolute path
   */
  isAbsolute() {
    const pl = this.#patternList;
    return this.#isAbsolute !== void 0 ? this.#isAbsolute : this.#isAbsolute = pl[0] === "" && pl.length > 1 || this.isDrive() || this.isUNC();
  }
  /**
   * consume the root of the pattern, and return it
   */
  root() {
    const p = this.#patternList[0];
    return typeof p === "string" && this.isAbsolute() && this.#index === 0 ? p : "";
  }
  /**
   * Check to see if the current globstar pattern is allowed to follow
   * a symbolic link.
   */
  checkFollowGlobstar() {
    return !(this.#index === 0 || !this.isGlobstar() || !this.#followGlobstar);
  }
  /**
   * Mark that the current globstar pattern is following a symbolic link
   */
  markFollowGlobstar() {
    if (this.#index === 0 || !this.isGlobstar() || !this.#followGlobstar)
      return false;
    this.#followGlobstar = false;
    return true;
  }
};

// node_modules/glob/dist/esm/ignore.js
var defaultPlatform2 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
var Ignore = class {
  relative;
  relativeChildren;
  absolute;
  absoluteChildren;
  platform;
  mmopts;
  constructor(ignored, { nobrace, nocase, noext, noglobstar, platform = defaultPlatform2 }) {
    this.relative = [];
    this.absolute = [];
    this.relativeChildren = [];
    this.absoluteChildren = [];
    this.platform = platform;
    this.mmopts = {
      dot: true,
      nobrace,
      nocase,
      noext,
      noglobstar,
      optimizationLevel: 2,
      platform,
      nocomment: true,
      nonegate: true
    };
    for (const ign of ignored)
      this.add(ign);
  }
  add(ign) {
    const mm = new Minimatch(ign, this.mmopts);
    for (let i = 0; i < mm.set.length; i++) {
      const parsed = mm.set[i];
      const globParts = mm.globParts[i];
      if (!parsed || !globParts) {
        throw new Error("invalid pattern object");
      }
      while (parsed[0] === "." && globParts[0] === ".") {
        parsed.shift();
        globParts.shift();
      }
      const p = new Pattern(parsed, globParts, 0, this.platform);
      const m = new Minimatch(p.globString(), this.mmopts);
      const children = globParts[globParts.length - 1] === "**";
      const absolute = p.isAbsolute();
      if (absolute)
        this.absolute.push(m);
      else
        this.relative.push(m);
      if (children) {
        if (absolute)
          this.absoluteChildren.push(m);
        else
          this.relativeChildren.push(m);
      }
    }
  }
  ignored(p) {
    const fullpath = p.fullpath();
    const fullpaths = `${fullpath}/`;
    const relative = p.relative() || ".";
    const relatives = `${relative}/`;
    for (const m of this.relative) {
      if (m.match(relative) || m.match(relatives))
        return true;
    }
    for (const m of this.absolute) {
      if (m.match(fullpath) || m.match(fullpaths))
        return true;
    }
    return false;
  }
  childrenIgnored(p) {
    const fullpath = p.fullpath() + "/";
    const relative = (p.relative() || ".") + "/";
    for (const m of this.relativeChildren) {
      if (m.match(relative))
        return true;
    }
    for (const m of this.absoluteChildren) {
      if (m.match(fullpath))
        return true;
    }
    return false;
  }
};

// node_modules/glob/dist/esm/processor.js
var HasWalkedCache = class _HasWalkedCache {
  store;
  constructor(store = /* @__PURE__ */ new Map()) {
    this.store = store;
  }
  copy() {
    return new _HasWalkedCache(new Map(this.store));
  }
  hasWalked(target, pattern) {
    return this.store.get(target.fullpath())?.has(pattern.globString());
  }
  storeWalked(target, pattern) {
    const fullpath = target.fullpath();
    const cached = this.store.get(fullpath);
    if (cached)
      cached.add(pattern.globString());
    else
      this.store.set(fullpath, /* @__PURE__ */ new Set([pattern.globString()]));
  }
};
var MatchRecord = class {
  store = /* @__PURE__ */ new Map();
  add(target, absolute, ifDir) {
    const n = (absolute ? 2 : 0) | (ifDir ? 1 : 0);
    const current = this.store.get(target);
    this.store.set(target, current === void 0 ? n : n & current);
  }
  // match, absolute, ifdir
  entries() {
    return [...this.store.entries()].map(([path2, n]) => [
      path2,
      !!(n & 2),
      !!(n & 1)
    ]);
  }
};
var SubWalks = class {
  store = /* @__PURE__ */ new Map();
  add(target, pattern) {
    if (!target.canReaddir()) {
      return;
    }
    const subs = this.store.get(target);
    if (subs) {
      if (!subs.find((p) => p.globString() === pattern.globString())) {
        subs.push(pattern);
      }
    } else
      this.store.set(target, [pattern]);
  }
  get(target) {
    const subs = this.store.get(target);
    if (!subs) {
      throw new Error("attempting to walk unknown path");
    }
    return subs;
  }
  entries() {
    return this.keys().map((k) => [k, this.store.get(k)]);
  }
  keys() {
    return [...this.store.keys()].filter((t) => t.canReaddir());
  }
};
var Processor = class _Processor {
  hasWalkedCache;
  matches = new MatchRecord();
  subwalks = new SubWalks();
  patterns;
  follow;
  dot;
  opts;
  constructor(opts, hasWalkedCache) {
    this.opts = opts;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.hasWalkedCache = hasWalkedCache ? hasWalkedCache.copy() : new HasWalkedCache();
  }
  processPatterns(target, patterns) {
    this.patterns = patterns;
    const processingSet = patterns.map((p) => [target, p]);
    for (let [t, pattern] of processingSet) {
      this.hasWalkedCache.storeWalked(t, pattern);
      const root2 = pattern.root();
      const absolute = pattern.isAbsolute() && this.opts.absolute !== false;
      if (root2) {
        t = t.resolve(root2 === "/" && this.opts.root !== void 0 ? this.opts.root : root2);
        const rest2 = pattern.rest();
        if (!rest2) {
          this.matches.add(t, true, false);
          continue;
        } else {
          pattern = rest2;
        }
      }
      if (t.isENOENT())
        continue;
      let p;
      let rest;
      let changed = false;
      while (typeof (p = pattern.pattern()) === "string" && (rest = pattern.rest())) {
        const c = t.resolve(p);
        t = c;
        pattern = rest;
        changed = true;
      }
      p = pattern.pattern();
      rest = pattern.rest();
      if (changed) {
        if (this.hasWalkedCache.hasWalked(t, pattern))
          continue;
        this.hasWalkedCache.storeWalked(t, pattern);
      }
      if (typeof p === "string") {
        const ifDir = p === ".." || p === "" || p === ".";
        this.matches.add(t.resolve(p), absolute, ifDir);
        continue;
      } else if (p === GLOBSTAR) {
        if (!t.isSymbolicLink() || this.follow || pattern.checkFollowGlobstar()) {
          this.subwalks.add(t, pattern);
        }
        const rp = rest?.pattern();
        const rrest = rest?.rest();
        if (!rest || (rp === "" || rp === ".") && !rrest) {
          this.matches.add(t, absolute, rp === "" || rp === ".");
        } else {
          if (rp === "..") {
            const tp = t.parent || t;
            if (!rrest)
              this.matches.add(tp, absolute, true);
            else if (!this.hasWalkedCache.hasWalked(tp, rrest)) {
              this.subwalks.add(tp, rrest);
            }
          }
        }
      } else if (p instanceof RegExp) {
        this.subwalks.add(t, pattern);
      }
    }
    return this;
  }
  subwalkTargets() {
    return this.subwalks.keys();
  }
  child() {
    return new _Processor(this.opts, this.hasWalkedCache);
  }
  // return a new Processor containing the subwalks for each
  // child entry, and a set of matches, and
  // a hasWalkedCache that's a copy of this one
  // then we're going to call
  filterEntries(parent2, entries) {
    const patterns = this.subwalks.get(parent2);
    const results = this.child();
    for (const e of entries) {
      for (const pattern of patterns) {
        const absolute = pattern.isAbsolute();
        const p = pattern.pattern();
        const rest = pattern.rest();
        if (p === GLOBSTAR) {
          results.testGlobstar(e, pattern, rest, absolute);
        } else if (p instanceof RegExp) {
          results.testRegExp(e, p, rest, absolute);
        } else {
          results.testString(e, p, rest, absolute);
        }
      }
    }
    return results;
  }
  testGlobstar(e, pattern, rest, absolute) {
    if (this.dot || !e.name.startsWith(".")) {
      if (!pattern.hasMore()) {
        this.matches.add(e, absolute, false);
      }
      if (e.canReaddir()) {
        if (this.follow || !e.isSymbolicLink()) {
          this.subwalks.add(e, pattern);
        } else if (e.isSymbolicLink()) {
          if (rest && pattern.checkFollowGlobstar()) {
            this.subwalks.add(e, rest);
          } else if (pattern.markFollowGlobstar()) {
            this.subwalks.add(e, pattern);
          }
        }
      }
    }
    if (rest) {
      const rp = rest.pattern();
      if (typeof rp === "string" && // dots and empty were handled already
      rp !== ".." && rp !== "" && rp !== ".") {
        this.testString(e, rp, rest.rest(), absolute);
      } else if (rp === "..") {
        const ep = e.parent || e;
        this.subwalks.add(ep, rest);
      } else if (rp instanceof RegExp) {
        this.testRegExp(e, rp, rest.rest(), absolute);
      }
    }
  }
  testRegExp(e, p, rest, absolute) {
    if (!p.test(e.name))
      return;
    if (!rest) {
      this.matches.add(e, absolute, false);
    } else {
      this.subwalks.add(e, rest);
    }
  }
  testString(e, p, rest, absolute) {
    if (!e.isNamed(p))
      return;
    if (!rest) {
      this.matches.add(e, absolute, false);
    } else {
      this.subwalks.add(e, rest);
    }
  }
};

// node_modules/glob/dist/esm/walker.js
var makeIgnore = (ignore, opts) => typeof ignore === "string" ? new Ignore([ignore], opts) : Array.isArray(ignore) ? new Ignore(ignore, opts) : ignore;
var GlobUtil = class {
  path;
  patterns;
  opts;
  seen = /* @__PURE__ */ new Set();
  paused = false;
  aborted = false;
  #onResume = [];
  #ignore;
  #sep;
  signal;
  maxDepth;
  includeChildMatches;
  constructor(patterns, path2, opts) {
    this.patterns = patterns;
    this.path = path2;
    this.opts = opts;
    this.#sep = !opts.posix && opts.platform === "win32" ? "\\" : "/";
    this.includeChildMatches = opts.includeChildMatches !== false;
    if (opts.ignore || !this.includeChildMatches) {
      this.#ignore = makeIgnore(opts.ignore ?? [], opts);
      if (!this.includeChildMatches && typeof this.#ignore.add !== "function") {
        const m = "cannot ignore child matches, ignore lacks add() method.";
        throw new Error(m);
      }
    }
    this.maxDepth = opts.maxDepth || Infinity;
    if (opts.signal) {
      this.signal = opts.signal;
      this.signal.addEventListener("abort", () => {
        this.#onResume.length = 0;
      });
    }
  }
  #ignored(path2) {
    return this.seen.has(path2) || !!this.#ignore?.ignored?.(path2);
  }
  #childrenIgnored(path2) {
    return !!this.#ignore?.childrenIgnored?.(path2);
  }
  // backpressure mechanism
  pause() {
    this.paused = true;
  }
  resume() {
    if (this.signal?.aborted)
      return;
    this.paused = false;
    let fn = void 0;
    while (!this.paused && (fn = this.#onResume.shift())) {
      fn();
    }
  }
  onResume(fn) {
    if (this.signal?.aborted)
      return;
    if (!this.paused) {
      fn();
    } else {
      this.#onResume.push(fn);
    }
  }
  // do the requisite realpath/stat checking, and return the path
  // to add or undefined to filter it out.
  async matchCheck(e, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e.realpathCached() || await e.realpath();
      if (!rpc)
        return void 0;
      e = rpc;
    }
    const needStat = e.isUnknown() || this.opts.stat;
    const s = needStat ? await e.lstat() : e;
    if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
      const target = await s.realpath();
      if (target && (target.isUnknown() || this.opts.stat)) {
        await target.lstat();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchCheckTest(e, ifDir) {
    return e && (this.maxDepth === Infinity || e.depth() <= this.maxDepth) && (!ifDir || e.canReaddir()) && (!this.opts.nodir || !e.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !e.isSymbolicLink() || !e.realpathCached()?.isDirectory()) && !this.#ignored(e) ? e : void 0;
  }
  matchCheckSync(e, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e.realpathCached() || e.realpathSync();
      if (!rpc)
        return void 0;
      e = rpc;
    }
    const needStat = e.isUnknown() || this.opts.stat;
    const s = needStat ? e.lstatSync() : e;
    if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
      const target = s.realpathSync();
      if (target && (target?.isUnknown() || this.opts.stat)) {
        target.lstatSync();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchFinish(e, absolute) {
    if (this.#ignored(e))
      return;
    if (!this.includeChildMatches && this.#ignore?.add) {
      const ign = `${e.relativePosix()}/**`;
      this.#ignore.add(ign);
    }
    const abs = this.opts.absolute === void 0 ? absolute : this.opts.absolute;
    this.seen.add(e);
    const mark = this.opts.mark && e.isDirectory() ? this.#sep : "";
    if (this.opts.withFileTypes) {
      this.matchEmit(e);
    } else if (abs) {
      const abs2 = this.opts.posix ? e.fullpathPosix() : e.fullpath();
      this.matchEmit(abs2 + mark);
    } else {
      const rel = this.opts.posix ? e.relativePosix() : e.relative();
      const pre = this.opts.dotRelative && !rel.startsWith(".." + this.#sep) ? "." + this.#sep : "";
      this.matchEmit(!rel ? "." + mark : pre + rel + mark);
    }
  }
  async match(e, absolute, ifDir) {
    const p = await this.matchCheck(e, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  matchSync(e, absolute, ifDir) {
    const p = this.matchCheckSync(e, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  walkCB(target, patterns, cb) {
    if (this.signal?.aborted)
      cb();
    this.walkCB2(target, patterns, new Processor(this.opts), cb);
  }
  walkCB2(target, patterns, processor, cb) {
    if (this.#childrenIgnored(target))
      return cb();
    if (this.signal?.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2(target, patterns, processor, cb));
      return;
    }
    processor.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (this.#ignored(m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const t of processor.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const childrenCached = t.readdirCached();
      if (t.calledReaddir())
        this.walkCB3(t, childrenCached, processor, next);
      else {
        t.readdirCB((_, entries) => this.walkCB3(t, entries, processor, next), true);
      }
    }
    next();
  }
  walkCB3(target, entries, processor, cb) {
    processor = processor.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (this.#ignored(m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const [target2, patterns] of processor.subwalks.entries()) {
      tasks++;
      this.walkCB2(target2, patterns, processor.child(), next);
    }
    next();
  }
  walkCBSync(target, patterns, cb) {
    if (this.signal?.aborted)
      cb();
    this.walkCB2Sync(target, patterns, new Processor(this.opts), cb);
  }
  walkCB2Sync(target, patterns, processor, cb) {
    if (this.#childrenIgnored(target))
      return cb();
    if (this.signal?.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2Sync(target, patterns, processor, cb));
      return;
    }
    processor.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (this.#ignored(m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const t of processor.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const children = t.readdirSync();
      this.walkCB3Sync(t, children, processor, next);
    }
    next();
  }
  walkCB3Sync(target, entries, processor, cb) {
    processor = processor.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor.matches.entries()) {
      if (this.#ignored(m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const [target2, patterns] of processor.subwalks.entries()) {
      tasks++;
      this.walkCB2Sync(target2, patterns, processor.child(), next);
    }
    next();
  }
};
var GlobWalker = class extends GlobUtil {
  matches = /* @__PURE__ */ new Set();
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
  }
  matchEmit(e) {
    this.matches.add(e);
  }
  async walk() {
    if (this.signal?.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      await this.path.lstat();
    }
    await new Promise((res, rej) => {
      this.walkCB(this.path, this.patterns, () => {
        if (this.signal?.aborted) {
          rej(this.signal.reason);
        } else {
          res(this.matches);
        }
      });
    });
    return this.matches;
  }
  walkSync() {
    if (this.signal?.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => {
      if (this.signal?.aborted)
        throw this.signal.reason;
    });
    return this.matches;
  }
};
var GlobStream = class extends GlobUtil {
  results;
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
    this.results = new Minipass({
      signal: this.signal,
      objectMode: true
    });
    this.results.on("drain", () => this.resume());
    this.results.on("resume", () => this.resume());
  }
  matchEmit(e) {
    this.results.write(e);
    if (!this.results.flowing)
      this.pause();
  }
  stream() {
    const target = this.path;
    if (target.isUnknown()) {
      target.lstat().then(() => {
        this.walkCB(target, this.patterns, () => this.results.end());
      });
    } else {
      this.walkCB(target, this.patterns, () => this.results.end());
    }
    return this.results;
  }
  streamSync() {
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => this.results.end());
    return this.results;
  }
};

// node_modules/glob/dist/esm/glob.js
var defaultPlatform3 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
var Glob = class {
  absolute;
  cwd;
  root;
  dot;
  dotRelative;
  follow;
  ignore;
  magicalBraces;
  mark;
  matchBase;
  maxDepth;
  nobrace;
  nocase;
  nodir;
  noext;
  noglobstar;
  pattern;
  platform;
  realpath;
  scurry;
  stat;
  signal;
  windowsPathsNoEscape;
  withFileTypes;
  includeChildMatches;
  /**
   * The options provided to the constructor.
   */
  opts;
  /**
   * An array of parsed immutable {@link Pattern} objects.
   */
  patterns;
  /**
   * All options are stored as properties on the `Glob` object.
   *
   * See {@link GlobOptions} for full options descriptions.
   *
   * Note that a previous `Glob` object can be passed as the
   * `GlobOptions` to another `Glob` instantiation to re-use settings
   * and caches with a new pattern.
   *
   * Traversal functions can be called multiple times to run the walk
   * again.
   */
  constructor(pattern, opts) {
    if (!opts)
      throw new TypeError("glob options required");
    this.withFileTypes = !!opts.withFileTypes;
    this.signal = opts.signal;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.dotRelative = !!opts.dotRelative;
    this.nodir = !!opts.nodir;
    this.mark = !!opts.mark;
    if (!opts.cwd) {
      this.cwd = "";
    } else if (opts.cwd instanceof URL || opts.cwd.startsWith("file://")) {
      opts.cwd = fileURLToPath2(opts.cwd);
    }
    this.cwd = opts.cwd || "";
    this.root = opts.root;
    this.magicalBraces = !!opts.magicalBraces;
    this.nobrace = !!opts.nobrace;
    this.noext = !!opts.noext;
    this.realpath = !!opts.realpath;
    this.absolute = opts.absolute;
    this.includeChildMatches = opts.includeChildMatches !== false;
    this.noglobstar = !!opts.noglobstar;
    this.matchBase = !!opts.matchBase;
    this.maxDepth = typeof opts.maxDepth === "number" ? opts.maxDepth : Infinity;
    this.stat = !!opts.stat;
    this.ignore = opts.ignore;
    if (this.withFileTypes && this.absolute !== void 0) {
      throw new Error("cannot set absolute and withFileTypes:true");
    }
    if (typeof pattern === "string") {
      pattern = [pattern];
    }
    this.windowsPathsNoEscape = !!opts.windowsPathsNoEscape || opts.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      pattern = pattern.map((p) => p.replace(/\\/g, "/"));
    }
    if (this.matchBase) {
      if (opts.noglobstar) {
        throw new TypeError("base matching requires globstar");
      }
      pattern = pattern.map((p) => p.includes("/") ? p : `./**/${p}`);
    }
    this.pattern = pattern;
    this.platform = opts.platform || defaultPlatform3;
    this.opts = { ...opts, platform: this.platform };
    if (opts.scurry) {
      this.scurry = opts.scurry;
      if (opts.nocase !== void 0 && opts.nocase !== opts.scurry.nocase) {
        throw new Error("nocase option contradicts provided scurry option");
      }
    } else {
      const Scurry = opts.platform === "win32" ? PathScurryWin32 : opts.platform === "darwin" ? PathScurryDarwin : opts.platform ? PathScurryPosix : PathScurry;
      this.scurry = new Scurry(this.cwd, {
        nocase: opts.nocase,
        fs: opts.fs
      });
    }
    this.nocase = this.scurry.nocase;
    const nocaseMagicOnly = this.platform === "darwin" || this.platform === "win32";
    const mmo = {
      // default nocase based on platform
      ...opts,
      dot: this.dot,
      matchBase: this.matchBase,
      nobrace: this.nobrace,
      nocase: this.nocase,
      nocaseMagicOnly,
      nocomment: true,
      noext: this.noext,
      nonegate: true,
      optimizationLevel: 2,
      platform: this.platform,
      windowsPathsNoEscape: this.windowsPathsNoEscape,
      debug: !!this.opts.debug
    };
    const mms = this.pattern.map((p) => new Minimatch(p, mmo));
    const [matchSet, globParts] = mms.reduce((set2, m) => {
      set2[0].push(...m.set);
      set2[1].push(...m.globParts);
      return set2;
    }, [[], []]);
    this.patterns = matchSet.map((set2, i) => {
      const g = globParts[i];
      if (!g)
        throw new Error("invalid pattern object");
      return new Pattern(set2, g, 0, this.platform);
    });
  }
  async walk() {
    return [
      ...await new GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walk()
    ];
  }
  walkSync() {
    return [
      ...new GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walkSync()
    ];
  }
  stream() {
    return new GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).stream();
  }
  streamSync() {
    return new GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).streamSync();
  }
  /**
   * Default sync iteration function. Returns a Generator that
   * iterates over the results.
   */
  iterateSync() {
    return this.streamSync()[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  /**
   * Default async iteration function. Returns an AsyncGenerator that
   * iterates over the results.
   */
  iterate() {
    return this.stream()[Symbol.asyncIterator]();
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
};

// node_modules/glob/dist/esm/has-magic.js
var hasMagic = (pattern, options = {}) => {
  if (!Array.isArray(pattern)) {
    pattern = [pattern];
  }
  for (const p of pattern) {
    if (new Minimatch(p, options).hasMagic())
      return true;
  }
  return false;
};

// node_modules/glob/dist/esm/index.js
function globStreamSync(pattern, options = {}) {
  return new Glob(pattern, options).streamSync();
}
function globStream(pattern, options = {}) {
  return new Glob(pattern, options).stream();
}
function globSync(pattern, options = {}) {
  return new Glob(pattern, options).walkSync();
}
async function glob_(pattern, options = {}) {
  return new Glob(pattern, options).walk();
}
function globIterateSync(pattern, options = {}) {
  return new Glob(pattern, options).iterateSync();
}
function globIterate(pattern, options = {}) {
  return new Glob(pattern, options).iterate();
}
var streamSync = globStreamSync;
var stream = Object.assign(globStream, { sync: globStreamSync });
var iterateSync = globIterateSync;
var iterate = Object.assign(globIterate, {
  sync: globIterateSync
});
var sync = Object.assign(globSync, {
  stream: globStreamSync,
  iterate: globIterateSync
});
var glob = Object.assign(glob_, {
  glob: glob_,
  globSync,
  sync,
  globStream,
  stream,
  globStreamSync,
  streamSync,
  globIterate,
  iterate,
  globIterateSync,
  iterateSync,
  Glob,
  hasMagic,
  escape,
  unescape
});
glob.glob = glob;

// src/plugin.ts
import { readFileSync } from "node:fs";
import { extname, join } from "node:path";

// node_modules/zwitch/index.js
var own = {}.hasOwnProperty;
function zwitch(key, options) {
  const settings = options || {};
  function one2(value, ...parameters) {
    let fn = one2.invalid;
    const handlers = one2.handlers;
    if (value && own.call(value, key)) {
      const id = String(value[key]);
      fn = own.call(handlers, id) ? handlers[id] : one2.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one2.handlers = settings.handlers || {};
  one2.invalid = settings.invalid;
  one2.unknown = settings.unknown;
  return one2;
}

// node_modules/unist-util-select/lib/attribute.js
var handle = zwitch("operator", {
  unknown: unknownOperator,
  // @ts-expect-error: hush.
  invalid: exists,
  handlers: {
    "=": exact,
    "^=": begins,
    "$=": ends,
    "*=": containsString,
    "~=": containsArray
  }
});
function attribute(query, node) {
  let index = -1;
  while (++index < query.attrs.length) {
    if (!handle(query.attrs[index], node)) return false;
  }
  return true;
}
function exists(query, node) {
  return node[query.name] !== null && node[query.name] !== void 0;
}
function exact(query, node) {
  return exists(query, node) && String(node[query.name]) === query.value;
}
function containsArray(query, node) {
  const value = node[query.name];
  if (value === null || value === void 0) return false;
  if (Array.isArray(value) && value.includes(query.value)) {
    return true;
  }
  return String(value) === query.value;
}
function begins(query, node) {
  const value = node[query.name];
  return Boolean(
    query.value && typeof value === "string" && value.slice(0, query.value.length) === query.value
  );
}
function ends(query, node) {
  const value = node[query.name];
  return Boolean(
    query.value && typeof value === "string" && value.slice(-query.value.length) === query.value
  );
}
function containsString(query, node) {
  const value = node[query.name];
  return Boolean(
    query.value && typeof value === "string" && value.includes(query.value)
  );
}
function unknownOperator(query) {
  throw new Error("Unknown operator `" + query.operator + "`");
}

// node_modules/unist-util-select/lib/name.js
function name(query, node) {
  return query.tagName === "*" || query.tagName === node.type;
}

// node_modules/nth-check/lib/esm/parse.js
var whitespace = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
var ZERO = "0".charCodeAt(0);
var NINE = "9".charCodeAt(0);
function parse(formula) {
  formula = formula.trim().toLowerCase();
  if (formula === "even") {
    return [2, 0];
  } else if (formula === "odd") {
    return [2, 1];
  }
  let idx = 0;
  let a = 0;
  let sign = readSign();
  let number = readNumber();
  if (idx < formula.length && formula.charAt(idx) === "n") {
    idx++;
    a = sign * (number !== null && number !== void 0 ? number : 1);
    skipWhitespace();
    if (idx < formula.length) {
      sign = readSign();
      skipWhitespace();
      number = readNumber();
    } else {
      sign = number = 0;
    }
  }
  if (number === null || idx < formula.length) {
    throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
  }
  return [a, sign * number];
  function readSign() {
    if (formula.charAt(idx) === "-") {
      idx++;
      return -1;
    }
    if (formula.charAt(idx) === "+") {
      idx++;
    }
    return 1;
  }
  function readNumber() {
    const start = idx;
    let value = 0;
    while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
      value = value * 10 + (formula.charCodeAt(idx) - ZERO);
      idx++;
    }
    return idx === start ? null : value;
  }
  function skipWhitespace() {
    while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
      idx++;
    }
  }
}

// node_modules/nth-check/lib/esm/compile.js
var import_boolbase = __toESM(require_boolbase(), 1);
function compile(parsed) {
  const a = parsed[0];
  const b = parsed[1] - 1;
  if (b < 0 && a <= 0)
    return import_boolbase.default.falseFunc;
  if (a === -1)
    return (index) => index <= b;
  if (a === 0)
    return (index) => index === b;
  if (a === 1)
    return b < 0 ? import_boolbase.default.trueFunc : (index) => index >= b;
  const absA = Math.abs(a);
  const bMod = (b % absA + absA) % absA;
  return a > 1 ? (index) => index >= b && index % absA === bMod : (index) => index <= b && index % absA === bMod;
}

// node_modules/nth-check/lib/esm/index.js
function nthCheck(formula) {
  return compile(parse(formula));
}

// node_modules/unist-util-select/lib/util.js
function parent(node) {
  return Array.isArray(node.children);
}

// node_modules/unist-util-select/lib/pseudo.js
var nthCheck2 = nthCheck.default || nthCheck;
var handle2 = zwitch("name", {
  unknown: unknownPseudo,
  invalid: invalidPseudo,
  handlers: {
    any: matches,
    blank: empty,
    empty,
    "first-child": firstChild,
    "first-of-type": firstOfType,
    has,
    "last-child": lastChild,
    "last-of-type": lastOfType,
    matches,
    not,
    "nth-child": nthChild,
    "nth-last-child": nthLastChild,
    "nth-of-type": nthOfType,
    "nth-last-of-type": nthLastOfType,
    "only-child": onlyChild,
    "only-of-type": onlyOfType,
    root,
    scope
  }
});
pseudo.needsIndex = [
  "any",
  "first-child",
  "first-of-type",
  "last-child",
  "last-of-type",
  "matches",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-of-type",
  "nth-last-of-type",
  "only-child",
  "only-of-type"
];
function pseudo(query, node, index, parent2, state) {
  const pseudos = query.pseudos;
  let offset = -1;
  while (++offset < pseudos.length) {
    if (!handle2(pseudos[offset], node, index, parent2, state)) return false;
  }
  return true;
}
function empty(_1, node) {
  return parent(node) ? node.children.length === 0 : !("value" in node);
}
function firstChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeIndex === 0;
}
function firstOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === 0;
}
function has(query, node, _1, _2, state) {
  const fragment = { type: "root", children: parent(node) ? node.children : [] };
  const childState = {
    ...state,
    // Not found yet.
    found: false,
    // Do walk deep.
    shallow: false,
    // One result is enough.
    one: true,
    scopeNodes: [node],
    results: [],
    rootQuery: queryToSelectors(query.value)
  };
  walk(childState, fragment);
  return childState.results.length > 0;
}
function lastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return typeof state.nodeCount === "number" && state.nodeIndex === state.nodeCount - 1;
}
function lastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return typeof state.typeCount === "number" && state.typeIndex === state.typeCount - 1;
}
function matches(query, node, _1, _2, state) {
  const childState = {
    ...state,
    // Not found yet.
    found: false,
    // Do walk deep.
    shallow: false,
    // One result is enough.
    one: true,
    scopeNodes: [node],
    results: [],
    rootQuery: queryToSelectors(query.value)
  };
  walk(childState, node);
  return childState.results[0] === node;
}
function not(query, node, index, parent2, state) {
  return !matches(query, node, index, parent2, state);
}
function nthChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.nodeIndex === "number" && fn(state.nodeIndex);
}
function nthLastChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.nodeCount === "number" && typeof state.nodeIndex === "number" && fn(state.nodeCount - state.nodeIndex - 1);
}
function nthLastOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.typeIndex === "number" && typeof state.typeCount === "number" && fn(state.typeCount - 1 - state.typeIndex);
}
function nthOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.typeIndex === "number" && fn(state.typeIndex);
}
function onlyChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeCount === 1;
}
function onlyOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeCount === 1;
}
function root(_1, node, _2, parent2) {
  return node && !parent2;
}
function scope(_1, node, _2, _3, state) {
  return node && state.scopeNodes.includes(node);
}
function invalidPseudo() {
  throw new Error("Invalid pseudo-selector");
}
function unknownPseudo(query) {
  if (query.name) {
    throw new Error("Unknown pseudo-selector `" + query.name + "`");
  }
  throw new Error("Unexpected pseudo-element or empty pseudo-class");
}
function assertDeep(state, query) {
  if (state.shallow) {
    throw new Error("Cannot use `:" + query.name + "` without parent");
  }
}
function getCachedNthCheck(query) {
  let fn = query._cachedFn;
  if (!fn) {
    fn = nthCheck2(query.value);
    query._cachedFn = fn;
  }
  return fn;
}

// node_modules/unist-util-select/lib/test.js
function test(query, node, index, parent2, state) {
  if (query.id) throw new Error("Invalid selector: id");
  if (query.classNames) throw new Error("Invalid selector: class");
  return Boolean(
    node && (!query.tagName || name(query, node)) && (!query.attrs || attribute(query, node)) && (!query.pseudos || pseudo(query, node, index, parent2, state))
  );
}

// node_modules/unist-util-select/lib/walk.js
var empty2 = [];
function queryToSelectors(query) {
  if (query === null) {
    return { type: "selectors", selectors: [] };
  }
  if (query.type === "ruleSet") {
    return { type: "selectors", selectors: [query] };
  }
  return query;
}
function walk(state, tree) {
  if (tree) {
    one(state, [], tree, void 0, void 0);
  }
}
function one(state, currentRules, node, index, parentNode) {
  let nestResult = {
    directChild: void 0,
    descendant: void 0,
    adjacentSibling: void 0,
    generalSibling: void 0
  };
  nestResult = applySelectors(
    state,
    // Try the root rules for this node too.
    combine(currentRules, state.rootQuery.selectors),
    node,
    index,
    parentNode
  );
  if (parent(node) && !state.shallow && !(state.one && state.found)) {
    all(state, nestResult, node);
  }
  return nestResult;
}
function all(state, nest, node) {
  const fromParent = combine(nest.descendant, nest.directChild);
  let fromSibling;
  let index = -1;
  const total = { count: 0, types: /* @__PURE__ */ new Map() };
  const before = { count: 0, types: /* @__PURE__ */ new Map() };
  while (++index < node.children.length) {
    count(total, node.children[index]);
  }
  index = -1;
  while (++index < node.children.length) {
    const child = node.children[index];
    const name2 = child.type.toUpperCase();
    state.nodeIndex = before.count;
    state.typeIndex = before.types.get(name2) || 0;
    state.nodeCount = total.count;
    state.typeCount = total.types.get(name2);
    const forSibling = combine(fromParent, fromSibling);
    const nest2 = one(state, forSibling, node.children[index], index, node);
    fromSibling = combine(nest2.generalSibling, nest2.adjacentSibling);
    if (state.one && state.found) {
      break;
    }
    count(before, node.children[index]);
  }
}
function applySelectors(state, rules, node, index, parent2) {
  const nestResult = {
    directChild: void 0,
    descendant: void 0,
    adjacentSibling: void 0,
    generalSibling: void 0
  };
  let selectorIndex = -1;
  while (++selectorIndex < rules.length) {
    const ruleSet = rules[selectorIndex];
    if (state.one && state.found) {
      break;
    }
    if (state.shallow && ruleSet.rule.rule) {
      throw new Error("Expected selector without nesting");
    }
    if (test(ruleSet.rule, node, index, parent2, state)) {
      const nest = ruleSet.rule.rule;
      if (nest) {
        const rule = { type: "ruleSet", rule: nest };
        const label = nest.nestingOperator === "+" ? "adjacentSibling" : nest.nestingOperator === "~" ? "generalSibling" : nest.nestingOperator === ">" ? "directChild" : "descendant";
        add(nestResult, label, rule);
      } else {
        state.found = true;
        if (!state.results.includes(node)) {
          state.results.push(node);
        }
      }
    }
    if (ruleSet.rule.nestingOperator === null) {
      add(nestResult, "descendant", ruleSet);
    } else if (ruleSet.rule.nestingOperator === "~") {
      add(nestResult, "generalSibling", ruleSet);
    }
  }
  return nestResult;
}
function combine(left, right) {
  return left && right && left.length > 0 && right.length > 0 ? [...left, ...right] : left && left.length > 0 ? left : right && right.length > 0 ? right : empty2;
}
function add(nest, field, rule) {
  const list = nest[field];
  if (list) {
    list.push(rule);
  } else {
    nest[field] = [rule];
  }
}
function count(counts, node) {
  const name2 = node.type.toUpperCase();
  const count2 = (counts.types.get(name2) || 0) + 1;
  counts.count++;
  counts.types.set(name2, count2);
}

// node_modules/unist-util-select/lib/parse.js
var import_css_selector_parser = __toESM(require_lib(), 1);
var parser = new import_css_selector_parser.CssSelectorParser();
parser.registerAttrEqualityMods("~", "^", "$", "*");
parser.registerSelectorPseudos("any", "matches", "not", "has");
parser.registerNestingOperators(">", "+", "~");
function parse2(selector) {
  if (typeof selector !== "string") {
    throw new TypeError("Expected `string` as selector, not `" + selector + "`");
  }
  return parser.parse(selector);
}

// node_modules/unist-util-select/index.js
function select(selector, tree) {
  const state = createState(selector, tree);
  state.one = true;
  walk(state, tree || void 0);
  return state.results[0] || null;
}
function selectAll(selector, tree) {
  const state = createState(selector, tree);
  walk(state, tree || void 0);
  return state.results;
}
function createState(selector, tree) {
  return {
    // State of the query.
    rootQuery: queryToSelectors(parse2(selector)),
    results: [],
    scopeNodes: tree ? parent(tree) && // Root in nlcst.
    (tree.type === "RootNode" || tree.type === "root") ? tree.children : [tree] : [],
    one: false,
    shallow: false,
    found: false,
    // State in the tree.
    typeIndex: void 0,
    nodeIndex: void 0,
    typeCount: void 0,
    nodeCount: void 0
  };
}

// node_modules/nanoid/index.js
import { randomFillSync } from "crypto";
var POOL_SIZE_MULTIPLIER = 128;
var pool;
var poolOffset;
var fillPool = (bytes) => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    randomFillSync(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    randomFillSync(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
};
var random = (bytes) => {
  fillPool(bytes -= 0);
  return pool.subarray(poolOffset - bytes, poolOffset);
};
var customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
  let step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let i = step;
      while (i--) {
        id += alphabet[bytes[i] & mask] || "";
        if (id.length === size) return id;
      }
    }
  };
};
var customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);

// node_modules/myst-common/dist/utils.js
function addMessageInfo(message, info) {
  if (info === null || info === void 0 ? void 0 : info.note)
    message.note = info.note;
  if (info === null || info === void 0 ? void 0 : info.url)
    message.url = info.url;
  if (info === null || info === void 0 ? void 0 : info.ruleId)
    message.ruleId = info.ruleId;
  if (info === null || info === void 0 ? void 0 : info.fatal)
    message.fatal = true;
  return message;
}
function fileError(file, message, opts) {
  return addMessageInfo(file.message(message, opts === null || opts === void 0 ? void 0 : opts.node, opts === null || opts === void 0 ? void 0 : opts.source), { ...opts, fatal: true });
}
function fileWarn(file, message, opts) {
  return addMessageInfo(file.message(message, opts === null || opts === void 0 ? void 0 : opts.node, opts === null || opts === void 0 ? void 0 : opts.source), opts);
}
var az = "abcdefghijklmnopqrstuvwxyz";
var alpha = az + az.toUpperCase();
var numbers = "0123456789";
var nanoidAZ = customAlphabet(alpha, 1);
var nanoidAZ9 = customAlphabet(alpha + numbers, 9);
function normalizeLabel(label) {
  if (!label)
    return void 0;
  const identifier = label.replace(/[\t\n\r ]+/g, " ").replace(/['‘’"“”]+/g, "").trim().toLowerCase();
  const html_id = createHtmlId(identifier);
  return { identifier, label, html_id };
}
function createHtmlId(identifier) {
  if (!identifier)
    return void 0;
  return identifier.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^([0-9-])/, "id-$1").replace(/-[-]+/g, "-").replace(/(?:^[-]+)|(?:[-]+$)/g, "");
}
function transferTargetAttrs(sourceNode, destNode, vfile) {
  if (sourceNode.label) {
    if (destNode.label && vfile && destNode.label !== sourceNode.label) {
      fileWarn(vfile, `label "${destNode.label}" replaced with "${sourceNode.label}"`, {
        node: destNode
      });
    }
    if (destNode.label && vfile && destNode.label === sourceNode.label) {
      fileWarn(vfile, `duplicate label "${destNode.label}" replacement`, {
        node: destNode
      });
    }
    destNode.label = sourceNode.label;
    delete sourceNode.label;
  }
  if (sourceNode.identifier) {
    destNode.identifier = sourceNode.identifier;
    delete sourceNode.identifier;
  }
  if (sourceNode.html_id) {
    destNode.html_id = sourceNode.html_id;
    delete sourceNode.html_id;
  }
  if (sourceNode.indexEntries) {
    if (!destNode.indexEntries)
      destNode.indexEntries = [];
    destNode.indexEntries.push(...sourceNode.indexEntries);
    delete sourceNode.indexEntries;
  }
}
function getNodeOrLiftedChildren(node, removeType) {
  if (!node.children)
    return [node];
  const children = node.children.map((child) => getNodeOrLiftedChildren(child, removeType)).flat();
  if (node.type === removeType) {
    if (node && node.children == null)
      delete node.children;
    return children;
  }
  node.children = children;
  return [node];
}
function liftChildren(tree, removeType) {
  if (!tree.children)
    return;
  tree.children = tree.children.map((child) => getNodeOrLiftedChildren(child, removeType)).flat();
}
function toText(content) {
  if (!content)
    return "";
  if (!Array.isArray(content))
    return toText([content]);
  return content.map((n) => {
    if (!n || typeof n === "string")
      return n || "";
    if ("value" in n)
      return n.value;
    if ("children" in n && n.children)
      return toText(n.children);
    return "";
  }).join("");
}

// node_modules/unist-util-remove/node_modules/unist-util-is/lib/index.js
var convert = (
  /**
   * @type {(
   *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {AssertAnything}
   */
  function(test2) {
    if (test2 === void 0 || test2 === null) {
      return ok;
    }
    if (typeof test2 === "string") {
      return typeFactory(test2);
    }
    if (typeof test2 === "object") {
      return Array.isArray(test2) ? anyFactory(test2) : propsFactory(test2);
    }
    if (typeof test2 === "function") {
      return castFactory(test2);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].call(this, ...parameters)) return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all2);
  function all2(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key]) return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type2);
  function type2(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(node, ...parameters) {
    return Boolean(
      node && typeof node === "object" && "type" in node && // @ts-expect-error: fine.
      Boolean(check.call(this, node, ...parameters))
    );
  }
}
function ok() {
  return true;
}

// node_modules/unist-util-remove/lib/index.js
var empty3 = [];
var remove = (
  /**
   * @type {(
   *  (<Tree extends Node>(node: Tree, options: Options, test: Test) => Tree | null) &
   *  (<Tree extends Node>(node: Tree, test: Test) => Tree | null)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Options | null | undefined} [options]
   * @param {Test | null | undefined} [test]
   * @returns {Node | null}
   */
  function(tree, options, test2) {
    const is4 = convert(test2 || options);
    const cascade = !options || options.cascade === void 0 || options.cascade === null ? true : options.cascade;
    return preorder(tree);
    function preorder(node, index, parent2) {
      const children = node.children || empty3;
      let childIndex = -1;
      let position = 0;
      if (is4(node, index, parent2)) {
        return null;
      }
      if (children.length > 0) {
        while (++childIndex < children.length) {
          if (preorder(children[childIndex], childIndex, node)) {
            children[position++] = children[childIndex];
          }
        }
        if (cascade && !position) {
          return null;
        }
        children.length = position;
      }
      return node;
    }
  }
);

// node_modules/simple-validators/dist/validators.js
function defined(val) {
  return val != null;
}
function locationSuffix(opts) {
  if (opts.file && opts.location)
    return ` (at ${opts.file}#${opts.location})`;
  if (opts.file || opts.location)
    return ` (at ${opts.file || opts.location})`;
  return "";
}
function incrementOptions(property, opts) {
  let location = opts.property;
  if (opts.location)
    location = `${opts.location}.${opts.property}`;
  return { ...opts, property, location };
}
function validationError(message, opts) {
  if (opts.suppressErrors)
    return void 0;
  const { messages } = opts;
  if (!messages.errors)
    messages.errors = [];
  const fullMessage = `'${opts.property}' ${message}${locationSuffix(opts)}`;
  messages.errors.push({
    property: opts.property,
    message: fullMessage
  });
  if (opts.errorLogFn)
    opts.errorLogFn(fullMessage);
  return void 0;
}
function validationWarning(message, opts) {
  if (opts.suppressWarnings)
    return void 0;
  const { messages } = opts;
  if (!messages.warnings)
    messages.warnings = [];
  const fullMessage = `'${opts.property}' ${message}${locationSuffix(opts)}`;
  messages.warnings.push({
    property: opts.property,
    message: fullMessage
  });
  if (opts.warningLogFn)
    opts.warningLogFn(fullMessage);
  return void 0;
}
function validateBoolean(input, opts) {
  if (typeof input === "string") {
    if (input.toLowerCase() === "true")
      return true;
    if (input.toLowerCase() === "false")
      return false;
  }
  if (input === true || input === false)
    return input;
  return validationError("must be boolean", opts);
}
function validateNumber(input, opts) {
  const value = Number(input);
  if (Number.isNaN(value)) {
    return validationError(`must be a number: ${input}`, opts);
  }
  if (defined(opts.min) && value < opts.min) {
    return validationError(`must be greater than or equal to ${opts.min}: ${value}`, opts);
  }
  if (defined(opts.max) && value > opts.max) {
    return validationError(`must be less than or equal to ${opts.max}: ${value}`, opts);
  }
  if (opts.integer && !Number.isInteger(value)) {
    return validationError(`must be an integer: ${value}`, opts);
  }
  return value;
}
function validateString(input, opts) {
  let value = input;
  if (opts.coerceNumber && typeof value === "number") {
    if (Number.isNaN(value))
      validationWarning("is not a number", opts);
    value = String(value);
  }
  if (typeof value !== "string")
    return validationError(`must be string`, opts);
  if (opts.minLength && value.length < opts.minLength) {
    return validationError(`must be greater than ${opts.minLength} chars`, opts);
  }
  if (opts.maxLength && value.length > opts.maxLength) {
    return validationError(`must be less than ${opts.maxLength} chars`, opts);
  }
  if (opts.regex && !value.match(opts.regex)) {
    return validationError(`must match regex ${opts.regex}`, opts);
  }
  if (opts.escapeFn) {
    value = opts.escapeFn(value);
  }
  return value;
}
function validateUrl(input, opts) {
  const value = validateString(input, { ...opts, maxLength: 2048 });
  if (value === void 0)
    return value;
  let url;
  try {
    url = new URL(value);
  } catch {
    return validationError(`must be valid URL: ${value}`, opts);
  }
  if (opts.includes && !url.origin.includes(opts.includes)) {
    return validationError(`must include "${opts.includes}": ${value}`, opts);
  }
  return value;
}
function validateEmail(input, opts) {
  const value = validateString(input, opts);
  if (value === void 0)
    return value;
  const valid = value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (!valid) {
    return validationError(`must be valid email address: ${value}`, opts);
  }
  return value;
}
function validateChoice(input, opts) {
  if (!opts.choices.includes(input)) {
    return validationError(`invalid value '${input}' - must be one of [${opts.choices.join(", ")}]`, opts);
  }
  return input;
}
function validateEnum(input, opts) {
  if (!Object.values(opts.enum).includes(input)) {
    return validationError(`invalid value '${input}' - must be one of [${Object.values(opts.enum).join(", ")}]`, opts);
  }
  return input;
}
var ISO8601_DATE_PATTERN = /^(\d\d\d\d)(?:-(\d\d))?(?:-(\d\d))?(T.*)?$/;
var RFC2822_DATE_PATTERN = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),)?\s*(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d\d\d\d)\s*([^\s].*)?$/;
var MONTH_TO_NUMBER = new Map(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((elem, index) => [elem, index + 1]));
function buildISO8601DateString(year, month, day) {
  const paddedMonth = `${month}`.padStart(2, "0");
  const paddedDay = `${day}`.padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
}
function dateErrorString(input) {
  return `invalid date "${input}" - must be a full date "YYYY-MM-DD" (ISO 8601) or calendar date "Sat, 1 Jan 2000" (RFC 2822)`;
}
function revalidateDate(input, result, opts) {
  const validated = validateDate(new Date(result), {
    ...opts,
    suppressErrors: true,
    suppressWarnings: true
  });
  if (validated !== result) {
    return validationError(dateErrorString(input), opts);
  }
  return result;
}
function validateDate(input, opts) {
  if (typeof input === "string") {
    let match2 = input.match(ISO8601_DATE_PATTERN);
    if (match2) {
      const [year, month, day, tail] = match2.slice(1, 5);
      if (tail !== void 0) {
        validationWarning(`Date "${input}" should not include a time component ("${tail}"), which has been ignored`, opts);
      }
      const result2 = [year, month !== null && month !== void 0 ? month : "01", day !== null && day !== void 0 ? day : "01"].join("-");
      if (month === void 0 || day === void 0) {
        validationWarning(`non-standard date "${input}": interpreting date as "${result2}".
Please use a full date "YYYY-MM-DD" (ISO 8601).`, opts);
      }
      return revalidateDate(input, result2, opts);
    }
    match2 = input.match(RFC2822_DATE_PATTERN);
    if (match2) {
      const [day, month, year, tail] = match2.slice(2, 6);
      if (tail !== void 0) {
        validationWarning(`Date "${input}" should not include a time component ("${tail}"), which has been ignored`, opts);
      }
      const numericYear = parseInt(year);
      const numericMonth = MONTH_TO_NUMBER.get(month);
      const numericDay = parseInt(day);
      const result2 = buildISO8601DateString(numericYear, numericMonth, numericDay);
      return revalidateDate(input, result2, opts);
    }
    const parsed = Date.parse(input);
    if (isNaN(parsed)) {
      return validationError(dateErrorString(input), opts);
    }
    const localDate = new Date(parsed);
    const result = buildISO8601DateString(localDate.getFullYear(), localDate.getMonth() + 1, localDate.getDate());
    validationWarning(`non-standard date "${input}": interpreting date as "${result}".
Please use a full date "YYYY-MM-DD" (ISO 8601).`, opts);
    return result;
  } else if (input instanceof Date) {
    return opts.dateIsLocal ? buildISO8601DateString(input.getFullYear(), input.getMonth() + 1, input.getDate()) : buildISO8601DateString(input.getUTCFullYear(), input.getUTCMonth() + 1, input.getUTCDate());
  } else {
    return validationError(dateErrorString(input), opts);
  }
}
function validateObject(input, opts) {
  if (typeof input !== "object")
    return validationError(`must be object`, opts);
  if (Array.isArray(input))
    return validationError(`must be object, not array`, opts);
  return input;
}
function validateKeys(input, keys, opts) {
  var _a;
  const value = {};
  let required = keys.required || [];
  const optional = keys.optional || [];
  const aliasKeys = Object.entries((_a = keys.alias) !== null && _a !== void 0 ? _a : {}).filter((alias) => required.includes(alias[1]) || optional.includes(alias[1])).map((alias) => alias[0]);
  const ignored = [];
  Object.keys(input).forEach((k) => {
    var _a2;
    if (required.includes(k) || optional.includes(k)) {
      value[k] = input[k];
      required = required.filter((val) => val !== k);
    } else if (aliasKeys.includes(k)) {
      const normalized = (_a2 = keys.alias) === null || _a2 === void 0 ? void 0 : _a2[k];
      if (input[normalized] === void 0) {
        value[normalized] = input[k];
        required = required.filter((val) => val !== normalized);
      } else {
        validationWarning(`both "${normalized}" and "${k}" were provided, "${k}" was ignored.`, opts);
      }
    } else {
      ignored.push(k);
      if (opts.keepExtraKeys)
        value[k] = input[k];
    }
  });
  if (required.length) {
    validationError(`missing required key${required.length > 1 ? "s" : ""}: ${required.join(", ")}`, opts);
    if (!opts.returnInvalidPartial)
      return void 0;
  }
  if (ignored.length) {
    validationWarning(`extra key${ignored.length > 1 ? "s" : ""} ignored: ${ignored.join(", ")}`, opts);
  }
  return value;
}
function validateObjectKeys(input, keys, opts) {
  const value = validateObject(input, opts);
  if (value === void 0)
    return void 0;
  return validateKeys(value, keys, opts);
}
function validateList(input, opts, itemValidator) {
  let value;
  if (Array.isArray(input)) {
    value = input;
  } else if (opts.coerce) {
    value = [input];
  } else {
    return validationError("must be an array", opts);
  }
  return value.map((item, index) => itemValidator(item, index)).filter((item) => item !== void 0);
}
function fillMissingKeys(base, filler, keys) {
  const output = { ...base };
  keys.forEach((key) => {
    if (!defined(output[key]) && defined(filler[key])) {
      const k = key;
      output[k] = filler[k];
    }
  });
  return output;
}

// node_modules/myst-frontmatter/dist/utils/normalizeString.js
function normalizeJsonToString(value) {
  return JSON.stringify(Object.entries(value).filter(([, val]) => val !== void 0).sort());
}

// node_modules/myst-frontmatter/dist/utils/referenceStash.js
function pseudoUniqueId(kind, index, file) {
  let suffix = "";
  if (file) {
    const fileParts = file.replace("\\", "/").split("/");
    const nameParts = fileParts[fileParts.length - 1].split(".");
    if (nameParts.length === 1) {
      suffix = `-${nameParts[0]}`;
    } else {
      suffix = `-${nameParts.slice(0, nameParts.length - 1).join("-")}`;
    }
  }
  return `${kind}${suffix}-generated-uid-${index}`;
}
function stashPlaceholder(value) {
  return { id: value, name: value };
}
function isStashPlaceholder(object) {
  var _a;
  if (!object.name || !object.id || object.name !== object.id)
    return false;
  const nKeys = Object.keys(object).length;
  if (nKeys === 2)
    return true;
  return nKeys === 3 && ((_a = object.nameParsed) === null || _a === void 0 ? void 0 : _a.literal) === object.id;
}
function validateAndStashObject(input, stash, kind, validateFn, opts) {
  var _a, _b, _c;
  const lookup = {};
  const lookupNorm2Id = {};
  (_a = stash[kind]) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
    if (item.id) {
      lookup[item.id] = item;
      lookupNorm2Id[normalizeJsonToString({ ...item, id: void 0 })] = item.id;
    }
  });
  if (typeof input === "string" && Object.keys(lookup).includes(input)) {
    return input;
  }
  const value = validateFn(input, opts);
  if (!value)
    return;
  let warnOnDuplicate = !isStashPlaceholder(value);
  if (!value.id) {
    if (lookupNorm2Id[normalizeJsonToString(value)]) {
      value.id = lookupNorm2Id[normalizeJsonToString(value)];
      warnOnDuplicate = false;
    } else {
      value.id = pseudoUniqueId(kind, (_c = (_b = stash[kind]) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0, opts.file);
    }
  }
  if (!Object.keys(lookup).includes(value.id)) {
    lookup[value.id] = value;
  } else if (isStashPlaceholder(lookup[value.id])) {
    lookup[value.id] = value;
  } else if (warnOnDuplicate) {
    validationWarning(`duplicate id for ${kind} found in frontmatter: ${value.id}`, opts);
  }
  stash[kind] = Object.values(lookup);
  return value.id;
}

// node_modules/doi-utils/dist/validatePart.js
var DOI_VALIDATION_PATTERN = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
function validatePart(possibleDOI) {
  if (!possibleDOI)
    return false;
  return possibleDOI.match(DOI_VALIDATION_PATTERN) !== null;
}

// node_modules/doi-utils/dist/resolvers.js
var doiOrg = {
  test(url) {
    return !!url.hostname.match(/(?:dx\.)?(?:www\.)?doi\.org/);
  },
  parse(url) {
    return url.pathname.replace(/^\//, "");
  }
};
var elife = {
  test(url) {
    return url.hostname.endsWith("elifesciences.org") && /^\/(?:articles|reviewed-preprints)\/\d+$/.test(url.pathname);
  },
  parse(url) {
    return `10.7554/eLife.${url.pathname.replace(/^\/(?:articles|reviewed-preprints)\//, "")}`;
  }
};
var zenodo = {
  test(url) {
    return url.hostname.endsWith("zenodo.org") && !!url.pathname.match(/^\/(?:record|badge\/latestdoi)\//);
  },
  parse(url) {
    return `10.5281/zenodo.${url.pathname.replace(/^\/(?:record|badge\/latestdoi)\//, "")}`;
  }
};
var biorxiv = {
  test(url) {
    return url.hostname.endsWith("biorxiv.org") && !!clumpParts(url).find(validatePart);
  },
  parse(url) {
    var _a;
    return (_a = clumpParts(url).find(validatePart)) === null || _a === void 0 ? void 0 : _a.replace(/v([\d]*)$/, "");
  }
};
function clumpParts(url) {
  const parts = url.pathname.split("/").filter((p) => !!p);
  return parts.slice(0, -1).map((a, i) => `${a}/${parts[i + 1]}`);
}
var pathParts = {
  test(url) {
    return !!clumpParts(url).find(validatePart);
  },
  parse(url) {
    return clumpParts(url).find(validatePart);
  }
};
var idInQuery = {
  test(url) {
    return validatePart(url.searchParams.get("id"));
  },
  parse(url) {
    var _a;
    return (_a = url.searchParams.get("id")) !== null && _a !== void 0 ? _a : void 0;
  }
};
var STRICT_RESOLVERS = [doiOrg];
var DEFAULT_RESOLVERS = [doiOrg, biorxiv, pathParts, elife, zenodo, idInQuery];

// node_modules/doi-utils/dist/index.js
var OPEN_FUNDER_REGISTRY_PREFIX = "10.13039";
function validate(possibleDOI, opts) {
  if (!possibleDOI)
    return false;
  return !!normalize2(possibleDOI, opts);
}
function normalize2(possibleDOI, opts) {
  let doi2 = void 0;
  if (!possibleDOI)
    return void 0;
  if (validatePart(possibleDOI))
    return possibleDOI;
  if (possibleDOI.startsWith("doi:")) {
    doi2 = possibleDOI.slice(4);
    if (validatePart(doi2))
      return doi2;
  }
  try {
    const url = new URL(possibleDOI.startsWith("http") ? possibleDOI : `http://${possibleDOI}`);
    const strictResolver = STRICT_RESOLVERS.find((r) => r.test(url));
    const nonStrictResolver = DEFAULT_RESOLVERS.find((r) => r.test(url));
    if ((opts === null || opts === void 0 ? void 0 : opts.strict) && !strictResolver)
      return void 0;
    const resolver = strictResolver !== null && strictResolver !== void 0 ? strictResolver : nonStrictResolver;
    if (!resolver)
      return void 0;
    doi2 = resolver.parse(url);
    if (!(opts === null || opts === void 0 ? void 0 : opts.strict) && strictResolver)
      return doi2;
  } catch (error) {
  }
  if (validatePart(doi2))
    return doi2;
  return void 0;
}
function buildUrl(possibleDOI, opts) {
  const doi2 = normalize2(possibleDOI, opts);
  if (!doi2)
    return void 0;
  return `https://doi.org/${doi2}`;
}
function isOpenFunderRegistry(possibleDOI) {
  const doi2 = normalize2(possibleDOI);
  if (!doi2)
    return false;
  return doi2.startsWith(`${OPEN_FUNDER_REGISTRY_PREFIX}/`);
}
var doi = {
  validatePart,
  validate,
  normalize: normalize2,
  buildUrl,
  isOpenFunderRegistry
};

// node_modules/myst-frontmatter/dist/utils/validators.js
var GITHUB_USERNAME_REPO_REGEX = "^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$";
function validateDoi(value, opts) {
  const doiString = validateString(value, opts);
  if (doiString !== void 0) {
    if (doi.validate(doiString, { strict: true })) {
      return doiString;
    } else {
      validationError("must be valid DOI", opts);
    }
  }
  return void 0;
}
function validateGithubUrl(value, opts) {
  let github = value;
  if (typeof github === "string") {
    const repo = github.match(GITHUB_USERNAME_REPO_REGEX);
    if (repo) {
      github = `https://github.com/${repo}`;
    }
  }
  return validateUrl(github, {
    ...incrementOptions("github", opts),
    includes: "github"
  });
}
function validateStringOrNumber(input, opts) {
  if (typeof input === "string")
    return validateString(input, opts);
  if (typeof input === "number")
    return input;
  return validationError("must be string or number", opts);
}

// node_modules/myst-frontmatter/dist/utils/socialLinks.js
var SOCIAL_LINKS_KEYS = [
  "url",
  "github",
  "bluesky",
  "mastodon",
  "linkedin",
  "threads",
  "twitter"
  // Change to 'x' in future
];
var SOCIAL_LINKS_ALIASES = {
  website: "url",
  x: "twitter",
  // Can change this in a future release to be the other way
  bsky: "bluesky",
  instagram: "threads"
  // This is the same username
};
function validateSocialLinks(input, opts, output = {}) {
  const value = output ? input : validateObjectKeys(input, { optional: SOCIAL_LINKS_KEYS, alias: SOCIAL_LINKS_ALIASES }, opts);
  if (defined(value.url)) {
    output.url = validateUrl(value.url, incrementOptions("url", opts));
  }
  if (defined(value.github)) {
    output.github = validateString(value.github, incrementOptions("github", opts));
  }
  if (defined(value.bluesky)) {
    output.bluesky = validateString(value.bluesky, incrementOptions("bluesky", opts));
  }
  if (defined(value.mastodon)) {
    output.mastodon = validateString(value.mastodon, incrementOptions("mastodon", opts));
  }
  if (defined(value.linkedin)) {
    output.linkedin = validateUrl(value.linkedin, incrementOptions("linkedin", opts));
  }
  if (defined(value.threads)) {
    output.threads = validateString(value.threads, incrementOptions("threads", opts));
  }
  if (defined(value.twitter)) {
    output.twitter = validateString(value.twitter, incrementOptions("twitter", opts));
  }
  return output;
}

// node_modules/myst-frontmatter/dist/affiliations/validators.js
var AFFILIATION_KEYS = [
  "id",
  "address",
  "city",
  "state",
  "postal_code",
  "country",
  "name",
  "department",
  "collaboration",
  "isni",
  "ringgold",
  "ror",
  "doi",
  "email",
  "phone",
  "fax",
  ...SOCIAL_LINKS_KEYS
];
var AFFILIATION_ALIASES = {
  ref: "id",
  // Used in QMD to reference an affiliation
  region: "state",
  province: "state",
  zipcode: "postal_code",
  zip_code: "postal_code",
  institution: "name",
  ...SOCIAL_LINKS_ALIASES
};
function validateAffiliation(input, opts) {
  if (typeof input === "string") {
    input = stashPlaceholder(input);
  }
  const value = validateObjectKeys(input, { optional: AFFILIATION_KEYS, alias: AFFILIATION_ALIASES }, opts);
  if (value === void 0)
    return void 0;
  if (Object.keys(value).length === 1 && value.id) {
    value.name = value.id;
  }
  const output = {};
  if (defined(value.id)) {
    output.id = validateString(value.id, incrementOptions("id", opts));
  }
  if (defined(value.name)) {
    output.name = validateString(value.name, incrementOptions("name", opts));
  } else {
    validationWarning("affiliation should include name/institution", opts);
  }
  if (defined(value.department)) {
    output.department = validateString(value.department, incrementOptions("department", opts));
  }
  if (defined(value.address)) {
    output.address = validateString(value.address, incrementOptions("address", opts));
  }
  if (defined(value.city)) {
    output.city = validateString(value.city, incrementOptions("city", opts));
  }
  if (defined(value.state)) {
    output.state = validateString(value.state, incrementOptions("state", opts));
  }
  if (defined(value.postal_code)) {
    output.postal_code = validateString(value.postal_code, {
      coerceNumber: true,
      ...incrementOptions("postal_code", opts)
    });
  }
  if (defined(value.country)) {
    output.country = validateString(value.country, incrementOptions("country", opts));
  }
  if (defined(value.isni)) {
    output.isni = validateString(value.isni, incrementOptions("isni", opts));
  }
  if (defined(value.ror)) {
    output.ror = validateString(value.ror, incrementOptions("ror", opts));
  }
  if (defined(value.ringgold)) {
    output.ringgold = validateNumber(value.ringgold, {
      min: 1e3,
      max: 999999,
      ...incrementOptions("ringgold", opts)
    });
  }
  if (defined(value.doi)) {
    output.doi = validateDoi(value.doi, incrementOptions("doi", opts));
  }
  if (defined(value.collaboration)) {
    output.collaboration = validateBoolean(value.collaboration, incrementOptions("collaboration", opts));
  }
  if (defined(value.email)) {
    output.email = validateEmail(value.email, incrementOptions("email", opts));
  }
  validateSocialLinks(value, opts, output);
  if (defined(value.phone)) {
    output.phone = validateString(value.phone, incrementOptions("phone", opts));
  }
  if (defined(value.fax)) {
    output.fax = validateString(value.fax, incrementOptions("fax", opts));
  }
  return output;
}

// node_modules/myst-frontmatter/dist/biblio/validators.js
var PUBLICATION_META_KEYS = ["number", "doi", "title", "subject"];
function validatePublicationMeta(input, opts) {
  if (typeof input !== "object") {
    input = { number: input };
  }
  const value = validateObjectKeys(input, { optional: PUBLICATION_META_KEYS, alias: { name: "number" } }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.number)) {
    output.number = validateStringOrNumber(value.number, incrementOptions("number", opts));
  }
  if (defined(value.doi)) {
    output.doi = validateDoi(value.doi, incrementOptions("doi", opts));
  }
  if (defined(value.title)) {
    output.title = validateString(value.title, incrementOptions("title", opts));
  }
  if (defined(value.subject)) {
    output.subject = validateString(value.subject, incrementOptions("subject", opts));
  }
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}

// node_modules/credit-roles/dist/index.js
var CREDIT_URL = "https://credit.niso.org/";
var CreditRole;
(function(CreditRole2) {
  CreditRole2["Conceptualization"] = "Conceptualization";
  CreditRole2["DataCuration"] = "Data curation";
  CreditRole2["FormalAnalysis"] = "Formal analysis";
  CreditRole2["FundingAcquisition"] = "Funding acquisition";
  CreditRole2["Investigation"] = "Investigation";
  CreditRole2["Methodology"] = "Methodology";
  CreditRole2["ProjectAdministration"] = "Project administration";
  CreditRole2["Resources"] = "Resources";
  CreditRole2["Software"] = "Software";
  CreditRole2["Supervision"] = "Supervision";
  CreditRole2["Validation"] = "Validation";
  CreditRole2["Visualization"] = "Visualization";
  CreditRole2["WritingOriginalDraft"] = "Writing \u2013 original draft";
  CreditRole2["WritingReviewEditing"] = "Writing \u2013 review & editing";
})(CreditRole || (CreditRole = {}));
var CreditDescriptions = {
  [CreditRole.Conceptualization]: "Ideas; formulation or evolution of overarching research goals and aims.",
  [CreditRole.DataCuration]: "Management activities to annotate (produce metadata), scrub data and maintain research data (including software code, where it is necessary for interpreting the data itself) for initial use and later re-use.",
  [CreditRole.FormalAnalysis]: "Application of statistical, mathematical, computational, or other formal techniques to analyse or synthesize study data.",
  [CreditRole.FundingAcquisition]: "Acquisition of the financial support for the project leading to this publication.",
  [CreditRole.Investigation]: "Conducting a research and investigation process, specifically performing the experiments, or data/evidence collection.",
  [CreditRole.Methodology]: "Development or design of methodology; creation of models.",
  [CreditRole.ProjectAdministration]: "Management and coordination responsibility for the research activity planning and execution.",
  [CreditRole.Resources]: "Provision of study materials, reagents, materials, patients, laboratory samples, animals, instrumentation, computing resources, or other analysis tools.",
  [CreditRole.Software]: "Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms; testing of existing code components.",
  [CreditRole.Supervision]: "Oversight and leadership responsibility for the research activity planning and execution, including mentorship external to the core team.",
  [CreditRole.Validation]: "Verification, whether as a part of the activity or separate, of the overall replication/reproducibility of results/experiments and other research outputs.",
  [CreditRole.Visualization]: "Preparation, creation and/or presentation of the published work, specifically visualization/data presentation.",
  [CreditRole.WritingOriginalDraft]: "Preparation, creation and/or presentation of the published work, specifically writing the initial draft (including substantive translation).",
  [CreditRole.WritingReviewEditing]: "Preparation, creation and/or presentation of the published work by those from the original research group, specifically critical review, commentary or revision \u2013 including pre- or post-publication stages."
};
var ROLES = Object.keys(CreditDescriptions);
var ALIAS_ROLES = {
  writing: CreditRole.WritingOriginalDraft,
  editing: CreditRole.WritingReviewEditing,
  review: CreditRole.WritingReviewEditing,
  analysis: CreditRole.FormalAnalysis,
  funding: CreditRole.FundingAcquisition,
  admin: CreditRole.ProjectAdministration,
  administration: CreditRole.ProjectAdministration
};
function standardize(v) {
  return v.trim().toLowerCase().replaceAll("z", "s").split("").reduce((s, n) => {
    if (n.match(/([a-z])/))
      return [...s, n];
    const last = s[s.length - 1];
    if (!(last === null || last === void 0 ? void 0 : last.match(/([a-z])/)))
      return s;
    return [...s, "-"];
  }, []).join("");
}
var STANDARDIZED_ROLES = Object.fromEntries(ROLES.map((v) => [standardize(v), v]));
function normalize3(value, opts) {
  var _a, _b;
  if (!value)
    return void 0;
  if (ROLES.includes(value))
    return value;
  if (opts === null || opts === void 0 ? void 0 : opts.strict)
    return void 0;
  return (_b = (_a = STANDARDIZED_ROLES[standardize(value)]) !== null && _a !== void 0 ? _a : ALIAS_ROLES[value.toLowerCase().trim()]) !== null && _b !== void 0 ? _b : void 0;
}
function validate2(value, opts) {
  if (!value)
    return false;
  return !!normalize3(value, opts);
}
function buildUrl2(value, opts) {
  const role = normalize3(value, opts);
  if (!role)
    return void 0;
  const url = role.toLowerCase().replace("\u2013 ", "").replace("& ", "").replaceAll(" ", "-");
  return `${CREDIT_URL}contributor-roles/${url}/`;
}
var credit = {
  validate: validate2,
  normalize: normalize3,
  buildUrl: buildUrl2
};

// node_modules/orcid/dist/index.js
var ORCID_URL = "https://orcid.org";
var ORCID_REGEX_STRICT = "^([0-9]{4}-){3}[0-9]{3}[0-9X]$";
var ORCID_REGEX = "^((http(s)?://)?(www.)?orcid.org/)?([0-9]{4}-){3}[0-9]{3}[0-9X]$";
function validate3(value, opts) {
  const match2 = value === null || value === void 0 ? void 0 : value.match((opts === null || opts === void 0 ? void 0 : opts.strict) ? ORCID_REGEX_STRICT : ORCID_REGEX);
  if (!match2)
    return false;
  return true;
}
function normalize4(value, opts) {
  if (!value || !validate3(value, opts))
    return void 0;
  return value.replace(/^(https?:\/\/)?(www\.)?orcid\.org\//, "");
}
function buildUrl3(value, opts) {
  const orcid2 = normalize4(value, opts);
  if (!orcid2)
    return void 0;
  return `${ORCID_URL}/${orcid2}`;
}
var orcid = {
  validate: validate3,
  normalize: normalize4,
  buildUrl: buildUrl3
};

// node_modules/myst-frontmatter/dist/utils/parseName.js
function startsWithUpperCase(word) {
  for (const letter of word) {
    if (letter.toLowerCase() === letter.toUpperCase())
      continue;
    return letter === letter.toUpperCase();
  }
  return true;
}
function parseName(literal) {
  var _a, _b;
  const displayParts = literal.split(",");
  if (displayParts.length === 1) {
    return { literal, ...parseGivenParticleFamily(literal) };
  }
  const lastPart = (_a = displayParts.pop()) === null || _a === void 0 ? void 0 : _a.trim();
  const givenAndParticle = parseGivenParticle(lastPart);
  if (displayParts.length === 1) {
    return { literal, ...givenAndParticle, ...parseParticleFamily(displayParts[0]) };
  }
  const suffix = (_b = displayParts.pop()) === null || _b === void 0 ? void 0 : _b.trim();
  const particleAndFamily = parseParticleFamily(displayParts.join(","));
  if (!suffix)
    return { literal, ...givenAndParticle, ...particleAndFamily };
  return { literal, ...givenAndParticle, ...particleAndFamily, suffix };
}
function parseGivenParticle(name2) {
  const nameParts = name2 === null || name2 === void 0 ? void 0 : name2.trim().split(/\s+/);
  if (!(nameParts === null || nameParts === void 0 ? void 0 : nameParts.length))
    return {};
  let given = nameParts.shift();
  if (!given)
    return {};
  while (nameParts.length && startsWithUpperCase(nameParts[0])) {
    given = `${given} ${nameParts.shift()}`;
  }
  if (!nameParts.length)
    return { given };
  return { given, dropping_particle: nameParts.join(" ") };
}
function parseParticleFamily(name2) {
  const nameParts = name2.trim().split(/\s+/);
  if (!nameParts.length)
    return {};
  let family = nameParts.pop();
  if (!family)
    return {};
  if (nameParts.length && startsWithUpperCase(nameParts[0])) {
    return { family: [...nameParts, family].join(" ") };
  }
  while (nameParts.length && startsWithUpperCase(nameParts[nameParts.length - 1])) {
    family = `${nameParts.pop()} ${family}`;
  }
  if (!nameParts.length)
    return { family };
  return { non_dropping_particle: nameParts.join(" "), family };
}
function parseGivenParticleFamily(name2) {
  const nameParts = name2.trim().split(/\s+/);
  if (!nameParts.length)
    return {};
  let family = nameParts.pop();
  if (!family)
    return {};
  if (!nameParts.length)
    return { family };
  let given = nameParts.shift();
  while (nameParts.length && startsWithUpperCase(nameParts[0])) {
    given = `${given} ${nameParts.shift()}`;
  }
  while (nameParts.length && startsWithUpperCase(nameParts[nameParts.length - 1])) {
    family = `${nameParts.pop()} ${family}`;
  }
  if (!nameParts.length)
    return { given, family };
  return { given, non_dropping_particle: nameParts.join(" "), family };
}
function formatName(name2, alwaysReversed = false) {
  const { literal, given, dropping_particle, non_dropping_particle, family, suffix } = name2;
  if (literal)
    return literal;
  const hasCommas = [given, dropping_particle, non_dropping_particle, family, suffix].join("").includes(",");
  if (!alwaysReversed && !hasCommas && !dropping_particle && !suffix) {
    const formattedName = [given, non_dropping_particle, family].filter(Boolean).join(" ");
    const reParsedName = parseName(formattedName);
    delete reParsedName.literal;
    const serializedParsedName = JSON.stringify(Object.entries(reParsedName).sort());
    const serializedSourceName = JSON.stringify(Object.entries(name2).sort());
    if (serializedParsedName === serializedSourceName) {
      return formattedName;
    }
  }
  let output = ",";
  if (suffix || hasCommas)
    output = `${output}${suffix ? " " : ""}${suffix !== null && suffix !== void 0 ? suffix : ""},`;
  if (given)
    output = `${output} ${given}`;
  if (family)
    output = `${family}${output}`;
  if (dropping_particle)
    output = `${output} ${dropping_particle}`;
  if (non_dropping_particle)
    output = `${non_dropping_particle} ${output}`;
  if (output === ",")
    return "";
  return output;
}

// node_modules/myst-frontmatter/dist/contributors/validators.js
var PERSON_KEYS = [
  "id",
  "userId",
  "name",
  "nameParsed",
  "orcid",
  "corresponding",
  "equal_contributor",
  "deceased",
  "email",
  "roles",
  "affiliations",
  "collaborations",
  "note",
  "phone",
  "fax",
  ...SOCIAL_LINKS_KEYS
];
var PERSON_ALIASES = {
  ref: "id",
  // Used in QMD to reference a contributor
  role: "roles",
  "equal-contributor": "equal_contributor",
  affiliation: "affiliations",
  ...SOCIAL_LINKS_ALIASES
};
var NAME_KEYS = [
  "literal",
  "given",
  "family",
  "suffix",
  "non_dropping_particle",
  "dropping_particle"
];
var NAME_ALIASES = {
  surname: "family",
  last: "family",
  forename: "given",
  first: "given",
  particle: "non_dropping_particle",
  "non-dropping-particle": "non_dropping_particle",
  "dropping-particle": "dropping_particle"
};
function validateName(input, opts) {
  let output;
  let raiseCommaWarnings = false;
  if (typeof input === "string") {
    output = parseName(input);
    raiseCommaWarnings = true;
  } else {
    const value = validateObjectKeys(input, { optional: NAME_KEYS, alias: NAME_ALIASES }, opts);
    if (value === void 0)
      return void 0;
    output = {};
    if (defined(value.literal)) {
      output.literal = validateString(value.literal, incrementOptions("literal", opts));
    }
    if (defined(value.given)) {
      output.given = validateString(value.given, incrementOptions("given", opts));
    }
    if (defined(value.non_dropping_particle)) {
      output.non_dropping_particle = validateString(value.non_dropping_particle, incrementOptions("non_dropping_particle", opts));
    }
    if (defined(value.dropping_particle)) {
      output.dropping_particle = validateString(value.dropping_particle, incrementOptions("dropping_particle", opts));
    }
    if (defined(value.family)) {
      output.family = validateString(value.family, incrementOptions("family", opts));
    }
    if (defined(value.suffix)) {
      output.suffix = validateString(value.suffix, incrementOptions("suffix", opts));
    }
    if (Object.keys(output).length === 1 && output.literal) {
      output = { ...output, ...parseName(output.literal) };
      raiseCommaWarnings = true;
    } else if (!output.literal) {
      output.literal = formatName(output);
      if (output.literal.startsWith(",")) {
        validationWarning(`unexpected comma at beginning of name: ${output.literal} - you may need to define 'name.literal' explicitly`, opts);
      }
    }
  }
  if (raiseCommaWarnings) {
    const warnOnComma = (part, o) => {
      if (part && part.includes(",")) {
        validationWarning(`unexpected comma in name part: ${part} - you may need to define 'name' explicitly as an object`, o);
      }
    };
    warnOnComma(output.given, incrementOptions("given", opts));
    warnOnComma(output.family, incrementOptions("family", opts));
    warnOnComma(output.non_dropping_particle, incrementOptions("non_dropping_particle", opts));
    warnOnComma(output.dropping_particle, incrementOptions("dropping_particle", opts));
    warnOnComma(output.suffix, incrementOptions("suffix", opts));
  }
  return output;
}
function validateContributor(input, stash, opts) {
  var _a, _b, _c;
  const inputAff = validateObjectKeys(input, { optional: AFFILIATION_KEYS, alias: AFFILIATION_ALIASES }, {
    ...opts,
    suppressErrors: true,
    suppressWarnings: true
  });
  if ((inputAff === null || inputAff === void 0 ? void 0 : inputAff.collaboration) === true) {
    return validateAffiliation(input, opts);
  }
  if (typeof input === "string") {
    input = stashPlaceholder(input);
  }
  const value = validateObjectKeys(input, { optional: PERSON_KEYS, alias: PERSON_ALIASES }, opts);
  if (value === void 0)
    return void 0;
  if (inputAff && Object.keys(inputAff).length > Object.keys(value).length) {
    validationWarning('contributor may be a collaboration, not a person - if so, add "collaboration: true"', opts);
  }
  if (Object.keys(value).length === 1 && value.id) {
    value.name = value.id;
  }
  const output = {};
  if (defined(value.id)) {
    output.id = validateString(value.id, incrementOptions("id", opts));
  }
  if (defined(value.userId)) {
    output.userId = validateString(value.userId, incrementOptions("userId", opts));
  }
  if (defined(value.nameParsed)) {
    output.nameParsed = validateName(value.nameParsed, incrementOptions("nameParsed", opts));
    output.name = value.name ? validateString(value.name, incrementOptions("name", opts)) : (_a = output.nameParsed) === null || _a === void 0 ? void 0 : _a.literal;
    if (output.name !== ((_b = output.nameParsed) === null || _b === void 0 ? void 0 : _b.literal)) {
      validationWarning(`"name" and "parsedName.literal" should match`, opts);
    }
  } else if (defined(value.name)) {
    output.nameParsed = validateName(value.name, incrementOptions("name", opts));
    output.name = (_c = output.nameParsed) === null || _c === void 0 ? void 0 : _c.literal;
  } else {
    validationWarning("contributor should include name", opts);
  }
  if (defined(value.orcid)) {
    const orcidOpts = incrementOptions("orcid", opts);
    const id = orcid.normalize(value.orcid);
    if (id) {
      output.orcid = id;
    } else {
      validationError(`ORCID "${value.orcid}" is not valid, try an ID of the form "0000-0000-0000-0000"`, orcidOpts);
    }
  }
  if (defined(value.corresponding)) {
    const correspondingOpts = incrementOptions("corresponding", opts);
    output.corresponding = validateBoolean(value.corresponding, correspondingOpts);
    if (value.corresponding && !defined(value.email)) {
      validationError(`must include email for corresponding author`, correspondingOpts);
      output.corresponding = false;
    }
  }
  if (defined(value.equal_contributor)) {
    output.equal_contributor = validateBoolean(value.equal_contributor, incrementOptions("equal_contributor", opts));
  }
  if (defined(value.deceased)) {
    output.deceased = validateBoolean(value.deceased, incrementOptions("deceased", opts));
  }
  if (defined(value.email)) {
    output.email = validateEmail(value.email, incrementOptions("email", opts));
  }
  if (defined(value.roles)) {
    const rolesOpts = incrementOptions("roles", opts);
    let roles = value.roles;
    if (typeof roles === "string") {
      roles = roles.split(/[,;]/);
    }
    output.roles = validateList(roles, rolesOpts, (r) => {
      const roleString = validateString(r, rolesOpts);
      if (roleString === void 0)
        return void 0;
      const role = credit.normalize(roleString);
      if (!role) {
        validationWarning(`unknown value "${roleString}" - should be a CRediT role - see https://credit.niso.org/`, rolesOpts);
        return roleString.trim();
      }
      return role;
    });
  }
  if (defined(value.collaborations)) {
    validationError('collaborations must be defined in frontmatter as affiliations with "collaboration: true"', incrementOptions("collaborations", opts));
  }
  if (defined(value.affiliations)) {
    const affiliationsOpts = incrementOptions("affiliations", opts);
    let affiliations = value.affiliations;
    if (typeof affiliations === "string") {
      affiliations = affiliations.split(";").map((aff) => aff.trim());
    }
    if (!Array.isArray(affiliations)) {
      affiliations = [affiliations];
    }
    output.affiliations = validateList(affiliations, affiliationsOpts, (aff) => {
      return validateAndStashObject(aff, stash, "affiliations", validateAffiliation, affiliationsOpts);
    });
  }
  validateSocialLinks(value, opts, output);
  if (defined(value.phone)) {
    output.phone = validateString(value.phone, incrementOptions("phone", opts));
  }
  if (defined(value.fax)) {
    output.fax = validateString(value.fax, incrementOptions("fax", opts));
  }
  if (defined(value.note)) {
    output.note = validateString(value.note, incrementOptions("note", opts));
  }
  if (isStashPlaceholder(output) || !output.nameParsed)
    return output;
  if (value.nameParsed || value.name && typeof value.name !== "string")
    return output;
  const suffix = " - if this is intended, you may define 'name' explicitly as an object";
  if (!output.nameParsed.given) {
    validationWarning(`No given name for name '${output.nameParsed.literal}'${suffix}`, opts);
  }
  if (!output.nameParsed.family) {
    validationWarning(`No family name for name '${output.nameParsed.literal}'${suffix}`, opts);
  }
  return output;
}

// node_modules/myst-frontmatter/dist/site/types.js
var PAGE_KNOWN_PARTS = [
  "abstract",
  "summary",
  "keypoints",
  "dedication",
  "epigraph",
  "data_availability",
  "acknowledgments"
];
var SITE_FRONTMATTER_KEYS = [
  "title",
  "subtitle",
  "short_title",
  "description",
  "thumbnail",
  "thumbnailOptimized",
  "banner",
  "bannerOptimized",
  "tags",
  "authors",
  "reviewers",
  "editors",
  "contributors",
  "venue",
  "github",
  "keywords",
  "affiliations",
  "funding",
  "copyright",
  "options",
  "parts",
  ...PAGE_KNOWN_PARTS
];
var FRONTMATTER_ALIASES = {
  author: "authors",
  reviewer: "reviewers",
  editor: "editors",
  contributor: "contributors",
  affiliation: "affiliations",
  export: "exports",
  download: "downloads",
  jupyter: "thebe",
  part: "parts",
  ack: "acknowledgments",
  acknowledgements: "acknowledgments",
  acknowledgment: "acknowledgments",
  acknowledgement: "acknowledgments",
  availability: "data_availability",
  dataAvailability: "data_availability",
  "data-availability": "data_availability",
  quote: "epigraph",
  plain_language_summary: "summary",
  "plain-language-summary": "summary",
  plainLanguageSummary: "summary",
  lay_summary: "summary",
  "lay-summary": "summary",
  keyPoints: "keypoints",
  key_points: "keypoints",
  "key-points": "keypoints",
  image: "thumbnail",
  identifier: "identifiers"
};

// node_modules/myst-frontmatter/dist/project/types.js
var KNOWN_EXTERNAL_IDENTIFIERS = ["arxiv", "pmid", "pmcid", "zenodo"];
var PROJECT_AND_PAGE_FRONTMATTER_KEYS = [
  "date",
  "doi",
  "identifiers",
  "open_access",
  "license",
  "binder",
  "source",
  "subject",
  "volume",
  "issue",
  "first_page",
  "last_page",
  "oxa",
  "numbering",
  "bibliography",
  "math",
  "abbreviations",
  "exports",
  "downloads",
  "settings",
  // We maybe want to move this into site frontmatter in the future
  "edit_url",
  ...KNOWN_EXTERNAL_IDENTIFIERS,
  // Do not add any project specific keys here!
  ...SITE_FRONTMATTER_KEYS
];
var PROJECT_FRONTMATTER_KEYS = [
  ...PROJECT_AND_PAGE_FRONTMATTER_KEYS,
  // These keys only exist on the project
  "id",
  "references",
  "requirements",
  "resources",
  "thebe",
  "toc"
];

// node_modules/myst-frontmatter/dist/page/types.js
var PAGE_FRONTMATTER_KEYS = [
  ...PROJECT_AND_PAGE_FRONTMATTER_KEYS,
  // These keys only exist on the page
  "label",
  "kernelspec",
  "jupytext",
  "tags",
  "site",
  "enumerator",
  "content_includes_title",
  "skip_execution"
];

// node_modules/myst-frontmatter/dist/exports/types.js
var ExportFormats;
(function(ExportFormats2) {
  ExportFormats2["pdf"] = "pdf";
  ExportFormats2["tex"] = "tex";
  ExportFormats2["pdftex"] = "pdf+tex";
  ExportFormats2["typst"] = "typst";
  ExportFormats2["docx"] = "docx";
  ExportFormats2["xml"] = "xml";
  ExportFormats2["md"] = "md";
  ExportFormats2["meca"] = "meca";
  ExportFormats2["cff"] = "cff";
})(ExportFormats || (ExportFormats = {}));

// node_modules/myst-toc/dist/toc.js
var COMMON_ENTRY_KEYS = ["title", "hidden"];
function validateCommonEntry(entry, opts) {
  const output = {};
  if (defined(entry.title)) {
    output.title = validateString(entry.title, incrementOptions("title", opts));
  }
  if (defined(entry.hidden)) {
    output.hidden = validateBoolean(entry.hidden, incrementOptions("hidden", opts));
  }
  return output;
}
function validateFileEntry(entry, opts) {
  const intermediate = validateObjectKeys(entry, {
    required: ["file"],
    optional: [...COMMON_ENTRY_KEYS, "children"]
  }, opts);
  if (!intermediate) {
    return void 0;
  }
  const file = validateString(intermediate.file, incrementOptions("file", opts));
  if (!file) {
    return void 0;
  }
  const commonEntry = validateCommonEntry(intermediate, opts);
  let output = { file, ...commonEntry };
  if (defined(entry.children)) {
    const children = validateList(intermediate.children, incrementOptions("children", opts), (item, ind) => validateEntry(item, incrementOptions(`children.${ind}`, opts)));
    output = { children, ...output };
  }
  return output;
}
function validateURLEntry(entry, opts) {
  const intermediate = validateObjectKeys(entry, {
    required: ["url"],
    optional: [...COMMON_ENTRY_KEYS, "children"]
  }, opts);
  if (!intermediate) {
    return void 0;
  }
  const url = validateString(intermediate.url, incrementOptions("url", opts));
  if (!url) {
    return void 0;
  }
  const commonEntry = validateCommonEntry(intermediate, opts);
  let output = { url, ...commonEntry };
  if (defined(entry.children)) {
    const children = validateList(intermediate.children, incrementOptions("children", opts), (item, ind) => validateEntry(item, incrementOptions(`children.${ind}`, opts)));
    output = { children, ...output };
  }
  return output;
}
function validatePatternEntry(entry, opts) {
  const intermediate = validateObjectKeys(entry, {
    required: ["pattern"],
    optional: [...COMMON_ENTRY_KEYS]
  }, opts);
  if (!intermediate) {
    return void 0;
  }
  const pattern = validateString(intermediate.pattern, incrementOptions("pattern", opts));
  if (!pattern) {
    return void 0;
  }
  const commonEntry = validateCommonEntry(intermediate, opts);
  return { pattern, ...commonEntry };
}
function validateParentEntry(entry, opts) {
  const intermediate = validateObjectKeys(entry, {
    required: ["title", "children"],
    optional: [...COMMON_ENTRY_KEYS]
  }, opts);
  if (!intermediate) {
    return void 0;
  }
  const title = validateString(intermediate.title, incrementOptions("title", opts));
  if (!title) {
    return void 0;
  }
  const children = validateList(intermediate.children, incrementOptions("children", opts), (item, ind) => validateEntry(item, incrementOptions(`children.${ind}`, opts)));
  if (!children) {
    return void 0;
  }
  const commonEntry = validateCommonEntry(intermediate, opts);
  return {
    children,
    title,
    ...commonEntry
  };
}
function validateEntry(entry, opts) {
  const intermediate = validateObject(entry, opts);
  if (!intermediate) {
    return void 0;
  }
  if (defined(intermediate.file)) {
    return validateFileEntry(intermediate, opts);
  } else if (defined(intermediate.url)) {
    return validateURLEntry(intermediate, opts);
  } else if (defined(intermediate.pattern)) {
    return validatePatternEntry(intermediate, opts);
  } else if (defined(intermediate.title)) {
    return validateParentEntry(intermediate, opts);
  } else {
    return validationError("expected an entry with 'file', 'url', 'pattern', or 'title'", opts);
  }
}
function validateTOC(toc, opts) {
  return validateList(toc, opts, (item, ind) => validateEntry(item, incrementOptions(`${ind}`, opts)));
}

// node_modules/myst-frontmatter/dist/exports/validators.js
var EXPORT_KEY_OBJECT = {
  required: [],
  optional: [
    "format",
    "template",
    "output",
    "zip",
    "id",
    "name",
    "renderer",
    "articles",
    "top_level",
    "sub_articles"
  ],
  alias: {
    article: "articles",
    sub_article: "sub_articles"
  }
};
var EXPORT_ARTICLE_KEY_OBJECT = {
  optional: [
    "file",
    "title",
    "level",
    ...PAGE_FRONTMATTER_KEYS,
    ...Object.keys(FRONTMATTER_ALIASES)
  ]
};
var EXT_TO_FORMAT = {
  ".pdf": ExportFormats.pdf,
  ".tex": ExportFormats.tex,
  ".doc": ExportFormats.docx,
  ".docx": ExportFormats.docx,
  ".md": ExportFormats.md,
  ".zip": ExportFormats.meca,
  ".meca": ExportFormats.meca,
  ".xml": ExportFormats.xml,
  ".jats": ExportFormats.xml,
  ".typ": ExportFormats.typst,
  ".typst": ExportFormats.typst,
  ".cff": ExportFormats.cff
};
var RESERVED_EXPORT_KEYS = [
  ...EXPORT_KEY_OBJECT.required,
  ...EXPORT_KEY_OBJECT.optional,
  ...Object.keys(EXPORT_KEY_OBJECT.alias),
  ...PROJECT_FRONTMATTER_KEYS,
  ...Object.keys(FRONTMATTER_ALIASES)
];
var MULTI_ARTICLE_EXPORT_FORMATS = [
  ExportFormats.typst,
  ExportFormats.pdf,
  ExportFormats.tex,
  ExportFormats.pdftex
];
function validateExportsList(input, opts) {
  if (input === void 0)
    return void 0;
  const exportsOptions = { coerce: true, ...incrementOptions("exports", opts) };
  const output = validateList(input, exportsOptions, (exp, ind) => {
    return validateExport(exp, incrementOptions(`exports.${ind}`, opts));
  });
  if (!output || output.length === 0)
    return void 0;
  const duplicates = /* @__PURE__ */ new Set();
  output.forEach((exp, ind) => {
    if (exp.id && output.slice(ind + 1).map(({ id }) => id).includes(exp.id)) {
      duplicates.add(exp.id);
    }
  });
  if (duplicates.size) {
    validationError(`duplicate export ids: ${[...duplicates].join(", ")}`, exportsOptions);
  }
  return output;
}
function validateExportFormat(input, opts) {
  if (input === void 0)
    return void 0;
  if (input === "tex+pdf")
    input = "pdf+tex";
  if (input === "jats")
    input = "xml";
  const format = validateEnum(input, { ...opts, enum: ExportFormats });
  return format;
}
function validateExportArticle(input, opts) {
  if (typeof input === "string") {
    input = { file: input };
  }
  const value = validateObjectKeys(input, EXPORT_ARTICLE_KEY_OBJECT, opts);
  if (!value)
    return void 0;
  const output = { ...value };
  if (defined(value.file)) {
    output.file = validateString(value.file, opts);
  }
  if (defined(value.title)) {
    output.title = validateString(value.title, incrementOptions("title", opts));
  }
  if (defined(value.level)) {
    output.level = validateNumber(value.level, {
      min: -1,
      max: 6,
      integer: true,
      ...incrementOptions("level", opts)
    });
  }
  if (!output.title && !output.file) {
    return validationError("export articles must specify file or part/chapter title", opts);
  }
  return output;
}
function articlesWithFile(articles) {
  var _a;
  return (_a = articles === null || articles === void 0 ? void 0 : articles.filter((article) => {
    return !!article.file;
  })) !== null && _a !== void 0 ? _a : [];
}
function singleArticleWithFile(articles) {
  return articlesWithFile(articles)[0];
}
function validateExport(input, opts) {
  if (typeof input === "string") {
    let format2;
    let output2;
    if (input.startsWith(".")) {
      Object.entries(EXT_TO_FORMAT).forEach(([ext2, fmt]) => {
        if (input === ext2)
          format2 = fmt;
      });
    } else if (input.includes(".")) {
      output2 = input;
    }
    if (!format2 && !output2) {
      format2 = validateExportFormat(input, opts);
      if (!format2)
        return void 0;
    }
    input = { format: format2, output: output2 };
  }
  const value = validateObjectKeys(input, EXPORT_KEY_OBJECT, {
    ...opts,
    suppressWarnings: true,
    keepExtraKeys: true
  });
  if (value === void 0)
    return void 0;
  let format;
  let output;
  let template;
  if (value.template === null) {
    template = null;
  } else if (defined(value.template)) {
    template = validateString(value.template, incrementOptions("template", opts));
  }
  if (defined(value.output)) {
    const outputOpts = incrementOptions("output", opts);
    const outputString = validateString(value.output, outputOpts);
    if (outputString) {
      Object.keys(EXT_TO_FORMAT).forEach((ext2) => {
        if (outputString.endsWith(ext2))
          output = outputString;
      });
      if (!outputString.slice(1).includes(".")) {
        output = outputString;
      }
      if (!output) {
        return validationError(`unknown export output extension: ${outputString}`, outputOpts);
      }
    }
  }
  if (defined(value.format)) {
    format = validateExportFormat(value.format, incrementOptions("format", opts));
    if (!format)
      return void 0;
  }
  if (!format && !template && !output) {
    return validationError("export must specify one of: format, template, or output", opts);
  }
  const validExport = { ...value, format, output, template };
  if (defined(value.id)) {
    validExport.id = validateString(value.id, incrementOptions("id", opts));
  }
  if (defined(value.zip)) {
    validExport.zip = validateBoolean(value.zip, incrementOptions("zip", opts));
  }
  if (defined(value.articles)) {
    const articles = validateList(value.articles, { coerce: true, ...incrementOptions("articles", opts) }, (item, ind) => validateExportArticle(item, incrementOptions(`articles.${ind}`, opts)));
    const singleArticle = singleArticleWithFile(articles);
    if (articles === null || articles === void 0 ? void 0 : articles.length) {
      if (!singleArticle) {
        validationError("no files found in export article list", opts);
        validExport.articles = void 0;
      } else if (articles.length > 1 && validExport.format && !MULTI_ARTICLE_EXPORT_FORMATS.includes(validExport.format)) {
        if (validExport.format === ExportFormats.xml && !defined(value.sub_articles)) {
          validationError("multiple articles are not supported for 'jats' export - instead specify one article with additional sub_articles", opts);
        } else {
          validationError("multiple articles are only supported for 'tex', 'typst', and 'pdf' exports", opts);
        }
        validExport.articles = [singleArticle];
      } else {
        validExport.articles = articles;
      }
    } else {
      validExport.articles = void 0;
    }
  }
  if (defined(value.top_level)) {
    validExport.top_level = validateChoice(value.top_level || "sections", {
      ...incrementOptions("top_level", opts),
      choices: ["parts", "chapters", "sections"]
    });
  }
  if (defined(value.sub_articles)) {
    if (validExport.format !== ExportFormats.xml) {
      validationError("sub_articles are only supported for 'jats' export", opts);
      validExport.sub_articles = void 0;
    } else {
      validExport.sub_articles = validateList(value.sub_articles, { coerce: true, ...incrementOptions("sub_articles", opts) }, (file, ind) => {
        return validateString(file, incrementOptions(`sub_articles.${ind}`, opts));
      });
    }
  }
  if (defined(value.toc)) {
    const tocOpts = incrementOptions("toc", opts);
    if (validExport.articles || validExport.sub_articles) {
      validationError("export cannot define both toc and articles/sub_articles; ignoring toc", tocOpts);
      validExport.toc = void 0;
    } else if (typeof value.toc === "string") {
      validExport.tocFile = value.toc;
      validExport.toc = void 0;
    } else {
      validExport.toc = validateTOC(value.toc, tocOpts);
    }
  }
  return validExport;
}

// node_modules/myst-frontmatter/dist/downloads/validators.js
var DOWNLOAD_KEY_OBJECT = {
  required: [],
  optional: ["title", "url", "id", "filename", "format", "static"],
  alias: {
    ref: "id",
    file: "url"
  }
};
function validateDownload(input, opts) {
  if (typeof input === "string") {
    input = { url: input };
  }
  const value = validateObjectKeys(input, DOWNLOAD_KEY_OBJECT, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.id)) {
    output.id = validateString(value.id, incrementOptions("id", opts));
  }
  if (defined(value.url)) {
    output.url = validateString(value.url, incrementOptions("url", opts));
  }
  if (output.url && output.id) {
    return validationError(`download must define only one of id and file/url, not both`, opts);
  }
  if (!output.url && !output.id) {
    return validationError(`download must define either id or file/url`, opts);
  }
  if (defined(value.title)) {
    output.title = validateString(value.title, incrementOptions("title", opts));
  }
  if (defined(value.filename)) {
    output.filename = validateString(value.filename, incrementOptions("filename", opts));
  }
  if (defined(value.format)) {
    output.format = validateExportFormat(value.format, incrementOptions("format", opts));
  }
  if (defined(value.static)) {
    output.static = validateBoolean(value.static, incrementOptions("static", opts));
  }
  return output;
}
function validateDownloadsList(input, opts) {
  if (input === void 0)
    return void 0;
  const downloadOptions = { coerce: true, ...incrementOptions("downloads", opts) };
  const output = validateList(input, downloadOptions, (exp, ind) => {
    return validateDownload(exp, incrementOptions(`downloads.${ind}`, opts));
  });
  if (!output)
    return void 0;
  const duplicateIds = /* @__PURE__ */ new Set();
  const duplicateUrls = /* @__PURE__ */ new Set();
  output.forEach((download, ind) => {
    if (download.id && output.slice(ind + 1).map(({ id }) => id).includes(download.id)) {
      duplicateIds.add(download.id);
    }
    if (download.url && output.slice(ind + 1).map(({ url }) => url).includes(download.url)) {
      duplicateUrls.add(download.url);
    }
  });
  if (duplicateIds.size) {
    validationError(`duplicate download ids: ${[...duplicateIds].join(", ")}`, downloadOptions);
  }
  if (duplicateUrls.size) {
    validationError(`duplicate download urls: ${[...duplicateUrls].join(", ")}`, downloadOptions);
  }
  return output;
}

// node_modules/myst-frontmatter/dist/funding/validators.js
var AWARD_KEYS = ["id", "name", "description", "sources", "recipients", "investigators"];
var AWARD_ALIASES = { source: "sources", recipient: "recipients", investigator: "investigators" };
var FUNDING_KEYS = ["statement", "open_access", "awards"];
var FUNDING_ALIASES = { award: "awards" };
function validateAward(input, stash, opts) {
  const value = validateObjectKeys(input, { optional: AWARD_KEYS, alias: AWARD_ALIASES }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.id)) {
    output.id = validateString(value.id, { ...incrementOptions("id", opts), coerceNumber: true });
  }
  if (defined(value.name)) {
    output.name = validateString(value.name, incrementOptions("name", opts));
  }
  if (defined(value.description)) {
    output.description = validateString(value.description, incrementOptions("description", opts));
  }
  if (defined(value.sources)) {
    output.sources = validateList(value.sources, { coerce: true, ...incrementOptions("sources", opts) }, (source, index) => {
      return validateAndStashObject(source, stash, "affiliations", validateAffiliation, incrementOptions(`sources.${index}`, opts));
    });
  }
  if (defined(value.recipients)) {
    output.recipients = validateList(value.recipients, { coerce: true, ...incrementOptions("recipients", opts) }, (recipient, index) => {
      return validateAndStashObject(recipient, stash, "contributors", (v, o) => validateContributor(v, stash, o), incrementOptions(`recipients.${index}`, opts));
    });
  }
  if (defined(value.investigators)) {
    output.investigators = validateList(value.investigators, { coerce: true, ...incrementOptions("investigators", opts) }, (investigator, index) => {
      return validateAndStashObject(investigator, stash, "contributors", (v, o) => validateContributor(v, stash, o), incrementOptions(`investigators.${index}`, opts));
    });
  }
  return output;
}
function validateFunding(input, stash, opts) {
  if (typeof input === "string") {
    input = { statement: input };
  }
  const valueAsObj = validateObject(input, opts);
  if (valueAsObj === void 0)
    return void 0;
  const value = validateKeys(valueAsObj, { optional: FUNDING_KEYS, alias: FUNDING_ALIASES }, { ...opts, suppressErrors: true, suppressWarnings: true });
  if (value === void 0)
    return void 0;
  if (!value.awards) {
    validateKeys(valueAsObj, {
      optional: [...FUNDING_KEYS, ...AWARD_KEYS],
      alias: { ...FUNDING_ALIASES, ...AWARD_ALIASES }
    }, opts);
    const valueAsAward = validateObjectKeys(input, { optional: AWARD_KEYS, alias: AWARD_ALIASES }, { ...opts, suppressErrors: true, suppressWarnings: true });
    if (valueAsAward && Object.keys(valueAsAward).length > 0) {
      value.awards = [
        validateObjectKeys(input, { optional: AWARD_KEYS, alias: AWARD_ALIASES }, { ...opts, suppressErrors: true, suppressWarnings: true })
      ];
    }
  } else {
    validateKeys(valueAsObj, { optional: FUNDING_KEYS, alias: FUNDING_ALIASES }, opts);
  }
  const output = {};
  if (defined(value.statement)) {
    output.statement = validateString(value.statement, incrementOptions("statement", opts));
  }
  if (defined(value.open_access)) {
    output.open_access = validateString(value.open_access, incrementOptions("open_access", opts));
  }
  if (defined(value.awards)) {
    output.awards = validateList(value.awards, { coerce: true, ...incrementOptions("awards", opts) }, (award, index) => {
      return validateAward(award, stash, incrementOptions(`awards.${index}`, opts));
    });
  }
  return output;
}

// node_modules/myst-frontmatter/dist/jupytext/validators.js
var TEXT_REPRESENTATION_KEYS = ["extension", "format_name", "format_version", "jupytext_version"];
var JUPYTEXT_KEYS = ["formats", "text_representation"];
function validateTextRepresentation(input, opts) {
  const value = validateObjectKeys(input, { optional: TEXT_REPRESENTATION_KEYS }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.extension)) {
    output.extension = validateString(value.extension, incrementOptions("extension", opts));
  }
  if (defined(value.format_name)) {
    output.format_name = validateString(value.format_name, incrementOptions("format_name", opts));
  }
  if (defined(value.format_version)) {
    const format_version = typeof value.format_version === "number" ? String(value.format_version) : value.format_version;
    output.format_version = validateString(format_version, incrementOptions("format_version", opts));
  }
  if (defined(value.jupytext_version)) {
    output.jupytext_version = validateString(value.jupytext_version, incrementOptions("jupytext_version", opts));
  }
  return output;
}
function validateJupytext(input, opts) {
  const value = validateObjectKeys(input, { optional: JUPYTEXT_KEYS }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.formats)) {
    output.formats = validateString(value.formats, incrementOptions("formats", opts));
  }
  if (defined(value.text_representation)) {
    output.text_representation = validateTextRepresentation(value.text_representation, incrementOptions("text_representation", opts));
  }
  return output;
}

// node_modules/myst-frontmatter/dist/kernelspec/validators.js
var KERNELSPEC_KEYS = ["name", "display_name", "language", "argv", "env"];
function validateKernelSpec(input, opts) {
  const value = validateObjectKeys(input, { optional: KERNELSPEC_KEYS }, opts);
  if (value === void 0)
    return void 0;
  let name2;
  if (defined(value.name)) {
    const validatedName = validateString(value.name, incrementOptions("name", opts));
    if (validatedName === void 0)
      return void 0;
    name2 = validatedName;
  } else {
    name2 = "python3";
    validationWarning(`"name" key is required; using '${name2}' as placeholder value`, opts);
  }
  let displayName;
  if (defined(value.display_name)) {
    const validatedDisplayName = validateString(value.display_name, incrementOptions("display_name", opts));
    if (validatedDisplayName === void 0)
      return void 0;
    displayName = validatedDisplayName;
  } else {
    displayName = `${name2} Kernel`;
    validationWarning(`"display_name" key is required; using '${displayName}' as placeholder value`, opts);
  }
  const output = { name: name2, display_name: displayName };
  if (defined(value.language)) {
    output.language = validateString(value.language, incrementOptions("language", opts));
  }
  if (defined(value.env)) {
    output.env = validateObject(value.env, incrementOptions("env", opts));
  }
  if (defined(value.argv)) {
    output.argv = validateList(value.argv, incrementOptions("argv", opts), (arg, index) => {
      return validateString(arg, incrementOptions(`argv.${index}`, opts));
    });
  }
  return output;
}

// node_modules/myst-frontmatter/dist/licenses/licenses.js
var licenses = {
  "0BSD": {
    name: "BSD Zero Clause License",
    osi: true
  },
  "3D-Slicer-1.0": {
    name: "3D Slicer License v1.0"
  },
  AAL: {
    name: "Attribution Assurance License",
    osi: true
  },
  Abstyles: {
    name: "Abstyles License"
  },
  "AdaCore-doc": {
    name: "AdaCore Doc License"
  },
  "Adobe-2006": {
    name: "Adobe Systems Incorporated Source Code License Agreement"
  },
  "Adobe-Display-PostScript": {
    name: "Adobe Display PostScript License"
  },
  "Adobe-Glyph": {
    name: "Adobe Glyph List License"
  },
  "Adobe-Utopia": {
    name: "Adobe Utopia Font License"
  },
  ADSL: {
    name: "Amazon Digital Services License"
  },
  "AFL-1.1": {
    name: "Academic Free License v1.1",
    osi: true,
    free: true
  },
  "AFL-1.2": {
    name: "Academic Free License v1.2",
    osi: true,
    free: true
  },
  "AFL-2.0": {
    name: "Academic Free License v2.0",
    osi: true,
    free: true
  },
  "AFL-2.1": {
    name: "Academic Free License v2.1",
    osi: true,
    free: true
  },
  "AFL-3.0": {
    name: "Academic Free License v3.0",
    osi: true,
    free: true
  },
  Afmparse: {
    name: "Afmparse License"
  },
  "AGPL-1.0-only": {
    name: "Affero General Public License v1.0 only"
  },
  "AGPL-1.0-or-later": {
    name: "Affero General Public License v1.0 or later"
  },
  "AGPL-3.0-only": {
    name: "GNU Affero General Public License v3.0 only",
    osi: true,
    free: true
  },
  "AGPL-3.0-or-later": {
    name: "GNU Affero General Public License v3.0 or later",
    osi: true,
    free: true
  },
  Aladdin: {
    name: "Aladdin Free Public License"
  },
  "AMD-newlib": {
    name: "AMD newlib License"
  },
  AMDPLPA: {
    name: "AMD's plpa_map.c License"
  },
  AML: {
    name: "Apple MIT License"
  },
  "AML-glslang": {
    name: "AML glslang variant License"
  },
  AMPAS: {
    name: "Academy of Motion Picture Arts and Sciences BSD"
  },
  "ANTLR-PD": {
    name: "ANTLR Software Rights Notice"
  },
  "ANTLR-PD-fallback": {
    name: "ANTLR Software Rights Notice with license fallback"
  },
  "any-OSI": {
    name: "Any OSI License"
  },
  "any-OSI-perl-modules": {
    name: "Any OSI License - Perl Modules"
  },
  "Apache-1.0": {
    name: "Apache License 1.0",
    free: true
  },
  "Apache-1.1": {
    name: "Apache License 1.1",
    osi: true,
    free: true
  },
  "Apache-2.0": {
    name: "Apache License 2.0",
    osi: true,
    free: true
  },
  APAFML: {
    name: "Adobe Postscript AFM License"
  },
  "APL-1.0": {
    name: "Adaptive Public License 1.0",
    osi: true
  },
  "App-s2p": {
    name: "App::s2p License"
  },
  "APSL-1.0": {
    name: "Apple Public Source License 1.0",
    osi: true
  },
  "APSL-1.1": {
    name: "Apple Public Source License 1.1",
    osi: true
  },
  "APSL-1.2": {
    name: "Apple Public Source License 1.2",
    osi: true
  },
  "APSL-2.0": {
    name: "Apple Public Source License 2.0",
    osi: true,
    free: true
  },
  "Arphic-1999": {
    name: "Arphic Public License"
  },
  "Artistic-1.0": {
    name: "Artistic License 1.0",
    osi: true
  },
  "Artistic-1.0-cl8": {
    name: "Artistic License 1.0 w/clause 8",
    osi: true
  },
  "Artistic-1.0-Perl": {
    name: "Artistic License 1.0 (Perl)",
    osi: true
  },
  "Artistic-2.0": {
    name: "Artistic License 2.0",
    osi: true,
    free: true
  },
  "ASWF-Digital-Assets-1.0": {
    name: "ASWF Digital Assets License version 1.0"
  },
  "ASWF-Digital-Assets-1.1": {
    name: "ASWF Digital Assets License 1.1"
  },
  Baekmuk: {
    name: "Baekmuk License"
  },
  Bahyph: {
    name: "Bahyph License"
  },
  Barr: {
    name: "Barr License"
  },
  "bcrypt-Solar-Designer": {
    name: "bcrypt Solar Designer License"
  },
  Beerware: {
    name: "Beerware License"
  },
  "Bitstream-Charter": {
    name: "Bitstream Charter Font License"
  },
  "Bitstream-Vera": {
    name: "Bitstream Vera Font License"
  },
  "BitTorrent-1.0": {
    name: "BitTorrent Open Source License v1.0"
  },
  "BitTorrent-1.1": {
    name: "BitTorrent Open Source License v1.1",
    free: true
  },
  blessing: {
    name: "SQLite Blessing"
  },
  "BlueOak-1.0.0": {
    name: "Blue Oak Model License 1.0.0",
    osi: true
  },
  "Boehm-GC": {
    name: "Boehm-Demers-Weiser GC License"
  },
  "Boehm-GC-without-fee": {
    name: "Boehm-Demers-Weiser GC License (without fee)"
  },
  Borceux: {
    name: "Borceux license"
  },
  "Brian-Gladman-2-Clause": {
    name: "Brian Gladman 2-Clause License"
  },
  "Brian-Gladman-3-Clause": {
    name: "Brian Gladman 3-Clause License"
  },
  "BSD-1-Clause": {
    name: "BSD 1-Clause License",
    osi: true
  },
  "BSD-2-Clause": {
    name: 'BSD 2-Clause "Simplified" License',
    osi: true,
    free: true
  },
  "BSD-2-Clause-Darwin": {
    name: "BSD 2-Clause - Ian Darwin variant"
  },
  "BSD-2-Clause-first-lines": {
    name: "BSD 2-Clause - first lines requirement"
  },
  "BSD-2-Clause-Patent": {
    name: "BSD-2-Clause Plus Patent License",
    osi: true
  },
  "BSD-2-Clause-Views": {
    name: "BSD 2-Clause with views sentence"
  },
  "BSD-3-Clause": {
    name: 'BSD 3-Clause "New" or "Revised" License',
    osi: true,
    free: true
  },
  "BSD-3-Clause-acpica": {
    name: "BSD 3-Clause acpica variant"
  },
  "BSD-3-Clause-Attribution": {
    name: "BSD with attribution"
  },
  "BSD-3-Clause-Clear": {
    name: "BSD 3-Clause Clear License",
    free: true
  },
  "BSD-3-Clause-flex": {
    name: "BSD 3-Clause Flex variant"
  },
  "BSD-3-Clause-HP": {
    name: "Hewlett-Packard BSD variant license"
  },
  "BSD-3-Clause-LBNL": {
    name: "Lawrence Berkeley National Labs BSD variant license",
    osi: true
  },
  "BSD-3-Clause-Modification": {
    name: "BSD 3-Clause Modification"
  },
  "BSD-3-Clause-No-Military-License": {
    name: "BSD 3-Clause No Military License"
  },
  "BSD-3-Clause-No-Nuclear-License": {
    name: "BSD 3-Clause No Nuclear License"
  },
  "BSD-3-Clause-No-Nuclear-License-2014": {
    name: "BSD 3-Clause No Nuclear License 2014"
  },
  "BSD-3-Clause-No-Nuclear-Warranty": {
    name: "BSD 3-Clause No Nuclear Warranty"
  },
  "BSD-3-Clause-Open-MPI": {
    name: "BSD 3-Clause Open MPI variant"
  },
  "BSD-3-Clause-Sun": {
    name: "BSD 3-Clause Sun Microsystems"
  },
  "BSD-4-Clause": {
    name: 'BSD 4-Clause "Original" or "Old" License',
    free: true
  },
  "BSD-4-Clause-Shortened": {
    name: "BSD 4 Clause Shortened"
  },
  "BSD-4-Clause-UC": {
    name: "BSD-4-Clause (University of California-Specific)"
  },
  "BSD-4.3RENO": {
    name: "BSD 4.3 RENO License"
  },
  "BSD-4.3TAHOE": {
    name: "BSD 4.3 TAHOE License"
  },
  "BSD-Advertising-Acknowledgement": {
    name: "BSD Advertising Acknowledgement License"
  },
  "BSD-Attribution-HPND-disclaimer": {
    name: "BSD with Attribution and HPND disclaimer"
  },
  "BSD-Inferno-Nettverk": {
    name: "BSD-Inferno-Nettverk"
  },
  "BSD-Protection": {
    name: "BSD Protection License"
  },
  "BSD-Source-beginning-file": {
    name: "BSD Source Code Attribution - beginning of file variant"
  },
  "BSD-Source-Code": {
    name: "BSD Source Code Attribution"
  },
  "BSD-Systemics": {
    name: "Systemics BSD variant license"
  },
  "BSD-Systemics-W3Works": {
    name: "Systemics W3Works BSD variant license"
  },
  "BSL-1.0": {
    name: "Boost Software License 1.0",
    osi: true,
    free: true
  },
  "BUSL-1.1": {
    name: "Business Source License 1.1"
  },
  "bzip2-1.0.6": {
    name: "bzip2 and libbzip2 License v1.0.6"
  },
  "C-UDA-1.0": {
    name: "Computational Use of Data Agreement v1.0"
  },
  "CAL-1.0": {
    name: "Cryptographic Autonomy License 1.0",
    osi: true
  },
  "CAL-1.0-Combined-Work-Exception": {
    name: "Cryptographic Autonomy License 1.0 (Combined Work Exception)",
    osi: true
  },
  Caldera: {
    name: "Caldera License"
  },
  "Caldera-no-preamble": {
    name: "Caldera License (without preamble)"
  },
  Catharon: {
    name: "Catharon License"
  },
  "CATOSL-1.1": {
    name: "Computer Associates Trusted Open Source License 1.1",
    osi: true
  },
  "CC-BY-1.0": {
    name: "Creative Commons Attribution 1.0 Generic",
    CC: true
  },
  "CC-BY-2.0": {
    name: "Creative Commons Attribution 2.0 Generic",
    CC: true
  },
  "CC-BY-2.5": {
    name: "Creative Commons Attribution 2.5 Generic",
    CC: true
  },
  "CC-BY-2.5-AU": {
    name: "Creative Commons Attribution 2.5 Australia",
    CC: true
  },
  "CC-BY-3.0": {
    name: "Creative Commons Attribution 3.0 Unported",
    CC: true
  },
  "CC-BY-3.0-AT": {
    name: "Creative Commons Attribution 3.0 Austria",
    CC: true
  },
  "CC-BY-3.0-AU": {
    name: "Creative Commons Attribution 3.0 Australia",
    CC: true
  },
  "CC-BY-3.0-DE": {
    name: "Creative Commons Attribution 3.0 Germany",
    CC: true
  },
  "CC-BY-3.0-IGO": {
    name: "Creative Commons Attribution 3.0 IGO",
    CC: true
  },
  "CC-BY-3.0-NL": {
    name: "Creative Commons Attribution 3.0 Netherlands",
    CC: true
  },
  "CC-BY-3.0-US": {
    name: "Creative Commons Attribution 3.0 United States",
    CC: true
  },
  "CC-BY-4.0": {
    name: "Creative Commons Attribution 4.0 International",
    free: true,
    CC: true
  },
  "CC-BY-NC-1.0": {
    name: "Creative Commons Attribution Non Commercial 1.0 Generic",
    CC: true
  },
  "CC-BY-NC-2.0": {
    name: "Creative Commons Attribution Non Commercial 2.0 Generic",
    CC: true
  },
  "CC-BY-NC-2.5": {
    name: "Creative Commons Attribution Non Commercial 2.5 Generic",
    CC: true
  },
  "CC-BY-NC-3.0": {
    name: "Creative Commons Attribution Non Commercial 3.0 Unported",
    CC: true
  },
  "CC-BY-NC-3.0-DE": {
    name: "Creative Commons Attribution Non Commercial 3.0 Germany",
    CC: true
  },
  "CC-BY-NC-4.0": {
    name: "Creative Commons Attribution Non Commercial 4.0 International",
    CC: true
  },
  "CC-BY-NC-ND-1.0": {
    name: "Creative Commons Attribution Non Commercial No Derivatives 1.0 Generic",
    CC: true
  },
  "CC-BY-NC-ND-2.0": {
    name: "Creative Commons Attribution Non Commercial No Derivatives 2.0 Generic",
    CC: true
  },
  "CC-BY-NC-ND-2.5": {
    name: "Creative Commons Attribution Non Commercial No Derivatives 2.5 Generic",
    CC: true
  },
  "CC-BY-NC-ND-3.0": {
    name: "Creative Commons Attribution Non Commercial No Derivatives 3.0 Unported",
    CC: true
  },
  "CC-BY-NC-ND-3.0-DE": {
    name: "Creative Commons Attribution Non Commercial No Derivatives 3.0 Germany",
    CC: true
  },
  "CC-BY-NC-ND-3.0-IGO": {
    name: "Creative Commons Attribution Non Commercial No Derivatives 3.0 IGO",
    CC: true
  },
  "CC-BY-NC-ND-4.0": {
    name: "Creative Commons Attribution Non Commercial No Derivatives 4.0 International",
    CC: true
  },
  "CC-BY-NC-SA-1.0": {
    name: "Creative Commons Attribution Non Commercial Share Alike 1.0 Generic",
    CC: true
  },
  "CC-BY-NC-SA-2.0": {
    name: "Creative Commons Attribution Non Commercial Share Alike 2.0 Generic",
    CC: true
  },
  "CC-BY-NC-SA-2.0-DE": {
    name: "Creative Commons Attribution Non Commercial Share Alike 2.0 Germany",
    CC: true
  },
  "CC-BY-NC-SA-2.0-FR": {
    name: "Creative Commons Attribution-NonCommercial-ShareAlike 2.0 France",
    CC: true
  },
  "CC-BY-NC-SA-2.0-UK": {
    name: "Creative Commons Attribution Non Commercial Share Alike 2.0 England and Wales",
    CC: true
  },
  "CC-BY-NC-SA-2.5": {
    name: "Creative Commons Attribution Non Commercial Share Alike 2.5 Generic",
    CC: true
  },
  "CC-BY-NC-SA-3.0": {
    name: "Creative Commons Attribution Non Commercial Share Alike 3.0 Unported",
    CC: true
  },
  "CC-BY-NC-SA-3.0-DE": {
    name: "Creative Commons Attribution Non Commercial Share Alike 3.0 Germany",
    CC: true
  },
  "CC-BY-NC-SA-3.0-IGO": {
    name: "Creative Commons Attribution Non Commercial Share Alike 3.0 IGO",
    CC: true
  },
  "CC-BY-NC-SA-4.0": {
    name: "Creative Commons Attribution Non Commercial Share Alike 4.0 International",
    CC: true
  },
  "CC-BY-ND-1.0": {
    name: "Creative Commons Attribution No Derivatives 1.0 Generic",
    CC: true
  },
  "CC-BY-ND-2.0": {
    name: "Creative Commons Attribution No Derivatives 2.0 Generic",
    CC: true
  },
  "CC-BY-ND-2.5": {
    name: "Creative Commons Attribution No Derivatives 2.5 Generic",
    CC: true
  },
  "CC-BY-ND-3.0": {
    name: "Creative Commons Attribution No Derivatives 3.0 Unported",
    CC: true
  },
  "CC-BY-ND-3.0-DE": {
    name: "Creative Commons Attribution No Derivatives 3.0 Germany",
    CC: true
  },
  "CC-BY-ND-4.0": {
    name: "Creative Commons Attribution No Derivatives 4.0 International",
    CC: true
  },
  "CC-BY-SA-1.0": {
    name: "Creative Commons Attribution Share Alike 1.0 Generic",
    CC: true
  },
  "CC-BY-SA-2.0": {
    name: "Creative Commons Attribution Share Alike 2.0 Generic",
    CC: true
  },
  "CC-BY-SA-2.0-UK": {
    name: "Creative Commons Attribution Share Alike 2.0 England and Wales",
    CC: true
  },
  "CC-BY-SA-2.1-JP": {
    name: "Creative Commons Attribution Share Alike 2.1 Japan",
    CC: true
  },
  "CC-BY-SA-2.5": {
    name: "Creative Commons Attribution Share Alike 2.5 Generic",
    CC: true
  },
  "CC-BY-SA-3.0": {
    name: "Creative Commons Attribution Share Alike 3.0 Unported",
    CC: true
  },
  "CC-BY-SA-3.0-AT": {
    name: "Creative Commons Attribution Share Alike 3.0 Austria",
    CC: true
  },
  "CC-BY-SA-3.0-DE": {
    name: "Creative Commons Attribution Share Alike 3.0 Germany",
    CC: true
  },
  "CC-BY-SA-3.0-IGO": {
    name: "Creative Commons Attribution-ShareAlike 3.0 IGO",
    CC: true
  },
  "CC-BY-SA-4.0": {
    name: "Creative Commons Attribution Share Alike 4.0 International",
    free: true,
    CC: true
  },
  "CC-PDDC": {
    name: "Creative Commons Public Domain Dedication and Certification",
    CC: true
  },
  "CC-PDM-1.0": {
    name: "Creative    Commons Public Domain Mark 1.0 Universal",
    CC: true
  },
  "CC-SA-1.0": {
    name: "Creative Commons Share Alike 1.0 Generic",
    CC: true
  },
  "CC0-1.0": {
    name: "Creative Commons Zero v1.0 Universal",
    free: true,
    CC: true
  },
  "CDDL-1.0": {
    name: "Common Development and Distribution License 1.0",
    osi: true,
    free: true
  },
  "CDDL-1.1": {
    name: "Common Development and Distribution License 1.1"
  },
  "CDL-1.0": {
    name: "Common Documentation License 1.0"
  },
  "CDLA-Permissive-1.0": {
    name: "Community Data License Agreement Permissive 1.0"
  },
  "CDLA-Permissive-2.0": {
    name: "Community Data License Agreement Permissive 2.0"
  },
  "CDLA-Sharing-1.0": {
    name: "Community Data License Agreement Sharing 1.0"
  },
  "CECILL-1.0": {
    name: "CeCILL Free Software License Agreement v1.0"
  },
  "CECILL-1.1": {
    name: "CeCILL Free Software License Agreement v1.1"
  },
  "CECILL-2.0": {
    name: "CeCILL Free Software License Agreement v2.0",
    free: true
  },
  "CECILL-2.1": {
    name: "CeCILL Free Software License Agreement v2.1",
    osi: true
  },
  "CECILL-B": {
    name: "CeCILL-B Free Software License Agreement",
    free: true
  },
  "CECILL-C": {
    name: "CeCILL-C Free Software License Agreement",
    free: true
  },
  "CERN-OHL-1.1": {
    name: "CERN Open Hardware Licence v1.1"
  },
  "CERN-OHL-1.2": {
    name: "CERN Open Hardware Licence v1.2"
  },
  "CERN-OHL-P-2.0": {
    name: "CERN Open Hardware Licence Version 2 - Permissive",
    osi: true
  },
  "CERN-OHL-S-2.0": {
    name: "CERN Open Hardware Licence Version 2 - Strongly Reciprocal",
    osi: true
  },
  "CERN-OHL-W-2.0": {
    name: "CERN Open Hardware Licence Version 2 - Weakly Reciprocal",
    osi: true
  },
  CFITSIO: {
    name: "CFITSIO License"
  },
  "check-cvs": {
    name: "check-cvs License"
  },
  checkmk: {
    name: "Checkmk License"
  },
  ClArtistic: {
    name: "Clarified Artistic License",
    free: true
  },
  Clips: {
    name: "Clips License"
  },
  "CMU-Mach": {
    name: "CMU Mach License"
  },
  "CMU-Mach-nodoc": {
    name: "CMU    Mach - no notices-in-documentation variant"
  },
  "CNRI-Jython": {
    name: "CNRI Jython License"
  },
  "CNRI-Python": {
    name: "CNRI Python License",
    osi: true
  },
  "CNRI-Python-GPL-Compatible": {
    name: "CNRI Python Open Source GPL Compatible License Agreement"
  },
  "COIL-1.0": {
    name: "Copyfree Open Innovation License"
  },
  "Community-Spec-1.0": {
    name: "Community Specification License 1.0"
  },
  "Condor-1.1": {
    name: "Condor Public License v1.1",
    free: true
  },
  "copyleft-next-0.3.0": {
    name: "copyleft-next 0.3.0"
  },
  "copyleft-next-0.3.1": {
    name: "copyleft-next 0.3.1"
  },
  "Cornell-Lossless-JPEG": {
    name: "Cornell Lossless JPEG License"
  },
  "CPAL-1.0": {
    name: "Common Public Attribution License 1.0",
    osi: true,
    free: true
  },
  "CPL-1.0": {
    name: "Common Public License 1.0",
    osi: true,
    free: true
  },
  "CPOL-1.02": {
    name: "Code Project Open License 1.02"
  },
  Cronyx: {
    name: "Cronyx License"
  },
  Crossword: {
    name: "Crossword License"
  },
  CrystalStacker: {
    name: "CrystalStacker License"
  },
  "CUA-OPL-1.0": {
    name: "CUA Office Public License v1.0",
    osi: true
  },
  Cube: {
    name: "Cube License"
  },
  curl: {
    name: "curl License"
  },
  "cve-tou": {
    name: "Common Vulnerability Enumeration ToU License"
  },
  "D-FSL-1.0": {
    name: "Deutsche Freie Software Lizenz"
  },
  "DEC-3-Clause": {
    name: "DEC 3-Clause License"
  },
  diffmark: {
    name: "diffmark license"
  },
  "DL-DE-BY-2.0": {
    name: "Data licence Germany \u2013 attribution \u2013 version 2.0"
  },
  "DL-DE-ZERO-2.0": {
    name: "Data licence Germany \u2013 zero \u2013 version 2.0"
  },
  DOC: {
    name: "DOC License"
  },
  "DocBook-Schema": {
    name: "DocBook Schema License"
  },
  "DocBook-Stylesheet": {
    name: "DocBook Stylesheet License"
  },
  "DocBook-XML": {
    name: "DocBook XML License"
  },
  Dotseqn: {
    name: "Dotseqn License"
  },
  "DRL-1.0": {
    name: "Detection Rule License 1.0"
  },
  "DRL-1.1": {
    name: "Detection Rule License 1.1"
  },
  DSDP: {
    name: "DSDP License"
  },
  dtoa: {
    name: "David M. Gay dtoa License"
  },
  dvipdfm: {
    name: "dvipdfm License"
  },
  "ECL-1.0": {
    name: "Educational Community License v1.0",
    osi: true
  },
  "ECL-2.0": {
    name: "Educational Community License v2.0",
    osi: true,
    free: true
  },
  "EFL-1.0": {
    name: "Eiffel Forum License v1.0",
    osi: true
  },
  "EFL-2.0": {
    name: "Eiffel Forum License v2.0",
    osi: true,
    free: true
  },
  eGenix: {
    name: "eGenix.com Public License 1.1.0"
  },
  "Elastic-2.0": {
    name: "Elastic License 2.0"
  },
  Entessa: {
    name: "Entessa Public License v1.0",
    osi: true
  },
  EPICS: {
    name: "EPICS Open License"
  },
  "EPL-1.0": {
    name: "Eclipse Public License 1.0",
    osi: true,
    free: true
  },
  "EPL-2.0": {
    name: "Eclipse Public License 2.0",
    osi: true,
    free: true
  },
  "ErlPL-1.1": {
    name: "Erlang Public License v1.1"
  },
  "etalab-2.0": {
    name: "Etalab Open License 2.0"
  },
  EUDatagrid: {
    name: "EU DataGrid Software License",
    osi: true,
    free: true
  },
  "EUPL-1.0": {
    name: "European Union Public License 1.0"
  },
  "EUPL-1.1": {
    name: "European Union Public License 1.1",
    osi: true,
    free: true
  },
  "EUPL-1.2": {
    name: "European Union Public License 1.2",
    osi: true,
    free: true
  },
  Eurosym: {
    name: "Eurosym License"
  },
  Fair: {
    name: "Fair License",
    osi: true
  },
  FBM: {
    name: "Fuzzy Bitmap License"
  },
  "FDK-AAC": {
    name: "Fraunhofer FDK AAC Codec Library"
  },
  "Ferguson-Twofish": {
    name: "Ferguson Twofish License"
  },
  "Frameworx-1.0": {
    name: "Frameworx Open License 1.0",
    osi: true
  },
  "FreeBSD-DOC": {
    name: "FreeBSD Documentation License"
  },
  FreeImage: {
    name: "FreeImage Public License v1.0"
  },
  FSFAP: {
    name: "FSF All Permissive License",
    free: true
  },
  "FSFAP-no-warranty-disclaimer": {
    name: "FSF All Permissive License (without Warranty)"
  },
  FSFUL: {
    name: "FSF Unlimited License"
  },
  FSFULLR: {
    name: "FSF Unlimited License (with License Retention)"
  },
  FSFULLRWD: {
    name: "FSF Unlimited License (With License Retention and Warranty Disclaimer)"
  },
  FTL: {
    name: "Freetype Project License",
    free: true
  },
  Furuseth: {
    name: "Furuseth License"
  },
  fwlw: {
    name: "fwlw License"
  },
  "GCR-docs": {
    name: "Gnome GCR Documentation License"
  },
  GD: {
    name: "GD License"
  },
  "generic-xts": {
    name: "Generic XTS License"
  },
  "GFDL-1.1-invariants-only": {
    name: "GNU Free Documentation License v1.1 only - invariants"
  },
  "GFDL-1.1-invariants-or-later": {
    name: "GNU Free Documentation License v1.1 or later - invariants"
  },
  "GFDL-1.1-no-invariants-only": {
    name: "GNU Free Documentation License v1.1 only - no invariants"
  },
  "GFDL-1.1-no-invariants-or-later": {
    name: "GNU Free Documentation License v1.1 or later - no invariants"
  },
  "GFDL-1.1-only": {
    name: "GNU Free Documentation License v1.1 only",
    free: true
  },
  "GFDL-1.1-or-later": {
    name: "GNU Free Documentation License v1.1 or later",
    free: true
  },
  "GFDL-1.2-invariants-only": {
    name: "GNU Free Documentation License v1.2 only - invariants"
  },
  "GFDL-1.2-invariants-or-later": {
    name: "GNU Free Documentation License v1.2 or later - invariants"
  },
  "GFDL-1.2-no-invariants-only": {
    name: "GNU Free Documentation License v1.2 only - no invariants"
  },
  "GFDL-1.2-no-invariants-or-later": {
    name: "GNU Free Documentation License v1.2 or later - no invariants"
  },
  "GFDL-1.2-only": {
    name: "GNU Free Documentation License v1.2 only",
    free: true
  },
  "GFDL-1.2-or-later": {
    name: "GNU Free Documentation License v1.2 or later",
    free: true
  },
  "GFDL-1.3-invariants-only": {
    name: "GNU Free Documentation License v1.3 only - invariants"
  },
  "GFDL-1.3-invariants-or-later": {
    name: "GNU Free Documentation License v1.3 or later - invariants"
  },
  "GFDL-1.3-no-invariants-only": {
    name: "GNU Free Documentation License v1.3 only - no invariants"
  },
  "GFDL-1.3-no-invariants-or-later": {
    name: "GNU Free Documentation License v1.3 or later - no invariants"
  },
  "GFDL-1.3-only": {
    name: "GNU Free Documentation License v1.3 only",
    free: true
  },
  "GFDL-1.3-or-later": {
    name: "GNU Free Documentation License v1.3 or later",
    free: true
  },
  Giftware: {
    name: "Giftware License"
  },
  GL2PS: {
    name: "GL2PS License"
  },
  Glide: {
    name: "3dfx Glide License"
  },
  Glulxe: {
    name: "Glulxe License"
  },
  GLWTPL: {
    name: "Good Luck With That Public License"
  },
  gnuplot: {
    name: "gnuplot License",
    free: true
  },
  "GPL-1.0-only": {
    name: "GNU General Public License v1.0 only"
  },
  "GPL-1.0-or-later": {
    name: "GNU General Public License v1.0 or later"
  },
  "GPL-2.0-only": {
    name: "GNU General Public License v2.0 only",
    osi: true,
    free: true
  },
  "GPL-2.0-or-later": {
    name: "GNU General Public License v2.0 or later",
    osi: true,
    free: true
  },
  "GPL-3.0-only": {
    name: "GNU General Public License v3.0 only",
    osi: true,
    free: true
  },
  "GPL-3.0-or-later": {
    name: "GNU General Public License v3.0 or later",
    osi: true,
    free: true
  },
  "Graphics-Gems": {
    name: "Graphics Gems License"
  },
  "gSOAP-1.3b": {
    name: "gSOAP Public License v1.3b"
  },
  gtkbook: {
    name: "gtkbook License"
  },
  Gutmann: {
    name: "Gutmann License"
  },
  HaskellReport: {
    name: "Haskell Language Report License"
  },
  hdparm: {
    name: "hdparm License"
  },
  HIDAPI: {
    name: "HIDAPI License"
  },
  "Hippocratic-2.1": {
    name: "Hippocratic License 2.1"
  },
  "HP-1986": {
    name: "Hewlett-Packard 1986 License"
  },
  "HP-1989": {
    name: "Hewlett-Packard 1989 License"
  },
  HPND: {
    name: "Historical Permission Notice and Disclaimer",
    osi: true,
    free: true
  },
  "HPND-DEC": {
    name: "Historical Permission Notice and Disclaimer - DEC variant"
  },
  "HPND-doc": {
    name: "Historical Permission Notice and Disclaimer - documentation variant"
  },
  "HPND-doc-sell": {
    name: "Historical Permission Notice and Disclaimer - documentation sell variant"
  },
  "HPND-export-US": {
    name: "HPND with US Government export control warning"
  },
  "HPND-export-US-acknowledgement": {
    name: "HPND with US Government export control warning and acknowledgment"
  },
  "HPND-export-US-modify": {
    name: "HPND with US Government export control warning and modification rqmt"
  },
  "HPND-export2-US": {
    name: "HPND with US Government export control and 2 disclaimers"
  },
  "HPND-Fenneberg-Livingston": {
    name: "Historical Permission Notice and Disclaimer - Fenneberg-Livingston variant"
  },
  "HPND-INRIA-IMAG": {
    name: "Historical Permission Notice and Disclaimer    - INRIA-IMAG variant"
  },
  "HPND-Intel": {
    name: "Historical Permission Notice and Disclaimer - Intel variant"
  },
  "HPND-Kevlin-Henney": {
    name: "Historical Permission Notice and Disclaimer - Kevlin Henney variant"
  },
  "HPND-Markus-Kuhn": {
    name: "Historical Permission Notice and Disclaimer - Markus Kuhn variant"
  },
  "HPND-merchantability-variant": {
    name: "Historical Permission Notice and Disclaimer - merchantability variant"
  },
  "HPND-MIT-disclaimer": {
    name: "Historical Permission Notice and Disclaimer with MIT disclaimer"
  },
  "HPND-Netrek": {
    name: "Historical Permission Notice and Disclaimer - Netrek variant"
  },
  "HPND-Pbmplus": {
    name: "Historical Permission Notice and Disclaimer - Pbmplus variant"
  },
  "HPND-sell-MIT-disclaimer-xserver": {
    name: "Historical Permission Notice and Disclaimer - sell xserver variant with MIT disclaimer"
  },
  "HPND-sell-regexpr": {
    name: "Historical Permission Notice and Disclaimer - sell regexpr variant"
  },
  "HPND-sell-variant": {
    name: "Historical Permission Notice and Disclaimer - sell variant"
  },
  "HPND-sell-variant-MIT-disclaimer": {
    name: "HPND sell variant with MIT disclaimer"
  },
  "HPND-sell-variant-MIT-disclaimer-rev": {
    name: "HPND sell variant with MIT disclaimer - reverse"
  },
  "HPND-UC": {
    name: "Historical Permission Notice and Disclaimer - University of California variant"
  },
  "HPND-UC-export-US": {
    name: "Historical Permission Notice and Disclaimer - University of California, US export warning"
  },
  HTMLTIDY: {
    name: "HTML Tidy License"
  },
  "IBM-pibs": {
    name: "IBM PowerPC Initialization and Boot Software"
  },
  ICU: {
    name: "ICU License",
    osi: true
  },
  "IEC-Code-Components-EULA": {
    name: "IEC    Code Components End-user licence agreement"
  },
  IJG: {
    name: "Independent JPEG Group License",
    free: true
  },
  "IJG-short": {
    name: "Independent JPEG Group License - short"
  },
  ImageMagick: {
    name: "ImageMagick License"
  },
  iMatix: {
    name: "iMatix Standard Function Library Agreement",
    free: true
  },
  Imlib2: {
    name: "Imlib2 License",
    free: true
  },
  "Info-ZIP": {
    name: "Info-ZIP License"
  },
  "Inner-Net-2.0": {
    name: "Inner Net License v2.0"
  },
  InnoSetup: {
    name: "Inno Setup License"
  },
  Intel: {
    name: "Intel Open Source License",
    osi: true,
    free: true
  },
  "Intel-ACPI": {
    name: "Intel ACPI Software License Agreement"
  },
  "Interbase-1.0": {
    name: "Interbase Public License v1.0"
  },
  IPA: {
    name: "IPA Font License",
    osi: true,
    free: true
  },
  "IPL-1.0": {
    name: "IBM Public License v1.0",
    osi: true,
    free: true
  },
  ISC: {
    name: "ISC License",
    osi: true,
    free: true
  },
  "ISC-Veillard": {
    name: "ISC Veillard variant"
  },
  Jam: {
    name: "Jam License",
    osi: true
  },
  "JasPer-2.0": {
    name: "JasPer License"
  },
  "JPL-image": {
    name: "JPL Image Use Policy"
  },
  JPNIC: {
    name: "Japan Network Information Center License"
  },
  JSON: {
    name: "JSON License"
  },
  Kastrup: {
    name: "Kastrup License"
  },
  Kazlib: {
    name: "Kazlib License"
  },
  "Knuth-CTAN": {
    name: "Knuth CTAN License"
  },
  "LAL-1.2": {
    name: "Licence Art Libre 1.2"
  },
  "LAL-1.3": {
    name: "Licence Art Libre 1.3"
  },
  Latex2e: {
    name: "Latex2e License"
  },
  "Latex2e-translated-notice": {
    name: "Latex2e with translated notice permission"
  },
  Leptonica: {
    name: "Leptonica License"
  },
  "LGPL-2.0-only": {
    name: "GNU Library General Public License v2 only",
    osi: true
  },
  "LGPL-2.0-or-later": {
    name: "GNU Library General Public License v2 or later",
    osi: true
  },
  "LGPL-2.1-only": {
    name: "GNU Lesser General Public License v2.1 only",
    osi: true,
    free: true
  },
  "LGPL-2.1-or-later": {
    name: "GNU Lesser General Public License v2.1 or later",
    osi: true,
    free: true
  },
  "LGPL-3.0-only": {
    name: "GNU Lesser General Public License v3.0 only",
    osi: true,
    free: true
  },
  "LGPL-3.0-or-later": {
    name: "GNU Lesser General Public License v3.0 or later",
    osi: true,
    free: true
  },
  LGPLLR: {
    name: "Lesser General Public License For Linguistic Resources"
  },
  Libpng: {
    name: "libpng License"
  },
  "libpng-2.0": {
    name: "PNG Reference Library version 2"
  },
  "libselinux-1.0": {
    name: "libselinux public domain notice"
  },
  libtiff: {
    name: "libtiff License"
  },
  "libutil-David-Nugent": {
    name: "libutil David Nugent License"
  },
  "LiLiQ-P-1.1": {
    name: "Licence Libre du Qu\xE9bec \u2013 Permissive version 1.1",
    osi: true
  },
  "LiLiQ-R-1.1": {
    name: "Licence Libre du Qu\xE9bec \u2013 R\xE9ciprocit\xE9 version 1.1",
    osi: true
  },
  "LiLiQ-Rplus-1.1": {
    name: "Licence Libre du Qu\xE9bec \u2013 R\xE9ciprocit\xE9 forte version 1.1",
    osi: true
  },
  "Linux-man-pages-1-para": {
    name: "Linux man-pages - 1 paragraph"
  },
  "Linux-man-pages-copyleft": {
    name: "Linux man-pages Copyleft"
  },
  "Linux-man-pages-copyleft-2-para": {
    name: "Linux man-pages Copyleft - 2 paragraphs"
  },
  "Linux-man-pages-copyleft-var": {
    name: "Linux man-pages Copyleft Variant"
  },
  "Linux-OpenIB": {
    name: "Linux Kernel Variant of OpenIB.org license"
  },
  LOOP: {
    name: "Common Lisp LOOP License"
  },
  "LPD-document": {
    name: "LPD Documentation License"
  },
  "LPL-1.0": {
    name: "Lucent Public License Version 1.0",
    osi: true
  },
  "LPL-1.02": {
    name: "Lucent Public License v1.02",
    osi: true,
    free: true
  },
  "LPPL-1.0": {
    name: "LaTeX Project Public License v1.0"
  },
  "LPPL-1.1": {
    name: "LaTeX Project Public License v1.1"
  },
  "LPPL-1.2": {
    name: "LaTeX Project Public License v1.2",
    free: true
  },
  "LPPL-1.3a": {
    name: "LaTeX Project Public License v1.3a",
    free: true
  },
  "LPPL-1.3c": {
    name: "LaTeX Project Public License v1.3c",
    osi: true
  },
  lsof: {
    name: "lsof License"
  },
  "Lucida-Bitmap-Fonts": {
    name: "Lucida Bitmap Fonts License"
  },
  "LZMA-SDK-9.11-to-9.20": {
    name: "LZMA SDK License (versions 9.11 to 9.20)"
  },
  "LZMA-SDK-9.22": {
    name: "LZMA SDK License (versions 9.22 and beyond)"
  },
  "Mackerras-3-Clause": {
    name: "Mackerras 3-Clause License"
  },
  "Mackerras-3-Clause-acknowledgment": {
    name: "Mackerras 3-Clause - acknowledgment variant"
  },
  magaz: {
    name: "magaz License"
  },
  mailprio: {
    name: "mailprio License"
  },
  MakeIndex: {
    name: "MakeIndex License"
  },
  "Martin-Birgmeier": {
    name: "Martin Birgmeier License"
  },
  "McPhee-slideshow": {
    name: "McPhee Slideshow License"
  },
  metamail: {
    name: "metamail License"
  },
  Minpack: {
    name: "Minpack License"
  },
  MIPS: {
    name: "MIPS License"
  },
  MirOS: {
    name: "The MirOS Licence",
    osi: true
  },
  MIT: {
    name: "MIT License",
    osi: true,
    free: true
  },
  "MIT-0": {
    name: "MIT No Attribution",
    osi: true
  },
  "MIT-advertising": {
    name: "Enlightenment License (e16)"
  },
  "MIT-Click": {
    name: "MIT Click License"
  },
  "MIT-CMU": {
    name: "CMU License"
  },
  "MIT-enna": {
    name: "enna License"
  },
  "MIT-feh": {
    name: "feh License"
  },
  "MIT-Festival": {
    name: "MIT Festival Variant"
  },
  "MIT-Khronos-old": {
    name: "MIT Khronos - old variant"
  },
  "MIT-Modern-Variant": {
    name: "MIT License Modern Variant",
    osi: true
  },
  "MIT-open-group": {
    name: "MIT Open Group variant"
  },
  "MIT-testregex": {
    name: "MIT testregex Variant"
  },
  "MIT-Wu": {
    name: "MIT Tom Wu Variant"
  },
  MITNFA: {
    name: "MIT +no-false-attribs license"
  },
  MMIXware: {
    name: "MMIXware License"
  },
  Motosoto: {
    name: "Motosoto License",
    osi: true
  },
  "MPEG-SSG": {
    name: "MPEG Software Simulation"
  },
  "mpi-permissive": {
    name: "mpi Permissive License"
  },
  mpich2: {
    name: "mpich2 License"
  },
  "MPL-1.0": {
    name: "Mozilla Public License 1.0",
    osi: true
  },
  "MPL-1.1": {
    name: "Mozilla Public License 1.1",
    osi: true,
    free: true
  },
  "MPL-2.0": {
    name: "Mozilla Public License 2.0",
    osi: true,
    free: true
  },
  "MPL-2.0-no-copyleft-exception": {
    name: "Mozilla Public License 2.0 (no copyleft exception)",
    osi: true
  },
  mplus: {
    name: "mplus Font License"
  },
  "MS-LPL": {
    name: "Microsoft Limited Public License"
  },
  "MS-PL": {
    name: "Microsoft Public License",
    osi: true,
    free: true
  },
  "MS-RL": {
    name: "Microsoft Reciprocal License",
    osi: true,
    free: true
  },
  MTLL: {
    name: "Matrix Template Library License"
  },
  "MulanPSL-1.0": {
    name: "Mulan Permissive Software License, Version 1"
  },
  "MulanPSL-2.0": {
    name: "Mulan Permissive Software License, Version 2",
    osi: true
  },
  Multics: {
    name: "Multics License",
    osi: true
  },
  Mup: {
    name: "Mup License"
  },
  "NAIST-2003": {
    name: "Nara Institute of Science and Technology License (2003)"
  },
  "NASA-1.3": {
    name: "NASA Open Source Agreement 1.3",
    osi: true
  },
  Naumen: {
    name: "Naumen Public License",
    osi: true
  },
  "NBPL-1.0": {
    name: "Net Boolean Public License v1"
  },
  "NCBI-PD": {
    name: "NCBI Public Domain Notice"
  },
  "NCGL-UK-2.0": {
    name: "Non-Commercial Government Licence"
  },
  NCL: {
    name: "NCL Source Code License"
  },
  NCSA: {
    name: "University of Illinois/NCSA Open Source License",
    osi: true,
    free: true
  },
  NetCDF: {
    name: "NetCDF license"
  },
  Newsletr: {
    name: "Newsletr License"
  },
  NGPL: {
    name: "Nethack General Public License",
    osi: true
  },
  "NICTA-1.0": {
    name: "NICTA Public Software License, Version 1.0"
  },
  "NIST-PD": {
    name: "NIST Public Domain Notice"
  },
  "NIST-PD-fallback": {
    name: "NIST Public Domain Notice with license fallback"
  },
  "NIST-Software": {
    name: "NIST Software License"
  },
  "NLOD-1.0": {
    name: "Norwegian Licence for Open Government Data (NLOD) 1.0"
  },
  "NLOD-2.0": {
    name: "Norwegian Licence for Open Government Data (NLOD) 2.0"
  },
  NLPL: {
    name: "No Limit Public License"
  },
  Nokia: {
    name: "Nokia Open Source License",
    osi: true,
    free: true
  },
  NOSL: {
    name: "Netizen Open Source License",
    free: true
  },
  Noweb: {
    name: "Noweb License"
  },
  "NPL-1.0": {
    name: "Netscape Public License v1.0",
    free: true
  },
  "NPL-1.1": {
    name: "Netscape Public License v1.1",
    free: true
  },
  "NPOSL-3.0": {
    name: "Non-Profit Open Software License 3.0",
    osi: true
  },
  NRL: {
    name: "NRL License"
  },
  NTP: {
    name: "NTP License",
    osi: true
  },
  "NTP-0": {
    name: "NTP No Attribution"
  },
  "O-UDA-1.0": {
    name: "Open Use of Data Agreement v1.0"
  },
  OAR: {
    name: "OAR License"
  },
  "OCCT-PL": {
    name: "Open CASCADE Technology Public License"
  },
  "OCLC-2.0": {
    name: "OCLC Research Public License 2.0",
    osi: true
  },
  "ODbL-1.0": {
    name: "Open Data Commons Open Database License v1.0",
    free: true
  },
  "ODC-By-1.0": {
    name: "Open Data Commons Attribution License v1.0"
  },
  OFFIS: {
    name: "OFFIS License"
  },
  "OFL-1.0": {
    name: "SIL Open Font License 1.0",
    free: true
  },
  "OFL-1.0-no-RFN": {
    name: "SIL Open Font License 1.0 with no Reserved Font Name"
  },
  "OFL-1.0-RFN": {
    name: "SIL Open Font License 1.0 with Reserved Font Name"
  },
  "OFL-1.1": {
    name: "SIL Open Font License 1.1",
    osi: true,
    free: true
  },
  "OFL-1.1-no-RFN": {
    name: "SIL Open Font License 1.1 with no Reserved Font Name",
    osi: true
  },
  "OFL-1.1-RFN": {
    name: "SIL Open Font License 1.1 with Reserved Font Name",
    osi: true
  },
  "OGC-1.0": {
    name: "OGC Software License, Version 1.0"
  },
  "OGDL-Taiwan-1.0": {
    name: "Taiwan Open Government Data License, version 1.0"
  },
  "OGL-Canada-2.0": {
    name: "Open Government Licence - Canada"
  },
  "OGL-UK-1.0": {
    name: "Open Government Licence v1.0"
  },
  "OGL-UK-2.0": {
    name: "Open Government Licence v2.0"
  },
  "OGL-UK-3.0": {
    name: "Open Government Licence v3.0"
  },
  OGTSL: {
    name: "Open Group Test Suite License",
    osi: true
  },
  "OLDAP-1.1": {
    name: "Open LDAP Public License v1.1"
  },
  "OLDAP-1.2": {
    name: "Open LDAP Public License v1.2"
  },
  "OLDAP-1.3": {
    name: "Open LDAP Public License v1.3"
  },
  "OLDAP-1.4": {
    name: "Open LDAP Public License v1.4"
  },
  "OLDAP-2.0": {
    name: "Open LDAP Public License v2.0 (or possibly 2.0A and 2.0B)"
  },
  "OLDAP-2.0.1": {
    name: "Open LDAP Public License v2.0.1"
  },
  "OLDAP-2.1": {
    name: "Open LDAP Public License v2.1"
  },
  "OLDAP-2.2": {
    name: "Open LDAP Public License v2.2"
  },
  "OLDAP-2.2.1": {
    name: "Open LDAP Public License v2.2.1"
  },
  "OLDAP-2.2.2": {
    name: "Open LDAP Public License 2.2.2"
  },
  "OLDAP-2.3": {
    name: "Open LDAP Public License v2.3",
    free: true
  },
  "OLDAP-2.4": {
    name: "Open LDAP Public License v2.4"
  },
  "OLDAP-2.5": {
    name: "Open LDAP Public License v2.5"
  },
  "OLDAP-2.6": {
    name: "Open LDAP Public License v2.6"
  },
  "OLDAP-2.7": {
    name: "Open LDAP Public License v2.7",
    free: true
  },
  "OLDAP-2.8": {
    name: "Open LDAP Public License v2.8",
    osi: true
  },
  "OLFL-1.3": {
    name: "Open Logistics Foundation License Version 1.3",
    osi: true
  },
  OML: {
    name: "Open Market License"
  },
  "OpenPBS-2.3": {
    name: "OpenPBS v2.3 Software License"
  },
  OpenSSL: {
    name: "OpenSSL License",
    free: true
  },
  "OpenSSL-standalone": {
    name: "OpenSSL License - standalone"
  },
  OpenVision: {
    name: "OpenVision License"
  },
  "OPL-1.0": {
    name: "Open Public License v1.0"
  },
  "OPL-UK-3.0": {
    name: "United    Kingdom Open Parliament Licence v3.0"
  },
  "OPUBL-1.0": {
    name: "Open Publication License v1.0"
  },
  "OSET-PL-2.1": {
    name: "OSET Public License version 2.1",
    osi: true
  },
  "OSL-1.0": {
    name: "Open Software License 1.0",
    osi: true,
    free: true
  },
  "OSL-1.1": {
    name: "Open Software License 1.1",
    free: true
  },
  "OSL-2.0": {
    name: "Open Software License 2.0",
    osi: true,
    free: true
  },
  "OSL-2.1": {
    name: "Open Software License 2.1",
    osi: true,
    free: true
  },
  "OSL-3.0": {
    name: "Open Software License 3.0",
    osi: true,
    free: true
  },
  PADL: {
    name: "PADL License"
  },
  "Parity-6.0.0": {
    name: "The Parity Public License 6.0.0"
  },
  "Parity-7.0.0": {
    name: "The Parity Public License 7.0.0"
  },
  "PDDL-1.0": {
    name: "Open Data Commons Public Domain Dedication & License 1.0"
  },
  "PHP-3.0": {
    name: "PHP License v3.0",
    osi: true
  },
  "PHP-3.01": {
    name: "PHP License v3.01",
    osi: true,
    free: true
  },
  Pixar: {
    name: "Pixar License"
  },
  pkgconf: {
    name: "pkgconf License"
  },
  Plexus: {
    name: "Plexus Classworlds License"
  },
  pnmstitch: {
    name: "pnmstitch License"
  },
  "PolyForm-Noncommercial-1.0.0": {
    name: "PolyForm Noncommercial License 1.0.0"
  },
  "PolyForm-Small-Business-1.0.0": {
    name: "PolyForm Small Business License 1.0.0"
  },
  PostgreSQL: {
    name: "PostgreSQL License",
    osi: true
  },
  PPL: {
    name: "Peer Production License"
  },
  "PSF-2.0": {
    name: "Python Software Foundation License 2.0"
  },
  psfrag: {
    name: "psfrag License"
  },
  psutils: {
    name: "psutils License"
  },
  "Python-2.0": {
    name: "Python License 2.0",
    osi: true,
    free: true
  },
  "Python-2.0.1": {
    name: "Python License 2.0.1"
  },
  "python-ldap": {
    name: "Python ldap License"
  },
  Qhull: {
    name: "Qhull License"
  },
  "QPL-1.0": {
    name: "Q Public License 1.0",
    osi: true,
    free: true
  },
  "QPL-1.0-INRIA-2004": {
    name: "Q Public License 1.0 - INRIA 2004 variant"
  },
  radvd: {
    name: "radvd License"
  },
  Rdisc: {
    name: "Rdisc License"
  },
  "RHeCos-1.1": {
    name: "Red Hat eCos Public License v1.1"
  },
  "RPL-1.1": {
    name: "Reciprocal Public License 1.1",
    osi: true
  },
  "RPL-1.5": {
    name: "Reciprocal Public License 1.5",
    osi: true
  },
  "RPSL-1.0": {
    name: "RealNetworks Public Source License v1.0",
    osi: true,
    free: true
  },
  "RSA-MD": {
    name: "RSA Message-Digest License"
  },
  RSCPL: {
    name: "Ricoh Source Code Public License",
    osi: true
  },
  Ruby: {
    name: "Ruby License",
    free: true
  },
  "Ruby-pty": {
    name: "Ruby pty extension license"
  },
  "SAX-PD": {
    name: "Sax Public Domain Notice"
  },
  "SAX-PD-2.0": {
    name: "Sax Public Domain Notice 2.0"
  },
  Saxpath: {
    name: "Saxpath License"
  },
  SCEA: {
    name: "SCEA Shared Source License"
  },
  SchemeReport: {
    name: "Scheme Language Report License"
  },
  Sendmail: {
    name: "Sendmail License"
  },
  "Sendmail-8.23": {
    name: "Sendmail License 8.23"
  },
  "Sendmail-Open-Source-1.1": {
    name: "Sendmail Open Source License v1.1"
  },
  "SGI-B-1.0": {
    name: "SGI Free Software License B v1.0"
  },
  "SGI-B-1.1": {
    name: "SGI Free Software License B v1.1"
  },
  "SGI-B-2.0": {
    name: "SGI Free Software License B v2.0",
    free: true
  },
  "SGI-OpenGL": {
    name: "SGI OpenGL License"
  },
  SGP4: {
    name: "SGP4 Permission Notice"
  },
  "SHL-0.5": {
    name: "Solderpad Hardware License v0.5"
  },
  "SHL-0.51": {
    name: "Solderpad Hardware License, Version 0.51"
  },
  "SimPL-2.0": {
    name: "Simple Public License 2.0",
    osi: true
  },
  SISSL: {
    name: "Sun Industry Standards Source License v1.1",
    osi: true,
    free: true
  },
  "SISSL-1.2": {
    name: "Sun Industry Standards Source License v1.2"
  },
  SL: {
    name: "SL License"
  },
  Sleepycat: {
    name: "Sleepycat License",
    osi: true,
    free: true
  },
  "SMAIL-GPL": {
    name: "SMAIL General Public License"
  },
  SMLNJ: {
    name: "Standard ML of New Jersey License",
    free: true
  },
  SMPPL: {
    name: "Secure Messaging Protocol Public License"
  },
  SNIA: {
    name: "SNIA Public License 1.1"
  },
  snprintf: {
    name: "snprintf License"
  },
  softSurfer: {
    name: "softSurfer License"
  },
  Soundex: {
    name: "Soundex License"
  },
  "Spencer-86": {
    name: "Spencer License 86"
  },
  "Spencer-94": {
    name: "Spencer License 94"
  },
  "Spencer-99": {
    name: "Spencer License 99"
  },
  "SPL-1.0": {
    name: "Sun Public License v1.0",
    osi: true,
    free: true
  },
  "ssh-keyscan": {
    name: "ssh-keyscan License"
  },
  "SSH-OpenSSH": {
    name: "SSH OpenSSH license"
  },
  "SSH-short": {
    name: "SSH short notice"
  },
  "SSLeay-standalone": {
    name: "SSLeay License - standalone"
  },
  "SSPL-1.0": {
    name: "Server Side Public License, v 1"
  },
  "SugarCRM-1.1.3": {
    name: "SugarCRM Public License v1.1.3"
  },
  "Sun-PPP": {
    name: "Sun PPP License"
  },
  "Sun-PPP-2000": {
    name: "Sun PPP License (2000)"
  },
  SunPro: {
    name: "SunPro License"
  },
  SWL: {
    name: "Scheme Widget Library (SWL) Software License Agreement"
  },
  swrule: {
    name: "swrule License"
  },
  Symlinks: {
    name: "Symlinks License"
  },
  "TAPR-OHL-1.0": {
    name: "TAPR Open Hardware License v1.0"
  },
  TCL: {
    name: "TCL/TK License"
  },
  "TCP-wrappers": {
    name: "TCP Wrappers License"
  },
  TermReadKey: {
    name: "TermReadKey License"
  },
  "TGPPL-1.0": {
    name: "Transitive Grace Period Public Licence 1.0"
  },
  ThirdEye: {
    name: "ThirdEye License"
  },
  threeparttable: {
    name: "threeparttable License"
  },
  TMate: {
    name: "TMate Open Source License"
  },
  "TORQUE-1.1": {
    name: "TORQUE v2.5+ Software License v1.1"
  },
  TOSL: {
    name: "Trusster Open Source License"
  },
  TPDL: {
    name: "Time::ParseDate License"
  },
  "TPL-1.0": {
    name: "THOR Public License 1.0"
  },
  TrustedQSL: {
    name: "TrustedQSL License"
  },
  TTWL: {
    name: "Text-Tabs+Wrap License"
  },
  TTYP0: {
    name: "TTYP0 License"
  },
  "TU-Berlin-1.0": {
    name: "Technische Universitaet Berlin License 1.0"
  },
  "TU-Berlin-2.0": {
    name: "Technische Universitaet Berlin License 2.0"
  },
  "Ubuntu-font-1.0": {
    name: "Ubuntu Font Licence v1.0"
  },
  UCAR: {
    name: "UCAR License"
  },
  "UCL-1.0": {
    name: "Upstream Compatibility License v1.0",
    osi: true
  },
  ulem: {
    name: "ulem License"
  },
  "UMich-Merit": {
    name: "Michigan/Merit Networks License"
  },
  "Unicode-3.0": {
    name: "Unicode License v3",
    osi: true
  },
  "Unicode-DFS-2015": {
    name: "Unicode License Agreement - Data Files and Software (2015)"
  },
  "Unicode-DFS-2016": {
    name: "Unicode License Agreement - Data Files and Software (2016)",
    osi: true
  },
  "Unicode-TOU": {
    name: "Unicode Terms of Use"
  },
  UnixCrypt: {
    name: "UnixCrypt License"
  },
  Unlicense: {
    name: "The Unlicense",
    osi: true,
    free: true
  },
  "UPL-1.0": {
    name: "Universal Permissive License v1.0",
    osi: true,
    free: true
  },
  "URT-RLE": {
    name: "Utah Raster Toolkit Run Length Encoded License"
  },
  Vim: {
    name: "Vim License",
    free: true
  },
  VOSTROM: {
    name: "VOSTROM Public License for Open Source"
  },
  "VSL-1.0": {
    name: "Vovida Software License v1.0",
    osi: true
  },
  W3C: {
    name: "W3C Software Notice and License (2002-12-31)",
    osi: true,
    free: true
  },
  "W3C-19980720": {
    name: "W3C Software Notice and License (1998-07-20)"
  },
  "W3C-20150513": {
    name: "W3C Software Notice and Document License (2015-05-13)",
    osi: true
  },
  w3m: {
    name: "w3m License"
  },
  "Watcom-1.0": {
    name: "Sybase Open Watcom Public License 1.0",
    osi: true
  },
  "Widget-Workshop": {
    name: "Widget Workshop License"
  },
  Wsuipa: {
    name: "Wsuipa License"
  },
  WTFPL: {
    name: "Do What The F*ck You Want To Public License",
    free: true
  },
  wwl: {
    name: "WWL License"
  },
  X11: {
    name: "X11 License",
    free: true
  },
  "X11-distribute-modifications-variant": {
    name: "X11 License Distribution Modification Variant"
  },
  "X11-swapped": {
    name: "X11 swapped final paragraphs"
  },
  "Xdebug-1.03": {
    name: "Xdebug License v 1.03"
  },
  Xerox: {
    name: "Xerox License"
  },
  Xfig: {
    name: "Xfig License"
  },
  "XFree86-1.1": {
    name: "XFree86 License 1.1",
    free: true
  },
  xinetd: {
    name: "xinetd License",
    free: true
  },
  "xkeyboard-config-Zinoviev": {
    name: "xkeyboard-config Zinoviev License"
  },
  xlock: {
    name: "xlock License"
  },
  Xnet: {
    name: "X.Net License",
    osi: true
  },
  xpp: {
    name: "XPP License"
  },
  XSkat: {
    name: "XSkat License"
  },
  xzoom: {
    name: "xzoom License"
  },
  "YPL-1.0": {
    name: "Yahoo! Public License v1.0"
  },
  "YPL-1.1": {
    name: "Yahoo! Public License v1.1",
    free: true
  },
  Zed: {
    name: "Zed License"
  },
  Zeeff: {
    name: "Zeeff License"
  },
  "Zend-2.0": {
    name: "Zend License v2.0",
    free: true
  },
  "Zimbra-1.3": {
    name: "Zimbra Public License v1.3",
    free: true
  },
  "Zimbra-1.4": {
    name: "Zimbra Public License v1.4"
  },
  Zlib: {
    name: "zlib License",
    osi: true,
    free: true
  },
  "zlib-acknowledgement": {
    name: "zlib/libpng License with Acknowledgement"
  },
  "ZPL-1.1": {
    name: "Zope Public License 1.1"
  },
  "ZPL-2.0": {
    name: "Zope Public License 2.0",
    osi: true,
    free: true
  },
  "ZPL-2.1": {
    name: "Zope Public License 2.1",
    osi: true,
    free: true
  }
};
var licenses_default = licenses;

// node_modules/myst-frontmatter/dist/licenses/validators.js
var import_spdx_correct = __toESM(require_spdx_correct(), 1);
function correctLicense(license) {
  if (!license)
    return void 0;
  const value = (0, import_spdx_correct.default)(license);
  if (value)
    return value;
  if (license.toUpperCase() === "CC-BY")
    return "CC-BY-4.0";
  return void 0;
}
function createURL(id, cc, osi) {
  var _a, _b;
  if (cc) {
    const match2 = /^([CBYSAND0ZEROPDM-]+)(?:(?:-)([0-9].[0-9]))?(?:(?:-)([A-Z]{2,3}))?$/.exec(id);
    if (!match2) {
      throw new Error("Creative Commons license not found");
    }
    const kind = match2[1].toUpperCase();
    const version = (_a = match2[2]) !== null && _a !== void 0 ? _a : "4.0";
    const extra = (_b = match2[3]) !== null && _b !== void 0 ? _b : "";
    let link = "";
    switch (kind) {
      case "CC-BY":
        link = `/by/${version}/`;
        break;
      case "CC-BY-SA":
        link = `/by-sa/${version}/`;
        break;
      case "CC-BY-NC":
        link = `/by-nc/${version}/`;
        break;
      case "CC-BY-NC-SA":
        link = `/by-nc-sa/${version}/`;
        break;
      case "CC-BY-ND":
        link = `/by-nd/${version}/`;
        break;
      case "CC-BY-NC-ND":
        link = `/by-nc-nd/${version}/`;
        break;
      case "CC-ZERO":
      case "CC-0":
      case "CC0":
        link = "/zero/1.0/";
        break;
      case "CC-PDDC":
        link = "/publicdomain/";
        break;
      case "CC-PDM":
        link = "/publicdomain/mark/1.0/";
        break;
      default:
        break;
    }
    if (extra)
      link += `${extra}/`;
    return `https://creativecommons.org/licenses${link}`;
  }
  if (osi) {
    return `https://opensource.org/licenses/${id.replace(/(-or-later)|(-only)$/, "")}`;
  }
  return `https://spdx.org/licenses/${id}`;
}
function cleanUrl(url) {
  return url.replace(/^http:/, "https:").replace(/\/$/, "");
}
function isUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol.includes("http");
  } catch (error) {
    return false;
  }
}
var ID_LICENSE_LOOKUP = Object.fromEntries(Object.entries(licenses_default).map(([key, value]) => {
  return [key, { id: key, ...value, url: createURL(key, value.CC, value.osi) }];
}));
var URL_ID_LOOKUP = Object.fromEntries(Object.values(ID_LICENSE_LOOKUP).filter((value) => !!value.url && !!value.id).map((value) => {
  return [cleanUrl(value.url), value.id];
}));
function validateLicense(input, opts) {
  var _a;
  if (typeof input === "string") {
    const value2 = validateString(input, opts);
    if (value2 === void 0)
      return void 0;
    const valueSpdx = value2.length < 15 ? correctLicense(value2) : void 0;
    if (URL_ID_LOOKUP[cleanUrl(value2)]) {
      input = { id: URL_ID_LOOKUP[cleanUrl(value2)] };
    } else if (isUrl(value2)) {
      input = { url: value2 };
    } else if (valueSpdx) {
      input = { id: value2 };
    } else if (value2.match(/^[^\s]*$/)) {
      input = { id: value2 };
    } else if (value2.length < 100) {
      input = { name: value2 };
    } else {
      input = { note: value2 };
    }
  }
  const value = validateObjectKeys(input, {
    optional: ["id", "name", "url", "note", "free", "CC", "osi"],
    alias: { cc: "CC" }
  }, opts);
  if (!value)
    return void 0;
  const output = {};
  if (value.id != null) {
    const id = validateString(value.id, incrementOptions("id", opts));
    const idSpdx = correctLicense(id);
    if (!idSpdx) {
      validationWarning(`unknown license ID "${id}" - using a SPDX license ID is recommended, see https://spdx.org/licenses/`, opts);
    } else if (idSpdx !== id) {
      validationWarning(`The SPDX ID for the license is "${idSpdx}". Corrected from "${id}".`, opts);
    }
    output.id = idSpdx !== null && idSpdx !== void 0 ? idSpdx : id;
  } else {
    if (value.url) {
      const url = (_a = validateUrl(value.url, { property: "", messages: {} })) !== null && _a !== void 0 ? _a : "";
      const idFromUrl = URL_ID_LOOKUP[cleanUrl(url)];
      if (idFromUrl) {
        output.id = idFromUrl;
        value.url = ID_LICENSE_LOOKUP[idFromUrl].url;
      }
    }
    if (!output.id) {
      validationWarning(`no license ID - using a SPDX license ID is recommended, see https://spdx.org/licenses/`, opts);
    }
  }
  const expected = output.id ? ID_LICENSE_LOOKUP[output.id] : void 0;
  if (value.url != null) {
    const urlOpts = incrementOptions("url", opts);
    const url = validateUrl(value.url, urlOpts);
    if (url && (expected === null || expected === void 0 ? void 0 : expected.url) && cleanUrl(url) !== cleanUrl(expected.url)) {
      validationWarning(`incorrect URL for SPDX license ${expected.id} - "${url}"`, urlOpts);
    }
    output.url = url;
  } else if (expected === null || expected === void 0 ? void 0 : expected.url) {
    output.url = expected.url;
  }
  if (value.name != null) {
    const nameOpts = incrementOptions("name", opts);
    const name2 = validateString(value.name, nameOpts);
    if (name2 && (expected === null || expected === void 0 ? void 0 : expected.name) && name2 !== expected.name) {
      validationWarning(`incorrect name for SPDX license ${expected.id} - "${name2}"`, nameOpts);
    }
    output.name = name2;
  } else if (expected === null || expected === void 0 ? void 0 : expected.name) {
    output.name = expected.name;
  }
  if (value.note != null) {
    output.note = validateString(value.note, incrementOptions("note", opts));
  }
  if (value.free != null) {
    const freeOpts = incrementOptions("free", opts);
    const free = validateBoolean(value.free, freeOpts);
    if (free && !(expected === null || expected === void 0 ? void 0 : expected.free)) {
      validationWarning('only SPDX licenses may specify they are "free" as listed by the FSF', freeOpts);
    } else {
      output.free = free;
    }
  } else if ((expected === null || expected === void 0 ? void 0 : expected.free) != null) {
    output.free = expected.free;
  }
  if (value.CC != null) {
    const ccOpts = incrementOptions("CC", opts);
    const cc = validateBoolean(value.CC, ccOpts);
    if (cc && !((expected === null || expected === void 0 ? void 0 : expected.CC) || output.url && new URL(output.url).host === "creativecommons.org")) {
      validationWarning('only licenses that link to creativecommons.org may specify that they are "CC"', ccOpts);
    } else {
      output.CC = cc;
    }
  } else if ((expected === null || expected === void 0 ? void 0 : expected.CC) != null) {
    output.CC = expected.CC;
  }
  if (value.osi != null) {
    const osiOpts = incrementOptions("osi", opts);
    const osi = validateBoolean(value.osi, osiOpts);
    if (osi && !(expected === null || expected === void 0 ? void 0 : expected.osi)) {
      validationWarning('only SPDX licenses may specify they are "OSI approved"', osiOpts);
    } else {
      output.osi = osi;
    }
  } else if ((expected === null || expected === void 0 ? void 0 : expected.osi) != null) {
    output.osi = expected.osi;
  }
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}
function validateLicenses(input, opts) {
  let contentOpts;
  if (typeof input === "string" || typeof input === "object" && input.content == null && input.code == null) {
    input = { content: input };
    contentOpts = opts;
  } else {
    contentOpts = incrementOptions("content", opts);
  }
  const value = validateObjectKeys(input, { optional: ["content", "code"] }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.content)) {
    const content = validateLicense(value.content, contentOpts);
    if (content)
      output.content = content;
  }
  if (defined(value.code) && value.code !== value.content) {
    const code = validateLicense(value.code, incrementOptions("code", opts));
    if (code)
      output.code = code;
  }
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}

// node_modules/myst-frontmatter/dist/numbering/validators.js
var NUMBERING_OPTIONS = ["enumerator", "all", "headings", "title"];
var HEADING_KEYS = ["heading_1", "heading_2", "heading_3", "heading_4", "heading_5", "heading_6"];
var NUMBERING_KEYS = [
  "figure",
  "subfigure",
  "equation",
  "subequation",
  "table",
  "code",
  ...HEADING_KEYS
];
var NUMBERING_ITEM_KEYS = ["enabled", "start", "enumerator", "template", "continue"];
var CONTINUE_STRINGS = ["continue", "next"];
var NUMBERING_ALIAS = {
  sections: "headings",
  h1: "heading_1",
  h2: "heading_2",
  h3: "heading_3",
  h4: "heading_4",
  h5: "heading_5",
  h6: "heading_6",
  heading1: "heading_1",
  heading2: "heading_2",
  heading3: "heading_3",
  heading4: "heading_4",
  heading5: "heading_5",
  heading6: "heading_6",
  figures: "figure",
  subfigures: "subfigure",
  equations: "equation",
  subequations: "subequation",
  tables: "table",
  titles: "title"
};
function isBoolean(input) {
  if (typeof input === "string") {
    return ["true", "false"].includes(input.toLowerCase());
  }
  return typeof input === "boolean";
}
function validateNumberingItem(input, opts) {
  var _a, _b, _c, _d, _e;
  if (isBoolean(input)) {
    input = { enabled: input };
  } else if (typeof input === "number") {
    input = { start: input };
  } else if (CONTINUE_STRINGS.includes(input)) {
    input = { continue: true };
  } else if (typeof input === "string") {
    input = { template: input };
  }
  const value = validateObjectKeys(input, { optional: NUMBERING_ITEM_KEYS }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.enabled)) {
    const enabled = validateBoolean(value.enabled, incrementOptions("enabled", opts));
    if (defined(enabled))
      output.enabled = enabled;
  }
  if (defined(value.start)) {
    if (CONTINUE_STRINGS.includes(value.start) && !defined(value.continue)) {
      output.continue = true;
      output.enabled = (_a = output.enabled) !== null && _a !== void 0 ? _a : true;
    } else {
      const start = validateNumber(value.start, {
        ...incrementOptions("start", opts),
        integer: true,
        min: 1
      });
      if (start) {
        output.start = start;
        output.enabled = (_b = output.enabled) !== null && _b !== void 0 ? _b : true;
      }
    }
  }
  if (defined(value.template)) {
    const template = validateString(value.template, incrementOptions("template", opts));
    if (defined(template)) {
      output.template = template;
      output.enabled = (_c = output.enabled) !== null && _c !== void 0 ? _c : true;
    }
  }
  if (defined(value.enumerator)) {
    const enumerator = validateString(value.enumerator, incrementOptions("enumerator", opts));
    if (defined(enumerator)) {
      output.enumerator = enumerator;
      output.enabled = (_d = output.enabled) !== null && _d !== void 0 ? _d : true;
    }
  }
  if (defined(value.continue)) {
    const cont = validateBoolean(value.continue, incrementOptions("continue", opts));
    if (defined(cont)) {
      output.continue = cont;
      output.enabled = (_e = output.enabled) !== null && _e !== void 0 ? _e : true;
    }
  }
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}
function validateTitleItem(input, opts) {
  var _a, _b;
  if (isBoolean(input)) {
    input = { enabled: input };
  } else if (typeof input === "number") {
    input = { offset: input };
  }
  const value = validateObjectKeys(input, { optional: ["enabled", "offset", "enumerator"] }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.enabled)) {
    const enabled = validateBoolean(value.enabled, incrementOptions("enabled", opts));
    if (defined(enabled))
      output.enabled = enabled;
  }
  if (defined(value.offset)) {
    const offset = validateNumber(value.offset, {
      integer: true,
      min: 0,
      max: 5,
      ...incrementOptions("offset", opts)
    });
    if (defined(offset)) {
      output.offset = offset;
      output.enabled = (_a = output.enabled) !== null && _a !== void 0 ? _a : true;
    }
  }
  if (defined(value.enumerator)) {
    const enumerator = validateString(value.enumerator, incrementOptions("enumerator", opts));
    if (defined(enumerator)) {
      output.enumerator = enumerator;
      output.enabled = (_b = output.enabled) !== null && _b !== void 0 ? _b : true;
    }
  }
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}
function validateNumbering(input, opts) {
  var _a, _b, _c, _d, _e;
  if (isBoolean(input)) {
    input = { all: input };
  }
  const value = validateObjectKeys(input, { optional: [...NUMBERING_KEYS, ...NUMBERING_OPTIONS], alias: NUMBERING_ALIAS }, { ...opts, suppressWarnings: true, keepExtraKeys: true });
  if (value === void 0)
    return void 0;
  const output = {};
  let headings;
  if (defined(value.enumerator)) {
    const enumeratorOpts = incrementOptions("enumerator", opts);
    if (typeof value.enumerator === "string") {
      value.enumerator = { enumerator: value.enumerator };
    }
    output.enumerator = validateNumberingItem(value.enumerator, enumeratorOpts);
    if (((_a = output.enumerator) === null || _a === void 0 ? void 0 : _a.enabled) != null) {
      if (output.enumerator.enabled !== true) {
        validationWarning("value for 'enabled' is ignored", enumeratorOpts);
      }
      delete output.enumerator.enabled;
    }
    if (((_b = output.enumerator) === null || _b === void 0 ? void 0 : _b.start) != null) {
      validationWarning("value for 'start' is ignored", enumeratorOpts);
      delete output.enumerator.start;
    }
    if (((_c = output.enumerator) === null || _c === void 0 ? void 0 : _c.continue) != null) {
      validationWarning("value for 'continue' is ignored", enumeratorOpts);
      delete output.enumerator.continue;
    }
    if (!output.enumerator || Object.keys(output.enumerator).length === 0) {
      delete output.enumerator;
    }
  }
  if (defined(value.all)) {
    const allOpts = incrementOptions("all", opts);
    output.all = validateNumberingItem(value.all, allOpts);
    if (((_d = output.all) === null || _d === void 0 ? void 0 : _d.template) != null) {
      validationWarning("value for 'template' is ignored", allOpts);
      delete output.all.template;
    }
    if (((_e = output.all) === null || _e === void 0 ? void 0 : _e.start) != null) {
      validationWarning("value for 'start' is ignored", allOpts);
      delete output.all.start;
    }
    if (!output.all || Object.keys(output.all).length === 0) {
      delete output.all;
    }
  }
  if (defined(value.title)) {
    output.title = validateTitleItem(value.title, incrementOptions("title", opts));
  }
  if (defined(value.headings)) {
    headings = validateNumberingItem(value.headings, incrementOptions("headings", opts));
    HEADING_KEYS.forEach((headingKey) => {
      if (headings && !defined(value[headingKey])) {
        value[headingKey] = headings;
      }
    });
  }
  Object.keys(value).filter((key) => !NUMBERING_OPTIONS.includes(key)).forEach((key) => {
    if (defined(value[key])) {
      const item = validateNumberingItem(value[key], incrementOptions(key, opts));
      if (!defined(item))
        return;
      if (headings && HEADING_KEYS.includes(key)) {
        output[key] = { ...headings, ...item };
      } else {
        output[key] = item;
      }
    }
  });
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}
function fillNumbering(base, filler) {
  const output = { ...filler, ...base };
  Object.entries(filler !== null && filler !== void 0 ? filler : {}).filter(([key]) => !NUMBERING_OPTIONS.includes(key)).forEach(([key, val]) => {
    var _a, _b, _c, _d, _e;
    output[key] = fillMissingKeys(
      (_a = base === null || base === void 0 ? void 0 : base[key]) !== null && _a !== void 0 ? _a : {},
      // Enabling/disabling all in base overrides filler
      {
        ...val,
        enabled: (_c = (_b = base === null || base === void 0 ? void 0 : base.all) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : val.enabled,
        continue: (_e = (_d = base === null || base === void 0 ? void 0 : base.all) === null || _d === void 0 ? void 0 : _d.continue) !== null && _e !== void 0 ? _e : val.continue
      },
      NUMBERING_ITEM_KEYS
    );
  });
  return output;
}

// node_modules/myst-frontmatter/dist/venues/validators.js
function validateVenue(input, opts) {
  let titleOpts;
  if (typeof input === "string") {
    input = { title: input };
    titleOpts = opts;
  } else {
    titleOpts = incrementOptions("title", opts);
  }
  const value = validateObjectKeys(input, {
    optional: [
      "title",
      "short_title",
      "url",
      "doi",
      "number",
      "location",
      "date",
      "series",
      "issn",
      "publisher"
    ]
  }, opts);
  if (value === void 0)
    return void 0;
  const output = {};
  if (defined(value.title)) {
    output.title = validateString(value.title, titleOpts);
  }
  if (defined(value.short_title)) {
    output.short_title = validateString(value.short_title, incrementOptions("short_title", opts));
  }
  if (defined(value.url)) {
    output.url = validateUrl(value.url, incrementOptions("url", opts));
  }
  if (defined(value.doi)) {
    output.doi = validateDoi(value.doi, incrementOptions("doi", opts));
  }
  if (defined(value.number)) {
    output.number = validateStringOrNumber(value.number, incrementOptions("number", opts));
  }
  if (defined(value.location)) {
    output.location = validateString(value.location, incrementOptions("location", opts));
  }
  if (defined(value.date)) {
    output.date = validateString(value.date, incrementOptions("date", opts));
  }
  if (defined(value.series)) {
    output.series = validateString(value.series, incrementOptions("series", opts));
  }
  if (defined(value.issn)) {
    output.issn = validateString(value.issn, incrementOptions("issn", opts));
  }
  if (defined(value.publisher)) {
    output.publisher = validateString(value.publisher, incrementOptions("publisher", opts));
  }
  return output;
}

// node_modules/myst-frontmatter/dist/site/validators.js
function validateSiteFrontmatterKeys(value, opts) {
  var _a, _b, _c, _d, _e;
  const output = {};
  if (defined(value.title)) {
    output.title = validateString(value.title, incrementOptions("title", opts));
  }
  if (defined(value.description)) {
    output.description = validateString(value.description, incrementOptions("description", opts));
  }
  if (defined(value.short_title)) {
    output.short_title = validateString(value.short_title, incrementOptions("short_title", opts));
  }
  if (defined(value.subtitle)) {
    output.subtitle = validateString(value.subtitle, incrementOptions("subtitle", opts));
  }
  if (value.banner === null) {
    output.banner = null;
  } else if (defined(value.banner)) {
    output.banner = validateString(value.banner, incrementOptions("banner", opts));
  }
  if (defined(value.bannerOptimized)) {
    output.bannerOptimized = value.bannerOptimized;
  }
  if (defined(value.tags)) {
    output.tags = validateList(value.tags, incrementOptions("tags", opts), (file, index) => {
      return validateString(file, incrementOptions(`tags.${index}`, opts));
    });
  }
  const stash = {};
  if (defined(value.affiliations)) {
    const affiliationsOpts = incrementOptions("affiliations", opts);
    let affiliations = value.affiliations;
    if (typeof affiliations === "string") {
      affiliations = affiliations.split(";").map((aff) => aff.trim());
    }
    validateList(affiliations, affiliationsOpts, (aff) => {
      return validateAndStashObject(aff, stash, "affiliations", validateAffiliation, affiliationsOpts);
    });
  }
  if (defined(value.authors)) {
    stash.authorIds = validateList(value.authors, { coerce: true, ...incrementOptions("authors", opts) }, (author, index) => {
      return validateAndStashObject(author, stash, "contributors", (v, o) => validateContributor(v, stash, o), incrementOptions(`authors.${index}`, opts));
    });
  }
  if (defined(value.contributors)) {
    validateList(value.contributors, { coerce: true, ...incrementOptions("contributors", opts) }, (contributor, index) => {
      return validateAndStashObject(contributor, stash, "contributors", (v, o) => validateContributor(v, stash, o), incrementOptions(`contributors.${index}`, opts));
    });
  }
  if (defined(value.reviewers)) {
    output.reviewers = validateList(value.reviewers, { coerce: true, ...incrementOptions("reviewers", opts) }, (reviewer, ind) => {
      return validateAndStashObject(reviewer, stash, "contributors", (v, o) => validateContributor(v, stash, o), incrementOptions(`reviewers.${ind}`, opts));
    });
  }
  if (defined(value.editors)) {
    output.editors = validateList(value.editors, { coerce: true, ...incrementOptions("editors", opts) }, (editor, ind) => {
      return validateAndStashObject(editor, stash, "contributors", (v, o) => validateContributor(v, stash, o), incrementOptions(`editors.${ind}`, opts));
    });
  }
  if (defined(value.venue)) {
    output.venue = validateVenue(value.venue, incrementOptions("venue", opts));
  }
  if (defined(value.github)) {
    output.github = validateGithubUrl(value.github, incrementOptions("github", opts));
  }
  if (defined(value.keywords)) {
    let keywords = value.keywords;
    if (typeof keywords === "string") {
      keywords = keywords.split(/[,;]/).map((k) => k.trim());
    }
    output.keywords = validateList(keywords, incrementOptions("keywords", opts), (word, ind) => {
      return validateString(word, incrementOptions(`keywords.${ind}`, opts));
    });
  }
  if (defined(value.funding)) {
    output.funding = validateList(value.funding, { coerce: true, ...incrementOptions("funding", opts) }, (fund, index) => {
      return validateFunding(fund, stash, incrementOptions(`funding.${index}`, opts));
    });
  }
  if (defined(value.copyright)) {
    output.copyright = validateString(value.copyright, incrementOptions("copyright", opts));
  }
  if (defined(value.options)) {
    const optionsOptions = incrementOptions("options", opts);
    const options = validateObject(value.options, optionsOptions);
    if (options) {
      Object.entries(options).forEach(([key, val]) => {
        var _a2;
        if (RESERVED_EXPORT_KEYS.includes(key)) {
          validationError(`options cannot include reserved key ${key}`, optionsOptions);
        } else {
          ((_a2 = output.options) !== null && _a2 !== void 0 ? _a2 : output.options = {})[key] = val;
        }
      });
    }
  }
  const partsOptions = incrementOptions("parts", opts);
  let parts;
  if (defined(value.parts)) {
    parts = validateObjectKeys(value.parts, { optional: PAGE_KNOWN_PARTS, alias: FRONTMATTER_ALIASES }, { keepExtraKeys: true, suppressWarnings: true, ...partsOptions });
  }
  PAGE_KNOWN_PARTS.forEach((partKey) => {
    if (defined(value[partKey])) {
      parts !== null && parts !== void 0 ? parts : parts = {};
      if (parts[partKey]) {
        validationError(`duplicate value for part ${partKey}`, partsOptions);
      } else {
        parts[partKey] = value[partKey];
      }
    }
  });
  if (parts) {
    const partsEntries = Object.entries(parts).map(([k, v]) => {
      return [
        k,
        validateList(v, { coerce: true, ...incrementOptions(k, partsOptions) }, (item, index) => {
          return validateString(item, incrementOptions(`${k}.${index}`, partsOptions));
        })
      ];
    }).filter((entry) => {
      var _a2;
      return !!((_a2 = entry[1]) === null || _a2 === void 0 ? void 0 : _a2.length);
    });
    if (partsEntries.length > 0) {
      output.parts = Object.fromEntries(partsEntries);
    }
  }
  const stashContribAuthors = (_a = stash.contributors) === null || _a === void 0 ? void 0 : _a.filter((contrib) => {
    var _a2;
    return (_a2 = stash.authorIds) === null || _a2 === void 0 ? void 0 : _a2.includes(contrib.id);
  });
  const stashContribNonAuthors = (_b = stash.contributors) === null || _b === void 0 ? void 0 : _b.filter((contrib) => {
    var _a2;
    return !((_a2 = stash.authorIds) === null || _a2 === void 0 ? void 0 : _a2.includes(contrib.id));
  });
  if (stashContribAuthors === null || stashContribAuthors === void 0 ? void 0 : stashContribAuthors.length) {
    output.authors = stashContribAuthors;
    const correspondingAuthor = (_c = output.authors) === null || _c === void 0 ? void 0 : _c.find((a) => a.corresponding);
    const personWithEmail = (_d = output.authors) === null || _d === void 0 ? void 0 : _d.find((a) => a.email && !a.collaboration && a.corresponding === void 0);
    if (!correspondingAuthor && personWithEmail) {
      personWithEmail.corresponding = true;
    }
  }
  if (stashContribNonAuthors === null || stashContribNonAuthors === void 0 ? void 0 : stashContribNonAuthors.length) {
    output.contributors = stashContribNonAuthors;
  }
  if ((_e = stash.affiliations) === null || _e === void 0 ? void 0 : _e.length) {
    output.affiliations = stash.affiliations;
  }
  return output;
}

// node_modules/myst-frontmatter/dist/settings/validatorsMystToTex.js
var MYST_TO_TEX_SETTINGS = ["codeStyle", "beamer"];
var MYST_TO_TEX_SETTINGS_ALIAS = {
  code_style: "codeStyle"
};
function validateMystToTexSettings(value, opts) {
  const output = {};
  const settings = validateObjectKeys(value, { optional: MYST_TO_TEX_SETTINGS, alias: MYST_TO_TEX_SETTINGS_ALIAS }, opts);
  if (!settings)
    return void 0;
  if (defined(settings.codeStyle)) {
    const codeStyle = validateChoice(settings.codeStyle, {
      ...incrementOptions("codeStyle", opts),
      choices: ["verbatim", "minted", "listings"]
    });
    if (codeStyle)
      output.codeStyle = codeStyle;
  }
  if (defined(settings.beamer)) {
    const beamer = validateBoolean(settings.beamer, incrementOptions("beamer", opts));
    if (beamer != null)
      output.beamer = beamer;
  }
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}

// node_modules/myst-frontmatter/dist/settings/validators.js
var OUTPUT_REMOVAL_OPTIONS = [
  "show",
  "remove",
  "remove-warn",
  "remove-error",
  "warn",
  "error"
];
var PROJECT_SETTINGS = [
  "output_stderr",
  "output_stdout",
  "output_matplotlib_strings",
  "myst_to_tex"
];
var PROJECT_SETTINGS_ALIAS = {
  stderr_output: "output_stderr",
  stdout_output: "output_stdout",
  mystToTex: "myst_to_tex",
  tex: "myst_to_tex"
  // The default is the renderer, not the parser
};
function validateProjectAndPageSettings(value, opts) {
  const output = {};
  const settings = validateObjectKeys(value, { optional: PROJECT_SETTINGS, alias: PROJECT_SETTINGS_ALIAS }, opts);
  if (!settings)
    return void 0;
  if (defined(settings.output_stderr)) {
    const output_stderr = validateChoice(settings.output_stderr, {
      ...incrementOptions("output_stderr", opts),
      choices: OUTPUT_REMOVAL_OPTIONS
    });
    if (output_stderr)
      output.output_stderr = output_stderr;
  }
  if (defined(settings.output_stdout)) {
    const output_stdout = validateChoice(settings.output_stdout, {
      ...incrementOptions("output_stdout", opts),
      choices: OUTPUT_REMOVAL_OPTIONS
    });
    if (output_stdout)
      output.output_stdout = output_stdout;
  }
  if (defined(settings.output_matplotlib_strings)) {
    const output_matplotlib_strings = validateChoice(settings.output_matplotlib_strings, {
      ...incrementOptions("output_matplotlib_strings", opts),
      choices: OUTPUT_REMOVAL_OPTIONS
    });
    if (output_matplotlib_strings)
      output.output_matplotlib_strings = output_matplotlib_strings;
  }
  if (defined(settings.myst_to_tex)) {
    const myst_to_tex = validateMystToTexSettings(settings.myst_to_tex, incrementOptions("myst_to_tex", opts));
    if (myst_to_tex)
      output.myst_to_tex = myst_to_tex;
  }
  if (Object.keys(output).length === 0)
    return void 0;
  return output;
}

// node_modules/myst-frontmatter/dist/math/validators.js
function validateMathMacro(input, opts) {
  if (typeof input === "string") {
    input = { macro: input };
  }
  const value = validateObjectKeys(input, { required: ["macro"], optional: ["title", "description"] }, opts);
  if (!value)
    return;
  const macro = validateString(value.macro, incrementOptions("macro", opts));
  if (!macro)
    return;
  const output = { macro };
  if (defined(value.title)) {
    output.title = validateString(value.title, incrementOptions("title", opts));
  }
  if (defined(value.description)) {
    output.description = validateString(value.description, incrementOptions("description", opts));
  }
  return output;
}
function validateMathMacroObject(input, opts) {
  const value = validateObject(input, opts);
  if (!value)
    return;
  const validMacros = Object.entries(value).map(([key, val]) => {
    const macro = validateMathMacro(val, incrementOptions(key, opts));
    if (!macro)
      return false;
    return [key, macro];
  }).filter((valid) => !!valid);
  return Object.fromEntries(validMacros);
}

// node_modules/myst-frontmatter/dist/project/validators.js
function getExternalIdentifierValidator(key) {
  if (key === "arxiv") {
    return (value, opts) => {
      return validateUrl(value, {
        ...incrementOptions("arxiv", opts),
        includes: "arxiv.org"
      });
    };
  }
  if (key === "pmid") {
    return (value, opts) => {
      return validateNumber(value, {
        ...incrementOptions("pmid", opts),
        integer: true,
        min: 1
      });
    };
  }
  if (key === "pmcid") {
    return (value, opts) => {
      return validateString(value, {
        ...incrementOptions("pmcid", opts),
        regex: "^PMC[0-9]+$"
      });
    };
  }
  if (key === "zenodo") {
    return (value, opts) => {
      return validateUrl(value, {
        ...incrementOptions("zenodo", opts),
        includes: "zenodo.org"
      });
    };
  }
  return (value, opts) => {
    return validateStringOrNumber(value, incrementOptions(key, opts));
  };
}
function validateProjectAndPageFrontmatterKeys(value, opts) {
  var _a;
  const output = validateSiteFrontmatterKeys(value, opts);
  if (defined(value.date)) {
    output.date = validateDate(value.date, incrementOptions("date", opts));
  }
  const identifiersOpts = incrementOptions("identifiers", opts);
  let identifiers;
  if (defined(value.identifiers)) {
    identifiers = validateObjectKeys(value.identifiers, { optional: KNOWN_EXTERNAL_IDENTIFIERS }, { keepExtraKeys: true, suppressWarnings: true, ...identifiersOpts });
  }
  KNOWN_EXTERNAL_IDENTIFIERS.forEach((identifierKey) => {
    if (defined(value[identifierKey])) {
      identifiers !== null && identifiers !== void 0 ? identifiers : identifiers = {};
      if (identifiers[identifierKey]) {
        validationError(`duplicate value for identifier ${identifierKey}`, identifiersOpts);
      } else {
        identifiers[identifierKey] = value[identifierKey];
      }
    }
  });
  if (identifiers === null || identifiers === void 0 ? void 0 : identifiers.doi) {
    if (defined(value.doi)) {
      validationError(`duplicate value for DOI`, identifiersOpts);
    } else {
      value.doi = identifiers.doi;
      validationWarning("DOI should be defined directly on the project frontmatter, not under 'identifiers'", identifiersOpts);
    }
    delete identifiers.doi;
  }
  if (identifiers) {
    const identifiersEntries = Object.entries(identifiers).map(([k, v]) => {
      const validator = getExternalIdentifierValidator(k);
      return [k, validator(v, identifiersOpts)];
    }).filter((entry) => entry[1] != null);
    if (identifiersEntries.length > 0) {
      output.identifiers = Object.fromEntries(identifiersEntries);
    }
  }
  if (defined(value.doi)) {
    output.doi = validateDoi(value.doi, incrementOptions("doi", opts));
  }
  if (defined(value.open_access)) {
    output.open_access = validateBoolean(value.open_access, incrementOptions("open_access", opts));
  }
  if (defined(value.license)) {
    output.license = validateLicenses(value.license, incrementOptions("license", opts));
  }
  if (defined(value.binder)) {
    output.binder = validateUrl(value.binder, incrementOptions("binder", opts));
  }
  if (defined(value.source)) {
    output.source = validateUrl(value.source, incrementOptions("source", opts));
  }
  if (defined(value.subject)) {
    output.subject = validateString(value.subject, {
      ...incrementOptions("subject", opts),
      maxLength: 40
    });
  }
  if (defined(value.bibliography)) {
    output.bibliography = validateList(value.bibliography, { coerce: true, ...incrementOptions("bibliography", opts) }, (req, index) => {
      return validateString(req, incrementOptions(`bibliography.${index}`, opts));
    });
  }
  if (defined(value.volume)) {
    output.volume = validatePublicationMeta(value.volume, incrementOptions("volume", opts));
  }
  if (defined(value.issue)) {
    output.issue = validatePublicationMeta(value.issue, incrementOptions("issue", opts));
  }
  if (defined(value.first_page)) {
    output.first_page = validateStringOrNumber(value.first_page, incrementOptions("first_page", opts));
  }
  if (defined(value.last_page)) {
    output.last_page = validateStringOrNumber(value.last_page, incrementOptions("last_page", opts));
  }
  if (defined(value.oxa)) {
    output.oxa = validateString(value.oxa, incrementOptions("oxa", opts));
  }
  if (defined(value.numbering)) {
    output.numbering = validateNumbering(value.numbering, incrementOptions("numbering", opts));
  }
  if (defined(value.math)) {
    output.math = validateMathMacroObject(value.math, incrementOptions("math", opts));
  }
  if (defined(value.abbreviations)) {
    const abbreviationsOpts = incrementOptions("abbreviations", opts);
    const abbreviations = Object.fromEntries(Object.entries((_a = validateObject(value.abbreviations, abbreviationsOpts)) !== null && _a !== void 0 ? _a : {}).map(([k, v]) => {
      if (v === null || v === false)
        return [k, null];
      const title = validateString(v, incrementOptions(k, abbreviationsOpts));
      const key = validateString(k, {
        ...incrementOptions(k, abbreviationsOpts),
        minLength: 2
      });
      if (!(key && title))
        return null;
      return [k, title];
    }).filter((v) => !!v));
    if (abbreviations && Object.keys(abbreviations).length > 0) {
      output.abbreviations = abbreviations;
    }
  }
  if (defined(value.exports)) {
    const exports = validateExportsList(value.exports, opts);
    if (exports)
      output.exports = exports;
  }
  if (defined(value.downloads)) {
    const downloads = validateDownloadsList(value.downloads, opts);
    if (downloads)
      output.downloads = downloads;
  }
  if (value.thumbnail === null) {
    output.thumbnail = null;
  } else if (defined(value.thumbnail)) {
    output.thumbnail = validateString(value.thumbnail, incrementOptions("thumbnail", opts));
  }
  if (defined(value.thumbnailOptimized)) {
    output.thumbnailOptimized = value.thumbnailOptimized;
  }
  if (value.banner === null) {
    output.banner = null;
  } else if (defined(value.banner)) {
    output.banner = validateString(value.banner, incrementOptions("banner", opts));
  }
  if (defined(value.bannerOptimized)) {
    output.bannerOptimized = value.bannerOptimized;
  }
  if (defined(value.settings)) {
    const settings = validateProjectAndPageSettings(value.settings, incrementOptions("settings", opts));
    if (settings)
      output.settings = settings;
  }
  if (value.edit_url === null) {
    output.edit_url = null;
  } else if (defined(value.edit_url)) {
    output.edit_url = validateUrl(value.edit_url, incrementOptions("edit_url", opts));
  }
  return output;
}

// node_modules/myst-frontmatter/dist/page/validators.js
function validatePageFrontmatterKeys(value, opts) {
  const output = validateProjectAndPageFrontmatterKeys(value, opts);
  if (defined(value.label)) {
    output.label = validateString(value.label, incrementOptions("label", opts));
  }
  if (defined(value.kernelspec)) {
    output.kernelspec = validateKernelSpec(value.kernelspec, incrementOptions("kernelspec", opts));
  }
  if (defined(value.jupytext)) {
    output.jupytext = validateJupytext(value.jupytext, incrementOptions("jupytext", opts));
  }
  if (defined(value.skip_execution)) {
    output.skip_execution = validateBoolean(value.skip_execution, incrementOptions("skip_execution", opts));
  }
  if (defined(value.enumerator)) {
    output.enumerator = validateString(value.enumerator, incrementOptions("enumerator", opts));
  }
  if (defined(value.content_includes_title)) {
    output.content_includes_title = validateBoolean(value.content_includes_title, incrementOptions("content_includes_title", opts));
  }
  if (defined(value.site)) {
    output.site = validateObject(value.site, incrementOptions("site", opts));
  }
  return output;
}
function validatePageFrontmatter(input, opts) {
  const value = validateObjectKeys(input, { optional: PAGE_FRONTMATTER_KEYS, alias: { ...FRONTMATTER_ALIASES, name: "label" } }, opts) || {};
  return validatePageFrontmatterKeys(value, opts);
}

// node_modules/myst-frontmatter/dist/utils/fillPageFrontmatter.js
function fillSiteFrontmatter(base, filler, opts, keys, trimUnused) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
  const frontmatter = fillMissingKeys(base, filler, keys !== null && keys !== void 0 ? keys : Object.keys(filler));
  if (filler.options || base.options) {
    frontmatter.options = {
      ...(_a = filler.options) !== null && _a !== void 0 ? _a : {},
      ...(_b = base.options) !== null && _b !== void 0 ? _b : {}
    };
  }
  const contributorIds = /* @__PURE__ */ new Set();
  const affiliationIds = /* @__PURE__ */ new Set();
  (_c = frontmatter.funding) === null || _c === void 0 ? void 0 : _c.forEach((fund) => {
    var _a2;
    (_a2 = fund.awards) === null || _a2 === void 0 ? void 0 : _a2.forEach((award) => {
      var _a3, _b2, _c2;
      (_a3 = award.investigators) === null || _a3 === void 0 ? void 0 : _a3.forEach((inv) => {
        contributorIds.add(inv);
      });
      (_b2 = award.recipients) === null || _b2 === void 0 ? void 0 : _b2.forEach((rec) => {
        contributorIds.add(rec);
      });
      (_c2 = award.sources) === null || _c2 === void 0 ? void 0 : _c2.forEach((aff) => {
        affiliationIds.add(aff);
      });
    });
  });
  (_d = frontmatter.reviewers) === null || _d === void 0 ? void 0 : _d.forEach((reviewer) => {
    contributorIds.add(reviewer);
  });
  (_e = frontmatter.editors) === null || _e === void 0 ? void 0 : _e.forEach((editor) => {
    contributorIds.add(editor);
  });
  if (!trimUnused) {
    [
      ...(_f = base.authors) !== null && _f !== void 0 ? _f : [],
      ...(_g = filler.authors) !== null && _g !== void 0 ? _g : [],
      ...(_h = base.contributors) !== null && _h !== void 0 ? _h : [],
      ...(_j = filler.contributors) !== null && _j !== void 0 ? _j : []
    ].forEach((auth) => {
      if (auth.id)
        contributorIds.add(auth.id);
    });
    [...(_k = base.affiliations) !== null && _k !== void 0 ? _k : [], ...(_l = filler.affiliations) !== null && _l !== void 0 ? _l : []].forEach((aff) => {
      if (aff.id)
        affiliationIds.add(aff.id);
    });
    if (filler.tags || base.tags) {
      frontmatter.tags = [.../* @__PURE__ */ new Set([...(_m = filler.tags) !== null && _m !== void 0 ? _m : [], ...(_o = base.tags) !== null && _o !== void 0 ? _o : []])];
    }
    if (filler.reviewers || base.reviewers) {
      frontmatter.reviewers = [
        .../* @__PURE__ */ new Set([...(_p = filler.reviewers) !== null && _p !== void 0 ? _p : [], ...(_q = base.reviewers) !== null && _q !== void 0 ? _q : []])
      ];
    }
    if (filler.editors || base.editors) {
      frontmatter.editors = [.../* @__PURE__ */ new Set([...(_r = filler.editors) !== null && _r !== void 0 ? _r : [], ...(_s = base.editors) !== null && _s !== void 0 ? _s : []])];
    }
    if (filler.keywords || base.keywords) {
      frontmatter.keywords = [.../* @__PURE__ */ new Set([...(_t = filler.keywords) !== null && _t !== void 0 ? _t : [], ...(_u = base.keywords) !== null && _u !== void 0 ? _u : []])];
    }
    if (filler.funding || base.funding) {
      frontmatter.funding = [...(_v = filler.funding) !== null && _v !== void 0 ? _v : [], ...(_w = base.funding) !== null && _w !== void 0 ? _w : []];
    }
  }
  if (((_x = frontmatter.authors) === null || _x === void 0 ? void 0 : _x.length) || contributorIds.size) {
    const people = [
      ...(_y = base.authors) !== null && _y !== void 0 ? _y : [],
      ...(_z = filler.authors) !== null && _z !== void 0 ? _z : [],
      ...(_0 = base.contributors) !== null && _0 !== void 0 ? _0 : [],
      ...(_1 = filler.contributors) !== null && _1 !== void 0 ? _1 : []
    ];
    const peopleLookup = {};
    people.forEach((auth) => {
      if (!auth.id || isStashPlaceholder(auth))
        return;
      if (!peopleLookup[auth.id]) {
        peopleLookup[auth.id] = auth;
      } else if (normalizeJsonToString(auth) !== normalizeJsonToString(peopleLookup[auth.id])) {
        validationWarning(`Duplicate contributor id within project: ${auth.id}`, incrementOptions("authors", opts));
      }
    });
    if ((_2 = frontmatter.authors) === null || _2 === void 0 ? void 0 : _2.length) {
      frontmatter.authors = frontmatter.authors.map((auth) => {
        var _a2;
        if (!auth.id)
          return auth;
        contributorIds.delete(auth.id);
        return (_a2 = peopleLookup[auth.id]) !== null && _a2 !== void 0 ? _a2 : stashPlaceholder(auth.id);
      });
    }
    if (contributorIds.size) {
      frontmatter.contributors = [...contributorIds].map((id) => {
        var _a2;
        return (_a2 = peopleLookup[id]) !== null && _a2 !== void 0 ? _a2 : stashPlaceholder(id);
      });
    }
  }
  [...(_3 = frontmatter.authors) !== null && _3 !== void 0 ? _3 : [], ...(_4 = frontmatter.contributors) !== null && _4 !== void 0 ? _4 : []].forEach((auth) => {
    var _a2;
    (_a2 = auth.affiliations) === null || _a2 === void 0 ? void 0 : _a2.forEach((aff) => {
      affiliationIds.add(aff);
    });
  });
  (_5 = frontmatter.affiliations) === null || _5 === void 0 ? void 0 : _5.forEach((aff) => {
    if (aff.id)
      affiliationIds.add(aff.id);
  });
  if (affiliationIds.size) {
    const affiliations = [...(_6 = base.affiliations) !== null && _6 !== void 0 ? _6 : [], ...(_7 = filler.affiliations) !== null && _7 !== void 0 ? _7 : []];
    const affiliationLookup = {};
    affiliations.forEach((aff) => {
      if (!aff.id || isStashPlaceholder(aff))
        return;
      if (!affiliationLookup[aff.id]) {
        affiliationLookup[aff.id] = aff;
      } else if (normalizeJsonToString(aff) !== normalizeJsonToString(affiliationLookup[aff.id])) {
        validationWarning(`Duplicate affiliation id within project: ${aff.id}`, incrementOptions("affiliations", opts));
      }
    });
    frontmatter.affiliations = [...affiliationIds].map((id) => {
      var _a2;
      return (_a2 = affiliationLookup[id]) !== null && _a2 !== void 0 ? _a2 : stashPlaceholder(id);
    });
  }
  return frontmatter;
}
function fillProjectFrontmatter(base, filler, opts, keys, trimUnused) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
  const frontmatter = fillSiteFrontmatter(base, filler, opts, keys !== null && keys !== void 0 ? keys : Object.keys(filler), trimUnused);
  if (filler.numbering || base.numbering) {
    frontmatter.numbering = fillNumbering(base.numbering, filler.numbering);
  }
  if (filler.math || base.math) {
    frontmatter.math = { ...(_a = filler.math) !== null && _a !== void 0 ? _a : {}, ...(_b = base.math) !== null && _b !== void 0 ? _b : {} };
  }
  if (filler.abbreviations || base.abbreviations) {
    frontmatter.abbreviations = {
      ...(_c = filler.abbreviations) !== null && _c !== void 0 ? _c : {},
      ...(_d = base.abbreviations) !== null && _d !== void 0 ? _d : {}
    };
  }
  if (filler.settings || base.settings) {
    frontmatter.settings = {
      ...(_e = filler.settings) !== null && _e !== void 0 ? _e : {},
      ...(_f = base.settings) !== null && _f !== void 0 ? _f : {}
    };
  }
  if (filler.identifiers || base.identifiers) {
    frontmatter.identifiers = {
      ...(_g = filler.identifiers) !== null && _g !== void 0 ? _g : {},
      ...(_h = base.identifiers) !== null && _h !== void 0 ? _h : {}
    };
  }
  if (!trimUnused) {
    if (filler.bibliography || base.bibliography) {
      frontmatter.bibliography = [
        .../* @__PURE__ */ new Set([...(_j = filler.bibliography) !== null && _j !== void 0 ? _j : [], ...(_k = base.bibliography) !== null && _k !== void 0 ? _k : []])
      ];
    }
    if (filler.requirements || base.requirements) {
      frontmatter.requirements = [
        .../* @__PURE__ */ new Set([...(_l = filler.requirements) !== null && _l !== void 0 ? _l : [], ...(_m = base.requirements) !== null && _m !== void 0 ? _m : []])
      ];
    }
    if (filler.resources || base.resources) {
      frontmatter.resources = [
        .../* @__PURE__ */ new Set([...(_o = filler.resources) !== null && _o !== void 0 ? _o : [], ...(_p = base.resources) !== null && _p !== void 0 ? _p : []])
      ];
    }
    if (filler.exports || base.exports) {
      frontmatter.exports = [];
      const ids = (_r = (_q = base.exports) === null || _q === void 0 ? void 0 : _q.map(({ id }) => id)) !== null && _r !== void 0 ? _r : [];
      (_s = filler.exports) === null || _s === void 0 ? void 0 : _s.forEach((exp) => {
        var _a2;
        if (!exp.id || !ids.includes(exp.id)) {
          (_a2 = frontmatter.exports) === null || _a2 === void 0 ? void 0 : _a2.push(exp);
        }
      });
      (_t = frontmatter.exports) === null || _t === void 0 ? void 0 : _t.push(...(_u = base.exports) !== null && _u !== void 0 ? _u : []);
    }
    if (filler.downloads || base.downloads) {
      frontmatter.downloads = [];
      const ids = (_w = (_v = base.downloads) === null || _v === void 0 ? void 0 : _v.map(({ id }) => id).filter(Boolean)) !== null && _w !== void 0 ? _w : [];
      const urls = (_y = (_x = base.downloads) === null || _x === void 0 ? void 0 : _x.map(({ url }) => url).filter(Boolean)) !== null && _y !== void 0 ? _y : [];
      (_z = filler.downloads) === null || _z === void 0 ? void 0 : _z.forEach((download) => {
        var _a2, _b2;
        if (download.id && !ids.includes(download.id)) {
          (_a2 = frontmatter.downloads) === null || _a2 === void 0 ? void 0 : _a2.push(download);
        }
        if (download.url && !urls.includes(download.url)) {
          (_b2 = frontmatter.downloads) === null || _b2 === void 0 ? void 0 : _b2.push(download);
        }
      });
      (_0 = frontmatter.downloads) === null || _0 === void 0 ? void 0 : _0.push(...(_1 = base.downloads) !== null && _1 !== void 0 ? _1 : []);
    }
  }
  return frontmatter;
}

// node_modules/myst-common/dist/ruleids.js
var RuleId;
(function(RuleId2) {
  RuleId2["validConfigStructure"] = "valid-config-structure";
  RuleId2["siteConfigExists"] = "site-config-exists";
  RuleId2["projectConfigExists"] = "project-config-exists";
  RuleId2["validSiteConfig"] = "valid-site-config";
  RuleId2["validProjectConfig"] = "valid-project-config";
  RuleId2["configHasNoDeprecatedFields"] = "config-has-no-deprecated-fields";
  RuleId2["frontmatterIsYaml"] = "frontmatter-is-yaml";
  RuleId2["validPageFrontmatter"] = "valid-page-frontmatter";
  RuleId2["validFrontmatterExportList"] = "valid-frontmatter-export-list";
  RuleId2["docxRenders"] = "docx-renders";
  RuleId2["jatsRenders"] = "jats-renders";
  RuleId2["mdRenders"] = "md-renders";
  RuleId2["mecaIncludesJats"] = "meca-includes-jats";
  RuleId2["mecaExportsBuilt"] = "meca-exports-built";
  RuleId2["mecaFilesCopied"] = "meca-files-copied";
  RuleId2["pdfBuildCommandsAvailable"] = "pdf-build-commands-available";
  RuleId2["pdfBuildsWithoutErrors"] = "pdf-builds-without-errors";
  RuleId2["pdfBuilds"] = "pdf-builds";
  RuleId2["texRenders"] = "tex-renders";
  RuleId2["exportExtensionCorrect"] = "export-extension-correct";
  RuleId2["exportArticleExists"] = "export-article-exists";
  RuleId2["texParses"] = "tex-parses";
  RuleId2["jatsParses"] = "jats-parses";
  RuleId2["mystFileLoads"] = "myst-file-loads";
  RuleId2["selectedFileIsProcessed"] = "selected-file-is-processed";
  RuleId2["directiveRegistered"] = "directive-registered";
  RuleId2["directiveKnown"] = "directive-known";
  RuleId2["directiveArgumentCorrect"] = "directive-argument-correct";
  RuleId2["directiveOptionsCorrect"] = "directive-options-correct";
  RuleId2["directiveBodyCorrect"] = "directive-body-correct";
  RuleId2["roleRegistered"] = "role-registered";
  RuleId2["roleKnown"] = "role-known";
  RuleId2["roleBodyCorrect"] = "role-body-correct";
  RuleId2["tocContentsExist"] = "toc-contents-exist";
  RuleId2["encounteredLegacyTOC"] = "encountered-legacy-toc";
  RuleId2["validTOCStructure"] = "valid-toc-structure";
  RuleId2["validTOC"] = "valid-toc";
  RuleId2["tocWritten"] = "toc-written";
  RuleId2["imageDownloads"] = "image-downloads";
  RuleId2["imageExists"] = "image-exists";
  RuleId2["imageFormatConverts"] = "image-format-converts";
  RuleId2["imageCopied"] = "image-copied";
  RuleId2["imageFormatOptimizes"] = "image-format-optimizes";
  RuleId2["mathLabelLifted"] = "math-label-lifted";
  RuleId2["mathEquationEnvRemoved"] = "math-equation-env-removed";
  RuleId2["mathEqnarrayReplaced"] = "math-eqnarray-replaced";
  RuleId2["mathAlignmentAdjusted"] = "math-alignment-adjusted";
  RuleId2["mathRenders"] = "math-renders";
  RuleId2["referenceTemplateFills"] = "reference-template-fills";
  RuleId2["identifierIsUnique"] = "identifier-is-unique";
  RuleId2["referenceTargetResolves"] = "reference-target-resolves";
  RuleId2["referenceSyntaxValid"] = "reference-syntax-valid";
  RuleId2["referenceTargetExplicit"] = "reference-target-explicit";
  RuleId2["footnoteReferencesDefinition"] = "footnote-references-definition";
  RuleId2["intersphinxReferencesResolve"] = "intersphinx-references-resolve";
  RuleId2["mystLinkValid"] = "myst-link-valid";
  RuleId2["sphinxLinkValid"] = "sphinx-link-valid";
  RuleId2["rridLinkValid"] = "rrid-link-valid";
  RuleId2["rorLinkValid"] = "ror-link-valid";
  RuleId2["wikipediaLinkValid"] = "wikipedia-link-valid";
  RuleId2["doiLinkValid"] = "doi-link-valid";
  RuleId2["linkResolves"] = "link-resolves";
  RuleId2["linkTextExists"] = "link-text-exists";
  RuleId2["notebookAttachmentsResolve"] = "notebook-attachments-resolve";
  RuleId2["notebookOutputCopied"] = "notebook-output-copied";
  RuleId2["mdastSnippetImports"] = "mdast-snippet-imports";
  RuleId2["includeContentFilters"] = "include-content-filters";
  RuleId2["includeContentLoads"] = "include-content-loads";
  RuleId2["gatedNodesJoin"] = "gated-nodes-join";
  RuleId2["glossaryUsesDefinitionList"] = "glossary-uses-definition-list";
  RuleId2["blockMetadataLoads"] = "block-metadata-loads";
  RuleId2["indexEntriesResolve"] = "index-entries-resolve";
  RuleId2["citationIsUnique"] = "citation-is-unique";
  RuleId2["bibFileExists"] = "bib-file-exists";
  RuleId2["citationRenders"] = "citation-renders";
  RuleId2["codeMetadataLifted"] = "code-metadata-lifted";
  RuleId2["codeMetatagsValid"] = "code-metatags-valid";
  RuleId2["codeLangDefined"] = "code-lang-defined";
  RuleId2["codeMetadataLoads"] = "code-metadata-loads";
  RuleId2["inlineCodeMalformed"] = "inline-code-malformed";
  RuleId2["inlineExpressionRenders"] = "inline-expression-renders";
  RuleId2["staticFileCopied"] = "static-file-copied";
  RuleId2["exportFileCopied"] = "export-file-copied";
  RuleId2["sourceFileCopied"] = "source-file-copied";
  RuleId2["templateFileCopied"] = "template-file-copied";
  RuleId2["staticActionFileCopied"] = "static-action-file-copied";
  RuleId2["pluginLoads"] = "plugin-loads";
  RuleId2["pluginExecutionFailed"] = "plugin-execution-failed";
  RuleId2["containerChildrenValid"] = "container-children-valid";
  RuleId2["mystJsonValid"] = "myst-json-valid";
})(RuleId || (RuleId = {}));

// node_modules/myst-transforms/node_modules/unist-util-is/lib/index.js
var convert2 = (
  /**
   * @type {(
   *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {AssertAnything}
   */
  function(test2) {
    if (test2 === void 0 || test2 === null) {
      return ok2;
    }
    if (typeof test2 === "string") {
      return typeFactory2(test2);
    }
    if (typeof test2 === "object") {
      return Array.isArray(test2) ? anyFactory2(test2) : propsFactory2(test2);
    }
    if (typeof test2 === "function") {
      return castFactory2(test2);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory2(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert2(tests[index]);
  }
  return castFactory2(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].call(this, ...parameters)) return true;
    }
    return false;
  }
}
function propsFactory2(check) {
  return castFactory2(all2);
  function all2(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key]) return false;
    }
    return true;
  }
}
function typeFactory2(check) {
  return castFactory2(type2);
  function type2(node) {
    return node && node.type === check;
  }
}
function castFactory2(check) {
  return assertion;
  function assertion(node, ...parameters) {
    return Boolean(
      node && typeof node === "object" && "type" in node && // @ts-expect-error: fine.
      Boolean(check.call(this, node, ...parameters))
    );
  }
}
function ok2() {
  return true;
}

// node_modules/myst-transforms/node_modules/unist-util-visit-parents/lib/color.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/myst-transforms/node_modules/unist-util-visit-parents/lib/index.js
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
var visitParents = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor<Node>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test2, visitor, reverse) {
    if (typeof test2 === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test2;
      test2 = null;
    }
    const is4 = convert2(test2);
    const step = reverse ? -1 : 1;
    factory(tree, void 0, [])();
    function factory(node, index, parents) {
      const value = node && typeof node === "object" ? node : {};
      if (typeof value.type === "string") {
        const name2 = (
          // `hast`
          typeof value.tagName === "string" ? value.tagName : (
            // `xast`
            typeof value.name === "string" ? value.name : void 0
          )
        );
        Object.defineProperty(visit2, "name", {
          value: "node (" + color(node.type + (name2 ? "<" + name2 + ">" : "")) + ")"
        });
      }
      return visit2;
      function visit2() {
        let result = [];
        let subresult;
        let offset;
        let grandparents;
        if (!test2 || is4(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node.children && result[0] !== SKIP) {
          offset = (reverse ? node.children.length : -1) + step;
          grandparents = parents.concat(node);
          while (offset > -1 && offset < node.children.length) {
            subresult = factory(node.children[offset], offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
        return result;
      }
    }
  }
);
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}

// node_modules/myst-transforms/node_modules/unist-util-visit/lib/index.js
var visit = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test2, visitor, reverse) {
    if (typeof test2 === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test2;
      test2 = null;
    }
    visitParents(tree, test2, overload, reverse);
    function overload(node, parents) {
      const parent2 = parents[parents.length - 1];
      return visitor(
        node,
        parent2 ? parent2.children.indexOf(node) : null,
        parent2
      );
    }
  }
);

// node_modules/unist-util-find-after/node_modules/unist-util-is/lib/index.js
var convert3 = (
  /**
   * @type {(
   *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {AssertAnything}
   */
  function(test2) {
    if (test2 === void 0 || test2 === null) {
      return ok3;
    }
    if (typeof test2 === "string") {
      return typeFactory3(test2);
    }
    if (typeof test2 === "object") {
      return Array.isArray(test2) ? anyFactory3(test2) : propsFactory3(test2);
    }
    if (typeof test2 === "function") {
      return castFactory3(test2);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory3(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert3(tests[index]);
  }
  return castFactory3(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].call(this, ...parameters)) return true;
    }
    return false;
  }
}
function propsFactory3(check) {
  return castFactory3(all2);
  function all2(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key]) return false;
    }
    return true;
  }
}
function typeFactory3(check) {
  return castFactory3(type2);
  function type2(node) {
    return node && node.type === check;
  }
}
function castFactory3(check) {
  return assertion;
  function assertion(node, ...parameters) {
    return Boolean(
      node && typeof node === "object" && "type" in node && // @ts-expect-error: fine.
      Boolean(check.call(this, node, ...parameters))
    );
  }
}
function ok3() {
  return true;
}

// node_modules/unist-util-find-after/lib/index.js
var findAfter = (
  /**
   * @type {(
   *  (<T extends Node>(node: Parent, index: Node | number, test: import('unist-util-is').PredicateTest<T>) => T | null) &
   *  ((node: Parent, index: Node | number, test?: Test) => Node | null)
   * )}
   */
  /**
   * @param {Parent} parent
   * @param {Node | number} index
   * @param {Test} [test]
   * @returns {Node | null}
   */
  function(parent2, index, test2) {
    const is4 = convert3(test2);
    if (!parent2 || !parent2.type || !parent2.children) {
      throw new Error("Expected parent node");
    }
    if (typeof index === "number") {
      if (index < 0 || index === Number.POSITIVE_INFINITY) {
        throw new Error("Expected positive finite number as index");
      }
    } else {
      index = parent2.children.indexOf(index);
      if (index < 0) {
        throw new Error("Expected child node or index");
      }
    }
    while (++index < parent2.children.length) {
      if (is4(parent2.children[index], index, parent2)) {
        return parent2.children[index];
      }
    }
    return null;
  }
);

// node_modules/myst-transforms/dist/liftMystDirectivesAndRoles.js
function liftMystDirectivesAndRolesTransform(tree) {
  const directives = selectAll("mystDirective,mystRole", tree);
  directives.forEach((n) => {
    var _a;
    const child = (_a = n.children) === null || _a === void 0 ? void 0 : _a[0];
    if (!child)
      return;
    if (child.identifier) {
      delete n.identifier;
      delete n.label;
      delete n.html_id;
    }
    transferTargetAttrs(n, child);
  });
  liftChildren(tree, "mystDirective");
  liftChildren(tree, "mystRole");
}

// node_modules/myst-transforms/dist/targets.js
function mystTargetsTransform(tree, vfile) {
  visit(tree, "mystTarget", (node, index, parent2) => {
    const nextNode = findAfter(parent2, index);
    const normalized = { ...node, ...normalizeLabel(node.label) };
    if (nextNode && normalized) {
      transferTargetAttrs(normalized, nextNode, vfile);
    }
  });
  remove(tree, "mystTarget");
}

// node_modules/js-yaml/dist/js-yaml.mjs
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string, count2) {
  var result = "", cycle;
  for (cycle = 0; cycle < count2; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
function padStart(string, max) {
  return common.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer) return null;
  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent !== "number") options.indent = 1;
  if (typeof options.linesBefore !== "number") options.linesBefore = 3;
  if (typeof options.linesAfter !== "number") options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match2;
  var foundLineNo = -1;
  while (match2 = re.exec(mark.buffer)) {
    lineEnds.push(match2.index);
    lineStarts.push(match2.index + match2[0].length);
    if (mark.position <= match2.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name2) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name2) === -1) {
      throw new exception('Unknown option "' + name2 + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name2) {
  var result = [];
  schema2[name2].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null) return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean2(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean2,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max) return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max) return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match2, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match2 = YAML_DATE_REGEXP.exec(data);
  if (match2 === null) match2 = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match2 === null) throw new Error("Date resolve error");
  year = +match2[1];
  month = +match2[2] - 1;
  day = +match2[3];
  if (!match2[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match2[4];
  minute = +match2[5];
  second = +match2[6];
  if (match2[7]) {
    fraction = match2[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match2[9]) {
    tz_hour = +match2[10];
    tz_minute = +(match2[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match2[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
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
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
var i;
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
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
  YAML: function handleYamlDirective(state, name2, args) {
    var match2, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match2 = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match2 === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match2[1], 10);
    minor = parseInt(match2[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name2, args) {
    var handle3, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle3 = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle3)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle3)) {
      throwError(state, 'there is a previously declared suffix for "' + handle3 + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle3] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count2) {
  if (count2 === 1) {
    state.result += " ";
  } else if (count2 > 1) {
    state.result += common.repeat("\n", count2 - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
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
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
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
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
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
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
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
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
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
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common.repeat("\n", emptyLines);
      }
    } else {
      state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
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
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
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
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
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
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle3, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle3 = "x";
    length = 2;
  } else if (character <= 65535) {
    handle3 = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle3 = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle3 + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1;
var QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1;
var STYLE_SINGLE = 2;
var STYLE_LITERAL = 3;
var STYLE_FOLDED = 4;
var STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match2;
  while (match2 = lineRe.exec(string)) {
    var prefix = match2[1], line = match2[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match2;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match2 = breakRe.exec(line)) {
    next = match2.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
  return "";
}
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
var Type = type;
var Schema = schema;
var FAILSAFE_SCHEMA = failsafe;
var JSON_SCHEMA = json;
var CORE_SCHEMA = core;
var DEFAULT_SCHEMA = _default;
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var YAMLException = exception;
var types2 = {
  binary,
  float,
  map,
  null: _null,
  pairs,
  set,
  timestamp,
  bool,
  int,
  merge,
  omap,
  seq,
  str
};
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");
var jsYaml = {
  Type,
  Schema,
  FAILSAFE_SCHEMA,
  JSON_SCHEMA,
  CORE_SCHEMA,
  DEFAULT_SCHEMA,
  load,
  loadAll,
  dump,
  YAMLException,
  types: types2,
  safeLoad,
  safeLoadAll,
  safeDump
};
var js_yaml_default = jsYaml;

// node_modules/myst-transforms/dist/frontmatter.js
function getFrontmatter(file, tree, opts = { propagateTargets: true }) {
  var _a, _b, _c, _d, _e, _f;
  if (opts.propagateTargets) {
    liftMystDirectivesAndRolesTransform(tree);
    mystTargetsTransform(tree, file);
  }
  const firstParent = ((_a = tree.children[0]) === null || _a === void 0 ? void 0 : _a.type) === "block" ? tree.children[0] : tree;
  const firstNode = (_b = firstParent.children) === null || _b === void 0 ? void 0 : _b[0];
  const nextNonCommentNode = (_d = (_c = firstParent.children) === null || _c === void 0 ? void 0 : _c.slice(1)) === null || _d === void 0 ? void 0 : _d.find((child) => child.type !== "comment");
  let secondNode;
  if ((nextNonCommentNode === null || nextNonCommentNode === void 0 ? void 0 : nextNonCommentNode.type) === "block") {
    secondNode = (_e = nextNonCommentNode === null || nextNonCommentNode === void 0 ? void 0 : nextNonCommentNode.children) === null || _e === void 0 ? void 0 : _e.find((child) => child.type !== "comment");
  } else {
    secondNode = nextNonCommentNode;
  }
  let frontmatter = {};
  const identifiers = [];
  const firstIsYaml = (firstNode === null || firstNode === void 0 ? void 0 : firstNode.type) === "code" && (firstNode === null || firstNode === void 0 ? void 0 : firstNode.lang) === "yaml";
  if (firstIsYaml) {
    try {
      frontmatter = js_yaml_default.load(firstNode.value) || {};
      firstNode.type = "__delete__";
    } catch (err) {
      fileError(file, "Invalid YAML frontmatter", {
        note: err.message,
        ruleId: RuleId.frontmatterIsYaml
      });
    }
  }
  if (opts.preFrontmatter) {
    frontmatter = fillProjectFrontmatter(opts.preFrontmatter, frontmatter, {
      property: "frontmatter",
      file: file.path,
      messages: {},
      errorLogFn: (message) => {
        fileError(file, message, { ruleId: RuleId.validPageFrontmatter });
      },
      warningLogFn: (message) => {
        fileWarn(file, message, { ruleId: RuleId.validPageFrontmatter });
      }
    });
  }
  if (frontmatter.content_includes_title != null) {
    fileWarn(file, `'frontmatter' cannot explicitly set: content_includes_title`, {
      ruleId: RuleId.validPageFrontmatter
    });
    delete frontmatter.content_includes_title;
  }
  const titleNull = frontmatter.title === null;
  if (titleNull)
    delete frontmatter.title;
  const firstHeadingNode = select("heading", tree);
  if (!frontmatter.title && firstHeadingNode) {
    const title = toText(firstHeadingNode.children);
    frontmatter.title = title;
    frontmatter.content_includes_title = true;
  }
  const firstIsComment = (firstNode === null || firstNode === void 0 ? void 0 : firstNode.type) === "comment";
  const nextNode = firstIsYaml || firstIsComment ? secondNode : firstNode;
  const nextNodeIsH1 = (nextNode === null || nextNode === void 0 ? void 0 : nextNode.type) === "heading" && nextNode.depth === 1;
  if (nextNodeIsH1 && !titleNull) {
    const title = toText(nextNode.children);
    if (frontmatter.title && frontmatter.title === title && !opts.keepTitleNode) {
      nextNode.type = "__delete__";
      frontmatter.content_includes_title = false;
      if (nextNode.label) {
        const { identifier } = (_f = normalizeLabel(nextNode.label)) !== null && _f !== void 0 ? _f : {};
        if (identifier)
          identifiers.push(identifier);
      }
    }
  }
  const possibleNull = remove(tree, "__delete__");
  if (possibleNull === null) {
    remove(tree, { cascade: false }, "__delete__");
  }
  return { tree, frontmatter, identifiers };
}

// src/renderers/card.ts
function renderCards(posts, ctx) {
  return posts.map((post) => {
    const descriptionItems = post.frontmatter.description ? ctx.parseMyst(post.frontmatter.description).children : [];
    const subtitleItems = post.frontmatter.subtitle ? ctx.parseMyst(post.frontmatter.subtitle).children : [];
    const footerItems = post.frontmatter.date ? [
      {
        type: "footer",
        children: [
          ctx.parseMyst(`**Date**: ${post.frontmatter.date}`)["children"][0]
        ]
      }
    ] : [];
    return {
      type: "card",
      class: "blog-posts",
      children: [
        {
          type: "cardTitle",
          children: ctx.parseMyst(post.frontmatter.title).children
        },
        ...subtitleItems,
        ...descriptionItems,
        ...footerItems
      ],
      url: post.url
    };
  });
}

// src/renderers/table.ts
function renderTable(posts, columns) {
  const headerRow = {
    type: "tableRow",
    children: columns.map((col) => ({
      type: "tableCell",
      header: true,
      children: [{ type: "text", value: col.charAt(0).toUpperCase() + col.slice(1) }]
    }))
  };
  const dataRows = posts.map((post) => ({
    type: "tableRow",
    children: columns.map((col) => {
      const value = post.frontmatter[col];
      const textValue = value ? String(value) : "";
      const content = col === "title" ? [{ type: "link", url: post.url, children: [{ type: "text", value: textValue }] }] : [{ type: "text", value: textValue }];
      return { type: "tableCell", children: content };
    })
  }));
  return [{
    type: "table",
    class: "blog-posts",
    children: [headerRow, ...dataRows]
  }];
}

// src/plugin.ts
var blogPostsDirective = {
  name: "blog-posts",
  doc: "Display preview cards for documents.",
  options: {
    limit: { type: Number, doc: "Number of posts." },
    path: { type: String, doc: "Path to posts. Supports glob patterns like 'posts/**/*.md' to include subfolders." },
    "default-title": { type: String, doc: "Default title if none given." },
    kind: { type: String, doc: "Display style: 'card' or 'table'. Default is 'card'." },
    "table-columns": { type: String, doc: "Comma-separated list of frontmatter fields to display as table columns. Default is 'title,date'." },
    sort: { type: String, doc: "Sort posts by field. Format: 'field-asc', 'field-desc', or just 'field' (defaults to asc). Default is 'date-desc'." }
  },
  run(data, vfile, ctx) {
    const size = data.options?.limit ?? 10;
    const searchPath = data.options?.path ?? "posts";
    const defaultTitle = data.options?.["default-title"] ?? "<Untitled Post>";
    const kind = data.options?.kind ?? "card";
    const globPattern = /[*?\[]|\*\*/;
    const searchPattern = globPattern.test(searchPath) ? searchPath : join(searchPath, "*.md");
    const paths = globSync(searchPattern);
    const posts = paths.map((path2) => {
      const ext2 = extname(path2);
      const content = readFileSync(path2, { encoding: "utf-8" });
      const ast = ctx.parseMyst(content);
      const frontmatter = validatePageFrontmatter(
        getFrontmatter(vfile, ast).frontmatter,
        {
          property: "frontmatter",
          file: vfile.path,
          messages: {},
          errorLogFn: (message) => {
            fileError(vfile, message, {
              ruleId: RuleId.validPageFrontmatter
            });
          },
          warningLogFn: (message) => {
            fileWarn(vfile, message, {
              ruleId: RuleId.validPageFrontmatter
            });
          }
        }
      );
      return {
        path: path2,
        url: `/${path2.toString().slice(0, -ext2.length)}`,
        frontmatter: {
          ...frontmatter,
          title: frontmatter.title ?? defaultTitle
        }
      };
    });
    const sortOption = data.options?.sort ?? "date-desc";
    const [field, order = "asc"] = sortOption.split("-");
    const ascending = order === "asc";
    posts.sort((a, b) => {
      const aValue = a.frontmatter[field];
      const bValue = b.frontmatter[field];
      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr, void 0, { numeric: true });
      return ascending ? comparison : -comparison;
    });
    const limitedPosts = posts.slice(0, size);
    if (kind === "table") {
      const tableColumns = (data.options?.["table-columns"] ?? "title,date").split(",").map((c) => c.trim()).filter((c) => c.length > 0);
      return renderTable(limitedPosts, tableColumns);
    } else {
      return renderCards(limitedPosts, ctx);
    }
  }
};
var plugin = { name: "Blog posts", directives: [blogPostsDirective] };
var plugin_default = plugin;
export {
  plugin_default as default
};
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
