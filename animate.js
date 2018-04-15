/* 
    animate 运动函数
    {
        el:  运动对象
        time: 运动总时间
        data: 目标对象
        type: 动画方式
        callback :回调函数
    }
    el.animated 可以判断是否在运动
*/
(function () {
    /* 
        t: 当前帧编号
        b：起始位置
        c：变化量（目标值减去起始值）
        d：总帧数
    */
    //缓存动画函数
    var Tween = {
        Linear: function (t, b, c, d) { return c * t / d + b; },  
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInSine: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
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
    
    var animate = function (opts) {
        if(!opts.el) return;
        var targetJson = opts.data;
        var el = opts.el;
        var frameNumber = 0; //帧编号
        var time = opts.time || 1000;
        var interval = 20;
        var type = opts.type || 'easeIn';
        var allFrameNumber = parseFloat(time / interval);
        var startJson = {}; // 获取起始位置的属性值
        el.animated = false; //记录是否在运动
        for(var k in targetJson){
            startJson[k] = parseFloat( getComputedStyle(el)[k]);
        }
        var stepJson = {}; // 获取属性值的步长
        
        for (var k in targetJson) {
            targetJson[k] = parseFloat(targetJson[k]);
            //stepJson[k] = parseFloat((targetJson[k] - startJson[k]) / allFrameNumber );
            stepJson[k] = parseFloat((targetJson[k] - startJson[k]) );
        }

        var timer = setInterval(function () {
            el.animated = true;
            frameNumber++;
            for(var k in targetJson){
                //startJson[k] += stepJson[k];
                var step = Tween[type](frameNumber, startJson[k], stepJson[k], allFrameNumber);
                el.style[k] = k === 'opacity' ? step : step + 'px';
            }
            
            if(frameNumber === allFrameNumber){
                clearInterval(timer);
                for (var k in targetJson) {
                    el.style[k] = k === 'opacity' ? targetJson[k] : targetJson[k] + 'px';
                }
                opts.callback && opts.callback();
                el.animated = false;
            }
            
        }, interval);

    }

    window.animate = animate;

})();