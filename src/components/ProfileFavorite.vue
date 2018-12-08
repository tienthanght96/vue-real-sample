<template>
  <div class="home-feed">
    <ListArticle :type="'favorited'" :favorited="$route.params.username"/>
  </div>
</template>
<script>
  import ListArticle from './ListArticle.vue';
  export default {
    components: {
      ListArticle
    },
  }
</script>
