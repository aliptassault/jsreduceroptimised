(function(){{
    var i, j;
    // Compute the matrix with zero lower triangle, same upper triangle,
    // and diagonals given by the negated sum of the below diagonal
    // elements.
    var mu = new Array(matrix.length);
    var sum = 0;
    for (i = 1; i < matrix.length; i++) {
        sum = add(sum, matrix[i][i]);
    }
    for (i = 0; i < matrix.length; i++) {
        mu[i] = new Array(matrix.length);
        mu[i][i] = unaryMinus(sum);
        for (j = 0; j < i; j++) {
            mu[i][j] = 0;    // TODO: make bignumber 0 in case of bignumber computation
        }
        for (j = i + 1; j < matrix.length; j++) {
            mu[i][j] = matrix[i][j];
        }
        if (i + 1 < matrix.length) {
            sum = subtract(sum, matrix[i + 1][i + 1]);
        }
    }
    return mu;
}})();