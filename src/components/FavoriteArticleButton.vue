<template>
  <a-button
    v-if="type === 'article-detail'"
    icon="heart"
    @click="onToggleFavorite"
    :type=" favorited ? 'primary' : 'default' "
    :loading="isToggleFavoriting"
  >
    {{ favorited ? 'Unfavorite Article ' : 'Favorite Article ' }}
    ({{ favoritesCount }})
  </a-button>
  <a-button
    v-else-if="type === 'article-list'"
    icon="heart"
    size="small"
    @click="onToggleFavorite"
  >
    {{ favoritesCount }}
  </a-button>
</template>
<script>
  export default {
    props: {
      favorited : { type: Boolean, required: true, default: false },
      favoritesCount: { type: Number, required: true, default: 0 },
      isToggleFavoriting: { type: Boolean, required: false, default: false },
      isAuthenticated: { type: Boolean, required: true, default: false },
      type: { type: String, required: true, default: 'article-list' }
    },
    methods: {
      onToggleFavorite(){
        if(!this.isAuthenticated){
          this.$messsage.error("Please login first !");
          return;
        }
        this.$emit('onToggleFavorite');
      }
    }
  }
</script>

