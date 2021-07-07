import Vue from 'vue';
import App from './App';

import store from '@/store';
// 注册全局引用的组件、过滤器、指令、混入、工具方法等
import GlobalOperation from './common/index.js';
Vue.use(GlobalOperation);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	store,
  ...App
})
app.$mount();
