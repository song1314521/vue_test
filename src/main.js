import Vue from "vue";
import App from "./App.vue";
import "normalize.css/normalize.css";

// 引入element-ui 为了省事就不按需导入了
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
