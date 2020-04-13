import {RECORD_ADDRESS,SAVE_GEOHASH,RECORD_USERINFO,GET_USERINFO} from './mutation-types.js'
//引入local
import {setStore, getStore} from '../config/mUtils'
const mutations = {
    // 记录当前经度纬度
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
    console.log(latitude)
        state.latitude = latitude;
        state.longitude = longitude;
    },
      //保存geohash
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash;

    },
      // 记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.login = true;
        //同时 在 localstorage 中记录下用户 id ，防止浏览器刷新，vuex 数据丢失，使用 id 重新查询
        setStore('user_id', info.user_id);
    },
      //获取用户信息存入vuex
    [GET_USERINFO](state, info) {
        //vuex 中保存的 用户名不相同，就不处理
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        };
        if (!state.login) {
            //登录状态为 false 未登录就不返回用户信息
            return
        }
        if (!info.message) {
            // info.message 请求没有返回 message 提示信息说明，登录成功，将数据 存入 vuex state
            /** ... 扩展运算符   

            **/
            state.userInfo = {...info};
        } else {
            state.userInfo = null;
        }
    },
}
export default mutations