<template>
   <div class="article__banner">
      <h4 class="title">{{ article.title }}</h4>
      <template v-if="article.author">
        <a-row class="meta">
          <a-col :span="24" class="author__container">
            <a-avatar :src="article.author.image" />
            <div class="author">
              <a-col :span="24">
                <router-link
                  :to="{
                    name: 'profile',
                    params: { username: article.author.username } }
                  "
                >
                  {{ article.author.username }}
                </router-link>
              </a-col>
              <a-col :span="24">
                {{ article.createdAt }}
              </a-col>
            </div>
          </a-col>
          <a-col :span="24" class="group__buttons" >
            <br>
            <FavoriteArticleButton
              :type="'article-detail'"
              :favorited="article.favorited"
              :favoritesCount="article.favoritesCount"
              :isAuthenticated="!!user.id"
              :isToggleFavoriting="isToggleFavoriting"
              @onToggleFavorite="onToggleFavorite"
            />
             <FollowButton
              :author="article.author"
              :isAuthenticated="!!user.id"
              :isToggleFollowing="isToggleFollowing"
              v-if="article.author.username !== user.username"
              @onToggleFollowAuthor="onToggleFollowAuthor"
            />

            <router-link
              v-if="article.author.username === user.username"
              :to="{ name: 'user-edit-article', params: { slug: article.slug } }"
            >
              <a-button type="primary" icon="edit">Edit Article</a-button>
            </router-link>
          </a-col>
        </a-row>
      </template>
    </div>
</template>
<script>
  import FavoriteArticleButton from './FavoriteArticleButton.vue';
  import FollowButton from './FollowButton.vue';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        isToggleFavoriting: false,
        isToggleFollowing: false
      }
    },
    props: {
      article: { type: Object, required: true }
    },
    components: {
      FavoriteArticleButton,
      FollowButton
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      ...mapActions({
        toggleFavoriteArticle: 'TOGGLE_FAVORITE_ARTICLE',
        toggleFollowAuthor: 'TOGGLE_FOLLOW_AUTHOR',
      }),
      onToggleFavorite(){
        const { article } = this;
        this.isToggleFavoriting = true;
        this.toggleFavoriteArticle({
          slug: article.slug,
          type: article.favorited ? 'unfavorite' : 'favorite',
          callback: this.onHandleToggleFavoriteCallback
        });
      },
      onToggleFollowAuthor(){
        const { article } = this;
        this.isToggleFollowing = true;
        this.toggleFollowAuthor({
          username: article.author.username,
          type: article.author.following ? 'unfollow' : 'follow',
          callback: this.onHandleToggleFollowCallback
        });
      },
      onHandleToggleFollowCallback(data){
        if(data.username){
          const message = data.following ? 'Follow success !' : 'Unfollow success !';
          this.$message.success(message);
        } else {
          this.$message.error("Try again !")
        }
        this.isToggleFollowing = false;
      },
      onHandleToggleFavoriteCallback(data){
        if(data.slug){
          const message = data.favorited ? 'Favorited success !' : 'Unfavorited success !';
          this.$message.success(message);
        } else {
          this.$message.error("Try again !")
        }
        this.isToggleFavoriting = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .article__banner {
    background: #333;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 5px;
    a {
      color: #fff;
    }
    .title { 
      text-shadow: 0 1px 3px rgba(0,0,0,.3);
      margin-bottom: 0;
      font-size: 2rem;
      font-weight: 600;
      color: #fff;
    }
    .meta {
      margin: 2rem 0 0;
      color: #fff;
      .author__container {
        display: flex;
        align-items: center;
        .author {
          margin-left: 20px;
        }
      }
    }

    .group__buttons {
      text-align: right;
      button {
        margin-right: 5px;
      }
    }
  }
</style>
