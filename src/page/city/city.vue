<template>
      <div class="city_container">
        <!-- head 本页面head 有标题，使用 props 传给组件渲染 -->
        <!-- html 对标签名字大小写不敏感，所以要把 headTop 驼峰命名，写成短划线形式 head-top -->
        <head-top :head-title="cityname" go-back='true'>
            <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
        </head-top>
        <!-- v-on:submit.prevent 事件修饰符 阻止表单提交默认跳转行为 -->
        <form class="city_form" v-on:submit.prevent>
            <div>
            <!-- 使用 v-model 双向绑定表单数据方便数据收集 -->
                <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
            </div>
            <div>
                <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
            </div>
        </form>
        <!-- 从 localstorage 将存入的搜索历史 展现出来 -->
        <header v-if="historytitle" class="pois_search_history">搜索历史</header>
        <ul class="getpois_ul">
            <!-- 遍历根据地址关键词搜索的地址 placelist为后台根据关键字搜索返回的数据-->
            <!-- 点击确认选择地址后 跳转到外卖页 nextpage 使用js操作路由切换 this.$router.push({path:'/msite', query:{geohash}})  跳转到 /msite 还买写这个页面 下个实验进行具体实现外卖页-->
            <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <!-- 清空所有 搜索历史 -->
        <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
        <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import {currentcity, searchplace} from '../../service/getData'
    //引入实验二 封装的 localstorage 工具
    import {getStore, setStore, removeStore} from '../../config/mUtils'

    export default {
        data(){
            return{
                inputVaule:'', // 搜索地址
                cityid:'', // 当前城市id
                cityname:'', // 当前城市名字
                placelist:[], // 搜索城市列表
                placeHistory:[], // 历史搜索记录
                historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
                placeNone: false, // 搜索无结果，显示提示信息
            }
        },

        mounted(){
            //home 页 传过来的参数 guessCityid
            // <router-link :to="'/city/' + guessCityid" class="guess_city">
            // </router-link>
            this.cityid = this.$route.params.cityid;
            //获取当前城市名字
            currentcity(this.cityid).then(res => {
                this.cityname = res.name;
            })
            this.initData();
        },

        components:{
            headTop
        },

        computed:{

        },

        methods:{
            initData(){
                //获取搜索历史记录
                if (getStore('placeHistory')) {
                    this.placelist = JSON.parse(getStore('placeHistory'));
                }else{
                    this.placelist = [];
                }
            },
            //发送搜索信息inputVaule
            postpois(){
                //输入值不为空时才发送信息
                if (this.inputVaule) {
                    searchplace(this.cityid, this.inputVaule).then(res => {
                        this.historytitle = false;
                        this.placelist = res;
                        this.placeNone = res.length? false : true;
                    })
                }
            },
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            nextpage(index, geohash){
                let history = getStore('placeHistory');
                let choosePlace = this.placelist[index];
                if (history) {
                    let checkrepeat = false;
                    this.placeHistory = JSON.parse(history);
                    this.placeHistory.forEach(item => {
                        if (item.geohash == geohash) {
                            checkrepeat = true;
                        }
                    })
                    if (!checkrepeat) {
                        this.placeHistory.push(choosePlace)
                    }
                }else {
                    this.placeHistory.push(choosePlace)
                }
                setStore('placeHistory',this.placeHistory)
                //点击搜索历史 进入历史搜索这个城市
                this.$router.push({path:'/msite', query:{geohash}})
            },
            //清除历史
            clearAll(){
                removeStore('placeHistory');
                this.initData();
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
    }
    .change_city{
        right: 0.4rem;
        @include sc(0.6rem, #fff);
        @include ct;
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: 0.4rem;
        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                @include wh(100%, 1.4rem);
            }
            .city_input{
                border: 1px solid $bc;
                padding: 0 0.3rem;
                @include sc(0.65rem, #333);
            }
            .city_submit{
                background-color: $blue;
                @include sc(0.65rem, #fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid $bc;
        li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid $bc;
            .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               @include sc(0.65rem, #333);
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                @include sc(0.45rem, #999);
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
    .clear_all_history{
        @include sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
</style>