<template>
    <div>
        <form method="post" @submit.prevent="register">
            <div class="col-md-4" style="margin: 0 auto;">
                <h1>Register</h1>
                <b-alert :variant="alert.variant" :show="alert.status">{{ alert.message }}</b-alert>
            </div>
            <div class="col-md-4" style="margin: 0 auto;">
                <div class="row">
                    <div class="col-md-2">
                        <label>First Name</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" name="first_name" value="" class="form-control" v-model="user.first_name" />
                        <div v-if="validationErrors.first_name" class="text-danger">{{ validationErrors.first_name }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>Last Name</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" name="last_name" value="" class="form-control" v-model="user.last_name" />
                        <div v-if="validationErrors.last_name" class="text-danger">{{ validationErrors.last_name }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>Gender</label>
                    </div>
                    <div class="col-md-6">
                        <b-form-group>
                            <b-form-radio v-model="user.gender" name="gender" value="1">Male</b-form-radio>
                            <b-form-radio v-model="user.gender" name="gender" value="0">Female</b-form-radio>
                            <b-form-radio v-model="user.gender" name="gender" value="2">Other</b-form-radio>
                        </b-form-group>
                        <div v-if="validationErrors.gender" class="text-danger">{{ validationErrors.gender }}</div>
                    </div>
                </div>
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
                        <label>Mobile No</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" name="mobile_no" value="" class="form-control" v-model="user.mobile_no" />
                        <div v-if="validationErrors.mobile_no" class="text-danger">{{ validationErrors.mobile_no }}</div>
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
                        <label>Confirm Password</label>
                    </div>
                    <div class="col-md-6">
                        <input type="password" name="confirm_password" value="" class="form-control" v-model="user.confirm_password" />
                        <div v-if="validationErrors.confirm_password" class="text-danger">{{ validationErrors.confirm_password }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <input type="submit" name="register" value="Register" class="btn btn-primary" />
                    </div>
                    <div class="col-md-2">
                        <router-link :to="{ name: 'login' }" class="btn btn-primary">Login</router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name:"register",
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
            register(){
                this.$store.dispatch('auth/register',this.user).then(response=>{
                    if(response.data.success == true){
                        this.user = {};
                        this.alert.message = response.data.message;
                        this.alert.variant = "success";
                        this.alert.status = true;
                        setTimeout(()=>{
                            this.alert.message = "";
                            this.alert.variant = "";
                            this.alert.status = false;
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