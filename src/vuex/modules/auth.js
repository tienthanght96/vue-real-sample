import { getToken, saveToken, removeToken } from "../../utils/localStorage";
import { SET_ERRORS, SET_USER, REMOVE_USER, SET_SUBMITTING, RESET_ERROR, RESET_ERRORS } from "../mutations";
import { LOGIN, GET_USER_INFO, UPDATE_USER_INFO, REGISTER } from "../actionTypes";
import { UserApi, setHeader } from "../../api/ApiService";
import { getErrors } from "../../utils";

const state = {
  user: {},
  isLogin: !!getToken(),
  errors: [],
  isSubmitting: false
};

const getters = {
  user: state => state.user,
  isLogin: state => state.isLogin,
  errors: state => state.errors,
  isSubmitting: state => state.isSubmitting 
};

const actions = {
  async [LOGIN]({commit}, { user, callback }){
    try {
      const userData = await UserApi.login(user);
      commit(SET_USER, userData);
      callback(userData);
    } catch (error) {
      const formatedError = getErrors(error)
      commit(SET_ERRORS, formatedError);
    }
  },
  async [REGISTER]({commit}, { user, callback }){
    try {
      const userData = await UserApi.register(user);
      commit(SET_USER, userData);
      callback(userData);
    } catch (error) {
      const formatedError = getErrors(error)
      commit(SET_ERRORS, formatedError);
    }
  },
  async [GET_USER_INFO]({ commit }){
    commit(SET_SUBMITTING);
    try {
      const userData = await UserApi.getUserInfo();
      commit(SET_USER, userData);
    } catch (error) {
      const formatedError = getErrors(error)
      commit(SET_ERRORS, formatedError);
    }
  },
  async [UPDATE_USER_INFO]({ commit }, { user, callback }){
    commit(SET_SUBMITTING);
    try {
      const userData = await UserApi.updateUserInfo(user);
      commit(SET_USER, userData);
      callback();
    } catch (error) {
      const formatedError = getErrors(error)
      commit(SET_ERRORS, formatedError);
    }
  },
};

// similar action to change state by payload,....
const mutations = {
  [RESET_ERRORS](){
    state.errors = [];
  },
  [SET_SUBMITTING](state){
    state.isSubmitting = true;
  },
  [SET_ERRORS](state, errors){
    state.errors = errors;
    state.isSubmitting = false;
  },
  [SET_USER](state, user){
    state.user = user;
    state.isLogin = true;
    state.isSubmitting = false;
    state.errors = [];
    // save token
    saveToken(user.token);
    setHeader(user.token);
  },
  [REMOVE_USER](state) {
    state.user = {};
    state.isLogin = false;
    state.errors = [];
    // remove user token
    removeToken();
    setHeader('');
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};