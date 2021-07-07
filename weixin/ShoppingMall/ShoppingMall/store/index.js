import uniTools from '../utils/uniTools.js';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const userInfoInit = {
  id: '',
  username: '',
  role: '',
  token: ''
};

const state = {
  userInfo: {...userInfoInit}
};

const getters = {
	getToken(state) {
		return state.userInfo.token || uniTools.setStorage('current_login_user_token');
	}
};

const actions = {
	setUserInfo({commit}, data) {
		commit('mutationUserInfo', data);
	},
};

const mutations = {
  mutationUserInfo(state, data) {
    /* 扭转数据状态 */
    state.userInfo = data;
  },
  resetUserInfo(state) {
		state.userInfo = userInfoInit;
  }
};

export default new Vuex.Store({
  state,
  getters,
	actions,
  mutations,
  modules: {}
});
