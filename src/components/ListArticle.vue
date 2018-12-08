<template>
  <div>
    <div v-if="isLoading && articles.length < 1" class="article-preview">
      <a-spin />
    </div>
    <div v-else-if="articles.length > 0" :style="{marginTop: '30px'}" class="list__article">
      <ListArticleItem
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
      <br><br>
      <Pagination
        :currentPage="currentPage"
        :totalPage="articlesCount"
        :pageSize="pageSize"
        @changePage="currentPage = $event"
        @changePageSize="pageSize = $event"
      />
      <a-back-top />
    </div>
    <div v-else>
      <br>
      <p>No articles are here... yet.</p>
    </div>
  </div>
</template>
<script>
import ListArticleItem from "./ListArticleItem.vue";
import Pagination from "./Pagination.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ListArticleItem,
    Pagination
  },
  props: {
    type: { type: String, required: true, default: 'all' },
    tag: { type: String, required: false },
    author: { type: String, required: false },
    favorited: { type: String, required: false },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapGetters(["articlesCount", "isLoading", "articles"]),
    paramsArticle(){
      const { type, pageSize, author, favorited } = this;
      const options = {
        offset: (this.currentPage - 1) * pageSize,
        limit: pageSize
      };
      if(type !== 'all' && type !== 'feed' && type !== 'author' && type !== 'favorited'){
        options.tag = type;
      }
      if(author){
        options.author = author;
      }
      if(favorited){
        options.favorited = favorited;
      }
      return {
        type,
        options
      };
    }
  },
  watch: {
    pageSize(){
      this.resetListArticle();
      this.getListArticle();
    },
    type(){
      this.resetListArticle();
      this.getListArticle();
    },
    author(){
      this.resetListArticle();
      this.getListArticle();
    },
    currentPage(){
      this.getListArticle();
    }
  },
  methods: {
    ...mapActions({
      fetchArticles: 'FETCH_ARTICLES'
    }),
    getListArticle(){
      this.fetchArticles(this.paramsArticle);
    },
    resetListArticle(){
      this.currentPage = 1;
      this.paramsArticle.options.offset = 0;
    }
  },
  mounted(){
    this.getListArticle();
  }
};
</script>
<style lang="scss" scoped>
  .article-preview {
    text-align: center;
    padding: 30px;
  }
</style>


