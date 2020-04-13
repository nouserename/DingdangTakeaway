import {
    getUser
} from '../service/getData'

import {
    GET_USERINFO
} from './mutation-types.js'

const actions = {
  async getUserInfo({
      commit,
      state
    }) {
      let res = await getUser();
      //异步请求完成后 commit 触发 GET_USERINFO 这个mutation，管理用户信息
      commit(GET_USERINFO, res)
    }
}

export default actions