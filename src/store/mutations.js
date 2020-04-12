//�⹹��ʽ ���� ���� ADD
import {ADD} from './mutation-types.js'
// 引入 mutation-types ,定义的mutation名称常量
import {RECORD_ADDRESS,SAVE_GEOHASH } from './mutation-types.js'
const mutations = {
    // 记录当前经度纬度
    // 我们引入的是常量名，并不是常量值,所以 要使用 [] 获取常量的值 
    //[RECORD_ADDRESS](){}会转化成RECORD_ADDRESS(){}
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude;
    },
      //保存字符串形式经纬度  '31.22299,121.36025' 
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash;

    },
}
export default mutations