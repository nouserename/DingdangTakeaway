//解构方式 引入 常量 ADD
import {ADD} from './mutation-types.js'
const mutations = {
// es6 取值
  [ADD](state){
    state.count++
  }
}
export default mutations