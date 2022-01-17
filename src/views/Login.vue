<template>
    <div class="login">
        <form method="post" @submit.prevent="login">
            <div class="col-md-4" style="margin: 0 auto;">
                <div class="row">
                    <h1>Login</h1>
                    <b-alert :variant="alert.variant" :show="alert.status">{{ alert.message }}</b-alert>
                </div>
            </div>
            <div class="col-md-6" style="margin: 0 auto;">
                <div class="row">
                    <div class="col-md-2">
                        <label>Email</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" name="email" value="" class="form-control" v-model="user.email" />
                        <div v-if="validationErrors.email" class="text-danger">{{ validationErrors.email }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>Password</label>
                    </div>
                    <div class="col-md-6">
                        <input type="password" name="password" value="" class="form-control" v-model="user.password" />
                        <div v-if="validationErrors.password" class="text-danger">{{ validationErrors.password }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <input type="submit" name="login" value="Login" class="btn btn-primary" />
                    </div>
                    <div class="col-md-2">
                        <router-link :to="{ name: 'register' }" class="btn btn-primary">Registration</router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name:"login",
        data(){
            return{
                user:{},
                validationErrors:[],
                alert:{
                    message:"",
                    variant:"",
                    status:false,
                }
            }
        },
        components: {},
        methods:{
            login(){
                this.$store.dispatch('auth/login',this.user).then(response=>{
                    if(response.data.success == true){
                        var userdetails = JSON.stringify({ islogin:true, login_user_token:response.data.data.token })
                        localStorage.setItem('userdetails', userdetails);
                        this.user = {};
                        this.alert.message = response.data.message;
                        this.alert.variant = "success";
                        this.alert.status = true;
                        setTimeout(()=>{
                            this.alert.message = "";
                            this.alert.variant = "";
                            this.alert.status = false;
                            this.$router.push({ name:'home' });
                        },10000 );
                    } else if(response.data.success == false){
                        this.validationErrors = [];
                        this.validationErrors = response.data.data.errors;
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        }
    }
</script>