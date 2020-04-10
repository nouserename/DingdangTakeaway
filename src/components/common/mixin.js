import { getStyle } from '../../config/mUtils'
import { imgBaseUrl, localapi, proapi } from '../../config/env'

export const loadMore = {
    //自定义组件指令 load-more
    directives: {
        'load-more': {
            bind: (el, binding) => {
                let windowHeight = window.screen.height;
                let height;
                let setTop;
                let paddingBottom;
                let marginBottom;
                let requestFram;
                let oldScrollTop;
                let scrollEl;
                let heightEl;
                let scrollType = el.attributes.type && el.attributes.type.value;
                let scrollReduce = 2;
                if (scrollType == 2) {
                    scrollEl = el;
                    heightEl = el.children[0];
                } else {
                    scrollEl = document.body;
                    heightEl = el;
                }

                el.addEventListener('touchstart', () => {
                    height = heightEl.clientHeight;
                    if (scrollType == 2) {
                        height = height
                    }
                    setTop = el.offsetTop;
                    paddingBottom = getStyle(el, 'paddingBottom');
                    marginBottom = getStyle(el, 'marginBottom');
                }, false)

                el.addEventListener('touchmove', () => {
                    loadMore();
                }, false)

                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                }, false)

                const moveEnd = () => {
                    requestFram = requestAnimationFrame(() => {
                        if (scrollEl.scrollTop != oldScrollTop) {
                            oldScrollTop = scrollEl.scrollTop;
                            moveEnd()
                        } else {
                            cancelAnimationFrame(requestFram);
                            height = heightEl.clientHeight;
                            loadMore();
                        }
                    })
                }

                const loadMore = () => {
                    //滚动到达底部，拉取数据
                    if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
                        binding.value();
                    }
                }
            }
        }
    }
};
// g
export const getImgPath = {
    methods: {
        //传递过来的图片地址需要处理后才能正常使用
        getImgPath(path) {
            let suffix;
            if (!path) {
                //如果没有传地址，就返回默认图片
                return 'http://labfile.oss.aliyuncs.com/courses/1293/default.jpg'
            }
            if (path.indexOf('jpeg') !== -1) {
                suffix = '.jpeg'
            } else {
                suffix = '.png'
            }
            //有些图片是使用 饿了么官方给开发者的示例图片，所以，要拼接一下图片地址
            let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
            return 'https://fuss10.elemecdn.com' + url
        }
    }

}