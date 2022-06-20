(function(){{
    places = Math.pow(10, places || 0);
    return new Complex(Math.ceil(    $that['re'] * places) / places, Math.ceil(    $that['im'] * places) / places);
}})();