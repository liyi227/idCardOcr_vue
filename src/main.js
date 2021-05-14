import {
  createApp
} from 'vue'
//完整引入ElementPlus
import ElementPlus from 'element-plus';
//注意：样式文件需要单独引入
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookies from 'js-cookie'

// 添加请求拦截器
// axios.interceptors.request.use(function(config) {
//   // 在发送请求之前,格式化参数，增加token
//   let data = config.data;
//   let params = new URLSearchParams()
//   for (var key in config.data) {
//     params.append(key, data[key])
//   }
//   //params.append("tokenStr", getTimes())
//   config.data = params;
//   return config;
// }, function(error) {
//   return Promise.reject(error);
// });


createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(ElementPlus)
  .use(Cookies)
  .mount('#app')


