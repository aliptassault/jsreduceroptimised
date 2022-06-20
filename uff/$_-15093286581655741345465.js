(function(){{
    // loop columns
    for (var j = 0; j < columns; j++) {
        // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
        var k0 = ptr[j];
        var k1 = ptr[j + 1];
        // find value index @ x
        var kx = _getValueIndex(x, k0, k1, index);
        // find value index @ x
        var ky = _getValueIndex(y, k0, k1, index);
        // check both rows exist in matrix
        if (kx < k1 && ky < k1 && index[kx] === x && index[ky] === y) {
            // swap values (check for pattern matrix)
            if (values) {
                var v = values[kx];
                values[kx] = values[ky];
                values[ky] = v;
            }
            // next column
            continue;
        }
        // check x row exist & no y row
        if (kx < k1 && index[kx] === x && (ky >= k1 || index[ky] !== y)) {
            // value @ x (check for pattern matrix)
            var vx = values ? values[kx] : undefined;
            // insert value @ y
            index.splice(ky, 0, y);
            if (values)
                values.splice(ky, 0, vx);
            // remove value @ x (adjust array index if needed)
            index.splice(ky <= kx ? kx + 1 : kx, 1);
            if (values)
                values.splice(ky <= kx ? kx + 1 : kx, 1);
            // next column
            continue;
        }
        // check y row exist & no x row
        if (ky < k1 && index[ky] === y && (kx >= k1 || index[kx] !== x)) {
            // value @ y (check for pattern matrix)
            var vy = values ? values[ky] : undefined;
            // insert value @ x
            index.splice(kx, 0, x);
            if (values)
                values.splice(kx, 0, vy);
            // remove value @ y (adjust array index if needed)
            index.splice(kx <= ky ? ky + 1 : ky, 1);
            if (values)
                values.splice(kx <= ky ? ky + 1 : ky, 1);
        }
    }
}})();