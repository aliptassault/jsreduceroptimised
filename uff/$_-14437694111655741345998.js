(function(){{
    //checks for valid arguments passed to _distancePairwise(Array)
    if (a[0].length == 2 && typeof a[0][0] === 'number' && typeof a[0][1] === 'number') {
        for (var i in a) {
            if (a[i].length != 2 || typeof a[i][0] !== 'number' || typeof a[i][1] !== 'number') {
                return false;
            }
        }
    } else if (a[0].length == 3 && typeof a[0][0] === 'number' && typeof a[0][1] === 'number' && typeof a[0][2] === 'number') {
        for (var i in a) {
            if (a[i].length != 3 || typeof a[i][0] !== 'number' || typeof a[i][1] !== 'number' || typeof a[i][2] !== 'number') {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}})();