<template>
    <a-layout-header class="header">
      <div class="header__logo">
        <router-link  exact :to="{ name: 'home' }">
          conduit
        </router-link>
      </div>
      <a-menu
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '64px', backgroundColor: '#fff' }"
        class="header__menu"
      >
        <a-menu-item key="1">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            <a-icon type="home" :style="{ marginRight: 10 }"/>
            Home
          </router-link>
        </a-menu-item>
        <!-- not isAuthenticated -->
        <template v-if="!isAuthenticated">
          <a-menu-item key="2">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'signin' }"
            >
              <a-icon type="login" :style="{ marginRight: 10 }"/>
              Sign in
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'signup' }"
            >
              <a-icon type="user-add" :style="{ marginRight: 10 }"/>
              Sign up
            </router-link>
          </a-menu-item>
        </template>
        <!-- isAuthenticated -->
        <template v-else-if="isAuthenticated">
          <a-menu-item key="4">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'user-edit-article' }"
            >
              <a-icon type="edit" :style="{ marginRight: 10 }"/>
              New Article
            </router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'user-settings' }"
            >
              <a-icon type="setting" :style="{ marginRight: 10 }"/>
              Settings
            </router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'profile', params: { username:  user.username } }"
            >
              <a-icon type="profile" :notificationtyle="{ marginRight: 10 }"/>
              {{ user.username }}
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <a-button type="dashed" icon="logout" @click="onLogout" />
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-header>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['user', 'isLogin']),
      isAuthenticated(){
        return (this.user.id && this.isLogin);
      }
    },
    methods: {
      ...mapMutations({ logout: 'REMOVE_USER' }),
      onLogout(){
        this.logout();
        setTimeout(() =>{
          this.$router.push({ name: 'home' });
        }, 300)
      }
    }
  }
</script>

<style lang="scss">
  .header {
    background-color: #fff !important;
    padding:  0 !important;
    display: flex;
    &__logo {
      padding:0 2rem;
      display: inline-block;
      border-bottom: 1px solid #e8e8e8;
      a {
        color: #5cb85c;
        text-decoration: none !important;
        font-weight: bold;
        font-size: 1.5rem;
        &:hover {
          color: #5cb85c !important;
        }
      }
    }
    &__menu {
      /* padding-right: 15rem !important; */
      padding-right: 5rem !important;
      display: flex;
      flex: 1;
      max-width: 100%;
      justify-content: flex-end;
    }
  }
</style>