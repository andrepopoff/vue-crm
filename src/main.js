import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter("date", dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyAnVfA_13JII1kp17M7Hq1HIykQU9-Z-t8",
  authDomain: "vue-crm-e540c.firebaseapp.com",
  projectId: "vue-crm-e540c",
  storageBucket: "vue-crm-e540c.appspot.com",
  messagingSenderId: "730636656593",
  appId: "1:730636656593:web:f7ad72f8744f6e79238af0",
  measurementId: "G-FKTVSREZW8"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
