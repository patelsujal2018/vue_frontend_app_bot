<template>
    <div class="bot_menu_list">
        <h1>Edit Bot Menu</h1>
        <hr/>
        <div class="row">
            <div class="col-md-6">
                <form method="post" @submit.prevent="updateBotMenu">
                    <b-alert :variant="alert.variant" :show="alert.status">{{ alert.message }}</b-alert>
                    <table>
                        <tr>
                            <td>
                                <label>Command</label>
                            </td>
                            <td>
                                <input type="text" name="command" class="form-control" v-model="editBotMenu.command" />
                                <div v-if="validationErrors.command" class="text-danger">{{ validationErrors.command }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Command Response Text</label>
                            </td>
                            <td>
                                <input type="text" name="command_response_text" class="form-control" v-model="editBotMenu.command_response_text" />
                                <div v-if="validationErrors.command_response_text" class="text-danger">{{ validationErrors.command_response_text }}</div>
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
        name: "edit_bot_menu",
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
            this.getBotMenuDetails();
        },
        computed:{
            editBotMenu(){
                return this.$store.state.bot.edit_bot_menu
            }
        },
        methods:{
            getBotMenuDetails(){
                var botMenuId = this.$route.params.id;
                this.$store.dispatch('bot/get_single_bot_menu',botMenuId);
            },
            updateBotMenu(){
                this.$store.dispatch('bot/update_bot_menu',this.editBotMenu).then(response=>{
                    if(response.data.success == true){
                        this.alert.message = response.data.message;
                        this.alert.variant = "success";
                        this.alert.status = true;
                        setTimeout(()=>{
                            this.alert.message = "";
                            this.alert.variant = "";
                            this.alert.status = false;
                            this.$router.push({ "name": "bot_menu_list" });
                        },3000 );
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