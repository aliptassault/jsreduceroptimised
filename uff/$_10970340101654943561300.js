(function(){{
    var e =     $that.e || (    $that.e = {});
    var evts = e[name];
    var liveEvents = [];
    if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                liveEvents.push(evts[i]);
        }
    }
    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return    $that;
}})();