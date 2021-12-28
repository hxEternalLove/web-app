var fx = function (fn, begin, end){
    fx.easeOut = function(t,b,c,d){
        return -c *(t /= d)*(t-2) +b;
    }
    var options = arguments[3] || {};
    var duration = options.duration || 500;
    var ease = options.ease || fx.easeOut;
    var startTime = new Date().getTime();
    (function () {
        setTimeout(function () {
            var timestamp = new Date().getTime() - startTime;
            fn( ease( timestamp, begin, (end - begin), duration), 'step');
            if (duration <= timestamp) {
                fn(end, 'end');
            } else {
                setTimeout(arguments.callee,25);
            }
        },25)
    })();
}
export {
    fx
};