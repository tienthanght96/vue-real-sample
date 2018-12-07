<template>
  <router-view></router-view>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    methods: {
      ...mapMutations({
        resetError: 'RESET_ERRORS'
      })
    },
    watch: {
      $route(to, from, next){
        if(to.path !== from.path){
          this.resetError();
        }
      }
    }
  }
</script>
