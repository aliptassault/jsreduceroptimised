(function(){{
    var i, ret, val, tran;
    if (dim <= 0) {
        if (!Array.isArray(mat[0])) {
            val = mat[0];
            for (i = 1; i < mat.length; i++) {
                val = callback(val, mat[i]);
            }
            return val;
        } else {
            tran = _switch(mat);
            ret = [];
            for (i = 0; i < tran.length; i++) {
                ret[i] = _reduce(tran[i], dim - 1, callback);
            }
            return ret;
        }
    } else {
        ret = [];
        for (i = 0; i < mat.length; i++) {
            ret[i] = _reduce(mat[i], dim - 1, callback);
        }
        return ret;
    }
}})();