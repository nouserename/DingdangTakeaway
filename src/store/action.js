import {
  getUser,
  getAddressList
} from '../service/getData'
import {
  GET_USERINFO,
  SAVE_ADDRESS
} from './mutation-types.js'


const actions = {
async getUserInfo({
  commit,
  state
}) {
  let res = await getUser();
  //异步请求完成后 commit 触发 GET_USERINFO 这个mutation，管理用户信息
  commit(GET_USERINFO, res)
},
async saveAddress({
  commit,
  state
}) {

  if (state.removeAddress.length > 0) return;
  //异步获取用户地址信息，然后通过 commit SAVE_ADDRESS ，将地址信息保存到 vuex中
  let addres = await getAddressList(state.userInfo.user_id);
  commit(SAVE_ADDRESS, addres);
}
}

export default actions
