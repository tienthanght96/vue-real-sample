import { POST_ARTICLE, FETCH_ARTICLE, FETCH_COMMENTS, POST_COMMENT, DELETE_COMMENT, TOGGLE_FAVORITE_ARTICLE } from '../actionTypes';
import { ArticleApi } from '../../api/ApiService';
import { SET_ERRORS_ARTICLE, SET_SUBMITTING_ARTICLE, FETCH_ARTICLE_START, FETCHED_ARTICLE, FETCH_COMMENTS_START, FETCHED_COMMENTS, UPDATE_LIST_COMMENTS, SET_ERRORS_POST_COMMENT, UPDATE_ARTICLE_INFO } from '../mutations';
import { getErrors } from '../../utils';

const state = {
  isSubmittingArticle: false,
  errrosArticle: [],
  isLoadingArticle: false,
  article: {},
  comments: [],
  errorsPostComment: [],
  isLoadingComments: false
};

const getters = {
  isSubmittingArticle: state => state.isSubmittingArticle,
  errrosArticle: state => state.errrosArticle,
  article: state => state.article,
  isLoadingArticle: state => state.isLoadingArticle,
  comments: state => state.comments,
  isLoadingComments: state => state.isLoadingComments,
};

const actions = {
  async [POST_ARTICLE]({commit}, { params, slug, callback }) {
    commit(SET_SUBMITTING_ARTICLE);
    try {
      const response = await (
        slug
        ? ArticleApi.updateArticle(slug, params)
        : ArticleApi.createNewArticle(params)
      );
      commit(SET_ERRORS_ARTICLE, []);
      callback(response.slug);
    } catch (error) {
      const formatedErrors = getErrors(error);
      commit(SET_ERRORS_ARTICLE, formatedErrors);
    }
  },
  async [FETCH_ARTICLE]({commit}, slug) {
    commit(FETCH_ARTICLE_START);
    try {
      const article = await ArticleApi.getDetailArticle(slug);
      commit(FETCHED_ARTICLE, article);
    } catch (error) {
      const formatedErrors = getErrors(error);
      commit(SET_ERRORS_ARTICLE, formatedErrors);
    }
  },
  async [FETCH_COMMENTS]({commit}, slug) {
    commit(FETCH_COMMENTS_START);
    try {
      const comments = await ArticleApi.getCommentArticle(slug);
      commit(FETCHED_COMMENTS, comments);
    } catch (error) {
      commit(FETCHED_COMMENTS, []);
    }
  },
  async [POST_COMMENT]({commit}, { slug, body, callback }) {
    try {
      const comment = await ArticleApi.postComment(slug, body);
      commit(UPDATE_LIST_COMMENTS, { type: 'add_comment', comment });
      callback(comment);
    } catch (error) {
      const formatedErrors = getErrors(error);
      commit(SET_ERRORS_POST_COMMENT, formatedErrors);
      callback(formatedErrors);
    }
  },
  async [DELETE_COMMENT]({commit}, { slug, comment_id, callback }) {
    try {
      const statusDelete = await ArticleApi.deleteComment(slug, comment_id);
      commit(UPDATE_LIST_COMMENTS,{
        type: 'remove_comment', comment: { id: comment_id }
      });
      callback(statusDelete);
    } catch (error) {
      callback(404);
    }
  },
  async [TOGGLE_FAVORITE_ARTICLE]({commit}, { type, slug, callback }) {
    try {
      const article = await ArticleApi.favoriteArticle(slug, type);
      commit(UPDATE_ARTICLE_INFO, article);
      callback(article);
    } catch (error) {
      const formatedErrors = getErrors(error);
      callback(formatedErrors);
    }
  }
};

const mutations = {
  [SET_SUBMITTING_ARTICLE](state) {
    state.isSubmittingArticle = true;
  },
  [SET_ERRORS_ARTICLE](state, errors){
    state.errors = errors;
    state.isSubmittingArticle = false
    state.isLoadingArticle = false;
  },
  [FETCH_ARTICLE_START](state){
    state.isLoadingArticle = true;
  },
  [FETCHED_ARTICLE](state, article) {
    state.article = article;
    state.isLoadingArticle = false;
    state.errors = [];
  },
  [FETCH_COMMENTS_START](state){
    state.isLoadingComments = true;
  },
  [FETCHED_COMMENTS](state, comments) {
    state.isLoadingComments = false;
    state.comments = comments;
  },
  [UPDATE_LIST_COMMENTS](state, {type, comment }){
    if(type === 'add_comment'){
      state.comments = state.comments.concat([comment]);
    } else if (type === 'remove_comment'){
      state.comments = state.comments.filter(c => c.id !== comment.id);
    }
    state.errorsPostComment = [];
  },
  [SET_ERRORS_POST_COMMENT](state, errors) {
    state.errorsPostComment = errors;
  },
  [UPDATE_ARTICLE_INFO](state, article){
    state.article = { ...article };
  }
};

export default { state, getters, actions, mutations };