(function(){{
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--;) {
        temp = x[i] * k + carry;
        x[i] = temp % base | 0;
        carry = temp / base | 0;
    }
    if (carry)
        x.unshift(carry);
    return x;
}})();