<template>
    <div class="food_container">
        <head-top :head-title="headTitle" goBack="true"></head-top>
        <section class="shop_list_container">
      <!-- shop-list 组件 -->
            <shop-list :geohash="geohash"  v-if="latitude"></shop-list>
        </section>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import headTop from "../../components/header/head";
import shopList from "../../components/common/shoplist";
import { msiteAddress } from "../../service/getData";


export default {
  data() {
    return {
      geohash: "", // city页面传递过来的地址geohash
      headTitle: "", // msiet页面头部标题
      foodTitle: "", // 排序左侧头部标题
    };
  },
  created() {
    this.initData();
  },
  components: {
    headTop,
    shopList
  },
  computed: {
    ...mapState(["latitude", "longitude"])
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS"]),
    //初始化获取数据
    async initData() {
      //获取从msite页面传递过来的参数
      this.geohash = this.$route.query.geohash;
      this.headTitle = this.$route.query.title;
      this.foodTitle = this.headTitle;
      //防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
      if (!this.latitude) {
        //获取位置信息
        let res = await msiteAddress(this.geohash);
        // 记录当前经度纬度进入vuex
        this.RECORD_ADDRESS(res);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.food_container {
  padding-top: 1.6rem;
}
</style>