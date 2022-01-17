import * as api from '@/services/api';

const state = {
    userdetails:{}
};

// getters
const getters = {

};

// actions
const actions = {
    get_user_details(context) {
        return new Promise((resolve,reject)=>{
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.get('/auth/get_customer_details',{},{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${userDetails.login_user_token}`
                }
            }).then(response=> {
                console.log(response);
                context.commit('SET_USERDETAILS',response.data.data.customer);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    update_user_details(context,userUpdatedDetails) {
        return new Promise((resolve,reject)=> {
            var userDetails = JSON.parse( localStorage.getItem('userdetails') );
            api.post('/auth/update_customer_details',userUpdatedDetails,{
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
    SET_USERDETAILS(state,userDetails){
        state.userdetails = userDetails;
    },
};

export default {
    namespaced: true,
    name: 'account',
    state,
    getters,
    actions,
    mutations
}