import * as api from '@/services/api';

const state = {
    bot_menu_list:{},
    edit_bot_menu:{}
};

// getters
const getters = {

};

// actions
const actions = {
    get_bot_menu_list(context) {
        return new Promise((resolve,reject)=>{
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.get('/bot/get_bot_menu_list',{},{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${userDetails.login_user_token}`
                }
            }).then(response=> {
                context.commit('SET_BOTMENULIST',response.data.data.bot_menu_list);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    get_single_bot_menu(context,botMenuId) {
        return new Promise((resolve,reject)=>{
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.get(`/bot/get_single_bot_menu/${botMenuId}`,{},{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${userDetails.login_user_token}`
                }
            }).then(response=> {
                context.commit('SET_EDITBOTMENU',response.data.data.bot_menu);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    add_new_bot_menu(context,addBotMenuDetails) {
        return new Promise((resolve,reject)=>{
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.post('/bot/store_bot_menu',addBotMenuDetails,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${userDetails.login_user_token}`
                }
            }).then(response=> {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    update_bot_menu(context,botMenuUpdatedDetails) {
        return new Promise((resolve,reject)=>{
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.put(`/bot/update_bot_menu/${botMenuUpdatedDetails.id}`,botMenuUpdatedDetails,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${userDetails.login_user_token}`
                }
            }).then(response=> {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    delete_bot_menu(context,botMenuId) {
        return new Promise((resolve,reject)=>{
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.destroy(`/bot/delete_bot_menu/${botMenuId}`, {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${userDetails.login_user_token}`
                }
            }).then(response=> {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    }
};

// mutations
const mutations = {
    SET_BOTMENULIST(state,botMenuList){
        state.bot_menu_list = botMenuList;
    },
    SET_EDITBOTMENU(state,editBotMenu){
        state.edit_bot_menu = editBotMenu;
    },
};

export default {
    namespaced: true,
    name: 'bot',
    state,
    getters,
    actions,
    mutations
}