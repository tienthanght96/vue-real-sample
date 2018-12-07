<template>
  <div class="container">
    <a-row>
      <div class="profile__banner">
        <img src="https://pbs.twimg.com/profile_images/549561819010854912/AJonc96g_400x400.png" alt="">
        <h4>{{ profile.username }}</h4>
        <p>{{ profile.bio }}</p>
        <div>
          <a-button type="primary" icon="setting">Edit Profile Settings</a-button>
        </div>
      </div>
      <a-col :span="12" :offset="6">
        <h1>Your Profile</h1>
      </a-col>
      <router-view></router-view>
    </a-row>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    computed: {
       ...mapGetters([ 'profile' ])
    },
    methods: {
      ...mapActions({
        getProfile: 'FETCH_PROFILE',
      })
    },
    mounted(){
      this.getProfile(this.$route.params.username);
    }
  }
</script>
<style lang="scss" scoped>
  .profile__banner {
    text-align: center;
    background-color: #f3f3f3;
    padding: 30px 0;
    border-radius: 5px;
    img {
      max-width: 100px;
    }
    h4 {
      color: #000;
      font-weight: 700;
      font-size: 1.5rem;
    }
    p {
      color: #aaa;
      margin: 0 auto .5rem;
      max-width: 450px;
      font-weight: 700;
      font-weight: 300;
    }
  }
</style>
