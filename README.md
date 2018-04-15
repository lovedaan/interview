# 模块化

 ```
 es6的模块化逐渐成为标准
 export function fn1() {} //暴露导出数据
 export default function fn2() {} //暴露导出数据
 import { fn1 } from './module1.js' //引用模块
 import fn2 from './module2.js' //引用模块
目前在浏览器端还是需要babel工具来编译es6的语法转成es5，
模块化工具上可以选择webpack，rollupjs
这里的rollupjs就是专注于模块化打包的，一件事做到极致，在多页面开发的时候，可以配合gulp来使用
webpack更多的使用在单页应用上。
模块化的统一标准：简单，易用的方向发展
 ```

 ## es6的面向对象

 ```
 1.es6的class 和 es5的构造函数有什么区别
 class在语法上更加贴切面向对象的写法
 class实现继承更加易读、易理解(extends)
 更易于写java后端语音的使用
class 是es5构造函数的语法糖，还是使用原型链继承的方式
构造函数的原型上默认有一个constructor的属性，指向这个构造函数
Person.prototype.constructor === Person // true
实例对象上默认有一个__proto__属性，指向构造函数的原型对象
p1.__proto__ === Person.prototype //true
构造函数本质上也是一个函数
typeof Person // 'function'
2.es6常用功能
let/const 定义变量和常量
多行字符串和模板变量
块级作用域
函数参数默认值
结构赋值（数组和对象）
箭头函数
class定义
promise解决异步回调
3.说一下原型的实际应用？
说一下jquery原型的使用
说一下zepto原型的使用
说一下自己的项目中如何使用
找入口函数 --> 找构造函数 --> 找构造函数的原型（怎么定义的）
4.原型如何体现他的扩展性，jquery和zepto的插件机制是如何实现？
jquery是通过 $.fn.showName = function(){} 拓展插件，就是往原型添加方法
全局暴露了$这个全局变量，将插件拓展统一到$.fn.xxx这个接口，方便使用
 ```

## 异步 单线程

* 单线程：同一时间内，只能做一件事

```
原因：浏览器渲染DOM，js也可以改变DOM，为了避免渲染冲突，所以js只能是单线程
解决：异步，当遇到异步代码（定时器，ajax等）就跳过，继续执行后面的同步代码，等同步代码执行完后再会过头来执行异步代码
实现方式：Event-Loop（事件循环）
```

* 什么是Event-Loop?

```
概念：事件轮询，JS实现异步的具体解决方案，
异步队列：同步代码按顺序直接执行，异步函数先放在异步队列中，
待所有同步代码执行完毕，再轮询执行异步队列的函数
异步函数什么时候放到异步队列中？
定时器函数不写间隔时间或为0的，就按浏览器解析的最短时间，同步代码执行完之后，间隔这最段时间后放入异步队列中，有些具体时间的就同理，ajax请求，在成功请求回来的时候把回调函数放入异步队列。
轮询的过程就是监视异步队列里面有没有异步函数，有就拿出来在主进程中执行，完了再去监视，一遍一遍的走
```

* jQuery的Deferred

```
在jQuery1.5版本之前之后对ajax的改变写法
如何简单封装、使用Deferred？
说明promise和Deferred的区别？
Deferred对象混合了主动触发（resolve，reject）和被动监听（then，done，fail），暴露出来再外面就很容易被修改，造成程序执行错乱。而promise对象对外只暴露了这些被动监听的函数，外部不能修改内部主动触发的函数

在jQuery1.5版本之前，ajax的使用是通过回调函数的方式处理的
无法改变js异步和单线程的本质，只能从写法上杜绝callback的方式，它是一种语法糖的形式，解耦了代码，很好体现开放封闭的原则
jquery deferred的用法，分两步
第一类：dtd.resolve() //成功后做什么事 dtd.reject() //失败后做什么事
第二类：dtd.then(fn1, fn2) dtd.done() dtd.fail()
这两类应该分开
function handleData(url) {
    var dtd = $.Deferred();
    var awaitData = function (dtd, url) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                dtd.resolve(data);
            },
            error: function (err) {
                dtd.reject(err);
            }
        });
        return dtd;
    }
    return awaitData(dtd, url);
}
var handle = handleData('./data.json');
handle.then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
});
引入promise的概念,返回的是一个promise对象
function handleData(url) {
    var dtd = $.Deferred();
    var awaitData = function (dtd, url) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                dtd.resolve(data);
            },
            error: function (err) {
                dtd.reject(err);
            }
        });
        return dtd.promise();
    }
    return awaitData(dtd, url);
}
var handle = handleData('./data.json');
$.when(handle).then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
});

```

* promise原理深入

```
promise是一个构造函数
Promise的作用了，简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。Promise的优势在于，可以在then方法中继续写Promise对象并返回，然后继续调用then来进行回调操作。
基本使用语法
function loadImg(src) {
    return new Promise((resolve, reject) => {
        var Img = new Image();
        Img.src = src;
        Img.onload = function () {
            resolve(Img);
        }
        Img.onerror = function (err) {
            reject('图片加载失败');
        }
    });
}
loadImg('xxx').then(res => {
    //成功的回调
    //如果要链式调用,这里要返回一个promise对象
    return res;
}).then( re => {
    //...
});
异常捕获，在then调用的结尾后面跟上catch方法来捕获异常
loadImg('xxx').then(res => {
    //成功的回调
    //如果要链式调用,这里要返回一个promise对象
    return res;
}).then( re => {
    //...
}).catch(err => {
    //这里能捕获到我们自己程序的错误和资请求错误，统一再这里处理
});
Promise.all() 和 Promise.race(),都接收一个数组参数，里面是一个一个的promise实例，Promise.all()是「谁跑的慢，以谁为准执行回调」等所有请求成功了才返回，统一返回数组结果，Promise.race()是「谁跑的快，以谁为准执行回调」最先请求成功后就立即返回这个请求的结果，不关心其他的请求
Promise.race()的应用场景，在配合fetch使用的时候，可以模拟一个超时请求，和一个网络请求，如果网络请求再定时内请求回来，那就走正常流程，否则就走catch的超时

promise的状态
pending, fulfilled, rejected
初始状态就是pending等待
然后pending -> fuiffilled(成功)，或者 -> rejected(失败)
状态是不可逆的
promise实例必须实现then这个方法，
then里面可以是两个参数，一个成功回调，一个失败回调，也可以只有一个成功回调，
then方法要链式调用，里面必须返回一个promise实例给下一个then接收

```
* 介绍一下 async/await

```
promise then方法只是将回调函数展开，本质上还是回调函数,
async/await 的写法更接近与同步代码
用法：使用await，函数必须用async标识，await后面跟着一个promise实例
可以用babel-polyfill编译兼容
const fs = require('fs');
const readFileData = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
async function init() {
    try{
        const data1 = await readFileData('./data.json');
        console.log(JSON.parse(data1));  
        const data2 = await readFileData('./data2.json');
        console.log(JSON.parse(data2));
    }catch(err){
        console.log(err);
    }
}
init();
使用了promise，并没有和promise有冲突，完全是同步的写法，没有了回调函数,
但是改变不了js单线程，异步的本质

当前异步回调的解决方法
jQuery Deferred
promise
async/await
```

* 虚拟DOM(virtual DOM)

```
1.什么是虚拟DOM，为何会存在？
概念：用js模拟DOM结构，DOM变化的对比，放在JS层中实现，提高效率，重绘能力
直接操作DOM的问题：
DOM操作是“昂贵的”，js的运行效率高
尽量减少DOM操作，而不是“推到重来”
项目越复杂，影响就越严重
这就是虚拟DOM的存在的原因
2.虚拟DOM如何应用，核心API是什么？
3.介绍一下diff算法？
```

* MVVM vue相关

```
1.说一下使用jQuery和使用框架的区别？
数据与视图分离，解耦
以数据驱动视图，值关心数据变化，DOM操作被封装
2.说一下MVVM的理解？
view（视图，模板，和模型是分离的） 通过DOM监听去改变 model
viewmodel是一个桥，连接V和M
model（模型，数据） 通过数据绑定改变 view
三要素：数据响应式，模板解析，渲染
3.vue如何实现响应式？
响应式：修改data属性之后，vue立刻监听到，data属性被代理到vue
Object.defineProperty
4.vue如何解析模板？
模板是什么？
本质就是字符串，有逻辑（有判断，有循环）
要转换成JS代码，因为：
有逻辑必须用js才能实现，转换成HTML渲染，也必须是js才能实现，因此模板最终要转成成一个js函数（render函数）
与HTML格式很像，但有很多区别
最终还是要转换成HTML展示
render函数
render函数与vdom
5.vue的整个实现流程？
第一步：解析模板成render函数
第二步：响应式开始监听
第三步：首次渲染，显示页面，且绑定依赖
第四步：data属性变化，触发render
```

# hybrid 混合APP开发

 ```
 1.hybrid是什么，为什么用hybrid？
 hybrid文字解释
 混合的意思，即是前端和客户端的混合开发，需要前端和客户端人员配合开发，某些环节也会涉及到server端
 存在价值，为何会用hybrid
 可以快速迭代更新【无需APP审核】
 体验流畅（和原生差不多的体验）
 减少开发成本和沟通成本，双端共用一个代码

 webview
 是APP一个组件（可有可无）
 用于加载h5页面，即一个小型的浏览器内核
 file://协议
 file：加载本地文件，块
 http：加载远程网络文件，慢
 hybrid实现流程
 不是所有的场景适合hybrid
 使用NA：体验要求极致，变化不频繁（今日头条首页）
 使用hybrid：体验要求高，变化频繁（今日头条详情页）
 使用H5：体验无要求，不常用（如举报、反馈等页面）
 具体实现：前端做好静态页面（html，css，js），交给客户端
 客户端拿到前端静态页面，以文件形式存储在app中，客户端在一个webview中使用file协议加载这些静态页面资源

总结：
hybrid：前端和客户端混合开发
存在的意义就是快速迭代，无需审核
 APP上线后，如何更新静态文件？
 静态文件如何获取内容？
 2.接收一下hybrid的更新和上线流程？
 更新的目的：替换客户端的静态文件，所以只能在客户端来做，我们把静态文件上传到server服务端，然后客户端去服务端下载静态文件来更新，前端就只管维护上传到服务端的静态文件
 流程：
 分版本，有版本号（时间戳）
 将静态文件压缩成zip包上传到服务端
客户端每次启动都去服务端检查版本号
如果版本大于客户端存储的版本号，就下载最新的zip包，
下载完就解压，覆盖现有文件
 3.hybrid和H5的主要区别？
 优点：体验好，更新迭代快
 缺点：开发成本高，链条，测试，调bug都比较麻烦，运维成本高（上线流程繁琐）
 适合场景：
 hybrid：产品的稳定功能，体验要求高，迭代频繁（产品型）
 H5：单次的运营活动（运营型）
 4.前端JS和客户端如何通信？
 基本形式：
 JS访问客户端能力，传递参数和回调函数
 客户端通过回调函数返回内容
 schema协议简介和使用
 schema协议：前端和客户端通讯的约定
 ```


 ** js知识积累

 ```
 1.let 和 const 定义全局变量，不会自动挂载在window上，而var会
 2.es6的函数声明不会提升
 ```
