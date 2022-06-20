(function(){{
    var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
    if (isExp) {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0)
            rm = Ctor.rounding;
        else
            checkInt32(rm, 0, 8);
    } else {
        sd = Ctor.precision;
        rm = Ctor.rounding;
    }
    if (!x.isFinite()) {
        str = nonFiniteToString(x);
    } else {
        str = finiteToString(x);
        i = str.indexOf('.');
        // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
        // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
        // minBinaryExponent = floor(decimalExponent * log[2](10))
        // log[2](10) = 3.321928094887362347870319429489390175864
        if (isExp) {
            base = 2;
            if (baseOut == 16) {
                sd = sd * 4 - 3;
            } else if (baseOut == 8) {
                sd = sd * 3 - 2;
            }
        } else {
            base = baseOut;
        }
        // Convert the number as an integer then divide the result by its base raised to a power such
        // that the fraction part will be restored.
        // Non-integer.
        if (i >= 0) {
            str = str.replace('.', '');
            y = new Ctor(1);
            y.e = str.length - i;
            y.d = convertBase(finiteToString(y), 10, base);
            y.e = y.d.length;
        }
        xd = convertBase(str, 10, base);
        e = len = xd.length;
        // Remove trailing zeros.
        for (; xd[--len] == 0;)
            xd.pop();
        if (!xd[0]) {
            str = isExp ? '0p+0' : '0';
        } else {
            if (i < 0) {
                e--;
            } else {
                x = new Ctor(x);
                x.d = xd;
                x.e = e;
                x = divide(x, y, sd, rm, 0, base);
                xd = x.d;
                e = x.e;
                roundUp = inexact;
            }
            // The rounding digit, i.e. the digit after the digit that may be rounded up.
            i = xd[sd];
            k = base / 2;
            roundUp = roundUp || xd[sd + 1] !== void 0;
            roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
            xd.length = sd;
            if (roundUp) {
                // Rounding up may mean the previous digit has to be rounded up and so on.
                for (; ++xd[--sd] > base - 1;) {
                    xd[sd] = 0;
                    if (!sd) {
                        ++e;
                        xd.unshift(1);
                    }
                }
            }
            // Determine trailing zeros.
            for (len = xd.length; !xd[len - 1]; --len);
            // E.g. [4, 11, 15] becomes 4bf.
            for (i = 0, str = ''; i < len; i++)
                str += NUMERALS.charAt(xd[i]);
            // Add binary exponent suffix?
            if (isExp) {
                if (len > 1) {
                    if (baseOut == 16 || baseOut == 8) {
                        i = baseOut == 16 ? 4 : 3;
                        for (--len; len % i; len++)
                            str += '0';
                        xd = convertBase(str, base, baseOut);
                        for (len = xd.length; !xd[len - 1]; --len);
                        // xd[0] will always be be 1
                        for (i = 1, str = '1.'; i < len; i++)
                            str += NUMERALS.charAt(xd[i]);
                    } else {
                        str = str.charAt(0) + '.' + str.slice(1);
                    }
                }
                str = str + (e < 0 ? 'p' : 'p+') + e;
            } else if (e < 0) {
                for (; ++e;)
                    str = '0' + str;
                str = '0.' + str;
            } else {
                if (++e > len)
                    for (e -= len; e--;)
                        str += '0';
                else if (e < len)
                    str = str.slice(0, e) + '.' + str.slice(e);
            }
        }
        str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
    }
    return x.s < 0 ? '-' + str : str;
}})();