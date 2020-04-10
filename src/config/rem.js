(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;//��ȡ�ӿڿ��
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'; //���ø���ǩ �����С
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false); //������ʱ���� ����ǩ�����С
    doc.addEventListener('DOMContentLoaded', recalc, false); //���ĵ�����ȫ�������غ� ִ�� recalc,��������
})(document, window);