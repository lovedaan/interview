/* 
    运动框架：
    {
        el:       Object          运动元素对象
        time:     Number          运动总时间，默认是2000ms
        type:     String          运动方式，默认是Linear匀速
        data:     Object          运动目标集合
        callback: Function        回调函数
    }
*/

(function () {
    var animate = function(opts) {
        var el = opts.el;
        if (!el) return;
        /* 
            t：当前的帧编号
            b：起始位置
            c：表示变化量 (目标减去起始位置)
            d：总帧数
         */
        var tween = {
            Linear: function (t, b, c, d) { return c * t / d + b; },
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },

            easeInBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },
            easeInBounce: function (t, b, c, d) {
                return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOutBounce: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOutBounce: function (t, b, c, d) {
                if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        };
        var type = opts.type || 'Linear';
        var time = opts.time || '2000';
        //需要获取我们目标值的起始位置
        var startJson = {};
        for (var k in opts.data) {
            startJson[k] = parseFloat(getComputedStyle(el)[k]);
        }
        //console.log(startJson);
        var interval = 20; //间隔时间
        var maxFrame = parseFloat(time / interval); //总帧数
        var stepJson = {};  // 步长集合
        var frameNumber = 0; // 帧编号
        //步长结合
        for (var k in opts.data) {
            opts.data[k] = parseFloat(opts.data[k]);
            //stepJson[k] = parseFloat( targetJson[k] - startJson[k] ) / maxFrame;
            stepJson[k] = parseFloat(opts.data[k] - startJson[k]);
        }
        //console.log(stepJson);
        //定时器运动
        var timer = setInterval(function () {
            //循环 每个目标属性 每个时间间隔初始位置都累加步长，再赋值给元素
            //累加 帧编号
            frameNumber++;
            for (var k in opts.data) {
                //startJson[k] += stepJson[k];
                // 这里因为 opacity是没有单位的，所以要特殊处理
                var step = tween[type](frameNumber, startJson[k], stepJson[k], maxFrame);
                el.style[k] = k === 'opacity' ? step : step + 'px';

            }

            // 判断帧编号是否等于 总帧号
            if (frameNumber === maxFrame) {
                //为了防止小数除不尽，没有到达目标点，这里我们停表后再手动设置到目标位置
                for (var k in opts.data) {
                    el.style[k] = k === 'opacity' ? opts.data[k] : opts.data[k] + 'px';
                }
                //停表
                clearInterval(timer);
                //回调函数
                opts.callback && opts.callback();
            }
        }, interval);
    }
    window.animate = animate;
})();