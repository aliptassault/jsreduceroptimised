(function(){{
    if (node.args.length != 1) {
        funcArgsCheck(node);
    }
    if (constNodes[node] !== undefined) {
        return new ConstantNode('0', config.number);
    }
    var arg1 = node.args[0];
    var arg2;
    var div = false;
    // is output a fraction?
    var negative = false;
    // is output negative?
    var funcDerivative;
    switch (node.name) {
    case 'cbrt':
        // d/dx(cbrt(x)) = 1 / (3x^(2/3))
        div = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            new ConstantNode('3', config.number),
            new OperatorNode('^', 'pow', [
                arg1,
                new OperatorNode('/', 'divide', [
                    new ConstantNode('2', config.number),
                    new ConstantNode('3', config.number)
                ])
            ])
        ]);
        break;
    case 'sqrt':
    case 'nthRoot':
        // d/dx(sqrt(x)) = 1 / (2*sqrt(x))
        if (node.args.length == 1) {
            div = true;
            funcDerivative = new OperatorNode('*', 'multiply', [
                new ConstantNode('2', config.number),
                new FunctionNode('sqrt', [arg1])
            ]);
            break;
        }
        // Rearrange from nthRoot(x, a) -> x^(1/a)
        arg2 = new OperatorNode('/', 'divide', [
            new ConstantNode('1', config.number),
            node.args[1]
        ]);
        // Is a variable?
        constNodes[arg2] = constNodes[node.args[1]];
        return _derivative(new OperatorNode('^', 'pow', [
            arg1,
            arg2
        ]), constNodes);
    case 'log10':
        arg2 = new ConstantNode('10', config.number);
    case 'log':
        if (!arg2 && node.args.length == 1) {
            // d/dx(log(x)) = 1 / x
            funcDerivative = arg1.clone();
        } else if (arg2 || constNodes[node.args[1]] !== undefined) {
            // d/dx(log(x, c)) = 1 / (x*ln(c))
            funcDerivative = new OperatorNode('*', 'multiply', [
                arg1.clone(),
                new FunctionNode('log', [arg2 || node.args[1]])
            ]);
        } else {
            // d/dx(log(f(x), g(x))) = d/dx(log(f(x)) / log(g(x)))
            return _derivative(new OperatorNode('/', 'divide', [
                new FunctionNode('log', [arg1]),
                new FunctionNode('log', [node.args[1]])
            ]), constNodes);
        }
        div = true;
        break;
    case 'exp':
        // d/dx(e^x) = e^x
        funcDerivative = new FunctionNode('exp', [arg1.clone()]);
        break;
    case 'sin':
        // d/dx(sin(x)) = cos(x)
        funcDerivative = new FunctionNode('cos', [arg1.clone()]);
        break;
    case 'cos':
        // d/dx(cos(x)) = -sin(x)
        funcDerivative = new OperatorNode('-', 'unaryMinus', [new FunctionNode('sin', [arg1.clone()])]);
        break;
    case 'tan':
        // d/dx(tan(x)) = sec(x)^2
        funcDerivative = new OperatorNode('^', 'pow', [
            new FunctionNode('sec', [arg1.clone()]),
            new ConstantNode('2', config.number)
        ]);
        break;
    case 'sec':
        // d/dx(sec(x)) = sec(x)tan(x)
        funcDerivative = new OperatorNode('*', 'multiply', [
            node,
            new FunctionNode('tan', [arg1.clone()])
        ]);
        break;
    case 'csc':
        // d/dx(csc(x)) = -csc(x)cot(x)
        negative = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            node,
            new FunctionNode('cot', [arg1.clone()])
        ]);
        break;
    case 'cot':
        // d/dx(cot(x)) = -csc(x)^2
        negative = true;
        funcDerivative = new OperatorNode('^', 'pow', [
            new FunctionNode('csc', [arg1.clone()]),
            new ConstantNode('2', config.number)
        ]);
        break;
    case 'asin':
        // d/dx(asin(x)) = 1 / sqrt(1 - x^2)
        div = true;
        funcDerivative = new FunctionNode('sqrt', [new OperatorNode('-', 'subtract', [
                new ConstantNode('1', config.number),
                new OperatorNode('^', 'pow', [
                    arg1.clone(),
                    new ConstantNode('2', config.number)
                ])
            ])]);
        break;
    case 'acos':
        // d/dx(acos(x)) = -1 / sqrt(1 - x^2)
        div = true;
        negative = true;
        funcDerivative = new FunctionNode('sqrt', [new OperatorNode('-', 'subtract', [
                new ConstantNode('1', config.number),
                new OperatorNode('^', 'pow', [
                    arg1.clone(),
                    new ConstantNode('2', config.number)
                ])
            ])]);
        break;
    case 'atan':
        // d/dx(atan(x)) = 1 / (x^2 + 1)
        div = true;
        funcDerivative = new OperatorNode('+', 'add', [
            new OperatorNode('^', 'pow', [
                arg1.clone(),
                new ConstantNode('2', config.number)
            ]),
            new ConstantNode('1', config.number)
        ]);
        break;
    case 'asec':
        // d/dx(asec(x)) = 1 / (|x|*sqrt(x^2 - 1))
        div = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            new FunctionNode('abs', [arg1.clone()]),
            new FunctionNode('sqrt', [new OperatorNode('-', 'subtract', [
                    new OperatorNode('^', 'pow', [
                        arg1.clone(),
                        new ConstantNode('2', config.number)
                    ]),
                    new ConstantNode('1', config.number)
                ])])
        ]);
        break;
    case 'acsc':
        // d/dx(acsc(x)) = -1 / (|x|*sqrt(x^2 - 1))
        div = true;
        negative = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            new FunctionNode('abs', [arg1.clone()]),
            new FunctionNode('sqrt', [new OperatorNode('-', 'subtract', [
                    new OperatorNode('^', 'pow', [
                        arg1.clone(),
                        new ConstantNode('2', config.number)
                    ]),
                    new ConstantNode('1', config.number)
                ])])
        ]);
        break;
    case 'acot':
        // d/dx(acot(x)) = -1 / (x^2 + 1)
        div = true;
        negative = true;
        funcDerivative = new OperatorNode('+', 'add', [
            new OperatorNode('^', 'pow', [
                arg1.clone(),
                new ConstantNode('2', config.number)
            ]),
            new ConstantNode('1', config.number)
        ]);
        break;
    case 'sinh':
        // d/dx(sinh(x)) = cosh(x)
        funcDerivative = new FunctionNode('cosh', [arg1.clone()]);
        break;
    case 'cosh':
        // d/dx(cosh(x)) = sinh(x)
        funcDerivative = new FunctionNode('sinh', [arg1.clone()]);
        break;
    case 'tanh':
        // d/dx(tanh(x)) = sech(x)^2
        funcDerivative = new OperatorNode('^', 'pow', [
            new FunctionNode('sech', [arg1.clone()]),
            new ConstantNode('2', config.number)
        ]);
        break;
    case 'sech':
        // d/dx(sech(x)) = -sech(x)tanh(x)
        negative = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            node,
            new FunctionNode('tanh', [arg1.clone()])
        ]);
        break;
    case 'csch':
        // d/dx(csch(x)) = -csch(x)coth(x)
        negative = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            node,
            new FunctionNode('coth', [arg1.clone()])
        ]);
        break;
    case 'coth':
        // d/dx(coth(x)) = -csch(x)^2
        negative = true;
        funcDerivative = new OperatorNode('^', 'pow', [
            new FunctionNode('csch', [arg1.clone()]),
            new ConstantNode('2', config.number)
        ]);
        break;
    case 'asinh':
        // d/dx(asinh(x)) = 1 / sqrt(x^2 + 1)
        div = true;
        funcDerivative = new FunctionNode('sqrt', [new OperatorNode('+', 'add', [
                new OperatorNode('^', 'pow', [
                    arg1.clone(),
                    new ConstantNode('2', config.number)
                ]),
                new ConstantNode('1', config.number)
            ])]);
        break;
    case 'acosh':
        // d/dx(acosh(x)) = 1 / sqrt(x^2 - 1); XXX potentially only for x >= 1 (the real spectrum)
        div = true;
        funcDerivative = new FunctionNode('sqrt', [new OperatorNode('-', 'subtract', [
                new OperatorNode('^', 'pow', [
                    arg1.clone(),
                    new ConstantNode('2', config.number)
                ]),
                new ConstantNode('1', config.number)
            ])]);
        break;
    case 'atanh':
        // d/dx(atanh(x)) = 1 / (1 - x^2)
        div = true;
        funcDerivative = new OperatorNode('-', 'subtract', [
            new ConstantNode('1', config.number),
            new OperatorNode('^', 'pow', [
                arg1.clone(),
                new ConstantNode('2', config.number)
            ])
        ]);
        break;
    case 'asech':
        // d/dx(asech(x)) = -1 / (x*sqrt(1 - x^2))
        div = true;
        negative = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            arg1.clone(),
            new FunctionNode('sqrt', [new OperatorNode('-', 'subtract', [
                    new ConstantNode('1', config.number),
                    new OperatorNode('^', 'pow', [
                        arg1.clone(),
                        new ConstantNode('2', config.number)
                    ])
                ])])
        ]);
        break;
    case 'acsch':
        // d/dx(acsch(x)) = -1 / (|x|*sqrt(x^2 + 1))
        div = true;
        negative = true;
        funcDerivative = new OperatorNode('*', 'multiply', [
            new FunctionNode('abs', [arg1.clone()]),
            new FunctionNode('sqrt', [new OperatorNode('+', 'add', [
                    new OperatorNode('^', 'pow', [
                        arg1.clone(),
                        new ConstantNode('2', config.number)
                    ]),
                    new ConstantNode('1', config.number)
                ])])
        ]);
        break;
    case 'acoth':
        // d/dx(acoth(x)) = -1 / (1 - x^2)
        div = true;
        negative = true;
        funcDerivative = new OperatorNode('-', 'subtract', [
            new ConstantNode('1', config.number),
            new OperatorNode('^', 'pow', [
                arg1.clone(),
                new ConstantNode('2', config.number)
            ])
        ]);
        break;
    case 'abs':
        // d/dx(abs(x)) = abs(x)/x
        funcDerivative = new OperatorNode('/', 'divide', [
            new FunctionNode(new SymbolNode('abs'), [arg1.clone()]),
            arg1.clone()
        ]);
        break;
    case 'gamma':
    // Needs digamma function, d/dx(gamma(x)) = gamma(x)digamma(x)
    default:
        throw new Error('Function "' + node.name + '" not supported by derivative');
    }
    var op, func;
    if (div) {
        op = '/';
        func = 'divide';
    } else {
        op = '*';
        func = 'multiply';
    }
    /* Apply chain rule to all functions:
         F(x)  = f(g(x))
         F'(x) = g'(x)*f'(g(x)) */
    var chainDerivative = _derivative(arg1, constNodes);
    if (negative) {
        chainDerivative = new OperatorNode('-', 'unaryMinus', [chainDerivative]);
    }
    return new OperatorNode(op, func, [
        chainDerivative,
        funcDerivative
    ]);
}})();