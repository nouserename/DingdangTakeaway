// 数据请求整合在一个js文件中，方便整个项目不同模块都可以随时调用
//引入 封装好的 请求工具
import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});

/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
    type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
    type: 'group'
});


/**
 * 获取当前所在城市
 */

export const currentcity = number => fetch('/v1/cities/' + number);


/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});


/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);


/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
});


/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = '';
    support_ids.forEach(item => {
        if (item.status) {
            supportStr += '&support_ids[]=' + item.id;
        }
    });
    let data = {
        latitude,
        longitude,
        offset,
        limit: '20',
        'extras[]': 'activities',
        keyword: '',
        restaurant_category_id,

    };
    return fetch('/shopping/restaurants', data);
};


//获取后台验证码
export const getcaptchas = () => fetch('/v1/captchas', {},'POST');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');

/**
 * 获取用户信息
 * 
 * time 无意义参数 防止浏览器缓存
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id'),time:Math.random()});

/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');

/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
    latitude,
    longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});

/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
    restaurant_id
});

/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
    come_from: "web",
    geohash,
    entities,
    restaurant_id: shopid,
}, 'POST');

/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => fetch('/v1/carts/' + id + '/addresses', {
    sig
});


/**
 * 下订单
 */

export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
    address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description,
    entities,
    geohash,
    paymethod_id: 1,
    sig,
}, 'POST');


/**
*个人中心里编辑地址
*/

export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses',{time:Math.random()})

export const searchNearby = keyword => fetch('/v1/pois', {
    type: 'nearby',
    keyword
});

/**
 * 添加地址
 */
export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
    address,
    address_detail,
    geohash,
    name,
    phone,
    phone_bk,
    poi_type,
    sex,
    tag,
    tag_type,
}, 'POST');
/**
 * 重新发送订单验证码
 */
export const payRequest = (merchantOrderNo, userId) => fetch('/payapi/payment/queryOrder', {
    merchantId: 5,
    merchantOrderNo,
    source: 'MOBILE_WAP',
    userId,
    version: '1.0.0',
});
/**
 * 获取快速备注列表
 */
export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
    sig
});
/**
 * 获取search页面搜索结果
 */
export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
    'extras[]': 'restaurant_activity',
    geohash,
    keyword,
    type: 'search'
});
/**
 * 获取订单列表
 * time:Math.random() time属于无意义随机参数，解决·浏览器缓存问题，导致数据不更新
 */
export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
    limit: 10,
    offset,
    time:Math.random()
});
/**
 * 获取订单详情
 */
export const getOrderDetail = (user_id, orderid) => fetch('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');
/**
* 删除地址
*/
export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')
/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');