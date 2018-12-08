import axios from 'axios';
// import VueAxios from 'vue-axios';
// import Vue from 'vue';
import { API_URL } from '../config';
import { getToken } from '../utils/localStorage';

const CancelToken = axios.CancelToken;
export const sourceCancel = CancelToken.source();

export const ApiService = axios.create({
  baseURL: API_URL,
  headers: getToken() ? {
    Authorization: `Token ${getToken()}`
  }: {},
  cancelToken: sourceCancel.token
});

export const setHeader = (token) => {
  if(token){
    ApiService.defaults.headers.common['Authorization'] = `Token ${token}`
  } else {
    delete ApiService.defaults.headers.common["Authorization"];
  }
}

// tag api services
export const TagsApi = {
  getTags: async () => {
    try {
      const { data } = await ApiService.get('/tags');
      if(data.tags){
        return data.tags;
      }
      return [];
    } catch (error) {
      return [];
    }
  }
};

// article api service
export const ArticleApi = {
  getArticles: async (type = '', params = { offset: 0, limit: 10 }) => {
    try {
      const url = (type === 'feed') ? '/articles/feed' : '/articles';
      const { data } = await ApiService.get(url, { params });
      if(data.articles){
        return { articles: data.articles, articlesCount: data.articlesCount };
      }
      return { articles: [], articlesCount: 0 };
    } catch (error) {
      throw { articles: [], articlesCount: 0 };
    }
  },
  createNewArticle : async (params) => {
    try {
      const { data } = await ApiService.post('/articles', { article: params });
      return data.article;
    } catch (error) {
      throw error.response.data;
    }
  },
  updateArticle : async (slug, params) => {
    try {
      const { data } = await ApiService.put(`/articles/${slug}`, { article: params });
      return data.article;
    } catch (error) {
      throw error.response.data;
    }
  },
  getDetailArticle: async (slug) => {
    try {
      const { data } = await ApiService.get(`/articles/${slug}`);
      return data.article;
    } catch (error) {
      throw error.response.data;
    }
  },
  getCommentArticle: async (slug) => {
    try {
      const { data } = await ApiService.get(`/articles/${slug}/comments`);
      return data.comments;
    } catch (error) {
      throw error.response.data;
    }
  },
  postComment: async (slug, body) => {
    try {
      const { data } = await ApiService.post(`articles/${slug}/comments`, {
        comment: {
          body,
        }
      });
      return data.comment;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteComment: async (slug, comment_id) => {
    try {
      const { status } =
        await ApiService.delete(`articles/${slug}/comments/${comment_id}`);
      return status;
    } catch (error) {
      throw 404;
    }
  },
  favoriteArticle: async (slug, type) => {
    try {
      const url = `/articles/${slug}/favorite`
      const { data } = await ((type === 'unfavorite')
        ? ApiService.delete(url)
        : ApiService.post(url));
      return data.article;
    } catch (error) {
      throw error.response.data;
    }
  }
};

// user api service
export const UserApi = {
  login: async (user) => {
    try {
      const { data } = await ApiService.post('/users/login', { user });
      return data.user;
    } catch (error) {
      throw error.response.data.errors
    }
  },
  register: async (user) => {
    try {
      const { data } = await ApiService.post('/users', { user });
      return data.user;
    } catch (error) {
      throw error.response.data.errors
    }
  },
  getUserInfo: async () => {
    try {
      const { data } = await ApiService.get('/user');
      if(data.user){
        return data.user;
      } else {
        return {};
      }
    } catch (error) {
      throw error.response.data.errors
    }
  },
  updateUserInfo: async (user) => {
    try {
      const { data } = await ApiService.put('/user', { ...user });
      if(data.user){
        return data.user;
      } else {
        return {};
      }
    } catch (error) {
      throw error.response.data.errors
    }
  }
};

// profile api service

export const ProfileApi = {
  getProfile : async (username) => {
    try {
      const { data } = await ApiService.get(`/profiles/${username}`);
      if(data.profile){
        return data.profile;
      } else {
        return {};
      }
    } catch (error) {
      throw error.response.data.errors
    }
  },
  followAuthor: async (username, type) => {
    try {
      const url = `/profiles/${username}/follow`
      const { data } = await ((type === 'unfollow')
        ? ApiService.delete(url)
        : ApiService.post(url));
      return data.profile;
    } catch (error) {
      throw error.response.data;
    }
  }
}