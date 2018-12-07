import { FETCH_ARTICLES, FETCH_TAGS } from "../actionTypes";
import {
  FETCH_LIST_ARTICLE_START, FETCHED_LIST_ARTICLE,
  FETCH_TAGS_START, FETCHED_TAGS,
} from "../mutations";
import { TagsApi, ArticleApi } from "../../api/ApiService";

const state = {
  tags: [],
  articles: [],
  isLoading: false,
  articlesCount: 0,
};

const getters = {
  tags: state => state.tags,
  articles: state => state.articles,
  articlesCount: state => state.articlesCount,
  isLoading: state => state.isLoading,
};

// update state 
const mutations = {
  [FETCH_LIST_ARTICLE_START](state){
    state.isLoading = true;
    state.articles = [];
  },
  [FETCH_TAGS_START](state){
    state.isLoading = true;
  },
  [FETCHED_TAGS](state, tags){
    state.tags = tags;
    state.isLoading = false;
  },
  [FETCHED_LIST_ARTICLE](state, { articles, articlesCount }){
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  }
};

// commit mutation to mutation state
const actions = {
  // handle async fetch tag to commit mutation state
  async [FETCH_TAGS]({ commit }){
    commit(FETCH_TAGS_START);
    try {
      const tags = await TagsApi.getTags();
      commit(FETCHED_TAGS, tags);
    } catch (error) {
      commit(FETCHED_TAGS, []);
    }
  },
  // fetch list articles
  async [FETCH_ARTICLES]({ commit }, params){
    commit(FETCH_LIST_ARTICLE_START);
    try {
      const response  = await ArticleApi.getArticles(params.type, params.options);
      commit(FETCHED_LIST_ARTICLE, response);
    } catch (error) {
      commit(FETCHED_LIST_ARTICLE, { articles: [], articlesCount: 0 });
    }
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
}