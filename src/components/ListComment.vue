<template>
  <div class="comment-list">
    <div
      v-if="isLoadingComments" class="article-preview"
      :style="{textAlign: 'center'}"
    >
      <a-spin />
    </div>
    <template v-else>
      <h3>Comments ({{ comments.length }})</h3>
      <ListCommentItem
        v-for="(comment) in sortedComments"
        :key="comment.id"
        :comment="comment"
        :isOwner="comment.author.username === user.username"
        :isDeleting="isDeleting"
        @onDeleteComment="onHandleDeleteComment($event)"
      />
    </template>
  </div>
</template>

<script>
  import ListCommentItem from './ListCommentItem.vue';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data(){
      return {
        isDeleting: false,
      }
    },
    components: {
      ListCommentItem
    },
    methods: {
      ...mapActions({
        getComments: 'FETCH_COMMENTS',
        deleteComment: 'DELETE_COMMENT'
      }),
      onHandleDeleteComment(comment_id){
        this.isDeleting = true;
        this.deleteComment({
          slug: this.$route.params.slug,
          comment_id,
          callback: this.onHandleeCallbackDeleteComment
        })
      },
      onHandleeCallbackDeleteComment(statusDelete){
        if(statusDelete < 200 || statusDelete > 300) {
          this.$message.error("Can not delete comment. Try again !");
        } else {
          this.$message.success("Your comment was deleted !");
        }
        this.isDeleting = false;
      }
    },
    computed: {
      ...mapGetters([ 'comments', 'isLoadingComments', 'user' ]),
      sortedComments(){
        return this.comments.sort(function(first, second){
          return second.id - first.id;
        })
      }
    },
    mounted(){
      this.getComments(this.$route.params.slug);
    }
  }
</script>

<style>

</style>
