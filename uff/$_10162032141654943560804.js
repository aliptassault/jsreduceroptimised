(function(){{
    // TODO: implement matrix right division using pseudo inverse
    // http://www.mathworks.nl/help/matlab/ref/mrdivide.html
    // http://www.gnu.org/software/octave/doc/interpreter/Arithmetic-Ops.html
    // http://stackoverflow.com/questions/12263932/how-does-gnu-octave-matrix-division-work-getting-unexpected-behaviour
    return multiply(x, inv(y));
}})();