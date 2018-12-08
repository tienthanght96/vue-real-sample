<template>
  <div v-if="user.id">
    <a-textarea
      placeholder="Write your comment..."
      :rows="4"
      size="large"
      v-model="body"
      :loading="isSubmitting"
      v-on:keypress.enter.prevent="onHandlePostComment"
    />
    <a-row type="flex" justify="space-between" class="footer-comment">
      <div>
        <a-avatar :src="user.image" />
        <span :style="{ marginLeft: '10px' }">{{ user.username }}</span>
      </div>

      <a-button
        type="primary"
        @click="onHandlePostComment"
        :disabled="disabled"
        :loading="isSubmitting"
      >
        Post Comment
      </a-button>
    </a-row>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data(){
      return {
        body: '',
        isSubmitting: false,
      }
    },
    computed: {
      ...mapGetters([ 'user' ]),
      disabled(){
        return this.body.trim().length < 1;
      }
    },
    methods: {
      ...mapActions({
        postComment: 'POST_COMMENT'
      }),
      onPostCommentSuccess(){
        this.body = '';
        this.isSubmitting = false;
      },
      onHandlePostComment(){
        this.isSubmitting = true;
        this.postComment({
          slug: this.$route.params.slug,
          body: this.body,
          callback: this.onPostCommentSuccess
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer-comment {
    font-weight: 300;
    padding: .75rem 1.25rem;
    background-color: #f5f5f5;
    font-weight: bold;
    button {
      font-weight: bold;
    }
  }
</style>
