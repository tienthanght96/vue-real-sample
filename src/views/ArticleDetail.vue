<template>
  <div class="article-detail">
    <div
      v-if="isLoadingArticle" class="article-preview"
      :style="{textAlign: 'center'}"
    >
      <a-spin />
      <h4>Loading...</h4>
    </div>
    <template v-else-if="article.slug">
      <ArticleDetailMeta :article="article"/>
      <br>
      <div class="article-detail__content">
        <p class="desc">{{ article.body }}</p>
        <ul class="tags__list" v-if="article.tagList && article.tagList.length > 0">
          <li v-for="(tag, index) in article.tagList" :key="index">
            <a-badge :count="tag" :numberStyle= "{backgroundColor: '#5cb85c'} " />
          </li>
        </ul>
      </div>
      <br><br>
      <FormPostComment/>
      <br><br>
      <ListComment />
    </template>
  </div>
</template>

<script>
  import ArticleDetailMeta from '@/components/ArticleDetailMeta.vue';
  import ListComment from '@/components/ListComment.vue';
  import FormPostComment from '@/components/FormPostComment.vue';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    components: {
      ArticleDetailMeta,
      ListComment,
      FormPostComment
    },
    computed: {
      ...mapGetters(['article', 'isLoadingArticle'])
    },
    methods: {
      ...mapActions({
        getDetailArticle: 'FETCH_ARTICLE'
      })
    },
    mounted(){
      this.getDetailArticle(this.$route.params.slug);
    }
  }
</script>
<style lang="scss" scoped>
  .article-detail {
    &__content {
      p.desc{
        font-size: 1.2rem;
        line-height: 1.8rem;
      }
    }
  }
</style>
