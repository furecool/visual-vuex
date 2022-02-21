import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Vuex)

var store = new Vuex.Store({
  state:{
    info: [],
    infoG: [],
    infoBG:[],
    infoBB:[],

    dataT: [],
    dataG: [],
    dataB: [],
    infoChange: false,
    inDirector: false,
    inGroup: false,
    inBranch: false,
    openBranch: true,
    peopleR: 10,
    peopleY: 8,
    // timeR: 19200,
    timeR: 600,
    // timeY: 9600,
    timeY: 480,
    clientHeight: document.documentElement.clientHeight,
    hXL: 1080,
    hL: 1024,
    hM: 768,
    hS: 540,
    listHeight: 32,
    carouselTime: 1000,
    sortType: '人數警示',
  },
})


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')