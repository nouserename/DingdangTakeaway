const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  geohash: '31.22299,121.36025',//地址geohash值,默认赋值
  login:true, //登录状态
  userInfo: null, //用户信息
  cartList: {}, // 加入购物车的商品列表
  shopDetail: null, //商家详情信息
}
export default state