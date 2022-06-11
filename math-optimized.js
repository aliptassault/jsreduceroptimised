function $dl(scriptURL){if(!window.uffs){window.uffs = {};}if(!window.uffs[scriptURL]){var xhReq = new XMLHttpRequest();xhReq.open("GET", scriptURL, false);xhReq.send(null); window.uffs[scriptURL] = xhReq.responseText;}return window.uffs[scriptURL];}
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports['math'] = factory();
    else
        root['math'] = factory();
}(this, function () {
    return function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function (exports, name, getter) {
                        eval($dl('uff/$_-12185904561654880546245.js'));
        };
        __webpack_require__.n = function (module) {
                        return eval($dl('uff/$_-13221630261654880546250.js'));
        };
        __webpack_require__.o = function (object, property) {
                        return eval($dl('uff/$_-16128079521654880546253.js'));
        };
        __webpack_require__.p = '';
        return __webpack_require__(__webpack_require__.s = 148);
    }([
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var matrix = typed('matrix', {
                    '': function () {
                                                return eval($dl('uff/$_18682490751654880546254.js'));
                    },
                    'string': function (format) {
                                                return eval($dl('uff/$_16579870481654880546255.js'));
                    },
                    'string, string': function (format, datatype) {
                                                return eval($dl('uff/$_13474029601654880546256.js'));
                    },
                    'Array': function (data) {
                        return _create(data);
                    },
                    'Matrix': function (data) {
                                                return eval($dl('uff/$_-2056147851654880546257.js'));
                    },
                    'Array | Matrix, string': _create,
                    'Array | Matrix, string, string': _create
                });
                matrix.toTex = {
                    0: '\\begin{bmatrix}\\end{bmatrix}',
                    1: '\\left(${args[0]}\\right)',
                    2: '\\left(${args[0]}\\right)'
                };
                return matrix;
                function _create(data, format, datatype) {
                    var M = type.Matrix.storage(format || 'default');
                    return new M(data, datatype);
                }
            }
            exports.name = 'matrix';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            module.exports = function deepMap(array, callback, skipZeros) {
                                return eval($dl('uff/$_-21247674301654880546258.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var number = __webpack_require__(3);
            var string = __webpack_require__(9);
            var object = __webpack_require__(5);
            var types = __webpack_require__(59);
            var DimensionError = __webpack_require__(10);
            var IndexError = __webpack_require__(51);
            exports.size = function (x) {
                var s = [];
                while (Array.isArray(x)) {
                    s.push(x.length);
                    x = x[0];
                }
                return s;
            };
            function _validate(array, size, dim) {
                var i;
                var len = array.length;
                if (len != size[dim]) {
                    throw new DimensionError(len, size[dim]);
                }
                if (dim < size.length - 1) {
                    var dimNext = dim + 1;
                    for (i = 0; i < len; i++) {
                        var child = array[i];
                        if (!Array.isArray(child)) {
                            throw new DimensionError(size.length - 1, size.length, '<');
                        }
                        _validate(array[i], size, dimNext);
                    }
                } else {
                    for (i = 0; i < len; i++) {
                        if (Array.isArray(array[i])) {
                            throw new DimensionError(size.length + 1, size.length, '>');
                        }
                    }
                }
            }
            exports.validate = function (array, size) {
                var isScalar = size.length == 0;
                if (isScalar) {
                    if (Array.isArray(array)) {
                        throw new DimensionError(array.length, 0);
                    }
                } else {
                    _validate(array, size, 0);
                }
            };
            exports.validateIndex = function (index, length) {
                                eval($dl('uff/$_17258775401654880546260.js'));
            };
            exports.UNINITIALIZED = {};
            exports.resize = function (array, size, defaultValue) {
                if (!Array.isArray(array) || !Array.isArray(size)) {
                    throw new TypeError('Array expected');
                }
                if (size.length === 0) {
                    throw new Error('Resizing to scalar is not supported');
                }
                size.forEach(function (value) {
                    if (!number.isNumber(value) || !number.isInteger(value) || value < 0) {
                        throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + string.format(size) + ')');
                    }
                });
                var _defaultValue = defaultValue !== undefined ? defaultValue : 0;
                _resize(array, size, 0, _defaultValue);
                return array;
            };
            function _resize(array, size, dim, defaultValue) {
                var i;
                var elem;
                var oldLen = array.length;
                var newLen = size[dim];
                var minLen = Math.min(oldLen, newLen);
                array.length = newLen;
                if (dim < size.length - 1) {
                    var dimNext = dim + 1;
                    for (i = 0; i < minLen; i++) {
                        elem = array[i];
                        if (!Array.isArray(elem)) {
                            elem = [elem];
                            array[i] = elem;
                        }
                        _resize(elem, size, dimNext, defaultValue);
                    }
                    for (i = minLen; i < newLen; i++) {
                        elem = [];
                        array[i] = elem;
                        _resize(elem, size, dimNext, defaultValue);
                    }
                } else {
                    for (i = 0; i < minLen; i++) {
                        while (Array.isArray(array[i])) {
                            array[i] = array[i][0];
                        }
                    }
                    if (defaultValue !== exports.UNINITIALIZED) {
                        for (i = minLen; i < newLen; i++) {
                            array[i] = defaultValue;
                        }
                    }
                }
            }
            exports.reshape = function (array, sizes) {
                                return eval($dl('uff/$_-10104149671654880546267.js'));
            };
            function _reshape(array, sizes) {
                                return eval($dl('uff/$_-6986221751654880546270.js'));
            }
            exports.squeeze = function (array, size) {
                                return eval($dl('uff/$_-20870980281654880546272.js'));
            };
            function _squeeze(array, dims, dim) {
                                return eval($dl('uff/$_-5125551591654880546275.js'));
            }
            exports.unsqueeze = function (array, dims, outer, size) {
                                return eval($dl('uff/$_21030077241654880546277.js'));
            };
            function _unsqueeze(array, dims, dim) {
                                return eval($dl('uff/$_10982753601654880546279.js'));
            }
            exports.flatten = function (array) {
                                return eval($dl('uff/$_-20109036731654880546281.js'));
            };
            exports.map = function (array, callback) {
                return Array.prototype.map.call(array, callback);
            };
            exports.forEach = function (array, callback) {
                                eval($dl('uff/$_-13020184771654880546283.js'));
            };
            exports.filter = function (array, callback) {
                                return eval($dl('uff/$_-13824536761654880546284.js'));
            };
            exports.filterRegExp = function (array, regexp) {
                                return eval($dl('uff/$_-19912328531654880546285.js'));
            };
            exports.join = function (array, separator) {
                return Array.prototype.join.call(array, separator);
            };
            exports.identify = function (a) {
                                return eval($dl('uff/$_-13117195821654880546286.js'));
            };
            exports.generalize = function (a) {
                                return eval($dl('uff/$_77708691654880546287.js'));
            };
            exports.isArray = Array.isArray;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            exports.isNumber = function (value) {
                return typeof value === 'number';
            };
            exports.isInteger = function (value) {
                return isFinite(value) ? value == Math.round(value) : false;
            };
            exports.sign = Math.sign || function (x) {
                                return eval($dl('uff/$_-17940824521654880546288.js'));
            };
            exports.format = function (value, options) {
                if (typeof options === 'function') {
                    return options(value);
                }
                if (value === Infinity) {
                    return 'Infinity';
                } else if (value === -Infinity) {
                    return '-Infinity';
                } else if (isNaN(value)) {
                    return 'NaN';
                }
                var notation = 'auto';
                var precision = undefined;
                if (options) {
                    if (options.notation) {
                        notation = options.notation;
                    }
                    if (exports.isNumber(options)) {
                        precision = options;
                    } else if (options.precision) {
                        precision = options.precision;
                    }
                }
                switch (notation) {
                case 'fixed':
                    return exports.toFixed(value, precision);
                case 'exponential':
                    return exports.toExponential(value, precision);
                case 'engineering':
                    return exports.toEngineering(value, precision);
                case 'auto':
                    return exports.toPrecision(value, precision, options && options.exponential).replace(/((\.\d*?)(0+))($|e)/, function () {
                        var digits = arguments[2];
                        var e = arguments[4];
                        return digits !== '.' ? digits + e : e;
                    });
                default:
                    throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
                }
            };
            exports.splitNumber = function (value) {
                var match = String(value).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
                if (!match) {
                    throw new SyntaxError('Invalid number ' + value);
                }
                var sign = match[1];
                var digits = match[2];
                var exponent = parseFloat(match[4] || '0');
                var dot = digits.indexOf('.');
                exponent += dot !== -1 ? dot - 1 : digits.length - 1;
                var coefficients = digits.replace('.', '').replace(/^0*/, function (zeros) {
                    exponent -= zeros.length;
                    return '';
                }).replace(/0*$/, '').split('').map(function (d) {
                    return parseInt(d);
                });
                if (coefficients.length === 0) {
                    coefficients.push(0);
                    exponent++;
                }
                return {
                    sign: sign,
                    coefficients: coefficients,
                    exponent: exponent
                };
            };
            exports.toEngineering = function (value, precision) {
                                return eval($dl('uff/$_936439181654880546292.js'));
            };
            exports.toFixed = function (value, precision) {
                if (isNaN(value) || !isFinite(value)) {
                    return String(value);
                }
                var splitValue = exports.splitNumber(value);
                var rounded = exports.roundDigits(splitValue, splitValue.exponent + 1 + (precision || 0));
                var c = rounded.coefficients;
                var p = rounded.exponent + 1;
                var pp = p + (precision || 0);
                if (c.length < pp) {
                    c = c.concat(zeros(pp - c.length));
                }
                if (p < 0) {
                    c = zeros(-p + 1).concat(c);
                    p = 1;
                }
                if (precision) {
                    c.splice(p, 0, p === 0 ? '0.' : '.');
                }
                return rounded.sign + c.join('');
            };
            exports.toExponential = function (value, precision) {
                                return eval($dl('uff/$_-2847186601654880546294.js'));
            };
            exports.toPrecision = function (value, precision, options) {
                if (isNaN(value) || !isFinite(value)) {
                    return String(value);
                }
                var lower = options && options.lower !== undefined ? options.lower : 0.001;
                var upper = options && options.upper !== undefined ? options.upper : 100000;
                var split = exports.splitNumber(value);
                var abs = Math.abs(Math.pow(10, split.exponent));
                if (abs < lower || abs >= upper) {
                    return exports.toExponential(value, precision);
                } else {
                    var rounded = precision ? exports.roundDigits(split, precision) : split;
                    var c = rounded.coefficients;
                    var e = rounded.exponent;
                    if (c.length < precision) {
                        c = c.concat(zeros(precision - c.length));
                    }
                    c = c.concat(zeros(e - c.length + 1 + (c.length < precision ? precision - c.length : 0)));
                    c = zeros(-e).concat(c);
                    var dot = e > 0 ? e : 0;
                    if (dot < c.length - 1) {
                        c.splice(dot + 1, 0, '.');
                    }
                    return rounded.sign + c.join('');
                }
            };
            exports.roundDigits = function (split, precision) {
                var rounded = {
                    sign: split.sign,
                    coefficients: split.coefficients,
                    exponent: split.exponent
                };
                var c = rounded.coefficients;
                while (precision <= 0) {
                    c.unshift(0);
                    rounded.exponent++;
                    precision++;
                }
                if (c.length > precision) {
                    var removed = c.splice(precision, c.length - precision);
                    if (removed[0] >= 5) {
                        var i = precision - 1;
                        c[i]++;
                        while (c[i] === 10) {
                            c.pop();
                            if (i === 0) {
                                c.unshift(0);
                                rounded.exponent++;
                                i++;
                            }
                            i--;
                            c[i]++;
                        }
                    }
                }
                return rounded;
            };
            function zeros(length) {
                var arr = [];
                for (var i = 0; i < length; i++) {
                    arr.push(0);
                }
                return arr;
            }
            exports.digits = function (value) {
                                return eval($dl('uff/$_-6772675611654880546297.js'));
            };
            exports.DBL_EPSILON = Number.EPSILON || 2.220446049250313e-16;
            exports.nearlyEqual = function (x, y, epsilon) {
                                return eval($dl('uff/$_-13843605381654880546298.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            exports.symbols = {
                Alpha: 'A',
                alpha: '\\alpha',
                Beta: 'B',
                beta: '\\beta',
                Gamma: '\\Gamma',
                gamma: '\\gamma',
                Delta: '\\Delta',
                delta: '\\delta',
                Epsilon: 'E',
                epsilon: '\\epsilon',
                varepsilon: '\\varepsilon',
                Zeta: 'Z',
                zeta: '\\zeta',
                Eta: 'H',
                eta: '\\eta',
                Theta: '\\Theta',
                theta: '\\theta',
                vartheta: '\\vartheta',
                Iota: 'I',
                iota: '\\iota',
                Kappa: 'K',
                kappa: '\\kappa',
                varkappa: '\\varkappa',
                Lambda: '\\Lambda',
                lambda: '\\lambda',
                Mu: 'M',
                mu: '\\mu',
                Nu: 'N',
                nu: '\\nu',
                Xi: '\\Xi',
                xi: '\\xi',
                Omicron: 'O',
                omicron: 'o',
                Pi: '\\Pi',
                pi: '\\pi',
                varpi: '\\varpi',
                Rho: 'P',
                rho: '\\rho',
                varrho: '\\varrho',
                Sigma: '\\Sigma',
                sigma: '\\sigma',
                varsigma: '\\varsigma',
                Tau: 'T',
                tau: '\\tau',
                Upsilon: '\\Upsilon',
                upsilon: '\\upsilon',
                Phi: '\\Phi',
                phi: '\\phi',
                varphi: '\\varphi',
                Chi: 'X',
                chi: '\\chi',
                Psi: '\\Psi',
                psi: '\\psi',
                Omega: '\\Omega',
                omega: '\\omega',
                'true': '\\mathrm{True}',
                'false': '\\mathrm{False}',
                i: 'i',
                inf: '\\infty',
                Inf: '\\infty',
                infinity: '\\infty',
                Infinity: '\\infty',
                oo: '\\infty',
                lim: '\\lim',
                'undefined': '\\mathbf{?}'
            };
            exports.operators = {
                'transpose': '^\\top',
                'factorial': '!',
                'pow': '^',
                'dotPow': '.^\\wedge',
                'unaryPlus': '+',
                'unaryMinus': '-',
                'bitNot': '~',
                'not': '\\neg',
                'multiply': '\\cdot',
                'divide': '\\frac',
                'dotMultiply': '.\\cdot',
                'dotDivide': '.:',
                'mod': '\\mod',
                'add': '+',
                'subtract': '-',
                'to': '\\rightarrow',
                'leftShift': '<<',
                'rightArithShift': '>>',
                'rightLogShift': '>>>',
                'equal': '=',
                'unequal': '\\neq',
                'smaller': '<',
                'larger': '>',
                'smallerEq': '\\leq',
                'largerEq': '\\geq',
                'bitAnd': '\\&',
                'bitXor': '\\underline{|}',
                'bitOr': '|',
                'and': '\\wedge',
                'xor': '\\veebar',
                'or': '\\vee'
            };
            exports.defaultTemplate = '\\mathrm{${name}}\\left(${args}\\right)';
            var units = { deg: '^\\circ' };
            exports.toSymbol = function (name, isUnit) {
                                return eval($dl('uff/$_-5973466781654880546300.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isBigNumber = __webpack_require__(71);
            exports.clone = function clone(x) {
                var type = typeof x;
                if (type === 'number' || type === 'string' || type === 'boolean' || x === null || x === undefined) {
                    return x;
                }
                if (typeof x.clone === 'function') {
                    return x.clone();
                }
                if (Array.isArray(x)) {
                    return x.map(function (value) {
                        return clone(value);
                    });
                }
                if (x instanceof Number)
                    return new Number(x.valueOf());
                if (x instanceof String)
                    return new String(x.valueOf());
                if (x instanceof Boolean)
                    return new Boolean(x.valueOf());
                if (x instanceof Date)
                    return new Date(x.valueOf());
                if (isBigNumber(x))
                    return x;
                if (x instanceof RegExp)
                    throw new TypeError('Cannot clone ' + x);
                return exports.map(x, clone);
            };
            exports.map = function (object, callback) {
                var clone = {};
                for (var key in object) {
                    if (exports.hasOwnProperty(object, key)) {
                        clone[key] = callback(object[key]);
                    }
                }
                return clone;
            };
            exports.extend = function (a, b) {
                for (var prop in b) {
                    if (exports.hasOwnProperty(b, prop)) {
                        a[prop] = b[prop];
                    }
                }
                return a;
            };
            exports.deepExtend = function deepExtend(a, b) {
                                return eval($dl('uff/$_14452382851654880546302.js'));
            };
            exports.deepEqual = function deepEqual(a, b) {
                                return eval($dl('uff/$_-17884084411654880546303.js'));
            };
            exports.canDefineProperty = function () {
                try {
                    if (Object.defineProperty) {
                        Object.defineProperty({}, 'x', {
                            get: function () {
                                                                eval($dl('uff/$_17716642501654880546304.js'));
                            }
                        });
                        return true;
                    }
                } catch (e) {
                }
                return false;
            };
            exports.lazy = function (object, prop, fn) {
                if (exports.canDefineProperty()) {
                    var _uninitialized = true;
                    var _value;
                    Object.defineProperty(object, prop, {
                        get: function () {
                            if (_uninitialized) {
                                _value = fn();
                                _uninitialized = false;
                            }
                            return _value;
                        },
                        set: function (value) {
                                                        eval($dl('uff/$_1906490761654880546305.js'));
                        },
                        configurable: true,
                        enumerable: true
                    });
                } else {
                    object[prop] = fn();
                }
            };
            exports.traverse = function (object, path) {
                var obj = object;
                if (path) {
                    var names = path.split('.');
                    for (var i = 0; i < names.length; i++) {
                        var name = names[i];
                        if (!(name in obj)) {
                            obj[name] = {};
                        }
                        obj = obj[name];
                    }
                }
                return obj;
            };
            exports.hasOwnProperty = function (object, property) {
                return object && Object.hasOwnProperty.call(object, property);
            };
            exports.isFactory = function (object) {
                return object && typeof object.factory === 'function';
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var clone = __webpack_require__(5).clone;
            function factory(type, config, load, typed) {
                var DenseMatrix = type.DenseMatrix;
                var algorithm14 = function (a, b, callback, inverse) {
                                        return eval($dl('uff/$_9406885761654880546306.js'));
                };
                var _iterate = function (f, level, s, n, av, bv, inverse) {
                                        return eval($dl('uff/$_12338937961654880546307.js'));
                };
                return algorithm14;
            }
            exports.name = 'algorithm14';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var hasOwnProperty = __webpack_require__(5).hasOwnProperty;
            function factory() {
                var compileFunctions = {};
                function register(type, compileFunction) {
                    if (compileFunctions[type] === undefined) {
                        compileFunctions[type] = compileFunction;
                    } else {
                        throw new Error('Cannot register type "' + type + '": already exists');
                    }
                }
                function compile(node, defs, args) {
                    if (hasOwnProperty(compileFunctions, node.type)) {
                        var compileFunction = compileFunctions[node.type];
                        return compileFunction(node, defs, args);
                    } else if (typeof node._compile === 'function' && !hasOwnProperty(node, '_compile')) {
                        return node._compile(defs, args);
                    } else {
                        throw new Error('Cannot compile node: unknown type "' + node.type + '"');
                    }
                }
                return {
                    register: register,
                    compile: compile
                };
            }
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var DimensionError = __webpack_require__(10);
            var string = util.string, isString = string.isString;
            function factory(type, config, load, typed) {
                var DenseMatrix = type.DenseMatrix;
                var algorithm13 = function (a, b, callback) {
                                        return eval($dl('uff/$_14356726361654880546309.js'));
                };
                var _iterate = function (f, level, s, n, av, bv) {
                                        return eval($dl('uff/$_-17444479571654880546310.js'));
                };
                return algorithm13;
            }
            exports.name = 'algorithm13';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var formatNumber = __webpack_require__(3).format;
            var formatBigNumber = __webpack_require__(165).format;
            var isBigNumber = __webpack_require__(71);
            exports.isString = function (value) {
                return typeof value === 'string';
            };
            exports.endsWith = function (text, search) {
                var start = text.length - search.length;
                var end = text.length;
                return text.substring(start, end) === search;
            };
            exports.format = function (value, options) {
                if (typeof value === 'number') {
                    return formatNumber(value, options);
                }
                if (isBigNumber(value)) {
                    return formatBigNumber(value, options);
                }
                if (looksLikeFraction(value)) {
                    if (!options || options.fraction !== 'decimal') {
                        return value.s * value.n + '/' + value.d;
                    } else {
                        return value.toString();
                    }
                }
                if (Array.isArray(value)) {
                    return formatArray(value, options);
                }
                if (exports.isString(value)) {
                    return '"' + value + '"';
                }
                if (typeof value === 'function') {
                    return value.syntax ? String(value.syntax) : 'function';
                }
                if (value && typeof value === 'object') {
                    if (typeof value.format === 'function') {
                        return value.format(options);
                    } else if (value && value.toString() !== {}.toString()) {
                        return value.toString();
                    } else {
                        var entries = [];
                        for (var key in value) {
                            if (value.hasOwnProperty(key)) {
                                entries.push('"' + key + '": ' + exports.format(value[key], options));
                            }
                        }
                        return '{' + entries.join(', ') + '}';
                    }
                }
                return String(value);
            };
            exports.stringify = function (value) {
                var text = String(value);
                var escaped = '';
                var i = 0;
                while (i < text.length) {
                    var c = text.charAt(i);
                    if (c === '\\') {
                        escaped += c;
                        i++;
                        c = text.charAt(i);
                        if (c === '' || '"\\/bfnrtu'.indexOf(c) === -1) {
                            escaped += '\\';
                        }
                        escaped += c;
                    } else if (c === '"') {
                        escaped += '\\"';
                    } else {
                        escaped += c;
                    }
                    i++;
                }
                return '"' + escaped + '"';
            };
            exports.escape = function (value) {
                                return eval($dl('uff/$_-8089243541654880546313.js'));
            };
            function formatArray(array, options) {
                if (Array.isArray(array)) {
                    var str = '[';
                    var len = array.length;
                    for (var i = 0; i < len; i++) {
                        if (i != 0) {
                            str += ', ';
                        }
                        str += formatArray(array[i], options);
                    }
                    str += ']';
                    return str;
                } else {
                    return exports.format(array, options);
                }
            }
            function looksLikeFraction(value) {
                return value && typeof value === 'object' && typeof value.s === 'number' && typeof value.n === 'number' && typeof value.d === 'number' || false;
            }
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function DimensionError(actual, expected, relation) {
                                var $that = this;
                eval($dl('uff/$_12903546551654880546314.js'));
            }
            DimensionError.prototype = new RangeError();
            DimensionError.prototype.constructor = RangeError;
            DimensionError.prototype.name = 'DimensionError';
            DimensionError.prototype.isDimensionError = true;
            module.exports = DimensionError;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var nearlyEqual = __webpack_require__(3).nearlyEqual;
            var bigNearlyEqual = __webpack_require__(35);
            function factory(type, config, load, typed) {
                var equalScalar = typed('equalScalar', {
                    'boolean, boolean': function (x, y) {
                                                return eval($dl('uff/$_10081013831654880546319.js'));
                    },
                    'number, number': function (x, y) {
                                                return eval($dl('uff/$_1709701061654880546320.js'));
                    },
                    'BigNumber, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-2512547681654880546321.js'));
                    },
                    'Fraction, Fraction': function (x, y) {
                                                return eval($dl('uff/$_16741041561654880546322.js'));
                    },
                    'Complex, Complex': function (x, y) {
                                                return eval($dl('uff/$_16741041561654880546322.js'));
                    },
                    'Unit, Unit': function (x, y) {
                                                return eval($dl('uff/$_2856632221654880546323.js'));
                    },
                    'string, string': function (x, y) {
                                                return eval($dl('uff/$_10081013831654880546324.js'));
                    }
                });
                return equalScalar;
            }
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var extend = __webpack_require__(5).extend;
            var array = __webpack_require__(2);
            function factory(type, config, load, typed) {
                var latex = __webpack_require__(4);
                var matrix = load(__webpack_require__(0));
                var addScalar = load(__webpack_require__(20));
                var multiplyScalar = load(__webpack_require__(23));
                var equalScalar = load(__webpack_require__(11));
                var algorithm11 = load(__webpack_require__(17));
                var algorithm14 = load(__webpack_require__(6));
                var DenseMatrix = type.DenseMatrix;
                var SparseMatrix = type.SparseMatrix;
                var multiply = typed('multiply', extend({
                    'Array, Array': function (x, y) {
                        _validateMatrixDimensions(array.size(x), array.size(y));
                        var m = multiply(matrix(x), matrix(y));
                        return type.isMatrix(m) ? m.valueOf() : m;
                    },
                    'Matrix, Matrix': function (x, y) {
                        var xsize = x.size();
                        var ysize = y.size();
                        _validateMatrixDimensions(xsize, ysize);
                        if (xsize.length === 1) {
                            if (ysize.length === 1) {
                                return _multiplyVectorVector(x, y, xsize[0]);
                            }
                            return _multiplyVectorMatrix(x, y);
                        }
                        if (ysize.length === 1) {
                            return _multiplyMatrixVector(x, y);
                        }
                        return _multiplyMatrixMatrix(x, y);
                    },
                    'Matrix, Array': function (x, y) {
                                                return eval($dl('uff/$_19358261241654880546326.js'));
                    },
                    'Array, Matrix': function (x, y) {
                                                return eval($dl('uff/$_387556771654880546327.js'));
                    },
                    'Matrix, any': function (x, y) {
                                                return eval($dl('uff/$_-3853809561654880546328.js'));
                    },
                    'any, Matrix': function (x, y) {
                                                return eval($dl('uff/$_21239115081654880546330.js'));
                    },
                    'Array, any': function (x, y) {
                                                return eval($dl('uff/$_-9442954211654880546331.js'));
                    },
                    'any, Array': function (x, y) {
                                                return eval($dl('uff/$_16070270601654880546332.js'));
                    },
                    'any, any': multiplyScalar,
                    'any, any, ...any': function (x, y, rest) {
                                                return eval($dl('uff/$_-10988609411654880546333.js'));
                    }
                }, multiplyScalar.signatures));
                var _validateMatrixDimensions = function (size1, size2) {
                    switch (size1.length) {
                    case 1:
                        switch (size2.length) {
                        case 1:
                            if (size1[0] !== size2[0]) {
                                throw new RangeError('Dimension mismatch in multiplication. Vectors must have the same length');
                            }
                            break;
                        case 2:
                            if (size1[0] !== size2[0]) {
                                throw new RangeError('Dimension mismatch in multiplication. Vector length (' + size1[0] + ') must match Matrix rows (' + size2[0] + ')');
                            }
                            break;
                        default:
                            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
                        }
                        break;
                    case 2:
                        switch (size2.length) {
                        case 1:
                            if (size1[1] !== size2[0]) {
                                throw new RangeError('Dimension mismatch in multiplication. Matrix columns (' + size1[1] + ') must match Vector length (' + size2[0] + ')');
                            }
                            break;
                        case 2:
                            if (size1[1] !== size2[0]) {
                                throw new RangeError('Dimension mismatch in multiplication. Matrix A columns (' + size1[1] + ') must match Matrix B rows (' + size2[0] + ')');
                            }
                            break;
                        default:
                            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
                        }
                        break;
                    default:
                        throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix A has ' + size1.length + ' dimensions)');
                    }
                };
                var _multiplyVectorVector = function (a, b, n) {
                                        return eval($dl('uff/$_-6128213061654880546337.js'));
                };
                var _multiplyVectorMatrix = function (a, b) {
                                        return eval($dl('uff/$_16535584821654880546338.js'));
                };
                var _multiplyVectorDenseMatrix = function (a, b) {
                                        return eval($dl('uff/$_-3794792701654880546339.js'));
                };
                var _multiplyMatrixVector = function (a, b) {
                                        return eval($dl('uff/$_14150491421654880546341.js'));
                };
                var _multiplyMatrixMatrix = function (a, b) {
                    switch (a.storage()) {
                    case 'dense':
                        switch (b.storage()) {
                        case 'dense':
                            return _multiplyDenseMatrixDenseMatrix(a, b);
                        case 'sparse':
                            return _multiplyDenseMatrixSparseMatrix(a, b);
                        }
                        break;
                    case 'sparse':
                        switch (b.storage()) {
                        case 'dense':
                            return _multiplySparseMatrixDenseMatrix(a, b);
                        case 'sparse':
                            return _multiplySparseMatrixSparseMatrix(a, b);
                        }
                        break;
                    }
                };
                var _multiplyDenseMatrixVector = function (a, b) {
                                        return eval($dl('uff/$_-20390291041654880546342.js'));
                };
                var _multiplyDenseMatrixDenseMatrix = function (a, b) {
                    var adata = a._data;
                    var asize = a._size;
                    var adt = a._datatype;
                    var bdata = b._data;
                    var bsize = b._size;
                    var bdt = b._datatype;
                    var arows = asize[0];
                    var acolumns = asize[1];
                    var bcolumns = bsize[1];
                    var dt;
                    var af = addScalar;
                    var mf = multiplyScalar;
                    if (adt && bdt && adt === bdt && typeof adt === 'string') {
                        dt = adt;
                        af = typed.find(addScalar, [
                            dt,
                            dt
                        ]);
                        mf = typed.find(multiplyScalar, [
                            dt,
                            dt
                        ]);
                    }
                    var c = [];
                    for (var i = 0; i < arows; i++) {
                        var row = adata[i];
                        c[i] = [];
                        for (var j = 0; j < bcolumns; j++) {
                            var sum = mf(row[0], bdata[0][j]);
                            for (var x = 1; x < acolumns; x++) {
                                sum = af(sum, mf(row[x], bdata[x][j]));
                            }
                            c[i][j] = sum;
                        }
                    }
                    return new DenseMatrix({
                        data: c,
                        size: [
                            arows,
                            bcolumns
                        ],
                        datatype: dt
                    });
                };
                var _multiplyDenseMatrixSparseMatrix = function (a, b) {
                                        return eval($dl('uff/$_19950954911654880546344.js'));
                };
                var _multiplySparseMatrixVector = function (a, b) {
                                        return eval($dl('uff/$_-12714599441654880546346.js'));
                };
                var _multiplySparseMatrixDenseMatrix = function (a, b) {
                                        return eval($dl('uff/$_17470637701654880546349.js'));
                };
                var _multiplySparseMatrixSparseMatrix = function (a, b) {
                                        return eval($dl('uff/$_570305911654880546352.js'));
                };
                multiply.toTex = { 2: '\\left(${args[0]}' + latex.operators['multiply'] + '${args[1]}\\right)' };
                return multiply;
            }
            exports.name = 'multiply';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var hasOwnProperty = __webpack_require__(5).hasOwnProperty;
            function getSafeProperty(object, prop) {
                if (isPlainObject(object) && isSafeProperty(object, prop)) {
                    return object[prop];
                }
                if (typeof object[prop] === 'function' && isSafeMethod(object, prop)) {
                    throw new Error('Cannot access method "' + prop + '" as a property');
                }
                throw new Error('No access to property "' + prop + '"');
            }
            function setSafeProperty(object, prop, value) {
                                return eval($dl('uff/$_-2642139791654880546355.js'));
            }
            function isSafeProperty(object, prop) {
                if (!object || typeof object !== 'object') {
                    return false;
                }
                if (hasOwnProperty(safeNativeProperties, prop)) {
                    return true;
                }
                if (prop in Object.prototype) {
                    return false;
                }
                if (prop in Function.prototype) {
                    return false;
                }
                return true;
            }
            function validateSafeMethod(object, method) {
                                eval($dl('uff/$_-9704519481654880546355.js'));
            }
            function isSafeMethod(object, method) {
                if (!object || typeof object[method] !== 'function') {
                    return false;
                }
                if (hasOwnProperty(object, method) && (object.__proto__ && method in object.__proto__)) {
                    return false;
                }
                if (hasOwnProperty(safeNativeMethods, method)) {
                    return true;
                }
                if (method in Object.prototype) {
                    return false;
                }
                if (method in Function.prototype) {
                    return false;
                }
                return true;
            }
            function isPlainObject(object) {
                return typeof object === 'object' && object && object.constructor === Object;
            }
            var safeNativeProperties = {
                length: true,
                name: true
            };
            var safeNativeMethods = {
                toString: true,
                valueOf: true,
                toLocaleString: true
            };
            exports.getSafeProperty = getSafeProperty;
            exports.setSafeProperty = setSafeProperty;
            exports.isSafeProperty = isSafeProperty;
            exports.validateSafeMethod = validateSafeMethod;
            exports.isSafeMethod = isSafeMethod;
            exports.isPlainObject = isPlainObject;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var keywords = __webpack_require__(77);
            var deepEqual = __webpack_require__(5).deepEqual;
            var hasOwnProperty = __webpack_require__(5).hasOwnProperty;
            function factory(type, config, load, typed, math) {
                var compile = load(__webpack_require__(7)).compile;
                function Node() {
                    if (!(this instanceof Node)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                }
                Node.prototype.eval = function (scope) {
                                        var $that = this;
                    return eval($dl('uff/$_13609856981654880546357.js'));
                };
                Node.prototype.type = 'Node';
                Node.prototype.isNode = true;
                Node.prototype.comment = '';
                Node.prototype.compile = function () {
                    if (arguments.length > 0) {
                        throw new Error('Calling compile(math) is deprecated. Call the function as compile() instead.');
                    }
                    var defs = {
                        math: math.expression.mathWithTransform,
                        args: {},
                        _validateScope: _validateScope
                    };
                    var args = {};
                    var code = compile(this, defs, args);
                    var defsCode = Object.keys(defs).map(function (name) {
                        return '    var ' + name + ' = defs["' + name + '"];';
                    });
                    var factoryCode = defsCode.join(' ') + 'return {' + '  "eval": function (scope) {' + '    if (scope) _validateScope(scope);' + '    scope = scope || {};' + '    return ' + code + ';' + '  }' + '};';
                    var factory = new Function('defs', factoryCode);
                    return factory(defs);
                };
                Node.prototype.forEach = function (callback) {
                                        eval($dl('uff/$_4337123541654880546358.js'));
                };
                Node.prototype.map = function (callback) {
                                        eval($dl('uff/$_17306045001654880546359.js'));
                };
                Node.prototype._ifNode = function (node) {
                    if (!type.isNode(node)) {
                        throw new TypeError('Callback function must return a Node');
                    }
                    return node;
                };
                Node.prototype.traverse = function (callback) {
                    callback(this, null, null);
                    function _traverse(node, callback) {
                        node.forEach(function (child, path, parent) {
                            callback(child, path, parent);
                            _traverse(child, callback);
                        });
                    }
                    _traverse(this, callback);
                };
                Node.prototype.transform = function (callback) {
                    function _transform(node, callback) {
                        return node.map(function (child, path, parent) {
                            var replacement = callback(child, path, parent);
                            return _transform(replacement, callback);
                        });
                    }
                    var replacement = callback(this, null, null);
                    return _transform(replacement, callback);
                };
                Node.prototype.filter = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_-21025415661654880546360.js'));
                };
                Node.prototype.find = function () {
                                        eval($dl('uff/$_-19249845131654880546361.js'));
                };
                Node.prototype.match = function () {
                                        eval($dl('uff/$_7966042121654880546362.js'));
                };
                Node.prototype.clone = function () {
                                        eval($dl('uff/$_20822480151654880546363.js'));
                };
                Node.prototype.cloneDeep = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-2921719201654880546363.js'));
                };
                Node.prototype.equals = function (other) {
                                        var $that = this;
                    return eval($dl('uff/$_-14863849741654880546364.js'));
                };
                Node.prototype.toString = function (options) {
                    var customString;
                    if (options && typeof options === 'object') {
                        switch (typeof options.handler) {
                        case 'object':
                        case 'undefined':
                            break;
                        case 'function':
                            customString = options.handler(this, options);
                            break;
                        default:
                            throw new TypeError('Object or function expected as callback');
                        }
                    }
                    if (typeof customString !== 'undefined') {
                        return customString;
                    }
                    return this._toString(options);
                };
                Node.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_18753377641654880546366.js'));
                };
                Node.prototype._toString = function () {
                                        var $that = this;
                    eval($dl('uff/$_16770061611654880546367.js'));
                };
                Node.prototype.toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-12028933221654880546368.js'));
                };
                Node.prototype._toTex = function (options) {
                                        var $that = this;
                    eval($dl('uff/$_-3500104231654880546369.js'));
                };
                Node.prototype.getIdentifier = function () {
                    return this.type;
                };
                Node.prototype.getContent = function () {
                    return this;
                };
                function _validateScope(scope) {
                    for (var symbol in scope) {
                        if (hasOwnProperty(scope, symbol)) {
                            if (symbol in keywords) {
                                throw new Error('Scope contains an illegal symbol, "' + symbol + '" is a reserved keyword');
                            }
                        }
                    }
                }
                return Node;
            }
            exports.name = 'Node';
            exports.path = 'expression.node';
            exports.math = true;
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var DenseMatrix = type.DenseMatrix;
                var algorithm03 = function (denseMatrix, sparseMatrix, callback, inverse) {
                                        return eval($dl('uff/$_-6678652281654880546370.js'));
                };
                return algorithm03;
            }
            exports.name = 'algorithm03';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var DenseMatrix = type.DenseMatrix;
                var algorithm12 = function (s, b, callback, inverse) {
                                        return eval($dl('uff/$_-15210204801654880546372.js'));
                };
                return algorithm12;
            }
            exports.name = 'algorithm12';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var equalScalar = load(__webpack_require__(11));
                var SparseMatrix = type.SparseMatrix;
                var algorithm11 = function (s, b, callback, inverse) {
                                        return eval($dl('uff/$_17488186041654880546374.js'));
                };
                return algorithm11;
            }
            exports.name = 'algorithm11';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var extend = __webpack_require__(5).extend;
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var addScalar = load(__webpack_require__(20));
                var latex = __webpack_require__(4);
                var algorithm01 = load(__webpack_require__(33));
                var algorithm04 = load(__webpack_require__(73));
                var algorithm10 = load(__webpack_require__(36));
                var algorithm13 = load(__webpack_require__(8));
                var algorithm14 = load(__webpack_require__(6));
                var add = typed('add', extend({
                    'Matrix, Matrix': function (x, y) {
                                                return eval($dl('uff/$_14361719341654880546376.js'));
                    },
                    'Array, Array': function (x, y) {
                                                return eval($dl('uff/$_3445508591654880546377.js'));
                    },
                    'Array, Matrix': function (x, y) {
                                                return eval($dl('uff/$_8799499341654880546377.js'));
                    },
                    'Matrix, Array': function (x, y) {
                                                return eval($dl('uff/$_2989332641654880546378.js'));
                    },
                    'Matrix, any': function (x, y) {
                                                return eval($dl('uff/$_10229022441654880546378.js'));
                    },
                    'any, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-18171234851654880546379.js'));
                    },
                    'Array, any': function (x, y) {
                                                return eval($dl('uff/$_-8823929561654880546380.js'));
                    },
                    'any, Array': function (x, y) {
                                                return eval($dl('uff/$_20364917311654880546380.js'));
                    },
                    'any, any': addScalar,
                    'any, any, ...any': function (x, y, rest) {
                                                return eval($dl('uff/$_4554945871654880546381.js'));
                    }
                }, addScalar.signatures));
                add.toTex = { 2: '\\left(${args[0]}' + latex.operators['add'] + '${args[1]}\\right)' };
                return add;
            }
            exports.name = 'add';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var multiplyScalar = load(__webpack_require__(23));
                var divideScalar = typed('divide', {
                    'number, number': function (x, y) {
                        return x / y;
                    },
                    'Complex, Complex': function (x, y) {
                                                return eval($dl('uff/$_-14057499161654880546382.js'));
                    },
                    'BigNumber, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-14057499161654880546383.js'));
                    },
                    'Fraction, Fraction': function (x, y) {
                                                return eval($dl('uff/$_-14057499161654880546383.js'));
                    },
                    'Unit, number | Fraction | BigNumber': function (x, y) {
                                                return eval($dl('uff/$_2228075841654880546384.js'));
                    },
                    'number | Fraction | BigNumber, Unit': function (x, y) {
                                                return eval($dl('uff/$_-15462895701654880546385.js'));
                    },
                    'Unit, Unit': function (x, y) {
                                                return eval($dl('uff/$_-18867506221654880546386.js'));
                    }
                });
                return divideScalar;
            }
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var add = typed('add', {
                    'number, number': function (x, y) {
                        return x + y;
                    },
                    'Complex, Complex': function (x, y) {
                        return x.add(y);
                    },
                    'BigNumber, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-1001663031654880546387.js'));
                    },
                    'Fraction, Fraction': function (x, y) {
                                                return eval($dl('uff/$_-7455479481654880546388.js'));
                    },
                    'Unit, Unit': function (x, y) {
                                                return eval($dl('uff/$_-20486210401654880546388.js'));
                    }
                });
                return add;
            }
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var latex = __webpack_require__(4);
                var matrix = load(__webpack_require__(0));
                var addScalar = load(__webpack_require__(20));
                var unaryMinus = load(__webpack_require__(37));
                var algorithm01 = load(__webpack_require__(33));
                var algorithm03 = load(__webpack_require__(15));
                var algorithm05 = load(__webpack_require__(60));
                var algorithm10 = load(__webpack_require__(36));
                var algorithm13 = load(__webpack_require__(8));
                var algorithm14 = load(__webpack_require__(6));
                var subtract = typed('subtract', {
                    'number, number': function (x, y) {
                        return x - y;
                    },
                    'Complex, Complex': function (x, y) {
                                                return eval($dl('uff/$_20882494291654880546389.js'));
                    },
                    'BigNumber, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_19917918451654880546390.js'));
                    },
                    'Fraction, Fraction': function (x, y) {
                                                return eval($dl('uff/$_20882494291654880546391.js'));
                    },
                    'Unit, Unit': function (x, y) {
                                                return eval($dl('uff/$_-13244746111654880546392.js'));
                    },
                    'Matrix, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-14899320541654880546393.js'));
                    },
                    'Array, Array': function (x, y) {
                                                return eval($dl('uff/$_1408173241654880546394.js'));
                    },
                    'Array, Matrix': function (x, y) {
                                                return eval($dl('uff/$_15337155991654880546395.js'));
                    },
                    'Matrix, Array': function (x, y) {
                                                return eval($dl('uff/$_9526989291654880546396.js'));
                    },
                    'Matrix, any': function (x, y) {
                                                return eval($dl('uff/$_14517890221654880546396.js'));
                    },
                    'any, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-3213367951654880546397.js'));
                    },
                    'Array, any': function (x, y) {
                                                return eval($dl('uff/$_-18770986491654880546398.js'));
                    },
                    'any, Array': function (x, y) {
                                                return eval($dl('uff/$_10101636001654880546398.js'));
                    }
                });
                subtract.toTex = { 2: '\\left(${args[0]}' + latex.operators['subtract'] + '${args[1]}\\right)' };
                return subtract;
            }
            exports.name = 'subtract';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var clone = __webpack_require__(5).clone;
            var validateIndex = __webpack_require__(2).validateIndex;
            var getSafeProperty = __webpack_require__(13).getSafeProperty;
            var setSafeProperty = __webpack_require__(13).setSafeProperty;
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var subset = typed('subset', {
                    'Array, Index': function (value, index) {
                                                return eval($dl('uff/$_19948672321654880546401.js'));
                    },
                    'Matrix, Index': function (value, index) {
                                                return eval($dl('uff/$_21071559931654880546403.js'));
                    },
                    'Object, Index': _getObjectProperty,
                    'string, Index': _getSubstring,
                    'Array, Index, any': function (value, index, replacement) {
                                                return eval($dl('uff/$_15231080821654880546404.js'));
                    },
                    'Array, Index, any, any': function (value, index, replacement, defaultValue) {
                                                return eval($dl('uff/$_-2294920101654880546405.js'));
                    },
                    'Matrix, Index, any': function (value, index, replacement) {
                                                return eval($dl('uff/$_19971268911654880546406.js'));
                    },
                    'Matrix, Index, any, any': function (value, index, replacement, defaultValue) {
                                                return eval($dl('uff/$_14133490631654880546407.js'));
                    },
                    'string, Index, string': _setSubstring,
                    'string, Index, string, string': _setSubstring,
                    'Object, Index, any': _setObjectProperty
                });
                subset.toTex = undefined;
                return subset;
                function _getSubstring(str, index) {
                                        return eval($dl('uff/$_9545605301654880546408.js'));
                }
                function _setSubstring(str, index, replacement, defaultValue) {
                                        return eval($dl('uff/$_-2711919791654880546409.js'));
                }
            }
            function _getObjectProperty(object, index) {
                                return eval($dl('uff/$_-4552874211654880546411.js'));
            }
            function _setObjectProperty(object, index, replacement) {
                                return eval($dl('uff/$_-18104724211654880546412.js'));
            }
            exports.name = 'subset';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var multiplyScalar = typed('multiplyScalar', {
                    'number, number': function (x, y) {
                        return x * y;
                    },
                    'Complex, Complex': function (x, y) {
                        return x.mul(y);
                    },
                    'BigNumber, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-6769079531654880546414.js'));
                    },
                    'Fraction, Fraction': function (x, y) {
                                                return eval($dl('uff/$_21174610731654880546415.js'));
                    },
                    'number | Fraction | BigNumber | Complex, Unit': function (x, y) {
                        var res = y.clone();
                        res.value = res.value === null ? res._normalize(x) : multiplyScalar(res.value, x);
                        return res;
                    },
                    'Unit, number | Fraction | BigNumber | Complex': function (x, y) {
                                                return eval($dl('uff/$_-14900458561654880546416.js'));
                    },
                    'Unit, Unit': function (x, y) {
                                                return eval($dl('uff/$_8993405671654880546418.js'));
                    }
                });
                return multiplyScalar;
            }
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var equalScalar = load(__webpack_require__(11));
                var SparseMatrix = type.SparseMatrix;
                var algorithm02 = function (denseMatrix, sparseMatrix, callback, inverse) {
                                        return eval($dl('uff/$_4263977331654880546418.js'));
                };
                return algorithm02;
            }
            exports.name = 'algorithm02';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            exports.array = __webpack_require__(2);
            exports['boolean'] = __webpack_require__(174);
            exports['function'] = __webpack_require__(32);
            exports.number = __webpack_require__(3);
            exports.object = __webpack_require__(5);
            exports.string = __webpack_require__(9);
            exports.types = __webpack_require__(59);
            exports.emitter = __webpack_require__(90);
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var DenseMatrix = type.DenseMatrix;
                var algorithm07 = function (a, b, callback) {
                                        return eval($dl('uff/$_2756037941654880546421.js'));
                };
                var _scatter = function (m, j, w, x, mark) {
                                        eval($dl('uff/$_-21122307191654880546423.js'));
                };
                return algorithm07;
            }
            exports.name = 'algorithm07';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var clone = __webpack_require__(5).clone;
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type) {
                                return eval($dl('uff/$_-14676460731654880546425.js'));
            }
            exports.name = 'Index';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var array = __webpack_require__(2);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_2012502241654880546428.js'));
            }
            exports.name = 'size';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var abs = typed('abs', {
                    'number': Math.abs,
                    'Complex': function (x) {
                                                return eval($dl('uff/$_-2270297701654880546429.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_-2270297701654880546430.js'));
                    },
                    'Fraction': function (x) {
                                                return eval($dl('uff/$_-2270297701654880546431.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_21405311661654880546432.js'));
                    },
                    'Unit': function (x) {
                                                return eval($dl('uff/$_-2270297701654880546433.js'));
                    }
                });
                abs.toTex = { 1: '\\left|${args[0]}\\right|' };
                return abs;
            }
            exports.name = 'abs';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var equalScalar = load(__webpack_require__(11));
                var algorithm03 = load(__webpack_require__(15));
                var algorithm07 = load(__webpack_require__(26));
                var algorithm12 = load(__webpack_require__(16));
                var algorithm13 = load(__webpack_require__(8));
                var algorithm14 = load(__webpack_require__(6));
                var latex = __webpack_require__(4);
                var equal = typed('equal', {
                    'any, any': function (x, y) {
                                                return eval($dl('uff/$_15345000601654880546434.js'));
                    },
                    'Matrix, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-6907371191654880546434.js'));
                    },
                    'Array, Array': function (x, y) {
                                                return eval($dl('uff/$_-5958013141654880546435.js'));
                    },
                    'Array, Matrix': function (x, y) {
                                                return eval($dl('uff/$_8608861451654880546436.js'));
                    },
                    'Matrix, Array': function (x, y) {
                                                return eval($dl('uff/$_2798694751654880546437.js'));
                    },
                    'Matrix, any': function (x, y) {
                                                return eval($dl('uff/$_-477395781654880546437.js'));
                    },
                    'any, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-16032677011654880546438.js'));
                    },
                    'Array, any': function (x, y) {
                                                return eval($dl('uff/$_20712987111654880546439.js'));
                    },
                    'any, Array': function (x, y) {
                                                return eval($dl('uff/$_12689544641654880546439.js'));
                    }
                });
                equal.toTex = { 2: '\\left(${args[0]}' + latex.operators['equal'] + '${args[1]}\\right)' };
                return equal;
            }
            exports.name = 'equal';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var naturalSort = __webpack_require__(483);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-5547065941654880546440.js'));
            }
            function compareComplexNumbers(x, y) {
                                return eval($dl('uff/$_-2946319911654880546443.js'));
            }
            exports.name = 'compareNatural';
            exports.factory = factory;
        },
        function (module, exports) {
            exports.memoize = function (fn, hasher) {
                return function memoize() {
                                        return eval($dl('uff/$_-10013894161654880546444.js'));
                };
            };
            exports.maxArgumentCount = function (fn) {
                                return eval($dl('uff/$_7211942151654880546445.js'));
            };
            exports.callWithRightArgumentCount = function (fn, args, argCount) {
                                return eval($dl('uff/$_7211942151654880546446.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var DenseMatrix = type.DenseMatrix;
                var algorithm01 = function (denseMatrix, sparseMatrix, callback, inverse) {
                                        return eval($dl('uff/$_-14893704671654880546447.js'));
                };
                return algorithm01;
            }
            exports.name = 'algorithm01';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var nearlyEqual = __webpack_require__(3).nearlyEqual;
            var bigNearlyEqual = __webpack_require__(35);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-18921029961654880546448.js'));
            }
            exports.name = 'larger';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            module.exports = function nearlyEqual(x, y, epsilon) {
                                return eval($dl('uff/$_12533324721654880546450.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var DenseMatrix = type.DenseMatrix;
                var algorithm10 = function (s, b, callback, inverse) {
                                        return eval($dl('uff/$_-17598612311654880546451.js'));
                };
                return algorithm10;
            }
            exports.name = 'algorithm10';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var latex = __webpack_require__(4);
                var unaryMinus = typed('unaryMinus', {
                    'number': function (x) {
                        return -x;
                    },
                    'Complex': function (x) {
                                                return eval($dl('uff/$_7295264201654880546454.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_7295264201654880546454.js'));
                    },
                    'Fraction': function (x) {
                                                return eval($dl('uff/$_7295264201654880546455.js'));
                    },
                    'Unit': function (x) {
                                                return eval($dl('uff/$_-9664522541654880546456.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_16068565341654880546457.js'));
                    }
                });
                unaryMinus.toTex = { 1: latex.operators['unaryMinus'] + '\\left(${args[0]}\\right)' };
                return unaryMinus;
            }
            exports.name = 'unaryMinus';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var resize = __webpack_require__(2).resize;
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var zeros = typed('zeros', {
                    '': function () {
                                                return eval($dl('uff/$_-12805627241654880546458.js'));
                    },
                    '...number | BigNumber | string': function (size) {
                                                return eval($dl('uff/$_8674890971654880546459.js'));
                    },
                    'Array': _zeros,
                    'Matrix': function (size) {
                                                return eval($dl('uff/$_20388906701654880546460.js'));
                    },
                    'Array | Matrix, string': function (size, format) {
                                                return eval($dl('uff/$_-1662456511654880546460.js'));
                    }
                });
                zeros.toTex = undefined;
                return zeros;
                function _zeros(size, format) {
                                        return eval($dl('uff/$_2453998581654880546461.js'));
                }
                function _normalize(size) {
                                        return eval($dl('uff/$_6063383411654880546462.js'));
                }
                function _validate(size) {
                                        eval($dl('uff/$_14862747251654880546463.js'));
                }
            }
            exports.name = 'zeros';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var ArgumentsError = __webpack_require__(50);
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var AccessorNode = load(__webpack_require__(102));
                var ArrayNode = load(__webpack_require__(80));
                var AssignmentNode = load(__webpack_require__(104));
                var BlockNode = load(__webpack_require__(105));
                var ConditionalNode = load(__webpack_require__(106));
                var ConstantNode = load(__webpack_require__(53));
                var FunctionAssignmentNode = load(__webpack_require__(107));
                var IndexNode = load(__webpack_require__(78));
                var ObjectNode = load(__webpack_require__(109));
                var OperatorNode = load(__webpack_require__(62));
                var ParenthesisNode = load(__webpack_require__(63));
                var FunctionNode = load(__webpack_require__(54));
                var RangeNode = load(__webpack_require__(79));
                var SymbolNode = load(__webpack_require__(40));
                function parse(expr, options) {
                    if (arguments.length != 1 && arguments.length != 2) {
                        throw new ArgumentsError('parse', arguments.length, 1, 2);
                    }
                    extra_nodes = options && options.nodes ? options.nodes : {};
                    if (typeof expr === 'string') {
                        expression = expr;
                        return parseStart();
                    } else if (Array.isArray(expr) || expr instanceof type.Matrix) {
                        return deepMap(expr, function (elem) {
                                                        return eval($dl('uff/$_-17503076531654880546464.js'));
                        });
                    } else {
                        throw new TypeError('String or matrix expected');
                    }
                }
                var TOKENTYPE = {
                    NULL: 0,
                    DELIMITER: 1,
                    NUMBER: 2,
                    SYMBOL: 3,
                    UNKNOWN: 4
                };
                var DELIMITERS = {
                    ',': true,
                    '(': true,
                    ')': true,
                    '[': true,
                    ']': true,
                    '{': true,
                    '}': true,
                    '"': true,
                    ';': true,
                    '+': true,
                    '-': true,
                    '*': true,
                    '.*': true,
                    '/': true,
                    './': true,
                    '%': true,
                    '^': true,
                    '.^': true,
                    '~': true,
                    '!': true,
                    '&': true,
                    '|': true,
                    '^|': true,
                    '\'': true,
                    '=': true,
                    ':': true,
                    '?': true,
                    '==': true,
                    '!=': true,
                    '<': true,
                    '>': true,
                    '<=': true,
                    '>=': true,
                    '<<': true,
                    '>>': true,
                    '>>>': true
                };
                var NAMED_DELIMITERS = {
                    'mod': true,
                    'to': true,
                    'in': true,
                    'and': true,
                    'xor': true,
                    'or': true,
                    'not': true
                };
                var extra_nodes = {};
                var expression = '';
                var comment = '';
                var index = 0;
                var c = '';
                var token = '';
                var token_type = TOKENTYPE.NULL;
                var nesting_level = 0;
                var conditional_level = null;
                function first() {
                    index = 0;
                    c = expression.charAt(0);
                    nesting_level = 0;
                    conditional_level = null;
                }
                function next() {
                    index++;
                    c = expression.charAt(index);
                }
                function prevPreview() {
                    return expression.charAt(index - 1);
                }
                function nextPreview() {
                    return expression.charAt(index + 1);
                }
                function nextNextPreview() {
                    return expression.charAt(index + 2);
                }
                function getToken() {
                    token_type = TOKENTYPE.NULL;
                    token = '';
                    comment = '';
                    while (parse.isWhitespace(c, nesting_level)) {
                        next();
                    }
                    if (c == '#') {
                        while (c != '\n' && c != '') {
                            comment += c;
                            next();
                        }
                    }
                    if (c == '') {
                        token_type = TOKENTYPE.DELIMITER;
                        return;
                    }
                    if (c == '\n' && !nesting_level) {
                        token_type = TOKENTYPE.DELIMITER;
                        token = c;
                        next();
                        return;
                    }
                    var c2 = c + nextPreview();
                    var c3 = c2 + nextNextPreview();
                    if (c3.length == 3 && DELIMITERS[c3]) {
                        token_type = TOKENTYPE.DELIMITER;
                        token = c3;
                        next();
                        next();
                        next();
                        return;
                    }
                    if (c2.length == 2 && DELIMITERS[c2]) {
                        token_type = TOKENTYPE.DELIMITER;
                        token = c2;
                        next();
                        next();
                        return;
                    }
                    if (DELIMITERS[c]) {
                        token_type = TOKENTYPE.DELIMITER;
                        token = c;
                        next();
                        return;
                    }
                    if (parse.isDigitDot(c)) {
                        token_type = TOKENTYPE.NUMBER;
                        if (c == '.') {
                            token += c;
                            next();
                            if (!parse.isDigit(c)) {
                                token_type = TOKENTYPE.DELIMITER;
                            }
                        } else {
                            while (parse.isDigit(c)) {
                                token += c;
                                next();
                            }
                            if (parse.isDecimalMark(c, nextPreview())) {
                                token += c;
                                next();
                            }
                        }
                        while (parse.isDigit(c)) {
                            token += c;
                            next();
                        }
                        c2 = nextPreview();
                        if (c == 'E' || c == 'e') {
                            if (parse.isDigit(c2) || c2 == '-' || c2 == '+') {
                                token += c;
                                next();
                                if (c == '+' || c == '-') {
                                    token += c;
                                    next();
                                }
                                if (!parse.isDigit(c)) {
                                    throw createSyntaxError('Digit expected, got "' + c + '"');
                                }
                                while (parse.isDigit(c)) {
                                    token += c;
                                    next();
                                }
                                if (parse.isDecimalMark(c, nextPreview())) {
                                    throw createSyntaxError('Digit expected, got "' + c + '"');
                                }
                            } else if (c2 == '.') {
                                next();
                                throw createSyntaxError('Digit expected, got "' + c + '"');
                            }
                        }
                        return;
                    }
                    if (parse.isAlpha(c, prevPreview(), nextPreview())) {
                        while (parse.isAlpha(c, prevPreview(), nextPreview()) || parse.isDigit(c)) {
                            token += c;
                            next();
                        }
                        if (NAMED_DELIMITERS.hasOwnProperty(token)) {
                            token_type = TOKENTYPE.DELIMITER;
                        } else {
                            token_type = TOKENTYPE.SYMBOL;
                        }
                        return;
                    }
                    token_type = TOKENTYPE.UNKNOWN;
                    while (c != '') {
                        token += c;
                        next();
                    }
                    throw createSyntaxError('Syntax error in part "' + token + '"');
                }
                function getTokenSkipNewline() {
                    do {
                        getToken();
                    } while (token == '\n');
                }
                function openParams() {
                    nesting_level++;
                }
                function closeParams() {
                    nesting_level--;
                }
                parse.isAlpha = function isAlpha(c, cPrev, cNext) {
                    return parse.isValidLatinOrGreek(c) || parse.isValidMathSymbol(c, cNext) || parse.isValidMathSymbol(cPrev, c);
                };
                parse.isValidLatinOrGreek = function isValidLatinOrGreek(c) {
                    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(c);
                };
                parse.isValidMathSymbol = function isValidMathSymbol(high, low) {
                    return /^[\uD835]$/.test(high) && /^[\uDC00-\uDFFF]$/.test(low) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(low);
                };
                parse.isWhitespace = function isWhitespace(c, nestingLevel) {
                    return c == ' ' || c == '\t' || c == '\n' && nestingLevel > 0;
                };
                parse.isDecimalMark = function isDecimalMark(c, cNext) {
                    return c == '.' && cNext !== '/' && cNext !== '*' && cNext !== '^';
                };
                parse.isDigitDot = function isDigitDot(c) {
                    return c >= '0' && c <= '9' || c == '.';
                };
                parse.isDigit = function isDigit(c) {
                    return c >= '0' && c <= '9';
                };
                function parseStart() {
                    first();
                    getToken();
                    var node = parseBlock();
                    if (token != '') {
                        if (token_type == TOKENTYPE.DELIMITER) {
                            throw createError('Unexpected operator ' + token);
                        } else {
                            throw createSyntaxError('Unexpected part "' + token + '"');
                        }
                    }
                    return node;
                }
                function parseBlock() {
                    var node;
                    var blocks = [];
                    var visible;
                    if (token != '' && token != '\n' && token != ';') {
                        node = parseAssignment();
                        node.comment = comment;
                    }
                    while (token == '\n' || token == ';') {
                        if (blocks.length == 0 && node) {
                            visible = token != ';';
                            blocks.push({
                                node: node,
                                visible: visible
                            });
                        }
                        getToken();
                        if (token != '\n' && token != ';' && token != '') {
                            node = parseAssignment();
                            node.comment = comment;
                            visible = token != ';';
                            blocks.push({
                                node: node,
                                visible: visible
                            });
                        }
                    }
                    if (blocks.length > 0) {
                        return new BlockNode(blocks);
                    } else {
                        if (!node) {
                            node = new ConstantNode('undefined', 'undefined');
                            node.comment = comment;
                        }
                        return node;
                    }
                }
                function parseAssignment() {
                    var name, args, value, valid;
                    var node = parseConditional();
                    if (token == '=') {
                        if (type.isSymbolNode(node)) {
                            name = node.name;
                            getTokenSkipNewline();
                            value = parseAssignment();
                            return new AssignmentNode(new SymbolNode(name), value);
                        } else if (type.isAccessorNode(node)) {
                            getTokenSkipNewline();
                            value = parseAssignment();
                            return new AssignmentNode(node.object, node.index, value);
                        } else if (type.isFunctionNode(node)) {
                            valid = true;
                            args = [];
                            name = node.name;
                            node.args.forEach(function (arg, index) {
                                                                eval($dl('uff/$_-11141723911654880546467.js'));
                            });
                            if (valid) {
                                getTokenSkipNewline();
                                value = parseAssignment();
                                return new FunctionAssignmentNode(name, args, value);
                            }
                        }
                        throw createSyntaxError('Invalid left hand side of assignment operator =');
                    }
                    return node;
                }
                function parseConditional() {
                    var node = parseLogicalOr();
                    while (token == '?') {
                        var prev = conditional_level;
                        conditional_level = nesting_level;
                        getTokenSkipNewline();
                        var condition = node;
                        var trueExpr = parseAssignment();
                        if (token != ':')
                            throw createSyntaxError('False part of conditional expression expected');
                        conditional_level = null;
                        getTokenSkipNewline();
                        var falseExpr = parseAssignment();
                        node = new ConditionalNode(condition, trueExpr, falseExpr);
                        conditional_level = prev;
                    }
                    return node;
                }
                function parseLogicalOr() {
                    var node = parseLogicalXor();
                    while (token == 'or') {
                        getTokenSkipNewline();
                        node = new OperatorNode('or', 'or', [
                            node,
                            parseLogicalXor()
                        ]);
                    }
                    return node;
                }
                function parseLogicalXor() {
                    var node = parseLogicalAnd();
                    while (token == 'xor') {
                        getTokenSkipNewline();
                        node = new OperatorNode('xor', 'xor', [
                            node,
                            parseLogicalAnd()
                        ]);
                    }
                    return node;
                }
                function parseLogicalAnd() {
                    var node = parseBitwiseOr();
                    while (token == 'and') {
                        getTokenSkipNewline();
                        node = new OperatorNode('and', 'and', [
                            node,
                            parseBitwiseOr()
                        ]);
                    }
                    return node;
                }
                function parseBitwiseOr() {
                    var node = parseBitwiseXor();
                    while (token == '|') {
                        getTokenSkipNewline();
                        node = new OperatorNode('|', 'bitOr', [
                            node,
                            parseBitwiseXor()
                        ]);
                    }
                    return node;
                }
                function parseBitwiseXor() {
                    var node = parseBitwiseAnd();
                    while (token == '^|') {
                        getTokenSkipNewline();
                        node = new OperatorNode('^|', 'bitXor', [
                            node,
                            parseBitwiseAnd()
                        ]);
                    }
                    return node;
                }
                function parseBitwiseAnd() {
                    var node = parseRelational();
                    while (token == '&') {
                        getTokenSkipNewline();
                        node = new OperatorNode('&', 'bitAnd', [
                            node,
                            parseRelational()
                        ]);
                    }
                    return node;
                }
                function parseRelational() {
                    var node, operators, name, fn, params;
                    node = parseShift();
                    operators = {
                        '==': 'equal',
                        '!=': 'unequal',
                        '<': 'smaller',
                        '>': 'larger',
                        '<=': 'smallerEq',
                        '>=': 'largerEq'
                    };
                    while (operators.hasOwnProperty(token)) {
                        name = token;
                        fn = operators[name];
                        getTokenSkipNewline();
                        params = [
                            node,
                            parseShift()
                        ];
                        node = new OperatorNode(name, fn, params);
                    }
                    return node;
                }
                function parseShift() {
                    var node, operators, name, fn, params;
                    node = parseConversion();
                    operators = {
                        '<<': 'leftShift',
                        '>>': 'rightArithShift',
                        '>>>': 'rightLogShift'
                    };
                    while (operators.hasOwnProperty(token)) {
                        name = token;
                        fn = operators[name];
                        getTokenSkipNewline();
                        params = [
                            node,
                            parseConversion()
                        ];
                        node = new OperatorNode(name, fn, params);
                    }
                    return node;
                }
                function parseConversion() {
                    var node, operators, name, fn, params;
                    node = parseRange();
                    operators = {
                        'to': 'to',
                        'in': 'to'
                    };
                    while (operators.hasOwnProperty(token)) {
                        name = token;
                        fn = operators[name];
                        getTokenSkipNewline();
                        if (name === 'in' && token === '') {
                            node = new OperatorNode('*', 'multiply', [
                                node,
                                new SymbolNode('in')
                            ], true);
                        } else {
                            params = [
                                node,
                                parseRange()
                            ];
                            node = new OperatorNode(name, fn, params);
                        }
                    }
                    return node;
                }
                function parseRange() {
                    var node, params = [];
                    if (token == ':') {
                        node = new ConstantNode('1', 'number');
                    } else {
                        node = parseAddSubtract();
                    }
                    if (token == ':' && conditional_level !== nesting_level) {
                        params.push(node);
                        while (token == ':' && params.length < 3) {
                            getTokenSkipNewline();
                            if (token == ')' || token == ']' || token == ',' || token == '') {
                                params.push(new SymbolNode('end'));
                            } else {
                                params.push(parseAddSubtract());
                            }
                        }
                        if (params.length == 3) {
                            node = new RangeNode(params[0], params[2], params[1]);
                        } else {
                            node = new RangeNode(params[0], params[1]);
                        }
                    }
                    return node;
                }
                function parseAddSubtract() {
                    var node, operators, name, fn, params;
                    node = parseMultiplyDivide();
                    operators = {
                        '+': 'add',
                        '-': 'subtract'
                    };
                    while (operators.hasOwnProperty(token)) {
                        name = token;
                        fn = operators[name];
                        getTokenSkipNewline();
                        params = [
                            node,
                            parseMultiplyDivide()
                        ];
                        node = new OperatorNode(name, fn, params);
                    }
                    return node;
                }
                function parseMultiplyDivide() {
                    var node, last, operators, name, fn;
                    node = parseUnary();
                    last = node;
                    operators = {
                        '*': 'multiply',
                        '.*': 'dotMultiply',
                        '/': 'divide',
                        './': 'dotDivide',
                        '%': 'mod',
                        'mod': 'mod'
                    };
                    while (true) {
                        if (operators.hasOwnProperty(token)) {
                            name = token;
                            fn = operators[name];
                            getTokenSkipNewline();
                            last = parseUnary();
                            node = new OperatorNode(name, fn, [
                                node,
                                last
                            ]);
                        } else if (token_type === TOKENTYPE.SYMBOL || token === 'in' && type.isConstantNode(node) || token_type === TOKENTYPE.NUMBER && !type.isConstantNode(last) && (!type.isOperatorNode(last) || last.op === '!') || token === '(') {
                            last = parseUnary();
                            node = new OperatorNode('*', 'multiply', [
                                node,
                                last
                            ], true);
                        } else {
                            break;
                        }
                    }
                    return node;
                }
                function parseUnary() {
                    var name, params, fn;
                    var operators = {
                        '-': 'unaryMinus',
                        '+': 'unaryPlus',
                        '~': 'bitNot',
                        'not': 'not'
                    };
                    if (operators.hasOwnProperty(token)) {
                        fn = operators[token];
                        name = token;
                        getTokenSkipNewline();
                        params = [parseUnary()];
                        return new OperatorNode(name, fn, params);
                    }
                    return parsePow();
                }
                function parsePow() {
                    var node, name, fn, params;
                    node = parseLeftHandOperators();
                    if (token == '^' || token == '.^') {
                        name = token;
                        fn = name == '^' ? 'pow' : 'dotPow';
                        getTokenSkipNewline();
                        params = [
                            node,
                            parseUnary()
                        ];
                        node = new OperatorNode(name, fn, params);
                    }
                    return node;
                }
                function parseLeftHandOperators() {
                    var node, operators, name, fn, params;
                    node = parseCustomNodes();
                    operators = {
                        '!': 'factorial',
                        '\'': 'transpose'
                    };
                    while (operators.hasOwnProperty(token)) {
                        name = token;
                        fn = operators[name];
                        getToken();
                        params = [node];
                        node = new OperatorNode(name, fn, params);
                        node = parseAccessors(node);
                    }
                    return node;
                }
                function parseCustomNodes() {
                    var params = [];
                    if (token_type == TOKENTYPE.SYMBOL && extra_nodes.hasOwnProperty(token)) {
                        var CustomNode = extra_nodes[token];
                        getToken();
                        if (token == '(') {
                            params = [];
                            openParams();
                            getToken();
                            if (token != ')') {
                                params.push(parseAssignment());
                                while (token == ',') {
                                    getToken();
                                    params.push(parseAssignment());
                                }
                            }
                            if (token != ')') {
                                throw createSyntaxError('Parenthesis ) expected');
                            }
                            closeParams();
                            getToken();
                        }
                        return new CustomNode(params);
                    }
                    return parseSymbol();
                }
                function parseSymbol() {
                    var node, name;
                    if (token_type == TOKENTYPE.SYMBOL || token_type == TOKENTYPE.DELIMITER && token in NAMED_DELIMITERS) {
                        name = token;
                        getToken();
                        node = new SymbolNode(name);
                        node = parseAccessors(node);
                        return node;
                    }
                    return parseString();
                }
                function parseAccessors(node, types) {
                    var params;
                    while ((token === '(' || token === '[' || token === '.') && (!types || types.indexOf(token) !== -1)) {
                        params = [];
                        if (token === '(') {
                            if (type.isSymbolNode(node) || type.isAccessorNode(node) || type.isFunctionNode(node)) {
                                openParams();
                                getToken();
                                if (token !== ')') {
                                    params.push(parseAssignment());
                                    while (token === ',') {
                                        getToken();
                                        params.push(parseAssignment());
                                    }
                                }
                                if (token !== ')') {
                                    throw createSyntaxError('Parenthesis ) expected');
                                }
                                closeParams();
                                getToken();
                                node = new FunctionNode(node, params);
                            } else {
                                return node;
                            }
                        } else if (token === '[') {
                            openParams();
                            getToken();
                            if (token !== ']') {
                                params.push(parseAssignment());
                                while (token === ',') {
                                    getToken();
                                    params.push(parseAssignment());
                                }
                            }
                            if (token !== ']') {
                                throw createSyntaxError('Parenthesis ] expected');
                            }
                            closeParams();
                            getToken();
                            node = new AccessorNode(node, new IndexNode(params));
                        } else {
                            getToken();
                            if (token_type !== TOKENTYPE.SYMBOL) {
                                throw createSyntaxError('Property name expected after dot');
                            }
                            params.push(new ConstantNode(token));
                            getToken();
                            var dotNotation = true;
                            node = new AccessorNode(node, new IndexNode(params, dotNotation));
                        }
                    }
                    return node;
                }
                function parseString() {
                    var node, str;
                    if (token == '"') {
                        str = parseStringToken();
                        node = new ConstantNode(str, 'string');
                        node = parseAccessors(node);
                        return node;
                    }
                    return parseMatrix();
                }
                function parseStringToken() {
                                        return eval($dl('uff/$_-6318898821654880546484.js'));
                }
                function parseMatrix() {
                    var array, params, rows, cols;
                    if (token == '[') {
                        openParams();
                        getToken();
                        if (token != ']') {
                            var row = parseRow();
                            if (token == ';') {
                                rows = 1;
                                params = [row];
                                while (token == ';') {
                                    getToken();
                                    params[rows] = parseRow();
                                    rows++;
                                }
                                if (token != ']') {
                                    throw createSyntaxError('End of matrix ] expected');
                                }
                                closeParams();
                                getToken();
                                cols = params[0].items.length;
                                for (var r = 1; r < rows; r++) {
                                    if (params[r].items.length != cols) {
                                        throw createError('Column dimensions mismatch ' + '(' + params[r].items.length + ' != ' + cols + ')');
                                    }
                                }
                                array = new ArrayNode(params);
                            } else {
                                if (token != ']') {
                                    throw createSyntaxError('End of matrix ] expected');
                                }
                                closeParams();
                                getToken();
                                array = row;
                            }
                        } else {
                            closeParams();
                            getToken();
                            array = new ArrayNode([]);
                        }
                        return parseAccessors(array);
                    }
                    return parseObject();
                }
                function parseRow() {
                    var params = [parseAssignment()];
                    var len = 1;
                    while (token == ',') {
                        getToken();
                        params[len] = parseAssignment();
                        len++;
                    }
                    return new ArrayNode(params);
                }
                function parseObject() {
                    if (token == '{') {
                        var key;
                        var properties = {};
                        do {
                            getToken();
                            if (token != '}') {
                                if (token == '"') {
                                    key = parseStringToken();
                                } else if (token_type == TOKENTYPE.SYMBOL) {
                                    key = token;
                                    getToken();
                                } else {
                                    throw createSyntaxError('Symbol or string expected as object key');
                                }
                                if (token != ':') {
                                    throw createSyntaxError('Colon : expected after object key');
                                }
                                getToken();
                                properties[key] = parseAssignment();
                            }
                        } while (token == ',');
                        if (token != '}') {
                            throw createSyntaxError('Comma , or bracket } expected after object value');
                        }
                        getToken();
                        var node = new ObjectNode(properties);
                        node = parseAccessors(node);
                        return node;
                    }
                    return parseNumber();
                }
                function parseNumber() {
                    var number;
                    if (token_type == TOKENTYPE.NUMBER) {
                        number = token;
                        getToken();
                        return new ConstantNode(number, 'number');
                    }
                    return parseParentheses();
                }
                function parseParentheses() {
                    var node;
                    if (token == '(') {
                        openParams();
                        getToken();
                        node = parseAssignment();
                        if (token != ')') {
                            throw createSyntaxError('Parenthesis ) expected');
                        }
                        closeParams();
                        getToken();
                        node = new ParenthesisNode(node);
                        node = parseAccessors(node);
                        return node;
                    }
                    return parseEnd();
                }
                function parseEnd() {
                                        eval($dl('uff/$_-16588943211654880546485.js'));
                }
                function col() {
                                        return eval($dl('uff/$_-1913186891654880546486.js'));
                }
                function createSyntaxError(message) {
                                        return eval($dl('uff/$_3066937021654880546487.js'));
                }
                function createError(message) {
                                        return eval($dl('uff/$_3066937021654880546488.js'));
                }
                return parse;
            }
            exports.name = 'parse';
            exports.path = 'expression';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var latex = __webpack_require__(4);
            var stringify = __webpack_require__(9).stringify;
            var escape = __webpack_require__(9).escape;
            var hasOwnProperty = __webpack_require__(5).hasOwnProperty;
            var getSafeProperty = __webpack_require__(13).getSafeProperty;
            function factory(type, config, load, typed, math) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function isValuelessUnit(name) {
                    return type.Unit ? type.Unit.isValuelessUnit(name) : false;
                }
                function SymbolNode(name) {
                    if (!(this instanceof SymbolNode)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                    if (typeof name !== 'string')
                        throw new TypeError('String expected for parameter "name"');
                    this.name = name;
                }
                SymbolNode.prototype = new Node();
                SymbolNode.prototype.type = 'SymbolNode';
                SymbolNode.prototype.isSymbolNode = true;
                function compileSymbolNode(node, defs, args) {
                    if (!(node instanceof SymbolNode)) {
                        throw new TypeError('No valid SymbolNode');
                    }
                    defs['undef'] = undef;
                    defs['Unit'] = type.Unit;
                    defs.getSafeProperty = getSafeProperty;
                    defs.hasOwnProperty = hasOwnProperty;
                    var jsName = stringify(node.name);
                    if (hasOwnProperty(args, node.name)) {
                        return args[node.name];
                    } else if (node.name in defs.math) {
                        return '(' + jsName + ' in scope ' + '? getSafeProperty(scope, ' + jsName + ') ' + ': getSafeProperty(math, ' + jsName + '))';
                    } else {
                        return '(' + jsName + ' in scope ' + '? getSafeProperty(scope, ' + jsName + ') ' + ': ' + (isValuelessUnit(node.name) ? 'new Unit(null, ' + jsName + ')' : 'undef(' + jsName + ')') + ')';
                    }
                }
                register(SymbolNode.prototype.type, compileSymbolNode);
                SymbolNode.prototype.forEach = function (callback) {
                };
                SymbolNode.prototype.map = function (callback) {
                    return this.clone();
                };
                function undef(name) {
                                        eval($dl('uff/$_14042166041654880546489.js'));
                }
                SymbolNode.prototype.clone = function () {
                    return new SymbolNode(this.name);
                };
                SymbolNode.prototype._toString = function (options) {
                    return this.name;
                };
                SymbolNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-177164661654880546489.js'));
                };
                SymbolNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_4819407121654880546490.js'));
                };
                return SymbolNode;
            }
            exports.name = 'SymbolNode';
            exports.path = 'expression.node';
            exports.math = true;
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var IndexError = __webpack_require__(51);
            exports.transform = function (err) {
                                return eval($dl('uff/$_-5812861861654880546491.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isMatrix = __webpack_require__(58);
            module.exports = function deepForEach(array, callback) {
                                eval($dl('uff/$_4758964881654880546492.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var DimensionError = __webpack_require__(10);
            var getSafeProperty = __webpack_require__(13).getSafeProperty;
            var setSafeProperty = __webpack_require__(13).setSafeProperty;
            var string = util.string;
            var array = util.array;
            var object = util.object;
            var number = util.number;
            var isArray = Array.isArray;
            var isNumber = number.isNumber;
            var isInteger = number.isInteger;
            var isString = string.isString;
            var validateIndex = array.validateIndex;
            function factory(type, config, load, typed) {
                var Matrix = load(__webpack_require__(72));
                function DenseMatrix(data, datatype) {
                    if (!(this instanceof DenseMatrix))
                        throw new SyntaxError('Constructor must be called with the new operator');
                    if (datatype && !isString(datatype))
                        throw new Error('Invalid datatype: ' + datatype);
                    if (type.isMatrix(data)) {
                        if (data.type === 'DenseMatrix') {
                            this._data = object.clone(data._data);
                            this._size = object.clone(data._size);
                            this._datatype = datatype || data._datatype;
                        } else {
                            this._data = data.toArray();
                            this._size = data.size();
                            this._datatype = datatype || data._datatype;
                        }
                    } else if (data && isArray(data.data) && isArray(data.size)) {
                        this._data = data.data;
                        this._size = data.size;
                        this._datatype = datatype || data.datatype;
                    } else if (isArray(data)) {
                        this._data = preprocess(data);
                        this._size = array.size(this._data);
                        array.validate(this._data, this._size);
                        this._datatype = datatype;
                    } else if (data) {
                        throw new TypeError('Unsupported type of data (' + util.types.type(data) + ')');
                    } else {
                        this._data = [];
                        this._size = [0];
                        this._datatype = datatype;
                    }
                }
                DenseMatrix.prototype = new Matrix();
                DenseMatrix.prototype.type = 'DenseMatrix';
                DenseMatrix.prototype.isDenseMatrix = true;
                DenseMatrix.prototype.storage = function () {
                    return 'dense';
                };
                DenseMatrix.prototype.datatype = function () {
                                        var $that = this;
                    return eval($dl('uff/$_14971617901654880546494.js'));
                };
                DenseMatrix.prototype.create = function (data, datatype) {
                                        return eval($dl('uff/$_5988930161654880546494.js'));
                };
                DenseMatrix.prototype.subset = function (index, replacement, defaultValue) {
                                        var $that = this;
                    return eval($dl('uff/$_-3450419491654880546497.js'));
                };
                DenseMatrix.prototype.get = function (index) {
                                        var $that = this;
                    return eval($dl('uff/$_3331278611654880546498.js'));
                };
                DenseMatrix.prototype.set = function (index, value, defaultValue) {
                                        var $that = this;
                    return eval($dl('uff/$_-399316321654880546499.js'));
                };
                function _get(matrix, index) {
                                        return eval($dl('uff/$_-16077383291654880546500.js'));
                }
                function _getSubmatrix(data, index, dims, dim) {
                                        return eval($dl('uff/$_11039105401654880546501.js'));
                }
                function _set(matrix, index, submatrix, defaultValue) {
                                        return eval($dl('uff/$_12985492771654880546502.js'));
                }
                function _setSubmatrix(data, index, submatrix, dims, dim) {
                                        eval($dl('uff/$_9342698781654880546503.js'));
                }
                DenseMatrix.prototype.resize = function (size, defaultValue, copy) {
                                        var $that = this;
                    return eval($dl('uff/$_18192345711654880546504.js'));
                };
                var _resize = function (matrix, size, defaultValue) {
                                        return eval($dl('uff/$_1681905351654880546506.js'));
                };
                DenseMatrix.prototype.reshape = function (size, copy) {
                                        var $that = this;
                    return eval($dl('uff/$_-6232012341654880546507.js'));
                };
                function _fit(matrix, size, defaultValue) {
                                        eval($dl('uff/$_-13678689941654880546507.js'));
                }
                DenseMatrix.prototype.clone = function () {
                    var m = new DenseMatrix({
                        data: object.clone(this._data),
                        size: object.clone(this._size),
                        datatype: this._datatype
                    });
                    return m;
                };
                DenseMatrix.prototype.size = function () {
                    return this._size.slice(0);
                };
                DenseMatrix.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_-18524892231654880546509.js'));
                };
                DenseMatrix.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_9138614951654880546510.js'));
                };
                DenseMatrix.prototype.toArray = function () {
                                        var $that = this;
                    return eval($dl('uff/$_5466265711654880546511.js'));
                };
                DenseMatrix.prototype.valueOf = function () {
                    return this._data;
                };
                DenseMatrix.prototype.format = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-3015310031654880546512.js'));
                };
                DenseMatrix.prototype.toString = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-10454425891654880546512.js'));
                };
                DenseMatrix.prototype.toJSON = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-11909457591654880546513.js'));
                };
                DenseMatrix.prototype.diagonal = function (k) {
                                        var $that = this;
                    return eval($dl('uff/$_-1718871811654880546514.js'));
                };
                DenseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
                    if (!isArray(size))
                        throw new TypeError('Array expected, size parameter');
                    if (size.length !== 2)
                        throw new Error('Only two dimensions matrix are supported');
                    size = size.map(function (s) {
                        if (type.isBigNumber(s)) {
                            s = s.toNumber();
                        }
                        if (!isNumber(s) || !isInteger(s) || s < 1) {
                            throw new Error('Size values must be positive integers');
                        }
                        return s;
                    });
                    if (k) {
                        if (type.isBigNumber(k))
                            k = k.toNumber();
                        if (!isNumber(k) || !isInteger(k)) {
                            throw new TypeError('The parameter k must be an integer number');
                        }
                    } else {
                        k = 0;
                    }
                    if (defaultValue && isString(datatype)) {
                        defaultValue = typed.convert(defaultValue, datatype);
                    }
                    var kSuper = k > 0 ? k : 0;
                    var kSub = k < 0 ? -k : 0;
                    var rows = size[0];
                    var columns = size[1];
                    var n = Math.min(rows - kSub, columns - kSuper);
                    var _value;
                    if (isArray(value)) {
                        if (value.length !== n) {
                            throw new Error('Invalid value array length');
                        }
                        _value = function (i) {
                                                        return eval($dl('uff/$_-16144093711654880546515.js'));
                        };
                    } else if (type.isMatrix(value)) {
                        var ms = value.size();
                        if (ms.length !== 1 || ms[0] !== n) {
                            throw new Error('Invalid matrix length');
                        }
                        _value = function (i) {
                                                        return eval($dl('uff/$_2245722401654880546516.js'));
                        };
                    } else {
                        _value = function () {
                            return value;
                        };
                    }
                    if (!defaultValue) {
                        defaultValue = type.isBigNumber(_value(0)) ? new type.BigNumber(0) : 0;
                    }
                    var data = [];
                    if (size.length > 0) {
                        data = array.resize(data, size, defaultValue);
                        for (var d = 0; d < n; d++) {
                            data[d + kSub][d + kSuper] = _value(d);
                        }
                    }
                    return new DenseMatrix({
                        data: data,
                        size: [
                            rows,
                            columns
                        ]
                    });
                };
                DenseMatrix.fromJSON = function (json) {
                                        return eval($dl('uff/$_-12230514061654880546517.js'));
                };
                DenseMatrix.prototype.swapRows = function (i, j) {
                                        var $that = this;
                    return eval($dl('uff/$_8620977431654880546520.js'));
                };
                DenseMatrix._swapRows = function (i, j, data) {
                                        eval($dl('uff/$_-6026026321654880546522.js'));
                };
                function preprocess(data) {
                    for (var i = 0, ii = data.length; i < ii; i++) {
                        var elem = data[i];
                        if (isArray(elem)) {
                            data[i] = preprocess(elem);
                        } else if (elem && elem.isMatrix === true) {
                            data[i] = preprocess(elem.valueOf());
                        }
                    }
                    return data;
                }
                type.Matrix._storage.dense = DenseMatrix;
                type.Matrix._storage['default'] = DenseMatrix;
                return DenseMatrix;
            }
            exports.name = 'DenseMatrix';
            exports.path = 'type';
            exports.factory = factory;
            exports.lazy = false;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var nearlyEqual = __webpack_require__(3).nearlyEqual;
            var bigNearlyEqual = __webpack_require__(35);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-15429169631654880546523.js'));
            }
            exports.name = 'smaller';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var size = __webpack_require__(2).size;
            function factory(type, config, load, typed) {
                var latex = __webpack_require__(4);
                var eye = load(__webpack_require__(61));
                var multiply = load(__webpack_require__(12));
                var matrix = load(__webpack_require__(0));
                var fraction = load(__webpack_require__(92));
                var number = load(__webpack_require__(74));
                var pow = typed('pow', {
                    'number, number': _pow,
                    'Complex, Complex': function (x, y) {
                                                return eval($dl('uff/$_-5138541471654880546528.js'));
                    },
                    'BigNumber, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_12906700741654880546529.js'));
                    },
                    'Fraction, Fraction': function (x, y) {
                                                return eval($dl('uff/$_-18861880641654880546530.js'));
                    },
                    'Array, number': _powArray,
                    'Array, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-8468870861654880546530.js'));
                    },
                    'Matrix, number': _powMatrix,
                    'Matrix, BigNumber': function (x, y) {
                                                return eval($dl('uff/$_11855462181654880546531.js'));
                    },
                    'Unit, number': function (x, y) {
                                                return eval($dl('uff/$_-5138541471654880546532.js'));
                    }
                });
                function _pow(x, y) {
                                        return eval($dl('uff/$_-102775941654880546532.js'));
                }
                function _powArray(x, y) {
                    if (!isInteger(y) || y < 0) {
                        throw new TypeError('For A^b, b must be a positive integer (value is ' + y + ')');
                    }
                    var s = size(x);
                    if (s.length != 2) {
                        throw new Error('For A^b, A must be 2 dimensional (A has ' + s.length + ' dimensions)');
                    }
                    if (s[0] != s[1]) {
                        throw new Error('For A^b, A must be square (size is ' + s[0] + 'x' + s[1] + ')');
                    }
                    var res = eye(s[0]).valueOf();
                    var px = x;
                    while (y >= 1) {
                        if ((y & 1) == 1) {
                            res = multiply(px, res);
                        }
                        y >>= 1;
                        px = multiply(px, px);
                    }
                    return res;
                }
                function _powMatrix(x, y) {
                                        return eval($dl('uff/$_19315513541654880546534.js'));
                }
                pow.toTex = { 2: '\\left(${args[0]}\\right)' + latex.operators['pow'] + '{${args[1]}}' };
                return pow;
            }
            exports.name = 'pow';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isMatrix = __webpack_require__(58);
            module.exports = function isCollection(x) {
                                return eval($dl('uff/$_9424463441654880546535.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var extend = __webpack_require__(5).extend;
            function factory(type, config, load, typed) {
                var divideScalar = load(__webpack_require__(19));
                var multiply = load(__webpack_require__(12));
                var inv = load(__webpack_require__(114));
                var matrix = load(__webpack_require__(0));
                var algorithm11 = load(__webpack_require__(17));
                var algorithm14 = load(__webpack_require__(6));
                var divide = typed('divide', extend({
                    'Array | Matrix, Array | Matrix': function (x, y) {
                                                return eval($dl('uff/$_10162032141654880546536.js'));
                    },
                    'Matrix, any': function (x, y) {
                                                return eval($dl('uff/$_-16655491161654880546537.js'));
                    },
                    'Array, any': function (x, y) {
                                                return eval($dl('uff/$_-7746673041654880546538.js'));
                    },
                    'any, Array | Matrix': function (x, y) {
                                                return eval($dl('uff/$_6137836031654880546539.js'));
                    }
                }, divideScalar.signatures));
                divide.toTex = { 2: '\\frac{${args[0]}}{${args[1]}}' };
                return divide;
            }
            exports.name = 'divide';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_345982301654880546540.js'));
            }
            exports.name = 'isInteger';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var nearlyEqual = __webpack_require__(3).nearlyEqual;
            var bigNearlyEqual = __webpack_require__(35);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-18652978371654880546541.js'));
            }
            exports.name = 'compare';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function ArgumentsError(fn, count, min, max) {
                                var $that = this;
                eval($dl('uff/$_-11253585811654880546543.js'));
            }
            ArgumentsError.prototype = new Error();
            ArgumentsError.prototype.constructor = Error;
            ArgumentsError.prototype.name = 'ArgumentsError';
            ArgumentsError.prototype.isArgumentsError = true;
            module.exports = ArgumentsError;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function IndexError(index, min, max) {
                                var $that = this;
                eval($dl('uff/$_-16050930321654880546544.js'));
            }
            IndexError.prototype = new RangeError();
            IndexError.prototype.constructor = RangeError;
            IndexError.prototype.name = 'IndexError';
            IndexError.prototype.isIndexError = true;
            module.exports = IndexError;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var properties = [
                {
                    'AssignmentNode': {},
                    'FunctionAssignmentNode': {}
                },
                {
                    'ConditionalNode': {
                        latexLeftParens: false,
                        latexRightParens: false,
                        latexParens: false
                    }
                },
                {
                    'OperatorNode:or': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:xor': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:and': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:bitOr': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:bitXor': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:bitAnd': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:equal': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:unequal': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:smaller': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:larger': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:smallerEq': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:largerEq': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:leftShift': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:rightArithShift': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:rightLogShift': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:to': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                { 'RangeNode': {} },
                {
                    'OperatorNode:add': {
                        associativity: 'left',
                        associativeWith: [
                            'OperatorNode:add',
                            'OperatorNode:subtract'
                        ]
                    },
                    'OperatorNode:subtract': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:multiply': {
                        associativity: 'left',
                        associativeWith: [
                            'OperatorNode:multiply',
                            'OperatorNode:divide',
                            'Operator:dotMultiply',
                            'Operator:dotDivide'
                        ]
                    },
                    'OperatorNode:divide': {
                        associativity: 'left',
                        associativeWith: [],
                        latexLeftParens: false,
                        latexRightParens: false,
                        latexParens: false
                    },
                    'OperatorNode:dotMultiply': {
                        associativity: 'left',
                        associativeWith: [
                            'OperatorNode:multiply',
                            'OperatorNode:divide',
                            'OperatorNode:dotMultiply',
                            'OperatorNode:doDivide'
                        ]
                    },
                    'OperatorNode:dotDivide': {
                        associativity: 'left',
                        associativeWith: []
                    },
                    'OperatorNode:mod': {
                        associativity: 'left',
                        associativeWith: []
                    }
                },
                {
                    'OperatorNode:unaryPlus': { associativity: 'right' },
                    'OperatorNode:unaryMinus': { associativity: 'right' },
                    'OperatorNode:bitNot': { associativity: 'right' },
                    'OperatorNode:not': { associativity: 'right' }
                },
                {
                    'OperatorNode:pow': {
                        associativity: 'right',
                        associativeWith: [],
                        latexRightParens: false
                    },
                    'OperatorNode:dotPow': {
                        associativity: 'right',
                        associativeWith: []
                    }
                },
                { 'OperatorNode:factorial': { associativity: 'left' } },
                { 'OperatorNode:transpose': { associativity: 'left' } }
            ];
            function getPrecedence(_node, parenthesis) {
                var node = _node;
                if (parenthesis !== 'keep') {
                    node = _node.getContent();
                }
                var identifier = node.getIdentifier();
                for (var i = 0; i < properties.length; i++) {
                    if (identifier in properties[i]) {
                        return i;
                    }
                }
                return null;
            }
            function getAssociativity(_node, parenthesis) {
                var node = _node;
                if (parenthesis !== 'keep') {
                    node = _node.getContent();
                }
                var identifier = node.getIdentifier();
                var index = getPrecedence(node, parenthesis);
                if (index === null) {
                    return null;
                }
                var property = properties[index][identifier];
                if (property.hasOwnProperty('associativity')) {
                    if (property.associativity === 'left') {
                        return 'left';
                    }
                    if (property.associativity === 'right') {
                        return 'right';
                    }
                    throw Error('\'' + identifier + '\' has the invalid associativity \'' + property.associativity + '\'.');
                }
                return null;
            }
            function isAssociativeWith(nodeA, nodeB, parenthesis) {
                var a = nodeA;
                var b = nodeB;
                if (parenthesis !== 'keep') {
                    var a = nodeA.getContent();
                    var b = nodeB.getContent();
                }
                var identifierA = a.getIdentifier();
                var identifierB = b.getIdentifier();
                var index = getPrecedence(a, parenthesis);
                if (index === null) {
                    return null;
                }
                var property = properties[index][identifierA];
                if (property.hasOwnProperty('associativeWith') && property.associativeWith instanceof Array) {
                    for (var i = 0; i < property.associativeWith.length; i++) {
                        if (property.associativeWith[i] === identifierB) {
                            return true;
                        }
                    }
                    return false;
                }
                return null;
            }
            module.exports.properties = properties;
            module.exports.getPrecedence = getPrecedence;
            module.exports.getAssociativity = getAssociativity;
            module.exports.isAssociativeWith = isAssociativeWith;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var getType = __webpack_require__(59).type;
            var stringify = __webpack_require__(9).stringify;
            var escape = __webpack_require__(9).escape;
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function ConstantNode(value, valueType) {
                    if (!(this instanceof ConstantNode)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                    if (valueType) {
                        if (typeof valueType !== 'string') {
                            throw new TypeError('String expected for parameter "valueType"');
                        }
                        if (typeof value !== 'string') {
                            throw new TypeError('String expected for parameter "value"');
                        }
                        this.value = value;
                        this.valueType = valueType;
                    } else {
                        this.value = value + '';
                        this.valueType = getType(value);
                    }
                    if (!SUPPORTED_TYPES[this.valueType]) {
                        throw new TypeError('Unsupported type of value "' + this.valueType + '"');
                    }
                }
                var SUPPORTED_TYPES = {
                    'number': true,
                    'string': true,
                    'boolean': true,
                    'undefined': true,
                    'null': true
                };
                ConstantNode.prototype = new Node();
                ConstantNode.prototype.type = 'ConstantNode';
                ConstantNode.prototype.isConstantNode = true;
                function compileConstantNode(node, defs, args) {
                    if (!(node instanceof ConstantNode)) {
                        throw new TypeError('No valid ConstantNode');
                    }
                    switch (node.valueType) {
                    case 'number':
                        if (config.number === 'BigNumber') {
                            return 'math.bignumber(' + stringify(node.value) + ')';
                        } else if (config.number === 'Fraction') {
                            return 'math.fraction(' + stringify(node.value) + ')';
                        } else {
                            validateNumericValue(node.value);
                            return node.value.replace(/^(0*)[0-9]/, function (match, zeros) {
                                return match.substring(zeros.length);
                            });
                        }
                    case 'string':
                        return stringify(node.value);
                    case 'boolean':
                        return String(node.value) === 'true' ? 'true' : 'false';
                    case 'undefined':
                        return 'undefined';
                    case 'null':
                        return 'null';
                    default:
                        throw new TypeError('Unsupported type of constant "' + node.valueType + '"');
                    }
                }
                function validateNumericValue(value) {
                    if (typeof value !== 'string' || !/^[\-+]?((\d+\.?\d*)|(\d*\.?\d+))([eE][+\-]?\d+)?$/.test(value)) {
                        throw new Error('Invalid numeric value "' + value + '"');
                    }
                }
                register(ConstantNode.prototype.type, compileConstantNode);
                ConstantNode.prototype.forEach = function (callback) {
                                        eval($dl('uff/$_17716642501654880546547.js'));
                };
                ConstantNode.prototype.map = function (callback) {
                    return this.clone();
                };
                ConstantNode.prototype.clone = function () {
                    return new ConstantNode(this.value, this.valueType);
                };
                ConstantNode.prototype._toString = function (options) {
                    switch (this.valueType) {
                    case 'string':
                        return stringify(this.value);
                    default:
                        return this.value;
                    }
                };
                ConstantNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_4198676651654880546548.js'));
                };
                ConstantNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-9996214471654880546549.js'));
                };
                return ConstantNode;
            }
            exports.name = 'ConstantNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var latex = __webpack_require__(4);
            var stringify = __webpack_require__(9).stringify;
            var escape = __webpack_require__(9).escape;
            var extend = __webpack_require__(5).extend;
            var hasOwnProperty = __webpack_require__(5).hasOwnProperty;
            var map = __webpack_require__(2).map;
            var join = __webpack_require__(2).join;
            var validateSafeMethod = __webpack_require__(13).validateSafeMethod;
            var getUniqueArgumentName = __webpack_require__(108);
            function factory(type, config, load, typed, math) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                var SymbolNode = load(__webpack_require__(40));
                function FunctionNode(fn, args) {
                    if (!(this instanceof FunctionNode)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                    if (typeof fn === 'string') {
                        fn = new SymbolNode(fn);
                    }
                    if (!type.isNode(fn))
                        throw new TypeError('Node expected as parameter "fn"');
                    if (!Array.isArray(args) || !args.every(type.isNode)) {
                        throw new TypeError('Array containing Nodes expected for parameter "args"');
                    }
                    this.fn = fn;
                    this.args = args || [];
                    Object.defineProperty(this, 'name', {
                        get: function () {
                                                        var $that = this;
                            return eval($dl('uff/$_-11796648841654880546550.js'));
                        }.bind(this),
                        set: function () {
                                                        eval($dl('uff/$_-11723249781654880546551.js'));
                        }
                    });
                    var deprecated = function () {
                                                eval($dl('uff/$_-20277216201654880546553.js'));
                    };
                    Object.defineProperty(this, 'object', {
                        get: deprecated,
                        set: deprecated
                    });
                }
                FunctionNode.prototype = new Node();
                FunctionNode.prototype.type = 'FunctionNode';
                FunctionNode.prototype.isFunctionNode = true;
                function compileFunctionNode(node, defs, args) {
                    if (!(node instanceof FunctionNode)) {
                        throw new TypeError('No valid FunctionNode');
                    }
                    var jsFn = compile(node.fn, defs, args);
                    var jsArgs = map(node.args, function (arg) {
                        return compile(arg, defs, args);
                    });
                    var jsScope = compileScope(defs, args);
                    var argsName;
                    if (type.isSymbolNode(node.fn)) {
                        var name = node.fn.name;
                        var fn = hasOwnProperty(defs.math, name) ? defs.math[name] : undefined;
                        var isRaw = typeof fn === 'function' && fn.rawArgs == true;
                        if (isRaw) {
                            argsName = getUniqueArgumentName(defs);
                            defs[argsName] = node.args;
                            return jsFn + '(' + argsName + ', math, ' + jsScope + ')';
                        } else {
                            return jsFn + '(' + join(jsArgs, ', ') + ')';
                        }
                    } else if (type.isAccessorNode(node.fn) && type.isIndexNode(node.fn.index) && node.fn.index.isObjectProperty()) {
                        argsName = getUniqueArgumentName(defs);
                        defs[argsName] = node.args;
                        defs.validateSafeMethod = validateSafeMethod;
                        var jsObject = compile(node.fn.object, defs, args);
                        var jsProp = stringify(node.fn.index.getObjectProperty());
                        return '(function () {' + 'var object = ' + jsObject + ';' + 'validateSafeMethod(object, ' + jsProp + ');' + 'return (object[' + jsProp + '] && object[' + jsProp + '].rawArgs) ' + ' ? object[' + jsProp + '](' + argsName + ', math, ' + jsScope + ')' + ' : object[' + jsProp + '](' + join(jsArgs, ', ') + ')' + '})()';
                    } else {
                        argsName = getUniqueArgumentName(defs);
                        defs[argsName] = node.args;
                        return '(function () {' + 'var fn = ' + jsFn + ';' + 'return (fn && fn.rawArgs) ' + ' ? fn(' + argsName + ', math, ' + jsScope + ')' + ' : fn(' + join(jsArgs, ', ') + ')' + '})()';
                    }
                }
                register(FunctionNode.prototype.type, compileFunctionNode);
                function compileScope(defs, args) {
                    var names = Object.keys(args);
                    if (names.length === 0) {
                        return 'scope';
                    } else {
                        defs.extend = extend;
                        var jsArgs = map(names, function (name) {
                                                        return eval($dl('uff/$_-11528465721654880546554.js'));
                        });
                        return 'extend(extend({}, scope), {' + join(jsArgs, ', ') + '})';
                    }
                }
                FunctionNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_18934218471654880546554.js'));
                };
                FunctionNode.prototype.map = function (callback) {
                    var fn = this.fn.map(callback);
                    var args = [];
                    for (var i = 0; i < this.args.length; i++) {
                        args[i] = this._ifNode(callback(this.args[i], 'args[' + i + ']', this));
                    }
                    return new FunctionNode(fn, args);
                };
                FunctionNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_15515289481654880546555.js'));
                };
                var nodeToString = FunctionNode.prototype.toString;
                FunctionNode.prototype.toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_13708169461654880546556.js'));
                };
                FunctionNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_893071921654880546557.js'));
                };
                FunctionNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-19428821191654880546558.js'));
                };
                function expandTemplate(template, node, options) {
                                        return eval($dl('uff/$_-10378491711654880546559.js'));
                }
                var nodeToTex = FunctionNode.prototype.toTex;
                FunctionNode.prototype.toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-6431125831654880546560.js'));
                };
                FunctionNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_12459094551654880546561.js'));
                };
                FunctionNode.prototype.getIdentifier = function () {
                                        var $that = this;
                    return eval($dl('uff/$_18108928321654880546562.js'));
                };
                return FunctionNode;
            }
            exports.name = 'FunctionNode';
            exports.path = 'expression.node';
            exports.math = true;
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_555930351654880546563.js'));
            }
            exports.name = 'isPositive';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var sqrt = typed('sqrt', {
                    'number': _sqrtNumber,
                    'Complex': function (x) {
                                                return eval($dl('uff/$_6405925741654880546564.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_19791496601654880546565.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_891695021654880546566.js'));
                    },
                    'Unit': function (x) {
                                                return eval($dl('uff/$_17184556101654880546566.js'));
                    }
                });
                function _sqrtNumber(x) {
                    if (x >= 0 || config.predictable) {
                        return Math.sqrt(x);
                    } else {
                        return new type.Complex(x, 0).sqrt();
                    }
                }
                sqrt.toTex = { 1: '\\sqrt{${args[0]}}' };
                return sqrt;
            }
            exports.name = 'sqrt';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-13152511041654880546567.js'));
            }
            exports.name = 'isNegative';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            module.exports = function isMatrix(x) {
                return x && x.constructor.prototype.isMatrix || false;
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            exports.type = function (x) {
                var type = typeof x;
                if (type === 'object') {
                    if (x === null)
                        return 'null';
                    if (Array.isArray(x))
                        return 'Array';
                    if (x instanceof Date)
                        return 'Date';
                    if (x instanceof RegExp)
                        return 'RegExp';
                    if (x instanceof Boolean)
                        return 'boolean';
                    if (x instanceof Number)
                        return 'number';
                    if (x instanceof String)
                        return 'string';
                    return 'Object';
                }
                if (type === 'function')
                    return 'Function';
                return type;
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var equalScalar = load(__webpack_require__(11));
                var SparseMatrix = type.SparseMatrix;
                var algorithm05 = function (a, b, callback) {
                                        return eval($dl('uff/$_-11193702181654880546568.js'));
                };
                return algorithm05;
            }
            exports.name = 'algorithm05';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var array = __webpack_require__(2);
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var eye = typed('eye', {
                    '': function () {
                                                return eval($dl('uff/$_16654014751654880546571.js'));
                    },
                    'string': function (format) {
                                                return eval($dl('uff/$_-6928020941654880546571.js'));
                    },
                    'number | BigNumber': function (rows) {
                        return _eye(rows, rows, config.matrix === 'Matrix' ? 'default' : undefined);
                    },
                    'number | BigNumber, string': function (rows, format) {
                                                return eval($dl('uff/$_13906017691654880546572.js'));
                    },
                    'number | BigNumber, number | BigNumber': function (rows, cols) {
                                                return eval($dl('uff/$_19600791631654880546573.js'));
                    },
                    'number | BigNumber, number | BigNumber, string': function (rows, cols, format) {
                                                return eval($dl('uff/$_-10804059371654880546574.js'));
                    },
                    'Array': function (size) {
                                                return eval($dl('uff/$_14945065241654880546575.js'));
                    },
                    'Array, string': function (size, format) {
                                                return eval($dl('uff/$_-5013639511654880546576.js'));
                    },
                    'Matrix': function (size) {
                                                return eval($dl('uff/$_7631623341654880546577.js'));
                    },
                    'Matrix, string': function (size, format) {
                                                return eval($dl('uff/$_-11031360101654880546578.js'));
                    }
                });
                eye.toTex = undefined;
                return eye;
                function _eyeVector(size, format) {
                                        return eval($dl('uff/$_-17734484621654880546578.js'));
                }
                function _eye(rows, cols, format) {
                    var Big = type.isBigNumber(rows) || type.isBigNumber(cols) ? type.BigNumber : null;
                    if (type.isBigNumber(rows))
                        rows = rows.toNumber();
                    if (type.isBigNumber(cols))
                        cols = cols.toNumber();
                    if (!isInteger(rows) || rows < 1) {
                        throw new Error('Parameters in function eye must be positive integers');
                    }
                    if (!isInteger(cols) || cols < 1) {
                        throw new Error('Parameters in function eye must be positive integers');
                    }
                    var one = Big ? new type.BigNumber(1) : 1;
                    var defaultValue = Big ? new Big(0) : 0;
                    var size = [
                        rows,
                        cols
                    ];
                    if (format) {
                        var F = type.Matrix.storage(format);
                        return F.diagonal(size, one, 0, defaultValue);
                    }
                    var res = array.resize([], size, defaultValue);
                    var minimum = rows < cols ? rows : cols;
                    for (var d = 0; d < minimum; d++) {
                        res[d][d] = one;
                    }
                    return res;
                }
            }
            exports.name = 'eye';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var latex = __webpack_require__(4);
            var map = __webpack_require__(2).map;
            var join = __webpack_require__(2).join;
            var stringify = __webpack_require__(9).stringify;
            var escape = __webpack_require__(9).escape;
            var isSafeMethod = __webpack_require__(13).isSafeMethod;
            var operators = __webpack_require__(52);
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                var ConstantNode = load(__webpack_require__(53));
                var SymbolNode = load(__webpack_require__(40));
                var FunctionNode = load(__webpack_require__(54));
                function OperatorNode(op, fn, args, implicit) {
                    if (!(this instanceof OperatorNode)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                    if (typeof op !== 'string') {
                        throw new TypeError('string expected for parameter "op"');
                    }
                    if (typeof fn !== 'string') {
                        throw new TypeError('string expected for parameter "fn"');
                    }
                    if (!Array.isArray(args) || !args.every(type.isNode)) {
                        throw new TypeError('Array containing Nodes expected for parameter "args"');
                    }
                    this.implicit = implicit === true;
                    this.op = op;
                    this.fn = fn;
                    this.args = args || [];
                }
                OperatorNode.prototype = new Node();
                OperatorNode.prototype.type = 'OperatorNode';
                OperatorNode.prototype.isOperatorNode = true;
                function compileOperatorNode(node, defs, args) {
                    if (!(node instanceof OperatorNode)) {
                        throw new TypeError('No valid OperatorNode');
                    }
                    if (typeof node.fn !== 'string' || !isSafeMethod(defs.math, node.fn)) {
                        if (!defs.math[node.fn]) {
                            throw new Error('Function ' + node.fn + ' missing in provided namespace "math"');
                        } else {
                            throw new Error('No access to function "' + node.fn + '"');
                        }
                    }
                    var jsArgs = map(node.args, function (arg) {
                        return compile(arg, defs, args);
                    });
                    return 'math[' + stringify(node.fn) + '](' + join(jsArgs, ', ') + ')';
                }
                register(OperatorNode.prototype.type, compileOperatorNode);
                OperatorNode.prototype.forEach = function (callback) {
                    for (var i = 0; i < this.args.length; i++) {
                        callback(this.args[i], 'args[' + i + ']', this);
                    }
                };
                OperatorNode.prototype.map = function (callback) {
                    var args = [];
                    for (var i = 0; i < this.args.length; i++) {
                        args[i] = this._ifNode(callback(this.args[i], 'args[' + i + ']', this));
                    }
                    return new OperatorNode(this.op, this.fn, args);
                };
                OperatorNode.prototype.clone = function () {
                    return new OperatorNode(this.op, this.fn, this.args.slice(0), this.implicit);
                };
                function calculateNecessaryParentheses(root, parenthesis, implicit, args, latex) {
                    var precedence = operators.getPrecedence(root, parenthesis);
                    var associativity = operators.getAssociativity(root, parenthesis);
                    if (parenthesis === 'all' || args.length > 2 && root.getIdentifier() !== 'OperatorNode:add' && root.getIdentifier() !== 'OperatorNode:multiply') {
                        var parens = args.map(function (arg) {
                            switch (arg.getContent().type) {
                            case 'ArrayNode':
                            case 'ConstantNode':
                            case 'SymbolNode':
                            case 'ParenthesisNode':
                                return false;
                                break;
                            default:
                                return true;
                            }
                        });
                        return parens;
                    }
                    var result = undefined;
                    switch (args.length) {
                    case 0:
                        result = [];
                        break;
                    case 1:
                        var operandPrecedence = operators.getPrecedence(args[0], parenthesis);
                        if (latex && operandPrecedence !== null) {
                            var operandIdentifier;
                            var rootIdentifier;
                            if (parenthesis === 'keep') {
                                operandIdentifier = args[0].getIdentifier();
                                rootIdentifier = root.getIdentifier();
                            } else {
                                operandIdentifier = args[0].getContent().getIdentifier();
                                rootIdentifier = root.getContent().getIdentifier();
                            }
                            if (operators.properties[precedence][rootIdentifier].latexLeftParens === false) {
                                result = [false];
                                break;
                            }
                            if (operators.properties[operandPrecedence][operandIdentifier].latexParens === false) {
                                result = [false];
                                break;
                            }
                        }
                        if (operandPrecedence === null) {
                            result = [false];
                            break;
                        }
                        if (operandPrecedence <= precedence) {
                            result = [true];
                            break;
                        }
                        result = [false];
                        break;
                    case 2:
                        var lhsParens;
                        var lhsPrecedence = operators.getPrecedence(args[0], parenthesis);
                        var assocWithLhs = operators.isAssociativeWith(root, args[0], parenthesis);
                        if (lhsPrecedence === null) {
                            lhsParens = false;
                        } else if (lhsPrecedence === precedence && associativity === 'right' && !assocWithLhs) {
                            lhsParens = true;
                        } else if (lhsPrecedence < precedence) {
                            lhsParens = true;
                        } else {
                            lhsParens = false;
                        }
                        var rhsParens;
                        var rhsPrecedence = operators.getPrecedence(args[1], parenthesis);
                        var assocWithRhs = operators.isAssociativeWith(root, args[1], parenthesis);
                        if (rhsPrecedence === null) {
                            rhsParens = false;
                        } else if (rhsPrecedence === precedence && associativity === 'left' && !assocWithRhs) {
                            rhsParens = true;
                        } else if (rhsPrecedence < precedence) {
                            rhsParens = true;
                        } else {
                            rhsParens = false;
                        }
                        if (latex) {
                            var rootIdentifier;
                            var lhsIdentifier;
                            var rhsIdentifier;
                            if (parenthesis === 'keep') {
                                rootIdentifier = root.getIdentifier();
                                lhsIdentifier = root.args[0].getIdentifier();
                                rhsIdentifier = root.args[1].getIdentifier();
                            } else {
                                rootIdentifier = root.getContent().getIdentifier();
                                lhsIdentifier = root.args[0].getContent().getIdentifier();
                                rhsIdentifier = root.args[1].getContent().getIdentifier();
                            }
                            if (lhsPrecedence !== null) {
                                if (operators.properties[precedence][rootIdentifier].latexLeftParens === false) {
                                    lhsParens = false;
                                }
                                if (operators.properties[lhsPrecedence][lhsIdentifier].latexParens === false) {
                                    lhsParens = false;
                                }
                            }
                            if (rhsPrecedence !== null) {
                                if (operators.properties[precedence][rootIdentifier].latexRightParens === false) {
                                    rhsParens = false;
                                }
                                if (operators.properties[rhsPrecedence][rhsIdentifier].latexParens === false) {
                                    rhsParens = false;
                                }
                            }
                        }
                        result = [
                            lhsParens,
                            rhsParens
                        ];
                        break;
                    default:
                        if (root.getIdentifier() === 'OperatorNode:add' || root.getIdentifier() === 'OperatorNode:multiply') {
                            var result = args.map(function (arg) {
                                                                return eval($dl('uff/$_7336083011654880546580.js'));
                            });
                        }
                        break;
                    }
                    if (args.length >= 2 && root.getIdentifier() === 'OperatorNode:multiply' && root.implicit && parenthesis === 'auto' && implicit === 'hide') {
                        result = args.map(function (arg, index) {
                                                        return eval($dl('uff/$_-14636208131654880546581.js'));
                        });
                    }
                    return result;
                }
                OperatorNode.prototype._toString = function (options) {
                    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
                    var implicit = options && options.implicit ? options.implicit : 'hide';
                    var args = this.args;
                    var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, false);
                    if (args.length === 1) {
                        var assoc = operators.getAssociativity(this, parenthesis);
                        var operand = args[0].toString(options);
                        if (parens[0]) {
                            operand = '(' + operand + ')';
                        }
                        if (assoc === 'right') {
                            return this.op + operand;
                        } else if (assoc === 'left') {
                            return operand + this.op;
                        }
                        return operand + this.op;
                    } else if (args.length == 2) {
                        var lhs = args[0].toString(options);
                        var rhs = args[1].toString(options);
                        if (parens[0]) {
                            lhs = '(' + lhs + ')';
                        }
                        if (parens[1]) {
                            rhs = '(' + rhs + ')';
                        }
                        if (this.implicit && this.getIdentifier() === 'OperatorNode:multiply' && implicit == 'hide') {
                            return lhs + ' ' + rhs;
                        }
                        return lhs + ' ' + this.op + ' ' + rhs;
                    } else if (args.length > 2 && (this.getIdentifier() === 'OperatorNode:add' || this.getIdentifier() === 'OperatorNode:multiply')) {
                        var stringifiedArgs = args.map(function (arg, index) {
                                                        return eval($dl('uff/$_7292776311654880546582.js'));
                        });
                        if (this.implicit && this.getIdentifier() === 'OperatorNode:multiply' && implicit === 'hide') {
                            return stringifiedArgs.join(' ');
                        }
                        return stringifiedArgs.join(' ' + this.op + ' ');
                    } else {
                        return this.fn + '(' + this.args.join(', ') + ')';
                    }
                };
                OperatorNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_18686905471654880546582.js'));
                };
                OperatorNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-4982022201654880546587.js'));
                };
                OperatorNode.prototype.getIdentifier = function () {
                    return this.type + ':' + this.fn;
                };
                return OperatorNode;
            }
            exports.name = 'OperatorNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function ParenthesisNode(content) {
                    if (!(this instanceof ParenthesisNode)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                    if (!type.isNode(content)) {
                        throw new TypeError('Node expected for parameter "content"');
                    }
                    this.content = content;
                }
                ParenthesisNode.prototype = new Node();
                ParenthesisNode.prototype.type = 'ParenthesisNode';
                ParenthesisNode.prototype.isParenthesisNode = true;
                function compileParenthesisNode(node, defs, args) {
                    if (!(node instanceof ParenthesisNode)) {
                        throw new TypeError('No valid ParenthesisNode');
                    }
                    return compile(node.content, defs, args);
                }
                register(ParenthesisNode.prototype.type, compileParenthesisNode);
                ParenthesisNode.prototype.getContent = function () {
                                        var $that = this;
                    return eval($dl('uff/$_1014108781654880546589.js'));
                };
                ParenthesisNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_8884275451654880546590.js'));
                };
                ParenthesisNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_-745571411654880546591.js'));
                };
                ParenthesisNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-3886712731654880546592.js'));
                };
                ParenthesisNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_14674093211654880546593.js'));
                };
                ParenthesisNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-5339098131654880546594.js'));
                };
                ParenthesisNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_11551952521654880546595.js'));
                };
                return ParenthesisNode;
            }
            exports.name = 'ParenthesisNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var clone = __webpack_require__(5).clone;
            var isInteger = __webpack_require__(3).isInteger;
            var array = __webpack_require__(2);
            var IndexError = __webpack_require__(51);
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12874186711654880546596.js'));
            }
            function _concat(a, b, concatDim, dim) {
                                return eval($dl('uff/$_-15831441421654880546597.js'));
            }
            exports.name = 'concat';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var arraySize = __webpack_require__(2).size;
            var isMatrix = __webpack_require__(58);
            var IndexError = __webpack_require__(51);
            module.exports = function (mat, dim, callback) {
                                return eval($dl('uff/$_8233803161654880546598.js'));
            };
            function _reduce(mat, dim, callback) {
                                return eval($dl('uff/$_-4620419791654880546599.js'));
            }
            function _switch(mat) {
                                return eval($dl('uff/$_11038942001654880546600.js'));
            }
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isCollection = __webpack_require__(46);
            module.exports = function containsCollections(array) {
                                return eval($dl('uff/$_16589128661654880546600.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var clone = __webpack_require__(5).clone;
            var format = __webpack_require__(9).format;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_19873736741654880546601.js'));
            }
            exports.name = 'transpose';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_510270221654880546603.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_5013512731654880546604.js'));
            }
            exports.name = 'factorial';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-3785783991654880546605.js'));
            }
            function isPositiveInteger(n) {
                                return eval($dl('uff/$_-1831792091654880546606.js'));
            }
            exports.name = 'combinations';
            exports.factory = factory;
        },
        function (module, exports) {
            module.exports = function isBigNumber(x) {
                return x && x.constructor.prototype.isBigNumber || false;
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var string = util.string;
            var isString = string.isString;
            function factory(type, config, load, typed) {
                function Matrix() {
                    if (!(this instanceof Matrix)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                }
                Matrix.prototype.type = 'Matrix';
                Matrix.prototype.isMatrix = true;
                Matrix.storage = function (format) {
                    if (!isString(format)) {
                        throw new TypeError('format must be a string value');
                    }
                    var constructor = Matrix._storage[format];
                    if (!constructor) {
                        throw new SyntaxError('Unsupported matrix storage format: ' + format);
                    }
                    return constructor;
                };
                Matrix._storage = {};
                Matrix.prototype.storage = function () {
                                        eval($dl('uff/$_7926341441654880546607.js'));
                };
                Matrix.prototype.datatype = function () {
                                        eval($dl('uff/$_-9909181211654880546608.js'));
                };
                Matrix.prototype.create = function (data, datatype) {
                                        eval($dl('uff/$_9733296711654880546608.js'));
                };
                Matrix.prototype.subset = function (index, replacement, defaultValue) {
                                        eval($dl('uff/$_-5899734831654880546609.js'));
                };
                Matrix.prototype.get = function (index) {
                                        eval($dl('uff/$_21150147791654880546610.js'));
                };
                Matrix.prototype.set = function (index, value, defaultValue) {
                                        eval($dl('uff/$_13459490631654880546611.js'));
                };
                Matrix.prototype.resize = function (size, defaultValue) {
                                        eval($dl('uff/$_-17327578491654880546612.js'));
                };
                Matrix.prototype.reshape = function (size, defaultValue) {
                                        eval($dl('uff/$_-16664827011654880546613.js'));
                };
                Matrix.prototype.clone = function () {
                                        eval($dl('uff/$_-3297555821654880546613.js'));
                };
                Matrix.prototype.size = function () {
                                        eval($dl('uff/$_-10987029241654880546614.js'));
                };
                Matrix.prototype.map = function (callback, skipZeros) {
                                        eval($dl('uff/$_-792293111654880546615.js'));
                };
                Matrix.prototype.forEach = function (callback) {
                                        eval($dl('uff/$_16855682711654880546616.js'));
                };
                Matrix.prototype.toArray = function () {
                                        eval($dl('uff/$_-10069367651654880546616.js'));
                };
                Matrix.prototype.valueOf = function () {
                                        eval($dl('uff/$_-7860101631654880546617.js'));
                };
                Matrix.prototype.format = function (options) {
                                        eval($dl('uff/$_15448652581654880546618.js'));
                };
                Matrix.prototype.toString = function () {
                                        eval($dl('uff/$_12425878071654880546619.js'));
                };
                return Matrix;
            }
            exports.name = 'Matrix';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var equalScalar = load(__webpack_require__(11));
                var SparseMatrix = type.SparseMatrix;
                var algorithm04 = function (a, b, callback) {
                                        return eval($dl('uff/$_-16761999781654880546620.js'));
                };
                return algorithm04;
            }
            exports.name = 'algorithm04';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var number = typed('number', {
                    '': function () {
                                                return eval($dl('uff/$_12168163611654880546622.js'));
                    },
                    'number': function (x) {
                                                return eval($dl('uff/$_-708860951654880546623.js'));
                    },
                    'string': function (x) {
                                                return eval($dl('uff/$_3901688121654880546623.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_8204205461654880546624.js'));
                    },
                    'Fraction': function (x) {
                                                return eval($dl('uff/$_12775430841654880546625.js'));
                    },
                    'Unit': function (x) {
                                                eval($dl('uff/$_12324867531654880546625.js'));
                    },
                    'Unit, string | Unit': function (unit, valuelessUnit) {
                                                return eval($dl('uff/$_-2876786601654880546626.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_-20815030851654880546627.js'));
                    }
                });
                number.toTex = {
                    0: '0',
                    1: '\\left(${args[0]}\\right)',
                    2: '\\left(\\left(${args[0]}\\right)${args[1]}\\right)'
                };
                return number;
            }
            exports.name = 'number';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                var isNumeric = typed('isNumeric', {
                    'number | BigNumber | Fraction | boolean': function () {
                                                return eval($dl('uff/$_-9196143471654880546628.js'));
                    },
                    'Complex | Unit | string': function () {
                                                return eval($dl('uff/$_17000464281654880546629.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_-16650483651654880546629.js'));
                    }
                });
                return isNumeric;
            }
            exports.name = 'isNumeric';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var types = __webpack_require__(59);
            function factory(type, config, load, typed) {
                var _typeof = typed('_typeof', {
                    'any': function (x) {
                        var t = types.type(x);
                        if (t === 'Object') {
                            if (type.isBigNumber(x))
                                return 'BigNumber';
                            if (type.isComplex(x))
                                return 'Complex';
                            if (type.isFraction(x))
                                return 'Fraction';
                            if (type.isMatrix(x))
                                return 'Matrix';
                            if (type.isUnit(x))
                                return 'Unit';
                            if (type.isIndex(x))
                                return 'Index';
                            if (type.isRange(x))
                                return 'Range';
                            if (type.isChain(x))
                                return 'Chain';
                            if (type.isHelp(x))
                                return 'Help';
                        }
                        return t;
                    }
                });
                _typeof.toTex = undefined;
                return _typeof;
            }
            exports.name = 'typeof';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            module.exports = { end: true };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var map = __webpack_require__(2).map;
            var join = __webpack_require__(2).join;
            var escape = __webpack_require__(9).escape;
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                var RangeNode = load(__webpack_require__(79));
                var SymbolNode = load(__webpack_require__(40));
                var Range = load(__webpack_require__(93));
                var isArray = Array.isArray;
                function IndexNode(dimensions, dotNotation) {
                                        var $that = this;
                    eval($dl('uff/$_-8847435421654880546630.js'));
                }
                IndexNode.prototype = new Node();
                IndexNode.prototype.type = 'IndexNode';
                IndexNode.prototype.isIndexNode = true;
                function compileIndexNode(node, defs, args) {
                                        return eval($dl('uff/$_15592003641654880546631.js'));
                }
                register(IndexNode.prototype.type, compileIndexNode);
                IndexNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_-582817851654880546632.js'));
                };
                IndexNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_20778151701654880546633.js'));
                };
                IndexNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-1518388201654880546634.js'));
                };
                IndexNode.prototype.isObjectProperty = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-15033283361654880546635.js'));
                };
                IndexNode.prototype.getObjectProperty = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-3393197601654880546636.js'));
                };
                IndexNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-10330988201654880546637.js'));
                };
                IndexNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-11478575211654880546637.js'));
                };
                IndexNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_11765353221654880546640.js'));
                };
                IndexNode.prototype.needsSize = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-14400709111654880546641.js'));
                };
                return IndexNode;
            }
            exports.name = 'IndexNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var operators = __webpack_require__(52);
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function RangeNode(start, end, step) {
                                        var $that = this;
                    eval($dl('uff/$_17679339081654880546642.js'));
                }
                RangeNode.prototype = new Node();
                RangeNode.prototype.type = 'RangeNode';
                RangeNode.prototype.isRangeNode = true;
                RangeNode.prototype.needsEnd = function () {
                                        var $that = this;
                    return eval($dl('uff/$_2907910331654880546643.js'));
                };
                function compileRangeNode(node, defs, args) {
                                        return eval($dl('uff/$_-2930205981654880546644.js'));
                }
                register(RangeNode.prototype.type, compileRangeNode);
                RangeNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_-14668256451654880546645.js'));
                };
                RangeNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_-10556682221654880546646.js'));
                };
                RangeNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_18529145741654880546647.js'));
                };
                function calculateNecessaryParentheses(node, parenthesis) {
                                        return eval($dl('uff/$_12383879971654880546648.js'));
                }
                RangeNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_176085611654880546649.js'));
                };
                RangeNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_16743152111654880546650.js'));
                };
                RangeNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-1910947511654880546651.js'));
                };
                return RangeNode;
            }
            exports.name = 'RangeNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var map = __webpack_require__(2).map;
            var join = __webpack_require__(2).join;
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function ArrayNode(items) {
                    if (!(this instanceof ArrayNode)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                    this.items = items || [];
                    if (!Array.isArray(this.items) || !this.items.every(type.isNode)) {
                        throw new TypeError('Array containing Nodes expected');
                    }
                    var deprecated = function () {
                                                eval($dl('uff/$_-3256735301654880546653.js'));
                    };
                    Object.defineProperty(this, 'nodes', {
                        get: deprecated,
                        set: deprecated
                    });
                }
                ArrayNode.prototype = new Node();
                ArrayNode.prototype.type = 'ArrayNode';
                ArrayNode.prototype.isArrayNode = true;
                function compileArrayNode(node, defs, args) {
                    if (!(node instanceof ArrayNode)) {
                        throw new TypeError('No valid ArrayNode');
                    }
                    var asMatrix = defs.math.config().matrix !== 'Array';
                    var items = map(node.items, function (item) {
                        return compile(item, defs, args);
                    });
                    return (asMatrix ? 'math.matrix([' : '[') + join(items, ',') + (asMatrix ? '])' : ']');
                }
                register(ArrayNode.prototype.type, compileArrayNode);
                ArrayNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_4117371151654880546654.js'));
                };
                ArrayNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_13569748571654880546654.js'));
                };
                ArrayNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_10811367061654880546655.js'));
                };
                ArrayNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-21412304631654880546656.js'));
                };
                ArrayNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_4272055371654880546657.js'));
                };
                ArrayNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_11436624701654880546658.js'));
                };
                return ArrayNode;
            }
            exports.name = 'ArrayNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports) {
                        eval($dl('uff/$_-15797859341654880546659.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_7985842241654880546660.js'));
            }
            exports.name = 'isZero';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-11330061771654880546661.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-18253171461654880546662.js'));
        },
        function (module, exports, __webpack_require__) {
            var bitNot = __webpack_require__(86);
            module.exports = function bitwise(x, y, func) {
                                return eval($dl('uff/$_3350497621654880546663.js'));
            };
            function decCoefficientToBinaryString(x) {
                                return eval($dl('uff/$_19891520761654880546666.js'));
            }
        },
        function (module, exports) {
            module.exports = function bitNot(x) {
                                return eval($dl('uff/$_9463181441654880546667.js'));
            };
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_5722906421654880546668.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-4185779901654880546670.js'));
            }
            exports.name = 'partitionSelect';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_15836601021654880546673.js'));
        },
        function (module, exports, __webpack_require__) {
            var Emitter = __webpack_require__(153);
            exports.mixin = function (obj) {
                var emitter = new Emitter();
                obj.on = emitter.on.bind(emitter);
                obj.off = emitter.off.bind(emitter);
                obj.once = emitter.once.bind(emitter);
                obj.emit = emitter.emit.bind(emitter);
                return obj;
            };
        },
        function (module, exports, __webpack_require__) {
            var Complex = __webpack_require__(168);
            var format = __webpack_require__(3).format;
            var isNumber = __webpack_require__(3).isNumber;
            function factory(type, config, load, typed, math) {
                Complex.prototype.type = 'Complex';
                Complex.prototype.isComplex = true;
                Complex.prototype.toJSON = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-4476121241654880546676.js'));
                };
                Complex.prototype.toPolar = function () {
                                        var $that = this;
                    return eval($dl('uff/$_12453876301654880546677.js'));
                };
                Complex.prototype.format = function (options) {
                    var str = '';
                    var im = this.im;
                    var re = this.re;
                    var strRe = format(this.re, options);
                    var strIm = format(this.im, options);
                    var precision = isNumber(options) ? options : options ? options.precision : null;
                    if (precision !== null) {
                        var epsilon = Math.pow(10, -precision);
                        if (Math.abs(re / im) < epsilon) {
                            re = 0;
                        }
                        if (Math.abs(im / re) < epsilon) {
                            im = 0;
                        }
                    }
                    if (im == 0) {
                        str = strRe;
                    } else if (re == 0) {
                        if (im == 1) {
                            str = 'i';
                        } else if (im == -1) {
                            str = '-i';
                        } else {
                            str = strIm + 'i';
                        }
                    } else {
                        if (im < 0) {
                            if (im == -1) {
                                str = strRe + ' - i';
                            } else {
                                str = strRe + ' - ' + strIm.substring(1) + 'i';
                            }
                        } else {
                            if (im == 1) {
                                str = strRe + ' + i';
                            } else {
                                str = strRe + ' + ' + strIm + 'i';
                            }
                        }
                    }
                    return str;
                };
                Complex.fromPolar = function (args) {
                                        return eval($dl('uff/$_-6898152811654880546679.js'));
                };
                Complex.prototype.valueOf = Complex.prototype.toString;
                Complex.fromJSON = function (json) {
                                        return eval($dl('uff/$_15984335061654880546680.js'));
                };
                Complex.EPSILON = config.epsilon;
                math.on('config', function (curr, prev) {
                                        eval($dl('uff/$_16600328101654880546680.js'));
                });
                Complex.compare = function (a, b) {
                                        return eval($dl('uff/$_10606197211654880546681.js'));
                };
                return Complex;
            }
            exports.name = 'Complex';
            exports.path = 'type';
            exports.factory = factory;
            exports.math = true;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var fraction = typed('fraction', {
                    'number': function (x) {
                        if (!isFinite(x) || isNaN(x)) {
                            throw new Error(x + ' cannot be represented as a fraction');
                        }
                        return new type.Fraction(x);
                    },
                    'string': function (x) {
                                                return eval($dl('uff/$_9607826341654880546683.js'));
                    },
                    'number, number': function (numerator, denominator) {
                                                return eval($dl('uff/$_17282946951654880546684.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_-2511528831654880546686.js'));
                    },
                    'Fraction': function (x) {
                                                return eval($dl('uff/$_-14289685661654880546687.js'));
                    },
                    'Object': function (x) {
                                                return eval($dl('uff/$_9607826341654880546689.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_-6818321341654880546690.js'));
                    }
                });
                return fraction;
            }
            exports.name = 'fraction';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                function Range(start, end, step) {
                                        var $that = this;
                    eval($dl('uff/$_-2919823591654880546690.js'));
                }
                Range.prototype.type = 'Range';
                Range.prototype.isRange = true;
                Range.parse = function (str) {
                                        return eval($dl('uff/$_11003431281654880546695.js'));
                };
                Range.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-3044787901654880546697.js'));
                };
                Range.prototype.size = function () {
                                        var $that = this;
                    return eval($dl('uff/$_2256291621654880546698.js'));
                };
                Range.prototype.min = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-18958732591654880546700.js'));
                };
                Range.prototype.max = function () {
                                        var $that = this;
                    return eval($dl('uff/$_18930841811654880546701.js'));
                };
                Range.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_17562414061654880546703.js'));
                };
                Range.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_7442822221654880546705.js'));
                };
                Range.prototype.toArray = function () {
                                        var $that = this;
                    return eval($dl('uff/$_18321867721654880546706.js'));
                };
                Range.prototype.valueOf = function () {
                                        var $that = this;
                    return eval($dl('uff/$_13932089611654880546708.js'));
                };
                Range.prototype.format = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_21158152311654880546709.js'));
                };
                Range.prototype.toString = function () {
                                        var $that = this;
                    return eval($dl('uff/$_987136291654880546710.js'));
                };
                Range.prototype.toJSON = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-20384073051654880546712.js'));
                };
                Range.fromJSON = function (json) {
                                        return eval($dl('uff/$_-502983021654880546714.js'));
                };
                return Range;
            }
            exports.name = 'Range';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                function ResultSet(entries) {
                                        var $that = this;
                    eval($dl('uff/$_3511585561654880546715.js'));
                }
                ResultSet.prototype.type = 'ResultSet';
                ResultSet.prototype.isResultSet = true;
                ResultSet.prototype.valueOf = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-7501436691654880546716.js'));
                };
                ResultSet.prototype.toString = function () {
                                        var $that = this;
                    return eval($dl('uff/$_15033385601654880546717.js'));
                };
                ResultSet.prototype.toJSON = function () {
                                        var $that = this;
                    return eval($dl('uff/$_16698285771654880546718.js'));
                };
                ResultSet.fromJSON = function (json) {
                                        return eval($dl('uff/$_-20904468911654880546720.js'));
                };
                return ResultSet;
            }
            exports.name = 'ResultSet';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var memoize = __webpack_require__(32).memoize;
            exports.e = memoize(function (BigNumber) {
                                return eval($dl('uff/$_-1435138101654880546721.js'));
            }, hasher);
            exports.phi = memoize(function (BigNumber) {
                                return eval($dl('uff/$_5297689771654880546723.js'));
            }, hasher);
            exports.pi = memoize(function (BigNumber) {
                                return eval($dl('uff/$_-8971036011654880546724.js'));
            }, hasher);
            exports.tau = memoize(function (BigNumber) {
                                return eval($dl('uff/$_-10873452661654880546725.js'));
            }, hasher);
            function hasher(args) {
                                return eval($dl('uff/$_7897326921654880546726.js'));
            }
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var fix = typed('fix', {
                    'number': function (x) {
                                                return eval($dl('uff/$_4964108511654880546727.js'));
                    },
                    'Complex': function (x) {
                                                return eval($dl('uff/$_18253256751654880546728.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_7631722091654880546730.js'));
                    },
                    'Fraction': function (x) {
                                                return eval($dl('uff/$_-12723741961654880546731.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_-5708929301654880546732.js'));
                    }
                });
                fix.toTex = { 1: '\\mathrm{${name}}\\left(${args[0]}\\right)' };
                return fix;
            }
            exports.name = 'fix';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var toFixed = __webpack_require__(3).toFixed;
            var deepMap = __webpack_require__(1);
            var NO_INT = 'Number of decimals in function round must be an integer';
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var equalScalar = load(__webpack_require__(11));
                var zeros = load(__webpack_require__(38));
                var algorithm11 = load(__webpack_require__(17));
                var algorithm12 = load(__webpack_require__(16));
                var algorithm14 = load(__webpack_require__(6));
                var round = typed('round', {
                    'number': Math.round,
                    'number, number': function (x, n) {
                        if (!isInteger(n)) {
                            throw new TypeError(NO_INT);
                        }
                        if (n < 0 || n > 15) {
                            throw new Error('Number of decimals in function round must be in te range of 0-15');
                        }
                        return _round(x, n);
                    },
                    'Complex': function (x) {
                                                return eval($dl('uff/$_-9523265741654880546734.js'));
                    },
                    'Complex, number': function (x, n) {
                                                return eval($dl('uff/$_-6795993691654880546735.js'));
                    },
                    'Complex, BigNumber': function (x, n) {
                                                return eval($dl('uff/$_-20684899031654880546737.js'));
                    },
                    'number, BigNumber': function (x, n) {
                                                return eval($dl('uff/$_7923079001654880546738.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_9939731801654880546739.js'));
                    },
                    'BigNumber, BigNumber': function (x, n) {
                                                return eval($dl('uff/$_-18994343521654880546740.js'));
                    },
                    'Fraction': function (x) {
                                                return eval($dl('uff/$_-9523265741654880546742.js'));
                    },
                    'Fraction, number': function (x, n) {
                                                return eval($dl('uff/$_-6795993691654880546743.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_10857879981654880546744.js'));
                    },
                    'Matrix, number | BigNumber': function (x, y) {
                                                return eval($dl('uff/$_17059762611654880546745.js'));
                    },
                    'number | Complex | BigNumber, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-7769382441654880546747.js'));
                    },
                    'Array, number | BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-16112957711654880546748.js'));
                    },
                    'number | Complex | BigNumber, Array': function (x, y) {
                                                return eval($dl('uff/$_-6897084621654880546750.js'));
                    }
                });
                round.toTex = {
                    1: '\\left\\lfloor${args[0]}\\right\\rceil',
                    2: undefined
                };
                return round;
            }
            function _round(value, decimals) {
                return parseFloat(toFixed(value, decimals));
            }
            exports.name = 'round';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var string = __webpack_require__(9);
            function factory(type, config, load, typed) {
                var format = typed('format', {
                    'any': string.format,
                    'any, Object | function | number': string.format
                });
                format.toTex = undefined;
                return format;
            }
            exports.name = 'format';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            function factory(construction, config, load, typed) {
                                return eval($dl('uff/$_1737063671654880546751.js'));
            }
            exports.name = 'docs';
            exports.path = 'expression';
            exports.factory = factory;
        },
        function (module, exports) {
                        eval($dl('uff/$_-11656196881654880546760.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17291962291654880546762.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var stringify = __webpack_require__(9).stringify;
            var getSafeProperty = __webpack_require__(13).getSafeProperty;
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                var IndexNode = load(__webpack_require__(78));
                var access = load(__webpack_require__(103));
                function AccessorNode(object, index) {
                                        var $that = this;
                    eval($dl('uff/$_3914630651654880546763.js'));
                }
                AccessorNode.prototype = new Node();
                AccessorNode.prototype.type = 'AccessorNode';
                AccessorNode.prototype.isAccessorNode = true;
                function compileAccessorNode(node, defs, args) {
                                        return eval($dl('uff/$_8284402771654880546765.js'));
                }
                register(AccessorNode.prototype.type, compileAccessorNode);
                AccessorNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_-3063607441654880546766.js'));
                };
                AccessorNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_-19010787171654880546767.js'));
                };
                AccessorNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-2223150761654880546768.js'));
                };
                AccessorNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_11391846191654880546768.js'));
                };
                AccessorNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-5008825991654880546771.js'));
                };
                AccessorNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-17005580081654880546772.js'));
                };
                function needParenthesis(node) {
                                        return eval($dl('uff/$_18825359651654880546772.js'));
                }
                return AccessorNode;
            }
            exports.name = 'AccessorNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var errorTransform = __webpack_require__(41).transform;
            var getSafeProperty = __webpack_require__(13).getSafeProperty;
            function factory(type, config, load, typed) {
                var subset = load(__webpack_require__(22));
                return function access(object, index) {
                                        return eval($dl('uff/$_12403711061654880546773.js'));
                };
            }
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var latex = __webpack_require__(4);
            var stringify = __webpack_require__(9).stringify;
            var getSafeProperty = __webpack_require__(13).getSafeProperty;
            var setSafeProperty = __webpack_require__(13).setSafeProperty;
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                var ArrayNode = load(__webpack_require__(80));
                var matrix = load(__webpack_require__(0));
                var assign = load(__webpack_require__(385));
                var access = load(__webpack_require__(103));
                var keywords = __webpack_require__(77);
                var operators = __webpack_require__(52);
                function AssignmentNode(object, index, value) {
                                        var $that = this;
                    eval($dl('uff/$_-18779449771654880546774.js'));
                }
                AssignmentNode.prototype = new Node();
                AssignmentNode.prototype.type = 'AssignmentNode';
                AssignmentNode.prototype.isAssignmentNode = true;
                function compileAssignmentNode(node, defs, args) {
                                        return eval($dl('uff/$_-903510651654880546775.js'));
                }
                register(AssignmentNode.prototype.type, compileAssignmentNode);
                AssignmentNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_-16899074591654880546779.js'));
                };
                AssignmentNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_12447707771654880546780.js'));
                };
                AssignmentNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_5552796311654880546781.js'));
                };
                function needParenthesis(node, parenthesis) {
                                        return eval($dl('uff/$_-8592974681654880546782.js'));
                }
                AssignmentNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_9091993701654880546783.js'));
                };
                AssignmentNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-19705884671654880546785.js'));
                };
                AssignmentNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-19515123071654880546786.js'));
                };
                return AssignmentNode;
            }
            exports.name = 'AssignmentNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var map = __webpack_require__(2).map;
            var join = __webpack_require__(2).join;
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                var ResultSet = load(__webpack_require__(94));
                function BlockNode(blocks) {
                                        var $that = this;
                    eval($dl('uff/$_-930929811654880546788.js'));
                }
                BlockNode.prototype = new Node();
                BlockNode.prototype.type = 'BlockNode';
                BlockNode.prototype.isBlockNode = true;
                function compileBlockNode(node, defs, args) {
                                        return eval($dl('uff/$_15932976281654880546789.js'));
                }
                register(BlockNode.prototype.type, compileBlockNode);
                BlockNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_-5295797521654880546791.js'));
                };
                BlockNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_11236838021654880546792.js'));
                };
                BlockNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_10782477341654880546793.js'));
                };
                BlockNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_9827559351654880546794.js'));
                };
                BlockNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_2112843921654880546795.js'));
                };
                BlockNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-11167860191654880546796.js'));
                };
                return BlockNode;
            }
            exports.name = 'BlockNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var latex = __webpack_require__(4);
            var operators = __webpack_require__(52);
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function ConditionalNode(condition, trueExpr, falseExpr) {
                                        var $that = this;
                    eval($dl('uff/$_20471091791654880546797.js'));
                }
                ConditionalNode.prototype = new Node();
                ConditionalNode.prototype.type = 'ConditionalNode';
                ConditionalNode.prototype.isConditionalNode = true;
                function compileConditionalNode(node, defs, args) {
                                        return eval($dl('uff/$_10161260141654880546798.js'));
                }
                register(ConditionalNode.prototype.type, compileConditionalNode);
                ConditionalNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_12182810951654880546799.js'));
                };
                ConditionalNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_3055341591654880546800.js'));
                };
                ConditionalNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-3219822861654880546801.js'));
                };
                ConditionalNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_6838064401654880546802.js'));
                };
                ConditionalNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-13563457241654880546803.js'));
                };
                ConditionalNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_2480634501654880546807.js'));
                };
                return ConditionalNode;
            }
            exports.name = 'ConditionalNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var keywords = __webpack_require__(77);
            var stringify = __webpack_require__(9).stringify;
            var escape = __webpack_require__(9).escape;
            var map = __webpack_require__(2).map;
            var join = __webpack_require__(2).join;
            var latex = __webpack_require__(4);
            var operators = __webpack_require__(52);
            var setSafeProperty = __webpack_require__(13).setSafeProperty;
            var getUniqueArgumentName = __webpack_require__(108);
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function FunctionAssignmentNode(name, params, expr) {
                                        var $that = this;
                    eval($dl('uff/$_-4807436211654880546808.js'));
                }
                FunctionAssignmentNode.prototype = new Node();
                FunctionAssignmentNode.prototype.type = 'FunctionAssignmentNode';
                FunctionAssignmentNode.prototype.isFunctionAssignmentNode = true;
                function compileFunctionAssignmentNode(node, defs, args) {
                                        return eval($dl('uff/$_-13861561641654880546809.js'));
                }
                register(FunctionAssignmentNode.prototype.type, compileFunctionAssignmentNode);
                FunctionAssignmentNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_21355271811654880546810.js'));
                };
                FunctionAssignmentNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_-5882340871654880546811.js'));
                };
                FunctionAssignmentNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_6709879421654880546813.js'));
                };
                function needParenthesis(node, parenthesis) {
                                        return eval($dl('uff/$_-20271320281654880546814.js'));
                }
                FunctionAssignmentNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-13886845571654880546815.js'));
                };
                FunctionAssignmentNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-11814291851654880546815.js'));
                };
                FunctionAssignmentNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_19379255751654880546817.js'));
                };
                return FunctionAssignmentNode;
            }
            exports.name = 'FunctionAssignmentNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports) {
            function getUniqueArgumentName(defs) {
                                return eval($dl('uff/$_1155053781654880546817.js'));
            }
            module.exports = getUniqueArgumentName;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var stringify = __webpack_require__(9).stringify;
            var escape = __webpack_require__(9).escape;
            var isSafeProperty = __webpack_require__(13).isSafeProperty;
            var hasOwnProperty = __webpack_require__(5).hasOwnProperty;
            function factory(type, config, load, typed) {
                var register = load(__webpack_require__(7)).register;
                var compile = load(__webpack_require__(7)).compile;
                var Node = load(__webpack_require__(14));
                function ObjectNode(properties) {
                                        var $that = this;
                    eval($dl('uff/$_18156274171654880546818.js'));
                }
                ObjectNode.prototype = new Node();
                ObjectNode.prototype.type = 'ObjectNode';
                ObjectNode.prototype.isObjectNode = true;
                function compileObjectNode(node, defs, args) {
                                        return eval($dl('uff/$_-18603640501654880546819.js'));
                }
                register(ObjectNode.prototype.type, compileObjectNode);
                ObjectNode.prototype.forEach = function (callback) {
                                        var $that = this;
                    eval($dl('uff/$_13171332031654880546820.js'));
                };
                ObjectNode.prototype.map = function (callback) {
                                        var $that = this;
                    return eval($dl('uff/$_20284956131654880546821.js'));
                };
                ObjectNode.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_13809203541654880546823.js'));
                };
                ObjectNode.prototype._toString = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-20764444431654880546824.js'));
                };
                ObjectNode.prototype.toHTML = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-6265898481654880546824.js'));
                };
                ObjectNode.prototype._toTex = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_1946115981654880546825.js'));
                };
                return ObjectNode;
            }
            exports.name = 'ObjectNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed, math) {
                                return eval($dl('uff/$_9297560641654880546826.js'));
            }
            exports.name = 'parser';
            exports.factory = factory;
            exports.math = true;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var extend = __webpack_require__(5).extend;
            var customs = __webpack_require__(13);
            function factory(type, config, load, typed, math) {
                                return eval($dl('uff/$_13562783481654880546827.js'));
            }
            exports.name = 'Parser';
            exports.path = 'expression';
            exports.factory = factory;
            exports.math = true;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepForEach = __webpack_require__(42);
            var reduce = __webpack_require__(65);
            var containsCollections = __webpack_require__(66);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-12253550141654880546828.js'));
            }
            exports.name = 'max';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var size = __webpack_require__(2).size;
            var deepForEach = __webpack_require__(42);
            var reduce = __webpack_require__(65);
            var containsCollections = __webpack_require__(66);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_3698213411654880546829.js'));
            }
            exports.name = 'mean';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var divideScalar = load(__webpack_require__(19));
                var addScalar = load(__webpack_require__(20));
                var multiply = load(__webpack_require__(12));
                var unaryMinus = load(__webpack_require__(37));
                var det = load(__webpack_require__(115));
                var eye = load(__webpack_require__(61));
                var inv = typed('inv', {
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_12368444311654880546831.js'));
                    },
                    'any': function (x) {
                                                return eval($dl('uff/$_-8525284521654880546832.js'));
                    }
                });
                function _inv(mat, rows, cols) {
                                        return eval($dl('uff/$_-15883944681654880546832.js'));
                }
                inv.toTex = { 1: '\\left(${args[0]}\\right)^{-1}' };
                return inv;
            }
            exports.name = 'inv';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var object = util.object;
            var string = util.string;
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var add = load(__webpack_require__(18));
                var subtract = load(__webpack_require__(21));
                var multiply = load(__webpack_require__(12));
                var unaryMinus = load(__webpack_require__(37));
                var det = typed('det', {
                    'any': function (x) {
                                                return eval($dl('uff/$_19456609641654880546834.js'));
                    },
                    'Array | Matrix': function det(x) {
                        var size;
                        if (type.isMatrix(x)) {
                            size = x.size();
                        } else if (Array.isArray(x)) {
                            x = matrix(x);
                            size = x.size();
                        } else {
                            size = [];
                        }
                        switch (size.length) {
                        case 0:
                            return object.clone(x);
                        case 1:
                            if (size[0] == 1) {
                                return object.clone(x.valueOf()[0]);
                            } else {
                                throw new RangeError('Matrix must be square ' + '(size: ' + string.format(size) + ')');
                            }
                        case 2:
                            var rows = size[0];
                            var cols = size[1];
                            if (rows == cols) {
                                return _det(x.clone().valueOf(), rows, cols);
                            } else {
                                throw new RangeError('Matrix must be square ' + '(size: ' + string.format(size) + ')');
                            }
                        default:
                            throw new RangeError('Matrix must be two dimensional ' + '(size: ' + string.format(size) + ')');
                        }
                    }
                });
                det.toTex = { 1: '\\det\\left(${args[0]}\\right)' };
                return det;
                function _det(matrix, rows, cols) {
                    if (rows == 1) {
                        return object.clone(matrix[0][0]);
                    } else if (rows == 2) {
                        return subtract(multiply(matrix[0][0], matrix[1][1]), multiply(matrix[1][0], matrix[0][1]));
                    } else {
                        var compute_mu = function (matrix) {
                                                        return eval($dl('uff/$_-3809306431654880546835.js'));
                        };
                        var fa = matrix;
                        for (var i = 0; i < rows - 1; i++) {
                            fa = multiply(compute_mu(fa), matrix);
                        }
                        if (rows % 2 == 0) {
                            return unaryMinus(fa[0][0]);
                        } else {
                            return fa[0][0];
                        }
                    }
                }
            }
            exports.name = 'det';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepForEach = __webpack_require__(42);
            var reduce = __webpack_require__(65);
            var containsCollections = __webpack_require__(66);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_3831408451654880546836.js'));
            }
            exports.name = 'min';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-4268118341654880546836.js'));
            }
            exports.name = 'range';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed, math) {
                var parse = load(__webpack_require__(39));
                var ConstantNode = load(__webpack_require__(53));
                var FunctionNode = load(__webpack_require__(54));
                var OperatorNode = load(__webpack_require__(62));
                var ParenthesisNode = load(__webpack_require__(63));
                var SymbolNode = load(__webpack_require__(40));
                var Node = load(__webpack_require__(14));
                var simplifyConstant = load(__webpack_require__(406));
                var simplifyCore = load(__webpack_require__(407));
                var resolve = load(__webpack_require__(408));
                var util = load(__webpack_require__(119));
                var isCommutative = util.isCommutative;
                var isAssociative = util.isAssociative;
                var flatten = util.flatten;
                var unflattenr = util.unflattenr;
                var unflattenl = util.unflattenl;
                var createMakeNodeFunction = util.createMakeNodeFunction;
                var simplify = typed('simplify', {
                    'string': function (expr) {
                                                return eval($dl('uff/$_5853785021654880546838.js'));
                    },
                    'string, Object': function (expr, scope) {
                                                return eval($dl('uff/$_-18606350181654880546839.js'));
                    },
                    'string, Array': function (expr, rules) {
                                                return eval($dl('uff/$_-15486961051654880546840.js'));
                    },
                    'string, Array, Object': function (expr, rules, scope) {
                                                return eval($dl('uff/$_3236305331654880546840.js'));
                    },
                    'Node, Object': function (expr, scope) {
                                                return eval($dl('uff/$_-11281338921654880546841.js'));
                    },
                    'Node': function (expr) {
                        return simplify(expr, simplify.rules, {});
                    },
                    'Node, Array': function (expr, rules) {
                                                return eval($dl('uff/$_-16588504671654880546842.js'));
                    },
                    'Node, Array, Object': function (expr, rules, scope) {
                        rules = _buildRules(rules);
                        var res = resolve(expr, scope);
                        var res = removeParens(res);
                        var visited = {};
                        var str = res.toString({ parenthesis: 'all' });
                        while (!visited[str]) {
                            visited[str] = true;
                            _lastsym = 0;
                            for (var i = 0; i < rules.length; i++) {
                                if (typeof rules[i] === 'function') {
                                    res = rules[i](res);
                                } else {
                                    flatten(res);
                                    res = applyRule(res, rules[i]);
                                }
                                unflattenl(res);
                            }
                            str = res.toString({ parenthesis: 'all' });
                        }
                        return res;
                    }
                });
                simplify.simplifyCore = simplifyCore;
                simplify.resolve = resolve;
                function removeParens(node) {
                    return node.transform(function (node, path, parent) {
                        return type.isParenthesisNode(node) ? node.content : node;
                    });
                }
                var SUPPORTED_CONSTANTS = {
                    true: true,
                    false: true,
                    e: true,
                    i: true,
                    Infinity: true,
                    LN2: true,
                    LN10: true,
                    LOG2E: true,
                    LOG10E: true,
                    NaN: true,
                    phi: true,
                    pi: true,
                    SQRT1_2: true,
                    SQRT2: true,
                    tau: true
                };
                simplify.rules = [
                    simplifyCore,
                    {
                        l: 'log(e)',
                        r: '1'
                    },
                    {
                        l: 'n-n1',
                        r: 'n+-n1'
                    },
                    {
                        l: '-(c*v)',
                        r: '(-c) * v'
                    },
                    {
                        l: '-v',
                        r: '(-1) * v'
                    },
                    {
                        l: 'n/n1^n2',
                        r: 'n*n1^-n2'
                    },
                    {
                        l: 'n/n1',
                        r: 'n*n1^-1'
                    },
                    {
                        l: 'n*n',
                        r: 'n^2'
                    },
                    {
                        l: 'n * n^n1',
                        r: 'n^(n1+1)'
                    },
                    {
                        l: 'n^n1 * n^n2',
                        r: 'n^(n1+n2)'
                    },
                    {
                        l: 'n+n',
                        r: '2*n'
                    },
                    {
                        l: 'n+-n',
                        r: '0'
                    },
                    {
                        l: 'n1*n2 + n2',
                        r: '(n1+1)*n2'
                    },
                    {
                        l: 'n1*n3 + n2*n3',
                        r: '(n1+n2)*n3'
                    },
                    simplifyConstant,
                    {
                        l: '(-n)*n1',
                        r: '-(n*n1)'
                    },
                    {
                        l: 'c+v',
                        r: 'v+c',
                        context: { 'add': { commutative: false } }
                    },
                    {
                        l: 'v*c',
                        r: 'c*v',
                        context: { 'multiply': { commutative: false } }
                    },
                    {
                        l: 'n+-n1',
                        r: 'n-n1'
                    },
                    {
                        l: 'n*(n1^-1)',
                        r: 'n/n1'
                    },
                    {
                        l: 'n*n1^-n2',
                        r: 'n/n1^n2'
                    },
                    {
                        l: 'n1^-1',
                        r: '1/n1'
                    },
                    {
                        l: 'n*(n1/n2)',
                        r: '(n*n1)/n2'
                    },
                    {
                        l: 'n-(n1+n2)',
                        r: 'n-n1-n2'
                    },
                    {
                        l: '1*n',
                        r: 'n'
                    }
                ];
                function _buildRules(rules) {
                    var ruleSet = [];
                    for (var i = 0; i < rules.length; i++) {
                        var rule = rules[i];
                        var newRule;
                        var ruleType = typeof rule;
                        switch (ruleType) {
                        case 'string':
                            var lr = rule.split('->');
                            if (lr.length !== 2) {
                                throw SyntaxError('Could not parse rule: ' + rule);
                            }
                            rule = {
                                l: lr[0],
                                r: lr[1]
                            };
                        case 'object':
                            newRule = {
                                l: removeParens(parse(rule.l)),
                                r: removeParens(parse(rule.r))
                            };
                            if (rule.context) {
                                newRule.evaluate = rule.context;
                            }
                            if (rule.evaluate) {
                                newRule.evaluate = parse(rule.evaluate);
                            }
                            if (newRule.l.isOperatorNode && isAssociative(newRule.l)) {
                                var makeNode = createMakeNodeFunction(newRule.l);
                                var expandsym = _getExpandPlaceholderSymbol();
                                newRule.expanded = {};
                                newRule.expanded.l = makeNode([
                                    newRule.l.clone(),
                                    expandsym
                                ]);
                                flatten(newRule.expanded.l);
                                unflattenr(newRule.expanded.l);
                                newRule.expanded.r = makeNode([
                                    newRule.r,
                                    expandsym
                                ]);
                            }
                            break;
                        case 'function':
                            newRule = rule;
                            break;
                        default:
                            throw TypeError('Unsupported type of rule: ' + ruleType);
                        }
                        ruleSet.push(newRule);
                    }
                    return ruleSet;
                }
                var _lastsym = 0;
                function _getExpandPlaceholderSymbol() {
                    return new SymbolNode('_p' + _lastsym++);
                }
                var applyRule = typed('applyRule', {
                    'Node, Object': function (node, rule) {
                        var res = node;
                        if (res instanceof OperatorNode || res instanceof FunctionNode) {
                            if (res.args) {
                                for (var i = 0; i < res.args.length; i++) {
                                    res.args[i] = applyRule(res.args[i], rule);
                                }
                            }
                        } else if (res instanceof ParenthesisNode) {
                            if (res.content) {
                                res.content = applyRule(res.content, rule);
                            }
                        }
                        var repl = rule.r;
                        var matches = _ruleMatch(rule.l, res)[0];
                        if (!matches && rule.expanded) {
                            repl = rule.expanded.r;
                            matches = _ruleMatch(rule.expanded.l, res)[0];
                        }
                        if (matches) {
                            res = repl.clone();
                            res.traverse(function (n, path, parent) {
                                if (n.isSymbolNode) {
                                    n.transformThisNode = true;
                                }
                            });
                            res = res.transform(function (n, path, parent) {
                                if (n.transformThisNode) {
                                    if (matches.placeholders.hasOwnProperty(n.name)) {
                                        var replace = matches.placeholders[n.name].clone();
                                        return replace;
                                    }
                                }
                                return n;
                            });
                        }
                        return res;
                    }
                });
                function getSplits(node, context) {
                    var res = [];
                    var right, rightArgs;
                    var makeNode = createMakeNodeFunction(node);
                    if (isCommutative(node, context)) {
                        for (var i = 0; i < node.args.length; i++) {
                            rightArgs = node.args.slice(0);
                            rightArgs.splice(i, 1);
                            right = rightArgs.length === 1 ? rightArgs[0] : makeNode(rightArgs);
                            res.push(makeNode([
                                node.args[i],
                                right
                            ]));
                        }
                    } else {
                        rightArgs = node.args.slice(1);
                        right = rightArgs.length === 1 ? rightArgs[0] : makeNode(rightArgs);
                        res.push(makeNode([
                            node.args[0],
                            right
                        ]));
                    }
                    return res;
                }
                function mergeMatch(match1, match2) {
                    var res = { placeholders: {} };
                    if (!match1.placeholders && !match2.placeholders) {
                        return res;
                    } else if (!match1.placeholders) {
                        return match2;
                    } else if (!match2.placeholders) {
                        return match1;
                    }
                    for (var key in match1.placeholders) {
                        res.placeholders[key] = match1.placeholders[key];
                        if (match2.placeholders.hasOwnProperty(key)) {
                            if (!_exactMatch(match1.placeholders[key], match2.placeholders[key])) {
                                return null;
                            }
                        }
                    }
                    for (var key in match2.placeholders) {
                        res.placeholders[key] = match2.placeholders[key];
                    }
                    return res;
                }
                function combineChildMatches(list1, list2) {
                    var res = [];
                    if (list1.length === 0 || list2.length === 0) {
                        return res;
                    }
                    var merged;
                    for (var i1 = 0; i1 < list1.length; i1++) {
                        for (var i2 = 0; i2 < list2.length; i2++) {
                            merged = mergeMatch(list1[i1], list2[i2]);
                            if (merged) {
                                res.push(merged);
                            }
                        }
                    }
                    return res;
                }
                function mergeChildMatches(childMatches) {
                    if (childMatches.length === 0) {
                        return childMatches;
                    }
                    var sets = childMatches.reduce(combineChildMatches);
                    var uniqueSets = [];
                    var unique = {};
                    for (var i = 0; i < sets.length; i++) {
                        var s = JSON.stringify(sets[i]);
                        if (!unique[s]) {
                            unique[s] = true;
                            uniqueSets.push(sets[i]);
                        }
                    }
                    return uniqueSets;
                }
                function _ruleMatch(rule, node, isSplit) {
                    var res = [{ placeholders: {} }];
                    if (rule instanceof OperatorNode && node instanceof OperatorNode || rule instanceof FunctionNode && node instanceof FunctionNode) {
                        if (rule instanceof OperatorNode) {
                            if (rule.op !== node.op || rule.fn !== node.fn) {
                                return [];
                            }
                        } else if (rule instanceof FunctionNode) {
                            if (rule.name !== node.name) {
                                return [];
                            }
                        }
                        if (node.args.length === 1 && rule.args.length === 1 || !isAssociative(node) || isSplit) {
                            var childMatches = [];
                            for (var i = 0; i < rule.args.length; i++) {
                                var childMatch = _ruleMatch(rule.args[i], node.args[i]);
                                if (childMatch.length === 0) {
                                    return [];
                                }
                                childMatches.push(childMatch);
                            }
                            res = mergeChildMatches(childMatches);
                        } else if (node.args.length >= 2 && rule.args.length === 2) {
                            var splits = getSplits(node, rule.context);
                            var splitMatches = [];
                            for (var i = 0; i < splits.length; i++) {
                                var matchSet = _ruleMatch(rule, splits[i], true);
                                splitMatches = splitMatches.concat(matchSet);
                            }
                            return splitMatches;
                        } else if (rule.args.length > 2) {
                            throw Error('Unexpected non-binary associative function: ' + rule.toString());
                        } else {
                            return [];
                        }
                    } else if (rule instanceof SymbolNode) {
                        if (rule.name.length === 0) {
                            throw new Error('Symbol in rule has 0 length...!?');
                        }
                        if (math.hasOwnProperty(rule.name)) {
                            if (!SUPPORTED_CONSTANTS[rule.name]) {
                                throw new Error('Built in constant: ' + rule.name + ' is not supported by simplify.');
                            }
                            if (rule.name !== node.name) {
                                return [];
                            }
                        } else if (rule.name[0] === 'n' || rule.name.substring(0, 2) === '_p') {
                            res[0].placeholders[rule.name] = node;
                        } else if (rule.name[0] === 'v') {
                            if (!type.isConstantNode(node)) {
                                res[0].placeholders[rule.name] = node;
                            } else {
                                return [];
                            }
                        } else if (rule.name[0] === 'c') {
                            if (node instanceof ConstantNode) {
                                res[0].placeholders[rule.name] = node;
                            } else {
                                return [];
                            }
                        } else {
                            throw new Error('Invalid symbol in rule: ' + rule.name);
                        }
                    } else if (rule instanceof ConstantNode) {
                        if (rule.value !== node.value) {
                            return [];
                        }
                    } else {
                        return [];
                    }
                    return res;
                }
                function _exactMatch(p, q) {
                    if (p instanceof ConstantNode && q instanceof ConstantNode) {
                        if (p.value !== q.value) {
                            return false;
                        }
                    } else if (p instanceof SymbolNode && q instanceof SymbolNode) {
                        if (p.name !== q.name) {
                            return false;
                        }
                    } else if (p instanceof OperatorNode && q instanceof OperatorNode || p instanceof FunctionNode && q instanceof FunctionNode) {
                        if (p instanceof OperatorNode) {
                            if (p.op !== q.op || p.fn !== q.fn) {
                                return false;
                            }
                        } else if (p instanceof FunctionNode) {
                            if (p.name !== q.name) {
                                return false;
                            }
                        }
                        if (p.args.length !== q.args.length) {
                            return false;
                        }
                        for (var i = 0; i < p.args.length; i++) {
                            if (!_exactMatch(p.args[i], q.args[i])) {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                    return true;
                }
                return simplify;
            }
            exports.math = true;
            exports.name = 'simplify';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed, math) {
                var FunctionNode = math.expression.node.FunctionNode;
                var OperatorNode = math.expression.node.OperatorNode;
                var SymbolNode = math.expression.node.SymbolNode;
                var commutative = {
                    'add': true,
                    'multiply': true
                };
                var associative = {
                    'add': true,
                    'multiply': true
                };
                function isCommutative(node, context) {
                    if (!node.args || node.args.length <= 1) {
                        return true;
                    }
                    var name = node.fn.toString();
                    if (context && context.hasOwnProperty(name) && context[name].hasOwnProperty('commutative')) {
                        return context[name].commutative;
                    }
                    return commutative[name] || false;
                }
                function isAssociative(node, context) {
                    if (!node.args || node.args.length <= 1) {
                        return true;
                    }
                    var name = node.fn.toString();
                    if (context && context.hasOwnProperty(name) && context[name].hasOwnProperty('associative')) {
                        return context[name].associative;
                    }
                    return associative[name] || false;
                }
                function flatten(node) {
                    if (!node.args || node.args.length === 0) {
                        return node;
                    }
                    node.args = allChildren(node);
                    for (var i = 0; i < node.args.length; i++) {
                        flatten(node.args[i]);
                    }
                }
                function allChildren(node) {
                    var op;
                    var children = [];
                    var findChildren = function (node) {
                        for (var i = 0; i < node.args.length; i++) {
                            var child = node.args[i];
                            if (type.isOperatorNode(child) && op === child.op) {
                                findChildren(child);
                            } else {
                                children.push(child);
                            }
                        }
                    };
                    if (type.isOperatorNode(node) && isAssociative(node)) {
                        op = node.op;
                        findChildren(node);
                        return children;
                    } else {
                        return node.args;
                    }
                }
                function unflattenr(node) {
                    if (!node.args || node.args.length === 0) {
                        return;
                    }
                    var makeNode = createMakeNodeFunction(node);
                    var l = node.args.length;
                    for (var i = 0; i < l; i++) {
                        unflattenr(node.args[i]);
                    }
                    if (l > 2 && isAssociative(node)) {
                        var curnode = node.args.pop();
                        while (node.args.length > 0) {
                            curnode = makeNode([
                                node.args.pop(),
                                curnode
                            ]);
                        }
                        node.args = curnode.args;
                    }
                }
                function unflattenl(node) {
                    if (!node.args || node.args.length === 0) {
                        return;
                    }
                    var makeNode = createMakeNodeFunction(node);
                    var l = node.args.length;
                    for (var i = 0; i < l; i++) {
                        unflattenl(node.args[i]);
                    }
                    if (l > 2 && isAssociative(node)) {
                        var curnode = node.args.shift();
                        while (node.args.length > 0) {
                            curnode = makeNode([
                                curnode,
                                node.args.shift()
                            ]);
                        }
                        node.args = curnode.args;
                    }
                }
                function createMakeNodeFunction(node) {
                    if (type.isOperatorNode(node)) {
                        return function (args) {
                            try {
                                return new OperatorNode(node.op, node.fn, args);
                            } catch (err) {
                                console.error(err);
                                return [];
                            }
                        };
                    } else {
                        return function (args) {
                                                        return eval($dl('uff/$_-10743977291654880546844.js'));
                        };
                    }
                }
                return {
                    createMakeNodeFunction: createMakeNodeFunction,
                    isCommutative: isCommutative,
                    isAssociative: isAssociative,
                    flatten: flatten,
                    allChildren: allChildren,
                    unflattenr: unflattenr,
                    unflattenl: unflattenl
                };
            }
            exports.factory = factory;
            exports.math = true;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var object = __webpack_require__(5);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_5199388051654880546845.js'));
            }
            exports.name = 'clone';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var nearlyEqual = __webpack_require__(3).nearlyEqual;
            var bigNearlyEqual = __webpack_require__(35);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_7108665901654880546846.js'));
            }
            exports.name = 'unequal';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var number = __webpack_require__(3);
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-4275225951654880546848.js'));
            }
            exports.name = 'sign';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_20332466811654880546848.js'));
            }
            exports.name = 'conj';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var object = util.object;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-3836275641654880546849.js'));
            }
            exports.name = 'lup';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var number = util.number, isInteger = number.isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_10873911321654880546851.js'));
            }
            exports.name = 'slu';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_18741974561654880546852.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var nearlyEqual = __webpack_require__(3).nearlyEqual;
            var bigNearlyEqual = __webpack_require__(35);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_1401016911654880546853.js'));
            }
            exports.name = 'largerEq';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_19881333761654880546855.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-17543187631654880546856.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-3908493221654880546856.js'));
            }
            exports.name = 'lsolve';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-15011334331654880546858.js'));
            }
            exports.name = 'usolve';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_11494777621654880546860.js'));
            }
            exports.name = 'dotDivide';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            function factory(type, config, load, typed) {
                var equalScalar = load(__webpack_require__(11));
                var SparseMatrix = type.SparseMatrix;
                var algorithm09 = function (a, b, callback) {
                                        return eval($dl('uff/$_3005335341654880546861.js'));
                };
                return algorithm09;
            }
            exports.name = 'algorithm09';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var divideScalar = load(__webpack_require__(19));
                var log = typed('log', {
                    'number': function (x) {
                        if (x >= 0 || config.predictable) {
                            return Math.log(x);
                        } else {
                            return new type.Complex(x, 0).log();
                        }
                    },
                    'Complex': function (x) {
                                                return eval($dl('uff/$_-16878076721654880546863.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_-5529457281654880546864.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_-8421255821654880546864.js'));
                    },
                    'any, any': function (x, base) {
                        return divideScalar(log(x), log(base));
                    }
                });
                log.toTex = {
                    1: '\\ln\\left(${args[0]}\\right)',
                    2: '\\log_{${args[1]}}\\left(${args[0]}\\right)'
                };
                return log;
            }
            exports.name = 'log';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var clone = __webpack_require__(5).clone;
            var format = __webpack_require__(9).format;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_8493826241654880546865.js'));
            }
            exports.name = 'trace';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-11477640401654880546866.js'));
            }
            exports.name = 'stirlingS2';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12806264361654880546867.js'));
            }
            var g = 4.7421875;
            var p = [
                0.9999999999999971,
                57.15623566586292,
                -59.59796035547549,
                14.136097974741746,
                -0.4919138160976202,
                0.00003399464998481189,
                0.00004652362892704858,
                -0.00009837447530487956,
                0.0001580887032249125,
                -0.00021026444172410488,
                0.00021743961811521265,
                -0.0001643181065367639,
                0.00008441822398385275,
                -0.000026190838401581408,
                0.0000036899182659531625
            ];
            exports.name = 'gamma';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_7652365061654880546869.js'));
            }
            exports.name = 'not';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var maxArgumentCount = __webpack_require__(32).maxArgumentCount;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_2316195181654880546869.js'));
            }
            function _map(array, callback) {
                                return eval($dl('uff/$_2738729761654880546870.js'));
            }
            exports.name = 'map';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var size = __webpack_require__(2).size;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_2001867761654880546871.js'));
            }
            exports.name = 'sort';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepForEach = __webpack_require__(42);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_334128431654880546872.js'));
            }
            exports.name = 'sum';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            var identify = __webpack_require__(2).identify;
            var generalize = __webpack_require__(2).generalize;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9265745931654880546873.js'));
            }
            exports.name = 'setDifference';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            var identify = __webpack_require__(2).identify;
            var generalize = __webpack_require__(2).generalize;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9013121131654880546874.js'));
            }
            exports.name = 'setIntersect';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-10969846191654880546875.js'));
            }
            exports.name = 'setSymDifference';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            var reduce = __webpack_require__(65);
            var containsCollections = __webpack_require__(66);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-8511990281654880546876.js'));
            }
            exports.name = 'median';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DEFAULT_NORMALIZATION = 'unbiased';
            var deepForEach = __webpack_require__(42);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9528240911654880546877.js'));
            }
            exports.name = 'var';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_10289275181654880546878.js'));
            }
            var _acosh = Math.acosh || function (x) {
                                return eval($dl('uff/$_-15337348961654880546879.js'));
            };
            exports.name = 'acosh';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var core = __webpack_require__(149);
            function create(config) {
                var math = core.create(config);
                math.create = create;
                math['import'](__webpack_require__(156));
                return math;
            }
            module.exports = create();
        },
        function (module, exports, __webpack_require__) {
            module.exports = __webpack_require__(150);
        },
        function (module, exports, __webpack_require__) {
            var isFactory = __webpack_require__(5).isFactory;
            var typedFactory = __webpack_require__(151);
            var emitter = __webpack_require__(90);
            var importFactory = __webpack_require__(154);
            var configFactory = __webpack_require__(155);
            exports.create = function create(options) {
                if (typeof Object.create !== 'function') {
                    throw new Error('ES5 not supported by this JavaScript engine. ' + 'Please load the es5-shim and es5-sham library for compatibility.');
                }
                var factories = [];
                var instances = [];
                var math = emitter.mixin({});
                math.type = {};
                math.expression = {
                    transform: {},
                    mathWithTransform: {}
                };
                math.typed = typedFactory.create(math.type);
                var _config = {
                    epsilon: 1e-12,
                    matrix: 'Matrix',
                    number: 'number',
                    precision: 64,
                    predictable: false,
                    randomSeed: null
                };
                function load(factory) {
                    if (!isFactory(factory)) {
                        throw new Error('Factory object with properties `type`, `name`, and `factory` expected');
                    }
                    var index = factories.indexOf(factory);
                    var instance;
                    if (index === -1) {
                        if (factory.math === true) {
                            instance = factory.factory(math.type, _config, load, math.typed, math);
                        } else {
                            instance = factory.factory(math.type, _config, load, math.typed);
                        }
                        factories.push(factory);
                        instances.push(instance);
                    } else {
                        instance = instances[index];
                    }
                    return instance;
                }
                math['import'] = load(importFactory);
                math['config'] = load(configFactory);
                math.expression.mathWithTransform['config'] = math['config'];
                if (options) {
                    math.config(options);
                }
                return math;
            };
        },
        function (module, exports, __webpack_require__) {
            var typedFunction = __webpack_require__(152);
            var digits = __webpack_require__(3).digits;
            var isBigNumber = __webpack_require__(71);
            var isMatrix = __webpack_require__(58);
            var createTyped = function () {
                createTyped = typedFunction.create;
                return typedFunction;
            };
            exports.create = function create(type) {
                type.isNumber = function (x) {
                    return typeof x === 'number';
                };
                type.isComplex = function (x) {
                    return type.Complex && x instanceof type.Complex || false;
                };
                type.isBigNumber = isBigNumber;
                type.isFraction = function (x) {
                    return type.Fraction && x instanceof type.Fraction || false;
                };
                type.isUnit = function (x) {
                    return x && x.constructor.prototype.isUnit || false;
                };
                type.isString = function (x) {
                    return typeof x === 'string';
                };
                type.isArray = Array.isArray;
                type.isMatrix = isMatrix;
                type.isDenseMatrix = function (x) {
                                        return eval($dl('uff/$_20824996351654880546881.js'));
                };
                type.isSparseMatrix = function (x) {
                                        return eval($dl('uff/$_-18634933601654880546881.js'));
                };
                type.isRange = function (x) {
                                        return eval($dl('uff/$_-12734390491654880546882.js'));
                };
                type.isIndex = function (x) {
                                        return eval($dl('uff/$_-19404938861654880546883.js'));
                };
                type.isBoolean = function (x) {
                    return typeof x === 'boolean';
                };
                type.isResultSet = function (x) {
                                        return eval($dl('uff/$_11431780951654880546884.js'));
                };
                type.isHelp = function (x) {
                                        return eval($dl('uff/$_18651340651654880546884.js'));
                };
                type.isFunction = function (x) {
                                        return eval($dl('uff/$_-16060716211654880546885.js'));
                };
                type.isDate = function (x) {
                                        return eval($dl('uff/$_-2804973251654880546886.js'));
                };
                type.isRegExp = function (x) {
                                        return eval($dl('uff/$_-15775548661654880546887.js'));
                };
                type.isObject = function (x) {
                    return typeof x === 'object';
                };
                type.isNull = function (x) {
                    return x === null;
                };
                type.isUndefined = function (x) {
                                        return eval($dl('uff/$_-8673884501654880546888.js'));
                };
                type.isAccessorNode = function (x) {
                                        return eval($dl('uff/$_-4443226811654880546889.js'));
                };
                type.isArrayNode = function (x) {
                                        return eval($dl('uff/$_2538476711654880546890.js'));
                };
                type.isAssignmentNode = function (x) {
                                        return eval($dl('uff/$_18248154891654880546890.js'));
                };
                type.isBlockNode = function (x) {
                                        return eval($dl('uff/$_11457443231654880546891.js'));
                };
                type.isConditionalNode = function (x) {
                                        return eval($dl('uff/$_-7127498461654880546892.js'));
                };
                type.isConstantNode = function (x) {
                    return x && x.isConstantNode && x.constructor.prototype.isNode || false;
                };
                type.isFunctionAssignmentNode = function (x) {
                                        return eval($dl('uff/$_9660338011654880546893.js'));
                };
                type.isFunctionNode = function (x) {
                    return x && x.isFunctionNode && x.constructor.prototype.isNode || false;
                };
                type.isIndexNode = function (x) {
                                        return eval($dl('uff/$_-5948626261654880546894.js'));
                };
                type.isNode = function (x) {
                    return x && x.isNode && x.constructor.prototype.isNode || false;
                };
                type.isObjectNode = function (x) {
                                        return eval($dl('uff/$_5030390551654880546895.js'));
                };
                type.isOperatorNode = function (x) {
                    return x && x.isOperatorNode && x.constructor.prototype.isNode || false;
                };
                type.isParenthesisNode = function (x) {
                    return x && x.isParenthesisNode && x.constructor.prototype.isNode || false;
                };
                type.isRangeNode = function (x) {
                                        return eval($dl('uff/$_-2880509251654880546896.js'));
                };
                type.isSymbolNode = function (x) {
                    return x && x.isSymbolNode && x.constructor.prototype.isNode || false;
                };
                type.isChain = function (x) {
                    return x && x.constructor.prototype.isChain || false;
                };
                var typed = createTyped();
                typed.types = [
                    {
                        name: 'number',
                        test: type.isNumber
                    },
                    {
                        name: 'Complex',
                        test: type.isComplex
                    },
                    {
                        name: 'BigNumber',
                        test: type.isBigNumber
                    },
                    {
                        name: 'Fraction',
                        test: type.isFraction
                    },
                    {
                        name: 'Unit',
                        test: type.isUnit
                    },
                    {
                        name: 'string',
                        test: type.isString
                    },
                    {
                        name: 'Array',
                        test: type.isArray
                    },
                    {
                        name: 'Matrix',
                        test: type.isMatrix
                    },
                    {
                        name: 'DenseMatrix',
                        test: type.isDenseMatrix
                    },
                    {
                        name: 'SparseMatrix',
                        test: type.isSparseMatrix
                    },
                    {
                        name: 'Range',
                        test: type.isRange
                    },
                    {
                        name: 'Index',
                        test: type.isIndex
                    },
                    {
                        name: 'boolean',
                        test: type.isBoolean
                    },
                    {
                        name: 'ResultSet',
                        test: type.isResultSet
                    },
                    {
                        name: 'Help',
                        test: type.isHelp
                    },
                    {
                        name: 'function',
                        test: type.isFunction
                    },
                    {
                        name: 'Date',
                        test: type.isDate
                    },
                    {
                        name: 'RegExp',
                        test: type.isRegExp
                    },
                    {
                        name: 'Object',
                        test: type.isObject
                    },
                    {
                        name: 'null',
                        test: type.isNull
                    },
                    {
                        name: 'undefined',
                        test: type.isUndefined
                    },
                    {
                        name: 'OperatorNode',
                        test: type.isOperatorNode
                    },
                    {
                        name: 'ConstantNode',
                        test: type.isConstantNode
                    },
                    {
                        name: 'SymbolNode',
                        test: type.isSymbolNode
                    },
                    {
                        name: 'ParenthesisNode',
                        test: type.isParenthesisNode
                    },
                    {
                        name: 'FunctionNode',
                        test: type.isFunctionNode
                    },
                    {
                        name: 'FunctionAssignmentNode',
                        test: type.isFunctionAssignmentNode
                    },
                    {
                        name: 'ArrayNode',
                        test: type.isArrayNode
                    },
                    {
                        name: 'AssignmentNode',
                        test: type.isAssignmentNode
                    },
                    {
                        name: 'BlockNode',
                        test: type.isBlockNode
                    },
                    {
                        name: 'ConditionalNode',
                        test: type.isConditionalNode
                    },
                    {
                        name: 'IndexNode',
                        test: type.isIndexNode
                    },
                    {
                        name: 'RangeNode',
                        test: type.isRangeNode
                    },
                    {
                        name: 'Node',
                        test: type.isNode
                    }
                ];
                typed.conversions = [
                    {
                        from: 'number',
                        to: 'BigNumber',
                        convert: function (x) {
                                                        return eval($dl('uff/$_9702357041654880546897.js'));
                        }
                    },
                    {
                        from: 'number',
                        to: 'Complex',
                        convert: function (x) {
                            return new type.Complex(x, 0);
                        }
                    },
                    {
                        from: 'number',
                        to: 'string',
                        convert: function (x) {
                                                        return eval($dl('uff/$_-10487219801654880546898.js'));
                        }
                    },
                    {
                        from: 'BigNumber',
                        to: 'Complex',
                        convert: function (x) {
                                                        return eval($dl('uff/$_2033893891654880546899.js'));
                        }
                    },
                    {
                        from: 'Fraction',
                        to: 'BigNumber',
                        convert: function (x) {
                                                        eval($dl('uff/$_-3957131431654880546899.js'));
                        }
                    },
                    {
                        from: 'Fraction',
                        to: 'Complex',
                        convert: function (x) {
                                                        return eval($dl('uff/$_-21390313651654880546900.js'));
                        }
                    },
                    {
                        from: 'number',
                        to: 'Fraction',
                        convert: function (x) {
                                                        return eval($dl('uff/$_17481827351654880546901.js'));
                        }
                    },
                    {
                        from: 'string',
                        to: 'number',
                        convert: function (x) {
                                                        return eval($dl('uff/$_-19786245931654880546902.js'));
                        }
                    },
                    {
                        from: 'string',
                        to: 'BigNumber',
                        convert: function (x) {
                                                        return eval($dl('uff/$_-2255348291654880546903.js'));
                        }
                    },
                    {
                        from: 'string',
                        to: 'Fraction',
                        convert: function (x) {
                                                        return eval($dl('uff/$_-6086234711654880546904.js'));
                        }
                    },
                    {
                        from: 'string',
                        to: 'Complex',
                        convert: function (x) {
                                                        return eval($dl('uff/$_-3596831491654880546905.js'));
                        }
                    },
                    {
                        from: 'boolean',
                        to: 'number',
                        convert: function (x) {
                                                        return eval($dl('uff/$_20558528841654880546906.js'));
                        }
                    },
                    {
                        from: 'boolean',
                        to: 'BigNumber',
                        convert: function (x) {
                                                        return eval($dl('uff/$_-18603444001654880546906.js'));
                        }
                    },
                    {
                        from: 'boolean',
                        to: 'Fraction',
                        convert: function (x) {
                                                        return eval($dl('uff/$_10677923871654880546907.js'));
                        }
                    },
                    {
                        from: 'boolean',
                        to: 'string',
                        convert: function (x) {
                                                        return eval($dl('uff/$_20558528841654880546908.js'));
                        }
                    },
                    {
                        from: 'null',
                        to: 'number',
                        convert: function () {
                                                        return eval($dl('uff/$_12168163611654880546909.js'));
                        }
                    },
                    {
                        from: 'null',
                        to: 'string',
                        convert: function () {
                                                        return eval($dl('uff/$_9945297601654880546909.js'));
                        }
                    },
                    {
                        from: 'null',
                        to: 'BigNumber',
                        convert: function () {
                                                        return eval($dl('uff/$_-17489282191654880546910.js'));
                        }
                    },
                    {
                        from: 'null',
                        to: 'Fraction',
                        convert: function () {
                                                        return eval($dl('uff/$_-20701141901654880546911.js'));
                        }
                    },
                    {
                        from: 'Array',
                        to: 'Matrix',
                        convert: function (array) {
                                                        return eval($dl('uff/$_4016865221654880546911.js'));
                        }
                    },
                    {
                        from: 'Matrix',
                        to: 'Array',
                        convert: function (matrix) {
                                                        return eval($dl('uff/$_8613812831654880546912.js'));
                        }
                    }
                ];
                return typed;
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function (root, factory) {
                if (true) {
                    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else if (typeof exports === 'object') {
                    module.exports = factory();
                } else {
                    root.typed = factory();
                }
            }(this, function () {
                function create() {
                    function getTypeTest(name) {
                        var test;
                        for (var i = 0; i < typed.types.length; i++) {
                            var entry = typed.types[i];
                            if (entry.name === name) {
                                test = entry.test;
                                break;
                            }
                        }
                        if (!test) {
                            var hint;
                            for (i = 0; i < typed.types.length; i++) {
                                entry = typed.types[i];
                                if (entry.name.toLowerCase() == name.toLowerCase()) {
                                    hint = entry.name;
                                    break;
                                }
                            }
                            throw new Error('Unknown type "' + name + '"' + (hint ? '. Did you mean "' + hint + '"?' : ''));
                        }
                        return test;
                    }
                    function getName(fns) {
                        var name = '';
                        for (var i = 0; i < fns.length; i++) {
                            var fn = fns[i];
                            if (fn.signatures && fn.name != '') {
                                if (name == '') {
                                    name = fn.name;
                                } else if (name != fn.name) {
                                    var err = new Error('Function names do not match (expected: ' + name + ', actual: ' + fn.name + ')');
                                    err.data = {
                                        actual: fn.name,
                                        expected: name
                                    };
                                    throw err;
                                }
                            }
                        }
                        return name;
                    }
                    function createError(fn, argCount, index, actual, expected) {
                                                return eval($dl('uff/$_1129350391654880546913.js'));
                    }
                    function Refs(name) {
                        this.name = name || 'refs';
                        this.categories = {};
                    }
                    Refs.prototype.add = function (fn, category) {
                        var cat = category || 'fn';
                        if (!this.categories[cat])
                            this.categories[cat] = [];
                        var index = this.categories[cat].indexOf(fn);
                        if (index == -1) {
                            index = this.categories[cat].length;
                            this.categories[cat].push(fn);
                        }
                        return cat + index;
                    };
                    Refs.prototype.toCode = function () {
                        var code = [];
                        var path = this.name + '.categories';
                        var categories = this.categories;
                        for (var cat in categories) {
                            if (categories.hasOwnProperty(cat)) {
                                var category = categories[cat];
                                for (var i = 0; i < category.length; i++) {
                                    code.push('var ' + cat + i + ' = ' + path + '[\'' + cat + '\'][' + i + '];');
                                }
                            }
                        }
                        return code.join('\n');
                    };
                    function Param(types, varArgs) {
                        if (typeof types === 'string') {
                            var _types = types.trim();
                            var _varArgs = _types.substr(0, 3) === '...';
                            if (_varArgs) {
                                _types = _types.substr(3);
                            }
                            if (_types === '') {
                                this.types = ['any'];
                            } else {
                                this.types = _types.split('|');
                                for (var i = 0; i < this.types.length; i++) {
                                    this.types[i] = this.types[i].trim();
                                }
                            }
                        } else if (Array.isArray(types)) {
                            this.types = types;
                        } else if (types instanceof Param) {
                            return types.clone();
                        } else {
                            throw new Error('String or Array expected');
                        }
                        this.conversions = [];
                        this.varArgs = _varArgs || varArgs || false;
                        this.anyType = this.types.indexOf('any') !== -1;
                    }
                    Param.compare = function (a, b) {
                        if (a.anyType)
                            return 1;
                        if (b.anyType)
                            return -1;
                        if (contains(a.types, 'Object'))
                            return 1;
                        if (contains(b.types, 'Object'))
                            return -1;
                        if (a.hasConversions()) {
                            if (b.hasConversions()) {
                                var i, ac, bc;
                                for (i = 0; i < a.conversions.length; i++) {
                                    if (a.conversions[i] !== undefined) {
                                        ac = a.conversions[i];
                                        break;
                                    }
                                }
                                for (i = 0; i < b.conversions.length; i++) {
                                    if (b.conversions[i] !== undefined) {
                                        bc = b.conversions[i];
                                        break;
                                    }
                                }
                                return typed.conversions.indexOf(ac) - typed.conversions.indexOf(bc);
                            } else {
                                return 1;
                            }
                        } else {
                            if (b.hasConversions()) {
                                return -1;
                            } else {
                                var ai, bi;
                                for (i = 0; i < typed.types.length; i++) {
                                    if (typed.types[i].name === a.types[0]) {
                                        ai = i;
                                        break;
                                    }
                                }
                                for (i = 0; i < typed.types.length; i++) {
                                    if (typed.types[i].name === b.types[0]) {
                                        bi = i;
                                        break;
                                    }
                                }
                                return ai - bi;
                            }
                        }
                    };
                    Param.prototype.overlapping = function (other) {
                        for (var i = 0; i < this.types.length; i++) {
                            if (contains(other.types, this.types[i])) {
                                return true;
                            }
                        }
                        return false;
                    };
                    Param.prototype.matches = function (other) {
                        return this.anyType || other.anyType || this.overlapping(other);
                    };
                    Param.prototype.clone = function () {
                        var param = new Param(this.types.slice(), this.varArgs);
                        param.conversions = this.conversions.slice();
                        return param;
                    };
                    Param.prototype.hasConversions = function () {
                        return this.conversions.length > 0;
                    };
                    Param.prototype.contains = function (types) {
                        for (var i = 0; i < this.types.length; i++) {
                            if (types[this.types[i]]) {
                                return true;
                            }
                        }
                        return false;
                    };
                    Param.prototype.toString = function (toConversion) {
                        var types = [];
                        var keys = {};
                        for (var i = 0; i < this.types.length; i++) {
                            var conversion = this.conversions[i];
                            var type = toConversion && conversion ? conversion.to : this.types[i];
                            if (!(type in keys)) {
                                keys[type] = true;
                                types.push(type);
                            }
                        }
                        return (this.varArgs ? '...' : '') + types.join('|');
                    };
                    function Signature(params, fn) {
                        var _params;
                        if (typeof params === 'string') {
                            _params = params !== '' ? params.split(',') : [];
                        } else if (Array.isArray(params)) {
                            _params = params;
                        } else {
                            throw new Error('string or Array expected');
                        }
                        this.params = new Array(_params.length);
                        this.anyType = false;
                        this.varArgs = false;
                        for (var i = 0; i < _params.length; i++) {
                            var param = new Param(_params[i]);
                            this.params[i] = param;
                            if (param.anyType) {
                                this.anyType = true;
                            }
                            if (i === _params.length - 1) {
                                this.varArgs = param.varArgs;
                            } else {
                                if (param.varArgs) {
                                    throw new SyntaxError('Unexpected variable arguments operator "..."');
                                }
                            }
                        }
                        this.fn = fn;
                    }
                    Signature.prototype.clone = function () {
                                                var $that = this;
                        return eval($dl('uff/$_13737702811654880546915.js'));
                    };
                    Signature.prototype.expand = function () {
                        var signatures = [];
                        function recurse(signature, path) {
                            if (path.length < signature.params.length) {
                                var i, newParam, conversion;
                                var param = signature.params[path.length];
                                if (param.varArgs) {
                                    newParam = param.clone();
                                    for (i = 0; i < typed.conversions.length; i++) {
                                        conversion = typed.conversions[i];
                                        if (!contains(param.types, conversion.from) && contains(param.types, conversion.to)) {
                                            var j = newParam.types.length;
                                            newParam.types[j] = conversion.from;
                                            newParam.conversions[j] = conversion;
                                        }
                                    }
                                    recurse(signature, path.concat(newParam));
                                } else {
                                    for (i = 0; i < param.types.length; i++) {
                                        recurse(signature, path.concat(new Param(param.types[i])));
                                    }
                                    for (i = 0; i < typed.conversions.length; i++) {
                                        conversion = typed.conversions[i];
                                        if (!contains(param.types, conversion.from) && contains(param.types, conversion.to)) {
                                            newParam = new Param(conversion.from);
                                            newParam.conversions[0] = conversion;
                                            recurse(signature, path.concat(newParam));
                                        }
                                    }
                                }
                            } else {
                                signatures.push(new Signature(path, signature.fn));
                            }
                        }
                        recurse(this, []);
                        return signatures;
                    };
                    Signature.compare = function (a, b) {
                        if (a.params.length > b.params.length)
                            return 1;
                        if (a.params.length < b.params.length)
                            return -1;
                        var i;
                        var len = a.params.length;
                        var ac = 0;
                        var bc = 0;
                        for (i = 0; i < len; i++) {
                            if (a.params[i].hasConversions())
                                ac++;
                            if (b.params[i].hasConversions())
                                bc++;
                        }
                        if (ac > bc)
                            return 1;
                        if (ac < bc)
                            return -1;
                        for (i = 0; i < a.params.length; i++) {
                            var cmp = Param.compare(a.params[i], b.params[i]);
                            if (cmp !== 0) {
                                return cmp;
                            }
                        }
                        return 0;
                    };
                    Signature.prototype.hasConversions = function () {
                        for (var i = 0; i < this.params.length; i++) {
                            if (this.params[i].hasConversions()) {
                                return true;
                            }
                        }
                        return false;
                    };
                    Signature.prototype.ignore = function () {
                        var types = {};
                        for (var i = 0; i < typed.ignore.length; i++) {
                            types[typed.ignore[i]] = true;
                        }
                        for (i = 0; i < this.params.length; i++) {
                            if (this.params[i].contains(types)) {
                                return true;
                            }
                        }
                        return false;
                    };
                    Signature.prototype.paramsStartWith = function (params) {
                        if (params.length === 0) {
                            return true;
                        }
                        var aLast = last(this.params);
                        var bLast = last(params);
                        for (var i = 0; i < params.length; i++) {
                            var a = this.params[i] || (aLast.varArgs ? aLast : null);
                            var b = params[i] || (bLast.varArgs ? bLast : null);
                            if (!a || !b || !a.matches(b)) {
                                return false;
                            }
                        }
                        return true;
                    };
                    Signature.prototype.toCode = function (refs, prefix) {
                        var code = [];
                        var args = new Array(this.params.length);
                        for (var i = 0; i < this.params.length; i++) {
                            var param = this.params[i];
                            var conversion = param.conversions[0];
                            if (param.varArgs) {
                                args[i] = 'varArgs';
                            } else if (conversion) {
                                args[i] = refs.add(conversion.convert, 'convert') + '(arg' + i + ')';
                            } else {
                                args[i] = 'arg' + i;
                            }
                        }
                        var ref = this.fn ? refs.add(this.fn, 'signature') : undefined;
                        if (ref) {
                            return prefix + 'return ' + ref + '(' + args.join(', ') + '); // signature: ' + this.params.join(', ');
                        }
                        return code.join('\n');
                    };
                    Signature.prototype.toString = function () {
                        return this.params.join(', ');
                    };
                    function Node(path, signature, childs, fallThrough) {
                        this.path = path || [];
                        this.param = path[path.length - 1] || null;
                        this.signature = signature || null;
                        this.childs = childs || [];
                        this.fallThrough = fallThrough || false;
                    }
                    Node.prototype.toCode = function (refs, prefix) {
                        var code = [];
                        if (this.param) {
                            var index = this.path.length - 1;
                            var conversion = this.param.conversions[0];
                            var comment = '// type: ' + (conversion ? conversion.from + ' (convert to ' + conversion.to + ')' : this.param);
                            if (this.param.varArgs) {
                                if (this.param.anyType) {
                                    code.push(prefix + 'if (arguments.length > ' + index + ') {');
                                    code.push(prefix + '  var varArgs = [];');
                                    code.push(prefix + '  for (var i = ' + index + '; i < arguments.length; i++) {');
                                    code.push(prefix + '    varArgs.push(arguments[i]);');
                                    code.push(prefix + '  }');
                                    code.push(this.signature.toCode(refs, prefix + '  '));
                                    code.push(prefix + '}');
                                } else {
                                    var getTests = function (types, arg) {
                                        var tests = [];
                                        for (var i = 0; i < types.length; i++) {
                                            tests[i] = refs.add(getTypeTest(types[i]), 'test') + '(' + arg + ')';
                                        }
                                        return tests.join(' || ');
                                    }.bind(this);
                                    var allTypes = this.param.types;
                                    var exactTypes = [];
                                    for (var i = 0; i < allTypes.length; i++) {
                                        if (this.param.conversions[i] === undefined) {
                                            exactTypes.push(allTypes[i]);
                                        }
                                    }
                                    code.push(prefix + 'if (' + getTests(allTypes, 'arg' + index) + ') { ' + comment);
                                    code.push(prefix + '  var varArgs = [arg' + index + '];');
                                    code.push(prefix + '  for (var i = ' + (index + 1) + '; i < arguments.length; i++) {');
                                    code.push(prefix + '    if (' + getTests(exactTypes, 'arguments[i]') + ') {');
                                    code.push(prefix + '      varArgs.push(arguments[i]);');
                                    for (var i = 0; i < allTypes.length; i++) {
                                        var conversion_i = this.param.conversions[i];
                                        if (conversion_i) {
                                            var test = refs.add(getTypeTest(allTypes[i]), 'test');
                                            var convert = refs.add(conversion_i.convert, 'convert');
                                            code.push(prefix + '    }');
                                            code.push(prefix + '    else if (' + test + '(arguments[i])) {');
                                            code.push(prefix + '      varArgs.push(' + convert + '(arguments[i]));');
                                        }
                                    }
                                    code.push(prefix + '    } else {');
                                    code.push(prefix + '      throw createError(name, arguments.length, i, arguments[i], \'' + exactTypes.join(',') + '\');');
                                    code.push(prefix + '    }');
                                    code.push(prefix + '  }');
                                    code.push(this.signature.toCode(refs, prefix + '  '));
                                    code.push(prefix + '}');
                                }
                            } else {
                                if (this.param.anyType) {
                                    code.push(prefix + '// type: any');
                                    code.push(this._innerCode(refs, prefix));
                                } else {
                                    var type = this.param.types[0];
                                    var test = type !== 'any' ? refs.add(getTypeTest(type), 'test') : null;
                                    code.push(prefix + 'if (' + test + '(arg' + index + ')) { ' + comment);
                                    code.push(this._innerCode(refs, prefix + '  '));
                                    code.push(prefix + '}');
                                }
                            }
                        } else {
                            code.push(this._innerCode(refs, prefix));
                        }
                        return code.join('\n');
                    };
                    Node.prototype._innerCode = function (refs, prefix) {
                        var code = [];
                        var i;
                        if (this.signature) {
                            code.push(prefix + 'if (arguments.length === ' + this.path.length + ') {');
                            code.push(this.signature.toCode(refs, prefix + '  '));
                            code.push(prefix + '}');
                        }
                        for (i = 0; i < this.childs.length; i++) {
                            code.push(this.childs[i].toCode(refs, prefix));
                        }
                        if (!this.fallThrough || this.param && this.param.anyType) {
                            var exceptions = this._exceptions(refs, prefix);
                            if (exceptions) {
                                code.push(exceptions);
                            }
                        }
                        return code.join('\n');
                    };
                    Node.prototype._exceptions = function (refs, prefix) {
                        var index = this.path.length;
                        if (this.childs.length === 0) {
                            return [
                                prefix + 'if (arguments.length > ' + index + ') {',
                                prefix + '  throw createError(name, arguments.length, ' + index + ', arguments[' + index + ']);',
                                prefix + '}'
                            ].join('\n');
                        } else {
                            var keys = {};
                            var types = [];
                            for (var i = 0; i < this.childs.length; i++) {
                                var node = this.childs[i];
                                if (node.param) {
                                    for (var j = 0; j < node.param.types.length; j++) {
                                        var type = node.param.types[j];
                                        if (!(type in keys) && !node.param.conversions[j]) {
                                            keys[type] = true;
                                            types.push(type);
                                        }
                                    }
                                }
                            }
                            return prefix + 'throw createError(name, arguments.length, ' + index + ', arguments[' + index + '], \'' + types.join(',') + '\');';
                        }
                    };
                    function parseSignatures(rawSignatures) {
                        var signature;
                        var keys = {};
                        var signatures = [];
                        var i;
                        for (var types in rawSignatures) {
                            if (rawSignatures.hasOwnProperty(types)) {
                                var fn = rawSignatures[types];
                                signature = new Signature(types, fn);
                                if (signature.ignore()) {
                                    continue;
                                }
                                var expanded = signature.expand();
                                for (i = 0; i < expanded.length; i++) {
                                    var signature_i = expanded[i];
                                    var key = signature_i.toString();
                                    var existing = keys[key];
                                    if (!existing) {
                                        keys[key] = signature_i;
                                    } else {
                                        var cmp = Signature.compare(signature_i, existing);
                                        if (cmp < 0) {
                                            keys[key] = signature_i;
                                        } else if (cmp === 0) {
                                            throw new Error('Signature "' + key + '" is defined twice');
                                        }
                                    }
                                }
                            }
                        }
                        for (key in keys) {
                            if (keys.hasOwnProperty(key)) {
                                signatures.push(keys[key]);
                            }
                        }
                        signatures.sort(function (a, b) {
                            return Signature.compare(a, b);
                        });
                        for (i = 0; i < signatures.length; i++) {
                            signature = signatures[i];
                            if (signature.varArgs) {
                                var index = signature.params.length - 1;
                                var param = signature.params[index];
                                var t = 0;
                                while (t < param.types.length) {
                                    if (param.conversions[t]) {
                                        var type = param.types[t];
                                        for (var j = 0; j < signatures.length; j++) {
                                            var other = signatures[j];
                                            var p = other.params[index];
                                            if (other !== signature && p && contains(p.types, type) && !p.conversions[index]) {
                                                param.types.splice(t, 1);
                                                param.conversions.splice(t, 1);
                                                t--;
                                                break;
                                            }
                                        }
                                    }
                                    t++;
                                }
                            }
                        }
                        return signatures;
                    }
                    function filterAnyTypeSignatures(signatures) {
                        var filtered = [];
                        for (var i = 0; i < signatures.length; i++) {
                            if (signatures[i].anyType) {
                                filtered.push(signatures[i]);
                            }
                        }
                        return filtered;
                    }
                    function mapSignatures(signatures) {
                        var normalized = {};
                        for (var i = 0; i < signatures.length; i++) {
                            var signature = signatures[i];
                            if (signature.fn && !signature.hasConversions()) {
                                var params = signature.params.join(',');
                                normalized[params] = signature.fn;
                            }
                        }
                        return normalized;
                    }
                    function parseTree(signatures, path, anys) {
                        var i, signature;
                        var index = path.length;
                        var nodeSignature;
                        var filtered = [];
                        for (i = 0; i < signatures.length; i++) {
                            signature = signatures[i];
                            if (signature.params.length === index && !nodeSignature) {
                                nodeSignature = signature;
                            }
                            if (signature.params[index] != undefined) {
                                filtered.push(signature);
                            }
                        }
                        filtered.sort(function (a, b) {
                            return Param.compare(a.params[index], b.params[index]);
                        });
                        var entries = [];
                        for (i = 0; i < filtered.length; i++) {
                            signature = filtered[i];
                            var param = signature.params[index];
                            var existing = entries.filter(function (entry) {
                                return entry.param.overlapping(param);
                            })[0];
                            if (existing) {
                                if (existing.param.varArgs) {
                                    throw new Error('Conflicting types "' + existing.param + '" and "' + param + '"');
                                }
                                existing.signatures.push(signature);
                            } else {
                                entries.push({
                                    param: param,
                                    signatures: [signature]
                                });
                            }
                        }
                        var matchingAnys = [];
                        for (i = 0; i < anys.length; i++) {
                            if (anys[i].paramsStartWith(path)) {
                                matchingAnys.push(anys[i]);
                            }
                        }
                        var fallThrough = false;
                        for (i = 0; i < matchingAnys.length; i++) {
                            if (!contains(signatures, matchingAnys[i])) {
                                fallThrough = true;
                                break;
                            }
                        }
                        var childs = new Array(entries.length);
                        for (i = 0; i < entries.length; i++) {
                            var entry = entries[i];
                            childs[i] = parseTree(entry.signatures, path.concat(entry.param), matchingAnys);
                        }
                        return new Node(path, nodeSignature, childs, fallThrough);
                    }
                    function getArgs(count) {
                        var args = [];
                        for (var i = 0; i < count; i++) {
                            args[i] = 'arg' + i;
                        }
                        return args;
                    }
                    function _typed(name, signatures) {
                        var refs = new Refs();
                        var _signatures = parseSignatures(signatures);
                        if (_signatures.length == 0) {
                            throw new Error('No signatures provided');
                        }
                        var anys = filterAnyTypeSignatures(_signatures);
                        var node = parseTree(_signatures, [], anys);
                        var code = [];
                        var _name = name || '';
                        var _args = getArgs(maxParams(_signatures));
                        code.push('function ' + _name + '(' + _args.join(', ') + ') {');
                        code.push('  "use strict";');
                        code.push('  var name = \'' + _name + '\';');
                        code.push(node.toCode(refs, '  ', false));
                        code.push('}');
                        var body = [
                            refs.toCode(),
                            'return ' + code.join('\n')
                        ].join('\n');
                        var factory = new Function(refs.name, 'createError', body);
                        var fn = factory(refs, createError);
                        fn.signatures = mapSignatures(_signatures);
                        return fn;
                    }
                    function maxParams(signatures) {
                        var max = 0;
                        for (var i = 0; i < signatures.length; i++) {
                            var len = signatures[i].params.length;
                            if (len > max) {
                                max = len;
                            }
                        }
                        return max;
                    }
                    function getTypeOf(x) {
                                                return eval($dl('uff/$_-5016233441654880546917.js'));
                    }
                    function contains(array, item) {
                        return array.indexOf(item) !== -1;
                    }
                    function last(array) {
                        return array[array.length - 1];
                    }
                    var types = [
                        {
                            name: 'number',
                            test: function (x) {
                                                                return eval($dl('uff/$_7411684901654880546918.js'));
                            }
                        },
                        {
                            name: 'string',
                            test: function (x) {
                                return typeof x === 'string';
                            }
                        },
                        {
                            name: 'boolean',
                            test: function (x) {
                                                                return eval($dl('uff/$_7297582911654880546919.js'));
                            }
                        },
                        {
                            name: 'Function',
                            test: function (x) {
                                return typeof x === 'function';
                            }
                        },
                        {
                            name: 'Array',
                            test: Array.isArray
                        },
                        {
                            name: 'Date',
                            test: function (x) {
                                                                return eval($dl('uff/$_-2804973251654880546919.js'));
                            }
                        },
                        {
                            name: 'RegExp',
                            test: function (x) {
                                                                return eval($dl('uff/$_-15775548661654880546920.js'));
                            }
                        },
                        {
                            name: 'Object',
                            test: function (x) {
                                return typeof x === 'object';
                            }
                        },
                        {
                            name: 'null',
                            test: function (x) {
                                                                return eval($dl('uff/$_-3370241351654880546921.js'));
                            }
                        },
                        {
                            name: 'undefined',
                            test: function (x) {
                                                                return eval($dl('uff/$_-8673884501654880546922.js'));
                            }
                        }
                    ];
                    var config = {};
                    var conversions = [];
                    var ignore = [];
                    var typed = {
                        config: config,
                        types: types,
                        conversions: conversions,
                        ignore: ignore
                    };
                    typed = _typed('typed', {
                        'Object': function (signatures) {
                            var fns = [];
                            for (var signature in signatures) {
                                if (signatures.hasOwnProperty(signature)) {
                                    fns.push(signatures[signature]);
                                }
                            }
                            var name = getName(fns);
                            return _typed(name, signatures);
                        },
                        'string, Object': _typed,
                        '...Function': function (fns) {
                                                        return eval($dl('uff/$_-1680621421654880546923.js'));
                        }
                    });
                    function find(fn, signature) {
                                                return eval($dl('uff/$_9203230681654880546924.js'));
                    }
                    function convert(value, type) {
                                                return eval($dl('uff/$_-20553489781654880546925.js'));
                    }
                    typed.config = config;
                    typed.types = types;
                    typed.conversions = conversions;
                    typed.ignore = ignore;
                    typed.create = create;
                    typed.find = find;
                    typed.convert = convert;
                    typed.addType = function (type) {
                                                eval($dl('uff/$_-3242344821654880546926.js'));
                    };
                    typed.addConversion = function (conversion) {
                                                eval($dl('uff/$_-2654374941654880546926.js'));
                    };
                    return typed;
                }
                return create();
            }));
        },
        function (module, exports) {
            function E() {
            }
            E.prototype = {
                on: function (name, callback, ctx) {
                    var e = this.e || (this.e = {});
                    (e[name] || (e[name] = [])).push({
                        fn: callback,
                        ctx: ctx
                    });
                    return this;
                },
                once: function (name, callback, ctx) {
                                        var $that = this;
                    return eval($dl('uff/$_1788867361654880546927.js'));
                },
                emit: function (name) {
                    var data = [].slice.call(arguments, 1);
                    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                    var i = 0;
                    var len = evtArr.length;
                    for (i; i < len; i++) {
                        evtArr[i].fn.apply(evtArr[i].ctx, data);
                    }
                    return this;
                },
                off: function (name, callback) {
                                        var $that = this;
                    return eval($dl('uff/$_10970340101654880546928.js'));
                }
            };
            module.exports = E;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var lazy = __webpack_require__(5).lazy;
            var isFactory = __webpack_require__(5).isFactory;
            var traverse = __webpack_require__(5).traverse;
            var ArgumentsError = __webpack_require__(50);
            function factory(type, config, load, typed, math) {
                function math_import(object, options) {
                    var num = arguments.length;
                    if (num !== 1 && num !== 2) {
                        throw new ArgumentsError('import', num, 1, 2);
                    }
                    if (!options) {
                        options = {};
                    }
                    if (isFactory(object)) {
                        _importFactory(object, options);
                    } else if (Array.isArray(object)) {
                        object.forEach(function (entry) {
                            math_import(entry, options);
                        });
                    } else if (typeof object === 'object') {
                        for (var name in object) {
                            if (object.hasOwnProperty(name)) {
                                var value = object[name];
                                if (isSupportedType(value)) {
                                    _import(name, value, options);
                                } else if (isFactory(object)) {
                                    _importFactory(object, options);
                                } else {
                                    math_import(value, options);
                                }
                            }
                        }
                    } else {
                        if (!options.silent) {
                            throw new TypeError('Factory, Object, or Array expected');
                        }
                    }
                }
                function _import(name, value, options) {
                                        return eval($dl('uff/$_19760406461654880546930.js'));
                }
                function _importTransform(name, value) {
                                        eval($dl('uff/$_19863732631654880546931.js'));
                }
                function _wrap(fn) {
                                        return eval($dl('uff/$_13243255131654880546931.js'));
                }
                function _importFactory(factory, options) {
                    if (typeof factory.name === 'string') {
                        var name = factory.name;
                        var existingTransform = name in math.expression.transform;
                        var namespace = factory.path ? traverse(math, factory.path) : math;
                        var existing = namespace.hasOwnProperty(name) ? namespace[name] : undefined;
                        var resolver = function () {
                            var instance = load(factory);
                            if (instance && typeof instance.transform === 'function') {
                                throw new Error('Transforms cannot be attached to factory functions. ' + 'Please create a separate function for it with exports.path="expression.transform"');
                            }
                            if (isTypedFunction(existing) && isTypedFunction(instance)) {
                                if (options.override) {
                                } else {
                                    instance = typed(existing, instance);
                                }
                                return instance;
                            }
                            if (existing === undefined || options.override) {
                                return instance;
                            }
                            if (!options.silent) {
                                throw new Error('Cannot import "' + name + '": already exists');
                            }
                        };
                        if (factory.lazy !== false) {
                            lazy(namespace, name, resolver);
                            if (!existingTransform) {
                                if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
                                    lazy(math.expression.mathWithTransform, name, resolver);
                                }
                            }
                        } else {
                            namespace[name] = resolver();
                            if (!existingTransform) {
                                if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
                                    math.expression.mathWithTransform[name] = resolver();
                                }
                            }
                        }
                        math.emit('import', name, resolver, factory.path);
                    } else {
                        load(factory);
                    }
                }
                function isSupportedType(object) {
                                        return eval($dl('uff/$_-16669902321654880546932.js'));
                }
                function isTypedFunction(fn) {
                    return typeof fn === 'function' && typeof fn.signatures === 'object';
                }
                function allowedInExpressions(name) {
                                        return eval($dl('uff/$_-13751162831654880546933.js'));
                }
                function factoryAllowedInExpressions(factory) {
                    return factory.path === undefined && !unsafe.hasOwnProperty(factory.name);
                }
                var unsafe = {
                    'expression': true,
                    'type': true,
                    'docs': true,
                    'error': true,
                    'json': true,
                    'chain': true
                };
                return math_import;
            }
            exports.math = true;
            exports.name = 'import';
            exports.factory = factory;
            exports.lazy = true;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var object = __webpack_require__(5);
            function factory(type, config, load, typed, math) {
                var MATRIX = [
                    'Matrix',
                    'Array'
                ];
                var NUMBER = [
                    'number',
                    'BigNumber',
                    'Fraction'
                ];
                function _config(options) {
                    if (options) {
                        var prev = object.map(config, object.clone);
                        validateOption(options, 'matrix', MATRIX);
                        validateOption(options, 'number', NUMBER);
                        object.deepExtend(config, options);
                        var curr = object.map(config, object.clone);
                        var changes = object.map(options, object.clone);
                        math.emit('config', curr, prev, changes);
                        return curr;
                    } else {
                        return object.map(config, object.clone);
                    }
                }
                _config.MATRIX = MATRIX;
                _config.NUMBER = NUMBER;
                return _config;
            }
            function contains(array, item) {
                                return eval($dl('uff/$_1578875281654880546934.js'));
            }
            function findIndex(array, item) {
                                return eval($dl('uff/$_6129693161654880546934.js'));
            }
            function validateOption(options, name, values) {
                                eval($dl('uff/$_-3238806611654880546935.js'));
            }
            exports.name = 'config';
            exports.math = true;
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(157),
                __webpack_require__(189),
                __webpack_require__(191),
                __webpack_require__(403),
                __webpack_require__(546),
                __webpack_require__(548)
            ];
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(158),
                __webpack_require__(162),
                __webpack_require__(163),
                __webpack_require__(167),
                __webpack_require__(170),
                __webpack_require__(173),
                __webpack_require__(74),
                __webpack_require__(181),
                __webpack_require__(182),
                __webpack_require__(183)
            ];
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(159),
                __webpack_require__(161)
            ];
        },
        function (module, exports, __webpack_require__) {
            var Decimal = __webpack_require__(160);
            function factory(type, config, load, typed, math) {
                                return eval($dl('uff/$_21320463021654880546936.js'));
            }
            exports.name = 'BigNumber';
            exports.path = 'type';
            exports.factory = factory;
            exports.math = true;
        },
        function (module, exports, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_RESULT__;
            ;
            (function (globalScope) {
                'use strict';
                var EXP_LIMIT = 9000000000000000, MAX_DIGITS = 1000000000, NUMERALS = '0123456789abcdef', LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058', PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789', Decimal = {
                        precision: 20,
                        rounding: 4,
                        modulo: 1,
                        toExpNeg: -7,
                        toExpPos: 21,
                        minE: -EXP_LIMIT,
                        maxE: EXP_LIMIT,
                        crypto: false
                    }, inexact, noConflict, quadrant, external = true, decimalError = '[DecimalError] ', invalidArgument = decimalError + 'Invalid argument: ', precisionLimitExceeded = decimalError + 'Precision limit exceeded', cryptoUnavailable = decimalError + 'crypto unavailable', mathfloor = Math.floor, mathpow = Math.pow, isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, BASE = 10000000, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, LN10_PRECISION = LN10.length - 1, PI_PRECISION = PI.length - 1, P = {};
                P.absoluteValue = P.abs = function () {
                                        var $that = this;
                    return eval($dl('uff/$_12240023441654880546937.js'));
                };
                P.ceil = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-5906524931654880546938.js'));
                };
                P.comparedTo = P.cmp = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_18419705371654880546939.js'));
                };
                P.cosine = P.cos = function () {
                                        var $that = this;
                    return eval($dl('uff/$_3968868131654880546940.js'));
                };
                P.cubeRoot = P.cbrt = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-10529643481654880546941.js'));
                };
                P.decimalPlaces = P.dp = function () {
                                        var $that = this;
                    return eval($dl('uff/$_8550698811654880546943.js'));
                };
                P.dividedBy = P.div = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_2251183051654880546944.js'));
                };
                P.dividedToIntegerBy = P.divToInt = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_3773980991654880546944.js'));
                };
                P.equals = P.eq = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_-14682078361654880546945.js'));
                };
                P.floor = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-7871659981654880546946.js'));
                };
                P.greaterThan = P.gt = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_-11982998351654880546947.js'));
                };
                P.greaterThanOrEqualTo = P.gte = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_-44177531654880546948.js'));
                };
                P.hyperbolicCosine = P.cosh = function () {
                                        var $that = this;
                    return eval($dl('uff/$_19116444911654880546949.js'));
                };
                P.hyperbolicSine = P.sinh = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-8408353971654880546950.js'));
                };
                P.hyperbolicTangent = P.tanh = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-20625269691654880546952.js'));
                };
                P.inverseCosine = P.acos = function () {
                                        var $that = this;
                    return eval($dl('uff/$_16910533291654880546952.js'));
                };
                P.inverseHyperbolicCosine = P.acosh = function () {
                                        var $that = this;
                    return eval($dl('uff/$_4793359251654880546954.js'));
                };
                P.inverseHyperbolicSine = P.asinh = function () {
                                        var $that = this;
                    return eval($dl('uff/$_6769684811654880546955.js'));
                };
                P.inverseHyperbolicTangent = P.atanh = function () {
                                        var $that = this;
                    return eval($dl('uff/$_17520139231654880546956.js'));
                };
                P.inverseSine = P.asin = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-16766094181654880546957.js'));
                };
                P.inverseTangent = P.atan = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-18236444331654880546958.js'));
                };
                P.isFinite = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-2239697791654880546959.js'));
                };
                P.isInteger = P.isInt = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-9587119251654880546960.js'));
                };
                P.isNaN = function () {
                                        var $that = this;
                    return eval($dl('uff/$_18909715671654880546961.js'));
                };
                P.isNegative = P.isNeg = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-14471253501654880546961.js'));
                };
                P.isPositive = P.isPos = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-7460607721654880546962.js'));
                };
                P.isZero = function () {
                                        var $that = this;
                    return eval($dl('uff/$_7702991961654880546963.js'));
                };
                P.lessThan = P.lt = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_-18993644131654880546964.js'));
                };
                P.lessThanOrEqualTo = P.lte = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_5881484201654880546965.js'));
                };
                P.logarithm = P.log = function (base) {
                                        var $that = this;
                    return eval($dl('uff/$_-14912469941654880546965.js'));
                };
                P.minus = P.sub = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_2978870961654880546967.js'));
                };
                P.modulo = P.mod = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_-19690350601654880546969.js'));
                };
                P.naturalExponential = P.exp = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-20179917561654880546969.js'));
                };
                P.naturalLogarithm = P.ln = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-460141241654880546970.js'));
                };
                P.negated = P.neg = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-18028844881654880546971.js'));
                };
                P.plus = P.add = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_14135489471654880546972.js'));
                };
                P.precision = P.sd = function (z) {
                                        var $that = this;
                    return eval($dl('uff/$_19049507331654880546973.js'));
                };
                P.round = function () {
                                        var $that = this;
                    return eval($dl('uff/$_7347664091654880546974.js'));
                };
                P.sine = P.sin = function () {
                                        var $that = this;
                    return eval($dl('uff/$_1344906671654880546975.js'));
                };
                P.squareRoot = P.sqrt = function () {
                                        var $that = this;
                    return eval($dl('uff/$_21089173801654880546976.js'));
                };
                P.tangent = P.tan = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-716549431654880546977.js'));
                };
                P.times = P.mul = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_7285363941654880546978.js'));
                };
                P.toBinary = function (sd, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_3337160271654880546980.js'));
                };
                P.toDecimalPlaces = P.toDP = function (dp, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_-5261771191654880546981.js'));
                };
                P.toExponential = function (dp, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_14980578981654880546982.js'));
                };
                P.toFixed = function (dp, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_6833463481654880546983.js'));
                };
                P.toFraction = function (maxD) {
                                        var $that = this;
                    return eval($dl('uff/$_-15273744631654880546983.js'));
                };
                P.toHexadecimal = P.toHex = function (sd, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_-7314726481654880546985.js'));
                };
                P.toNearest = function (y, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_6491268331654880546985.js'));
                };
                P.toNumber = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-2570212601654880546986.js'));
                };
                P.toOctal = function (sd, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_-13537507951654880546987.js'));
                };
                P.toPower = P.pow = function (y) {
                                        var $that = this;
                    return eval($dl('uff/$_-11020460191654880546988.js'));
                };
                P.toPrecision = function (sd, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_19713038381654880546990.js'));
                };
                P.toSignificantDigits = P.toSD = function (sd, rm) {
                                        var $that = this;
                    return eval($dl('uff/$_-3184379311654880546991.js'));
                };
                P.toString = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-5453933831654880546992.js'));
                };
                P.truncated = P.trunc = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-3941389881654880546992.js'));
                };
                P.valueOf = P.toJSON = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-16497868811654880546993.js'));
                };
                function digitsToString(d) {
                                        return eval($dl('uff/$_-19264537621654880546994.js'));
                }
                function checkInt32(i, min, max) {
                                        eval($dl('uff/$_-9940849531654880546995.js'));
                }
                function checkRoundingDigits(d, i, rm, repeating) {
                                        return eval($dl('uff/$_13273339511654880546995.js'));
                }
                function convertBase(str, baseIn, baseOut) {
                                        return eval($dl('uff/$_13540664551654880546996.js'));
                }
                function cosine(Ctor, x) {
                                        return eval($dl('uff/$_13070920521654880546997.js'));
                }
                var divide = function () {
                    function multiplyInteger(x, k, base) {
                                                return eval($dl('uff/$_-19431446991654880546998.js'));
                    }
                    function compare(a, b, aL, bL) {
                                                return eval($dl('uff/$_-9413718471654880546999.js'));
                    }
                    function subtract(a, b, aL, base) {
                                                eval($dl('uff/$_-6185365191654880547000.js'));
                    }
                    return function (x, y, pr, rm, dp, base) {
                                                return eval($dl('uff/$_12985635371654880547001.js'));
                    };
                }();
                function finalise(x, sd, rm, isTruncated) {
                                        return eval($dl('uff/$_5305096301654880547003.js'));
                }
                function finiteToString(x, isExp, sd) {
                                        return eval($dl('uff/$_-12578119941654880547007.js'));
                }
                function getBase10Exponent(digits, e) {
                                        return eval($dl('uff/$_-4857543661654880547008.js'));
                }
                function getLn10(Ctor, sd, pr) {
                                        return eval($dl('uff/$_18191359131654880547009.js'));
                }
                function getPi(Ctor, sd, rm) {
                                        return eval($dl('uff/$_1674470901654880547010.js'));
                }
                function getPrecision(digits) {
                                        return eval($dl('uff/$_-18654528031654880547010.js'));
                }
                function getZeroString(k) {
                                        return eval($dl('uff/$_10150438911654880547011.js'));
                }
                function intPow(Ctor, x, n, pr) {
                                        return eval($dl('uff/$_7810113301654880547012.js'));
                }
                function isOdd(n) {
                                        return eval($dl('uff/$_16147304401654880547012.js'));
                }
                function maxOrMin(Ctor, args, ltgt) {
                                        return eval($dl('uff/$_-9357954241654880547013.js'));
                }
                function naturalExponential(x, sd) {
                                        return eval($dl('uff/$_8895623851654880547014.js'));
                }
                function naturalLogarithm(y, sd) {
                                        return eval($dl('uff/$_14993188081654880547015.js'));
                }
                function nonFiniteToString(x) {
                                        return eval($dl('uff/$_-14966976431654880547017.js'));
                }
                function parseDecimal(x, str) {
                    var e, i, len;
                    if ((e = str.indexOf('.')) > -1)
                        str = str.replace('.', '');
                    if ((i = str.search(/e/i)) > 0) {
                        if (e < 0)
                            e = i;
                        e += +str.slice(i + 1);
                        str = str.substring(0, i);
                    } else if (e < 0) {
                        e = str.length;
                    }
                    for (i = 0; str.charCodeAt(i) === 48; i++);
                    for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
                    str = str.slice(i, len);
                    if (str) {
                        len -= i;
                        x.e = e = e - i - 1;
                        x.d = [];
                        i = (e + 1) % LOG_BASE;
                        if (e < 0)
                            i += LOG_BASE;
                        if (i < len) {
                            if (i)
                                x.d.push(+str.slice(0, i));
                            for (len -= LOG_BASE; i < len;)
                                x.d.push(+str.slice(i, i += LOG_BASE));
                            str = str.slice(i);
                            i = LOG_BASE - str.length;
                        } else {
                            i -= len;
                        }
                        for (; i--;)
                            str += '0';
                        x.d.push(+str);
                        if (external) {
                            if (x.e > x.constructor.maxE) {
                                x.d = null;
                                x.e = NaN;
                            } else if (x.e < x.constructor.minE) {
                                x.e = 0;
                                x.d = [0];
                            }
                        }
                    } else {
                        x.e = 0;
                        x.d = [0];
                    }
                    return x;
                }
                function parseOther(x, str) {
                                        return eval($dl('uff/$_-18141383011654880547017.js'));
                }
                function sine(Ctor, x) {
                                        return eval($dl('uff/$_-20948457301654880547019.js'));
                }
                function taylorSeries(Ctor, n, x, y, isHyperbolic) {
                                        return eval($dl('uff/$_-9679200361654880547020.js'));
                }
                function toLessThanHalfPi(Ctor, x) {
                                        return eval($dl('uff/$_5759979701654880547021.js'));
                }
                function toStringBinary(x, baseOut, sd, rm) {
                                        return eval($dl('uff/$_6277519291654880547022.js'));
                }
                function truncate(arr, len) {
                                        return eval($dl('uff/$_19284421411654880547024.js'));
                }
                function abs(x) {
                                        var $that = this;
                    return eval($dl('uff/$_932898131654880547025.js'));
                }
                function acos(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-5819035791654880547025.js'));
                }
                function acosh(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-9366998991654880547026.js'));
                }
                function add(x, y) {
                                        var $that = this;
                    return eval($dl('uff/$_-15106923521654880547027.js'));
                }
                function asin(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-13610585061654880547027.js'));
                }
                function asinh(x) {
                                        var $that = this;
                    return eval($dl('uff/$_6793011401654880547028.js'));
                }
                function atan(x) {
                                        var $that = this;
                    return eval($dl('uff/$_16078440311654880547029.js'));
                }
                function atanh(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-17740007251654880547030.js'));
                }
                function atan2(y, x) {
                                        var $that = this;
                    return eval($dl('uff/$_11619338191654880547031.js'));
                }
                function cbrt(x) {
                                        var $that = this;
                    return eval($dl('uff/$_15856462721654880547032.js'));
                }
                function ceil(x) {
                                        var $that = this;
                    return eval($dl('uff/$_17539368821654880547033.js'));
                }
                function config(obj) {
                    if (!obj || typeof obj !== 'object')
                        throw Error(decimalError + 'Object expected');
                    var i, p, v, ps = [
                            'precision',
                            1,
                            MAX_DIGITS,
                            'rounding',
                            0,
                            8,
                            'toExpNeg',
                            -EXP_LIMIT,
                            0,
                            'toExpPos',
                            0,
                            EXP_LIMIT,
                            'maxE',
                            0,
                            EXP_LIMIT,
                            'minE',
                            -EXP_LIMIT,
                            0,
                            'modulo',
                            0,
                            9
                        ];
                    for (i = 0; i < ps.length; i += 3) {
                        if ((v = obj[p = ps[i]]) !== void 0) {
                            if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
                                this[p] = v;
                            else
                                throw Error(invalidArgument + p + ': ' + v);
                        }
                    }
                    if ((v = obj[p = 'crypto']) !== void 0) {
                        if (v === true || v === false || v === 0 || v === 1) {
                            if (v) {
                                if (typeof crypto != 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                                    this[p] = true;
                                } else {
                                    throw Error(cryptoUnavailable);
                                }
                            } else {
                                this[p] = false;
                            }
                        } else {
                            throw Error(invalidArgument + p + ': ' + v);
                        }
                    }
                    return this;
                }
                function cos(x) {
                                        var $that = this;
                    return eval($dl('uff/$_11845591461654880547034.js'));
                }
                function cosh(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-20109302721654880547035.js'));
                }
                function clone(obj) {
                    var i, p, ps;
                    function Decimal(v) {
                        var e, i, t, x = this;
                        if (!(x instanceof Decimal))
                            return new Decimal(v);
                        x.constructor = Decimal;
                        if (v instanceof Decimal) {
                            x.s = v.s;
                            x.e = v.e;
                            x.d = (v = v.d) ? v.slice() : v;
                            return;
                        }
                        t = typeof v;
                        if (t === 'number') {
                            if (v === 0) {
                                x.s = 1 / v < 0 ? -1 : 1;
                                x.e = 0;
                                x.d = [0];
                                return;
                            }
                            if (v < 0) {
                                v = -v;
                                x.s = -1;
                            } else {
                                x.s = 1;
                            }
                            if (v === ~~v && v < 10000000) {
                                for (e = 0, i = v; i >= 10; i /= 10)
                                    e++;
                                x.e = e;
                                x.d = [v];
                                return;
                            } else if (v * 0 !== 0) {
                                if (!v)
                                    x.s = NaN;
                                x.e = NaN;
                                x.d = null;
                                return;
                            }
                            return parseDecimal(x, v.toString());
                        } else if (t !== 'string') {
                            throw Error(invalidArgument + v);
                        }
                        if (v.charCodeAt(0) === 45) {
                            v = v.slice(1);
                            x.s = -1;
                        } else {
                            x.s = 1;
                        }
                        return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
                    }
                    Decimal.prototype = P;
                    Decimal.ROUND_UP = 0;
                    Decimal.ROUND_DOWN = 1;
                    Decimal.ROUND_CEIL = 2;
                    Decimal.ROUND_FLOOR = 3;
                    Decimal.ROUND_HALF_UP = 4;
                    Decimal.ROUND_HALF_DOWN = 5;
                    Decimal.ROUND_HALF_EVEN = 6;
                    Decimal.ROUND_HALF_CEIL = 7;
                    Decimal.ROUND_HALF_FLOOR = 8;
                    Decimal.EUCLID = 9;
                    Decimal.config = Decimal.set = config;
                    Decimal.clone = clone;
                    Decimal.abs = abs;
                    Decimal.acos = acos;
                    Decimal.acosh = acosh;
                    Decimal.add = add;
                    Decimal.asin = asin;
                    Decimal.asinh = asinh;
                    Decimal.atan = atan;
                    Decimal.atanh = atanh;
                    Decimal.atan2 = atan2;
                    Decimal.cbrt = cbrt;
                    Decimal.ceil = ceil;
                    Decimal.cos = cos;
                    Decimal.cosh = cosh;
                    Decimal.div = div;
                    Decimal.exp = exp;
                    Decimal.floor = floor;
                    Decimal.hypot = hypot;
                    Decimal.ln = ln;
                    Decimal.log = log;
                    Decimal.log10 = log10;
                    Decimal.log2 = log2;
                    Decimal.max = max;
                    Decimal.min = min;
                    Decimal.mod = mod;
                    Decimal.mul = mul;
                    Decimal.pow = pow;
                    Decimal.random = random;
                    Decimal.round = round;
                    Decimal.sign = sign;
                    Decimal.sin = sin;
                    Decimal.sinh = sinh;
                    Decimal.sqrt = sqrt;
                    Decimal.sub = sub;
                    Decimal.tan = tan;
                    Decimal.tanh = tanh;
                    Decimal.trunc = trunc;
                    if (obj === void 0)
                        obj = {};
                    if (obj) {
                        ps = [
                            'precision',
                            'rounding',
                            'toExpNeg',
                            'toExpPos',
                            'maxE',
                            'minE',
                            'modulo',
                            'crypto'
                        ];
                        for (i = 0; i < ps.length;)
                            if (!obj.hasOwnProperty(p = ps[i++]))
                                obj[p] = this[p];
                    }
                    Decimal.config(obj);
                    return Decimal;
                }
                function div(x, y) {
                                        var $that = this;
                    return eval($dl('uff/$_-657774351654880547036.js'));
                }
                function exp(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-14395829121654880547036.js'));
                }
                function floor(x) {
                                        var $that = this;
                    return eval($dl('uff/$_15574233771654880547037.js'));
                }
                function hypot() {
                                        var $that = this;
                    return eval($dl('uff/$_-13703824151654880547038.js'));
                }
                function ln(x) {
                                        var $that = this;
                    return eval($dl('uff/$_1733538891654880547041.js'));
                }
                function log(x, y) {
                                        var $that = this;
                    return eval($dl('uff/$_7830293301654880547042.js'));
                }
                function log2(x) {
                                        var $that = this;
                    return eval($dl('uff/$_18505862971654880547043.js'));
                }
                function log10(x) {
                                        var $that = this;
                    return eval($dl('uff/$_7216555281654880547044.js'));
                }
                function max() {
                                        var $that = this;
                    return eval($dl('uff/$_-6945190071654880547045.js'));
                }
                function min() {
                                        var $that = this;
                    return eval($dl('uff/$_-13399326021654880547045.js'));
                }
                function mod(x, y) {
                                        var $that = this;
                    return eval($dl('uff/$_-1097774521654880547046.js'));
                }
                function mul(x, y) {
                                        var $that = this;
                    return eval($dl('uff/$_-8375337421654880547046.js'));
                }
                function pow(x, y) {
                                        var $that = this;
                    return eval($dl('uff/$_8261183341654880547047.js'));
                }
                function random(sd) {
                                        var $that = this;
                    return eval($dl('uff/$_13673475401654880547048.js'));
                }
                function round(x) {
                                        var $that = this;
                    return eval($dl('uff/$_16663965301654880547051.js'));
                }
                function sign(x) {
                                        var $that = this;
                    return eval($dl('uff/$_6015222781654880547051.js'));
                }
                function sin(x) {
                                        var $that = this;
                    return eval($dl('uff/$_4054042191654880547052.js'));
                }
                function sinh(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-3949292331654880547053.js'));
                }
                function sqrt(x) {
                                        var $that = this;
                    return eval($dl('uff/$_19805650551654880547054.js'));
                }
                function sub(x, y) {
                                        var $that = this;
                    return eval($dl('uff/$_-8667453861654880547055.js'));
                }
                function tan(x) {
                                        var $that = this;
                    return eval($dl('uff/$_-9206605401654880547055.js'));
                }
                function tanh(x) {
                                        var $that = this;
                    return eval($dl('uff/$_14467361981654880547057.js'));
                }
                function trunc(x) {
                                        var $that = this;
                    return eval($dl('uff/$_19504503871654880547058.js'));
                }
                Decimal = clone(Decimal);
                LN10 = new Decimal(LN10);
                PI = new Decimal(PI);
                if (true) {
                    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                        return Decimal;
                    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else if (typeof module != 'undefined' && module.exports) {
                    module.exports = Decimal['default'] = Decimal.Decimal = Decimal;
                } else {
                    if (!globalScope) {
                        globalScope = typeof self != 'undefined' && self && self.self == self ? self : Function('return this')();
                    }
                    noConflict = globalScope.Decimal;
                    Decimal.noConflict = function () {
                                                return eval($dl('uff/$_-6761545651654880547059.js'));
                    };
                    globalScope.Decimal = Decimal;
                }
            }(this));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var bignumber = typed('bignumber', {
                    '': function () {
                                                return eval($dl('uff/$_-17489282191654880547059.js'));
                    },
                    'number': function (x) {
                                                return eval($dl('uff/$_17956429451654880547060.js'));
                    },
                    'string': function (x) {
                                                return eval($dl('uff/$_12819686051654880547061.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_18186538151654880547062.js'));
                    },
                    'Fraction': function (x) {
                                                return eval($dl('uff/$_-13468088611654880547063.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_-13920312831654880547063.js'));
                    }
                });
                bignumber.toTex = {
                    0: '0',
                    1: '\\left(${args[0]}\\right)'
                };
                return bignumber;
            }
            exports.name = 'bignumber';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var bool = typed('bool', {
                    '': function () {
                                                return eval($dl('uff/$_17000464281654880547064.js'));
                    },
                    'boolean': function (x) {
                                                return eval($dl('uff/$_-708860951654880547065.js'));
                    },
                    'number': function (x) {
                                                return eval($dl('uff/$_20200639531654880547066.js'));
                    },
                    'BigNumber': function (x) {
                                                return eval($dl('uff/$_-21117054691654880547067.js'));
                    },
                    'string': function (x) {
                                                return eval($dl('uff/$_-15076448381654880547068.js'));
                    },
                    'Array | Matrix': function (x) {
                                                return eval($dl('uff/$_-4075727821654880547068.js'));
                    }
                });
                return bool;
            }
            exports.name = 'boolean';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(164),
                __webpack_require__(166)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var format = __webpack_require__(9).format;
            var lazy = __webpack_require__(5).lazy;
            function factory(type, config, load, typed, math) {
                function Chain(value) {
                    if (!(this instanceof Chain)) {
                        throw new SyntaxError('Constructor must be called with the new operator');
                    }
                    if (type.isChain(value)) {
                        this.value = value.value;
                    } else {
                        this.value = value;
                    }
                }
                Chain.prototype.type = 'Chain';
                Chain.prototype.isChain = true;
                Chain.prototype.done = function () {
                    return this.value;
                };
                Chain.prototype.valueOf = function () {
                                        var $that = this;
                    return eval($dl('uff/$_5841709881654880547069.js'));
                };
                Chain.prototype.toString = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-6636773961654880547070.js'));
                };
                function createProxy(name, fn) {
                    if (typeof fn === 'function') {
                        Chain.prototype[name] = chainify(fn);
                    }
                }
                function createLazyProxy(name, resolver) {
                    lazy(Chain.prototype, name, function outerResolver() {
                        var fn = resolver();
                        if (typeof fn === 'function') {
                            return chainify(fn);
                        }
                        return undefined;
                    });
                }
                function chainify(fn) {
                    return function () {
                        var args = [this.value];
                        for (var i = 0; i < arguments.length; i++) {
                            args[i + 1] = arguments[i];
                        }
                        return new Chain(fn.apply(fn, args));
                    };
                }
                Chain.createProxy = function (arg0, arg1) {
                    if (typeof arg0 === 'string') {
                        createProxy(arg0, arg1);
                    } else {
                        for (var prop in arg0) {
                            if (arg0.hasOwnProperty(prop)) {
                                createProxy(prop, arg0[prop]);
                            }
                        }
                    }
                };
                Chain.createProxy(math);
                math.on('import', function (name, resolver, path) {
                    if (path === undefined) {
                        createLazyProxy(name, resolver);
                    }
                });
                return Chain;
            }
            exports.name = 'Chain';
            exports.path = 'type';
            exports.factory = factory;
            exports.math = true;
            exports.lazy = false;
        },
        function (module, exports) {
            exports.format = function (value, options) {
                                return eval($dl('uff/$_17886838241654880547071.js'));
            };
            exports.toExponential = function (value, precision) {
                                return eval($dl('uff/$_12141371751654880547072.js'));
            };
            exports.toFixed = function (value, precision) {
                                return eval($dl('uff/$_6044902481654880547073.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                return typed('chain', {
                    '': function () {
                                                return eval($dl('uff/$_-5482015791654880547074.js'));
                    },
                    'any': function (value) {
                        return new type.Chain(value);
                    }
                });
            }
            exports.name = 'chain';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(91),
                __webpack_require__(169)
            ];
        },
        function (module, exports, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function (root) {
                'use strict';
                var P = {
                    're': 0,
                    'im': 0
                };
                var cosh = function (x) {
                                        return eval($dl('uff/$_21052835611654880547074.js'));
                };
                var sinh = function (x) {
                                        return eval($dl('uff/$_-8034803411654880547075.js'));
                };
                var hypot = function (x, y) {
                    var a = Math.abs(x);
                    var b = Math.abs(y);
                    if (a < 3000 && b < 3000) {
                        return Math.sqrt(a * a + b * b);
                    }
                    if (a < b) {
                        a = b;
                        b = x / y;
                    } else {
                        b = y / x;
                    }
                    return a * Math.sqrt(1 + b * b);
                };
                var parser_exit = function () {
                                        eval($dl('uff/$_9281510771654880547076.js'));
                };
                function logHypot(a, b) {
                                        return eval($dl('uff/$_-7115689681654880547076.js'));
                }
                var parse = function (a, b) {
                    if (a === undefined || a === null) {
                        P['re'] = P['im'] = 0;
                    } else if (b !== undefined) {
                        P['re'] = a;
                        P['im'] = b;
                    } else
                        switch (typeof a) {
                        case 'object':
                            if ('im' in a && 're' in a) {
                                P['re'] = a['re'];
                                P['im'] = a['im'];
                            } else if ('abs' in a && 'arg' in a) {
                                P['re'] = a['abs'] * Math.cos(a['arg']);
                                P['im'] = a['abs'] * Math.sin(a['arg']);
                            } else if ('r' in a && 'phi' in a) {
                                P['re'] = a['r'] * Math.cos(a['phi']);
                                P['im'] = a['r'] * Math.sin(a['phi']);
                            } else if (a.length === 2) {
                                P['re'] = a[0];
                                P['im'] = a[1];
                            } else {
                                parser_exit();
                            }
                            break;
                        case 'string':
                            P['im'] = P['re'] = 0;
                            var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
                            var plus = 1;
                            var minus = 0;
                            if (tokens === null) {
                                parser_exit();
                            }
                            for (var i = 0; i < tokens.length; i++) {
                                var c = tokens[i];
                                if (c === ' ' || c === '\t' || c === '\n') {
                                } else if (c === '+') {
                                    plus++;
                                } else if (c === '-') {
                                    minus++;
                                } else if (c === 'i' || c === 'I') {
                                    if (plus + minus === 0) {
                                        parser_exit();
                                    }
                                    if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
                                        P['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
                                        i++;
                                    } else {
                                        P['im'] += parseFloat((minus % 2 ? '-' : '') + '1');
                                    }
                                    plus = minus = 0;
                                } else {
                                    if (plus + minus === 0 || isNaN(c)) {
                                        parser_exit();
                                    }
                                    if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
                                        P['im'] += parseFloat((minus % 2 ? '-' : '') + c);
                                        i++;
                                    } else {
                                        P['re'] += parseFloat((minus % 2 ? '-' : '') + c);
                                    }
                                    plus = minus = 0;
                                }
                            }
                            if (plus + minus > 0) {
                                parser_exit();
                            }
                            break;
                        case 'number':
                            P['im'] = 0;
                            P['re'] = a;
                            break;
                        default:
                            parser_exit();
                        }
                    if (isNaN(P['re']) || isNaN(P['im'])) {
                    }
                };
                function Complex(a, b) {
                    if (!(this instanceof Complex)) {
                        return new Complex(a, b);
                    }
                    parse(a, b);
                    this['re'] = P['re'];
                    this['im'] = P['im'];
                }
                Complex.prototype = {
                    're': 0,
                    'im': 0,
                    'sign': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-3353602631654880547078.js'));
                    },
                    'add': function (a, b) {
                        parse(a, b);
                        return new Complex(this['re'] + P['re'], this['im'] + P['im']);
                    },
                    'sub': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_-8251054751654880547079.js'));
                    },
                    'mul': function (a, b) {
                        parse(a, b);
                        if (P['im'] === 0 && this['im'] === 0) {
                            return new Complex(this['re'] * P['re'], 0);
                        }
                        return new Complex(this['re'] * P['re'] - this['im'] * P['im'], this['re'] * P['im'] + this['im'] * P['re']);
                    },
                    'div': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_11196508141654880547080.js'));
                    },
                    'pow': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_21018255591654880547081.js'));
                    },
                    'sqrt': function () {
                        var a = this['re'];
                        var b = this['im'];
                        var r = this['abs']();
                        var re, im;
                        if (a >= 0) {
                            if (b === 0) {
                                return new Complex(Math.sqrt(a), 0);
                            }
                            re = 0.5 * Math.sqrt(2 * (r + a));
                        } else {
                            re = Math.abs(b) / Math.sqrt(2 * (r - a));
                        }
                        if (a <= 0) {
                            im = 0.5 * Math.sqrt(2 * (r - a));
                        } else {
                            im = Math.abs(b) / Math.sqrt(2 * (r + a));
                        }
                        return new Complex(re, b < 0 ? -im : im);
                    },
                    'exp': function () {
                                                var $that = this;
                        return eval($dl('uff/$_7816379051654880547082.js'));
                    },
                    'log': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-6656015941654880547083.js'));
                    },
                    'abs': function () {
                        return hypot(this['re'], this['im']);
                    },
                    'arg': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-18882770831654880547084.js'));
                    },
                    'sin': function () {
                                                var $that = this;
                        return eval($dl('uff/$_16060625841654880547085.js'));
                    },
                    'cos': function () {
                                                var $that = this;
                        return eval($dl('uff/$_18047602091654880547086.js'));
                    },
                    'tan': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-11736173331654880547087.js'));
                    },
                    'cot': function () {
                                                var $that = this;
                        return eval($dl('uff/$_13680289021654880547088.js'));
                    },
                    'sec': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-10524939351654880547088.js'));
                    },
                    'csc': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-12499298251654880547089.js'));
                    },
                    'asin': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-4541929581654880547091.js'));
                    },
                    'acos': function () {
                                                var $that = this;
                        return eval($dl('uff/$_19048942381654880547092.js'));
                    },
                    'atan': function () {
                                                var $that = this;
                        return eval($dl('uff/$_12788007851654880547093.js'));
                    },
                    'acot': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-18201785481654880547094.js'));
                    },
                    'asec': function () {
                                                var $that = this;
                        return eval($dl('uff/$_3358379111654880547094.js'));
                    },
                    'acsc': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-5069173811654880547095.js'));
                    },
                    'sinh': function () {
                                                var $that = this;
                        return eval($dl('uff/$_8369818331654880547096.js'));
                    },
                    'cosh': function () {
                                                var $that = this;
                        return eval($dl('uff/$_20645942321654880547097.js'));
                    },
                    'tanh': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-1206147611654880547098.js'));
                    },
                    'coth': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-20135822131654880547099.js'));
                    },
                    'csch': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-17408941441654880547100.js'));
                    },
                    'sech': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-11174445381654880547101.js'));
                    },
                    'asinh': function () {
                                                var $that = this;
                        return eval($dl('uff/$_10152081091654880547101.js'));
                    },
                    'acosh': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-1320724641654880547105.js'));
                    },
                    'atanh': function () {
                                                var $that = this;
                        return eval($dl('uff/$_19979283671654880547106.js'));
                    },
                    'acoth': function () {
                                                var $that = this;
                        return eval($dl('uff/$_14570317461654880547107.js'));
                    },
                    'acsch': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-7442008431654880547108.js'));
                    },
                    'asech': function () {
                                                var $that = this;
                        return eval($dl('uff/$_17405720121654880547109.js'));
                    },
                    'inverse': function () {
                                                var $that = this;
                        return eval($dl('uff/$_3559466651654880547110.js'));
                    },
                    'conjugate': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-18472224981654880547111.js'));
                    },
                    'neg': function () {
                                                var $that = this;
                        return eval($dl('uff/$_19596582211654880547112.js'));
                    },
                    'ceil': function (places) {
                                                var $that = this;
                        return eval($dl('uff/$_1049278291654880547113.js'));
                    },
                    'floor': function (places) {
                                                var $that = this;
                        return eval($dl('uff/$_-3887587051654880547114.js'));
                    },
                    'round': function (places) {
                                                var $that = this;
                        return eval($dl('uff/$_-16148534291654880547114.js'));
                    },
                    'equals': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_1110798221654880547115.js'));
                    },
                    'clone': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-18657018931654880547116.js'));
                    },
                    'toString': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-18939880591654880547118.js'));
                    },
                    'toVector': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-13885230381654880547120.js'));
                    },
                    'valueOf': function () {
                                                var $that = this;
                        return eval($dl('uff/$_3479015191654880547121.js'));
                    },
                    'isNaN': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-6999130981654880547121.js'));
                    },
                    'isFinite': function () {
                                                var $that = this;
                        return eval($dl('uff/$_14980544001654880547122.js'));
                    }
                };
                Complex['ZERO'] = new Complex(0, 0);
                Complex['ONE'] = new Complex(1, 0);
                Complex['I'] = new Complex(0, 1);
                Complex['PI'] = new Complex(Math.PI, 0);
                Complex['E'] = new Complex(Math.E, 0);
                Complex['EPSILON'] = 1e-16;
                if (true) {
                    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                        return Complex;
                    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else if (typeof exports === 'object') {
                    module['exports'] = Complex;
                } else {
                    root['Complex'] = Complex;
                }
            }(this));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_843485111654880547123.js'));
            }
            exports.name = 'complex';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(171),
                __webpack_require__(92)
            ];
        },
        function (module, exports, __webpack_require__) {
            var Fraction = __webpack_require__(172);
            Fraction.prototype.type = 'Fraction';
            Fraction.prototype.isFraction = true;
            Fraction.prototype.toJSON = function () {
                                var $that = this;
                return eval($dl('uff/$_-11042513491654880547124.js'));
            };
            Fraction.fromJSON = function (json) {
                                return eval($dl('uff/$_-15289769261654880547125.js'));
            };
            function factory(type, config, load, typed) {
                return Fraction;
            }
            exports.name = 'Fraction';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function (root) {
                'use strict';
                var MAX_CYCLE_LEN = 2000;
                var P = {
                    's': 1,
                    'n': 0,
                    'd': 1
                };
                function createError(name) {
                    var errorConstructor = function () {
                                                var $that = this;
                        eval($dl('uff/$_17196014621654880547126.js'));
                    };
                    var IntermediateInheritor = function () {
                    };
                    IntermediateInheritor.prototype = Error.prototype;
                    errorConstructor.prototype = new IntermediateInheritor();
                    return errorConstructor;
                }
                var DivisionByZero = Fraction['DivisionByZero'] = createError('DivisionByZero');
                var InvalidParameter = Fraction['InvalidParameter'] = createError('InvalidParameter');
                function assign(n, s) {
                                        return eval($dl('uff/$_-14708212811654880547126.js'));
                }
                function throwInvalidParam() {
                                        eval($dl('uff/$_-13571806181654880547127.js'));
                }
                var parse = function (p1, p2) {
                    var n = 0, d = 1, s = 1;
                    var v = 0, w = 0, x = 0, y = 1, z = 1;
                    var A = 0, B = 1;
                    var C = 1, D = 1;
                    var N = 10000000;
                    var M;
                    if (p1 === undefined || p1 === null) {
                    } else if (p2 !== undefined) {
                        n = p1;
                        d = p2;
                        s = n * d;
                    } else
                        switch (typeof p1) {
                        case 'object': {
                                if ('d' in p1 && 'n' in p1) {
                                    n = p1['n'];
                                    d = p1['d'];
                                    if ('s' in p1)
                                        n *= p1['s'];
                                } else if (0 in p1) {
                                    n = p1[0];
                                    if (1 in p1)
                                        d = p1[1];
                                } else {
                                    throwInvalidParam();
                                }
                                s = n * d;
                                break;
                            }
                        case 'number': {
                                if (p1 < 0) {
                                    s = p1;
                                    p1 = -p1;
                                }
                                if (p1 % 1 === 0) {
                                    n = p1;
                                } else if (p1 > 0) {
                                    if (p1 >= 1) {
                                        z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
                                        p1 /= z;
                                    }
                                    while (B <= N && D <= N) {
                                        M = (A + C) / (B + D);
                                        if (p1 === M) {
                                            if (B + D <= N) {
                                                n = A + C;
                                                d = B + D;
                                            } else if (D > B) {
                                                n = C;
                                                d = D;
                                            } else {
                                                n = A;
                                                d = B;
                                            }
                                            break;
                                        } else {
                                            if (p1 > M) {
                                                A += C;
                                                B += D;
                                            } else {
                                                C += A;
                                                D += B;
                                            }
                                            if (B > N) {
                                                n = C;
                                                d = D;
                                            } else {
                                                n = A;
                                                d = B;
                                            }
                                        }
                                    }
                                    n *= z;
                                } else if (isNaN(p1) || isNaN(p2)) {
                                    d = n = NaN;
                                }
                                break;
                            }
                        case 'string': {
                                B = p1.match(/\d+|./g);
                                if (B[A] === '-') {
                                    s = -1;
                                    A++;
                                } else if (B[A] === '+') {
                                    A++;
                                }
                                if (B.length === A + 1) {
                                    w = assign(B[A++], s);
                                } else if (B[A + 1] === '.' || B[A] === '.') {
                                    if (B[A] !== '.') {
                                        v = assign(B[A++], s);
                                    }
                                    A++;
                                    if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === '\'' && B[A + 3] === '\'') {
                                        w = assign(B[A], s);
                                        y = Math.pow(10, B[A].length);
                                        A++;
                                    }
                                    if (B[A] === '(' && B[A + 2] === ')' || B[A] === '\'' && B[A + 2] === '\'') {
                                        x = assign(B[A + 1], s);
                                        z = Math.pow(10, B[A + 1].length) - 1;
                                        A += 3;
                                    }
                                } else if (B[A + 1] === '/' || B[A + 1] === ':') {
                                    w = assign(B[A], s);
                                    y = assign(B[A + 2], 1);
                                    A += 3;
                                } else if (B[A + 3] === '/' && B[A + 1] === ' ') {
                                    v = assign(B[A], s);
                                    w = assign(B[A + 2], s);
                                    y = assign(B[A + 4], 1);
                                    A += 5;
                                }
                                if (B.length <= A) {
                                    d = y * z;
                                    s = n = x + d * v + z * w;
                                    break;
                                }
                            }
                        default:
                            throwInvalidParam();
                        }
                    if (d === 0) {
                        throw new DivisionByZero();
                    }
                    P['s'] = s < 0 ? -1 : 1;
                    P['n'] = Math.abs(n);
                    P['d'] = Math.abs(d);
                };
                var modpow = function (b, e, m) {
                                        return eval($dl('uff/$_-8458451771654880547128.js'));
                };
                var cycleLen = function (n, d) {
                                        return eval($dl('uff/$_18383118491654880547129.js'));
                };
                var cycleStart = function (n, d, len) {
                                        return eval($dl('uff/$_-9870369661654880547130.js'));
                };
                var gcd = function (a, b) {
                    if (!a)
                        return b;
                    if (!b)
                        return a;
                    while (1) {
                        a %= b;
                        if (!a)
                            return b;
                        b %= a;
                        if (!b)
                            return a;
                    }
                };
                function Fraction(a, b) {
                    if (!(this instanceof Fraction)) {
                        return new Fraction(a, b);
                    }
                    parse(a, b);
                    if (Fraction['REDUCE']) {
                        a = gcd(P['d'], P['n']);
                    } else {
                        a = 1;
                    }
                    this['s'] = P['s'];
                    this['n'] = P['n'] / a;
                    this['d'] = P['d'] / a;
                }
                Fraction['REDUCE'] = 1;
                Fraction.prototype = {
                    's': 1,
                    'n': 0,
                    'd': 1,
                    'abs': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-2026513841654880547131.js'));
                    },
                    'neg': function () {
                                                var $that = this;
                        return eval($dl('uff/$_19842589421654880547131.js'));
                    },
                    'add': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_14859724991654880547132.js'));
                    },
                    'sub': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_9933463251654880547133.js'));
                    },
                    'mul': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_-10822552901654880547134.js'));
                    },
                    'div': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_10604010941654880547134.js'));
                    },
                    'clone': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-20927566781654880547135.js'));
                    },
                    'mod': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_21266503911654880547136.js'));
                    },
                    'gcd': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_-8073761701654880547137.js'));
                    },
                    'lcm': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_-11393968421654880547138.js'));
                    },
                    'ceil': function (places) {
                                                var $that = this;
                        return eval($dl('uff/$_-10236407351654880547139.js'));
                    },
                    'floor': function (places) {
                                                var $that = this;
                        return eval($dl('uff/$_-19308000161654880547140.js'));
                    },
                    'round': function (places) {
                                                var $that = this;
                        return eval($dl('uff/$_-12899043981654880547141.js'));
                    },
                    'inverse': function () {
                                                var $that = this;
                        return eval($dl('uff/$_-1642832371654880547142.js'));
                    },
                    'pow': function (m) {
                                                var $that = this;
                        return eval($dl('uff/$_-15761570041654880547142.js'));
                    },
                    'equals': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_-20241553591654880547143.js'));
                    },
                    'compare': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_14284188701654880547144.js'));
                    },
                    'divisible': function (a, b) {
                                                var $that = this;
                        return eval($dl('uff/$_-20849598711654880547145.js'));
                    },
                    'valueOf': function () {
                        return this['s'] * this['n'] / this['d'];
                    },
                    'toFraction': function (excludeWhole) {
                                                var $that = this;
                        return eval($dl('uff/$_-14149245771654880547146.js'));
                    },
                    'toLatex': function (excludeWhole) {
                                                var $that = this;
                        return eval($dl('uff/$_-7595486541654880547147.js'));
                    },
                    'toContinued': function () {
                                                var $that = this;
                        return eval($dl('uff/$_9030279841654880547148.js'));
                    },
                    'toString': function () {
                                                var $that = this;
                        return eval($dl('uff/$_7469327261654880547149.js'));
                    }
                };
                if (true) {
                    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                        return Fraction;
                    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else if (typeof exports === 'object') {
                    module['exports'] = Fraction;
                } else {
                    root['Fraction'] = Fraction;
                }
            }(this));
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(72),
                __webpack_require__(43),
                __webpack_require__(175),
                __webpack_require__(176),
                __webpack_require__(177),
                __webpack_require__(178),
                __webpack_require__(27),
                __webpack_require__(93),
                __webpack_require__(179),
                __webpack_require__(0),
                __webpack_require__(180)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            exports.isBoolean = function (value) {
                                return eval($dl('uff/$_-6193542111654880547150.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var DimensionError = __webpack_require__(10);
            var array = util.array;
            var object = util.object;
            var string = util.string;
            var number = util.number;
            var isArray = Array.isArray;
            var isNumber = number.isNumber;
            var isInteger = number.isInteger;
            var isString = string.isString;
            var validateIndex = array.validateIndex;
            function factory(type, config, load, typed) {
                var Matrix = load(__webpack_require__(72));
                var equalScalar = load(__webpack_require__(11));
                function SparseMatrix(data, datatype) {
                                        var $that = this;
                    eval($dl('uff/$_13062245301654880547151.js'));
                }
                var _createFromMatrix = function (matrix, source, datatype) {
                                        eval($dl('uff/$_-13732620351654880547152.js'));
                };
                var _createFromArray = function (matrix, data, datatype) {
                                        eval($dl('uff/$_16195108631654880547153.js'));
                };
                SparseMatrix.prototype = new Matrix();
                SparseMatrix.prototype.type = 'SparseMatrix';
                SparseMatrix.prototype.isSparseMatrix = true;
                SparseMatrix.prototype.storage = function () {
                                        return eval($dl('uff/$_-3782918651654880547154.js'));
                };
                SparseMatrix.prototype.datatype = function () {
                                        var $that = this;
                    return eval($dl('uff/$_14971617901654880547155.js'));
                };
                SparseMatrix.prototype.create = function (data, datatype) {
                                        return eval($dl('uff/$_-18515712571654880547156.js'));
                };
                SparseMatrix.prototype.density = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-4968078261654880547156.js'));
                };
                SparseMatrix.prototype.subset = function (index, replacement, defaultValue) {
                                        var $that = this;
                    return eval($dl('uff/$_3364856481654880547158.js'));
                };
                var _getsubset = function (matrix, idx) {
                                        return eval($dl('uff/$_-14813175411654880547159.js'));
                };
                var _setsubset = function (matrix, index, submatrix, defaultValue) {
                                        return eval($dl('uff/$_-6565776881654880547160.js'));
                };
                SparseMatrix.prototype.get = function (index) {
                                        var $that = this;
                    return eval($dl('uff/$_6302738081654880547161.js'));
                };
                SparseMatrix.prototype.set = function (index, v, defaultValue) {
                                        var $that = this;
                    return eval($dl('uff/$_-20384819281654880547162.js'));
                };
                var _getValueIndex = function (i, top, bottom, index) {
                                        return eval($dl('uff/$_-17707911381654880547163.js'));
                };
                var _remove = function (k, j, values, index, ptr) {
                                        eval($dl('uff/$_-11243404381654880547164.js'));
                };
                var _insert = function (k, i, j, v, values, index, ptr) {
                                        eval($dl('uff/$_-4122264681654880547165.js'));
                };
                SparseMatrix.prototype.resize = function (size, defaultValue, copy) {
                                        var $that = this;
                    return eval($dl('uff/$_6510954961654880547166.js'));
                };
                var _resize = function (matrix, rows, columns, defaultValue) {
                                        return eval($dl('uff/$_10952606601654880547167.js'));
                };
                SparseMatrix.prototype.reshape = function (size, copy) {
                                        var $that = this;
                    return eval($dl('uff/$_-2704785351654880547168.js'));
                };
                SparseMatrix.prototype.clone = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-19834016351654880547170.js'));
                };
                SparseMatrix.prototype.size = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-20561727791654880547171.js'));
                };
                SparseMatrix.prototype.map = function (callback, skipZeros) {
                                        var $that = this;
                    return eval($dl('uff/$_-19157159271654880547171.js'));
                };
                var _map = function (matrix, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
                                        return eval($dl('uff/$_17448819731654880547172.js'));
                };
                SparseMatrix.prototype.forEach = function (callback, skipZeros) {
                                        var $that = this;
                    eval($dl('uff/$_-10290115621654880547173.js'));
                };
                SparseMatrix.prototype.toArray = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-12320142561654880547175.js'));
                };
                SparseMatrix.prototype.valueOf = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-10454360791654880547176.js'));
                };
                var _toArray = function (values, index, ptr, size, copy) {
                                        return eval($dl('uff/$_11049665481654880547176.js'));
                };
                SparseMatrix.prototype.format = function (options) {
                                        var $that = this;
                    return eval($dl('uff/$_-6319192131654880547177.js'));
                };
                SparseMatrix.prototype.toString = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-7958339711654880547179.js'));
                };
                SparseMatrix.prototype.toJSON = function () {
                                        var $that = this;
                    return eval($dl('uff/$_9810360101654880547179.js'));
                };
                SparseMatrix.prototype.diagonal = function (k) {
                                        var $that = this;
                    return eval($dl('uff/$_16192915001654880547180.js'));
                };
                SparseMatrix.fromJSON = function (json) {
                                        return eval($dl('uff/$_-3134975671654880547181.js'));
                };
                SparseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
                                        return eval($dl('uff/$_15972272281654880547182.js'));
                };
                SparseMatrix.prototype.swapRows = function (i, j) {
                                        var $that = this;
                    return eval($dl('uff/$_1627308211654880547184.js'));
                };
                SparseMatrix._forEachRow = function (j, values, index, ptr, callback) {
                                        eval($dl('uff/$_-9427258071654880547185.js'));
                };
                SparseMatrix._swapRows = function (x, y, columns, values, index, ptr) {
                                        eval($dl('uff/$_-15093286581654880547185.js'));
                };
                type.Matrix._storage.sparse = SparseMatrix;
                return SparseMatrix;
            }
            exports.name = 'SparseMatrix';
            exports.path = 'type';
            exports.factory = factory;
            exports.lazy = false;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load) {
                                return eval($dl('uff/$_8066104781654880547186.js'));
            }
            exports.name = 'Spa';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_2109117741654880547188.js'));
            }
            exports.name = 'FibonacciHeap';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var util = __webpack_require__(25);
            var string = util.string;
            var object = util.object;
            var isArray = Array.isArray;
            var isString = string.isString;
            function factory(type, config, load) {
                                return eval($dl('uff/$_-9015654281654880547189.js'));
            }
            exports.name = 'ImmutableDenseMatrix';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_20364962701654880547191.js'));
            }
            exports.name = 'index';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-5914036891654880547192.js'));
            }
            exports.name = 'sparse';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [__webpack_require__(94)];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_13278274601654880547193.js'));
            }
            exports.name = 'string';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(184),
                __webpack_require__(185),
                __webpack_require__(186),
                __webpack_require__(187),
                __webpack_require__(188)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var endsWith = __webpack_require__(9).endsWith;
            var clone = __webpack_require__(5).clone;
            var constants = __webpack_require__(95);
            function factory(type, config, load, typed, math) {
                var add = load(__webpack_require__(20));
                var subtract = load(__webpack_require__(21));
                var multiply = load(__webpack_require__(23));
                var divide = load(__webpack_require__(19));
                var pow = load(__webpack_require__(45));
                var abs = load(__webpack_require__(29));
                var fix = load(__webpack_require__(96));
                var round = load(__webpack_require__(97));
                var equal = load(__webpack_require__(30));
                var isNumeric = load(__webpack_require__(75));
                var format = load(__webpack_require__(98));
                var getTypeOf = load(__webpack_require__(76));
                var toNumber = load(__webpack_require__(74));
                var Complex = load(__webpack_require__(91));
                function Unit(value, name) {
                    if (!(this instanceof Unit)) {
                        throw new Error('Constructor must be called with the new operator');
                    }
                    if (!(value == undefined || isNumeric(value) || type.isComplex(value))) {
                        throw new TypeError('First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined');
                    }
                    if (name != undefined && (typeof name !== 'string' || name === '')) {
                        throw new TypeError('Second parameter in Unit constructor must be a string');
                    }
                    if (name != undefined) {
                        var u = Unit.parse(name);
                        this.units = u.units;
                        this.dimensions = u.dimensions;
                    } else {
                        this.units = [{
                                unit: UNIT_NONE,
                                prefix: PREFIXES.NONE,
                                power: 0
                            }];
                        this.dimensions = [];
                        for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
                            this.dimensions[i] = 0;
                        }
                    }
                    this.value = value != undefined ? this._normalize(value) : null;
                    this.fixPrefix = false;
                    this.isUnitListSimplified = true;
                }
                Unit.prototype.type = 'Unit';
                Unit.prototype.isUnit = true;
                var text, index, c;
                function skipWhitespace() {
                    while (c == ' ' || c == '\t') {
                        next();
                    }
                }
                function isDigitDot(c) {
                    return c >= '0' && c <= '9' || c == '.';
                }
                function isDigit(c) {
                                        return eval($dl('uff/$_-14284964601654880547194.js'));
                }
                function next() {
                    index++;
                    c = text.charAt(index);
                }
                function revert(oldIndex) {
                    index = oldIndex;
                    c = text.charAt(index);
                }
                function parseNumber() {
                    var number = '';
                    var oldIndex;
                    oldIndex = index;
                    if (c == '+') {
                        next();
                    } else if (c == '-') {
                        number += c;
                        next();
                    }
                    if (!isDigitDot(c)) {
                        revert(oldIndex);
                        return null;
                    }
                    if (c == '.') {
                        number += c;
                        next();
                        if (!isDigit(c)) {
                            revert(oldIndex);
                            return null;
                        }
                    } else {
                        while (isDigit(c)) {
                            number += c;
                            next();
                        }
                        if (c == '.') {
                            number += c;
                            next();
                        }
                    }
                    while (isDigit(c)) {
                        number += c;
                        next();
                    }
                    if (c == 'E' || c == 'e') {
                        var tentativeNumber = '';
                        var tentativeIndex = index;
                        tentativeNumber += c;
                        next();
                        if (c == '+' || c == '-') {
                            tentativeNumber += c;
                            next();
                        }
                        if (!isDigit(c)) {
                            revert(tentativeIndex);
                            return number;
                        }
                        number = number + tentativeNumber;
                        while (isDigit(c)) {
                            number += c;
                            next();
                        }
                    }
                    return number;
                }
                function parseUnit() {
                    var unitName = '';
                    var code = text.charCodeAt(index);
                    while (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122) {
                        unitName += c;
                        next();
                        code = text.charCodeAt(index);
                    }
                    code = unitName.charCodeAt(0);
                    if (code >= 65 && code <= 90 || code >= 97 && code <= 122) {
                        return unitName || null;
                    } else {
                        return null;
                    }
                }
                function parseCharacter(toFind) {
                    if (c === toFind) {
                        next();
                        return toFind;
                    } else {
                        return null;
                    }
                }
                Unit.parse = function (str, options) {
                    options = options || {};
                    text = str;
                    index = -1;
                    c = '';
                    if (typeof text !== 'string') {
                        throw new TypeError('Invalid argument in Unit.parse, string expected');
                    }
                    var unit = new Unit();
                    unit.units = [];
                    next();
                    skipWhitespace();
                    var valueStr = parseNumber();
                    var value = null;
                    if (valueStr) {
                        if (config.number === 'BigNumber') {
                            value = new type.BigNumber(valueStr);
                        } else if (config.number === 'Fraction') {
                            value = new type.Fraction(valueStr);
                        } else {
                            value = parseFloat(valueStr);
                        }
                    }
                    skipWhitespace();
                    var powerMultiplierCurrent = 1;
                    var expectingUnit = false;
                    var powerMultiplierStack = [];
                    var powerMultiplierStackProduct = 1;
                    while (true) {
                        skipWhitespace();
                        while (c === '(') {
                            powerMultiplierStack.push(powerMultiplierCurrent);
                            powerMultiplierStackProduct *= powerMultiplierCurrent;
                            powerMultiplierCurrent = 1;
                            next();
                            skipWhitespace();
                        }
                        if (c) {
                            var oldC = c;
                            var uStr = parseUnit();
                            if (uStr == null) {
                                throw new SyntaxError('Unexpected "' + oldC + '" in "' + text + '" at index ' + index.toString());
                            }
                        } else {
                            break;
                        }
                        var res = _findUnit(uStr);
                        if (res == null) {
                            throw new SyntaxError('Unit "' + uStr + '" not found.');
                        }
                        var power = powerMultiplierCurrent * powerMultiplierStackProduct;
                        skipWhitespace();
                        if (parseCharacter('^')) {
                            skipWhitespace();
                            var p = parseNumber();
                            if (p == null) {
                                throw new SyntaxError('In "' + str + '", "^" must be followed by a floating-point number');
                            }
                            power *= p;
                        }
                        unit.units.push({
                            unit: res.unit,
                            prefix: res.prefix,
                            power: power
                        });
                        for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
                            unit.dimensions[i] += (res.unit.dimensions[i] || 0) * power;
                        }
                        skipWhitespace();
                        while (c === ')') {
                            if (powerMultiplierStack.length === 0) {
                                throw new SyntaxError('Unmatched ")" in "' + text + '" at index ' + index.toString());
                            }
                            powerMultiplierStackProduct /= powerMultiplierStack.pop();
                            next();
                            skipWhitespace();
                        }
                        expectingUnit = false;
                        if (parseCharacter('*')) {
                            powerMultiplierCurrent = 1;
                            expectingUnit = true;
                        } else if (parseCharacter('/')) {
                            powerMultiplierCurrent = -1;
                            expectingUnit = true;
                        } else {
                            powerMultiplierCurrent = 1;
                        }
                        if (res.unit.base) {
                            var baseDim = res.unit.base.key;
                            UNIT_SYSTEMS.auto[baseDim] = {
                                unit: res.unit,
                                prefix: res.prefix
                            };
                        }
                    }
                    skipWhitespace();
                    if (c) {
                        throw new SyntaxError('Could not parse: "' + str + '"');
                    }
                    if (expectingUnit) {
                        throw new SyntaxError('Trailing characters: "' + str + '"');
                    }
                    if (powerMultiplierStack.length !== 0) {
                        throw new SyntaxError('Unmatched "(" in "' + text + '"');
                    }
                    if (unit.units.length == 0 && !options.allowNoUnits) {
                        throw new SyntaxError('"' + str + '" contains no units');
                    }
                    unit.value = value != undefined ? unit._normalize(value) : null;
                    return unit;
                };
                Unit.prototype.clone = function () {
                    var unit = new Unit();
                    unit.fixPrefix = this.fixPrefix;
                    unit.isUnitListSimplified = this.isUnitListSimplified;
                    unit.value = clone(this.value);
                    unit.dimensions = this.dimensions.slice(0);
                    unit.units = [];
                    for (var i = 0; i < this.units.length; i++) {
                        unit.units[i] = {};
                        for (var p in this.units[i]) {
                            if (this.units[i].hasOwnProperty(p)) {
                                unit.units[i][p] = this.units[i][p];
                            }
                        }
                    }
                    return unit;
                };
                Unit.prototype._isDerived = function () {
                    if (this.units.length === 0) {
                        return false;
                    }
                    return this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15;
                };
                Unit.prototype._normalize = function (value) {
                    var unitValue, unitOffset, unitPower, unitPrefixValue;
                    var convert;
                    if (value == null || this.units.length === 0) {
                        return value;
                    } else if (this._isDerived()) {
                        var res = value;
                        convert = Unit._getNumberConverter(getTypeOf(value));
                        for (var i = 0; i < this.units.length; i++) {
                            unitValue = convert(this.units[i].unit.value);
                            unitPrefixValue = convert(this.units[i].prefix.value);
                            unitPower = convert(this.units[i].power);
                            res = multiply(res, pow(multiply(unitValue, unitPrefixValue), unitPower));
                        }
                        return res;
                    } else {
                        convert = Unit._getNumberConverter(getTypeOf(value));
                        unitValue = convert(this.units[0].unit.value);
                        unitOffset = convert(this.units[0].unit.offset);
                        unitPrefixValue = convert(this.units[0].prefix.value);
                        return multiply(add(value, unitOffset), multiply(unitValue, unitPrefixValue));
                    }
                };
                Unit.prototype._denormalize = function (value, prefixValue) {
                    var unitValue, unitOffset, unitPower, unitPrefixValue;
                    var convert;
                    if (value == null || this.units.length === 0) {
                        return value;
                    } else if (this._isDerived()) {
                        var res = value;
                        convert = Unit._getNumberConverter(getTypeOf(value));
                        for (var i = 0; i < this.units.length; i++) {
                            unitValue = convert(this.units[i].unit.value);
                            unitPrefixValue = convert(this.units[i].prefix.value);
                            unitPower = convert(this.units[i].power);
                            res = divide(res, pow(multiply(unitValue, unitPrefixValue), unitPower));
                        }
                        return res;
                    } else {
                        convert = Unit._getNumberConverter(getTypeOf(value));
                        unitValue = convert(this.units[0].unit.value);
                        unitPrefixValue = convert(this.units[0].prefix.value);
                        unitOffset = convert(this.units[0].unit.offset);
                        if (prefixValue == undefined) {
                            return subtract(divide(divide(value, unitValue), unitPrefixValue), unitOffset);
                        } else {
                            return subtract(divide(divide(value, unitValue), prefixValue), unitOffset);
                        }
                    }
                };
                function _findUnit(str) {
                    if (UNITS.hasOwnProperty(str)) {
                        var unit = UNITS[str];
                        var prefix = unit.prefixes[''];
                        return {
                            unit: unit,
                            prefix: prefix
                        };
                    }
                    for (var name in UNITS) {
                        if (UNITS.hasOwnProperty(name)) {
                            if (endsWith(str, name)) {
                                var unit = UNITS[name];
                                var prefixLen = str.length - name.length;
                                var prefixName = str.substring(0, prefixLen);
                                var prefix = unit.prefixes.hasOwnProperty(prefixName) ? unit.prefixes[prefixName] : undefined;
                                if (prefix !== undefined) {
                                    return {
                                        unit: unit,
                                        prefix: prefix
                                    };
                                }
                            }
                        }
                    }
                    return null;
                }
                Unit.isValuelessUnit = function (name) {
                    return _findUnit(name) != null;
                };
                Unit.prototype.hasBase = function (base) {
                                        var $that = this;
                    return eval($dl('uff/$_-9708794601654880547195.js'));
                };
                Unit.prototype.equalBase = function (other) {
                    for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
                        if (Math.abs((this.dimensions[i] || 0) - (other.dimensions[i] || 0)) > 1e-12) {
                            return false;
                        }
                    }
                    return true;
                };
                Unit.prototype.equals = function (other) {
                                        var $that = this;
                    return eval($dl('uff/$_2384974261654880547196.js'));
                };
                Unit.prototype.multiply = function (other) {
                                        var $that = this;
                    return eval($dl('uff/$_-3202466711654880547197.js'));
                };
                Unit.prototype.divide = function (other) {
                                        var $that = this;
                    return eval($dl('uff/$_11310197961654880547198.js'));
                };
                Unit.prototype.pow = function (p) {
                                        var $that = this;
                    return eval($dl('uff/$_-11176847151654880547200.js'));
                };
                var getNumericIfUnitless = function (unit) {
                                        return eval($dl('uff/$_7739803221654880547201.js'));
                };
                Unit.prototype.abs = function () {
                                        var $that = this;
                    return eval($dl('uff/$_7723036991654880547201.js'));
                };
                Unit.prototype.to = function (valuelessUnit) {
                    var other;
                    var value = this.value == null ? this._normalize(1) : this.value;
                    if (typeof valuelessUnit === 'string') {
                        other = Unit.parse(valuelessUnit);
                        if (!this.equalBase(other)) {
                            throw new Error('Units do not match');
                        }
                        if (other.value !== null) {
                            throw new Error('Cannot convert to a unit with a value');
                        }
                        other.value = clone(value);
                        other.fixPrefix = true;
                        other.isUnitListSimplified = true;
                        return other;
                    } else if (type.isUnit(valuelessUnit)) {
                        if (!this.equalBase(valuelessUnit)) {
                            throw new Error('Units do not match');
                        }
                        if (valuelessUnit.value !== null) {
                            throw new Error('Cannot convert to a unit with a value');
                        }
                        other = valuelessUnit.clone();
                        other.value = clone(value);
                        other.fixPrefix = true;
                        other.isUnitListSimplified = true;
                        return other;
                    } else {
                        throw new Error('String or Unit expected as parameter');
                    }
                };
                Unit.prototype.toNumber = function (valuelessUnit) {
                                        var $that = this;
                    return eval($dl('uff/$_-7785545371654880547202.js'));
                };
                Unit.prototype.toNumeric = function (valuelessUnit) {
                                        var $that = this;
                    return eval($dl('uff/$_8827222581654880547203.js'));
                };
                Unit.prototype.toString = function () {
                                        var $that = this;
                    return eval($dl('uff/$_987136291654880547204.js'));
                };
                Unit.prototype.toJSON = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-7633585931654880547205.js'));
                };
                Unit.fromJSON = function (json) {
                                        return eval($dl('uff/$_-7079609391654880547205.js'));
                };
                Unit.prototype.valueOf = Unit.prototype.toString;
                Unit.prototype.simplifyUnitListLazy = function () {
                    if (this.isUnitListSimplified || this.value == null) {
                        return;
                    }
                    var proposedUnitList = [];
                    var matchingBase;
                    for (var key in currentUnitSystem) {
                        if (this.hasBase(BASE_UNITS[key])) {
                            matchingBase = key;
                            break;
                        }
                    }
                    if (matchingBase === 'NONE') {
                        this.units = [];
                    } else {
                        var matchingUnit;
                        if (matchingBase) {
                            if (currentUnitSystem.hasOwnProperty(matchingBase)) {
                                matchingUnit = currentUnitSystem[matchingBase];
                            }
                        }
                        var value;
                        var str;
                        if (matchingUnit) {
                            this.units = [{
                                    unit: matchingUnit.unit,
                                    prefix: matchingUnit.prefix,
                                    power: 1
                                }];
                        } else {
                            var missingBaseDim = false;
                            for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
                                var baseDim = BASE_DIMENSIONS[i];
                                if (Math.abs(this.dimensions[i] || 0) > 1e-12) {
                                    if (currentUnitSystem.hasOwnProperty(baseDim)) {
                                        proposedUnitList.push({
                                            unit: currentUnitSystem[baseDim].unit,
                                            prefix: currentUnitSystem[baseDim].prefix,
                                            power: this.dimensions[i] || 0
                                        });
                                    } else {
                                        missingBaseDim = true;
                                    }
                                }
                            }
                            if (proposedUnitList.length < this.units.length && !missingBaseDim) {
                                this.units = proposedUnitList;
                            }
                        }
                    }
                    this.isUnitListSimplified = true;
                };
                Unit.prototype.toSI = function () {
                                        var $that = this;
                    return eval($dl('uff/$_12167957951654880547206.js'));
                };
                Unit.prototype.formatUnits = function () {
                    this.simplifyUnitListLazy();
                    var strNum = '';
                    var strDen = '';
                    var nNum = 0;
                    var nDen = 0;
                    for (var i = 0; i < this.units.length; i++) {
                        if (this.units[i].power > 0) {
                            nNum++;
                            strNum += ' ' + this.units[i].prefix.name + this.units[i].unit.name;
                            if (Math.abs(this.units[i].power - 1) > 1e-15) {
                                strNum += '^' + this.units[i].power;
                            }
                        } else if (this.units[i].power < 0) {
                            nDen++;
                        }
                    }
                    if (nDen > 0) {
                        for (var i = 0; i < this.units.length; i++) {
                            if (this.units[i].power < 0) {
                                if (nNum > 0) {
                                    strDen += ' ' + this.units[i].prefix.name + this.units[i].unit.name;
                                    if (Math.abs(this.units[i].power + 1) > 1e-15) {
                                        strDen += '^' + -this.units[i].power;
                                    }
                                } else {
                                    strDen += ' ' + this.units[i].prefix.name + this.units[i].unit.name;
                                    strDen += '^' + this.units[i].power;
                                }
                            }
                        }
                    }
                    strNum = strNum.substr(1);
                    strDen = strDen.substr(1);
                    if (nNum > 1 && nDen > 0) {
                        strNum = '(' + strNum + ')';
                    }
                    if (nDen > 1 && nNum > 0) {
                        strDen = '(' + strDen + ')';
                    }
                    var str = strNum;
                    if (nNum > 0 && nDen > 0) {
                        str += ' / ';
                    }
                    str += strDen;
                    return str;
                };
                Unit.prototype.format = function (options) {
                    this.simplifyUnitListLazy();
                    var isImaginary = false;
                    var isReal = true;
                    if (typeof this.value !== 'undefined' && this.value !== null && type.isComplex(this.value)) {
                        isImaginary = Math.abs(this.value.re) < 1e-14;
                        isReal = Math.abs(this.value.im) < 1e-14;
                    }
                    for (var i in this.units) {
                        if (this.units[i].unit) {
                            if (this.units[i].unit.name === 'VA' && isImaginary) {
                                this.units[i].unit = UNITS['VAR'];
                            } else if (this.units[i].unit.name === 'VAR' && !isImaginary) {
                                this.units[i].unit = UNITS['VA'];
                            }
                        }
                    }
                    if (this.units.length === 1 && !this.fixPrefix) {
                        if (Math.abs(this.units[0].power - Math.round(this.units[0].power)) < 1e-14) {
                            this.units[0].prefix = this._bestPrefix();
                        }
                    }
                    var value = this._denormalize(this.value);
                    var str = this.value !== null ? format(value, options || {}) : '';
                    var unitStr = this.formatUnits();
                    if (this.value && type.isComplex(this.value)) {
                        str = '(' + str + ')';
                    }
                    if (unitStr.length > 0 && str.length > 0) {
                        str += ' ';
                    }
                    str += unitStr;
                    return str;
                };
                Unit.prototype._bestPrefix = function () {
                                        var $that = this;
                    return eval($dl('uff/$_-2603884151654880547207.js'));
                };
                Unit.prototype.splitUnit = function (parts) {
                                        var $that = this;
                    return eval($dl('uff/$_18368311481654880547209.js'));
                };
                var PREFIXES = {
                    NONE: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        }
                    },
                    SHORT: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        },
                        'da': {
                            name: 'da',
                            value: 10,
                            scientific: false
                        },
                        'h': {
                            name: 'h',
                            value: 100,
                            scientific: false
                        },
                        'k': {
                            name: 'k',
                            value: 1000,
                            scientific: true
                        },
                        'M': {
                            name: 'M',
                            value: 1000000,
                            scientific: true
                        },
                        'G': {
                            name: 'G',
                            value: 1000000000,
                            scientific: true
                        },
                        'T': {
                            name: 'T',
                            value: 1000000000000,
                            scientific: true
                        },
                        'P': {
                            name: 'P',
                            value: 1000000000000000,
                            scientific: true
                        },
                        'E': {
                            name: 'E',
                            value: 1000000000000000000,
                            scientific: true
                        },
                        'Z': {
                            name: 'Z',
                            value: 1e+21,
                            scientific: true
                        },
                        'Y': {
                            name: 'Y',
                            value: 1e+24,
                            scientific: true
                        },
                        'd': {
                            name: 'd',
                            value: 0.1,
                            scientific: false
                        },
                        'c': {
                            name: 'c',
                            value: 0.01,
                            scientific: false
                        },
                        'm': {
                            name: 'm',
                            value: 0.001,
                            scientific: true
                        },
                        'u': {
                            name: 'u',
                            value: 0.000001,
                            scientific: true
                        },
                        'n': {
                            name: 'n',
                            value: 1e-9,
                            scientific: true
                        },
                        'p': {
                            name: 'p',
                            value: 1e-12,
                            scientific: true
                        },
                        'f': {
                            name: 'f',
                            value: 1e-15,
                            scientific: true
                        },
                        'a': {
                            name: 'a',
                            value: 1e-18,
                            scientific: true
                        },
                        'z': {
                            name: 'z',
                            value: 1e-21,
                            scientific: true
                        },
                        'y': {
                            name: 'y',
                            value: 1e-24,
                            scientific: true
                        }
                    },
                    LONG: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        },
                        'deca': {
                            name: 'deca',
                            value: 10,
                            scientific: false
                        },
                        'hecto': {
                            name: 'hecto',
                            value: 100,
                            scientific: false
                        },
                        'kilo': {
                            name: 'kilo',
                            value: 1000,
                            scientific: true
                        },
                        'mega': {
                            name: 'mega',
                            value: 1000000,
                            scientific: true
                        },
                        'giga': {
                            name: 'giga',
                            value: 1000000000,
                            scientific: true
                        },
                        'tera': {
                            name: 'tera',
                            value: 1000000000000,
                            scientific: true
                        },
                        'peta': {
                            name: 'peta',
                            value: 1000000000000000,
                            scientific: true
                        },
                        'exa': {
                            name: 'exa',
                            value: 1000000000000000000,
                            scientific: true
                        },
                        'zetta': {
                            name: 'zetta',
                            value: 1e+21,
                            scientific: true
                        },
                        'yotta': {
                            name: 'yotta',
                            value: 1e+24,
                            scientific: true
                        },
                        'deci': {
                            name: 'deci',
                            value: 0.1,
                            scientific: false
                        },
                        'centi': {
                            name: 'centi',
                            value: 0.01,
                            scientific: false
                        },
                        'milli': {
                            name: 'milli',
                            value: 0.001,
                            scientific: true
                        },
                        'micro': {
                            name: 'micro',
                            value: 0.000001,
                            scientific: true
                        },
                        'nano': {
                            name: 'nano',
                            value: 1e-9,
                            scientific: true
                        },
                        'pico': {
                            name: 'pico',
                            value: 1e-12,
                            scientific: true
                        },
                        'femto': {
                            name: 'femto',
                            value: 1e-15,
                            scientific: true
                        },
                        'atto': {
                            name: 'atto',
                            value: 1e-18,
                            scientific: true
                        },
                        'zepto': {
                            name: 'zepto',
                            value: 1e-21,
                            scientific: true
                        },
                        'yocto': {
                            name: 'yocto',
                            value: 1e-24,
                            scientific: true
                        }
                    },
                    SQUARED: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        },
                        'da': {
                            name: 'da',
                            value: 100,
                            scientific: false
                        },
                        'h': {
                            name: 'h',
                            value: 10000,
                            scientific: false
                        },
                        'k': {
                            name: 'k',
                            value: 1000000,
                            scientific: true
                        },
                        'M': {
                            name: 'M',
                            value: 1000000000000,
                            scientific: true
                        },
                        'G': {
                            name: 'G',
                            value: 1000000000000000000,
                            scientific: true
                        },
                        'T': {
                            name: 'T',
                            value: 1e+24,
                            scientific: true
                        },
                        'P': {
                            name: 'P',
                            value: 1e+30,
                            scientific: true
                        },
                        'E': {
                            name: 'E',
                            value: 1e+36,
                            scientific: true
                        },
                        'Z': {
                            name: 'Z',
                            value: 1e+42,
                            scientific: true
                        },
                        'Y': {
                            name: 'Y',
                            value: 1e+48,
                            scientific: true
                        },
                        'd': {
                            name: 'd',
                            value: 0.01,
                            scientific: false
                        },
                        'c': {
                            name: 'c',
                            value: 0.0001,
                            scientific: false
                        },
                        'm': {
                            name: 'm',
                            value: 0.000001,
                            scientific: true
                        },
                        'u': {
                            name: 'u',
                            value: 1e-12,
                            scientific: true
                        },
                        'n': {
                            name: 'n',
                            value: 1e-18,
                            scientific: true
                        },
                        'p': {
                            name: 'p',
                            value: 1e-24,
                            scientific: true
                        },
                        'f': {
                            name: 'f',
                            value: 1e-30,
                            scientific: true
                        },
                        'a': {
                            name: 'a',
                            value: 1e-36,
                            scientific: true
                        },
                        'z': {
                            name: 'z',
                            value: 1e-42,
                            scientific: true
                        },
                        'y': {
                            name: 'y',
                            value: 1e-48,
                            scientific: true
                        }
                    },
                    CUBIC: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        },
                        'da': {
                            name: 'da',
                            value: 1000,
                            scientific: false
                        },
                        'h': {
                            name: 'h',
                            value: 1000000,
                            scientific: false
                        },
                        'k': {
                            name: 'k',
                            value: 1000000000,
                            scientific: true
                        },
                        'M': {
                            name: 'M',
                            value: 1000000000000000000,
                            scientific: true
                        },
                        'G': {
                            name: 'G',
                            value: 1e+27,
                            scientific: true
                        },
                        'T': {
                            name: 'T',
                            value: 1e+36,
                            scientific: true
                        },
                        'P': {
                            name: 'P',
                            value: 1e+45,
                            scientific: true
                        },
                        'E': {
                            name: 'E',
                            value: 1e+54,
                            scientific: true
                        },
                        'Z': {
                            name: 'Z',
                            value: 1e+63,
                            scientific: true
                        },
                        'Y': {
                            name: 'Y',
                            value: 1e+72,
                            scientific: true
                        },
                        'd': {
                            name: 'd',
                            value: 0.001,
                            scientific: false
                        },
                        'c': {
                            name: 'c',
                            value: 0.000001,
                            scientific: false
                        },
                        'm': {
                            name: 'm',
                            value: 1e-9,
                            scientific: true
                        },
                        'u': {
                            name: 'u',
                            value: 1e-18,
                            scientific: true
                        },
                        'n': {
                            name: 'n',
                            value: 1e-27,
                            scientific: true
                        },
                        'p': {
                            name: 'p',
                            value: 1e-36,
                            scientific: true
                        },
                        'f': {
                            name: 'f',
                            value: 1e-45,
                            scientific: true
                        },
                        'a': {
                            name: 'a',
                            value: 1e-54,
                            scientific: true
                        },
                        'z': {
                            name: 'z',
                            value: 1e-63,
                            scientific: true
                        },
                        'y': {
                            name: 'y',
                            value: 1e-72,
                            scientific: true
                        }
                    },
                    BINARY_SHORT: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        },
                        'k': {
                            name: 'k',
                            value: 1000,
                            scientific: true
                        },
                        'M': {
                            name: 'M',
                            value: 1000000,
                            scientific: true
                        },
                        'G': {
                            name: 'G',
                            value: 1000000000,
                            scientific: true
                        },
                        'T': {
                            name: 'T',
                            value: 1000000000000,
                            scientific: true
                        },
                        'P': {
                            name: 'P',
                            value: 1000000000000000,
                            scientific: true
                        },
                        'E': {
                            name: 'E',
                            value: 1000000000000000000,
                            scientific: true
                        },
                        'Z': {
                            name: 'Z',
                            value: 1e+21,
                            scientific: true
                        },
                        'Y': {
                            name: 'Y',
                            value: 1e+24,
                            scientific: true
                        },
                        'Ki': {
                            name: 'Ki',
                            value: 1024,
                            scientific: true
                        },
                        'Mi': {
                            name: 'Mi',
                            value: Math.pow(1024, 2),
                            scientific: true
                        },
                        'Gi': {
                            name: 'Gi',
                            value: Math.pow(1024, 3),
                            scientific: true
                        },
                        'Ti': {
                            name: 'Ti',
                            value: Math.pow(1024, 4),
                            scientific: true
                        },
                        'Pi': {
                            name: 'Pi',
                            value: Math.pow(1024, 5),
                            scientific: true
                        },
                        'Ei': {
                            name: 'Ei',
                            value: Math.pow(1024, 6),
                            scientific: true
                        },
                        'Zi': {
                            name: 'Zi',
                            value: Math.pow(1024, 7),
                            scientific: true
                        },
                        'Yi': {
                            name: 'Yi',
                            value: Math.pow(1024, 8),
                            scientific: true
                        }
                    },
                    BINARY_LONG: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        },
                        'kilo': {
                            name: 'kilo',
                            value: 1000,
                            scientific: true
                        },
                        'mega': {
                            name: 'mega',
                            value: 1000000,
                            scientific: true
                        },
                        'giga': {
                            name: 'giga',
                            value: 1000000000,
                            scientific: true
                        },
                        'tera': {
                            name: 'tera',
                            value: 1000000000000,
                            scientific: true
                        },
                        'peta': {
                            name: 'peta',
                            value: 1000000000000000,
                            scientific: true
                        },
                        'exa': {
                            name: 'exa',
                            value: 1000000000000000000,
                            scientific: true
                        },
                        'zetta': {
                            name: 'zetta',
                            value: 1e+21,
                            scientific: true
                        },
                        'yotta': {
                            name: 'yotta',
                            value: 1e+24,
                            scientific: true
                        },
                        'kibi': {
                            name: 'kibi',
                            value: 1024,
                            scientific: true
                        },
                        'mebi': {
                            name: 'mebi',
                            value: Math.pow(1024, 2),
                            scientific: true
                        },
                        'gibi': {
                            name: 'gibi',
                            value: Math.pow(1024, 3),
                            scientific: true
                        },
                        'tebi': {
                            name: 'tebi',
                            value: Math.pow(1024, 4),
                            scientific: true
                        },
                        'pebi': {
                            name: 'pebi',
                            value: Math.pow(1024, 5),
                            scientific: true
                        },
                        'exi': {
                            name: 'exi',
                            value: Math.pow(1024, 6),
                            scientific: true
                        },
                        'zebi': {
                            name: 'zebi',
                            value: Math.pow(1024, 7),
                            scientific: true
                        },
                        'yobi': {
                            name: 'yobi',
                            value: Math.pow(1024, 8),
                            scientific: true
                        }
                    },
                    BTU: {
                        '': {
                            name: '',
                            value: 1,
                            scientific: true
                        },
                        'MM': {
                            name: 'MM',
                            value: 1000000,
                            scientific: true
                        }
                    }
                };
                PREFIXES.SHORTLONG = {};
                for (var key in PREFIXES.SHORT) {
                    if (PREFIXES.SHORT.hasOwnProperty(key)) {
                        PREFIXES.SHORTLONG[key] = PREFIXES.SHORT[key];
                    }
                }
                for (var key in PREFIXES.LONG) {
                    if (PREFIXES.LONG.hasOwnProperty(key)) {
                        PREFIXES.SHORTLONG[key] = PREFIXES.LONG[key];
                    }
                }
                var BASE_DIMENSIONS = [
                    'MASS',
                    'LENGTH',
                    'TIME',
                    'CURRENT',
                    'TEMPERATURE',
                    'LUMINOUS_INTENSITY',
                    'AMOUNT_OF_SUBSTANCE',
                    'ANGLE',
                    'BIT'
                ];
                var BASE_UNITS = {
                    NONE: {
                        dimensions: [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    MASS: {
                        dimensions: [
                            1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    LENGTH: {
                        dimensions: [
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    TIME: {
                        dimensions: [
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    CURRENT: {
                        dimensions: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    TEMPERATURE: {
                        dimensions: [
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    LUMINOUS_INTENSITY: {
                        dimensions: [
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0
                        ]
                    },
                    AMOUNT_OF_SUBSTANCE: {
                        dimensions: [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0
                        ]
                    },
                    FORCE: {
                        dimensions: [
                            1,
                            1,
                            -2,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    SURFACE: {
                        dimensions: [
                            0,
                            2,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    VOLUME: {
                        dimensions: [
                            0,
                            3,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ENERGY: {
                        dimensions: [
                            1,
                            2,
                            -2,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    POWER: {
                        dimensions: [
                            1,
                            2,
                            -3,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    PRESSURE: {
                        dimensions: [
                            1,
                            -1,
                            -2,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ELECTRIC_CHARGE: {
                        dimensions: [
                            0,
                            0,
                            1,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ELECTRIC_CAPACITANCE: {
                        dimensions: [
                            -1,
                            -2,
                            4,
                            2,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ELECTRIC_POTENTIAL: {
                        dimensions: [
                            1,
                            2,
                            -3,
                            -1,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ELECTRIC_RESISTANCE: {
                        dimensions: [
                            1,
                            2,
                            -3,
                            -2,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ELECTRIC_INDUCTANCE: {
                        dimensions: [
                            1,
                            2,
                            -2,
                            -2,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ELECTRIC_CONDUCTANCE: {
                        dimensions: [
                            -1,
                            -2,
                            3,
                            2,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    MAGNETIC_FLUX: {
                        dimensions: [
                            1,
                            2,
                            -2,
                            -1,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    MAGNETIC_FLUX_DENSITY: {
                        dimensions: [
                            1,
                            0,
                            -2,
                            -1,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    FREQUENCY: {
                        dimensions: [
                            0,
                            0,
                            -1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    ANGLE: {
                        dimensions: [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0
                        ]
                    },
                    BIT: {
                        dimensions: [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1
                        ]
                    }
                };
                for (var key in BASE_UNITS) {
                    BASE_UNITS[key].key = key;
                }
                var BASE_UNIT_NONE = {};
                var UNIT_NONE = {
                    name: '',
                    base: BASE_UNIT_NONE,
                    value: 1,
                    offset: 0,
                    dimensions: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                };
                var UNITS = {
                    meter: {
                        name: 'meter',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    inch: {
                        name: 'inch',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.0254,
                        offset: 0
                    },
                    foot: {
                        name: 'foot',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.3048,
                        offset: 0
                    },
                    yard: {
                        name: 'yard',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.9144,
                        offset: 0
                    },
                    mile: {
                        name: 'mile',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 1609.344,
                        offset: 0
                    },
                    link: {
                        name: 'link',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.201168,
                        offset: 0
                    },
                    rod: {
                        name: 'rod',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 5.02921,
                        offset: 0
                    },
                    chain: {
                        name: 'chain',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 20.1168,
                        offset: 0
                    },
                    angstrom: {
                        name: 'angstrom',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 1e-10,
                        offset: 0
                    },
                    m: {
                        name: 'm',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    'in': {
                        name: 'in',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.0254,
                        offset: 0
                    },
                    ft: {
                        name: 'ft',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.3048,
                        offset: 0
                    },
                    yd: {
                        name: 'yd',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.9144,
                        offset: 0
                    },
                    mi: {
                        name: 'mi',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 1609.344,
                        offset: 0
                    },
                    li: {
                        name: 'li',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.201168,
                        offset: 0
                    },
                    rd: {
                        name: 'rd',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 5.02921,
                        offset: 0
                    },
                    ch: {
                        name: 'ch',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 20.1168,
                        offset: 0
                    },
                    mil: {
                        name: 'mil',
                        base: BASE_UNITS.LENGTH,
                        prefixes: PREFIXES.NONE,
                        value: 0.0000254,
                        offset: 0
                    },
                    m2: {
                        name: 'm2',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.SQUARED,
                        value: 1,
                        offset: 0
                    },
                    sqin: {
                        name: 'sqin',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 0.00064516,
                        offset: 0
                    },
                    sqft: {
                        name: 'sqft',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 0.09290304,
                        offset: 0
                    },
                    sqyd: {
                        name: 'sqyd',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 0.83612736,
                        offset: 0
                    },
                    sqmi: {
                        name: 'sqmi',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 2589988.110336,
                        offset: 0
                    },
                    sqrd: {
                        name: 'sqrd',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 25.29295,
                        offset: 0
                    },
                    sqch: {
                        name: 'sqch',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 404.6873,
                        offset: 0
                    },
                    sqmil: {
                        name: 'sqmil',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 6.4516e-10,
                        offset: 0
                    },
                    acre: {
                        name: 'acre',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 4046.86,
                        offset: 0
                    },
                    hectare: {
                        name: 'hectare',
                        base: BASE_UNITS.SURFACE,
                        prefixes: PREFIXES.NONE,
                        value: 10000,
                        offset: 0
                    },
                    m3: {
                        name: 'm3',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.CUBIC,
                        value: 1,
                        offset: 0
                    },
                    L: {
                        name: 'L',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.SHORT,
                        value: 0.001,
                        offset: 0
                    },
                    l: {
                        name: 'l',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.SHORT,
                        value: 0.001,
                        offset: 0
                    },
                    litre: {
                        name: 'litre',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.LONG,
                        value: 0.001,
                        offset: 0
                    },
                    cuin: {
                        name: 'cuin',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.000016387064,
                        offset: 0
                    },
                    cuft: {
                        name: 'cuft',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.028316846592,
                        offset: 0
                    },
                    cuyd: {
                        name: 'cuyd',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.764554857984,
                        offset: 0
                    },
                    teaspoon: {
                        name: 'teaspoon',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.000005,
                        offset: 0
                    },
                    tablespoon: {
                        name: 'tablespoon',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.000015,
                        offset: 0
                    },
                    drop: {
                        name: 'drop',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 5e-8,
                        offset: 0
                    },
                    gtt: {
                        name: 'gtt',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 5e-8,
                        offset: 0
                    },
                    minim: {
                        name: 'minim',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 6.161152e-8,
                        offset: 0
                    },
                    fluiddram: {
                        name: 'fluiddram',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0000036966911,
                        offset: 0
                    },
                    fluidounce: {
                        name: 'fluidounce',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.00002957353,
                        offset: 0
                    },
                    gill: {
                        name: 'gill',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0001182941,
                        offset: 0
                    },
                    cc: {
                        name: 'cc',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.000001,
                        offset: 0
                    },
                    cup: {
                        name: 'cup',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0002365882,
                        offset: 0
                    },
                    pint: {
                        name: 'pint',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0004731765,
                        offset: 0
                    },
                    quart: {
                        name: 'quart',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0009463529,
                        offset: 0
                    },
                    gallon: {
                        name: 'gallon',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.003785412,
                        offset: 0
                    },
                    beerbarrel: {
                        name: 'beerbarrel',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.1173478,
                        offset: 0
                    },
                    oilbarrel: {
                        name: 'oilbarrel',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.1589873,
                        offset: 0
                    },
                    hogshead: {
                        name: 'hogshead',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.238481,
                        offset: 0
                    },
                    fldr: {
                        name: 'fldr',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0000036966911,
                        offset: 0
                    },
                    floz: {
                        name: 'floz',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.00002957353,
                        offset: 0
                    },
                    gi: {
                        name: 'gi',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0001182941,
                        offset: 0
                    },
                    cp: {
                        name: 'cp',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0002365882,
                        offset: 0
                    },
                    pt: {
                        name: 'pt',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0004731765,
                        offset: 0
                    },
                    qt: {
                        name: 'qt',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.0009463529,
                        offset: 0
                    },
                    gal: {
                        name: 'gal',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.003785412,
                        offset: 0
                    },
                    bbl: {
                        name: 'bbl',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.1173478,
                        offset: 0
                    },
                    obl: {
                        name: 'obl',
                        base: BASE_UNITS.VOLUME,
                        prefixes: PREFIXES.NONE,
                        value: 0.1589873,
                        offset: 0
                    },
                    g: {
                        name: 'g',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.SHORT,
                        value: 0.001,
                        offset: 0
                    },
                    gram: {
                        name: 'gram',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.LONG,
                        value: 0.001,
                        offset: 0
                    },
                    ton: {
                        name: 'ton',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.SHORT,
                        value: 907.18474,
                        offset: 0
                    },
                    tonne: {
                        name: 'tonne',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.SHORT,
                        value: 1000,
                        offset: 0
                    },
                    grain: {
                        name: 'grain',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.00006479891,
                        offset: 0
                    },
                    dram: {
                        name: 'dram',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.0017718451953125,
                        offset: 0
                    },
                    ounce: {
                        name: 'ounce',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.028349523125,
                        offset: 0
                    },
                    poundmass: {
                        name: 'poundmass',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.45359237,
                        offset: 0
                    },
                    hundredweight: {
                        name: 'hundredweight',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 45.359237,
                        offset: 0
                    },
                    stick: {
                        name: 'stick',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.115,
                        offset: 0
                    },
                    stone: {
                        name: 'stone',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 6.35029318,
                        offset: 0
                    },
                    gr: {
                        name: 'gr',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.00006479891,
                        offset: 0
                    },
                    dr: {
                        name: 'dr',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.0017718451953125,
                        offset: 0
                    },
                    oz: {
                        name: 'oz',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.028349523125,
                        offset: 0
                    },
                    lbm: {
                        name: 'lbm',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 0.45359237,
                        offset: 0
                    },
                    cwt: {
                        name: 'cwt',
                        base: BASE_UNITS.MASS,
                        prefixes: PREFIXES.NONE,
                        value: 45.359237,
                        offset: 0
                    },
                    s: {
                        name: 's',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    min: {
                        name: 'min',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 60,
                        offset: 0
                    },
                    h: {
                        name: 'h',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 3600,
                        offset: 0
                    },
                    second: {
                        name: 'second',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    sec: {
                        name: 'sec',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    minute: {
                        name: 'minute',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 60,
                        offset: 0
                    },
                    hour: {
                        name: 'hour',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 3600,
                        offset: 0
                    },
                    day: {
                        name: 'day',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 86400,
                        offset: 0
                    },
                    week: {
                        name: 'week',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 7 * 86400,
                        offset: 0
                    },
                    month: {
                        name: 'month',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 2629800,
                        offset: 0
                    },
                    year: {
                        name: 'year',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 31557600,
                        offset: 0
                    },
                    decade: {
                        name: 'year',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 315576000,
                        offset: 0
                    },
                    century: {
                        name: 'century',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 3155760000,
                        offset: 0
                    },
                    millennium: {
                        name: 'millennium',
                        base: BASE_UNITS.TIME,
                        prefixes: PREFIXES.NONE,
                        value: 31557600000,
                        offset: 0
                    },
                    hertz: {
                        name: 'Hertz',
                        base: BASE_UNITS.FREQUENCY,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0,
                        reciprocal: true
                    },
                    Hz: {
                        name: 'Hz',
                        base: BASE_UNITS.FREQUENCY,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0,
                        reciprocal: true
                    },
                    rad: {
                        name: 'rad',
                        base: BASE_UNITS.ANGLE,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    deg: {
                        name: 'deg',
                        base: BASE_UNITS.ANGLE,
                        prefixes: PREFIXES.LONG,
                        value: null,
                        offset: 0
                    },
                    grad: {
                        name: 'grad',
                        base: BASE_UNITS.ANGLE,
                        prefixes: PREFIXES.LONG,
                        value: null,
                        offset: 0
                    },
                    cycle: {
                        name: 'cycle',
                        base: BASE_UNITS.ANGLE,
                        prefixes: PREFIXES.NONE,
                        value: null,
                        offset: 0
                    },
                    arcsec: {
                        name: 'arcsec',
                        base: BASE_UNITS.ANGLE,
                        prefixes: PREFIXES.NONE,
                        value: null,
                        offset: 0
                    },
                    arcmin: {
                        name: 'arcmin',
                        base: BASE_UNITS.ANGLE,
                        prefixes: PREFIXES.NONE,
                        value: null,
                        offset: 0
                    },
                    A: {
                        name: 'A',
                        base: BASE_UNITS.CURRENT,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    ampere: {
                        name: 'ampere',
                        base: BASE_UNITS.CURRENT,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    K: {
                        name: 'K',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1,
                        offset: 0
                    },
                    degC: {
                        name: 'degC',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1,
                        offset: 273.15
                    },
                    degF: {
                        name: 'degF',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1 / 1.8,
                        offset: 459.67
                    },
                    degR: {
                        name: 'degR',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1 / 1.8,
                        offset: 0
                    },
                    kelvin: {
                        name: 'kelvin',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1,
                        offset: 0
                    },
                    celsius: {
                        name: 'celsius',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1,
                        offset: 273.15
                    },
                    fahrenheit: {
                        name: 'fahrenheit',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1 / 1.8,
                        offset: 459.67
                    },
                    rankine: {
                        name: 'rankine',
                        base: BASE_UNITS.TEMPERATURE,
                        prefixes: PREFIXES.NONE,
                        value: 1 / 1.8,
                        offset: 0
                    },
                    mol: {
                        name: 'mol',
                        base: BASE_UNITS.AMOUNT_OF_SUBSTANCE,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    mole: {
                        name: 'mole',
                        base: BASE_UNITS.AMOUNT_OF_SUBSTANCE,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    cd: {
                        name: 'cd',
                        base: BASE_UNITS.LUMINOUS_INTENSITY,
                        prefixes: PREFIXES.NONE,
                        value: 1,
                        offset: 0
                    },
                    candela: {
                        name: 'candela',
                        base: BASE_UNITS.LUMINOUS_INTENSITY,
                        prefixes: PREFIXES.NONE,
                        value: 1,
                        offset: 0
                    },
                    N: {
                        name: 'N',
                        base: BASE_UNITS.FORCE,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    newton: {
                        name: 'newton',
                        base: BASE_UNITS.FORCE,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    dyn: {
                        name: 'dyn',
                        base: BASE_UNITS.FORCE,
                        prefixes: PREFIXES.SHORT,
                        value: 0.00001,
                        offset: 0
                    },
                    dyne: {
                        name: 'dyne',
                        base: BASE_UNITS.FORCE,
                        prefixes: PREFIXES.LONG,
                        value: 0.00001,
                        offset: 0
                    },
                    lbf: {
                        name: 'lbf',
                        base: BASE_UNITS.FORCE,
                        prefixes: PREFIXES.NONE,
                        value: 4.4482216152605,
                        offset: 0
                    },
                    poundforce: {
                        name: 'poundforce',
                        base: BASE_UNITS.FORCE,
                        prefixes: PREFIXES.NONE,
                        value: 4.4482216152605,
                        offset: 0
                    },
                    kip: {
                        name: 'kip',
                        base: BASE_UNITS.FORCE,
                        prefixes: PREFIXES.LONG,
                        value: 4448.2216,
                        offset: 0
                    },
                    J: {
                        name: 'J',
                        base: BASE_UNITS.ENERGY,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    joule: {
                        name: 'joule',
                        base: BASE_UNITS.ENERGY,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    erg: {
                        name: 'erg',
                        base: BASE_UNITS.ENERGY,
                        prefixes: PREFIXES.NONE,
                        value: 1e-7,
                        offset: 0
                    },
                    Wh: {
                        name: 'Wh',
                        base: BASE_UNITS.ENERGY,
                        prefixes: PREFIXES.SHORT,
                        value: 3600,
                        offset: 0
                    },
                    BTU: {
                        name: 'BTU',
                        base: BASE_UNITS.ENERGY,
                        prefixes: PREFIXES.BTU,
                        value: 1055.05585262,
                        offset: 0
                    },
                    eV: {
                        name: 'eV',
                        base: BASE_UNITS.ENERGY,
                        prefixes: PREFIXES.SHORT,
                        value: 1.602176565e-19,
                        offset: 0
                    },
                    electronvolt: {
                        name: 'electronvolt',
                        base: BASE_UNITS.ENERGY,
                        prefixes: PREFIXES.LONG,
                        value: 1.602176565e-19,
                        offset: 0
                    },
                    W: {
                        name: 'W',
                        base: BASE_UNITS.POWER,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    watt: {
                        name: 'W',
                        base: BASE_UNITS.POWER,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    hp: {
                        name: 'hp',
                        base: BASE_UNITS.POWER,
                        prefixes: PREFIXES.NONE,
                        value: 745.6998715386,
                        offset: 0
                    },
                    VAR: {
                        name: 'VAR',
                        base: BASE_UNITS.POWER,
                        prefixes: PREFIXES.SHORT,
                        value: Complex.I,
                        offset: 0
                    },
                    VA: {
                        name: 'VA',
                        base: BASE_UNITS.POWER,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    Pa: {
                        name: 'Pa',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    psi: {
                        name: 'psi',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.NONE,
                        value: 6894.75729276459,
                        offset: 0
                    },
                    atm: {
                        name: 'atm',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.NONE,
                        value: 101325,
                        offset: 0
                    },
                    bar: {
                        name: 'bar',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.NONE,
                        value: 100000,
                        offset: 0
                    },
                    torr: {
                        name: 'torr',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.NONE,
                        value: 133.322,
                        offset: 0
                    },
                    mmHg: {
                        name: 'mmHg',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.NONE,
                        value: 133.322,
                        offset: 0
                    },
                    mmH2O: {
                        name: 'mmH2O',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.NONE,
                        value: 9.80665,
                        offset: 0
                    },
                    cmH2O: {
                        name: 'cmH2O',
                        base: BASE_UNITS.PRESSURE,
                        prefixes: PREFIXES.NONE,
                        value: 98.0665,
                        offset: 0
                    },
                    coulomb: {
                        name: 'coulomb',
                        base: BASE_UNITS.ELECTRIC_CHARGE,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    C: {
                        name: 'C',
                        base: BASE_UNITS.ELECTRIC_CHARGE,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    farad: {
                        name: 'farad',
                        base: BASE_UNITS.ELECTRIC_CAPACITANCE,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    F: {
                        name: 'F',
                        base: BASE_UNITS.ELECTRIC_CAPACITANCE,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    volt: {
                        name: 'volt',
                        base: BASE_UNITS.ELECTRIC_POTENTIAL,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    V: {
                        name: 'V',
                        base: BASE_UNITS.ELECTRIC_POTENTIAL,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    ohm: {
                        name: 'ohm',
                        base: BASE_UNITS.ELECTRIC_RESISTANCE,
                        prefixes: PREFIXES.SHORTLONG,
                        value: 1,
                        offset: 0
                    },
                    henry: {
                        name: 'henry',
                        base: BASE_UNITS.ELECTRIC_INDUCTANCE,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    H: {
                        name: 'H',
                        base: BASE_UNITS.ELECTRIC_INDUCTANCE,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    siemens: {
                        name: 'siemens',
                        base: BASE_UNITS.ELECTRIC_CONDUCTANCE,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    S: {
                        name: 'S',
                        base: BASE_UNITS.ELECTRIC_CONDUCTANCE,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    weber: {
                        name: 'weber',
                        base: BASE_UNITS.MAGNETIC_FLUX,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    Wb: {
                        name: 'Wb',
                        base: BASE_UNITS.MAGNETIC_FLUX,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    tesla: {
                        name: 'tesla',
                        base: BASE_UNITS.MAGNETIC_FLUX_DENSITY,
                        prefixes: PREFIXES.LONG,
                        value: 1,
                        offset: 0
                    },
                    T: {
                        name: 'T',
                        base: BASE_UNITS.MAGNETIC_FLUX_DENSITY,
                        prefixes: PREFIXES.SHORT,
                        value: 1,
                        offset: 0
                    },
                    b: {
                        name: 'b',
                        base: BASE_UNITS.BIT,
                        prefixes: PREFIXES.BINARY_SHORT,
                        value: 1,
                        offset: 0
                    },
                    bits: {
                        name: 'bits',
                        base: BASE_UNITS.BIT,
                        prefixes: PREFIXES.BINARY_LONG,
                        value: 1,
                        offset: 0
                    },
                    B: {
                        name: 'B',
                        base: BASE_UNITS.BIT,
                        prefixes: PREFIXES.BINARY_SHORT,
                        value: 8,
                        offset: 0
                    },
                    bytes: {
                        name: 'bytes',
                        base: BASE_UNITS.BIT,
                        prefixes: PREFIXES.BINARY_LONG,
                        value: 8,
                        offset: 0
                    }
                };
                var ALIASES = {
                    meters: 'meter',
                    inches: 'inch',
                    feet: 'foot',
                    yards: 'yard',
                    miles: 'mile',
                    links: 'link',
                    rods: 'rod',
                    chains: 'chain',
                    angstroms: 'angstrom',
                    lt: 'l',
                    litres: 'litre',
                    liter: 'litre',
                    liters: 'litre',
                    teaspoons: 'teaspoon',
                    tablespoons: 'tablespoon',
                    minims: 'minim',
                    fluiddrams: 'fluiddram',
                    fluidounces: 'fluidounce',
                    gills: 'gill',
                    cups: 'cup',
                    pints: 'pint',
                    quarts: 'quart',
                    gallons: 'gallon',
                    beerbarrels: 'beerbarrel',
                    oilbarrels: 'oilbarrel',
                    hogsheads: 'hogshead',
                    gtts: 'gtt',
                    grams: 'gram',
                    tons: 'ton',
                    tonnes: 'tonne',
                    grains: 'grain',
                    drams: 'dram',
                    ounces: 'ounce',
                    poundmasses: 'poundmass',
                    hundredweights: 'hundredweight',
                    sticks: 'stick',
                    lb: 'lbm',
                    lbs: 'lbm',
                    kips: 'kip',
                    acres: 'acre',
                    hectares: 'hectare',
                    sqfeet: 'sqft',
                    sqyard: 'sqyd',
                    sqmile: 'sqmi',
                    sqmiles: 'sqmi',
                    mmhg: 'mmHg',
                    mmh2o: 'mmH2O',
                    cmh2o: 'cmH2O',
                    seconds: 'second',
                    secs: 'second',
                    minutes: 'minute',
                    mins: 'minute',
                    hours: 'hour',
                    hr: 'hour',
                    hrs: 'hour',
                    days: 'day',
                    weeks: 'week',
                    months: 'month',
                    years: 'year',
                    hertz: 'hertz',
                    radians: 'rad',
                    degree: 'deg',
                    degrees: 'deg',
                    gradian: 'grad',
                    gradians: 'grad',
                    cycles: 'cycle',
                    arcsecond: 'arcsec',
                    arcseconds: 'arcsec',
                    arcminute: 'arcmin',
                    arcminutes: 'arcmin',
                    BTUs: 'BTU',
                    watts: 'watt',
                    joules: 'joule',
                    amperes: 'ampere',
                    coulombs: 'coulomb',
                    volts: 'volt',
                    ohms: 'ohm',
                    farads: 'farad',
                    webers: 'weber',
                    teslas: 'tesla',
                    electronvolts: 'electronvolt',
                    moles: 'mole'
                };
                function calculateAngleValues(config) {
                    if (config.number === 'BigNumber') {
                        var pi = constants.pi(type.BigNumber);
                        UNITS.rad.value = new type.BigNumber(1);
                        UNITS.deg.value = pi.div(180);
                        UNITS.grad.value = pi.div(200);
                        UNITS.cycle.value = pi.times(2);
                        UNITS.arcsec.value = pi.div(648000);
                        UNITS.arcmin.value = pi.div(10800);
                    } else {
                        UNITS.rad.value = 1;
                        UNITS.deg.value = Math.PI / 180;
                        UNITS.grad.value = Math.PI / 200;
                        UNITS.cycle.value = Math.PI * 2;
                        UNITS.arcsec.value = Math.PI / 648000;
                        UNITS.arcmin.value = Math.PI / 10800;
                    }
                }
                calculateAngleValues(config);
                math.on('config', function (curr, prev) {
                                        eval($dl('uff/$_-6482405311654880547212.js'));
                });
                var UNIT_SYSTEMS = {
                    si: {
                        NONE: {
                            unit: UNIT_NONE,
                            prefix: PREFIXES.NONE['']
                        },
                        LENGTH: {
                            unit: UNITS.m,
                            prefix: PREFIXES.SHORT['']
                        },
                        MASS: {
                            unit: UNITS.g,
                            prefix: PREFIXES.SHORT['k']
                        },
                        TIME: {
                            unit: UNITS.s,
                            prefix: PREFIXES.SHORT['']
                        },
                        CURRENT: {
                            unit: UNITS.A,
                            prefix: PREFIXES.SHORT['']
                        },
                        TEMPERATURE: {
                            unit: UNITS.K,
                            prefix: PREFIXES.SHORT['']
                        },
                        LUMINOUS_INTENSITY: {
                            unit: UNITS.cd,
                            prefix: PREFIXES.SHORT['']
                        },
                        AMOUNT_OF_SUBSTANCE: {
                            unit: UNITS.mol,
                            prefix: PREFIXES.SHORT['']
                        },
                        ANGLE: {
                            unit: UNITS.rad,
                            prefix: PREFIXES.SHORT['']
                        },
                        BIT: {
                            unit: UNITS.bit,
                            prefix: PREFIXES.SHORT['']
                        },
                        FORCE: {
                            unit: UNITS.N,
                            prefix: PREFIXES.SHORT['']
                        },
                        ENERGY: {
                            unit: UNITS.J,
                            prefix: PREFIXES.SHORT['']
                        },
                        POWER: {
                            unit: UNITS.W,
                            prefix: PREFIXES.SHORT['']
                        },
                        PRESSURE: {
                            unit: UNITS.Pa,
                            prefix: PREFIXES.SHORT['']
                        },
                        ELECTRIC_CHARGE: {
                            unit: UNITS.C,
                            prefix: PREFIXES.SHORT['']
                        },
                        ELECTRIC_CAPACITANCE: {
                            unit: UNITS.F,
                            prefix: PREFIXES.SHORT['']
                        },
                        ELECTRIC_POTENTIAL: {
                            unit: UNITS.V,
                            prefix: PREFIXES.SHORT['']
                        },
                        ELECTRIC_RESISTANCE: {
                            unit: UNITS.ohm,
                            prefix: PREFIXES.SHORT['']
                        },
                        ELECTRIC_INDUCTANCE: {
                            unit: UNITS.H,
                            prefix: PREFIXES.SHORT['']
                        },
                        ELECTRIC_CONDUCTANCE: {
                            unit: UNITS.S,
                            prefix: PREFIXES.SHORT['']
                        },
                        MAGNETIC_FLUX: {
                            unit: UNITS.Wb,
                            prefix: PREFIXES.SHORT['']
                        },
                        MAGNETIC_FLUX_DENSITY: {
                            unit: UNITS.T,
                            prefix: PREFIXES.SHORT['']
                        },
                        FREQUENCY: {
                            unit: UNITS.Hz,
                            prefix: PREFIXES.SHORT['']
                        }
                    }
                };
                UNIT_SYSTEMS.cgs = JSON.parse(JSON.stringify(UNIT_SYSTEMS.si));
                UNIT_SYSTEMS.cgs.LENGTH = {
                    unit: UNITS.m,
                    prefix: PREFIXES.SHORT['c']
                };
                UNIT_SYSTEMS.cgs.MASS = {
                    unit: UNITS.g,
                    prefix: PREFIXES.SHORT['']
                };
                UNIT_SYSTEMS.cgs.FORCE = {
                    unit: UNITS.dyn,
                    prefix: PREFIXES.SHORT['']
                };
                UNIT_SYSTEMS.cgs.ENERGY = {
                    unit: UNITS.erg,
                    prefix: PREFIXES.NONE['']
                };
                UNIT_SYSTEMS.us = JSON.parse(JSON.stringify(UNIT_SYSTEMS.si));
                UNIT_SYSTEMS.us.LENGTH = {
                    unit: UNITS.ft,
                    prefix: PREFIXES.NONE['']
                };
                UNIT_SYSTEMS.us.MASS = {
                    unit: UNITS.lbm,
                    prefix: PREFIXES.NONE['']
                };
                UNIT_SYSTEMS.us.TEMPERATURE = {
                    unit: UNITS.degF,
                    prefix: PREFIXES.NONE['']
                };
                UNIT_SYSTEMS.us.FORCE = {
                    unit: UNITS.lbf,
                    prefix: PREFIXES.NONE['']
                };
                UNIT_SYSTEMS.us.ENERGY = {
                    unit: UNITS.BTU,
                    prefix: PREFIXES.BTU['']
                };
                UNIT_SYSTEMS.us.POWER = {
                    unit: UNITS.hp,
                    prefix: PREFIXES.NONE['']
                };
                UNIT_SYSTEMS.us.PRESSURE = {
                    unit: UNITS.psi,
                    prefix: PREFIXES.NONE['']
                };
                UNIT_SYSTEMS.auto = JSON.parse(JSON.stringify(UNIT_SYSTEMS.si));
                var currentUnitSystem = UNIT_SYSTEMS.auto;
                Unit.setUnitSystem = function (name) {
                                        eval($dl('uff/$_7170431791654880547214.js'));
                };
                Unit.getUnitSystem = function () {
                                        return eval($dl('uff/$_-13592060211654880547215.js'));
                };
                Unit.typeConverters = {
                    BigNumber: function (x) {
                                                return eval($dl('uff/$_-18343360201654880547215.js'));
                    },
                    Fraction: function (x) {
                                                return eval($dl('uff/$_9607826341654880547216.js'));
                    },
                    Complex: function (x) {
                                                return eval($dl('uff/$_-708860951654880547217.js'));
                    },
                    number: function (x) {
                        return x;
                    }
                };
                Unit._getNumberConverter = function (type) {
                    if (!Unit.typeConverters[type]) {
                        throw new TypeError('Unsupported type "' + type + '"');
                    }
                    return Unit.typeConverters[type];
                };
                for (var key in UNITS) {
                    var unit = UNITS[key];
                    unit.dimensions = unit.base.dimensions;
                }
                for (var name in ALIASES) {
                    if (ALIASES.hasOwnProperty(name)) {
                        var unit = UNITS[ALIASES[name]];
                        var alias = {};
                        for (var key in unit) {
                            if (unit.hasOwnProperty(key)) {
                                alias[key] = unit[key];
                            }
                        }
                        alias.name = name;
                        UNITS[name] = alias;
                    }
                }
                function assertUnitNameIsValid(name) {
                                        eval($dl('uff/$_-10783885191654880547218.js'));
                }
                Unit.createUnit = function (obj, options) {
                                        return eval($dl('uff/$_16511016931654880547219.js'));
                };
                Unit.createUnitSingle = function (name, obj, options) {
                                        return eval($dl('uff/$_5917334891654880547220.js'));
                };
                Unit.deleteUnit = function (name) {
                                        eval($dl('uff/$_-17106092081654880547223.js'));
                };
                Unit.PREFIXES = PREFIXES;
                Unit.BASE_DIMENSIONS = BASE_DIMENSIONS;
                Unit.BASE_UNITS = BASE_UNITS;
                Unit.UNIT_SYSTEMS = UNIT_SYSTEMS;
                Unit.UNITS = UNITS;
                return Unit;
            }
            exports.name = 'Unit';
            exports.path = 'type';
            exports.factory = factory;
            exports.math = true;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-5806453231654880547224.js'));
            }
            exports.name = 'unit';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_3983265381654880547225.js'));
            }
            exports.name = 'createUnit';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_2099241411654880547226.js'));
            }
            exports.name = 'splitUnit';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var lazy = __webpack_require__(5).lazy;
            function factory(type, config, load, typed, math) {
                function fixedUnit(str) {
                                        return eval($dl('uff/$_-14688389761654880547227.js'));
                }
                setLazyConstant(math, 'speedOfLight', function () {
                                        return eval($dl('uff/$_-15375074291654880547228.js'));
                });
                setLazyConstant(math, 'gravitationConstant', function () {
                                        return eval($dl('uff/$_4653615401654880547229.js'));
                });
                setLazyConstant(math, 'planckConstant', function () {
                                        return eval($dl('uff/$_-1596440701654880547230.js'));
                });
                setLazyConstant(math, 'reducedPlanckConstant', function () {
                                        return eval($dl('uff/$_13840728891654880547231.js'));
                });
                setLazyConstant(math, 'magneticConstant', function () {
                                        return eval($dl('uff/$_8525509491654880547231.js'));
                });
                setLazyConstant(math, 'electricConstant', function () {
                                        return eval($dl('uff/$_-16047235751654880547232.js'));
                });
                setLazyConstant(math, 'vacuumImpedance', function () {
                                        return eval($dl('uff/$_-7456688401654880547232.js'));
                });
                setLazyConstant(math, 'coulomb', function () {
                                        return eval($dl('uff/$_-18561034271654880547233.js'));
                });
                setLazyConstant(math, 'elementaryCharge', function () {
                                        return eval($dl('uff/$_-18023085381654880547234.js'));
                });
                setLazyConstant(math, 'bohrMagneton', function () {
                                        return eval($dl('uff/$_4112752131654880547235.js'));
                });
                setLazyConstant(math, 'conductanceQuantum', function () {
                                        return eval($dl('uff/$_9368441731654880547236.js'));
                });
                setLazyConstant(math, 'inverseConductanceQuantum', function () {
                                        return eval($dl('uff/$_3388731961654880547236.js'));
                });
                setLazyConstant(math, 'magneticFluxQuantum', function () {
                                        return eval($dl('uff/$_678848241654880547237.js'));
                });
                setLazyConstant(math, 'nuclearMagneton', function () {
                                        return eval($dl('uff/$_-10787478291654880547238.js'));
                });
                setLazyConstant(math, 'klitzing', function () {
                                        return eval($dl('uff/$_-6630425501654880547239.js'));
                });
                setLazyConstant(math, 'bohrRadius', function () {
                                        return eval($dl('uff/$_9627497021654880547240.js'));
                });
                setLazyConstant(math, 'classicalElectronRadius', function () {
                                        return eval($dl('uff/$_-18944839651654880547241.js'));
                });
                setLazyConstant(math, 'electronMass', function () {
                                        return eval($dl('uff/$_-5322950601654880547243.js'));
                });
                setLazyConstant(math, 'fermiCoupling', function () {
                                        return eval($dl('uff/$_2505799121654880547244.js'));
                });
                setLazyConstant(math, 'fineStructure', function () {
                                        return eval($dl('uff/$_12892504841654880547245.js'));
                });
                setLazyConstant(math, 'hartreeEnergy', function () {
                                        return eval($dl('uff/$_20444868941654880547246.js'));
                });
                setLazyConstant(math, 'protonMass', function () {
                                        return eval($dl('uff/$_-2528845301654880547251.js'));
                });
                setLazyConstant(math, 'deuteronMass', function () {
                                        return eval($dl('uff/$_-20645903731654880547252.js'));
                });
                setLazyConstant(math, 'neutronMass', function () {
                                        return eval($dl('uff/$_-2805262861654880547253.js'));
                });
                setLazyConstant(math, 'quantumOfCirculation', function () {
                                        return eval($dl('uff/$_-16150680461654880547254.js'));
                });
                setLazyConstant(math, 'rydberg', function () {
                                        return eval($dl('uff/$_3990568201654880547255.js'));
                });
                setLazyConstant(math, 'thomsonCrossSection', function () {
                                        return eval($dl('uff/$_6115770881654880547256.js'));
                });
                setLazyConstant(math, 'weakMixingAngle', function () {
                                        return eval($dl('uff/$_4719005171654880547257.js'));
                });
                setLazyConstant(math, 'efimovFactor', function () {
                                        return eval($dl('uff/$_7977144161654880547259.js'));
                });
                setLazyConstant(math, 'atomicMass', function () {
                                        return eval($dl('uff/$_-8257682361654880547260.js'));
                });
                setLazyConstant(math, 'avogadro', function () {
                                        return eval($dl('uff/$_939657341654880547261.js'));
                });
                setLazyConstant(math, 'boltzmann', function () {
                                        return eval($dl('uff/$_9172872721654880547262.js'));
                });
                setLazyConstant(math, 'faraday', function () {
                                        return eval($dl('uff/$_-11067821291654880547263.js'));
                });
                setLazyConstant(math, 'firstRadiation', function () {
                                        return eval($dl('uff/$_-1550052931654880547264.js'));
                });
                setLazyConstant(math, 'loschmidt', function () {
                                        return eval($dl('uff/$_-18456591671654880547265.js'));
                });
                setLazyConstant(math, 'gasConstant', function () {
                                        return eval($dl('uff/$_2235980121654880547266.js'));
                });
                setLazyConstant(math, 'molarPlanckConstant', function () {
                                        return eval($dl('uff/$_11086521681654880547268.js'));
                });
                setLazyConstant(math, 'molarVolume', function () {
                                        return eval($dl('uff/$_20737096401654880547269.js'));
                });
                setLazyConstant(math, 'sackurTetrode', function () {
                                        return eval($dl('uff/$_-13909508281654880547269.js'));
                });
                setLazyConstant(math, 'secondRadiation', function () {
                                        return eval($dl('uff/$_729415331654880547270.js'));
                });
                setLazyConstant(math, 'stefanBoltzmann', function () {
                                        return eval($dl('uff/$_13042106931654880547271.js'));
                });
                setLazyConstant(math, 'wienDisplacement', function () {
                                        return eval($dl('uff/$_9321881841654880547272.js'));
                });
                setLazyConstant(math, 'molarMass', function () {
                                        return eval($dl('uff/$_-11514069041654880547273.js'));
                });
                setLazyConstant(math, 'molarMassC12', function () {
                                        return eval($dl('uff/$_798497951654880547273.js'));
                });
                setLazyConstant(math, 'gravity', function () {
                                        return eval($dl('uff/$_11258460931654880547274.js'));
                });
                setLazyConstant(math, 'planckLength', function () {
                                        return eval($dl('uff/$_-10993330301654880547275.js'));
                });
                setLazyConstant(math, 'planckMass', function () {
                                        return eval($dl('uff/$_6467796641654880547276.js'));
                });
                setLazyConstant(math, 'planckTime', function () {
                                        return eval($dl('uff/$_-15996847961654880547277.js'));
                });
                setLazyConstant(math, 'planckCharge', function () {
                                        return eval($dl('uff/$_-6800842901654880547278.js'));
                });
                setLazyConstant(math, 'planckTemperature', function () {
                                        return eval($dl('uff/$_8613085711654880547278.js'));
                });
            }
            function setLazyConstant(math, name, resolver) {
                lazy(math, name, resolver);
                lazy(math.expression.mathWithTransform, name, resolver);
            }
            exports.factory = factory;
            exports.lazy = false;
            exports.math = true;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var object = __webpack_require__(5);
            var bigConstants = __webpack_require__(95);
            function factory(type, config, load, typed, math) {
                math.on('config', function (curr, prev) {
                                        eval($dl('uff/$_2519372621654880547279.js'));
                });
                setConstant(math, 'true', true);
                setConstant(math, 'false', false);
                setConstant(math, 'null', null);
                setConstant(math, 'uninitialized', __webpack_require__(2).UNINITIALIZED);
                if (config.number === 'BigNumber') {
                    setConstant(math, 'Infinity', new type.BigNumber(Infinity));
                    setConstant(math, 'NaN', new type.BigNumber(NaN));
                    setLazyConstant(math, 'pi', function () {
                                                return eval($dl('uff/$_-15825689311654880547280.js'));
                    });
                    setLazyConstant(math, 'tau', function () {
                                                return eval($dl('uff/$_-2962754921654880547281.js'));
                    });
                    setLazyConstant(math, 'e', function () {
                                                return eval($dl('uff/$_-17688868871654880547282.js'));
                    });
                    setLazyConstant(math, 'phi', function () {
                                                return eval($dl('uff/$_-4739172751654880547283.js'));
                    });
                    setLazyConstant(math, 'E', function () {
                                                return eval($dl('uff/$_11541000061654880547284.js'));
                    });
                    setLazyConstant(math, 'LN2', function () {
                                                return eval($dl('uff/$_12597956941654880547285.js'));
                    });
                    setLazyConstant(math, 'LN10', function () {
                                                return eval($dl('uff/$_-4111309571654880547286.js'));
                    });
                    setLazyConstant(math, 'LOG2E', function () {
                                                return eval($dl('uff/$_-10517949431654880547286.js'));
                    });
                    setLazyConstant(math, 'LOG10E', function () {
                                                return eval($dl('uff/$_7553968801654880547287.js'));
                    });
                    setLazyConstant(math, 'PI', function () {
                                                return eval($dl('uff/$_-16905570321654880547288.js'));
                    });
                    setLazyConstant(math, 'SQRT1_2', function () {
                                                return eval($dl('uff/$_2168437291654880547289.js'));
                    });
                    setLazyConstant(math, 'SQRT2', function () {
                                                return eval($dl('uff/$_-19208805641654880547290.js'));
                    });
                } else {
                    setConstant(math, 'Infinity', Infinity);
                    setConstant(math, 'NaN', NaN);
                    setConstant(math, 'pi', Math.PI);
                    setConstant(math, 'tau', Math.PI * 2);
                    setConstant(math, 'e', Math.E);
                    setConstant(math, 'phi', 1.618033988749895);
                    setConstant(math, 'E', math.e);
                    setConstant(math, 'LN2', Math.LN2);
                    setConstant(math, 'LN10', Math.LN10);
                    setConstant(math, 'LOG2E', Math.LOG2E);
                    setConstant(math, 'LOG10E', Math.LOG10E);
                    setConstant(math, 'PI', math.pi);
                    setConstant(math, 'SQRT1_2', Math.SQRT1_2);
                    setConstant(math, 'SQRT2', Math.SQRT2);
                }
                setConstant(math, 'i', type.Complex.I);
                setConstant(math, 'version', __webpack_require__(190));
            }
            function setConstant(math, name, value) {
                math[name] = value;
                math.expression.mathWithTransform[name] = value;
            }
            function setLazyConstant(math, name, resolver) {
                                eval($dl('uff/$_-19149428641654880547291.js'));
            }
            exports.factory = factory;
            exports.lazy = false;
            exports.math = true;
        },
        function (module, exports) {
            module.exports = '3.16.4';
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(99),
                __webpack_require__(383),
                __webpack_require__(389),
                __webpack_require__(391),
                __webpack_require__(402),
                __webpack_require__(39),
                __webpack_require__(111)
            ];
        },
        function (module, exports) {
                        eval($dl('uff/$_-15550942801654880547293.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7092847261654880547294.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_5914119951654880547295.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_19980838401654880547296.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-19752026111654880547297.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_20263699271654880547299.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7629540431654880547300.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_5740639801654880547302.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_13516350391654880547303.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_7137151451654880547305.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_5201551351654880547306.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-6027328291654880547307.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8418728901654880547309.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_15163909881654880547310.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_10197099811654880547311.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_833989551654880547313.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14856334311654880547314.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17693853461654880547315.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-16309925151654880547316.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14907774501654880547318.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-242234491654880547319.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-14905027411654880547320.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_12391403341654880547322.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_18299346261654880547323.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-18003038871654880547324.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-14719568651654880547325.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7003786791654880547327.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-1027336761654880547328.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-14215258861654880547329.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-19401744391654880547330.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7039300541654880547332.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_11436894121654880547333.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-13054442441654880547334.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-21365787361654880547336.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8836451211654880547337.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-1830322151654880547338.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_2870127611654880547340.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8285222801654880547341.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14933289311654880547343.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-16145498961654880547344.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_16974245981654880547345.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-2028431181654880547347.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-17792111401654880547348.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-10709396571654880547349.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12185171201654880547350.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_12027487941654880547350.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_16926362671654880547352.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_3392128051654880547353.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17418814551654880547354.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-2817907521654880547355.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_576629981654880547356.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_5961315561654880547357.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17712371851654880547358.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-17743181471654880547359.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_8460667881654880547360.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-11350783701654880547361.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_10874862181654880547363.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_11635331141654880547364.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_13491458731654880547365.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-6702056121654880547366.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-16733084951654880547367.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_38940391654880547369.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-13502549821654880547370.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-13706839321654880547371.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17760066061654880547372.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14599189181654880547373.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_2423861081654880547374.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12509002831654880547375.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-11984410041654880547377.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-13239445621654880547378.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12735269811654880547379.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-10443713141654880547380.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-5058203901654880547382.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12795033911654880547383.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_8218330721654880547385.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_4094970851654880547386.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-20953837791654880547388.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_2396965281654880547389.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-11650757691654880547390.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17839885591654880547391.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-21395598901654880547392.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_12079015841654880547394.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_15682080041654880547395.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_5082312061654880547396.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-17074219741654880547397.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8223972481654880547398.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-16798547681654880547399.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8736717971654880547401.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-9091333981654880547402.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-17855550911654880547403.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_18386539421654880547404.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_659797141654880547405.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-9025610441654880547405.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-9921707991654880547406.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7534989561654880547407.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_467152351654880547410.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12124153871654880547411.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_4526694571654880547412.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_2086275541654880547413.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-9681105531654880547414.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-2544156461654880547415.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14284218221654880547416.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_18466657851654880547417.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14567074221654880547418.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-1117244361654880547419.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_16852302341654880547420.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17236240871654880547421.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-4676485291654880547422.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-19067669261654880547422.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_1235687491654880547423.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8853750811654880547424.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_9150606531654880547425.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-2137332171654880547427.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_15552614701654880547428.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_19537105361654880547429.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_4573489181654880547430.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17696557381654880547430.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_9983384531654880547432.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_20403473141654880547433.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_9622200621654880547433.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-3505707081654880547434.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-4450177461654880547435.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_4531481654880547436.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-21418866621654880547437.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_9539554701654880547438.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-18990519861654880547439.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-19125509201654880547440.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_274944041654880547441.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-14531392501654880547442.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-14710787181654880547443.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-13086501081654880547444.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_20535979721654880547445.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12343169691654880547446.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_2879022031654880547447.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_18216179131654880547448.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-10441078681654880547449.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-17884640461654880547450.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_5767080831654880547451.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-20089598891654880547452.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-10947057761654880547453.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-1008073061654880547454.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_15573682081654880547455.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-9129930081654880547456.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_7098845691654880547457.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_6924016101654880547457.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_18627743721654880547458.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8960902671654880547459.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_20663078321654880547460.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12289666441654880547461.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_801600251654880547462.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-9972063851654880547463.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_21046978801654880547464.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8582676071654880547464.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_12818911901654880547465.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-13644428551654880547466.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-19941943931654880547467.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7095939331654880547467.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-19565223061654880547468.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-18686793641654880547469.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7899026701654880547470.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-6589642421654880547471.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-19631511101654880547472.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-1894388591654880547473.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_17992634361654880547474.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_5376984961654880547474.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_4899761231654880547475.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-13600286231654880547476.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-20402662391654880547477.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_10867503831654880547478.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-1031779041654880547479.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-12936752441654880547480.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-3232460181654880547481.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-5751164681654880547482.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_13937210271654880547483.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-7301810371654880547484.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-8696328341654880547484.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-10332742181654880547485.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-10982381481654880547486.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-21233123021654880547487.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_2106272321654880547488.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-18490894411654880547489.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14145212821654880547490.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_14654877481654880547491.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-10582564691654880547492.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-11436647781654880547492.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_9427960571654880547493.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-21295336581654880547494.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_2018351701654880547495.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_8178085441654880547496.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-20186519691654880547497.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_15995588301654880547498.js'));
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(384),
                __webpack_require__(386),
                __webpack_require__(387),
                __webpack_require__(388),
                __webpack_require__(110)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_21264298101654880547499.js'));
            }
            exports.name = 'compile';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var errorTransform = __webpack_require__(41).transform;
            var setSafeProperty = __webpack_require__(13).setSafeProperty;
            function factory(type, config, load, typed) {
                var subset = load(__webpack_require__(22));
                var matrix = load(__webpack_require__(0));
                return function assign(object, index, value) {
                                        return eval($dl('uff/$_10750982031654880547499.js'));
                };
            }
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                var parse = load(__webpack_require__(39));
                return typed('compile', {
                    'string': function (expr) {
                        var scope = {};
                        return parse(expr).compile().eval(scope);
                    },
                    'string, Object': function (expr, scope) {
                                                return eval($dl('uff/$_10174843051654880547501.js'));
                    },
                    'Array | Matrix': function (expr) {
                                                return eval($dl('uff/$_-18607058171654880547501.js'));
                    },
                    'Array | Matrix, Object': function (expr, scope) {
                                                return eval($dl('uff/$_17867536641654880547502.js'));
                    }
                });
            }
            exports.name = 'eval';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var getSafeProperty = __webpack_require__(13).getSafeProperty;
            function factory(type, config, load, typed, math) {
                                return eval($dl('uff/$_-12130062941654880547503.js'));
            }
            exports.math = true;
            exports.name = 'help';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-13411625141654880547504.js'));
            }
            exports.name = 'parse';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(102),
                __webpack_require__(80),
                __webpack_require__(104),
                __webpack_require__(105),
                __webpack_require__(106),
                __webpack_require__(53),
                __webpack_require__(78),
                __webpack_require__(107),
                __webpack_require__(54),
                __webpack_require__(14),
                __webpack_require__(109),
                __webpack_require__(62),
                __webpack_require__(63),
                __webpack_require__(79),
                __webpack_require__(40),
                __webpack_require__(390)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_19495062231654880547505.js'));
            }
            exports.name = 'UpdateNode';
            exports.path = 'expression.node';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(392),
                __webpack_require__(393),
                __webpack_require__(394),
                __webpack_require__(395),
                __webpack_require__(396),
                __webpack_require__(397),
                __webpack_require__(398),
                __webpack_require__(399),
                __webpack_require__(400),
                __webpack_require__(401)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var errorTransform = __webpack_require__(41).transform;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-11389892761654880547506.js'));
            }
            exports.name = 'concat';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var filter = __webpack_require__(2).filter;
            var filterRegExp = __webpack_require__(2).filterRegExp;
            var maxArgumentCount = __webpack_require__(32).maxArgumentCount;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9370393111654880547507.js'));
            }
            function _filter(x, callback) {
                                return eval($dl('uff/$_17136346241654880547508.js'));
            }
            exports.name = 'filter';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var maxArgumentCount = __webpack_require__(32).maxArgumentCount;
            var forEach = __webpack_require__(2).forEach;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_15142187841654880547508.js'));
            }
            exports.name = 'forEach';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load) {
                                return eval($dl('uff/$_478005461654880547509.js'));
            }
            exports.name = 'index';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var maxArgumentCount = __webpack_require__(32).maxArgumentCount;
            var map = __webpack_require__(2).map;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9950015131654880547511.js'));
            }
            function _map(array, callback, orig) {
                                return eval($dl('uff/$_-8338263961654880547512.js'));
            }
            exports.name = 'map';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var errorTransform = __webpack_require__(41).transform;
            var isCollection = __webpack_require__(46);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_8110104021654880547513.js'));
            }
            exports.name = 'max';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var errorTransform = __webpack_require__(41).transform;
            var isCollection = __webpack_require__(46);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-5984445921654880547514.js'));
            }
            exports.name = 'mean';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var errorTransform = __webpack_require__(41).transform;
            var isCollection = __webpack_require__(46);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-15224549001654880547515.js'));
            }
            exports.name = 'min';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-13425845251654880547516.js'));
            }
            exports.name = 'range';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var errorTransform = __webpack_require__(41).transform;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-14045304111654880547517.js'));
            }
            exports.name = 'subset';
            exports.path = 'expression.transform';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var object = __webpack_require__(5);
            var string = __webpack_require__(9);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-2320485681654880547517.js'));
            }
            exports.name = 'Help';
            exports.path = 'type';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(404),
                __webpack_require__(425),
                __webpack_require__(444),
                __webpack_require__(457),
                __webpack_require__(461),
                __webpack_require__(465),
                __webpack_require__(468),
                __webpack_require__(472),
                __webpack_require__(485),
                __webpack_require__(495),
                __webpack_require__(498),
                __webpack_require__(506),
                __webpack_require__(508),
                __webpack_require__(514),
                __webpack_require__(516),
                __webpack_require__(541),
                __webpack_require__(543)
            ];
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(405),
                __webpack_require__(118),
                __webpack_require__(409),
                __webpack_require__(124),
                __webpack_require__(125),
                __webpack_require__(130),
                __webpack_require__(423),
                __webpack_require__(131)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var parse = load(__webpack_require__(39));
                var simplify = load(__webpack_require__(118));
                var ConstantNode = load(__webpack_require__(53));
                var FunctionNode = load(__webpack_require__(54));
                var OperatorNode = load(__webpack_require__(62));
                var ParenthesisNode = load(__webpack_require__(63));
                var SymbolNode = load(__webpack_require__(40));
                var derivative = typed('derivative', {
                    'Node, SymbolNode, Object': function (expr, variable, options) {
                        var constNodes = {};
                        constTag(constNodes, expr, variable.name);
                        var res = _derivative(expr, constNodes);
                        return options.simplify ? simplify(res) : res;
                    },
                    'Node, SymbolNode': function (expr, variable) {
                        return derivative(expr, variable, { simplify: true });
                    },
                    'string, SymbolNode': function (expr, variable) {
                                                return eval($dl('uff/$_14990093321654880547519.js'));
                    },
                    'string, SymbolNode, Object': function (expr, variable, options) {
                                                return eval($dl('uff/$_-7138400441654880547520.js'));
                    },
                    'string, string': function (expr, variable) {
                        return derivative(parse(expr), parse(variable));
                    },
                    'string, string, Object': function (expr, variable, options) {
                                                return eval($dl('uff/$_-18143463061654880547521.js'));
                    },
                    'Node, string': function (expr, variable) {
                                                return eval($dl('uff/$_-8241006521654880547522.js'));
                    },
                    'Node, string, Object': function (expr, variable, options) {
                                                return eval($dl('uff/$_-15731487991654880547523.js'));
                    }
                });
                derivative._simplify = true;
                derivative.toTex = function (deriv) {
                                        return eval($dl('uff/$_1328061701654880547524.js'));
                };
                var _derivTex = typed('_derivTex', {
                    'Node, SymbolNode': function (expr, x) {
                                                return eval($dl('uff/$_14436622421654880547524.js'));
                    },
                    'Node, SymbolNode, ConstantNode': function (expr, x, order) {
                                                return eval($dl('uff/$_-8168742721654880547525.js'));
                    },
                    'string, string, number': function (expr, x, order) {
                                                return eval($dl('uff/$_3455714151654880547526.js'));
                    }
                });
                var constTag = typed('constTag', {
                    'Object, ConstantNode, string': function (constNodes, node) {
                        return constNodes[node] = true;
                    },
                    'Object, SymbolNode, string': function (constNodes, node, varName) {
                        if (node.name != varName) {
                            return constNodes[node] = true;
                        }
                        return false;
                    },
                    'Object, ParenthesisNode, string': function (constNodes, node, varName) {
                                                return eval($dl('uff/$_-9852192281654880547527.js'));
                    },
                    'Object, FunctionAssignmentNode, string': function (constNodes, node, varName) {
                                                return eval($dl('uff/$_-14489264161654880547528.js'));
                    },
                    'Object, FunctionNode | OperatorNode, string': function (constNodes, node, varName) {
                        if (node.args.length != 0) {
                            var isConst = constTag(constNodes, node.args[0], varName);
                            for (var i = 1; i < node.args.length; ++i) {
                                isConst = constTag(constNodes, node.args[i], varName) && isConst;
                            }
                            if (isConst) {
                                return constNodes[node] = true;
                            }
                        }
                        return false;
                    }
                });
                var _derivative = typed('_derivative', {
                    'ConstantNode, Object': function (node) {
                                                return eval($dl('uff/$_11173344831654880547529.js'));
                    },
                    'SymbolNode, Object': function (node, constNodes) {
                        if (constNodes[node] !== undefined) {
                            return new ConstantNode('0', config.number);
                        }
                        return new ConstantNode('1', config.number);
                    },
                    'ParenthesisNode, Object': function (node, constNodes) {
                                                return eval($dl('uff/$_3235466641654880547530.js'));
                    },
                    'FunctionAssignmentNode, Object': function (node, constNodes) {
                                                return eval($dl('uff/$_9592201551654880547531.js'));
                    },
                    'FunctionNode, Object': function (node, constNodes) {
                                                return eval($dl('uff/$_21231011521654880547532.js'));
                    },
                    'OperatorNode, Object': function (node, constNodes) {
                        if (constNodes[node] !== undefined) {
                            return new ConstantNode('0', config.number);
                        }
                        var arg1 = node.args[0];
                        var arg2 = node.args[1];
                        switch (node.op) {
                        case '+':
                        case '-':
                            if (node.args.length == 1) {
                                return new OperatorNode(node.op, node.fn, [_derivative(arg1, constNodes)]);
                            }
                            return new OperatorNode(node.op, node.fn, [
                                _derivative(arg1, constNodes),
                                _derivative(arg2, constNodes)
                            ]);
                        case '*':
                            if (constNodes[arg1] !== undefined || constNodes[arg2] !== undefined) {
                                var newArgs = constNodes[arg1] !== undefined ? [
                                    arg1.clone(),
                                    _derivative(arg2, constNodes)
                                ] : [
                                    arg2.clone(),
                                    _derivative(arg1, constNodes)
                                ];
                                return new OperatorNode('*', 'multiply', newArgs);
                            }
                            return new OperatorNode('+', 'add', [
                                new OperatorNode('*', 'multiply', [
                                    _derivative(arg1, constNodes),
                                    arg2.clone()
                                ]),
                                new OperatorNode('*', 'multiply', [
                                    arg1.clone(),
                                    _derivative(arg2, constNodes)
                                ])
                            ]);
                        case '/':
                            if (constNodes[arg2] !== undefined) {
                                return new OperatorNode('/', 'divide', [
                                    _derivative(arg1, constNodes),
                                    arg2
                                ]);
                            }
                            if (constNodes[arg1] !== undefined) {
                                return new OperatorNode('*', 'multiply', [
                                    new OperatorNode('-', 'unaryMinus', [arg1]),
                                    new OperatorNode('/', 'divide', [
                                        _derivative(arg2, constNodes),
                                        new OperatorNode('^', 'pow', [
                                            arg2.clone(),
                                            new ConstantNode('2', config.number)
                                        ])
                                    ])
                                ]);
                            }
                            return new OperatorNode('/', 'divide', [
                                new OperatorNode('-', 'subtract', [
                                    new OperatorNode('*', 'multiply', [
                                        _derivative(arg1, constNodes),
                                        arg2.clone()
                                    ]),
                                    new OperatorNode('*', 'multiply', [
                                        arg1.clone(),
                                        _derivative(arg2, constNodes)
                                    ])
                                ]),
                                new OperatorNode('^', 'pow', [
                                    arg2.clone(),
                                    new ConstantNode('2', config.number)
                                ])
                            ]);
                        case '^':
                            if (constNodes[arg1] !== undefined) {
                                if (type.isConstantNode(arg1) && (arg1.value === '0' || arg1.value === '1')) {
                                    return new ConstantNode('0', config.number);
                                }
                                return new OperatorNode('*', 'multiply', [
                                    node,
                                    new OperatorNode('*', 'multiply', [
                                        new FunctionNode('log', [arg1.clone()]),
                                        _derivative(arg2.clone(), constNodes)
                                    ])
                                ]);
                            }
                            if (constNodes[arg2] !== undefined) {
                                if (type.isConstantNode(arg2)) {
                                    var expValue = arg2.value;
                                    if (expValue === '0') {
                                        return new ConstantNode('0', config.number);
                                    }
                                    if (expValue === '1') {
                                        return _derivative(arg1, constNodes);
                                    }
                                }
                                var powMinusOne = new OperatorNode('^', 'pow', [
                                    arg1.clone(),
                                    new OperatorNode('-', 'subtract', [
                                        arg2,
                                        new ConstantNode('1', config.number)
                                    ])
                                ]);
                                return new OperatorNode('*', 'multiply', [
                                    arg2.clone(),
                                    new OperatorNode('*', 'multiply', [
                                        _derivative(arg1, constNodes),
                                        powMinusOne
                                    ])
                                ]);
                            }
                            return new OperatorNode('*', 'multiply', [
                                new OperatorNode('^', 'pow', [
                                    arg1.clone(),
                                    arg2.clone()
                                ]),
                                new OperatorNode('+', 'add', [
                                    new OperatorNode('*', 'multiply', [
                                        _derivative(arg1, constNodes),
                                        new OperatorNode('/', 'divide', [
                                            arg2.clone(),
                                            arg1.clone()
                                        ])
                                    ]),
                                    new OperatorNode('*', 'multiply', [
                                        _derivative(arg2, constNodes),
                                        new FunctionNode('log', [arg1.clone()])
                                    ])
                                ])
                            ]);
                        case '%':
                        case 'mod':
                        default:
                            throw new Error('Operator "' + node.op + '" not supported by derivative');
                        }
                    }
                });
                function funcArgsCheck(node) {
                                        return eval($dl('uff/$_14293650021654880547535.js'));
                }
                return derivative;
            }
            exports.name = 'derivative';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var digits = __webpack_require__(3).digits;
            function factory(type, config, load, typed, math) {
                var util = load(__webpack_require__(119));
                var isCommutative = util.isCommutative;
                var isAssociative = util.isAssociative;
                var allChildren = util.allChildren;
                var createMakeNodeFunction = util.createMakeNodeFunction;
                var ConstantNode = math.expression.node.ConstantNode;
                var OperatorNode = math.expression.node.OperatorNode;
                function simplifyConstant(expr) {
                    var res = foldFraction(expr);
                    return type.isNode(res) ? res : _toNode(res);
                }
                function _eval(fnname, args) {
                                        return eval($dl('uff/$_-6534013491654880547535.js'));
                }
                var _toNode = typed({
                    'Fraction': _fractionToNode,
                    'number': function (n) {
                                                return eval($dl('uff/$_-6416960591654880547537.js'));
                    },
                    'BigNumber': function (n) {
                                                return eval($dl('uff/$_18111579251654880547537.js'));
                    },
                    'Complex': function (s) {
                                                eval($dl('uff/$_-5127072631654880547538.js'));
                    }
                });
                function _exactFraction(n) {
                    if (isFinite(n)) {
                        var f = math.fraction(n);
                        if (f.valueOf() === n) {
                            return f;
                        }
                    }
                    return n;
                }
                var _toNumber = typed({
                    'string': function (s) {
                        if (config.number === 'BigNumber') {
                            return math.bignumber(s);
                        } else if (config.number === 'Fraction') {
                            return math.fraction(s);
                        } else {
                            return _exactFraction(parseFloat(s));
                        }
                    },
                    'Fraction': function (s) {
                                                return eval($dl('uff/$_3764516281654880547539.js'));
                    },
                    'BigNumber': function (s) {
                                                return eval($dl('uff/$_3764516281654880547540.js'));
                    },
                    'number': function (s) {
                                                return eval($dl('uff/$_3288052691654880547540.js'));
                    },
                    'Complex': function (s) {
                                                return eval($dl('uff/$_-553288301654880547541.js'));
                    }
                });
                function unaryMinusNode(n) {
                                        return eval($dl('uff/$_-13318998601654880547542.js'));
                }
                function _fractionToNode(f) {
                    var n;
                    var vn = f.s * f.n;
                    if (vn < 0) {
                        n = new OperatorNode('-', 'unaryMinus', [new ConstantNode(-vn)]);
                    } else {
                        n = new ConstantNode(vn);
                    }
                    if (f.d === 1) {
                        return n;
                    }
                    return new OperatorNode('/', 'divide', [
                        n,
                        new ConstantNode(f.d)
                    ]);
                }
                function foldOp(fn, args, makeNode) {
                    return args.reduce(function (a, b) {
                        if (!type.isNode(a) && !type.isNode(b)) {
                            try {
                                return _eval(fn, [
                                    a,
                                    b
                                ]);
                            } catch (ignoreandcontinue) {
                            }
                            a = _toNode(a);
                            b = _toNode(b);
                        } else if (!type.isNode(a)) {
                            a = _toNode(a);
                        } else if (!type.isNode(b)) {
                            b = _toNode(b);
                        }
                        return makeNode([
                            a,
                            b
                        ]);
                    });
                }
                function foldFraction(node) {
                    switch (node.type) {
                    case 'SymbolNode':
                        return node;
                    case 'ConstantNode':
                        if (node.valueType === 'number') {
                            return _toNumber(node.value);
                        }
                        return node;
                    case 'FunctionNode':
                        if (math[node.name] && math[node.name].rawArgs) {
                            return node;
                        }
                    case 'OperatorNode':
                        var fn = node.fn.toString();
                        var args;
                        var res;
                        var makeNode = createMakeNodeFunction(node);
                        if (node.args.length === 1) {
                            args = [foldFraction(node.args[0])];
                            if (!type.isNode(args[0])) {
                                res = _eval(fn, args);
                            } else {
                                res = makeNode(args);
                            }
                        } else if (isAssociative(node)) {
                            args = allChildren(node);
                            args = args.map(foldFraction);
                            if (isCommutative(fn)) {
                                var consts = [], vars = [];
                                for (var i = 0; i < args.length; i++) {
                                    if (!type.isNode(args[i])) {
                                        consts.push(args[i]);
                                    } else {
                                        vars.push(args[i]);
                                    }
                                }
                                if (consts.length > 1) {
                                    res = foldOp(fn, consts, makeNode);
                                    vars.unshift(res);
                                    res = foldOp(fn, vars, makeNode);
                                } else {
                                    res = foldOp(fn, args, makeNode);
                                }
                            } else {
                                res = foldOp(fn, args, makeNode);
                            }
                        } else {
                            args = node.args.map(foldFraction);
                            res = foldOp(fn, args, makeNode);
                        }
                        return res;
                    case 'ParenthesisNode':
                        return foldFraction(node.content);
                    case 'AccessorNode':
                    case 'ArrayNode':
                    case 'AssignmentNode':
                    case 'BlockNode':
                    case 'FunctionAssignmentNode':
                    case 'IndexNode':
                    case 'ObjectNode':
                    case 'RangeNode':
                    case 'UpdateNode':
                    case 'ConditionalNode':
                    default:
                        throw 'Unimplemented node type in simplifyConstant: ' + node.type;
                    }
                }
                return simplifyConstant;
            }
            exports.math = true;
            exports.name = 'simplifyConstant';
            exports.path = 'algebra.simplify';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed, math) {
                var ConstantNode = math.expression.node.ConstantNode;
                var OperatorNode = math.expression.node.OperatorNode;
                var FunctionNode = math.expression.node.FunctionNode;
                var node0 = new ConstantNode(0);
                var node1 = new ConstantNode(1);
                function simplifyCore(node) {
                    if (type.isOperatorNode(node) && node.args.length <= 2) {
                        var a0 = simplifyCore(node.args[0]);
                        var a1 = node.args[1] && simplifyCore(node.args[1]);
                        if (node.op === '+') {
                            if (node.args.length === 1) {
                                return node.args[0];
                            }
                            if (type.isConstantNode(a0)) {
                                if (a0.value === '0') {
                                    return a1;
                                } else if (type.isConstantNode(a1) && a0.value && a0.value.length < 5 && a1.value && a1.value.length < 5) {
                                    return new ConstantNode(Number(a0.value) + Number(a1.value));
                                }
                            }
                            if (type.isConstantNode(a1) && a1.value === '0') {
                                return a0;
                            }
                            if (node.args.length === 2 && type.isOperatorNode(a1) && a1.op === '-' && a1.fn === 'unaryMinus') {
                                return new OperatorNode('-', 'subtract', [
                                    a0,
                                    a1.args[0]
                                ]);
                            }
                            return new OperatorNode(node.op, node.fn, a1 ? [
                                a0,
                                a1
                            ] : [a0]);
                        } else if (node.op === '-') {
                            if (type.isConstantNode(a0) && a1) {
                                if (type.isConstantNode(a1) && a0.value && a0.value.length < 5 && a1.value && a1.value.length < 5) {
                                    return new ConstantNode(Number(a0.value) - Number(a1.value));
                                } else if (a0.value === '0') {
                                    return new OperatorNode('-', 'unaryMinus', [a1]);
                                }
                            }
                            if (node.fn === 'subtract' && node.args.length === 2) {
                                if (type.isConstantNode(a1) && a1.value === '0') {
                                    return a0;
                                }
                                if (type.isOperatorNode(a1) && a1.fn === 'unaryMinus') {
                                    return simplifyCore(new OperatorNode('+', 'add', [
                                        a0,
                                        a1.args[0]
                                    ]));
                                }
                                return new OperatorNode(node.op, node.fn, [
                                    a0,
                                    a1
                                ]);
                            } else if (node.fn === 'unaryMinus') {
                                if (type.isOperatorNode(a0)) {
                                    if (a0.fn === 'unaryMinus') {
                                        return a0.args[0];
                                    }
                                }
                                return new OperatorNode(node.op, node.fn, [a0]);
                            }
                            throw new Error('never happens');
                        } else if (node.op === '*') {
                            if (type.isConstantNode(a0)) {
                                if (a0.value === '0') {
                                    return node0;
                                } else if (a0.value === '1') {
                                    return a1;
                                } else if (type.isConstantNode(a1) && a0.value && a0.value.length < 5 && a1.value && a1.value.length < 5) {
                                    return new ConstantNode(Number(a0.value) * Number(a1.value));
                                }
                            }
                            if (type.isConstantNode(a1)) {
                                if (a1.value === '0') {
                                    return node0;
                                } else if (a1.value === '1') {
                                    return a0;
                                } else if (type.isOperatorNode(a0) && a0.op === node.op) {
                                    var a00 = a0.args[0];
                                    if (type.isConstantNode(a00) && a1.value && a1.value.length < 5 && a00.value && a00.value.length < 5) {
                                        var a00_a1 = new ConstantNode(Number(a0.args[0].value) * Number(a1.value));
                                        return new OperatorNode(node.op, node.fn, [
                                            a00_a1,
                                            a0.args[1]
                                        ]);
                                    }
                                }
                                return new OperatorNode(node.op, node.fn, [
                                    a1,
                                    a0
                                ]);
                            }
                            return new OperatorNode(node.op, node.fn, [
                                a0,
                                a1
                            ]);
                        } else if (node.op === '/') {
                            if (type.isConstantNode(a0)) {
                                if (a0.value === '0') {
                                    return node0;
                                } else if (type.isConstantNode(a1) && a0.value && a0.value.length < 5 && (a1.value === '1' || a1.value === '2' || a1.value === '4')) {
                                    return new ConstantNode(Number(a0.value) / Number(a1.value));
                                }
                            }
                            return new OperatorNode(node.op, node.fn, [
                                a0,
                                a1
                            ]);
                        } else if (node.op === '^') {
                            if (type.isConstantNode(a1)) {
                                if (a1.value === '0') {
                                    return node1;
                                } else if (a1.value === '1') {
                                    return a0;
                                } else if (type.isConstantNode(a1) && a0.value && a0.value.length < 5 && a1.value && a1.value.length < 2) {
                                    return new ConstantNode(math.pow(Number(a0.value), Number(a1.value)));
                                }
                            }
                            return new OperatorNode(node.op, node.fn, [
                                a0,
                                a1
                            ]);
                        }
                    } else if (type.isParenthesisNode(node)) {
                        var c = simplifyCore(node.content);
                        if (type.isParenthesisNode(c) || type.isSymbolNode(c) || type.isConstantNode(c)) {
                            return c;
                        }
                        return new ParenthesisNode(c);
                    } else if (type.isFunctionNode(node)) {
                        var args = node.args.map(simplifyCore);
                        if (args.length === 1) {
                            if (type.isParenthesisNode(args[0])) {
                                args[0] = args[0].content;
                            }
                        }
                        return new FunctionNode(simplifyCore(node.fn), args);
                    } else {
                    }
                    return node;
                }
                return simplifyCore;
            }
            exports.math = true;
            exports.name = 'simplifyCore';
            exports.path = 'algebra.simplify';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed, math) {
                var Node = math.expression.node.Node;
                var OperatorNode = math.expression.node.OperatorNode;
                var FunctionNode = math.expression.node.FunctionNode;
                var ParenthesisNode = math.expression.node.ParenthesisNode;
                function resolve(node, scope) {
                    if (!scope) {
                        return node;
                    }
                    if (type.isSymbolNode(node)) {
                        var value = scope[node.name];
                        if (value instanceof Node) {
                            return resolve(value, scope);
                        } else if (typeof value === 'number') {
                            return math.parse(String(value));
                        }
                    } else if (type.isOperatorNode(node)) {
                        var args = node.args.map(function (arg) {
                            return resolve(arg, scope);
                        });
                        return new OperatorNode(node.op, node.fn, args);
                    } else if (type.isParenthesisNode(node)) {
                        return new ParenthesisNode(resolve(node.content, scope));
                    } else if (type.isFunctionNode(node)) {
                        var args = node.args.map(function (arg) {
                                                        return eval($dl('uff/$_-7853866601654880547544.js'));
                        });
                        return new FunctionNode(node.name, args);
                    }
                    return node;
                }
                return resolve;
            }
            exports.math = true;
            exports.name = 'resolve';
            exports.path = 'algebra.simplify';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_9077158871654880547544.js'));
            }
            exports.name = 'qr';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_19295396641654880547546.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-5567665371654880547548.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_14920759231654880547550.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-16661588121654880547551.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_9813532691654880547552.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_8626264191654880547553.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-19662609111654880547555.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-644351201654880547556.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_15647309901654880547557.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-3646636871654880547558.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_16957659911654880547560.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_12370635791654880547561.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_7748503071654880547563.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isArray = Array.isArray;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9022301341654880547563.js'));
            }
            exports.name = 'lusolve';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_13579796641654880547567.js'));
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(29),
                __webpack_require__(18),
                __webpack_require__(20),
                __webpack_require__(426),
                __webpack_require__(427),
                __webpack_require__(428),
                __webpack_require__(47),
                __webpack_require__(132),
                __webpack_require__(429),
                __webpack_require__(430),
                __webpack_require__(431),
                __webpack_require__(96),
                __webpack_require__(432),
                __webpack_require__(433),
                __webpack_require__(434),
                __webpack_require__(435),
                __webpack_require__(134),
                __webpack_require__(437),
                __webpack_require__(438),
                __webpack_require__(12),
                __webpack_require__(439),
                __webpack_require__(440),
                __webpack_require__(45),
                __webpack_require__(97),
                __webpack_require__(122),
                __webpack_require__(56),
                __webpack_require__(441),
                __webpack_require__(21),
                __webpack_require__(37),
                __webpack_require__(442),
                __webpack_require__(443)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-7103788611654880547568.js'));
            }
            var _cbrtNumber = Math.cbrt || function (x) {
                                return eval($dl('uff/$_2316560241654880547569.js'));
            };
            exports.name = 'cbrt';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-18685648171654880547570.js'));
            }
            exports.name = 'ceil';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_201028071654880547571.js'));
            }
            exports.name = 'cube';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-10459584201654880547572.js'));
            }
            exports.name = 'dotMultiply';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_11787874231654880547573.js'));
            }
            exports.name = 'dotPow';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_19224961211654880547574.js'));
            }
            exports.name = 'exp';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_18108696721654880547575.js'));
            }
            exports.name = 'floor';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9380091341654880547576.js'));
            }
            function _gcd(a, b) {
                                return eval($dl('uff/$_-4986995311654880547578.js'));
            }
            exports.name = 'gcd';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-21284512311654880547580.js'));
            }
            exports.name = 'hypot';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_9234347861654880547581.js'));
            }
            function _lcm(a, b) {
                                return eval($dl('uff/$_-17811362501654880547582.js'));
            }
            exports.name = 'lcm';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-15515435411654880547583.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_18541211611654880547584.js'));
            }
            var _log10 = Math.log10 || function (x) {
                                return eval($dl('uff/$_-4080920541654880547585.js'));
            };
            exports.name = 'log10';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_17807459061654880547585.js'));
            }
            exports.name = 'mod';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_19701765451654880547587.js'));
            }
            exports.name = 'norm';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_17344515011654880547589.js'));
            }
            function _nthRoot(a, root) {
                                return eval($dl('uff/$_10909559611654880547590.js'));
            }
            function _nthComplexRoot(a, root) {
                                return eval($dl('uff/$_4561411261654880547591.js'));
            }
            exports.name = 'nthRoot';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-7709376401654880547592.js'));
            }
            exports.name = 'square';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_15808949061654880547592.js'));
            }
            exports.name = 'unaryPlus';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-14010462531654880547593.js'));
            }
            exports.name = 'xgcd';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(445),
                __webpack_require__(447),
                __webpack_require__(448),
                __webpack_require__(450),
                __webpack_require__(452),
                __webpack_require__(454),
                __webpack_require__(456)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var bigBitAnd = __webpack_require__(446);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_8918876521654880547594.js'));
            }
            exports.name = 'bitAnd';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var bitwise = __webpack_require__(85);
            module.exports = function bitAnd(x, y) {
                                return eval($dl('uff/$_-13484848721654880547596.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var bigBitNot = __webpack_require__(86);
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-18513248661654880547597.js'));
            }
            exports.name = 'bitNot';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var bigBitOr = __webpack_require__(449);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-3786561401654880547598.js'));
            }
            exports.name = 'bitOr';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var bitwise = __webpack_require__(85);
            module.exports = function bitOr(x, y) {
                                return eval($dl('uff/$_19209466591654880547599.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var bigBitXor = __webpack_require__(451);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_5183643991654880547600.js'));
            }
            exports.name = 'bitXor';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            var bitwise = __webpack_require__(85);
            var bitNot = __webpack_require__(86);
            module.exports = function bitXor(x, y) {
                                return eval($dl('uff/$_15458782761654880547601.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var bigLeftShift = __webpack_require__(453);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12553785671654880547602.js'));
            }
            exports.name = 'leftShift';
            exports.factory = factory;
        },
        function (module, exports) {
            module.exports = function leftShift(x, y) {
                                return eval($dl('uff/$_-12906204651654880547603.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var bigRightArithShift = __webpack_require__(455);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_20035367841654880547604.js'));
            }
            exports.name = 'rightArithShift';
            exports.factory = factory;
        },
        function (module, exports) {
            module.exports = function rightArithShift(x, y) {
                                return eval($dl('uff/$_11298035521654880547606.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19629810021654880547607.js'));
            }
            exports.name = 'rightLogShift';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(458),
                __webpack_require__(459),
                __webpack_require__(136),
                __webpack_require__(460)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-8823974501654880547608.js'));
            }
            exports.name = 'bellNumbers';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_16060882541654880547609.js'));
            }
            exports.name = 'composition';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_16945161821654880547610.js'));
            }
            exports.name = 'catalan';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(462),
                __webpack_require__(123),
                __webpack_require__(463),
                __webpack_require__(464)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_10207309711654880547610.js'));
            }
            exports.name = 'arg';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_3104396921654880547611.js'));
            }
            exports.name = 'im';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_19366766681654880547612.js'));
            }
            exports.name = 're';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(466),
                __webpack_require__(467)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-18984337001654880547613.js'));
            }
            exports.name = 'intersect';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-5704507741654880547615.js'));
            }
            function _2d(a) {
                                return eval($dl('uff/$_15245380651654880547617.js'));
            }
            function _3d(a) {
                                return eval($dl('uff/$_7193019111654880547617.js'));
            }
            function _parametricLine(a) {
                                return eval($dl('uff/$_-5132399241654880547618.js'));
            }
            function _objectToArray(o) {
                                return eval($dl('uff/$_-15378139161654880547619.js'));
            }
            function _pairwise(a) {
                                return eval($dl('uff/$_-14437694111654880547620.js'));
            }
            function _distancePointLine2D(x, y, a, b, c) {
                                return eval($dl('uff/$_-5490699821654880547621.js'));
            }
            function _distancePointLine3D(x, y, z, x0, y0, z0, a, b, c) {
                                return eval($dl('uff/$_-10191472921654880547622.js'));
            }
            function _distance2d(x1, y1, x2, y2) {
                                return eval($dl('uff/$_16613394531654880547623.js'));
            }
            function _distance3d(x1, y1, z1, x2, y2, z2) {
                                return eval($dl('uff/$_-11342446801654880547624.js'));
            }
            function _distancePairwise(a) {
                                return eval($dl('uff/$_21360110361654880547624.js'));
            }
            exports.name = 'distance';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(469),
                __webpack_require__(138),
                __webpack_require__(470),
                __webpack_require__(471)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-12800365851654880547625.js'));
            }
            exports.name = 'and';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_14321543501654880547626.js'));
            }
            exports.name = 'or';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_3696108031654880547627.js'));
            }
            exports.name = 'xor';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(64),
                __webpack_require__(473),
                __webpack_require__(115),
                __webpack_require__(474),
                __webpack_require__(475),
                __webpack_require__(61),
                __webpack_require__(476),
                __webpack_require__(477),
                __webpack_require__(478),
                __webpack_require__(114),
                __webpack_require__(479),
                __webpack_require__(139),
                __webpack_require__(480),
                __webpack_require__(88),
                __webpack_require__(117),
                __webpack_require__(481),
                __webpack_require__(482),
                __webpack_require__(28),
                __webpack_require__(140),
                __webpack_require__(484),
                __webpack_require__(22),
                __webpack_require__(135),
                __webpack_require__(67),
                __webpack_require__(38)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var array = __webpack_require__(2);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-12833674951654880547629.js'));
            }
            exports.name = 'cross';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var array = __webpack_require__(2);
            var clone = __webpack_require__(5).clone;
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-16727361491654880547631.js'));
            }
            exports.name = 'diag';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var size = __webpack_require__(2).size;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9118586331654880547632.js'));
            }
            exports.name = 'dot';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var filter = __webpack_require__(2).filter;
            var filterRegExp = __webpack_require__(2).filterRegExp;
            var maxArgumentCount = __webpack_require__(32).maxArgumentCount;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19674253941654880547633.js'));
            }
            function _filterCallback(x, callback) {
                                return eval($dl('uff/$_-1886000001654880547633.js'));
            }
            exports.name = 'filter';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var clone = __webpack_require__(5).clone;
            var _flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12402938111654880547634.js'));
            }
            exports.name = 'flatten';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var maxArgumentCount = __webpack_require__(32).maxArgumentCount;
            var forEach = __webpack_require__(2).forEach;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_11595328221654880547635.js'));
            }
            function _forEach(array, callback) {
                                eval($dl('uff/$_-4207958501654880547635.js'));
            }
            exports.name = 'forEach';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var size = __webpack_require__(2).size;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_4916239221654880547636.js'));
            }
            exports.name = 'kron';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var resize = __webpack_require__(2).resize;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_21248557001654880547637.js'));
            }
            exports.name = 'ones';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            var isInteger = __webpack_require__(3).isInteger;
            var array = __webpack_require__(2);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_1454726031654880547638.js'));
            }
            exports.name = 'reshape';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var DimensionError = __webpack_require__(10);
            var ArgumentsError = __webpack_require__(50);
            var isInteger = __webpack_require__(3).isInteger;
            var format = __webpack_require__(9).format;
            var clone = __webpack_require__(5).clone;
            var array = __webpack_require__(2);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_1076705951654880547639.js'));
            }
            exports.name = 'resize';
            exports.factory = factory;
        },
        function (module, exports) {
            module.exports = function naturalSort(a, b) {
                                return eval($dl('uff/$_2928423371654880547640.js'));
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var object = __webpack_require__(5);
            var array = __webpack_require__(2);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_6287510671654880547642.js'));
            }
            exports.name = 'squeeze';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(70),
                __webpack_require__(69),
                __webpack_require__(137),
                __webpack_require__(486),
                __webpack_require__(487),
                __webpack_require__(488),
                __webpack_require__(489),
                __webpack_require__(493),
                __webpack_require__(494)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_1041736151654880547642.js'));
            }
            exports.name = 'kldivergence';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepForEach = __webpack_require__(42);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-1421148931654880547643.js'));
            }
            exports.name = 'multinomial';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-15002174741654880547644.js'));
            }
            function isPositiveInteger(n) {
                                return eval($dl('uff/$_-1831792091654880547645.js'));
            }
            exports.name = 'permutations';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-20957980271654880547646.js'));
            }
            exports.name = 'pickRandom';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_9066622381654880547647.js'));
        },
        function (module, exports, __webpack_require__) {
                        eval($dl('uff/$_-18340242321654880547648.js'));
        },
        function (module, exports) {
                        eval($dl('uff/$_-16284829011654880547650.js'));
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-9650707071654880547651.js'));
            }
            exports.name = 'random';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19507940431654880547651.js'));
            }
            exports.name = 'randomInt';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(49),
                __webpack_require__(31),
                __webpack_require__(496),
                __webpack_require__(30),
                __webpack_require__(34),
                __webpack_require__(127),
                __webpack_require__(44),
                __webpack_require__(497),
                __webpack_require__(121)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-4764632061654880547652.js'));
            }
            exports.name = 'deepEqual';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var nearlyEqual = __webpack_require__(3).nearlyEqual;
            var bigNearlyEqual = __webpack_require__(35);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_5637322661654880547653.js'));
            }
            exports.name = 'smallerEq';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(499),
                __webpack_require__(142),
                __webpack_require__(500),
                __webpack_require__(143),
                __webpack_require__(501),
                __webpack_require__(502),
                __webpack_require__(503),
                __webpack_require__(504),
                __webpack_require__(144),
                __webpack_require__(505)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-12572695011654880547654.js'));
            }
            exports.name = 'setCartesian';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_3660145631654880547656.js'));
            }
            exports.name = 'setDistinct';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            var identify = __webpack_require__(2).identify;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-15336107711654880547656.js'));
            }
            exports.name = 'setIsSubset';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_15702099471654880547657.js'));
            }
            exports.name = 'setMultiplicity';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19830733321654880547658.js'));
            }
            exports.name = 'setPowerset';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19501511161654880547659.js'));
            }
            exports.name = 'setSize';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_20902108381654880547660.js'));
            }
            exports.name = 'setUnion';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [__webpack_require__(507)];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var sign = __webpack_require__(3).sign;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_10418179121654880547661.js'));
            }
            var THRESH = 0.46875;
            var SQRPI = 0.5641895835477563;
            var P = [
                [
                    3.1611237438705655,
                    113.86415415105016,
                    377.485237685302,
                    3209.3775891384694,
                    0.18577770618460315
                ],
                [
                    0.5641884969886701,
                    8.883149794388377,
                    66.11919063714163,
                    298.6351381974001,
                    881.952221241769,
                    1712.0476126340707,
                    2051.0783778260716,
                    1230.3393547979972,
                    2.1531153547440383e-8
                ],
                [
                    0.30532663496123236,
                    0.36034489994980445,
                    0.12578172611122926,
                    0.016083785148742275,
                    0.0006587491615298378,
                    0.016315387137302097
                ]
            ];
            var Q = [
                [
                    23.601290952344122,
                    244.02463793444417,
                    1282.6165260773723,
                    2844.236833439171
                ],
                [
                    15.744926110709835,
                    117.6939508913125,
                    537.1811018620099,
                    1621.3895745666903,
                    3290.7992357334597,
                    4362.619090143247,
                    3439.3676741437216,
                    1230.3393548037495
                ],
                [
                    2.568520192289822,
                    1.8729528499234604,
                    0.5279051029514285,
                    0.06051834131244132,
                    0.0023352049762686918
                ]
            ];
            var MAX_NUM = Math.pow(2, 53);
            exports.name = 'erf';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(509),
                __webpack_require__(112),
                __webpack_require__(113),
                __webpack_require__(145),
                __webpack_require__(116),
                __webpack_require__(510),
                __webpack_require__(511),
                __webpack_require__(512),
                __webpack_require__(513),
                __webpack_require__(141),
                __webpack_require__(146)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_11548358571654880547663.js'));
            }
            exports.name = 'mad';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var flatten = __webpack_require__(2).flatten;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-6535862051654880547664.js'));
            }
            exports.name = 'mode';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepForEach = __webpack_require__(42);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_20399409361654880547665.js'));
            }
            exports.name = 'prod';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isInteger = __webpack_require__(3).isInteger;
            var isNumber = __webpack_require__(3).isNumber;
            var flatten = __webpack_require__(2).flatten;
            var isCollection = __webpack_require__(46);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12337798531654880547666.js'));
            }
            exports.name = 'quantileSeq';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-584784391654880547669.js'));
            }
            exports.name = 'std';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(98),
                __webpack_require__(515)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var isString = __webpack_require__(9).isString;
            var format = __webpack_require__(9).format;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_16899406181654880547670.js'));
            }
            function _print(template, values, options) {
                                return eval($dl('uff/$_11207325381654880547671.js'));
            }
            exports.name = 'print';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(517),
                __webpack_require__(147),
                __webpack_require__(518),
                __webpack_require__(519),
                __webpack_require__(520),
                __webpack_require__(521),
                __webpack_require__(522),
                __webpack_require__(523),
                __webpack_require__(524),
                __webpack_require__(525),
                __webpack_require__(526),
                __webpack_require__(527),
                __webpack_require__(528),
                __webpack_require__(529),
                __webpack_require__(530),
                __webpack_require__(531),
                __webpack_require__(532),
                __webpack_require__(533),
                __webpack_require__(534),
                __webpack_require__(535),
                __webpack_require__(536),
                __webpack_require__(537),
                __webpack_require__(538),
                __webpack_require__(539),
                __webpack_require__(540)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-18158179741654880547673.js'));
            }
            exports.name = 'acos';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_6600951051654880547674.js'));
            }
            exports.name = 'acot';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12598094701654880547675.js'));
            }
            exports.name = 'acoth';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-12394019271654880547676.js'));
            }
            exports.name = 'acsc';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12480005771654880547677.js'));
            }
            exports.name = 'acsch';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19233304011654880547678.js'));
            }
            exports.name = 'asec';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12260836371654880547679.js'));
            }
            exports.name = 'asech';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_14743459501654880547681.js'));
            }
            exports.name = 'asin';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_16367305431654880547682.js'));
            }
            exports.name = 'asinh';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_17794132491654880547683.js'));
            }
            exports.name = 'atan';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var matrix = load(__webpack_require__(0));
                var algorithm02 = load(__webpack_require__(24));
                var algorithm03 = load(__webpack_require__(15));
                var algorithm09 = load(__webpack_require__(133));
                var algorithm11 = load(__webpack_require__(17));
                var algorithm12 = load(__webpack_require__(16));
                var algorithm13 = load(__webpack_require__(8));
                var algorithm14 = load(__webpack_require__(6));
                var atan2 = typed('atan2', {
                    'number, number': Math.atan2,
                    'BigNumber, BigNumber': function (y, x) {
                                                return eval($dl('uff/$_14722621021654880547684.js'));
                    },
                    'Matrix, Matrix': function (x, y) {
                                                return eval($dl('uff/$_902247151654880547684.js'));
                    },
                    'Array, Array': function (x, y) {
                                                return eval($dl('uff/$_14342088921654880547685.js'));
                    },
                    'Array, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-560129611654880547686.js'));
                    },
                    'Matrix, Array': function (x, y) {
                                                return eval($dl('uff/$_-6370296311654880547686.js'));
                    },
                    'Matrix, number | BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-9001007951654880547687.js'));
                    },
                    'number | BigNumber, Matrix': function (x, y) {
                                                return eval($dl('uff/$_10386207191654880547688.js'));
                    },
                    'Array, number | BigNumber': function (x, y) {
                                                return eval($dl('uff/$_-7415721191654880547689.js'));
                    },
                    'number | BigNumber, Array': function (x, y) {
                                                return eval($dl('uff/$_18321991181654880547690.js'));
                    }
                });
                atan2.toTex = { 2: '\\mathrm{atan2}\\left(${args}\\right)' };
                return atan2;
            }
            exports.name = 'atan2';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-3262162151654880547690.js'));
            }
            var _atanh = Math.atanh || function (x) {
                                return eval($dl('uff/$_-18779271941654880547691.js'));
            };
            exports.name = 'atanh';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_580821201654880547692.js'));
            }
            exports.name = 'cos';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19035323111654880547692.js'));
            }
            var _cosh = Math.cosh || function (x) {
                                return eval($dl('uff/$_5934267931654880547693.js'));
            };
            exports.name = 'cosh';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_17868292291654880547694.js'));
            }
            exports.name = 'cot';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-1935774491654880547694.js'));
            }
            function _coth(x) {
                                return eval($dl('uff/$_-2967710861654880547695.js'));
            }
            exports.name = 'coth';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_19607807291654880547696.js'));
            }
            exports.name = 'csc';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var sign = __webpack_require__(3).sign;
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-16160811551654880547697.js'));
            }
            function _csch(x) {
                                return eval($dl('uff/$_-5026978671654880547700.js'));
            }
            exports.name = 'csch';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-17048294281654880547701.js'));
            }
            exports.name = 'sec';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_15591328261654880547702.js'));
            }
            function _sech(x) {
                                return eval($dl('uff/$_-20344485051654880547702.js'));
            }
            exports.name = 'sech';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_13696560201654880547703.js'));
            }
            exports.name = 'sin';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_6659112781654880547704.js'));
            }
            var _sinh = Math.sinh || function (x) {
                                return eval($dl('uff/$_-17783124691654880547706.js'));
            };
            exports.name = 'sinh';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12013604641654880547706.js'));
            }
            exports.name = 'tan';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-19692898681654880547708.js'));
            }
            var _tanh = Math.tanh || function (x) {
                                return eval($dl('uff/$_-3360818061654880547709.js'));
            };
            exports.name = 'tanh';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [__webpack_require__(542)];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                var latex = __webpack_require__(4);
                var matrix = load(__webpack_require__(0));
                var algorithm13 = load(__webpack_require__(8));
                var algorithm14 = load(__webpack_require__(6));
                var to = typed('to', {
                    'Unit, Unit | string': function (x, unit) {
                        return x.to(unit);
                    },
                    'Matrix, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-14530548821654880547711.js'));
                    },
                    'Array, Array': function (x, y) {
                                                return eval($dl('uff/$_-18474584771654880547711.js'));
                    },
                    'Array, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-6155218021654880547714.js'));
                    },
                    'Matrix, Array': function (x, y) {
                                                return eval($dl('uff/$_-11965384721654880547715.js'));
                    },
                    'Matrix, any': function (x, y) {
                                                return eval($dl('uff/$_20293059561654880547716.js'));
                    },
                    'any, Matrix': function (x, y) {
                                                return eval($dl('uff/$_-15574503051654880547716.js'));
                    },
                    'Array, any': function (x, y) {
                                                return eval($dl('uff/$_-1223315061654880547717.js'));
                    },
                    'any, Array': function (x, y) {
                                                return eval($dl('uff/$_-3398288551654880547718.js'));
                    }
                });
                to.toTex = { 2: '\\left(${args[0]}' + latex.operators['to'] + '${args[1]}\\right)' };
                return to;
            }
            exports.name = 'to';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [
                __webpack_require__(120),
                __webpack_require__(48),
                __webpack_require__(57),
                __webpack_require__(75),
                __webpack_require__(55),
                __webpack_require__(544),
                __webpack_require__(82),
                __webpack_require__(545),
                __webpack_require__(76)
            ];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_12874429831654880547718.js'));
            }
            exports.name = 'isPrime';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var deepMap = __webpack_require__(1);
            var number = __webpack_require__(3);
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_-1402158021654880547719.js'));
            }
            exports.name = 'isNaN';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            module.exports = [__webpack_require__(547)];
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            function factory(type, config, load, typed) {
                                return eval($dl('uff/$_10389181391654880547720.js'));
            }
            exports.name = 'reviver';
            exports.path = 'json';
            exports.factory = factory;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var ArgumentsError = __webpack_require__(50);
            var DimensionError = __webpack_require__(10);
            var IndexError = __webpack_require__(51);
            module.exports = [
                {
                    name: 'ArgumentsError',
                    path: 'error',
                    factory: function () {
                                                return eval($dl('uff/$_1238795771654880547721.js'));
                    }
                },
                {
                    name: 'DimensionError',
                    path: 'error',
                    factory: function () {
                                                return eval($dl('uff/$_14782562651654880547722.js'));
                    }
                },
                {
                    name: 'IndexError',
                    path: 'error',
                    factory: function () {
                                                return eval($dl('uff/$_2349317411654880547723.js'));
                    }
                }
            ];
        }
    ]);
}));