<template>
  <a-layout id="app" :style="{ backgroundColor: '#fff' }">
    <app-header></app-header>
    <a-layout-content class="app__content">
      <div class="container">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
  import { mapActions } from 'vuex';
  import Header from "@/components/Header.vue";
  import { getToken } from '@/utils/localStorage';
  export default {
    components: {
      "app-header": Header,
    },
    methods: {
      ...mapActions({
        'getUserInfo': 'GET_USER_INFO'
      })
    },
    mounted(){
      if(getToken()){
        this.getUserInfo();
      }
    }
  };
</script>
<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* max-width: 1170px; */
    /* margin: 0 auto; */
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .app__content {
    padding: 50px;
    .container{
      max-width: 1170px;
      margin: 0 auto;
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease-in-out;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
