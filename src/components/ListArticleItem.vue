<template>
  <a-list-item class="article_item" slot="renderItem" slot-scope="item, index">
    <a-list-item-meta :description="article.title">
      <a slot="title" v-if="article.author && article.author.username" >{{article.author.username}}</a>
      <a-avatar slot="avatar" v-if="article.author && article.author.image" :src="article.author.image" />
    </a-list-item-meta>
    <div class="article_item__follow-button">
      <FollowButton />
    </div>
    <p>{{ article.body }}</p>
  </a-list-item>
</template>

<script>
  import FollowButton from './FollowButton';
  export default {
   props: {
     article: { type: Object, required: true }
   },
   components: {
     FollowButton
   }
  }
</script>
<style lang="scss">
  .article_item {
    display: block;
    border-bottom: 1px solid #e8e8e8;
    padding-right: 10px;
    position: relative;
    &__follow-button {
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }
  .ant-list-item-content{
    justify-content: flex-start !important;
  }
</style>

