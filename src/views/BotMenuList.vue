<template>
    <div class="bot_menu_list">
        <h1>Bot Menu List</h1>
        <hr/>
        <div class="row">
            <b-alert :variant="alert.variant" :show="alert.status">{{ alert.message }}</b-alert>
            <div class="col-md-6">
                <router-link :to="{ name: 'add_new_bot_menu' }" class="text-primary">Add New Bot Menu</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <table class="table">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Options</th>
                    </tr>
                    <tr v-for="(bml,index) in botMenuList" :key="index">
                        <td v-text="bml.id"></td>
                        <td v-text="bml.command"></td>
                        <td v-text="bml.command_response_text"></td>
                        <td>
                            <router-link :to="{ name: 'edit_bot_menu' , params: { id : bml.id } }" >Edit</router-link>
                            <a @click="deleteBotMenu(bml.id)" class="text-danger">Delete</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bot_menu_list",
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
            this.getBotMenuList();
        },
        computed:{
            botMenuList(){
                return this.$store.state.bot.bot_menu_list
            }
        },
        methods:{
            getBotMenuList(){
                this.$store.dispatch('bot/get_bot_menu_list');
            },
            deleteBotMenu(botMenuId){
                this.$store.dispatch('bot/delete_bot_menu',botMenuId).then(response =>{
                    if(response.data.success == true){
                        this.getBotMenuList();
                        this.alert.message = response.data.message;
                        this.alert.variant = "success";
                        this.alert.status = true;
                        setTimeout(()=>{
                            this.alert.message = "";
                            this.alert.variant = "";
                            this.alert.status = false;
                        },3000 );
                    } else if(response.data.success == false){
                        this.alert.message = response.data.message;
                        this.alert.variant = "success";
                        this.alert.status = true;
                        setTimeout(()=>{
                            this.alert.message = "";
                            this.alert.variant = "";
                            this.alert.status = false;
                        },3000 );
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        }
    };
</script>