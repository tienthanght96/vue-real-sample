<template>
  <a-button
    icon="plus"
    @click="onToggleFollowAuthor"
    :type=" author.following ? 'primary' : 'default' "
    :loading="isToggleFollowing"
  >
    {{ author.following ? 'Unfollow ' : 'Follow ' }}
    ({{ author.username }})
  </a-button>
</template>
<script>
  export default {
    props: {
      author: { type: Object, required: true },
      isAuthenticated: { type: Boolean, required: true, default: false },
      isToggleFollowing: { type: Boolean, required: false, default: false },
    },
    methods: {
      onToggleFollowAuthor(){
        if(!this.isAuthenticated){
          this.$messsage.error("Please login first !");
          return;
        }
        this.$emit('onToggleFollowAuthor');
      }
    }
  }
</script>
