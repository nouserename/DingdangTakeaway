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
          //必须注册才能使用
        components:{
            svgIcon
        },
      }

</script>

<style lang="scss">
      @import './style/common';
    .router-fade-enter-active, .router-fade-leave-active {
          transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
          opacity: 0;
    }
</style>