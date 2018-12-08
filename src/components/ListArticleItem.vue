<template>
  <a-list-item class="article_item" slot="renderItem" slot-scope="item, index">
    <a-list-item-meta>
      <a slot="description">
        <router-link :to="{ name: 'article-detail', params: { slug: article.slug } }">
        {{article.title}}
        </router-link>
      </a>
      <a slot="title" v-if="article.author && article.author.username" >
        <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
        {{article.author.username}}
        </router-link>
      </a>
      <a-avatar slot="avatar" v-if="article.author && article.author.image" :src="article.author.image" />
    </a-list-item-meta>
    <div class="article_item__follow-button">
      <!-- <FollowButton /> -->
    </div>
    <p>{{ article.body }}</p>
    <ul class="tags__list--article" v-if="article.tagList.length > 0">
      <li v-for="(tag, index) in article.tagList" :key="index">
        <a-badge :count="tag" :numberStyle= "{backgroundColor: '#5cb85c'} " />
      </li>
    </ul>
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
    flex-direction: column;
  }
</style>

<style lang="scss" scoped>
  .tags__list--article{
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: right;
    li {
      display: inline-block;
      margin: 3px;
      cursor: pointer;
    }
  }
</style>
