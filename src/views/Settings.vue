<template>
    <div class="settings">
        <h1>Settings</h1>
        <hr/>
        <div class="row">
            <div class="col-md-6">
                <form method="post" @submit.prevent="updateSettings" enctype="multipart/form-data">
                    <b-alert :variant="alert.variant" :show="alert.status">{{ alert.message }}</b-alert>
                    <table>
                        <tr>
                            <td>
                                <label>First Name</label>
                            </td>
                            <td>
                                <input type="text" name="first_name" class="form-control" v-model="settingDetails.first_name" />
                                <div v-if="validationErrors.first_name" class="text-danger">{{ validationErrors.first_name }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Last Name</label>
                            </td>
                            <td>
                                <input type="text" name="last_name" class="form-control" v-model="settingDetails.last_name" />
                                <div v-if="validationErrors.last_name" class="text-danger">{{ validationErrors.last_name }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Email</label>
                            </td>
                            <td>
                                <input type="text" name="email" class="form-control" v-model="settingDetails.email" />
                                <div v-if="validationErrors.email" class="text-danger">{{ validationErrors.email }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Gender</label>
                            </td>
                            <td>
                                <b-form-group>
                                    <b-form-radio v-model="settingDetails.gender" name="gender" value="1">Male</b-form-radio>
                                    <b-form-radio v-model="settingDetails.gender" name="gender" value="0">Female</b-form-radio>
                                    <b-form-radio v-model="settingDetails.gender" name="gender" value="2">Other</b-form-radio>
                                </b-form-group>
                                <div v-if="validationErrors.gender" class="text-danger">{{ validationErrors.gender }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Mobile No</label>
                            </td>
                            <td>
                                <input type="text" name="mobile" class="form-control" v-model="settingDetails.mobile" />
                                <div v-if="validationErrors.mobile" class="text-danger">{{ validationErrors.mobile }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Bot Name</label>
                            </td>
                            <td>
                                <input type="text" name="bot_name" class="form-control" v-model="settingDetails.bot_name" />
                                <div v-if="validationErrors.bot_name" class="text-danger">{{ validationErrors.bot_name }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Bot Token</label>
                            </td>
                            <td>
                                <input type="text" name="bot_token" class="form-control" v-model="settingDetails.bot_token" />
                                <div v-if="validationErrors.bot_token" class="text-danger">{{ validationErrors.bot_token }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Profile Image</label>
                            </td>
                            <td>
                                <input type="file" ref="file" @change="onSelect" name="profile_image" class="form-control" />
                                <div v-if="validationErrors.profile_image" class="text-danger">{{ validationErrors.profile_image }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" name="update_change" value="Update" class="btn btn-primary" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "settings",
        data() {
            return {
                validationErrors:[],
                alert:{
                    message:"",
                    variant:"",
                    status:false,
                }
            }
        },
        components: {},
        mounted(){
            this.getUserDetails();
        },
        computed:{
            settingDetails(){
                return this.$store.state.account.userdetails
            }
        },
        methods:{
            getUserDetails(){
                this.$store.dispatch('account/get_user_details');
            },
            onSelect(){
                const file = this.$refs.file.files[0];
                const formData = new FormData();
                this.settingDetails.profile_image = file;
                formData.append("profile_image",this.settingDetails)
            },
            updateSettings(){
                this.$store.dispatch('account/update_user_details',this.settingDetails).then(response=>{
                    if(response.data.success == true){
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
    };
</script>