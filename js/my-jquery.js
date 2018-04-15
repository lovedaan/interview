(function (window, document, undefined) {

    var jQuery = function (selector) {
        return new jQuery.fn.init(selector);
    }
    
    jQuery.fn = {
        constructor: jQuery,
        html: function (value) {
            if(value == null){
                return this[0].innerHTML;
            }else{
                this[0].innerHTML = value;
                return this;
            }
        },
        attr: function (attr, value) {
            if (value == null) {
                //获取属性值
                return this[0].getAttribute(attr);
            }else{
                for (var i = 0; i < this.length; i++) {
                    this[i].setAttribute(attr, value);
                }
                return this;
            }
        },
        css: function (key, value) {
            if(value == null){
                return getComputedStyle(this[0])[key];
            }else{
                switch (key) {
                    case 'color':
                    case 'apcity':
                    case 'background':
                        for(var i = 0; i<this.length; i++){
                            this[i].style[key] = value;
                        }
                        break;
                    default:
                        for (var i = 0; i < this.length; i++) {
                            this[i].style[key] = value + 'px';
                        }
                        break;
                }
                return this;
            }
        }
    };

    var init = jQuery.fn.init = function (selector) {
        var slice = Array.prototype.slice;
        var dom = slice.call(document.querySelectorAll(selector));
        var i, len = dom.length || 0;
        for (i = 0; i < len; i++) {
            this[i] = dom[i];
        }
        this.length = len;
        this.selector = selector || '';
    }

    init.prototype = jQuery.prototype = jQuery.fn;

    window.$ = jQuery;
    
})(window, document);