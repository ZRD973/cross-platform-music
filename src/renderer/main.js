import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import db from "./datastore";
import $ from 'jquery';
import "./plugins/andt-design-vue";
import "./plugins/vue-lazyload";
import "./plugins/infinite-loading";
import "./filters";
import "./directives";
import createdInit from "./core/createdInit";
import "./styles/index.less";
import { errorCaptured } from "./utils/assist";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale  from 'element-ui/lib/locale/lang/zh-CN'
import request from "@/utils/request.js";
import { Message } from 'element-ui';


// Vue.prototype.$Jquery = $;
Vue.prototype.$Message = Message;
Vue.prototype.$request = request;
Vue.prototype.$db = db;
Vue.prototype.$errorCaptured = errorCaptured;
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;
Vue.use(ElementUI,{locale});
/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    created() {
        createdInit();
    },
    template: "<App/>",
}).$mount("#app");
