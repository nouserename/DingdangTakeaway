(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;//获取视口宽度
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'; //设置根标签 字体大小
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false); //当缩放时更新 根标签字体大小
    doc.addEventListener('DOMContentLoaded', recalc, false); //当文档被完全解析加载后 执行 recalc,设置字体
})(document, window);