<template>
  <div class="home-global" v-if="$route.params.tag">
    <ListArticle :type="$route.params.tag"/>
  </div>
</template>
<script>
  import ListArticle from './ListArticle';
  export default {
    components: {
      ListArticle
    },
  }
</script>
