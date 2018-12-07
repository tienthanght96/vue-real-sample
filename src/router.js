import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          name: "home",
          exact: true,
          component: () => import("./components/HomeGlobal.vue"),
        },
        {
          path: "tag/:tag",
          name: "home-tag",
          exact: true,
          component: () => import("./components/HomeTag.vue"),
        },
        {
          path: "my-feed",
          name: "my-feed",
          exact: true,
          component: () => import("./components/HomeFeed.vue"),
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/user",
      name: "user",
      component: () => import("./views/User.vue"),
      children: [
        {
          path: "signin",
          component: () => import("./views/SignIn.vue"),
          name: "signin"
        },
        {
          path: "signup",
          component: () => import("./views/SignUp.vue"),
          name: "signup"
        },
        {
          path: "user_editor",
          component: () => import("./views/Editor.vue"),
          name: "user_editor"
        },
        {
          path: "new-article",
          component: () => import("./views/Editor.vue"),
          name: "user-new-article"
        },
        {
          path: "settings",
          component: () => import("./views/Settings.vue"),
          name: "user-settings"
        },
        {
          path: "profile/:username",
          component: () => import("./views/Profile.vue"),
          children: [
            {
              path: '/',
              name: "profile",
              exact: true,
              component: () => import("./components/ProfileArticles.vue"),
            },
            {
              path: 'favorites',
              name: "profile-favorites",
              exact: true,
              component: () => import("./components/ProfileFavorite.vue"),
            }
          ]
        },
      ]
    }
  ]
});
