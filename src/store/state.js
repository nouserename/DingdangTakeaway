
const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  geohash: '31.22299,121.36025',//地址geohash值,默认赋值
  login:true, //登录状态
  userInfo: null, //用户信息
  cartList: {}, // 加入购物车的商品列表
  shopDetail: null, //商家详情信息
  invoice: false,//开发票
  shopid: null,//商铺id
  choosedAddress: null,//选择地址
  newAddress: [], //确认订单页新的地址
  addressIndex: null,//选择地址的索引值
  searchAddress: null,//搜索并选择a的地址
  cartId: null, //购物车id
  sig: null,//购物车sig
  orderParam: null,//订单的参数
  remarkText: null,//可选备注内容
  inputText: '',//输入备注内容
  orderDetail: null, //订单详情
}

export default state