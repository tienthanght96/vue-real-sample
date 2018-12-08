<template>
  <a-card class="comment">
    <p class="comment-body">{{comment.body}}</p>
    <div class="comment-author">
      <a-row type="flex" align="middle">
        <a-avatar :src="comment.author.image" />
        <router-link :to="{ name: 'profile', params: { username: comment.author.username } }">
          <span class="author-username">{{ comment.author.username }}</span>
        </router-link>
        <span class="date-time">{{ comment.createdAt }}</span>
        <a-button
          shape="circle"
          icon="delete"
          type="danger"
          v-if="isOwner"
          size="small"
          :style="{ marginLeft: '20px' }"
          @click="onHandleDeleteComment(comment.id)"
          :loading="isDeleting"
          :disabled="isDeleting"
        />
      </a-row>
    </div>
  </a-card>
</template>

<script>
  export default {
    props: {
      comment: { type: Object, required: true },
      isOwner: { type: Boolean, required: false, default: false },
      isDeleting: { type: Boolean, required: false, default: false }
    },
    methods: {
      onHandleDeleteComment(comment_id){
        this.$emit("onDeleteComment", comment_id);
      }
    }
  }
</script>

<style scoped lang="scss">
  .comment {
    margin-bottom: 10px;
    .comment-author {
      box-shadow: none!important;
      font-size: .8rem;
      font-weight: 300;
      padding: .75rem 1.25rem;
      background-color: #f5f5f5;
      border-radius: 3px;
      a {
        display: inline-block;
        margin: 0 10px;
      }
    }
  }
</style>
