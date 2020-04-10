<template>
    <div>
        <!--<transition name="router-fade" mode="out-in"> 为路由切换设置过渡效果  -->
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

</script>

<style lang="scss">
    /** 使用@import 将前面写的公共样式引入，清除默认样式**/
      @import './style/common';
    /** 路由切换过渡效果 透明过渡 **/
    .router-fade-enter-active, .router-fade-leave-active {
          transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
          opacity: 0;
    }
</style>