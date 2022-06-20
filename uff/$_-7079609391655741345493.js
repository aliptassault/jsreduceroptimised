(function(){{
    var unit = new Unit(json.value, json.unit);
    unit.fixPrefix = json.fixPrefix || false;
    return unit;
}})();