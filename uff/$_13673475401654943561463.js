(function(){{
    var d, e, k, n, i = 0, r = new        $that(1), rd = [];
    if (sd === void 0)
        sd =         $that.precision;
    else
        checkInt32(sd, 1, MAX_DIGITS);
    k = Math.ceil(sd / LOG_BASE);
    if (!        $that.crypto) {
        for (; i < k;)
            rd[i++] = Math.random() * 10000000 | 0;    // Browsers supporting crypto.getRandomValues.
    } else if (crypto.getRandomValues) {
        d = crypto.getRandomValues(new Uint32Array(k));
        for (; i < k;) {
            n = d[i];
            // 0 <= n < 4294967296
            // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
            if (n >= 4290000000) {
                d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
            } else {
                // 0 <= n <= 4289999999
                // 0 <= (n % 1e7) <= 9999999
                rd[i++] = n % 10000000;
            }
        }    // Node.js supporting crypto.randomBytes.
    } else if (crypto.randomBytes) {
        // buffer
        d = crypto.randomBytes(k *= 4);
        for (; i < k;) {
            // 0 <= n < 2147483648
            n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
            // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
            if (n >= 2140000000) {
                crypto.randomBytes(4).copy(d, i);
            } else {
                // 0 <= n <= 2139999999
                // 0 <= (n % 1e7) <= 9999999
                rd.push(n % 10000000);
                i += 4;
            }
        }
        i = k / 4;
    } else {
        throw Error(cryptoUnavailable);
    }
    k = rd[--i];
    sd %= LOG_BASE;
    // Convert trailing digits to zeros according to sd.
    if (k && sd) {
        n = mathpow(10, LOG_BASE - sd);
        rd[i] = (k / n | 0) * n;
    }
    // Remove trailing words which are zero.
    for (; rd[i] === 0; i--)
        rd.pop();
    // Zero?
    if (i < 0) {
        e = 0;
        rd = [0];
    } else {
        e = -1;
        // Remove leading words which are zero and adjust exponent accordingly.
        for (; rd[0] === 0; e -= LOG_BASE)
            rd.shift();
        // Count the digits of the first word of rd to determine leading zeros.
        for (k = 1, n = rd[0]; n >= 10; n /= 10)
            k++;
        // Adjust the exponent for leading zeros of the first word of rd.
        if (k < LOG_BASE)
            e -= LOG_BASE - k;
    }
    r.e = e;
    r.d = rd;
    return r;
}})();