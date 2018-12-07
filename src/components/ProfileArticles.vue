<template>
  <div class="home-feed">
    <ListArticle :type="'feed'"/>
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
