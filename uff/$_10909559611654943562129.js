(function(){{
    var inv = root < 0;
    if (inv) {
        root = -root;
    }
    if (root === 0) {
        throw new Error('Root must be non-zero');
    }
    if (a < 0 && Math.abs(root) % 2 != 1) {
        throw new Error('Root must be odd when a is negative.');
    }
    // edge cases zero and infinity
    if (a == 0) {
        return inv ? Infinity : 0;
    }
    if (!isFinite(a)) {
        return inv ? 0 : a;
    }
    var x = Math.pow(Math.abs(a), 1 / root);
    // If a < 0, we require that root is an odd integer,
    // so (-1) ^ (1/root) = -1
    x = a < 0 ? -x : x;
    return inv ? 1 / x : x;    // Very nice algorithm, but fails with nthRoot(-2, 3).
                               // Newton's method has some well-known problems at times:
                               // https://en.wikipedia.org/wiki/Newton%27s_method#Failure_analysis
                               /*
  var x = 1; // Initial guess
  var xPrev = 1;
  var i = 0;
  var iMax = 10000;
  do {
    var delta = (a / Math.pow(x, root - 1) - x) / root;
    xPrev = x;
    x = x + delta;
    i++;
  }
  while (xPrev !== x && i < iMax);

  if (xPrev !== x) {
    throw new Error('Function nthRoot failed to converge');
  }

  return inv ? 1 / x : x;
  */
}})();