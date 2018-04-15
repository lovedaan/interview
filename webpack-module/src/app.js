import 'babel-polyfill';
function loadImg(src) {
    return new Promise((resolve, reject) => {
        const Img = new Image();
        Img.src = src;
        Img.onload = function() {
            resolve(Img);
        }
        Img.onerror = function () {
            reject('图片加载错误');
        }
    });
}

const src1 = 'https://www.imooc.com/static/img/index/logo.png';
const src2 = 'https://img3.sycdn.imooc.com/szimg/5ab3a1240001e67910800600.jpg';

async function load() {
    try{
        const data1 = await loadImg(src1);
        console.log(data1, '第一张图片加载');
        const data2 = await loadImg(src2);
        console.log(data2, '第二张图片加载');
    }catch (err) {
        console.log(err);
    }
}

load();