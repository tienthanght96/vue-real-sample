<template>
  <div class="home-global">
    <ListArticle :type="'all'"/>
  </div>
</template>
<script>
  import ListArticle from './ListArticle';
  export default {
    components: {
      ListArticle
    }
  }
</script>
