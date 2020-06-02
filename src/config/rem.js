//适配字体大小，采用rem适配方案，根据根标签的字体大小，来作为css单位（如果根标签字体为14px，那么1rem = 14px）
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;//获取视口宽度
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'; //设置根标签字体大小
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false); //当缩放时更新根标签字体大小
    doc.addEventListener('DOMContentLoaded', recalc, false); //当文档被完全解析加载后执行recalc，设置字体
})(document, window);