/**
 * �洢localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content); //��localstorage�д���һ������
}

/**
 * ��ȡlocalStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name); //��localstorage�л�ȡһ���Ѿ���������
}

/**
 * ɾ��localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name); //��localstorage��ɾ��һ��ָ������
}

/**
 * ��ȡstyle��ʽ
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop ��ȡ��ʽ��ͬ��û����������style������ֻ��document.body������
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //�ڻ�ȡ opactiy ʱ��Ҫ��ȡС�� parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 

/**
 * ҳ�浽��ײ������ظ���
 */
export const loadMore = (element, callback) => {
    let windowHeight = window.screen.height;
    let height;
    let setTop;
    let paddingBottom;
    let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //�˶���ʼʱ��ȡԪ�� �߶� �� offseTop, pading, margin
    element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //�˶������б��ּ��� scrollTop ��ֵ�ж��Ƿ񵽴�ײ�
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //�˶�����ʱ�ж��Ƿ��й����˶��������˶������ж��Ƿǵ���ײ�
    element.addEventListener('touchend',() => {
           oldScrollTop = document.body.scrollTop;
           moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
                //Ϊ�˷�ֹ���̧��ʱ�Ѿ���Ⱦ�����ݴӶ������ػ�ȡ���ݣ�Ӧ�����»�ȡdom�߶�
                height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * ��ʾ���ض�����ť����ʼ���������˶� ���������е��ú����ж��Ƿ�ﵽĿ���
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //�ж��Ƿ�ﵽĿ���
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}


/**
 * �˶�Ч��
 * @param {HTMLElement} element   �˶����󣬱�ѡ
 * @param {JSON}        target    ���ԣ�Ŀ��ֵ����ѡ
 * @param {number}      duration  �˶�ʱ�䣬��ѡ
 * @param {string}      mode      �˶�ģʽ����ѡ
 * @param {function}    callback  ��ѡ���ص���������ʽ����
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //�жϲ�ͬ���������
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    //�жϲ�ͬ���������
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //��ȡdom��ʽ
    const attrStyle = attr => {
        if (attr === "opacity") { 
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //�������С����Ҫ�Ӵ˽� rem �ĳ� px ��������
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //��ȡĿ�����Ե�λ�ͳ�ʼ��ʽֵ
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        }else{
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //ȥ������ĺ�׺��λ
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
        }else{
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //���������˶������յ�
    const remberSpeed = {};//��¼��һ���ٶ�ֵ,��ease-inģʽ����Ҫ�õ�
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //����
            let status = false; //�Ƿ������˶�
            let iCurrent = attrStyle(attr) || 0; //��ǰԪ������ַ
            let speedBase = 0; //Ŀ�����Ҫ��ȥ�Ļ���ֵ�������˶�״̬��ֵ����ͬ
            let intervalTime; //��Ŀ��ֵ��Ϊ���ٲ�ִ�У���ֵԽ�󣬲���ԽС���˶�ʱ��Խ��
            switch(mode){
                case 'ease-out': 
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration*20/400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration*5/400; 
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //�ж��Ƿ�ﲽ��֮�ڵ������룬�������˵������Ŀ���
            switch(mode){
                case 'ease-out': 
                    status = iCurrent != target[attr]; 
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr]; 
            }

            if (status) {
                flag = false; 
                //opacity �� scrollTop ��Ҫ���⴦��
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                }else{
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}