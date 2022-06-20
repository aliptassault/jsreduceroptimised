(function(){{
    if (typeof str !== 'string') {
        return null;
    }
    var args = str.split(':');
    var nums = args.map(function (arg) {
        return parseFloat(arg);
    });
    var invalid = nums.some(function (num) {
        return isNaN(num);
    });
    if (invalid) {
        return null;
    }
    switch (nums.length) {
    case 2:
        return new Range(nums[0], nums[1]);
    case 3:
        return new Range(nums[0], nums[2], nums[1]);
    default:
        return null;
    }
}})();