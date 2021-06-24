import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
// import vuetify from '@/plugins/vuetify' // path to vuetify expor


// import VueResource from "vue-resource"

// import './plugins/bootstrap-vue'
import './plugins/axios'


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')