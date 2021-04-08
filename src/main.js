import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTour from 'vue-tour'
import vueEditor from 'vue2-editor'
import VueScrollTo from 'vue-scrollto'
// eslint-disable-next-line
import styles from './assets/scss/main.scss';

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour);
Vue.use(VueScrollTo, {
  container: "#scroller",
})
Vue.use(vueEditor);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
