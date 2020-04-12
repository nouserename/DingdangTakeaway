<template>
  <div>
  <!-- head -->
    <head-top signin-up="msite">
      <router-link
        :to="{name:'search',params:{geohash}}"
        class="link_search"
        slot="search"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"></circle>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"></line>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <!-- 分类列表 -->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide food_types_container"
            v-for="(item, index) in foodTypes"
            :key="index"
          >
          <!-- 点击任何一个分类跳转到 /food 页面 并且传入 经纬度信息 以及分类名称-->
            <router-link
              :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}"
              v-for="foodItem in item"
              :key="foodItem.id"
              class="link_to_food"
            >
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <!-- 分页小圆点 -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
  </div>
</template>

<script>
//使用 vue mapMutations 他会自动映射成 this.$store.commit('xxx')
import { mapMutations } from "vuex";
import headTop from "../../components/header/head";
import { msiteAddress, msiteFoodTypes, cityGuess } from "../../service/getData";
//引入swiper
import Swiper from "swiper";
//引入swiper.css
import "./../../../node_modules/swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "请选择地址...", // msite页面头部标题
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址 饿了么提供的图片
    };
  },
  // 函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。 
  async beforeMount() {
    //获取路由传递的query类参数
    if (!this.$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + "," + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    //保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    // vuex 记录当前经度纬度
    this.RECORD_ADDRESS(res);

    this.hasGetData = true;
  },
  mounted() {
    //获取导航食品类型列表
    msiteFoodTypes(this.geohash)
      .then(res => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      })
      .then(() => {
        //初始化swiper
        new Swiper(".swiper-container", {
          pagination: {
              //分页原点 挂载点
            el: ".swiper-pagination"
          },
            //无缝滚动
          loop: true
        });
      });
  },
  components: {
    headTop,
    footGuide
  },
  methods: {
    //...扩展符 mapMutations 会自动映射Mutations
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"]),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.link_search {
  left: 0.8rem;
  @include wh(0.9rem, 0.9rem);
  @include ct;
}
.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;
  .title_text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}
.msite_nav {
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
    .swiper-pagination {
      @include wh(100%, auto);
      bottom: 0.2rem;
    }
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}
.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img {
        margin-bottom: 0.3rem;
        @include wh(1.8rem, 1.8rem);
      }
      figcaption {
        text-align: center;
        @include sc(0.55rem, #666);
      }
    }
  }
}
</style>