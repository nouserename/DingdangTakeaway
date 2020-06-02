<!-- src目录下的根路由App.vue -->
<template>
    <div>
        <transition name="router-fade" mode="out-in">
                <router-view ></router-view>
        </transition>
        <!-- HTML对大小写不敏感，所以驼峰命名的组件名字，要改为短划线命名 -->
        <svg-icon></svg-icon>    
    </div>
</template>

<script>
    import svgIcon from './components/common/svgIcon';
      export default {
        // 必须注册才能使用
        components:{
            svgIcon
        },
      }

</script>

<style lang="scss">
    // 使用@import将前面写的公共样式引入，清楚默认样式
      @import './style/common';
    // 路由切换过度效果 透明过度
    .router-fade-enter-active, .router-fade-leave-active {
          transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
          opacity: 0;
    }
</style>