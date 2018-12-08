<template>
  <div class="container">
    <a-row>
      <div class="profile__banner">
        <img v-if="profile.image" :src="profile.image" alt>
        <h4>{{ profile.username }}</h4>
        <p>{{ profile.bio }}</p>
        <div>
          <router-link :to="{ name: 'user-settings' }" v-if="isOwner">
            <a-button type="primary" icon="setting">Edit Profile Settings</a-button>
          </router-link>
        </div>
      </div>
      <ul class="home__tab">
        <li>
          <router-link
            :to="{ name: 'profile' }"
            exact
            class="home__tab__item"
            active-class="active"
          >
            My Article
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'profile-favorites' }"
            exact
            class="home__tab__item"
            active-class="active"
          >
            Favorite Articles
          </router-link>
        </li>
      </ul>
      <router-view></router-view>
    </a-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["profile", "user"]),
    isOwner(){
      return (this.user.username === this.profile.username);
    }
  },
  methods: {
    ...mapActions({
      getProfile: "FETCH_PROFILE"
    }),
    ...mapMutations({
      resetProfile: 'SET_PROFILE',
    })
  },
  watch: {
    $route(to, from){
      this.resetProfile({});
      this.getProfile(this.$route.params.username);
    }
  },
  mounted() {
    this.getProfile(this.$route.params.username);
  }
};
</script>
<style lang="scss" scoped>
  .profile__banner {
    text-align: center;
    background-color: #f3f3f3;
    padding: 30px 0;
    border-radius: 5px;
    img {
      max-width: 100px;
      width: 100px;
      height: 100px;
      border-radius: 100px;
      margin-bottom: 1rem;
    }
    h4 {
      color: #000;
      font-weight: 700;
      font-size: 1.5rem;
    }
    p {
      color: #aaa;
      margin: 0 auto 0.5rem;
      max-width: 450px;
      font-weight: 700;
      font-weight: 300;
    }
  }
  .home__tab {
    display: flex;
    align-items: center;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    margin: 0;
    padding: 0;
    margin-bottom: -1px;
    &__item {
      border-bottom: 2px solid transparent;
      font-weight: 500;
      transition: color .3s cubic-bezier(.645,.045,.355,1);
      margin: 0 32px 0 0;
      padding: 12px 16px;
      display: inline-block;
      text-decoration: none;
      min-width: 100px;
      text-align: center;
      &.active, &:hover, &:active {
        color: #1890ff;
        border-color: #1890ff;
      }
    }
  }
  .home__tags {
    padding: 0 20px;
    h4 {
      font-size: 16px;
    }
  }
</style>
