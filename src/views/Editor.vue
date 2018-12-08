<template>
  <div class="container">
    <div
      v-if="isLoadingArticle" class="article-preview"
      :style="{textAlign: 'center'}"
    >
      <a-spin />
      <h4>Loading...</h4>
    </div>
    <a-row v-else>
      <a-col :span="12" :offset="6">
        <h1>Your Article</h1>
        <ErrorMessages :errors="errrosArticle" />
        <a-input placeholder="Title..." size="large" v-model="article.title">
          <a-icon slot="prefix" type='flag' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <a-input placeholder="Aritcle description..." size="large" v-model="article.description">
          <a-icon slot="prefix" type='exception' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <a-textarea placeholder="Write your article (in markdown)" :rows="4" size="large" v-model="article.body">
        </a-textarea>
        <br /><br />
        <a-input
          placeholder="Type tag press enter"
          size="large"
          v-model="tag"
          v-on:keypress.enter.prevent="onAddTag(tag)"
        >
          <a-icon slot="prefix" type='tags-o' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br><br>
        <label v-if="article.tagList.length > 0" :style="{color: '#f5222d'}" >Click item tag in tags list remove !</label>
        <ul class="tags__list--article" v-if="article.tagList.length > 0">
          <li v-for="(tag, index) in article.tagList" :key="index">
            <a-badge
              :count="tag"
              :numberStyle= "{backgroundColor: '#5cb85c'} "
              @click="onRemoveTag(tag, index)"
            >
            </a-badge>
          </li>
        </ul>
        <br />
        <div>
          <a-button
            type="primary"
            size="large"
            @click="onPostArticle"
            :loading="this.isSubmittingArticle"
            :disabled="disabled"
          >
            Save Article
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import ErrorMessages from '@/components/ErrorMessages.vue';
  import { getToken } from '@/utils/localStorage';

  export default {
    components: {
      ErrorMessages
    },
    data(){
      return {
        article: {
          body: '',
          description: '',
          tagList: [],
          title: '',
        },
        tag: ''
      }
    },
    computed: {
      ...mapGetters(['errrosArticle', 'isSubmittingArticle', 'isLoadingArticle']),
      ...mapGetters({
        dataArticle: 'article'
      }),
      disabled(){
        const { title, description, body } = this.article;
        return (title.trim().length < 1 || description.trim().length < 1 || body.trim().length < 1)
      }
    },
    methods: {
      ...mapActions({
        postArticle: 'POST_ARTICLE',
        getDetailArticle: 'FETCH_ARTICLE'
      }),
      onAddTag(tag){
        this.article.tagList.push(tag);
        this.tag = '';
      },
      onRemoveTag(tag, index){
        this.article.tagList.splice(index, 1);
      },
      onPostArticleSuccess(slug){
        this.$router.push({ name: 'article-detail', params: { slug }});
      },
      onPostArticle(){
        const paramsRoute = this.$route.params;
        const slug = paramsRoute.slug || '';
        this.postArticle({
          params: { ...this.article },
          slug,
          callback: this.onPostArticleSuccess
        });
      },
      resetData(){
        this.article.body = '';
        this.article.tagList = [];
        this.article.title = '';
        this.article.description = '';
        this.tag = '';
      }
    },
    watch: {
      user(){
        this.infoUser = { ...this.user };
      },
      dataArticle(){
        console.log('object', this.dataArticle);
        const { dataArticle } = this;
        if(dataArticle && dataArticle.slug) {
          this.article.title = dataArticle.title;
          this.article.body = dataArticle.body;
          this.article.tagList = dataArticle.tagList;
          this.article.description = dataArticle.description;
        }
      },
      $route(to, from, next){
        this.resetData();
        if(to.params.slug){
          this.getDetailArticle(to.params.slug);
        }
      }
    },
    mounted(){
      if(this.$route.params.slug){
        this.getDetailArticle(this.$route.params.slug);
      }
      // this.infoUser = { ...this.user };
    }
  }
</script>
<style lang="scss" scoped>
.tags__list--article{
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    li {
      display: inline-block;
      margin: 3px;
      cursor: pointer;
    }
  }
</style>

