// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import url from './config/config'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
window.moment = require('moment')
window.axios = require('axios')
window.url = url.url
window.userurl = url.userurl
window.swal = require('sweetalert2')
window._ = require('underscore')
Vue.prototype.$eventbus = new Vue()
window.$ = require('jquery')
require('bootstrap')
require('bootstrap-datepicker')

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCoZmlmWNMd1Ef1ig-WA8jJ9NRnSQ5AP6Y'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
