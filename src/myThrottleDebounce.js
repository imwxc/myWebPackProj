
// 手写防抖函数
// 防抖：触发后n秒回调， n秒内触发重新计时
function deBounce(fn, timeout) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = timer = setTimeout(() => {
            fn().apply(this, arguments);
        }, timeout);
    };
}

// 手写节流函数
// 在delay的时间段内，只有一次fn能被执行
function throttle(fn, delay) {
    let curTime = Date.now();
    return function () {
        let now = Date.now();
        if (now - curTime >= delay) {
            curTime = Date.now();
            return fn.apply(this, arguments);
        }
    };
}