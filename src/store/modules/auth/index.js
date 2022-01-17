import * as api from '@/services/api';

const state = {
    islogin:false,
    login_user_token:""
};

// getters
const getters = {

};

// actions
const actions = {
    register(context,userDetails) {
        return new Promise((resolve,reject)=>{
            api.post('/auth/register',userDetails,{headers:{"Content-Type" : "application/json"}}).then(response=>{
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    login(context,userDetails) {
        return new Promise((resolve,reject)=>{
            api.post('/auth/login',userDetails,{headers:{"Content-Type" : "application/json"}}).then(response=>{
                var user = {
                    islogin:true,
                    login_user_token:response.data.data.token
                }
                context.commit('SET_USERDETAILS',user);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    logout(context) {
        return new Promise((resolve,reject)=>{
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.get('/auth/logout',{},{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${userDetails.login_user_token}`
                }
            }).then(response=>{
                var user = {
                    islogin:false,
                    login_user_token:""
                }
                context.commit('SET_USERDETAILS',user);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    }
};

// mutations
const mutations = {
    SET_USERDETAILS(state,user){
        state.islogin = user.islogin;
        state.login_user_token = user.login_user_token;
    },
};

export default {
    namespaced: true,
    name: 'auth',
    state,
    getters,
    actions,
    mutations
}