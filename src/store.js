import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import home from "./vuex/modules/home";
import auth from "./vuex/modules/auth";
import profile from "./vuex/modules/profile";

export default new Vuex.Store({
  modules: {
    auth,
    home,
    profile
  }
});
