import { FETCH_PROFILE, TOGGLE_FOLLOW_AUTHOR, UPDATE_USER_INFO } from "../actionTypes";
import { ProfileApi } from "../../api/ApiService";
import { SET_PROFILE, SET_ERROR_PROFILE, UPDATE_ARTICLE_INFO } from "../mutations";
import { getErrors } from "../../utils";

const state = {
  profile: {},
  errorsProfile: []
};

const getters = {
  profile: state => state.profile,
  errorsProfile: state => state.errorsProfile
};

const actions = {
  async [FETCH_PROFILE]({ commit }, username) {
    try {
      const profile = await ProfileApi.getProfile(username);
      commit(SET_PROFILE, profile);
    } catch (error) {
      const formatedError = getErrors(error)
      commit(SET_ERROR_PROFILE, formatedError);
    }
  },
  async [TOGGLE_FOLLOW_AUTHOR]({ commit, rootState }, {username, type, callback}) {
    try {
      const profile = await ProfileApi.followAuthor(username, type);
      const article = {
        ...rootState.article.article,
        author: {
          ...profile
        }
      };
      commit(UPDATE_ARTICLE_INFO, article);
      callback(profile);
    } catch (error) {
      console.log('TOGGLE_FOLLOW_AUTHOR error', error);
      const formatedErrors = getErrors(error);
      callback(formatedErrors);
    }
  }
};

const mutations = {
  [SET_PROFILE](state, profile) {
    state.profile = profile;
  },
  [SET_ERROR_PROFILE](state, errors) {
    state.errorsProfile = errors;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
