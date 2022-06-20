(function(){{
    var r, s, f, value, temp;
    if (rows == 1) {
        // this is a 1 x 1 matrix
        value = mat[0][0];
        if (value == 0) {
            throw Error('Cannot calculate inverse, determinant is zero');
        }
        return [[divideScalar(1, value)]];
    } else if (rows == 2) {
        // this is a 2 x 2 matrix
        var d = det(mat);
        if (d == 0) {
            throw Error('Cannot calculate inverse, determinant is zero');
        }
        return [
            [
                divideScalar(mat[1][1], d),
                divideScalar(unaryMinus(mat[0][1]), d)
            ],
            [
                divideScalar(unaryMinus(mat[1][0]), d),
                divideScalar(mat[0][0], d)
            ]
        ];
    } else {
        // this is a matrix of 3 x 3 or larger
        // calculate inverse using gauss-jordan elimination
        //      http://en.wikipedia.org/wiki/Gaussian_elimination
        //      http://mathworld.wolfram.com/MatrixInverse.html
        //      http://math.uww.edu/~mcfarlat/inverse.htm
        // make a copy of the matrix (only the arrays, not of the elements)
        var A = mat.concat();
        for (r = 0; r < rows; r++) {
            A[r] = A[r].concat();
        }
        // create an identity matrix which in the end will contain the
        // matrix inverse
        var B = eye(rows).valueOf();
        // loop over all columns, and perform row reductions
        for (var c = 0; c < cols; c++) {
            // element Acc should be non zero. if not, swap content
            // with one of the lower rows
            r = c;
            while (r < rows && A[r][c] == 0) {
                r++;
            }
            if (r == rows || A[r][c] == 0) {
                // TODO: in case of zero det, just return a matrix wih Infinity values? (like octave)
                throw Error('Cannot calculate inverse, determinant is zero');
            }
            if (r != c) {
                temp = A[c];
                A[c] = A[r];
                A[r] = temp;
                temp = B[c];
                B[c] = B[r];
                B[r] = temp;
            }
            // eliminate non-zero values on the other rows at column c
            var Ac = A[c], Bc = B[c];
            for (r = 0; r < rows; r++) {
                var Ar = A[r], Br = B[r];
                if (r != c) {
                    // eliminate value at column c and row r
                    if (Ar[c] != 0) {
                        f = divideScalar(unaryMinus(Ar[c]), Ac[c]);
                        // add (f * row c) to row r to eliminate the value
                        // at column c
                        for (s = c; s < cols; s++) {
                            Ar[s] = addScalar(Ar[s], multiply(f, Ac[s]));
                        }
                        for (s = 0; s < cols; s++) {
                            Br[s] = addScalar(Br[s], multiply(f, Bc[s]));
                        }
                    }
                } else {
                    // normalize value at Acc to 1,
                    // divide each value on row r with the value at Acc
                    f = Ac[c];
                    for (s = c; s < cols; s++) {
                        Ar[s] = divideScalar(Ar[s], f);
                    }
                    for (s = 0; s < cols; s++) {
                        Br[s] = divideScalar(Br[s], f);
                    }
                }
            }
        }
        return B;
    }
}})();