import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


import authModule from './modules/auth';
import accountModule from './modules/account';
import botModule from './modules/bot';


export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth:authModule,
        account:accountModule,
        bot:botModule,
    }
})